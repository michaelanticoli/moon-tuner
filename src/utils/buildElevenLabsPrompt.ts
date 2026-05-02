// Translates a natal chart into a rich, evocative ElevenLabs music prompt.
// The prompt encodes the chart's musical DNA: key, mode, tempo, instrumentation,
// emotional arc, and aspectual tension/consonance.
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

const SIGN_INSTRUMENTATION: Record<string, string> = {
  Aries: "bright trumpets, driving timpani, electric guitar leads",
  Taurus: "warm cellos, mellow upright bass, earthen hand percussion",
  Gemini: "playful flute, agile pizzicato strings, glockenspiel sparkle",
  Cancer: "lush harp arpeggios, intimate piano, soft choral pads",
  Leo: "regal french horns, sweeping orchestral strings, golden brass fanfare",
  Virgo: "precise woodwinds, oboe, classical guitar fingerpicking, marimba",
  Libra: "elegant solo violin, romantic piano, ambient pads",
  Scorpio: "dark cellos, mysterious low brass, throbbing sub-bass, distant choir",
  Sagittarius: "celebratory acoustic guitar, fiddle, world percussion",
  Capricorn: "stately church organ, low strings, distant timpani",
  Aquarius: "ethereal synthesizers, glassy electric piano, ambient textures",
  Pisces: "dreamy reverb-soaked piano, ocean swells of strings, ethereal choir",
};

const ELEMENT_FEEL: Record<string, string> = {
  Fire: "passionate, urgent, blazing forward motion",
  Earth: "grounded, deliberate, patient and rooted",
  Air: "weightless, conversational, intellectually shimmering",
  Water: "flowing, emotionally vast, slow tides of feeling",
};

const MODALITY_STRUCTURE: Record<string, string> = {
  Cardinal: "with bold initiating motifs that launch each section",
  Fixed: "with sustained, unwavering melodic lines that hold the center",
  Mutable: "with restless modulation, the key shifting like weather",
};

export function buildElevenLabsPrompt(
  chart: ChartData,
  qm: QuantumMelodicReading | null,
): string {
  const sun = chart.sunSign;
  const moon = chart.moonSign;
  const rising = chart.ascendant;

  const sunInstr = SIGN_INSTRUMENTATION[sun] ?? "warm orchestral textures";
  const moonInstr = SIGN_INSTRUMENTATION[moon] ?? "atmospheric pads";
  const risingInstr = SIGN_INSTRUMENTATION[rising] ?? "subtle rhythmic foundation";

  const key = qm?.overallKey ?? "D minor";
  const tempo = qm?.overallTempo ?? 90;
  const element = qm?.dominantElement ?? "Fire";
  const modality = qm?.dominantModality ?? "Cardinal";

  const elementFeel = ELEMENT_FEEL[element] ?? "deeply resonant";
  const modalityStructure = MODALITY_STRUCTURE[modality] ?? "with evolving harmonic motion";

  // Aspect-driven texture
  const aspectCount = qm?.aspects.length ?? 0;
  const harmonics = qm?.aspects ?? [];
  const tensions = harmonics.filter((a) =>
    ["Square", "Opposition"].includes(a.aspectType.name),
  ).length;
  const harmonies = harmonics.filter((a) =>
    ["Trine", "Sextile", "Conjunction"].includes(a.aspectType.name),
  ).length;

  const tensionDescriptor =
    tensions > harmonies
      ? "carrying dramatic tritones and dissonant suspensions that resolve only at the final cadence"
      : harmonies > tensions
      ? "weaving consonant trines and golden harmonic intervals throughout"
      : "balancing dissonance and resolution in a continuous emotional dialogue";

  return [
    `A two-minute cinematic instrumental composition in ${key} at ${tempo} BPM.`,
    `Lead voice: ${sunInstr} (the Sun in ${sun}).`,
    `Inner emotional layer: ${moonInstr} (the Moon in ${moon}).`,
    `Rhythmic foundation: ${risingInstr} (${rising} rising).`,
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    `${aspectCount} planetary aspects ${tensionDescriptor}.`,
    `Build slowly from a single melodic seed into a full ensemble, then dissolve back into stillness. No vocals, no lyrics, purely instrumental.`,
  ].join(" ");
}
