/**
 * Harmonic Profile — Archetype Engine
 *
 * Six archetypes derived from six reflective dimensions:
 *   pace · rhythm · friction · ideation · energy · decision
 *
 * Scoring is additive. The archetype with the highest score wins.
 * Ties are broken by the order of the ARCHETYPES array.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArchetypeKey =
  | "sustained-arc"
  | "emergent-burst"
  | "threshold-tender"
  | "deliberate-pulse"
  | "recursive-architect"
  | "open-field";

export interface HarmonicArchetype {
  key: ArchetypeKey;
  title: string;
  tagline: string;
  rhythmDescription: string;
  directiveStyle: string;
  suggestedPractices: string[];
  emotionalTendencies: string[];
  timingPosture: string;
}

export interface PromptOption {
  text: string;
  scores: Partial<Record<ArchetypeKey, number>>;
}

export interface HarmonicPrompt {
  id: number;
  question: string;
  subtext?: string;
  options: PromptOption[];
}

// ─── Archetypes ───────────────────────────────────────────────────────────────

export const ARCHETYPES: Record<ArchetypeKey, HarmonicArchetype> = {
  "sustained-arc": {
    key: "sustained-arc",
    title: "The Sustained Arc",
    tagline: "Deep current. Long game.",
    rhythmDescription:
      "You work at a pace most people mistake for slowness — but you're not slow, you're building something structurally sound. Your best work requires a long runway. Ideas deepen under sustained attention, not pressure.",
    directiveStyle:
      "Protect long uninterrupted windows. Resist the impulse to produce before the idea has matured. Trust the quiet phases — they are not stalls, they are accumulation.",
    suggestedPractices: [
      "Block two-week sprints with defined endpoints — not daily tasks",
      "Keep a private thread for ideas that need to breathe before surfacing",
      "End each work session with a brief 'where this is going' note",
      "Create rituals that mark transitions between deep work and rest",
    ],
    emotionalTendencies: [
      "Underestimates progress because it feels like normal movement",
      "Gets disrupted by urgency that belongs to other people's timelines",
      "Finds premature sharing deflating rather than energizing",
      "Recovers slowly from interruptions to deep focus",
    ],
    timingPosture:
      "You move in long tidal rhythms. Honor them. Your timing advantage is depth — you see the end of things clearly from the beginning.",
  },

  "emergent-burst": {
    key: "emergent-burst",
    title: "The Emergent Burst",
    tagline: "Compressed force. Explosive clarity.",
    rhythmDescription:
      "Your energy arrives in surges — quiet incubation followed by periods of high-velocity output that surprise even you. The stillness isn't absence; it's loading. You don't build linearly — you detonate.",
    directiveStyle:
      "Stop trying to sustain what wants to be episodic. Design your life around cycles of intensity and recovery. When a surge arrives, honor it completely — cancel everything else.",
    suggestedPractices: [
      "Track the lead-up conditions to your best creative bursts",
      "Build a 'runway list' of tasks ready to execute when momentum hits",
      "Give yourself explicit permission for the quiet phases in between",
      "Set external commitments that create productive urgency",
    ],
    emotionalTendencies: [
      "Feels guilt or anxiety during low-energy phases",
      "Makes ambitious commitments during peaks that strain quiet periods",
      "Experiences ideas as urgent and immediately shareable",
      "Chafes under steady-pace expectations",
    ],
    timingPosture:
      "Your timing is episodic, not linear. The gap between bursts is not failure — it is the pressure that makes the next one possible.",
  },

  "threshold-tender": {
    key: "threshold-tender",
    title: "The Threshold Tender",
    tagline: "Liminal intelligence. Reads the room before entering.",
    rhythmDescription:
      "You have a rare capacity for sensing when conditions are ready — and when they are not. You move through thresholds with care, which others misread as hesitation. It isn't. It's calibration.",
    directiveStyle:
      "Name your thresholds explicitly. Define what 'ready' means so you can recognize it rather than perpetually feel its absence. You do not need more time — you need clearer criteria.",
    suggestedPractices: [
      "Write a brief 'readiness checklist' before beginning anything significant",
      "Practice committing before all conditions feel perfect",
      "Identify whose urgency you are absorbing — and separate it from your own",
      "Build transition rituals that signal a shift in context to your nervous system",
    ],
    emotionalTendencies: [
      "High sensitivity to misaligned environments — cannot perform in the wrong container",
      "Absorbs ambient tension from others without noticing",
      "Takes on more responsibility for collective readiness than belongs to you",
      "Senses the end of things before others are ready to acknowledge them",
    ],
    timingPosture:
      "You are most accurate at the edge of transitions. Trust that — and use it to position yourself at moments of change others haven't seen coming yet.",
  },

  "deliberate-pulse": {
    key: "deliberate-pulse",
    title: "The Deliberate Pulse",
    tagline: "Structure as intelligence. Ritual as leverage.",
    rhythmDescription:
      "You do not fight rhythm — you build it. Your best work emerges from scaffolding: routines, frameworks, and rituals that reduce the cognitive cost of each decision. Consistency is not a limitation for you — it is a power move.",
    directiveStyle:
      "Invest in your infrastructure before investing in your output. The quality of your systems directly predicts the quality of your results. Build the container before filling it.",
    suggestedPractices: [
      "Design a weekly architecture with protected blocks for different work types",
      "Create anchoring rituals that reliably shift you into productive states",
      "Use templates for recurring decisions to preserve energy for the important ones",
      "Audit your commitments quarterly — remove anything that disrupts your rhythm",
    ],
    emotionalTendencies: [
      "Becomes anxious when routine is disrupted without adequate notice",
      "Undervalues its own consistency — mistakes steadiness for mediocrity",
      "Finds open-ended creative ambiguity draining rather than exciting",
      "Experiences friction as a structural failure to be solved, not tolerated",
    ],
    timingPosture:
      "Your timing advantage is reliability. You produce when others stall because your systems carry you through the low-energy days. That compounding effect is quiet but formidable.",
  },

  "recursive-architect": {
    key: "recursive-architect",
    title: "The Recursive Architect",
    tagline: "Maps the whole before laying the first stone.",
    rhythmDescription:
      "You think in structures. Before anything is built, you need its full topology — the relationships, the failure points, the elegance of the underlying logic. This slows your starts but makes everything you produce remarkably coherent.",
    directiveStyle:
      "Set a boundary on the mapping phase. Give your analytical process a deadline and honor it. The architecture is never complete — at some point, execution reveals what planning cannot.",
    suggestedPractices: [
      "Define a 'good enough to act' standard before beginning any project",
      "Keep an 'ideas under construction' space separate from your 'ready to build' space",
      "Practice shipping imperfect drafts as a deliberate training protocol",
      "Share work in progress with someone who gives useful early feedback",
    ],
    emotionalTendencies: [
      "Experienced by others as withholding when actually still building internal models",
      "Perfectionism that originates from a coherence drive, not fear",
      "Difficulty moving on from something before it feels fully resolved",
      "Deep satisfaction in the moment a complex structure finally clicks into place",
    ],
    timingPosture:
      "You are slowest at the start and fastest at the finish. If you can survive the beginning — the discomfort of not yet knowing the shape — the work often arrives fully formed.",
  },

  "open-field": {
    key: "open-field",
    title: "The Open Field",
    tagline: "Context-intelligent. Arrives where needed.",
    rhythmDescription:
      "You operate through attunement — to the room, the moment, the person in front of you. Your productivity isn't driven by routine or system; it's driven by signal. When the environment is right, you are extraordinarily capable. When it isn't, nothing works.",
    directiveStyle:
      "Design your environment before you design your output. Your primary leverage point is context, not effort. Optimize who is in the room, what the space feels like, and how much ambient pressure exists.",
    suggestedPractices: [
      "Identify two or three environments that consistently bring out your best work",
      "Use conversation as a legitimate thinking tool — not just for sharing",
      "Build a pre-work environment scan: what is this space asking of me?",
      "Reduce solo processing time by talking ideas through with trusted others",
    ],
    emotionalTendencies: [
      "Absorbs the emotional weather of environments without always realizing it",
      "Makes fast decisions that prove right in ways that are difficult to explain later",
      "Undervalues own contributions because they feel effortless in the right context",
      "Loses confidence in sterile or misaligned environments",
    ],
    timingPosture:
      "Your best moments arrive through context, not planning. Get yourself into the right rooms. Stop trying to manufacture the conditions — learn to recognize them.",
  },
};

// ─── Prompts ──────────────────────────────────────────────────────────────────

export const PROMPTS: HarmonicPrompt[] = [
  {
    id: 1,
    question: "When you're working on something that genuinely matters to you, what's your natural movement?",
    subtext: "Underneath any external pressure — what is your actual rhythm?",
    options: [
      {
        text: "I build slowly and steadily. The work deepens over time.",
        scores: { "sustained-arc": 3, "deliberate-pulse": 1 },
      },
      {
        text: "I move in surges — quiet, then intensely on, then I need recovery.",
        scores: { "emergent-burst": 3, "open-field": 1 },
      },
      {
        text: "I wait for the right conditions before I can really begin.",
        scores: { "threshold-tender": 3, "recursive-architect": 1 },
      },
      {
        text: "I work best inside clear structure and recurring ritual.",
        scores: { "deliberate-pulse": 3, "sustained-arc": 1 },
      },
    ],
  },
  {
    id: 2,
    question: "When you feel friction or resistance in your work, you typically...",
    subtext: "Honest answer — not what you think you should do.",
    options: [
      {
        text: "Pause and wait. I trust that friction has something to tell me.",
        scores: { "threshold-tender": 3, "sustained-arc": 1 },
      },
      {
        text: "Push through with more force. Resistance is something to overcome.",
        scores: { "emergent-burst": 3 },
      },
      {
        text: "Rethink the whole approach before continuing.",
        scores: { "recursive-architect": 3, "threshold-tender": 1 },
      },
      {
        text: "Return to my fundamentals — a routine or method that grounds me.",
        scores: { "deliberate-pulse": 3, "sustained-arc": 1 },
      },
    ],
  },
  {
    id: 3,
    question: "Your relationship with completion...",
    subtext: "What's actually true for you when something is 'done'?",
    options: [
      {
        text: "I often move on before it's finished — ideas feel more alive in motion.",
        scores: { "open-field": 3, "emergent-burst": 1 },
      },
      {
        text: "I need to feel the full arc — beginning, middle, and close.",
        scores: { "sustained-arc": 3, "deliberate-pulse": 1 },
      },
      {
        text: "Completion feels premature. I'd rather keep refining.",
        scores: { "recursive-architect": 3, "threshold-tender": 1 },
      },
      {
        text: "I complete efficiently and move on — closure is easy for me.",
        scores: { "deliberate-pulse": 2, "emergent-burst": 1 },
      },
    ],
  },
  {
    id: 4,
    question: "When a new idea arrives, your first instinct is...",
    subtext: "Before you've had time to think about the 'right' response.",
    options: [
      {
        text: "Let it sit. I'll come back when it's had time to clarify itself.",
        scores: { "threshold-tender": 3, "sustained-arc": 1 },
      },
      {
        text: "Share it or test it immediately — ideas need contact to grow.",
        scores: { "emergent-burst": 3, "open-field": 1 },
      },
      {
        text: "Map it privately — I need to understand its full shape before I act.",
        scores: { "recursive-architect": 3 },
      },
      {
        text: "Fit it into an existing framework or system.",
        scores: { "deliberate-pulse": 3, "recursive-architect": 1 },
      },
    ],
  },
  {
    id: 5,
    question: "Your productive energy tends to...",
    subtext: "Over months, not just days.",
    options: [
      {
        text: "Rise and fall with context — I'm highly responsive to my environment.",
        scores: { "open-field": 3, "threshold-tender": 1 },
      },
      {
        text: "Sit below the surface most of the time, surfacing in powerful waves.",
        scores: { "threshold-tender": 2, "sustained-arc": 2 },
      },
      {
        text: "Run at a steady, even pace with predictable peaks.",
        scores: { "sustained-arc": 2, "deliberate-pulse": 2 },
      },
      {
        text: "Spike unpredictably — I can't always anticipate when I'll be fully on.",
        scores: { "emergent-burst": 3, "open-field": 1 },
      },
    ],
  },
  {
    id: 6,
    question: "Your best decisions tend to arrive...",
    subtext: "Not the decisions you're proud of — the ones that actually hold.",
    options: [
      {
        text: "After waiting for the right moment, even if others think I'm slow.",
        scores: { "threshold-tender": 3, "sustained-arc": 1 },
      },
      {
        text: "After I've exhausted the information — analysis before action.",
        scores: { "recursive-architect": 3, "deliberate-pulse": 1 },
      },
      {
        text: "In conversation — I think best in dialogue, not isolation.",
        scores: { "open-field": 3, "emergent-burst": 1 },
      },
      {
        text: "Quickly and intuitively — my first read usually holds.",
        scores: { "emergent-burst": 2, "open-field": 2 },
      },
    ],
  },
];

// ─── Scoring Engine ───────────────────────────────────────────────────────────

type AnswerMap = Record<number, number>; // promptId → optionIndex

/** Minimum score for a dimension to surface as a detected pattern. */
const PATTERN_THRESHOLD = 3;

