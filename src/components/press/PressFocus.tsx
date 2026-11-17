import { Brain, Compass, Globe, Network, type LucideIcon } from "lucide-react";
import { PRESS_FOCUS, type FocusIconKey } from "./pressData";
import { Reveal } from "./Reveal";

const ICONS: Record<FocusIconKey, LucideIcon> = {
  culture: Globe,
  systems: Network,
  psychology: Brain,
  framework: Compass,
};

/**
 * Four areas of focus. Tiles invert on hover purely as feedback — they are
 * not interactive, so they carry no role, href, or tab stop.
 *
 * Grid lines are drawn with a 1px gap on a black ground, which keeps every
 * divider exactly one pixel at 4, 2 and 1 columns without border juggling.
 */
export function PressFocus() {
  return (
    <section aria-labelledby="press-focus" className="border-t border-black bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 md:pt-28 lg:px-12">
        <Reveal className="flex items-baseline justify-between gap-6 pb-10 md:pb-14">
          <h2 id="press-focus" className="press-label text-[0.6875rem] tracking-[0.24em] text-black">
            Areas of Focus
          </h2>
          <span className="press-label text-black/40" aria-hidden="true">
            04
          </span>
        </Reveal>
      </div>

      <ul className="grid grid-cols-1 gap-px border-y border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
        {PRESS_FOCUS.map(({ n, title, icon }, i) => {
          const Icon = ICONS[icon];
          return (
            <Reveal
              as="li"
              key={n}
              delay={i * 0.06}
              className="group flex min-h-[11rem] flex-col justify-between bg-white p-8 text-black transition-colors duration-300 ease-out hover:bg-black hover:text-white sm:min-h-[18rem] lg:min-h-[22rem] lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="press-label opacity-50">{n}</span>
                <Icon aria-hidden="true" strokeWidth={1} className="h-7 w-7" />
              </div>
              <h3 className="press-label max-w-[16ch] text-[0.8125rem] leading-[1.7] tracking-[0.2em]">
                {title}
              </h3>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
