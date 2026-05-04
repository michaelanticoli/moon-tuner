// Global floating launcher: jumps anyone (signed-in or not) into the
// MOONtuner Studio intake — the single place to enter birth data once and
// then fire any of the 4 personalized generators. Drop into App so it's
// reachable from every page.
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, X, Music2, Moon, Sun, Calendar, Layers } from "lucide-react";
import { useSharedBirth, isCompleteBirth } from "@/hooks/useSharedBirth";

const TILES = [
  { to: "/total-tuner", title: "Total Tuner", desc: "All four reports, one document.", icon: <Layers className="w-4 h-4" />, primary: true },
  { to: "/quantumelodic", title: "Astro-Harmonic Symphony", desc: "Chart → music + voiceover.", icon: <Music2 className="w-4 h-4" /> },
  { to: "/lunar-reports", title: "12-Month Lunar Arc", desc: "Power Days + monthly arc.", icon: <Moon className="w-4 h-4" /> },
  { to: "/cazimi", title: "Cazimi Punchcard", desc: "Solar Returns to your placements.", icon: <Sun className="w-4 h-4" /> },
  { to: "/lunar-cipher", title: "Lunar Cipher", desc: "2026 calendar (overlaid on your chart when birth data is set).", icon: <Calendar className="w-4 h-4" /> },
];

const HIDE_ON = ["/auth", "/studio", "/total-tuner"];

export function ReportLauncher() {
  const [open, setOpen] = useState(false);
  const { birth } = useSharedBirth();
  const navigate = useNavigate();
  const loc = useLocation();
  const ready = isCompleteBirth(birth);

  if (HIDE_ON.some((p) => loc.pathname.startsWith(p))) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open report launcher"
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 px-4 py-3 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:scale-105"
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.25em] font-medium">
          {ready ? "Reports" : "Generate"}
        </span>
        {ready && (
          <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-accent-foreground/70" />
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">
              MOONtuner Studio
            </p>
            <h2 className="text-2xl md:text-3xl font-thin mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              One chart. <span className="italic text-accent">Every report.</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {ready
                ? <>Birth data ready for <span className="text-foreground">{birth.name || "you"}</span>. Pick a report.</>
                : "Enter your birth data once — every generator on the site will pre-fill from it."}
            </p>

            {!ready && (
              <button
                onClick={() => { setOpen(false); navigate("/studio"); }}
                className="w-full mb-5 py-3 rounded-lg bg-accent/10 border border-accent/40 text-accent text-sm uppercase tracking-[0.25em] hover:bg-accent/20 transition-colors"
              >
                Enter Birth Data →
              </button>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              {TILES.map((t) => (
                <button
                  key={t.to}
                  onClick={() => { setOpen(false); navigate(t.to); }}
                  className={`text-left border rounded-lg p-4 transition-all hover:border-accent/60 hover:bg-accent/[0.03] ${
                    t.primary ? "border-accent/50 bg-accent/[0.04] sm:col-span-2" : "border-border/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-accent">
                    {t.icon}
                    <span className="text-xs uppercase tracking-[0.2em]">{t.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </button>
              ))}
            </div>

            {ready && (
              <button
                onClick={() => { setOpen(false); navigate("/studio"); }}
                className="mt-5 w-full text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                Edit birth data →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
