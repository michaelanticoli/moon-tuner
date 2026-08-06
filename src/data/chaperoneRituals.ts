// Rituals, practices, and experiments for Lunar Chaperone workbooks

export interface MoonRitual {
  name: string;
  phase: string;
  duration: string;
  materials: string[];
  steps: string[];
  intention: string;
}

export interface BodyPractice {
  name: string;
  bodyArea: string;
  duration: string;
  description: string;
  benefits: string[];
}

export interface JournalingPrompt {
  phase: string;
  theme: string;
  prompt: string;
  followUp: string;
}

export interface LunarExperiment {
  title: string;
  phase: string;
  hypothesis: string;
  method: string;
  duration: string;
  observation: string;
}

export const moonRituals: MoonRitual[] = [
  {
    name: "Dark Moon Bath",
    phase: "New Moon",
    duration: "30-45 minutes",
    materials: ["Black salt", "Mugwort", "Candles (black or white)", "Journal"],
    steps: [
      "Draw a warm bath in complete darkness or by candlelight only",
      "Add black salt and mugwort to the water",
      "Submerge and breathe deeply, feeling the void",
      "Ask: What seed wants to be planted?",
      "After bathing, write one intention without censorship"
    ],
    intention: "To become empty enough to receive new vision"
  },
  {
    name: "Seed Planting Ceremony",
    phase: "New Moon",
    duration: "15-20 minutes",
    materials: ["Seeds (physical or written intentions)", "Small pot with soil", "Water", "Moonlight"],
    steps: [
      "Write your intention on paper or hold seeds in your hands",
      "Speak your intention aloud three times",
      "Bury the paper/seeds in soil",
      "Water gently while visualizing growth",
      "Place where it will receive indirect moonlight"
    ],
    intention: "To anchor intention in the physical realm"
  },
  {
    name: "Crescent Candle Working",
    phase: "Crescent",
    duration: "20-30 minutes",
    materials: ["White or yellow candle", "Olive oil", "Paper", "Pen"],
    steps: [
      "Anoint candle with olive oil from middle to top, then middle to bottom",
      "Write your emerging intention on paper",
      "Light the candle and read your intention aloud",
      "Visualize obstacles dissolving",
      "Let candle burn for at least 7 minutes while meditating"
    ],
    intention: "To strengthen the emerging seed with focused will"
  },
  {
    name: "First Quarter Decision Ritual",
    phase: "First Quarter",
    duration: "15 minutes",
    materials: ["Two small stones", "Red candle", "Journal"],
    steps: [
      "Hold one stone in each hand",
      "Name each stone: one represents staying, one represents going",
      "Light the red candle between them",
      "Ask: Which path honors my soul's growth?",
      "Place the chosen stone on your altar; release the other to nature"
    ],
    intention: "To crystallize decision through embodied choice"
  },
  {
    name: "Gibbous Refinement Practice",
    phase: "Gibbous",
    duration: "20 minutes",
    materials: ["Mirror", "White flower", "Journal"],
    steps: [
      "Sit before a mirror with the flower nearby",
      "Look at your reflection without judgment for 5 minutes",
      "Ask: What needs adjusting? What is already beautiful?",
      "Write three refinements and three acceptances",
      "Place the flower on your altar as offering"
    ],
    intention: "To polish without destroying, refine without rejecting"
  },
  {
    name: "Full Moon Illumination Ritual",
    phase: "Full Moon",
    duration: "30-45 minutes",
    materials: ["Moonwater bowl", "White candles", "Reflective surface", "Journal"],
    steps: [
      "Set up altar near a window where moonlight enters",
      "Fill bowl with water and place under direct moonlight",
      "Light white candles around the bowl",
      "Gaze into the water and ask: What is revealed?",
      "Write everything that surfaces without editing",
      "Use the charged water for blessing or cleansing"
    ],
    intention: "To receive the full illumination of truth"
  },
  {
    name: "Disseminating Gratitude Offering",
    phase: "Disseminating",
    duration: "15-20 minutes",
    materials: ["Food offering", "Incense", "List of blessings", "Gift for another"],
    steps: [
      "Light incense and set out food offering",
      "Read aloud your list of current blessings",
      "Speak: 'What I have received, I now share'",
      "Plan or deliver a gift, teaching, or service to another",
      "Leave the food offering outside for creatures"
    ],
    intention: "To complete the cycle of receiving by giving"
  },
  {
    name: "Last Quarter Release Burning",
    phase: "Last Quarter",
    duration: "20-30 minutes",
    materials: ["Paper", "Fireproof container", "Matches", "Water bowl"],
    steps: [
      "Write everything you are ready to release",
      "Read each item aloud: 'I release you with love'",
      "Burn the paper safely in the container",
      "Watch the smoke rise, carrying what was released",
      "Wash your hands in the water bowl, cleansing",
      "Dispose of ashes in running water or bury them"
    ],
    intention: "To consciously complete what no longer serves"
  },
  {
    name: "Balsamic Dream Incubation",
    phase: "Balsamic",
    duration: "Before sleep",
    materials: ["Mugwort pillow or tea", "Dream journal", "Amethyst", "Lavender"],
    steps: [
      "Drink mugwort tea or place herb under pillow",
      "Hold amethyst and state your question clearly",
      "Apply lavender to temples and wrists",
      "Repeat your question as you fall asleep",
      "Upon waking, immediately write any dreams or impressions",
      "Spend 3 days in the dark moon honoring what came"
    ],
    intention: "To receive prophetic guidance from the unconscious"
  }
];

