import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Moon, Star } from "lucide-react";

export function GraduateToChaperone() {
  return (
    <div className="bg-gradient-to-br from-card to-muted/30 border border-border p-8 lg:p-12 text-center">
      <div className="flex justify-center gap-2 mb-6">
        <Moon className="w-8 h-8 text-accent" />
        <Star className="w-6 h-6 text-muted-foreground" />
        <BookOpen className="w-8 h-8 text-accent" />
      </div>
      
      <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">
        Ready to Apply Your Knowledge?
      </h3>
      
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        You've mastered the 96-combination matrix. Now experience it in real-time with the 
        <strong className="text-foreground"> Lunar Chaperone</strong>—26 workbooks that guide you through 
        every New Moon to Full Moon journey and back again. A timeless guide for a lunar lifetime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto text-left">
        <div className="bg-background/50 p-6 border border-border">
          <h4 className="font-medium text-foreground mb-2">Always In Play</h4>
          <p className="text-sm text-muted-foreground">
            No matter when you start, there's a workbook for your current lunar position
          </p>
        </div>
        <div className="bg-background/50 p-6 border border-border">
          <h4 className="font-medium text-foreground mb-2">Somatic Integration</h4>
          <p className="text-sm text-muted-foreground">
            Each workbook maps to body regions, connecting lunar energy to physical experience
          </p>
        </div>
        <div className="bg-background/50 p-6 border border-border">
          <h4 className="font-medium text-foreground mb-2">Evergreen Wisdom</h4>
          <p className="text-sm text-muted-foreground">
            Archetypal guidance that never expires—use year after year as the cycles return
          </p>
        </div>
      </div>

      <Button size="lg" asChild>
        <a href="/workbooks">
          Explore the Lunar Chaperone
          <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </div>
  );
}
