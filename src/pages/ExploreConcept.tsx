import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SEOHead, articleSchema, breadcrumbSchema } from "@/components/SEOHead";
import {
  getConceptBySlug,
  getRelatedConcepts,
  EMOTIONAL_CATEGORY_LABELS,
  type ExploreConcept,
} from "@/data/exploreContent";
import { getEntryBySlug } from "@/data/journalEntries";
import { LunarCapture } from "@/components/LunarCapture";

// ─── Section renderer ─────────────────────────────────────────────────────────

function ConceptSection({
  heading,
  body,
  index,
}: {
  heading: string;
  body: string;
  index: number;
}) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <ScrollReveal delay={index * 0.07}>
      <section className="mb-12 lg:mb-16">
        <h2
          className="font-serif text-xl lg:text-2xl leading-[1.2] mb-5"
          style={{ color: "hsl(40 18% 86%)" }}
        >
          {heading}
        </h2>
        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base lg:text-[1.0625rem] leading-[1.85]"
              style={{ color: "hsl(40 14% 62%)" }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

// ─── Related concept card ─────────────────────────────────────────────────────

function RelatedConceptCard({ concept }: { concept: ExploreConcept }) {
  return (
    <Link to={`/explore/${concept.slug}`} className="group block">
      <div
        className="p-5 rounded-lg border transition-colors duration-300"
        style={{
          background: "hsl(22 12% 9%)",
          borderColor: "hsl(22 12% 16%)",
        }}
      >
        <span
          className="text-[0.55rem] tracking-[0.2em] uppercase"
          style={{ color: "hsl(40 12% 38%)" }}
        >
          {EMOTIONAL_CATEGORY_LABELS[concept.emotionalCategory]}
        </span>
        <h3
          className="font-serif text-base mt-2 mb-1 group-hover:text-amber-200/90 transition-colors duration-300"
          style={{ color: "hsl(40 18% 82%)" }}
        >
          {concept.label}
        </h3>
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "hsl(40 12% 44%)" }}
        >
          {concept.standfirst.split(".")[0]}.
        </p>
      </div>
    </Link>
  );
}

// ─── Related journal entry card ────────────────────────────────────────────────

