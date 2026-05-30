import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

const Terms = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Terms of Use — Moontuner"
        description="Terms of use for the Moontuner platform."
        canonical="/terms"
      />
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-20">
          <section className="container mx-auto px-6 lg:px-12 max-w-2xl">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-3 font-sans">
              Legal
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-10">
              Terms of Use
            </h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 text-sm leading-relaxed">
              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">1. Acceptance</h2>
                <p>
                  By accessing or using Moontuner ("the Service"), you agree to be bound
                  by these Terms of Use. If you do not agree, please do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">2. Description of Service</h2>
                <p>
                  Moontuner is a reflective timing and self-awareness tool. The content
                  provided — including lunar guidance, directives, harmonic profiles, and
                  reports — is for informational and reflective purposes only. It is not a
                  substitute for professional medical, psychological, financial, or legal advice.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">3. User Accounts</h2>
                <p>
                  When you create an account, you are responsible for maintaining the
                  confidentiality of your credentials. You agree to provide accurate information
                  and to notify us of any unauthorised access to your account.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">4. Intellectual Property</h2>
                <p>
                  All content, design, and software on Moontuner is the property of Moontuner
                  or its licensors. You may not reproduce, distribute, or create derivative
                  works without explicit written permission.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">5. User Data</h2>
                <p>
                  Your personal data — including birth data and reflections — belongs to you.
                  We store it solely to provide the Service. You may export or delete your
                  data at any time via your Settings page.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">6. Limitation of Liability</h2>
                <p>
                  Moontuner is provided "as is." To the fullest extent permitted by law, we
                  disclaim all warranties and shall not be liable for any indirect, incidental,
                  or consequential damages arising from your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">7. Changes to Terms</h2>
                <p>
                  We may update these Terms from time to time. Continued use of the Service
                  after any changes constitutes your acceptance of the updated Terms. The
                  effective date of the current version is May 2026.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-foreground mb-3">8. Contact</h2>
                <p>
                  Questions about these Terms? Reach us via the contact information on the
                  About page.
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

export default Terms;
