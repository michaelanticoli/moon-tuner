/**
 * analyze-proposal
 *
 * AI-enhanced proposal analysis for the Spacetime Printer.
 * Takes a submitted proposal (intention, uncertainty, resistance,
 * direction, emotional state) and generates deeper reflective output:
 * friction notes, reflective questions, timing posture rationale,
 * and a suggested next step.
 *
 * This does NOT replace the deterministic ProposalEngine — it
 * layers an additional reflective interpretation on top of it.
 *
 * Voice: collaborative, exploratory, probabilistic. Not predictive.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SYSTEM_PROMPT = `You are Moontuner's proposal analysis system. A user has submitted an intention into the Spacetime Printer — a reflective proposal tool, not a manifestation system. Your role is to help them see their own proposal more clearly.

VOICE AND TONE:
- Collaborative, not authoritative. You are a thinking partner.
- Exploratory and probabilistic. "It may be worth asking..." not "You must..."
- Psychologically grounded. Notice language, not personality.
- Calm and spacious. Not urgent.

WHAT TO AVOID:
- Manifestation promises or spiritual certainty
- Predictive statements ("this will succeed/fail")
- Therapy imitation or diagnosis
- Harsh criticism or excessive praise
- Generic productivity advice

WHAT TO PRODUCE:
- frictionNotes: 2-3 observations about where the proposal shows tension, contradiction, or unresolved uncertainty. Reference their specific words.
- reflectiveQuestions: 2-3 questions the proposal surface that are worth sitting with — not rhetorical, genuinely open.
- timingPostureNote: one paragraph on what the emotional and linguistic register of the proposal suggests about timing readiness. Probabilistic, not deterministic.
- suggestedNextStep: one specific, small, actionable step grounded in what they actually wrote.

Keep each field concise. Reference their specific words and phrases. Do not invent things they did not say.`;

interface ProposalInput {
  intention: string;
  uncertainty: string;
  resistance: string;
  direction: string;
  emotionalState: string;
}

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "deliver_proposal_analysis",
    description: "Return a structured reflective analysis of the submitted proposal.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: [
        "frictionNotes",
        "reflectiveQuestions",
        "timingPostureNote",
        "suggestedNextStep",
      ],
      properties: {
        frictionNotes: {
          type: "array",
          items: { type: "string" },
          description: "2-3 observations about tension, contradiction, or unresolved uncertainty in the proposal.",
        },
        reflectiveQuestions: {
          type: "array",
          items: { type: "string" },
          description: "2-3 genuinely open questions the proposal surfaces.",
        },
        timingPostureNote: {
          type: "string",
          description: "One paragraph on what the emotional and linguistic register suggests about timing readiness.",
        },
        suggestedNextStep: {
          type: "string",
          description: "One specific, small, actionable step grounded in what the user actually wrote.",
        },
      },
    },
  },
};

function buildUserPrompt(input: ProposalInput): string {
  return `A proposal has been submitted. Here is what the user wrote:

Intention: "${input.intention}"
Direction: "${input.direction}"
Uncertainty: "${input.uncertainty}"
Resistance: "${input.resistance}"
Emotional state: "${input.emotionalState}"

Analyze this proposal. Reference their specific words and phrases. Do not invent context they did not provide.`;
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
    const input: ProposalInput = body.proposal;

    if (
      !input?.intention ||
      !input?.direction ||
      !input?.uncertainty ||
      !input?.resistance ||
      !input?.emotionalState
    ) {
      return json({ error: "All proposal fields are required" }, 400);
    }

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
            { role: "user", content: buildUserPrompt(input) },
          ],
          tools: [TOOL_SCHEMA],
          tool_choice: {
            type: "function",
            function: { name: "deliver_proposal_analysis" },
          },
          max_tokens: 700,
          temperature: 0.6,
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
      return json({ error: "no_analysis" }, 502);
    }

    const analysis = JSON.parse(argsStr);
    return json({ analysis });
  } catch (err) {
    console.error("analyze-proposal error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
