/**
 * The Ninety-Six Signatures — canonical data for the Phasecraft companion.
 *
 * Source of truth: PHASECRAFT: The Moontuner Method (Moontuner Press, 2026).
 *   - Sensory signatures and poetic effects: Appendix A. The text lives in
 *     ./moontuner.ts (FLAVOR_FUSIONS / FLAVOR_PROFILES) and was checked
 *     word-for-word against the printed Appendix A for all 96 entries.
 *   - Tones and phase keywords: Chapter 19, "The Eight Tones".
 *   - Palettes, elements, modalities, rulers, sign keywords: Chapter 4.
 *   - How each sign colors each phase: the "Through the Signs" section that
 *     closes each phase chapter (Chapters 6–13).
 *   - Journal prompts: "The Page" in each phase chapter.
 *   - Decans and their cards: Chapter 19, "Going Deeper: The Decans".
 *
 * Matrix numbers are written row-column, sign first and phase second, exactly
 * as in the book: 1-1 is New Moon in Aries, 12-8 is Waning Crescent in Pisces.
 * `day` (1–96) is only an internal index: (row - 1) * 8 + column.
 */
import {
  MOON_PHASES,
  ZODIAC_SIGNS,
  getCombinationInsight,
  getFlavorFusion,
  type MoonPhaseData,
  type ZodiacSignData,
} from './moontuner';

export interface Signature {
  /** Internal index 1–96: (row - 1) * 8 + column. */
  day: number;
  /** Sign row 1–12 (1 = Aries). */
  row: number;
  /** Phase column 1–8 (1 = New Moon). */
  column: number;
  /** Matrix number as printed in the book, e.g. "10-2". */
  code: string;
  phase: MoonPhaseData;
  sign: ZodiacSignData;
  /** "Waxing Crescent in Capricorn" */
  name: string;
  /** First movement of the sensory signature: the sign's palette. */
  palette: string;
  /** Second movement: the phase's tone. */
  tone: string;
  /** Third movement: the anchor image, unique to this signature. */
  anchor: string;
  /** The full sensory signature line, "palette — tone — anchor". */
  sensory: string;
  /** The poetic effect: the figure caught in this moment of the Moon. */
  figure: string;
}

// ─── Phase practice (Part II of the book) ─────────────────────────────────

type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
type Modality = 'Cardinal' | 'Fixed' | 'Mutable';

interface PhasePractice {
  /** Book chapter for this phase. */
  chapter: number;
  /** One word for the kind of moment (Chapter 19). */
  work: string;
  /** How the twelve signs color this phase ("Through the Signs"). */
  colorsBy: 'element' | 'modality' | 'polarity';
  byElement?: Record<Element, string>;
  byModality?: Record<Modality, string>;
  /** Journal prompts from "The Page". */
  prompts: string[];
}

