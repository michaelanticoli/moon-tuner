/**
 * Moontuner Qualitative Data
 * Rich personality-driven flavor profiles sourced from the Moontuner Education System
 * by Michael Moon Anticoli / Phasecraft Methodology
 *
 * Each pairing is a CHARACTER — a vibe, a person at a party, a flavor profile.
 * This is not chronology. This is not astronomy. This is archetypal personality.
 */

export interface MoonPhaseData {
  name: string;
  energy: string;
  keywords: string[];
  description: string;
  bestFor: string;
  personality: string;
  mood: string;
}

export interface ZodiacSignData {
  name: string;
  element: string;
  modality: string;
  ruler: string;
  keywords: string[];
  description: string;
  traits: string;
  personality: string;
  flavor: string;
}

export const MOON_PHASES: MoonPhaseData[] = [
  {
    name: 'New Moon',
    energy: 'Initiation · Introspection · Potential',
    keywords: ['Initiation', 'Introspection', 'Potential'],
    description:
      'The New Moon represents new beginnings, fresh starts, and the planting of seeds. This is the quantum zero-point of potential — a time for setting intentions, initiating projects, and turning inward for clarity about what you want to create.',
    bestFor:
      'Setting intentions, starting new projects, meditation, strategic planning',
    personality: 'The quiet one in the corner with a secret plan. Still water. Eyes closed but wheels turning. She hasn\'t told you what she\'s building yet because she barely knows herself — but she feels it.',
    mood: 'whispered',
  },
  {
    name: 'Waxing Crescent',
    energy: 'Development · Faith · Commitment',
    keywords: ['Development', 'Faith', 'Commitment'],
    description:
      'The Waxing Crescent phase is about taking initial action on intentions. This is when you commit to your path and begin building sacred momentum, even when results are not yet visible.',
    bestFor:
      'Taking first steps, gathering resources, learning new skills, building momentum',
    personality: 'She just bought the supplies. Hasn\'t built anything yet but she showed up and that\'s the whole point. A little nervous, a lot determined. There\'s paint under her fingernails already.',
    mood: 'eager',
  },
  {
    name: 'First Quarter',
    energy: 'Determination · Challenge · Breakthrough',
    keywords: ['Action', 'Decision', 'Breakthrough'],
    description:
      'The First Quarter Moon represents a critical decision point and active push toward goals. This phase often brings challenges that test commitment and require decisive action.',
    bestFor:
      'Making decisions, taking bold action, pushing through obstacles, course correction',
    personality: 'She hit the wall and chose the sledgehammer. Didn\'t cry about it, didn\'t wait for permission. This is the one who makes the hard call at the crossroads and doesn\'t look back.',
    mood: 'fierce',
  },
  {
    name: 'Waxing Gibbous',
    energy: 'Refinement · Patience · Perfection',
    keywords: ['Refinement', 'Adjustment', 'Preparation'],
    description:
      'The Waxing Gibbous phase is about refining and perfecting your approach. As goals become visible, this is the time for adjustments, improvements, and final calibration before culmination.',
    bestFor:
      'Editing, analyzing, troubleshooting, fine-tuning, quality control',
    personality: 'The perfectionist who re-reads the email seven times. Almost there. She can taste it but won\'t serve it until every garnish is placed. Obsessive in the best way.',
    mood: 'meticulous',
  },
  {
    name: 'Full Moon',
    energy: 'Illumination · Fullness · Release',
    keywords: ['Culmination', 'Revelation', 'Celebration'],
    description:
      'The Full Moon is the cycle\'s peak, bringing illumination, completion, and heightened clarity. What was hidden is revealed, and intentions reach fruition. A time for celebration, gratitude, and conscious release.',
    bestFor:
      'Celebrating achievements, releasing what no longer serves, harvesting results, public expression',
    personality: 'She walked in and everyone turned around. Not because she demanded it — because she couldn\'t help but glow. Everything is visible, nothing is hidden. Peak her.',
    mood: 'radiant',
  },
  {
    name: 'Waning Gibbous',
    energy: 'Generosity · Gratitude · Distribution',
    keywords: ['Sharing', 'Teaching', 'Distribution'],
    description:
      'The Waning Gibbous phase is about sharing harvest and wisdom. This is the time for teaching, disseminating knowledge, distributing the fruits of labor, and expressing gratitude.',
    bestFor:
      'Teaching, sharing knowledge, giving back, mentoring, expressing gratitude',
    personality: 'She\'s the one who brings extra and makes sure everyone ate. Already lived it, now she\'s telling you how. Generous with receipts.',
    mood: 'generous',
  },
  {
    name: 'Third Quarter',
    energy: 'Release · Completion · Forgiveness',
    keywords: ['Release', 'Forgiveness', 'Completion'],
    description:
      'The Third Quarter Moon calls for conscious release and letting go. This is a time to forgive, break old patterns, recalibrate, and clear space for the next cycle.',
    bestFor:
      'Clearing clutter, ending patterns, breaking habits, forgiving, recalibration',
    personality: 'She\'s clearing out the closet. Not sad about it — relieved. Every bag she drops at Goodwill is a pound off her back. She forgave you before you asked.',
    mood: 'unburdened',
  },
  {
    name: 'Waning Crescent',
    energy: 'Surrender · Wisdom · Transition',
    keywords: ['Rest', 'Reflection', 'Surrender'],
    description:
      'The Waning Crescent phase is the final surrender before rebirth. This is a time for deep rest, spiritual reflection, and trusting the void. Honor the ending to prepare for new beginnings.',
    bestFor:
      'Rest, meditation, spiritual practice, dreaming, healing, integration',
    personality: 'She\'s asleep but dreaming in color. Candles lit, phone off, not taking questions. The deepest wisdom comes from the woman who stops talking long enough to listen.',
    mood: 'still',
  },
];

