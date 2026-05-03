// Generates a chart-specific written interpretation grounded in the
// QuantumMelodic metasystem. The client passes the already-enriched
// QM reading (planets+qmData, signs, aspects, houses) and we ask
// Lovable AI to weave those metasystem fields into authentic prose —
// never invent, only translate the data already provided.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  name?: string;
  sunSign?: string;
  moonSign?: string;
  ascendant?: string;
  qmReading: {
    overallKey?: string;
    overallTempo?: number;
    dominantElement?: string;
    dominantModality?: string;
    planets: Array<{
      position: { name: string; sign: string; degree: number; isRetrograde?: boolean };
      qmData?: { instrument?: string; timbre?: string; note?: string; frequency_hz?: number; archetypal_energy?: string; sonic_character?: string; harmonic_quality?: string } | null;
      signData?: { element?: string; modality?: string; musical_mode?: string; tempo_bpm?: number; texture?: string; emotional_quality?: string; sonic_palette?: string } | null;
      houseNumber?: number;
      houseData?: { name?: string; domain?: string; tonal_area?: string; expression?: string } | null;
    }>;
    aspects: Array<{
      planet1: string;
      planet2: string;
      aspectType: { name: string; harmonic_interval?: string; sonic_expression?: string; musical_effect?: string; consonance?: string };
      orb: number;
    }>;
  };
  harmonic: {
    consonance: number;
    tension: number;
    complexity: number;
    elements: Record<string, number>;
  };
  canonical?: {
    elementBalance?: Record<string, number>;
    modalityBalance?: Record<string, number>;
    polarity?: { Yang: number; Yin: number };
    hemispheres?: Record<string, number>;
    quadrants?: Record<string, number>;
    lunarPhaseAtBirth?: { name: string; angle: number; musical: string };
    sect?: string;
    chartRuler?: string | null;
    mostAspectedPlanet?: { name: string; count: number } | null;
    retrogradeCount?: number;
    stellium?: { sign: string; planets: string[] } | null;
  };
}

const SYSTEM_PROMPT = `You are an expert astro-musical interpreter for MOONtuner × QuantumMelodic.
You translate a natal chart into authentic, chart-specific prose by GROUNDING every sentence in the QuantumMelodic metasystem fields the user provides (instruments, sonic characters, archetypal energies, musical modes, harmonic intervals, tonal areas).

ABSOLUTE RULES:
- Never invent generic phrases. Quote or paraphrase the actual QM metasystem fields provided.
- Reference specific placements by name ("Your Mars in Capricorn in the 4th house..."), not generalities.
- Voice: poetic but substantive, intimate, intelligent. NO mystical clichés ("the universe wants you to..."), NO horoscope tropes, NO determinism. Emphasize agency.
- Style: short paragraphs, flowing prose. No bullet lists.
- Each section 2–4 paragraphs of real, named, layered observation.

Return JSON only, matching the provided tool schema.`;

