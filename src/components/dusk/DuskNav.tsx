import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Cinematic Dusk navigation — minimal, editorial, premium.
 * IA per redesign brief: Today · Harmonic Profile · Reports · Journal · About
 * Folds existing routes into the new structure.
 */
const LINKS = [
  { label: "Today", href: "/lunar-cipher" },
  { label: "Profile", href: "/lunar-reports" },
  { label: "Printer", href: "/the-moon" },
  { label: "Journal", href: "https://moontuner.ghost.io", external: true },
  { label: "About", href: "/manifesto" },
];

export function DuskNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[hsl(var(--dusk-black))]/75 border-b border-[hsl(var(--dusk-ivory))]/8"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ fontFamily: "var(--font-ui)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-[1400px] px-6 lg:px-12 h-[68px] flex items-center justify-between"
      >
        <Link
          to="/"
          aria-label="Moontuner"
          className="dusk-serif text-[1.35rem] dusk-ivory hover:dusk-gold transition-colors"
        >
          Moontuner
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.external ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.78rem] tracking-[0.14em] uppercase dusk-silver hover:dusk-ivory transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  to={l.href}
                  className="text-[0.78rem] tracking-[0.14em] uppercase dusk-silver hover:dusk-ivory transition-colors"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link to="/lunar-reports" className="dusk-btn dusk-btn-primary text-[0.72rem]">
            Generate Profile
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-expanded={mobileOpen}
          aria-controls="dusk-mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-px bg-[hsl(var(--dusk-ivory))] transition-transform duration-300 ${
              mobileOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-[hsl(var(--dusk-ivory))] transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-px bg-[hsl(var(--dusk-ivory))] transition-transform duration-300 ${
              mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="dusk-mobile-menu"
        className={`md:hidden fixed inset-0 top-[68px] bg-[hsl(var(--dusk-black))] transition-opacity duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col px-6 py-10 gap-8">
          {LINKS.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dusk-serif text-3xl dusk-ivory"
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.href} className="dusk-serif text-3xl dusk-ivory">
                {l.label}
              </Link>
            )
          )}
          <div className="dusk-hairline mt-2" />
          <Link to="/lunar-reports" className="dusk-btn dusk-btn-primary self-start">
            Generate Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
