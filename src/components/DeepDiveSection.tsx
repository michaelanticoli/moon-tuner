import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CycleInsightCard } from "./CycleInsightCard";
import { fetchDatapoints, generateCycleInsight, type LunarDatapoint } from "@/data/lunarDatapoints";

interface DeepDiveSectionProps {
  title: string;
  subtitle: string;
  category: string;
  contextHint?: string;
  limit?: number;
}

export function DeepDiveSection({ title, subtitle, category, contextHint, limit = 5 }: DeepDiveSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [datapoints, setDatapoints] = useState<LunarDatapoint[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !loaded) {
      fetchDatapoints({ category, limit, minRelevance: 0.7 }).then((data) => {
        setDatapoints(data);
        setLoaded(true);
      });
    }
  }, [isOpen, loaded, category, limit]);

  const handleGenerateInsight = async () => {
    setLoadingAi(true);
    const { insight } = await generateCycleInsight(category, contextHint);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  return (
    <div className="border border-border bg-card/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-muted/10 transition-colors"
      >
        <div>
          <h4 className="font-serif text-lg text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 space-y-3">
              {datapoints.length === 0 && loaded && (
                <p className="text-sm text-muted-foreground italic">No datapoints available for this category yet.</p>
              )}
              {datapoints.map((dp) => (
                <CycleInsightCard key={dp.id} datapoint={dp} compact />
              ))}

              {datapoints.length > 0 && (
                <div className="pt-4 border-t border-border">
                  {aiInsight ? (
                    <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold">
                          Cycle Intelligence
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{aiInsight}</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleGenerateInsight}
                      disabled={loadingAi}
                      className="inline-flex items-center gap-2 text-xs text-accent hover:text-accent/80 transition-colors disabled:opacity-50"
                    >
                      {loadingAi ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3" />
                      )}
                      {loadingAi ? "Synthesizing..." : "Generate Cycle Intelligence"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
