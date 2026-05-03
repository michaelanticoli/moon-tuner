import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Music2, Moon, ArrowUpRight } from "lucide-react";

// Creator allowlist — add your emails here
const CREATOR_EMAILS = [
  "michael@creativealchemy.xyz",
  "michael@moontuner.xyz",
  "moontuner@gmail.com",
];

const isCreator = (email?: string | null) =>
  !!email && CREATOR_EMAILS.includes(email.toLowerCase());

interface Tile {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
}

const TILES: Tile[] = [
  {
    to: "/quantumelodic",
    title: "Astro-Harmonic Generator",
    desc: "One-off natal symphony: chart, interpretation, ElevenLabs audio, PDF.",
    icon: <Music2 className="w-5 h-5" />,
    tag: "Quantumelodic",
  },
  {
    to: "/lunar-reports",
    title: "Lunar Reports Generator",
    desc: "12-month Lunar Arc, Natal Signature, Power Day grid, CSV export.",
    icon: <Moon className="w-5 h-5" />,
    tag: "Lunar Arc",
  },
  {
    to: "/lunar-cipher",
    title: "Lunar Cipher",
    desc: "2026 ephemeris with VOC and exact phase timing.",
    icon: <Moon className="w-5 h-5" />,
    tag: "Cipher",
  },
];

export default function Studio() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!isCreator(user?.email)) {
    return (
      <PageTransition>
        <Navigation />
        <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Creator Studio
            </p>
            <h1 className="text-3xl font-thin mb-4">Access restricted</h1>
            <p className="text-muted-foreground">
              This area is reserved for the Moontuner creator team. Signed in as{" "}
              <span className="text-foreground">{user?.email}</span>.
            </p>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <header className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Creator Studio
            </p>
            <h1 className="text-4xl md:text-5xl font-thin mb-3">
              On-the-fly generators
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Quick access to every report engine. Spin up one-offs without
              touching the public funnel.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            {TILES.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="group relative border border-border/40 rounded-lg p-6 hover:border-accent/60 hover:bg-accent/[0.02] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md border border-border/40 flex items-center justify-center text-accent">
                      {t.icon}
                    </div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      {t.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <h2 className="text-xl font-light mb-2">{t.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
