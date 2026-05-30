import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { EmailSubscribeForm } from "@/components/EmailSubscribeForm";
import { Download, Check, Moon } from "lucide-react";

const FreeGuide = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-8">
              <Moon className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm uppercase tracking-wide">Free Lunar Guide</span>
            </div>

            <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6 leading-tight">
              Timing with the Moon
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-12">
              A complete introduction to lunar phases, void-of-course timing, and zodiac transits.
              Delivered straight to your inbox as a PDF + EPUB.
            </p>

            <div className="node-card text-left mb-10">
              <ul className="space-y-3 mb-8">
                {[
                  "8 Moon phases & their meanings",
                  "Void of Course timing guide",
                  "12 zodiac sign transits decoded",
                  "Monthly & weekly planning templates",
                  "A sample workbook day from the Chaperone series",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 mb-6 pt-6 border-t border-border/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-background" />
                </div>
                <div>
                  <span className="system-label block">Enter your email</span>
                  <span className="text-foreground font-serif">PDF arrives in your inbox</span>
                </div>
              </div>

              <EmailSubscribeForm source="free-guide" buttonText="Send Me the Guide" />
            </div>

            <p className="text-xs text-muted-foreground/60">
              No spam. Unsubscribe anytime. Your email joins the Lunar Dispatch.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default FreeGuide;
