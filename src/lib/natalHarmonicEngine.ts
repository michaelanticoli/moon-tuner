/**
 * Natal Harmonic Engine
 *
 * Computation layer for the Natal Harmonic Generator page.
 * Maps QuantumMelodicReading data to the display shapes expected
 * by the natal-harmonic UI components.
 */

import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";

// ─── Planetary positions map ────────────────────────────────────────────────

export interface PlanetDisplayData {
  zodiacSign: string;
  frequency: number;
}

/** Build the { planetKey → {zodiacSign, frequency} } map used by PlanetaryPositions */
export function buildPlanetaryPositionsMap(
  qmReading: QuantumMelodicReading
): Record<string, PlanetDisplayData> {
  const result: Record<string, PlanetDisplayData> = {};
  for (const p of qmReading.planets) {
    if (p.position.name === "Ascendant") continue;
    const key = p.position.name
      .replace(/([A-Z])/g, (m, c, i) => (i === 0 ? c.toLowerCase() : c))
      .replace(/\s+/g, "");
    result[key] = {
      zodiacSign: p.position.sign,
      frequency: p.qmData?.frequency_hz ?? 0,
    };
  }
  return result;
}

// ─── Personal scale ─────────────────────────────────────────────────────────

export interface ScaleNote {
  name: string;
  frequency: number;
}

/** Modal interval ratios (just intonation) for each supported mode */
const MODAL_RATIOS: Record<string, number[]> = {
  Ionian:     [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8],
  Dorian:     [1, 9 / 8, 32 / 27, 4 / 3, 3 / 2, 27 / 16, 16 / 9],
  Phrygian:   [1, 16 / 15, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5],
  Lydian:     [1, 9 / 8, 5 / 4, 45 / 32, 3 / 2, 5 / 3, 15 / 8],
  Mixolydian: [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 16 / 9],
  Aeolian:    [1, 9 / 8, 32 / 27, 4 / 3, 3 / 2, 8 / 5, 16 / 9],
  Locrian:    [1, 16 / 15, 6 / 5, 4 / 3, 64 / 45, 8 / 5, 16 / 9],
};

/** Maps intention id → modal name */
const INTENTION_MODES: Record<string, string> = {
  healing:     "Dorian",
  activation:  "Mixolydian",
  integration: "Lydian",
  shadow:      "Phrygian",
  clarity:     "Ionian",
};

const SCALE_DEGREE_NAMES = ["I", "II", "III", "IV", "V", "VI", "VII"];

/**
 * Build a 7-note personal scale from a root frequency, intention, and sun sign.
 * Returns the note array and modal name.
 */
export function buildPersonalScale(
  rootFrequency: number,
  intention: string
): { scale: ScaleNote[]; mode: string } {
  const mode = INTENTION_MODES[intention] ?? "Ionian";
  const ratios = MODAL_RATIOS[mode] ?? MODAL_RATIOS.Ionian;
  const root = rootFrequency > 0 ? rootFrequency : 432;

  const scale = ratios.map((ratio, i) => ({
    name: SCALE_DEGREE_NAMES[i],
    frequency: parseFloat((root * ratio).toFixed(2)),
  }));

  return { scale, mode };
}

// ─── Aspects for display ────────────────────────────────────────────────────

export interface DisplayAspect {
  planets: [string, string];
  type: string;
  meaning: string;
  angle: number;
  strength: number;
}

/** Convert raw ComputedAspects to the display shape used by MajorAspects */
export function buildDisplayAspects(
  qmReading: QuantumMelodicReading,
  maxCount = 8
): DisplayAspect[] {
  return qmReading.aspects
    .slice(0, maxCount)
    .map((a) => ({
      planets: [a.planet1, a.planet2] as [string, string],
      type: a.aspectType.name,
      meaning: a.aspectType.sonic_expression,
      angle: Math.round(a.exactAngle),
      strength: Math.round(
        Math.max(0, (1 - a.orb / Math.max(a.aspectType.orb, 1)) * 100)
      ),
    }));
}

// ─── Codex string ───────────────────────────────────────────────────────────

