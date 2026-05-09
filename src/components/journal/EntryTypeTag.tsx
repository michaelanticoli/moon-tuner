import { CONTENT_TYPE_META, type ContentType } from "@/data/journalEntries";

interface EntryTypeTagProps {
  type: ContentType;
  className?: string;
}

export function EntryTypeTag({ type, className = "" }: EntryTypeTagProps) {
  const meta = CONTENT_TYPE_META[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[0.62rem] font-sans tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm ${className}`}
      style={{
        color: meta.color,
        background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
        border: `1px solid color-mix(in srgb, ${meta.color} 28%, transparent)`,
      }}
    >
      {meta.label}
    </span>
  );
}
