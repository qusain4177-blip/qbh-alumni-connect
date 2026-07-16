import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "list_events",
  title: "List alumni events",
  description: "List upcoming alumni events (reunions, mentorship nights, batch meetups).",
  inputSchema: {
    upcoming_only: z.boolean().optional().describe("If true, only return events with a start date >= today. Default true."),
    limit: z.number().int().min(1).max(50).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ upcoming_only, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    let q = supabaseForUser(ctx).from("events").select("*").order("event_date", { ascending: true }).limit(limit ?? 20);
    if (upcoming_only !== false) q = q.gte("event_date", new Date().toISOString());
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult(data ?? [], { events: data ?? [] });
  },
});