function buildUserPrompt(p: Payload): string {
  const planetLines = p.qmReading.planets.map((pl) => {
    const q = pl.qmData;
    const s = pl.signData;
    const h = pl.houseData;
    return `- ${pl.position.name} in ${pl.position.sign}${
      pl.position.isRetrograde ? " (Rx)" : ""
    } @ ${pl.position.degree.toFixed(2)}°, House ${pl.houseNumber ?? "?"}`
      + (q ? ` | instrument: ${q.instrument}; timbre: ${q.timbre}; archetypal_energy: ${q.archetypal_energy}; sonic_character: ${q.sonic_character}; harmonic_quality: ${q.harmonic_quality}` : "")
      + (s ? ` | sign mode: ${s.musical_mode}; texture: ${s.texture}; emotional_quality: ${s.emotional_quality}; sonic_palette: ${s.sonic_palette}` : "")
      + (h ? ` | house: ${h.name} — ${h.domain}; tonal_area: ${h.tonal_area}; expression: ${h.expression}` : "");
  }).join("\n");

  const aspectLines = p.qmReading.aspects.map((a) =>
    `- ${a.planet1} ${a.aspectType.name} ${a.planet2} (orb ${a.orb.toFixed(2)}°) | interval: ${a.aspectType.harmonic_interval}; consonance: ${a.aspectType.consonance}; sonic: ${a.aspectType.sonic_expression}; musical_effect: ${a.aspectType.musical_effect}`
  ).join("\n");

  return `SUBJECT: ${p.name || "the listener"}
Sun: ${p.sunSign}  Moon: ${p.moonSign}  Rising: ${p.ascendant}
Overall key: ${p.qmReading.overallKey} · Tempo: ${p.qmReading.overallTempo} BPM
Dominant element: ${p.qmReading.dominantElement} · Modality: ${p.qmReading.dominantModality}

HARMONIC METRICS:
- consonance ${Math.round(p.harmonic.consonance)}%
- tension ${Math.round(p.harmonic.tension)}%
- complexity ${Math.round(p.harmonic.complexity)}%
- elements ${JSON.stringify(p.harmonic.elements)}

CANONICAL CHART SIGNATURES (derived directly from placements — reference these by name):
${p.canonical ? `- Lunar phase at birth: ${p.canonical.lunarPhaseAtBirth?.name} (Sun-Moon ${p.canonical.lunarPhaseAtBirth?.angle}°) — ${p.canonical.lunarPhaseAtBirth?.musical}
- Sect: ${p.canonical.sect} chart${p.canonical.chartRuler ? ` · chart ruler: ${p.canonical.chartRuler}` : ""}
- Element balance %: ${JSON.stringify(p.canonical.elementBalance)}
- Modality balance %: ${JSON.stringify(p.canonical.modalityBalance)}
- Polarity Yang/Yin: ${JSON.stringify(p.canonical.polarity)}
- Hemispheres %: ${JSON.stringify(p.canonical.hemispheres)}
- Lead voice (most-aspected planet): ${p.canonical.mostAspectedPlanet ? `${p.canonical.mostAspectedPlanet.name} (${p.canonical.mostAspectedPlanet.count} aspects)` : "none"}
- Retrograde count: ${p.canonical.retrogradeCount ?? 0}
- Stellium: ${p.canonical.stellium ? `${p.canonical.stellium.planets.join(", ")} in ${p.canonical.stellium.sign}` : "none"}` : "(none provided)"}

PLANETS (with full QM metasystem fields):
${planetLines}

ASPECTS (with QM harmonic mappings):
${aspectLines}

Write a tailored interpretation. Each section must reference SPECIFIC placements by name and use the QM fields above. Do not produce generic horoscope language.`;
}

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "deliver_interpretation",
    description: "Return the chart interpretation in five named sections.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        opening: { type: "string", description: "1 paragraph: the overall sonic architecture of this specific chart, naming the key, tempo, dominant element/modality, and what that combination actually sounds like in this person's life." },
        coreSignature: { type: "string", description: "2–3 paragraphs: the Sun/Moon/Rising triad — naming each placement, its instrument, its sonic character, and how the three voices interact." },
        harmonicAlignment: { type: "string", description: "2–3 paragraphs interpreting the consonance/tension/complexity metrics in light of the SPECIFIC aspects present. Name the actual aspects driving each metric." },
        resolutionGuidance: { type: "string", description: "2–3 paragraphs of grounded, agency-centered guidance: given THIS chart's specific tensions and elemental balance, what one or two concrete recalibrations matter most. No generic advice." },
        closing: { type: "string", description: "1 short paragraph: a closing reflection that re-anchors the listener in their own authorship of the score." },
      },
      required: ["opening", "coreSignature", "harmonicAlignment", "resolutionGuidance", "closing"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return json({ error: "LOVABLE_API_KEY not configured" }, 500);
    }

    const payload = (await req.json()) as Payload;
    if (!payload?.qmReading?.planets?.length) {
      return json({ error: "qmReading with planets required" }, 400);
    }

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(payload) },
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "deliver_interpretation" } },
      }),
    });

    if (aiResp.status === 429) return json({ error: "rate_limited" }, 429);
    if (aiResp.status === 402) return json({ error: "credits_exhausted" }, 402);
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return json({ error: "ai_failed" }, 502);
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments;
    if (!argsStr) {
      console.error("No tool call in response", JSON.stringify(data).slice(0, 500));
      return json({ error: "no_interpretation" }, 502);
    }
    const interpretation = JSON.parse(argsStr);

    return json({ interpretation });
  } catch (e) {
    console.error("interpret-natal-chart error:", e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
