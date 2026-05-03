// Cazimi engine — ported from the standalone Cazimi prototype into MOONtuner.
// A Cazimi is the moment a planet returns to the exact heart of the Sun
// (conjunction within ~17' of arc). For each natal placement, we search the
// next time the transiting Sun crosses that ecliptic longitude.
import {
  GeoVector,
  GeoMoon,
  Ecliptic,
  SearchSunLongitude,
  AstroTime,
} from "astronomy-engine";

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const STANDARD_BODIES = [
  "Sun", "Moon", "Mercury", "Venus", "Earth", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
];

export interface PlanetaryArchetype {
  name: string;
  symbol: string;
  theme: string;
  body: string;
  blurb: string;
  cazimiImpact: string;
}

export const PLANETARY_ARCHETYPES: Record<string, PlanetaryArchetype> = {
  Moon: { name: "Moon", symbol: "☽", theme: "Emotional Sovereignty", body: "Moon", blurb: "The Moon in the heart of the Sun marks a profound emotional reset.", cazimiImpact: "Deep clarity of feeling and the seeding of a new 28-day emotional cycle." },
  Mercury: { name: "Mercury", symbol: "☿", theme: "Illuminated Intellect", body: "Mercury", blurb: "Mercury Cazimi is a moment of pure intellectual brilliance.", cazimiImpact: "Crystalline communication. A perfect day for signing contracts or making major decisions." },
  Venus: { name: "Venus", symbol: "♀", theme: "Purified Desire", body: "Venus", blurb: "Venus in the heart of the Sun purifies your values and relational dynamics.", cazimiImpact: "A reset of the heart. You see your relationships and finances with absolute honesty." },
  Mars: { name: "Mars", symbol: "♂", theme: "Consecrated Will", body: "Mars", blurb: "Mars Cazimi aligns your raw drive with your highest purpose.", cazimiImpact: "Intentional action. Your energy is no longer scattered; it becomes a laser." },
  Jupiter: { name: "Jupiter", symbol: "♃", theme: "Expanded Vision", body: "Jupiter", blurb: "Jupiter Cazimi is a moment of supreme optimism and wisdom.", cazimiImpact: "Abundance and expansion. The Great Benefic grants a window of immense luck." },
  Saturn: { name: "Saturn", symbol: "♄", theme: "Sacred Architecture", body: "Saturn", blurb: "Saturn Cazimi brings the Sun's light to your deepest structures.", cazimiImpact: "Hard truths become clear. You understand exactly what work is required of you." },
  Uranus: { name: "Uranus", symbol: "♅", theme: "Electric Awakening", body: "Uranus", blurb: "Uranus Cazimi delivers sudden, liberating lightning strikes of insight.", cazimiImpact: "Radical breakthroughs. The chains of habit shatter under a flash of genius." },
  Neptune: { name: "Neptune", symbol: "♆", theme: "Divine Dissolution", body: "Neptune", blurb: "Neptune Cazimi illuminates the unseen and the spiritual.", cazimiImpact: "Spiritual epiphany. The ego dissolves into oceanic consciousness." },
  Pluto: { name: "Pluto", symbol: "♇", theme: "Alchemical Rebirth", body: "Pluto", blurb: "Pluto Cazimi shines light into the deepest shadow.", cazimiImpact: "Power reclamation. You face your shadow to find your true gold." },
  Chiron: { name: "Chiron", symbol: "⚷", theme: "The Wounded Healer", body: "chiron", blurb: "Chiron Cazimi illuminates the bridge between physical and spiritual.", cazimiImpact: "Profound healing of ancestral wounds. The integration of pain into wisdom." },
  Lilith: { name: "Lilith", symbol: "⚸", theme: "Primal Shadow", body: "lilith", blurb: "Lilith in the heart of the Sun brings raw, unconditioned feminine power to light.", cazimiImpact: "Liberation from inherited shame. Reclaiming wild, instinctual sovereignty." },
  Fortune: { name: "Pars Fortuna", symbol: "⊗", theme: "Karmic Success", body: "fortune", blurb: "The Sun returning to your Part of Fortune marks peak alignment with destiny.", cazimiImpact: "Material and spiritual synchronicity. A window where effort yields maximum harvest." },
  Ceres: { name: "Ceres", symbol: "⚳", theme: "The Great Mother", body: "ceres", blurb: "Ceres Cazimi highlights nurturance and the cycles of loss.", cazimiImpact: "Deep grounding. A reset of how you care for yourself and the Earth." },
  Pallas: { name: "Pallas", symbol: "⚴", theme: "Strategic Wisdom", body: "pallas", blurb: "Pallas Cazimi illuminates the patterns of the creative mind.", cazimiImpact: "Crystalline strategy. Perfect for solving complex problems through pattern." },
  Juno: { name: "Juno", symbol: "⚵", theme: "Sacred Partnership", body: "juno", blurb: "Juno Cazimi purifies the contracts of the heart.", cazimiImpact: "Relational clarity. Understanding the balance between independence and union." },
  Vesta: { name: "Vesta", symbol: "⚶", theme: "The Sacred Flame", body: "vesta", blurb: "Vesta Cazimi focuses your inner devotion.", cazimiImpact: "Spiritual dedication. A day to tend your inner fire and commit to sacred work." },
  Eris: { name: "Eris", symbol: "⚫", theme: "Discord & Revelation", body: "eris", blurb: "Eris Cazimi brings the light of truth to places of exclusion.", cazimiImpact: "Radical authenticity. Standing in your truth even when it disrupts the status quo." },
  Ascendant: { name: "Ascendant", symbol: "AC", theme: "The Gateway of Self", body: "asc", blurb: "The Sun conjunct your Ascendant is your personal Solar Dawn.", cazimiImpact: "Vitality surge. A total reset of your physical presence and outlook." },
  Midheaven: { name: "Midheaven", symbol: "MC", theme: "The Zenith", body: "mc", blurb: "The Sun conjunct your Midheaven illuminates your highest public calling.", cazimiImpact: "Professional visibility. A day where your true work is seen by the world." },
  IC: { name: "Imum Coeli", symbol: "IC", theme: "The Root", body: "ic", blurb: "The Sun conjunct your IC shines light into your private foundations.", cazimiImpact: "Home and ancestral healing. Deep soul-nourishment at your foundations." },
};

