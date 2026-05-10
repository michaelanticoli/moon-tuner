/**
 * useTodayData — Single hook that aggregates everything the Today page needs.
 *
 * Returns a rich, widget-ready data structure covering:
 * - Current directive and emotional weather
 * - Lunar state (phase, sign, illumination)
 * - Timing posture (favorable/avoid guidance)
 * - Reflection prompt (journaling seed question)
 * - Ritual suggestion (optional daily practice)
 * - Ambient theme (gradient palette key, accent color)
 *
 * All data is derived from the current live lunar state.
 * The structure is intentionally serializable for PWA widget use.
 */

import { useMemo } from "react";
import { useMoonPhase } from "@/hooks/useMoonPhase";

// ─── Directive data (mirrors TodaysDirective for consistency) ────────────────

export type DirectiveState =
  | "Push" | "Hold" | "Reflect" | "Release"
  | "Reconnect" | "Create" | "Recover";

export interface DirectivePayload {
  state: DirectiveState;
  weather: string;
  recommendation: string;
  guidance: string;
  tone: string;
}

const PHASE_DIRECTIVE: Record<string, DirectivePayload> = {
  "New Moon": {
    state: "Reflect",
    weather: "Quiet · Inward · Slow",
    recommendation:
      "Sit with what you want before you speak it. Journal for ten minutes before opening your phone.",
    guidance:
      "Begin nothing visible. The seed is being chosen in darkness; let the choice be honest.",
    tone: "Listen inward before you act outward.",
  },
  "Waxing Crescent": {
    state: "Create",
    weather: "Tender momentum",
    recommendation:
      "Start one thing you've been circling. Small, scrappy, undone — that's how beginnings work.",
    guidance:
      "Make the first small thing. Don't show it yet. Trust the rough draft of your own direction.",
    tone: "Make something small and unfinished.",
  },
  "First Quarter": {
    state: "Push",
    weather: "Tension into traction",
    recommendation:
      "Make the decision you've been deferring. Commit to one direction and move.",
    guidance:
      "The friction is the function. Decide. Move. The wall isn't a stop sign — it's an instruction.",
    tone: "Move now. Resistance is the path.",
  },
  "Waxing Gibbous": {
    state: "Hold",
    weather: "Almost · Refining · Patient",
    recommendation:
      "Resist the urge to launch. Read it once more. Ask: is this the best version you can offer?",
    guidance:
      "Don't release it yet. The work is asking for one more honest pass before it meets the world.",
    tone: "Steady. Impatience is the only obstacle.",
  },
  "Full Moon": {
    state: "Release",
    weather: "Bright · Exposed · Whole",
    recommendation:
      "Name what you're letting go. Say it aloud or write it down and burn it.",
    guidance:
      "Whatever wants to leave you — let it. Clarity arrives by subtraction, not by holding tighter.",
    tone: "Loosen your grip on what is already leaving.",
  },
  "Waning Gibbous": {
    state: "Reconnect",
    weather: "Soft · Generous · Returning",
    recommendation:
      "Reach out to someone. Share something true. Generosity is the medicine of this phase.",
    guidance:
      "Share what worked. Reach toward someone you've been quietly missing. Wisdom wants distribution.",
    tone: "Reach toward people, signal, and softness.",
  },
  "Last Quarter": {
    state: "Release",
    weather: "Editing · Composting · Honest",
    recommendation:
      "Close three open loops today. Archive, finish, or consciously abandon each one.",
    guidance:
      "Close the open loops. The energy you spend on unfinished things is the energy you owe the next cycle.",
    tone: "Let go of what you've been half-carrying.",
  },
  "Waning Crescent": {
    state: "Recover",
    weather: "Low · Dreaming · Restorative",
    recommendation:
      "Do less than you think you should. Protect sleep. Let the body lead.",
    guidance:
      "Rest is not a reward you earn. It's the soil the next phase grows from. Let yourself disappear a little.",
    tone: "Restore. Permission granted.",
  },
};

// ─── Timing posture ───────────────────────────────────────────────────────────

export interface TimingPosture {
  label: string;
  quality: string;
  favorable: string[];
  avoid: string[];
}

