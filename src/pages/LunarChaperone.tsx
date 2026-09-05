import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Lock } from "lucide-react";
import { WorkbookAppCards } from "@/components/WorkbookAppCards";
import { useMembership } from "@/contexts/MembershipContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { openStripeCheckout } from "@/lib/stripeLinks";
import {
  WORKBOOKS, SIGNS, ELEMENT_HEX, getWorkbook,
  resolveWorkbook, resolveEclipseWorkbook, type Workbook,
} from "@/data/chaperoneCanon";

const gradFor = (w: Workbook) =>
  `linear-gradient(90deg, ${ELEMENT_HEX[SIGNS[w.start].element]}, ${ELEMENT_HEX[SIGNS[w.end].element]})`;
const isFreeToView = (w: Workbook, currentN: string) => w.n === currentN;

// ── Per-workbook 6-section content, all derived from the two signs ──────────
function buildSections(w: Workbook) {
  const S = SIGNS[w.start], E = SIGNS[w.end];
  const lc = (s: string) => s.toLowerCase();
  return {
    context: [
      { label: "Lunar mechanics", value: `${w.startPhase === "New" ? "New Moon" : "Full Moon"} → ${w.endPhase === "New" ? "New Moon" : "Full Moon"}`, sub: "Cycle threshold" },
      { label: "Somatic axis", value: `${S.body} → ${E.body}`, sub: "Body translation" },
      { label: "Elemental shift", value: `${S.element} → ${E.element}`, sub: "Energetic movement" },
      { label: "Modality", value: `${S.modality} → ${E.modality}`, sub: "Mode of motion" },
    ],
    mapping: [
      { q: `Where is your ${S.name} ${lc(S.drive)} — “${S.self}” — running the show right now?`, key: "map_over" },
      { q: `Where is ${E.name} ${lc(E.drive)} trying to emerge, and what blocks it?`, key: "map_under" },
      { q: `“${S.self}” is becoming “${E.self}.” Name one place that turn is already underway.`, key: "map_turn" },
    ],
    tracks: [
      { l: S.drive, r: E.drive, note: `${lc(S.element)} wants; ${lc(E.element)} weighs the cost.` },
      { l: S.self, r: E.self, note: `“${S.self},” becoming “${E.self}.”` },
    ],
    protocols: [
      { num: "01", title: `Meeting ${S.name} in the ${lc(S.body)}`, sub: `${S.element} · witness`,
        body: `Find the ${S.name} pattern where it lives — ${lc(S.body)}. Make accurate contact before amplifying anything.` },
      { num: "02", title: `The passage — ${S.element} to ${E.element}`, sub: `${lc(S.body)} → ${lc(E.body)}`,
        body: `Sound the charge as it travels from the ${lc(S.body)} toward the ${lc(E.body)}. Move from feeling into statement.` },
      { num: "03", title: `Embodying ${E.name} through the ${lc(E.body)}`, sub: `${E.element} · ${w.waxing ? "illuminate" : "compost"}`,
        body: `Bring it down into ${lc(E.body)}. ${w.waxing ? "Let it reach full, visible expression." : "Let it settle and compost toward the dark."}` },
    ],
    logs: [
      { label: "Breath rate", key: "log_breath", ph: "— bpm" },
      { label: "Primary state", key: "log_state", ph: "dormant / clear" },
      { label: `${S.name} charge`, key: "log_source", ph: `in the ${lc(S.body)}` },
      { label: `${E.name} access`, key: "log_dest", ph: `in the ${lc(E.body)}` },
    ],
    integ: [
      { q: w.waxing ? `You built from ${S.name} toward ${E.name}. What reached the light this cycle?` : `You released from ${S.name} toward ${E.name}. What are you ready to let go into the dark?`, key: "integ_change" },
    ],
  };
}

