import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { DuskHero } from "@/components/dusk/DuskHero";
import { TodaysDirective } from "@/components/dusk/TodaysDirective";
import { HarmonicProfileTeaser } from "@/components/dusk/HarmonicProfileTeaser";
import { LunarCapture } from "@/components/LunarCapture";
import { SEOHead, websiteSchema } from "@/components/SEOHead";

/**
 * Moontuner v2 — Cinematic Dusk redesign.
 * Phase 1: design system + nav + hero + Today's Directive + Harmonic Profile teaser
 *          + Reports coming-soon tease + email capture.
 */
const Index = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Moontuner | A Reflective Operating System for Emotionally Intelligent People"
        description="Today's Directive, your Harmonic Profile, and a lunar framework for creative rhythm, emotional regulation, and intentional living. Not astrology — a reflective system."
        canonical="/"
        keywords={[
          "emotional regulation",
          "intentional living",
          "creative rhythm",
          "cyclical productivity",
          "daily directive",
          "lunar alignment system",
          "emotional wellness",
          "moon phases",
        ]}
        jsonLd={websiteSchema()}
      />
      <div className="dusk min-h-screen relative">
        <DuskNav />
        <main>
          <DuskHero />
          <TodaysDirective />
          <HarmonicProfileTeaser />

          {/* ── Reports — coming-soon teaser ─────────────────────────── */}
          <section
            className="relative py-24 lg:py-32 overflow-hidden"
            aria-label="Reports — coming soon"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-20" />

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left — copy */}
                <div>
                  <p className="dusk-eyebrow mb-6">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    Coming Soon — Phase II
                  </p>

                  <h2 className="dusk-serif text-[clamp(2rem,4.2vw,3.4rem)] dusk-ivory mb-6">
                    Personalized Lunar Reports — <em className="italic dusk-gold">built around you.</em>
                  </h2>

                  <p
                    className="text-[1.0625rem] leading-[1.7] mb-8 max-w-[480px]"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}
                  >
                    A deep-read of your natal chart, current transits, and timing
                    windows — delivered as a living document. Subscribe below to
                    be notified when reports open.
                  </p>

                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-[0.7rem] tracking-[0.2em] uppercase"
                    style={{
                      border: "1px solid hsl(var(--dusk-ivory) / 0.12)",
                      color: "hsl(var(--dusk-ivory) / 0.35)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(var(--dusk-gold) / 0.45)" }}
                    />
                    In development
                  </div>
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
                      <div
                        className="absolute top-4 right-4 text-[0.55rem] tracking-[0.2em] uppercase px-2 py-1 rounded-sm"
                        style={{
                          color: "hsl(var(--dusk-ivory) / 0.28)",
                          background: "hsl(var(--dusk-ivory) / 0.05)",
                        }}
                      >
                        Soon
                      </div>
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
