import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, Moon } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { EntryTypeTag } from "@/components/journal/EntryTypeTag";
import { SEOHead } from "@/components/SEOHead";
import { LunarCapture } from "@/components/LunarCapture";
import {
  JOURNAL_ENTRIES,
  CONTENT_TYPE_META,
  getRecentEntries,
  searchEntries,
  type ContentType,
} from "@/data/journalEntries";
import { useLunarCalculations } from "@/hooks/useLunarCalculations";
import { JournalAISynthesis } from "@/components/ai/JournalAISynthesis";
import { format } from "date-fns";

// ─── Today's status panel ─────────────────────────────────────────────────────

function TodayPanel() {
  const { phaseName, phaseKey, insight, phase } = useLunarCalculations();

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const latestEntry = getRecentEntries(1)[0];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Today's lunar context"
    >
      {/* Ambient orb */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.07]"
        style={{ background: "hsl(38 90% 58%)" }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
        {/* Eyebrow */}
        <p
          className="text-[0.65rem] tracking-[0.32em] uppercase mb-10"
          style={{ color: "hsl(38 90% 58% / 0.65)" }}
        >
          <span
            className="inline-block w-5 h-px align-middle mr-3"
            style={{ background: "hsl(38 90% 58% / 0.5)" }}
          />
          {today}
        </p>

        {/* Hero headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] mb-6"
          style={{ color: "hsl(40 18% 88%)" }}
        >
          The Journal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
          className="text-base lg:text-lg leading-relaxed max-w-[560px] mb-16"
          style={{ color: "hsl(40 12% 58%)" }}
        >
          A reflective observatory. An archive of timing, intention, and
          self-observation. Return daily — your emotional memory lives here.
        </motion.p>

        {/* Status grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Moon phase */}
          <div
            className="p-5 rounded-lg border"
            style={{
              background: "hsl(22 12% 9%)",
              borderColor: "hsl(22 12% 16%)",
            }}
          >
            <p
              className="text-[0.58rem] tracking-[0.28em] uppercase mb-3"
              style={{ color: "hsl(40 12% 40%)" }}
            >
              Lunar State
            </p>
            <div className="flex items-center gap-3">
              <MoonPhaseGlyph phase={phaseKey} size="sm" className="w-8 h-8" />
              <div>
                <p
                  className="font-serif text-base leading-snug"
                  style={{ color: "hsl(40 18% 82%)" }}
                >
                  {phaseName}
                </p>
                <p
                  className="text-[0.65rem]"
                  style={{ color: "hsl(40 12% 42%)" }}
                >
                  {(phase * 100).toFixed(0)}% illuminated
                </p>
              </div>
            </div>
          </div>

          {/* Emotional weather */}
          <div
            className="p-5 rounded-lg border"
            style={{
              background: "hsl(22 12% 9%)",
              borderColor: "hsl(22 12% 16%)",
            }}
          >
            <p
              className="text-[0.58rem] tracking-[0.28em] uppercase mb-3"
              style={{ color: "hsl(40 12% 40%)" }}
            >
              Emotional Weather
            </p>
            <p
              className="font-serif text-base italic leading-snug"
              style={{ color: "hsl(40 18% 82%)" }}
            >
              {insight.theme}
            </p>
          </div>

          {/* Today's directive */}
          <div
            className="p-5 rounded-lg border"
            style={{
              background: "hsl(22 12% 9%)",
              borderColor: "hsl(22 12% 16%)",
            }}
          >
            <p
              className="text-[0.58rem] tracking-[0.28em] uppercase mb-3"
              style={{ color: "hsl(40 12% 40%)" }}
            >
              Today's Directive
            </p>
            <p
              className="font-serif text-base leading-snug"
              style={{ color: "hsl(40 18% 82%)" }}
            >
              {insight.title}
            </p>
          </div>

          {/* Resume */}
          {latestEntry && (
            <Link
              to={`/journal/${latestEntry.slug}`}
              className="p-5 rounded-lg border group transition-colors duration-300"
              style={{
                background: "hsl(22 12% 9%)",
                borderColor: "hsl(22 12% 16%)",
              }}
            >
              <p
                className="text-[0.58rem] tracking-[0.28em] uppercase mb-3"
                style={{ color: "hsl(40 12% 40%)" }}
              >
                Resume Where You Left Off
              </p>
              <p
                className="font-serif text-base leading-snug group-hover:text-amber-200/90 transition-colors"
                style={{ color: "hsl(40 18% 82%)" }}
              >
                {latestEntry.title}
              </p>
              <p
                className="text-[0.62rem] mt-1"
                style={{ color: "hsl(40 12% 40%)" }}
              >
                {latestEntry.moonPhase}
              </p>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Entry card ───────────────────────────────────────────────────────────────

function EntryCard({ entry }: { entry: (typeof JOURNAL_ENTRIES)[0] }) {
  return (
    <Link
      to={`/journal/${entry.slug}`}
      className="group block"
    >
      <article
        className="p-6 lg:p-8 rounded-xl border transition-all duration-500 h-full"
        style={{
          background: "hsl(22 12% 9%)",
          borderColor: "hsl(22 12% 16%)",
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <EntryTypeTag type={entry.type} />
          <span
            className="text-[0.58rem] tracking-[0.2em] uppercase shrink-0"
            style={{ color: "hsl(22 12% 36%)" }}
          >
            {entry.moonPhase}
          </span>
        </div>

        <h2
          className="font-serif text-xl lg:text-2xl leading-[1.15] mb-3 group-hover:text-amber-200/90 transition-colors duration-300"
          style={{ color: "hsl(40 18% 85%)" }}
        >
          {entry.title}
        </h2>

        <p
          className="text-sm leading-[1.7] mb-5 line-clamp-3"
          style={{ color: "hsl(40 12% 52%)" }}
        >
          {entry.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className="text-[0.62rem] tracking-wide"
            style={{ color: "hsl(40 12% 38%)" }}
          >
            {format(new Date(entry.date), "MMM d, yyyy")}
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "hsl(22 12% 30%)" }}
          />
          <span
            className="text-[0.62rem]"
            style={{ color: "hsl(40 12% 38%)" }}
          >
            {entry.emotionalWeather}
          </span>
        </div>

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {entry.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm"
                style={{
                  color: "hsl(40 12% 40%)",
                  background: "hsl(22 12% 12%)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

// ─── Featured essay (hero editorial card) ─────────────────────────────────────

function FeaturedEssay({ entry }: { entry: (typeof JOURNAL_ENTRIES)[0] }) {
  return (
    <Link to={`/journal/${entry.slug}`} className="group block col-span-full lg:col-span-2">
      <article
        className="relative p-8 lg:p-14 rounded-xl border overflow-hidden transition-colors duration-500"
        style={{
          background: "hsl(22 12% 9%)",
          borderColor: "hsl(22 12% 18%)",
        }}
      >
        {/* Ambient gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 20%, hsl(38 90% 58% / 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-8">
            <EntryTypeTag type={entry.type} />
            <span
              className="text-[0.58rem] tracking-[0.22em] uppercase"
              style={{ color: "hsl(22 12% 38%)" }}
            >
              {entry.moonPhase} · {entry.illumination}% illuminated
            </span>
          </div>

          <h2
            className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] mb-5 group-hover:text-amber-200/90 transition-colors duration-300"
            style={{ color: "hsl(40 18% 88%)" }}
          >
            {entry.title}
          </h2>

          <p
            className="text-base lg:text-[1.0625rem] leading-[1.75] max-w-[680px] mb-8"
            style={{ color: "hsl(40 12% 54%)" }}
          >
            {entry.excerpt}
          </p>

          <div className="flex items-center gap-2">
            <span
              className="text-[0.65rem] tracking-[0.24em] uppercase"
              style={{ color: "hsl(38 90% 58% / 0.7)" }}
            >
              Read
            </span>
            <span
              className="text-[0.65rem]"
              style={{ color: "hsl(38 90% 58% / 0.5)" }}
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Search bar ───────────────────────────────────────────────────────────────

function JournalSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: "hsl(40 12% 40%)" }}
      />
      <input
        type="search"
        placeholder="Search reflections, moon phases, emotional themes…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-[hsl(40_12%_36%)] font-sans"
        style={{
          background: "hsl(22 12% 9%)",
          border: "1px solid hsl(22 12% 18%)",
          color: "hsl(40 18% 80%)",
        }}
      />
    </div>
  );
}

// ─── Content type filter ──────────────────────────────────────────────────────

const ALL_TYPES: Array<ContentType | "all"> = [
  "all",
  "daily-directive",
  "reflection",
  "lunar-essay",
  "spacetime-proposal",
  "harmonic-profile-note",
  "digital-smudging-log",
  "workbook-entry",
  "personal-evolution-timeline",
];

function TypeFilter({
  active,
  onChange,
}: {
  active: ContentType | "all";
  onChange: (t: ContentType | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_TYPES.map((t) => {
        const label =
          t === "all" ? "All Types" : CONTENT_TYPE_META[t].label;
        const isActive = t === active;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className="text-[0.6rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm border transition-all duration-200 font-sans"
            style={{
              color: isActive
                ? "hsl(38 90% 65%)"
                : "hsl(40 12% 42%)",
              borderColor: isActive
                ? "hsl(38 90% 58% / 0.4)"
                : "hsl(22 12% 18%)",
              background: isActive
                ? "hsl(38 90% 58% / 0.08)"
                : "transparent",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Journal = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<ContentType | "all">("all");
  const { phaseName } = useLunarCalculations();

  const sorted = useMemo(
    () =>
      [...JOURNAL_ENTRIES].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const filtered = useMemo(() => {
    let results = search.trim() ? searchEntries(search) : sorted;
    if (activeType !== "all") {
      results = results.filter((e) => e.type === activeType);
    }
    return results;
  }, [search, sorted, activeType]);

  const featured = sorted.find((e) => e.type === "lunar-essay") ?? sorted[0];
  const grid = filtered.filter((e) => e.slug !== featured.slug);

  return (
    <PageTransition>
      <SEOHead
        title="Journal — Moontuner | Reflections, Directives & Lunar Observations"
        description="A reflective observatory — an archive of daily directives, lunar essays, emotional weather reports, and self-observation notes. Return daily. Your emotional memory lives here."
        canonical="/journal"
        keywords={[
          "reflective journaling",
          "lunar journal",
          "daily directive",
          "emotional patterns",
          "intentional living journal",
          "moon phase journal",
          "self-observation practice",
        ]}
      />
      <div
        className="min-h-screen"
        style={{ background: "hsl(22 12% 7%)" }}
      >
        <Navigation />

        <main>
          {/* Hero / today panel */}
          <TodayPanel />

          {/* Divider */}
          <div
            className="mx-auto max-w-[1100px] px-6 lg:px-12"
            style={{ height: "1px", background: "hsl(22 12% 14%)" }}
          />

          {/* AI emotional season synthesis */}
          <JournalAISynthesis lunarPhase={phaseName} />

          {/* Main content */}
          <section className="mx-auto max-w-[1100px] px-6 lg:px-12 py-20 lg:py-28">
            {/* Section header */}
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div>
                  <p
                    className="text-[0.62rem] tracking-[0.28em] uppercase mb-3"
                    style={{ color: "hsl(38 90% 58% / 0.6)" }}
                  >
                    <BookOpen
                      className="inline w-3 h-3 mr-2 align-middle"
                    />
                    Archive
                  </p>
                  <h2
                    className="font-serif text-3xl lg:text-4xl"
                    style={{ color: "hsl(40 18% 88%)" }}
                  >
                    All Reflections
                  </h2>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "hsl(40 12% 40%)" }}
                >
                  {JOURNAL_ENTRIES.length} entries · 8 content types
                </p>
              </div>
            </ScrollReveal>

            {/* Featured essay */}
            <ScrollReveal delay={0.05}>
              <div className="mb-8">
                <FeaturedEssay entry={featured} />
              </div>
            </ScrollReveal>

            {/* Search + filter */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-4 mb-10">
                <JournalSearch value={search} onChange={setSearch} />
                <TypeFilter active={activeType} onChange={setActiveType} />
              </div>
            </ScrollReveal>

            {/* Entry grid */}
            {filtered.length === 0 ? (
              <ScrollReveal>
                <div
                  className="text-center py-20 rounded-xl border"
                  style={{
                    background: "hsl(22 12% 9%)",
                    borderColor: "hsl(22 12% 16%)",
                  }}
                >
                  <Moon
                    className="w-10 h-10 mx-auto mb-4"
                    style={{ color: "hsl(40 12% 28%)" }}
                  />
                  <p
                    className="font-serif text-lg mb-2"
                    style={{ color: "hsl(40 18% 60%)" }}
                  >
                    No entries match your search.
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "hsl(40 12% 38%)" }}
                  >
                    Try a different phrase, moon phase, or emotional theme.
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {grid.map((entry, i) => (
                  <ScrollReveal key={entry.slug} delay={i * 0.05}>
                    <EntryCard entry={entry} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Timeline link */}
            <ScrollReveal delay={0.2}>
              <div
                className="mt-16 p-8 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                style={{
                  background: "hsl(22 12% 9%)",
                  borderColor: "hsl(22 12% 16%)",
                }}
              >
                <div>
                  <p
                    className="text-[0.6rem] tracking-[0.24em] uppercase mb-2"
                    style={{ color: "hsl(38 90% 58% / 0.55)" }}
                  >
                    <Clock className="inline w-3 h-3 mr-1.5 align-middle" />
                    Timeline
                  </p>
                  <p
                    className="font-serif text-xl"
                    style={{ color: "hsl(40 18% 82%)" }}
                  >
                    Trace your emotional arc across cycles
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "hsl(40 12% 44%)" }}
                  >
                    Pattern recognition · longitudinal self-observation ·
                    comparative lunar states
                  </p>
                </div>
                <Link
                  to="/lunar-cipher"
                  className="shrink-0 text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded-sm border transition-colors duration-200"
                  style={{
                    color: "hsl(38 90% 65%)",
                    borderColor: "hsl(38 90% 58% / 0.35)",
                    background: "hsl(38 90% 58% / 0.06)",
                  }}
                >
                  Open Your Cipher
                </Link>
              </div>
            </ScrollReveal>

            {/* Email acquisition */}
            <ScrollReveal delay={0.25}>
              <div className="mt-12">
                <LunarCapture
                  source="journal-page"
                  heading="Stay in the cycle."
                  subheading="Reflective transmissions, aligned to the lunar rhythm."
                />
              </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Journal;
