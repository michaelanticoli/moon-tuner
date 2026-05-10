/**
 * Moontuner Brand System
 *
 * Single source of truth for brand positioning, narrative, vocabulary,
 * voice/tone guidelines, ecosystem pillars, and social strategy.
 *
 * Moontuner IS:
 *   A reflective operating system for emotionally intelligent people
 *   navigating timing, identity, attention, and modern life.
 *
 * Moontuner IS NOT:
 *   An astrology gimmick, a manifestation brand, a productivity platform,
 *   a spiritual influencer ecosystem, or a "wellness startup."
 */

// ─── Brand Positioning ────────────────────────────────────────────────────────

export const brandPositioning = {
  /** One-sentence definition */
  coreDefinition:
    "A reflective operating system for emotionally intelligent people navigating timing, identity, attention, and modern life.",

  /** Public-facing tagline */
  tagline: "A timing system for people tired of forcing life out of rhythm.",

  /** Secondary taglines — contextual alternatives */
  alternativeTaglines: [
    "Navigate with better timing. Not harder force.",
    "A contemplative interface for living more consciously within uncertainty.",
    "Emotional intelligence meets reflective technology.",
    "Understand your rhythm. Trust your timing.",
  ],

  /** Positioning statement — internal compass */
  positioningStatement:
    "Moontuner sits at the intersection of emotional regulation, timing awareness, reflective technology, intentional living, creative rhythm, digital mindfulness, and longitudinal self-observation.",

  /** The feeling the brand evokes */
  emotionalQuality:
    "Like someone who has deeply observed life — not someone pretending to transcend it.",

  /** Adjacent territory Moontuner inhabits */
  culturalIntersections: [
    "emotional regulation",
    "timing awareness",
    "reflective technology",
    "intentional living",
    "creative rhythm",
    "digital mindfulness",
    "longitudinal self-observation",
  ],

  /** Who the brand speaks to */
  audience: [
    "Creatives and thinkers",
    "Emotionally aware professionals",
    "Overstimulated digital natives",
    "People seeking rhythm rather than optimization",
    "Anyone navigating attention, identity, and uncertain timing",
  ],
} as const;

// ─── Brand Story ──────────────────────────────────────────────────────────────

export const brandStory = {
  /** Founding narrative — two to three paragraphs */
  narrative: [
    "Most of us were taught to treat time as a flat surface — a grid of equal days to be filled and optimized. But lived experience doesn't feel flat. It moves in rhythms. Energy rises and falls. Clarity arrives in waves. Decisions that feel obvious in one week feel impossible the next. We are not machines on a fixed schedule. We are biological, emotional creatures embedded in cycles we rarely pause to notice.",
    "Moontuner was built for that pause. Not as an escape from the demands of modern life, but as a way of moving through them with better calibration. When you understand your own rhythms — the patterns of your attention, your emotional weather, the timing of your best thinking — you stop fighting yourself and start working with the current that's already moving.",
    "This is not astrology as prediction. It is reflection as practice. The moon is not telling you what to do. It is offering a reliable rhythm against which to observe your own. Moontuner is the system that holds those observations over time — and gives them back to you when you need them most.",
  ],

  /** The problem Moontuner addresses */
  problemStatement:
    "Modern life fragments attention, compresses time, and rewards constant acceleration. We lose the ability to observe our own patterns — and with it, the capacity to move with any sense of internal coherence or timing.",

  /** The emotional need beneath the system */
  emotionalNeed:
    "People don't just want to be more productive. They want to feel like they are moving in the right direction at the right pace — and that their inner life is being witnessed, not suppressed.",

  /** How reflective pacing restores clarity */
  resolutionStatement:
    "Reflective pacing — the practice of observing your patterns over time — restores what fragmentation takes away: a sense of rhythm, coherence, and self-knowledge that can actually guide decision-making.",
} as const;

// ─── Ecosystem Pillars ────────────────────────────────────────────────────────

export interface EcosystemPillar {
  /** Internal identifier */
  id: string;
  /** Display name */
  name: string;
  /** Short functional description */
  function: string;
  /** Emotional role in the ecosystem */
  emotionalRole: string;
  /** Tagline — used in UI and marketing */
  tagline: string;
  /** One-paragraph positioning statement */
  description: string;
  /** Route path */
  route: string;
}