export const ZODIAC_SIGNS: ZodiacSignData[] = [
  {
    name: 'Aries',
    element: 'Fire',
    modality: 'Cardinal',
    ruler: 'Mars',
    keywords: ['Initiation', 'Courage', 'Independence'],
    description:
      'Aries energy is bold, pioneering, and action-oriented. Moon in Aries favors courageous beginnings, assertive action, and leading the way into new territory.',
    traits: 'Direct, passionate, competitive, spontaneous',
    personality: 'First through the door, first to volunteer, first to fight for you. She doesn\'t wait to be ready — she gets ready by going. Impatient but never boring.',
    flavor: 'cayenne and adrenaline',
  },
  {
    name: 'Taurus',
    element: 'Earth',
    modality: 'Fixed',
    ruler: 'Venus',
    keywords: ['Stability', 'Pleasure', 'Value'],
    description:
      'Taurus energy is grounded, sensual, and persistent. Moon in Taurus favors building lasting structures, enjoying sensory pleasures, and creating tangible value.',
    traits: 'Patient, reliable, sensual, determined',
    personality: 'She built it to last and it smells like fresh bread. Won\'t be rushed, won\'t be cheap, won\'t settle. If she chose you, she chose you forever.',
    flavor: 'warm honey and velvet',
  },
  {
    name: 'Gemini',
    element: 'Air',
    modality: 'Mutable',
    ruler: 'Mercury',
    keywords: ['Communication', 'Curiosity', 'Versatility'],
    description:
      'Gemini energy is communicative, curious, and adaptable. Moon in Gemini supports networking, learning, sharing information, and exploring multiple perspectives.',
    traits: 'Curious, communicative, adaptable, intellectual',
    personality: 'She\'s texting three people, reading a book, and eavesdropping on your conversation — and she\'s great at all of it. Never met a tangent she didn\'t love.',
    flavor: 'sparkling water and citrus zest',
  },
  {
    name: 'Cancer',
    element: 'Water',
    modality: 'Cardinal',
    ruler: 'Moon',
    keywords: ['Nurturing', 'Emotion', 'Sanctuary'],
    description:
      'Cancer energy is nurturing, protective, and emotionally attuned. Moon in Cancer emphasizes family, emotional connection, and creating safe sanctuary.',
    traits: 'Nurturing, intuitive, protective, emotional',
    personality: 'She remembered your order, your birthday, and that thing you said three years ago. Her home is the safest place you\'ve ever been. Cross her family and you\'ll understand the crab\'s claws.',
    flavor: 'chamomile and sea salt',
  },
  {
    name: 'Leo',
    element: 'Fire',
    modality: 'Fixed',
    ruler: 'Sun',
    keywords: ['Expression', 'Creativity', 'Leadership'],
    description:
      'Leo energy is creative, expressive, and confident. Moon in Leo supports creative projects, authentic self-expression, performance, and stepping into leadership.',
    traits: 'Creative, generous, confident, dramatic',
    personality: 'She didn\'t walk in — she arrived. Everything she touches gets a little more glamorous. Generous to a fault, loyal like a lioness, and yes she knows she\'s a lot. That\'s the point.',
    flavor: 'champagne and gold leaf',
  },
  {
    name: 'Virgo',
    element: 'Earth',
    modality: 'Mutable',
    ruler: 'Mercury',
    keywords: ['Service', 'Analysis', 'Refinement'],
    description:
      'Virgo energy is analytical, service-oriented, and detail-focused. Moon in Virgo favors organization, health practices, systematic refinement, and practical service.',
    traits: 'Analytical, practical, helpful, perfectionist',
    personality: 'She noticed the typo on the menu, fixed the wobbling table, and reorganized the spice rack while you were talking. Not to show off — because it needed doing.',
    flavor: 'clean linen and fresh herbs',
  },
  {
    name: 'Libra',
    element: 'Air',
    modality: 'Cardinal',
    ruler: 'Venus',
    keywords: ['Balance', 'Partnership', 'Aesthetics'],
    description:
      'Libra energy seeks balance, harmony, and beauty. Moon in Libra supports partnerships, diplomatic communication, aesthetic pursuits, and finding equilibrium.',
    traits: 'Diplomatic, fair, social, aesthetic',
    personality: 'She made the room more beautiful just by rearranging the chairs. Hates conflict but will orchestrate peace like a general. Everything she owns matches. Everything.',
    flavor: 'rose water and silk',
  },
  {
    name: 'Scorpio',
    element: 'Water',
    modality: 'Fixed',
    ruler: 'Pluto',
    keywords: ['Transformation', 'Depth', 'Power'],
    description:
      'Scorpio energy is intense, transformative, and penetrating. Moon in Scorpio supports deep psychological work, transformation, and reclaiming personal power.',
    traits: 'Intense, transformative, powerful, mysterious',
    personality: 'She knows your secret and she hasn\'t decided what to do with it yet. Magnetic, terrifying, and the most loyal person in any room — if you earn it. You don\'t find her. She finds you.',
    flavor: 'dark chocolate and smoke',
  },
  {
    name: 'Sagittarius',
    element: 'Fire',
    modality: 'Mutable',
    ruler: 'Jupiter',
    keywords: ['Expansion', 'Adventure', 'Truth'],
    description:
      'Sagittarius energy is expansive, philosophical, and adventurous. Moon in Sagittarius favors travel, higher learning, teaching, and seeking truth and meaning.',
    traits: 'Optimistic, philosophical, adventurous, honest',
    personality: 'She booked a one-way ticket and figured out the rest on the plane. Blunt in a way that\'s either refreshing or devastating depending on your ego. She\'s already planning the next adventure.',
    flavor: 'campfire and wild sage',
  },
  {
    name: 'Capricorn',
    element: 'Earth',
    modality: 'Cardinal',
    ruler: 'Saturn',
    keywords: ['Ambition', 'Structure', 'Mastery'],
    description:
      'Capricorn energy is disciplined, ambitious, and focused on mastery. Moon in Capricorn supports career advancement, building authority, and long-term strategic planning.',
    traits: 'Disciplined, ambitious, responsible, strategic',
    personality: 'She had a five-year plan at fourteen and she\'s ahead of schedule. Doesn\'t need applause — needs results. The quiet authority in a room full of noise.',
    flavor: 'black coffee and aged oak',
  },
  {
    name: 'Aquarius',
    element: 'Air',
    modality: 'Fixed',
    ruler: 'Uranus',
    keywords: ['Innovation', 'Community', 'Freedom'],
    description:
      'Aquarius energy is innovative, humanitarian, and future-oriented. Moon in Aquarius supports group work, technological innovation, and revolutionary thinking.',
    traits: 'Innovative, humanitarian, independent, unconventional',
    personality: 'She\'s from the future and she\'s trying to be patient with the rest of us. Cares about everyone and belongs to no one. The friend who changes your entire worldview over brunch.',
    flavor: 'electric mint and ozone',
  },
  {
    name: 'Pisces',
    element: 'Water',
    modality: 'Mutable',
    ruler: 'Neptune',
    keywords: ['Transcendence', 'Compassion', 'Intuition'],
    description:
      'Pisces energy is transcendent, compassionate, and deeply intuitive. Moon in Pisces supports spiritual practice, artistic creation, healing, and boundless compassion.',
    traits: 'Compassionate, intuitive, artistic, mystical',
    personality: 'She cried at the commercial and then wrote a poem about it. Boundaries are a foreign concept but her empathy is a superpower. She\'s half here and half somewhere else entirely.',
    flavor: 'sea glass and lavender fog',
  },
];

