import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import {
  curriculumMeta,
  curriculumModules,
  bonusModules,
} from "@/data/phasecraftCurriculum";

export default function SchoolCurriculum() {
  return (
    <PageTransition>
      <SEOHead
        title="Curriculum — Lunar Phasecraft Mastery | Moontuner School"
        description="The six-module Lunar Phasecraft Mastery curriculum: learning outcomes, key topics, and the eight-week path from lunar foundations to integrated practice."
        canonical="/school/curriculum"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          {/* Hero */}
          <header className="pt-28 lg:pt-40 pb-16 lg:pb-20">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
                Moontuner School · Curriculum
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-4 leading-[1.1]">
                {curriculumMeta.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
                {curriculumMeta.subtitle}. {curriculumMeta.promise}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mb-10">
                {[
                  ["Format", curriculumMeta.format],
                  ["Structure", curriculumMeta.duration],
                  ["Span", curriculumMeta.span],
                ].map(([k, v]) => (
                  <div key={k} className="border border-border p-4 bg-muted/20">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                      {k}
                    </div>
                    <div className="text-sm text-foreground">{v}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={curriculumMeta.overviewPdf} download>
                  <Button variant="gold" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download the overview PDF
                  </Button>
                </a>
                <Link to="/school">
                  <Button variant="outline" size="lg">
                    Back to the School
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Modules */}
          <section className="border-t border-border py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-12">
                The six core modules
              </h2>

              <div className="space-y-6 max-w-5xl">
                {curriculumModules.map((m) => (
                  <ScrollReveal key={m.number}>
                    <article className="border border-border bg-muted/10 p-8 lg:p-10">
                      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                        <span className="text-[11px] uppercase tracking-[0.24em] text-accent">
                          Module {String(m.number).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
                          {m.duration}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm italic text-muted-foreground/80 mb-5">
                        {m.focus}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {m.description}
                      </p>

                      <div className="grid gap-8 md:grid-cols-2">
                        <div>
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                            Learning outcomes
                          </h4>
                          <ul className="space-y-2">
                            {m.outcomes.map((o) => (
                              <li
                                key={o}
                                className="text-sm text-foreground/85 leading-relaxed pl-4 relative"
                              >
                                <span className="absolute left-0 top-[0.55em] w-1.5 h-px bg-accent" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                            Key topics
                          </h4>
                          <ul className="space-y-2">
                            {m.topics.map((t) => (
                              <li
                                key={t}
                                className="text-sm text-muted-foreground leading-relaxed pl-4 relative"
                              >
                                <span className="absolute left-0 top-[0.55em] w-1.5 h-px bg-border" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Bonus */}
          <section className="border-t border-border py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="font-serif text-3xl text-foreground mb-10">
                Bonus modules
              </h2>
              <div className="grid gap-6 md:grid-cols-3 max-w-5xl">
                {bonusModules.map((b, i) => (
                  <div key={b.title} className="border border-border p-6 bg-muted/10">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-accent">
                      Bonus {i + 1}
                    </span>
                    <h3 className="font-serif text-xl text-foreground mt-3 mb-3">
                      {b.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Practice layer */}
          <section className="border-t border-border py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl border border-border bg-muted/30 p-8 lg:p-12">
                <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">
                  Where the theory lands
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The curriculum is the theory layer. The{" "}
                  <strong className="text-foreground">Rites</strong> are the
                  practice layer — standalone station-cycle workings timed to the
                  live phase — and the{" "}
                  <strong className="text-foreground">Lunar Chaperone</strong>{" "}
                  carries both across every half-cycle of the year.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/rites">
                    <Button variant="gold-outline">
                      The Rites <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/lunar-chaperone">
                    <Button variant="outline">
                      The Lunar Chaperone <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
