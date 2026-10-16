// Canonical style for every generated Astro-Harmonic (cosmic) track.
//
// Purpose: the track is a musical translation of the listener's natal
// chart. Each planetary placement is a distinct voice, each sign colours
// that voice, each aspect is a harmonic relationship between two voices,
// and the chart is heard as one piece.
//
// Aesthetic: sparse, cosmic and piano-focused. Organic acoustic prepared
// piano at the centre, realistic and intimate, with avant-garde
// preparations and effects. Analog warmth: tape, dust, wow and flutter.
// No synthesizers or electronic dance elements.
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

/** Length of every generated cosmic track. Target range: 120–150 seconds. */
export const COSMIC_TRACK_DURATION_MS = 140_000;

/** Canonical style brief, stated once and shared by every track. */
export const COSMIC_STYLE_BRIEF =
  "A 120 to 150 second instrumental piece that is a musical translation of a natal chart. Each planet is a distinct voice, each sign colours that voice, each aspect is a harmonic relationship between two voices, and the whole chart is heard as one piece. Sparse, cosmic and piano-focused: organic acoustic prepared piano at the centre, realistic and intimate, with avant-garde preparations and effects. Analog warmth throughout: tape, dust, gentle wow and flutter, and a worn, lived-in recording texture. No synthesizers or electronic dance elements.";

const MAX_PLANET_VOICES = 10;
const MAX_ASPECTS = 6;

// Deterministic-but-chart-specific signature.
function chartSignature(chart: ChartData): number {
  const str = `${chart.sunSign}|${chart.moonSign}|${chart.ascendant}|${chart.planets.map(p => `${p.name}${Math.round(p.degree)}${p.sign}`).join(",")}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** One line per placement: who it is, where it sits, and how it sounds. */
function describePlanetVoices(chart: ChartData, qm: QuantumMelodicReading | null): string[] {
  if (qm && qm.planets.length > 0) {
    return qm.planets.slice(0, MAX_PLANET_VOICES).map(({ position, qmData, signData, houseNumber }) => {
      const retro = position.isRetrograde ? ", retrograde (a turned, inward inflection)" : "";
      const voice = qmData
        ? `voiced by ${qmData.instrument} (${qmData.timbre}) on ${qmData.note}${qmData.octave}`
        : "a distinct, clear voice";
      const colour = signData?.texture ? `, coloured by ${signData.texture}` : "";
      return `${position.name} in ${position.sign}${retro}, house ${houseNumber}: ${voice}${colour}.`;
    });
  }
  return chart.planets.slice(0, MAX_PLANET_VOICES).map(p =>
    `${p.name} in ${p.sign}${p.isRetrograde ? ", retrograde" : ""}: a distinct, clear voice.`,
  );
}

/** Tightest aspects first, since they carry the strongest harmonic relationships. */
function describeAspects(qm: QuantumMelodicReading | null): string[] {
  const aspects = [...(qm?.aspects ?? [])].sort((a, b) => a.orb - b.orb).slice(0, MAX_ASPECTS);
  return aspects.map(a =>
    `${a.planet1} ${a.aspectType.name.toLowerCase()} ${a.planet2}, a ${a.aspectType.harmonic_interval} ${a.aspectType.consonance === "consonant" ? "consonance" : "tension"} between their two voices.`,
  );
}

export function buildElevenLabsPrompt(
  chart: ChartData,
  qm: QuantumMelodicReading | null,
): string {
  const key      = qm?.overallKey       ?? "D minor";
  const tempo    = qm?.overallTempo     ?? 84;
  const element  = qm?.dominantElement  ?? "Water";
  const modality = qm?.dominantModality ?? "Mutable";
  const sigDigit = chartSignature(chart) % 3;

  const elementFeel = ({
    Fire:  "bright and forward-leaning, with small, sudden gestures that settle back to stillness",
    Earth: "grounded and patient, built from a repeated figure that changes very slowly",
    Air:   "weightless and curious, with light, quick figures and open air between them",
    Water: "flowing in long, soft tides, with generous silence between phrases",
  } as Record<string, string>)[element] ?? "gently resonant";

  const modalityStructure = ({
    Cardinal: "opening with a clear, simple motif that returns in each new section",
    Fixed:    "anchored by a sustained, hypnotic drone while the harmony shifts gently above it",
    Mutable:  "with gentle modulation, the tonal centre drifting and returning like weather",
  } as Record<string, string>)[modality] ?? "with slowly evolving harmonic motion";

  const harmonicMotion = [
    "Use slow, sparse chord changes built on modal colour, with simple, singable melodic movement.",
    "Use gentle suspensions and soft pivots to a neighbouring key centre, returning home with ease.",
    "Hold long pedal tones under slowly shifting voicings, with one clear, sustained lift at the midpoint.",
  ][sigDigit];

  const pulseDirective =
    tempo < 80
      ? "The piano breathes freely in rubato, with no steady pulse, only long open silences."
      : tempo > 100
      ? "A light, human pulse is marked by the piano's own soft strikes and a faint wooden tap, never a drum machine."
      : "A subtle, intermittent pulse comes from the piano and a faint tape-warped thump, more atmosphere than beat.";

  const planetVoices = describePlanetVoices(chart, qm);
  const aspects = describeAspects(qm);

  return [
    COSMIC_STYLE_BRIEF,
    `Instrumental, in ${key} at approximately ${tempo} BPM, between 120 and 150 seconds long.`,
    "Piano-focused throughout, its hammers, pedals and strings audible. Avant-garde preparations and effects are used with restraint, such as objects on the strings, damped resonance, and reversed or looped tails.",
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    "The planetary voices, in order of importance, each clearly audible and distinct:",
    ...planetVoices,
    aspects.length > 0 ? "The aspects, which set how the voices meet:" : "",
    ...aspects,
    harmonicMotion,
    pulseDirective,
    "Structure is sparse and through-composed: a quiet opening where the Sun's voice speaks first; the other voices enter one by one; a warm lift in the final third where the voices meet; then a calm, dusty dissolution into silence.",
    "Purely instrumental: no singing, no vocals, no spoken word, no choir lyrics.",
    "AVOID: synthesizers, synthpop, electronic pulses, drum machines, electronic dance elements, sequenced basslines, digital pads, cinematic trailer booms, orchestral swells, heroic brass fanfares, cymbal crashes, EDM drops, loud builds, and any dark or menacing tone.",
  ].filter(Boolean).join(" ");
}
