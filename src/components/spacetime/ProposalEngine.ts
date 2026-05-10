/**
 * Spacetime Printer — Proposal Engine
 *
 * Pure logic module. No external dependencies.
 * Transforms user input into a structured, psychologically grounded proposal.
 *
 * Philosophy: intention-setting as collaborative participation with uncertainty.
 * Language register: reflective, probabilistic, honest. Not magical.
 */

export type TimingPosture = "advance" | "hold" | "observe" | "clarify";

export interface ProposalInput {
  intention: string;
  uncertainty: string;
  resistance: string;
  direction: string;
  emotionalState: string;
}

export interface ProposalOutput {
  id: string;
  timestamp: string;
  submittedAt: string; // ISO string for serialization
  input: ProposalInput;
  summary: string;
  contradiction: string;
  timingPosture: TimingPosture;
  timingRationale: string;
  recommendation: string;
  nextAction: string;
}

const STORAGE_KEY = "mt_spacetime_proposals_v1";

// ─── ID generation ─────────────────────────────────────────────────────────

function generateId(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SPT-${datePart}-${randPart}`;
}

// ─── Simple hash for template variant selection ─────────────────────────────

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i);
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: string): T {
  return arr[simpleHash(seed) % arr.length];
}

// ─── Timing posture derivation ──────────────────────────────────────────────

const HOLD_TERMS = [
  "anxious", "anxiety", "scared", "fear", "overwhelm", "stuck", "tired",
  "exhaust", "deplet", "dread", "panic", "paralyz", "block", "frozen",
  "hopeless", "despair", "resist", "avoid",
];

const ADVANCE_TERMS = [
  "ready", "excit", "clear", "certain", "energiz", "motivat", "confident",
  "hopeful", "determin", "focus", "eager", "open", "grounded", "settled",
  "committed", "willing",
];

const CLARIFY_TERMS = [
  "confused", "unclear", "unsure", "don't know", "foggy", "muddle",
  "lost", "not sure", "ambiguous", "vague", "undefined",
];

function deriveTimingPosture(input: ProposalInput): TimingPosture {
  const emotional = input.emotionalState.toLowerCase();
  const resistance = input.resistance.toLowerCase();

  const hasHold = HOLD_TERMS.some((t) => emotional.includes(t));
  const hasAdvance = ADVANCE_TERMS.some((t) => emotional.includes(t));
  const hasClarify = CLARIFY_TERMS.some(
    (t) => emotional.includes(t) || resistance.includes(t)
  );
  const resistanceIsStrong =
    input.resistance.trim().length > 80 ||
    HOLD_TERMS.some((t) => resistance.includes(t));

  if (hasClarify && !hasAdvance) return "clarify";
  if (hasHold && resistanceIsStrong) return "hold";
  if (hasHold && !hasAdvance) return "hold";
  if (hasAdvance && !hasHold) return "advance";
  return "observe";
}

// ─── Analysis generators ────────────────────────────────────────────────────

function generateSummary(input: ProposalInput, seed: string): string {
  const { intention, uncertainty, direction } = input;

  const variants = [
    `A proposal has been entered. The intention — ${intention} — is not a command. It is a submission into conditions you do not fully control, which is the correct way to begin. You have named ${uncertainty} as the active unknown. This is the honest part: what you are moving toward without assurance of outcome.`,

    `What you are proposing is movement toward ${direction}. The intention (${intention}) has been recorded alongside its acknowledged unknowns. ${uncertainty} is not a problem to resolve before beginning — it is the context in which this proposal lives. Proceed accordingly.`,

    `This proposal identifies ${direction} as the intended vector. You have named your uncertainty and your resistance. The system treats these as data, not defects. A proposal submitted with acknowledged unknowns is more durable than one that pretends to certainty.`,

    `The direction — ${direction} — has been stated. The intention behind it (${intention}) is in the record. What remains open is ${uncertainty}. That openness is not a gap to fill before this proposal can move forward. It is the proposal's most honest feature.`,
  ];

  return pick(variants, seed);
}

