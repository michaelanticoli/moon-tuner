// Shared "metasystem" footer — surfaces the other two generators at the bottom
// of any report. Birth data carries across via useSharedBirth().
import { Link } from "react-router-dom";
import { Music2, Moon, Sun, ArrowUpRight } from "lucide-react";

interface Tile {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
}

const ALL: Tile[] = [
  {
    to: "/quantumelodic",
    title: "Astro-Harmonic Symphony",
    desc: "Hear this chart as music — a generative natal score with ElevenLabs audio and PDF.",
    icon: <Music2 className="w-4 h-4" />,
    tag: "Symphony",
  },
  {
    to: "/lunar-reports",
    title: "12-Month Lunar Arc",
    desc: "Your year of Power Days, Natal Signature, and monthly arc — keyed to this chart.",
    icon: <Moon className="w-4 h-4" />,
    tag: "Lunar Arc",
  },
  {
    to: "/cazimi",
    title: "Cazimi Punchcard",
    desc: "Each year's exact Solar Returns to every natal placement. Brief windows of pure renewal.",
    icon: <Sun className="w-4 h-4" />,
    tag: "Cazimi",
  },
];

export function CrossGeneratorLinks({ exclude }: { exclude: "/quantumelodic" | "/lunar-reports" | "/cazimi" }) {
  const tiles = ALL.filter((t) => t.to !== exclude);
  return (
    <section className="mt-24 pt-12 border-t border-border/40">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground text-center mb-2">
        The Metasystem
      </p>
      <h2
        className="text-2xl md:text-3xl font-thin text-center mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        One chart. <span className="italic text-accent">Three readings.</span>
      </h2>
      <p className="text-sm text-muted-foreground text-center max-w-xl mx-auto mb-10">
        Your birth details carry forward. Continue exploring this chart through
        the other generators.
      </p>
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group relative border border-border/40 rounded-lg p-5 hover:border-accent/60 hover:bg-accent/[0.02] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md border border-border/40 flex items-center justify-center text-accent">
                  {t.icon}
                </div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  {t.tag}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-lg font-light mb-1">{t.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
