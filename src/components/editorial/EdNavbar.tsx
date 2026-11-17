import { useEffect, useState } from "react";
import type { LiveMoon } from "./useLiveMoon";

/**
 * Fixed, minimal bar. Transparent at the top of the page, solid white with a
 * hairline once the reader scrolls. The centre carries the live Moon.
 */
export function EdNavbar({ moon }: { moon: LiveMoon | null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-black bg-white" : "border-transparent bg-white/0",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid h-[var(--ed-nav-h)] max-w-[1440px] grid-cols-2 items-center px-5 sm:px-8 md:grid-cols-3 lg:px-12"
      >
        <a href="#top" className="ed-label justify-self-start text-black">
          Moontuner
        </a>
        <p className="ed-label hidden justify-self-center text-black/50 md:block">
          {moon ? (
            <>
              <span className="sr-only">The Moon now: </span>
              {moon.phaseName} · {moon.signName}
            </>
          ) : (
            <span aria-hidden="true">Est. MMXIV</span>
          )}
        </p>
        <a href="#index" className="ed-label ed-link justify-self-end text-black">
          Index
        </a>
      </nav>
    </header>
  );
}