/** Get phase data by column (1-based) */
export function getPhaseData(column: number): MoonPhaseData {
  return MOON_PHASES[column - 1] || MOON_PHASES[0];
}

/** Get sign data by row (1-based) */
export function getSignData(row: number): ZodiacSignData {
  return ZODIAC_SIGNS[row - 1] || ZODIAC_SIGNS[0];
}

/**
 * Character-sketch flavor profiles for all 96 sign+phase pairings.
 * Each entry is a vibe — who is this woman, what does she smell like,
 * what's she doing at the party?
 */
const FLAVOR_PROFILES: Record<string, string> = {
  // ── Aries (row 1) ──────────────────────────────
  '1-1': 'She just kicked the door open on a room no one knew existed. Raw nerve and rocket fuel. Hasn\'t figured out where she\'s going but she\'s already sprinting.',
  '1-2': 'She laced up her boots before dawn. Still figuring it out but her jaw is set. You can hear her coming.',
  '1-3': 'She punched through the obstacle and kept the bruise as a souvenir. Decisions made at full speed, no regrets.',
  '1-4': 'She\'s sharpening the sword she already swung. Restless perfectionism — can\'t stop tweaking the war plan.',
  '1-5': 'The warrior queen in full regalia. She conquered, she arrived, she\'s daring you to applaud or get out of the way.',
  '1-6': 'She came back from the battlefield with stories and scars and she\'s buying everyone a round.',
  '1-7': 'The fighter who finally put down the sword. Not defeated — just done. Lighter for it.',
  '1-8': 'Mars is sleeping. The warrior dreams of gentler things. She\'ll wake up swinging but for now, let her rest.',

  // ── Taurus (row 2) ──────────────────────────────
  '2-1': 'A seed pressed into rich dark soil by steady hands. She\'s not rushing this. The garden will grow when it\'s good and ready.',
  '2-2': 'She bought the land and started planting. Slow and deliberate and deeply certain. You can smell the earth on her.',
  '2-3': 'The immovable object met the irresistible force and she didn\'t budge. Stubborn like a cathedral.',
  '2-4': 'She\'s tasting the sauce for the fourth time. It\'s almost right. Almost. One more pinch of something.',
  '2-5': 'The harvest table is set with linen and candles and everything she grew herself. Full, warm, abundant. Stay for dinner.',
  '2-6': 'She\'s teaching you her grandmother\'s recipe and she won\'t let you skip any steps.',
  '2-7': 'She finally donated the thing she\'d been holding onto. It was beautiful but it was heavy. She exhaled.',
  '2-8': 'Bare feet in soft grass, eyes closed. She doesn\'t need to do anything. She just needs to be.',

  // ── Gemini (row 3) ──────────────────────────────
  '3-1': 'A whisper that could become anything — a novel, a rumor, a revolution. She hasn\'t decided yet and that\'s what makes her dangerous.',
  '3-2': 'She\'s making lists and talking to herself and it\'s all somehow productive. Three tabs open, two conversations going.',
  '3-3': 'She argued both sides and then chose the third option no one saw coming. Quick-silver mind, switchblade tongue.',
  '3-4': 'She\'s editing the draft while writing the next chapter. Can\'t stop polishing the words until they sing.',
  '3-5': 'She\'s the life of the party and the keynote speaker and the person who noticed the wallflower. All at once.',
  '3-6': 'She explained it so clearly that you forgot it was complicated. The translator, the bridge, the one who makes it make sense.',
  '3-7': 'She unsent the text, deleted the app, and went for a walk. Sometimes the smartest thing Gemini can do is shut up.',
  '3-8': 'The chatterbox finally went quiet and the silence is full of answers. She\'s listening to frequencies the rest of us can\'t hear.',

  // ── Cancer (row 4) ──────────────────────────────
  '4-1': 'A feeling that doesn\'t have words yet, curled up in the dark like a prayer. She\'s gestating something precious.',
  '4-2': 'She started making the nest. Gathering soft things, safe things, things that smell like home.',
  '4-3': 'Mama bear energy. Someone threatened the sanctuary and she chose violence. Protective fury, no apology.',
  '4-4': 'She\'s adjusting the lighting and fluffing the pillows and asking if you\'ve eaten. The care is in the details.',
  '4-5': 'The whole family came home. The table is overflowing and so is her heart. She\'s crying happy tears into the soup.',
  '4-6': 'She\'s rocking someone else\'s baby and telling you what her mother told her. Inherited wisdom, passed with love.',
  '4-7': 'She packed up the nursery. Not because she doesn\'t love it — because it\'s time. Tender release.',
  '4-8': 'She pulled the covers up and let the tides take her. Dreaming of past lives and future children.',

  // ── Leo (row 5) ──────────────────────────────
  '5-1': 'A spark in the dark that doesn\'t know how bright it\'s about to get. The creative impulse before it has a name.',
  '5-2': 'She\'s rehearsing in the mirror and she looks incredible. The show hasn\'t started but she\'s already in character.',
  '5-3': 'She demanded the spotlight and earned it. The audition that became a coronation.',
  '5-4': 'She\'s bedazzling the costume one more time. It was already perfect but she wants it legendary.',
  '5-5': 'Standing ovation. She\'s glowing so hard the room has no shadows. This is peak main character energy and she knows it.',
  '5-6': 'She\'s signing autographs and mentoring the understudy. Generosity that looks like glamour.',
  '5-7': 'She took off the crown and it felt strange and then it felt free. Even queens need to be just a woman sometimes.',
  '5-8': 'The diva resting between encores. The fire is banked but the embers are warm. She\'ll rise again.',

  // ── Virgo (row 6) ──────────────────────────────
  '6-1': 'A clean page and a sharp pencil and a very specific plan forming behind quiet eyes. Sacred order emerging from nothing.',
  '6-2': 'She alphabetized the spice rack and started a spreadsheet. Devotion disguised as administration.',
  '6-3': 'She found the flaw in the system and fixed it before anyone noticed. Surgical precision, zero drama.',
  '6-4': 'She revised the revision. Then checked the margins. Then reformatted. It\'s almost holy, this attention.',
  '6-5': 'Everything works. Every system she built is humming. She\'s not flashy but the whole machine runs because of her.',
  '6-6': 'She\'s teaching you how to fold a fitted sheet and it actually makes sense. Practical magic, shared freely.',
  '6-7': 'She shredded the files that no longer serve. Efficient, thorough, and strangely satisfying.',
  '6-8': 'The analyst finally stopped analyzing and let her body rest. Even the healer needs healing.',

  // ── Libra (row 7) ──────────────────────────────
  '7-1': 'A vision of beauty that hasn\'t taken form yet. She\'s imagining the aesthetic before she picks up the brush.',
  '7-2': 'She\'s curating the mood board. Every fabric swatch was chosen with intention. The harmony is coming together.',
  '7-3': 'She drew the line in the sand — gracefully, with perfect penmanship. Even her boundaries are elegant.',
  '7-4': 'She moved the painting two inches to the left and suddenly the whole room breathed. She can feel symmetry.',
  '7-5': 'The soirée she planned is flawless. Everyone is beautiful and the conversation sparkles. She was born for this.',
  '7-6': 'She\'s mediating the peace talks and making both sides feel heard. Diplomacy as an art form.',
  '7-7': 'She returned the gift. Not because it wasn\'t lovely — because it wasn\'t right. Letting go of what almost fit.',
  '7-8': 'Alone with her reflection, she\'s finally not performing balance — she\'s finding it. Quiet, real equilibrium.',

  // ── Scorpio (row 8) ──────────────────────────────
  '8-1': 'Something is stirring in the deep water and it has teeth. The most powerful intentions are the ones no one can see.',
  '8-2': 'She\'s gathering intelligence. Watching, waiting, learning your patterns before you know she\'s interested.',
  '8-3': 'She detonated the bridge and walked through the fire. Transformation isn\'t gentle and she didn\'t ask it to be.',
  '8-4': 'She\'s performing surgery on the wound she finally admitted exists. Precise, painful, necessary.',
  '8-5': 'The alchemist at peak power. She turned the lead into gold and the room into a cathedral. Terrifying and holy.',
  '8-6': 'She told you the truth that saved your life and didn\'t soften it. Love disguised as devastation.',
  '8-7': 'She burned what needed burning and scattered the ashes. Phoenix prep. The old self is officially dead.',
  '8-8': 'The underworld is quiet. She\'s composting everything that happened. Next time she surfaces, she\'ll be unrecognizable.',

  // ── Sagittarius (row 9) ──────────────────────────────
  '9-1': 'A horizon she hasn\'t run toward yet. The wanderlust is building like a weather system.',
  '9-2': 'She packed one bag and bought a language app. Adventure is a commitment and she just said yes.',
  '9-3': 'She chose the path less traveled and then made her own trail entirely. Bold, loud, zero subtlety.',
  '9-4': 'She\'s studying the map one more time. Not because she\'s lost — because she wants to find the best view.',
  '9-5': 'She reached the summit and howled. The view was worth every blister. She\'s already planning the next mountain.',
  '9-6': 'She came back with stories that made you quit your job. The philosopher-adventurer dispensing truth like souvenirs.',
  '9-7': 'She gave away the heavy gear. Traveling lighter now. Some truths need to be unlearned to make room for bigger ones.',
  '9-8': 'The archer put down the bow and looked at the stars for the first time without trying to reach them. Just wonder.',

  // ── Capricorn (row 10) ──────────────────────────────
  '10-1': 'A foundation being poured in silence. No one will see this part but it\'s what holds everything up.',
  '10-2': 'She woke up early and started building before the sun. Discipline as devotion. She hasn\'t told anyone yet.',
  '10-3': 'She made the hard choice that everyone else was too afraid to make. Cold calculus, warm outcome.',
  '10-4': 'She\'s stress-testing the structure before opening day. If it breaks now, she\'ll know. That\'s the point.',
  '10-5': 'The empire is built. She\'s standing on the top floor looking at everything she made and she doesn\'t smile — she plans the next one.',
  '10-6': 'She\'s mentoring the intern with the same seriousness she gives the board. Legacy isn\'t just about you.',
  '10-7': 'She stepped down from the position. Not because she failed — because she finished. Time to restructure.',
  '10-8': 'The CEO took a day off and stared at the ceiling. Saturn resting is the most radical act in the zodiac.',

  // ── Aquarius (row 11) ──────────────────────────────
  '11-1': 'A frequency no one\'s tuned into yet. She\'s downloading the idea that changes everything.',
  '11-2': 'She\'s building the prototype in her garage. It doesn\'t look like anything yet. That\'s how you know it\'s real.',
  '11-3': 'She broke the rule that everyone thought was a law. Didn\'t apologize. Changed the conversation.',
  '11-4': 'She\'s debugging the revolution. Making sure the system she\'s building actually serves the people.',
  '11-5': 'The future arrived and she\'s the only one who isn\'t surprised. Visionary at full broadcast.',
  '11-6': 'She open-sourced everything and didn\'t keep a cent. The revolution is only worth it if everyone benefits.',
  '11-7': 'She left the group chat. Not because she doesn\'t care — because she needs space to care differently.',
  '11-8': 'The rebel finally rested and realized the revolution starts inside. Quiet recalibration of the antennae.',

  // ── Pisces (row 12) ──────────────────────────────
  '12-1': 'A prayer that hasn\'t found words yet. Something sacred is gestating in the mist between worlds.',
  '12-2': 'She started painting and doesn\'t know what it is yet. Faith looks like wet brush on blank canvas.',
  '12-3': 'She chose compassion when anger would\'ve been easier. The bravest thing a Pisces can do is stay present.',
  '12-4': 'She\'s tuning the instrument by ear. Not with a machine — with her body. She can feel when it\'s right.',
  '12-5': 'The mystic at high tide. Everything is felt, everything is connected, the veil doesn\'t exist. She IS the ocean.',
  '12-6': 'She healed you by sitting with you in silence. No advice, no fixing — just presence. That was enough.',
  '12-7': 'She let the wave carry her instead of swimming. Surrender as the highest form of strength.',
  '12-8': 'Dissolved. Not gone — everywhere. She\'s the fog on the water, the dream you can\'t quite remember, the peace before dawn.',
};