const PHASE_TIMING: Record<string, TimingPosture> = {
  "New Moon": {
    label: "Receptive",
    quality: "Beginnings welcome. Visibility is premature.",
    favorable: ["inner work", "journaling", "intention-setting", "rest"],
    avoid: ["public launches", "big pitches", "confrontational conversations"],
  },
  "Waxing Crescent": {
    label: "Generative",
    quality: "Initiating. Momentum builds from small, deliberate acts.",
    favorable: ["starting creative work", "first conversations", "planting seeds"],
    avoid: ["perfectionism", "over-planning", "waiting for readiness"],
  },
  "First Quarter": {
    label: "Active",
    quality: "Decisive. Resistance transforms into movement here.",
    favorable: ["hard decisions", "commitments", "forward movement", "confronting obstacles"],
    avoid: ["indecision", "deferral", "excessive refinement"],
  },
  "Waxing Gibbous": {
    label: "Refining",
    quality: "Almost-there. The work wants one more honest pass.",
    favorable: ["editing", "refinement", "final preparation", "quality review"],
    avoid: ["premature launches", "impatience", "skipping final checks"],
  },
  "Full Moon": {
    label: "Culminating",
    quality: "High visibility. What you hold becomes clear to others.",
    favorable: ["releasing", "celebrating", "sharing finished work", "completion"],
    avoid: ["starting new things", "hiding", "suppressing emotion"],
  },
  "Waning Gibbous": {
    label: "Disseminating",
    quality: "Generous. Share what you've learned; wisdom amplifies outward.",
    favorable: ["teaching", "sharing", "collaboration", "reconnecting"],
    avoid: ["hoarding insights", "isolation", "withholding feedback"],
  },
  "Last Quarter": {
    label: "Releasing",
    quality: "Editing mode. What survives this phase deserves to survive.",
    favorable: ["archiving", "decluttering", "completing stalled projects", "honest evaluation"],
    avoid: ["starting new commitments", "ignoring what isn't working"],
  },
  "Waning Crescent": {
    label: "Surrendering",
    quality: "Fallow. Rest is not optional — it's preparation.",
    favorable: ["sleep", "gentle movement", "dreaming", "quiet reflection"],
    avoid: ["new projects", "high-output demands", "social performance"],
  },
};

// ─── Reflection prompts ───────────────────────────────────────────────────────

const PHASE_REFLECTION: Record<string, string> = {
  "New Moon":
    "What honest desire have you been reluctant to claim? What would it mean to allow it?",
  "Waxing Crescent":
    "What have you started that wants your full attention — not your perfect attention?",
  "First Quarter":
    "Where are you waiting for permission you could simply give yourself?",
  "Waxing Gibbous":
    "What would you do differently if you trusted the process completely?",
  "Full Moon":
    "What are you carrying that belongs to a past version of you?",
  "Waning Gibbous":
    "What have you learned in this cycle that you haven't shared yet?",
  "Last Quarter":
    "Which obligations are truly yours — and which did you inherit without choosing them?",
  "Waning Crescent":
    "What does your body need that your mind keeps overriding?",
};

// ─── Ritual suggestions ───────────────────────────────────────────────────────

export interface RitualSuggestion {
  title: string;
  duration: string;
  steps: string[];
}

