import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const inclusions = [
  {
    title: "Lesson 1: The Lunar Operating System",
    type: "lesson",
  },
  {
    title: "Lesson 2: Design Your 28-Day Experiment",
    type: "lesson",
  },
  {
    title: "Lesson 3: Check-ins & Course Corrections",
    type: "lesson",
  },
  {
    title: "Lesson 4: Debrief & Next Steps",
    type: "lesson",
  },
  {
    title: "28-day Moon Tuner Planner (PDF / Notion / printable)",
    type: "bonus",
  },
  {
    title: "Lunar timing calendar for the current cycle (phases + key dates)",
    type: "bonus",
  },
  {
    title: "Reflection prompts at each phase to help you decode what's happening",
    type: "bonus",
  },
];

const forYou = [
  "Some weeks feel magically in flow and other weeks feel like pushing through mud — and you want to know why",
  "You believe there's more to timing than dates on a calendar",
  "You're astrology-curious or energy-aware, but you want something more structured than vague \"woo\"",
  "You're willing to treat your next lunar cycle as a personal experiment and see what changes in your life",
];

const notForYou = [
  "You want guarantees of instant manifestations with no effort",
  "You're not willing to track your own experience for 28 days",
  "You're looking for a full astrology certification — this is a starter, not a degree",
];

const faqs = [
  {
    q: "Do I need to already know astrology?",
    a: "No. I'll give you everything you need for this experiment. If you've never looked at a chart before, you're fine.",
  },
  {
    q: 'Do I have to "believe" in manifestation or magic?',
    a: "You only need to be open to tracking your own experience. Treat this like a 28-day field study: try the method, write down what happens, keep what works.",
  },
  {
    q: "How much time will this take?",
    a: "About 1–2 hours at the beginning to set up your experiment, then 5–10 minutes at each key phase to check in and adjust.",
  },
  {
    q: "Will there be live calls?",
    a: "For this round, it's self-paced with pre-recorded lessons and written prompts. I may add a live Q&A in future cohorts.",
  },
  {
    q: "How long do I have access?",
    a: "You'll have access to the lessons and materials for at least 12 months, so you can repeat the experiment for multiple lunar cycles.",
  },
];

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <Button
      variant="gold"
      size="lg"
      className={`text-base px-8 py-6 ${className}`}
      onClick={() => {
        // TODO: wire to Stripe checkout
        window.alert("Checkout coming soon!");
      }}
    >
      Join Moon Tuner Starter — $27
    </Button>
  );
}

