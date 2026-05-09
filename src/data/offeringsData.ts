/**
 * Moontuner Offerings Data
 *
 * All eight offering types with full metadata.
 * Emotional tone: premium, reflective, grounded, editorial.
 */

export type EmotionalCategory =
  | "Clarity"
  | "Release"
  | "Momentum"
  | "Reflection"
  | "Reorientation"
  | "Recovery"
  | "Alignment";

export type DeliveryFormat =
  | "PDF Report"
  | "Interactive Web Report"
  | "PDF + Web"
  | "Live Session"
  | "Digital Ritual + PDF"
  | "PDF + Session"
  | "Written Report";

export type PurchaseModel =
  | "one-time"
  | "subscription"
  | "session"
  | "member-only";

export interface OfferingInsight {
  headline: string;
  body: string;
}

export interface ReportSection {
  title: string;
  description: string;
}

export interface Offering {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: EmotionalCategory;
  positioning: string;
  emotionalOutcome: string;
  exampleInsights: OfferingInsight[];
  suggestedUseCases: string[];
  completionTime: string;
  deliveryFormat: DeliveryFormat;
  purchaseModel: PurchaseModel;
  price: string;
  ctaLabel: string;
  ctaHref: string;
  bestFor: string[];
  reportSections: ReportSection[];
  timingRecommendation: string;
  accentColor: string;
}

