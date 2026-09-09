import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon } from "lucide-react";
import { WORKBOOKS, SIGNS, resolveWorkbook } from "@/data/chaperoneCanon";

type Filter = "all" | "waxing" | "waning";

export default function Program() {
  const [filter, setFilter] = useState<Filter>("all");
  const sky = useMemo(() => resolveWorkbook(new Date()), []);

  const shown = WORKBOOKS.filter((w) =>
    filter === "all" ? true : filter === "waxing" ? w.waxing : !w.waxing,
  );

  return (
    <PageTransition>
      <SEOHead
        title="The Lunar Workbook Program — 24 Half-Cycles | Moontuner"
        description="The complete Lunar Workbook Program: twenty-four half-cycle workbooks running gap-free through the lunar year, live to tonight's phase."
        canonical="/program"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          <header className="pt-28 lg:pt-40 pb-14">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
                The Lunar Workbook Program
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-5 leading-[1.1]">
                Twenty-four half-cycles. One continuous year.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Each workbook covers one half of a lunation — New Moon to Full, or
                Full Moon to the next New. They run gap-free: where one ends, the
                next begins. Start wherever the sky is tonight.
              </p>

              {/* Live position */}
              <div className="mt-10 border border-accent/30 bg-accent/[0.04] p-6 lg:p-8 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent mb-3">
                  <Moon className="w-3.5 h-3.5" /> Tonight
                </div>
                <p className="font-serif text-2xl text-foreground">
                  Step {sky.workbook.sequence} — {sky.workbook.title}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {sky.workbook.journey} · Moon in {SIGNS[sky.moonSign].name} ·{" "}
                  {Math.round(sky.illumination * 100)}% lit ·{" "}
                  {sky.waxing ? "waxing" : "waning"}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/program/workbook/${sky.workbook.n}`}>
                    <Button variant="gold">
                      Open tonight's workbook <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/program/portal">
                    <Button variant="outline">Enter the portal</Button>
                  </Link>
                  <Link to="/program/persona">
                    <Button variant="ghost">Persona Edition</Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <section className="border-t border-border py-14 lg:py-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
                <h2 className="font-serif text-3xl text-foreground">The canon</h2>
                <div className="flex gap-2">
                  {(["all", "waxing", "waning"] as Filter[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
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

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((w) => (
                  <Link
                    key={w.n}
                    to={`/program/workbook/${w.n}`}
                    className={`block border p-6 bg-muted/10 transition-colors ${
                      w.n === sky.workbook.n
                        ? "border-accent/50"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                        {w.n} of 24
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-accent">
                        {w.waxing ? "Waxing" : "Waning"}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground mt-3">{w.title}</h3>
                    <p className="text-xs text-muted-foreground/70 mt-1">{w.journey}</p>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-3">
                      {w.blurb}
                    </p>
                    {w.isEclipse && (
                      <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-accent">
                        Eclipse charge
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-border py-14 lg:py-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl border border-border bg-muted/20 p-8 lg:p-12">
                <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">
                  Where this sits
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The program is the year-long practice. The{" "}
                  <Link to="/school/curriculum" className="text-foreground underline underline-offset-4">
                    School curriculum
                  </Link>{" "}
                  teaches the theory behind it, and the{" "}
                  <Link to="/rites" className="text-foreground underline underline-offset-4">
                    Rites
                  </Link>{" "}
                  are the single-session workings you can drop into any step.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/program/portal">
                    <Button variant="gold">Your portal</Button>
                  </Link>
                  <Link to="/program/persona">
                    <Button variant="outline">Persona Edition</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
