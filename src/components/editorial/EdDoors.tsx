import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, CalendarRange, MoonStar, Music2, type LucideIcon } from "lucide-react";
import { ED_DOORS, type DoorIconKey } from "./editorialData";
import { Reveal } from "./Reveal";

const ICONS: Record<DoorIconKey, LucideIcon> = {
  phasecraft: MoonStar,
  chaperone: BookOpen,
  symphony: Music2,
  reports: CalendarRange,
};

/**
 * The four doors into Moontuner. Each tile is one link; it inverts on hover
 * and focus without changing layout.
 *
 * Grid lines come from a 1px gap on a black ground, so every divider stays
 * exactly one pixel at 4, 2 and 1 columns.
 */
export function EdDoors() {
  return (
    <section aria-labelledby="ed-doors" className="border-t border-black bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 md:pt-28 lg:px-12">
        <Reveal className="flex items-baseline justify-between gap-6 pb-10 md:pb-14">
          <h2 id="ed-doors" className="ed-label text-[0.6875rem] tracking-[0.24em] text-black">
            Four Doors
          </h2>
          <span className="ed-label text-black/40">Learn · Practice · Hear · Time</span>
        </Reveal>
      </div>

      <ul className="grid grid-cols-1 gap-px border-y border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
        {ED_DOORS.map((d, i) => {
          const Icon = ICONS[d.icon];
          return (
            <Reveal as="li" key={d.key} delay={i * 0.06} className="flex">
              <Link
                to={d.href}
                className="group flex w-full flex-col justify-between gap-12 bg-white p-8 text-black transition-colors duration-300 ease-out hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none sm:min-h-[22rem] lg:min-h-[26rem] lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="ed-label opacity-50">
                    {d.n} — {d.verb}
                  </span>
                  <Icon aria-hidden="true" strokeWidth={1} className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-[1.375rem] font-light leading-tight tracking-[-0.01em]">{d.title}</h3>
                  <p className="mt-4 max-w-[34ch] text-[0.875rem] font-light leading-relaxed opacity-70">{d.line}</p>
                  <span className="ed-label mt-8 inline-flex items-center gap-2">
                    Enter
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
