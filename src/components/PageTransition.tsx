import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page-enter fade (opacity 0 → 1, 0.6s, ease [0.4, 0, 0.2, 1]).
 *
 * Pure CSS (see `.page-enter` in index.css) so the ~120 KB framer-motion
 * bundle stays off the critical path of every page that uses this wrapper.
 * Visual parity with the previous `pageEnter` variant; there was no
 * AnimatePresence around the routes, so the exit variant never ran.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return <div className="page-enter">{children}</div>;
}
