import { Suspense, lazy } from "react";
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

const Index = lazy(() => import("./pages/Index"));
const Method = lazy(() => import("./pages/Method"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const Philosophy = lazy(() => import("./pages/Philosophy"));
const Workbooks = lazy(() => import("./pages/Workbooks"));
const WorkbookPreview = lazy(() => import("./pages/WorkbookPreview"));
const LunarChaperone = lazy(() => import("./pages/LunarChaperone"));
const LunarSystem = lazy(() => import("./pages/LunarSystem"));
const LunarCipher = lazy(() => import("./pages/LunarCipher"));
const LunarReports = lazy(() => import("./pages/LunarReports"));
const QuantumMelodic = lazy(() => import("./pages/QuantumMelodic"));
const MoontunedApp = lazy(() => import("./pages/App"));
const Moon = lazy(() => import("./pages/Moon"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthResetPassword = lazy(() => import("./pages/AuthResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const MoontunerSchool = lazy(() => import("./pages/MoontunerSchool"));
const MoonTunerStarter = lazy(() => import("./pages/MoonTunerStarter"));
const Sessions = lazy(() => import("./pages/Sessions"));
const Services = lazy(() => import("./pages/Services"));
const MoonPhaseToday = lazy(() => import("./pages/MoonPhaseToday"));
const Studio = lazy(() => import("./pages/Studio"));
const FreeGuide = lazy(() => import("./pages/FreeGuide"));
const TotalTuner = lazy(() => import("./pages/TotalTuner"));
const CazimiPunchcard = lazy(() => import("./pages/CazimiPunchcard"));
const SpacetimePrinter = lazy(() => import("./pages/SpacetimePrinter"));
const HarmonicProfile = lazy(() => import("./pages/HarmonicProfile"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const DigitalSmudging = lazy(() => import("./pages/DigitalSmudging"));
const Offerings = lazy(() => import("./pages/Offerings"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalEntry = lazy(() => import("./pages/JournalEntry"));
const Membership = lazy(() => import("./pages/Membership"));
const MembershipManage = lazy(() => import("./pages/MembershipManage"));
const DigitalStore = lazy(() => import("./pages/DigitalStore"));
const GiftPage = lazy(() => import("./pages/GiftPage"));
const GiftConfirmation = lazy(() => import("./pages/GiftConfirmation"));
const GiftClaim = lazy(() => import("./pages/GiftClaim"));
const PurchaseHistory = lazy(() => import("./pages/PurchaseHistory"));
const About = lazy(() => import("./pages/About"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));
const Explore = lazy(() => import("./pages/Explore"));
const ExploreConcept = lazy(() => import("./pages/ExploreConcept"));
const Today = lazy(() => import("./pages/Today"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
// PhasecraftRoutes is a named export, so .then() is required by React.lazy
const PhasecraftRoutes = lazy(() => import("@/phasecraft/PhasecraftRoutes").then(m => ({ default: m.PhasecraftRoutes })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#07080c" }} />}>
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
      </Suspense>
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
