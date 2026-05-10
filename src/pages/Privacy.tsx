import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

const Privacy = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Privacy Policy — Moontuner"
        description="How Moontuner collects, uses, and protects your personal data."
        canonical="/privacy"
      />
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-20">
          <section className="container mx-auto px-6 lg:px-12 max-w-2xl">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-3 font-sans">
              Legal
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-10">
              Privacy Policy
            </h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 text-sm leading-relaxed">
              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">1. What We Collect</h2>
                <p>We collect the following information when you use Moontuner:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Account information: email address and hashed password.</li>
                  <li>Profile data you voluntarily provide: display name, birth date, birth time, birth location.</li>
                  <li>Reflections, journal entries, and notes you write within the platform.</li>
                  <li>Usage data: pages visited, features used, and lunar interaction timestamps — collected anonymously.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">2. How We Use Your Data</h2>
                <p>Your data is used exclusively to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Personalise lunar guidance, directives, and reports to your natal chart.</li>
                  <li>Maintain your longitudinal archive of reflections and rituals.</li>
                  <li>Send transactional emails (account verification, password reset).</li>
                  <li>Improve the clarity and emotional usability of the platform using anonymised analytics.</li>
                </ul>
                <p className="mt-3">
                  We do not sell your data. We do not use it for advertising.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">3. Data Storage</h2>
                <p>
                  Data is stored securely using Supabase (PostgreSQL), hosted on AWS
                  infrastructure in the EU/US regions. All data in transit is encrypted via TLS.
                  Sensitive columns (birth data, reflections) are stored at rest with
                  database-level encryption.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">4. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Access</strong> all data we hold about you via the Settings → Export Archive feature.</li>
                  <li><strong>Correct</strong> your data at any time in your Settings page.</li>
                  <li><strong>Delete</strong> your account and all associated data by contacting us.</li>
                  <li><strong>Opt out</strong> of anonymised analytics via Settings → Privacy → Ecosystem Analytics.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">5. Third-Party Services</h2>
                <p>We use the following third parties:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Supabase</strong> — database, authentication, and edge functions.</li>
                  <li><strong>Stripe</strong> — payment processing for memberships and purchases. We do not store card details.</li>
                  <li><strong>ConvertKit</strong> — newsletter and email sequences (email only; unsubscribe at any time).</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">6. Cookies</h2>
                <p>
                  We use a single authentication session cookie managed by Supabase Auth.
                  We do not use tracking or advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">7. Changes to This Policy</h2>
                <p>
                  We will notify registered users of material changes to this policy via email.
                  The effective date of the current version is May 2026.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">8. Contact</h2>
                <p>
                  For privacy-related requests or questions, reach us via the contact
                  information on the About page.
                </p>
              </section>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Privacy;
