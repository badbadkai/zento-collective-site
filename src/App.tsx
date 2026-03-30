import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RiskDisclaimer from "./pages/RiskDisclaimer";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import Start from "./pages/Start";
import Collective from "./pages/Collective";
import Bootcamp from "./pages/Bootcamp";
import Articles from "./pages/Articles";
import WaitlistPage from "./pages/WaitlistPage";
import BootcampWaitlist from "./pages/BootcampWaitlist";
import PageTransition from "./components/PageTransition";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Lazy-loaded portal modules — not included in marketing site bundle
const AdminApp = lazy(() => import("./admin/AdminApp"));
const PortalApp = lazy(() => import("./portal/PortalApp"));

const queryClient = new QueryClient();

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

/** Detect which app to render based on hostname */
function getAppMode(): "admin" | "portal" | "marketing" {
  const hostname = window.location.hostname;
  if (hostname.startsWith("admin")) return "admin";
  if (hostname.startsWith("portal")) return "portal";
  return "marketing";
}

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const MarketingRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/start" element={<PageTransition><Start /></PageTransition>} />
        <Route path="/collective" element={<PageTransition><Collective /></PageTransition>} />
        <Route path="/bootcamp" element={<PageTransition><Bootcamp /></PageTransition>} />
        <Route path="/waitlist" element={<PageTransition><WaitlistPage /></PageTransition>} />
        <Route path="/bootcamp-waitlist" element={<PageTransition><BootcampWaitlist /></PageTransition>} />
        <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/privacy_policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/risk_disclaimer" element={<PageTransition><RiskDisclaimer /></PageTransition>} />
        <Route path="/refund" element={<PageTransition><RefundPolicy /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const appMode = getAppMode();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme={appMode === "marketing" ? "light" : "dark"}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              {appMode === "admin" && (
                <Suspense fallback={<FullScreenLoader />}>
                  <AdminApp />
                </Suspense>
              )}
              {appMode === "portal" && (
                <Suspense fallback={<FullScreenLoader />}>
                  <PortalApp />
                </Suspense>
              )}
              {appMode === "marketing" && <MarketingRoutes />}
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
