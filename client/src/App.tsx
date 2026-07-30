import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
} from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";

// تقسيم الحزمة: تحميل كسول لبقية الصفحات لتقليل حجم أول تحميل (code-splitting)
const Home = lazy(() => import("@/pages/Home"));
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
const CareersComplete = lazy(() => import("@/pages/CareersComplete"));
const BankruptcyComplete = lazy(() => import("@/pages/BankruptcyComplete"));
const BankruptcyCase = lazy(() => import("@/pages/BankruptcyCase"));
const BankruptcyTrack = lazy(() => import("@/pages/BankruptcyTrack"));
const CreditorPortal = lazy(() => import("@/pages/CreditorPortal"));
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
const Licenses = lazy(() => import("@/pages/Licenses"));
const BankruptcyTrusteeLicense = lazy(() => import("@/pages/BankruptcyTrusteeLicense"));
const HassanMisferAlZahrani = lazy(() => import("@/pages/HassanMisferAlZahrani"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function DeferredToaster() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Toaster /> : null;
}

export type InitialPage = {
  url: string;
  path: string;
  Component: ComponentType;
};

export async function loadInitialPage(pathname: string): Promise<InitialPage | undefined> {
  const path = pathname.replace(/\/+$/, "") || "/";
  const localePrefix = path === "/en" || path.startsWith("/en/")
    ? "/en"
    : path === "/ur" || path.startsWith("/ur/")
      ? "/ur"
      : "";
  const localizedPath =
    path === "/en" || path === "/ur"
      ? "/"
      : path.replace(/^\/(?:en|ur)(?=\/)/, "");

  let Component: ComponentType;
  let routePath = path;

  if (localizedPath === "/bankruptcy-lp") Component = (await import("@/pages/BankruptcyLP")).default;
  else if (localizedPath === "/") Component = (await import("@/pages/Home")).default;
  else if (localizedPath === "/about") Component = (await import("@/pages/About")).default;
  else if (localizedPath === "/team") Component = (await import("@/pages/Team")).default;
  else if (localizedPath === "/services") Component = (await import("@/pages/Services")).default;
  else if (localizedPath.startsWith("/services/")) {
    Component = (await import("@/pages/ServiceDetail")).default;
    routePath = `${localePrefix}/services/:slug`;
  }
  else if (localizedPath === "/bankruptcy") Component = (await import("@/pages/Bankruptcy")).default;
  else if (localizedPath === "/bankruptcy/procedures") Component = (await import("@/pages/BankruptcyProcedures")).default;
  else if (localizedPath.startsWith("/bankruptcy/procedures/")) {
    Component = (await import("@/pages/BankruptcyProcedure")).default;
    routePath = `${localePrefix}/bankruptcy/procedures/:slug`;
  }
  else if (localizedPath === "/bankruptcy/claims") Component = (await import("@/pages/Claims")).default;
  else if (localizedPath === "/bankruptcy/Hassan-Misfer-Al-Zahrani") Component = (await import("@/pages/HassanMisferAlZahrani")).default;
  else if (localizedPath === "/bankruptcy/track") Component = (await import("@/pages/BankruptcyTrack")).default;
  else if (localizedPath === "/bankruptcy/ticket") Component = (await import("@/pages/BankruptcyTicket")).default;
  else if (localizedPath === "/bankruptcy/complete") Component = (await import("@/pages/BankruptcyComplete")).default;
  else if (localizedPath === "/bankruptcy/creditor") Component = (await import("@/pages/CreditorPortal")).default;
  else if (localizedPath.startsWith("/bankruptcy/")) {
    Component = (await import("@/pages/BankruptcyCase")).default;
    routePath = `${localePrefix}/bankruptcy/:slug`;
  }
  else if (localizedPath === "/blog") Component = (await import("@/pages/Blog")).default;
  else if (localizedPath.startsWith("/blog/")) {
    Component = (await import("@/pages/BlogPost")).default;
    routePath = `${localePrefix}/blog/:slug`;
  }
  else if (localizedPath === "/contact") Component = (await import("@/pages/Contact")).default;
  else if (localizedPath === "/privacy") Component = (await import("@/pages/Privacy")).default;
  else if (localizedPath === "/terms") Component = (await import("@/pages/Terms")).default;
  else if (localizedPath === "/faq") Component = (await import("@/pages/FAQ")).default;
  else if (localizedPath === "/careers/complete") Component = (await import("@/pages/CareersComplete")).default;
  else if (localizedPath === "/careers") Component = (await import("@/pages/Careers")).default;
  else if (localizedPath === "/cases-guide") Component = (await import("@/pages/CasesGuide")).default;
  else if (localizedPath === "/legal-dictionary") Component = (await import("@/pages/LegalDictionary")).default;
  else if (localizedPath === "/premium-residency") Component = (await import("@/pages/PremiumResidency")).default;
  else if (localizedPath.startsWith("/locations/")) {
    Component = (await import("@/pages/CityPage")).default;
    routePath = `${localePrefix}/locations/:slug`;
  }
  else if (localizedPath === "/licenses/bankruptcy-trustee") Component = (await import("@/pages/BankruptcyTrusteeLicense")).default;
  else if (localizedPath === "/licenses") Component = (await import("@/pages/Licenses")).default;
  else if (localizedPath === "/sitemap") Component = (await import("@/pages/Sitemap")).default;
  else if (localizedPath === "/brand") Component = (await import("@/pages/Brand")).default;
  else Component = (await import("@/pages/NotFound")).default;

  return { url: path, path: routePath, Component };
}

function Router({ initialPage }: { initialPage?: InitialPage }) {
  const [location] = useLocation();
  const currentPath = location.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  const showInitialPage = initialPage?.url === currentPath;
  const InitialLandingPage =
    showInitialPage && initialPage?.path === "/bankruptcy-lp"
      ? initialPage.Component
      : undefined;
  const InitialContentPage =
    showInitialPage && initialPage?.path !== "/bankruptcy-lp"
      ? initialPage?.Component
      : undefined;

  return (
    <Switch>
      {/* صفحة هبوط إعلانات جوجل - بلا Navbar/Footer العادي (مسار تحويل مستقل) */}
      <Route path={"/bankruptcy-lp"}>
        {InitialLandingPage ? (
          <InitialLandingPage />
        ) : (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-[oklch(0.2_0.04_250)]">
                <div className="w-8 h-8 rounded-full border-2 border-[oklch(0.65_0.1_70)] border-t-transparent animate-spin" />
              </div>
            }
          >
            <BankruptcyLP />
          </Suspense>
        )}
      </Route>
      <Route>
        <Layout>
          {InitialContentPage ? (
            <Route path={initialPage!.path}>
              <InitialContentPage />
            </Route>
          ) : (
            <Switch>
              {/* Arabic routes (default) */}
              <Route path={"/"} component={Home} />
              <Route path={"/about"} component={About} />
              <Route path={"/team"} component={Team} />
              <Route path={"/services"} component={Services} />
              <Route path={"/services/:slug"} component={ServiceDetail} />
              <Route path={"/bankruptcy"} component={Bankruptcy} />
              <Route path={"/bankruptcy/procedures"} component={BankruptcyProcedures} />
              <Route path={"/bankruptcy/procedures/:slug"} component={BankruptcyProcedure} />
              <Route path={"/bankruptcy/claims"} component={Claims} />
              <Route path={"/bankruptcy/Hassan-Misfer-Al-Zahrani"} component={HassanMisferAlZahrani} />
              <Route path={"/bankruptcy/track"} component={BankruptcyTrack} />
              <Route path={"/bankruptcy/ticket"} component={BankruptcyTicket} />
              <Route path={"/bankruptcy/complete"} component={BankruptcyComplete} />
              {/* بوابة الدائن الموحّدة — ثلاث لغات.
                  يجب أن تسبق /bankruptcy/:slug و /en/bankruptcy/:slug،
                  وإلا التقطتها قاعدة الـslug وعرضت «الإجراء غير موجود». */}
              <Route path={"/bankruptcy/creditor"} component={CreditorPortal} />
              <Route path={"/en/bankruptcy/creditor"} component={CreditorPortal} />
              <Route path={"/ur/bankruptcy/creditor"} component={CreditorPortal} />
              <Route path={"/bankruptcy/:slug"} component={BankruptcyCase} />
              <Route path={"/blog"} component={Blog} />
              <Route path={"/blog/:slug"} component={BlogPost} />
              <Route path={"/contact"} component={Contact} />
              <Route path={"/privacy"} component={Privacy} />
              <Route path={"/terms"} component={Terms} />
              <Route path={"/faq"} component={FAQ} />
              <Route path={"/careers/complete"} component={CareersComplete} />
              <Route path={"/careers"} component={Careers} />
              <Route path={"/cases-guide"} component={CasesGuide} />
              <Route path={"/legal-dictionary"} component={LegalDictionary} />
              <Route path={"/premium-residency"} component={PremiumResidency} />
              <Route path={"/locations/:slug"} component={CityPage} />
              <Route path={"/licenses/bankruptcy-trustee"} component={BankruptcyTrusteeLicense} />
              <Route path={"/licenses"} component={Licenses} />
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
              <Route path={"/en/bankruptcy/Hassan-Misfer-Al-Zahrani"} component={HassanMisferAlZahrani} />
              <Route path={"/en/bankruptcy/complete"} component={BankruptcyComplete} />
              <Route path={"/en/bankruptcy/:slug"} component={BankruptcyCase} />
              <Route path={"/en/blog"} component={Blog} />
              <Route path={"/en/blog/:slug"} component={BlogPost} />
              <Route path={"/en/contact"} component={Contact} />
              <Route path={"/en/privacy"} component={Privacy} />
              <Route path={"/en/terms"} component={Terms} />
              <Route path={"/en/faq"} component={FAQ} />

              <Route path={"/en/premium-residency"} component={PremiumResidency} />
              <Route path={"/en/locations/:slug"} component={CityPage} />
              <Route path={"/en/licenses/bankruptcy-trustee"} component={BankruptcyTrusteeLicense} />
              <Route path={"/en/licenses"} component={Licenses} />
              <Route path={"/en/sitemap"} component={Sitemap} />
              {/* Urdu routes (/ur prefix) */}
              <Route path={"/ur/premium-residency"} component={PremiumResidency} />
              <Route path="/brand" component={Brand} />
              <Route path={"*"} component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          )}
        </Layout>
      </Route>
    </Switch>
  );
}

function App({
  initialPage,
  helmetContext,
}: {
  initialPage?: InitialPage;
  helmetContext?: Record<string, unknown>;
}) {
  return (
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <LanguageProvider>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <DeferredToaster />
              <Router initialPage={initialPage} />
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