const PHASE_RITUAL: Record<string, RitualSuggestion> = {
  "New Moon": {
    title: "Seed Setting",
    duration: "10 minutes",
    steps: [
      "Write three honest desires on paper. Not aspirations — honest wants.",
      "Don't share them yet. Let them exist privately.",
      "Place the paper somewhere intentional: under a candle, in a drawer, beneath something heavy.",
    ],
  },
  "Waxing Crescent": {
    title: "First Draft",
    duration: "10 minutes",
    steps: [
      "Choose one thing you've been postponing.",
      "Begin it. Give it exactly ten minutes — no pressure to finish.",
      "When time ends, close it and walk away. The beginning is enough.",
    ],
  },
  "First Quarter": {
    title: "The Decision",
    duration: "5 minutes",
    steps: [
      "Name the decision you've been avoiding. Write it at the top of a page.",
      "Write your choice clearly below it.",
      "Sign it with your full name. Fold the page. The decision is made.",
    ],
  },
  "Waxing Gibbous": {
    title: "Honest Review",
    duration: "15 minutes",
    steps: [
      "Bring out something you've been working on.",
      "Read it, look at it, or review it — without changing anything.",
      "Ask: what would make this more true? Note it. Then set it down.",
    ],
  },
  "Full Moon": {
    title: "Release",
    duration: "10 minutes",
    steps: [
      "Write one thing that has been weighing on you — a belief, a relationship, a pattern.",
      "Acknowledge what it gave you before releasing it.",
      "Burn the paper, tear it, or place it outside. Speak: 'I release what no longer serves.'",
    ],
  },
  "Waning Gibbous": {
    title: "The Reach",
    duration: "5 minutes",
    steps: [
      "Think of one person you've been meaning to contact.",
      "Send them a brief, genuine message — no agenda, just presence.",
      "Receive whatever comes back without expectation.",
    ],
  },
  "Last Quarter": {
    title: "Three Closings",
    duration: "20 minutes",
    steps: [
      "List every open item weighing on your mind.",
      "Choose three. Archive, complete, or consciously abandon each one.",
      "Feel the energy that returns when unfinished things find their ending.",
    ],
  },
  "Waning Crescent": {
    title: "Deliberate Rest",
    duration: "Ongoing",
    steps: [
      "Sleep one hour earlier than usual tonight.",
      "Remove one obligation from tomorrow if possible.",
      "Let yourself be unreachable for one hour today.",
    ],
  },
};

// ─── Ambient theme palette ────────────────────────────────────────────────────

/** Ambient gradient and accent color keyed by phase. */
export interface AmbientTheme {
  /** CSS gradient string for page background */
  gradient: string;
  /** HSL color value for the accent glow/orb */
  accentHsl: string;
  /** CSS color string for card border highlight */
  cardAccent: string;
}

const PHASE_AMBIENT: Record<string, AmbientTheme> = {
  "New Moon": {
    gradient:
      "radial-gradient(ellipse 80% 60% at 20% -10%, hsl(262 28% 10%) 0%, transparent 65%), " +
      "radial-gradient(ellipse 60% 40% at 85% 110%, hsl(250 20% 7%) 0%, transparent 60%), " +
      "hsl(240 18% 4%)",
    accentHsl: "262 28% 55%",
    cardAccent: "hsl(262 28% 55% / 0.18)",
  },
  "Waxing Crescent": {
    gradient:
      "radial-gradient(ellipse 70% 50% at 30% -5%, hsl(230 30% 11%) 0%, transparent 60%), " +
      "radial-gradient(ellipse 50% 35% at 80% 105%, hsl(220 22% 7%) 0%, transparent 55%), " +
      "hsl(235 18% 4%)",
    accentHsl: "215 45% 58%",
    cardAccent: "hsl(215 45% 58% / 0.16)",
  },
  "First Quarter": {
    gradient:
      "radial-gradient(ellipse 75% 55% at 55% -8%, hsl(190 35% 10%) 0%, transparent 62%), " +
      "radial-gradient(ellipse 55% 38% at 10% 100%, hsl(220 22% 6%) 0%, transparent 55%), " +
      "hsl(230 16% 4%)",
    accentHsl: "168 60% 48%",
    cardAccent: "hsl(168 60% 48% / 0.18)",
  },
  "Waxing Gibbous": {
    gradient:
      "radial-gradient(ellipse 80% 55% at 65% -5%, hsl(175 30% 10%) 0%, transparent 62%), " +
      "radial-gradient(ellipse 55% 40% at 5% 95%, hsl(38 25% 8%) 0%, transparent 55%), " +
      "hsl(225 14% 4%)",
    accentHsl: "168 55% 52%",
    cardAccent: "hsl(168 55% 52% / 0.16)",
  },
  "Full Moon": {
    gradient:
      "radial-gradient(ellipse 85% 60% at 75% -5%, hsl(42 40% 12%) 0%, transparent 65%), " +
      "radial-gradient(ellipse 60% 42% at 15% 105%, hsl(38 25% 7%) 0%, transparent 60%), " +
      "hsl(235 10% 4%)",
    accentHsl: "42 55% 62%",
    cardAccent: "hsl(42 55% 62% / 0.20)",
  },
  "Waning Gibbous": {
    gradient:
      "radial-gradient(ellipse 75% 52% at 65% -8%, hsl(30 35% 10%) 0%, transparent 62%), " +
      "radial-gradient(ellipse 50% 35% at 10% 100%, hsl(240 15% 6%) 0%, transparent 55%), " +
      "hsl(235 12% 4%)",
    accentHsl: "30 55% 55%",
    cardAccent: "hsl(30 55% 55% / 0.18)",
  },
  "Last Quarter": {
    gradient:
      "radial-gradient(ellipse 70% 50% at 30% -5%, hsl(15 30% 9%) 0%, transparent 60%), " +
      "radial-gradient(ellipse 55% 38% at 80% 105%, hsl(230 15% 6%) 0%, transparent 55%), " +
      "hsl(235 12% 4%)",
    accentHsl: "15 45% 50%",
    cardAccent: "hsl(15 45% 50% / 0.16)",
  },
  "Waning Crescent": {
    gradient:
      "radial-gradient(ellipse 70% 50% at 20% -5%, hsl(270 22% 9%) 0%, transparent 60%), " +
      "radial-gradient(ellipse 50% 35% at 85% 100%, hsl(240 18% 6%) 0%, transparent 55%), " +
      "hsl(240 16% 4%)",
    accentHsl: "270 22% 55%",
    cardAccent: "hsl(270 22% 55% / 0.14)",
  },
};

