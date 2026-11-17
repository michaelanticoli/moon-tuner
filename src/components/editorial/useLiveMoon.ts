import { useEffect, useState } from "react";
import { getMoonState, phaseName } from "@/phasecraft/lib/moon";
import { SIGN_NAMES } from "./editorialData";

export interface LiveMoon {
  phase: number;
  sign: number;
  phaseName: string;
  signName: string;
  /** 1–96, position in the Phasecraft matrix. */
  signature: number;
  /** Route to tonight's signature page, e.g. /phasecraft/signature/10-2 */
  href: string;
  illumination: number;
}

function read(): LiveMoon | null {
  try {
    const s = getMoonState(new Date());
    return {
      phase: s.phase,
      sign: s.sign,
      phaseName: phaseName(s.phase),
      signName: SIGN_NAMES[s.sign - 1],
      signature: (s.sign - 1) * 8 + s.phase,
      href: `/phasecraft/signature/${s.sign}-${s.phase}`,
      illumination: s.illumination,
    };
  } catch {
    return null;
  }
}

/** The Moon's phase and sign right now, refreshed every ten minutes. */
export function useLiveMoon(): LiveMoon | null {
  const [moon, setMoon] = useState<LiveMoon | null>(read);
  useEffect(() => {
    const id = window.setInterval(() => setMoon(read()), 10 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);
  return moon;
}