function calculateArchetypeScores(answers: AnswerMap): Record<ArchetypeKey, number> {
  const totals: Record<ArchetypeKey, number> = {
    "sustained-arc": 0,
    "emergent-burst": 0,
    "threshold-tender": 0,
    "deliberate-pulse": 0,
    "recursive-architect": 0,
    "open-field": 0,
  };

  for (const prompt of PROMPTS) {
    const selectedIndex = answers[prompt.id];
    if (selectedIndex === undefined) continue;
    const option = prompt.options[selectedIndex];
    if (!option) continue;
    for (const [key, pts] of Object.entries(option.scores)) {
      totals[key as ArchetypeKey] += pts;
    }
  }

  return totals;
}

export function scoreAnswers(answers: AnswerMap): HarmonicArchetype {
  const totals = calculateArchetypeScores(answers);

  // Find the highest-scoring archetype
  let best: ArchetypeKey = "sustained-arc";
  let bestScore = -1;
  for (const [key, score] of Object.entries(totals)) {
    if (score > bestScore) {
      bestScore = score;
      best = key as ArchetypeKey;
    }
  }

  return ARCHETYPES[best];
}

// ─── Detected Patterns ────────────────────────────────────────────────────────

/**
 * Returns a set of inferred behavioral patterns based on answers,
 * shown during the "Pattern Identification" step.
 */
