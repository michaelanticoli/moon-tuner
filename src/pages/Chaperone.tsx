import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Moon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chaperone() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative px-6 lg:px-12 py-32 lg:py-40 max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          The Lunar Chaperone
        </p>
        <h1 className="font-serif text-4xl lg:text-6xl leading-tight mb-8">
          26 Half-Cycles. One Lifetime of Timing.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-12">
          The Lunar Chaperone Program is a guided workbook system that walks
          you through every New Moon to Full Moon arc — and every Full Moon to
          New Moon return. It is an evergreen field guide for attunement, not a
          one-time forecast.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                26 Workbooks
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Each workbook corresponds to one sign-to-sign transition in the
              lunar cycle, mapping archetypal movement to body, rhythm, and
              intention.
            </p>
          </div>
          <div className="border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Two Half-Cycles
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              One series tracks the waxing half from New Moon to Full Moon.
              The other tracks the waning return from Full Moon to New Moon.
            </p>
          </div>
          <div className="border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Always In Play
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              No matter when you begin, there is a workbook for your current lunar
              position. Start where you are.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/workbooks">
              Explore the Workbooks
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/lunar-chaperone">
              Open the Full Chaperone
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
