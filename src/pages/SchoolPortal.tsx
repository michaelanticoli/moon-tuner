import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { curriculumModules, curriculumMeta } from "@/data/phasecraftCurriculum";
import { LESSONS, lessonsForModule, TOTAL_LESSONS } from "@/data/phasecraftLessons";
import { Check, ChevronDown, Loader2, Lock } from "lucide-react";

export default function SchoolPortal() {
  const { user } = useAuth();
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("school_progress")
      .select("lesson_slug")
      .eq("user_id", user.id);
    setDone(new Set(((data as { lesson_slug: string }[] | null) ?? []).map((r) => r.lesson_slug)));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const moduleComplete = (n: number) =>
    lessonsForModule(n).every((l) => done.has(l.slug));

  const unlocked = (n: number) => n === 1 || moduleComplete(n - 1);

  const toggle = async (slug: string, moduleNumber: number) => {
    if (!user) return;
    setBusy(slug);
    const next = new Set(done);
    if (done.has(slug)) {
      next.delete(slug);
      await supabase
        .from("school_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("lesson_slug", slug);
    } else {
      next.add(slug);
      await supabase.from("school_progress").upsert(
        { user_id: user.id, module_number: moduleNumber, lesson_slug: slug },
        { onConflict: "user_id,lesson_slug" },
      );
    }
    setDone(next);
    setBusy(null);
  };

  const completedCount = LESSONS.filter((l) => done.has(l.slug)).length;
  const pct = Math.round((completedCount / TOTAL_LESSONS) * 100);
  const nextLesson = LESSONS.find((l) => !done.has(l.slug) && unlocked(l.module));

  return (
    <PageTransition>
      <SEOHead
        title="Your School Portal | Moontuner"
        description="Track your progress through Lunar Phasecraft Mastery, one lesson at a time."
        canonical="/school/portal"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          <header className="pt-28 lg:pt-40 pb-10">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
                School portal
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-light text-foreground mt-6 mb-4">
                {curriculumMeta.title}
              </h1>

              <div className="max-w-xl">
                <div className="flex items-baseline justify-between text-sm text-muted-foreground mb-2">
                  <span>
                    {completedCount} of {TOTAL_LESSONS} lessons complete
                  </span>
                  <span className="text-accent">{pct}%</span>
                </div>
                <div className="h-1 bg-muted">
                  <div className="h-1 bg-accent transition-all" style={{ width: `${pct}%` }} />
                </div>
                {nextLesson && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Next up:{" "}
                    <button
                      className="text-foreground underline underline-offset-4"
                      onClick={() => setOpenModule(nextLesson.module)}
                    >
                      {nextLesson.title}
                    </button>
                  </p>
                )}
              </div>
            </div>
          </header>

          {loading ? (
            <div className="container mx-auto px-6 lg:px-12 py-16 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading your progress…
            </div>
          ) : (
            <section className="border-t border-border py-12 lg:py-16">
              <div className="container mx-auto px-6 lg:px-12 max-w-4xl space-y-5">
                {curriculumModules.map((m) => {
                  const lessons = lessonsForModule(m.number);
                  const open = openModule === m.number;
                  const isUnlocked = unlocked(m.number);
                  const moduleDone = lessons.filter((l) => done.has(l.slug)).length;

                  return (
                    <article
                      key={m.number}
                      className={`border ${
                        isUnlocked ? "border-border" : "border-border/50 opacity-60"
                      } bg-muted/10`}
                    >
                      <button
                        className="w-full text-left p-6 lg:p-8 flex items-start justify-between gap-4"
                        onClick={() => isUnlocked && setOpenModule(open ? null : m.number)}
                        disabled={!isUnlocked}
                      >
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.24em] text-accent">
                            Module {String(m.number).padStart(2, "0")} · {m.duration}
                          </span>
                          <h2 className="font-serif text-2xl text-foreground mt-2">{m.title}</h2>
                          <p className="text-sm text-muted-foreground mt-1">{m.focus}</p>
                          <p className="text-xs text-muted-foreground/60 mt-3">
                            {moduleDone} of {lessons.length} lessons complete
                          </p>
                        </div>
                        {isUnlocked ? (
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </button>

                      {!isUnlocked && (
                        <p className="px-6 lg:px-8 pb-6 text-sm text-muted-foreground/70">
                          Finish Module {m.number - 1} to unlock this one.
                        </p>
                      )}

                      {isUnlocked && open && (
                        <div className="border-t border-border divide-y divide-border">
                          {lessons.map((l) => {
                            const complete = done.has(l.slug);
                            return (
                              <div key={l.slug} className="p-6 lg:p-8">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="font-serif text-xl text-foreground">
                                      {l.title}
                                    </h3>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60 mt-1">
                                      {l.minutes} min
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant={complete ? "gold" : "outline"}
                                    disabled={busy === l.slug}
                                    onClick={() => toggle(l.slug, m.number)}
                                  >
                                    {complete ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 mr-2" /> Done
                                      </>
                                    ) : (
                                      "Mark complete"
                                    )}
                                  </Button>
                                </div>

                                <div className="mt-5 space-y-4">
                                  {l.body.map((p) => (
                                    <p key={p} className="text-foreground/85 leading-relaxed">
                                      {p}
                                    </p>
                                  ))}
                                </div>

                                <div className="mt-6 border-l-2 border-accent pl-5">
                                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                                    Practice
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {l.practice}
                                  </p>
                                </div>

                                <div className="mt-5">
                                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                                    Reflection
                                  </div>
                                  <ul className="space-y-2">
                                    {l.prompts.map((q) => (
                                      <li
                                        key={q}
                                        className="text-sm text-muted-foreground leading-relaxed pl-4 relative"
                                      >
                                        <span className="absolute left-0 top-[0.6em] w-1.5 h-px bg-border" />
                                        {q}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  );
                })}

                <div className="pt-6 flex flex-wrap gap-4">
                  <Link to="/school/curriculum">
                    <Button variant="outline">The full curriculum</Button>
                  </Link>
                  <Link to="/rites">
                    <Button variant="ghost">Practice layer — the Rites</Button>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