function JournalEntryCard({ slug }: { slug: string }) {
  const entry = useMemo(() => getEntryBySlug(slug), [slug]);
  if (!entry) return null;

  return (
    <Link to={`/journal/${slug}`} className="group block">
      <div
        className="p-5 rounded-lg border transition-colors duration-300"
        style={{
          background: "hsl(22 12% 9%)",
          borderColor: "hsl(22 12% 16%)",
        }}
      >
        <p
          className="text-[0.55rem] tracking-[0.2em] uppercase mb-2"
          style={{ color: "hsl(40 12% 38%)" }}
        >
          {entry.moonPhase}
        </p>
        <h3
          className="font-serif text-base mb-1 group-hover:text-amber-200/90 transition-colors duration-300 leading-snug"
          style={{ color: "hsl(40 18% 82%)" }}
        >
          {entry.title}
        </h3>
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "hsl(40 12% 44%)" }}
        >
          {entry.excerpt}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ExploreConcept = () => {
  const { slug } = useParams<{ slug: string }>();
  const concept = useMemo(() => getConceptBySlug(slug ?? ""), [slug]);
  const related = useMemo(
    () => (concept ? getRelatedConcepts(concept) : []),
    [concept]
  );

  if (!concept) return <Navigate to="/explore" replace />;

  const canonicalUrl = `/explore/${concept.slug}`;
  const categoryLabel = EMOTIONAL_CATEGORY_LABELS[concept.emotionalCategory];

  const jsonLd = {
    "@graph": [
      articleSchema({
        title: concept.title,
        description: concept.seoDescription,
        url: canonicalUrl,
        publishedTime: "2026-01-01",
        tags: concept.keywords,
      }),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Explore", url: "/explore" },
        { name: concept.label, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <PageTransition>
      <SEOHead
        title={`${concept.title} — Moontuner`}
        description={concept.seoDescription}
        canonical={canonicalUrl}
        ogType="article"
        keywords={concept.keywords}
        article={{
          publishedTime: "2026-01-01",
          tags: concept.keywords,
          author: "Moontuner",
        }}
        jsonLd={jsonLd}
      />

      <div
        className="min-h-screen"
        style={{ background: "hsl(22 12% 7%)" }}
      >
        <Navigation />

        <main className="pt-24 lg:pt-32">
          {/* ── Article header ── */}
          <header className="mx-auto max-w-[800px] px-6 lg:px-8 pb-12 lg:pb-16">
            {/* Breadcrumb */}
            <ScrollReveal>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 mb-10"
              >
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{ color: "hsl(40 12% 40%)" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Explore
                </Link>
              </nav>
            </ScrollReveal>

            {/* Category */}
            <ScrollReveal delay={0.04}>
              <p
                className="text-[0.6rem] tracking-[0.26em] uppercase mb-5"
                style={{ color: "hsl(38 90% 58% / 0.65)" }}
              >
                {categoryLabel}
                {concept.lunarPhase && (
                  <>
                    <span style={{ color: "hsl(22 12% 28%)" }}> · </span>
                    {concept.lunarPhase}
                  </>
                )}
              </p>
            </ScrollReveal>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.08 }}
              className="font-serif text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] mb-7"
              style={{ color: "hsl(40 18% 90%)" }}
            >
              {concept.title}
            </motion.h1>

            {/* Standfirst */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.18 }}
              className="text-base lg:text-[1.1rem] leading-[1.75] mb-10 font-serif italic"
              style={{ color: "hsl(40 14% 60%)" }}
            >
              {concept.standfirst}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              style={{ height: "1px", background: "hsl(22 12% 15%)" }}
            />
          </header>

          {/* ── Two-column layout ── */}
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 pb-24 lg:pb-32">
            <div className="grid lg:grid-cols-[1fr,280px] gap-12 lg:gap-16">

              {/* ── Main article body ── */}
              <article>
                {concept.sections.map((section, i) => (
                  <ConceptSection
                    key={section.heading}
                    heading={section.heading}
                    body={section.body}
                    index={i}
                  />
                ))}

                {/* Closing reflection */}
                <ScrollReveal delay={0.1}>
                  <blockquote
                    className="mt-12 pt-10 pl-6 border-l-2 font-serif italic text-base lg:text-[1.05rem] leading-[1.8]"
                    style={{
                      borderTop: "1px solid hsl(22 12% 14%)",
                      borderLeftColor: "hsl(38 90% 58% / 0.4)",
                      color: "hsl(40 18% 68%)",
                    }}
                  >
                    {concept.closing}
                  </blockquote>
                </ScrollReveal>

                {/* ── Primary CTA ── */}
                <ScrollReveal delay={0.12}>
                  <div
                    className="mt-12 p-7 lg:p-9 rounded-xl border"
                    style={{
                      background: "hsl(22 12% 9%)",
                      borderColor: "hsl(22 12% 16%)",
                    }}
                  >
                    <p
                      className="text-[0.62rem] tracking-[0.22em] uppercase mb-3"
                      style={{ color: "hsl(38 90% 58% / 0.55)" }}
                    >
                      Continue
                    </p>
                    <p
                      className="font-serif text-lg mb-4"
                      style={{ color: "hsl(40 18% 84%)" }}
                    >
                      {concept.callToAction.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={concept.callToAction.href}
                        className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded-sm border transition-colors duration-200"
                        style={{
                          color: "hsl(38 90% 65%)",
                          borderColor: "hsl(38 90% 58% / 0.35)",
                          background: "hsl(38 90% 58% / 0.06)",
                        }}
                      >
                        {concept.callToAction.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {concept.secondaryCTA && (
                        <Link
                          to={concept.secondaryCTA.href}
                          className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded-sm border transition-colors duration-200"
                          style={{
                            color: "hsl(40 12% 48%)",
                            borderColor: "hsl(22 12% 20%)",
                          }}
                        >
                          {concept.secondaryCTA.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </ScrollReveal>

                {/* ── Keywords (semantic tags) ── */}
                <ScrollReveal delay={0.14}>
                  <div
                    className="mt-10 pt-8"
                    style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
                  >
                    <p
                      className="text-[0.58rem] tracking-[0.24em] uppercase mb-3"
                      style={{ color: "hsl(40 12% 34%)" }}
                    >
                      Related searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {concept.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[0.6rem] tracking-wide px-2.5 py-1 rounded-sm"
                          style={{
                            color: "hsl(40 12% 42%)",
                            background: "hsl(22 12% 11%)",
                            border: "1px solid hsl(22 12% 16%)",
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* ── Back navigation ── */}
                <ScrollReveal delay={0.16}>
                  <div
                    className="mt-10 pt-8 flex items-center gap-2"
                    style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
                  >
                    <Link
                      to="/explore"
                      className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase transition-colors duration-200"
                      style={{ color: "hsl(40 12% 44%)" }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Explore
                    </Link>
                  </div>
                </ScrollReveal>
              </article>

              {/* ── Sidebar ── */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-8">

                  {/* Related concepts */}
                  {related.length > 0 && (
                    <ScrollReveal delay={0.1}>
                      <div>
                        <p
                          className="text-[0.58rem] tracking-[0.24em] uppercase mb-4"
                          style={{ color: "hsl(40 12% 36%)" }}
                        >
                          Related concepts
                        </p>
                        <div className="space-y-3">
                          {related.map((c) => (
                            <RelatedConceptCard key={c.slug} concept={c} />
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )}

                  {/* Related journal entries */}
                  {concept.relatedJournalSlugs.length > 0 && (
                    <ScrollReveal delay={0.15}>
                      <div>
                        <p
                          className="text-[0.58rem] tracking-[0.24em] uppercase mb-4"
                          style={{ color: "hsl(40 12% 36%)" }}
                        >
                          From the journal
                        </p>
                        <div className="space-y-3">
                          {concept.relatedJournalSlugs.map((s) => (
                            <JournalEntryCard key={s} slug={s} />
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              </aside>
            </div>
          </div>

          {/* ── Email acquisition ── */}
          <div className="mx-auto max-w-[800px] px-6 lg:px-8 pb-24 lg:pb-32">
            <ScrollReveal>
              <LunarCapture source={`explore-${concept.slug}`} />
            </ScrollReveal>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ExploreConcept;
