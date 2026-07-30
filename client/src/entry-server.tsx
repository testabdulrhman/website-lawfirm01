/**
 * SSR entry point.
 *
 * The server and browser intentionally render the same App tree. The only
 * server-specific work here is choosing the already-imported page component
 * for the requested URL and providing Wouter with the SSR path.
 */
import React, { type ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App, { type InitialPage } from "./App";

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
import CareersComplete from "@/pages/CareersComplete";
import BankruptcyComplete from "@/pages/BankruptcyComplete";
import BankruptcyCase from "@/pages/BankruptcyCase";
import BankruptcyTrack from "@/pages/BankruptcyTrack";
import CreditorPortal from "@/pages/CreditorPortal";
import BankruptcyTicket from "@/pages/BankruptcyTicket";
import Bankruptcy from "@/pages/Bankruptcy";
import BankruptcyProcedures from "@/pages/BankruptcyProcedures";
import BankruptcyProcedure from "@/pages/BankruptcyProcedure";
import BankruptcyLP from "@/pages/BankruptcyLP";
import HassanMisferAlZahrani from "@/pages/HassanMisferAlZahrani";
import CasesGuide from "@/pages/CasesGuide";
import LegalDictionary from "@/pages/LegalDictionary";
import CityPage from "@/pages/CityPage";
import Sitemap from "@/pages/Sitemap";
import Licenses from "@/pages/Licenses";
import BankruptcyTrusteeLicense from "@/pages/BankruptcyTrusteeLicense";
import PremiumResidency from "@/pages/PremiumResidency";
import Brand from "@/pages/Brand";
import NotFound from "@/pages/NotFound";

function getInitialPage(url: string): InitialPage {
  const path = url.replace(/\/+$/, "") || "/";
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

  if (localizedPath === "/bankruptcy-lp") Component = BankruptcyLP;
  else if (localizedPath === "/") Component = Home;
  else if (localizedPath === "/about") Component = About;
  else if (localizedPath === "/team") Component = Team;
  else if (localizedPath === "/services") Component = Services;
  else if (localizedPath.startsWith("/services/")) {
    Component = ServiceDetail;
    routePath = `${localePrefix}/services/:slug`;
  } else if (localizedPath === "/bankruptcy") Component = Bankruptcy;
  else if (localizedPath === "/bankruptcy/procedures") Component = BankruptcyProcedures;
  else if (localizedPath.startsWith("/bankruptcy/procedures/")) {
    Component = BankruptcyProcedure;
    routePath = `${localePrefix}/bankruptcy/procedures/:slug`;
  } else if (localizedPath === "/bankruptcy/claims") Component = Claims;
  else if (localizedPath === "/bankruptcy/Hassan-Misfer-Al-Zahrani") Component = HassanMisferAlZahrani;
  else if (localizedPath === "/bankruptcy/track") Component = BankruptcyTrack;
  else if (localizedPath === "/bankruptcy/ticket") Component = BankruptcyTicket;
  else if (localizedPath === "/bankruptcy/complete") Component = BankruptcyComplete;
  else if (localizedPath === "/bankruptcy/creditor") Component = CreditorPortal;
  else if (localizedPath.startsWith("/bankruptcy/")) {
    Component = BankruptcyCase;
    routePath = `${localePrefix}/bankruptcy/:slug`;
  } else if (localizedPath === "/blog") Component = Blog;
  else if (localizedPath.startsWith("/blog/")) {
    Component = BlogPost;
    routePath = `${localePrefix}/blog/:slug`;
  } else if (localizedPath === "/contact") Component = Contact;
  else if (localizedPath === "/privacy") Component = Privacy;
  else if (localizedPath === "/terms") Component = Terms;
  else if (localizedPath === "/faq") Component = FAQ;
  else if (localizedPath === "/careers/complete") Component = CareersComplete;
  else if (localizedPath === "/careers") Component = Careers;
  else if (localizedPath === "/cases-guide") Component = CasesGuide;
  else if (localizedPath === "/legal-dictionary") Component = LegalDictionary;
  else if (localizedPath === "/sitemap") Component = Sitemap;
  else if (localizedPath.startsWith("/locations/")) {
    Component = CityPage;
    routePath = `${localePrefix}/locations/:slug`;
  } else if (localizedPath === "/licenses/bankruptcy-trustee") Component = BankruptcyTrusteeLicense;
  else if (localizedPath === "/licenses") Component = Licenses;
  else if (localizedPath === "/premium-residency") Component = PremiumResidency;
  else if (localizedPath === "/brand") Component = Brand;
  else Component = NotFound;

  return { url: path, path: routePath, Component };
}

export function render(url: string) {
  const helmetContext: { helmet?: unknown } = {};
  const initialPage = getInitialPage(url);

  const html = renderToString(
    <Router ssrPath={url}>
      <App initialPage={initialPage} helmetContext={helmetContext} />
    </Router>,
  );

  return { html, helmet: helmetContext.helmet };
}
