import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { ExternalLink, Download, Eye, X } from "lucide-react";

interface Rite {
  volume: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  pdf?: string;
  stations?: number;
  status: "launched" | "in-development";
}

const rites: Rite[] = [
  {
    volume: "Volume I",
    title: "The Lens Rite",
    subtitle: "How you see is a decision you keep making",
    description:
      "A station-cycle working on perception — what you focus on, what you filter out, and how to reset the frame. Self-contained, autosaving worksheet fields, print-ready.",
    href: "/rites/the-lens-rite.html",
    pdf: "/rites/_archive/the-lens-rite.pdf",
    status: "launched",
  },
  {
    volume: "Volume II",
    title: "The Arrival Rite",
    subtitle: "On timing, thresholds, and getting there on purpose",
    description:
      "Eight positions on a clock dial rather than a lunar crescent — the same MOONtuner timing substrate, a different instrument face. Bring real numbers.",
    href: "/rites/the-arrival-rite.html",
    pdf: "/rites/_archive/the-arrival-rite.pdf",
    status: "launched",
  },
];

interface WorkingRite {
  title: string;
  focus: string;
  description: string;
  stations: number;
  href: string;
}

const workingRites: WorkingRite[] = [
  {
    title: "The Sabotage Rite",
    focus: "Self-sabotage patterns and tripwires",
    description:
      "Names the moment the fuse gets lit, maps the tripwires you keep stepping on, and installs an interrupt you can actually reach for.",
    stations: 8,
    href: "/rites/series/the-sabotage-rite.html",
  },
  {
    title: "The Mirror Rite",
    focus: "Self-criticism and the inner critic",
    description:
      "Six stations that separate the critic's voice from your own, then re-tune what it is allowed to say and when.",
    stations: 6,
    href: "/rites/series/the-mirror-rite.html",
  },
  {
    title: "The Scar Rite",
    focus: "The trauma of critique and defensive architecture",
    description:
      "Works the structures you built after being cut down — what they protect, what they cost, and which ones can come down now.",
    stations: 7,
    href: "/rites/series/the-scar-rite.html",
  },
  {
    title: "The Foundation Rite",
    focus: "Belief in self and structural confidence",
    description:
      "Eight stations on load-bearing self-trust: what it rests on, where it's hollow, and how to pour something that holds.",
    stations: 8,
    href: "/rites/series/the-foundation-rite.html",
  },
  {
    title: "The Severance Rite",
    focus: "Cord cutting and dependency release",
    description:
      "A clean six-station cut — the tie, the terms, the ending, and the aftercare that keeps it ended.",
    stations: 6,
    href: "/rites/series/the-severance-rite.html",
  },
  {
    title: "The Seal Rite",
    focus: "Sealing, binding, and boundary architecture",
    description:
      "Five stations that set an edge and give it a shape: what passes, what doesn't, and how the seal announces itself.",
    stations: 5,
    href: "/rites/series/the-seal-rite.html",
  },
  {
    title: "The Forge Rite",
    focus: "Talisman and amulet creation",
    description:
      "Eight stations of making — selection, charge, naming, and the carry protocol for an object that has a job.",
    stations: 8,
    href: "/rites/series/the-forge-rite.html",
  },
  {
    title: "The Threshold Rite",
    focus: "Fear of beginning, and inertia",
    description:
      "Seven stations for the not-yet-started: the doorway, the weight against it, and the smallest true first move.",
    stations: 7,
    href: "/rites/series/the-threshold-rite.html",
  },
];

const codexEntries = [
  {
    title: "The Codex",
    subtitle: "Master integration — the capstone rite",
    description:
      "Twelve stations that gather every working rite into one arc. Run it once you've been through the behavioral rites; it reads what they left behind and binds it into a single notation.",
    href: "/rites/series/the-codex.html",
    stations: 12,
  },
  {
    title: "Codex Notation Reference",
    subtitle: "Appendix — the full notation specification",
    description:
      "The complete symbol set, station grammar, and marking conventions used across the series. Keep it open beside any rite.",
    href: "/rites/series/the-codex-notation-reference.html",
  },
];

const archivePdfs: { label: string; href: string }[] = [
  { label: "The Arrival Rite — PDF", href: "/rites/_archive/the-arrival-rite.pdf" },
  { label: "The Lens Rite — PDF", href: "/rites/_archive/the-lens-rite.pdf" },
];

async function downloadFile(href: string) {
  try {
    const res = await fetch(href);
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = href.split("/").pop() || "download.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } catch {
    window.open(href, "_blank", "noopener,noreferrer");
  }
}

function PdfViewer({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/10">
        <span className="text-xs uppercase tracking-[0.2em] text-white/70">{title}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => downloadFile(src)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/70 hover:text-white"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>
          <button onClick={onClose} aria-label="Close viewer" className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <iframe src={src} title={title} className="flex-1 w-full bg-neutral-900" />
    </div>
  );
}

