import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Check, Sparkles, Moon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "sonner";

export const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
     
     try {
       const { data, error } = await supabase.functions.invoke("subscribe-email", {
         body: { email, source: "lead-magnet" },
       });
 
       if (error) throw error;
 
      setIsSubmitted(true);
     } catch (error) {
       console.error("Lead magnet signup error:", error);
       toast.error("Couldn't process your request", {
         description: "Please try again.",
       });
     } finally {
      setIsLoading(false);
     }
  };

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
              {/* Decorative moon phases */}
              <div className="absolute -top-3 -right-3 flex gap-1 opacity-50">
                {[1, 2, 3, 4].map((i) => (
                  <Moon key={i} className={`w-3 h-3 text-accent ${i % 2 === 0 ? 'rotate-180' : ''}`} />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
                        <Download className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <span className="system-label block">Instant Download</span>
                        <span className="text-foreground font-serif">PDF + EPUB Formats</span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email for lunar updates"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-11 h-12 bg-background/50 border-border/50 focus:border-accent"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        variant="gold" 
                        size="lg" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Moon className="w-4 h-4 animate-pulse" />
                            Aligning...
                          </span>
                        ) : (
                          <>
                            Download Free Guide
                            <Download className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground/60 text-center">
                        Join the lunar-attuned. Unsubscribe anytime.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-accent" />
                    </div>
                    
                    <h3 className="font-serif text-2xl text-foreground mb-3">
                      The Moon Guides You
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      Your lunar guide is ready. Download below to begin your journey.
                    </p>
                    
                    <div className="flex gap-3 justify-center">
                      <Button variant="gold" asChild>
                        <a href="/downloads/Timing_with_the_Moon_Lunar_Guide_Free.pdf" download>
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/downloads/Timing_with_the_Moon_Lunar_Guide_Workbook.epub.zip" download>
                          <Download className="w-4 h-4 mr-2" />
                          EPUB
                        </a>
                      </Button>
                    </div>
                    
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
