// ─────────────────────────────────────────────────────────────────────────────
// The Lunar Chaperone — CANONICAL 24-step sequence + live workbook resolver.
//
// THE SINGLE SOURCE OF TRUTH. Every Chaperone surface (page, covers, emails,
// deep links) must derive from this file. Do not hand-author pairings anywhere
// else — that is exactly how the site drifted out of astronomical alignment.
//
// THE MODEL
//   One continuous 24-step loop of HALF-moons through the lunar year.
//   • Odd steps  = WAXING half : New Moon → Full Moon in the OPPOSITE sign (180°).
//   • Even steps = WANING half : that Full Moon → the NEXT New Moon, one sign on.
//   • Each step's end sign+phase == the next step's start (gap-free, cyclic).
//   • Consecutive New Moons advance exactly one sign (Aries→Taurus→…→Pisces).
//   • The ECLIPSE is a TAG on the lunation nearest a node — NOT a separate
//     workbook. For 2026 that charge lands on wb09 (Leo–Aquarius). Recompute
//     yearly (see resolveEclipseWorkbook) as the nodes migrate.
//
// INVARIANT (asserted at module load in dev): a waxing step's two signs are
// always polar opposites, i.e. Fire↔Air or Earth↔Water. Any Fire→Water or
// Earth→Fire waxing pairing is impossible and indicates corrupted data.
// ─────────────────────────────────────────────────────────────────────────────

export type SignCode =
  | "Ari" | "Tau" | "Gem" | "Can" | "Leo" | "Vir"
  | "Lib" | "Sco" | "Sag" | "Cap" | "Aqu" | "Pis";

export type Phase = "New" | "Full";
export type Element = "Fire" | "Earth" | "Air" | "Water";

export interface SignMeta {
  code: SignCode;
  name: string;
  glyph: string;
  element: Element;
  modality: "Cardinal" | "Fixed" | "Mutable";
  body: string;   // somatic region
  drive: string;  // core verb
  self: string;   // "I ___" statement
}

export interface Workbook {
  n: string;            // "01".."24"
  sequence: number;     // 1..24
  lead: string;         // e.g. "From Fire"
  accent: string;       // e.g. "to Balance"
  title: string;        // lead + " " + accent
  start: SignCode;
  end: SignCode;
  startPhase: Phase;
  endPhase: Phase;
  waxing: boolean;      // true = New→Full half
  journey: string;      // "Aries New Moon → Libra Full Moon"
  elementShift: string; // "Fire → Air"
  blurb: string;
  prompt: string;
  isEclipse: boolean;   // 2026 tag
}

export const SIGN_ORDER: SignCode[] = [
  "Ari","Tau","Gem","Can","Leo","Vir","Lib","Sco","Sag","Cap","Aqu","Pis",
];

/** Polar opposition axis. A New Moon's Full Moon is always its opposite. */
export const OPPOSITE: Record<SignCode, SignCode> = {
  Ari:"Lib", Tau:"Sco", Gem:"Sag", Can:"Cap", Leo:"Aqu", Vir:"Pis",
  Lib:"Ari", Sco:"Tau", Sag:"Gem", Cap:"Can", Aqu:"Leo", Pis:"Vir",
};

