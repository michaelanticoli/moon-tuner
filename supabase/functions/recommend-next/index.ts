/**
 * recommend-next
 *
 * Gentle recommendation engine for the Moontuner ecosystem.
 * Analyzes the user's recent history and generates contextually
 * appropriate, emotionally aware suggestions — not engagement-
 * maximizing nudges.
 *
 * Recommendations are subtle, optional, and clearly labeled as AI.
 * Users can dismiss or opt out entirely.
 *
 * Voice: understated, context-aware. Like a thoughtful companion
 * noticing you might have forgotten something, not a push notification.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Moontuner's gentle recommendation engine. Based on a user's recent activity and current lunar context, suggest 2-3 contextually appropriate next moves — things worth revisiting or doing. 

PRINCIPLES:
- Recommendations should feel like quiet observations, not urgent prompts.
- Suggest revisiting, not consuming more.
- Never suggest actions that feel like engagement maximization.
- Each recommendation should have a genuine observational basis in the user's data.
- If there is nothing obvious to recommend, say so with one honest suggestion.

RECOMMENDATION TYPES (choose the most appropriate):
- revisit_proposal: return to an unfinished or unresolved proposal
- reread_reflection: revisit a past reflection or journal entry that may be relevant now
- perform_ritual: consider a Digital Smudging reset or equivalent clearing
- shift_directive: consider shifting from current directive state (e.g., Push → Hold)
- revisit_workbook: return to a workbook entry left incomplete
- hold_space: take a deliberate pause before the next action
- begin_reflection: the record suggests it's time to write something

VOICE: understated, context-sensitive, non-pushy. "You submitted a proposal three weeks ago that hasn't been followed up." Not "Now is the perfect time to manifest your dreams!"`;

interface TimelineEvent {
  event_type: string;
  title: string;
  emotional_theme: string | null;
  lunar_phase: string | null;
  occurred_at: string;
}

interface MemoryEvent {
  entity_type: string;
  title: string | null;
  emotional_theme: string | null;
  created_at: string;
}

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "deliver_recommendations",
    description: "Return 2-3 gentle, contextually grounded recommendations.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["recommendations"],
      properties: {
        recommendations: {
          type: "array",
          maxItems: 3,
          description: "2-3 contextually appropriate recommendations.",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["type", "title", "rationale", "action"],
            properties: {
              type: {
                type: "string",
                description: "Recommendation type from the approved list.",
              },
              title: {
                type: "string",
                description: "Short recommendation title (e.g., 'Return to your November proposal').",
              },
              rationale: {
                type: "string",
                description: "One sentence explaining what in the user's data grounds this recommendation.",
              },
              action: {
                type: "string",
                description: "The specific suggested action (one sentence, concrete).",
              },
            },
          },
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
  const recentTimeline = timeline.slice(0, 20);
  const timelineLines = recentTimeline
    .map(
      (e) =>
        `[${e.occurred_at.slice(0, 10)} | ${e.event_type}${e.lunar_phase ? ` | ${e.lunar_phase}` : ""}] ${e.title}${e.emotional_theme ? ` — ${e.emotional_theme}` : ""}`,
    )
    .join("\n");

  const daysSinceLast = timeline.length > 0
    ? Math.floor(
        (Date.now() - new Date(timeline[0].occurred_at).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  const entityCounts = memories.reduce<Record<string, number>>((acc, m) => {
    acc[m.entity_type] = (acc[m.entity_type] ?? 0) + 1;
    return acc;
  }, {});

  const recentProposals = timeline
    .filter((e) => e.event_type === "proposal_submit")
    .slice(0, 3);

  return `Current lunar phase: ${lunarPhase}
Days since last recorded activity: ${daysSinceLast ?? "unknown"}
Total memories by type: ${Object.entries(entityCounts)
    .map(([k, v]) => `${k}(${v})`)
    .join(", ") || "none"}

Recent proposals submitted: ${recentProposals.map((p) => p.title).join(", ") || "none"}

Recent timeline (last 20 events):
${timelineLines || "No recent activity recorded."}

Generate 2-3 gentle, contextually grounded recommendations.`;
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

    const body = await req.json().catch(() => ({}));
    const lunarPhase: string = body.lunarPhase ?? "Unknown";
    const forceRefresh: boolean = body.forceRefresh ?? false;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Cache check (6 hour TTL)
    if (!forceRefresh) {
      const { data: cached } = await supabase
        .from("ai_synthesis_cache")
        .select("result, generated_at")
        .eq("user_id", user.id)
        .eq("synthesis_type", "recommendations")
        .single();

      if (cached) {
        const age = Date.now() - new Date(cached.generated_at).getTime();
        if (age < 6 * 60 * 60 * 1000) {
          return json({ recommendations: cached.result, cached: true });
        }
      }
    }

    const [{ data: timeline }, { data: memories }] = await Promise.all([
      supabase
        .from("timeline_events")
        .select("event_type, title, emotional_theme, lunar_phase, occurred_at")
        .eq("user_id", user.id)
        .order("occurred_at", { ascending: false })
        .limit(30),
      supabase
        .from("user_memories")
        .select("entity_type, title, emotional_theme, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(60),
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
            function: { name: "deliver_recommendations" },
          },
          max_tokens: 600,
          temperature: 0.55,
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
      return json({ error: "no_recommendations" }, 502);
    }

    const { recommendations } = JSON.parse(argsStr);

    // Cache result (6 hour TTL)
    await supabase.from("ai_synthesis_cache").upsert(
      {
        user_id: user.id,
        synthesis_type: "recommendations",
        result: recommendations,
        generated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,synthesis_type" },
    );

    return json({ recommendations, cached: false });
  } catch (err) {
    console.error("recommend-next error:", err);
    return json({ error: String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
