import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { PressNavbar } from "@/components/press/PressNavbar";
import { PressHero } from "@/components/press/PressHero";
import { PressMission } from "@/components/press/PressMission";
import { PressFocus } from "@/components/press/PressFocus";
import { PressPublications } from "@/components/press/PressPublications";
import { PressFooter } from "@/components/press/PressFooter";
import "@/components/press/press.css";

/**
 * Moontuner Press — single-page editorial site.
 * Navbar → Hero → Mission → Focus → Publications → Footer.
 */
const Press = () => {
  // The app's global body ground is dark; paint it white while the press is
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
    <div className="press min-h-screen">
      <SEOHead
        title="Moontuner Press — Metaphysical / Esoteric Quantum Publications"
        description="A specialized publishing agency focusing on transformative works combining cultural anthropology, systems thinking, strategic planning, and consciousness research."
        canonical="/press"
        keywords={["Moontuner Press", "esoteric publishing", "metaphysical publications", "systems thinking", "cultural content"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Moontuner Press",
          url: "https://moontuner.xyz/press",
          foundingDate: "2014",
          description:
            "A specialized publishing agency focusing on transformative works combining cultural anthropology, systems thinking, strategic planning, and consciousness research.",
        }}
      />
      <a
        href="#main"
        className="press-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <PressNavbar />
      <main id="main">
        <PressHero />
        <PressMission />
        <PressFocus />
        <PressPublications />
      </main>
      <PressFooter />
    </div>
  );
};

export default Press;