const getSiderealTime = (time: AstroTime, lon: number) => {
  const T = (time.ut - 2451545.0) / 36525;
  const gmst =
    280.46061837 +
    360.98564736629 * (time.ut - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  let lst = (gmst + lon) % 360;
  if (lst < 0) lst += 360;
  return lst;
};

const getHouseAngles = (time: AstroTime, lat: number, lon: number) => {
  const lst = getSiderealTime(time, lon) * (Math.PI / 180);
  const phi = lat * (Math.PI / 180);
  const eps = 23.4392911 * (Math.PI / 180);

  let mc = Math.atan2(Math.sin(lst), Math.cos(lst) * Math.cos(eps));
  mc = mc * (180 / Math.PI);
  if (mc < 0) mc += 360;

  let asc = Math.atan2(
    Math.cos(lst),
    -Math.sin(lst) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps),
  );
  asc = asc * (180 / Math.PI);
  if (asc < 0) asc += 360;

  const ic = (mc + 180) % 360;
  return { asc, mc, ic };
};

// Mean-element approximations for asteroids/sensitive points.
// Sufficient precision (~degrees) for cazimi-window dating.
const getAsteroidLon = (body: string, time: AstroTime) => {
  const t = (time.ut - 2451545.0) / 36525;
  const models: Record<string, number> = {
    ceres: 153.23 + 77.01 * t,
    pallas: 185.22 + 78.13 * t,
    juno: 324.32 + 83.22 * t,
    vesta: 250.05 + 99.44 * t,
    chiron: 120.33 + 7.08 * t,
    lilith: 282.66 + 40.67 * t,
    eris: 23.51 + 0.65 * t,
  };
  let lon = models[body];
  if (typeof lon === "undefined") return 0;
  lon = lon % 360;
  if (lon < 0) lon += 360;
  return lon;
};

