// Canonical style for every generated Astro-Harmonic (cosmic) track.
//
// The aesthetic is fixed. Only the chart-specific colour (key, tempo,
// sign textures, aspect-driven harmony) varies between readings, so every
// track sounds like the same family:
//
//   cosmic, galactic, science-fiction and anthemic — sparse, ambient,
//   subtle synthpop meets piano meditation. Minimalist. A gentle,
//   caged organic electricity drawn from mostly analog instrumentation,
//   high fidelity, built to sit beneath spoken words with an
//   inspirational, motivating lilt.
//
// Each track is an instrumental bed for narration: it must leave room
// for the voice, never compete with it, and never contain vocals or
// spoken word of its own.
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

/** Length of every generated cosmic track. Target range: 120–150 seconds. */
export const COSMIC_TRACK_DURATION_MS = 140_000;

/** Canonical style brief, stated once and shared by every track. */
export const COSMIC_STYLE_BRIEF =
  "A 120 to 150 second song: cosmic, galactic, science-fiction and anthemic; sparse ambient subtle synthpop meets piano meditation music. Minimalist and somewhat science-fiction-like, but gentle: a caged organic electricity that comes from mostly analog instrumentation, in high fidelity. Built as an instrumental bed to sit beneath spoken words, with an inspirational and motivating lilt.";

// Sign colour: an analog or piano-led timbre per sign. Never acoustic
// orchestral sections, brass, or drum kits.
const SIGN_TEXTURE: Record<string, string> = {
  Aries:       "a short, dry analog bass pulse and a soft gated synth stab on the off-beats",
  Taurus:      "warm, slow analog pad swells and a low, round sub-tone that holds the ground",
  Gemini:      "two interlocking analog arpeggios that trade places and a bright, shimmering pluck",
  Cancer:      "tape-saturated room tone and a distant, breathy analog choir pad, far in the mix",
  Leo:         "a single warm Rhodes-style chord answering the piano and a gentle, heartbeat-like pulse",
  Virgo:       "crisp, precise music-box tones and a filtered sequencer ticking with restraint",
  Libra:       "a balanced pair of analog pads in soft counterpoint and a light, airy pulse",
  Scorpio:     "a throbbing analog sub-drone, deep and magnetic, with resonant filter sweeps",
  Sagittarius: "a wide, open analog lead that rises slowly over a loose, unhurried pulse",
  Capricorn:   "a patient, austere sequenced pulse and sparse, mechanical clicks in a fixed grid",
  Aquarius:    "icy modular synth tones, glassy bell-like harmonics and a clean, cool shimmer",
  Pisces:      "reverb-soaked oceanic pads and a far, almost-ambient synth wash that dissolves slowly",
};

const ELEMENT_FEEL: Record<string, string> = {
  Fire:  "bright and forward-leaning, with a subtly lifting energy that builds toward an anthemic lift",
  Earth: "grounded and steady, built from repetition that changes very slowly",
  Air:   "weightless and curious, with light, quick figures and airy space between them",
  Water: "flowing in long, soft tides with generous space and wide reverb between phrases",
};

const MODALITY_STRUCTURE: Record<string, string> = {
  Cardinal: "opening with a clear, simple motif that launches each new section",
  Fixed:    "anchored by a sustained, hypnotic pulse while the harmony shifts gently above it",
  Mutable:  "with gentle modulation, the tonal centre drifting and returning like weather",
};

