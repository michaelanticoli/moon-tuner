import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionDivider } from "@/components/services/SectionDivider";
import michaelPortrait from "@/assets/michael-portrait-2.jpeg";
import moontunerLogo from "@/assets/moontuner-logo.png";

const SQUARE_TAROT = "https://book.squareup.com/appointments/gxlg47soy9h2pg/location/LT09Q7KSGAF98/services/SWPXX34N2NRJTB6ZGFC7OEKR";
const SQUARE_HARMONIC = "https://book.squareup.com/appointments/gxlg47soy9h2pg/location/LT09Q7KSGAF98/services/EE55PYXPCRZE6GQPDT4Y7IOL";
const LUNAR_REPORT_LINK = "https://buy.stripe.com/4gMcN4asS9AS0Qf0bT2Ji01";
const COMPOSITION_SITE = "https://magical-frangollo-0633f7.netlify.app";
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

function CTAButton({ href, label, variant = "outline", color = "accent" }: {
  href: string; label: string; variant?: "outline" | "filled"; color?: string;
}) {
  const base = "inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300";
  const styles = variant === "filled"
    ? `bg-gold border border-gold text-background hover:bg-[#e8c890] hover:border-[#e8c890]`
    : color === "gold"
      ? `border border-gold text-gold hover:bg-gold hover:text-background`
      : `border border-accent text-accent hover:bg-accent hover:text-background`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      {label}
    </a>
  );
}

