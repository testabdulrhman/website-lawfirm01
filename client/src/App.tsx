import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Claims from "@/pages/Claims";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Team from "@/pages/Team";
import FAQ from "@/pages/FAQ";
import Layout from "@/components/Layout";
import HomePreview from "@/pages/HomePreview";
import BankruptcyComplete from "@/pages/BankruptcyComplete";
import BankruptcyCase from "@/pages/BankruptcyCase";
import BankruptcyTrack from "@/pages/BankruptcyTrack";
import Sitemap from "@/pages/Sitemap";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/preview"} component={HomePreview} />
        <Route path={"/about"} component={About} />
        <Route path={"/team"} component={Team} />
        <Route path={"/services"} component={Services} />
        <Route path={"/services/:slug"} component={ServiceDetail} />
        <Route path={"/bankruptcy/claims"} component={Claims} />
        <Route path={"/bankruptcy/track"} component={BankruptcyTrack} />
        <Route path={"/bankruptcy/complete"} component={BankruptcyComplete} />
        <Route path={"/bankruptcy/:slug"} component={BankruptcyCase} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/sitemap"} component={Sitemap} />
        <Route path={"*"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <ThemeProvider defaultTheme="light">
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
