/**
 * Lunar science, stated as measurement.
 * Every figure here matches PHASECRAFT: The Moontuner Method (Chapters 1, 2,
 * 13 and 16), which keeps measured facts separate from symbolic practice.
 * Each fact is tagged with the phase(s) it bears on, for the signature card.
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
    text: 'The Moon moves fastest at perigee, her nearest point to Earth (about 363,000 km), and slowest at apogee (about 405,500 km). At perigee she looks about 12 percent wider than at apogee.',
    category: 'orbit',
    relevantPhases: [1, 5],
  },
  {
    id: 'sidereal-month',
    text: 'The sidereal month, one circuit of the zodiac against the stars, averages 27.32 days. That is why the Moon spends a little over two days in each sign.',
    category: 'cycles',
  },
  {
    id: 'synodic-month',
    text: 'From New Moon to New Moon, the synodic month, averages 29.53 days. Because her orbit is an ellipse, a single month can run from about 29.18 to 29.93 days.',
    category: 'cycles',
    relevantPhases: [1],
  },
  {
    id: 'month-difference',
    text: 'The phase cycle is about two days longer than the trip around the zodiac, so each phase falls in a different sign from one month to the next. That difference is why the ninety-six signatures exist.',
    category: 'cycles',
  },
  {
    id: 'orbital-inclination',
    text: 'The Moon\'s orbit is tilted about 5° to the Sun\'s path, which is why most New and Full Moons pass above or below the Sun and the Earth\'s shadow instead of making an eclipse.',
    category: 'orbit',
    relevantPhases: [1, 5],
  },
  {
    id: 'sun-moon-ratio',
    text: 'The Sun is about 400 times wider than the Moon and about 400 times farther away, so the two lights look almost exactly the same size in our sky, about half a degree across.',
    category: 'geometry',
    relevantPhases: [1, 5],
  },
  {
    id: 'tidal-locking',
    text: 'The Moon turns on her axis once for every trip around the Earth, so she always shows us the same face. The far side is not dark: at the New Moon it is in full daylight.',
    category: 'orbit',
    relevantPhases: [1],
  },
  {
    id: 'recession',
    text: 'Laser reflectors left by Apollo astronauts and Soviet landers show the Moon drifting away from the Earth by about 3.8 centimeters a year, about as fast as a fingernail grows.',
    category: 'orbit',
  },
  {
    id: 'quarters-geometry',
    text: 'At the First and Last Quarter the Moon stands 90° from the Sun. Their pulls act at right angles and partly cancel, giving the month\'s smallest tides, the neap tides.',
    category: 'geometry',
    relevantPhases: [3, 7],
  },
  {
    id: 'spring-tides',
    text: 'At the New and Full Moon the Sun and Moon pull in line, giving the month\'s largest tides, the spring tides. The name has nothing to do with the season.',
    category: 'geometry',
    relevantPhases: [1, 5],
  },
  {
    id: 'earthshine',
    text: 'Around the young and old crescents you can often see the dark part of the disc faintly lit. This is earthshine, sunlight reflected off the Earth: "the old Moon in the new Moon\'s arms."',
    category: 'geometry',
    relevantPhases: [2, 8],
  },
  {
    id: 'terminator',
    text: 'Near the quarters, the line between light and dark (the terminator) runs down the Moon\'s middle. Low sunlight there throws long shadows, the best time of the month to see craters through binoculars.',
    category: 'geometry',
    relevantPhases: [3, 4, 6, 7],
  },

  // ── Eclipses ──
  {
    id: 'saros-cycle',
    text: 'The Saros cycle, about 18 years and 11 days (223 synodic months), returns the Sun, Moon, and lunar nodes to nearly the same arrangement, so a similar eclipse recurs.',
    category: 'eclipses',
    relevantPhases: [1, 5],
  },
  {
    id: 'eclipse-node',
    text: 'An eclipse needs a New or Full Moon close to one of the lunar nodes, the two points where her path crosses the Sun\'s. The nodes circle the zodiac backward in about 18.6 years, so eclipse seasons shift through the signs.',
    category: 'eclipses',
    relevantPhases: [1, 5],
  },

  // ── Cultural & Historical ──
  {
    id: 'lunar-mansions',
    text: 'Astrologers in India, the Arab world, and China divided the Moon\'s circuit into 27 or 28 lunar mansions, roughly one for each night of her 27.3-day trip around the stars.',
    category: 'cultural',
  },
  {
    id: 'rudhyar-phases',
    text: 'The eight-phase cycle used in this method, each phase beginning at its exact angle from the Sun and lasting 45°, follows the twentieth-century astrologer Dane Rudhyar.',
    category: 'history',
  },
  {
    id: 'apollo',
    text: 'Between 1969 and 1972, twelve people walked on the Moon. With no wind to erase them, their footprints are still there.',
    category: 'history',
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
