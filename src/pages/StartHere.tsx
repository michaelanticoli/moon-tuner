import { Link, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PathwayDoors } from "@/components/PathwayDoors";
import { DuskLiveStatus } from "@/components/dusk/DuskLiveStatus";
import { LunarCapture } from "@/components/LunarCapture";

/**
 * Start Here — the front door for new visitors (/start) and for readers of
 * PHASECRAFT: The Moontuner Method (/book, the URL printed in the book).
 * Same page, two openings: /book greets the reader and frames the site as the
 * live companion to what they've read.
 */

const PATH = [
  {
    n: "01",
    title: "Find tonight's signature",
    body: "Open Phasecraft and read the phase-and-sign signature overhead right now. It's the daily habit everything else builds on.",
    href: "/phasecraft",
    cta: "Today's signature",
  },
  {
    n: "02",
    title: "Study the method",
    body: "The Phasecraft School walks you from the eight phases to integrated practice in six modules, one lesson at a time.",
    href: "/school/curriculum",
    cta: "See the curriculum",
  },
  {
    n: "03",
    title: "Live one full cycle",
    body: "The Lunar Chaperone gives you a workbook for every half-moon. Begin with the one already underway — no start date, no catching up.",
    href: "/lunar-chaperone",
    cta: "Open the Chaperone",
  },
  {
    n: "04",
    title: "Bring in your chart",
    body: "Enter your birth details once, in any report. Your lunar map, cazimi windows, and Astro-Harmonic Symphony all pre-fill from them.",
    href: "/lunar-reports",
    cta: "Map your year",
  },
];