export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: "today",
    name: "Today",
    function: "Daily emotional and timing layer",
    emotionalRole: "Orienting — the daily threshold between knowing and acting",
    tagline: "The single instruction the day is offering you.",
    description:
      "Today is not a dashboard. It is a posture. Each day, Moontuner reads the current lunar phase and translates it into a clear directive — one emotional weather observation, one energetic recommendation, one guiding line. It is designed to be read slowly, once, before the noise of the day begins. Not a productivity prompt. An orientation.",
    route: "/",
  },
  {
    id: "harmonic-profile",
    name: "Harmonic Profile",
    function: "Identity mapping and rhythm awareness",
    emotionalRole: "Anchoring — the stable signal beneath surface behavior",
    tagline: "Your rhythmic signature. The pattern beneath the pattern.",
    description:
      "The Harmonic Profile is not a personality type. It is a map of your energetic architecture — the natal timing patterns that shape how you naturally move through cycles of output, rest, decision, and recovery. It does not tell you who you are. It offers a language for what you have always sensed but rarely named. Identity as rhythm, not category.",
    route: "/harmonic-profile",
  },
  {
    id: "spacetime-printer",
    name: "Spacetime Printer",
    function: "Intentional proposal and reflective authorship",
    emotionalRole: "Committing — the act of authoring your position in time",
    tagline: "Print your coordinates. Own your timing.",
    description:
      "The Spacetime Printer transforms your current moment into a document — a printed record of where you stand in time, what you are proposing, and what you are releasing. It is an act of reflective authorship: the discipline of stating clearly where you are, so you can move from a known position rather than accumulated uncertainty. Precision as clarity. Data as intention.",
    route: "/spacetime-printer",
  },
  {
    id: "digital-smudging",
    name: "Digital Smudging",
    function: "Technological release and digital hygiene",
    emotionalRole: "Releasing — clearing signal noise to restore clarity",
    tagline: "Clear what no longer serves. Begin again.",
    description:
      "Digital Smudging is a practice of intentional clearing — a ritual interface for releasing what accumulates in digital life: the open tabs, the unread threads, the quiet weight of things half-finished or never resolved. It is not a productivity tool. It is a contemplative act. The digital equivalent of closing a door gently and turning toward what matters.",
    route: "/digital-smudging",
  },
  {
    id: "journal",
    name: "Journal",
    function: "Longitudinal reflection and emotional memory",
    emotionalRole: "Witnessing — the archive that gives patterns their voice",
    tagline: "Memory with continuity. Reflection with reach.",
    description:
      "The Moontuner Journal is a longitudinal record — not a diary of events, but an archive of emotional signal over time. Its value compounds. The entry you write tonight becomes context for the entry you write three months from now. It is not about self-improvement. It is about self-knowledge: the gradual, honest accumulation of understanding your own emotional landscape.",
    route: "/journal",
  },
  {
    id: "reports",
    name: "Reports",
    function: "Personalized reflective synthesis",
    emotionalRole: "Integrating — turning observation into coherent self-knowledge",
    tagline: "Your patterns, made visible. Your timing, made legible.",
    description:
      "Moontuner Reports synthesize what the system has observed about you into personalized reflective documents. They are not predictions. They are mirrors — carefully assembled from your profile, your journal, and your timing data. A report does not tell you what to do. It shows you what you have already been doing, and invites you to choose what comes next with more information than you had before.",
    route: "/lunar-reports",
  },
];

// ─── Brand Vocabulary ─────────────────────────────────────────────────────────

