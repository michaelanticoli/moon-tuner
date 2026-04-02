/**
 * MOONTUNER — Personal Lunar Arc Report Engine
 * Version 1.0 · April 2026
 */

// ─────────────────────────────────────────────
// 1. ASTRONOMY CORE
// ─────────────────────────────────────────────

function toRad(d: number): number { return d * Math.PI / 180; }
function toDeg(r: number): number { return r * 180 / Math.PI; }

export function toJulianDate(dateStr: string, timeStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);
  let y = year, m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716))
    + Math.floor(30.6001 * (m + 1))
    + day + B - 1524.5
    + (hour + minute / 60) / 24;
  return JD;
}

export function moonPhaseAngle(JD: number): number {
  const D = JD - 2451545.0;
  const L_sun = (280.460 + 0.9856474 * D) % 360;
  const g = toRad((357.528 + 0.9856003 * D) % 360);
  const lSun = toRad(L_sun + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  const L_moon = (218.316 + 13.176396 * D) % 360;
  const M_moon = toRad((134.963 + 13.064993 * D) % 360);
  const F = toRad((93.272 + 13.229350 * D) % 360);
  const lMoon = toRad(
    L_moon
    + 6.289 * Math.sin(M_moon)
    - 1.274 * Math.sin(2 * toRad((D % 360)) - M_moon)
    + 0.658 * Math.sin(2 * toRad(L_moon))
    - 0.214 * Math.sin(2 * M_moon)
    - 0.114 * Math.sin(2 * F)
  );
  return ((toDeg(lMoon - lSun)) % 360 + 360) % 360;
}

function moonAngularVelocity(JD: number): number {
  const a1 = moonPhaseAngle(JD - 0.5);
  const a2 = moonPhaseAngle(JD + 0.5);
  let diff = a2 - a1;
  if (diff < 0) diff += 360;
  return diff;
}

export function phaseName(angle: number): string {
  if (angle < 45) return 'New Moon';
  if (angle < 90) return 'Waxing Crescent';
  if (angle < 135) return 'First Quarter';
  if (angle < 180) return 'Waxing Gibbous';
  if (angle < 225) return 'Full Moon';
  if (angle < 270) return 'Waning Gibbous';
  if (angle < 315) return 'Last Quarter';
  if (angle < 360) return 'Waning Crescent';
  return 'New Moon';
}

function phaseKeyword(name: string): string {
  const map: Record<string, string> = {
    'New Moon': 'SEEDING',
    'Waxing Crescent': 'INITIATION',
    'First Quarter': 'BREAKTHROUGH',
    'Waxing Gibbous': 'REFINEMENT',
    'Full Moon': 'CULMINATION',
    'Waning Gibbous': 'TRANSMISSION',
    'Last Quarter': 'RELEASE',
    'Waning Crescent': 'SURRENDER',
  };
  return map[name] || 'INITIATION';
}

interface CalendarDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
}