/** Get the character-sketch flavor profile for a specific sign+phase combo */
export function getCombinationInsight(row: number, column: number): string {
  const key = `${row}-${column}`;
  return FLAVOR_PROFILES[key] || '';
}

/**
 * The third line — the synesthetic fusion of sign-flavor + phase-mood.
 * Where (warm honey + velvet) meets (whispered) and becomes its own visceral thing.
 * Each is the sensory consequence of mixing the two ingredients.
 */
const FLAVOR_FUSIONS: Record<string, string> = {
  // Aries — cayenne and adrenaline
  '1-1': 'a matchstrike held under the tongue, waiting to be named',
  '1-2': 'pulse quickening at the smell of smoke before the spark',
  '1-3': 'red pepper flakes hitting hot oil — the room flinches and obeys',
  '1-4': 'blade honed to a hum, edge tested with a fingertip',
  '1-5': 'sun-bleached chili strung across an open window, blazing in plain sight',
  '1-6': 'cinnamon-fired cocoa passed around a desert fire',
  '1-7': 'the ash falling cool from a spent firework',
  '1-8': 'warm coals breathing under a quilt of soft grey',

  // Taurus — warm honey and velvet
  '2-1': 'the humming buzz of knowing you are at home wherever you are',
  '2-2': 'rising bread perfume thickening the kitchen air a half-degree at a time',
  '2-3': 'the slow thud of a stone heart that will not be moved, and never had to raise its voice',
  '2-4': 'honey drawn in slow ribbons until the spoon stops at exactly the right shape',
  '2-5': 'candlelit table, butter melting into everything you set down on it',
  '2-6': 'your grandmother pressing a still-warm loaf into both your hands',
  '2-7': 'sun-warmed velvet folded gently and set on the give-away pile, no grief in the gesture',
  '2-8': 'barefoot moss, eyes closed, the bees doing all the talking',

  // Gemini — sparkling water and citrus zest
  '3-1': 'a cold lemon peel snapped open in a quiet room — somewhere, an idea raises its hand',
  '3-2': 'fizzing tonic poured over crushed ice, carbonating the whole afternoon',
  '3-3': 'lime juice straight to the eye — clarity, immediate, slightly rude',
  '3-4': 'zest ribboned thinner and thinner until it floats',
  '3-5': 'a champagne tower of borrowed quotes, every glass overflowing on cue',
  '3-6': 'soda water passed quietly to whoever needs the lift',
  '3-7': 'flat seltzer poured down the drain without ceremony or apology',
  '3-8': 'the last citrus scent left on warm hands after the dishes are done',

  // Cancer — chamomile and sea salt
  '4-1': 'a held breath inside a seashell — pearled, private, already a little holy',
  '4-2': 'kettle whisper, mug warming, blanket pulled across the knees of someone you love',
  '4-3': 'the tide that returns for what it loves and will not be reasoned with',
  '4-4': 'tea steeped to exactly the moment before bitter, then poured',
  '4-5': 'a bowl of broth set on a kitchen table where everyone you love has already sat',
  '4-6': 'the last cup of tea poured for someone else first, again',
  '4-7': 'a salt-rinsed shell placed back into the ocean with both hands',
  '4-8': 'cool linen, far-off foghorn, the dream you wake from gently',

  // Leo — champagne and gold leaf
  '5-1': 'the pop before the pop — bubbles forming in a still glass nobody is watching yet',
  '5-2': 'rehearsing your bow in front of a gilded mirror, getting it exactly right in private',
  '5-3': 'spotlight clicked on — the dust in the air becomes glitter mid-air',
  '5-4': 'gold leaf laid by tweezers onto the final brushstroke, breath held',
  '5-5': 'every candelabra lit at once and you, somehow, brighter than the room',
  '5-6': 'passing the champagne flute to the kid who needed to feel chosen',
  '5-7': 'crown set down on velvet with a quiet, satisfied click',
  '5-8': 'gold dust settling on bare shoulders after the room has emptied',

  // Virgo — clean linen and fresh herbs
  '6-1': 'a single sprig of rosemary placed deliberately on a folded white cloth',
  '6-2': 'the kitchen catalogued, each jar labeled, the day begun on quiet rails',
  '6-3': 'the sharp snap of clean sheets pulled tight at all four corners at once',
  '6-4': 'thyme picked leaf by leaf until the small bowl is exactly right',
  '6-5': 'every drawer open, every system humming, lemon polish catching the late sun',
  '6-6': 'the recipe written out in your handwriting and given without conditions',
  '6-7': 'clean laundry folded and the wrinkled past sent calmly to the donate bin',
  '6-8': 'lavender sachets in the dark, doing their quiet, exact work',

  // Libra — rose water and silk
  '7-1': 'a single petal floating in still water, deciding which way to drift',
  '7-2': 'silk draped across a chair to see how the late light moves through it',
  '7-3': 'the no said sweetly, in the voice of someone who means it absolutely',
  '7-4': 'the bouquet rebalanced one stem at a time until the whole table exhales',
  '7-5': 'every guest mirrored in candlelight, the room itself in love with itself',
  '7-6': 'the compliment offered exactly when she needed it and nowhere near a crowd',
  '7-7': 'pressed petals slipped from the keepsake book and let go on the breeze',
  '7-8': 'rose water on the wrists, alone, just for the pleasure of the smell',

  // Scorpio — dark chocolate and smoke
  '8-1': 'a low note hummed through closed lips, felt in the chest before it is heard',
  '8-2': 'a single black candle lit, and the room agreeing without a word to listen',
  '8-3': 'bitter cacao melted over a flame held too high — and on purpose',
  '8-4': 'an ember stirred until it glows the exact color of a revelation about to land',
  '8-5': 'a blood-orange moon over a cathedral of incense, every shadow holy',
  '8-6': 'the truth handed over wrapped in dark chocolate, no softer for the wrapper',
  '8-7': 'the last log on the fire watched all the way down to surrender',
  '8-8': 'the smell of woodsmoke on a coat hung in a quiet, permanent closet',

  // Sagittarius — campfire and wild sage
  '9-1': 'the first cold breath at the trailhead, before the boots have learned the path',
  '9-2': 'kindling stacked on a high desert mesa, waiting on one good spark and a story',
  '9-3': 'sage thrown on the fire — the whole canyon suddenly inside your lungs',
  '9-4': 'stars learned by their actual names, the map redrawn in your own hand',
  '9-5': 'summit reached, fire built huge, every honest thing said out loud at last',
  '9-6': 'wisdom told around the embers, marshmallow stuck to a fingertip mid-sentence',
  '9-7': 'the pack lightened by the books you finally admit you are not going to reread',
  '9-8': 'sage smoke curling up to a sky that does not need any explaining tonight',

  // Capricorn — black coffee and aged oak
  '10-1': 'the first bean ground in a kitchen where the lights are still off',
  '10-2': 'espresso steaming at five a.m. while the rest of the world keeps snoozing',
  '10-3': 'oak split clean down the grain on the very first swing',
  '10-4': 'the contract reread until every comma sits exactly where it earns its keep',
  '10-5': 'a long table of cured oak, ledgers closed, the quarter ended quietly green',
  '10-6': 'the second cup poured for the apprentice, and meant',
  '10-7': 'the heavy chair pushed back, the position returned cleanly to the room',
  '10-8': 'cold coffee, warm hands, the cathedral of doing nothing on purpose',

  // Aquarius — electric mint and ozone
  '11-1': 'static hairs lifting on the back of the neck — a signal incoming on no known channel',
  '11-2': 'soldering iron in one hand, cracked-open mint in the other, building the impossible thing',
  '11-3': 'lightning hitting exactly where the old rule used to stand',
  '11-4': 'the prototype tuned until it hums in a key that is not on any piano',
  '11-5': 'rooftop antennae lit blue, the future broadcasting in real time and on time',
  '11-6': 'blueprints printed and handed out, free for anyone with hands to use them',
  '11-7': 'muting the group chat, walking outside, smelling rain on hot pavement',
  '11-8': 'menthol in the dark, brain finally quiet, the receiver allowed to cool',

  // Pisces — sea glass and lavender fog
  '12-1': 'a half-remembered melody floating in the bathwater of a slow Sunday',
  '12-2': 'wet brush, blank page, faith taking the shape of a watercolor wash',
  '12-3': 'a soft answer to a hard question — the whole room quietly rearranges itself',
  '12-4': 'the violin tuned by feel, against the chest, until the body finally says yes',
  '12-5': 'tide all the way in, every shell singing, you cannot tell where you stop',
  '12-6': 'sitting beside someone in their dark, lavender lingering on your sleeves',
  '12-7': 'the boat untied from the dock and allowed to drift toward whatever is next',
  '12-8': 'fog over the harbor, your edges generously dissolved into morning',
};

/** Get the synesthetic fusion line for a sign+phase combo */
export function getFlavorFusion(row: number, column: number): string {
  return FLAVOR_FUSIONS[`${row}-${column}`] || '';
}

/** Get the three-part poetic tagline: sign-flavor — phase-mood — fusion */
export function getFlavorTagline(row: number, column: number): string {
  const sign = getSignData(row);
  const phase = getPhaseData(column);
  const fusion = getFlavorFusion(row, column);
  return fusion
    ? `${sign.flavor} — ${phase.mood} — ${fusion}`
    : `${sign.flavor} — ${phase.mood}`;
}