export default function StartHere() {
  const { pathname } = useLocation();
  const reader = pathname.startsWith("/book");

  const copy = reader
    ? {
        seoTitle: "For Readers of PHASECRAFT — Start Here | Moontuner",
        seoDesc:
          "The live companion to PHASECRAFT: The Moontuner Method. Tonight's lunar signature, the Phasecraft School, the Lunar Chaperone workbooks, and reports built from your own chart.",
        canonical: "/book",
        eyebrow: "For readers of PHASECRAFT: The Moontuner Method",
        h1a: "You've read the method.",
        h1b: "Now work it against the live sky.",
        intro:
          "The book teaches the eight phases, the twelve signs, and the ninety-six signatures they make together. This site keeps them running in real time — tonight's signature, the School that walks you through the method, the Chaperone workbooks, and readings drawn from your own chart.",
        source: "book-reader",
      }
    : {
        seoTitle: "Start Here — Four Ways into Moontuner",
        seoDesc:
          "New to Moontuner? Four ways in: learn the 96 lunar signatures with Phasecraft, practice the cycle with the Lunar Chaperone, hear your chart as music, or map your year with lunar and cazimi reports.",
        canonical: "/start",
        eyebrow: "Start here",
        h1a: "Four ways in.",
        h1b: "One lunar system.",
        intro:
          "Moontuner reads time as a cycle you can move around, not a line you fall behind on. Pick the door that matches what you came for — each one leads to the others.",
        source: "start-here",
      };

  return (
    <PageTransition>
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDesc}
        canonical={copy.canonical}
        keywords={["phasecraft", "moontuner method", "lunar chaperone", "astro-harmonic symphony", "cazimi", "lunar map"]}
      />
      <div className="dusk min-h-screen relative">
        <Navigation />
        <main>
          {/* ── Opening ─────────────────────────────────────────────── */}
          <section className="relative overflow-hidden dusk-atmosphere" aria-labelledby="start-heading">
            <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12 pt-28 pb-14 lg:pt-36 lg:pb-20">
              <p className="dusk-eyebrow mb-6 dusk-rise">
                <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                {copy.eyebrow}
              </p>
              <h1
                id="start-heading"
                className="dusk-serif text-[clamp(2.3rem,5.6vw,4.4rem)] dusk-ivory leading-[1.06] mb-6 max-w-[880px] dusk-rise"
                style={{ animationDelay: "0.1s" }}
              >
                {copy.h1a} <em className="italic dusk-gold">{copy.h1b}</em>
              </h1>
              <p
                className="text-[1.0625rem] lg:text-[1.125rem] leading-[1.7] max-w-[620px] mb-9 dusk-rise"
                style={{ animationDelay: "0.2s", color: "hsl(var(--dusk-ivory) / 0.72)" }}
              >
                {copy.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 dusk-rise" style={{ animationDelay: "0.3s" }}>
                <Link to="/phasecraft" className="dusk-btn dusk-btn-primary justify-center">
                  See tonight's signature
                </Link>
                {reader ? (
                  <Link to="/school" className="dusk-btn dusk-btn-ghost justify-center">
                    Enter the School
                  </Link>
                ) : (
                  <Link to="/quantumelodic" className="dusk-btn dusk-btn-ghost justify-center">
                    Hear your chart
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* ── The four doors ──────────────────────────────────────── */}
          <section
            className="relative py-16 lg:py-24 border-t"
            style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}
            aria-label="The four doors"
          >
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <PathwayDoors
                eyebrow="Choose a door"
                heading={
                  <>
                    Learn it, practice it, <em className="italic dusk-gold">hear it, time it.</em>
                  </>
                }
              />
            </div>
          </section>

          {/* ── Suggested path ──────────────────────────────────────── */}
          <section className="relative py-16 lg:py-24" aria-labelledby="path-heading">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <div className="dusk-hairline mb-14" />
              <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-10 lg:gap-16 items-start">
                <ScrollReveal>
                  <p className="dusk-eyebrow mb-4">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    {reader ? "From page to practice" : "If you're not sure"}
                  </p>
                  <h2 id="path-heading" className="dusk-serif text-[clamp(1.8rem,3.6vw,2.7rem)] dusk-ivory leading-[1.1]">
                    A path through, <em className="italic dusk-gold">in order.</em>
                  </h2>
                  <p className="mt-4 text-[0.98rem] leading-[1.7] max-w-[420px]" style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}>
                    Each step stands on its own. Taken in this order, they turn the method into a habit.
                  </p>
                </ScrollReveal>

                <ol className="flex flex-col">
                  {PATH.map((step, i) => (
                    <li key={step.n} className="border-t" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
                    <ScrollReveal delay={i * 0.05}>
                      <div className="grid grid-cols-[2.5rem,1fr] gap-4 py-6">
                        <span className="dusk-serif text-lg dusk-gold pt-0.5" aria-hidden="true">
                          {step.n}
                        </span>
                        <div>
                          <h3 className="dusk-serif text-[1.4rem] dusk-ivory leading-tight mb-2">{step.title}</h3>
                          <p className="text-[0.95rem] leading-[1.65] mb-3" style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}>
                            {step.body}
                          </p>
                          <Link
                            to={step.href}
                            className="text-[0.75rem] uppercase tracking-[0.14em] dusk-silver hover:text-[hsl(var(--dusk-gold))] transition-colors underline-offset-4 hover:underline"
                          >
                            {step.cta} →
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ── Live sky ────────────────────────────────────────────── */}
          <section className="relative py-16 lg:py-20" aria-labelledby="sky-heading">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="mb-8 max-w-[560px]">
                <p className="dusk-eyebrow mb-4">
                  <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                  The sky, right now
                </p>
                <h2 id="sky-heading" className="dusk-serif text-[clamp(1.6rem,3.4vw,2.4rem)] dusk-ivory leading-[1.1]">
                  Where the Moon is <em className="italic dusk-gold">tonight.</em>
                </h2>
              </div>
              <DuskLiveStatus />
            </div>
          </section>

          {/* ── Email ───────────────────────────────────────────────── */}
          <section
            className="relative py-16 lg:py-20 border-t"
            style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}
            aria-label="Email subscription"
          >
            <div className="mx-auto max-w-[760px] px-6 lg:px-12">
              <LunarCapture
                source={copy.source}
                heading="Stay in the cycle."
                subheading={
                  reader
                    ? "A short letter at each turn of the Moon — the signature overhead and how to work it, picking up where the book leaves off."
                    : "A short letter at each turn of the Moon — the signature overhead and how to work it."
                }
                items={["Current-phase guidance, no fatalism", "New workbooks and tools as they open", "The free lunar timing guide"]}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
