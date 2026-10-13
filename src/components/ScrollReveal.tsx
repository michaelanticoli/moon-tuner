import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const OFFSET: Record<NonNullable<ScrollRevealProps["direction"]>, [number, number]> = {
  up: [0, 18],
  down: [0, -18],
  left: [18, 0],
  right: [-18, 0],
};

const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/**
 * Fade + 18px slide when the block first enters the viewport (100px inset),
 * once. Same timing as the previous framer-motion version (0.6s, same easing,
 * same delay prop) but driven by IntersectionObserver + a CSS transition, so
 * pages that use it no longer pull framer-motion into their first load.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "-100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [x, y] = OFFSET[direction];
  const style: CSSProperties = visible
    ? {
        opacity: 1,
        transform: "none",
        transition: `opacity 0.6s ${EASE} ${delay}s, transform 0.6s ${EASE} ${delay}s`,
      }
    : { opacity: 0, transform: `translate3d(${x}px, ${y}px, 0)` };

  return (
    <div ref={ref} className={`scroll-reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