export function detectPatterns(answers: AnswerMap): string[] {
  const totals = calculateArchetypeScores(answers);

  const patterns: string[] = [];

  if (totals["sustained-arc"] >= PATTERN_THRESHOLD)
    patterns.push("Depth-first orientation — you work in layers, not sprints");
  if (totals["emergent-burst"] >= PATTERN_THRESHOLD)
    patterns.push("Surge-cycle rhythm — intensity followed by necessary recovery");
  if (totals["threshold-tender"] >= PATTERN_THRESHOLD)
    patterns.push("High environmental sensitivity — context shapes your output");
  if (totals["deliberate-pulse"] >= PATTERN_THRESHOLD)
    patterns.push("System-dependent productivity — structure is a performance tool");
  if (totals["recursive-architect"] >= PATTERN_THRESHOLD)
    patterns.push("Pre-execution mapping — you build the model before the object");
  if (totals["open-field"] >= PATTERN_THRESHOLD)
    patterns.push("Dialogic intelligence — ideas arrive through relational exchange");

  // Always return 3–4 patterns
  if (patterns.length < 3) {
    // Pull from secondary scores
    const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a);
    const fallbacks: Record<ArchetypeKey, string> = {
      "sustained-arc": "Accumulative momentum — slow to start, hard to stop",
      "emergent-burst": "Episodic energy — productive in concentrated windows",
      "threshold-tender": "Transitional awareness — attuned to beginnings and endings",
      "deliberate-pulse": "Ritual leverage — consistency compounds quietly",
      "recursive-architect": "Structural coherence — you need the whole before the part",
      "open-field": "Contextual adaptability — your environment is your instrument",
    };
    for (const [key] of sorted) {
      const fallback = fallbacks[key as ArchetypeKey];
      if (!patterns.includes(fallback)) patterns.push(fallback);
      if (patterns.length >= 4) break;
    }
  }

  return patterns.slice(0, 4);
}