// ─── Assembled Today data structure ──────────────────────────────────────────

export interface TodayData {
  /** Formatted date string, e.g. "Saturday, May 9" */
  date: string;
  /** Directive (state + emotional weather + guidance) */
  directive: DirectivePayload;
  /** Lunar state */
  lunar: {
    phaseName: string;
    sign: string;
    illuminationPct: number;
    isWaxing: boolean;
    daysInPhase: number;
    nextNewMoon: Date;
    nextFullMoon: Date;
    hoursInSign: number;
    astrological: {
      energy: string;
      theme: string;
      quality: string;
      frequency: string;
      frequencyHz: number;
    };
  };
  /** Timing posture for today */
  timing: TimingPosture;
  /** Reflection prompt */
  reflection: string;
  /** Optional ritual */
  ritual: RitualSuggestion;
  /** Ambient theme for visual layer */
  ambient: AmbientTheme;
  /**
   * Widget-ready snapshot — serializable JSON safe for
   * PWA widget, lock screen, or notification rendering.
   */
  widget: {
    directiveState: DirectiveState;
    directiveGuidance: string;
    weather: string;
    phase: string;
    sign: string;
    illuminationPct: number;
    reflectionPrompt: string;
    date: string;
  };
}

/** Aggregated hook for the Today experience. */
export function useTodayData(): TodayData {
  const moon = useMoonPhase();

  return useMemo(() => {
    const phase = moon.astronomical.phaseName;
    const sign = moon.astronomical.moonSign;
    const illuminationPct = Math.round(moon.astronomical.illumination * 100);

    const directive =
      PHASE_DIRECTIVE[phase] ?? PHASE_DIRECTIVE["New Moon"];
    const timing = PHASE_TIMING[phase] ?? PHASE_TIMING["New Moon"];
    const reflection = PHASE_REFLECTION[phase] ?? PHASE_REFLECTION["New Moon"];
    const ritual = PHASE_RITUAL[phase] ?? PHASE_RITUAL["New Moon"];
    const ambient = PHASE_AMBIENT[phase] ?? PHASE_AMBIENT["New Moon"];

    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return {
      date,
      directive,
      lunar: {
        phaseName: phase,
        sign,
        illuminationPct,
        isWaxing: moon.astronomical.isWaxing,
        daysInPhase: Math.round(moon.astronomical.age),
        nextNewMoon: moon.astronomical.nextNewMoon,
        nextFullMoon: moon.astronomical.nextFullMoon,
        hoursInSign: Math.round(moon.astronomical.hoursInSign),
        astrological: moon.astrological,
      },
      timing,
      reflection,
      ritual,
      ambient,
      widget: {
        directiveState: directive.state,
        directiveGuidance: directive.guidance,
        weather: directive.weather,
        phase,
        sign,
        illuminationPct,
        reflectionPrompt: reflection,
        date,
      },
    };
  }, [moon]);
}
