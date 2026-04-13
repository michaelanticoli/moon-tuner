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

// Lunar Chaperone Workbook Mapping
// 12 NM→FM journeys + 12 FM→NM journeys + 2 Eclipse specials = 26 total
export interface ChaperoneWorkbook {
  number: number;
  title: string;
  journey: string;
  startSign: string;
  endSign: string;
  startPhase: "New Moon" | "Full Moon";
  bodyJourney: string;
  essence: string;
}

export const chaperoneWorkbooks: ChaperoneWorkbook[] = [
  // New Moon → Full Moon Journeys (opposite sign axis)
  { number: 1, title: "Grounded Ambition to Illuminated Depth", journey: "Capricorn NM → Cancer FM", startSign: "Capricorn", endSign: "Cancer", startPhase: "New Moon", bodyJourney: "Knees/Bones → Stomach/Womb", essence: "Structure seeds intentions that bloom into emotional fullness" },
  { number: 2, title: "Innovative Spark to Courageous Heart", journey: "Aquarius NM → Leo FM", startSign: "Aquarius", endSign: "Leo", startPhase: "New Moon", bodyJourney: "Ankles/Nervous System → Heart/Spine", essence: "Collective ideas seed intentions that bloom into radiant expression" },
  { number: 3, title: "Mystical Seeds to Precise Harvest", journey: "Pisces NM → Virgo FM", startSign: "Pisces", endSign: "Virgo", startPhase: "New Moon", bodyJourney: "Feet/Etheric Body → Digestive System", essence: "Mystical seeds bloom into discerning integration" },
  { number: 4, title: "Bold Beginning to Harmonious Peak", journey: "Aries NM → Libra FM", startSign: "Aries", endSign: "Libra", startPhase: "New Moon", bodyJourney: "Head/Face → Kidneys/Lower Back", essence: "Individual initiative seeds bloom into relational harmony" },
  { number: 5, title: "Sensual Grounding to Transformative Peak", journey: "Taurus NM → Scorpio FM", startSign: "Taurus", endSign: "Scorpio", startPhase: "New Moon", bodyJourney: "Throat/Neck → Reproductive System", essence: "Stable foundations transform into deep power" },
  { number: 6, title: "Curious Seeds to Expansive Vision", journey: "Gemini NM → Sagittarius FM", startSign: "Gemini", endSign: "Sagittarius", startPhase: "New Moon", bodyJourney: "Arms/Lungs → Hips/Thighs", essence: "Local curiosity expands into philosophical illumination" },
  { number: 7, title: "Nurturing Seeds to Ambitious Peak", journey: "Cancer NM → Capricorn FM", startSign: "Cancer", endSign: "Capricorn", startPhase: "New Moon", bodyJourney: "Stomach/Womb → Knees/Bones", essence: "Emotional seeds crystallize into structural achievement" },
  { number: 8, title: "Creative Seeds to Collective Illumination", journey: "Leo NM → Aquarius FM", startSign: "Leo", endSign: "Aquarius", startPhase: "New Moon", bodyJourney: "Heart/Spine → Ankles/Nervous System", essence: "Personal creativity illuminates collective vision" },
  { number: 9, title: "Analytical Seeds to Transcendent Peak", journey: "Virgo NM → Pisces FM", startSign: "Virgo", endSign: "Pisces", startPhase: "New Moon", bodyJourney: "Digestive System → Feet/Etheric Body", essence: "Precise intentions dissolve into universal compassion" },
  { number: 10, title: "Balanced Seeds to Initiating Peak", journey: "Libra NM → Aries FM", startSign: "Libra", endSign: "Aries", startPhase: "New Moon", bodyJourney: "Kidneys/Lower Back → Head/Face", essence: "Harmonious intentions ignite into bold action" },
  { number: 11, title: "Transformative Seeds to Sensual Peak", journey: "Scorpio NM → Taurus FM", startSign: "Scorpio", endSign: "Taurus", startPhase: "New Moon", bodyJourney: "Reproductive System → Throat/Neck", essence: "Deep transformation grounds into tangible beauty" },
  { number: 12, title: "Expansive Seeds to Curious Peak", journey: "Sagittarius NM → Gemini FM", startSign: "Sagittarius", endSign: "Gemini", startPhase: "New Moon", bodyJourney: "Hips/Thighs → Arms/Lungs", essence: "Philosophical vision illuminates local connections" },
  
  // Full Moon → New Moon Journeys (release cycles)
  { number: 13, title: "Emotional Fullness to Innovative Spark", journey: "Cancer FM → Aquarius NM", startSign: "Cancer", endSign: "Aquarius", startPhase: "Full Moon", bodyJourney: "Stomach/Womb → Ankles/Nervous System", essence: "Nurturing release opens space for revolutionary vision" },
  { number: 14, title: "Courageous Heart to Sacred Service", journey: "Leo FM → Pisces NM", startSign: "Leo", endSign: "Pisces", startPhase: "Full Moon", bodyJourney: "Heart/Spine → Feet/Etheric Body", essence: "Creative release opens space for spiritual surrender" },
  { number: 15, title: "Precise Harvest to Bold Beginning", journey: "Virgo FM → Aries NM", startSign: "Virgo", endSign: "Aries", startPhase: "Full Moon", bodyJourney: "Digestive System → Head/Face", essence: "Analytical release ignites courageous new initiation" },
  { number: 16, title: "Harmonious Peak to Sensual Seeds", journey: "Libra FM → Taurus NM", startSign: "Libra", endSign: "Taurus", startPhase: "Full Moon", bodyJourney: "Kidneys/Lower Back → Throat/Neck", essence: "Relational release grounds into stable intention" },
  { number: 17, title: "Transformative Peak to Curious Seeds", journey: "Scorpio FM → Gemini NM", startSign: "Scorpio", endSign: "Gemini", startPhase: "Full Moon", bodyJourney: "Reproductive System → Arms/Lungs", essence: "Deep release lightens into curious exploration" },
  { number: 18, title: "Expansive Peak to Nurturing Seeds", journey: "Sagittarius FM → Cancer NM", startSign: "Sagittarius", endSign: "Cancer", startPhase: "Full Moon", bodyJourney: "Hips/Thighs → Stomach/Womb", essence: "Philosophical release returns to emotional roots" },
  { number: 19, title: "Ambitious Peak to Creative Seeds", journey: "Capricorn FM → Leo NM", startSign: "Capricorn", endSign: "Leo", startPhase: "Full Moon", bodyJourney: "Knees/Bones → Heart/Spine", essence: "Structural release opens to heartfelt creation" },
  { number: 20, title: "Collective Illumination to Analytical Seeds", journey: "Aquarius FM → Virgo NM", startSign: "Aquarius", endSign: "Virgo", startPhase: "Full Moon", bodyJourney: "Ankles/Nervous System → Digestive System", essence: "Visionary release grounds into precise intention" },
  { number: 21, title: "Transcendent Peak to Balanced Seeds", journey: "Pisces FM → Libra NM", startSign: "Pisces", endSign: "Libra", startPhase: "Full Moon", bodyJourney: "Feet/Etheric Body → Kidneys/Lower Back", essence: "Spiritual release crystallizes into harmonious intention" },
  { number: 22, title: "Bold Peak to Transformative Seeds", journey: "Aries FM → Scorpio NM", startSign: "Aries", endSign: "Scorpio", startPhase: "Full Moon", bodyJourney: "Head/Face → Reproductive System", essence: "Initiating release deepens into transformative intention" },
  { number: 23, title: "Sensual Peak to Expansive Seeds", journey: "Taurus FM → Sagittarius NM", startSign: "Taurus", endSign: "Sagittarius", startPhase: "Full Moon", bodyJourney: "Throat/Neck → Hips/Thighs", essence: "Grounded release expands into philosophical vision" },
  { number: 24, title: "Curious Peak to Ambitious Seeds", journey: "Gemini FM → Capricorn NM", startSign: "Gemini", endSign: "Capricorn", startPhase: "Full Moon", bodyJourney: "Arms/Lungs → Knees/Bones", essence: "Scattered illumination consolidates into structured intention" },
  
  // Eclipse Portal Specials
  { number: 25, title: "Solar Eclipse Portal", journey: "Eclipse Axis", startSign: "Variable", endSign: "Variable", startPhase: "New Moon", bodyJourney: "Axis Activation", essence: "Accelerated reset and karmic node activation" },
  { number: 26, title: "Lunar Eclipse Portal", journey: "Eclipse Axis", startSign: "Variable", endSign: "Variable", startPhase: "Full Moon", bodyJourney: "Axis Illumination", essence: "Accelerated release and karmic completion" },
];

// Helper to find Chaperone workbook for a combination
export function findChaperoneWorkbook(phaseName: string, signName: string): ChaperoneWorkbook | null {
  if (phaseName === "New Moon") {
    return chaperoneWorkbooks.find(w => w.startPhase === "New Moon" && w.startSign === signName) || null;
  }
  if (phaseName === "Full Moon") {
    return chaperoneWorkbooks.find(w => w.startPhase === "Full Moon" && w.startSign === signName) || null;
  }
  return null;
}
