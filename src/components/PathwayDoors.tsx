import { Link } from "react-router-dom";
import { DOORS, type DoorKey } from "@/data/siteNav";

/**
 * The four doors into Moontuner — Phasecraft, Lunar Chaperone, the
 * Astro-Harmonic Symphony, and the Lunar Map & Cazimi reports.
 *
 * `variant="grid"`  — full cards with secondary links (homepage, Start Here, 404).
 * `variant="strip"` — compact "go deeper" row for the bottom of a tool page;
 *                     pass `exclude` to leave out the door the visitor is in.
 *
 * Content comes from DOORS in src/data/siteNav.ts. Colours use the dusk tokens
 * (defined on :root) so the component reads the same on dusk and themed pages.
 */

interface PathwayDoorsProps {
  variant?: "grid" | "strip";
  exclude?: DoorKey;
  /** Optional heading block rendered above the doors. */
  eyebrow?: string;
  heading?: React.ReactNode;
  intro?: string;
  /** Heading level for each door's title (keeps page outlines correct). */
  titleAs?: "h2" | "h3";
  className?: string;
}

const arrow = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function PathwayDoors({
  variant = "grid",
  exclude,
  eyebrow,
  heading,
  intro,
  titleAs = "h3",
  className = "",
}: PathwayDoorsProps) {
  const doors = DOORS.filter((d) => d.key !== exclude);
  const Title = titleAs;

  const header = (eyebrow || heading || intro) && (
    <div className={variant === "grid" ? "max-w-2xl mb-10 lg:mb-14" : "mb-6"}>
      {eyebrow && (
        <p className="dusk-eyebrow mb-4">
          <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2
          className={
            variant === "grid"
              ? "dusk-serif text-[clamp(1.9rem,4vw,3rem)] dusk-ivory leading-[1.1]"
              : "dusk-serif text-2xl md:text-3xl dusk-ivory leading-tight"
          }
        >
          {heading}
        </h2>
      )}
      {intro && (
        <p className="mt-4 text-[1rem] leading-[1.7]" style={{ color: "hsl(var(--dusk-ivory) / 0.66)" }}>
          {intro}
        </p>
      )}
    </div>
  );

  if (variant === "strip") {
    return (
      <section className={className} aria-label={typeof heading === "string" ? heading : "Go deeper"}>
        {header}
        <ul className={`grid gap-3 sm:grid-cols-2 ${doors.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {doors.map((d) => (
            <li key={d.key}>
              <Link
                to={d.href}
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-[hsl(var(--dusk-ivory)/0.1)] p-5 transition-colors duration-300 hover:border-[hsl(var(--dusk-gold)/0.55)] hover:bg-[hsl(var(--dusk-ivory)/0.03)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[hsl(var(--dusk-gold))]"
              >
                <span>
                  <span className="dusk-eyebrow block mb-2" style={{ color: "hsl(var(--dusk-gold))" }}>
                    {d.eyebrow}
                  </span>
                  <span className="dusk-serif block text-[1.35rem] dusk-ivory leading-tight">{d.title}</span>
                </span>
                <span className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] dusk-silver group-hover:text-[hsl(var(--dusk-ivory))]">
                  {d.cta}
                  {arrow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div className={className}>
      {header}
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {doors.map((d, i) => (
          <li
            key={d.key}
            className="group relative flex flex-col rounded-[1.25rem] border border-[hsl(var(--dusk-ivory)/0.09)] p-6 lg:p-7 transition-colors duration-300 hover:border-[hsl(var(--dusk-gold)/0.5)] focus-within:border-[hsl(var(--dusk-gold)/0.5)]"
            style={{
              background: "linear-gradient(180deg, hsl(var(--dusk-ivory) / 0.03) 0%, hsl(var(--dusk-ivory) / 0.008) 100%)",
            }}
          >
            <div className="flex items-baseline justify-between mb-8">
              <span className="dusk-eyebrow" style={{ color: "hsl(var(--dusk-gold))" }}>
                {d.eyebrow}
              </span>
              <span className="dusk-serif text-sm dusk-mute" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <Title className="dusk-serif text-[1.65rem] lg:text-[1.8rem] dusk-ivory leading-[1.1] mb-3">{d.title}</Title>
            <p className="text-[0.95rem] leading-[1.65] mb-7" style={{ color: "hsl(var(--dusk-ivory) / 0.64)" }}>
              {d.line}
            </p>

            <div className="mt-auto">
              {/* Primary link stretches over the whole card so the card is one big tap target. */}
              <Link
                to={d.href}
                className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.12em] dusk-ivory transition-colors group-hover:text-[hsl(var(--dusk-gold))] after:absolute after:inset-0 after:rounded-[1.25rem] after:content-[''] focus-visible:outline-none"
              >
                {d.cta}
                {arrow}
              </Link>

              <ul className="relative z-10 mt-5 pt-4 border-t flex flex-col gap-2" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
                {d.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-[0.85rem] dusk-silver hover:text-[hsl(var(--dusk-ivory))] transition-colors underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
