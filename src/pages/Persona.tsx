import { Link } from "react-router-dom";
import { ArrowRight, Music, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Persona() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative px-6 lg:px-12 py-32 lg:py-40 max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Persona Edition
        </p>
        <h1 className="font-serif text-4xl lg:text-6xl leading-tight mb-8">
          Your Birth Chart, Composed.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-12">
          The Persona Edition Birth Chart Compendium is a complete reference of
          your natal map: translated into harmonic language, printed as a
          readable report, and scored as a private audio composition. Not a
          prediction — a portrait.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Natal Reference
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A complete breakdown of your Moon, Sun, planets, and key points,
              written as a living reference rather than a static forecast.
            </p>
          </div>
          <div className="border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Harmonic Score
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Each planetary placement is mapped to an instrument, tone, and
              musical role, creating a personalized sonic signature.
            </p>
          </div>
          <div className="border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Printable Report
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Export your compendium as a designed PDF you can return to again
              and again as your timing evolves.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/harmonic-profile">
              Generate Your Persona
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/natal-harmonic">
              Preview the Engine
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
