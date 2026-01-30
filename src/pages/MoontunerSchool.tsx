import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SchoolIntro } from "@/components/school/SchoolIntro";
import { SchoolFoundations } from "@/components/school/SchoolFoundations";
import { SchoolFlashcards } from "@/components/school/SchoolFlashcards";
import { SchoolCombinations } from "@/components/school/SchoolCombinations";
import { SchoolWorkbook } from "@/components/school/SchoolWorkbook";
import { SchoolAssessment } from "@/components/school/SchoolAssessment";
import { SchoolProgress } from "@/components/school/SchoolProgress";
import { PremiumOverlay } from "@/components/school/PaywallGate";

type TabId = "intro" | "foundations" | "flashcards" | "combinations" | "workbook" | "assessment" | "progress";

const tabs: { id: TabId; label: string; premium: boolean }[] = [
  { id: "intro", label: "Introduction", premium: false },
  { id: "foundations", label: "Foundations", premium: false },
  { id: "flashcards", label: "Flashcards", premium: true },
  { id: "combinations", label: "Combinations", premium: true },
  { id: "workbook", label: "Workbook", premium: true },
  { id: "assessment", label: "Assessment", premium: true },
  { id: "progress", label: "Progress", premium: true },
];

export default function MoontunerSchool() {
  const [activeTab, setActiveTab] = useState<TabId>("intro");
  // In a real app, this would come from auth/subscription status
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);

  const currentTab = tabs.find(t => t.id === activeTab)!;
  const isPremiumContent = currentTab.premium && !hasPremiumAccess;

  const renderContent = () => {
    switch (activeTab) {
      case "intro":
        return <SchoolIntro onStartLearning={() => setActiveTab("foundations")} />;
      case "foundations":
        return <SchoolFoundations />;
      case "flashcards":
        return <SchoolFlashcards />;
      case "combinations":
        return <SchoolCombinations />;
      case "workbook":
        return <SchoolWorkbook />;
      case "assessment":
        return <SchoolAssessment />;
      case "progress":
        return <SchoolProgress />;
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Header */}
        <header className="pt-24 lg:pt-32 pb-12 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <h1 className="font-serif text-4xl lg:text-6xl font-light text-foreground mb-4 tracking-tight">
              MOONtuner
            </h1>
            <p className="text-lg text-muted-foreground">
              A Precision Timing System for Lunar-Zodiac Alignment
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex gap-0 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-5 text-sm font-medium uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "text-foreground border-foreground"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {tab.premium && !hasPremiumAccess && (
                    <span className="ml-2 text-xs opacity-50">●</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {isPremiumContent ? (
            <PremiumOverlay onUnlock={() => setHasPremiumAccess(true)}>
              {renderContent()}
            </PremiumOverlay>
          ) : (
            renderContent()
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
