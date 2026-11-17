import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Reveal on mount instead of on scroll (used above the fold). */
  immediate?: boolean;
  as?: "div" | "li";
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Restrained entrance: a short fade with a small upward drift.
 * Reduced-motion users get the content immediately, with no movement.
 */
export function Reveal({ children, className, delay = 0, immediate = false, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const target = { opacity: 1, y: 0 };
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 14 }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "0px 0px -8% 0px" } })}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
