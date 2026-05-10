import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SEOHead, websiteSchema } from "@/components/SEOHead";
import {
  EXPLORE_CONCEPTS,
  EMOTIONAL_CATEGORY_LABELS,
  type ExploreConcept,
} from "@/data/exploreContent";

// ─── Concept card ──────────────────────────────────────────────────────────────

function ConceptCard({ concept }: { concept: ExploreConcept }) {
  const categoryLabel =
    EMOTIONAL_CATEGORY_LABELS[concept.emotionalCategory];

  return (
    <Link to={`/explore/${concept.slug}`} className="group block h-full">
      <article
        className="h-full p-7 lg:p-9 rounded-xl border transition-all duration-500"
        style={{
          background: "hsl(22 12% 9%)",
          borderColor: "hsl(22 12% 16%)",
        }}
      >
        {/* Category pill */}
        <span
          className="inline-block text-[0.55rem] tracking-[0.22em] uppercase px-2.5 py-1 rounded-sm mb-6"
          style={{
            color: "hsl(40 12% 40%)",
            background: "hsl(22 12% 12%)",
            border: "1px solid hsl(22 12% 18%)",
          }}
        >
          {categoryLabel}
        </span>

        <h2
          className="font-serif text-xl lg:text-2xl leading-[1.2] mb-4 group-hover:text-amber-200/90 transition-colors duration-300"
          style={{ color: "hsl(40 18% 85%)" }}
        >
          {concept.label}
        </h2>

        <p
          className="text-sm leading-[1.7] mb-6 line-clamp-3"
          style={{ color: "hsl(40 12% 52%)" }}
        >
          {concept.standfirst}
        </p>

        <div
          className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase transition-colors duration-200"
          style={{ color: "hsl(38 90% 58% / 0.6)" }}
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const Explore = () => {
  const jsonLd = {
    ...websiteSchema(),
    "@type": "CollectionPage",
    name: "Explore — Moontuner",
    description:
      "Editorial guides on emotional regulation, creative rhythm, intentional living, and digital wellness.",
    url: "https://moontuner.xyz/explore",
  };

  return (
    <PageTransition>
      <SEOHead
        title="Explore — Moontuner | Emotional Regulation, Creative Rhythm & Intentional Living"
        description="Editorial guides on emotional weather, creative exhaustion, cyclical productivity, digital smudging, and how to regain clarity — written for emotionally intelligent people navigating modern life."
        canonical="/explore"
        keywords={[
          "emotional regulation",
          "creative rhythm",
          "cyclical productivity",
          "intentional living",
          "digital wellness",
          "how to regain clarity",
          "creative exhaustion",
          "push vs hold",
          "emotional weather",
        ]}
        jsonLd={jsonLd}
      />

      <div
        className="min-h-screen"
        style={{ background: "hsl(22 12% 7%)" }}
      >
        <Navigation />

        <main className="pt-24 lg:pt-32">
          {/* Hero */}
          <header className="mx-auto max-w-[1100px] px-6 lg:px-12 pb-16 lg:pb-20">
            {/* Eyebrow */}
            <ScrollReveal>
              <p
                className="text-[0.65rem] tracking-[0.32em] uppercase mb-8"
                style={{ color: "hsl(38 90% 58% / 0.6)" }}
              >
                <span
                  className="inline-block w-5 h-px align-middle mr-3"
                  style={{ background: "hsl(38 90% 58% / 0.5)" }}
                />
                Explore
              </p>
            </ScrollReveal>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.08] mb-6 max-w-[800px]"
              style={{ color: "hsl(40 18% 90%)" }}
            >
              Guides for emotionally intelligent people navigating modern life.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
              className="text-base lg:text-lg leading-[1.75] max-w-[600px]"
              style={{ color: "hsl(40 12% 56%)" }}
            >
              Not horoscopes. Not manifestation. Not productivity hacks.
              Honest, psychologically grounded writing on emotional weather,
              creative rhythm, timing, and intentional living — using the lunar
              cycle as a map, not a mandate.
            </motion.p>
          </header>

          {/* Divider */}
          <div
            className="mx-auto max-w-[1100px] px-6 lg:px-12"
            style={{ height: "1px", background: "hsl(22 12% 14%)" }}
          />

          {/* Grid */}
          <section className="mx-auto max-w-[1100px] px-6 lg:px-12 py-20 lg:py-28">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {EXPLORE_CONCEPTS.map((concept, i) => (
                <ScrollReveal key={concept.slug} delay={i * 0.06}>
                  <ConceptCard concept={concept} />
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Bridge to journal */}
          <section
            className="mx-auto max-w-[1100px] px-6 lg:px-12 pb-24 lg:pb-32"
          >
            <ScrollReveal>
              <div
                className="p-8 lg:p-12 rounded-xl border"
                style={{
                  background: "hsl(22 12% 9%)",
                  borderColor: "hsl(22 12% 16%)",
                }}
              >
                <p
                  className="text-[0.62rem] tracking-[0.28em] uppercase mb-4"
                  style={{ color: "hsl(38 90% 58% / 0.55)" }}
                >
                  Continue exploring
                </p>
                <h2
                  className="font-serif text-2xl lg:text-3xl mb-4"
                  style={{ color: "hsl(40 18% 88%)" }}
                >
                  The Journal — a living archive of reflections, directives, and
                  lunar observations.
                </h2>
                <p
                  className="text-sm lg:text-base leading-[1.75] mb-8 max-w-[560px]"
                  style={{ color: "hsl(40 12% 52%)" }}
                >
                  Where theory meets practice. Essays, daily directives,
                  personal reflections, and workbook entries — timestamped
                  against the lunar cycle.
                </p>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded-sm border transition-colors duration-200"
                  style={{
                    color: "hsl(38 90% 65%)",
                    borderColor: "hsl(38 90% 58% / 0.35)",
                    background: "hsl(38 90% 58% / 0.06)",
                  }}
                >
                  Open the Journal
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Explore;
