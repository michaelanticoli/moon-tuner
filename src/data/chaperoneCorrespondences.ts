// Zodiac sign correspondences for Lunar Chaperone workbooks

export interface ZodiacCorrespondence {
  sign: string;
  glyph: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  ruler: string;
  body: string;
  crystals: string[];
  herbs: string[];
  tarot: string;
  color: string;
  metal: string;
  day: string;
  season: string;
  keywords: string[];
}

export interface PhaseCorrespondence {
  phase: string;
  solfeggio: number;
  chakra: string;
  magicalFocus: string;
  element: string;
  direction: string;
  time: string;
  energy: "Waxing" | "Waning" | "Peak" | "Void";
  keywords: string[];
}

export const zodiacCorrespondences: ZodiacCorrespondence[] = [
  {
    sign: "Aries",
    glyph: "♈",
    element: "Fire",
    modality: "Cardinal",
    ruler: "Mars",
    body: "Head, Face, Brain",
    crystals: ["Red Jasper", "Carnelian", "Bloodstone", "Diamond"],
    herbs: ["Nettle", "Ginger", "Cayenne", "Dragon's Blood"],
    tarot: "The Emperor",
    color: "Red",
    metal: "Iron",
    day: "Tuesday",
    season: "Early Spring",
    keywords: ["Initiative", "Courage", "Action", "Leadership"]
  },
  {
    sign: "Taurus",
    glyph: "♉",
    element: "Earth",
    modality: "Fixed",
    ruler: "Venus",
    body: "Throat, Neck, Voice",
    crystals: ["Rose Quartz", "Emerald", "Malachite", "Jade"],
    herbs: ["Rose", "Thyme", "Violet", "Apple Blossom"],
    tarot: "The Hierophant",
    color: "Green",
    metal: "Copper",
    day: "Friday",
    season: "Mid Spring",
    keywords: ["Stability", "Sensuality", "Value", "Patience"]
  },
  {
    sign: "Gemini",
    glyph: "♊",
    element: "Air",
    modality: "Mutable",
    ruler: "Mercury",
    body: "Arms, Hands, Lungs",
    crystals: ["Citrine", "Agate", "Tiger's Eye", "Aquamarine"],
    herbs: ["Lavender", "Fennel", "Dill", "Parsley"],
    tarot: "The Lovers",
    color: "Yellow",
    metal: "Mercury/Quicksilver",
    day: "Wednesday",
    season: "Late Spring",
    keywords: ["Communication", "Curiosity", "Duality", "Adaptability"]
  },
  {
    sign: "Cancer",
    glyph: "♋",
    element: "Water",
    modality: "Cardinal",
    ruler: "Moon",
    body: "Chest, Stomach, Breasts",
    crystals: ["Moonstone", "Pearl", "Selenite", "Opal"],
    herbs: ["Chamomile", "Jasmine", "Lemon Balm", "White Rose"],
    tarot: "The Chariot",
    color: "Silver/White",
    metal: "Silver",
    day: "Monday",
    season: "Early Summer",
    keywords: ["Nurturing", "Intuition", "Home", "Emotional Depth"]
  },
  {
    sign: "Leo",
    glyph: "♌",
    element: "Fire",
    modality: "Fixed",
    ruler: "Sun",
    body: "Heart, Spine, Upper Back",
    crystals: ["Sunstone", "Amber", "Citrine", "Ruby"],
    herbs: ["Sunflower", "Saffron", "Marigold", "Frankincense"],
    tarot: "Strength",
    color: "Gold/Orange",
    metal: "Gold",
    day: "Sunday",
    season: "Mid Summer",
    keywords: ["Creativity", "Expression", "Joy", "Courage"]
  },
  {
    sign: "Virgo",
    glyph: "♍",
    element: "Earth",
    modality: "Mutable",
    ruler: "Mercury",
    body: "Intestines, Digestive System",
    crystals: ["Peridot", "Amazonite", "Moss Agate", "Sapphire"],
    herbs: ["Lavender", "Fennel", "Valerian", "Peppermint"],
    tarot: "The Hermit",
    color: "Navy/Brown",
    metal: "Platinum",
    day: "Wednesday",
    season: "Late Summer",
    keywords: ["Analysis", "Service", "Precision", "Health"]
  },
  {
    sign: "Libra",
    glyph: "♎",
    element: "Air",
    modality: "Cardinal",
    ruler: "Venus",
    body: "Kidneys, Lower Back, Skin",
    crystals: ["Lapis Lazuli", "Rose Quartz", "Opal", "Jade"],
    herbs: ["Rose", "Geranium", "Mint", "Yarrow"],
    tarot: "Justice",
    color: "Pink/Light Blue",
    metal: "Copper",
    day: "Friday",
    season: "Early Autumn",
    keywords: ["Balance", "Harmony", "Partnership", "Beauty"]
  },
  {
    sign: "Scorpio",
    glyph: "♏",
    element: "Water",
    modality: "Fixed",
    ruler: "Pluto/Mars",
    body: "Reproductive Organs, Pelvis",
    crystals: ["Obsidian", "Smoky Quartz", "Garnet", "Topaz"],
    herbs: ["Basil", "Wormwood", "Blackthorn", "Chrysanthemum"],
    tarot: "Death",
    color: "Black/Burgundy",
    metal: "Iron/Plutonium",
    day: "Tuesday",
    season: "Mid Autumn",
    keywords: ["Transformation", "Intensity", "Mystery", "Power"]
  },
  {
    sign: "Sagittarius",
    glyph: "♐",
    element: "Fire",
    modality: "Mutable",
    ruler: "Jupiter",
    body: "Hips, Thighs, Liver",
    crystals: ["Turquoise", "Amethyst", "Sodalite", "Lapis Lazuli"],
    herbs: ["Sage", "Dandelion", "Clove", "Nutmeg"],
    tarot: "Temperance",
    color: "Purple/Blue",
    metal: "Tin",
    day: "Thursday",
    season: "Late Autumn",
    keywords: ["Expansion", "Philosophy", "Adventure", "Truth"]
  },
  {
    sign: "Capricorn",
    glyph: "♑",
    element: "Earth",
    modality: "Cardinal",
    ruler: "Saturn",
    body: "Knees, Bones, Teeth, Skin",
    crystals: ["Onyx", "Obsidian", "Garnet", "Black Tourmaline"],
    herbs: ["Comfrey", "Horsetail", "Hemp", "Thyme"],
    tarot: "The Devil",
    color: "Black/Dark Brown",
    metal: "Lead",
    day: "Saturday",
    season: "Early Winter",
    keywords: ["Structure", "Ambition", "Discipline", "Mastery"]
  },
  {
    sign: "Aquarius",
    glyph: "♒",
    element: "Air",
    modality: "Fixed",
    ruler: "Uranus/Saturn",
    body: "Ankles, Calves, Circulation",
    crystals: ["Amethyst", "Aquamarine", "Labradorite", "Fluorite"],
    herbs: ["Orchid", "Frankincense", "Myrrh", "Elderflower"],
    tarot: "The Star",
    color: "Electric Blue/Violet",
    metal: "Uranium/Aluminum",
    day: "Saturday",
    season: "Mid Winter",
    keywords: ["Innovation", "Humanity", "Vision", "Freedom"]
  },
  {
    sign: "Pisces",
    glyph: "♓",
    element: "Water",
    modality: "Mutable",
    ruler: "Neptune/Jupiter",
    body: "Feet, Lymphatic System",
    crystals: ["Amethyst", "Aquamarine", "Fluorite", "Bloodstone"],
    herbs: ["Seaweed", "Water Lily", "Poppy", "Mugwort"],
    tarot: "The Moon",
    color: "Sea Green/Lavender",
    metal: "Tin/Platinum",
    day: "Thursday",
    season: "Late Winter",
    keywords: ["Dreams", "Compassion", "Transcendence", "Intuition"]
  }
];

