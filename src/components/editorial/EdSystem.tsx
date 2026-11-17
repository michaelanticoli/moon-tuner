import { ED_PRINCIPLES, ED_SYSTEM } from "./editorialData";
import { Reveal } from "./Reveal";

/** Full-width black section — what Moontuner is, and how it works. */
export function EdSystem() {
  return (
    <section aria-labelledby="ed-system" className="border-t border-black bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <h2 id="ed-system" className="ed-label text-[0.6875rem] tracking-[0.24em] text-white/60">
              {ED_SYSTEM.label}
            </h2>
            <div className="mt-5 h-px w-10 bg-white/60" aria-hidden="true" />
          </Reveal>

          <div className="md:col-span-9 lg:col-span-8">
            <Reveal>
              <p className="ed-display max-w-[22ch] text-[clamp(1.75rem,4.2vw,3.5rem)] text-white">
                {ED_SYSTEM.statement}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-12 border-t border-white/25 pt-8 md:mt-16 md:grid md:grid-cols-8">
              <p className="max-w-[56ch] text-[0.95rem] font-light leading-[1.75] text-white/70 sm:text-base md:col-span-6 md:col-start-3">
                {ED_SYSTEM.supporting}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal>
            <h3 className="ed-label text-[0.6875rem] tracking-[0.24em] text-white/60">Principles</h3>
          </Reveal>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {ED_PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 0.06} className="border-t border-white/25 py-7">
                <p className="ed-label text-white">{p.title}</p>
                <p className="mt-3 max-w-[34ch] text-[0.9375rem] font-light leading-relaxed text-white/60">{p.line}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