export const brandVocabulary = {
  /**
   * Preferred language — words that carry the right emotional weight
   * and align with the brand's tone of grounded intelligence.
   */
  preferred: [
    "reflection",
    "timing",
    "rhythm",
    "emotional weather",
    "pacing",
    "continuity",
    "signal",
    "posture",
    "momentum",
    "release",
    "recalibration",
    "resonance",
    "archive",
    "proposal",
    "observation",
    "pattern",
    "coherence",
    "calibration",
    "attention",
    "clarity",
    "practice",
    "cycle",
    "threshold",
    "orientation",
    "disposition",
    "intelligence",
    "navigation",
    "accumulation",
    "witness",
    "legible",
  ],

  /**
   * Language to avoid — carries the wrong register.
   * Sounds like astrology gimmick, manifestation culture,
   * techbro futurism, or spiritual consumerism.
   */
  avoid: [
    "manifestation mastery",
    "vibrational ascension",
    "destiny activation",
    "abundance hacking",
    "quantum miracles",
    "cosmic downloads",
    "alignment hacks",
    "spiritual optimization",
    "high vibration",
    "universe is telling you",
    "divine timing",
    "energy cleanse",
    "toxic positivity",
    "productivity hack",
    "biohacking",
    "hustle",
    "grind",
    "level up",
    "unlock your potential",
    "transform your life",
    "game changer",
    "guru",
    "awakening",
    "ascension",
    "portal",
    "channeling",
    "downloads",
    "shadow work (as brand jargon)",
    "high achiever",
    "boss mindset",
  ],

  /**
   * Preferred sentence patterns — structural guidance for copy.
   */
  sentencePatterns: [
    "Observation before prescription. Describe what the reader already senses before naming what to do.",
    "Restraint over declaration. Say the precise thing, not the impressive thing.",
    "Emotional honesty without vulnerability performance. Real, not curated.",
    "Systems thinking made human. Show the logic beneath the feeling.",
    "Quiet confidence. Never persuasive at full volume.",
  ],
} as const;

// ─── Voice and Tone ───────────────────────────────────────────────────────────

export const voiceAndTone = {
  /**
   * Core voice attributes — the consistent personality of the brand
   */
  coreVoice: [
    {
      attribute: "Poetic intelligence",
      description:
        "Language that carries emotional weight without sacrificing precision. A sentence should be true and felt.",
    },
    {
      attribute: "Editorial clarity",
      description:
        "Every word earns its place. Excess is removed. The best copy sounds inevitable.",
    },
    {
      attribute: "Dry restraint",
      description:
        "Understatement over emphasis. Trust the reader. Do not oversell or perform emotion.",
    },
    {
      attribute: "Emotional honesty",
      description:
        "Acknowledge difficulty without dramatizing it. The brand is not anxious, not euphoric — it is steady and perceptive.",
    },
    {
      attribute: "Systems thinking",
      description:
        "Reveal the underlying structure of things. Help the reader see patterns, not just moments.",
    },
    {
      attribute: "Contemplative pacing",
      description:
        "Write as if there is enough time. Do not rush the reader. Space is part of the message.",
    },
  ],

  /**
   * Tone calibration by context
   */
  toneByContext: [
    {
      context: "Homepage / Hero",
      tone: "Cinematic, orienting, quietly confident",
      example: "A timing system for people tired of forcing life out of rhythm.",
    },
    {
      context: "Daily directive / Today",
      tone: "Direct, grounded, briefly poetic",
      example: "Begin nothing visible. The seed is being chosen in darkness; let the choice be honest.",
    },
    {
      context: "Feature descriptions",
      tone: "Functional clarity with emotional resonance",
      example: "The Harmonic Profile does not tell you who you are. It offers a language for what you have always sensed but rarely named.",
    },
    {
      context: "Journal prompts",
      tone: "Invitational, open-ended, psychologically aware",
      example: "What is the emotional weather today — not what happened, but what it felt like to move through it?",
    },
    {
      context: "Reports",
      tone: "Observational, synthesizing, non-prescriptive",
      example: "The pattern suggests a consistent resistance to outward commitment during the waning phase. This is not a flaw — it is information.",
    },
    {
      context: "About / Brand story",
      tone: "Grounded, culturally aware, quietly trustworthy",
      example: "Moontuner was built for that pause. Not as an escape from the demands of modern life, but as a way of moving through them with better calibration.",
    },
    {
      context: "Error / Empty states",
      tone: "Human, calm, never apologetic or urgent",
      example: "Nothing here yet. That changes the moment you begin.",
    },
    {
      context: "Onboarding",
      tone: "Patient, clear, low-pressure",
      example: "This takes about four minutes. There are no wrong answers — only observations.",
    },
  ],

  /**
   * What the brand sounds like — reference points
   */
  soundsLike: [
    "A writer who has deeply observed their own inner life, not a coach selling transformation",
    "An editorial voice — measured, precise, with occasional wit",
    "Someone who reads widely and thinks in systems",
    "Quiet authority earned through observation, not claimed through assertion",
  ],

  /**
   * What the brand does not sound like
   */
  doesNotSoundLike: [
    "A guru with a program",
    "A wellness influencer performing vulnerability",
    "A startup pitch deck with feelings",
    "A self-help book promising a new you",
    "An astrology app promising cosmic certainty",
  ],
} as const;

