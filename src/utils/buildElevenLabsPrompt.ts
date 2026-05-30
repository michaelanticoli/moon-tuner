// Translates a natal chart into an ElevenLabs music prompt with a
// consistent aesthetic family: avant-garde, expressive, emotive
// SOLO-PIANO-led composition, augmented with tasteful electronic
// textures, chamber instruments, and SUBDUED modern percussion.
//
// Explicitly steered AWAY from cinematic/heroic/video-game sweeps,
// cymbal swells, supersaw walls, and trailer-music crescendos.
// Steered TOWARD: innovative chord progressions, intricate
// counterpoint, intentional dissonance, dynamic micro-shifts, and
// intuitive alignment with the chart's actual harmonic data.
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

// Each sign now contributes a TEXTURAL color that augments the piano
// — chamber, electronic, or organic — never a brass fanfare or
// orchestral swell. Piano is always the protagonist.
const SIGN_TEXTURE: Record<string, string> = {
  Aries:       "a single muted upright bass pluck and a soft brushed snare keeping irregular time",
  Taurus:      "warm cello drones and a low felt-mallet on a hand drum, woody and earthen",
  Gemini:      "clarinet fragments and granular vocal chops weaving between the piano lines",
  Cancer:      "a wordless soprano humming far in the distance and tape-saturated room tone",
  Leo:         "a single warm Rhodes chord answering the piano, and a soft kick like a heartbeat",
  Virgo:       "prepared-piano filigree, music-box bells, and tight rim-tap percussion",
  Libra:       "solo violin in conversation with the piano, and brushed jazz drums kept very low",
  Scorpio:     "low cellos, prepared-piano resonances, and a throbbing analog sub-bass drone",
  Sagittarius: "fingerpicked acoustic guitar and a loose shaker, organic and unhurried",
  Capricorn:   "double bass arco notes and sparse minimal-techno clicks, austere and patient",
  Aquarius:    "bowed vibraphone, glitch percussion fragments, and icy modular synth tones",
  Pisces:      "reverb-soaked oceanic pads and a far-off saxophone breath, almost ambient",
};

const ELEMENT_FEEL: Record<string, string> = {
  Fire:  "restless and forward-leaning, with sudden rhythmic shifts and rubato accelerations",
  Earth: "grounded and patient, built from repetition that slowly morphs through inner-voice movement",
  Air:   "weightless and curious, melodies tumbling between hands with frequent register changes",
  Water: "flowing in long emotional tides, with generous space and pedal-blur between phrases",
};

const MODALITY_STRUCTURE: Record<string, string> = {
  Cardinal: "with bold initiating motifs that launch each new section",
  Fixed:    "with sustained, hypnotic ostinatos that anchor the piece while harmony shifts above them",
  Mutable:  "with restless modulation, the tonal center drifting and re-centering like weather",
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

  const sunTex    = SIGN_TEXTURE[sun]    ?? "subtle analog pads under the piano";
  const moonTex   = SIGN_TEXTURE[moon]   ?? "ambient tape textures";
  const risingTex = SIGN_TEXTURE[rising] ?? "soft pulsing room tone";

  const key      = qm?.overallKey       ?? "D minor";
  const tempo    = qm?.overallTempo     ?? 90;
  const element  = qm?.dominantElement  ?? "Water";
  const modality = qm?.dominantModality ?? "Mutable";

  const elementFeel       = ELEMENT_FEEL[element]        ?? "deeply resonant";
  const modalityStructure = MODALITY_STRUCTURE[modality] ?? "with evolving harmonic motion";

  // Aspect-driven harmonic personality — this is what the piano
  // actually DOES, harmonically.
  const aspects   = qm?.aspects ?? [];
  const tensions  = aspects.filter(a => ["Square", "Opposition"].includes(a.aspectType.name)).length;
  const harmonies = aspects.filter(a => ["Trine", "Sextile", "Conjunction"].includes(a.aspectType.name)).length;
  const sigDigit  = chartSignature(chart) % 3;

  const harmonicCharacter =
    tensions > harmonies
      ? "Lean into dissonance: unresolved suspensions, biting minor-second clusters, tritone hesitations, and modal mixture. Resolutions arrive late, sideways, and sparingly."
      : harmonies > tensions
      ? "Lean into intricate consonance: extended chords (maj7♯11, min9, sus2 over add6), quartal voicings, and inner-voice counterpoint that moves like conversation."
      : "Move continuously between dissonance and resolution — neither settled nor anxious for long, with chromatic voice-leading carrying the harmony through unexpected pivots.";

  const progressionDirective = [
    "Use innovative, non-obvious chord progressions — avoid I–V–vi–IV and other pop cadences. Favor modal interchange, chromatic mediants, deceptive resolutions, and quartal/quintal stacks.",
    "Use angular, surprising harmonic motion — borrow from Debussy, Ravel, Messiaen, and modern jazz reharmonization. Allow brief moments of bitonality.",
    "Use slow-burn harmonic evolution — long pedal points underneath shifting upper-voice chords, with occasional pivot to a distant key center and back.",
  ][sigDigit];

  // Tempo-aware rhythm directive — ALWAYS subdued percussion, never
  // cinematic.
  const rhythmDirective =
    tempo < 75
      ? "Rhythm is almost beatless — rubato piano breathing freely, only the faintest brushed texture or felt-mallet pulse marking time. No drum kit fills, no cymbal swells."
      : tempo > 110
      ? "Rhythm is alive but restrained — soft brushed drums, finger-snaps, or a warm sequenced click that supports the piano without ever overpowering it. No big builds, no cymbal crashes."
      : "Rhythm is subtle and intermittent — soft processed percussion enters and recedes, more textural than driving, sometimes vanishing entirely for long passages. Never a four-on-the-floor groove.";

  const structureDirective =
    "Structure is intuitive and through-composed, not loop-based: a fragile opening motif on solo piano, a middle section where electronic textures and a second instrumental voice gradually answer the piano, brief moments of harmonic surprise, and a quiet dissolution. No trailer-style climax, no orchestral swell, no heroic key change.";

  return [
    `A two-minute-twenty instrumental composition in ${key} at approximately ${tempo} BPM.`,
    "Aesthetic: avant-garde, expressive, emotive solo-piano-led composition in the lineage of Nils Frahm, Hania Rani, Ólafur Arnalds' chamber work, late Sakamoto, Chilly Gonzales' solo piano, and Nils Petter Molvær's quieter electronic-acoustic hybrids.",
    "The PIANO is always the protagonist — felt piano or close-mic'd upright with audible mechanism, prepared-piano touches allowed. All other instrumentation supports, never overshadows.",
    `Sun voice (${sun}) adds: ${sunTex}.`,
    `Moon voice (${moon}) adds: ${moonTex}.`,
    `Rising voice (${rising}) adds: ${risingTex}.`,
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    `${aspects.length} planetary aspects shape the harmony. ${harmonicCharacter}`,
    progressionDirective,
    rhythmDirective,
    structureDirective,
    "Tonal but adventurous — intricate melodies, surprising harmonic turns, intentional dissonance treated as expressive color. Purely instrumental, no vocals with lyrics, no spoken word.",
    "STRICTLY AVOID: cinematic trailer music, sweeping orchestral swells, heroic French-horn fanfares, video-game-score crescendos, cymbal crashes, supersaw pads, EDM drops, dubstep, trance, four-on-the-floor club beats, pop song structure, and any 'epic' build.",
  ].join(" ");
}
