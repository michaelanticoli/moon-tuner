import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Navigation } from "@/components/Navigation";
import { SmudgingHero } from "@/components/smudging/SmudgingHero";
import { SageScan } from "@/components/smudging/SageScan";
import { CordCutting } from "@/components/smudging/CordCutting";
import { TheVoid } from "@/components/smudging/TheVoid";
import { Wards } from "@/components/smudging/Wards";
import { LunarSync } from "@/components/smudging/LunarSync";
import { SEOHead } from "@/components/SEOHead";

// Step indicator — subtle progress dots at top of screen
function ProgressDots({ step, total }: { step: number; total: number }) {
  if (step === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed top-24 left-0 right-0 z-20 flex justify-center gap-2.5 pointer-events-none"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-700"
          style={{
            width: i < step ? 16 : 6,
            height: 3,
            background:
              i < step
                ? "hsl(25 65% 55% / 0.7)"
                : i === step - 1
                ? "hsl(25 65% 55% / 0.9)"
                : "hsl(22 12% 20%)",
          }}
        />
      ))}
    </motion.div>
  );
}

const DigitalSmudging = () => {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);

  const advance = useCallback((nextStep: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(nextStep);
  }, []);

  // 5 active chambers (steps 1–5), step 0 is the hero
  const TOTAL_CHAMBERS = 5;

  const renderChamber = () => {
    switch (step) {
      case 0:
        return <SmudgingHero key="hero" onBegin={() => advance(1)} />;
      case 1:
        return (
          <SageScan
            key="scan"
            onComplete={(sel) => {
              setItems(sel);
              advance(2);
            }}
          />
        );
      case 2:
        return <CordCutting key="cords" items={items} onComplete={() => advance(3)} />;
      case 3:
        return <TheVoid key="void" onComplete={() => advance(4)} />;
      case 4:
        return (
          <Wards
            key="wards"
            onComplete={(w) => {
              setWards(w);
              advance(5);
            }}
          />
        );
      case 5:
        return (
          <LunarSync
            key="sync"
            items={items}
            wards={wards}
            onRestart={() => {
              setItems([]);
              setWards([]);
              advance(0);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title="Digital Smudging — Clear Digital Overwhelm & Reclaim Your Attention | Moontuner"
        description="Digital Smudging is a structured clearing ritual for digital overwhelm. Scan, release, and reset your digital environment — then set intentional boundaries for what follows."
        canonical="/digital-smudging"
        keywords={[
          "digital smudging",
          "digital overwhelm",
          "screen time anxiety",
          "digital detox alternative",
          "clear digital clutter",
          "digital wellness practice",
          "reclaim attention",
          "information overload",
        ]}
      />
      <div
        className="min-h-screen relative"
        style={{ background: "hsl(22, 12%, 8%)" }}
      >
        <Navigation />
        <ProgressDots step={step} total={TOTAL_CHAMBERS} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          >
            {renderChamber()}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default DigitalSmudging;