// ─── Visual Brand Guidelines (narrative) ─────────────────────────────────────

export const visualBrandGuidelines = {
  /**
   * Visual identity principles
   */
  principles: [
    "Negative space is active, not empty — it signals restraint and attention",
    "Typography carries the primary visual weight",
    "Gradients should feel atmospheric, not decorative",
    "Geometry is restrained: circles, hairlines, proportional grids",
    "Cinematic pacing — visual rhythm that mirrors emotional rhythm",
    "Emotional calm is the default register",
  ],

  /**
   * Color system — narrative description
   */
  colorNarrative: {
    warmIvory:
      "The primary foreground — warm, organic, human. Not clinical white. Ivory carries age, texture, and quiet warmth.",
    softBlack:
      "The foundation — deep but not harsh. A night that holds rather than crushes.",
    lunarGray:
      "The secondary surface — the space between. Muted enough to recede, present enough to structure.",
    mutedSilver:
      "Metadata, labels, secondary information. The quiet voice beneath the primary.",
    restrainedGold:
      "Accent — used sparingly. Gold marks the precise moment, the important detail, the threshold. Never decorative, always intentional.",
    atmosphericShadow:
      "Gradient depth — the sense that something exists beyond the visible edge. Not dramatic, just present.",
  },

  /**
   * Typography narrative
   */
  typographyNarrative: {
    editorialSerif:
      "Used for display, headlines, and moments of emotional weight. Carries the brand's contemplative, literary quality.",
    modernSansSerif:
      "Used for body text, UI, and functional copy. Clean, readable, unobtrusive.",
    hierarchy:
      "Quiet hierarchy: size differentials are meaningful but not aggressive. The eye moves without being pushed.",
    spacing:
      "Generous line height and letter spacing in headlines. Readability is a form of respect.",
  },

  /**
   * Motion philosophy — narrative
   */
  motionNarrative: {
    character:
      "Motion should feel like a thought completing itself — not an animation performing for attention.",
    principles: [
      "Ambient: background elements breathe at human resting-breath cadence",
      "Reflective: motion follows content rhythm, not UI convention",
      "Slow: transitions take longer than expected — this is intentional",
      "Emotionally intelligent: motion calibrates to the weight of the content",
    ],
    avoid: [
      "Hyperactive micro-animations",
      "Attention-seeking hover effects",
      "Startup-style bounce and pop",
      "Motion that competes with content",
    ],
  },
} as const;

// ─── Social Content Strategy ──────────────────────────────────────────────────

