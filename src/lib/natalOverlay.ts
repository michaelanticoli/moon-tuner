// Light natal overlay — given shared birth data, compute natal Sun/Moon/ASC
// once, cache it in sessionStorage, then surface transit→natal aspects
// (Sun & Moon transits to Sun/Moon/ASC) for any given calendar date.
//
// Scope: light. Only the three luminary points, only major aspects, 5° orb.
// Heavier overlays (full 10-planet matrix + houses) are explicitly deferred.
import { AstroTime, GeoVector, GeoMoon, Ecliptic } from "astronomy-engine";
import {
  getCoordinates,
  getTimezoneOffset,
  getTrueGeocentricLongitude,
  getZodiacPlacement,
} from "@/lib/cazimiEngine";
import type { SharedBirth } from "@/hooks/useSharedBirth";

export interface NatalLuminaries {
  sun: number;        // ecliptic longitude in degrees
  moon: number;
  asc: number;
  // For display
  sunSign: string;
  moonSign: string;
  ascSign: string;
}

export type AspectName = "conjunction" | "sextile" | "square" | "trine" | "opposition";

export interface AspectHit {
  transit: "Sun" | "Moon";
  natal: "Sun" | "Moon" | "ASC";
  aspect: AspectName;
  orb: number; // degrees, signed (positive = applying past exact by `orb`)
  glyph: string;
  label: string; // e.g. "☉ ☌ ☽"
}

const CACHE_KEY = "mt_natal_luminaries";

const ASPECTS: { name: AspectName; angle: number; glyph: string }[] = [
  { name: "conjunction", angle: 0,   glyph: "☌" },
  { name: "sextile",     angle: 60,  glyph: "✶" },
  { name: "square",      angle: 90,  glyph: "□" },
  { name: "trine",       angle: 120, glyph: "△" },
  { name: "opposition",  angle: 180, glyph: "☍" },
];
const ORB = 5; // degrees

const TRANSIT_GLYPHS: Record<"Sun" | "Moon", string> = { Sun: "☉", Moon: "☽" };
const NATAL_GLYPHS: Record<"Sun" | "Moon" | "ASC", string> = {
  Sun: "☉",
  Moon: "☽",
  ASC: "AC",
};

function arcDistance(a: number, b: number): number {
  const d = Math.abs(((a - b + 540) % 360) - 180);
  return d;
}

export function readCachedLuminaries(): NatalLuminaries | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as NatalLuminaries) : null;
  } catch {
    return null;
  }
}

function writeCachedLuminaries(data: NatalLuminaries) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function clearCachedLuminaries() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CACHE_KEY);
}

/**
 * Compute and cache natal Sun/Moon/ASC for the given birth data. Returns null
 * if birth data is incomplete or geocoding fails.
 */
export async function computeNatalLuminaries(
  birth: SharedBirth,
): Promise<NatalLuminaries | null> {
  if (!birth.date || !birth.time || !birth.location) return null;
  try {
    const { lat, lon } = await getCoordinates(birth.location);
    const utcOffset = await getTimezoneOffset(lat, lon);
    const sign = utcOffset >= 0 ? "+" : "-";
    const abs = Math.abs(utcOffset);
    const hh = Math.floor(abs).toString().padStart(2, "0");
    const mm = Math.round((abs % 1) * 60).toString().padStart(2, "0");
    const iso = `${birth.date}T${birth.time}:00${sign}${hh}:${mm}`;
    const t = new AstroTime(new Date(iso));

    const sun = getTrueGeocentricLongitude("Sun", t, lat, lon);
    const moon = getTrueGeocentricLongitude("Moon", t, lat, lon);
    const asc = getTrueGeocentricLongitude("asc", t, lat, lon);

    const result: NatalLuminaries = {
      sun,
      moon,
      asc,
      sunSign: getZodiacPlacement(sun).sign,
      moonSign: getZodiacPlacement(moon).sign,
      ascSign: getZodiacPlacement(asc).sign,
    };
    writeCachedLuminaries(result);
    return result;
  } catch {
    return null;
  }
}

/**
 * Compute transit aspects for a given date: transiting Sun & Moon to natal
 * Sun, Moon, ASC. Uses noon UTC for the date to keep results stable across
 * timezones (the Moon moves ~13°/day, so noon is a reasonable midpoint).
 */
export function computeTransitsForDate(
  date: Date,
  natal: NatalLuminaries,
): AspectHit[] {
  const noonUtc = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0),
  );
  const t = new AstroTime(noonUtc);
  const transitSun = Ecliptic(GeoVector("Sun" as never, t, true)).elon;
  const transitMoon = Ecliptic(GeoMoon(t)).elon;

  const transits: { name: "Sun" | "Moon"; lon: number }[] = [
    { name: "Sun", lon: transitSun },
    { name: "Moon", lon: transitMoon },
  ];
  const natalPoints: { name: "Sun" | "Moon" | "ASC"; lon: number }[] = [
    { name: "Sun", lon: natal.sun },
    { name: "Moon", lon: natal.moon },
    { name: "ASC", lon: natal.asc },
  ];

  const hits: AspectHit[] = [];
  for (const tr of transits) {
    for (const na of natalPoints) {
      const sep = arcDistance(tr.lon, na.lon);
      for (const asp of ASPECTS) {
        const orb = Math.abs(sep - asp.angle);
        if (orb <= ORB) {
          hits.push({
            transit: tr.name,
            natal: na.name,
            aspect: asp.name,
            orb: Number(orb.toFixed(2)),
            glyph: asp.glyph,
            label: `${TRANSIT_GLYPHS[tr.name]} ${asp.glyph} ${NATAL_GLYPHS[na.name]}`,
          });
        }
      }
    }
  }
  // Tightest orbs first.
  hits.sort((a, b) => a.orb - b.orb);
  return hits;
}
