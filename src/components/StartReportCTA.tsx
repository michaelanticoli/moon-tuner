import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Loader2 } from "lucide-react";

export function StartReportCTA() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    if (!date) {
      setError("Please enter your birth date.");
      return;
    }

    const checkoutWindow = window.open("", "_blank", "noopener,noreferrer");

    setError("");
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-report-payment", {
        body: { birthDate: date, birthTime: time, birthLocation: location },
      });
      if (fnError) throw fnError;
      if (data?.url) {
        sessionStorage.setItem("lunar_report_birth", JSON.stringify({ date, time, location }));

        if (checkoutWindow && !checkoutWindow.closed) {
          checkoutWindow.location.replace(data.url);
          checkoutWindow.focus();
          return;
        }

        if (window.top && window.top !== window.self) {
          window.top.location.href = data.url;
          return;
        }

        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.close();
      }
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
              Enter your birth date and get a personalized report: your natal lunar archetype, 
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

          {/* Right: form */}
          <div className="w-full lg:w-80 p-8 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Lunar Map Report</p>
                <p className="text-xs text-muted-foreground">Personalized · Instant delivery</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">
                  Birth Date *
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">
                  Birth Time (optional)
                </label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">
                  Birth Location (optional)
                </label>
                <Input
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <Button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-bold text-[11px] uppercase tracking-[0.3em] rounded-full transition-all duration-300"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing…</>
                ) : (
                  "Get My Report · $17"
                )}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                Secure checkout via Stripe. Report delivered instantly after payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
