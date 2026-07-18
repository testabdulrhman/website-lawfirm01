import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
// الصفحة الرئيسية تُحمّل مباشرة (فوق الطية) لتفادي وميض التحميل الأولي
import Home from "@/pages/Home";

// تقسيم الحزمة: تحميل كسول لبقية الصفحات لتقليل حجم أول تحميل (code-splitting)
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
const Claims = lazy(() => import("@/pages/Claims"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Team = lazy(() => import("@/pages/Team"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Careers = lazy(() => import("@/pages/Careers"));
const HomePreview = lazy(() => import("@/pages/HomePreview"));
const BankruptcyComplete = lazy(() => import("@/pages/BankruptcyComplete"));
const BankruptcyCase = lazy(() => import("@/pages/BankruptcyCase"));
const BankruptcyTrack = lazy(() => import("@/pages/BankruptcyTrack"));
const BankruptcyTicket = lazy(() => import("@/pages/BankruptcyTicket"));
const Bankruptcy = lazy(() => import("@/pages/Bankruptcy"));
const BankruptcyProcedures = lazy(() => import("@/pages/BankruptcyProcedures"));
const BankruptcyProcedure = lazy(() => import("@/pages/BankruptcyProcedure"));
const BankruptcyLP = lazy(() => import("@/pages/BankruptcyLP"));
const CasesGuide = lazy(() => import("@/pages/CasesGuide"));
const LegalDictionary = lazy(() => import("@/pages/LegalDictionary"));
const CityPage = lazy(() => import("@/pages/CityPage"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const PremiumResidency = lazy(() => import("@/pages/PremiumResidency"));
const Brand = lazy(() => import("@/pages/Brand"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// مؤشر تحميل موحّد بألوان الهوية (كحلي/ذهبي)
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[oklch(0.65_0.1_70)] border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* صفحة هبوط إعلانات جوجل - بلا Navbar/Footer العادي (مسار تحويل مستقل) */}
      <Route path={"/bankruptcy-lp"}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[oklch(0.2_0.04_250)]">
              <div className="w-8 h-8 rounded-full border-2 border-[oklch(0.65_0.1_70)] border-t-transparent animate-spin" />
            </div>
          }
        >
          <BankruptcyLP />
        </Suspense>
      </Route>
      <Route>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              {/* Arabic routes (default) */}
              <Route path={"/"} component={Home} />
              <Route path={"/preview"} component={HomePreview} />
              <Route path={"/about"} component={About} />
              <Route path={"/team"} component={Team} />
              <Route path={"/services"} component={Services} />
              <Route path={"/services/:slug"} component={ServiceDetail} />
              <Route path={"/bankruptcy"} component={Bankruptcy} />
              <Route path={"/bankruptcy/procedures"} component={BankruptcyProcedures} />
              <Route path={"/bankruptcy/procedures/:slug"} component={BankruptcyProcedure} />
              <Route path={"/bankruptcy/claims"} component={Claims} />
              <Route path={"/bankruptcy/track"} component={BankruptcyTrack} />
              <Route path={"/bankruptcy/ticket"} component={BankruptcyTicket} />
              <Route path={"/bankruptcy/complete"} component={BankruptcyComplete} />
              <Route path={"/bankruptcy/:slug"} component={BankruptcyCase} />
              <Route path={"/blog"} component={Blog} />
              <Route path={"/blog/:slug"} component={BlogPost} />
              <Route path={"/contact"} component={Contact} />
              <Route path={"/privacy"} component={Privacy} />
              <Route path={"/terms"} component={Terms} />
              <Route path={"/faq"} component={FAQ} />
              <Route path={"/careers"} component={Careers} />
              <Route path={"/cases-guide"} component={CasesGuide} />
              <Route path={"/legal-dictionary"} component={LegalDictionary} />
              <Route path={"/premium-residency"} component={PremiumResidency} />
              <Route path={"/locations/:slug"} component={CityPage} />
              <Route path={"/sitemap"} component={Sitemap} />
              {/* English routes (/en prefix) */}
              <Route path={"/en"} component={Home} />
              <Route path={"/en/about"} component={About} />
              <Route path={"/en/team"} component={Team} />
              <Route path={"/en/services"} component={Services} />
              <Route path={"/en/services/:slug"} component={ServiceDetail} />
              <Route path={"/en/bankruptcy"} component={Bankruptcy} />
              <Route path={"/en/bankruptcy/procedures"} component={BankruptcyProcedures} />
              <Route path={"/en/bankruptcy/procedures/:slug"} component={BankruptcyProcedure} />
              <Route path={"/en/bankruptcy/claims"} component={Claims} />
              <Route path={"/en/bankruptcy/track"} component={BankruptcyTrack} />
              <Route path={"/en/bankruptcy/ticket"} component={BankruptcyTicket} />
              <Route path={"/en/bankruptcy/complete"} component={BankruptcyComplete} />
              <Route path={"/en/bankruptcy/:slug"} component={BankruptcyCase} />
              <Route path={"/en/blog"} component={Blog} />
              <Route path={"/en/blog/:slug"} component={BlogPost} />
              <Route path={"/en/contact"} component={Contact} />
              <Route path={"/en/privacy"} component={Privacy} />
              <Route path={"/en/terms"} component={Terms} />
              <Route path={"/en/faq"} component={FAQ} />
              <Route path={"/en/careers"} component={Careers} />
              <Route path={"/en/cases-guide"} component={CasesGuide} />
              <Route path={"/en/legal-dictionary"} component={LegalDictionary} />
              <Route path={"/en/premium-residency"} component={PremiumResidency} />
              <Route path={"/en/locations/:slug"} component={CityPage} />
              <Route path={"/en/sitemap"} component={Sitemap} />
              {/* Urdu routes (/ur prefix) - Premium Residency only */}
              <Route path={"/ur/premium-residency"} component={PremiumResidency} />
              <Route path="/brand" component={Brand} />
              <Route path={"*"} component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
