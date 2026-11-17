import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ED_GROUP_LABEL, ED_INDEX_FILTERS, ED_TOOLS, type IndexGroup } from "./editorialData";
import { Reveal } from "./Reveal";

type Filter = IndexGroup | "all";

/** Index of Tools — every instrument in the system, each row opening its tool. */
export function EdIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const rows = useMemo(
    () => (filter === "all" ? ED_TOOLS : ED_TOOLS.filter((t) => t.group === filter)),
    [filter],
  );

  return (
    <section id="index" aria-labelledby="ed-index" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-[calc(var(--ed-nav-h)+48px)] sm:px-8 md:pb-36 md:pt-[calc(var(--ed-nav-h)+72px)] lg:px-12">
        <Reveal className="grid gap-8 border-b border-black pb-10 md:grid-cols-12 md:items-end md:pb-14">
          <h2 id="ed-index" className="ed-display tracking-[-0.02em] text-[clamp(2.25rem,6vw,5rem)] md:col-span-8">
            Index of Tools
          </h2>
          <div className="ed-label flex flex-col gap-1.5 text-black/50 md:col-span-4 md:items-end md:text-right">
            <span>One Sky, Read Live</span>
            <span>{ED_TOOLS.length} Entries · Four Doors</span>
          </div>
        </Reveal>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter tools by door"
          className="flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-black/15 py-5"
        >
          {ED_INDEX_FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.key)}
                className={[
                  "ed-label border-b pb-1 transition-colors",
                  active ? "border-black text-black" : "border-transparent text-black/40 hover:text-black",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
          <span className="ed-label ml-auto text-black/40" aria-live="polite">
            {rows.length} / {ED_TOOLS.length}
          </span>
        </div>

        {/* Column headings — desktop only. */}
        <div
          className="ed-label hidden grid-cols-12 gap-6 border-b border-black/15 py-4 text-black/40 md:grid"
          aria-hidden="true"
        >
          <span className="col-span-2">No.</span>
          <span className="col-span-5">Title</span>
          <span className="col-span-2">Door</span>
          <span className="col-span-3 text-right">Format</span>
        </div>

        <ul aria-label="Tools">
          {rows.map((t) => (
            <li key={t.id} className="border-b border-black/15">
              <Link
                to={t.href}
                className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-6 text-black md:grid-cols-12 md:items-baseline md:gap-6 md:py-7"
              >
                <span className="ed-label order-1 text-black/50 md:col-span-2">{t.id}</span>

                <span className="ed-label order-2 flex items-center justify-end gap-2 text-black/50 md:hidden">
                  {ED_GROUP_LABEL[t.group]}
                </span>

                <span className="order-3 col-span-2 flex items-baseline gap-3 text-[1.0625rem] font-normal leading-snug tracking-[-0.005em] sm:text-lg md:col-span-5 md:text-[1.1875rem]">
                  <span className="ed-link">{t.title}</span>
                </span>

                <span className="ed-label order-4 hidden text-black/50 md:col-span-2 md:block">
                  {ED_GROUP_LABEL[t.group]}
                </span>

                <span className="ed-label order-5 col-span-2 flex items-center justify-between gap-3 text-black md:col-span-3 md:justify-end">
                  {t.format}
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
