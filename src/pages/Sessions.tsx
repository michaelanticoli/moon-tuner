import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SQUARE_BOOKING_URL = "https://square.site/book/LT09Q7KSGAF98/moontuner";

const faqs = [
  {
    q: "Do I need to know anything about astrology or tarot before booking?",
    a: "No. Every session is designed for anyone — from complete beginners to people who've studied their chart for years. You'll receive clear explanations without assumptions about prior knowledge.",
  },
  {
    q: "How do I prepare?",
    a: "For tarot, bring a clear question or situation you're sitting with. For astro-harmonic sessions, have your birth date, time, and location ready. If you don't have an exact birth time, we can still work with what's available.",
  },
  {
    q: "What platform do sessions run on?",
    a: "Sessions are conducted via video call. You'll receive a link when your booking is confirmed through Square.",
  },
  {
    q: "Can I combine astrology and tarot in one session?",
    a: "Yes — book a Deep Spread or Chart Overview and mention at checkout that you'd like to integrate both. Michael will structure it accordingly.",
  },
  {
    q: "What is a chart composition?",
    a: "It's an original solo piano piece composed from your birth chart data — key, tempo, and harmonic structure all derived from your planetary placements. It's professionally produced, mixed, and mastered to release quality. You receive the track, a full compositional report, and a personal walkthrough.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/30 py-5">
      <button
        className="flex items-start justify-between w-full text-left gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors">
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
        )}
      </button>
      {open && (
        <p className="mt-3 font-sans text-sm text-muted-foreground leading-relaxed pr-8">
          {a}
        </p>
      )}
    </div>
  );
}

