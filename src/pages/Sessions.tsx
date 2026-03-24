import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SQUARE_BOOKING_URL = "https://square.site/book/LT09Q7KSGAF98/moontuner";

const harmonicSessions = [
  {
    name: "Personal Harmonic Profile",
    duration: "60 min",
    price: "$99",
    description:
      "A comprehensive reading of your natal chart — your patterns, timing tendencies, and structural strengths. Ideal for those new to working with their chart or ready for a deep-dive overview.",
    tags: ["Birth chart analysis", "Natal astrology", "Personal timing"],
  },
  {
    name: "Harmonic Blueprint Session",
    duration: "45 min",
    price: "$75",
    description:
      "Focused on a specific area of life — career, relationships, transitions. We map the relevant planetary patterns and examine where you are in current cycles.",
    tags: ["Targeted reading", "Life area focus", "Cycle mapping"],
  },
  {
    name: "Resonance Mapping Session",
    duration: "20 min",
    price: "$35",
    description:
      "A fast, structured look at a single question or decision. Clear data, no filler. Great for when you need a quick read on timing or direction.",
    tags: ["Quick read", "Single question", "Timing guidance"],
  },
  {
    name: "Decision Timing Session",
    duration: "15 min",
    price: "$25",
    description:
      "Is now a good time? We look at current transits against your chart and give you a practical yes, no, or wait — with the reasoning behind it.",
    tags: ["Decision support", "Transit timing", "Practical guidance"],
  },
  {
    name: "Bandwidth Reset Mini",
    duration: "15 min",
    price: "$25",
    description:
      "A grounding check-in during a high-pressure or chaotic moment. We identify what's pulling on your energy and how to recalibrate.",
    tags: ["Check-in", "Recalibration", "Clarity session"],
  },
  {
    name: "Audio Insight Drop",
    duration: "24-hour delivery",
    price: "$20",
    description:
      "Submit your question and receive a personal audio reading delivered within 24 hours. No scheduling required — thoughtful, structured, and sent directly to you.",
    tags: ["Async reading", "No scheduling", "Audio delivery"],
  },
];

const tarotSessions = [
  {
    name: "Traditional Tarot Reading",
    duration: "45 min",
    price: "$55",
    description:
      "A full-spread reading covering your current situation, underlying patterns, and practical paths forward. Structured and clear — not vague.",
    tags: ["Full spread", "Pattern reading", "General guidance"],
  },
  {
    name: "Tarot for Decision-Making",
    duration: "30 min",
    price: "$40",
    description:
      "Bring a specific decision to the table. We use the cards to map out the variables, likely outcomes, and factors you may not be weighing clearly.",
    tags: ["Decision support", "Outcome mapping", "Clarity"],
  },
  {
    name: "Tarot for Career & Money",
    duration: "45 min",
    price: "$55",
    description:
      "Professional trajectory, financial timing, and structural opportunities. A practical reading focused on your work life and material direction.",
    tags: ["Career guidance", "Financial timing", "Opportunity mapping"],
  },
  {
    name: "Tarot for Relationships",
    duration: "45 min",
    price: "$55",
    description:
      "Examining a relationship dynamic — romantic, professional, or familial. Understand the underlying patterns, what's working, and what needs attention.",
    tags: ["Relationship patterns", "Dynamic mapping", "Interpersonal clarity"],
  },
];

const faqs = [
  {
    q: "Do I need to know anything about astrology before booking?",
    a: "No. Sessions are designed for anyone — from complete beginners to people who've studied their chart for years. You'll receive clear explanations without assumptions about prior knowledge.",
  },
  {
    q: "How do I prepare?",
    a: "For harmonic sessions, have your birth date, time, and location ready. If you don't have an exact birth time, we can still work with what's available. For tarot, bring a clear question or situation.",
  },
  {
    q: "What platform do sessions run on?",
    a: "Sessions are conducted via video call. You'll receive a link when your booking is confirmed through Square.",
  },
  {
    q: "Can I combine astrology and tarot in one session?",
    a: "Yes — book the Personal Harmonic Profile or Harmonic Blueprint Session and mention at checkout that you'd like to integrate tarot. We'll structure it accordingly.",
  },
];

