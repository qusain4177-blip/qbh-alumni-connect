import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "update_my_profile",
  title: "Update my alumni profile",
  description: "Update the signed-in alumnus's own profile fields. Only fields provided are changed.",
  inputSchema: {
    full_name: z.string().trim().min(2).max(120).optional(),
    bio: z.string().trim().max(2000).optional(),
    phone: z.string().trim().max(40).optional(),
    city: z.string().trim().max(120).optional(),
    country: z.string().trim().max(120).optional(),
    company: z.string().trim().max(120).optional(),
    profession: z.string().trim().max(160).optional(),
    higher_education: z.string().trim().max(160).optional(),
    linkedin_url: z.string().url().max(300).optional(),
    website_url: z.string().url().max(300).optional(),
    matric_stream: z.enum(["Computer Science", "Biology", "Arts/Commerce"]).optional(),
    graduation_year: z.number().int().min(1950).max(2100).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    const updates = Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined));
    if (Object.keys(updates).length === 0) return errorResult("Provide at least one field to update.");
    const { data, error } = await supabaseForUser(ctx)
      .from("profiles")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(updates as any)
      .eq("id", ctx.getUserId()!)
      .select()
      .maybeSingle();
    if (error) return errorResult(error.message);
    return textResult(data, { profile: data });
  },
});