export const socialStrategy = {
  /**
   * Overall content philosophy
   */
  contentPhilosophy:
    "Every piece of content should offer genuine emotional usefulness — something the reader can carry with them, not just consume and discard. Moontuner does not chase engagement. It builds recognition.",

  /**
   * Platform-specific guidance
   */
  platforms: [
    {
      platform: "Instagram",
      primaryRole: "Visual brand expression and daily emotional signal",
      contentTypes: [
        "Moon phase directives (daily, clean typographic treatment)",
        "Journal prompts with atmospheric photography",
        "Ecosystem pillar explanations — one per week",
        "Quiet editorial quotes from brand vocabulary",
        "Behind-the-design — restraint as a visual principle",
      ],
      toneNotes:
        "Visually quiet. One idea per post. Long captions earn their length or stay short. No hashtag farming.",
      avoid: [
        "Carousel overload",
        "Before/after wellness content",
        "Influencer-style hooks",
        "Crystal or cosmic clipart aesthetics",
      ],
    },
    {
      platform: "TikTok",
      primaryRole: "Emotional resonance and concept introductions",
      contentTypes: [
        "30-60 second emotional reflections on timing and rhythm",
        "Pillar introductions: 'Here is what Digital Smudging actually is'",
        "Moon phase walkthroughs — grounded, not mystical",
        "Honest observations about attention, distraction, pacing",
        "Visual demonstrations of the app/tools in calm context",
      ],
      toneNotes:
        "Direct but unhurried. No performance. Speak as if to one thoughtful person, not a crowd.",
      avoid: [
        "Viral-bait formats",
        "Manifestation claims",
        "Astrology predictions",
        "Spiritual superiority framing",
      ],
    },
    {
      platform: "Substack",
      primaryRole: "Long-form reflective writing and brand depth",
      contentTypes: [
        "Monthly reflective essays on timing, attention, and modern life",
        "Ecosystem deep-dives — the theory behind each pillar",
        "Seasonal rhythm guides (equinoxes, lunar cycles)",
        "Curated observations from the Moontuner community",
        "Behind the thinking — design and editorial decisions",
      ],
      toneNotes:
        "Editorial, unhurried, intellectually generous. The reader should feel the writer has thought carefully.",
      avoid: [
        "Self-promotion disguised as content",
        "Excessive personal disclosure",
        "Manifestation framing",
        "Urgency or scarcity language",
      ],
    },
    {
      platform: "X / Twitter",
      primaryRole: "Aphoristic brand voice and cultural observation",
      contentTypes: [
        "Single-sentence observations on timing, attention, rhythm",
        "Short-form versions of Moontuner concepts",
        "Honest takes on wellness/productivity culture",
        "Quiet endorsements of books, ideas, work the brand respects",
        "Moon phase notes — brief, precise, non-mystical",
      ],
      toneNotes:
        "Dry, precise, occasionally witty. No positioning. No hashtag culture. Quality over frequency.",
      avoid: [
        "Outrage bait",
        "Hot takes for engagement",
        "Spiritual bypassing",
        "Performative relatability",
      ],
    },
    {
      platform: "YouTube",
      primaryRole: "Longer-form explanation and ambient brand experience",
      contentTypes: [
        "Guided reflection sessions — ambient, unhurried, visual",
        "Feature walkthroughs — calm, clear, unscripted",
        "Essays in video form — brand voice extended into long content",
        "Seasonal rhythm documents — cinematic, observational",
        "Tool design explanations — transparency as trust-building",
      ],
      toneNotes:
        "Documentary register. Not tutorial, not vlog. Thoughtful narration over considered visuals.",
      avoid: [
        "High-energy YouTube conventions",
        "Clickbait thumbnails",
        "Over-produced wellness aesthetic",
        "Talking-head lifestyle framing",
      ],
    },
    {
      platform: "Newsletter",
      primaryRole: "Direct relationship and longitudinal engagement",
      contentTypes: [
        "Weekly moon phase directive — brief, personalized in tone",
        "Monthly synthesis — what Moontuner has been thinking about",
        "Seasonal guides — what the coming cycle offers",
        "Feature announcements — framed as observations, not launches",
        "Invitation to reflect — one question per week",
      ],
      toneNotes:
        "Personal without being informal. Consistent voice. Readers should recognize the sender in the first sentence.",
      avoid: [
        "Promotional disguised as editorial",
        "Urgency language ('Don't miss this')",
        "Open-rate bait subject lines",
        "Over-segmented automation that loses the human voice",
      ],
    },
  ],

  /**
   * Universal content principles
   */
  universalPrinciples: [
    "Emotional usefulness: does this help someone feel more oriented, understood, or clear?",
    "Reflective clarity: does this invite thought rather than perform certainty?",
    "Elegant restraint: is anything here that doesn't need to be?",
    "Calm insight: is this the most considered way to say this thing?",
    "Intellectual credibility: would someone who thinks carefully trust this?",
  ],
} as const;

// ─── About Page Content ───────────────────────────────────────────────────────

export const aboutPageContent = {
  /** Hero tagline */
  heroTagline: "A reflective operating system.",

  /** Hero subhead */
  heroSubhead:
    "Not astrology. Not productivity. Not wellness. A system for understanding your own timing — and moving through life with it.",

  /** Core sections */
  sections: [
    {
      id: "what-it-is",
      eyebrow: "What Moontuner Is",
      headline: "A system for timing and self-knowledge.",
      body: [
        "Most tools for modern life promise to make you faster, more focused, or more aligned with some external ideal. Moontuner makes a different offer: a way to understand the rhythms you already move in — and work with them rather than against them.",
        "It is not a calendar. It is not an astrology app. It is not a journaling prompt generator. It is an integrated system that holds your observations over time and gives them back to you as legible pattern.",
        "The lunar cycle is not a mystical guide. It is a reliable, consistent rhythm — one of the few external cadences stable enough to observe your own patterns against. Moontuner uses it as a clock, not a prophecy.",
      ],
    },
    {
      id: "the-problem",
      eyebrow: "The Problem",
      headline: "Fragmented attention makes self-knowledge impossible.",
      body: [
        "We live in an environment optimized for distraction and acceleration. The pace of information — and the pressure to respond to it — makes it nearly impossible to observe your own patterns. You are always in the middle of the current. You rarely get to step back and read it.",
        "Without longitudinal self-observation, every decision feels made in isolation. You lose the thread of your own momentum. You forget what you were thinking three months ago. You can't tell if you are in a productive phase or a recovery phase — so you try to perform both at once.",
        "This is not a character flaw. It is an environmental condition. And it has a remedy.",
      ],
    },
    {
      id: "the-approach",
      eyebrow: "The Approach",
      headline: "Reflective pacing as a practice.",
      body: [
        "Moontuner was built around one insight: that regular, structured self-observation — paired with a reliable external rhythm — can restore the sense of coherence that fragmentation removes.",
        "Each day, you receive a directive calibrated to the lunar phase: an emotional weather observation, an energetic posture, and a guiding line. Over time, your journal accumulates a record of your responses. Your Harmonic Profile provides the stable map of your rhythmic architecture. Reports synthesize what has been observed.",
        "Nothing in Moontuner tells you how to feel or what to want. It offers a system for noticing what you already feel, and naming what you already sense. The rest belongs to you.",
      ],
    },
  ],

  /** Closing statement */
  closingStatement:
    "Moontuner is not an answer. It is a practice of looking more carefully at your own life — and finding, in that looking, enough clarity to move.",
} as const;

