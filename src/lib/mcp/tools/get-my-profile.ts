import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "get_my_profile",
  title: "Get my alumni profile",
  description: "Returns the signed-in alumnus's own profile record (name, Matric year, stream, contact, LinkedIn, etc.).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    const { data, error } = await supabaseForUser(ctx)
      .from("profiles")
      .select("*")
      .eq("id", ctx.getUserId()!)
      .maybeSingle();
    if (error) return errorResult(error.message);
    if (!data) return errorResult("No profile found");
    return textResult(data, { profile: data });
  },
});
