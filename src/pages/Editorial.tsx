import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { EdNavbar } from "@/components/editorial/EdNavbar";
import { EdHero } from "@/components/editorial/EdHero";
import { EdSystem } from "@/components/editorial/EdSystem";
import { EdDoors } from "@/components/editorial/EdDoors";
import { EdDeclarations } from "@/components/editorial/EdDeclarations";
import { EdIndex } from "@/components/editorial/EdIndex";
import { EdFooter } from "@/components/editorial/EdFooter";
import { useLiveMoon } from "@/components/editorial/useLiveMoon";
import "@/components/editorial/editorial.css";

/**
 * Moontuner — monochrome editorial edition of the site.
 * Navbar → Hero → System → Four Doors → Declarations → Index of Tools → Footer.
 */
const Editorial = () => {
  const moon = useLiveMoon();

  // The app's global body ground is dark; paint it white while this page is
  // mounted so overscroll and rubber-banding never flash the old theme.
  useEffect(() => {
    const html = document.documentElement;
    const prev = { body: document.body.style.background, html: html.style.background };
    document.body.style.background = "#fff";
    html.style.background = "#fff";
    return () => {
      document.body.style.background = prev.body;
      html.style.background = prev.html;
    };
  }, []);

  return (
    <div className="ed min-h-screen">
      <SEOHead
        title="Moontuner — Lunar Alignment System"
        description="A lunar alignment system for tracking intention, energy, and momentum through the Moon's cycles. Eight phases, twelve signs, ninety-six signatures — read live from the sky."
        canonical="/editorial"
        keywords={["Moontuner", "Phasecraft", "lunar alignment", "moon phases", "Lunar Chaperone", "Astro-Harmonic Symphony"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moontuner",
          url: "https://moontuner.xyz/editorial",
          description:
            "A lunar alignment system for tracking intention, energy, and momentum through the Moon's cycles.",
        }}
      />
      <a
        href="#main"
        className="ed-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <EdNavbar moon={moon} />
      <main id="main">
        <EdHero moon={moon} />
        <EdSystem />
        <EdDoors />
        <EdDeclarations />
        <EdIndex />
      </main>
      <EdFooter />
    </div>
  );
};

export default Editorial;
