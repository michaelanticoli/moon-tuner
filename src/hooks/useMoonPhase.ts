import { useMemo } from "react";
 import { getMoonSign2026, getMoonPhase2026, getHoursInSign, type ZodiacSign } from "@/data/lunar2026Data";

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
     moonSign: ZodiacSign;
     hoursInSign: number;
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

 // Phase name to index mapping for astrological data lookup
 const PHASE_INDEX_MAP: Record<string, number> = {
   "New Moon": 0,
   "Waxing Crescent": 1,
   "First Quarter": 2,
   "Waxing Gibbous": 3,
   "Full Moon": 4,
   "Waning Gibbous": 5,
   "Last Quarter": 6,
   "Waning Crescent": 7,
 };

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

 import * as Astronomy from "astronomy-engine";
 
 // Next exact New or Full Moon, from the ephemeris (accurate in any year).
 function getNextPhaseDate(phaseType: "New Moon" | "Full Moon", date: Date): Date {
   const target = phaseType === "New Moon" ? 0 : 180;
   const found = Astronomy.SearchMoonPhase(target, new Date(date.getTime() + 60_000), 35);
   return found ? found.date : new Date(date.getTime() + 29.53 * 86400000);
 }

export function useMoonPhase(date?: Date): MoonPhaseData {
  return useMemo(() => {
    const now = date || new Date();
    
     // Use precise 2026 data
     const phaseData = getMoonPhase2026(now);
     const signData = getMoonSign2026(now);
     const hoursRemaining = getHoursInSign(now);
     
     // Get phase index for astrological data
     const phaseIndex = PHASE_INDEX_MAP[phaseData.phaseName] ?? 0;
     const astroData = ASTROLOGICAL_DATA[phaseIndex];
     
     // Calculate phase angle from illumination
     const phaseAngle = phaseData.isWaxing 
       ? phaseData.illumination * 180 
       : 180 + (1 - phaseData.illumination) * 180;

    return {
      astronomical: {
         phaseName: phaseData.phaseName,
         illumination: phaseData.illumination,
         age: phaseData.dayInPhase,
        phaseAngle,
         isWaxing: phaseData.isWaxing,
         nextNewMoon: getNextPhaseDate("New Moon", now),
         nextFullMoon: getNextPhaseDate("Full Moon", now),
         moonSign: signData.sign,
         hoursInSign: hoursRemaining,
      },
      astrological: astroData,
    };
  }, [date]);
}

// Utility to get phase data without hook (for non-component use)
export function getMoonPhaseData(date?: Date): MoonPhaseData {
  const now = date || new Date();
  
   // Use precise 2026 data
   const phaseData = getMoonPhase2026(now);
   const signData = getMoonSign2026(now);
   const hoursRemaining = getHoursInSign(now);
   
   // Get phase index for astrological data
   const phaseIndex = PHASE_INDEX_MAP[phaseData.phaseName] ?? 0;
   const astroData = ASTROLOGICAL_DATA[phaseIndex];
   
   // Calculate phase angle from illumination
   const phaseAngle = phaseData.isWaxing 
     ? phaseData.illumination * 180 
     : 180 + (1 - phaseData.illumination) * 180;

  return {
    astronomical: {
       phaseName: phaseData.phaseName,
       illumination: phaseData.illumination,
       age: phaseData.dayInPhase,
      phaseAngle,
       isWaxing: phaseData.isWaxing,
       nextNewMoon: getNextPhaseDate("New Moon", now),
       nextFullMoon: getNextPhaseDate("Full Moon", now),
       moonSign: signData.sign,
       hoursInSign: hoursRemaining,
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
