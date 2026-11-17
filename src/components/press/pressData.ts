/**
 * Moontuner Press — brand copy and catalogue data.
 *
 * Keep all public-facing press copy here so wording can be edited in one
 * place. Titles and statements are brand-approved: change them deliberately.
 */

export const PRESS_EST = "Est. MMXIV";

export const PRESS_DESCRIPTOR = [
  "Metaphysical / Esoteric",
  "Quantum Publications",
  "Offering Cultural Content",
] as const;

export const PRESS_MISSION = {
  label: "The Agency",
  statement:
    "A specialized publishing agency focusing on transformative works combining cultural anthropology, systems thinking, strategic planning, and consciousness research.",
  supporting:
    "Broadcasting transformative cultural intelligence through strategic content creation, helping readers optimize their analytical and cultural strategy potential.",
} as const;

export type FocusIconKey = "culture" | "systems" | "psychology" | "framework";

export const PRESS_FOCUS: ReadonlyArray<{ n: string; title: string; icon: FocusIconKey }> = [
  { n: "01", title: "Cultural Content Strategy", icon: "culture" },
  { n: "02", title: "Systems Thinking Publishing", icon: "systems" },
  { n: "03", title: "Consumer Psychology Literature", icon: "psychology" },
  { n: "04", title: "Strategic Framework Development", icon: "framework" },
];

export type WorkStatus = "Proprietary" | "Restricted" | "Sealed";

export interface PressWork {
  id: string;
  title: string;
  category: string;
  status: WorkStatus;
}

/**
 * Index of Works. These are proprietary — the catalogue is informational
 * only. Never attach hrefs, downloads, or previews to these entries.
 */
export const PRESS_WORKS: ReadonlyArray<PressWork> = [
  { id: "PUB-01", title: "The Codex Notation System", category: "Systems Framework", status: "Proprietary" },
  { id: "PUB-02", title: "The Quantumelodic System", category: "Core Documentation", status: "Proprietary" },
  { id: "PUB-03", title: "Lunar Chaperone", category: "Procedural Workbook", status: "Restricted" },
  { id: "PUB-04", title: "Phasecraft Harmonics Intensive", category: "5-Day Curriculum", status: "Restricted" },
  { id: "PUB-05", title: "Quantumelodic Symphonic Ephemeris: Vol. I", category: "Strategic Mapping", status: "Sealed" },
  { id: "PUB-06", title: "Quantumelodic Symphonic Ephemeris: Vol. II", category: "Strategic Mapping", status: "Sealed" },
  { id: "PUB-07", title: "Quantumelodic Symphonic Ephemeris: Vol. III", category: "Strategic Mapping", status: "Sealed" },
  { id: "PUB-08", title: "Quantumelodic Symphonic Ephemeris: Vol. IV", category: "Strategic Mapping", status: "Sealed" },
  { id: "PUB-09", title: "Quantumelodic Symphonic Ephemeris: Vol. V", category: "Strategic Mapping", status: "Sealed" },
  { id: "PUB-10", title: "Quantumelodic Symphonic Ephemeris: Back Matter", category: "Reference / Appendices", status: "Sealed" },
  { id: "PUB-11", title: "Cosmic Pragmatic Synergy", category: "Theoretical Framework", status: "Proprietary" },
];

export const PRESS_CONTACT_EMAIL = "hello@moontuner.xyz";
