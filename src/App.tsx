import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { MembershipProvider } from "@/contexts/MembershipContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ReportLauncher } from "@/components/ReportLauncher";
import { usePageTracking } from "@/hooks/usePageTracking";
import { PHASE_2_ENABLED, PHASE_3_ENABLED } from "@/lib/featureFlags";
import Index from "./pages/Index";
import Method from "./pages/Method";
import Manifesto from "./pages/Manifesto";
import Philosophy from "./pages/Philosophy";
import Workbooks from "./pages/Workbooks";
import WorkbookPreview from "./pages/WorkbookPreview";
import LunarChaperone from "./pages/LunarChaperone";
import LunarSystem from "./pages/LunarSystem";
import LunarCipher from "./pages/LunarCipher";
import LunarReports from "./pages/LunarReports";
import QuantumMelodic from "./pages/QuantumMelodic";
import MoontunedApp from "./pages/App";
import Moon from "./pages/Moon";
import Auth from "./pages/Auth";
import AuthResetPassword from "./pages/AuthResetPassword";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import MoontunerSchool from "./pages/MoontunerSchool";
import MoonTunerStarter from "./pages/MoonTunerStarter";
import Sessions from "./pages/Sessions";
import Services from "./pages/Services";
import MoonPhaseToday from "./pages/MoonPhaseToday";
import Studio from "./pages/Studio";
import FreeGuide from "./pages/FreeGuide";
import TotalTuner from "./pages/TotalTuner";
import CazimiPunchcard from "./pages/CazimiPunchcard";
import SpacetimePrinter from "./pages/SpacetimePrinter";
import HarmonicProfile from "./pages/HarmonicProfile";
import AuthCallback from "./pages/AuthCallback";
import DigitalSmudging from "./pages/DigitalSmudging";
import Offerings from "./pages/Offerings";
import Journal from "./pages/Journal";
import JournalEntry from "./pages/JournalEntry";
import Membership from "./pages/Membership";
import MembershipManage from "./pages/MembershipManage";
import DigitalStore from "./pages/DigitalStore";
import GiftPage from "./pages/GiftPage";
import GiftConfirmation from "./pages/GiftConfirmation";
import GiftClaim from "./pages/GiftClaim";
import PurchaseHistory from "./pages/PurchaseHistory";
import About from "./pages/About";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Explore from "./pages/Explore";
import ExploreConcept from "./pages/ExploreConcept";
import Today from "./pages/Today";
import ComingSoon from "./pages/ComingSoon";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { PhasecraftRoutes } from "@/phasecraft/PhasecraftRoutes";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ── Phase 1 — Core public routes ──────────────────────────── */}
          <Route path="/" element={<Index />} />
          <Route path="/today" element={<Today />} />
          <Route path="/harmonic-profile" element={<HarmonicProfile />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalEntry />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:slug" element={<ExploreConcept />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/about" element={<About />} />
          <Route path="/the-moon" element={<Moon />} />
          <Route path="/method" element={<Method />} />
          <Route path="/phasecraft/*" element={<PhasecraftRoutes />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/lunar-system" element={<LunarSystem />} />
      <Route path="/moon-phase-today" element={<MoonPhaseToday />} />
      <Route path="/current-moon-phase" element={<MoonPhaseToday />} />
      <Route path="/moon-cycle-today" element={<MoonPhaseToday />} />
      <Route path="/free-guide" element={<FreeGuide />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />

          {/* ── Auth routes — always live (needed for email verification) ── */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset-password" element={<AuthResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* ── Phase 2 — Remaining gated features ───────────────────── */}
          <Route path="/lunar-reports" element={PHASE_2_ENABLED ? <LunarReports /> : <ComingSoon />} />
          <Route path="/workbooks" element={PHASE_2_ENABLED ? <Workbooks /> : <ComingSoon />} />
          <Route path="/workbook-preview" element={PHASE_2_ENABLED ? <WorkbookPreview /> : <ComingSoon />} />
          <Route path="/lunar-chaperone" element={PHASE_2_ENABLED ? <LunarChaperone /> : <ComingSoon />} />
          <Route path="/chaperone" element={PHASE_2_ENABLED ? <LunarChaperone /> : <ComingSoon />} />
          <Route path="/lunar-cipher" element={PHASE_2_ENABLED ? <LunarCipher /> : <ComingSoon />} />
          <Route path="/cipher" element={PHASE_2_ENABLED ? <LunarCipher /> : <ComingSoon />} />
          <Route path="/offerings" element={PHASE_2_ENABLED ? <Offerings /> : <ComingSoon />} />
          <Route path="/services" element={PHASE_2_ENABLED ? <Services /> : <ComingSoon />} />
          <Route path="/sessions" element={PHASE_2_ENABLED ? <Sessions /> : <ComingSoon />} />
          <Route path="/studio" element={PHASE_2_ENABLED ? <Studio /> : <ComingSoon />} />
          <Route path="/total-tuner" element={PHASE_2_ENABLED ? <TotalTuner /> : <ComingSoon />} />
          <Route path="/cazimi" element={PHASE_2_ENABLED ? <CazimiPunchcard /> : <ComingSoon />} />
          <Route path="/spacetime-printer" element={PHASE_2_ENABLED ? <SpacetimePrinter /> : <ComingSoon />} />
          <Route path="/app" element={PHASE_2_ENABLED ? <MoontunedApp /> : <ComingSoon />} />
          <Route path="/starter" element={PHASE_2_ENABLED ? <MoonTunerStarter /> : <ComingSoon />} />

          {/* ── Membership & payments (Phase 2) ──────────────────────── */}
          <Route path="/membership" element={PHASE_2_ENABLED ? <Membership /> : <ComingSoon />} />
          <Route
            path="/membership/manage"
            element={
              PHASE_2_ENABLED ? (
                <ProtectedRoute>
                  <MembershipManage />
                </ProtectedRoute>
              ) : (
                <ComingSoon />
              )
            }
          />
          <Route path="/store" element={PHASE_2_ENABLED ? <DigitalStore /> : <ComingSoon />} />
          <Route path="/gift" element={PHASE_2_ENABLED ? <GiftPage /> : <ComingSoon />} />
          <Route path="/gift/confirmation" element={PHASE_2_ENABLED ? <GiftConfirmation /> : <ComingSoon />} />
          <Route path="/gift/claim" element={PHASE_2_ENABLED ? <GiftClaim /> : <ComingSoon />} />
          <Route
            path="/purchases"
            element={
              PHASE_2_ENABLED ? (
                <ProtectedRoute>
                  <PurchaseHistory />
                </ProtectedRoute>
              ) : (
                <ComingSoon />
              )
            }
          />

          {/* ── Phase 2/3 — School + advanced tools (gated) ──────────── */}
          <Route path="/school" element={PHASE_2_ENABLED ? <MoontunerSchool /> : <ComingSoon />} />
          <Route path="/quantumelodic" element={PHASE_2_ENABLED ? <QuantumMelodic /> : <ComingSoon />} />

          {/* ── Phase 3 — Digital Smudging (gated) ───────────────────── */}
          <Route path="/digital-smudging" element={PHASE_3_ENABLED ? <DigitalSmudging /> : <ComingSoon />} />

          {/* ── Legal pages ─────────────────────────────────────────── */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <ReportLauncher />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MembershipProvider>
        <AnalyticsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AnalyticsProvider>
      </MembershipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
