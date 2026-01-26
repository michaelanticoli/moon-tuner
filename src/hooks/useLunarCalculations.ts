// Lunar calculation utilities for Moontuner
// Based on synodic month calculations

export const LUNAR_MONTH = 29.53058867;
export const REF_DATE = new Date('2000-01-06T12:24:00Z').getTime();

export const getPhase = (date: Date): number => {
  const diff = date.getTime() - REF_DATE;
  const days = diff / (1000 * 60 * 60 * 24);
  const cycles = days / LUNAR_MONTH;
  const phase = cycles % 1;
  return phase < 0 ? phase + 1 : phase;
};

export const getPhaseName = (p: number): string => {
  if (p < 0.03 || p > 0.97) return 'New Moon';
  if (p < 0.22) return 'Waxing Crescent';
  if (p < 0.28) return 'First Quarter';
  if (p < 0.47) return 'Waxing Gibbous';
  if (p < 0.53) return 'Full Moon';
  if (p < 0.72) return 'Waning Gibbous';
  if (p < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
};

export const getPhaseKey = (p: number): 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent' => {
  if (p < 0.03 || p > 0.97) return 'new';
  if (p < 0.22) return 'waxing-crescent';
  if (p < 0.28) return 'first-quarter';
  if (p < 0.47) return 'waxing-gibbous';
  if (p < 0.53) return 'full';
  if (p < 0.72) return 'waning-gibbous';
  if (p < 0.78) return 'last-quarter';
  return 'waning-crescent';
};

export interface DetailedInsight {
  title: string;
  phase: string;
  phaseKey: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';
  theme: string;
  insight: string;
  instruction: string;
}

export const getDetailedInsight = (phase: number): DetailedInsight => {
  if (phase < 0.03 || phase > 0.97) return { 
    title: "The Seed Point", 
    phase: "New Moon", 
    phaseKey: "new",
    theme: "Void", 
    insight: "The slate is wiped clean. Silence is the architect of the next 29 days.", 
    instruction: "Draft one major intention in total darkness." 
  };
  if (phase < 0.22) return { 
    title: "The Quickening", 
    phase: "Waxing Crescent", 
    phaseKey: "waxing-crescent",
    theme: "Emergence", 
    insight: "Growth is accelerating. The abstract begins to demand physical form.", 
    instruction: "Take the smallest physical step toward your goal." 
  };
  if (phase < 0.28) return { 
    title: "Crisis of Action", 
    phase: "First Quarter", 
    phaseKey: "first-quarter",
    theme: "Decision", 
    insight: "A 90-degree square. Choose between the old safety and the new risk.", 
    instruction: "Make the hard choice you've been avoiding." 
  };
  if (phase < 0.47) return { 
    title: "Refiner's Fire", 
    phase: "Waxing Gibbous", 
    phaseKey: "waxing-gibbous",
    theme: "Adjustment", 
    insight: "Technical refinement. Don't quit; polish. The harvest is visible.", 
    instruction: "Audit your progress. Fix the details." 
  };
  if (phase < 0.53) return { 
    title: "The Exposure", 
    phase: "Full Moon", 
    phaseKey: "full",
    theme: "Reveal", 
    insight: "Total illumination. High emotional tides and objective clarity meet.", 
    instruction: "Celebrate the win or acknowledge the truth." 
  };
  if (phase < 0.72) return { 
    title: "Teacher's Path", 
    phase: "Waning Gibbous", 
    phaseKey: "waning-gibbous",
    theme: "Distribution", 
    insight: "Process the harvest through dialogue and teaching.", 
    instruction: "Write, speak, or teach. Share findings." 
  };
  if (phase < 0.78) return { 
    title: "Reorientation", 
    phase: "Last Quarter", 
    phaseKey: "last-quarter",
    theme: "Release", 
    insight: "Crisis of Consciousness. Forgive yourself for what you couldn't finish.", 
    instruction: "Deconstruct what is no longer needed. Clean space." 
  };
  return { 
    title: "Hermit's Dream", 
    phase: "Balsamic Moon", 
    phaseKey: "waning-crescent",
    theme: "Surrender", 
    insight: "Deep rest. Retreat from social noise. Prepare to die and be reborn.", 
    instruction: "Sleep more. Meditate on the void." 
  };
};

export interface ArcMonth {
  month: string;
  day: number;
  phase: string;
  focus: string;
  intensity: string;
}

export const generateLunarArc = (birthDate: Date): { natalPhase: string; arc: ArcMonth[] } => {
  const natalPhase = getPhase(birthDate);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const today = new Date();
  const generatedArc: ArcMonth[] = [];

  for (let i = 0; i < 12; i++) {
    const targetMonth = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const targetPhase = getPhase(targetMonth);
    let diff = natalPhase - targetPhase;
    if (diff < 0) diff += 1;
    const daysToReturn = diff * LUNAR_MONTH;
    const returnDate = new Date(targetMonth.getTime() + (daysToReturn * 24 * 60 * 60 * 1000));
    const intensity = (85 + Math.random() * 15).toFixed(0);

    generatedArc.push({
      month: months[returnDate.getMonth()],
      day: returnDate.getDate(),
      phase: getPhaseName(natalPhase),
      focus: natalPhase < 0.25 ? "Initiation" : natalPhase < 0.5 ? "Momentum" : natalPhase < 0.75 ? "Release" : "Rest",
      intensity: `${intensity}%`
    });
  }

  return { natalPhase: getPhaseName(natalPhase), arc: generatedArc };
};
