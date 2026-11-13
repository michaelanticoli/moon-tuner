import * as Astronomy from 'astronomy-engine';

export interface MoonState {
  /** Moon phase 1-8 matching matrix columns (1=New, 5=Full) */
  phase: number;
  /** Phase angle 0-360 (0=new, 90=first quarter, 180=full, 270=last quarter) */
  phaseAngle: number;
  /** Illuminated fraction 0-1 */
  illumination: number;
  /** Zodiac sign 1-12 (1=Aries) matching matrix rows */
  sign: number;
  /** Ecliptic longitude 0-360 */
  eclipticLon: number;
  /** Degrees within current sign 0-30 */
  degreeInSign: number;
  /** Decan/arc within sign: 1, 2, or 3 (each 10°) */
  decan: number;
  /** Whether moon is waxing (illumination growing) */
  waxing: boolean;
  /** Days until the next phase begins */
  nextPhaseInDays: number;
  /** Name of the phase that begins next */
  nextPhaseName: string;
}

const PHASE_NAMES = [
  'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
  'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent',
];

/**
 * Map a phase angle (0-360, the Moon's angle ahead of the Sun) to one of the
 * 8 matrix columns.
 *
 * PHASECRAFT (Chapter 1, "The Geometry of the Month") follows Dane Rudhyar:
 * each phase begins at its exact angle and lasts until the next 45° mark.
 * New Moon 0°–45°, Waxing Crescent 45°–90°, First Quarter 90°–135°, …,
 * Waning Crescent 315°–360°. So "First Quarter" means the three to four days
 * that begin at the exact First Quarter, not the days around it.
 */
export function phaseAngleToColumn(angle: number): number {
  const a = ((angle % 360) + 360) % 360;
  return Math.min(8, Math.floor(a / 45) + 1); // 1-8
}

export function getMoonState(date: Date = new Date()): MoonState {
  // Phase angle: angle Sun→Earth→Moon (ecliptic longitude difference)
  const phaseAngle = Astronomy.MoonPhase(date);
  const illumination = Astronomy.Illumination(Astronomy.Body.Moon, date).phase_fraction;

  // Geocentric ecliptic longitude of the Moon
  const eclip = Astronomy.EclipticGeoMoon(date);
  const lon = ((eclip.lon % 360) + 360) % 360;

  const signIndex = Math.floor(lon / 30); // 0-11, 0 = Aries
  const degreeInSign = lon - signIndex * 30;
  const decan = Math.min(3, Math.floor(degreeInSign / 10) + 1);

  const phase = phaseAngleToColumn(phaseAngle);
  const waxing = phaseAngle < 180;

  // Next phase boundary: the next 45° mark, where the next phase begins.
  const nextBoundary = (Math.floor(phaseAngle / 45) + 1) * 45; // 45..360
  let nextPhaseInDays = 0;
  try {
    const search = Astronomy.SearchMoonPhase(nextBoundary % 360, date, 30);
    if (search) {
      nextPhaseInDays = (search.date.getTime() - date.getTime()) / 86400000;
    }
  } catch {
    nextPhaseInDays = 0;
  }
  const nextPhaseName = PHASE_NAMES[(nextBoundary / 45) % 8];

  return {
    phase,
    phaseAngle,
    illumination,
    sign: signIndex + 1,
    eclipticLon: lon,
    degreeInSign,
    decan,
    waxing,
    nextPhaseInDays,
    nextPhaseName,
  };
}

export function phaseName(phase: number): string {
  return PHASE_NAMES[phase - 1] ?? 'Unknown';
}

/**
 * Resolve the matrix effect (1-96) for a given moon state.
 * Matrix layout: row = sign (1-12), column = phase (1-8). Effect day = (row-1)*8 + column.
 */
export function effectFromMoonState(state: MoonState): number {
  return (state.sign - 1) * 8 + state.phase;
}

export function formatDegree(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d}°${m.toString().padStart(2, '0')}'`;
}

/** The phase column and sign row at a moment, without the next-phase search (cheap; for calendars). */
export function signatureAt(date: Date): { phase: number; sign: number; day: number } {
  const phase = phaseAngleToColumn(Astronomy.MoonPhase(date));
  const lon = ((Astronomy.EclipticGeoMoon(date).lon % 360) + 360) % 360;
  const sign = Math.floor(lon / 30) + 1;
  return { phase, sign, day: (sign - 1) * 8 + phase };
}

export interface PhaseStart {
  /** Phase column 1–8 that begins at this moment. */
  phase: number;
  name: string;
  date: Date;
}

/** Every moment a phase begins (each 45° mark) between `from` and `to`. */
export function phaseStartsBetween(from: Date, to: Date): PhaseStart[] {
  const out: PhaseStart[] = [];
  const spanDays = (to.getTime() - from.getTime()) / 86400000;
  for (let k = 0; k < 8; k++) {
    let cursor = from;
    for (let guard = 0; guard < 3; guard++) {
      const remaining = (to.getTime() - cursor.getTime()) / 86400000;
      if (remaining <= 0) break;
      let found: Astronomy.AstroTime | null = null;
      try {
        found = Astronomy.SearchMoonPhase(k * 45, cursor, Math.min(remaining, spanDays + 1));
      } catch {
        found = null;
      }
      if (!found || found.date.getTime() >= to.getTime()) break;
      out.push({ phase: k + 1, name: PHASE_NAMES[k], date: found.date });
      cursor = new Date(found.date.getTime() + 86400000);
    }
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}
