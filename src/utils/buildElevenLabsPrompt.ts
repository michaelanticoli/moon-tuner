// Translates a natal chart into an evocative ElevenLabs music prompt.
// The aesthetic family is CHOSEN by the chart (sun sign + dominant
// element + modality) from a wide palette — neo-classical, ambient
// jazz, folk-pastoral, post-rock, cinematic world, trip-hop downtempo,
// chamber baroque, modular electronic, choral, etc. Tonal but never
// generic; each chart should feel like its own record.
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

// Each sign carries TWO instrumental voices. We deliberately spread
// across families (strings, woodwinds, brass, voice, world, electronic)
// so no two charts pull from the same well.
const SIGN_VOICES: Record<string, { lead: string; counter: string }> = {
  Aries:       { lead: "punchy brass stabs, taiko-style low toms, and bowed double bass with rosin grit", counter: "distorted analog synth bass and a driving motorik pulse" },
  Taurus:      { lead: "warm cello ensemble, fingerpicked nylon guitar, and a single hammered dulcimer", counter: "deep wooden hand-percussion and slow earthen drone bass" },
  Gemini:      { lead: "playful clarinet and flute duets weaving with pizzicato violin", counter: "fast sequenced glass-marimba arpeggios and granular vocal chops" },
  Cancer:      { lead: "intimate felt piano, solo cello, and a wordless soprano humming far in the distance", counter: "tape-saturated ambient pads and a soft pulsing heartbeat kick" },
  Leo:         { lead: "soaring full string section, French horn fanfares, and bright grand piano", counter: "anthemic supersaw pads and a confident half-time backbeat" },
  Virgo:       { lead: "fingerpicked classical guitar, oboe, music-box bells, and harpsichord filigree", counter: "intricate sequenced arpeggios and tight rim-shot percussion" },
  Libra:       { lead: "solo violin and Rhodes electric piano in conversation, with brushed jazz drums", counter: "shimmering vibraphone and gentle filtered chamber pads" },
  Scorpio:     { lead: "low cellos, contrabassoon, prepared piano, and a distant choir on long held notes", counter: "throbbing analog sub-bass, distorted drones, and a slow techno pulse" },
  Sagittarius: { lead: "fiddle, mandolin, acoustic guitar, hand drums, and bright trumpet flourishes", counter: "uplifting arpeggiated synths and a galloping tribal kick pattern" },
  Capricorn:   { lead: "stately cellos, double bass, French horn, and church-organ-like piano", counter: "sparse minimal-techno pulse and slow-evolving Moog bass" },
  Aquarius:    { lead: "glassy electric piano, bowed vibraphone, and a wordless choir treated with stutter edits", counter: "icy modular synths, glitch percussion, and IDM-style fragmented beats" },
  Pisces:      { lead: "reverb-soaked felt piano, oceanic string swells, and a far-off saxophone breath", counter: "ambient tape loops, pitched-down pads, and a barely-there downtempo pulse" },
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

// Aesthetic FAMILIES — chosen per chart, not hardcoded. Each one is
// melodic and tonal (no atonal collage), but pulls from a distinct
// production tradition so charts genuinely sound different from each other.
const AESTHETIC_FAMILIES = [
  {
    name: "neo-classical electronic",
    anchor: "Aesthetic target: neo-classical electronic in the lineage of Ólafur Arnalds, Nils Frahm, and Hania Rani — close-mic'd felt piano, intimate strings, and warm analog electronics.",
    elements: ["Water", "Air"],
  },
  {
    name: "cinematic post-rock",
    anchor: "Aesthetic target: cinematic post-rock and modern classical in the lineage of Sigur Rós, Explosions in the Sky, and Jóhann Jóhannsson — bowed guitars, slow-build orchestration, and patient crescendos.",
    elements: ["Fire", "Water"],
  },
  {
    name: "ambient jazz",
    anchor: "Aesthetic target: ambient jazz and ECM-style chamber jazz in the lineage of GoGo Penguin, Nils Petter Molvær, and Bohren & der Club of Gore — brushed drums, upright bass, muted trumpet, and Rhodes.",
    elements: ["Air", "Water"],
  },
  {
    name: "folk-pastoral chamber",
    anchor: "Aesthetic target: folk-pastoral chamber music in the lineage of Penguin Cafe, Iron & Wine instrumentals, and early Andrew Bird — fingerpicked strings, woodwinds, hand percussion, and natural room sound.",
    elements: ["Earth", "Air"],
  },
  {
    name: "modular ambient",
    anchor: "Aesthetic target: modular and generative ambient in the lineage of Brian Eno, Kaitlyn Aurelia Smith, and Suzanne Ciani — patient evolving timbres, no obvious downbeat, immersive stereo field.",
    elements: ["Air", "Water"],
  },
  {
    name: "trip-hop downtempo",
    anchor: "Aesthetic target: cinematic trip-hop and downtempo in the lineage of Bonobo, Cinematic Orchestra, and Emancipator — dusty broken-beat drums, upright bass, jazz piano fragments, and lush string samples.",
    elements: ["Earth", "Water"],
  },
  {
    name: "world-cinematic",
    anchor: "Aesthetic target: world-cinematic in the lineage of Lisa Gerrard, Dead Can Dance, and Hans Zimmer's quieter scores — wordless vocals, hand percussion, hammered dulcimer, ney flute, and orchestral swells.",
    elements: ["Fire", "Earth"],
  },
  {
    name: "chamber baroque",
    anchor: "Aesthetic target: contemporary chamber-baroque in the lineage of Max Richter's Vivaldi recompositions, Bryce Dessner, and Nico Muhly — string quartet, harpsichord, and minimalist counterpoint.",
    elements: ["Earth", "Fire"],
  },
] as const;

// Deterministic-but-chart-specific signature — same chart re-renders
// land in the same family, different charts spread across families.
function chartSignature(chart: ChartData): number {
  const str = `${chart.sunSign}|${chart.moonSign}|${chart.ascendant}|${chart.planets.map(p => `${p.name}${Math.round(p.degree)}${p.sign}`).join(",")}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickAestheticFamily(chart: ChartData, dominantElement: string) {
  // Prefer families whose elemental affinity matches the chart's dominant
  // element, then disambiguate by chart signature so charts with the same
  // element still spread across multiple families.
  const matches = AESTHETIC_FAMILIES.filter(f => (f.elements as readonly string[]).includes(dominantElement));
  const pool = matches.length > 0 ? matches : AESTHETIC_FAMILIES;
  return pool[chartSignature(chart) % pool.length];
}

export function buildElevenLabsPrompt(
  chart: ChartData,
  qm: QuantumMelodicReading | null,
): string {
  const sun = chart.sunSign;
  const moon = chart.moonSign;
  const rising = chart.ascendant;

  const sunVoice    = SIGN_VOICES[sun]    ?? { lead: "felt piano and warm strings",  counter: "subtle analog pads" };
  const moonVoice   = SIGN_VOICES[moon]   ?? { lead: "solo cello",                    counter: "ambient tape textures" };
  const risingVoice = SIGN_VOICES[rising] ?? { lead: "pizzicato strings",             counter: "soft pulsing rhythm" };

  const key      = qm?.overallKey       ?? "D minor";
  const tempo    = qm?.overallTempo     ?? 90;
  const element  = qm?.dominantElement  ?? "Water";
  const modality = qm?.dominantModality ?? "Mutable";

  const elementFeel       = ELEMENT_FEEL[element]        ?? "deeply resonant";
  const modalityStructure = MODALITY_STRUCTURE[modality] ?? "with evolving harmonic motion";
  const family            = pickAestheticFamily(chart, element);

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

  // Tempo-aware rhythm directive — slower charts get nearly beatless,
  // faster charts get more pulse. Always tonal, never EDM.
  const rhythmDirective =
    tempo < 75
      ? "Rhythm is almost beatless — only breath, room tone, and the occasional soft mallet or brushed cymbal marking time. No drum machine."
      : tempo > 110
      ? "Rhythm is alive and propulsive but organic — hand percussion, brushed kit, or a warm sequenced pulse that breathes rather than thumps. No EDM drops, no trap hi-hats."
      : "Rhythm is subtle and evolving — soft processed percussion fades in and out across the piece, more textural than driving, sometimes vanishing entirely. No generic four-on-the-floor club beat.";

  const structureDirective =
    "Structure is a clear three-act journey: (1) a single fragile melodic seed on the lead voice, " +
    "(2) gradual layering into a shimmering full-ensemble climax, " +
    "(3) a graceful dissolution back into stillness with one last echoing motif. Each section must feel distinct, not loop-based.";

  return [
    `A two-minute instrumental composition in ${key} at approximately ${tempo} BPM, in the ${family.name} tradition.`,
    family.anchor,
    `Lead voice (the Sun in ${sun}): ${sunVoice.lead}, shadowed by ${sunVoice.counter}.`,
    `Inner emotional layer (the Moon in ${moon}): ${moonVoice.lead}, with ${moonVoice.counter} drifting underneath.`,
    `Atmospheric foundation (${rising} rising): ${risingVoice.lead}, supported by ${risingVoice.counter}.`,
    `Overall feel is ${elementFeel}, ${modalityStructure}.`,
    `${aspects.length} planetary aspects shape the harmony, ${harmonicCharacter}.`,
    rhythmDirective,
    structureDirective,
    "Tonal and melodic throughout — emotionally rich, never atonal collage. Purely instrumental. No vocals with lyrics, no spoken word, no commercial pop production, no dubstep, no trance.",
  ].join(" ");
}
