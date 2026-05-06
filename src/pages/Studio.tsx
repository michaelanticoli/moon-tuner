import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import {
  useSharedBirth,
  isCompleteBirth,
  isValidEmail,
  captureBirthEmail,
} from "@/hooks/useSharedBirth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Music2,
  Moon,
  Sun,
  ArrowUpRight,
  Check,
  AlertCircle,
  Rocket,
  Eraser,
  Layers,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { CreatorNarrationStudio } from "@/components/studio/CreatorNarrationStudio";

import { isCreator } from "@/lib/creatorAccess";

interface Tile {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
  needsBirth: boolean;
}

const BIRTH_TILES: Tile[] = [
  {
    to: "/quantumelodic",
    title: "Astro-Harmonic Symphony",
    desc: "Natal chart → generative musical score, ElevenLabs voiceover, PDF.",
    icon: <Music2 className="w-5 h-5" />,
    tag: "Symphony",
    needsBirth: true,
  },
  {
    to: "/lunar-reports",
    title: "12-Month Lunar Arc",
    desc: "Personal Power Days, Natal Signature, monthly arc, CSV export.",
    icon: <Moon className="w-5 h-5" />,
    tag: "Lunar Arc",
    needsBirth: true,
  },
  {
    to: "/cazimi",
    title: "Cazimi Punchcard",
    desc: "Each year's exact Solar Returns to every natal placement.",
    icon: <Sun className="w-5 h-5" />,
    tag: "Cazimi",
    needsBirth: true,
  },
];

const STANDALONE_TILES: Tile[] = [
  {
    to: "/lunar-cipher",
    title: "Lunar Cipher",
    desc: "2026 ephemeris with VOC and exact phase timing — overlays your chart when birth data is set.",
    icon: <Calendar className="w-5 h-5" />,
    tag: "Cipher",
    needsBirth: false,
  },
];

export default function Studio() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { birth, update } = useSharedBirth();
  const [form, setForm] = useState(birth);

  useEffect(() => setForm(birth), [birth]);

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

  // Studio is open to all signed-in users (creator allowlist kept only as a label).
  void isCreator;

  const ready = isCompleteBirth(form);

  const saveForm = async () => {
    update(form);
    toast.success("Birth data saved — generators will pre-fill automatically.");
    if (form.email && isValidEmail(form.email)) {
      const r = await captureBirthEmail(form, "studio-intake");
      if (r.ok) toast.success("Email captured to your subscriber list.");
    }
  };

  const clearForm = () => {
    const empty = { name: "", date: "", time: "", location: "", email: "" };
    setForm(empty);
    update(empty);
    toast("Birth data cleared.");
  };

  const openOne = (path: string, requiresBirth: boolean) => {
    if (requiresBirth) {
      if (!ready) {
        toast.error("Enter and save birth data first.");
        return;
      }
      update(form);
    }
    navigate(path);
  };

  const generateAll = () => {
    if (!ready) {
      toast.error("Enter and save birth data first.");
      return;
    }
    update(form);
    navigate("/total-tuner");
  };

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
              One chart. <span className="italic text-accent">Every report.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Enter birth data once, then generate any single report or fire all
              three at once. Data persists across generators via the metasystem.
            </p>
          </header>

          {/* Step 1 — Birth Intake */}
          <section className="mb-10 border border-border/40 rounded-lg p-6 bg-accent/[0.015]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border border-accent/60 flex items-center justify-center text-xs text-accent">
                  1
                </span>
                <h2 className="text-lg font-light tracking-wide">
                  Subject birth data
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {ready ? (
                  <span className="flex items-center gap-1.5 text-accent">
                    <Check className="w-3.5 h-3.5" /> Ready
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <AlertCircle className="w-3.5 h-3.5" /> Incomplete
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Aria Solenne"
                  className="mt-1.5 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Birth location
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="City, Country"
                  className="mt-1.5 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Birth date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1.5 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Birth time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="mt-1.5 bg-background"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email <span className="text-muted-foreground/60 normal-case">(optional — saves your chart + sends the lunar guide)</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@domain.com"
                className="mt-1.5 bg-background"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={saveForm} variant="gold" size="sm">
                Save subject
              </Button>
              <Button onClick={clearForm} variant="ghost" size="sm">
                <Eraser className="w-3.5 h-3.5" /> Clear
              </Button>
            </div>
          </section>

          {/* Step 2 — Holistic */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full border border-accent/60 flex items-center justify-center text-xs text-accent">
                2
              </span>
              <h2 className="text-lg font-light tracking-wide">
                Generate holistically
              </h2>
            </div>
            <div className="border border-accent/30 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-br from-accent/[0.04] to-transparent">
              <div>
                <h3 className="text-xl font-light mb-1 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" /> Total Tuner Report
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  All four engines assembled into one comprehensive document —
                  Symphony, Lunar Arc, Cazimi Punchcard, and a personalized
                  Cipher overlay. Exportable as a single PDF.
                </p>
              </div>
              <Button onClick={generateAll} variant="gold" size="lg" disabled={!ready}>
                <Rocket className="w-4 h-4" /> Generate Total Tuner
              </Button>
            </div>
          </section>

          {/* Step 3 — Individual */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full border border-accent/60 flex items-center justify-center text-xs text-accent">
                3
              </span>
              <h2 className="text-lg font-light tracking-wide">
                Or generate one at a time
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {BIRTH_TILES.map((t) => (
                <button
                  key={t.to}
                  onClick={() => openOne(t.to, t.needsBirth)}
                  disabled={!ready}
                  className="group relative text-left border border-border/40 rounded-lg p-5 hover:border-accent/60 hover:bg-accent/[0.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-md border border-border/40 flex items-center justify-center text-accent">
                      {t.icon}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    {t.tag}
                  </span>
                  <h3 className="text-base font-light mt-1 mb-1.5">{t.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {isCreator(user?.email) && <CreatorNarrationStudio />}

          {/* Standalone — no birth data */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                No birth data required
              </span>
              <span className="flex-1 h-px bg-border/40" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {STANDALONE_TILES.map((t) => (
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
                  <h3 className="text-base font-light mb-1.5">{t.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
