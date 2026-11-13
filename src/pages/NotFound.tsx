import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PathwayDoors } from "@/components/PathwayDoors";
import { SEOHead } from "@/components/SEOHead";

/**
 * 404 — a wrong turn shouldn't be a dead end. Visitors arriving from an old
 * link (or a mistyped URL from the book) get the four doors straight away.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    // Keep 404s out of search results.
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previous = robots?.content;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex";
    return () => {
      if (robots) robots.content = previous ?? "index, follow";
    };
  }, [location.pathname]);

  return (
    <div className="dusk min-h-screen relative">
      <SEOHead title="Page not found | Moontuner" description="This page has moved or never existed. Here are the four ways into Moontuner." />
      <Navigation />
      <main className="mx-auto max-w-[1200px] px-6 lg:px-12 pt-28 pb-20 lg:pt-36">
        <p className="dusk-eyebrow mb-5">
          <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
          404 · Off the map
        </p>
        <h1 className="dusk-serif text-[clamp(2.1rem,5vw,3.8rem)] dusk-ivory leading-[1.08] mb-5 max-w-[760px]">
          This page isn't in phase. <em className="italic dusk-gold">These four are.</em>
        </h1>
        <p className="text-[1.0625rem] leading-[1.7] max-w-[560px] mb-12" style={{ color: "hsl(var(--dusk-ivory) / 0.68)" }}>
          The link may be old, or the address mistyped. Pick up from one of the doors below, or{" "}
          <Link to="/" className="dusk-ivory underline underline-offset-4 hover:text-[hsl(var(--dusk-gold))]">
            return home
          </Link>
          .
        </p>
        <PathwayDoors titleAs="h2" />
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