const MoonTunerStarter = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32">
          {/* ═══════════════ HERO ═══════════════ */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-28">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-medium tracking-widest uppercase mb-8">
                  28-Day Guided Experiment
                </span>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.15]">
                  Plan your next 28 days with the moon
                  <span className="italic block mt-1 text-gold">
                    instead of guessing the right time.
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                  Moon Tuner Starter is a 28-day guided experiment that teaches
                  you how to time your actions with the lunar cycle using my
                  Quantumelodics framework — so you can stop forcing and start
                  flowing.
                </p>

                <p className="font-serif text-2xl text-foreground mb-6">
                  Moon Tuner Starter · <span className="text-gold">$27</span>
                </p>

                <CTAButton />

                <p className="text-sm text-muted-foreground mt-5">
                  Next lunar cycle starts soon. Join before the next new moon to
                  be part of this round.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* ═══════════════ WHAT YOU GET ═══════════════ */}
          <section className="border-t border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6 text-center">
                    What you'll do in Moon Tuner Starter
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="text-muted-foreground leading-relaxed space-y-4 mb-14 max-w-2xl mx-auto">
                    <p>In this 28-day lunar experiment, you will:</p>
                    <ul className="space-y-3 pl-1">
                      {[
                        "Learn a simple 4-phase lunar framework using the metaphor of farming: plant, grow, harvest, compost",
                        "Choose 1–2 areas of your life (money, creativity, relationships, self-care…) to focus on",
                        "Map those intentions onto one lunar cycle so you know what to do in each phase",
                        "Check in at key moon moments and adjust your actions instead of forcing everything",
                        "Track what actually changes in your energy, results, and sense of timing",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check className="w-4 h-4 text-gold mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Inclusions */}
                <ScrollReveal delay={0.15}>
                  <div className="bg-card/40 border border-border/50 rounded-2xl p-8 lg:p-10 mb-8">
                    <h3 className="font-serif text-xl text-foreground mb-6">
                      What's included for $27
                    </h3>

                    <div className="space-y-4">
                      <p className="text-sm text-gold uppercase tracking-widest font-medium mb-2">
                        4 Core Lessons (video or audio)
                      </p>
                      {inclusions
                        .filter((i) => i.type === "lesson")
                        .map((item) => (
                          <div
                            key={item.title}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                        ))}

                      <div className="border-t border-border/30 my-6" />

                      <p className="text-sm text-gold uppercase tracking-widest font-medium mb-2">
                        Tools & Resources
                      </p>
                      {inclusions
                        .filter((i) => i.type === "bonus")
                        .map((item) => (
                          <div
                            key={item.title}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-sm text-muted-foreground text-center mb-8">
                    You can go through this at your own pace. Plan on 1–2 hours
                    to set up your experiment, then 5–10 minutes at each key
                    phase.
                  </p>
                  <div className="text-center">
                    <CTAButton />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ═══════════════ WHO IT'S FOR ═══════════════ */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-10 text-center">
                    Is this for you?
                  </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-10">
                  <ScrollReveal delay={0.1}>
                    <div>
                      <p className="text-sm text-gold uppercase tracking-widest font-medium mb-5">
                        This is for you if…
                      </p>
                      <ul className="space-y-4">
                        {forYou.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-gold mt-1 shrink-0" />
                            <span className="text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-5">
                        It's not for you if…
                      </p>
                      <ul className="space-y-4">
                        {notForYou.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-muted-foreground/70"
                          >
                            <X className="w-4 h-4 text-muted-foreground/50 mt-1 shrink-0" />
                            <span className="text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal delay={0.2}>
                  <div className="text-center mt-12">
                    <Button
                      variant="gold"
                      size="lg"
                      className="text-base px-8 py-6"
                      onClick={() =>
                        window.alert("Checkout coming soon!")
                      }
                    >
                      Yes, I'm in for the 28-day lunar experiment
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ═══════════════ QUANTUMELODICS ANCHOR ═══════════════ */}
          <section className="border-b border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                  <p className="text-sm text-gold uppercase tracking-widest font-medium mb-4 text-center">
                    Powered by
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8 text-center italic">
                    Quantumelodics
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="text-muted-foreground leading-relaxed space-y-5 text-center max-w-2xl mx-auto mb-10">
                    <p>
                      Under the hood of Moon Tuner Starter is Quantumelodics —
                      the system I developed that translates the numerical and
                      symbolic data of astrology and lunar cycles into musical
                      and energetic patterns.
                    </p>
                    <p>You don't need to learn the whole map yet.</p>
                    <p>
                      In this starter, you'll work with the most accessible
                      layer:{" "}
                      <span className="text-foreground font-medium">
                        lunar phases as your timing map
                      </span>{" "}
                      — so you can feel what it's like to move with the cycle
                      instead of against it.
                    </p>
                    <p className="text-sm text-muted-foreground/70 italic">
                      If you love how this feels, I'll show you how to go deeper
                      into the full Quantumelodics system after this experiment.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="text-center">
                    <CTAButton />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ═══════════════ FAQ ═══════════════ */}
          <section className="bg-card/20 border-b border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-2xl mx-auto">
                <ScrollReveal>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-10 text-center">
                    Questions you might have
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="border border-border/30 rounded-xl px-6 bg-card/30"
                      >
                        <AccordionTrigger className="font-serif text-foreground text-left hover:no-underline py-5">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ═══════════════ FINAL CTA ═══════════════ */}
          <section className="bg-night-slate">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <ScrollReveal>
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    Ready to tune your next month
                    <span className="italic block">to the moon?</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
                    Instead of pushing randomly and hoping for the best, give
                    yourself 28 days to test what happens when you align your
                    actions with the lunar cycle. No drama. No dogma. Just a
                    structured experiment with your real life as the proof.
                  </p>

                  <CTAButton />

                  <p className="text-sm text-muted-foreground mt-5">
                    Join before the next new moon to be part of this cycle.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default MoonTunerStarter;