const LunarChaperone = () => {
  const [params, setParams] = useSearchParams();
  const { tier } = useMembership();
  const isMember = tier !== "free";
  const { user } = useAuth();                  // for cross-device journaling
  const [hasPurchased, setHasPurchased] = useState(false);

  const sky = useMemo(() => resolveWorkbook(new Date()), []);
  const currentN = sky.workbook.n;
  const eclipse = useMemo(() => resolveEclipseWorkbook(new Date().getFullYear()), []);

  const selected = params.get("wb");
  const active = selected ? getWorkbook(selected) : undefined;
  const open = (n: string) => setParams({ wb: n });
  const backToLibrary = () => setParams({});
  useEffect(() => { if (active) window.scrollTo({ top: 0 }); }, [active]);

  useEffect(() => {
    if (!user) {
      setHasPurchased(false);
      return;
    }

    let cancelled = false;
    supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", "lunar-chaperone")
      .eq("status", "completed")
      .limit(1)
      .then(({ data }) => {
        if (!cancelled) setHasPurchased(Boolean(data?.length));
      });

    return () => { cancelled = true; };
  }, [user]);

  const ownsProgram = isMember || hasPurchased;
  const canView = active ? ownsProgram || isFreeToView(active, currentN) : true;
  const purchase = () => openStripeCheckout("lunar-chaperone");

  // ── Journaling: Supabase when signed in, localStorage fallback ────────────
  const [entries, setEntries] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!active || !canView) return;
    let cancelled = false;
    (async () => {
      if (user) {
        const { data } = await supabase
          .from("chaperone_entries")
          .select("field,value")
          .eq("user_id", user.id)
          .eq("workbook", active.n);
        if (!cancelled && data) {
          const m: Record<string, string> = {};
          data.forEach((row: { field: string; value: string }) => {
            m[row.field] = row.value;
          });
          setEntries(m);
        }
      } else {
        try {
          const raw = localStorage.getItem(`chaperone_${active.n}`);
          if (!cancelled) setEntries(raw ? JSON.parse(raw) : {});
        } catch { /* ignore */ }
      }
    })();
    return () => { cancelled = true; };
  }, [active, user, canView]);

  const saveField = useCallback((field: string, value: string) => {
    if (!active) return;
    setEntries((prev) => {
      const next = { ...prev, [field]: value };
      if (user) {
        supabase.from("chaperone_entries").upsert(
          { user_id: user.id, workbook: active.n, field, value },
          { onConflict: "user_id,workbook,field" }
        ).then(() => {});
      } else {
        try { localStorage.setItem(`chaperone_${active.n}`, JSON.stringify(next)); } catch { /* ignore */ }
      }
      return next;
    });
  }, [active, user]);

  const sections = active ? buildSections(active) : null;

  return (
    <PageTransition>
      <SEOHead
        title="The Lunar Chaperone — 24 Half-Moon Workbooks | Moontuner"
        description="A companion for the whole lunar year. Twenty-four half-moon workbooks in one continuous loop — the tool knows today's sky and opens you to the cycle you're living now."
        canonical="/chaperone"
        keywords={["lunar chaperone","moon workbook","lunar cycle practice","half moon workbook","moon phase companion"]}
      />
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        <main className="pt-24 lg:pt-32">

          {!active && (
            <>
              <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
                <ScrollReveal>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="status-dot" />
                      <span className="system-label">Live now · the sky's current cycle</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-[1.05]">
                      The Lunar <span className="italic text-accent">Chaperone</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                      Turn each moon phase into a clear, grounded practice. Follow the current sky through 24 guided workbooks with reflection prompts, somatic exercises, and integration rituals.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                      <Button variant="gold" size="lg" onClick={purchase}>
                        Get lifetime access — $97 <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => open(currentN)}>
                        Try the current workbook free
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground/60 mb-12">
                      One payment · lifetime access · no subscription
                    </p>
                    <div className="node-card border-accent/30 max-w-2xl mx-auto text-left">
                      <div className="h-1.5 rounded-full mb-5" style={{ background: gradFor(sky.workbook) }} />
                      <span className="system-label text-accent">You are here · WB {currentN}</span>
                      <h2 className="font-serif text-2xl lg:text-3xl text-foreground mt-3 mb-2">
                        {sky.workbook.lead} <span className="italic text-accent">{sky.workbook.accent}</span>
                      </h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-4">{sky.workbook.journey}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">{sky.workbook.blurb}</p>
                      <Button variant="gold" size="lg" onClick={() => open(currentN)}>
                        Open this cycle — free <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </section>

              <section className="border-y border-border/30 bg-card/20">
                <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
                  <ScrollReveal>
                    <div className="max-w-5xl mx-auto">
                      <div className="text-center mb-12">
                        <span className="system-label block mb-4">What changes</span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                          Stop collecting moon advice.<br />
                          <span className="italic text-accent">Start living the cycle.</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                          Lunar Chaperone gives you a concrete practice for the days between the dramatic new- and full-moon moments—when insight either becomes embodied change or disappears.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-5">
                        {[
                          ["Know where you are", "The live sky resolver opens the workbook that matches the cycle you are actually living."],
                          ["Know what to do", "Prompts, body-based practices, and polarity maps turn astrology into specific action."],
                          ["Keep what you learn", "Practice logs and journal entries help you recognize patterns across the whole lunar year."],
                        ].map(([title, copy]) => (
                          <div key={title} className="node-card h-full">
                            <Check className="w-5 h-5 text-accent mb-4" />
                            <h3 className="font-serif text-xl text-foreground mb-3">{title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </section>

              <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
                <ScrollReveal>
                  <div className="node-card border-accent/30 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-[1.4fr_0.6fr] gap-8 items-center">
                      <div>
                        <span className="system-label text-accent block mb-4">Everything included</span>
                        <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-5">
                          The complete Lunar Chaperone
                        </h2>
                        <ul className="space-y-3">
                          {[
                            "24 astronomically aligned half-moon workbooks",
                            "A guided practice for every lunar transition",
                            "Energy mapping and somatic protocols",
                            "Reflection prompts, practice logs, and integration rituals",
                            "Lifetime access, including future program updates",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:text-center border-t md:border-t-0 md:border-l border-border/30 pt-8 md:pt-0 md:pl-8">
                        <div className="font-serif text-5xl text-foreground mb-1">$97</div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">One time · lifetime access</p>
                        <Button variant="gold" size="lg" onClick={purchase} className="w-full">
                          Get full access <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <button onClick={() => open(currentN)} className="text-xs text-accent hover:underline mt-4">
                          Preview this cycle free
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </section>

              <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20 border-t border-border/30">
                <ScrollReveal>
                  <div className="text-center mb-14">
                    <span className="system-label block mb-4">The full loop</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                      Twenty-four <span className="italic">half-moons</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Every full moon sits opposite its new moon. The loop never drifts — and it never ends.
                      {!ownsProgram && " Open the current cycle free; purchase once to unlock the whole year."}
                    </p>
                  </div>
                </ScrollReveal>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {WORKBOOKS.map((w, i) => {
                    const locked = !ownsProgram && !isFreeToView(w, currentN);
                    return (
                      <ScrollReveal key={w.n} delay={(i % 3) * 0.05}>
                        <button onClick={() => open(w.n)} className="node-card h-full w-full text-left relative group hover:border-accent/40 transition-colors">
                          <div className="h-1.5 rounded-full mb-4" style={{ background: gradFor(w) }} />
                          <div className="flex items-center justify-between mb-3">
                            <span className="system-label text-accent">WB {w.n}</span>
                            <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{w.waxing ? "Waxing" : "Waning"}</span>
                          </div>
                          <h3 className="font-serif text-xl text-foreground mb-2">{w.lead} <span className="italic text-accent">{w.accent}</span></h3>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground/60 mb-3">{w.journey}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{w.blurb}</p>
                          {w.isEclipse && (<div className="mt-3 text-xs text-accent flex items-center gap-2"><span aria-hidden>☉☾</span> {new Date().getFullYear()} eclipse gate</div>)}
                          {w.n === currentN && (<span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-accent border border-accent/50 rounded-full px-2 py-0.5">Now</span>)}
                          {locked && (<div className="absolute inset-0 rounded-[inherit] bg-background/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><Lock className="w-5 h-5 text-accent" /><span className="text-xs uppercase tracking-wider text-muted-foreground">Members</span></div>)}
                        </button>
                      </ScrollReveal>
                    );
                  })}
                </div>
                {!ownsProgram && (
                  <div className="text-center mt-12">
                    <Button variant="gold" size="lg" onClick={purchase}>Unlock all 24 for $97 <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    <p className="text-xs text-muted-foreground/60 mt-3">One payment · lifetime access · no subscription</p>
                    <p className="text-xs text-muted-foreground/60 mt-3">Eclipse charge this year: WB {eclipse.n}. {eclipse.note}</p>
                  </div>
                )}
              </section>
            </>
          )}

          {active && (
            <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-16">
              <div className="max-w-3xl mx-auto">
                <button onClick={backToLibrary} className="system-label text-muted-foreground hover:text-accent flex items-center gap-2 mb-8">
                  <ArrowLeft className="w-4 h-4" /> All workbooks
                </button>
                <div className="h-1.5 rounded-full mb-6" style={{ background: gradFor(active) }} />
                <span className="system-label text-accent">WB {active.n} / 24 · {active.n === currentN ? "The cycle you are in now" : "Exploring"}</span>
                <h1 className="font-serif text-4xl lg:text-5xl text-foreground mt-3 mb-3">{active.lead} <span className="italic text-accent">{active.accent}</span></h1>
                <p className="text-sm uppercase tracking-wider text-muted-foreground/70 mb-6">{active.journey} · {active.elementShift}</p>
                <p className="font-serif italic text-xl text-muted-foreground leading-relaxed mb-10">{active.blurb}</p>

                {!canView ? (
                  <div className="node-card border-accent/30 text-center py-12">
                    <Lock className="w-10 h-10 text-accent mx-auto mb-5" />
                    <h3 className="font-serif text-2xl text-foreground mb-3">Part of the complete program</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">The current cycle (WB {currentN}) is always free. Get lifetime access to all 24 workbooks, somatic protocols, and saved reflections for a single $97 payment.</p>
                    <Button variant="gold" size="lg" onClick={purchase}>Get lifetime access — $97 <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                ) : sections && (
                  <div className="space-y-10">
                    {/* 02 CONTEXT */}
                    <div>
                      <span className="system-label text-muted-foreground block mb-4">02 · Context framing</span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {sections.context.map((c) => (
                          <div key={c.label} className="node-card">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">{c.label}</div>
                            <div className="font-serif italic text-accent text-lg leading-tight mb-1">{c.value}</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/50">{c.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 03 ENERGY MAPPING */}
                    <div>
                      <span className="system-label text-muted-foreground block mb-4">03 · Energy mapping</span>
                      <div className="space-y-3 mb-5">
                        {sections.mapping.map((m) => (
                          <div key={m.key} className="node-card">
                            <p className="text-foreground text-sm mb-3">{m.q}</p>
                            <textarea
                              value={entries[m.key] || ""}
                              onChange={(e) => saveField(m.key, e.target.value)}
                              rows={2}
                              className="w-full bg-background/60 border border-border/40 rounded-lg p-3 text-foreground text-sm resize-y focus:outline-none focus:border-accent"
                              placeholder="…"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="node-card">
                        {sections.tracks.map((t) => (
                          <div key={t.l} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline mb-2 gap-3">
                              <span className="font-serif italic text-accent">{t.l}</span>
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 text-center">{t.note}</span>
                              <span className="font-serif italic text-foreground">{t.r}</span>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent, #b6852a), #2ec9b0)" }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 04 PROTOCOLS */}
                    <div>
                      <span className="system-label text-muted-foreground block mb-4">04 · Practices &amp; protocols</span>
                      <div className="space-y-3">
                        {sections.protocols.map((p) => (
                          <div key={p.num} className="node-card flex gap-4">
                            <div className="font-serif italic text-accent text-lg shrink-0">{p.num}</div>
                            <div>
                              <div className="font-serif text-lg text-foreground">{p.title}</div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">{p.sub}</div>
                              <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 05 LOGS */}
                    <div>
                      <span className="system-label text-muted-foreground block mb-4">05 · Practice logs</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {sections.logs.map((l) => (
                          <div key={l.key} className="node-card">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">{l.label}</div>
                            <input
                              value={entries[l.key] || ""}
                              onChange={(e) => saveField(l.key, e.target.value)}
                              className="w-full bg-background/60 border border-border/40 rounded-lg p-2 text-foreground text-sm focus:outline-none focus:border-accent"
                              placeholder={l.ph}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 06 INTEGRATION + prompt */}
                    <div>
                      <span className="system-label text-muted-foreground block mb-4">06 · Integration</span>
                      {sections.integ.map((m) => (
                        <div key={m.key} className="node-card mb-3">
                          <p className="text-foreground text-sm mb-3">{m.q}</p>
                          <textarea value={entries[m.key] || ""} onChange={(e) => saveField(m.key, e.target.value)} rows={3}
                            className="w-full bg-background/60 border border-border/40 rounded-lg p-3 text-foreground text-sm resize-y focus:outline-none focus:border-accent" placeholder="…" />
                        </div>
                      ))}
                      <div className="node-card border-accent/20">
                        <span className="system-label text-accent block mb-3">This cycle's closing prompt</span>
                        <p className="font-serif italic text-lg text-foreground leading-relaxed mb-4">{active.prompt}</p>
                        <textarea value={entries["ritual"] || ""} onChange={(e) => saveField("ritual", e.target.value)} rows={3}
                          className="w-full bg-background/60 border border-accent/30 rounded-lg p-3 text-foreground text-sm resize-y focus:outline-none focus:border-accent" placeholder="Set it down here." />
                      </div>
                      {!user && (<p className="text-[11px] text-muted-foreground/50 mt-3">Saved to this device. <Link to="/auth" className="text-accent">Sign in</Link> to sync across devices.</p>)}
                    </div>

                    {active.isEclipse && (
                      <div className="node-card border-accent/30">
                        <span className="system-label text-accent block mb-2">☉☾ {new Date().getFullYear()} eclipse gate</span>
                        <p className="text-muted-foreground text-sm">{eclipse.note}</p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-2">
                      <Button variant="outline" className="flex-1" onClick={() => open(WORKBOOKS[(active.sequence - 2 + 24) % 24].n)}><ArrowLeft className="mr-2 w-4 h-4" /> Previous</Button>
                      <Button variant="outline" className="flex-1" onClick={() => open(WORKBOOKS[active.sequence % 24].n)}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          <WorkbookAppCards />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default LunarChaperone;
