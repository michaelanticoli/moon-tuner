import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { ExternalLink } from "lucide-react";

interface Rite {
  volume: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
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
    status: "launched",
  },
  {
    volume: "Volume II",
    title: "The Arrival Rite",
    subtitle: "On timing, thresholds, and getting there on purpose",
    description:
      "Eight positions on a clock dial rather than a lunar crescent — the same MOONtuner timing substrate, a different instrument face. Bring real numbers.",
    href: "/rites/the-arrival-rite.html",
    status: "launched",
  },
];

function RiteCard({ rite }: { rite: Rite }) {
  return (
    <a
      href={rite.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-white/10 rounded-sm p-8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25 transition-colors"
    >
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

      <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70 group-hover:text-white">
        Open the rite <ExternalLink className="w-3.5 h-3.5" />
      </span>
    </a>
  );
}

export default function Rites() {
  return (
    <PageTransition>
      <SEOHead
        title="The Rites — MOONtuner Method Workbooks"
        description="Standalone MOONtuner Method rites: station-cycle workbooks for perception, timing, and arrival. Dark editorial, print-ready, autosaving."
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
              <RiteCard key={r.href} rite={r} />
            ))}
          </div>

          <section className="mt-20 border-t border-white/10 pt-10">
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
                href="/rites/_archive/the-lens-rite.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lens Rite PDF
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

      <Footer />
    </PageTransition>
  );
}
