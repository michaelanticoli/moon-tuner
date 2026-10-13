import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { EmailSubscribeForm } from "@/components/EmailSubscribeForm";
import { MoonPhaseGlyph, type MoonPhaseGlyphProps } from "@/components/MoonPhaseGlyph";
import { useMoonPhase } from "@/hooks/useMoonPhase";

/**
 * /links — the link-in-bio page for Instagram, TikTok and YouTube profiles.
 * Short, fast, thumb-first: today's Moon, the offers in time-to-value order,
 * and the Letters signup with the free guide. Edit LINKS to change the list.
 * External checkout links point at the MOONTUNER INC. Stripe account.
 */

type BioLink = {
  label: string;
  note: string;
  href: string;
  external?: boolean;
  featured?: boolean;
};

const LINKS: BioLink[] = [
  {
    label: "Hear your birth chart as music",
    note: "An original composition and spoken reading from your exact chart · $25",
    href: "/quantumelodic",
    featured: true,
  },
  {
    label: "Free guide: Timing with the Moon",
    note: "Ten pages on the phases, the signs, and void-of-course windows",
    href: "/free-guide",
  },
  {
    label: "Book a Cosmic Calibration",
    note: "60–75 minutes, one to one, with Michael · $149 founding rate",
    href: "https://book.stripe.com/7sY4gy6UGgTy21ZeL7e7m0e",
    external: true,
  },
  {
    label: "Personal Lunar Alignment Guide",
    note: "Your Persona Edition plus a recorded walkthrough · $147, five founding spots",
    href: "https://buy.stripe.com/28EbJ092OdHm5eb9qNe7m0f",
    external: true,
  },
  {
    label: "The Lunar Chaperone",
    note: "A guided workbook day for every day of the lunar year",
    href: "/lunar-chaperone",
  },
  {
    label: "Lunar Cipher calendar",
    note: "Every phase, sign change and void window for 2026 · pay what you can",
    href: "/lunar-cipher",
  },
];

function LinkRow({ link }: { link: BioLink }) {
  const inner = (
    <>
      <span className="min-w-0">
        <span className="block dusk-serif text-[1.3rem] leading-tight dusk-ivory">{link.label}</span>
        <span className="block mt-1 text-[0.8rem] leading-snug" style={{ color: "hsl(var(--dusk-ivory) / 0.58)" }}>
          {link.note}
        </span>
      </span>
      <ArrowUpRight className="w-4 h-4 shrink-0 mt-1.5" style={{ color: "hsl(var(--dusk-gold))" }} aria-hidden />
    </>
  );
  const className =
    "flex items-start justify-between gap-4 rounded-2xl px-5 py-4 transition-colors " +
    (link.featured ? "dusk-surface" : "border hover:bg-white/[0.03]");
  const style = link.featured
    ? { borderLeft: "2px solid hsl(var(--dusk-gold))" }
    : { borderColor: "hsl(var(--dusk-ivory) / 0.1)" };

  return link.external ? (
    <a href={link.href} className={className} style={style} rel="noopener">
      {inner}
    </a>
  ) : (
    <Link to={link.href} className={className} style={style}>
      {inner}
    </Link>
  );
}

const GLYPH_KEYS: MoonPhaseGlyphProps["phase"][] = [
  "new", "waxing-crescent", "first-quarter", "waxing-gibbous",
  "full", "waning-gibbous", "last-quarter", "waning-crescent",
];

/** "Waxing Gibbous" -> "waxing-gibbous", "Full Moon" -> "full". */
function glyphKey(phaseName: string): MoonPhaseGlyphProps["phase"] {
  const key = phaseName.toLowerCase().replace(/\s*moon$/, "").trim().replace(/\s+/g, "-");
  return (GLYPH_KEYS as string[]).includes(key) ? (key as MoonPhaseGlyphProps["phase"]) : "new";
}

const Links = () => {
  const moon = useMoonPhase();
  const { phaseName, moonSign } = moon.astronomical;

  return (
    <div className="dusk min-h-screen dusk-atmosphere">
      <SEOHead
        title="Moontuner — Links"
        description="Today's Moon, your birth chart as music, the free lunar timing guide, and sessions with Michael Moontuner."
        canonical="/links"
      />
      <main className="mx-auto max-w-[520px] px-5 pt-12 pb-16 page-enter">
        <header className="text-center">
          <Link to="/" className="inline-block text-[0.78rem] tracking-[0.5em] uppercase dusk-ivory">
            Moontuner
          </Link>
          <p className="mt-3 dusk-serif italic text-[1.15rem]" style={{ color: "hsl(var(--dusk-gold))" }}>
            Astrology with agency. Less woo, more you.
          </p>
        </header>

        <Link
          to="/moon-phase-today"
          className="mt-8 flex items-center gap-4 rounded-2xl border px-5 py-4 hover:bg-white/[0.03] transition-colors"
          style={{ borderColor: "hsl(var(--dusk-ivory) / 0.1)" }}
        >
          <MoonPhaseGlyph phase={glyphKey(phaseName)} size={34} />
          <span className="min-w-0">
            <span className="dusk-eyebrow block">Today's Moon</span>
            <span className="block dusk-serif text-[1.25rem] dusk-ivory leading-tight mt-1">
              {phaseName} in {moonSign}
            </span>
          </span>
          <ArrowUpRight className="w-4 h-4 shrink-0 ml-auto" style={{ color: "hsl(var(--dusk-gold))" }} aria-hidden />
        </Link>

        <nav aria-label="Moontuner links" className="mt-4 flex flex-col gap-3">
          {LINKS.map((link) => (
            <LinkRow key={link.href} link={link} />
          ))}
        </nav>

        <section
          aria-label="MOONtuner Letters"
          className="mt-8 rounded-2xl px-5 py-6 dusk-surface"
        >
          <p className="dusk-eyebrow">MOONtuner Letters</p>
          <p className="dusk-serif text-[1.35rem] dusk-ivory leading-tight mt-2">
            A short weekly note on the Moon's timing, and the free guide today.
          </p>
          <EmailSubscribeForm
            source="links"
            buttonText="Join"
            className="mt-4"
            successMessage="You're in. Your guide is ready."
            download={{ href: "/downloads/timing-with-the-moon.pdf", label: "Download the guide (PDF)" }}
          />
        </section>

        <p className="mt-10 text-center text-[0.7rem] tracking-[0.3em] uppercase dusk-silver">
          <Link to="/">moontuner.xyz</Link>
        </p>
      </main>
    </div>
  );
};

export default Links;
