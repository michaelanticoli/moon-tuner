import { Link } from "react-router-dom";
import { ED_DECLARATIONS } from "./editorialData";
import { Reveal } from "./Reveal";

/** The seven declarations from the Manifesto, set as a quiet list. */
export function EdDeclarations() {
  return (
    <section aria-labelledby="ed-declarations" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 md:pt-36 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <h2 id="ed-declarations" className="ed-label text-[0.6875rem] tracking-[0.24em] text-black">
              Seven Declarations
            </h2>
            <div className="mt-5 h-px w-10 bg-black" aria-hidden="true" />
            <Link to="/manifesto" className="ed-label ed-link mt-8 inline-block text-black/60">
              Read the Manifesto
            </Link>
          </Reveal>

          <ol className="md:col-span-9">
            {ED_DECLARATIONS.map((d, i) => (
              <Reveal
                as="li"
                key={d.n}
                delay={Math.min(i, 4) * 0.04}
                className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-t border-black/15 py-6 last:border-b md:grid-cols-[4.5rem_1fr_auto] md:gap-x-8"
              >
                <span className="ed-label text-black/40" aria-hidden="true">
                  {d.n}
                </span>
                <span className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-light leading-snug tracking-[-0.01em]">
                  {d.title}
                </span>
                <span className="ed-label col-start-2 text-black/50 md:col-start-3 md:text-right">{d.essence}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