function RiteCard({ rite, onView }: { rite: Rite; onView: (r: Rite) => void }) {
  return (
    <div className="group block border border-white/10 rounded-sm p-8 bg-white/[0.02] hover:border-white/25 transition-colors">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] uppercase tracking-[0.24em] text-primary/80">{rite.volume}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
          {rite.status === "launched" ? "Launched" : "In development"}
        </span>
      </div>

      <h3 className="mt-5 text-2xl md:text-3xl font-light text-white/90">{rite.title}</h3>
      <p className="mt-1 text-sm italic text-white/50">{rite.subtitle}</p>
      <p className="mt-4 text-sm leading-relaxed text-white/60">{rite.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em]">
        <a
          href={rite.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white"
        >
          Open the rite <ExternalLink className="w-3.5 h-3.5" />
        </a>
        {rite.pdf && (
          <>
            <button
              onClick={() => onView(rite)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white"
            >
              <Eye className="w-3.5 h-3.5" /> View PDF
            </button>
            <button
              onClick={() => downloadFile(rite.pdf!)}
              className="inline-flex items-center gap-2 text-primary/85 hover:text-primary"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function WorkingRiteCard({ rite }: { rite: WorkingRite }) {
  return (
    <a
      href={rite.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-white/10 rounded-sm p-6 bg-white/[0.02] hover:border-primary/40 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.22em] text-primary/75">
          {rite.stations} stations
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
      </div>
      <h3 className="mt-4 text-xl font-light text-white/90">{rite.title}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">{rite.focus}</p>
      <p className="mt-4 text-sm leading-relaxed text-white/55">{rite.description}</p>
    </a>
  );
}

export default function Rites() {
  const [viewing, setViewing] = useState<{ src: string; title: string } | null>(null);

  return (
    <PageTransition>
      <SEOHead
        title="The Rites — MOONtuner Method Workbooks"
        description="The full MOONtuner Rites catalog: two press volumes, eight behavioral working rites, and the twelve-station Codex capstone. Read online or download the print-ready PDFs."
        canonical="/rites"
      />
      <Navigation />

      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary/80">Moontuner Press</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-light text-white/95">The Rites</h1>
          <p className="mt-5 max-w-2xl text-white/55 leading-relaxed">
            A series of standalone working documents built on one chassis: a station
            cycle timed to the real lunar phase, worksheet fields that save
            themselves, and a dark editorial shell that prints clean. Each volume gets
            its own instrument face — glyph language, spine texture, and numbering are
            reinvented every time.
          </p>

          {/* Press volumes */}
          <section className="mt-16">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Press volumes
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {rites.map((r) => (
                <RiteCard
                  key={r.href}
                  rite={r}
                  onView={(rite) => setViewing({ src: rite.pdf!, title: rite.title })}
                />
              ))}
            </div>
          </section>

          {/* Working rites */}
          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Working Rites
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              Eight behavioral recalibrations. Each one opens on tonight's active
              station, holds what you write to your own device, and can be run again
              on the next turn of the cycle. Take them in any order — or in the order
              your life is asking for.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {workingRites.map((r) => (
                <WorkingRiteCard key={r.href} rite={r} />
              ))}
            </div>
          </section>

          {/* Codex */}
          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              The Codex
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              The capstone, plus the notation system the whole series is written in.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {codexEntries.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-primary/20 rounded-sm p-8 bg-primary/[0.03] hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-primary/80">
                      {c.stations ? `${c.stations} stations` : "Appendix"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <h3 className="mt-4 text-2xl font-light text-white/90">{c.title}</h3>
                  <p className="mt-1 text-sm italic text-white/50">{c.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{c.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Archived PDFs */}
          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Archived PDFs
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              Print-ready dark exports of each launched volume. Read them here or keep
              a copy.
            </p>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {archivePdfs.map((f) => (
                <li key={f.href} className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <span className="text-sm text-white/75">{f.label}</span>
                  <span className="flex items-center gap-5 text-xs uppercase tracking-[0.16em]">
                    <button
                      onClick={() => setViewing({ src: f.href, title: f.label })}
                      className="inline-flex items-center gap-2 text-white/70 hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                      onClick={() => downloadFile(f.href)}
                      className="inline-flex items-center gap-2 text-primary/85 hover:text-primary"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Where the rites sit */}
          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Where the rites sit
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              The rites are the practice layer. The{" "}
              <Link to="/school/curriculum" className="text-white/80 underline underline-offset-4">
                School curriculum
              </Link>{" "}
              is the theory behind them, and the{" "}
              <Link to="/lunar-chaperone" className="text-white/80 underline underline-offset-4">
                Lunar Chaperone
              </Link>{" "}
              carries both across every half-cycle of the year.
            </p>
          </section>

          {/* Series framework */}
          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Series framework
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              The build framework — what carries across volumes, what has to be
              reinvented, and the candidate volumes queued behind these — is kept
              alongside the source files.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em]">
              <a
                className="text-white/70 hover:text-white underline underline-offset-4"
                href="/rites/_archive/moontuner-rite-roadmap.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Volume roadmap
              </a>
              <a
                className="text-white/70 hover:text-white underline underline-offset-4"
                href="/rites/_archive/the-arrival-rite-webfonts.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arrival Rite (webfont build)
              </a>
            </div>
          </section>
        </div>
      </main>

      {viewing && (
        <PdfViewer src={viewing.src} title={viewing.title} onClose={() => setViewing(null)} />
      )}

      <Footer />
    </PageTransition>
  );
}
