export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-4 mb-0.5">
      <span className="flex-1 h-px bg-border" />
      <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 whitespace-nowrap">
        {label}
      </span>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}
