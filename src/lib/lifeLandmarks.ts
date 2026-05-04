// Life Landmarks engine — detects high-significance personal events on a
// given calendar date by comparing transits to natal points.
//
// "Landmarks" are the events users intuitively recognize:
//   • Solar Return  (Sun ☌ natal Sun)         → "It's your birthday"
//   • Lunar Return  (Moon ☌ natal Moon)       → "Your monthly emotional reset"
//   • Sun Cazimi to natal point               → "Sun in heart of your natal X"
//   • Eclipse near natal luminary             → "Eclipse on your Sun/Moon/ASC"
//   • Half-birthday (Sun ☍ natal Sun)         → "Your solar opposition"
//   • Rising Return (Sun ☌ natal ASC)         → "Personal solar dawn"
//
// This is the connective tissue between Cipher (today), the Cazimi engine
// (natal reset moments), and the workbook journey (cyclical context).

import {
  AstroTime,
  GeoVector,
  GeoMoon,
  Ecliptic,
  SearchSunLongitude,
} from "astronomy-engine";
import type { NatalLuminaries } from "@/lib/natalOverlay";
import type { DayEvents } from "@/data/parseICS";

export type LandmarkKind =
  | "solar-return"
  | "half-birthday"
  | "lunar-return"
  | "rising-return"
  | "sun-cazimi-natal-moon"
  | "sun-cazimi-natal-asc"
  | "eclipse-on-natal-sun"
  | "eclipse-on-natal-moon"
  | "eclipse-on-natal-asc";

export type LandmarkTier = "major" | "notable" | "subtle";

export interface Landmark {
  kind: LandmarkKind;
  tier: LandmarkTier;
  title: string;        // user-facing headline
  subtitle: string;     // one-line context
  glyph: string;        // single glyph for the badge
  orb?: number;         // degrees from exact, when applicable
}

const CAZIMI_ORB = 0.28;   // ~17 arc-minutes (classical cazimi)
const RETURN_ORB = 1.0;    // 1° = "today" for slow-moving Sun
const LUNAR_RETURN_ORB = 6.0; // Moon moves ~13°/day — wider window per day
const ECLIPSE_ORB = 8.0;

function arcDistance(a: number, b: number): number {
  return Math.abs(((a - b + 540) % 360) - 180);
}

function noonUtc(date: Date): AstroTime {
  return new AstroTime(
    new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)),
  );
}

function getSunLon(t: AstroTime): number {
  return Ecliptic(GeoVector("Sun" as never, t, true)).elon;
}

function getMoonLon(t: AstroTime): number {
  return Ecliptic(GeoMoon(t)).elon;
}

/**
 * Detect all landmarks active on a given date for a given natal chart.
 * Returns sorted by tier (major first) then by tightest orb.
 */
export function detectLandmarks(
  date: Date,
  natal: NatalLuminaries,
  dayEvents?: DayEvents | null,
): Landmark[] {
  const t = noonUtc(date);
  const sunLon = getSunLon(t);
  const moonLon = getMoonLon(t);

  const landmarks: Landmark[] = [];

  // Sun → natal Sun (Solar Return / Half-Birthday)
  const sunToNatalSun = arcDistance(sunLon, natal.sun);
  if (sunToNatalSun <= RETURN_ORB) {
    landmarks.push({
      kind: "solar-return",
      tier: "major",
      title: "Solar Return",
      subtitle: "The Sun returns to its natal degree — your astrological birthday.",
      glyph: "☉",
      orb: Number(sunToNatalSun.toFixed(2)),
    });
  } else {
    const opp = Math.abs(sunToNatalSun - 180);
    if (opp <= RETURN_ORB) {
      landmarks.push({
        kind: "half-birthday",
        tier: "notable",
        title: "Solar Opposition",
        subtitle: "The Sun stands opposite its natal place — your half-birthday turning point.",
        glyph: "☉☍",
        orb: Number(opp.toFixed(2)),
      });
    }
  }

  // Sun → natal ASC (Rising Return)
  const sunToNatalAsc = arcDistance(sunLon, natal.asc);
  if (sunToNatalAsc <= RETURN_ORB) {
    landmarks.push({
      kind: "rising-return",
      tier: "major",
      title: "Personal Solar Dawn",
      subtitle: "The Sun crosses your Ascendant — vitality and visibility surge.",
      glyph: "☉ AC",
      orb: Number(sunToNatalAsc.toFixed(2)),
    });
  }

  // Sun Cazimi to natal Moon (rare, but huge when it lands)
  if (sunToNatalSun > CAZIMI_ORB) {
    const sunToNatalMoon = arcDistance(sunLon, natal.moon);
    if (sunToNatalMoon <= CAZIMI_ORB * 4) {
      landmarks.push({
        kind: "sun-cazimi-natal-moon",
        tier: "notable",
        title: "Sun on Natal Moon",
        subtitle: "Conscious will meets your inner emotional core. A New Moon to your soul.",
        glyph: "☉ ☽",
        orb: Number(sunToNatalMoon.toFixed(2)),
      });
    }
  }

  // Lunar Return — Moon back to its natal degree
  const moonToNatalMoon = arcDistance(moonLon, natal.moon);
  if (moonToNatalMoon <= LUNAR_RETURN_ORB) {
    landmarks.push({
      kind: "lunar-return",
      tier: moonToNatalMoon <= 2 ? "notable" : "subtle",
      title: "Lunar Return",
      subtitle: "The Moon returns to its natal place — your monthly emotional reset.",
      glyph: "☽",
      orb: Number(moonToNatalMoon.toFixed(2)),
    });
  }

  // Eclipse contacts — pull from ICS dayEvents if present
  if (dayEvents?.events.some((e) => e.summary.toLowerCase().includes("eclipse"))) {
    const checks: { name: "Sun" | "Moon" | "ASC"; lon: number; kind: LandmarkKind }[] = [
      { name: "Sun", lon: natal.sun, kind: "eclipse-on-natal-sun" },
      { name: "Moon", lon: natal.moon, kind: "eclipse-on-natal-moon" },
      { name: "ASC", lon: natal.asc, kind: "eclipse-on-natal-asc" },
    ];
    for (const c of checks) {
      const orbSun = arcDistance(sunLon, c.lon);
      const orbMoon = arcDistance(moonLon, c.lon);
      const tightest = Math.min(orbSun, orbMoon);
      if (tightest <= ECLIPSE_ORB) {
        landmarks.push({
          kind: c.kind,
          tier: "major",
          title: `Eclipse on Natal ${c.name}`,
          subtitle: "An eclipse activates your natal point — multi-month chapter shift.",
          glyph: "◐",
          orb: Number(tightest.toFixed(2)),
        });
      }
    }
  }

  const tierRank: Record<LandmarkTier, number> = { major: 0, notable: 1, subtle: 2 };
  landmarks.sort((a, b) => {
    const t = tierRank[a.tier] - tierRank[b.tier];
    if (t !== 0) return t;
    return (a.orb ?? 99) - (b.orb ?? 99);
  });

  return landmarks;
}

/**
 * Find the next Solar Return date in the future (used for the Cipher
 * calendar to hint "your next birthday window starts here").
 */
export function findNextSolarReturn(natalSunLon: number): Date | null {
  try {
    const event = SearchSunLongitude(natalSunLon, new AstroTime(new Date()), 366);
    return event ? event.date : null;
  } catch {
    return null;
  }
}
