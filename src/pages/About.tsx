import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import {
  brandStory,
  aboutPageContent,
  ecosystemPillars,
  brandVocabulary,
  voiceAndTone,
} from "@/data/brand";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // One-way reveal: once in view, stay visible. Matches the ambient,
        // non-reactive motion philosophy of the dusk design system.
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 1.1s cubic-bezier(0.2,0.8,0.2,1) ${delay}s, transform 1.1s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div
      className="w-full h-px mx-auto"
      style={{
        background:
          "linear-gradient(90deg, transparent, hsl(var(--dusk-line)), transparent)",
        maxWidth: "1100px",
      }}
    />
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

const About = () => {
  return (
    <PageTransition>
      <div className="dusk min-h-screen relative">
        <DuskNav />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section
            className="relative min-h-[70svh] flex items-end overflow-hidden dusk-atmosphere"
            aria-label="About Moontuner"
          >
            {/* Ambient lunar geometry */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-end">
              <div className="relative w-[80vmin] h-[80vmin] -mr-[28vmin] dusk-drift opacity-40">
                {[0.3, 0.5, 0.7, 0.9].map((s, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 m-auto rounded-full border"
                    style={{
                      width: `${s * 100}%`,
                      height: `${s * 100}%`,
                      borderColor: `hsl(var(--dusk-ivory) / ${0.03 + i * 0.01})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Left vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--dusk-black)) 0%, hsl(var(--dusk-black) / 0.7) 40%, transparent 70%)",
              }}
            />

            <div className="relative w-full mx-auto max-w-[1100px] px-6 lg:px-12 pt-40 pb-24 lg:pt-52 lg:pb-32">
              <p className="dusk-eyebrow mb-8 dusk-rise">
                <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                About Moontuner
              </p>

              <h1
                className="dusk-serif text-[clamp(2.8rem,7vw,5.8rem)] dusk-ivory mb-8 dusk-rise"
                style={{ animationDelay: "0.1s", maxWidth: "760px" }}
              >
                {aboutPageContent.heroTagline}
              </h1>

              <p
                className="text-[1.0625rem] lg:text-[1.125rem] leading-[1.7] max-w-[560px] mb-0 dusk-rise"
                style={{
                  animationDelay: "0.22s",
                  color: "hsl(var(--dusk-ivory) / 0.68)",
                }}
              >
                {aboutPageContent.heroSubhead}
              </p>
            </div>
          </section>

          {/* ── What It Is ───────────────────────────────────────────────── */}
          <section
            className="relative py-28 lg:py-40 mx-auto max-w-[1100px] px-6 lg:px-12"
            aria-labelledby="what-it-is"
          >
            {aboutPageContent.sections
              .filter((s) => s.id === "what-it-is")
              .map((section) => (
                <div key={section.id}>
                  <Reveal>
                    <p className="dusk-eyebrow mb-6">{section.eyebrow}</p>
                    <h2
                      id="what-it-is"
                      className="dusk-serif text-[clamp(2rem,4vw,3.4rem)] dusk-ivory mb-14 max-w-[640px]"
                    >
                      {section.headline}
                    </h2>
                  </Reveal>

                  <div className="grid lg:grid-cols-[1fr,1px,1fr] gap-8 lg:gap-14">
                    <div className="space-y-6">
                      {section.body.slice(0, 2).map((para, i) => (
                        <Reveal key={i} delay={i * 0.12}>
                          <p
                            className="text-[1rem] lg:text-[1.0625rem] leading-[1.75]"
                            style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}
                          >
                            {para}
                          </p>
                        </Reveal>
                      ))}
                    </div>

                    {/* Vertical rule */}
                    <div className="hidden lg:block w-px h-full" style={{ background: "hsl(var(--dusk-line))" }} />

                    <div className="space-y-6">
                      {section.body.slice(2).map((para, i) => (
                        <Reveal key={i} delay={(i + 2) * 0.12}>
                          <p
                            className="text-[1rem] lg:text-[1.0625rem] leading-[1.75]"
                            style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}
                          >
                            {para}
                          </p>
                        </Reveal>
                      ))}

                      {/* Brand story pull-quote */}
                      <Reveal delay={0.4}>
                        <blockquote
                          className="dusk-serif text-[1.25rem] lg:text-[1.45rem] leading-[1.4] mt-10 pl-6 dusk-ivory"
                          style={{ borderLeft: "2px solid hsl(var(--dusk-gold))" }}
                        >
                          {brandStory.narrative[1]}
                        </blockquote>
                      </Reveal>
                    </div>
                  </div>
                </div>
              ))}
          </section>

          <SectionDivider />

          {/* ── The Problem ──────────────────────────────────────────────── */}
          <section
            className="relative py-28 lg:py-40"
            aria-labelledby="the-problem"
            style={{
              background:
                "radial-gradient(70% 50% at 50% 50%, hsl(var(--dusk-ivory) / 0.018) 0%, transparent 70%)",
            }}
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              {aboutPageContent.sections
                .filter((s) => s.id === "the-problem")
                .map((section) => (
                  <div key={section.id} className="max-w-[760px]">
                    <Reveal>
                      <p className="dusk-eyebrow mb-6">{section.eyebrow}</p>
                      <h2
                        id="the-problem"
                        className="dusk-serif text-[clamp(2rem,4vw,3.4rem)] dusk-ivory mb-14"
                      >
                        {section.headline}
                      </h2>
                    </Reveal>

                    <div className="space-y-8">
                      {section.body.map((para, i) => (
                        <Reveal key={i} delay={i * 0.14}>
                          <p
                            className="text-[1rem] lg:text-[1.125rem] leading-[1.8]"
                            style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}
                          >
                            {para}
                          </p>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <SectionDivider />

          {/* ── The Approach ─────────────────────────────────────────────── */}
          <section
            className="relative py-28 lg:py-40 mx-auto max-w-[1100px] px-6 lg:px-12"
            aria-labelledby="the-approach"
          >
            {aboutPageContent.sections
              .filter((s) => s.id === "the-approach")
              .map((section) => (
                <div key={section.id}>
                  <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                    <div>
                      <Reveal>
                        <p className="dusk-eyebrow mb-6">{section.eyebrow}</p>
                        <h2
                          id="the-approach"
                          className="dusk-serif text-[clamp(2rem,4vw,3.4rem)] dusk-ivory mb-10"
                        >
                          {section.headline}
                        </h2>
                      </Reveal>

                      <div className="space-y-6">
                        {section.body.map((para, i) => (
                          <Reveal key={i} delay={i * 0.13}>
                            <p
                              className="text-[1rem] lg:text-[1.0625rem] leading-[1.75]"
                              style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}
                            >
                              {para}
                            </p>
                          </Reveal>
                        ))}
                      </div>
                    </div>

                    {/* Brand story — founding narrative */}
                    <Reveal delay={0.2}>
                      <div
                        className="dusk-surface p-8 lg:p-10 relative overflow-hidden"
                      >
                        {/* Gold accent rule */}
                        <div
                          className="absolute top-0 left-0 w-[2px] h-full rounded-l-[1.25rem] opacity-50"
                          style={{ background: "hsl(var(--dusk-gold))" }}
                        />
                        <p className="dusk-eyebrow mb-6">Foundational Narrative</p>
                        <p
                          className="dusk-serif text-[1.1rem] lg:text-[1.25rem] leading-[1.5] dusk-ivory mb-6"
                        >
                          "{brandStory.narrative[2]}"
                        </p>
                        <div className="dusk-hairline mb-6" />
                        <p
                          className="text-[0.875rem] leading-[1.7]"
                          style={{ color: "hsl(var(--dusk-ivory) / 0.55)" }}
                        >
                          {brandStory.resolutionStatement}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              ))}
          </section>

          <SectionDivider />

          {/* ── Ecosystem Pillars ─────────────────────────────────────────── */}
          <section
            className="relative py-28 lg:py-40"
            aria-labelledby="ecosystem"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <Reveal>
                <p className="dusk-eyebrow mb-6">
                  <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                  The Ecosystem
                </p>
                <h2
                  id="ecosystem"
                  className="dusk-serif text-[clamp(2rem,4vw,3.4rem)] dusk-ivory mb-4 max-w-[640px]"
                >
                  Six pillars. One coherent system.
                </h2>
                <p
                  className="text-[1rem] lg:text-[1.0625rem] leading-[1.7] max-w-[540px] mb-16"
                  style={{ color: "hsl(var(--dusk-ivory) / 0.6)" }}
                >
                  Each pillar addresses a distinct dimension of reflective living.
                  Together, they form a complete operating system for timing and self-knowledge.
                </p>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ecosystemPillars.map((pillar, i) => (
                  <Reveal key={pillar.id} delay={i * 0.09}>
                    <Link
                      to={pillar.route}
                      className="group block h-full"
                      aria-label={`Explore ${pillar.name}`}
                    >
                      <article
                        className="dusk-surface p-7 h-full flex flex-col"
                        style={{ transition: "border-color 0.4s ease, box-shadow 0.4s ease" }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.borderColor = "hsl(var(--dusk-gold) / 0.35)";
                          el.style.boxShadow = "0 0 32px hsl(var(--dusk-gold) / 0.06)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.borderColor = "";
                          el.style.boxShadow = "";
                        }}
                      >
                        {/* Index numeral */}
                        <span
                          className="text-[0.65rem] tracking-[0.32em] uppercase mb-5 block"
                          style={{ color: "hsl(var(--dusk-silver))" }}
                        >
                          0{i + 1}
                        </span>

                        {/* Name */}
                        <h3 className="dusk-serif text-[1.35rem] dusk-ivory mb-2 group-hover:text-[hsl(var(--dusk-gold))] transition-colors duration-300">
                          {pillar.name}
                        </h3>

                        {/* Function */}
                        <p
                          className="text-[0.75rem] tracking-[0.14em] uppercase mb-5"
                          style={{ color: "hsl(var(--dusk-silver))" }}
                        >
                          {pillar.function}
                        </p>

                        <div className="dusk-hairline mb-5" />

                        {/* Tagline */}
                        <p
                          className="text-[0.9375rem] leading-[1.65] flex-1"
                          style={{ color: "hsl(var(--dusk-ivory) / 0.68)" }}
                        >
                          {pillar.tagline}
                        </p>

                        {/* Arrow */}
                        <div
                          className="mt-6 text-[0.7rem] tracking-[0.28em] uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: "hsl(var(--dusk-gold))" }}
                        >
                          Explore
                          <span aria-hidden="true">→</span>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ── Voice Principles ─────────────────────────────────────────── */}
          <section
            className="relative py-28 lg:py-40 mx-auto max-w-[1100px] px-6 lg:px-12"
            aria-labelledby="voice-principles"
          >
            <Reveal>
              <p className="dusk-eyebrow mb-6">
                <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                What This Sounds Like
              </p>
              <h2
                id="voice-principles"
                className="dusk-serif text-[clamp(2rem,4vw,3.4rem)] dusk-ivory mb-4 max-w-[640px]"
              >
                A system that sounds like someone who has observed their own life carefully.
              </h2>
              <p
                className="text-[1rem] lg:text-[1.0625rem] leading-[1.7] max-w-[540px] mb-16"
                style={{ color: "hsl(var(--dusk-ivory) / 0.6)" }}
              >
                Moontuner is not a brand with a message. It is a system with a voice — and that voice is grounded, restrained, and emotionally honest.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-5 mb-16">
              {voiceAndTone.coreVoice.map((item, i) => (
                <Reveal key={item.attribute} delay={i * 0.08}>
                  <div
                    className="dusk-surface p-6 lg:p-7"
                  >
                    <h3 className="dusk-serif text-[1.1rem] dusk-ivory mb-3">
                      {item.attribute}
                    </h3>
                    <p
                      className="text-[0.9375rem] leading-[1.7]"
                      style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Vocabulary contrast */}
            <Reveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="dusk-surface p-7 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-[2px] h-full rounded-l-[1.25rem]"
                    style={{ background: "hsl(var(--dusk-gold) / 0.6)" }}
                  />
                  <p className="dusk-eyebrow mb-5">Language We Use</p>
                  <ul className="space-y-2">
                    {brandVocabulary.preferred.slice(0, 12).map((word) => (
                      <li
                        key={word}
                        className="text-[0.9375rem]"
                        style={{ color: "hsl(var(--dusk-ivory) / 0.78)" }}
                      >
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="dusk-surface p-7 relative overflow-hidden"
                  style={{ opacity: 0.7 }}
                >
                  <div
                    className="absolute top-0 left-0 w-[2px] h-full rounded-l-[1.25rem]"
                    style={{ background: "hsl(var(--dusk-silver) / 0.3)" }}
                  />
                  <p className="dusk-eyebrow mb-5" style={{ opacity: 0.7 }}>Language We Avoid</p>
                  <ul className="space-y-2">
                    {brandVocabulary.avoid.slice(0, 12).map((word) => (
                      <li
                        key={word}
                        className="text-[0.9375rem] line-through"
                        style={{ color: "hsl(var(--dusk-silver) / 0.5)" }}
                      >
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </section>

          <SectionDivider />

          {/* ── Closing ───────────────────────────────────────────────────── */}
          <section className="relative py-28 lg:py-40 overflow-hidden">
            {/* Ambient orb */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <div
                className="w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.05] dusk-breath"
                style={{ background: "hsl(var(--dusk-ivory))" }}
              />
            </div>

            <div className="relative mx-auto max-w-[760px] px-6 lg:px-12 text-center">
              <Reveal>
                <p className="dusk-eyebrow mb-10">
                  <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                  The invitation
                </p>
                <blockquote
                  className="dusk-serif text-[clamp(1.5rem,3.5vw,2.4rem)] leading-[1.3] dusk-ivory mb-10"
                >
                  "{aboutPageContent.closingStatement}"
                </blockquote>
                <div className="dusk-hairline max-w-[80px] mx-auto mb-12" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/harmonic-profile" className="dusk-btn dusk-btn-primary">
                    Begin with Your Harmonic Profile
                  </Link>
                  <Link to="/today" className="dusk-btn dusk-btn-ghost">
                    Today's Directive
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