export const SIGNS: Record<SignCode, SignMeta> = {
  Ari:{code:"Ari",name:"Aries",glyph:"\u2648",element:"Fire",modality:"Cardinal",body:"head / initiative",drive:"Impulse",self:"I am"},
  Tau:{code:"Tau",name:"Taurus",glyph:"\u2649",element:"Earth",modality:"Fixed",body:"throat / worth",drive:"Steadiness",self:"I have"},
  Gem:{code:"Gem",name:"Gemini",glyph:"\u264A",element:"Air",modality:"Mutable",body:"hands / word",drive:"Curiosity",self:"I think"},
  Can:{code:"Can",name:"Cancer",glyph:"\u264B",element:"Water",modality:"Cardinal",body:"womb / feeling",drive:"Tending",self:"I feel"},
  Leo:{code:"Leo",name:"Leo",glyph:"\u264C",element:"Fire",modality:"Fixed",body:"heart / display",drive:"Radiance",self:"I create"},
  Vir:{code:"Vir",name:"Virgo",glyph:"\u264D",element:"Earth",modality:"Mutable",body:"gut / refinement",drive:"Refinement",self:"I serve"},
  Lib:{code:"Lib",name:"Libra",glyph:"\u264E",element:"Air",modality:"Cardinal",body:"back / balance",drive:"Weighing",self:"I balance"},
  Sco:{code:"Sco",name:"Scorpio",glyph:"\u264F",element:"Water",modality:"Fixed",body:"root / power",drive:"Depth",self:"I transform"},
  Sag:{code:"Sag",name:"Sagittarius",glyph:"\u2650",element:"Fire",modality:"Mutable",body:"hips / reach",drive:"Reach",self:"I see"},
  Cap:{code:"Cap",name:"Capricorn",glyph:"\u2651",element:"Earth",modality:"Cardinal",body:"bones / structure",drive:"Discipline",self:"I build"},
  Aqu:{code:"Aqu",name:"Aquarius",glyph:"\u2652",element:"Air",modality:"Fixed",body:"circulation / signal",drive:"Detachment",self:"I know"},
  Pis:{code:"Pis",name:"Pisces",glyph:"\u2653",element:"Water",modality:"Mutable",body:"feet / dissolve",drive:"Surrender",self:"I dissolve"},
};

/** Element → hex for the signature gradient bars. */
export const ELEMENT_HEX: Record<Element, string> = {
  Fire: "#e5432c", Earth: "#8a8a3a", Air: "#2a78d6", Water: "#7a4ea3",
};

// [n, lead, accent, start, startPhase, end, endPhase]
type Row = [string, string, string, SignCode, Phase, SignCode, Phase];
const ROWS: Row[] = [
  ["01","From Fire","to Balance","Ari","New","Lib","Full"],["02","From Balance","to Root","Lib","Full","Tau","New"],
  ["03","From Root","to Depth","Tau","New","Sco","Full"],["04","From Depth","to Voice","Sco","Full","Gem","New"],
  ["05","From Voice","to Vision","Gem","New","Sag","Full"],["06","From Vision","to Womb","Sag","Full","Can","New"],
  ["07","From Womb","to Bone","Can","New","Cap","Full"],["08","From Bone","to Heart","Cap","Full","Leo","New"],
  ["09","From Heart","to Mind","Leo","New","Aqu","Full"],["10","From Mind","to Gut","Aqu","Full","Vir","New"],
  ["11","From Gut","to Soul","Vir","New","Pis","Full"],["12","From Soul","to Balance","Pis","Full","Lib","New"],
  ["13","From Balance","to Fire","Lib","New","Ari","Full"],["14","From Fire","to Depth","Ari","Full","Sco","New"],
  ["15","From Depth","to Root","Sco","New","Tau","Full"],["16","From Root","to Vision","Tau","Full","Sag","New"],
  ["17","From Vision","to Voice","Sag","New","Gem","Full"],["18","From Voice","to Bone","Gem","Full","Cap","New"],
  ["19","From Bone","to Womb","Cap","New","Can","Full"],["20","From Womb","to Mind","Can","Full","Aqu","New"],
  ["21","From Mind","to Heart","Aqu","New","Leo","Full"],["22","From Heart","to Soul","Leo","Full","Pis","New"],
  ["23","From Soul","to Gut","Pis","New","Vir","Full"],["24","From Gut","to Fire","Vir","Full","Ari","New"],
];