export const phaseCorrespondences: PhaseCorrespondence[] = [
  {
    phase: "New Moon",
    solfeggio: 396,
    chakra: "Root",
    magicalFocus: "New Beginnings, Intention Setting, Seed Planting",
    element: "Earth",
    direction: "North",
    time: "Midnight",
    energy: "Void",
    keywords: ["Potential", "Darkness", "Rest", "Vision"]
  },
  {
    phase: "Crescent",
    solfeggio: 417,
    chakra: "Sacral",
    magicalFocus: "Overcoming Obstacles, Gathering Resources",
    element: "Water",
    direction: "North-East",
    time: "3 AM",
    energy: "Waxing",
    keywords: ["Emergence", "Struggle", "Hope", "Foundation"]
  },
  {
    phase: "First Quarter",
    solfeggio: 528,
    chakra: "Solar Plexus",
    magicalFocus: "Decision, Action, Commitment",
    element: "Fire",
    direction: "East",
    time: "6 AM",
    energy: "Waxing",
    keywords: ["Crisis", "Choice", "Will", "Movement"]
  },
  {
    phase: "Gibbous",
    solfeggio: 639,
    chakra: "Heart",
    magicalFocus: "Refinement, Analysis, Adjustment",
    element: "Air",
    direction: "South-East",
    time: "9 AM",
    energy: "Waxing",
    keywords: ["Perfection", "Patience", "Trust", "Devotion"]
  },
  {
    phase: "Full Moon",
    solfeggio: 741,
    chakra: "Throat",
    magicalFocus: "Manifestation, Illumination, Revelation",
    element: "Fire",
    direction: "South",
    time: "Noon",
    energy: "Peak",
    keywords: ["Culmination", "Light", "Expression", "Clarity"]
  },
  {
    phase: "Disseminating",
    solfeggio: 852,
    chakra: "Third Eye",
    magicalFocus: "Sharing Wisdom, Teaching, Distribution",
    element: "Air",
    direction: "South-West",
    time: "3 PM",
    energy: "Waning",
    keywords: ["Transmission", "Gratitude", "Generosity", "Legacy"]
  },
  {
    phase: "Last Quarter",
    solfeggio: 963,
    chakra: "Crown",
    magicalFocus: "Release, Forgiveness, Breaking Habits",
    element: "Water",
    direction: "West",
    time: "6 PM",
    energy: "Waning",
    keywords: ["Crisis", "Release", "Reorientation", "Surrender"]
  },
  {
    phase: "Balsamic",
    solfeggio: 174,
    chakra: "Soul Star",
    magicalFocus: "Closure, Rest, Prophecy, Dreams",
    element: "Ether",
    direction: "North-West",
    time: "9 PM",
    energy: "Void",
    keywords: ["Surrender", "Gestation", "Prophecy", "Dissolution"]
  }
];

// Helper functions
export const getZodiacCorrespondence = (sign: string): ZodiacCorrespondence | undefined => {
  return zodiacCorrespondences.find(z => z.sign.toLowerCase() === sign.toLowerCase());
};

export const getPhaseCorrespondence = (phase: string): PhaseCorrespondence | undefined => {
  return phaseCorrespondences.find(p => p.phase.toLowerCase() === phase.toLowerCase());
};

export const getElementsByElement = (element: string): ZodiacCorrespondence[] => {
  return zodiacCorrespondences.filter(z => z.element.toLowerCase() === element.toLowerCase());
};
