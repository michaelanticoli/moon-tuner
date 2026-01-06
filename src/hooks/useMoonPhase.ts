import { useMemo } from "react";

export interface MoonPhaseData {
  // Astronomical data
  astronomical: {
    phaseName: string;
    illumination: number; // 0-1
    age: number; // days into cycle
    phaseAngle: number; // 0-360
    isWaxing: boolean;
    nextNewMoon: Date;
    nextFullMoon: Date;
  };
  // Astrological interpretation
  astrological: {
    phaseName: string;
    energy: string;
    theme: string;
    quality: string;
    frequency: string;
    frequencyHz: number;
  };
}

// Synodic month length in days (average lunar cycle)
const SYNODIC_MONTH = 29.530588853;

// Reference new moon: January 11, 2024 at 11:57 UTC (verified astronomical data)
const REFERENCE_NEW_MOON = new Date("2024-01-11T11:57:00Z");

// Calculate the current lunar age (days since last new moon)
function getLunarAge(date: Date = new Date()): number {
  const daysSinceReference = (date.getTime() - REFERENCE_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
  return ((daysSinceReference % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
}

// Calculate illumination percentage based on lunar age
function getIllumination(lunarAge: number): number {
  // Illumination follows a cosine curve through the cycle
  const phaseAngle = (lunarAge / SYNODIC_MONTH) * 2 * Math.PI;
  return (1 - Math.cos(phaseAngle)) / 2;
}

// Get astronomical phase name based on lunar age
function getAstronomicalPhase(lunarAge: number): { name: string; index: number } {
  const phases = [
    { name: "New Moon", start: 0, end: 1.84566 },
    { name: "Waxing Crescent", start: 1.84566, end: 7.38264 },
    { name: "First Quarter", start: 7.38264, end: 11.07396 },
    { name: "Waxing Gibbous", start: 11.07396, end: 14.76528 },
    { name: "Full Moon", start: 14.76528, end: 16.61094 },
    { name: "Waning Gibbous", start: 16.61094, end: 22.14792 },
    { name: "Last Quarter", start: 22.14792, end: 25.83924 },
    { name: "Waning Crescent", start: 25.83924, end: SYNODIC_MONTH },
  ];

  for (let i = 0; i < phases.length; i++) {
    if (lunarAge >= phases[i].start && lunarAge < phases[i].end) {
      return { name: phases[i].name, index: i };
    }
  }
  return { name: "New Moon", index: 0 };
}

// Astrological interpretations for each phase
const ASTROLOGICAL_DATA = [
  {
    phaseName: "New Moon",
    energy: "Stillness",
    theme: "Beginnings",
    quality: "Introspective · Planting Seeds",
    frequency: "Grounding Frequency",
    frequencyHz: 396,
  },
  {
    phaseName: "Waxing Crescent",
    energy: "Emergence",
    theme: "Intention",
    quality: "Building · Setting Intentions",
    frequency: "Liberation Frequency",
    frequencyHz: 417,
  },
  {
    phaseName: "First Quarter",
    energy: "Action",
    theme: "Decisions",
    quality: "Active · Overcoming Challenges",
    frequency: "Transformation Frequency",
    frequencyHz: 528,
  },
  {
    phaseName: "Waxing Gibbous",
    energy: "Refinement",
    theme: "Patience",
    quality: "Adjusting · Trusting the Process",
    frequency: "Connection Frequency",
    frequencyHz: 639,
  },
  {
    phaseName: "Full Moon",
    energy: "Illumination",
    theme: "Release",
    quality: "Culmination · Full Expression",
    frequency: "Awakening Frequency",
    frequencyHz: 741,
  },
  {
    phaseName: "Waning Gibbous",
    energy: "Gratitude",
    theme: "Integration",
    quality: "Sharing · Disseminating Wisdom",
    frequency: "Intuition Frequency",
    frequencyHz: 852,
  },
  {
    phaseName: "Last Quarter",
    energy: "Release",
    theme: "Reflection",
    quality: "Letting Go · Re-evaluating",
    frequency: "Spirit Frequency",
    frequencyHz: 963,
  },
  {
    phaseName: "Waning Crescent",
    energy: "Surrender",
    theme: "Rest",
    quality: "Healing · Preparing for Renewal",
    frequency: "Return Frequency",
    frequencyHz: 174,
  },
];

// Calculate next new moon from current date
function getNextNewMoon(currentAge: number, now: Date): Date {
  const daysUntilNew = SYNODIC_MONTH - currentAge;
  return new Date(now.getTime() + daysUntilNew * 24 * 60 * 60 * 1000);
}

// Calculate next full moon from current date
function getNextFullMoon(currentAge: number, now: Date): Date {
  const fullMoonAge = SYNODIC_MONTH / 2;
  let daysUntilFull: number;
  
  if (currentAge < fullMoonAge) {
    daysUntilFull = fullMoonAge - currentAge;
  } else {
    daysUntilFull = SYNODIC_MONTH - currentAge + fullMoonAge;
  }
  
  return new Date(now.getTime() + daysUntilFull * 24 * 60 * 60 * 1000);
}

export function useMoonPhase(date?: Date): MoonPhaseData {
  return useMemo(() => {
    const now = date || new Date();
    const lunarAge = getLunarAge(now);
    const illumination = getIllumination(lunarAge);
    const { name: phaseName, index: phaseIndex } = getAstronomicalPhase(lunarAge);
    const phaseAngle = (lunarAge / SYNODIC_MONTH) * 360;
    const isWaxing = lunarAge < SYNODIC_MONTH / 2;
    
    const astroData = ASTROLOGICAL_DATA[phaseIndex];

    return {
      astronomical: {
        phaseName,
        illumination,
        age: lunarAge,
        phaseAngle,
        isWaxing,
        nextNewMoon: getNextNewMoon(lunarAge, now),
        nextFullMoon: getNextFullMoon(lunarAge, now),
      },
      astrological: astroData,
    };
  }, [date]);
}

// Utility to get phase data without hook (for non-component use)
export function getMoonPhaseData(date?: Date): MoonPhaseData {
  const now = date || new Date();
  const lunarAge = getLunarAge(now);
  const illumination = getIllumination(lunarAge);
  const { name: phaseName, index: phaseIndex } = getAstronomicalPhase(lunarAge);
  const phaseAngle = (lunarAge / SYNODIC_MONTH) * 360;
  const isWaxing = lunarAge < SYNODIC_MONTH / 2;
  
  const astroData = ASTROLOGICAL_DATA[phaseIndex];

  return {
    astronomical: {
      phaseName,
      illumination,
      age: lunarAge,
      phaseAngle,
      isWaxing,
      nextNewMoon: getNextNewMoon(lunarAge, now),
      nextFullMoon: getNextFullMoon(lunarAge, now),
    },
    astrological: astroData,
  };
}

// Format for display: differentiate astronomical vs astrological
export function formatPhaseInfo(data: MoonPhaseData, type: "astronomical" | "astrological" = "astrological") {
  if (type === "astronomical") {
    return {
      title: data.astronomical.phaseName,
      subtitle: `${Math.round(data.astronomical.illumination * 100)}% illuminated`,
      detail: `Day ${Math.round(data.astronomical.age)} of lunar cycle`,
    };
  }
  return {
    title: data.astrological.phaseName,
    subtitle: `${data.astrological.energy} · ${data.astrological.theme}`,
    detail: data.astrological.quality,
  };
}
