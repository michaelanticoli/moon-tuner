import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  FileText,
  Layers,
  Music,
  Orbit,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "contents", label: "Contents" },
  { id: "instrumentation", label: "Instrumentation" },
  { id: "chapters", label: "Chapters" },
  { id: "process", label: "Process" },
  { id: "order", label: "Order" },
] as const;

const CONTENTS = [
  { icon: Sparkles, title: "Natal Reference", body: "Sun, Moon, Ascendant, every planet, node, and angle written as a working reference rather than a forecast." },
  { icon: Music, title: "Harmonic Score", body: "Each placement mapped to an instrument, register, and tempo — your chart rendered as a listenable composition." },
  { icon: Layers, title: "Aspect Ledger", body: "Every major aspect with orb, plus what the tension or ease actually feels like in daily operation." },
  { icon: Orbit, title: "Lunar Signature", body: "Your natal Moon phase, sign, and body zone — the timing baseline the rest of the system reads against." },
  { icon: Compass, title: "Timing Appendix", body: "Which transits matter for your chart specifically, and how to recognise them without an ephemeris." },
  { icon: FileText, title: "Printable Compendium", body: "A designed PDF with a light-mode print layout, built to be marked up by hand and returned to for years." },
];

const INSTRUMENTS = [
  { body: "Sun", instrument: "Cello", role: "The through-line melody — what the piece is fundamentally about." },
  { body: "Moon", instrument: "Clarinet", role: "The inner voice — phrasing, breath, and how feeling actually moves." },
  { body: "Mercury", instrument: "Woodwinds", role: "Ornament and articulation — speed of thought made audible." },
  { body: "Venus", instrument: "Strings", role: "Harmony and warmth — what the piece finds beautiful." },
  { body: "Mars", instrument: "Brass", role: "Attack and drive — where the score pushes." },
  { body: "Jupiter", instrument: "Horns", role: "Scale and expansion — how wide the arrangement opens." },
  { body: "Saturn", instrument: "Timpani", role: "Structure and meter — the frame everything else plays inside." },
  { body: "Outer Planets", instrument: "Drones & Texture", role: "Generational undertone — the room the piece is played in." },
];

const CHAPTERS = [
  { n: "I", title: "The Core Triad", body: "Sun, Moon, and Ascendant read together — identity, interior, and interface. The three notes the rest of the chart harmonises with." },
  { n: "II", title: "The Personal Planets", body: "Mercury, Venus, and Mars placement by sign and house, with the specific habits each generates." },
  { n: "III", title: "Structure & Expansion", body: "Jupiter and Saturn as the pair that sets your appetite and your discipline — where you overreach and where you hold." },
  { n: "IV", title: "The Slow Movement", body: "Uranus, Neptune, and Pluto by house — the long, quiet rewriting happening underneath the visible life." },
  { n: "V", title: "The Aspect Web", body: "Conjunctions, squares, trines, oppositions and sextiles with orbs, ranked by how loudly each one plays." },
  { n: "VI", title: "Lunar Baseline", body: "Natal Moon phase and sign, mapped to the eight-phase system so your daily timing has a home reading." },
  { n: "VII", title: "The Score", body: "The full harmonic translation — instrumentation, key centre, tempo, and the recorded composition of your chart." },
  { n: "VIII", title: "Working Notes", body: "Blank, structured pages for observation over time. The compendium is meant to be written in." },
];

const PROCESS = [
  { n: "01", label: "Birth Data", body: "Date, exact time, and place. Time matters — it sets the Ascendant and every house cusp." },
  { n: "02", label: "Calculation", body: "Positions computed from a precision ephemeris, not an approximation table. Degrees and minutes, not just signs." },
  { n: "03", label: "Translation", body: "Placements and aspects mapped to instrumentation, key, and tempo by the harmonic engine." },
  { n: "04", label: "Composition", body: "The score is rendered as audio — your chart as a piece you can actually sit with." },
  { n: "05", label: "Compendium", body: "Everything typeset into the printable PDF, delivered with the audio and kept in your library." },
];

