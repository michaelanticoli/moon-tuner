import { useState, useEffect } from "react";
import { Sparkles, Loader2, Filter } from "lucide-react";
import { CycleInsightCard } from "@/components/CycleInsightCard";
import {
  DATAPOINT_CATEGORIES,
  fetchDatapointsByCategories,
  generateCycleInsight,
  type LunarDatapoint,
  type DatapointCategory,
} from "@/data/lunarDatapoints";

export function SchoolCycles() {
  const [grouped, setGrouped] = useState<Record<string, LunarDatapoint[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    fetchDatapointsByCategories().then((data) => {
      setGrouped(data);
      setLoading(false);
    });
  }, []);

  const categories = Object.keys(DATAPOINT_CATEGORIES) as DatapointCategory[];
  const filteredCategories = activeCategory
    ? categories.filter((c) => c === activeCategory)
    : categories.filter((c) => grouped[c]?.length);

  const handleGenerateInsight = async (cat: string) => {
    setLoadingAi(true);
    const { insight } = await generateCycleInsight(cat);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  const totalCount = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent font-medium mb-3">
          Advanced Theory
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-3">
          Cosmic Cycles Knowledge Base
        </h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {totalCount} curated astronomical datapoints spanning Saros eclipse returns, 
          Metonic harmonies, synodic periods, and planetary cycles — the science beneath the system.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
            !activeCategory
              ? "border-accent text-accent bg-accent/10"
              : "border-border text-muted-foreground hover:border-accent/30"
          }`}
        >
          <Filter className="w-3 h-3 inline mr-1.5" />
          All ({totalCount})
        </button>
        {categories.map((cat) => {
          const count = grouped[cat]?.length || 0;
          if (count === 0) return null;
          const info = DATAPOINT_CATEGORIES[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                activeCategory === cat
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted-foreground hover:border-accent/30"
              }`}
            >
              {info.icon} {info.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Category Sections */}
      <div className="space-y-12">
        {filteredCategories.map((cat) => {
          const datapoints = grouped[cat] || [];
          if (datapoints.length === 0) return null;
          const info = DATAPOINT_CATEGORIES[cat];

          return (
            <section key={cat}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl text-foreground flex items-center gap-2">
                    <span>{info.icon}</span> {info.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                </div>
                <button
                  onClick={() => handleGenerateInsight(cat)}
                  disabled={loadingAi}
                  className="text-[10px] text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loadingAi ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Synthesize
                </button>
              </div>

              {aiInsight && activeCategory === cat && (
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold">
                      Cycle Intelligence
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{aiInsight}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {datapoints.slice(0, 10).map((dp) => (
                  <CycleInsightCard key={dp.id} datapoint={dp} />
                ))}
              </div>
              {datapoints.length > 10 && (
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Showing 10 of {datapoints.length} datapoints in this category.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
