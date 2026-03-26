import { MailerLiteEmbed } from "@/components/MailerLiteEmbed";

export function Newsletter() {
  return (
    <section id="connect" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
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
          <div className="max-w-md mx-auto">
            <MailerLiteEmbed />
          </div>
          <p className="text-primary-foreground/50 text-xs mt-6">
            By subscribing, you agree to receive periodic lunar transmissions. 
            Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
