/**
 * useHaptic — Web Vibration API integration.
 *
 * Haptic design philosophy: soft, intentional, grounding.
 * Not gamified reward pulses — more like a breath or a gentle tap.
 *
 * Falls back silently on devices/browsers that don't support vibration.
 */

import { useCallback } from "react";

/** Named haptic patterns calibrated for Moontuner interactions. */
export type HapticPattern =
  | "light"       // barely-there confirmation
  | "soft"        // gentle acknowledgement (card tap, scroll reach)
  | "medium"      // deliberate action (directive accepted)
  | "submission"  // proposal sent — intentional double-tap
  | "ritual"      // ritual completion — ceremonial triple rhythm
  | "milestone"   // timeline milestone — weighted, once
  | "release"     // releasing to The Void — long exhale
  | "transition"  // emotional weather shift — soft flutter;

const PATTERNS: Record<HapticPattern, number | number[]> = {
  light:      8,
  soft:       [6, 10, 6],
  medium:     18,
  submission: [10, 40, 14],
  ritual:     [8, 50, 8, 50, 16],
  milestone:  [24, 60, 24],
  release:    [8, 20, 8, 20, 8, 80, 20],
  transition: [4, 12, 4, 12, 4],
};

export function useHaptic() {
  const vibrate = useCallback((pattern: HapticPattern = "light") => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(PATTERNS[pattern]);
    }
  }, []);

  return { vibrate };
}
