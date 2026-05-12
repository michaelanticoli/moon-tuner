import { Link, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { DuskNav } from "@/components/dusk/DuskNav";
import { LunarCapture } from "@/components/LunarCapture";
import { SEOHead } from "@/components/SEOHead";

/**
 * ComingSoon — Phase gate page shown for features not yet live.
 *
 * Keeps routes accessible (no 404) while clearly communicating
 * that this feature is in development. Doubles as an email capture moment.
 */
export default function ComingSoon() {
  const location = useLocation();

  return (
    <PageTransition>
      <SEOHead
        title="Coming Soon — Moontuner"
        description="This feature is part of an upcoming phase of Moontuner. Stay in the cycle to be notified when it launches."
        canonical={location.pathname}
      />
      <div className="dusk min-h-screen relative">
        <DuskNav />

        <main className="relative mx-auto max-w-[760px] px-6 lg:px-12 pt-48 pb-32 text-center">
          {/* Moon glyph placeholder */}
          <div
            className="w-16 h-16 rounded-full mx-auto mb-10 flex items-center justify-center"
            style={{
              border: "1px solid hsl(var(--dusk-ivory) / 0.12)",
              background: "hsl(var(--dusk-ivory) / 0.03)",
            }}
          >
            <span
              className="text-2xl"
              style={{ color: "hsl(var(--dusk-gold) / 0.6)" }}
              aria-hidden
            >
              ◑
            </span>
          </div>

          <p
            className="text-[0.65rem] tracking-[0.32em] uppercase mb-6"
            style={{ color: "hsl(var(--dusk-gold) / 0.55)" }}
          >
            <span
              className="inline-block w-5 h-px align-middle mr-3"
              style={{ background: "hsl(var(--dusk-gold) / 0.4)" }}
            />
            In development
          </p>

          <h1
            className="dusk-serif text-[clamp(2rem,5vw,3.6rem)] dusk-ivory mb-6 leading-[1.08]"
          >
            This feature is still being calibrated.
          </h1>

          <p
            className="text-[1.0625rem] leading-[1.7] mb-14 mx-auto max-w-[480px]"
            style={{ color: "hsl(var(--dusk-ivory) / 0.6)" }}
          >
            It's part of an upcoming phase of Moontuner. Subscribe below to be
            the first to know when it opens — and stay oriented in the meantime
            with today's directive.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
            <Link to="/today" className="dusk-btn dusk-btn-primary">
              View Today's Directive
            </Link>
            <Link to="/" className="dusk-btn dusk-btn-ghost">
              Back to Home
            </Link>
          </div>

          <LunarCapture
            source="coming-soon"
            heading="Be the first in."
            subheading="When this feature launches, subscribers hear first."
            items={[
              "Early access to new Moontuner features",
              "Daily directives aligned to the current phase",
              "Lunar reflections and timing guidance",
            ]}
          />
        </main>
      </div>
    </PageTransition>
  );
}
