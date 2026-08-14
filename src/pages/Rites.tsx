import { useState } from "react";
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
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="text-white/60 hover:text-white"
          >
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
        <span className="text-[11px] uppercase tracking-[0.24em] text-primary/80">
          {rite.volume}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
          {rite.status === "launched" ? "Launched" : "In development"}
        </span>
      </div>

      <h2 className="mt-5 text-2xl md:text-3xl font-light text-white/90">
        {rite.title}
      </h2>
      <p className="mt-1 text-sm italic text-white/50">{rite.subtitle}</p>
      <p className="mt-4 text-sm leading-relaxed text-white/60">
        {rite.description}
      </p>

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

export default function Rites() {
  const [viewing, setViewing] = useState<{ src: string; title: string } | null>(null);

  return (
    <PageTransition>
      <SEOHead
        title="The Rites — MOONtuner Method Workbooks"
        description="Standalone MOONtuner Method rites: station-cycle workbooks for perception, timing, and arrival. Read online or download the print-ready PDFs."
        canonical="/rites"
      />
      <Navigation />

      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary/80">
            Moontuner Press
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-light text-white/95">
            The Rites
          </h1>
          <p className="mt-5 max-w-2xl text-white/55 leading-relaxed">
            A series of standalone working documents built on one chassis: a
            station cycle timed to the real lunar phase, worksheet fields that
            save themselves, and a dark editorial shell that prints clean. Each
            volume gets its own instrument face — glyph language, spine texture,
            and numbering are reinvented every time.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {rites.map((r) => (
              <RiteCard
                key={r.href}
                rite={r}
                onView={(rite) => setViewing({ src: rite.pdf!, title: rite.title })}
              />
            ))}
          </div>

          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Archived PDFs
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              Print-ready dark exports of each launched volume. Read them here or
              keep a copy.
            </p>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {archivePdfs.map((f) => (
                <li
                  key={f.href}
                  className="flex flex-wrap items-center justify-between gap-4 py-4"
                >
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

          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Series framework
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
              The build framework — what carries across volumes, what has to be
              reinvented, and the candidate volumes queued behind these two — is
              kept alongside the source files.
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
        <PdfViewer
          src={viewing.src}
          title={viewing.title}
          onClose={() => setViewing(null)}
        />
      )}

      <Footer />
    </PageTransition>
  );
}
