import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import wordmark from "@/assets/moontuner-wordmark.png";
import { ED_DESCRIPTOR, ED_SUBTITLE } from "./editorialData";
import { Reveal } from "./Reveal";
import type { LiveMoon } from "./useLiveMoon";

/**
 * Opening section: supplied wordmark, the system's name, the 8 × 12 = 96
 * descriptor, and one live line pointing at the signature overhead now.
 */
export function EdHero({ moon }: { moon: LiveMoon | null }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="ed-title"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-[calc(var(--ed-nav-h)+48px)] sm:px-8"
    >
      {/* Centring lives on the wrapper so Framer's scale transform can't override it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(118vw,780px)] w-[min(118vw,780px)] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.svg
          focusable="false"
          viewBox="0 0 200 200"
          className="h-full w-full text-black"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="100" cy="100" r="99.6" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.25" vectorEffect="non-scaling-stroke" />
          <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.25" vectorEffect="non-scaling-stroke" />
        </motion.svg>
      </div>

      <div className="relative flex w-full max-w-[880px] flex-col items-center text-center">
        <Reveal immediate>
          <h1 id="ed-title" className="flex flex-col items-center">
            <img
              src={wordmark}
              alt="Moontuner"
              width={1920}
              height={603}
              decoding="async"
              fetchPriority="high"
              draggable={false}
              className="ed-logo h-auto w-[min(86vw,760px)]"
            />
            <span className="mt-6 block pl-[0.42em] text-[clamp(0.8rem,1.8vw,1.1rem)] font-semibold uppercase tracking-[0.42em] text-black sm:mt-8">
              {ED_SUBTITLE}
            </span>
          </h1>
        </Reveal>

        <Reveal immediate delay={0.25} className="mt-14 sm:mt-20">
          <div className="mx-auto mb-8 h-px w-10 bg-black" aria-hidden="true" />
          <p className="ed-label leading-[2.1] text-black/70">
            {ED_DESCRIPTOR.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>

        {moon && (
          <Reveal immediate delay={0.45} className="mt-12 sm:mt-14">
            <Link to={moon.href} className="ed-label ed-link text-black">
              Overhead now · {moon.phaseName} in {moon.signName} · {moon.signature} / 96
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
