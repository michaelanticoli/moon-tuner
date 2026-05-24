/**
 * Curated lunar science datapoints
 * Sourced from the Phasecraft lunar datapoints research database.
 * Each fact is tagged with relevant phase(s) and/or category for contextual display.
 */

export interface LunarFact {
  id: string;
  text: string;
  source?: string;
  /** Which moon phase columns (1-8) this fact is most relevant to, if any */
  relevantPhases?: number[];
  /** Thematic category */
  category: 'orbit' | 'cycles' | 'eclipses' | 'cultural' | 'geometry' | 'history';
}

export const LUNAR_FACTS: LunarFact[] = [
  // ── Orbit & Motion ──
  {
    id: 'perigee-apogee',
    text: 'The Moon moves faster when closer to Earth (perigee) and slower at apogee, shifting the timing of syzygies by up to 14 hours and changing its apparent diameter by about 6%.',
    category: 'orbit',
    relevantPhases: [1, 5], // New & Full (syzygies)
  },
  {
    id: 'sidereal-month',
    text: 'The sidereal month — the Moon\'s orbit relative to the fixed stars — is 27.321661 days (27d 7h 43m 11.6s).',
    category: 'cycles',
  },
  {
    id: 'synodic-month',
    text: 'From New Moon to New Moon (the synodic month) takes 29.5 days on average, but varies from 29.18 to 29.93 days due to orbital eccentricity.',
    category: 'cycles',
    relevantPhases: [1], // New Moon
  },
  {
    id: 'orbital-inclination',
    text: 'The Moon\'s orbital plane is inclined about 5.14° to the ecliptic — which is why eclipses don\'t occur every month.',
    category: 'orbit',
    relevantPhases: [1, 5], // New & Full (eclipse conditions)
  },
  {
    id: 'sun-moon-ratio',
    text: 'The Sun is roughly 400× larger in diameter than the Moon, but also about 400× farther away — creating the near-perfect eclipses unique to our planet.',
    category: 'geometry',
    relevantPhases: [1, 5],
  },
  {
    id: 'angular-diameter',
    text: 'The Moon\'s apparent mean diameter is 31′ 37″ as viewed from Earth\'s surface, while the Sun\'s is 32′ 2″ — nearly identical.',
    category: 'geometry',
  },
  {
    id: 'giant-impact',
    text: 'In the giant impact model, the Moon formed about 15,000 miles from Earth and has been slowly expanding outward ever since — a journey of roughly 3 to 60 Earth radii.',
    category: 'orbit',
  },
  {
    id: 'parallax',
    text: 'An observer\'s position on Earth\'s surface introduces a parallax of about 2° in ecliptic latitude when viewing the Moon.',
    category: 'geometry',
  },

  // ── Cycles & Eclipses ──
  {
    id: 'saros-cycle',
    text: 'The Saros cycle — 223 synodic months (≈18 years, 11 days) — predicts near-identical eclipses because it closely approximates 242 draconic months and 239 anomalistic months.',
    category: 'eclipses',
    relevantPhases: [1, 5],
  },
  {
    id: 'eclipse-node',
    text: 'A solar eclipse occurs when a New Moon falls within about 17° of a lunar node; a lunar eclipse when a Full Moon does the same.',
    category: 'eclipses',
    relevantPhases: [1, 5],
  },

  // ── Cultural & Historical ──
  {
    id: 'lunar-mansions-27',
    text: 'Ancient cultures tracked the Moon\'s nightly movement through 27 Lunar Mansions — plus a mysterious 28th (matching the 27.3-day sidereal period).',
    category: 'cultural',
  },
  {
    id: 'mansions-cultures',
    text: 'Cultures in the Middle East, India, and China independently divided the sky into 27 or 28 lunar mansions, one for each day of the sidereal month, identified by prominent stars.',
    category: 'cultural',
  },
  {
    id: 'synodic-names',
    text: 'In the synodic system there are 29 Moon names and a mysterious thirtieth — mirroring the 29.5-day lunation cycle.',
    category: 'cultural',
    relevantPhases: [1],
  },
  {
    id: 'euctemon',
    text: 'The ancient Greek astronomer Euctemon observed the Summer Solstice at Athens in 432 BCE and composed the earliest known systematic parapegma — a star calendar linking celestial events to seasons.',
    category: 'history',
  },
  {
    id: 'giamario-synodic',
    text: 'Daniel Giamario describes the synodic cycle as the foundational rhythm: "On planet Earth we see this from New Moon to New Moon or Full Moon to Full Moon: 29.5 days."',
    category: 'cycles',
    relevantPhases: [1, 5],
  },
];

/** Get facts relevant to a specific phase (1-based column number) */
export function getFactsForPhase(phase: number): LunarFact[] {
  return LUNAR_FACTS.filter(f => f.relevantPhases?.includes(phase));
}

/** Get facts by category */
export function getFactsByCategory(category: LunarFact['category']): LunarFact[] {
  return LUNAR_FACTS.filter(f => f.category === category);
}

export const CATEGORY_LABELS: Record<LunarFact['category'], string> = {
  orbit: 'Orbit & Motion',
  cycles: 'Cycles & Timing',
  eclipses: 'Eclipses',
  cultural: 'Cultural Traditions',
  geometry: 'Celestial Geometry',
  history: 'Historical Record',
};
