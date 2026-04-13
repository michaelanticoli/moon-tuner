import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const SQUARE_URL = "https://square.site/book/LT09Q7KSGAF98/moontuner";
const SQUARE_TAROT =
  "https://book.squareup.com/appointments/gxlg47soy9h2pg/location/LT09Q7KSGAF98/services/SWPXX34N2NRJTB6ZGFC7OEKR";
const SQUARE_HARMONIC =
  "https://book.squareup.com/appointments/gxlg47soy9h2pg/location/LT09Q7KSGAF98/services/EE55PYXPCRZE6GQPDT4Y7IOL";
const COMPOSE_EMAIL = `mailto:michaelanticoli@gmail.com?subject=${encodeURIComponent("Custom Chart Composition Inquiry — Moontuner")}&body=${encodeURIComponent(`Hi Michael,

I'm interested in commissioning a custom chart composition.

— My Details —
Full Name: 
Birth Date (MM/DD/YYYY): 
Birth Time (exact, if known): 
Birth Location (City, Country): 

— About the Commission —
What draws you to this work?


Is there a specific intention, milestone, or occasion for this piece?


Any musical preferences or references? (optional)


How did you find Moontuner?


Looking forward to hearing from you.
`)}`;

export default function Services() {
  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen bg-background relative">
        {/* Grain overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-[860px] mx-auto px-6">
          {/* Header */}
          <header className="pt-24 lg:pt-32 pb-16 lg:pb-20 text-center">
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-accent mb-5">Work With Michael</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] text-foreground mb-5">
              Your chart has a frequency.
              <br />
              <em className="italic text-gold">Michael finds it.</em>
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-[500px] mx-auto leading-[1.75]">
              Three ways to enter the work — each one deeper than the last. All of them begin with your birth data and
              end with something you can use.
            </p>
            {/* Vertical line divider */}
            <div className="w-px h-16 bg-gradient-to-b from-border to-transparent mx-auto mt-14" />
          </header>

          {/* Service Cards */}
          <div className="pb-24 lg:pb-32 flex flex-col gap-0.5">
            {/* ── Digital Products Divider ── */}
            <div className="flex items-center gap-4 py-4 mb-0.5">
              <span className="flex-1 h-px bg-border" />
              <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 whitespace-nowrap">
                Digital Reports · Instant Delivery
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>

            {/* ── QuantumMelodic Symphony Report ── */}
            <article className="bg-card border border-border rounded-sm overflow-hidden group hover:border-[#6B4FBB]/35 transition-colors duration-400 animate-fade-in mb-0.5">
              <div className="h-0.5 w-full bg-gradient-to-r from-[#6B4FBB] via-accent to-transparent" />
              <div className="p-8 sm:p-10 lg:px-11 lg:py-10">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6 mb-7">
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-muted-foreground/50 mb-2">
                      Digital Report · Instant
                    </p>
                    <h2 className="font-serif text-[22px] sm:text-[28px] font-normal text-foreground leading-[1.2]">
                      Astro-Harmonic
                      <br />
                      <em className="italic">Natal Analysis</em>
                    </h2>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="font-serif text-[28px] font-normal text-accent leading-none block">$47</span>
                    <span className="text-[10px] text-muted-foreground tracking-[0.1em] block mt-1">
                      Instant delivery
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-border my-6" />

                <p className="text-[14.5px] text-muted-foreground leading-[1.8] mb-7">
                  Your natal chart translated into musical structure. Every planetary position, every angle, every
                  harmonic relationship mapped to its corresponding frequency and interval. The result is a complete
                  sonic portrait of the chart you were born into — generated algorithmically, yours permanently.
                </p>

                <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">
                  What's included
                </p>
                <ul className="list-none mb-9 flex flex-col gap-2.5">
                  {[
                    "Full natal chart-to-frequency translation",
                    "Planetary harmonic map — every placement sonified",
                    "Your chart's dominant key, mode, and tonal centre",
                    "Chord structure derived from your natal aspects",
                    "Interactive report delivered instantly after payment",
                  ].map((item) => (
                    <li key={item} className="text-[13.5px] text-muted-foreground flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-[7px]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-4">
                  <div
                    ref={(el) => {
                      if (el && !el.querySelector("stripe-buy-button")) {
                        const btn = document.createElement("stripe-buy-button");
                        btn.setAttribute("buy-button-id", "buy_btn_1TFpydApODHiQWcAQfv4H4OW");
                        btn.setAttribute(
                          "publishable-key",
                          "pk_live_51SxJqyApODHiQWcAhl9OKfJWuz3LWVFJIl8EIFMNlnMK4nJ3dhAg1j0ddErIcTA7b1LHtR0ROAMgBwzeH6b2Jk2f00kokUjT1U",
                        );
                        el.appendChild(btn);
                        sessionStorage.setItem("qm_source", "moontuner");
                      }
                    }}
                  />
                  <span className="text-[11.5px] text-muted-foreground tracking-[0.05em]">
                    The algorithm that powers the $800 composition
                  </span>
                </div>
              </div>
            </article>

            {/* ── Live Sessions Divider ── */}
            <div className="flex items-center gap-4 py-4 mb-0.5">
              <span className="flex-1 h-px bg-border" />
              <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 whitespace-nowrap">
                Live Sessions · Booked with Michael
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>

            {/* ── TIER 1: Tarot ── */}
            <article className="bg-card border border-border rounded-sm overflow-hidden group hover:border-accent/30 transition-colors duration-400 animate-fade-in">
              <div className="h-0.5 w-full bg-gradient-to-r from-accent to-transparent" />
              <div className="p-8 sm:p-10 lg:px-11 lg:py-10">
                {/* Head */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6 mb-7">
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-muted-foreground/50 mb-2">
                      Tier I · Entry Point
                    </p>
                    <h2 className="font-serif text-[22px] sm:text-[28px] font-normal text-foreground leading-[1.2]">
                      Tarot Reading
                    </h2>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="font-serif text-[28px] font-normal text-gold leading-none block">$45 – $95</span>
                    <span className="text-[10px] text-muted-foreground tracking-[0.1em] block mt-1">30 or 60 min</span>
                  </div>
                </div>

                <div className="w-full h-px bg-border my-6" />

                <p className="text-[14.5px] text-muted-foreground leading-[1.8] mb-7">
                  A direct, intuitive session grounded in your current lunar phase and the specific question you're
                  carrying. Michael reads the cards as a live instrument — not a script. You leave with clarity, not
                  just symbolism.
                </p>

                {/* Variants */}
                <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">
                  Choose your session
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mb-9">
                  <a
                    href={SQUARE_TAROT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-secondary border border-border rounded-sm p-[18px_20px] hover:border-accent/40 hover:bg-accent/[0.08] transition-all duration-300 no-underline"
                  >
                    <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 block mb-1">
                      Single Draw
                    </span>
                    <span className="font-serif text-base text-foreground block mb-2">The Pull</span>
                    <span className="text-[11.5px] text-muted-foreground flex gap-3">
                      <span>30 min</span>
                      <span className="text-accent font-medium">$45</span>
                    </span>
                  </a>
                  <a
                    href={SQUARE_TAROT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-secondary border border-border rounded-sm p-[18px_20px] hover:border-accent/40 hover:bg-accent/[0.08] transition-all duration-300 no-underline"
                  >
                    <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 block mb-1">
                      Full Spread
                    </span>
                    <span className="font-serif text-base text-foreground block mb-2">The Deep Read</span>
                    <span className="text-[11.5px] text-muted-foreground flex gap-3">
                      <span>60 min</span>
                      <span className="text-accent font-medium">$95</span>
                    </span>
                  </a>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={SQUARE_TAROT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[11px] font-medium tracking-[0.25em] uppercase border border-accent text-accent hover:bg-accent hover:text-background transition-all duration-300"
                  >
                    Book a Reading
                  </a>
                  <span className="text-[11.5px] text-muted-foreground tracking-[0.05em]">Most people start here</span>
                </div>
              </div>
            </article>

            {/* ── TIER 2: Astro-Harmonic Analysis ── */}
            <article className="bg-card border border-border rounded-sm overflow-hidden group hover:border-gold/35 transition-colors duration-400 animate-fade-in [animation-delay:150ms]">
              <div className="h-0.5 w-full bg-gradient-to-r from-gold to-transparent" />
              <div className="p-8 sm:p-10 lg:px-11 lg:py-10">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6 mb-7">
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-muted-foreground/50 mb-2">
                      Tier II · Deep Work
                    </p>
                    <h2 className="font-serif text-[22px] sm:text-[28px] font-normal text-foreground leading-[1.2]">
                      Astro-Harmonic
                      <br />
                      <em className="italic">Analysis</em>
                    </h2>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="font-serif text-[28px] font-normal text-gold leading-none block">$197</span>
                    <span className="text-[10px] text-muted-foreground tracking-[0.1em] block mt-1">75 – 90 min</span>
                  </div>
                </div>

                <div className="w-full h-px bg-border my-6" />

                <p className="text-[14.5px] text-muted-foreground leading-[1.8] mb-7">
                  Michael maps your full natal chart against the harmonic frequency architecture embedded in your birth
                  data — then translates it into sound. You receive an algorithmically generated quantumelodic
                  composition from your chart, a written report, and a full session recording. The most comprehensive
                  single-session work available.
                </p>

                <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">
                  What's included
                </p>
                <ul className="list-none mb-9 flex flex-col gap-2.5">
                  {[
                    "Full natal chart reading with harmonic layer analysis",
                    "Algorithm-generated quantumelodic composition from your chart",
                    "Written report — yours to keep",
                    "Full session recording",
                    "Lunar arc overview for the current cycle",
                  ].map((item) => (
                    <li key={item} className="text-[13.5px] text-muted-foreground flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-[7px]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={SQUARE_HARMONIC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[11px] font-medium tracking-[0.25em] uppercase border border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300"
                >
                  Book Your Analysis
                </a>
              </div>
            </article>

            {/* ── TIER 3: Hand-Penned Composition Upgrade ── */}
            <article
              className="rounded-sm overflow-hidden group hover:border-gold/50 transition-colors duration-400 animate-fade-in [animation-delay:300ms] border border-border"
              style={{ background: "linear-gradient(135deg, hsl(0 0% 5.5%) 0%, hsl(30 8% 6%) 100%)" }}
            >
              <div className="h-0.5 w-full bg-gradient-to-r from-gold via-[#e8c890] to-transparent" />
              <div className="p-8 sm:p-10 lg:px-11 lg:py-10 relative">
                {/* Gold glow */}
                <div
                  className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at top right, hsl(37 52% 61% / 0.18), transparent 70%)",
                  }}
                />

                <div className="inline-flex items-center gap-[7px] text-[10px] font-normal tracking-[0.15em] uppercase text-muted-foreground mb-5">
                  <span className="w-[5px] h-[5px] rounded-full bg-gold animate-pulse" />2 – 3 clients per month
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6 mb-7">
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-muted-foreground/50 mb-2">
                      Tier III · The Commission
                    </p>
                    <h2 className="font-serif text-[22px] sm:text-[28px] font-normal text-foreground leading-[1.2]">
                      Your Personal
                      <br />
                      <em className="italic">Étude</em>
                    </h2>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="font-serif text-[28px] font-normal text-gold leading-none block">$800</span>
                    <span className="text-[10px] text-muted-foreground tracking-[0.1em] block mt-1">
                      2-week delivery
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-border my-6" />

                <p className="text-[14.5px] text-muted-foreground leading-[1.8] mb-7">
                  Everything in the Astro-Harmonic Analysis — elevated. Michael hand-writes an original solo piano étude
                  composed directly from your natal chart. Every note has a reason. Every reason is yours.
                  Professionally recorded and mastered, delivered within two weeks of your session — paired with an MP3
                  reading that lassoes the composition's meaning and provides further harmonic insight.
                </p>

                <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">
                  What's included
                </p>
                <ul className="list-none mb-9 flex flex-col gap-2.5">
                  {[
                    "Full Cosmic Calibration session ($197 value included)",
                    "Original hand-penned solo piano étude from your natal chart",
                    "Professionally recorded & mastered audio (WAV + MP3)",
                    "MP3 reading — Michael walks through the composition's meaning",
                    "Full release rights — publish, share, use freely",
                    "Liner notes explaining the compositional logic",
                    "Delivered within 2 weeks of your live session",
                  ].map((item) => (
                    <li key={item} className="text-[13.5px] text-muted-foreground flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-[7px]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={COMPOSE_EMAIL}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[11px] font-medium tracking-[0.25em] uppercase bg-gold border border-gold text-background hover:bg-[#e8c890] hover:border-[#e8c890] transition-all duration-300"
                >
                  Apply for a Commission
                </a>
              </div>
            </article>
          </div>

          {/* Funnel note */}
          <div className="text-center py-14 lg:py-20 border-t border-border">
            <p className="font-serif text-lg italic text-muted-foreground leading-[1.75] max-w-[480px] mx-auto mb-5">
              "Most clients begin with a reading and return for the analysis. A few commission the composition. All of
              them leave knowing something about themselves they did not arrive with."
            </p>
            <p className="text-xs text-muted-foreground/50 tracking-[0.1em]">— Michael Anticoli, Moontuner</p>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