function generateContradiction(input: ProposalInput, seed: string): string {
  const { intention, resistance, direction } = input;

  const variants = [
    `There is a recognizable tension here: you intend toward ${intention}, and yet ${resistance} is present. This is not a failure of commitment. Resistance and intention pointing in opposite directions often means you are proposing something that matters. The resistance may be encoding information about what ${direction} would actually cost — and that information is useful, not just inconvenient.`,

    `The resistance you have named — ${resistance} — and the direction you are proposing are in productive conflict. Contradictions like this do not indicate a bad proposal. They indicate a real one. The question worth examining: is the resistance protecting something you still need, or has it become a pattern running on outdated information?`,

    `${resistance} and the intention to ${intention} pull in opposite directions. This is expected. Most meaningful proposals contain this tension. The work is not to eliminate one side of the contradiction but to understand what each is trying to protect. ${direction} may need to accommodate both — or it may become clearer by holding the tension long enough without forcing resolution.`,

    `There is friction between what you are proposing and what is working against it. This friction is not an error in the proposal — it is a signal about the stakes. The resistance (${resistance}) often encodes the part of the situation that deserves the most attention. Do not bypass it. Read it.`,
  ];

  return pick(variants, seed + "c");
}

const TIMING_RATIONALE: Record<TimingPosture, (input: ProposalInput, seed: string) => string> = {
  advance: (input, seed) => {
    const variants = [
      `Your stated emotional state (${input.emotionalState}) and the shape of the proposal suggest conditions favor movement. This is not certainty — it is a probabilistic assessment. The timing posture is: advance with measured, observable steps. Use each step to update the proposal rather than commit to the full plan.`,
      `The resistance noted is present but not dominant. Your emotional state (${input.emotionalState}) carries forward momentum. Advance. Use small, reversible actions as the testing mechanism — each one teaches you something the plan cannot.`,
    ];
    return pick(variants, seed + "ta");
  },
  hold: (input, seed) => {
    const variants = [
      `Your emotional state (${input.emotionalState}) and the weight of the resistance suggest this is not the moment to advance. The timing posture is hold — not retreat, not abandonment. Holding is an active stance: present, watching, not forcing. The proposal remains valid. The timing does not.`,
      `Given ${input.emotionalState} and the resistance pattern, proceeding now risks acting from a depleted position. Proposals submitted from overwhelmed states tend to require correction. Allow conditions to stabilize before the next movement. This is not waiting — it is preparation.`,
    ];
    return pick(variants, seed + "th");
  },
  observe: (input, seed) => {
    const variants = [
      `No dominant signal in either direction. The timing posture is observe — which means staying present with the proposal without forcing it toward resolution. Observation at this stage often produces better information than premature action.`,
      `The proposal sits in genuine ambiguity. Neither clear resistance nor clear readiness dominates. The useful posture is observation: watch how the intention behaves in the presence of the uncertainty and resistance you have named. Something will clarify. Do not rush it.`,
    ];
    return pick(variants, seed + "to");
  },
  clarify: (input, seed) => {
    const variants = [
      `Before this proposal can be effectively advanced or held, it needs clarification. The stated uncertainty (${input.uncertainty}) and resistance (${input.resistance}) are too interconnected to navigate without first understanding their relationship. Clarify before proceeding.`,
      `The open questions in this proposal are load-bearing. What specifically does ${input.uncertainty} mean in practice? What would it look like if it were resolved? Answer that before deciding whether to advance or hold.`,
    ];
    return pick(variants, seed + "tc");
  },
};

