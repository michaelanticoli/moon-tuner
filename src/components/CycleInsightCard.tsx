import { ExternalLink } from "lucide-react";
import { DATAPOINT_CATEGORIES, type LunarDatapoint } from "@/data/lunarDatapoints";

interface CycleInsightCardProps {
  datapoint: LunarDatapoint;
  compact?: boolean;
}

export function CycleInsightCard({ datapoint, compact }: CycleInsightCardProps) {
  const catInfo = DATAPOINT_CATEGORIES[datapoint.category as keyof typeof DATAPOINT_CATEGORIES] 
    || DATAPOINT_CATEGORIES.general;

  return (
    <div className="bg-card border border-border p-4 md:p-5 hover:border-accent/30 transition-colors group">
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5 shrink-0">{catInfo.icon}</span>
        <div className="min-w-0 flex-1">
          {!compact && (
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-medium block mb-1.5">
              {catInfo.label}
            </span>
          )}
          <p className={`text-foreground leading-relaxed ${compact ? "text-xs" : "text-sm"}`}>
            {datapoint.datapoint}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {datapoint.cardinal_values && (
              <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded">
                {datapoint.cardinal_values}
              </span>
            )}
            {datapoint.source_url && (
              <a
                href={datapoint.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 opacity-0 group-hover:opacity-100"
              >
                <ExternalLink className="w-3 h-3" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
