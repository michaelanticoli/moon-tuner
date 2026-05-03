import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import MoontunerSchool from "./pages/MoontunerSchool";
import MoonTunerStarter from "./pages/MoonTunerStarter";
import Sessions from "./pages/Sessions";
import Services from "./pages/Services";
import MoonPhaseToday from "./pages/MoonPhaseToday";
import Studio from "./pages/Studio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/the-moon" element={<Moon />} />
          <Route path="/method" element={<Method />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/workbooks" element={<Workbooks />} />
          <Route path="/workbook-preview" element={<WorkbookPreview />} />
          <Route path="/lunar-chaperone" element={<LunarChaperone />} />
          <Route path="/lunar-system" element={<LunarSystem />} />
          <Route path="/lunar-cipher" element={<LunarCipher />} />
          <Route path="/lunar-reports" element={<LunarReports />} />
          <Route path="/quantumelodic" element={<QuantumMelodic />} />
          <Route path="/school" element={<MoontunerSchool />} />
          <Route path="/app" element={<MoontunedApp />} />
          <Route path="/starter" element={<MoonTunerStarter />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/services" element={<Services />} />
          <Route path="/moon-phase-today" element={<MoonPhaseToday />} />
          <Route path="/auth" element={<Auth />} />
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
          <Route
            path="/studio"
            element={
              <ProtectedRoute>
                <Studio />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
