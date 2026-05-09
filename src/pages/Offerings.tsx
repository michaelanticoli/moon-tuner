import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { OfferingCard } from "@/components/offerings/OfferingCard";
import { OfferingModal } from "@/components/offerings/OfferingModal";
import { OFFERINGS, EMOTIONAL_CATEGORIES, type Offering, type EmotionalCategory } from "@/data/offeringsData";

const ALL_LABEL = "All";

export default function Offerings() {
  const [activeCategory, setActiveCategory] = useState<EmotionalCategory | typeof ALL_LABEL>(ALL_LABEL);
  const [modalOffering, setModalOffering] = useState<Offering | null>(null);

  const filtered =
    activeCategory === ALL_LABEL
      ? OFFERINGS
      : OFFERINGS.filter((o) => o.category === activeCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
        <Navigation />

        <main className="pt-32">
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold block mb-8">
                  Moontuner Offerings
                </span>

                <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-serif font-extralight leading-[0.92] tracking-tight text-foreground mb-8">
                  Reflective intelligence.
                  <br />
                  <span className="text-gradient-silver italic font-light">Precisely timed.</span>
                </h1>

                <div className="max-w-2xl">
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    Each offering is a structured system for understanding where you are, what's
                    moving, and what comes next — built from your personal chart and the current
                    lunar architecture.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Category filter ──────────────────────────────────────────── */}
          <section className="pb-12 sticky top-[72px] z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <div className="flex items-center gap-2 flex-wrap py-4">
                {[ALL_LABEL, ...EMOTIONAL_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as EmotionalCategory | typeof ALL_LABEL)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 border ${
                      activeCategory === cat
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Offering grid ────────────────────────────────────────────── */}
          <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <div className="space-y-6">
                {filtered.map((offering, i) => (
                  <OfferingCard
                    key={offering.id}
                    offering={offering}
                    onOpen={setModalOffering}
                    index={i}
                  />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-muted-foreground font-light">
                    No offerings in this category yet.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ── Approach note ────────────────────────────────────────────── */}
          <section className="py-24 border-t border-border/30">
            <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/60 font-bold block mb-8">
                  The Approach
                </span>
                <p className="text-2xl md:text-3xl font-serif font-light text-foreground leading-relaxed mb-8">
                  "These are not predictions. They are precision maps — built from the same
                  energetic architecture that's always been yours."
                </p>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  Every offering is designed to translate abstract timing intelligence into
                  something usable. Not esoteric. Not prescriptive. Reflective — in the way that
                  good counsel is always reflective.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Not sure section ─────────────────────────────────────────── */}
          <section className="py-24 border-t border-border/30">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/60 font-bold block mb-6">
                    Not Sure Where to Start?
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground leading-tight mb-6">
                    Start with a<br />
                    <span className="italic text-gradient-silver">Calibration Session.</span>
                  </h2>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    A 60-minute live session is the fastest way to find out which offering is right
                    for where you are. We'll read your current chart together and map the next
                    move.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="bg-card border border-border rounded-[2rem] p-10"
                >
                  <div className="space-y-6">
                    {[
                      "60 or 90 minute live session",
                      "Real-time chart navigation",
                      "Post-session written summary",
                      "Clear next-step recommendations",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span className="text-sm text-foreground/80 font-light">{item}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-border/40">
                      <a
                        href="/sessions"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      >
                        Book a Session
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Detail modal */}
      <OfferingModal offering={modalOffering} onClose={() => setModalOffering(null)} />
    </PageTransition>
  );
}
