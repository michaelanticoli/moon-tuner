/**
 * Site navigation — single source of truth.
 *
 * Every navigation surface (the top nav on every page, the mobile menu, the
 * footer, the "four doors" on the homepage / Start Here / 404, and the
 * go-deeper strip inside Phasecraft) reads from this file. To add, rename or
 * move a page in the nav, change it here and nowhere else.
 *
 * The site is organised around four doors, in the order a Phasecraft reader
 * meets them:
 *   1. Phasecraft        — learn the 96 signatures (companion + School)
 *   2. Lunar Chaperone   — practice the cycle (24 half-moon workbooks)
 *   3. Symphony          — hear the birth chart (Astro-Harmonic Symphony)
 *   4. Reports           — time the year (Lunar Map, Cazimi, Cipher)
 * Everything else lives under "More" and in the footer.
 */

export interface NavItem {
  label: string;
  href: string;
  desc: string;
  external?: boolean;
}

export interface NavGroup {
  key: DoorKey | "more";
  label: string;
  items: NavItem[];
}

export type DoorKey = "phasecraft" | "chaperone" | "symphony" | "reports";

export interface Door {
  key: DoorKey;
  /** Verb that names what the visitor does here. */
  eyebrow: string;
  title: string;
  line: string;
  href: string;
  cta: string;
  /** Secondary destinations shown under the primary call to action. */
  links: { label: string; href: string }[];
}

// ─── The four doors ────────────────────────────────────────────────────────

export const DOORS: Door[] = [
  {
    key: "phasecraft",
    eyebrow: "Learn",
    title: "Phasecraft",
    line: "Eight phases, twelve signs, ninety-six signatures. See the one overhead tonight, then study the method in the School.",
    href: "/phasecraft",
    cta: "Today's signature",
    links: [
      { label: "Phasecraft School", href: "/school" },
      { label: "The 96 Matrix", href: "/phasecraft/matrix" },
    ],
  },
  {
    key: "chaperone",
    eyebrow: "Practice",
    title: "Lunar Chaperone",
    line: "Twenty-four half-moon workbooks in one continuous loop. It opens on the half-cycle running overhead right now.",
    href: "/lunar-chaperone",
    cta: "Open the Chaperone",
    links: [
      { label: "Workbook Program", href: "/program" },
      { label: "Persona Edition", href: "/program/persona" },
    ],
  },
  {
    key: "symphony",
    eyebrow: "Hear",
    title: "Astro-Harmonic Symphony",
    line: "Your birth chart composed as music — every placement its own instrument — and the reading spoken back to you.",
    href: "/quantumelodic",
    cta: "Hear your chart",
    links: [
      { label: "Free Harmonic Profile", href: "/harmonic-profile" },
      { label: "Natal Harmonic Generator", href: "/natal-harmonic" },
    ],
  },
  {
    key: "reports",
    eyebrow: "Time",
    title: "Lunar Map & Cazimi",
    line: "One set of birth details, a full year of timing: your 12-month lunar arc, power days, and cazimi windows.",
    href: "/lunar-reports",
    cta: "Map your year",
    links: [
      { label: "Cazimi Punchcard", href: "/cazimi" },
      { label: "Total Tuner — every report", href: "/total-tuner" },
    ],
  },
];