const BLURB: Record<string,string> = {
  "01":"Raw self meeting the other — the 'I' discovering it lives inside a 'we'.",
  "02":"Exposed weighing settling back into the body — the decision seeking ground.",
  "03":"Steady ground opening to what it's been sitting on — comfort meeting the current beneath it.",
  "04":"What surfaced in the dark, learning to be spoken — the buried thing finding words.",
  "05":"Scattered words gathering into meaning — many small truths becoming one direction.",
  "06":"The far horizon folding back toward home — meaning seeking something tender to protect.",
  "07":"Tender care maturing into durable structure — the feeling given a frame that can carry it.",
  "08":"Proven structure softening enough to be warm — what you mastered, learning to be seen.",
  "09":"Personal radiance widening into shared signal — the self becoming the network. Carries 2026's eclipse charge.",
  "10":"Abstract knowing landing in daily craft — the pattern made useful with the hands.",
  "11":"Precise analysis loosening into faith — the map dissolving into the territory.",
  "12":"Formless feeling seeking a fair shape — the ocean learning where it meets the shore.",
  "13":"Careful weighing giving way to decisive spark — the deliberation finally moving.",
  "14":"Raw drive following its own heat into the underworld — the impulse meeting its shadow.",
  "15":"Transformation coming to rest in the body — the fire underground becoming ground.",
  "16":"Settled ground reaching for the far horizon — the body remembering it can travel.",
  "17":"Broad meaning narrowing to the spoken word — the vision finding its sentence.",
  "18":"Quick language committing to lasting form — the word given the weight of structure.",
  "19":"Hard-won structure learning to hold, not just stand — what you built, opening to be felt.",
  "20":"Private feeling widening into shared understanding — what you protected becoming a pattern.",
  "21":"Cool idea warming into personal expression — the pattern you saw, now something you make.",
  "22":"Personal radiance dissolving into something larger — the performance surrendering to the ocean.",
  "23":"Formless faith taking a useful shape — the vision learning to work with its hands.",
  "24":"Refined analysis releasing into pure initiative — the perfected thing, ready to begin again.",
};
const PROMPT: Record<string,string> = {
  "01":"Where has your first impulse ignored someone across from you? Weigh the move you'd make if you counted them in.",
  "02":"What have you deliberated to exhaustion? Release the scales and let one steady value decide.",
  "03":"What have you kept stable by refusing to look underneath? Follow one settled thing down to its root.",
  "04":"What did the depths show you that you've never said aloud? Give it one plain sentence.",
  "05":"Which quick opinion is actually pointing at a life you want? Follow one sentence to its horizon.",
  "06":"What big belief have you chased away from what needs you? Bring one conviction home and tend it.",
  "07":"What do you protect that now needs to be built, not just held? Give one soft thing a spine.",
  "08":"Where has competence replaced joy? Do one thing badly, and for love, this cycle.",
  "09":"What have you made for yourself alone that the wider circle now needs? At the eclipse, hand your warmth to the collective.",
  "10":"Which idea have you understood but never enacted? Follow it down from the head into the hands.",
  "11":"Where is your need to fix something actually a refusal to feel it? Let one edge blur.",
  "12":"What have you dissolved into that now needs a boundary? Weigh where you end and another begins.",
  "13":"Which decision have you balanced so long it's gone cold? Name the one you'd make if you stopped consulting.",
  "14":"What impulse are you proud of that has a shadow you won't look at? Follow the heat down.",
  "15":"What have you burned through that now needs somewhere solid to live? Locate it in the senses.",
  "16":"Where has stability become stuckness? Find the horizon that pulls you past what's comfortable.",
  "17":"What do you know that you've never said plainly? Bring one large truth down to a single line.",
  "18":"Which of your ideas deserves to be built, not just talked about? Commit it to a frame and a deadline.",
  "19":"Where has what you built stopped nourishing you? Find the one wall that could become a cradle.",
  "20":"What have you felt privately that others are quietly feeling too? Turn one tenderness into a shared idea.",
  "21":"What have you understood from a distance but never dared to feel? Bring one idea close enough to burn.",
  "22":"Where does needing to be seen block real connection? Let one act of yours dissolve into the whole.",
  "23":"What insight have you floated in but never enacted? Give it one concrete, humble task today.",
  "24":"What have you perfected to avoid starting? Close the loop and light the next spark, unfinished.",
};

const phaseLabel = (p: Phase) => (p === "New" ? "New Moon" : "Full Moon");

export const WORKBOOKS: Workbook[] = ROWS.map(([n, lead, accent, s, sp, e, ep]) => ({
  n,
  sequence: Number(n),
  lead,
  accent,
  title: `${lead} ${accent}`,
  start: s,
  end: e,
  startPhase: sp,
  endPhase: ep,
  waxing: sp === "New",
  journey: `${SIGNS[s].name} ${phaseLabel(sp)} \u2192 ${SIGNS[e].name} ${phaseLabel(ep)}`,
  elementShift: `${SIGNS[s].element} \u2192 ${SIGNS[e].element}`,
  blurb: BLURB[n],
  prompt: PROMPT[n],
  isEclipse: n === "09",
}));

export const getWorkbook = (n: string): Workbook | undefined =>
  WORKBOOKS.find((w) => w.n === n);