export const PHASE_PRACTICE: PhasePractice[] = [
  {
    chapter: 6,
    work: 'planting',
    colorsBy: 'modality',
    byModality: {
      Cardinal: 'Cardinal signs open the four seasons. A New Moon in a cardinal sign doubles the beginning. Plant boldly.',
      Fixed: 'Fixed signs hold the middle of each season. A New Moon in a fixed sign plants something meant to last. Plant deeply.',
      Mutable:
        'Mutable signs close each season and open the bridge to the next. A New Moon in a mutable sign plants something adaptable. Plant lightly, and expect the plan to change.',
    },
    prompts: [
      'What in my life is ready for a fresh beginning?',
      'What authentic desire have I been ignoring or suppressing?',
      'What fear or limiting belief needs to be named before I begin?',
      'If I trusted my ability to create, what would I make?',
      'What support do I need to nurture this intention?',
      'How can I honor both my wish to grow and my need for patience?',
    ],
  },
  {
    chapter: 7,
    work: 'building',
    colorsBy: 'element',
    byElement: {
      Fire: 'In fire signs, the crescent is eager. The step comes easily. Watch for rushing.',
      Earth: 'In earth signs, the crescent is practical. The step is concrete: buy, book, build.',
      Air: 'In air signs, the crescent is curious. The step is a conversation, a message, an idea shared.',
      Water: 'In water signs, the crescent is tender. The step is protective: shelter the young thing before showing it.',
    },
    prompts: [
      'What first steps feel most alive to me now?',
      'Where am I resisting, and what is the resistance protecting?',
      'How can I honor both my wish for progress and my need for pace?',
      'What support do I need to keep moving without forcing?',
      'What am I learning about how I begin things?',
      'How is my vision changing as I act on it?',
    ],
  },
  {
    chapter: 8,
    work: 'deciding',
    colorsBy: 'modality',
    byModality: {
      Cardinal: 'In cardinal signs, the decision is about direction. Choose the path.',
      Fixed: 'In fixed signs, the decision is about endurance. Choose what you will hold to.',
      Mutable: 'In mutable signs, the decision is about adjustment. Choose what you will change.',
    },
    prompts: [
      'What key decisions am I facing, and what does my deepest wisdom say about each?',
      'What obstacles have appeared, and how might they serve my growth?',
      'Where am I being called to commit more fully?',
      'What fears are arising about moving forward, and how can I work with them?',
      'How can I stay determined and still be flexible about the method?',
      'What support do I need through this demanding phase?',
    ],
  },
  {
    chapter: 9,
    work: 'refining',
    colorsBy: 'element',
    byElement: {
      Earth: 'In earth signs, refinement is material: the finish, the craftsmanship, the numbers.',
      Air: 'In air signs, refinement is in the words and the ideas: the edit, the argument, the clarity.',
      Water: 'In water signs, refinement is emotional: the tone, the tenderness, the timing of care.',
      Fire: 'In fire signs, refinement is in the delivery: the presence, the confidence, the spark.',
    },
    prompts: [
      'What part of my work most needs refining?',
      'How can I balance high standards with real limits of time and energy?',
      'What am I learning about the relationship between process and outcome?',
      'Where am I getting lost in details at the expense of the larger vision?',
      'How can I honor both precision and completion?',
      'What support do I need to keep going through patient, detailed work?',
    ],
  },
  {
    chapter: 10,
    work: 'revealing',
    colorsBy: 'polarity',
    prompts: [
      'What has come to completion since the New Moon?',
      'What truths are becoming clear in this light?',
      'How has my understanding of my intention changed through the cycle?',
      'What am I ready to celebrate, and what am I ready to release?',
      'How can I express my truth fully and with care?',
      'What gifts do I have to share, and how can I share them well?',
    ],
  },
  {
    chapter: 11,
    work: 'sharing',
    colorsBy: 'element',
    byElement: {
      Fire: 'In fire signs, the sharing is a performance: tell the story, light the room.',
      Earth: 'In earth signs, the sharing is practical: teach the method, hand over the tool.',
      Air: 'In air signs, the sharing is an idea: write it, post it, discuss it.',
      Water: 'In water signs, the sharing is care: hold space, listen, feed someone.',
    },
    prompts: [
      'What wisdom have I gained this cycle that might help others?',
      'How can I share my gifts in ways that are authentic and sustainable?',
      'What am I most grateful for from this cycle?',
      'Where do I feel called to give back?',
      'How can I stay generous and keep healthy boundaries?',
      'What have others shared with me that has helped me grow?',
    ],
  },
  {
    chapter: 12,
    work: 'releasing',
    colorsBy: 'modality',
    byModality: {
      Cardinal: 'In cardinal signs, release a direction: a plan, a role, a way of leading.',
      Fixed: 'In fixed signs, release a hold: a possession, a grudge, a fixed idea.',
      Mutable: 'In mutable signs, release a scatter: the extra commitments, the restless options, the loose ends.',
    },
    prompts: [
      'What relationships, habits, or commitments no longer serve my growth?',
      'What am I ready to forgive and release, even if I cannot forget?',
      'How have my priorities changed this cycle?',
      'What fear is keeping me from letting go?',
      'What is complete, even if it does not feel finished?',
      'What space will I need once this is gone?',
    ],
  },
  {
    chapter: 13,
    work: 'resting',
    colorsBy: 'element',
    byElement: {
      Water: 'In water signs, rest is emotional: let yourself feel, cry, dream.',
      Earth: 'In earth signs, rest is physical: sleep, eat, touch the ground.',
      Air: 'In air signs, rest is mental: put the thinking down, step away from the screen.',
      Fire: 'In fire signs, rest is a banked fire: let the flame go low, knowing it will catch again.',
    },
    prompts: [
      'What do I need to rest from?',
      'What wisdom from this cycle do I want to remember and live by?',
      'How has my understanding of myself deepened?',
      'What am I carrying forward, and what am I leaving behind?',
      'What does my body need for real rest?',
      'What intention is beginning to stir for the next cycle?',
    ],
  },
];

