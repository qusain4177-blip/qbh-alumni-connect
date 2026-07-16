import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "search_alumni",
  title: "Search alumni directory",
  description: "Search the QBH alumni directory. Filter by name, Matric passing year, or Matric stream. Row-level security limits results to what the signed-in user can see.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text match on full name."),
    matric_year: z.number().int().min(1950).max(2100).optional().describe("Matric passing year, e.g. 2018."),
    matric_stream: z.enum(["Computer Science", "Biology", "Arts/Commerce"]).optional(),
    limit: z.number().int().min(1).max(50).optional().describe("Max rows to return. Default 20."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, matric_year, matric_stream, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    let q = supabaseForUser(ctx)
      .from("profiles")
      .select("id, full_name, graduation_year, matric_stream, profession, higher_education, company, city, country, linkedin_url")
      .limit(limit ?? 20);
    if (query) q = q.ilike("full_name", `%${query}%`);
    if (matric_year) q = q.eq("graduation_year", matric_year);
    if (matric_stream) q = q.eq("matric_stream", matric_stream);
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult(data ?? [], { alumni: data ?? [] });
  },
});