// ─── Naming Conventions ───────────────────────────────────────────────────────

export const namingConventions = {
  /**
   * Ecosystem pillar naming rules
   */
  pillarNaming: [
    "Names should be functional but evocative — they describe what the pillar does, not what it promises",
    "Avoid abstract nouns that could belong to any wellness brand",
    "Prefer active constructions over passive: 'Journal' over 'Journaling Space'",
    "Technical precision is welcome when it adds credibility: 'Spacetime Printer' not 'Time Capture'",
  ],

  /**
   * Feature naming rules
   */
  featureNaming: [
    "Name features after what they observe or produce, not how they make you feel",
    "Avoid names that overpromise: 'Directive' over 'Transformation'",
    "Consistent vocabulary: 'Harmonic' stays in the identity layer; 'Spacetime' stays in the precision layer",
    "Avoid acronyms and abbreviations in user-facing naming",
  ],

  /**
   * Content naming rules
   */
  contentNaming: [
    "Reports are 'Reports' — not 'Insights,' 'Revelations,' or 'Readings'",
    "Journal entries are 'entries' — not 'reflections,' 'check-ins,' or 'logs' in UI text",
    "Prompts are 'prompts' — not 'questions to unlock your truth'",
    "Phases use their proper astronomical names: New Moon, Waxing Crescent, etc. — not invented names",
  ],
} as const;

// ─── Scale Architecture ───────────────────────────────────────────────────────

/**
 * How the brand scales across future surfaces and experiences.
 * Each extension should feel like the same intelligence expressed in a new form.
 */
export const scaleArchitecture = {
  currentSurfaces: ["Web application", "Mobile-responsive web", "Email / newsletter"],

  futureSurfaces: [
    {
      surface: "Native mobile app",
      brandExpression: "Ambient, gesture-native, privacy-first. The system in your pocket, not on your screen.",
    },
    {
      surface: "Printed reports and documents",
      brandExpression: "Editorial typography, generous white space, data visualized as poetry. The Spacetime Printer aesthetic.",
    },
    {
      surface: "Books",
      brandExpression: "Long-form reflective writing in the brand voice. The workbook as companion, not curriculum.",
    },
    {
      surface: "Audio experiences",
      brandExpression: "Slow narration, ambient sound design, no music that distracts. Voice as a contemplative surface.",
    },
    {
      surface: "Memberships and communities",
      brandExpression: "Quiet spaces for longitudinal practice. No gamification. Depth over volume.",
    },
    {
      surface: "Live experiences",
      brandExpression: "Understated events — workshops, listening sessions, group reflection. Not stages or spectacles.",
    },
    {
      surface: "Ambient hardware",
      brandExpression: "Physical interfaces that hold information without demanding attention. The brand made material.",
    },
  ],

  /**
   * Brand coherence principle for scale:
   * Every surface should feel like the same system — intelligently adapted to its context.
   * The brand is the emotional and philosophical glue. Not a visual kit.
   */
  coherencePrinciple:
    "The brand is not a logo system or a color palette. It is a way of thinking — about timing, about attention, about what technology should ask of people. Every new surface should express that way of thinking in the language native to that surface.",
} as const;