/** The six polarities (Chapter 4), as the Full Moon chapter names them. */
const POLARITY_LINES: Record<string, string> = {
  'Aries/Libra': 'Aries and Libra: self and other.',
  'Taurus/Scorpio': 'Taurus and Scorpio: what I own and what I share.',
  'Gemini/Sagittarius': 'Gemini and Sagittarius: the facts and the meaning.',
  'Cancer/Capricorn': 'Cancer and Capricorn: home and the world.',
  'Leo/Aquarius': 'Leo and Aquarius: the one and the many.',
  'Virgo/Pisces': 'Virgo and Pisces: the task and the surrender.',
};

/** The sign directly across the wheel (row 1–12). */
export function oppositeRow(row: number): number {
  return ((row - 1 + 6) % 12) + 1;
}

/**
 * How the sign colors the phase, in the book's own words. For the Full Moon,
 * the book reads the polarity: the Moon's sign and the Sun's sign opposite.
 */
export function signColoring(row: number, column: number): string {
  const practice = PHASE_PRACTICE[column - 1];
  const sign = ZODIAC_SIGNS[row - 1];
  if (practice.colorsBy === 'polarity') {
    const opp = ZODIAC_SIGNS[oppositeRow(row) - 1];
    const first = row <= 6 ? sign.name : opp.name;
    const second = row <= 6 ? opp.name : sign.name;
    const line = POLARITY_LINES[`${first}/${second}`] ?? '';
    return `${line} The Full Moon in ${sign.name} falls when the Sun is in ${opp.name}. Read ${opp.name}'s palette, ${opp.flavor}, beside this one.`;
  }
  if (practice.colorsBy === 'modality') return practice.byModality![sign.modality as Modality];
  return practice.byElement![sign.element as Element];
}

/** One prompt from "The Page" for this signature (the six rotate across the twelve signs). */
export function pagePrompt(row: number, column: number): string {
  const prompts = PHASE_PRACTICE[column - 1].prompts;
  return prompts[(row - 1) % prompts.length];
}

// ─── Decans (Chapter 19, Golden Dawn attributions) ────────────────────────

export interface Decan {
  numeral: 'i' | 'ii' | 'iii';
  degrees: string;
  ruler: string;
  card: string;
  title: string;
}