/** Encode chart + intention as a compact alphanumeric signature */
export function buildCodexString(
  chartData: ChartData,
  qmReading: QuantumMelodicReading,
  intention: string
): string {
  const signInitials: Record<string, string> = {
    Aries: "AR", Taurus: "TA", Gemini: "GE", Cancer: "CN", Leo: "LE",
    Virgo: "VI", Libra: "LI", Scorpio: "SC", Sagittarius: "SG",
    Capricorn: "CP", Aquarius: "AQ", Pisces: "PI",
  };

  // Encode the first 5 personal planets
  const core = ["Sun", "Moon", "Mercury", "Venus", "Mars"];
  const planetCodes = core.map((name) => {
    const planet = qmReading.planets.find((p) => p.position.name === name);
    return signInitials[planet?.position.sign ?? ""] ?? "XX";
  });

  // Encode frequency fingerprint (root Hz rounded to nearest int, base36)
  const sunHz = qmReading.planets.find(
    (p) => p.position.name === "Sun"
  )?.qmData?.frequency_hz ?? 0;
  const freqCode = Math.round(sunHz).toString(36).toUpperCase().padStart(3, "0");

  // Encode intention and dominant element
  const intentionCode = intention.slice(0, 2).toUpperCase();
  const elementCode = qmReading.dominantElement.slice(0, 2).toUpperCase();

  // Date-based checksum
  const [year, month, day] = chartData.planets.length
    ? [0, 0, 0]
    : [0, 0, 0]; // planets hold no date; use sun degree as proxy
  const sunDeg = Math.round(
    qmReading.planets.find((p) => p.position.name === "Sun")?.position.degree ?? 0
  );
  const checksum = (sunDeg * 7 + (month || 1) + (day || 1))
    .toString(16)
    .toUpperCase()
    .slice(-4)
    .padStart(4, "0");

  return `${planetCodes.join("")}-${freqCode}${intentionCode}${elementCode}-${checksum}`;
}

// ─── Ritual script ──────────────────────────────────────────────────────────

const intentionTemplates: Record<
  string,
  (ctx: {
    name: string;
    sunSign: string;
    moonSign: string;
    element: string;
    mode: string;
    rootHz: number;
  }) => string
