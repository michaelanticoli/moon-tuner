/**
 * generate-report
 *
 * Modular AI-assisted report generation for the Moontuner ecosystem.
 * Supports multiple report types:
 *   - lunar_arc: Longitudinal emotional arc across lunar cycles
 *   - creative_timing: Creative rhythm and output pattern analysis
 *   - decision_window: Active decision periods and their timing context
 *   - journal_synthesis: Emotional season summary from journal activity
 *   - digital_smudging_reset: Transition and reset narrative
 *
 * Voice: editorial, intimate, emotionally intelligent.
 * NOT: AI spam walls, horoscope clichés, overexplained metaphysics.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type ReportType =
  | "lunar_arc"
  | "creative_timing"
  | "decision_window"
  | "journal_synthesis"
  | "digital_smudging_reset";

const REPORT_PROMPTS: Record<ReportType, string> = {
  lunar_arc: `You are generating a Lunar Arc Report — a longitudinal emotional arc document. Read the user's timeline data across lunar cycles and produce a narrative that traces the emotional arc of the period without dramatizing or flattening it.

Structure: opening (the arc in one paragraph), phase-by-phase pattern (what each dominant lunar phase held emotionally), turning point (where a shift is visible, if any), and a closing reflection prompt.

Voice: archival, editorial, intimate. Like a letter from a thoughtful observer who has been watching over several months.`,

  creative_timing: `You are generating a Creative Timing Report. Read the user's engagement with proposals, directives, and active phases and produce an honest reflection on when their creative output and intention-setting tends to cluster.

Structure: rhythm observation (when activity concentrates), friction periods (when resistance or holding appears), momentum pattern (what the arc looks like), and a suggested attunement question.

Voice: observational, grounded, non-prescriptive.`,

  decision_window: `You are generating a Decision Window Analysis. Read the user's proposal submissions, directive engagements, and timeline phases to identify the periods when consequential decisions were being navigated.

Structure: window description (when the decision period appears active), emotional posture during that window, what was held vs. advanced, and a reflective question about the window.

Voice: clear, calm, non-dramatic.`,

  journal_synthesis: `You are generating a Journal Synthesis. Read the user's emotional themes, timeline events, and engagement patterns and summarize the emotional season of the observed period.

Structure: season summary (2-3 sentences on the overall texture of the period), recurring themes (2-3 specific themes that kept appearing), a forgotten intention worth revisiting, and a one-sentence holding observation.

Voice: archival, quietly insightful. Like a good editor who has read all the drafts.`,

  digital_smudging_reset: `You are generating a Digital Smudging Reset narrative — a reflective reorientation document for a user completing a digital detox ritual.

Structure: acknowledgment of what is being cleared (based on their data), a soft reframing of the transition, what the record suggests they are moving toward, and a single intention to carry into the fresh period.

Voice: calm, grounded, unhurried. No spiritual overclaiming.`,
};

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "deliver_report",
    description: "Return a structured modular report.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["headline", "sections", "closingPrompt"],
      properties: {
        headline: {
          type: "string",
          description: "A single editorial headline for this report (not a title, more like a chapter name).",
        },
        sections: {
          type: "array",
          description: "2-4 named narrative sections.",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["label", "content"],
            properties: {
              label: { type: "string", description: "Short section label." },
              content: { type: "string", description: "1-3 paragraphs of narrative content." },
            },
          },
        },
        closingPrompt: {
          type: "string",
          description: "One reflective question or invitation to sit with — not rhetorical, genuinely open.",
        },
      },
    },
  },
};

interface TimelineEvent {
  event_type: string;
  title: string;
  emotional_theme: string | null;
  lunar_phase: string | null;
  occurred_at: string;
}

function buildUserPrompt(
  reportType: ReportType,
  timeline: TimelineEvent[],
  lunarPhase: string,
  periodDays: number,
): string {
  const timelineLines = timeline
    .slice(0, 30)
    .map(
      (e) =>
        `[${e.occurred_at.slice(0, 10)} | ${e.event_type}${e.lunar_phase ? ` | ${e.lunar_phase}` : ""}] ${e.title}${e.emotional_theme ? ` — ${e.emotional_theme}` : ""}`,
    )
    .join("\n");

  const emotionalThemes = [
    ...new Set(timeline.map((e) => e.emotional_theme).filter(Boolean)),
  ].slice(0, 15);

  return `Report type: ${reportType}
Current lunar phase: ${lunarPhase}
Period observed: last ${periodDays} days
Total events in period: ${timeline.length}
Emotional themes present: ${emotionalThemes.join(", ") || "none recorded"}

Timeline:
${timelineLines || "No events in this period."}

Generate the report.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    // Authenticate
    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser();
    if (authError || !user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json();
    const reportType: ReportType = body.reportType;
    const lunarPhase: string = body.lunarPhase ?? "Unknown";
    const periodDays: number = Math.min(body.periodDays ?? 90, 180);

    if (!reportType || !(reportType in REPORT_PROMPTS)) {
      return json({ error: "Invalid reportType" }, 400);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const since = new Date(
      Date.now() - periodDays * 24 * 60 * 60 * 1000,
    ).toISOString();

    const { data: timeline } = await supabase
      .from("timeline_events")
      .select("event_type, title, emotional_theme, lunar_phase, occurred_at")
      .eq("user_id", user.id)
      .gte("occurred_at", since)
      .order("occurred_at", { ascending: false })
      .limit(40);

    const timelineData = (timeline ?? []) as TimelineEvent[];
    const systemPrompt = REPORT_PROMPTS[reportType];

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: buildUserPrompt(reportType, timelineData, lunarPhase, periodDays),
            },
          ],
          tools: [TOOL_SCHEMA],
          tool_choice: {
            type: "function",
            function: { name: "deliver_report" },
          },
          max_tokens: 1200,
          temperature: 0.7,
        }),
      },
    );

    if (aiResp.status === 429) return json({ error: "rate_limited" }, 429);
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return json({ error: "ai_failed" }, 502);
    }

    const aiData = await aiResp.json();
    const toolCall = aiData?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments;
    if (!argsStr) {
      console.error("No tool call in response", JSON.stringify(aiData).slice(0, 500));
      return json({ error: "no_report" }, 502);
    }

    const report = JSON.parse(argsStr);
    return json({ report, reportType, periodDays });
  } catch (err) {
    console.error("generate-report error:", err);
    return json({ error: String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
