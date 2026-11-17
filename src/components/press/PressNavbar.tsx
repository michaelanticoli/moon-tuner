import { useEffect, useState } from "react";
import { PRESS_EST } from "./pressData";

/**
 * Fixed, minimal bar. Transparent at the very top of the page, then a
 * near-opaque white ground with a hairline rule once the reader scrolls,
 * so it stays legible over both the white and the black sections.
 */
export function PressNavbar() {
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        "border-b",
        scrolled
          ? "bg-white border-black"
          : "bg-white/0 border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid h-[var(--press-nav-h)] max-w-[1440px] grid-cols-2 items-center px-5 sm:px-8 md:grid-cols-3 lg:px-12"
      >
        <a href="#top" className="press-label justify-self-start text-black">
          Moontuner
        </a>
        <span className="press-label hidden justify-self-center text-black/50 md:block" aria-hidden="true">
          {PRESS_EST}
        </span>
        <a href="#index" className="press-label press-link justify-self-end text-black">
          Index
        </a>
      </nav>
    </header>
  );
}
