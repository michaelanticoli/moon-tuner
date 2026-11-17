import { Lock } from "lucide-react";
import { PRESS_WORKS } from "./pressData";
import { Reveal } from "./Reveal";

/**
 * Index of Works — a read-only catalogue of proprietary titles.
 * Deliberately non-interactive: no links, previews, or downloads.
 */
export function PressPublications() {
  return (
    <section id="index" aria-labelledby="press-index" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-[calc(var(--press-nav-h)+48px)] sm:px-8 md:pb-36 md:pt-[calc(var(--press-nav-h)+72px)] lg:px-12">
        <Reveal className="grid gap-8 border-b border-black pb-10 md:grid-cols-12 md:items-end md:pb-14">
          <h2
            id="press-index"
            className="press-display tracking-[-0.02em] text-[clamp(2.25rem,6vw,5rem)] md:col-span-8"
          >
            Index of Works
          </h2>
          <div className="press-label flex flex-col gap-1.5 text-black/50 md:col-span-4 md:items-end md:text-right">
            <span>Protected Intellectual Property</span>
            <span>Access By Authorization Only</span>
          </div>
        </Reveal>

        {/* Column headings — desktop only; on mobile each row labels itself by position. */}
        <div
          className="press-label hidden grid-cols-12 gap-6 border-b border-black/15 py-4 text-black/40 md:grid"
          aria-hidden="true"
        >
          <span className="col-span-2">No.</span>
          <span className="col-span-5">Title</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-2 text-right">Status</span>
        </div>

        <ol className="list-none" aria-label="Catalogue of works">
          {PRESS_WORKS.map((w, i) => (
            <Reveal
              as="li"
              key={w.id}
              delay={Math.min(i, 6) * 0.04}
              className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-b border-black/15 py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-7"
            >
              <span className="press-label order-1 text-black/50 md:col-span-2">
                <span className="sr-only">Catalogue number </span>
                {w.id}
              </span>

              <span className="press-label order-2 flex items-center justify-end gap-2 text-black md:order-4 md:col-span-2">
                <Lock aria-hidden="true" strokeWidth={1.25} className="h-3 w-3 shrink-0" />
                <span className="sr-only">Status: </span>
                {w.status}
              </span>

              <span className="order-3 col-span-2 text-[1.0625rem] font-normal leading-snug tracking-[-0.005em] text-black sm:text-lg md:col-span-5 md:text-[1.1875rem]">
                {w.title}
              </span>

              <span className="press-label order-4 col-span-2 text-black/50 md:order-3 md:col-span-3">
                <span className="sr-only">Category: </span>
                {w.category}
              </span>
            </Reveal>
          ))}
        </ol>

        <p className="press-label mt-10 max-w-[60ch] leading-[2] text-black/40">
          All works are held privately by Moontuner Press. Listing does not imply
          public availability.
        </p>
      </div>
    </section>
  );
}
