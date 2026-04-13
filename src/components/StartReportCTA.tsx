import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function StartReportCTA() {
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/4gMcN4asS9AS0Qf0bT2Ji01";

  const handlePurchase = () => {
    window.location.href = STRIPE_PAYMENT_LINK;
  };

  return (
    <section id="report" className="py-24 border-t border-border/30 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: copy */}
          <div className="flex-1">
            <span className="system-label block mb-6">Personal Lunar Map · $17</span>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-foreground mb-6 leading-tight">
              Your birth chart<br />
              <span className="italic">decoded by the Moon.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Complete checkout first, then enter your birth data once on the next screen to generate your personalized report: your natal lunar archetype,
              12-month power arc, somatic body zone, and Solfeggio frequency — delivered instantly
              as an interactive page and downloadable PDF.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Natal lunar phase & archetype",
                "12-month personal power arc",
                "Somatic body zone & Solfeggio frequency",
                "Interactive HTML + downloadable PDF",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: checkout */}
          <div className="w-full lg:w-80 p-8 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Lunar Map Report</p>
                <p className="text-xs text-muted-foreground">Secure checkout · Post-payment generator</p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                You will enter your name, birth date, birth time, and location after payment — only once.
              </p>

              <Button
                onClick={handlePurchase}
                className="w-full h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-bold text-[11px] uppercase tracking-[0.3em] rounded-full transition-all duration-300"
              >
                Get My Report · $17
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                Secure checkout via Stripe. After payment you are routed directly to the generator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