// Deterministic-but-chart-specific signature.
function chartSignature(chart: ChartData): number {
  const str = `${chart.sunSign}|${chart.moonSign}|${chart.ascendant}|${chart.planets.map(p => `${p.name}${Math.round(p.degree)}${p.sign}`).join(",")}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function buildElevenLabsPrompt(
  chart: ChartData,
  qm: QuantumMelodicReading | null,
): string {
  const sun = chart.sunSign;
  const moon = chart.moonSign;
  const rising = chart.ascendant;

  const sunTex    = SIGN_TEXTURE[sun]    ?? "soft analog pads";
  const moonTex   = SIGN_TEXTURE[moon]   ?? "gentle analog tape textures";
  const risingTex = SIGN_TEXTURE[rising] ?? "a soft, pulsing analog room tone";

  const key      = qm?.overallKey       ?? "D minor";
  const tempo    = qm?.overallTempo     ?? 96;
  const element  = qm?.dominantElement  ?? "Water";
  const modality = qm?.dominantModality ?? "Mutable";

  const elementFeel       = ELEMENT_FEEL[element]        ?? "gently resonant";
  const modalityStructure = MODALITY_STRUCTURE[modality] ?? "with slowly evolving harmonic motion";

  // Aspect-driven harmony, kept gentle: tension softens into colour,
  // consonance stays open and spacious.
  const aspects   = qm?.aspects ?? [];
  const tensions  = aspects.filter(a => ["Square", "Opposition"].includes(a.aspectType.name)).length;
  const harmonies = aspects.filter(a => ["Trine", "Sextile", "Conjunction"].includes(a.aspectType.name)).length;
  const sigDigit  = chartSignature(chart) % 3;

  const harmonicCharacter =
    tensions > harmonies
      ? "Let a little tension colour the harmony: a suspended chord that resolves softly and late, never harsh."
      : harmonies > tensions
      ? "Keep the harmony open and luminous: extended, airy chords that ring and sustain."
      : "Move gently between light tension and rest, so the harmony breathes without ever feeling anxious.";

  const harmonicMotion = [
    "Use slow, sparse chord changes built on modal colour, with simple, singable upper-voice movement.",
    "Use gentle suspensions and soft pivots to a neighbouring key centre, returning home with ease.",
    "Hold long pedal tones under slowly shifting pads, with one clear, sustained lift at the midpoint.",
  ][sigDigit];

  // Tempo-aware pulse: always minimal, never a driving dance groove.
  const pulseDirective =
    tempo < 84
      ? "The pulse is nearly absent: a faint analog heartbeat, felt more than heard, with long open passages."
      : tempo > 108
      ? "A light synthpop pulse keeps time gently, a soft sequenced click that supports the voice and never drives it."
      : "A subtle, intermittent analog pulse enters and recedes, more atmosphere than beat, sometimes vanishing for long stretches.";

  const structureDirective =
    "Structure is sparse and through-composed: a quiet opening with one simple analog motif; a widening middle where the synth textures open up; a gentle anthemic lift in the final third, rising with warmth rather than force; then a calm dissolution.";

  const voiceSpaceDirective =
    "Keep the mid-range and upper-mid range clear and uncluttered, with fewer elements at any one moment so a spoken voice can sit on top without masking. Keep dynamics steady and soft: no sudden swells, no sharp accents that would fight the narration.";

  return [
    `${COSMIC_STYLE_BRIEF}`,
    `Instrumental, in ${key} at approximately ${tempo} BPM, between 120 and 150 seconds long.`,
    "Mostly analog instrumentation throughout: analog synths, Rhodes-style and felt-piano tones, tape-warm textures. The piano is the meditative heart of the track, with a soft, reflective quality and audible touch.",
    `Sun voice (${sun}) adds: ${sunTex}.`,
    `Moon voice (${moon}) adds: ${moonTex}.`,
    `Rising voice (${rising}) adds: ${risingTex}.`,
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    `${aspects.length} planetary aspects shape the harmony. ${harmonicCharacter}`,
    harmonicMotion,
    pulseDirective,
    structureDirective,
    voiceSpaceDirective,
    "High fidelity, clean and open, with a gentle caged electricity in the synth textures. Purely instrumental: no singing, no vocals, no spoken word, no choir lyrics.",
    "AVOID: harsh or aggressive synths, cinematic trailer booms, orchestral swells, heroic brass fanfares, cymbal crashes, supersaw walls, EDM drops, dubstep, trance, four-on-the-floor club beats, loud builds, and any dark or menacing tone.",
  ].join(" ");
}