export default function Services() {
  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen bg-background relative">
        {/* Grain overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 max-w-[860px] mx-auto px-6">
          {/* Header */}
          <header className="pt-24 lg:pt-32 pb-16 lg:pb-20 text-center">
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-accent mb-5">
              Work With Michael
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] text-foreground mb-5">
              Your chart has a frequency.<br />
              <em className="italic text-gold">Michael finds it.</em>
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-[500px] mx-auto leading-[1.75]">
              Reports, sessions, subscriptions, and commissions — each one deeper
              than the last. All of them begin with your birth data and end with
              something you can use.
            </p>

            {/* Portrait + Logo */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <img
                src={michaelPortrait}
                alt="Michael Anticoli — Moontuner"
                className="w-20 h-20 rounded-full object-cover border-2 border-border"
              />
              <img
                src={moontunerLogo}
                alt="Moontuner"
                className="h-10 opacity-60"
              />
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-border to-transparent mx-auto mt-14" />
          </header>

          {/* ═══════════════════════════════════════════════
              SERVICE LISTINGS
          ═══════════════════════════════════════════════ */}
          <div className="pb-24 lg:pb-32 flex flex-col gap-0.5">

            {/* ── Digital Reports ── */}
            <SectionDivider label="Digital Reports · Instant Delivery" />

            {/* 1. Lunar Arc Report — $17 */}
            <ServiceCard
              tier="Report · Instant"
              title="Lunar Arc"
              titleItalic="Map Report"
              price="$17"
              priceNote="Instant delivery"
              accentColor="accent"
              description="A personalised 12-month lunar map generated from your natal chart. Power days, peak windows, your dominant solfeggio frequency, and a full natal-chart CSV — delivered the moment you pay."
              includes={[
                "12-month Power Day grid with scoring",
                "Natal Signature analysis — Archetype, Somatic Zone, Solfeggio",
                "24-column Natal Chart CSV download",
                "Personalised with your name and birth data",
              ]}
            >
              <CTAButton href={LUNAR_REPORT_LINK} label="Get Your Lunar Map" />
            </ServiceCard>

            {/* 2. Astro-Harmonic Natal Analysis — $47 */}
            <ServiceCard
              tier="Report · Instant"
              title="Astro-Harmonic"
              titleItalic="Natal Analysis"
              price="$47"
              priceNote="Instant delivery"
              accentColor="accent"
              description="Your natal chart translated into musical structure. Every planetary position, every angle, every harmonic relationship mapped to its corresponding frequency and interval. A complete sonic portrait of the chart you were born into — generated algorithmically, yours permanently."
              includes={[
                "Full natal chart-to-frequency translation",
                "Planetary harmonic map — every placement sonified",
                "Your chart's dominant key, mode, and tonal centre",
                "Chord structure derived from your natal aspects",
                "Interactive report delivered instantly after payment",
              ]}
            >
              <div className="flex flex-col gap-4">
                <div
                  ref={(el) => {
                    if (el && !el.querySelector('stripe-buy-button')) {
                      const btn = document.createElement('stripe-buy-button');
                      btn.setAttribute('buy-button-id', 'buy_btn_1TFpydApODHiQWcAQfv4H4OW');
                      btn.setAttribute('publishable-key', 'pk_live_51SxJqyApODHiQWcAhl9OKfJWuz3LWVFJIl8EIFMNlnMK4nJ3dhAg1j0ddErIcTA7b1LHtR0ROAMgBwzeH6b2Jk2f00kokUjT1U');
                      el.appendChild(btn);
                      sessionStorage.setItem('qm_source', 'moontuner');
                    }
                  }}
                />
                <span className="text-[11.5px] text-muted-foreground tracking-[0.05em]">
                  The algorithm that powers the $777 composition
                </span>
              </div>
            </ServiceCard>

            {/* ── Subscriptions ── */}
            <SectionDivider label="Subscriptions · Ongoing Access" />

            {/* 3. Academy of Phasecraft — $17/mo */}
            <ServiceCard
              tier="Subscription · Monthly"
              title="Academy of"
              titleItalic="Phasecraft"
              price="$17/mo"
              priceNote="Cancel anytime"
              accentColor="accent"
              description="The structured curriculum from foundations to full lunar fluency. 14-day arc methodology, phase-sign combinations, ritual frameworks, and workbook integration — delivered as an ongoing educational experience."
              includes={[
                "Full curriculum access — foundations to mastery",
                "14-day arc methodology and daily rituals",
                "96 phase-sign combination breakdowns",
                "Progress tracking and assessments",
                "New content added monthly",
              ]}
            >
              <CTAButton href="/school" label="Explore the Academy" />
            </ServiceCard>

            {/* 4. Lunar Cipher Calendar — $27 one-time */}
            <ServiceCard
              tier="Tool · Full Year"
              title="Lunar Cipher"
              titleItalic="Calendar 2026"
              price="$27"
              priceNote="Full year access"
              accentColor="accent"
              description="Daily lunar intelligence for all of 2026 — phase, sign, degree, aspects, void-of-course windows, and planetary ingresses. Your personal astronomical command centre, parsed from professional ephemeris data."
              includes={[
                "365 days of precise lunar data",
                "Daily atmosphere readings and energy types",
                "Void-of-course periods with exact timing",
                "Planetary ingresses and stations",
                "Eclipse and cycle context overlays",
              ]}
            >
              <CTAButton href="/lunar-cipher" label="Preview the Cipher" />
            </ServiceCard>

            {/* 5. Lunar Chaperone — Free preview + $97 full */}
            <ServiceCard
              tier="Program · Guided Journey"
              title="Lunar Chaperone"
              titleItalic="Workbook Series"
              price="Free Preview"
              priceNote="Full access: $97"
              accentColor="accent"
              description="26 workbooks walking beside you through every archetypal lunar transition. Each one covers a sign-to-sign journey with body system correlations, daily rituals, and integration prompts. Preview any workbook free — unlock the full series for lifetime access."
              includes={[
                "26 workbooks — 12 waxing, 12 waning, 2 eclipse portals",
                "Sign-to-sign transition guides with body correlations",
                "Daily rituals and journal prompts for each phase",
                "Non-linear entry — start wherever the Moon is now",
                "Lifetime access once unlocked",
              ]}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <CTAButton href="/workbooks" label="Preview Workbooks" />
                <span className="text-[11.5px] text-muted-foreground tracking-[0.05em]">
                  $97 for lifetime full access
                </span>
              </div>
            </ServiceCard>

            {/* ── Live Sessions ── */}
            <SectionDivider label="Live Sessions · Booked with Michael" />

            {/* 6. Tarot Reading — $45–$95 */}
            <ServiceCard
              tier="Tier I · Entry Point"
              title="Tarot Reading"
              price="$45 – $95"
              priceNote="30 or 60 min"
              accentColor="accent"
              description="A direct, intuitive session grounded in your current lunar phase and the specific question you're carrying. Michael reads the cards as a live instrument — not a script. You leave with clarity, not just symbolism."
            >
              <div>
                <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">
                  Choose your session
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mb-9">
                  <a href={SQUARE_TAROT} target="_blank" rel="noopener noreferrer"
                    className="block bg-secondary border border-border rounded-sm p-[18px_20px] hover:border-accent/40 hover:bg-accent/[0.08] transition-all duration-300 no-underline">
                    <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 block mb-1">Single Draw</span>
                    <span className="font-serif text-base text-foreground block mb-2">The Pull</span>
                    <span className="text-[11.5px] text-muted-foreground flex gap-3">
                      <span>30 min</span>
                      <span className="text-accent font-medium">$45</span>
                    </span>
                  </a>
                  <a href={SQUARE_TAROT} target="_blank" rel="noopener noreferrer"
                    className="block bg-secondary border border-border rounded-sm p-[18px_20px] hover:border-accent/40 hover:bg-accent/[0.08] transition-all duration-300 no-underline">
                    <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 block mb-1">Full Spread</span>
                    <span className="font-serif text-base text-foreground block mb-2">The Deep Read</span>
                    <span className="text-[11.5px] text-muted-foreground flex gap-3">
                      <span>60 min</span>
                      <span className="text-accent font-medium">$95</span>
                    </span>
                  </a>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <CTAButton href={SQUARE_TAROT} label="Book a Reading" />
                  <span className="text-[11.5px] text-muted-foreground tracking-[0.05em]">Most people start here</span>
                </div>
              </div>
            </ServiceCard>

            {/* 7. Astro-Harmonic Analysis — $197 */}
            <ServiceCard
              tier="Tier II · Deep Work"
              title="Astro-Harmonic"
              titleItalic="Analysis"
              price="$197"
              priceNote="75 – 90 min"
              accentColor="accent"
              description="Michael maps your full natal chart against the harmonic frequency architecture embedded in your birth data — then translates it into sound. You receive an algorithmically generated quantumelodic composition from your chart, a written report, and a full session recording. The most comprehensive single-session work available."
              includes={[
                "Full natal chart reading with harmonic layer analysis",
                "Algorithm-generated quantumelodic composition from your chart",
                "Written report — yours to keep",
                "Full session recording",
                "Lunar arc overview for the current cycle",
              ]}
            >
              <CTAButton href={SQUARE_HARMONIC} label="Book Your Analysis" color="gold" />
            </ServiceCard>

            {/* 8. Original Piano Étude — $777 */}
            <article
              className="rounded-sm overflow-hidden group hover:border-gold/50 transition-colors duration-400 animate-fade-in border border-border"
              style={{ background: "linear-gradient(135deg, hsl(0 0% 5.5%) 0%, hsl(30 8% 6%) 100%)" }}
            >
              <div className="h-0.5 w-full bg-gradient-to-r from-gold via-[#e8c890] to-transparent" />
              <div className="p-8 sm:p-10 lg:px-11 lg:py-10 relative">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top right, hsl(37 52% 61% / 0.18), transparent 70%)" }} />

                <div className="inline-flex items-center gap-[7px] text-[10px] font-normal tracking-[0.15em] uppercase text-muted-foreground mb-5">
                  <span className="w-[5px] h-[5px] rounded-full bg-gold animate-pulse" />
                  2 – 3 clients per month
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6 mb-7">
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-muted-foreground/50 mb-2">
                      Tier III · The Commission
                    </p>
                    <h2 className="font-serif text-[22px] sm:text-[28px] font-normal text-foreground leading-[1.2]">
                      Original Piano<br /><em className="italic">Étude</em>
                    </h2>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="font-serif text-[28px] font-normal text-gold leading-none block">$777</span>
                    <span className="text-[10px] text-muted-foreground tracking-[0.1em] block mt-1">2-week delivery</span>
                  </div>
                </div>

                <div className="w-full h-px bg-border my-6" />

                <p className="text-[14.5px] text-muted-foreground leading-[1.8] mb-7">
                  Everything in the Astro-Harmonic Analysis — elevated. Michael
                  hand-writes an original solo piano étude composed directly from
                  your natal chart. Every note has a reason. Every reason is yours.
                  Professionally recorded and mastered, delivered within two weeks
                  of your session — paired with an MP3 reading that lassoes the
                  composition's meaning and provides further harmonic insight.
                </p>

                <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">What's included</p>
                <ul className="list-none mb-9 flex flex-col gap-2.5">
                  {[
                    "Full Astro-Harmonic Analysis session ($197 value included)",
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

                <div className="flex items-center gap-4 flex-wrap">
                  <a href={COMPOSE_EMAIL}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[11px] font-medium tracking-[0.25em] uppercase bg-gold border border-gold text-background hover:bg-[#e8c890] hover:border-[#e8c890] transition-all duration-300">
                    Apply for a Commission
                  </a>
                  <a href={COMPOSITION_SITE} target="_blank" rel="noopener noreferrer"
                    className="text-[11.5px] text-gold/70 hover:text-gold tracking-[0.05em] transition-colors underline underline-offset-4">
                    Hear compositions →
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Funnel note */}
          <div className="text-center py-14 lg:py-20 border-t border-border">
            <p className="font-serif text-lg italic text-muted-foreground leading-[1.75] max-w-[480px] mx-auto mb-5">
              "Most clients begin with a reading and return for the analysis.
              A few commission the composition. All of them leave knowing
              something about themselves they did not arrive with."
            </p>
            <p className="text-xs text-muted-foreground/50 tracking-[0.1em]">
              — Michael Anticoli, Moontuner
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
