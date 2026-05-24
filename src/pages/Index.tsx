import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { DuskHero } from "@/components/dusk/DuskHero";
import { TodaysDirective } from "@/components/dusk/TodaysDirective";
import { HarmonicProfileTeaser } from "@/components/dusk/HarmonicProfileTeaser";
import { LunarCapture } from "@/components/LunarCapture";
import { SEOHead, websiteSchema } from "@/components/SEOHead";
import { Link } from "react-router-dom";

/**
 * Moontuner v2 — Cinematic Dusk redesign.
 * Phase 1: design system + nav + hero + Today's Directive + Harmonic Profile teaser
 *          + Reports coming-soon tease + email capture.
 */
const Index = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Moon Phase Today | Moontuner — Live Lunar Calendar & Wellness Guide"
        description="Check today's moon phase and align your energy, habits, and decisions with the current lunar cycle. Free moon phase tracker, harmonic profile, and guided workbooks."
        canonical="/"
        keywords={[
          "moon phase today",
          "current moon phase",
          "moon cycle today",
          "lunar alignment system",
          "emotional regulation",
          "intentional living",
          "cyclical productivity",
          "lunar wellness",
        ]}
        jsonLd={websiteSchema()}
      />
      <div className="dusk min-h-screen relative">
        <DuskNav />
        <main>
          <DuskHero />
          <TodaysDirective />
          <HarmonicProfileTeaser />

          {/* ── Live Moon Phase Tool ─────────────────────────── */}
          <section className="relative py-16 overflow-hidden" aria-label="Live moon phase">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-16" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="dusk-eyebrow mb-3">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    Live Tool
                  </p>
                  <h2 className="dusk-serif text-2xl dusk-ivory">
                    See the Moon Phase <em className="italic dusk-gold">Right Now</em>
                  </h2>
                </div>
                <Link
                  to="/moon-phase-today"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm tracking-widest uppercase transition-colors hover:bg-[hsl(var(--dusk-gold))] hover:text-[hsl(var(--dusk-black))]"
                  style={{
                    border: "1px solid hsl(var(--dusk-gold))",
                    color: "hsl(var(--dusk-gold))",
                  }}
                >
                  Check Today's Phase →
                </Link>
              </div>
            </div>
          </section>

          {/* ── Reports — live section ─────────────────────────── */}
          <section
            className="relative py-24 lg:py-32 overflow-hidden"
            aria-label="Personalized Lunar Reports"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-20" />

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left — copy */}
                <div>
                  <p className="dusk-eyebrow mb-6">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    Available Now
                  </p>

                  <h2 className="dusk-serif text-[clamp(2rem,4.2vw,3.4rem)] dusk-ivory mb-6">
                    Personalized Lunar Reports — <em className="italic dusk-gold">built around you.</em>
                  </h2>

                  <p
                    className="text-[1.0625rem] leading-[1.7] mb-8 max-w-[480px]"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}
                  >
                    A deep-read of your natal chart, current transits, and timing
                    windows — delivered as a living document.
                  </p>

                  <Link
                    to="/lunar-reports"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm tracking-widest uppercase transition-colors hover:bg-[hsl(var(--dusk-gold))] hover:text-[hsl(var(--dusk-black))]"
                    style={{
                      border: "1px solid hsl(var(--dusk-gold))",
                      color: "hsl(var(--dusk-gold))",
                    }}
                  >
                    View Lunar Reports →
                  </Link>
                </div>

                {/* Right — preview cards */}
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Natal Phase Report", desc: "Your birth moon mapped against the current cycle — revealing your natural timing architecture." },
                    { label: "30-Day Timing Window", desc: "High-momentum, friction, and rest periods across your next lunar month." },
                    { label: "Emotional Season Read", desc: "A synthesis of your chart's emotional signature and what this cycle is asking of you." },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="p-6 rounded-xl border relative overflow-hidden"
                      style={{
                        background: "hsl(var(--dusk-black) / 0.6)",
                        borderColor: "hsl(var(--dusk-ivory) / 0.07)",
                      }}
                    >
                      <p className="dusk-eyebrow mb-2">{card.label}</p>
                      <p
                        className="text-sm leading-[1.65]"
                        style={{ color: "hsl(var(--dusk-ivory) / 0.52)" }}
                      >
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Email capture ─────────────────────────────────────────── */}
          <section
            className="relative py-16 lg:py-24"
            aria-label="Email subscription"
          >
            <div className="mx-auto max-w-[760px] px-6 lg:px-12">
              <LunarCapture source="homepage" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