export default function Persona() {
  const [active, setActive] = useState<string>("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Persona Edition | Birth Chart Compendium & Harmonic Score"
        description="A complete natal reference translated into harmonic language: printable compendium, aspect ledger, lunar baseline, and your chart composed as a private audio score."
        canonical="/persona"
      />

      {/* Hero */}
      <section
        id="overview"
        className="scroll-mt-24 px-6 lg:px-12 pt-32 pb-20 lg:pt-40 max-w-6xl mx-auto"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Persona Edition
        </p>
        <h1 className="font-serif text-4xl lg:text-6xl leading-tight mb-8 max-w-4xl">
          Your birth chart, composed.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10">
          The Persona Edition Birth Chart Compendium is a complete reference of
          your natal map — every placement, aspect, and angle — written in plain
          language, typeset for print, and scored as a private composition. Not
          a prediction. A portrait you can read and hear.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/harmonic-profile">
              Generate Your Persona
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/natal-harmonic">Preview the Engine</Link>
          </Button>
        </div>
      </section>

      {/* Section nav */}
      <nav
        aria-label="Compendium sections"
        className="sticky top-0 z-30 border-y border-border bg-background/90 backdrop-blur"
      >
        <ul className="max-w-6xl mx-auto flex gap-6 overflow-x-auto px-6 lg:px-12 py-4">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`whitespace-nowrap text-xs tracking-[0.18em] uppercase transition-colors ${
                  active === s.id
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contents */}
      <section id="contents" className="scroll-mt-24 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            What's Inside
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-12 max-w-2xl">
            Six components, one bound reference.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTENTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-border bg-muted/20 p-6">
                <Icon className="w-5 h-5 text-accent mb-4" />
                <h3 className="text-sm tracking-[0.15em] uppercase mb-3">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instrumentation */}
      <section
        id="instrumentation"
        className="scroll-mt-24 px-6 lg:px-12 py-20 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Instrumentation
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 max-w-2xl">
            Every body in the chart has a voice.
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            The score follows a fixed assignment, so once you know the
            vocabulary you can hear a chart the way you'd read one.
          </p>
          <div className="border border-border divide-y divide-border">
            {INSTRUMENTS.map((row) => (
              <div
                key={row.body}
                className="grid grid-cols-1 sm:grid-cols-[10rem_10rem_1fr] gap-2 sm:gap-6 p-5"
              >
                <span className="text-sm tracking-[0.15em] uppercase">
                  {row.body}
                </span>
                <span className="text-sm text-accent">{row.instrument}</span>
                <span className="text-sm text-muted-foreground">{row.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section
        id="chapters"
        className="scroll-mt-24 px-6 lg:px-12 py-20 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Chapters
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-12 max-w-2xl">
            Eight movements, front to back.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {CHAPTERS.map((c) => (
              <article key={c.n} className="bg-background p-6 lg:p-8">
                <span className="block font-serif text-2xl text-accent mb-4">
                  {c.n}
                </span>
                <h3 className="font-serif text-xl mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        className="scroll-mt-24 px-6 lg:px-12 py-20 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Process
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-12 max-w-2xl">
            From birth data to bound score.
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border border border-border">
            {PROCESS.map((s) => (
              <li key={s.n} className="bg-background p-6">
                <span className="block text-xs tracking-[0.2em] text-accent mb-4">
                  {s.n}
                </span>
                <h3 className="text-sm tracking-[0.15em] uppercase mb-3">
                  {s.label}
                </h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Order */}
      <section
        id="order"
        className="scroll-mt-24 px-6 lg:px-12 py-24 border-t border-border"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-5xl mb-6">
            Hear your chart.
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Enter your birth data and the engine builds the compendium and the
            score together. Both stay in your library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/harmonic-profile">
                Generate Your Persona
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/quantumelodic">Listen to a Sample</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