export const OFFERINGS: Offering[] = [
  {
    id: "harmonic-profile",
    slug: "harmonic-profile",
    title: "Harmonic Profile",
    subtitle: "Your Baseline Intelligence Map",
    category: "Alignment",
    positioning:
      "A foundational analysis of your natal chart's energetic signature — identifying the core rhythms, drives, and resistance patterns that structure your inner life.",
    emotionalOutcome:
      "You leave with language for your own architecture. Patterns that felt like personality quirks reveal themselves as coherent systems. You understand yourself more precisely.",
    exampleInsights: [
      {
        headline: "Your Creative Cycle Runs in 29-Day Arcs",
        body: "Your natal Moon sits at 14° Pisces in the 5th house, placing peak creative output in the waxing gibbous window each month — typically days 10–13 of a lunar cycle.",
      },
      {
        headline: "Friction Zones Around Authority",
        body: "A Saturn square to your natal Sun suggests recurring tension when operating under external structures. This isn't weakness — it's a signal to build your own frameworks rather than inherit someone else's.",
      },
      {
        headline: "High Receptivity During New Moon Periods",
        body: "Your chart favors initiation during the dark and new moon window — a counterintuitive pattern that, once aligned with, significantly reduces friction at project starts.",
      },
    ],
    suggestedUseCases: [
      "First-time entry into lunar timing work",
      "Annual recalibration",
      "Grounding after a disorienting period",
      "Preparing for a major life transition",
    ],
    completionTime: "3–5 business days",
    deliveryFormat: "PDF + Web",
    purchaseModel: "one-time",
    price: "$97",
    ctaLabel: "Request Your Profile",
    ctaHref: "mailto:hello@moontuner.xyz?subject=Harmonic%20Profile%20Request",
    bestFor: ["New clients", "Annual review", "Transitions"],
    reportSections: [
      { title: "Natal Signature", description: "Core lunar phase, angle, and elemental balance" },
      { title: "Dominant Rhythms", description: "Recurring energetic patterns across life domains" },
      { title: "Resistance Architecture", description: "Where friction consistently appears and why" },
      { title: "Momentum Posture", description: "Your natural forward-moving tendencies" },
      { title: "Calibration Recommendations", description: "Practical adjustments aligned to your chart" },
    ],
    timingRecommendation: "Best requested during a waning or dark moon phase",
    accentColor: "from-amber-900/20 to-stone-900/40",
  },
  {
    id: "lunar-arc-report",
    slug: "lunar-arc-report",
    title: "Lunar Arc Report",
    subtitle: "12-Month Precision Timing Map",
    category: "Momentum",
    positioning:
      "A full-year timing architecture built from your natal lunar signature — mapping your 12 highest-leverage windows and the energetic climate surrounding each one.",
    emotionalOutcome:
      "You stop guessing and start moving with the current. The year becomes legible. Decisions feel less fraught because you understand when you're positioned to act and when you're not.",
    exampleInsights: [
      {
        headline: "March Is Your Peak Initiation Window",
        body: "Your natal Moon creates a direct resonance with the March Full Moon in Virgo, opening a 72-hour window of unusually high signal-to-noise clarity.",
      },
      {
        headline: "August Calls for Consolidation, Not Expansion",
        body: "The August arc places you in a waning period relative to your natal signature. Existing projects benefit from refinement; new ventures launched here will feel like swimming upstream.",
      },
      {
        headline: "October Contains a Release Point",
        body: "A Saturn transit through your 12th house in October creates a natural clearing period — an ideal window for endings, completions, and intentional letting go.",
      },
    ],
    suggestedUseCases: [
      "Annual planning and goal setting",
      "Business launch timing",
      "Creative project scheduling",
      "Relationship milestone timing",
    ],
    completionTime: "5–7 business days",
    deliveryFormat: "PDF + Web",
    purchaseModel: "one-time",
    price: "$147",
    ctaLabel: "Begin Your Arc",
    ctaHref: "/lunar-reports",
    bestFor: ["Annual planning", "Entrepreneurs", "Creatives"],
    reportSections: [
      { title: "Current Emotional Climate", description: "The dominant energetic tone of your present arc" },
      { title: "Momentum Posture", description: "Whether you're in an expansion or consolidation period" },
      { title: "Friction Zones", description: "The months where resistance is highest and why" },
      { title: "Timing Recommendations", description: "Month-by-month action guidance" },
      { title: "Release Points", description: "Natural clearing windows across the year" },
      { title: "Reflection Prompts", description: "Questions calibrated to each arc phase" },
    ],
    timingRecommendation: "Most effective when requested at new moon or your birth lunar phase",
    accentColor: "from-blue-950/30 to-slate-900/40",
  },
  {
    id: "creative-timing-report",
    slug: "creative-timing-report",
    title: "Creative Timing Report",
    subtitle: "When to Create, When to Rest",
    category: "Momentum",
    positioning:
      "A precision map of your creative energy patterning — identifying ideal action windows, recovery timing, and the emotional interference patterns that disrupt your output.",
    emotionalOutcome:
      "Creative blocks stop feeling like personal failure. You understand the rhythmic structure of your output and can work with it rather than against it.",
    exampleInsights: [
      {
        headline: "Your Creative Peak Lasts 4–6 Days Per Cycle",
        body: "Rather than a diffuse 'good week,' your natal pattern concentrates creative power into a tight 4–6 day window each lunar cycle. Learning to identify this window multiplies output without increasing effort.",
      },
      {
        headline: "Emotional Interference Peaks on Days 18–22",
        body: "A Neptune aspect to your natal Mercury creates a recurring fog window in the waning phase. This isn't the time to edit, present, or make creative decisions — it's a better window for dreaming, researching, and absorbing.",
      },
      {
        headline: "Collaboration Amplifies in Gemini Season",
        body: "Your 3rd house stellium activates significantly during Gemini season, making it your highest-leverage window for co-creation, brainstorming, and creative conversation.",
      },
    ],
    suggestedUseCases: [
      "Artists and makers planning their year",
      "Writers navigating creative cycles",
      "Musicians and producers scheduling studio time",
      "Anyone experiencing persistent creative blocks",
    ],
    completionTime: "3–5 business days",
    deliveryFormat: "PDF Report",
    purchaseModel: "one-time",
    price: "$127",
    ctaLabel: "Map Your Creative Arc",
    ctaHref: "mailto:hello@moontuner.xyz?subject=Creative%20Timing%20Report",
    bestFor: ["Artists", "Writers", "Makers", "Creatives"],
    reportSections: [
      { title: "Creative Energy Patterning", description: "Your innate creative rhythm mapped to lunar cycles" },
      { title: "Ideal Action Windows", description: "The specific days each month for high-output work" },
      { title: "Recovery Timing", description: "When rest is productive and forced output is costly" },
      { title: "Attention Rhythms", description: "How your focus quality shifts across a cycle" },
      { title: "Emotional Interference Patterns", description: "The recurring states that disrupt creative flow" },
    ],
    timingRecommendation: "Particularly useful to request at the start of a new creative project",
    accentColor: "from-emerald-950/30 to-stone-900/40",
  },
  {
    id: "decision-window-analysis",
    slug: "decision-window-analysis",
    title: "Decision Window Analysis",
    subtitle: "Clarity Before the Crossroads",
    category: "Clarity",
    positioning:
      "A focused assessment of your current decision-making posture — examining your emotional clarity state, timing alignment, and internal contradictions to produce a clear directional recommendation.",
    emotionalOutcome:
      "You stop spinning on the decision. Not because someone told you what to do, but because the internal landscape becomes visible. You know whether to push, hold, clarify, or release.",
    exampleInsights: [
      {
        headline: "Current State: Hold",
        body: "Your natal chart is in a waning opposition phase. The information you need to make this decision is still incoming. Acting now means deciding with incomplete data. Wait for the new moon window — approximately 11 days out.",
      },
      {
        headline: "Internal Contradiction Detected",
        body: "The tension between your 2nd and 8th house placements suggests competing values around security and risk are at the root of your hesitation. The decision itself isn't unclear — the underlying value conflict needs resolution first.",
      },
      {
        headline: "Clarity Window Opens in 3 Days",
        body: "A Mercury direct station in your 7th house creates a 5-day window of unusual relational clarity — an excellent time for any decision involving partnership, contracts, or collaboration.",
      },
    ],
    suggestedUseCases: [
      "Major life decisions (career, relationship, location)",
      "Business decisions under time pressure",
      "Situations where clarity feels elusive",
      "Before signing contracts or making commitments",
    ],
    completionTime: "2–3 business days",
    deliveryFormat: "Written Report",
    purchaseModel: "one-time",
    price: "$97",
    ctaLabel: "Submit Your Decision",
    ctaHref: "mailto:hello@moontuner.xyz?subject=Decision%20Window%20Analysis",
    bestFor: ["At a crossroads", "Under time pressure", "Feeling stuck"],
    reportSections: [
      { title: "Emotional Clarity Assessment", description: "Your current capacity for clear decision-making" },
      { title: "Timing Posture", description: "Whether now is the right moment to act" },
      { title: "Internal Contradiction Mapping", description: "The competing values driving your hesitation" },
      {
        title: "Recommendation State",
        description: "A clear directive: Push / Hold / Clarify / Release — with reasoning",
      },
    ],
    timingRecommendation: "Submit your question as the situation arrives — urgency is acceptable",
    accentColor: "from-violet-950/30 to-slate-900/40",
  },
  {
    id: "relationship-resonance-reflection",
    slug: "relationship-resonance-reflection",
    title: "Relationship Resonance Reflection",
    subtitle: "The Dynamic Between You",
    category: "Reflection",
    positioning:
      "A synastry-informed reflection on a significant relationship — examining energetic compatibility, timing alignment, recurring friction patterns, and the underlying dynamic driving the connection.",
    emotionalOutcome:
      "The relationship becomes legible without being reduced. You understand the structural forces at play — which tensions are growth edges, which are incompatibilities, and where alignment naturally exists.",
    exampleInsights: [
      {
        headline: "Your Cycles Are Out of Phase by 11 Days",
        body: "Your natal Moon phase is 11 days offset from theirs. This creates a recurring pattern where one person is in expansion mode while the other is in consolidation — a dynamic that explains many of your timing conflicts.",
      },
      {
        headline: "Creative Collaboration Is a Natural Amplifier",
        body: "Venus-Mercury contacts between your charts create an unusually strong creative resonance. Shared creative work activates the best of this connection.",
      },
      {
        headline: "The October Window Is Critical",
        body: "Both of your charts are in active phases during October. This month holds significant energetic weight for this relationship — a window for clarity, depth, and honest reckoning.",
      },
    ],
    suggestedUseCases: [
      "Romantic partnerships at an inflection point",
      "Business partnerships under strain",
      "Long-term friendships requiring recalibration",
      "Family relationships with recurring patterns",
    ],
    completionTime: "5–7 business days",
    deliveryFormat: "PDF Report",
    purchaseModel: "one-time",
    price: "$157",
    ctaLabel: "Explore the Dynamic",
    ctaHref:
      "mailto:hello@moontuner.xyz?subject=Relationship%20Resonance%20Reflection",
    bestFor: ["Partnerships", "Collaborations", "Family dynamics"],
    reportSections: [
      { title: "Energetic Compatibility Map", description: "Where your charts naturally harmonize and where they clash" },
      {
        title: "Cycle Alignment Analysis",
        description: "How your lunar rhythms interact across time",
      },
      { title: "Friction Pattern Identification", description: "The recurring tensions and their structural roots" },
      {
        title: "Growth Edge vs. Incompatibility",
        description: "Distinguishing productive tension from fundamental misalignment",
      },
      { title: "Timing Recommendations", description: "Windows for difficult conversations, closeness, and space" },
    ],
    timingRecommendation: "Best requested during a stabilizing period — not in the heat of acute conflict",
    accentColor: "from-rose-950/30 to-stone-900/40",
  },
  {
    id: "spacetime-proposal-review",
    slug: "spacetime-proposal-review",
    title: "Spacetime Proposal Review",
    subtitle: "Is This the Right Moment?",
    category: "Clarity",
    positioning:
      "A timing review for a specific proposal, project, or initiative — assessing the energetic conditions surrounding your intended launch or commitment date against your natal chart.",
    emotionalOutcome:
      "You stop second-guessing your launch timing. You have a clear read on whether the proposed moment is aligned with your natural momentum — and if not, when the better window opens.",
    exampleInsights: [
      {
        headline: "Launch Date Sits in a Mercury Retrograde Shadow",
        body: "The proposed September 14 launch falls 4 days before Mercury stations direct. Communications, contracts, and technology launches in this window carry elevated friction risk. A 10-day delay moves you into clear air.",
      },
      {
        headline: "Strong Natal Resonance for Q1",
        body: "Your natal Moon creates a supportive trine to the Q1 Jupiter transit. Projects initiated in January–February will carry natural momentum through the first half of the year.",
      },
      {
        headline: "Partnership Proposal Better Timed in Spring",
        body: "Venus's movement through your 7th house in April–May creates an unusually clear window for partnership agreements and relational commitments.",
      },
    ],
    suggestedUseCases: [
      "Business or product launches",
      "Contract signings and legal agreements",
      "Public announcements or campaigns",
      "Creative project releases",
    ],
    completionTime: "2–3 business days",
    deliveryFormat: "Written Report",
    purchaseModel: "one-time",
    price: "$77",
    ctaLabel: "Submit Your Proposal",
    ctaHref: "/spacetime-printer",
    bestFor: ["Launches", "Contracts", "Announcements"],
    reportSections: [
      { title: "Proposed Date Assessment", description: "The energetic conditions on your intended date" },
      { title: "Natal Resonance Check", description: "How the timing aligns with your personal chart" },
      { title: "Risk Factors", description: "Planetary conditions that may create friction" },
      { title: "Alternative Windows", description: "Better-aligned dates if adjustment is possible" },
    ],
    timingRecommendation: "Submit at least 2 weeks before your proposed date for maximum flexibility",
    accentColor: "from-sky-950/30 to-slate-900/40",
  },
  {
    id: "digital-smudging-reset",
    slug: "digital-smudging-reset",
    title: "Digital Smudging Reset",
    subtitle: "Intentional Digital Clearing",
    category: "Release",
    positioning:
      "A structured protocol for clearing accumulated digital noise, emotional residue, and energetic clutter from your devices, accounts, and online presence — timed to a releasing lunar phase.",
    emotionalOutcome:
      "Your digital environment stops feeling like a source of low-grade stress. You have a clear, repeatable ritual for maintaining clarity in the spaces where you spend most of your time.",
    exampleInsights: [
      {
        headline: "Your Notification Architecture Is Fragmenting Your Focus",
        body: "An audit of your current setup reveals 47 active notification sources competing for attention. The reset protocol reduces this to 6 intentionally chosen inputs.",
      },
      {
        headline: "Optimal Clearing Window: 3 Days",
        body: "The upcoming waning crescent offers a 72-hour window of natural releasing energy — the ideal container for a thorough digital clearing without the friction of forcing change against the current.",
      },
    ],
    suggestedUseCases: [
      "After a period of high stress or burnout",
      "Entering a new creative or professional chapter",
      "Regular quarterly maintenance",
      "Before a significant life transition",
    ],
    completionTime: "Same-day protocol delivery",
    deliveryFormat: "Digital Ritual + PDF",
    purchaseModel: "one-time",
    price: "$47",
    ctaLabel: "Begin the Reset",
    ctaHref: "/digital-smudging",
    bestFor: ["Burnout recovery", "Transitions", "Quarterly reset"],
    reportSections: [
      { title: "Current Digital Audit", description: "A structured inventory of your current digital landscape" },
      { title: "Clearing Protocol", description: "A step-by-step lunar-timed clearing ritual" },
      { title: "Maintenance Architecture", description: "A repeatable system for ongoing digital clarity" },
      { title: "Reflection Integration", description: "Prompts for the emotional clearing that accompanies digital clearing" },
    ],
    timingRecommendation: "Best initiated during a waning or dark moon phase",
    accentColor: "from-teal-950/30 to-stone-900/40",
  },
  {
    id: "calibration-sessions",
    slug: "calibration-sessions",
    title: "Calibration Sessions",
    subtitle: "1:1 Precision Guidance",
    category: "Reorientation",
    positioning:
      "A live 1:1 session combining chart analysis, timing assessment, and reflective dialogue — designed for moments when you need a precise, personalized read on where you are and what comes next.",
    emotionalOutcome:
      "You leave the session with a clear orientation. Not answers imposed from outside, but a sharpened internal signal — you know what you think, what you want, and what the timing is asking of you.",
    exampleInsights: [
      {
        headline: "Real-Time Chart Navigation",
        body: "Session includes live analysis of current transits against your natal chart, identifying the dominant themes and timing pressures of your present moment.",
      },
      {
        headline: "Reflective Dialogue",
        body: "Rather than a reading you receive passively, sessions are structured as calibration conversations — your chart provides the map, you navigate it.",
      },
    ],
    suggestedUseCases: [
      "Annual recalibration sessions",
      "At major life decision points",
      "After significant transitions (move, relationship change, career shift)",
      "Monthly check-ins for ongoing support",
    ],
    completionTime: "60 or 90 minutes",
    deliveryFormat: "Live Session",
    purchaseModel: "session",
    price: "From $150",
    ctaLabel: "Book a Session",
    ctaHref: "/sessions",
    bestFor: ["Deep dive", "Transitions", "Ongoing guidance"],
    reportSections: [
      { title: "Pre-Session Chart Pull", description: "Your current transits prepared before the session" },
      { title: "Live Navigation", description: "Real-time chart analysis during the session" },
      { title: "Post-Session Summary", description: "Written notes and key insights delivered within 24 hours" },
      { title: "Action Recommendations", description: "Specific, timed next steps tailored to your situation" },
    ],
    timingRecommendation: "Available throughout the month — timing preferences noted at booking",
    accentColor: "from-indigo-950/30 to-slate-900/40",
  },
];

export const EMOTIONAL_CATEGORIES: EmotionalCategory[] = [
  "Clarity",
  "Release",
  "Momentum",
  "Reflection",
  "Reorientation",
  "Recovery",
  "Alignment",
];

export function getOfferingsByCategory(category: EmotionalCategory): Offering[] {
  return OFFERINGS.filter((o) => o.category === category);
}

export function getOfferingBySlug(slug: string): Offering | undefined {
  return OFFERINGS.find((o) => o.slug === slug);
}
