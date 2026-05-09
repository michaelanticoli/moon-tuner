import { Link } from "react-router-dom";
import { type JournalEntry } from "@/data/journalEntries";
import { EntryTypeTag } from "./EntryTypeTag";
import { format } from "date-fns";

interface RelatedEntriesProps {
  entries: JournalEntry[];
}

export function RelatedEntries({ entries }: RelatedEntriesProps) {
  if (entries.length === 0) return null;

  return (
    <aside aria-label="Related reflections">
      <p
        className="text-[0.65rem] tracking-[0.28em] uppercase mb-6"
        style={{ color: "hsl(38 90% 58% / 0.6)" }}
      >
        Connected Reflections
      </p>
      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            to={`/journal/${entry.slug}`}
            className="group block p-4 rounded-md border transition-colors duration-300"
            style={{
              background: "hsl(22 12% 10%)",
              borderColor: "hsl(22 12% 18%)",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <EntryTypeTag type={entry.type} />
              <span
                className="text-[0.6rem] tracking-widest uppercase shrink-0"
                style={{ color: "hsl(22 12% 40%)" }}
              >
                {entry.moonPhase}
              </span>
            </div>
            <p
              className="font-serif text-base leading-snug group-hover:text-amber-200/90 transition-colors"
              style={{ color: "hsl(40 18% 82%)" }}
            >
              {entry.title}
            </p>
            <p
              className="text-xs mt-1.5"
              style={{ color: "hsl(22 12% 40%)" }}
            >
              {format(new Date(entry.date), "MMM d, yyyy")} ·{" "}
              {entry.emotionalWeather}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
