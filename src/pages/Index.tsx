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
        title="Moontuner — Reflective Lunar OS for Daily Alignment"
        description="Today's Directive, your Harmonic Profile, and a lunar framework for creative rhythm and intentional living."
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
          <section className="relative py-20 lg:py-24 overflow-hidden" aria-label="What Moontuner is">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-14" />
              <div className="grid lg:grid-cols-[0.85fr,1.15fr] gap-10 lg:gap-16 items-start">
                <div>
                  <p className="dusk-eyebrow mb-5">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    A Tuning Suite
                  </p>
                  <h2 className="dusk-serif text-[clamp(1.9rem,4vw,3rem)] dusk-ivory leading-[1.1] mb-5">
                    Notice the pattern. <em className="italic dusk-gold">Adjust the frequency.</em>
                  </h2>
                  <p className="text-[1rem] leading-[1.7]" style={{ color: "hsl(var(--dusk-ivory) / 0.66)" }}>
                    A programmatic approach to self-inquiry — built on lunar timing, not lunar fortune-telling. You map the rhythm you already live in, then fine-tune toward the life you want to manifest.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link to="/auth?mode=begin&redirect=/dashboard" className="dusk-btn dusk-btn-primary">
                      Start Free
                    </Link>
                    <a href="#todays-directive" className="dusk-btn dusk-btn-ghost">
                      See Today's Signal
                    </a>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "Read", text: "Today's Directive — the lunar weather as one practical instruction." },
                    { label: "Map", text: "Your Harmonic Profile — identity, timing, recurring friction." },
                    { label: "Tune", text: "Daily, weekly, seasonal adjustments that compound into alignment." },
                  ].map((item) => (
                    <div key={item.label} className="dusk-surface p-5">
                      <p className="dusk-eyebrow mb-2">{item.label}</p>
                      <p className="text-[0.85rem] leading-[1.6]" style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <TodaysDirective />
          <HarmonicProfileTeaser />

          {/* ── Live Reports — fully generative ─────────────────────────── */}
          <section
            className="relative py-20 lg:py-24 overflow-hidden"
            aria-label="Personalized lunar reports"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-16" />

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <p className="dusk-eyebrow mb-5">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    Live Reports
                  </p>

                  <h2 className="dusk-serif text-[clamp(1.9rem,4vw,3rem)] dusk-ivory leading-[1.1] mb-5">
                    Your chart, <em className="italic dusk-gold">on demand.</em>
                  </h2>

                  <p
                    className="text-[1rem] leading-[1.7] mb-7 max-w-[460px]"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.64)" }}
                  >
                    Natal data, current transits, and timing windows — generated live, written for action, not prediction.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link to="/auth?mode=begin&redirect=/lunar-reports" className="dusk-btn dusk-btn-primary">
                      Start Free → Reports
                    </Link>
                    <Link to="/lunar-reports" className="dusk-btn dusk-btn-ghost">
                      Browse →
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: "12-Month Lunar Arc", desc: "Your natal moon across a full year of cycles.", to: "/lunar-reports" },
                    { label: "Astro-Harmonic Symphony", desc: "Your chart as a printable score and original composition.", to: "/quantumelodic" },
                    { label: "Cazimi Power-Day Grid", desc: "Your highest-momentum days, plotted by season.", to: "/cazimi" },
                  ].map((card) => (
                    <Link
                      key={card.label}
                      to={card.to}
                      className="p-5 rounded-xl border relative overflow-hidden block transition-colors hover:border-[hsl(var(--dusk-gold)/0.5)]"
                      style={{
                        background: "hsl(var(--dusk-black) / 0.6)",
                        borderColor: "hsl(var(--dusk-ivory) / 0.07)",
                      }}
                    >
                      <div
                        className="absolute top-3 right-3 text-[0.55rem] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
                        style={{
                          color: "hsl(var(--dusk-gold) / 0.9)",
                          background: "hsl(var(--dusk-gold) / 0.08)",
                        }}
                      >
                        Live
                      </div>
                      <p className="dusk-eyebrow mb-1.5">{card.label}</p>
                      <p
                        className="text-[0.85rem] leading-[1.55]"
                        style={{ color: "hsl(var(--dusk-ivory) / 0.55)" }}
                      >
                        {card.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
                <p className="text-sm" style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}>
                  Free account · saves your record · no card required.
                </p>
                <Link to="/auth?mode=begin&redirect=/dashboard" className="dusk-btn dusk-btn-primary">
                  Create Free Account →
                </Link>
              </div>
            </div>
          </section>

          {/* ── Email capture ─────────────────────────────────────────── */}
          <section className="relative py-16 lg:py-20" aria-label="Email subscription">
            <div className="mx-auto max-w-[760px] px-6 lg:px-12">
              <LunarCapture
                source="homepage"
                heading="Not ready to sign up? Receive the letters."
                subheading="Lunar timing notes and new tool releases. Low-commitment."
                items={[
                  "Current-phase guidance, no fatalism",
                  "Early access to new generators",
                  "A clear path back when you're ready",
                ]}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
