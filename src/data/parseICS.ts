// Parse ICS calendar data into typed event structures
// Source: Quantumelodic_2026_Calendar_v4.ics

export type ICSEventCategory =
  | "VOID_MOON"
  | "LUNAR"
  | "INGRESS"
  | "STATION"
  | "DAILY_ATMOSPHERE"
  | "ASPECT"
  | "RETROGRADE"
  | "QUANTUMELODIC";

export interface ICSEvent {
  dtstart: Date;
  dtend: Date;
  summary: string;
  description: string;
  categories: string[];
  uid: string;
  /** Cleaned summary without emoji prefixes */
  title: string;
  /** Moon sign extracted from category (e.g. MOON_ARIES → Aries) */
  moonSign?: string;
  /** Zodiac sign extracted from summary for phase events */
  phaseSign?: string;
  /** Primary category (VOID_MOON, LUNAR, INGRESS, etc.) */
  primaryCategory: string;
}

/** All events for a single date */
export interface DayEvents {
  date: string; // "2026-01-15"
  events: ICSEvent[];
  dailyAtmosphere?: ICSEvent;
  voidMoon?: ICSEvent;
  lunarPhase?: ICSEvent;
  ingresses: ICSEvent[];
  stations: ICSEvent[];
  aspects: ICSEvent[];
}

const SIGN_FROM_CATEGORY: Record<string, string> = {
  MOON_ARIES: "Aries",
  MOON_TAURUS: "Taurus",
  MOON_GEMINI: "Gemini",
  MOON_CANCER: "Cancer",
  MOON_LEO: "Leo",
  MOON_VIRGO: "Virgo",
  MOON_LIBRA: "Libra",
  MOON_SCORPIO: "Scorpio",
  MOON_SAGITTARIUS: "Sagittarius",
  MOON_CAPRICORN: "Capricorn",
  MOON_AQUARIUS: "Aquarius",
  MOON_PISCES: "Pisces",
};

const SIGN_EMOJI_MAP: Record<string, string> = {
  "♈": "Aries", "♉": "Taurus", "♊": "Gemini", "♋": "Cancer",
  "♌": "Leo", "♍": "Virgo", "♎": "Libra", "♏": "Scorpio",
  "♐": "Sagittarius", "♑": "Capricorn", "♒": "Aquarius", "♓": "Pisces",
};

function parseDTSTART(val: string): Date {
  // Format: 20260101T010200Z
  const y = parseInt(val.slice(0, 4));
  const m = parseInt(val.slice(4, 6)) - 1;
  const d = parseInt(val.slice(6, 8));
  const h = parseInt(val.slice(9, 11));
  const mi = parseInt(val.slice(11, 13));
  const s = parseInt(val.slice(13, 15));
  return new Date(Date.UTC(y, m, d, h, mi, s));
}

function unescapeICS(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function extractPhaseSign(summary: string): string | undefined {
  // "🌕 Full Moon ♋Cancer" → Cancer
  for (const [emoji, sign] of Object.entries(SIGN_EMOJI_MAP)) {
    if (summary.includes(emoji)) return sign;
  }
  return undefined;
}

function cleanTitle(summary: string): string {
  // Remove leading emoji clusters
  return summary.replace(/^[\p{Emoji}\p{Emoji_Component}\s♈♉♊♋♌♍♎♏♐♑♒♓✦💫🌙🌕🌑🌓🌗🌿🕯️⚡🔥🌊💎🌸☀️]+/u, "").trim();
}

function extractMoonSign(categories: string[]): string | undefined {
  for (const cat of categories) {
    if (SIGN_FROM_CATEGORY[cat]) return SIGN_FROM_CATEGORY[cat];
  }
  return undefined;
}

function determinePrimaryCategory(categories: string[]): string {
  const priority = ["LUNAR", "VOID_MOON", "DAILY_ATMOSPHERE", "INGRESS", "STATION", "ASPECT", "RETROGRADE"];
  for (const p of priority) {
    if (categories.includes(p)) return p;
  }
  return "QUANTUMELODIC";
}

export function parseICS(icsText: string): ICSEvent[] {
  const events: ICSEvent[] = [];
  const blocks = icsText.split("BEGIN:VEVENT");

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split("END:VEVENT")[0];
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);

    const fields: Record<string, string> = {};
    let currentKey = "";

    for (const line of lines) {
      // Handle line folding (lines starting with space/tab are continuations)
      if (line.startsWith(" ") || line.startsWith("\t")) {
        if (currentKey) {
          fields[currentKey] += line.trimStart();
        }
        continue;
      }
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;
      const key = line.slice(0, colonIdx).split(";")[0]; // strip params like DTSTART;VALUE=DATE
      const value = line.slice(colonIdx + 1);
      fields[key] = value;
      currentKey = key;
    }

    if (!fields.DTSTART || !fields.SUMMARY) continue;

    const categories = (fields.CATEGORIES || "").split(",").map(c => c.trim()).filter(Boolean);
    const summary = unescapeICS(fields.SUMMARY || "");
    const description = unescapeICS(fields.DESCRIPTION || "");

    events.push({
      dtstart: parseDTSTART(fields.DTSTART),
      dtend: fields.DTEND ? parseDTSTART(fields.DTEND) : parseDTSTART(fields.DTSTART),
      summary,
      description,
      categories,
      uid: fields.UID || "",
      title: cleanTitle(summary),
      moonSign: extractMoonSign(categories),
      phaseSign: extractPhaseSign(summary),
      primaryCategory: determinePrimaryCategory(categories),
    });
  }

  return events.sort((a, b) => a.dtstart.getTime() - b.dtstart.getTime());
}

function dateKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

/** Index all events by date for quick lookup */
export function indexEventsByDate(events: ICSEvent[]): Map<string, DayEvents> {
  const map = new Map<string, DayEvents>();

  for (const event of events) {
    const key = dateKey(event.dtstart);
    if (!map.has(key)) {
      map.set(key, {
        date: key,
        events: [],
        ingresses: [],
        stations: [],
        aspects: [],
      });
    }
    const day = map.get(key)!;
    day.events.push(event);

    switch (event.primaryCategory) {
      case "DAILY_ATMOSPHERE":
        day.dailyAtmosphere = event;
        break;
      case "VOID_MOON":
        day.voidMoon = event;
        break;
      case "LUNAR":
        day.lunarPhase = event;
        break;
      case "INGRESS":
        day.ingresses.push(event);
        break;
      case "STATION":
        day.stations.push(event);
        break;
      case "ASPECT":
        day.aspects.push(event);
        break;
    }
  }

  return map;
}

// Singleton cache
let cachedEvents: ICSEvent[] | null = null;
let cachedIndex: Map<string, DayEvents> | null = null;

export async function getICSEvents(): Promise<ICSEvent[]> {
  if (cachedEvents) return cachedEvents;
  const mod = await import("@/data/Quantumelodic_2026_Calendar_v4.ics?raw");
  cachedEvents = parseICS(mod.default);
  return cachedEvents;
}

export async function getICSEventIndex(): Promise<Map<string, DayEvents>> {
  if (cachedIndex) return cachedIndex;
  const events = await getICSEvents();
  cachedIndex = indexEventsByDate(events);
  return cachedIndex;
}

/** Get all events for a specific date */
export function getEventsForDate(index: Map<string, DayEvents>, date: Date): DayEvents | null {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return index.get(key) || null;
}
