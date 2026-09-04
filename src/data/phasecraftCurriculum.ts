// Auto-derived from the Lunar Phasecraft Mastery course overview.
// Source of truth for the /school/curriculum page.

export interface CurriculumModule {
  number: number;
  title: string;
  duration: string;
  focus: string;
  description: string;
  outcomes: string[];
  topics: string[];
}

export interface BonusModule {
  title: string;
  description: string;
}

export const curriculumMeta = {
  title: "Lunar Phasecraft Mastery",
  subtitle: "The Complete Moontuner Method",
  format: "Self-paced digital course",
  duration: "6 core modules + 3 bonus modules",
  span: "8 weeks to lunar alignment mastery",
  overviewPdf: "/curriculum/lunar-phasecraft-mastery-overview.pdf",
  promise:
    "Move from fighting the clock and riding inconsistent energy to working as a lunar-aligned creator \u2014 an intuitive read on your own rhythm, synchronized with the cycle rather than against it.",
} as const;

export const curriculumModules: CurriculumModule[] = [
  {
    "number": 1,
    "title": "Foundations of Lunar Living",
    "duration": "Week 1",
    "focus": "Understanding the philosophy and science behind lunar alignment",
    "description": "This foundational module establishes the theoretical and practical groundwork for your entire lunar journey. You will explore the philosophical foundations of living as a cosmic instrument, understand the physics of resonance and frequency, and prepare your practice space and tools for frequency work.",
    "outcomes": [
      "Explain the Moontuner philosophy and its relationship to cosmic rhythms",
      "Describe how resonance and frequency principles apply to lunar living",
      "Create an optimized sacred space for lunar practice",
      "Identify and acquire essential tools for frequency work",
      "Establish daily practices that attune awareness to lunar energies"
    ],
    "topics": [
      "The Symphony of Existence: Living as a Cosmic Instrument",
      "Frequency as the Language of Creation",
      "The Physics of Resonance and Lunar Influence",
      "Measuring the Moon's Vibrational Signature",
      "Brainwaves and Lunar Entrainment",
      "Designing Your Sacred Space",
      "Essential Tools for Frequency Work"
    ]
  },
  {
    "number": 2,
    "title": "The Waxing Journey",
    "duration": "Week 2-3",
    "focus": "Mastering the phases of building, growth, and illumination",
    "description": "The waxing phases—from New Moon to Full Moon—represent the creative impulse moving toward manifestation. This module provides deep exploration of each waxing phase, including practical applications, specific frequencies, breathwork patterns, and shadow work for each phase.",
    "outcomes": [
      "Identify the energetic characteristics of each waxing phase",
      "Apply phase-specific practices to enhance productivity and creativity",
      "Use sound frequencies and breathwork aligned with waxing energies",
      "Navigate challenges and obstacles that arise during waxing periods",
      "Plan and launch new projects using lunar timing"
    ],
    "topics": [
      "New Moon: The Quantum Zero-Point of Potential",
      "Waxing Crescent: Gathering Information and Building Momentum",
      "First Quarter: Taking Decisive Action",
      "Waxing Gibbous: Refining and Perfecting",
      "Sound Frequencies for Waxing Phases",
      "Breathwork Patterns for Building Energy",
      "Shadow Work During the Waxing Journey"
    ]
  },
  {
    "number": 3,
    "title": "Moon Signs and Daily Alignment",
    "duration": "Week 4",
    "focus": "Working with the moon's movement through the zodiac",
    "description": "While phases provide the overall arc of lunar energy, the moon's movement through the zodiac signs provides daily flavor and focus. This module teaches you to work consciously with moon signs, optimizing activities for each sign's energy and understanding how sign transitions affect your practice.",
    "outcomes": [
      "Explain the characteristics of each zodiac sign as expressed through lunar energy",
      "Match activities and intentions to optimal moon signs",
      "Navigate challenging sign combinations and aspects",
      "Track moon sign transitions and adjust practice accordingly",
      "Integrate moon sign awareness into daily planning"
    ],
    "topics": [
      "Fire Signs (Aries, Leo, Sagittarius): Action and Boldness",
      "Earth Signs (Taurus, Virgo, Capricorn): Stability and Building",
      "Air Signs (Gemini, Libra, Aquarius): Communication and Ideas",
      "Water Signs (Cancer, Scorpio, Pisces): Emotion and Intuition",
      "Void of Course Moons: The Neutral Zones",
      "Electional Astrology: Choosing the Best Day",
      "Creating Your Moon Sign Calendar"
    ]
  },
  {
    "number": 4,
    "title": "The Waning Wisdom",
    "duration": "Week 5-6",
    "focus": "Mastering the phases of release, reflection, and renewal",
    "description": "The waning phases—from Full Moon to New Moon—teach us the wisdom of releasing, letting go, and preparing for new beginnings. This module explores the often-overlooked power of the darkening moon and provides practices for release, integration, and deep restoration.",
    "outcomes": [
      "Identify the energetic characteristics of each waning phase",
      "Apply phase-specific practices for release and integration",
      "Use sound frequencies and breathwork aligned with waning energies",
      "Navigate the challenges of letting go and surrendering",
      "Prepare effectively for the next cycle while honoring the current one"
    ],
    "topics": [
      "Full Moon: Culmination, Revelation, and Expression",
      "Waning Gibbous: Sharing and Gratitude",
      "Last Quarter: Release and Recalibration",
      "Waning Crescent: Rest and Deep Integration",
      "Sound Frequencies for Waning Phases",
      "Breathwork Patterns for Letting Go",
      "Shadow Work During the Waning Journey"
    ]
  },
  {
    "number": 5,
    "title": "Advanced Frequency Practices",
    "duration": "Week 7",
    "focus": "Deepening your practice with sophisticated tools and techniques",
    "description": "With foundational practices established, this module introduces advanced techniques for working with lunar frequencies. You will deepen your understanding of sound healing, develop personalized frequency protocols, and learn to create your own lunar ceremonies and practices.",
    "outcomes": [
      "Apply advanced sound healing techniques aligned with lunar phases",
      "Create personalized frequency protocols for specific goals",
      "Design and lead lunar ceremonies for yourself and others",
      "Work with planetary frequencies in addition to lunar frequencies",
      "Integrate movement and dance with lunar energy practices"
    ],
    "topics": [
      "Advanced Sound Healing with Tuning Forks and Bowls",
      "Planetary Frequency Work (Venus, Mars, Jupiter, Saturn)",
      "Creating Lunar Ceremonies and Rituals",
      "Movement and Dance with Lunar Energy",
      "Personal Frequency Map Development",
      "Teaching Lunar Practices to Others"
    ]
  },
  {
    "number": 6,
    "title": "Integration and Mastery",
    "duration": "Week 8",
    "focus": "Consolidating your practice and becoming a lunar living teacher",
    "description": "The final module focuses on integration, helping you consolidate everything you've learned into a sustainable, personalized practice. You will develop your unique lunar living approach, create your own teaching materials, and establish long-term habits that support continued growth.",
    "outcomes": [
      "Consolidate all learning into a sustainable personal practice",
      "Develop your unique approach to lunar living",
      "Create teaching materials for sharing with others",
      "Establish accountability structures for continued growth",
      "Plan your ongoing lunar development journey"
    ],
    "topics": [
      "Creating Your Personal Frequency Map",
      "Developing Your Unique Lunar Practice",
      "Teaching Lunar Practices to Others",
      "Accountability and Community Structures",
      "Long-Term Lunar Development Planning",
      "The Path to Lunar Mastery"
    ]
  }
];

export const bonusModules: BonusModule[] = [
  {
    "title": "Lunar Business Mastery",
    "description": "Apply the Moontuner Method to business and entrepreneurship. Learn when to launch products, schedule important meetings, conduct hiring interviews, and make strategic decisions using lunar timing."
  },
  {
    "title": "Lunar Creativity and Art",
    "description": "Explore how lunar phases influence creative expression. Learn to schedule creative work, overcome creative blocks, and produce your best art by working with moon energy."
  },
  {
    "title": "Lunar Relationships and Communication",
    "description": "Discover how lunar timing affects relationships and communication. Learn optimal timing for important conversations, conflict resolution, and deepening connections."
  }
];