export const bodyPractices: BodyPractice[] = [
  {
    name: "Crown Breathing",
    bodyArea: "Head, Crown",
    duration: "5-10 minutes",
    description: "Visualize breath entering through the crown of the head, filling the skull with light, and releasing tension through the jaw.",
    benefits: ["Mental clarity", "Headache relief", "Connection to higher guidance"]
  },
  {
    name: "Throat Sounding",
    bodyArea: "Throat, Neck",
    duration: "7-10 minutes",
    description: "Hum at various pitches, feeling vibration in the throat and neck. Progress to vowel sounds, letting each resonate.",
    benefits: ["Voice activation", "Neck tension release", "Authentic expression"]
  },
  {
    name: "Heart Opening Flow",
    bodyArea: "Chest, Heart, Upper Back",
    duration: "15-20 minutes",
    description: "Gentle backbends, arm circles, and chest openers. Include lying over a bolster with arms spread wide.",
    benefits: ["Emotional release", "Posture improvement", "Capacity for love"]
  },
  {
    name: "Solar Plexus Fire Breath",
    bodyArea: "Solar Plexus, Diaphragm",
    duration: "5-7 minutes",
    description: "Kapalbhati or breath of fire focusing on the solar plexus. Visualize golden fire building with each exhale.",
    benefits: ["Willpower activation", "Digestive stimulation", "Confidence building"]
  },
  {
    name: "Sacral Fluid Movement",
    bodyArea: "Hips, Pelvis, Lower Abdomen",
    duration: "10-15 minutes",
    description: "Figure-eight hip movements, gentle pelvic tilts, and circular motions. Move as if underwater.",
    benefits: ["Creative flow", "Emotional processing", "Sensual reconnection"]
  },
  {
    name: "Root Grounding Sequence",
    bodyArea: "Legs, Feet, Base of Spine",
    duration: "10-15 minutes",
    description: "Standing poses with feet firmly planted. Include stomping, squatting, and feeling connection to earth.",
    benefits: ["Stability", "Security", "Physical presence"]
  },
  {
    name: "Spinal Wave",
    bodyArea: "Entire Spine",
    duration: "5-10 minutes",
    description: "Seated or standing, initiate movement from the tailbone that ripples up through each vertebra to the crown.",
    benefits: ["Spinal flexibility", "Energy flow", "Integration of body and mind"]
  },
  {
    name: "Hand Awakening",
    bodyArea: "Hands, Fingers, Wrists",
    duration: "5 minutes",
    description: "Self-massage each finger, rotate wrists, open and close fists slowly. End by holding palms together feeling energy between them.",
    benefits: ["Healing hands", "Creative expression", "Giving and receiving"]
  },
  {
    name: "Foot Mapping",
    bodyArea: "Feet, Ankles",
    duration: "10-15 minutes",
    description: "Roll feet on a ball, massage reflexology points, trace the bones with awareness. Walk barefoot on varied textures.",
    benefits: ["Whole-body connection", "Grounding", "Foundation awareness"]
  },
  {
    name: "Joint Oiling",
    bodyArea: "All Major Joints",
    duration: "15-20 minutes",
    description: "Systematically rotate each joint with awareness: ankles, knees, hips, wrists, elbows, shoulders, neck. Visualize synovial fluid flowing.",
    benefits: ["Flexibility", "Longevity", "Body awareness"]
  }
];

