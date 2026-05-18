import * as Astronomy from 'astronomy-engine';

export interface MoonState {
  /** Moon phase 1-8 matching matrix columns (1=New, 5=Full) */
  phase: number;
  /** Phase angle 0-360 (0=new, 90=first quarter, 180=full, 270=third quarter) */
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
  /** Days until next phase boundary */
  nextPhaseInDays: number;
  /** Name of next major phase boundary */
  nextPhaseName: string;
}

const PHASE_NAMES = [
  'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
  'Full Moon', 'Waning Gibbous', 'Third Quarter', 'Waning Crescent',
];

/**
 * Map a phase angle (0-360) to one of 8 matrix columns.
 * Each phase occupies a 45° band centered on its canonical angle.
 */
function phaseAngleToColumn(angle: number): number {
  const shifted = (angle + 22.5) % 360;
  return Math.floor(shifted / 45) + 1; // 1-8
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

  // Next major quarter (0, 90, 180, 270)
  const quarters = [0, 90, 180, 270];
  let nextQuarter = quarters.find((q) => q > phaseAngle);
  if (nextQuarter === undefined) nextQuarter = 360; // back to new
  const quarterNames: Record<number, string> = {
    0: 'New Moon', 90: 'First Quarter', 180: 'Full Moon', 270: 'Third Quarter', 360: 'New Moon',
  };
  let nextPhaseInDays = 0;
  try {
    const search = Astronomy.SearchMoonPhase(nextQuarter % 360, date, 30);
    if (search) {
      nextPhaseInDays = (search.date.getTime() - date.getTime()) / 86400000;
    }
  } catch {
    nextPhaseInDays = 0;
  }

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
    nextPhaseName: quarterNames[nextQuarter] ?? 'New Moon',
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
