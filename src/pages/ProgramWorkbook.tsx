import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getWorkbook,
  WORKBOOKS,
  SIGNS,
  resolveWorkbook,
} from "@/data/chaperoneCanon";

export default function ProgramWorkbook() {
  const { n } = useParams<{ n: string }>();
  const padded = (n ?? "").padStart(2, "0");
  const workbook = getWorkbook(padded);
  const sky = useMemo(() => resolveWorkbook(new Date()), []);

  if (!workbook) return <Navigate to="/program" replace />;

  const start = SIGNS[workbook.start];
  const end = SIGNS[workbook.end];
  const prev = WORKBOOKS[(workbook.sequence + 22) % 24];
  const next = WORKBOOKS[workbook.sequence % 24];
  const isLive = workbook.n === sky.workbook.n;

  const arc = workbook.waxing
    ? [
        ["Open", `Name one thing at the ${start.name} New Moon. A verb and a date, nothing more.`],
        ["Gather", `Find what the intention actually requires. ${start.drive} is the mode here.`],
        ["Decide", "At the square, make one move that costs something and cannot easily be undone."],
        ["Refine", "Rehearse privately. Fix only what breaks under someone else's attention."],
        ["Show", `Bring it into the ${end.name} Full Moon light and let it be seen.`],
      ]
    : [
        ["Witness", `Everything is lit at the ${start.name} Full Moon. Record what became visible.`],
        ["Share", "Teach one thing from the half just finished, out loud, to one person."],
        ["Release", "At the square, cancel or close one thing you are maintaining out of habit."],
        ["Rest", `Let ${end.drive} go quiet. Do nothing on purpose for two days.`],
        ["Seal", `Review the whole half on paper before the ${end.name} New Moon.`],
      ];

  return (
    <PageTransition>
      <SEOHead
        title={`${workbook.title} — Workbook ${workbook.n} | Lunar Workbook Program`}
        description={`${workbook.journey}. ${workbook.blurb}`}
        canonical={`/program/workbook/${workbook.n}`}
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          <header className="pt-28 lg:pt-40 pb-12">
            <div className="container mx-auto px-6 lg:px-12">
              <Link
                to="/program"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> The canon
              </Link>

              <div className="mt-8 flex flex-wrap items-baseline gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-accent">
                  Workbook {workbook.n} of 24
                </span>
                {isLive && (
                  <span className="text-[10px] uppercase tracking-[0.2em] border border-accent/50 text-accent px-3 py-1">
                    Live tonight
                  </span>
                )}
                {workbook.isEclipse && (
                  <span className="text-[10px] uppercase tracking-[0.2em] border border-border text-muted-foreground px-3 py-1">
                    Eclipse charge
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-light text-foreground mt-5 mb-4">
                {workbook.title}
              </h1>
              <p className="text-lg text-muted-foreground">{workbook.journey}</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {workbook.elementShift} · {workbook.waxing ? "Waxing half" : "Waning half"}
              </p>
            </div>
          </header>

          <section className="border-t border-border py-12 lg:py-16">
            <div className="container mx-auto px-6 lg:px-12 grid gap-10 lg:grid-cols-[2fr_1fr] max-w-6xl">
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-4">
                  The reading
                </h2>
                <p className="text-foreground/85 leading-relaxed text-lg">{workbook.blurb}</p>

                <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 mt-12 mb-4">
                  The working prompt
                </h2>
                <p className="text-foreground/85 leading-relaxed border-l-2 border-accent pl-5">
                  {workbook.prompt}
                </p>

                <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 mt-12 mb-4">
                  The five movements
                </h2>
                <ol className="space-y-5">
                  {arc.map(([label, text], i) => (
                    <li key={label} className="border border-border bg-muted/10 p-5">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-2">
                        {String(i + 1).padStart(2, "0")} · {label}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="space-y-6">
                {[start, end].map((s, i) => (
                  <div key={s.code} className="border border-border p-6 bg-muted/10">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-3">
                      {i === 0 ? "Opens in" : "Closes in"}
                    </div>
                    <p className="font-serif text-2xl text-foreground">
                      {s.glyph} {s.name}
                    </p>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground/60">Element</dt>
                        <dd className="text-foreground/85">{s.element}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground/60">Modality</dt>
                        <dd className="text-foreground/85">{s.modality}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground/60">Body</dt>
                        <dd className="text-foreground/85">{s.body}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground/60">Drive</dt>
                        <dd className="text-foreground/85">{s.drive}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground/60">Statement</dt>
                        <dd className="text-foreground/85">{s.self}</dd>
                      </div>
                    </dl>
                  </div>
                ))}

                <div className="border border-accent/30 bg-accent/[0.04] p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Track this step, mark it complete, and keep your library in one
                    place.
                  </p>
                  <Link to="/program/portal" className="mt-4 inline-block">
                    <Button variant="gold" size="sm">
                      Open the portal <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <section className="border-t border-border py-10">
            <div className="container mx-auto px-6 lg:px-12 flex flex-wrap justify-between gap-6">
              <Link
                to={`/program/workbook/${prev.n}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← {prev.n} · {prev.title}
              </Link>
              <Link
                to={`/program/workbook/${next.n}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {next.n} · {next.title} →
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
