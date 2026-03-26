import { motion } from "framer-motion";
import { Download, Check, Sparkles, Moon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MailerLiteEmbed } from "@/components/MailerLiteEmbed";

export const LeadMagnet = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Prismatic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-gold/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm uppercase tracking-wide">Free Lunar Resource</span>
              </div>

              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6 leading-tight">
                Timing with the Moon:<br />
                <span className="text-gradient-gold">Lunar Guide & Workbook</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Your comprehensive introduction to aligning life with lunar rhythms. Learn to read the Moon's phases,
                avoid void-of-course pitfalls, and harness each zodiac transit for optimal timing.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "8 Moon phases & their meanings",
                  "Void of Course timing guide",
                  "12 zodiac sign transits decoded",
                  "Monthly & weekly planning templates",
                  "Personal reflection worksheets"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Side */}
            <div className="node-card relative">
              <div className="absolute -top-3 -right-3 flex gap-1 opacity-50">
                {[1, 2, 3, 4].map((i) => (
                  <Moon key={i} className={`w-3 h-3 text-accent ${i % 2 === 0 ? 'rotate-180' : ''}`} />
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
                  <Download className="w-5 h-5 text-background" />
                </div>
                <div>
                  <span className="system-label block">Subscribe for Access</span>
                  <span className="text-foreground font-serif">PDF + EPUB Formats</span>
                </div>
              </div>

              <MailerLiteEmbed />

              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="text-xs text-muted-foreground/60 mb-3">
                  Ready for deeper work?
                </p>
                <a
                  href="/workbooks"
                  className="text-sm text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
                >
                  Explore the Full Workbook Series
                  <Star className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
