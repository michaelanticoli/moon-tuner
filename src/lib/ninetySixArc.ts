// 96-Arc Engine — maps a calendar day to its unique cell in the
// 8 phases × 12 signs lattice (96 combinations) and surfaces the
// matching Chaperone workbook arc + Quantumelodic resonance layer.
//
// This is the connective tissue between Cipher (today), the Lunar
// System (8×12 grid), the 26-arc Chaperone workbooks, and the
// Quantumelodic phase-tone correspondences.

import {
  getPhaseCorrespondence,
  getZodiacCorrespondence,
  type PhaseCorrespondence,
  type ZodiacCorrespondence,
} from "@/data/chaperoneCorrespondences";

const PHASES_ORDER = [
  "New Moon",
  "Crescent",
  "First Quarter",
  "Gibbous",
  "Full Moon",
  "Disseminating",
  "Last Quarter",
  "Balsamic",
] as const;

const SIGNS_ORDER = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

// Site uses 4 ICS-named phases for the live calendar; map them to the
// 8-phase lattice using the illumination direction.
const PHASE_NAME_MAP: Record<string, typeof PHASES_ORDER[number]> = {
  "New Moon": "New Moon",
  "Waxing Crescent": "Crescent",
  "First Quarter": "First Quarter",
  "Waxing Gibbous": "Gibbous",
  "Full Moon": "Full Moon",
  "Waning Gibbous": "Disseminating",
  "Last Quarter": "Last Quarter",
  "Waning Crescent": "Balsamic",
};

export interface NinetySixCell {
  cellNumber: number;          // 1..96
  phase: typeof PHASES_ORDER[number];
  sign: typeof SIGNS_ORDER[number];
  phaseIndex: number;          // 0..7
  signIndex: number;           // 0..11
  phaseLore: PhaseCorrespondence | undefined;
  signLore: ZodiacCorrespondence | undefined;
  resonance: {
    hz: number | null;         // Solfeggio frequency
    chakra: string | null;
    bodyZone: string | null;   // from sign rulership
    element: string;           // sign element (governs feel)
  };
  arc: {
    half: "waxing" | "waning"; // New→Full or Full→New
    intent: string;            // one-line directive
    workbookHref: string;      // /workbooks?cell=...
  };
}

export function getCellForPhaseSign(
  phaseName: string,
  signName: string,
): NinetySixCell | null {
  const phase = PHASE_NAME_MAP[phaseName] ?? null;
  const sign = SIGNS_ORDER.find((s) => s === signName) ?? null;
  if (!phase || !sign) return null;

  const phaseIndex = PHASES_ORDER.indexOf(phase);
  const signIndex = SIGNS_ORDER.indexOf(sign);
  const cellNumber = phaseIndex * 12 + signIndex + 1;

  const phaseLore = getPhaseCorrespondence(phase);
  const signLore = getZodiacCorrespondence(sign);

  const half: "waxing" | "waning" = phaseIndex < 4 ? "waxing" : "waning";
  const intent = arcIntent(phase, sign);

  return {
    cellNumber,
    phase,
    sign,
    phaseIndex,
    signIndex,
    phaseLore,
    signLore,
    resonance: {
      hz: phaseLore?.solfeggio ?? null,
      chakra: phaseLore?.chakra ?? null,
      bodyZone: signLore?.body ?? null,
      element: signLore?.element ?? "",
    },
    arc: {
      half,
      intent,
      workbookHref: `/workbooks?cell=${cellNumber}&phase=${encodeURIComponent(phase)}&sign=${encodeURIComponent(sign)}`,
    },
  };
}

function arcIntent(phase: string, sign: string): string {
  const phaseDirective: Record<string, string> = {
    "New Moon": "Seed an intention through",
    "Crescent": "Gather resources for",
    "First Quarter": "Take decisive action with",
    "Gibbous": "Refine and adjust around",
    "Full Moon": "Reveal and celebrate",
    "Disseminating": "Share and teach from",
    "Last Quarter": "Release what no longer serves in",
    "Balsamic": "Rest and dream into",
  };
  const signFlavor: Record<string, string> = {
    Aries: "courage and initiative",
    Taurus: "embodiment and grounded value",
    Gemini: "communication and curiosity",
    Cancer: "emotional safety and home",
    Leo: "self-expression and heart",
    Virgo: "craft, order, and service",
    Libra: "relationship and balance",
    Scorpio: "depth and transformation",
    Sagittarius: "expansion and meaning",
    Capricorn: "structure and mastery",
    Aquarius: "vision and the collective",
    Pisces: "imagination and surrender",
  };
  return `${phaseDirective[phase] ?? "Move with"} ${signFlavor[sign] ?? sign}.`;
}