export default function Sessions() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        <Navigation />

        <main>
          {/* ── HERO ── */}
          <section className="relative pt-28 pb-20 px-6 lg:px-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="container mx-auto max-w-4xl relative z-10">
              <div className="mb-6">
                <span className="system-label">Sessions with Michael</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extralight text-foreground leading-[1.1] mb-6">
                Clarity, timing, and{" "}
                <span className="font-serif italic font-normal">
                  pattern recognition.
                </span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                Tarot readings, birth chart analysis, and harmonic composition — 
                grounded in real data, delivered with honesty.
              </p>
              <a
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="lg" className="gap-2">
                  View All &amp; Book
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </section>

          {/* ── TIER 1: TAROT ── */}
          <section className="py-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-4xl">
              <span className="system-label mb-3 block">Tier 1</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3 leading-tight">
                Tarot Reading
              </h2>
              <p className="font-serif italic text-lg text-muted-foreground mb-8">
                The cards don't predict your future. They clarify your present.
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl mb-12">
                Michael brings a holistic, conversation-led approach to every reading. 
                Tarot is the entry point, but nothing is off limits — astrology, numerology, 
                life patterns, timing, all of it is fair game if it serves you. You come 
                with a question or a season of life. You leave with clarity.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {/* Single Draw */}
                <div className="flex flex-col bg-card border border-border/40 rounded-xl p-6 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-lg font-light text-foreground">
                      Single Draw
                    </h3>
                    <span className="shrink-0 font-sans text-base font-medium text-accent">
                      $45
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mb-4">30 minutes</p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    One focused area. One spread. Direct, honest, actionable.
                  </p>
                  <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="gold-outline" size="sm" className="w-full gap-2 text-xs tracking-wide">
                      Book a Reading <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>

                {/* Deep Spread */}
                <div className="flex flex-col bg-card border border-border/40 rounded-xl p-6 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-lg font-light text-foreground">
                      Deep Spread
                    </h3>
                    <span className="shrink-0 font-sans text-base font-medium text-accent">
                      $95
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mb-4">60 minutes</p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    For the bigger questions. More cards, more conversation, more time 
                    to sit with what comes up.
                  </p>
                  <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="gold-outline" size="sm" className="w-full gap-2 text-xs tracking-wide">
                      Book a Reading <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── TIER 2: ASTRO-HARMONIC ── */}
          <section className="py-20 px-6 lg:px-12 bg-muted/10">
            <div className="container mx-auto max-w-4xl">
              <span className="system-label mb-3 block">Tier 2</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3 leading-tight">
                Astro-Harmonic Analysis
              </h2>
              <p className="font-serif italic text-lg text-muted-foreground mb-8">
                Your birth chart is a frequency. This session makes it audible.
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl mb-12">
                This is not a standard chart reading. Michael analyzes your birth chart through 
                both classical astrological interpretation and the harmonic, quantumelodic principles 
                he's spent years developing — the idea that every chart has a tonal signature, 
                a resonance that can be heard, not just described.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {/* Chart Overview — accessible entry */}
                <div className="flex flex-col bg-card border border-border/40 rounded-xl p-6 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-lg font-light text-foreground">
                      Chart Overview
                    </h3>
                    <span className="shrink-0 font-sans text-base font-medium text-accent">
                      $65
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mb-4">30 minutes</p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    A focused read of your natal chart's key patterns — placements, 
                    timing tendencies, and what's active right now. Clear and practical.
                  </p>
                  <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="gold-outline" size="sm" className="w-full gap-2 text-xs tracking-wide">
                      Book a Session <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>

                {/* Full Astro-Harmonic */}
                <div className="flex flex-col bg-card border border-accent/30 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 relative">
                  <span className="absolute -top-3 left-5 text-[10px] tracking-widest uppercase bg-accent text-background px-2.5 py-0.5 rounded-full font-sans font-medium">
                    Signature Session
                  </span>
                  <div className="flex items-start justify-between gap-4 mb-2 mt-1">
                    <h3 className="font-display text-lg font-light text-foreground">
                      Full Astro-Harmonic
                    </h3>
                    <span className="shrink-0 font-sans text-base font-medium text-accent">
                      $195
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mb-4">75–90 minutes</p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    Full chart interpretation with harmonic analysis. You'll discuss your 
                    chart in depth, then listen to the algorithmic composition generated 
                    directly from your chart's data — your unique harmonic output, rendered as music.
                  </p>
                  <ul className="font-sans text-xs text-muted-foreground space-y-1.5 mb-6">
                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">·</span> Full chart interpretation with harmonic analysis</li>
                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">·</span> Your personalized chart composition (audio file, yours to keep)</li>
                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">·</span> Written session report</li>
                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">·</span> Recording of the session</li>
                  </ul>
                  <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="gold-outline" size="sm" className="w-full gap-2 text-xs tracking-wide">
                      Book an Astro-Harmonic Session <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── TIER 3: CUSTOM COMPOSITION ── */}
          <section className="py-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-4xl">
              <span className="system-label mb-3 block">Tier 3</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3 leading-tight">
                Custom Chart Composition
              </h2>
              <p className="font-serif italic text-lg text-muted-foreground mb-8">
                A song written from your soul's blueprint.
              </p>

              <div className="max-w-2xl">
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  This is the most personal thing Michael offers — and one of the most 
                  personal things anyone can offer.
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  Using your natal chart as the score, Michael composes an original solo piano 
                  piece built around your chart's specific harmonic data: the key drawn from your 
                  dominant planetary energies, the tempo mapped to your lunar placements, the 
                  structure reflecting your elemental balance and aspects. Nothing is arbitrary. 
                  Everything has a reason, and every reason is documented.
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10">
                  The finished piece is produced, mixed, and mastered to professional radio 
                  standard. You can release it publicly under your name. Michael retains the copyright.
                </p>

                <div className="bg-card border border-border/40 rounded-xl p-8 mb-8">
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="font-display text-xl font-light text-foreground">
                      What's Included
                    </h3>
                    <div className="text-right">
                      <span className="font-sans text-2xl font-medium text-accent">From $800</span>
                      <p className="font-sans text-[10px] text-muted-foreground tracking-wider mt-1">
                        LIMITED — 2 TO 3 PER MONTH
                      </p>
                    </div>
                  </div>
                  <ul className="font-sans text-sm text-muted-foreground space-y-3 mb-8">
                    <li className="flex items-start gap-3"><span className="text-accent mt-0.5">·</span> Original solo piano composition based on your birth chart</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-0.5">·</span> Professional production, mixing, and mastering</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-0.5">·</span> Compositional report (key, tempo, structure + astrological reasoning)</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-0.5">·</span> Personal walkthrough recording with Michael</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-0.5">·</span> Full release rights (copyright retained by composer)</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-0.5">·</span> Delivery within 3–4 weeks</li>
                  </ul>
                  <a href={`mailto:michael@moontuner.xyz?subject=Custom%20Chart%20Composition%20Inquiry`}>
                    <Button variant="gold" size="lg" className="w-full gap-2">
                      Apply for a Custom Composition
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── BOOKING CTA ── */}
          <section className="py-24 px-6 lg:px-12 bg-muted/10">
            <div className="container mx-auto max-w-2xl text-center">
              <span className="system-label mb-6 block">Ready to Begin</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extralight text-foreground mb-5">
                Schedule your session{" "}
                <span className="font-serif italic font-normal">today</span>
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
                All sessions are booked through Square. Select your session type,
                choose a time, and receive a confirmation with everything you need.
              </p>
              <a
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="xl" className="gap-3 mx-auto">
                  Book a Session Now
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-2xl">
              <span className="system-label mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-10">
                Common questions
              </h2>
              <div>
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </section>

          {/* ── GO DEEPER ── */}
          <section className="py-16 px-6 lg:px-12 border-t border-border/20">
            <div className="container mx-auto max-w-3xl text-center">
              <h3 className="font-display text-2xl font-light text-foreground mb-4">
                This is just where it starts.
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
                Every session connects to a larger system. The Phasecraft Framework. 
                The Lunar Chaperone workbooks. If a pattern clicks or a question opens up — 
                there's a full body of work here to go deeper with. At your pace, on your cycle.
              </p>
              <a href="/">
                <Button variant="hero-outline" size="lg" className="gap-2">
                  Explore the Full System
                </Button>
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
