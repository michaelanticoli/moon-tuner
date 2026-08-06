import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export default defineTool({
  name: "list_my_natal_reports",
  title: "List my natal reports",
  description:
    "List the signed-in user's Moontuner natal reports (astro-harmonic charts). Returns id, name, birth details, sun/moon/ascendant, and any generated audio/PDF URLs.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Maximum reports to return. Default 20."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return { content: [{ type: "text", text: "No verified email on token" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("natal_reports")
      .select("id, name, email, birth_date, birth_time, birth_location, sun_sign, moon_sign, ascendant, audio_url, pdf_url, chart_image_url, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { reports: data ?? [] },
    };
  },
});