const DECAN_TABLE: [string, string, string][][] = [
  [['Mars', 'Two of Wands', 'Dominion'], ['Sun', 'Three of Wands', 'Established Strength'], ['Venus', 'Four of Wands', 'Perfected Work']],
  [['Mercury', 'Five of Pentacles', 'Material Trouble'], ['Moon', 'Six of Pentacles', 'Material Success'], ['Saturn', 'Seven of Pentacles', 'Success Unfulfilled']],
  [['Jupiter', 'Eight of Swords', 'Shortened Force'], ['Mars', 'Nine of Swords', 'Despair and Cruelty'], ['Sun', 'Ten of Swords', 'Ruin']],
  [['Venus', 'Two of Cups', 'Love'], ['Mercury', 'Three of Cups', 'Abundance'], ['Moon', 'Four of Cups', 'Blended Pleasure']],
  [['Saturn', 'Five of Wands', 'Strife'], ['Jupiter', 'Six of Wands', 'Victory'], ['Mars', 'Seven of Wands', 'Valour']],
  [['Sun', 'Eight of Pentacles', 'Prudence'], ['Venus', 'Nine of Pentacles', 'Material Gain'], ['Mercury', 'Ten of Pentacles', 'Wealth']],
  [['Moon', 'Two of Swords', 'Peace Restored'], ['Saturn', 'Three of Swords', 'Sorrow'], ['Jupiter', 'Four of Swords', 'Rest from Strife']],
  [['Mars', 'Five of Cups', 'Loss in Pleasure'], ['Sun', 'Six of Cups', 'Pleasure'], ['Venus', 'Seven of Cups', 'Illusionary Success']],
  [['Mercury', 'Eight of Wands', 'Swiftness'], ['Moon', 'Nine of Wands', 'Great Strength'], ['Saturn', 'Ten of Wands', 'Oppression']],
  [['Jupiter', 'Two of Pentacles', 'Harmonious Change'], ['Mars', 'Three of Pentacles', 'Material Works'], ['Sun', 'Four of Pentacles', 'Earthly Power']],
  [['Venus', 'Five of Swords', 'Defeat'], ['Mercury', 'Six of Swords', 'Earned Success'], ['Moon', 'Seven of Swords', 'Unstable Effort']],
  [['Saturn', 'Eight of Cups', 'Abandoned Success'], ['Jupiter', 'Nine of Cups', 'Material Happiness'], ['Mars', 'Ten of Cups', 'Perfected Success']],
];

const NUMERALS = ['i', 'ii', 'iii'] as const;
const DEGREES = ['0°–9°', '10°–19°', '20°–29°'];

/** Decan for a sign row (1–12) and decan number (1–3). */
export function getDecan(row: number, decan: number): Decan {
  const [ruler, card, title] = DECAN_TABLE[row - 1][decan - 1];
  return { numeral: NUMERALS[decan - 1], degrees: DEGREES[decan - 1], ruler, card, title };
}

// ─── The ninety-six ───────────────────────────────────────────────────────

export function dayOf(row: number, column: number): number {
  return (row - 1) * 8 + column;
}

function build(row: number, column: number): Signature {
  const phase = MOON_PHASES[column - 1];
  const sign = ZODIAC_SIGNS[row - 1];
  const anchor = getFlavorFusion(row, column);
  return {
    day: dayOf(row, column),
    row,
    column,
    code: `${row}-${column}`,
    phase,
    sign,
    name: `${phase.name} in ${sign.name}`,
    palette: sign.flavor,
    tone: phase.mood,
    anchor,
    sensory: `${sign.flavor} — ${phase.mood} — ${anchor}`,
    figure: getCombinationInsight(row, column),
  };
}

/** All 96 signatures in matrix order (Aries row first, New Moon column first). */
export const SIGNATURES: Signature[] = Array.from({ length: 96 }, (_, i) =>
  build(Math.floor(i / 8) + 1, (i % 8) + 1)
);

export function getSignature(day: number): Signature | undefined {
  return SIGNATURES[day - 1];
}

export function getSignatureByCode(code: string): Signature | undefined {
  const m = /^(\d{1,2})-(\d)$/.exec(code.trim());
  if (!m) return undefined;
  const row = Number(m[1]);
  const column = Number(m[2]);
  if (row < 1 || row > 12 || column < 1 || column > 8) return undefined;
  return SIGNATURES[dayOf(row, column) - 1];
}

/** Route to a signature's page inside the companion. */
export function signaturePath(sig: Pick<Signature, 'code'>): string {
  return `/phasecraft/signature/${sig.code}`;
}
