import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Moon } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { EntryTypeTag } from "@/components/journal/EntryTypeTag";
import { ReadingProgress } from "@/components/journal/ReadingProgress";
import { RelatedEntries } from "@/components/journal/RelatedEntries";
import { SEOHead, articleSchema, breadcrumbSchema } from "@/components/SEOHead";
import {
  getEntryBySlug,
  getRelatedEntries,
  CONTENT_TYPE_META,
} from "@/data/journalEntries";
import { format } from "date-fns";

// ─── Moon phase key normalizer (matches MoonPhaseGlyph expectations) ──────────

function normalizeMoonPhaseKey(phase: string) {
  const map: Record<string, string> = {
    "New Moon": "new",
    "Waxing Crescent": "waxing-crescent",
    "First Quarter": "first-quarter",
    "Waxing Gibbous": "waxing-gibbous",
    "Full Moon": "full",
    "Waning Gibbous": "waning-gibbous",
    "Last Quarter": "last-quarter",
    "Waning Crescent": "waning-crescent",
  };
  return (map[phase] ?? "new") as Parameters<typeof MoonPhaseGlyph>[0]["phase"];
}

// ─── Body renderer — renders newline-separated paragraphs ─────────────────────

function ArticleBody({ body }: { body: string }) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-6">
      {paragraphs.map((para, i) => {
        // Horizontal rule
        if (para.trim() === "---") {
          return (
            <hr
              key={i}
              className="my-8 border-none"
              style={{ height: "1px", background: "hsl(22 12% 18%)" }}
            />
          );
        }
        // Blockquote-style (starts with >)
        if (para.startsWith(">")) {
          return (
            <blockquote
              key={i}
              className="pl-5 border-l-2 font-serif italic"
              style={{
                borderColor: "hsl(38 90% 58% / 0.45)",
                color: "hsl(40 18% 72%)",
              }}
            >
              {para.replace(/^>\s*/, "")}
            </blockquote>
          );
        }
        // Normal paragraph
        return (
          <p
            key={i}
            className="text-base lg:text-[1.0625rem] leading-[1.85]"
            style={{ color: "hsl(40 14% 68%)" }}
          >
            {para}
          </p>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const JournalEntry = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = useMemo(() => getEntryBySlug(slug ?? ""), [slug]);
  const related = useMemo(
    () => (entry ? getRelatedEntries(entry) : []),
    [entry]
  );

  if (!entry) return <Navigate to="/journal" replace />;

  const meta = CONTENT_TYPE_META[entry.type];
  const phaseKey = normalizeMoonPhaseKey(entry.moonPhase);
  const formattedDate = format(new Date(entry.date), "MMMM d, yyyy");
  const canonicalUrl = `/journal/${entry.slug}`;
  const jsonLd = {
    "@graph": [
      articleSchema({
        title: entry.title,
        description: entry.excerpt,
        url: canonicalUrl,
        publishedTime: entry.date,
        tags: entry.tags,
      }),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Journal", url: "/journal" },
        { name: entry.title, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <SEOHead
        title={`${entry.title} — Moontuner Journal`}
        description={entry.excerpt}
        canonical={canonicalUrl}
        ogType="article"
        keywords={entry.tags}
        article={{
          publishedTime: entry.date,
          tags: entry.tags,
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
          {/* Article header */}
          <header className="mx-auto max-w-[800px] px-6 lg:px-8 pb-12 lg:pb-16">
            {/* Back link */}
            <ScrollReveal>
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase mb-10 transition-colors duration-200"
                style={{ color: "hsl(40 12% 40%)" }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Journal
              </Link>
            </ScrollReveal>

            {/* Type tag + moon phase */}
            <ScrollReveal delay={0.05}>
              <div className="flex items-center gap-3 mb-6">
                <EntryTypeTag type={entry.type} />
                <span
                  className="text-[0.6rem] tracking-[0.2em] uppercase"
                  style={{ color: "hsl(40 12% 36%)" }}
                >
                  {entry.moonPhase} · {entry.illumination}% illuminated
                </span>
              </div>
            </ScrollReveal>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
              className="font-serif text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] mb-6"
              style={{ color: "hsl(40 18% 90%)" }}
            >
              {entry.title}
            </motion.h1>

            {/* Excerpt / standfirst */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
              className="text-base lg:text-lg leading-[1.7] mb-10"
              style={{ color: "hsl(40 14% 56%)" }}
            >
              {entry.excerpt}
            </motion.p>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-8"
              style={{ borderBottom: "1px solid hsl(22 12% 14%)" }}
            >
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase"
                style={{ color: "hsl(40 12% 40%)" }}
              >
                {formattedDate}
              </span>
              {entry.timingTheme && (
                <>
                  <span style={{ color: "hsl(22 12% 24%)" }}>·</span>
                  <span
                    className="text-[0.65rem] tracking-[0.18em] uppercase"
                    style={{ color: "hsl(40 12% 40%)" }}
                  >
                    {entry.timingTheme}
                  </span>
                </>
              )}
              <span style={{ color: "hsl(22 12% 24%)" }}>·</span>
              <span
                className="text-[0.65rem] italic"
                style={{ color: "hsl(40 12% 40%)" }}
              >
                {entry.emotionalWeather}
              </span>
            </motion.div>
          </header>

          {/* Ambient moon glyph — decorative */}
          <div
            className="pointer-events-none fixed top-32 right-0 w-[340px] h-[340px] opacity-[0.035] select-none"
            aria-hidden
          >
            <MoonPhaseGlyph phase={phaseKey} size="lg" className="w-full h-full" />
          </div>

          {/* Two-column layout: article + sidebar */}
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 pb-24 lg:pb-32">
            <div className="grid lg:grid-cols-[1fr,280px] gap-12 lg:gap-16">
              {/* Article body */}
              <article>
                <ScrollReveal delay={0.1}>
                  <ArticleBody body={entry.body} />
                </ScrollReveal>

                {/* Tags */}
                {entry.tags.length > 0 && (
                  <ScrollReveal delay={0.15}>
                    <div
                      className="mt-12 pt-8"
                      style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
                    >
                      <p
                        className="text-[0.6rem] tracking-[0.24em] uppercase mb-3"
                        style={{ color: "hsl(40 12% 36%)" }}
                      >
                        Themes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.62rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm"
                            style={{
                              color: "hsl(40 12% 44%)",
                              background: "hsl(22 12% 11%)",
                              border: "1px solid hsl(22 12% 16%)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {/* Private annotation */}
                {entry.annotation && (
                  <ScrollReveal delay={0.2}>
                    <div
                      className="mt-8 p-5 rounded-lg border-l-2"
                      style={{
                        background: "hsl(22 12% 10%)",
                        borderLeftColor: "hsl(38 90% 58% / 0.4)",
                        border: "1px solid hsl(22 12% 15%)",
                        borderLeft: "2px solid hsl(38 90% 58% / 0.4)",
                      }}
                    >
                      <p
                        className="text-[0.58rem] tracking-[0.22em] uppercase mb-2"
                        style={{ color: "hsl(38 90% 58% / 0.5)" }}
                      >
                        Personal Note
                      </p>
                      <p
                        className="text-sm italic leading-relaxed"
                        style={{ color: "hsl(40 14% 58%)" }}
                      >
                        {entry.annotation}
                      </p>
                    </div>
                  </ScrollReveal>
                )}

                {/* Nav between entries */}
                <ScrollReveal delay={0.25}>
                  <div
                    className="mt-12 pt-8 flex items-center justify-between gap-4"
                    style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
                  >
                    <Link
                      to="/journal"
                      className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase transition-colors duration-200"
                      style={{ color: "hsl(40 12% 44%)" }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Journal
                    </Link>
                    <p
                      className="text-[0.62rem] tracking-wide"
                      style={{ color: "hsl(40 12% 32%)" }}
                    >
                      {meta.label}
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-10">
                  {/* Lunar context */}
                  <ScrollReveal delay={0.15}>
                    <div
                      className="p-5 rounded-lg border"
                      style={{
                        background: "hsl(22 12% 9%)",
                        borderColor: "hsl(22 12% 16%)",
                      }}
                    >
                      <p
                        className="text-[0.58rem] tracking-[0.24em] uppercase mb-4"
                        style={{ color: "hsl(40 12% 36%)" }}
                      >
                        Lunar Context
                      </p>
                      <div className="flex items-center gap-3 mb-4">
                        <MoonPhaseGlyph
                          phase={phaseKey}
                          size="sm"
                          className="w-8 h-8"
                        />
                        <div>
                          <p
                            className="font-serif text-sm"
                            style={{ color: "hsl(40 18% 80%)" }}
                          >
                            {entry.moonPhase}
                          </p>
                          <p
                            className="text-[0.6rem]"
                            style={{ color: "hsl(40 12% 40%)" }}
                          >
                            {entry.illumination}% illuminated
                          </p>
                        </div>
                      </div>
                      <div
                        className="pt-4"
                        style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
                      >
                        <p
                          className="text-[0.58rem] tracking-[0.2em] uppercase mb-1"
                          style={{ color: "hsl(40 12% 34%)" }}
                        >
                          Emotional Weather
                        </p>
                        <p
                          className="font-serif text-sm italic"
                          style={{ color: "hsl(40 18% 68%)" }}
                        >
                          {entry.emotionalWeather}
                        </p>
                      </div>
                      {entry.timingTheme && (
                        <div
                          className="mt-4 pt-4"
                          style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
                        >
                          <p
                            className="text-[0.58rem] tracking-[0.2em] uppercase mb-1"
                            style={{ color: "hsl(40 12% 34%)" }}
                          >
                            Timing Theme
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: "hsl(40 18% 68%)" }}
                          >
                            {entry.timingTheme}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>

                  {/* Content type info */}
                  <ScrollReveal delay={0.2}>
                    <div
                      className="p-5 rounded-lg border"
                      style={{
                        background: "hsl(22 12% 9%)",
                        borderColor: "hsl(22 12% 16%)",
                      }}
                    >
                      <EntryTypeTag type={entry.type} className="mb-3" />
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "hsl(40 12% 44%)" }}
                      >
                        {meta.description}
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Related entries */}
                  {related.length > 0 && (
                    <ScrollReveal delay={0.25}>
                      <RelatedEntries entries={related} />
                    </ScrollReveal>
                  )}

                  {/* Moon icon decoration */}
                  <div
                    className="flex items-center gap-2 opacity-25"
                    aria-hidden
                  >
                    <Moon className="w-3.5 h-3.5" style={{ color: "hsl(38 90% 58%)" }} />
                    <span
                      className="text-[0.55rem] tracking-[0.22em] uppercase"
                      style={{ color: "hsl(38 90% 58%)" }}
                    >
                      Moontuner Journal
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* Mobile-only related entries */}
        {related.length > 0 && (
          <section
            className="lg:hidden mx-auto max-w-[800px] px-6 pb-16"
            aria-label="Related reflections"
          >
            <div
              className="pt-8"
              style={{ borderTop: "1px solid hsl(22 12% 14%)" }}
            >
              <RelatedEntries entries={related} />
            </div>
          </section>
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default JournalEntry;