export const journalingPrompts: JournalingPrompt[] = [
  {
    phase: "New Moon",
    theme: "Intention",
    prompt: "If fear had no voice, what would you begin?",
    followUp: "What is the smallest possible first step?"
  },
  {
    phase: "New Moon",
    theme: "Void",
    prompt: "What wants to be born through you that you've been ignoring?",
    followUp: "What conditions does this seed need to sprout?"
  },
  {
    phase: "Crescent",
    theme: "Emergence",
    prompt: "What obstacles appear when you move toward your intention?",
    followUp: "What resource do you already have that you're forgetting?"
  },
  {
    phase: "First Quarter",
    theme: "Decision",
    prompt: "What are you avoiding deciding? What would happen if you chose?",
    followUp: "What would your wisest self choose?"
  },
  {
    phase: "Gibbous",
    theme: "Refinement",
    prompt: "What is 80% right that needs 20% adjustment?",
    followUp: "Where is perfectionism masking fear of completion?"
  },
  {
    phase: "Full Moon",
    theme: "Illumination",
    prompt: "What has been revealed that you didn't want to see?",
    followUp: "What celebration is appropriate for what has manifested?"
  },
  {
    phase: "Disseminating",
    theme: "Sharing",
    prompt: "What wisdom have you gained that others need?",
    followUp: "How do you typically block yourself from sharing your gifts?"
  },
  {
    phase: "Last Quarter",
    theme: "Release",
    prompt: "What are you holding that was never yours to carry?",
    followUp: "What ritual would honor the release of this burden?"
  },
  {
    phase: "Balsamic",
    theme: "Surrender",
    prompt: "What needs to die for the next cycle to be born?",
    followUp: "How can you rest more deeply in the unknown?"
  }
];

export const lunarExperiments: LunarExperiment[] = [
  {
    title: "The New Moon Silence",
    phase: "New Moon",
    hypothesis: "Reduced verbal output during the dark moon increases intuitive reception",
    method: "Speak only when necessary for 24-48 hours around the new moon. Note all insights that arise.",
    duration: "1-2 days",
    observation: "Record quality of dreams, intuitive hits, and creative ideas that emerge"
  },
  {
    title: "Full Moon Sleep Study",
    phase: "Full Moon",
    hypothesis: "Sleep patterns and dream intensity correlate with the full moon",
    method: "Track sleep quality, time to fall asleep, and dream vividness 3 days before, during, and after full moon",
    duration: "7 days",
    observation: "Note any correlations between illumination percentage and sleep/dream patterns"
  },
  {
    title: "Quarter Moon Decision Tracking",
    phase: "First Quarter / Last Quarter",
    hypothesis: "Decisions made at quarter moons carry different qualities",
    method: "Note all significant decisions made within 2 days of each quarter moon for 3 months",
    duration: "3 months",
    observation: "Review whether first quarter decisions are more action-oriented and last quarter more release-oriented"
  },
  {
    title: "Waxing vs Waning Energy",
    phase: "All",
    hypothesis: "Physical and creative energy follows lunar waxing and waning",
    method: "Rate energy levels 1-10 daily for two complete lunar cycles",
    duration: "2 months",
    observation: "Chart energy against lunar phase to identify personal patterns"
  },
  {
    title: "Plant Moon Correlation",
    phase: "All",
    hypothesis: "Plants respond to lunar phases in growth and health",
    method: "Plant identical seeds in two pots: one watered only during waxing, one only during waning",
    duration: "3 months",
    observation: "Document growth differences, health, and vitality between the two plants"
  }
];

// Helper functions
export const getRitualsForPhase = (phase: string): MoonRitual[] => {
  return moonRituals.filter(r => r.phase.toLowerCase() === phase.toLowerCase());
};

export const getPromptsForPhase = (phase: string): JournalingPrompt[] => {
  return journalingPrompts.filter(p => p.phase.toLowerCase() === phase.toLowerCase());
};

export const getPracticeForBody = (bodyArea: string): BodyPractice | undefined => {
  return bodyPractices.find(p => p.bodyArea.toLowerCase().includes(bodyArea.toLowerCase()));
};
