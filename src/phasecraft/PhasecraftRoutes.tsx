import type { ReactNode } from "react";
import { useEffect } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { defaultPhases } from "@/phasecraft/data/phases";
import { validatePhases } from "@/phasecraft/data/validate";
import TodayPage from "@/phasecraft/pages/TodayPage";
import DayDetailPage from "@/phasecraft/pages/DayDetailPage";
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
  { label: "Library", href: "/phasecraft/library" },
  { label: "Science", href: "/phasecraft/science" },
];

function PhasecraftFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (import.meta.env.DEV) {
      const errors = validatePhases(defaultPhases);
      if (errors.length) console.warn("Phasecraft dataset validation", errors);
    }
  }, []);

  return (
    <PageTransition>
      <SEOHead
        title="Phasecraft — Moontuner Lunar Practice"
        description="Work with the current lunar effect through the 96-combination Phasecraft matrix, calendar, search, library, and lunar science companion."
        canonical="/phasecraft"
        keywords={["phasecraft", "lunar practice", "moon phase matrix", "moontuner"]}
      />
      <div className="min-h-screen bg-background text-foreground grain-overlay">
        <Navigation />
        <main className="container mx-auto px-4 pb-16 pt-24 sm:px-6 lg:px-12 lg:pt-32">
          <div className="mx-auto max-w-5xl space-y-6">
            <header className="space-y-4 border-b border-border/40 pb-5">
              <div>
                <p className="system-label text-accent">Phasecraft Companion</p>
                <h1 className="mt-2 font-serif text-3xl text-foreground md:text-5xl">Effect of the Moment</h1>
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
              </nav>
            </header>
            {children}
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

export function PhasecraftRoutes() {
  return (
    <PhasecraftFrame>
      <Routes>
        <Route index element={<TodayPage />} />
        <Route path="effect/:day" element={<DayDetailPage />} />
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