> = {
  healing: ({ name, sunSign, moonSign, element, mode, rootHz }) =>
    `Welcome, ${name}. You are a ${sunSign} soul with a ${moonSign} moon, carrying the ${element.toLowerCase()} element in your core. Your healing frequency resonates at ${rootHz.toFixed(1)} Hz — the root note of your personal ${mode} scale.\n\nBegin by finding stillness. Place both hands on your heart center and feel the gentle pulse of life moving through you. Breathe in for four counts, hold for four, release for eight. With each exhale, let the tension held in your ${element.toLowerCase()} body dissolve like morning mist.\n\nAs the harmonic drone deepens around you, visualize a soft ${element === "Fire" ? "amber" : element === "Earth" ? "emerald" : element === "Air" ? "sky-blue" : "violet"} light emanating from your solar plexus. This is your signature frequency — the exact pitch at which your cosmic blueprint vibrates. Allow it to fill every cell.\n\nSpeak aloud: "I am in resonance with my highest healing. My body is intelligent. My cells remember wholeness." Rest in this frequency for as long as the music guides you.`,

  activation: ({ name, sunSign, element, mode, rootHz }) =>
    `${name}, your ${sunSign} fire is ready to ignite. Your root activation frequency — ${rootHz.toFixed(1)} Hz — carries the ${mode} mode: momentum, expansion, and bold expression.\n\nStand or sit tall. Feel your spine as an antenna reaching from the earth below to the cosmos above. Breathe fire: sharp inhales through the nose, forceful exhales through the mouth. Three rounds. Let your energy field crackle and expand.\n\nNow move. Let your body respond to the drone — a slight sway, a shift of weight, a spontaneous gesture. Your ${element.toLowerCase()} nature knows how to activate without strategy. Trust the impulse.\n\nOn your next deep exhale, declare: "I am activated. I move from center. The universe moves through me as purposeful action." Hold this charged state as the frequencies wash through you.`,

  integration: ({ name, sunSign, moonSign, element, mode }) =>
    `${name}, integration is the sacred work of the ${sunSign}-${moonSign} axis. Your ${mode} scale provides the bridge — a space where opposites find harmony without collapsing into each other.\n\nSettle into a comfortable seat. Place one hand on your heart, one on your lower belly. Feel both — the expansive warmth of your ${sunSign} sun and the quiet knowing of your ${moonSign} moon. You don't have to choose between them.\n\nBreathe slowly and let the drone carry you inward. Visualize two streams of ${element.toLowerCase()} energy flowing toward each other — meeting not in collision, but in a graceful spiral. This is integration: separate notes becoming a chord.\n\nSay quietly, as many times as feels right: "I hold all of myself. I am the bridge. Both sides of me are welcome here." Let the harmonic frequencies complete the integration your mind alone cannot force.`,

  shadow: ({ name, moonSign, element, mode, rootHz }) =>
    `${name}, your ${moonSign} moon holds the gate to shadow. The ${mode} mode at ${rootHz.toFixed(1)} Hz is not a comfortable frequency — it is an honest one. It does not flinch.\n\nLight your environment dimly. Sit with your back straight and your hands resting open on your knees — palms up, receptive. Breathe in the full weight of anything you have been avoiding. Do not push it away.\n\nAs the drone fills the room, imagine descending into the ${element.toLowerCase()} depth of yourself — not to destroy what you find, but to simply witness it. The shadow is not your enemy. It is the part of you that never learned it was safe to surface.\n\nSpeak this: "I see you. You were protecting me. I release you from that duty. You are welcome in the light now." Allow whatever emotion rises to move through — it is frequency completing its arc. You are safe.`,

  clarity: ({ name, sunSign, element, mode, rootHz }) =>
    `${name}, your ${sunSign} clarity frequency is ${rootHz.toFixed(1)} Hz — the ${mode} mode, pure and unobstructed. This session is an act of precision: cutting through noise to the signal beneath.\n\nSit in stillness. Close your eyes and take three deliberate breaths — each one longer than the last. With the final exhale, imagine releasing every thought that doesn't belong to this moment. They drift upward like smoke and dissolve.\n\nThe ${element.toLowerCase()} element in you knows clarity as its natural state. You are not manufacturing it — you are removing what clouds it. Let the harmonic frequencies act as a tuning fork, aligning your mental field to coherence.\n\nAsk yourself one question — and wait. Do not search for the answer. Let it arrive in the silence between tones: "What is most true for me right now?" Trust the first image, word, or feeling that surfaces. That is your clarity speaking.`,
};

/**
 * Generate a personalized ritual script from chart data, QM reading, and intention.
 */
export function buildRitualScript(
  chartData: ChartData,
  qmReading: QuantumMelodicReading,
  intention: string
): string {
  const mode = INTENTION_MODES[intention] ?? "Ionian";
  const rootHz =
    qmReading.planets.find((p) => p.position.name === "Sun")?.qmData
      ?.frequency_hz ?? 432;

  const ctx = {
    name: "Seeker",
    sunSign: chartData.sunSign,
    moonSign: chartData.moonSign,
    element: qmReading.dominantElement,
    mode,
    rootHz,
  };

  const template = intentionTemplates[intention] ?? intentionTemplates.clarity;
  return template(ctx);
}

// ─── Audio helpers ───────────────────────────────────────────────────────────

/** Extract root and companion frequencies from a QM reading */
export function extractDroneFrequencies(qmReading: QuantumMelodicReading): {
  root: number;
  companion1: number;
  companion2: number | null;
} {
  const sun = qmReading.planets.find((p) => p.position.name === "Sun");
  const moon = qmReading.planets.find((p) => p.position.name === "Moon");

  // Strongest aspect's second planet (not Sun)
  const topAspect = qmReading.aspects[0];
  let companion2Planet: string | null = null;
  if (topAspect) {
    companion2Planet =
      topAspect.planet1 !== "Sun" ? topAspect.planet1 : topAspect.planet2;
  }
  const companion2Data = companion2Planet
    ? qmReading.planets.find((p) => p.position.name === companion2Planet)
    : null;

  return {
    root: sun?.qmData?.frequency_hz ?? 432,
    companion1: moon?.qmData?.frequency_hz ?? 528,
    companion2: companion2Data?.qmData?.frequency_hz ?? null,
  };
}
