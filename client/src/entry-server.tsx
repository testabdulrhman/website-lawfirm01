/**
 * SSR Entry Point
 * Renders the React app to static HTML for a given route.
 * Used by the prerender script to generate full HTML for each page.
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";

// Import all pages directly (no lazy loading for SSR)
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
import Careers from "@/pages/Careers";
import BankruptcyComplete from "@/pages/BankruptcyComplete";
import BankruptcyCase from "@/pages/BankruptcyCase";
import BankruptcyTrack from "@/pages/BankruptcyTrack";
import BankruptcyTicket from "@/pages/BankruptcyTicket";
import Bankruptcy from "@/pages/Bankruptcy";
import BankruptcyProcedures from "@/pages/BankruptcyProcedures";
import BankruptcyProcedure from "@/pages/BankruptcyProcedure";
import BankruptcyLP from "@/pages/BankruptcyLP";
import CasesGuide from "@/pages/CasesGuide";
import LegalDictionary from "@/pages/LegalDictionary";
import CityPage from "@/pages/CityPage";
import Sitemap from "@/pages/Sitemap";
import NotFound from "@/pages/NotFound";

function SSRRouter({ url }: { url: string }) {
  return (
    <Switch>
      {/* Landing page without Layout */}
      <Route path="/bankruptcy-lp"><BankruptcyLP /></Route>
      <Route path="/en/bankruptcy-lp"><BankruptcyLP /></Route>

      {/* All other routes with Layout */}
      <Route path="/">{() => <Layout><Home /></Layout>}</Route>
      <Route path="/about">{() => <Layout><About /></Layout>}</Route>
      <Route path="/team">{() => <Layout><Team /></Layout>}</Route>
      <Route path="/services">{() => <Layout><Services /></Layout>}</Route>
      <Route path="/services/:slug">{() => <Layout><ServiceDetail /></Layout>}</Route>
      <Route path="/blog">{() => <Layout><Blog /></Layout>}</Route>
      <Route path="/blog/:slug">{() => <Layout><BlogPost /></Layout>}</Route>
      <Route path="/contact">{() => <Layout><Contact /></Layout>}</Route>
      <Route path="/claims">{() => <Layout><Claims /></Layout>}</Route>
      <Route path="/privacy">{() => <Layout><Privacy /></Layout>}</Route>
      <Route path="/terms">{() => <Layout><Terms /></Layout>}</Route>
      <Route path="/faq">{() => <Layout><FAQ /></Layout>}</Route>
      <Route path="/careers">{() => <Layout><Careers /></Layout>}</Route>
      <Route path="/bankruptcy">{() => <Layout><Bankruptcy /></Layout>}</Route>
      <Route path="/bankruptcy/claims">{() => <Layout><BankruptcyComplete /></Layout>}</Route>
      <Route path="/bankruptcy/track">{() => <Layout><BankruptcyTrack /></Layout>}</Route>
      <Route path="/bankruptcy/ticket">{() => <Layout><BankruptcyTicket /></Layout>}</Route>
      <Route path="/bankruptcy/procedures">{() => <Layout><BankruptcyProcedures /></Layout>}</Route>
      <Route path="/bankruptcy/procedures/:id">{() => <Layout><BankruptcyProcedure /></Layout>}</Route>
      <Route path="/bankruptcy/:slug">{() => <Layout><BankruptcyCase /></Layout>}</Route>
      <Route path="/cases-guide">{() => <Layout><CasesGuide /></Layout>}</Route>
      <Route path="/legal-dictionary">{() => <Layout><LegalDictionary /></Layout>}</Route>
      <Route path="/sitemap">{() => <Layout><Sitemap /></Layout>}</Route>
      <Route path="/locations/:city">{() => <Layout><CityPage /></Layout>}</Route>

      {/* English routes */}
      <Route path="/en">{() => <Layout><Home /></Layout>}</Route>
      <Route path="/en/about">{() => <Layout><About /></Layout>}</Route>
      <Route path="/en/team">{() => <Layout><Team /></Layout>}</Route>
      <Route path="/en/services">{() => <Layout><Services /></Layout>}</Route>
      <Route path="/en/services/:slug">{() => <Layout><ServiceDetail /></Layout>}</Route>
      <Route path="/en/blog">{() => <Layout><Blog /></Layout>}</Route>
      <Route path="/en/blog/:slug">{() => <Layout><BlogPost /></Layout>}</Route>
      <Route path="/en/contact">{() => <Layout><Contact /></Layout>}</Route>
      <Route path="/en/claims">{() => <Layout><Claims /></Layout>}</Route>
      <Route path="/en/privacy">{() => <Layout><Privacy /></Layout>}</Route>
      <Route path="/en/terms">{() => <Layout><Terms /></Layout>}</Route>
      <Route path="/en/faq">{() => <Layout><FAQ /></Layout>}</Route>
      <Route path="/en/careers">{() => <Layout><Careers /></Layout>}</Route>
      <Route path="/en/bankruptcy">{() => <Layout><Bankruptcy /></Layout>}</Route>
      <Route path="/en/bankruptcy/claims">{() => <Layout><BankruptcyComplete /></Layout>}</Route>
      <Route path="/en/bankruptcy/track">{() => <Layout><BankruptcyTrack /></Layout>}</Route>
      <Route path="/en/bankruptcy/ticket">{() => <Layout><BankruptcyTicket /></Layout>}</Route>
      <Route path="/en/bankruptcy/procedures">{() => <Layout><BankruptcyProcedures /></Layout>}</Route>
      <Route path="/en/bankruptcy/procedures/:id">{() => <Layout><BankruptcyProcedure /></Layout>}</Route>
      <Route path="/en/bankruptcy/:slug">{() => <Layout><BankruptcyCase /></Layout>}</Route>
      <Route path="/en/cases-guide">{() => <Layout><CasesGuide /></Layout>}</Route>
      <Route path="/en/legal-dictionary">{() => <Layout><LegalDictionary /></Layout>}</Route>
      <Route path="/en/sitemap">{() => <Layout><Sitemap /></Layout>}</Route>
      <Route path="/en/locations/:city">{() => <Layout><CityPage /></Layout>}</Route>

      {/* 404 */}
      <Route>{() => <Layout><NotFound /></Layout>}</Route>
    </Switch>
  );
}

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <Router ssrPath={url}>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <SSRRouter url={url} />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet };
}