// ─── Top navigation groups ─────────────────────────────────────────────────

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "phasecraft",
    label: "Phasecraft",
    items: [
      { label: "Today's Signature", href: "/phasecraft", desc: "Tonight's phase and sign, read through the 96" },
      { label: "The 96 Matrix", href: "/phasecraft/matrix", desc: "Every phase × sign signature" },
      { label: "Lunar Calendar", href: "/phasecraft/calendar", desc: "Plan by phase and sign" },
      { label: "Phasecraft School", href: "/school", desc: "Learn the method, module by module" },
      { label: "Curriculum", href: "/school/curriculum", desc: "Six modules, eight weeks" },
      { label: "Student Portal", href: "/school/portal", desc: "Your lessons and progress" },
      { label: "Readers of the Book", href: "/book", desc: "Start here if you have PHASECRAFT" },
    ],
  },
  {
    key: "chaperone",
    label: "Lunar Chaperone",
    items: [
      { label: "The Lunar Chaperone", href: "/lunar-chaperone", desc: "Opens on the half-cycle overhead now" },
      { label: "Workbook Program", href: "/program", desc: "All 24 half-cycles, gap-free" },
      { label: "Persona Edition", href: "/program/persona", desc: "The cycle in your own signature" },
      { label: "Program Portal", href: "/program/portal", desc: "Your place in the arc" },
      { label: "Workbook Library", href: "/workbooks", desc: "Browse every workbook" },
    ],
  },
  {
    key: "symphony",
    label: "Symphony",
    items: [
      { label: "Astro-Harmonic Symphony", href: "/quantumelodic", desc: "Your chart as music, narrated" },
      { label: "Harmonic Profile", href: "/harmonic-profile", desc: "Free — your natal moon archetype" },
      { label: "Natal Harmonic Generator", href: "/natal-harmonic", desc: "Scales and frequencies from your chart" },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    items: [
      { label: "Personal Lunar Map", href: "/lunar-reports", desc: "12-month arc and power days" },
      { label: "Cazimi Punchcard", href: "/cazimi", desc: "Your yearly windows of renewal" },
      { label: "Lunar Cipher", href: "/lunar-cipher", desc: "The calendar over your chart" },
      { label: "Total Tuner", href: "/total-tuner", desc: "Every report in one document" },
    ],
  },
  {
    key: "more",
    label: "More",
    items: [
      { label: "Start Here", href: "/start", desc: "The four ways into Moontuner" },
      { label: "Today's Directive", href: "/today", desc: "One instruction for today" },
      { label: "Journal", href: "/journal", desc: "Reflections and directives" },
      { label: "Explore", href: "/explore", desc: "Guides to lunar timing" },
      { label: "The Rites", href: "/rites", desc: "Standalone working documents" },
      { label: "Digital Smudging", href: "/digital-smudging", desc: "Intentional digital clearing" },
      { label: "Sessions", href: "/sessions", desc: "Work with Michael one to one" },
      { label: "About", href: "/about", desc: "Michael Moontuner and the system" },
    ],
  },
];

// ─── Footer ────────────────────────────────────────────────────────────────

export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: "Phasecraft",
    links: [
      { label: "Today's Signature", href: "/phasecraft", desc: "" },
      { label: "Phasecraft School", href: "/school", desc: "" },
      { label: "The 96 Matrix", href: "/phasecraft/matrix", desc: "" },
      { label: "Readers of the Book", href: "/book", desc: "" },
    ],
  },
  {
    title: "Practice & Hear",
    links: [
      { label: "Lunar Chaperone", href: "/lunar-chaperone", desc: "" },
      { label: "Workbook Program", href: "/program", desc: "" },
      { label: "Astro-Harmonic Symphony", href: "/quantumelodic", desc: "" },
      { label: "Harmonic Profile", href: "/harmonic-profile", desc: "" },
    ],
  },
  {
    title: "Reports",
    links: [
      { label: "Personal Lunar Map", href: "/lunar-reports", desc: "" },
      { label: "Cazimi Punchcard", href: "/cazimi", desc: "" },
      { label: "Lunar Cipher", href: "/lunar-cipher", desc: "" },
      { label: "Total Tuner", href: "/total-tuner", desc: "" },
    ],
  },
  {
    title: "Moontuner",
    links: [
      { label: "Start Here", href: "/start", desc: "" },
      { label: "The Method", href: "/method", desc: "" },
      { label: "Journal", href: "/journal", desc: "" },
      { label: "Free Guide", href: "/free-guide", desc: "" },
      { label: "Sessions", href: "/sessions", desc: "" },
      { label: "About", href: "/about", desc: "" },
      { label: "Blog", href: "https://moontuner.ghost.io", desc: "", external: true },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

/** True when `pathname` is `href` or a page beneath it. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Of a list of nav items, the href that best matches the current page (longest prefix wins). */
export function activeHref(items: NavItem[], pathname: string): string | null {
  let best: string | null = null;
  for (const item of items) {
    if (item.external || !isActivePath(pathname, item.href)) continue;
    if (!best || item.href.length > best.length) best = item.href;
  }
  return best;
}

/** The nav group that owns the current page, if any — used to mark it in the nav. */
export function currentGroupKey(pathname: string): NavGroup["key"] | null {
  for (const group of NAV_GROUPS) {
    if (group.items.some((item) => !item.external && isActivePath(pathname, item.href))) {
      return group.key;
    }
  }
  return null;
}
