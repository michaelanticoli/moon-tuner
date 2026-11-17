/**
 * Moontuner editorial edition — copy and catalogue.
 *
 * Every line here is drawn from copy already on moontuner.xyz:
 *   - positioning: public/llms.txt
 *   - the four doors: src/data/siteNav.ts (DOORS)
 *   - principles and declarations: src/pages/Manifesto.tsx
 * If any of those change, mirror the change here.
 */

export const ED_EST = "Est. MMXIV";
export const ED_CONTACT_EMAIL = "hello@moontuner.xyz";

export const ED_SUBTITLE = "Lunar Alignment System";

export const ED_DESCRIPTOR = [
  "Eight Phases",
  "Twelve Signs",
  "Ninety-Six Signatures",
] as const;

export const ED_SYSTEM = {
  label: "The System",
  statement:
    "A lunar alignment system for tracking intention, energy, and momentum through the Moon's cycles.",
  supporting:
    "Reflective, non-deterministic — align with natural rhythms, not predictions. Moontuner is a framework for energetic accountability and self-sovereignty, built around the eight lunar phases and twelve zodiac signs: ninety-six configurations, read live from the sky.",
} as const;

/** The six working principles, from the Manifesto. */
export const ED_PRINCIPLES: ReadonlyArray<{ title: string; line: string }> = [
  { title: "Cyclical Over Linear", line: "Progress is a returning path that rises." },
  { title: "Rhythm Over Schedule", line: "Work with tempo rather than against the clock." },
  { title: "Awareness Over Achievement", line: "Attention is the practice." },
  { title: "Resonance Over Prescription", line: "The Moon suggests; you decide." },
  { title: "Integration Over Inspiration", line: "Companions for the whole cycle, not just the beginning." },
  { title: "Enchantment Over Optimization", line: "Not productivity culture in celestial costume." },
];

export type DoorKey = "learn" | "practice" | "hear" | "time";
export type DoorIconKey = "phasecraft" | "chaperone" | "symphony" | "reports";

export interface EdDoor {
  key: DoorKey;
  n: string;
  verb: string;
  title: string;
  line: string;
  href: string;
  icon: DoorIconKey;
}

/** The four doors into Moontuner, in the order a PHASECRAFT reader meets them. */
export const ED_DOORS: ReadonlyArray<EdDoor> = [
  {
    key: "learn",
    n: "01",
    verb: "Learn",
    title: "Phasecraft",
    line: "Eight phases, twelve signs, ninety-six signatures. See the one overhead tonight, then study the method.",
    href: "/phasecraft",
    icon: "phasecraft",
  },
  {
    key: "practice",
    n: "02",
    verb: "Practice",
    title: "Lunar Chaperone",
    line: "Twenty-four half-moon workbooks in one continuous loop, opening on the half-cycle overhead now.",
    href: "/lunar-chaperone",
    icon: "chaperone",
  },
  {
    key: "hear",
    n: "03",
    verb: "Hear",
    title: "Astro-Harmonic Symphony",
    line: "Your birth chart composed as music — every placement its own instrument — and the reading spoken back to you.",
    href: "/quantumelodic",
    icon: "symphony",
  },
  {
    key: "time",
    n: "04",
    verb: "Time",
    title: "Lunar Map & Cazimi",
    line: "One set of birth details, a full year of timing: your lunar arc, power days, and cazimi windows.",
    href: "/lunar-reports",
    icon: "reports",
  },
];

/** The seven declarations, from the Manifesto. */
export const ED_DECLARATIONS: ReadonlyArray<{ n: string; title: string; essence: string }> = [
  { n: "I", title: "The Moon Is Always Here", essence: "Access requires no invitation" },
  { n: "II", title: "You Are Already Moving With It", essence: "Connection precedes awareness" },
  { n: "III", title: "The Path Is the Destination", essence: "Every phase is whole" },
  { n: "IV", title: "Local Means Universal", essence: "Your view is the gateway" },
  { n: "V", title: "Enchantment Is Not Escape", essence: "Magic clarifies reality" },
  { n: "VI", title: "The Body Remembers", essence: "Wisdom lives in the body" },
  { n: "VII", title: "We Are On the Way", essence: "Arrival is perpetual" },
];

export type IndexGroup = DoorKey | "daily";

export const ED_INDEX_FILTERS: ReadonlyArray<{ key: IndexGroup | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "learn", label: "Learn" },
  { key: "practice", label: "Practice" },
  { key: "hear", label: "Hear" },
  { key: "time", label: "Time" },
  { key: "daily", label: "Daily" },
];

export const ED_GROUP_LABEL: Record<IndexGroup, string> = {
  learn: "Phasecraft",
  practice: "Lunar Chaperone",
  hear: "Symphony",
  time: "Reports",
  daily: "Daily",
};

export interface EdTool {
  id: string;
  title: string;
  group: IndexGroup;
  format: string;
  href: string;
}

/** Index of Tools — every entry links to a live route in src/App.tsx. */
export const ED_TOOLS: ReadonlyArray<EdTool> = [
  { id: "MT-01", title: "PHASECRAFT: The Moontuner Method", group: "learn", format: "Book · Moontuner Press", href: "/book" },
  { id: "MT-02", title: "Today's Signature", group: "learn", format: "Live Tool", href: "/phasecraft" },
  { id: "MT-03", title: "The 96 Matrix", group: "learn", format: "Reference", href: "/phasecraft/matrix" },
  { id: "MT-04", title: "Lunar Calendar", group: "learn", format: "Calendar", href: "/phasecraft/calendar" },
  { id: "MT-05", title: "Phasecraft School", group: "learn", format: "Course · Six Modules", href: "/school" },
  { id: "MT-06", title: "The Lunar Chaperone", group: "practice", format: "Workbook Series", href: "/lunar-chaperone" },
  { id: "MT-07", title: "Workbook Program", group: "practice", format: "Twenty-Four Half-Cycles", href: "/program" },
  { id: "MT-08", title: "Persona Edition", group: "practice", format: "Personal Workbooks", href: "/program/persona" },
  { id: "MT-09", title: "Astro-Harmonic Symphony", group: "hear", format: "Composition · Narrated Reading", href: "/quantumelodic" },
  { id: "MT-10", title: "Harmonic Profile", group: "hear", format: "Natal Moon Archetype · Free", href: "/harmonic-profile" },
  { id: "MT-11", title: "Natal Harmonic Generator", group: "hear", format: "Scales & Frequencies", href: "/natal-harmonic" },
  { id: "MT-12", title: "Personal Lunar Map", group: "time", format: "12-Month Arc · Power Days", href: "/lunar-reports" },
  { id: "MT-13", title: "Cazimi Punchcard", group: "time", format: "Yearly Solar Returns", href: "/cazimi" },
  { id: "MT-14", title: "Lunar Cipher", group: "time", format: "Calendar Over Your Chart", href: "/lunar-cipher" },
  { id: "MT-15", title: "Total Tuner", group: "time", format: "Every Report, One Document", href: "/total-tuner" },
  { id: "MT-16", title: "Today's Directive", group: "daily", format: "Daily Prompt", href: "/today" },
  { id: "MT-17", title: "The Rites", group: "daily", format: "Working Documents", href: "/rites" },
  { id: "MT-18", title: "Journal", group: "daily", format: "Reflections", href: "/journal" },
];

export const ED_FOOTER_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Start Here", href: "/start" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const SIGN_NAMES = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;