function generateRecommendation(input: ProposalInput, posture: TimingPosture, seed: string): string {
  const { uncertainty, direction } = input;

  const variants: Record<TimingPosture, string[]> = {
    advance: [
      `The most useful stance for this proposal is expansive attention — staying curious about ${uncertainty} rather than trying to resolve it prematurely. Small, observable actions toward ${direction} will generate better information than planning from a distance.`,
      `Work with what is already in motion. This proposal does not require a complete plan — it requires one clear next step and the willingness to update based on what you learn. Keep it permeable to revision.`,
    ],
    hold: [
      `The recommended posture is patient non-action. This is not passivity — it is the deliberate refusal to force movement before conditions support it. Use this time to watch the resistance more carefully. It may be the most useful part of the proposal.`,
      `Rest the proposal without abandoning it. Allow ${uncertainty} to move without intervention. Proposals that survive a held period tend to be stronger for it.`,
    ],
    observe: [
      `Stay present with ${direction} as a direction, not a destination. This allows movement without overcommitment. Notice what the proposal attracts and what it repels. That data belongs in the next version.`,
      `The recommended posture is patient engagement. This proposal is not ready to be forced into a timeline. Allow it space to develop while keeping ${direction} as the committed vector.`,
    ],
    clarify: [
      `Engage the uncertainty directly. ${uncertainty} may not resolve through waiting. It may resolve through deliberate, specific contact with the edges of the proposal.`,
      `Clarification is a form of action. Write down what would need to change for this proposal to feel ready to advance. Not a requirement — just a statement of what would shift your assessment.`,
    ],
  };

  return pick(variants[posture], seed + "r");
}

function generateNextAction(input: ProposalInput, posture: TimingPosture, seed: string): string {
  const { intention, uncertainty, resistance, direction } = input;

  const byPosture: Record<TimingPosture, string[]> = {
    advance: [
      `Write one sentence describing what ${direction} would look like in practice — not in theory. Not a vision. A specific scene.`,
      `Name one action small enough that it does not trigger the stated resistance (${resistance}) but still moves toward ${intention}. Make it completable today.`,
      `Identify the next 2% of movement toward ${direction}. Not the plan. Just the next 2%.`,
    ],
    hold: [
      `Identify one belief embedded in ${resistance}. Ask whether that belief is still accurate, or whether it is running on old information.`,
      `Do not act on this proposal today. Instead, write down what you notice about ${uncertainty} over the next 48 hours without trying to resolve it.`,
    ],
    observe: [
      `Name one thing you could do in the next 24 hours that would test one assumption in this proposal without committing to the full direction.`,
      `Write down what ${uncertainty} would need to become for this proposal to feel ready to advance. Not a requirement — just an honest statement.`,
    ],
    clarify: [
      `Write down what ${uncertainty} means in practical terms — not emotional terms. What would it actually look like if it were resolved?`,
      `Identify the single most important unknown in this proposal. Not all of them. The most important one. Spend 20 minutes with just that one.`,
      `Ask: if ${resistance} were completely absent, what would the next step be? Write it down. That answer is information.`,
    ],
  };

  return pick(byPosture[posture], seed + "n");
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function generateProposal(input: ProposalInput): ProposalOutput {
  const id = generateId();
  const now = new Date();
  const seed = input.intention + input.direction;
  const posture = deriveTimingPosture(input);

  return {
    id,
    timestamp: now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    submittedAt: now.toISOString(),
    input,
    summary: generateSummary(input, seed),
    contradiction: generateContradiction(input, seed),
    timingPosture: posture,
    timingRationale: TIMING_RATIONALE[posture](input, seed),
    recommendation: generateRecommendation(input, posture, seed),
    nextAction: generateNextAction(input, posture, seed),
  };
}

export function saveProposal(proposal: ProposalOutput): void {
  try {
    const existing = loadProposals();
    const updated = [proposal, ...existing].slice(0, 50); // keep latest 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage unavailable — fail silently
  }
}

export function loadProposals(): ProposalOutput[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProposalOutput[]) : [];
  } catch {
    return [];
  }
}

export function clearProposals(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
