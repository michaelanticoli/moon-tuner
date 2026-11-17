import { PRESS_MISSION } from "./pressData";
import { Reveal } from "./Reveal";

/** Full-width black section — the agency statement. */
export function PressMission() {
  return (
    <section aria-labelledby="press-agency" className="border-t border-black bg-black text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 sm:px-8 md:grid-cols-12 md:gap-8 md:py-36 lg:px-12">
        <Reveal className="md:col-span-3">
          <h2 id="press-agency" className="press-label text-[0.6875rem] tracking-[0.24em] text-white/60">
            {PRESS_MISSION.label}
          </h2>
          <div className="mt-5 h-px w-10 bg-white/60" aria-hidden="true" />
        </Reveal>

        <div className="md:col-span-9 lg:col-span-8">
          <Reveal>
            <p className="press-display max-w-[24ch] text-[clamp(1.75rem,4.2vw,3.5rem)] text-white">
              {PRESS_MISSION.statement}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-12 border-t border-white/25 pt-8 md:mt-16 md:grid md:grid-cols-8">
            <p className="max-w-[52ch] text-[0.95rem] font-light leading-[1.75] text-white/70 sm:text-base md:col-span-6 md:col-start-3">
              {PRESS_MISSION.supporting}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
