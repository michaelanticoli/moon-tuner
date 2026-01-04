import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section id="connect" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-4">
            Stay Connected
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-6">
            Lunar Dispatch
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
            Quiet transmissions aligned to the cycle. Phase reflections, practice nudges, 
            and early access to new tools. No spam, no noise.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
              required
            />
            <Button type="submit" variant="gold" size="lg">
              Subscribe
            </Button>
          </form>

          {/* Trust Note */}
          <p className="text-primary-foreground/50 text-xs mt-6">
            By subscribing, you agree to receive periodic lunar transmissions. 
            Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