function julianToCalendar(JD: number): CalendarDate {
  const JD2 = JD + 0.5;
  const Z = Math.floor(JD2);
  const F = JD2 - Z;
  let A = Z;
  if (Z >= 2299161) {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  const hour = Math.floor(F * 24);
  const min = Math.floor((F * 24 - hour) * 60);
  return { year, month, day, hour, min };
}

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ─────────────────────────────────────────────
// 2. ECLIPSE CALENDAR 2025–2028
// ─────────────────────────────────────────────

const ECLIPSE_DATES = [
  '2025-03-14', '2025-03-29', '2025-09-07', '2025-09-21',
  '2026-03-03', '2026-03-29', '2026-08-28', '2026-09-21',
  '2027-02-06', '2027-02-20', '2027-07-18', '2027-08-02',
  '2028-01-12', '2028-01-26', '2028-07-06', '2028-07-22',
];

function isEclipseAdjacent(dateObj: CalendarDate, windowDays = 14): boolean {
  const target = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
  return ECLIPSE_DATES.some(eStr => {
    const ed = new Date(eStr);
    return Math.abs(target.getTime() - ed.getTime()) / 86400000 <= windowDays;
  });
}

// ─────────────────────────────────────────────
// 3. LUNATION PROXIMITY CHECK
// ─────────────────────────────────────────────

function nearLunation(JD: number, windowDays = 3): 'new' | 'full' | null {
  for (let offset = -windowDays; offset <= windowDays; offset++) {
    const angle = moonPhaseAngle(JD + offset);
    if (angle < 10 || angle > 350) return 'new';
    if (angle > 170 && angle < 190) return 'full';
  }
  return null;
}

// ─────────────────────────────────────────────
// 4. POWER SCORE CALCULATION
// ─────────────────────────────────────────────

function calcPowerScore(JD: number, natalAngle: number, dateObj: CalendarDate): number {
  const actual = moonPhaseAngle(JD);
  let diff = Math.abs(actual - natalAngle);
  if (diff > 180) diff = 360 - diff;
  let score = Math.round(100 - diff * 2.8);
  const velocity = moonAngularVelocity(JD);
  if (velocity < 12.0) score += 2;
  if (velocity > 14.0) score -= 2;
  const lunation = nearLunation(JD);
  if (lunation) score += 3;
  if (isEclipseAdjacent(dateObj)) score -= 8;
  return Math.max(78, Math.min(100, score));
}

// ─────────────────────────────────────────────
// 5. FIND 12 MONTHLY POWER DAY RETURNS
// ─────────────────────────────────────────────

function findNextReturn(fromJD: number, targetAngle: number, maxDays = 35): number {
  let bestDiff = 360;
  let bestJD = fromJD;
  for (let i = 0; i < maxDays * 12; i++) {
    const jd = fromJD + i / 12;
    const angle = moonPhaseAngle(jd);
    let diff = Math.abs(angle - targetAngle);
    if (diff > 180) diff = 360 - diff;
    if (diff < bestDiff) { bestDiff = diff; bestJD = jd; }
  }
  for (let h = -24; h <= 24; h++) {
    const jd = bestJD + h / 24;
    const angle = moonPhaseAngle(jd);
    let diff = Math.abs(angle - targetAngle);
    if (diff > 180) diff = 360 - diff;
    if (diff < bestDiff) { bestDiff = diff; bestJD = jd; }
  }
  return bestJD;
}

export interface PowerDay {
  arcMonth: number;
  month: string;
  monthFull: string;
  day: number;
  year: number;
  power: number;
  eclipse: boolean;
  lunation: 'new' | 'full' | null;
  keyword: string;
  description: string;
  isPeak: boolean;
}

function get12PowerDays(natalAngle: number, startJD: number): Omit<PowerDay, 'keyword' | 'description' | 'isPeak'>[] {
  const days: Omit<PowerDay, 'keyword' | 'description' | 'isPeak'>[] = [];
  let cursor = startJD - 3;
  for (let i = 0; i < 12; i++) {
    const returnJD = findNextReturn(cursor + 1, natalAngle, 33);
    const dateObj = julianToCalendar(returnJD);
    const eclipse = isEclipseAdjacent(dateObj);
    const power = calcPowerScore(returnJD, natalAngle, dateObj);
    const lunation = nearLunation(returnJD);
    days.push({
      arcMonth: i + 1,
      month: MONTH_NAMES[dateObj.month],
      monthFull: MONTH_FULL[dateObj.month],
      day: dateObj.day,
      year: dateObj.year,
      power,
      eclipse,
      lunation,
    });
    cursor = returnJD + 26;
  }
  return days;
}

// ─────────────────────────────────────────────
// 6. ARC POSITION HELPER
// ─────────────────────────────────────────────

type ArcPosition = 'opening' | 'building' | 'peak' | 'deepening' | 'closing';

function arcPosition(arcMonth: number): ArcPosition {
  if (arcMonth <= 2) return 'opening';
  if (arcMonth <= 5) return 'building';
  if (arcMonth <= 7) return 'peak';
  if (arcMonth <= 10) return 'deepening';
  return 'closing';
}

function season(monthNum: number): string {
  if (monthNum >= 3 && monthNum <= 5) return 'spring';
  if (monthNum >= 6 && monthNum <= 8) return 'summer';
  if (monthNum >= 9 && monthNum <= 11) return 'autumn';
  return 'winter';
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

function monthNumFromAbbr(abbr: string): number {
  return MONTH_NAMES.indexOf(abbr);
}

// ─────────────────────────────────────────────
// 7. MONTHLY COPY LIBRARY
// ─────────────────────────────────────────────

interface DayContext {
  power: number;
  arcMonth: number;
  month: string;
  eclipse: boolean;
}

type CopyFn = (d: DayContext) => string;
type PhaseCopyLibrary = {
  eclipse: CopyFn;
  opening: CopyFn;
  building: CopyFn;
  peak: CopyFn;
  deepening: CopyFn;
  closing: CopyFn;
};

const MONTHLY_COPY: Record<string, PhaseCopyLibrary> = {
  'Waxing Crescent': {
    eclipse: () => `Eclipse season compresses lunar timing this month. Your return is potent but accelerated — things may move faster than planned. Initiate, but hold your structure loosely.`,
    opening: (d) => `Your first return of the arc year arrives with ${d.power >= 97 ? 'near-perfect geometric precision' : 'strong alignment'}. The crescent asks one thing: begin. Everything else is detail.`,
    building: (d) => d.power >= 95
      ? `${capitalize(season(monthNumFromAbbr(d.month)))} momentum peaks here. Your natal surge meets the year's strongest forward energy. Best for public declarations and anything requiring courage over certainty.`
      : `A solid ${season(monthNumFromAbbr(d.month))} return. Your initiation window is open — lower friction than average. Best used for the move you've been building toward.`,
    peak: (d) => d.power >= 98
      ? `The arc year's highest-resonance window. If one month receives your most audacious move, it is this one. Full amplitude, minimal friction. You were born to initiate.`
      : `A strong peak-arc return. Your natal crescent alignment is sharp. Push the thing you've been gathering courage for. The window is as clear as it gets.`,
    deepening: (d) => d.power >= 94
      ? `${capitalize(season(monthNumFromAbbr(d.month)))} clarity. The return lands clean and unobstructed. What you initiated at your peak — this month you push it across the threshold.`
      : `A quieter ${season(monthNumFromAbbr(d.month))} register. Energy runs more interior than outward. Best for one-to-one outreach, writing, and work that builds behind the scenes.`,
    closing: (d) => d.arcMonth === 12
      ? `The final return of your arc year — geometry ${d.power >= 97 ? 'near-perfect' : 'solid'}. Begin the thing that deserves a full year to grow. The next arc starts exactly here.`
      : `Late-arc window. Carry forward what matters; set down what doesn't. The crescent still rises. Use it to consolidate, not to start over.`,
  },
  'New Moon': {
    eclipse: () => `Eclipse energy runs deep this month — unusually so for a New Moon archetype. Use the distortion to your advantage: let the dissolution clear what your intention needs removed.`,
    opening: () => `Your arc year opens in silence, as it should. Set the one intention that governs the next 12 months. Not a list. One direction, held with precision.`,
    building: () => `The invisible work continues. Your return this month is for deepening the intention you set, not broadcasting it. What have you learned since the last return?`,
    peak: () => `Your deepest return of the arc year. The New Moon archetype's peak is not visible — it is the moment when internal clarity becomes unshakeable. Something settles this month.`,
    deepening: () => `Integration window. What has grown from the seed you planted in your opening months? This return is for honest audit — what thrived, what needs redirecting.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion. What began in silence returns to silence — but you are not the same person. Set the intention for the next cycle with everything this year taught you.`
      : `A preparatory window. The year is closing. Use this return to clear what you don't want to carry into the next arc.`,
  },
  'First Quarter': {
    eclipse: () => `Eclipse season collides with your decision-making window this month. The crisis is real but compressed — act faster than comfortable, then reassess from the other side.`,
    opening: () => `The arc year opens with a challenge. Identify the specific obstacle you've been avoiding and move directly toward it. The First Quarter does not reward preparation.`,
    building: () => `Momentum is building and so is resistance. Your return this month is for the decision you've been deferring. Make it today. The conditions will not improve with more time.`,
    peak: () => `Maximum force. Your arc year's peak return asks for your most committed choice — the one you know you need to make but have been negotiating around. Now. Not tomorrow.`,
    deepening: (d) => `The decision has been made. Now hold it. Your ${season(monthNumFromAbbr(d.month))} return reinforces the commitment under pressure. Resistance at this stage is confirmation you moved toward something real.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion arrives as a final commitment. What one decision would make this year's work irreversible? Make it before the cycle resets.`
      : `Late-arc consolidation. You've broken through. This return is for completing what the breakthroughs opened — not for starting new battles.`,
  },
  'Full Moon': {
    eclipse: () => `Eclipse energy amplifies your already-high-visibility return this month. Something will be revealed whether you intend it or not. Choose to direct the light rather than be surprised by it.`,
    opening: () => `Your arc year opens in full light — unusual for a beginning, powerful for this archetype. What are you ready to present this year? Name it now so the cycle can build toward it.`,
    building: () => `Something is becoming visible. Your return this month marks a natural reveal point — share what you've been working on, even if it isn't complete. The Full Moon does not wait for perfect.`,
    peak: () => `The arc year's brightest window. Present. Publish. Release. You were built for this moment — the one where everything you've been becomes something the world can see.`,
    deepening: () => `A secondary culmination. What you revealed at your peak month — this return shows you what it became. Receive the response. Don't deflect the recognition.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion in full light. Bring one final thing to visibility before the cycle resets. The Full Moon closes what it opens — let this year's work be seen.`
      : `Late-arc clarity. The light is still on. Use this return to complete, not to begin again.`,
  },
  'Waning Gibbous': {
    eclipse: () => `Eclipse turbulence disrupts your transmission window this month. The signal is still there — it just needs a different channel. Share in smaller, more direct ways.`,
    opening: () => `Your arc year opens with a question: what do you know that someone else needs? The Disseminating archetype earns its power by giving it away. Begin passing it on.`,
    building: () => `Your knowledge is compounding. This return is for teaching what you've learned recently — not the polished version, the current version. The cycle values timeliness over precision.`,
    peak: () => `Peak broadcast window. Publish, teach, speak, share. Whatever you have been holding back under the pretense of "not ready" — release it. The arc year is listening.`,
    deepening: (d) => `The transmission continues. Your ${season(monthNumFromAbbr(d.month))} return is for the specific person or community who needs what you carry. Get specific. Generic sharing dissipates. Targeted sharing lands.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion through transmission. What did this year teach you? Write it down. Share it with one person who could use it. The cycle completes when the knowledge moves.`
      : `Late-arc broadcasting. What remains to be shared before the year closes? The Disseminating archetype leaves nothing essential unsaid.`,
  },
  'Last Quarter': {
    eclipse: () => `Eclipse energy accelerates your release this month — something may end faster or more completely than expected. Let it. The Last Quarter is built for exactly this.`,
    opening: () => `The arc year opens with a release. Identify one thing from the last cycle that does not belong in this one. The Last Quarter archetype builds by clearing first.`,
    building: () => `The audit deepens. Your return this month is for the honest assessment: what structures are you maintaining out of habit rather than conviction? Name them. Choose deliberately.`,
    peak: () => `Your arc year's deepest release window. The thing you've been holding — the story, the commitment, the version of yourself that's been running on inertia — this is the month you put it down.`,
    deepening: (d) => `The clearing is working. Your ${season(monthNumFromAbbr(d.month))} return shows you what emerged in the space. Protect what arrived. Release what filled the space reflexively.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion through final release. What does the next cycle not need to carry? The Last Quarter closes the year by clearing the path for what comes next.`
      : `Late-arc discernment. The major releases have happened. This return is for the fine audit — the small habits and agreements that quietly drain what they no longer serve.`,
  },
  'Waning Crescent': {
    eclipse: () => `Eclipse energy during a Balsamic return creates unusual depth. The dissolution is faster and stranger than usual. Trust it. Something is being removed that couldn't be released consciously.`,
    opening: () => `Your arc year opens in the dark — exactly as it should. The Balsamic archetype builds power through stillness. Rest without guilt this month. The cycle is already preparing.`,
    building: () => `The quiet work continues. Your return this month is not for output — it is for the inner clearing that makes the eventual output worth something. Protect the silence.`,
    peak: () => `Your deepest Balsamic window of the arc year. Something is completing at a level below conscious awareness. Trust the process. The most important work happening right now is invisible.`,
    deepening: (d) => `Integration continues. The ${season(monthNumFromAbbr(d.month))} return arrives as an invitation to withdraw from noise and attend to what's actually forming. The emergence is close. Don't rush it.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion in surrender. The cycle ends as it began — in the dark, in the quiet, in the deep. What arrives in the stillness of this return is the seed of the next arc.`
      : `Late-arc rest. Allow the year to finish on its own terms. The Balsamic archetype's gift is the graceful ending — take it.`,
  },
  'Waxing Gibbous': {
    eclipse: () => `Eclipse energy disrupts your refinement process this month. The edit you were planning may need to become a decision instead. Move from polish to release faster than comfortable.`,
    opening: () => `Your arc year opens with the question: what needs improving? The Waxing Gibbous archetype earns its power through surgical precision. Identify the single change that elevates the whole.`,
    building: () => `The refinement deepens. Your return this month is for the specific adjustment — not another pass over everything, but the one targeted change that moves the work from good to excellent.`,
    peak: () => `Peak precision window. Your arc year's sharpest return. Make the refinement you've been building toward — then ship the result. The Waxing Gibbous does not benefit from the eleventh revision.`,
    deepening: (d) => `The work is nearly ready. Your ${season(monthNumFromAbbr(d.month))} return asks one question: what is the last thing that genuinely needs to change? Make that change. Release what follows.`,
    closing: (d) => d.arcMonth === 12
      ? `Arc completion through refinement. What is the final version of this year's work? Make it. The cycle closes on the polished output, not the eternal draft.`
      : `Late-arc precision. You're in the home stretch. This return is for the detail work that distinguishes finished from complete.`,
  },
};

function getMonthCopy(pName: string, dayObj: DayContext): string {
  const library = MONTHLY_COPY[pName];
  if (!library) return 'Your lunar return arrives this month. Use it intentionally.';
  if (dayObj.eclipse) return library.eclipse(dayObj);
  const pos = arcPosition(dayObj.arcMonth);
  const fn = library[pos];
  return fn ? fn(dayObj) : library.building(dayObj);
}

// ─────────────────────────────────────────────
// 8. ARCHETYPE LIBRARY
// ─────────────────────────────────────────────

export interface ArchetypeData {
  name: string;
  title: string;
  subtitle: string;
  element: string;
  modality: string;
  somaticZone: string;
  solfeggio: string;
  solfeggioMeaning: string;
  instruction: string;
  navTabs: string[];
  whatThisMeans: string;
}

export const ARCHETYPES: Record<string, ArchetypeData> = {
  'New Moon': {
    name: 'The Void / The Seed',
    title: 'The Dark Initiation',
    subtitle: 'Everything begins in silence. The slate is clean.',
    element: 'Earth Resting',
    modality: 'Cardinal Stillness',
    somaticZone: 'Crown, Skull',
    solfeggio: '396Hz',
    solfeggioMeaning: 'Liberation from fear and guilt',
    instruction: 'Resist the urge to act. Let intention form fully before you move.',
    navTabs: ['STILLNESS', 'INTENTION', 'RESET', 'POTENTIAL', 'VOID'],
    whatThisMeans: `Born at the New Moon, you carry the full weight and full possibility of beginnings. Your energy is not visible — it is deep. You operate from an internal compass others cannot read from the outside. The challenge is that you often feel behind, as if you're the only one who hasn't started yet. You haven't not started. You are gathering.\n\nYour monthly returns are optimal for solo work, journaling, setting the precise intention before the action, and withdrawing from noise. The New Moon does not perform. It decides.`,
  },
  'Waxing Crescent': {
    name: 'The Sprout / The Pioneer',
    title: 'The Quickening',
    subtitle: 'Growth is accelerating. The abstract demands physical form.',
    element: 'Earth Rising',
    modality: 'Fixed Emergence',
    somaticZone: 'Throat, Voice',
    solfeggio: '417Hz',
    solfeggioMeaning: 'Facilitating change and transformation',
    instruction: 'Take the smallest physical step toward your goal.',
    navTabs: ['BREAKTHROUGH', 'COURAGE', 'FIRST STEPS', 'DECLARATION', 'MOMENTUM'],
    whatThisMeans: `Born during the Waxing Crescent, you are a pioneer at heart. You carry the surge of first momentum — the sprout breaking through resistance. Your innate courage to take initial action, even without guarantees, sets you apart. The challenge for you is follow-through; you may be drawn to new beginnings before completing current cycles.\n\nYour monthly returns are optimal for pushing through resistance, declaring intentions publicly, sending the message you've been drafting, and making the first move in any situation requiring courage over certainty.`,
  },
  'First Quarter': {
    name: 'The Builder / The Decision-Maker',
    title: 'The Crisis of Action',
    subtitle: 'The wall is real. So is your capacity to move through it.',
    element: 'Fire Directed',
    modality: 'Cardinal Force',
    somaticZone: 'Heart, Chest, Arms',
    solfeggio: '528Hz',
    solfeggioMeaning: 'Transformation and miracles',
    instruction: 'Make the decision. The conditions will never be perfect.',
    navTabs: ['DECISION', 'BUILD', 'FORCE', 'OBSTACLE', 'COMMIT'],
    whatThisMeans: `Born at the First Quarter, you are wired for decisive action in the face of resistance. You feel most alive at the crisis point — when something must be broken through to move forward. Your superpower is choosing when others hesitate. Your shadow is that you can create conflict where none is needed, just to feel the aliveness of resolution.\n\nYour monthly returns are optimal for making the decision you have been deferring, confronting structural obstacles, and doing the specific thing that feels most difficult right now.`,
  },
  'Waxing Gibbous': {
    name: 'The Refiner / The Analyst',
    title: "The Perfectionist's Edge",
    subtitle: 'Almost ready. The work now is in the details.',
    element: 'Earth Perfecting',
    modality: 'Mutable Precision',
    somaticZone: 'Gut, Digestion, Nervous System',
    solfeggio: '639Hz',
    solfeggioMeaning: 'Connecting and relationships',
    instruction: 'Ship the refined version, not the perfect one.',
    navTabs: ['REFINE', 'ANALYZE', 'ADJUST', 'DISCERN', 'PERFECT'],
    whatThisMeans: `Born during the Waxing Gibbous, you carry the drive toward excellence in your bones. You notice what others miss. You are the person who reads the fine print, catches the error, improves the draft. The challenge is that "almost ready" can become permanent residence. The cycle does not wait for perfect.\n\nYour monthly returns are optimal for editing, refining a project before release, doing the quality check, upgrading the thing that is good into the thing that is excellent.`,
  },
  'Full Moon': {
    name: 'The Illuminator / The Fulfilled',
    title: 'The Revelation',
    subtitle: 'What was hidden is now visible. Truth arrives without warning.',
    element: 'Water Illuminated',
    modality: 'Fixed Culmination',
    somaticZone: 'Eyes, Pineal, Full Body',
    solfeggio: '741Hz',
    solfeggioMeaning: 'Awakening intuition',
    instruction: 'Let yourself be fully seen. The light is the work.',
    navTabs: ['REVEAL', 'CULMINATE', 'SEE', 'ILLUMINATE', 'RECEIVE'],
    whatThisMeans: `Born at the Full Moon, you live at maximum visibility. You were made to be seen, to synthesize, to bring things to completion and present them to the world. Your challenge is the weight of that visibility — you may feel simultaneously called to the center and terrified of it. Both feelings are correct. Neither stops the work.\n\nYour monthly returns are optimal for presenting, publishing, culminating a project, having the difficult conversation that has been building, and receiving recognition without deflecting it.`,
  },
  'Waning Gibbous': {
    name: 'The Teacher / The Broadcaster',
    title: 'The Transmission',
    subtitle: 'You have learned something. The cycle now asks you to pass it on.',
    element: 'Fire Sharing',
    modality: 'Mutable Distribution',
    somaticZone: 'Hips, Lower Back, Circulation',
    solfeggio: '852Hz',
    solfeggioMeaning: 'Returning to spiritual order',
    instruction: "Share what you know before you think you know enough to share it.",
    navTabs: ['SHARE', 'TEACH', 'BROADCAST', 'DISTRIBUTE', 'ILLUMINATE'],
    whatThisMeans: `Born during the Disseminating phase, you are a natural communicator of earned wisdom. You don't theorize — you distill from experience and pass the intelligence forward. Your challenge is that you can give endlessly to others while neglecting the personal arc of your own becoming. The teacher must also be a student.\n\nYour monthly returns are optimal for publishing, teaching, mentoring, sharing your process publicly, and any communication that requires credibility and lived authority.`,
  },
  'Last Quarter': {
    name: 'The Re-Evaluator / The Reorienter',
    title: 'The Crisis of Consciousness',
    subtitle: 'Something must go. The release is the initiation.',
    element: 'Air Clearing',
    modality: 'Cardinal Release',
    somaticZone: 'Kidneys, Lower Back, Joints',
    solfeggio: '963Hz',
    solfeggioMeaning: 'Activation of the pineal gland',
    instruction: 'Identify one thing to release before you reach for the next.',
    navTabs: ['RELEASE', 'REORIENT', 'QUESTION', 'LET GO', 'CLEAR'],
    whatThisMeans: `Born at the Last Quarter, you carry a deep and perpetual drive toward reorientation. You do not stay where you outgrow. You question structures others accept, including your own. Your superpower is the willingness to dismantle and rebuild — your shadow is that the dismantling can become its own addiction.\n\nYour monthly returns are optimal for ending what has run its course, making the break, doing the audit of what is genuinely serving you and what is habitual, and clearing the deck before the next arc begins.`,
  },
  'Waning Crescent': {
    name: 'The Mystic / The Surrender',
    title: 'The Dark Before',
    subtitle: 'The cycle completes in silence. What remains is essential.',
    element: 'Water Dissolving',
    modality: 'Mutable Return',
    somaticZone: 'Feet, Lymph, Immune System',
    solfeggio: '174Hz',
    solfeggioMeaning: 'Foundation of security and pain reduction',
    instruction: 'Rest without guilt. Withdrawal is preparation, not failure.',
    navTabs: ['SURRENDER', 'REST', 'DISSOLVE', 'TRUST', 'COMPLETE'],
    whatThisMeans: `Born during the Balsamic phase, you arrived at the end of a cycle — carrying wisdom from everything that came before. You are deeply intuitive, often ahead of your time, and frequently misunderstood by those operating in the earlier phases around you. Your challenge is the world's expectation that you produce continuously. You are not built for continuous output. You are built for depth and emergence.\n\nYour monthly returns are optimal for retreating, completing unfinished inner work, visioning the next cycle before it begins, and any practice requiring solitude, depth, and undivided attention.`,
  },
};

// ─────────────────────────────────────────────
// 9. ARC PRACTICE COPY
// ─────────────────────────────────────────────

export interface ArcPracticePanel {
  title: string;
  subtitle?: string;
  body?: string;
  before?: string;
  during?: string;
  after?: string;
}

export interface ArcPracticeData {
  panelA: ArcPracticePanel;
  panelB: ArcPracticePanel;
  panelC: ArcPracticePanel;
  panelD: ArcPracticePanel;
}

export const ARC_PRACTICE: Record<string, ArcPracticeData> = {
  'Waxing Crescent': {
    panelA: {
      title: 'Before · During · After',
      before: `Reduce noise. Stop adding to the list. The 48 hours before your return are a natural declutter window — what you carry into your power day is what you work with. Travel light.`,
      during: `This is the window for a single, specific act of beginning. Not planning. Not preparing to begin. The act itself. Send the email. Make the call. Post the thing. The crescent rewards action, not intention.`,
      after: `Don't immediately abandon what you started. The three days after your return are a follow-through window. The initiation has momentum — walk with it before the cycle pulls attention elsewhere.`,
    },
    panelB: {
      title: 'The Waxing Crescent Arc',
      body: `Over 12 months, your power days trace a curriculum. The first three months ask you to establish — to name what this arc is for. The middle months ask you to sustain the thing you started under pressure, distraction, and doubt. The final months ask you to complete with the same intention you began with.\n\nMost people initiate well. The Waxing Crescent archetype is exceptional at beginnings. The arc year's work is to become equally powerful at staying.`,
    },
    panelC: {
      title: 'Where This Pattern Breaks',
      body: `The Waxing Crescent shadow is the unfinished trail — the list of starts without completions. Your risk is using each new power day as a reason to pivot away from the previous one. The cycle will always offer a fresh beginning. The discipline is recognizing when a beginning is growth and when it is avoidance.\n\nOne useful rule: before your power day, audit what you started at the previous return. What does it need to move forward? That answer is often the actual power day work.`,
    },
    panelD: {
      title: 'The Practice',
      subtitle: 'The Declaration Practice',
      body: `On your power day, write one sentence that begins with "I am beginning." Not "I want to." Not "I plan to." I am beginning.\n\nThen do one physical act — however small — that makes the sentence true. Send one message. Write one page. Make one call. Take one step outside with the intention of a walk you will actually finish.\n\nThe crescent does not build cathedrals on power day. It plants the thing that becomes one.`,
    },
  },
  'New Moon': {
    panelA: { title: 'Before · During · After', before: `The New Moon archetype doesn't need decluttering — it needs deepening. Use the days before your return for silence, journaling, and the specific question you want answered.`, during: `One intention. Not a list. The New Moon power day is for setting the single most important direction for the coming cycle. Write it. Speak it aloud. Give it a physical form.`, after: `Protect the intention. The three days post-return are vulnerable to external noise re-routing what you just set. Hold what you decided quietly before broadcasting it.` },
    panelB: { title: 'The New Moon Arc', body: `Your arc teaches patience as strategy. The New Moon archetype generates power through depth of intention rather than speed of action. Over 12 months, your curriculum is learning to trust the invisible work — the preparation that others can't see, that you yourself can't always measure.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is paralysis disguised as preparation. The seed that stays in the dark too long does not become wiser — it misses the season. Your pattern to watch: endless refinement of the intention before it ever becomes action.` },
    panelD: { title: 'The Practice', subtitle: 'The Silence Practice', body: `On your power day, hold 20 minutes of complete silence before writing anything down. Let the answer arrive rather than constructing it.\n\nWhat surfaces in that silence is the actual intention. Everything else is noise dressed as purpose.` },
  },
  'First Quarter': {
    panelA: { title: 'Before · During · After', before: `Identify the specific obstacle you have been avoiding. Name it concretely. Your power day is built for collision with exactly that thing.`, during: `Make the decision you've been deferring. The First Quarter does not reward contemplation on the power day — it rewards the committed choice, even imperfect.`, after: `Hold the decision. The days after your return will test whether you meant it. Resistance is the confirmation that you moved toward something real.` },
    panelB: { title: 'The First Quarter Arc', body: `Your arc year teaches you the difference between productive conflict and reactive conflict. The First Quarter archetype is powerful when directed — destructive when it turns on itself or on relationships that don't require dismantling.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is picking fights with proxies. Creating external friction to feel the aliveness of crisis rather than sitting with the internal one that actually needs attention.` },
    panelD: { title: 'The Practice', subtitle: 'The Decision Practice', body: `Write the decision you've been deferring. Below it, write only: "I am choosing this." Then act on it within the same day. Not tomorrow. The First Quarter does not reward the deferred commitment.` },
  },
  'Waxing Gibbous': {
    panelA: { title: 'Before · During · After', before: `Review what you've built since your last power day. Not to judge it — to see what specifically needs to change. Arrive with a targeted list, not a vague sense of dissatisfaction.`, during: `Refine one specific thing. Not everything. The Waxing Gibbous power day is for surgical improvement, not wholesale revision. What is the single change that elevates the whole?`, after: `Release the refined version. The three days after your return are the window to ship the improved draft, not to find the next thing to fix.` },
    panelB: { title: 'The Waxing Gibbous Arc', body: `Your arc year is a sustained lesson in the difference between refinement and perfectionism. One serves the work. One serves the fear of the work being seen. The curriculum is learning to tell the difference in real time.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is indefinite refinement — the project that is always almost done. Your power day is not for beginning another pass. It is for completing this one.` },
    panelD: { title: 'The Practice', subtitle: 'The Shipping Practice', body: `On your power day, identify the thing that is "almost ready." Make the one change it actually needs. Then release it. The Waxing Gibbous does not reward the tenth revision. It rewards the one that made it real.` },
  },
  'Full Moon': {
    panelA: { title: 'Before · During · After', before: `The Full Moon archetype often feels emotional pressure in the 48 hours before the return. This is the charge building. Do not discharge it prematurely in conversations you'll regret.`, during: `Present. Publish. Reveal. Your power day is for the thing that needed to be seen. If you have been holding something back, this is the window. The Full Moon does not hide.`, after: `Integration. The reveal creates movement in all directions. The three days after are for processing what came back — the feedback, the response, the unexpected.` },
    panelB: { title: 'The Full Moon Arc', body: `Your arc teaches you that visibility is the work, not the reward for the work. Over 12 months, your curriculum is becoming someone who brings things to completion without needing them to be perfect first.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is performing visibility instead of enacting it. The Full Moon archetype can mistake being seen for being known. Real revelation requires substance, not staging.` },
    panelD: { title: 'The Practice', subtitle: 'The Completion Practice', body: `On your power day, finish one thing. Send the draft. Post the piece. Have the conversation. Close the loop you left open. The Full Moon's gift is completion — use it.` },
  },
  'Waning Gibbous': {
    panelA: { title: 'Before · During · After', before: `Gather what you've learned. The Disseminating archetype's power day works best when you arrive knowing what you're there to pass on.`, during: `Share something. Teach something. Publish the piece that contains what you know. Reach the specific person who needs the intelligence you carry.`, after: `Receive the response. The teacher learns most in the exchange that follows the sharing.` },
    panelB: { title: 'The Waning Gibbous Arc', body: `Your arc teaches you that what you know is already enough to be useful to someone. The 12-month curriculum is moving from private accumulation to public contribution — not when you feel ready, but cyclically, by design.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is hoarding wisdom under the guise of "still learning." If you are always preparing to share but never sharing, the cycle has been subverted. The Disseminating phase does not offer a readiness test. It offers a window.` },
    panelD: { title: 'The Practice', subtitle: 'The Teaching Practice', body: `On your power day, write one paragraph that begins: "What I know about this is..." Publish it somewhere someone can find it. The scope is irrelevant. The act is the arc.` },
  },
  'Last Quarter': {
    panelA: { title: 'Before · During · After', before: `Audit. What in your current arc has run its course? Name it honestly before the power day arrives.`, during: `Release one thing. One commitment that has become habit. One relationship to a story about yourself. One structure that no longer fits. The Last Quarter requires a sacrifice, not a plan.`, after: `Note the space. What the release created is the actual gift. The three days after are for observing what arrives into the clearing you made.` },
    panelB: { title: 'The Last Quarter Arc', body: `Your arc year is one long practice in discernment — learning to tell the difference between things worth fighting for and things that simply need to end. Over 12 months, the curriculum is reorienting without drama.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is addictive dismantling — breaking down structures that are actually working because the act of breaking feels more alive than the act of sustaining. Watch for it.` },
    panelD: { title: 'The Practice', subtitle: 'The Release Practice', body: `Write three things you are still carrying that do not belong in the next cycle. Choose one to act on today. The act can be small. The decision must be real.` },
  },
  'Waning Crescent': {
    panelA: { title: 'Before · During · After', before: `Stop producing. The Balsamic archetype's power day is not for output. Use the days before for deep rest, solitude, and the question you have been avoiding.`, during: `Withdraw. This is the one power day in the cycle that asks nothing of you except presence. Be somewhere quiet. Sleep more than usual. Let the cycle complete without intervention.`, after: `Notice what arrives in the silence. The three days after a Balsamic return are often when the most important clarity surfaces — not during the day itself, but in its aftermath.` },
    panelB: { title: 'The Waning Crescent Arc', body: `Your arc year teaches you that rest is structural, not earned. The 12-month curriculum is building a life that has regular withdrawal built in — not as indulgence but as the condition that makes everything else possible.` },
    panelC: { title: 'Where This Pattern Breaks', body: `The shadow is productive guilt — the inability to stop working without feeling like you are failing. The Balsamic archetype is relentlessly punished by a culture that worships continuous output. Your power day asks you to resist that.` },
    panelD: { title: 'The Practice', subtitle: 'The Stillness Practice', body: `On your power day, give yourself permission to do nothing for a minimum of two hours. No content. No production. No optimization. Let the cycle end on its own terms. The new one is already preparing.` },
  },
};

// ─────────────────────────────────────────────
// 10. PEAK WINDOWS SUMMARY
// ─────────────────────────────────────────────

const PEAK_CHARACTERIZATIONS: Record<string, { high: string; mid: string; low: string }> = {
  'Waxing Crescent': { high: 'Full Amplitude', mid: 'Strong Surge', low: 'Clear Window' },
  'New Moon': { high: 'Deep Signal', mid: 'Clean Slate', low: 'Pure Intention' },
  'First Quarter': { high: 'Maximum Force', mid: 'Clear Decision', low: 'High Resistance' },
  'Waxing Gibbous': { high: 'Precision Peak', mid: 'Sharp Edge', low: 'Refinement Window' },
  'Full Moon': { high: 'Full Visibility', mid: 'Peak Culmination', low: 'Complete Reveal' },
  'Waning Gibbous': { high: 'Strong Broadcast', mid: 'Clear Transmission', low: 'Wide Reach' },
  'Last Quarter': { high: 'Clean Release', mid: 'Clear Break', low: 'Hard Decision' },
  'Waning Crescent': { high: 'Deep Rest', mid: 'Full Surrender', low: 'Complete Quiet' },
};

function getCharacterization(phase: string, power: number): string {
  const set = PEAK_CHARACTERIZATIONS[phase] || PEAK_CHARACTERIZATIONS['Waxing Crescent'];
  if (power >= 97) return set.high;
  if (power >= 91) return set.mid;
  return set.low;
}

function getSoftestMonthNote(phase: string): string {
  const notes: Record<string, string> = {
    'Waxing Crescent': 'use for behind-the-scenes prep, not launch',
    'New Moon': 'use for rest and visioning, not decisions',
    'First Quarter': 'internal work only — not for external confrontation',
    'Waxing Gibbous': 'step away from the project — return with fresh eyes',
    'Full Moon': 'lower visibility window — use for private completion',
    'Waning Gibbous': 'receive rather than broadcast this month',
    'Last Quarter': 'observe rather than act — the release will clarify itself',
    'Waning Crescent': 'deepest rest of the arc year — honour it fully',
  };
  return notes[phase] || 'use for inner work, not external action';
}

export interface PeakSummary {
  peakLines: string[];
  softestLine: string;
}

function buildPeakSummary(powerDays: PowerDay[], phase: string): PeakSummary {
  const sorted = [...powerDays].sort((a, b) => b.power - a.power);
  const top3 = sorted.slice(0, 3);
  const softest = sorted[sorted.length - 1];
  const peakLines = top3.map(d =>
    `${d.monthFull} ${d.day} · ${d.power}% · ${getCharacterization(phase, d.power)}`
  );
  return {
    peakLines,
    softestLine: `${softest.monthFull} — ${getSoftestMonthNote(phase)}`,
  };
}

// ─────────────────────────────────────────────
// 11. MASTER REPORT ASSEMBLER
// ─────────────────────────────────────────────

export interface LunarReport {
  meta: {
    generatedDate: string;
    birthDate: string;
    birthTime: string;
    location: string;
    querentName: string;
  };
  natal: {
    phase: string;
    angle: string;
    archetype: string;
    title: string;
    subtitle: string;
    element: string;
    modality: string;
    somaticZone: string;
    solfeggio: string;
    solfeggioMeaning: string;
    instruction: string;
    navTabs: string[];
    whatThisMeans: string;
  };
  powerDays: PowerDay[];
  peakSummary: PeakSummary;
  arcPractice: ArcPracticeData;
  closing: {
    headline1: string;
    headline2: string;
    body: string;
  };
}

export function generateReport(birthDate: string, birthTime: string, location = '', querentName = ''): LunarReport {
  const birthJD = toJulianDate(birthDate, birthTime);
  const natalAngle = moonPhaseAngle(birthJD);
  const natalPhase = phaseName(natalAngle);
  const archetype = ARCHETYPES[natalPhase];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayJD = toJulianDate(todayStr, '00:00');
  const rawDays = get12PowerDays(natalAngle, todayJD);

  const powerDays: PowerDay[] = rawDays.map(d => ({
    ...d,
    keyword: phaseKeyword(natalPhase),
    description: getMonthCopy(natalPhase, { power: d.power, arcMonth: d.arcMonth, month: d.month, eclipse: d.eclipse }),
    isPeak: false,
  }));

  const maxPower = Math.max(...powerDays.map(d => d.power));
  powerDays.forEach(d => { if (d.power === maxPower) d.isPeak = true; });

  const peakSummary = buildPeakSummary(powerDays, natalPhase);
  const arcPractice = ARC_PRACTICE[natalPhase];

  return {
    meta: {
      generatedDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      birthDate,
      birthTime,
      location,
      querentName,
    },
    natal: {
      phase: natalPhase,
      angle: natalAngle.toFixed(2),
      archetype: archetype.name,
      title: archetype.title,
      subtitle: archetype.subtitle,
      element: archetype.element,
      modality: archetype.modality,
      somaticZone: archetype.somaticZone,
      solfeggio: archetype.solfeggio,
      solfeggioMeaning: archetype.solfeggioMeaning,
      instruction: archetype.instruction,
      navTabs: archetype.navTabs,
      whatThisMeans: archetype.whatThisMeans,
    },
    powerDays,
    peakSummary,
    arcPractice,
    closing: {
      headline1: 'The Moon Reflects.',
      headline2: 'You Transform.',
      body: `This report is your compass for the coming year. Return to it monthly. Mark your calendar with your power days. Over time, you will develop an intuitive relationship with your natal lunar rhythm — one that informs not just your planning, but your entire way of being.`,
    },
  };
}