export const getZodiacPlacement = (absoluteDegree: number) => {
  if (
    isNaN(absoluteDegree) ||
    absoluteDegree === null ||
    absoluteDegree === undefined
  ) {
    return { sign: "Unknown", degree: 0, minutes: 0, formatted: "0° 0' Unknown" };
  }
  const normDeg = ((absoluteDegree % 360) + 360) % 360;
  const signIndex = Math.max(0, Math.min(11, Math.floor(normDeg / 30)));
  const degreeInSign = Math.floor(normDeg % 30);
  const minutes = Math.floor((normDeg % 1) * 60);
  const signName = ZODIAC_SIGNS[signIndex] || "Aries";
  return {
    sign: signName,
    degree: degreeInSign,
    minutes,
    formatted: `${degreeInSign}° ${minutes}' ${signName}`,
  };
};

export const getTrueGeocentricLongitude = (
  body: string,
  time: AstroTime,
  lat: number,
  lon: number,
): number => {
  if (STANDARD_BODIES.includes(body)) {
    const vector =
      body === "Moon" ? GeoMoon(time) : GeoVector(body as never, time, true);
    return Ecliptic(vector).elon;
  }

  const angles = getHouseAngles(time, lat, lon);
  if (body === "asc") return angles.asc;
  if (body === "mc") return angles.mc;
  if (body === "ic") return angles.ic;

  if (body === "fortune") {
    const sunLon = Ecliptic(GeoVector("Sun" as never, time, true)).elon;
    const moonLon = Ecliptic(GeoMoon(time)).elon;
    const { asc, mc, ic } = angles;
    const isDay = sunLon > ic && sunLon < mc;
    const fortune = isDay ? asc + moonLon - sunLon : asc + sunLon - moonLon;
    return ((fortune % 360) + 360) % 360;
  }

  return getAsteroidLon(body, time);
};

export const calculateCazimiDate = (targetLongitude: number) => {
  try {
    const startTime = new AstroTime(new Date());
    const event = SearchSunLongitude(targetLongitude, startTime, 365.25);
    return event ? { iso: event.date.toISOString() } : null;
  } catch {
    return null;
  }
};

export interface CazimiEntry extends PlanetaryArchetype {
  id: string;
  placement: string;
  cazimiDate: string;
  cazimiTime: string;
}

export const generateCazimiProfile = async (
  birthDate: string,
  birthTime: string,
  utcOffset: number,
  lat: number,
  lon: number,
): Promise<CazimiEntry[]> => {
  const offsetNum = utcOffset || 0;
  const sign = offsetNum >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetNum);
  const hh = Math.floor(absOffset).toString().padStart(2, "0");
  const mm = Math.round((absOffset % 1) * 60).toString().padStart(2, "0");
  const isoString = `${birthDate}T${birthTime}:00${sign}${hh}:${mm}`;
  const birthTimeObj = new AstroTime(new Date(isoString));

  return Object.keys(PLANETARY_ARCHETYPES).map((key) => {
    const arch = PLANETARY_ARCHETYPES[key];
    const lonDeg = getTrueGeocentricLongitude(arch.body, birthTimeObj, lat, lon);
    const placement = getZodiacPlacement(lonDeg);
    const cazimi = calculateCazimiDate(lonDeg);
    return {
      id: key,
      ...arch,
      placement: placement.formatted,
      cazimiDate: cazimi
        ? new Date(cazimi.iso).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "Out of range",
      cazimiTime: cazimi
        ? new Date(cazimi.iso).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })
        : "—",
    };
  });
};

// Geocoding via OpenStreetMap Nominatim — no key required.
export const getCoordinates = async (location: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
  );
  if (!res.ok) throw new Error("Geocoding service unavailable.");
  const data = await res.json();
  if (!data || !data.length) throw new Error(`Could not resolve "${location}".`);
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    displayName: data[0].display_name as string,
  };
};

export const getTimezoneOffset = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`,
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.currentUtcOffset.seconds / 3600;
  } catch {
    return -(new Date().getTimezoneOffset() / 60);
  }
};
