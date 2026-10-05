import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { DuskHero } from "@/components/dusk/DuskHero";
import { TodaysDirective } from "@/components/dusk/TodaysDirective";
import { HarmonicProfileTeaser } from "@/components/dusk/HarmonicProfileTeaser";
import { LunarCapture } from "@/components/LunarCapture";
import { SEOHead, websiteSchema } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import sampleChartAudio from "@/assets/sample-chart.mp3.asset.json";

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
        ogImage="/og-moontuner.jpg"
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

          {/* ── Flagship: Astro-Harmonic Symphony ─────────────────── */}
          <section
            id="astro-harmonic-symphony"
            className="relative py-20 lg:py-28 overflow-hidden"
            aria-labelledby="symphony-heading"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-14" />

              <div className="grid lg:grid-cols-[1.08fr,0.92fr] gap-10 lg:gap-16 items-start">
                <div>
                  <p className="dusk-eyebrow mb-5">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    The Astro-Harmonic Symphony
                  </p>
                  <h2
                    id="symphony-heading"
                    className="dusk-serif text-[clamp(2.2rem,5vw,4.2rem)] dusk-ivory leading-[1.05] mb-6"
                  >
                    Hear your chart. <em className="italic dusk-gold">Know yourself.</em>
                  </h2>
                  <p
                    className="text-[1.0625rem] leading-[1.75] max-w-[590px]"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}
                  >
                    Your natal chart becomes musical structure: a composed signature piece and a spoken interpretation, made from the same exact placements.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/quantumelodic" className="dusk-btn dusk-btn-primary">
                      Create Your Symphony
                    </Link>
                    <a href="#symphony-sample" className="dusk-btn dusk-btn-ghost">
                      Hear a Sample
                    </a>
                  </div>
                </div>

                <div id="symphony-sample" className="dusk-surface p-6 lg:p-8 scroll-mt-28">
                  <div className="flex items-start justify-between gap-6 mb-8">
                    <div>
                      <p className="dusk-eyebrow mb-2">Sample Chart · Audio</p>
                      <p className="dusk-serif text-2xl dusk-ivory leading-tight">
                        A chart translated into sound.
                      </p>
                    </div>
                    <span
                      className="shrink-0 text-[0.6rem] uppercase px-2 py-1 border"
                      style={{
                        color: "hsl(var(--dusk-gold))",
                        borderColor: "hsl(var(--dusk-gold) / 0.35)",
                      }}
                    >
                      Preview
                    </span>
                  </div>
                  <audio
                    className="w-full h-12"
                    controls
                    preload="metadata"
                    src={sampleChartAudio.url}
                    aria-label="Sample Astro-Harmonic Symphony audio"
                  >
                    Your browser does not support audio playback.
                  </audio>
                  <p
                    className="mt-5 text-sm leading-[1.65]"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.56)" }}
                  >
                    A short excerpt from the existing Astro-Harmonic experience. Your piece is generated from your own birth data.
                  </p>
                </div>
              </div>

              <ol className="mt-14 lg:mt-20 grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.09)" }}>
                {[
                  ["01", "Enter", "Your birth date, exact time, and place."],
                  ["02", "Calculate", "Moontuner calculates your natal chart."],
                  ["03", "Translate", "The Quantumelodic engine maps the chart to musical structure."],
                  ["04", "Render", "ElevenLabs creates the composition and voices the interpretation."],
                  ["05", "Receive", "A signature piece and reading shaped by your chart."],
                ].map(([number, label, text]) => (
                  <li
                    key={number}
                    className="min-h-[190px] p-5 lg:p-6 border-r border-b"
                    style={{ borderColor: "hsl(var(--dusk-ivory) / 0.09)" }}
                  >
                    <span className="dusk-eyebrow dusk-gold">{number}</span>
                    <h3 className="dusk-serif text-xl dusk-ivory mt-8 mb-3">{label}</h3>
                    <p className="text-[0.82rem] leading-[1.65]" style={{ color: "hsl(var(--dusk-ivory) / 0.56)" }}>
                      {text}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 lg:mt-12 pt-8 border-t grid md:grid-cols-[0.38fr,1fr] gap-5 md:gap-10" style={{ borderColor: "hsl(var(--dusk-gold) / 0.24)" }}>
                <p className="dusk-eyebrow dusk-gold">Powered by ElevenLabs</p>
                <div>
                  <h3 className="dusk-serif text-2xl lg:text-3xl dusk-ivory leading-tight mb-4">
                    Not narration added later. <em className="italic dusk-gold">The interface to the chart.</em>
                  </h3>
                  <p className="text-[0.95rem] leading-[1.75] max-w-[700px]" style={{ color: "hsl(var(--dusk-ivory) / 0.66)" }}>
                    ElevenLabs renders the original composition and speaks the interpretation in Michael Moon&apos;s cloned voice. Music and voice carry the same chart reading together, so you can hear the structure as well as read it.
                  </p>
                </div>
              </div>
            </div>
          </section>

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
