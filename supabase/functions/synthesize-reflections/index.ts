/**
 * synthesize-reflections
 *
 * Reads the user's longitudinal timeline and memory archive, then uses
 * AI to surface recurring patterns, emotional cycles, and behavioral
 * themes — without diagnosing, judging, or over-claiming.
 *
 * Voice: observational, grounded, probabilistic. Not clinical, not mystical.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Moontuner's reflective synthesis engine. Your role is to observe patterns in a user's longitudinal record — timeline events, emotional themes, lunar phases, directives, proposals — and surface what is recurring, shifting, or worth noticing.

VOICE AND TONE:
- Observational, not diagnostic. You notice; you do not conclude.
- Grounded and calm. No mystical overclaiming.
- Probabilistic, not deterministic. "Often" and "tends to" rather than "always" or "will."
- Emotionally intelligent. Acknowledge complexity without flattening it.
- Spacious. Leave room for the user to disagree.

WHAT TO AVOID:
- Therapist imitation ("it sounds like you are...")
- Guru language or spiritual authority
- Hyper-positivity or manipulative encouragement
- Deterministic forecasting ("this means you will...")
- Robotic productivity coaching

STRUCTURE (return valid JSON matching the schema):
- recurringThemes: 2-3 themes observed across the record, stated as observations not verdicts
- emotionalCycles: 1-2 patterns in emotional weather relative to lunar phases or activity types
- momentumNote: a single paragraph on the current momentum direction — neither cheerleading nor alarming
- timingObservation: one observation about when the user tends to act, hold, or shift
- surfacedIntention: one forgotten or underweighted intention worth revisiting (if visible in the data)

Keep each field to 1-3 sentences. Do not pad. If the record is too sparse to observe a pattern, say so honestly.`;

interface TimelineEvent {
  event_type: string;
  title: string;
  description: string | null;
  emotional_theme: string | null;
  lunar_phase: string | null;
  occurred_at: string;
}

interface MemoryEvent {
  entity_type: string;
  title: string | null;
  emotional_theme: string | null;
  lunar_phase: string | null;
  created_at: string;
}

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "deliver_synthesis",
    description: "Return a structured reflective synthesis of the user's record.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: [
        "recurringThemes",
        "emotionalCycles",
        "momentumNote",
        "timingObservation",
        "surfacedIntention",
      ],
      properties: {
        recurringThemes: {
          type: "array",
          items: { type: "string" },
          description: "2-3 recurring themes observed across the record.",
        },
        emotionalCycles: {
          type: "array",
          items: { type: "string" },
          description: "1-2 patterns in emotional weather relative to activity or lunar context.",
        },
        momentumNote: {
          type: "string",
          description: "One paragraph on current momentum direction — observational, not prescriptive.",
        },
        timingObservation: {
          type: "string",
          description: "One observation about when the user tends to act, hold, or shift.",
        },
        surfacedIntention: {
          type: "string",
          description: "One forgotten or underweighted intention worth revisiting, or an honest note that the record is too sparse to surface one.",
        },
      },
    },
  },
};

function buildUserPrompt(
  timeline: TimelineEvent[],
  memories: MemoryEvent[],
  lunarPhase: string,
): string {
  const timelineLines = timeline
    .slice(0, 40)
    .map(
      (e) =>
        `[${e.occurred_at.slice(0, 10)} | ${e.event_type}${e.lunar_phase ? ` | ${e.lunar_phase}` : ""}] ${e.title}${e.emotional_theme ? ` — emotional: ${e.emotional_theme}` : ""}${e.description ? ` — ${e.description.slice(0, 120)}` : ""}`,
    )
    .join("\n");

  const emotionalThemes = [
    ...new Set(
      [...timeline, ...memories]
        .map((e) => e.emotional_theme)
        .filter(Boolean),
    ),
  ].slice(0, 20);

  const entityTypes = memories.reduce<Record<string, number>>((acc, m) => {
    acc[m.entity_type] = (acc[m.entity_type] ?? 0) + 1;
    return acc;
  }, {});

  return `Current lunar phase: ${lunarPhase}
Total timeline events: ${timeline.length}
Total memory events: ${memories.length}

Engagement by type: ${Object.entries(entityTypes)
    .map(([k, v]) => `${k}(${v})`)
    .join(", ")}

Emotional themes across the record: ${emotionalThemes.join(", ") || "none recorded"}

Timeline (most recent first):
${timelineLines || "No timeline events recorded yet."}

Synthesize what is observable in this record. Be honest if the record is too sparse.`;
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

    // Authenticate user
    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser();
    if (authError || !user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const lunarPhase: string = body.lunarPhase ?? "Unknown";
    const forceRefresh: boolean = body.forceRefresh ?? false;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Check cache first (24 hour TTL) unless forced refresh
    if (!forceRefresh) {
      const { data: cached } = await supabase
        .from("ai_synthesis_cache")
        .select("result, generated_at")
        .eq("user_id", user.id)
        .eq("synthesis_type", "reflective")
        .single();

      if (cached) {
        const age = Date.now() - new Date(cached.generated_at).getTime();
        if (age < 24 * 60 * 60 * 1000) {
          return json({ synthesis: cached.result, cached: true });
        }
      }
    }

    // Fetch timeline + memories in parallel
    const [{ data: timeline }, { data: memories }] = await Promise.all([
      supabase
        .from("timeline_events")
        .select(
          "event_type, title, description, emotional_theme, lunar_phase, occurred_at",
        )
        .eq("user_id", user.id)
        .order("occurred_at", { ascending: false })
        .limit(50),
      supabase
        .from("user_memories")
        .select("entity_type, title, emotional_theme, lunar_phase, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    const timelineData = (timeline ?? []) as TimelineEvent[];
    const memoriesData = (memories ?? []) as MemoryEvent[];

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: buildUserPrompt(timelineData, memoriesData, lunarPhase),
            },
          ],
          tools: [TOOL_SCHEMA],
          tool_choice: {
            type: "function",
            function: { name: "deliver_synthesis" },
          },
          max_tokens: 800,
          temperature: 0.65,
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
      return json({ error: "no_synthesis" }, 502);
    }

    const synthesis = JSON.parse(argsStr);

    // Cache result (upsert)
    await supabase.from("ai_synthesis_cache").upsert(
      {
        user_id: user.id,
        synthesis_type: "reflective",
        result: synthesis,
        generated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,synthesis_type" },
    );

    return json({ synthesis, cached: false });
  } catch (err) {
    console.error("synthesize-reflections error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