// ── Live resolver — which workbook is the sky in right now? ──────────────────
// Self-contained low-precision solar/lunar longitude (Meeus, ±~0.5°), validated
// against 2026 lunations. Works for ANY year, unlike the 2026-only data tables.
// (moon-tuner also ships `astronomy-engine`; swap this for that if you prefer,
// but keep the anchoring logic identical.)

const SYNODIC = 29.530588;
const norm = (x: number) => ((x % 360) + 360) % 360;
const d2000 = (d: Date) => (d.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
const RAD = Math.PI / 180;

function sunLon(d: number): number {
  const g = norm(357.529 + 0.98560028 * d);
  const q = norm(280.459 + 0.98564736 * d);
  return norm(q + 1.915 * Math.sin(g * RAD) + 0.02 * Math.sin(2 * g * RAD));
}
function moonLon(d: number): number {
  const L = 218.316 + 13.176396 * d, M = 134.963 + 13.064993 * d,
    Ms = 357.529 + 0.9856 * d, D = 297.85 + 12.190749 * d, F = 93.272 + 13.22935 * d;
  return norm(
    L + 6.289 * Math.sin(M * RAD) + 1.274 * Math.sin((2 * D - M) * RAD) +
    0.658 * Math.sin(2 * D * RAD) + 0.214 * Math.sin(2 * M * RAD) -
    0.186 * Math.sin(Ms * RAD) - 0.114 * Math.sin(2 * F * RAD)
  );
}

export interface SkyNow {
  workbook: Workbook;
  waxing: boolean;
  phaseIndex: number;   // 0..7 (New … Waning Crescent)
  illumination: number; // 0..1
  moonSign: SignCode;
}

/** Resolve the current (or any date's) live Chaperone workbook. */
export function resolveWorkbook(date: Date = new Date()): SkyNow {
  const d = d2000(date);
  const elong = norm(moonLon(d) - sunLon(d));
  const waxing = elong < 180;
  const illumination = (1 - Math.cos(elong * RAD)) / 2;
  const phaseIndex = Math.floor(norm(elong + 22.5) / 45) % 8;
  const moonSign = SIGN_ORDER[Math.floor(moonLon(d) / 30) % 12];

  let n: number;
  if (waxing) {
    const dNew = d - (elong / 360) * SYNODIC;
    const nmi = Math.floor(norm(sunLon(dNew)) / 30) % 12; // New Moon sign = Sun's sign
    n = nmi * 2 + 1;
  } else {
    const dFull = d - ((elong - 180) / 360) * SYNODIC;
    const fmi = Math.floor(norm(sunLon(dFull) + 180) / 30) % 12; // Full sign = opposite Sun
    n = ((fmi - 6 + 12) % 12) * 2 + 2;
  }
  return {
    workbook: WORKBOOKS[n - 1],
    waxing,
    phaseIndex,
    illumination,
    moonSign,
  };
}

/**
 * Which workbook carries this year's eclipse charge. An eclipse falls on the
 * lunation nearest a lunar node. Hardcoded for 2026; replace with an ephemeris
 * lookup of the ascending-node longitude to keep it current in later years.
 */
export function resolveEclipseWorkbook(year: number): { n: string; note: string } {
  if (year === 2026) {
    return {
      n: "09",
      note: "Solar eclipse 20\u00B0 Leo (Aug 12 2026); lunar eclipse 4\u00B0 Aquarius (Aug 27 2026).",
    };
  }
  // TODO: compute from the true node longitude for the requested year.
  return { n: "09", note: "Eclipse tag not yet computed for this year." };
}

// ── Dev-time invariant guard — fails loud if the canon is ever corrupted. ────
if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
  const errors: string[] = [];
  WORKBOOKS.forEach((w, i) => {
    const prev = WORKBOOKS[(i - 1 + 24) % 24];
    if (prev.end !== w.start || prev.endPhase !== w.startPhase)
      errors.push(`${w.n}: continuity break (prev ends ${prev.end}/${prev.endPhase}, starts ${w.start}/${w.startPhase})`);
    if (w.waxing && OPPOSITE[w.start] !== w.end)
      errors.push(`${w.n}: waxing pair ${w.start}\u2192${w.end} is not an opposition`);
  });
  if (errors.length) {
    // eslint-disable-next-line no-console
    console.error("[chaperoneCanon] INVARIANT VIOLATION:\n" + errors.join("\n"));
  }
}
