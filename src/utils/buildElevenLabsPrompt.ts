// Canonical style for every generated Astro-Harmonic (cosmic) track.
//
// The aesthetic is fixed. Only the chart-specific colour (key, tempo,
// sign textures, aspect-driven harmony) varies between readings, so every
// track sounds like the same family:
//
//   cosmic and sparse, piano-focused. Organic acoustic prepared piano at
//   the centre, realistic and intimate, with avant-garde preparations and
//   effects. Analog warmth in the room: tape hiss, dust, wow and flutter,
//   worn recording texture. No synthpop and no electronic dance elements.
//   Built as an instrumental bed to sit beneath spoken words.
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
  "A 120 to 150 second instrumental piece: cosmic and sparse, and piano-focused. Organic acoustic prepared piano at the centre, realistic and intimate, with avant-garde preparations and effects. Analog warmth throughout: tape, dust, gentle wow and flutter, and a worn, lived-in recording texture. Minimal and gentle, with a faint otherworldly, science-fiction sense created by the preparations and effects rather than by synthesizers. Built as an instrumental bed to sit beneath spoken words, with an inspirational and motivating lilt.";

// Sign colour: a prepared-piano or acoustic colour per sign, with analog
// tape and room character. No synthesizer pads, electronic pulses, or
// drum machines.
const SIGN_TEXTURE: Record<string, string> = {
  Aries:       "a muted piano string struck with a small wooden mallet, and a dry, close tape thump on the off-beats",
  Taurus:      "a warm, low felt-muted piano bass and a slow, resonant wooden box drone beneath it",
  Gemini:      "two hands of prepared piano trading short, bright figures, with a tiny music-box plink in between",
  Cancer:      "a soft, distant wordless hum from an unseen room, with heavy tape hiss and a faint dust crackle",
  Leo:         "a single warm, sustained piano chord answering the melody, with a gentle, heartbeat-like thump on the piano lid",
  Virgo:       "fine, precise prepared-piano filigree and small metal bells, ticking with restraint",
  Libra:       "two piano voices in quiet counterpoint, one touched with a paper strip and one left clean",
  Scorpio:     "a deep, resonant low-string piano drone, with the sustain pedal half-down and a soft tape wobble",
  Sagittarius: "a loose, unhurried acoustic guitar figure with a long, open piano phrase above it",
  Capricorn:   "a patient, austere piano ostinato with spaced, mechanical clicks from the instrument's action",
  Aquarius:    "glassy, bell-like prepared-piano harmonics and a far-off, cool metallic shimmer",
  Pisces:      "a soft, dissolving piano wash through wide reverb, with a distant tape-warped breath of woodwind",
};

const ELEMENT_FEEL: Record<string, string> = {
  Fire:  "bright and forward-leaning, with small, sudden rhythmic gestures that settle back to stillness",
  Earth: "grounded and patient, built from a repeated piano figure that changes very slowly",
  Air:   "weightless and curious, with light, quick figures and open air between them",
  Water: "flowing in long, soft tides, with generous silence and wide reverb between phrases",
};

const MODALITY_STRUCTURE: Record<string, string> = {
  Cardinal: "opening with a clear, simple piano motif that returns in each new section",
  Fixed:    "anchored by a sustained, hypnotic piano drone while the harmony shifts gently above it",
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

  const sunTex    = SIGN_TEXTURE[sun]    ?? "a soft, resonant piano figure";
  const moonTex   = SIGN_TEXTURE[moon]   ?? "a gentle, dusty tape-warmed piano line";
  const risingTex = SIGN_TEXTURE[rising] ?? "a sparse prepared-piano pulse";

  const key      = qm?.overallKey       ?? "D minor";
  const tempo    = qm?.overallTempo     ?? 84;
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
      ? "Let a little tension colour the harmony: a suspended piano chord that resolves softly and late, never harsh."
      : harmonies > tensions
      ? "Keep the harmony open and luminous: airy piano voicings that ring and sustain."
      : "Move gently between light tension and rest, so the harmony breathes without ever feeling anxious.";

  const harmonicMotion = [
    "Use slow, sparse chord changes built on modal colour, with simple, singable melodic movement in the right hand.",
    "Use gentle suspensions and soft pivots to a neighbouring key centre, returning home with ease.",
    "Hold long pedal tones under slowly shifting piano voicings, with one clear, sustained lift at the midpoint.",
  ][sigDigit];

  // Tempo-aware pulse: almost always rubato and unhurried. No beat machines.
  const pulseDirective =
    tempo < 80
      ? "The piano breathes freely in rubato, with no steady pulse at all, only long open silences."
      : tempo > 100
      ? "A light, human pulse is marked by the piano's own soft strikes and a faint wooden tap, never a drum machine or synth sequence."
      : "A subtle, intermittent pulse comes from the piano and a faint tape-warped thump, more atmosphere than beat, sometimes vanishing for long stretches.";

  const structureDirective =
    "Structure is sparse and through-composed: a quiet opening with one simple piano motif; a widening middle where prepared-piano textures and resonances open up; a gentle, warm lift in the final third, rising with weight rather than force; then a calm, dusty dissolution into silence.";

  const voiceSpaceDirective =
    "Keep the mid-range and upper-mid range clear and uncluttered, with fewer notes at any one moment so a spoken voice can sit on top without masking. Keep dynamics steady and soft: no sudden swells, no sharp accents that would fight the narration.";

  return [
    `${COSMIC_STYLE_BRIEF}`,
    `Instrumental, in ${key} at approximately ${tempo} BPM, between 120 and 150 seconds long.`,
    "Piano-focused throughout: an organic, acoustic piano with a realistic, intimate sound, its hammers, pedals and strings audible. Avant-garde preparations and effects are used with restraint, such as objects on the strings, muted or damped resonance, and reversed or looped piano tails. Analog character: tape hiss, dust, subtle wow and flutter, and a gentle room tone.",
    `Sun voice (${sun}) adds: ${sunTex}.`,
    `Moon voice (${moon}) adds: ${moonTex}.`,
    `Rising voice (${rising}) adds: ${risingTex}.`,
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    `${aspects.length} planetary aspects shape the harmony. ${harmonicCharacter}`,
    harmonicMotion,
    pulseDirective,
    structureDirective,
    voiceSpaceDirective,
    "High fidelity and natural, with the warmth of old tape. Purely instrumental: no singing, no vocals, no spoken word, no choir lyrics.",
    "AVOID: synthesizers, synthpop, electronic pulses, drum machines, electronic dance elements, sequenced basslines, digital pads, cinematic trailer booms, orchestral swells, heroic brass fanfares, cymbal crashes, EDM drops, dubstep, trance, loud builds, and any dark or menacing tone.",
  ].join(" ");
}
