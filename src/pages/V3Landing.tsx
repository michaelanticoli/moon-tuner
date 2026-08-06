import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { SEOHead, websiteSchema } from "@/components/SEOHead";
import { Play, Pause, ArrowRight } from "lucide-react";
import sampleTrack from "@/assets/sample-chart.mp3.asset.json";

/**
 * V3 Landing — "Hear your chart. Know yourself."
 * Draft route for review. See user-uploads://moontuner-homepage-copy.md
 * Sequence: Hero → Mechanism (Peter & the Wolf) → Depth (Quantumelodic)
 *           → Tripwire (single placement) → Full chart CTA.
 */

const INSTRUMENT_GLOSSARY: Array<{ body: string; instrument: string; note: string }> = [
  { body: "Sun",     instrument: "Cello",       note: "core identity, sustained voice" },
  { body: "Moon",    instrument: "Clarinet",    note: "inner weather, breath-driven" },
  { body: "Mercury", instrument: "Woodwinds",   note: "quick, articulate motion" },
  { body: "Venus",   instrument: "Strings",     note: "harmony, relational tone" },
  { body: "Mars",    instrument: "Brass",       note: "drive, decisive attack" },
];

const V3Landing = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  // Sample track hosted on Lovable CDN.
  const SAMPLE_SRC: string | null = sampleTrack.url;

  const togglePlay = () => {
    if (!SAMPLE_SRC) return;
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title="Moontuner — Hear Your Chart. Know Yourself."
        description="Your birth chart, translated into music. Every placement gets its own voice — a composition built from your exact planetary architecture."
        canonical="/v3"
        keywords={["birth chart music", "astrology sound", "natal chart composition", "quantumelodic", "moontuner"]}
        jsonLd={websiteSchema()}
      />
      <div className="dusk min-h-screen relative" style={{ background: "#080808" }}>
        <DuskNav />

        <main>
          {/* ── 1. HERO ──────────────────────────────────────────────── */}
          <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <p className="dusk-eyebrow mb-6" style={{ color: "hsl(var(--dusk-gold))" }}>
                <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                Your birth chart, in sound
              </p>
              <h1
                className="dusk-serif dusk-ivory leading-[1.02] mb-8"
                style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)" }}
              >
                Hear your chart.
                <br />
                <em className="italic dusk-gold">Know yourself.</em>
              </h1>
              <p
                className="text-[1.05rem] lg:text-[1.15rem] leading-[1.7] max-w-[640px] mb-10"
                style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}
              >
                Moontuner turns your birth chart into music — a composition built from your
                exact planetary placements, so you can hear who you are the way you'd read a
                chart, only truer.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={!SAMPLE_SRC}
                  className="dusk-btn dusk-btn-primary inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label={playing ? "Pause sample chart" : "Play sample chart"}
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {SAMPLE_SRC ? (playing ? "Pause sample" : "Listen to a sample chart") : "Sample track coming"}
                </button>

                <Link to="/lunar-reports" className="dusk-btn dusk-btn-ghost inline-flex items-center gap-2">
                  Get your chart <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {SAMPLE_SRC && (
                <audio
                  ref={audioRef}
                  src={SAMPLE_SRC}
                  onEnded={() => setPlaying(false)}
                  preload="none"
                />
              )}
            </div>
          </section>

          {/* ── 2. MECHANISM ─────────────────────────────────────────── */}
          <section className="relative py-20 lg:py-28 border-t" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12 lg:gap-20 items-start">
                <div>
                  <p className="dusk-eyebrow mb-5" style={{ color: "hsl(var(--dusk-gold))" }}>
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    How it works
                  </p>
                  <h2 className="dusk-serif dusk-ivory leading-[1.08] mb-6" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)" }}>
                    Every placement gets its <em className="italic dusk-gold">own voice.</em>
                  </h2>
                  <div className="space-y-5 text-[1rem] leading-[1.75]" style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}>
                    <p>
                      Think of <em>Peter and the Wolf</em> — a bassoon for the grandfather, a
                      flute for the bird, strings for the wolf. You don't need to read music
                      to know who's in the scene. You just listen.
                    </p>
                    <p>
                      Moontuner works the same way. Each planet, sign, and house in your
                      chart is voiced as its own instrument and orchestrated together — so
                      your Sun, your Moon, your rising, the whole architecture of your chart,
                      becomes something you can actually <em>hear</em>. Not a metaphor for
                      your chart. A translation of it.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="dusk-eyebrow mb-4" style={{ color: "hsl(var(--dusk-ivory) / 0.5)" }}>
                    Voicings — a partial glossary
                  </p>
                  <ul className="divide-y" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
                    {INSTRUMENT_GLOSSARY.map((row) => (
                      <li
                        key={row.body}
                        className="grid grid-cols-[90px,140px,1fr] gap-4 py-4 items-baseline"
                        style={{ borderTop: "1px solid hsl(var(--dusk-ivory) / 0.06)" }}
                      >
                        <span className="dusk-serif dusk-ivory text-[1.15rem]">{row.body}</span>
                        <span className="dusk-gold text-[0.85rem] tracking-wide uppercase">{row.instrument}</span>
                        <span className="text-[0.85rem]" style={{ color: "hsl(var(--dusk-ivory) / 0.55)" }}>
                          {row.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.75rem]" style={{ color: "hsl(var(--dusk-ivory) / 0.4)" }}>
                    Voicings shift by sign and house — this is the base register.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. DEPTH — Quantumelodic ─────────────────────────────── */}
          <section className="relative py-20 lg:py-24 border-t" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
            <div className="mx-auto max-w-[880px] px-6 lg:px-12">
              <p className="dusk-eyebrow mb-4" style={{ color: "hsl(var(--dusk-gold))" }}>
                <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                The system behind it
              </p>
              <h2 className="dusk-serif dusk-ivory leading-[1.1] mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                This is <em className="italic dusk-gold">Quantumelodic.</em>
              </h2>
              <p className="text-[1rem] leading-[1.75] max-w-[640px]" style={{ color: "hsl(var(--dusk-ivory) / 0.68)" }}>
                Quantumelodic is the framework that makes this possible — twenty years of
                work mapping planetary placements to musical parameters: mode, tempo,
                instrumentation, key. It's not a separate product from Moontuner. It's how
                Moontuner listens to your chart in the first place.
              </p>
            </div>
          </section>

          {/* ── 4. TRIPWIRE ──────────────────────────────────────────── */}
          <section className="relative py-20 lg:py-28 border-t" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                  <p className="dusk-eyebrow mb-5" style={{ color: "hsl(var(--dusk-gold))" }}>
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    Start here
                  </p>
                  <h2 className="dusk-serif dusk-ivory leading-[1.08] mb-6" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
                    Hear one placement <em className="italic dusk-gold">first.</em>
                  </h2>
                  <p className="text-[1rem] leading-[1.75] max-w-[520px]" style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}>
                    Not ready for your full chart translation? Start with a single placement —
                    your Sun, your Moon, or your rising — as a short standalone track. Low
                    cost, immediate, yours.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    { label: "Your Sun sound",     copy: "Core identity, one track.", to: "/lunar-reports?placement=sun" },
                    { label: "Your Moon sound",    copy: "Inner weather, one track.",  to: "/lunar-reports?placement=moon" },
                    { label: "Your Rising sound",  copy: "How you meet the world.",    to: "/lunar-reports?placement=rising" },
                  ].map((card) => (
                    <Link
                      key={card.label}
                      to={card.to}
                      className="p-5 rounded-xl border flex items-center justify-between gap-4 transition-colors hover:border-[hsl(var(--dusk-gold)/0.5)]"
                      style={{
                        background: "hsl(var(--dusk-black) / 0.6)",
                        borderColor: "hsl(var(--dusk-ivory) / 0.08)",
                      }}
                    >
                      <div>
                        <p className="dusk-serif dusk-ivory text-[1.1rem] mb-1">{card.label}</p>
                        <p className="text-[0.85rem]" style={{ color: "hsl(var(--dusk-ivory) / 0.55)" }}>
                          {card.copy}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 dusk-gold shrink-0" />
                    </Link>
                  ))}
                  <p className="text-[0.75rem] mt-1" style={{ color: "hsl(var(--dusk-ivory) / 0.4)" }}>
                    Single-placement pricing to be finalized.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. FULL CHART CTA ────────────────────────────────────── */}
          <section className="relative py-24 lg:py-32 border-t" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}>
            <div className="mx-auto max-w-[820px] px-6 lg:px-12 text-center">
              <h2 className="dusk-serif dusk-ivory leading-[1.08] mb-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
                Ready to hear <em className="italic dusk-gold">the whole thing?</em>
              </h2>
              <p className="text-[1.05rem] leading-[1.7] max-w-[560px] mx-auto mb-10" style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}>
                Your full chart, fully orchestrated — every placement, one composition,
                entirely yours.
              </p>
              <Link to="/quantumelodic" className="dusk-btn dusk-btn-primary inline-flex items-center gap-2">
                Get your full chart reading <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default V3Landing;
