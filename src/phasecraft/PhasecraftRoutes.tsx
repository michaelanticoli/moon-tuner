import type { ReactNode } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { PathwayDoors } from "@/components/PathwayDoors";
import TodayPage from "@/phasecraft/pages/TodayPage";
import DayDetailPage, { LegacyEffectRedirect } from "@/phasecraft/pages/DayDetailPage";
import CalendarPage from "@/phasecraft/pages/CalendarPage";
import MatrixPage from "@/phasecraft/pages/MatrixPage";
import SearchPage from "@/phasecraft/pages/SearchPage";
import LibraryPage from "@/phasecraft/pages/LibraryPage";
import LunarSciencePage from "@/phasecraft/pages/LunarSciencePage";

const tabs = [
  { label: "Today", href: "/phasecraft" },
  { label: "Calendar", href: "/phasecraft/calendar" },
  { label: "Matrix", href: "/phasecraft/matrix" },
  { label: "Search", href: "/phasecraft/search" },
  { label: "Your Record", href: "/phasecraft/library" },
  { label: "Science", href: "/phasecraft/science" },
];

function PhasecraftFrame({ children }: { children: ReactNode }) {
  // A single signature page sets its own title and description.
  const { pathname } = useLocation();
  const ownSEO = pathname.startsWith("/phasecraft/signature/");
  return (
    <PageTransition>
      {!ownSEO && <SEOHead
        title="Phasecraft — Tonight's Lunar Signature | Moontuner"
        description="The live companion to PHASECRAFT: The Moontuner Method. Tonight's phase-and-sign signature, all ninety-six in the matrix, a lunar calendar, and your own record."
        canonical="/phasecraft"
        keywords={["phasecraft", "lunar practice", "moon phase matrix", "moontuner"]}
      />}
      <div className="min-h-screen bg-background text-foreground grain-overlay">
        <Navigation />
        <main className="container mx-auto px-4 pb-16 pt-24 sm:px-6 lg:px-12 lg:pt-32">
          <div className="mx-auto max-w-5xl space-y-6">
            <header className="space-y-4 border-b border-border/40 pb-5">
              <div>
                <p className="system-label text-accent">Phasecraft · The Moontuner Method</p>
                <h1 className="mt-2 font-serif text-3xl text-foreground md:text-5xl">The Ninety-Six Signatures</h1>
              </div>
              <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Phasecraft sections">
                {tabs.map((tab) => (
                  <NavLink
                    key={tab.href}
                    to={tab.href}
                    end={tab.href === "/phasecraft"}
                    className={({ isActive }) =>
                      [
                        "min-h-[40px] shrink-0 rounded-md border px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors",
                        isActive
                          ? "border-accent/50 bg-accent/10 text-accent"
                          : "border-border/50 text-muted-foreground hover:border-accent/30 hover:text-foreground",
                      ].join(" ")
                    }
                  >
                    {tab.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/school"
                  className="min-h-[40px] shrink-0 rounded-md border border-accent/40 px-3 py-2 text-xs font-medium uppercase tracking-wider text-accent transition-colors hover:bg-accent/10 sm:ml-auto"
                >
                  School →
                </NavLink>
              </nav>
            </header>
            {children}
            <PathwayDoors
              variant="strip"
              exclude="phasecraft"
              className="pt-12 mt-12 border-t border-border/40"
              eyebrow="Go deeper"
              heading="Take tonight's signature further."
            />
            <p className="text-sm text-muted-foreground">
              Ready to learn the whole method?{" "}
              <NavLink to="/school" className="text-accent underline underline-offset-4">
                Enter the Phasecraft School
              </NavLink>
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

export function PhasecraftRoutes() {
  return (
    <PhasecraftFrame>
      <Routes>
        <Route index element={<TodayPage />} />
        <Route path="signature/:code" element={<DayDetailPage />} />
        <Route path="effect/:day" element={<LegacyEffectRedirect />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="matrix" element={<MatrixPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="science" element={<LunarSciencePage />} />
        <Route path="today" element={<Navigate to="/phasecraft" replace />} />
        <Route path="*" element={<Navigate to="/phasecraft" replace />} />
      </Routes>
    </PhasecraftFrame>
  );
}
