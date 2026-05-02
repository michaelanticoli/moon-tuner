// Translates a natal chart into an evocative ElevenLabs music prompt.
// Aesthetic target: neo-classical + electronic hybrid (Ólafur Arnalds,
// Nils Frahm, Max Richter, Jon Hopkins, Hania Rani). Felt piano and
// strings as the emotional core, layered with analog synth pads,
// arpeggiated sequences, and subtle evolving rhythm. The chart's
// signs / element / aspects shape instrumentation, key, tempo, and
// emotional arc — never generic, always cinematic and modern.
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

// Each sign maps to a LEAD acoustic/classical voice plus an
// ELECTRONIC counterpart that shadows or answers it. This guarantees
// every chart has both an organic core and a modern electronic layer.
const SIGN_VOICES: Record<string, { lead: string; electronic: string }> = {
  Aries:       { lead: "felt piano with sharp staccato attacks and bowed double bass",          electronic: "punchy analog synth bass and a four-on-the-floor pulse low in the mix" },
  Taurus:      { lead: "warm cello ensemble and close-mic'd upright piano",                       electronic: "deep sub-bass drone and slow sidechained synth swells" },
  Gemini:      { lead: "playful prepared-piano arpeggios and pizzicato violins",                  electronic: "fast sequenced synth arpeggios and granular glitch textures" },
  Cancer:      { lead: "intimate felt piano and a single solo cello",                             electronic: "tape-saturated ambient pads and a soft pulsing kick like a heartbeat" },
  Leo:         { lead: "soaring string section and bright grand piano",                           electronic: "anthemic supersaw pads and a steady half-time house pulse" },
  Virgo:       { lead: "fingerpicked classical guitar, oboe, and music-box prepared piano",       electronic: "intricate sequenced arpeggios and tight rim-shot percussion" },
  Libra:       { lead: "solo violin and chamber piano in conversation",                           electronic: "shimmering Rhodes-like electric piano and gentle filtered pads" },
  Scorpio:     { lead: "low cellos, double bass, and dark prepared piano",                        electronic: "throbbing analog sub-bass, distorted synth drones, and a slow techno pulse" },
  Sagittarius: { lead: "fiddle, acoustic guitar, and bright upright piano",                       electronic: "uplifting arpeggiated synths and a galloping electronic kick pattern" },
  Capricorn:   { lead: "stately cello, double bass, and church-like piano",                       electronic: "sparse minimal-techno pulse and slow-evolving Moog bass" },
  Aquarius:    { lead: "glassy electric piano and bowed vibraphone",                              electronic: "icy modular synths, glitch percussion, and IDM-style fragmented beats" },
  Pisces:      { lead: "reverb-soaked felt piano and oceanic string swells",                      electronic: "ambient tape loops, pitched-down pads, and a barely-there downtempo pulse" },
};

const ELEMENT_FEEL: Record<string, string> = {
  Fire:  "urgent and forward-leaning, with crescendos that swell from whisper to full ensemble",
  Earth: "grounded and patient, building through layered repetition and slow harmonic shifts",
  Air:   "weightless and curious, melodies fluttering between voices like overheard conversation",
  Water: "flowing in long emotional tides, with reverb-drenched space between phrases",
};

const MODALITY_STRUCTURE: Record<string, string> = {
  Cardinal: "with bold initiating motifs that launch each section and clear cadences",
  Fixed:    "with sustained, hypnotic ostinatos that anchor the piece while textures evolve around them",
  Mutable:  "with restless modulation, the key drifting and re-centering like weather",
};

export function buildElevenLabsPrompt(
  chart: ChartData,
  qm: QuantumMelodicReading | null,
): string {
  const sun = chart.sunSign;
  const moon = chart.moonSign;
  const rising = chart.ascendant;

  const sunVoice     = SIGN_VOICES[sun]     ?? { lead: "felt piano and warm strings",  electronic: "subtle analog pads" };
  const moonVoice    = SIGN_VOICES[moon]    ?? { lead: "solo cello",                    electronic: "ambient tape textures" };
  const risingVoice  = SIGN_VOICES[rising]  ?? { lead: "pizzicato strings",             electronic: "soft pulsing rhythm" };

  const key      = qm?.overallKey      ?? "D minor";
  const tempo    = qm?.overallTempo    ?? 90;
  const element  = qm?.dominantElement ?? "Water";
  const modality = qm?.dominantModality ?? "Mutable";

  const elementFeel       = ELEMENT_FEEL[element]       ?? "deeply resonant";
  const modalityStructure = MODALITY_STRUCTURE[modality] ?? "with evolving harmonic motion";

  // Aspect-driven harmonic personality
  const aspects   = qm?.aspects ?? [];
  const tensions  = aspects.filter(a => ["Square", "Opposition"].includes(a.aspectType.name)).length;
  const harmonies = aspects.filter(a => ["Trine", "Sextile", "Conjunction"].includes(a.aspectType.name)).length;

  const harmonicCharacter =
    tensions > harmonies
      ? "carrying unresolved suspensions, biting minor seconds, and tritone tension that finally collapses into release in the final section"
      : harmonies > tensions
      ? "weaving consonant trines, open fifths, and golden modal harmonies that feel inevitable and warm"
      : "moving between dissonance and resolution in a continuous emotional dialogue, neither comfortable nor anxious for long";

  // Rhythm directive — subtle, evolving, never generic loop
  const rhythmDirective =
    "Rhythm is subtle and evolving: a soft pulsing electronic kick or processed percussion fades in and out across the piece, " +
    "more textural than driving, sometimes vanishing entirely to leave only the acoustic core, then re-entering with new arpeggiated patterns. " +
    "Avoid any generic four-on-the-floor club beat, avoid trap hi-hats, avoid EDM drops.";

  // Structural directive — guarantees narrative arc
  const structureDirective =
    "Structure is a clear three-act journey: (1) a single fragile melodic seed on solo felt piano, " +
    "(2) gradual layering of strings, electronics, and rhythm into a shimmering full-ensemble climax, " +
    "(3) a graceful dissolution back into stillness with one last echoing motif. Each section must feel distinct, not loop-based.";

  // Aesthetic anchor — names the genre target so ElevenLabs locks the style
  const aestheticAnchor =
    "Aesthetic target: neo-classical electronic in the lineage of Ólafur Arnalds, Nils Frahm, Max Richter, Jon Hopkins, and Hania Rani. " +
    "Cinematic, modern, emotionally intelligent. Acoustic instruments are close-mic'd and intimate — you can hear felt hammers and bow noise. " +
    "Electronic elements are analog and warm, never plasticky or trance-like.";

  return [
    `A two-minute neo-classical electronic instrumental composition in ${key} at approximately ${tempo} BPM.`,
    aestheticAnchor,
    `Lead voice (the Sun in ${sun}): ${sunVoice.lead}, shadowed by ${sunVoice.electronic}.`,
    `Inner emotional layer (the Moon in ${moon}): ${moonVoice.lead}, with ${moonVoice.electronic} drifting underneath.`,
    `Atmospheric foundation (${rising} rising): ${risingVoice.lead}, supported by ${risingVoice.electronic}.`,
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    `${aspects.length} planetary aspects shape the harmony, ${harmonicCharacter}.`,
    rhythmDirective,
    structureDirective,
    "Purely instrumental. No vocals, no lyrics, no spoken word. No drum-machine cliches, no dubstep, no commercial pop production.",
  ].join(" ");
}
