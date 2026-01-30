export interface MoonPhase {
  name: string;
  energy: string;
  keywords: string[];
  action: string;
}

export interface ZodiacSign {
  name: string;
  element: string;
  modality: string;
  bodyPart: string;
  keywords: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface WorkbookExercise {
  id: number;
  title: string;
  prompt: string;
}

export const moonPhases: MoonPhase[] = [
  {
    name: "New Moon",
    energy: "Initiation & Intention Setting",
    keywords: ["beginnings", "planting seeds", "setting intentions", "introspection"],
    action: "Set intentions, start new projects, reflect inward"
  },
  {
    name: "Waxing Crescent",
    energy: "Emergence & Commitment",
    keywords: ["hope", "intention", "commitment", "emergence"],
    action: "Take initial action, commit to your path, build momentum"
  },
  {
    name: "First Quarter",
    energy: "Action & Decision",
    keywords: ["challenges", "decisions", "action", "determination"],
    action: "Overcome obstacles, make key decisions, push forward"
  },
  {
    name: "Waxing Gibbous",
    energy: "Refinement & Adjustment",
    keywords: ["adjustment", "refinement", "analysis", "patience"],
    action: "Refine your approach, analyze progress, make adjustments"
  },
  {
    name: "Full Moon",
    energy: "Illumination & Culmination",
    keywords: ["completion", "revelation", "heightened emotion", "culmination"],
    action: "Celebrate achievements, release what no longer serves, gain clarity"
  },
  {
    name: "Waning Gibbous",
    energy: "Gratitude & Sharing",
    keywords: ["gratitude", "sharing", "teaching", "introspection"],
    action: "Share wisdom, express gratitude, begin letting go"
  },
  {
    name: "Last Quarter",
    energy: "Release & Forgiveness",
    keywords: ["release", "forgiveness", "letting go", "reevaluation"],
    action: "Release old patterns, forgive, clear space for the new"
  },
  {
    name: "Waning Crescent",
    energy: "Surrender & Rest",
    keywords: ["rest", "surrender", "recuperation", "reflection"],
    action: "Rest deeply, surrender control, prepare for rebirth"
  }
];

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    element: "Fire",
    modality: "Cardinal",
    bodyPart: "Head & Face",
    keywords: ["courage", "initiation", "leadership", "independence"]
  },
  {
    name: "Taurus",
    element: "Earth",
    modality: "Fixed",
    bodyPart: "Throat & Neck",
    keywords: ["stability", "sensuality", "patience", "determination"]
  },
  {
    name: "Gemini",
    element: "Air",
    modality: "Mutable",
    bodyPart: "Arms & Lungs",
    keywords: ["communication", "curiosity", "adaptability", "duality"]
  },
  {
    name: "Cancer",
    element: "Water",
    modality: "Cardinal",
    bodyPart: "Stomach & Womb",
    keywords: ["nurturing", "emotion", "protection", "intuition"]
  },
  {
    name: "Leo",
    element: "Fire",
    modality: "Fixed",
    bodyPart: "Heart & Spine",
    keywords: ["creativity", "confidence", "generosity", "expression"]
  },
  {
    name: "Virgo",
    element: "Earth",
    modality: "Mutable",
    bodyPart: "Digestive System",
    keywords: ["analysis", "service", "precision", "health"]
  },
  {
    name: "Libra",
    element: "Air",
    modality: "Cardinal",
    bodyPart: "Kidneys & Lower Back",
    keywords: ["balance", "harmony", "partnership", "justice"]
  },
  {
    name: "Scorpio",
    element: "Water",
    modality: "Fixed",
    bodyPart: "Reproductive System",
    keywords: ["transformation", "intensity", "depth", "power"]
  },
  {
    name: "Sagittarius",
    element: "Fire",
    modality: "Mutable",
    bodyPart: "Hips & Thighs",
    keywords: ["expansion", "philosophy", "adventure", "optimism"]
  },
  {
    name: "Capricorn",
    element: "Earth",
    modality: "Cardinal",
    bodyPart: "Knees & Bones",
    keywords: ["ambition", "discipline", "structure", "mastery"]
  },
  {
    name: "Aquarius",
    element: "Air",
    modality: "Fixed",
    bodyPart: "Ankles & Nervous System",
    keywords: ["innovation", "humanity", "independence", "vision"]
  },
  {
    name: "Pisces",
    element: "Water",
    modality: "Mutable",
    bodyPart: "Feet & Etheric Body",
    keywords: ["intuition", "compassion", "transcendence", "dreams"]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Which moon phase is associated with setting new intentions?",
    options: ["Full Moon", "New Moon", "First Quarter", "Waning Crescent"],
    correctIndex: 1
  },
  {
    question: "What element is Scorpio associated with?",
    options: ["Fire", "Earth", "Air", "Water"],
    correctIndex: 3
  },
  {
    question: "Which phase represents culmination and illumination?",
    options: ["Waxing Gibbous", "Full Moon", "Last Quarter", "New Moon"],
    correctIndex: 1
  },
  {
    question: "What body part is ruled by Aries?",
    options: ["Heart", "Feet", "Head & Face", "Stomach"],
    correctIndex: 2
  },
  {
    question: "The Waning Crescent phase is best for:",
    options: ["Starting new projects", "Taking decisive action", "Rest and surrender", "Celebrating achievements"],
    correctIndex: 2
  },
  {
    question: "Which sign is associated with the throat and neck?",
    options: ["Gemini", "Taurus", "Cancer", "Virgo"],
    correctIndex: 1
  },
  {
    question: "How many unique lunar-zodiac combinations exist in the MOONtuner system?",
    options: ["48", "72", "96", "144"],
    correctIndex: 2
  },
  {
    question: "Which modality does Leo belong to?",
    options: ["Cardinal", "Fixed", "Mutable", "None"],
    correctIndex: 1
  },
  {
    question: "The First Quarter moon is associated with:",
    options: ["Rest", "Action & Decision", "Gratitude", "Surrender"],
    correctIndex: 1
  },
  {
    question: "Which element is Aquarius?",
    options: ["Water", "Air", "Fire", "Earth"],
    correctIndex: 1
  }
];

export const workbookExercises: WorkbookExercise[] = [
  {
    id: 1,
    title: "Current Moon Analysis",
    prompt: "Identify the current lunar phase and zodiac placement. Reflect on how this energetic signature manifests in your immediate experience."
  },
  {
    id: 2,
    title: "Phase Pattern Recognition",
    prompt: "Review the previous lunar cycle. Identify which phases felt most productive or challenging. Note recurring patterns."
  },
  {
    id: 3,
    title: "Strategic Intention Setting",
    prompt: "Select a specific goal or project. Using the MOONtuner matrix, determine the optimal phase-sign combination for initiation."
  },
  {
    id: 4,
    title: "Elemental Analysis",
    prompt: "Choose one elemental category (Fire, Earth, Air, Water). Analyze how moon phases express through signs of this element."
  },
  {
    id: 5,
    title: "Complete Cycle Tracking",
    prompt: "Commit to tracking one complete 28-day lunar cycle. Document daily phase, sign, and personal observations."
  }
];

export interface Combination {
  phase: MoonPhase;
  sign: ZodiacSign;
}

export function generateCombinations(): Combination[] {
  const combinations: Combination[] = [];
  for (const phase of moonPhases) {
    for (const sign of zodiacSigns) {
      combinations.push({ phase, sign });
    }
  }
  return combinations;
}
