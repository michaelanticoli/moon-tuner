/**
 * Moontuner Motion Standards
 *
 * Restrained, emotionally calibrated animation vocabulary.
 * All values favor slow breathing over snappy transitions.
 *
 * Principles:
 * - Timing respects attention; nothing moves faster than thought
 * - Easing curves arc toward the end, not the beginning
 * - Directional motion is always subtle (≤ 20px)
 * - Ambient loops breathe at human resting-breath cadence (4-6s)
 */

import type { Variants, Transition } from "framer-motion";

// ─── Transition Presets ───────────────────────────────────────────────────

export const transitions = {
  /** Ultra-slow ambient shift — use for background gradients, glow pulses */
  ambient: {
    duration: 6,
    ease: [0.4, 0, 0.2, 1],
    repeat: Infinity,
    repeatType: "mirror" as const,
  } satisfies Transition,

  /** Slow deliberate reveal — hero elements, page headers */
  slow: {
    duration: 1.1,
    ease: [0.2, 0.8, 0.2, 1],
  } satisfies Transition,

  /** Standard reveal — section content, cards */
  standard: {
    duration: 0.7,
    ease: [0.4, 0, 0.2, 1],
  } satisfies Transition,

  /** Responsive feedback — hover/focus states */
  fast: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  } satisfies Transition,

  /** Spring — for elements that land with a feeling of settling */
  spring: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  } satisfies Transition,

  /** Gentle spring — cards floating into place */
  gentleSpring: {
    type: "spring" as const,
    stiffness: 60,
    damping: 18,
    mass: 1.2,
  } satisfies Transition,
} as const;

// ─── Variant Presets ─────────────────────────────────────────────────────

/** Fade in from invisible to present */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.standard,
  },
};

/** Fade in rising upward — primary reveal for body content */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

/** Fade in drifting down — for labels above headlines */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.standard,
  },
};

/** Slide in from the left — for side panels, nav drawers */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.standard,
  },
};

/** Slide in from the right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.standard,
  },
};

/** Scale and fade — for modals, popovers, card expansions */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.slow,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: transitions.fast,
  },
};

/** Stagger container — wraps lists of animated children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Stagger item — child of staggerContainer */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.standard,
  },
};

/** Slow stagger container — for hero sections with more deliberate reveals */
export const slowStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/** Page enter transition */
export const pageEnter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/** Breathing ambient — for orb/glow elements */
export const breathe: Variants = {
  initial: { opacity: 0.55, scale: 1 },
  animate: {
    opacity: [0.55, 0.72, 0.55],
    scale: [1, 1.015, 1],
    y: [0, -12, 0],
    transition: {
      duration: 18,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

/** Soft pulse — for status indicators, live dots */
export const softPulse: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

/** Card hover lift — subtle elevation on hover */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 20px -4px hsl(0 0% 0% / 0.4)",
    transition: transitions.fast,
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 40px -8px hsl(0 0% 0% / 0.55)",
    transition: transitions.fast,
  },
};

// ─── Scroll Reveal Helpers ────────────────────────────────────────────────

/** Standard viewport detection options for scroll reveal */
export const scrollRevealViewport = {
  once: true,
  amount: 0.15,
} as const;

/** Intersection observer offset — start revealing slightly before in view */
export const scrollRevealMargin = "-80px" as const;