function SessionCard({
  session,
}: {
  session: (typeof harmonicSessions)[0];
}) {
  return (
    <div className="group relative flex flex-col bg-card border border-border/40 rounded-xl p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display text-lg font-light text-foreground leading-snug">
          {session.name}
        </h3>
        {session.price && (
          <span className="shrink-0 font-sans text-base font-medium text-accent">
            {session.price}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="font-sans text-xs text-muted-foreground tracking-wide">
          {session.duration}
        </span>
      </div>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {session.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {session.tags.map((tag) => (
          <span
            key={tag}
            className="font-sans text-xs text-muted-foreground/70 bg-muted/40 border border-border/30 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <Button
          variant="gold-outline"
          size="sm"
          className="w-full gap-2 text-xs tracking-wide"
        >
          Book Session
          <ExternalLink className="w-3 h-3" />
        </Button>
      </a>
    </div>
  );
}

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
      {/* SEO meta — injected inline for this route */}
      <div className="min-h-screen bg-background relative">
        <Navigation />

        <main>
          {/* ── 1. HERO ── */}
          <section className="relative pt-28 pb-20 px-6 lg:px-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="container mx-auto max-w-4xl relative z-10">
              <div className="mb-6">
                <span className="system-label">One-on-One Sessions</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extralight text-foreground leading-[1.1] mb-6">
                Personal Harmonics &amp;{" "}
                <span className="font-serif italic font-normal">
                  Tarot Sessions
                </span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                Astrology readings, harmonic profile sessions, and tarot
                guidance for clarity, timing, and real-life decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={SQUARE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                    Book a Session
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#services">
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    View Services
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* ── 2. PERSONAL HARMONICS SESSIONS ── */}
          <section id="services" className="py-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-6xl">
              <div className="mb-3">
                <span className="system-label">Astrology & Natal Chart</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-3">
                Personal Harmonics Sessions
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xl mb-12">
                Natal chart readings and timing sessions rooted in your
                individual planetary structure. Practical, specific, and
                grounded in real astronomical data.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {harmonicSessions.map((s) => (
                  <SessionCard key={s.name} session={s} />
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. TAROT SESSIONS ── */}
          <section id="tarot" className="py-20 px-6 lg:px-12 bg-muted/10">
            <div className="container mx-auto max-w-6xl">
              <div className="mb-3">
                <span className="system-label">Symbolic Card Readings</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-3">
                Tarot Sessions
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xl mb-12">
                Structured tarot readings that map out patterns, decisions, and
                dynamics with clarity. Not prediction — perspective.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-4xl">
                {tarotSessions.map((s) => (
                  <SessionCard key={s.name} session={s} />
                ))}
              </div>
            </div>
          </section>

          {/* ── 4. PRIMARY BOOKING CTA ── */}
          <section className="py-24 px-6 lg:px-12 bg-muted/10">
            <div className="container mx-auto max-w-2xl text-center">
              <div className="mb-6">
                <span className="system-label">Ready to Begin</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extralight text-foreground mb-5">
                Schedule your session{" "}
                <span className="font-serif italic font-normal">today</span>
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
                All sessions are booked through Square. Select your session type,
                choose a time, and receive a confirmation with everything you
                need.
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
              <p className="mt-6 font-sans text-xs text-muted-foreground/60">
                Booking confirmation sent immediately · Secure payment via Square
              </p>
            </div>
          </section>

          {/* ── 6. FAQ ── */}
          <section className="py-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-2xl">
              <div className="mb-3">
                <span className="system-label">FAQ</span>
              </div>
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

          {/* ── 7. SEO FOOTER TEXT ── */}
          <section className="py-16 px-6 lg:px-12 border-t border-border/20">
            <div className="container mx-auto max-w-3xl">
              <div className="prose prose-sm prose-invert max-w-none">
                <h3 className="font-sans text-xs font-medium tracking-[0.15em] text-muted-foreground/50 uppercase mb-4">
                  About MoonTuner Sessions
                </h3>
                <p className="font-sans text-xs text-muted-foreground/40 leading-relaxed">
                  MoonTuner offers personal astrology readings and tarot sessions
                  for individuals seeking clarity on timing, decisions, and life
                  direction. Our{" "}
                  <strong className="text-muted-foreground/60">
                    birth chart analysis
                  </strong>{" "}
                  and{" "}
                  <strong className="text-muted-foreground/60">
                    astrology reading
                  </strong>{" "}
                  sessions are structured around your natal chart and current
                  planetary transits — practical tools for understanding where you
                  are in your cycles. Our{" "}
                  <strong className="text-muted-foreground/60">
                    tarot reading
                  </strong>{" "}
                  sessions provide symbolic perspective on relationships, career,
                  and{" "}
                  <strong className="text-muted-foreground/60">
                    decision timing
                  </strong>
                  . Sessions are available for individuals at any level of
                  familiarity with astrology or tarot. Book online through our
                  Square scheduling page.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
