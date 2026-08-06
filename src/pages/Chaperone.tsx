import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import {
  ELEMENT_HEX,
  SIGNS,
  WORKBOOKS,
  resolveWorkbook,
  type Workbook,
} from "@/data/chaperoneCanon";

const PROGRAM_URL = "https://moontuner-chaperone.vercel.app/";

const STEPS = [
  {
    n: "01",
    label: "Locate",
    body:
      "Find where the sky actually is. The program opens on the half-cycle currently running overhead — no start date, no catching up.",
  },
  {
    n: "02",
    label: "Read",
    body:
      "Each workbook opens with its journey, element shift, and the single question that half-cycle is asking of you.",
  },
  {
    n: "03",
    label: "Mark",
    body:
      "Set one intention at the opening lunation. Written, dated, specific enough to be checked against later.",
  },
  {
    n: "04",
    label: "Work",
    body:
      "Fourteen days of short daily entries — body, resistance, evidence. Ten minutes, not an hour.",
  },
  {
    n: "05",
    label: "Close",
    body:
      "At the closing lunation you review, name what moved, and release the rest. The next workbook begins the same day.",
  },
] as const;

const INSIDE = [
  { icon: Compass, title: "Journey Map", body: "The exact lunation pair, sign axis, and element shift the half-cycle travels." },
  { icon: Sparkles, title: "Core Prompt", body: "One question, carried for fourteen days rather than answered in five minutes." },
  { icon: Moon, title: "Somatic Anchor", body: "The body region each sign governs, with a practice for holding attention there." },
  { icon: BookOpen, title: "Daily Pages", body: "Fourteen dated entries with a repeating structure so patterns become visible across cycles." },
  { icon: Sun, title: "Correspondences", body: "Element, modality, drive, and the 'I' statement that sets the tone of the arc." },
  { icon: ArrowRight, title: "Handoff", body: "A closing page that names the next workbook, so the loop never breaks." },
];

function WorkbookCard({ w, live }: { w: Workbook; live: boolean }) {
  const startEl = SIGNS[w.start].element;
  const endEl = SIGNS[w.end].element;
  return (
    <article
      className={`relative border p-6 transition-colors ${
        live
          ? "border-accent bg-accent/5"
          : "border-border bg-muted/20 hover:border-muted-foreground/40"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, ${ELEMENT_HEX[startEl]}, ${ELEMENT_HEX[endEl]})`,
        }}
        aria-hidden
      />
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {w.n} of {String(WORKBOOKS.length).padStart(2, "0")}
        </span>
        <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
          {w.waxing ? "Waxing" : "Waning"}
        </span>
      </div>

      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-2xl leading-none" aria-hidden>
          {SIGNS[w.start].glyph}
        </span>
        <span className="text-muted-foreground text-sm">→</span>
        <span className="text-2xl leading-none" aria-hidden>
          {SIGNS[w.end].glyph}
        </span>
      </div>

      <h3 className="font-serif text-xl mb-2">{w.title}</h3>
      <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-4">
        {w.journey}
      </p>
      <p className="text-sm text-muted-foreground mb-4">{w.blurb}</p>
      <p className="text-sm border-l border-border pl-4 italic text-foreground/80">
        {w.prompt}
      </p>

      <div className="mt-5 flex items-center justify-between text-xs tracking-[0.12em] uppercase text-muted-foreground">
        <span>{w.elementShift}</span>
        {w.isEclipse && <span className="text-accent">Eclipse charge</span>}
      </div>

      {live && (
        <p className="mt-4 text-xs tracking-[0.2em] uppercase text-accent">
          Running now
        </p>
      )}
    </article>
  );
}

export default function Chaperone() {
  const sky = useMemo(() => resolveWorkbook(new Date()), []);
  const [filter, setFilter] = useState<"all" | "waxing" | "waning">("all");

  const list = WORKBOOKS.filter((w) =>
    filter === "all" ? true : filter === "waxing" ? w.waxing : !w.waxing
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="The Lunar Chaperone Program | Half-Cycle Workbooks"
        description="A continuous workbook system that walks every New Moon to Full Moon arc and every Full Moon to New Moon return. Start on whatever half-cycle the sky is already running."
        canonical="/chaperone"
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-32 pb-20 lg:pt-40 max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          The Lunar Chaperone
        </p>
        <h1 className="font-serif text-4xl lg:text-6xl leading-tight mb-8 max-w-4xl">
          A continuous loop of half-cycles. One lifetime of timing.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10">
          Every New Moon opens a half-cycle that closes at the opposite Full
          Moon. Every Full Moon opens the return. The Chaperone gives each of
          those halves its own workbook — {WORKBOOKS.length} in all, gap-free
          and cyclic, so there is never a moment without a page to be on.
        </p>

        {/* Live position */}
        <div className="border border-accent/40 bg-accent/5 p-6 lg:p-8 mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Where the sky is right now
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl mb-2">
            {sky.workbook.n} · {sky.workbook.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {sky.workbook.journey} · Moon in {SIGNS[sky.moonSign].name} ·{" "}
            {Math.round(sky.illumination * 100)}% illuminated ·{" "}
            {sky.waxing ? "waxing" : "waning"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">
              Enter the Program
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/workbooks">Browse the Workbooks</Link>
          </Button>
        </div>
      </section>

      {/* Flow */}
      <section className="px-6 lg:px-12 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            The Flow
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-12 max-w-2xl">
            Five moves, repeated every fourteen days.
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border border border-border">
            {STEPS.map((s) => (
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

      {/* Inside each workbook */}
      <section className="px-6 lg:px-12 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Inside Each Workbook
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-12 max-w-2xl">
            Same structure, every half-cycle. That is what makes the pattern
            readable.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIDE.map(({ icon: Icon, title, body }) => (
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

      {/* Full sequence */}
      <section className="px-6 lg:px-12 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                The Full Sequence
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl max-w-xl">
                Every half-cycle in the loop.
              </h2>
            </div>
            <div className="flex gap-2">
              {(["all", "waxing", "waning"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
                    filter === f
                      ? "border-accent text-accent"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((w) => (
              <WorkbookCard
                key={w.n}
                w={w}
                live={w.n === sky.workbook.n}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-5xl mb-6">
            Start where you are.
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            No cohort, no calendar to catch up on. Open the workbook the sky is
            already running and take the first page tonight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">
                Enter the Program
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/lunar-chaperone">See the Full Chaperone</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
