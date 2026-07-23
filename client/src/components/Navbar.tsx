/*
 * Navbar — شركة عبدالرحمن رضوان المشيقح للمحاماة
 * Design philosophy: Navy (#0f1b2d) + Gold (#b8860b) — Editorial / refined legal authority.
 * Fonts: Playfair Display (display), Montserrat (heading), Noto Sans Arabic (body).
 * Mega Menu: services panel reveals on hover/focus with origin-aware scale-in,
 *   staggered card entrances, gold underline accents. Motion < 300ms, ease-out.
 * RTL-aware throughout.
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu, X, Phone, Globe, ChevronDown,
  Briefcase, Users, Gavel, Building2, Scale, MessageSquare,
  Landmark, FileText, ClipboardList, ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { trackBookConsultation, trackLanguageSwitch, trackPhoneClick } from "@/lib/analytics";
import { localePath } from "@/lib/localePath";

const LOGO_LIGHT = "/images/logo-light.webp";
const LOGO_DARK = "/images/logo-dark.webp";

// Icon per service slug (visual rhythm for the mega menu)
const SERVICE_ICONS: Record<string, typeof Briefcase> = {
  "civil-commercial": Briefcase,
  "labor": Users,
  "criminal": Gavel,
  "real-estate": Building2,
  "bankruptcy": Landmark,
  "consultation": MessageSquare,
  "arbitration": Scale,
  "documentation": FileText,
  "administrative": ClipboardList,
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [location] = useLocation();
  const { t, lang, toggleLang, isRTL } = useTranslation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const services = t.services.items as readonly { title: string; slug: string; desc: string }[];

  const lp = (p: string) => localePath(p, lang);
  const navLinks = [
    { label: t.nav.home, href: lp("/") },
    { label: t.nav.about, href: lp("/about") },
    { label: t.nav.team, href: lp("/team") },
    { label: t.nav.services, href: lp("/services"), mega: true },
    { label: t.nav.trackClaim, href: lp("/bankruptcy/track") },
    { label: t.nav.blog, href: lp("/blog") },
    { label: t.nav.contact, href: lp("/contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsMegaOpen(false);
    setIsMobileServicesOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isHome = location === "/" || location === "/en";
  const showTransparent = isHome && !isScrolled && !isMegaOpen;

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsMegaOpen(false), 120);
  };

  const servicesActive = location.startsWith("/services") || location.startsWith("/en/services");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showTransparent
          ? "bg-gradient-to-b from-[oklch(0.1_0.04_250/0.6)] to-transparent"
          : "bg-[oklch(0.98_0.005_90/0.97)] backdrop-blur-md shadow-sm"
      }`}
    >
      <div
        className="container mx-auto flex items-center justify-between px-4 lg:px-8"
        style={{ height: showTransparent ? "80px" : "72px", transition: "height 0.3s ease" }}
      >
        {/* Logo */}
        <Link href={lp("/")} className="flex items-center shrink-0">
          <img
            src={showTransparent ? LOGO_LIGHT : LOGO_DARK}
            alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
            className="w-auto object-contain transition-all duration-300"
            style={{ height: showTransparent ? "52px" : "46px", maxWidth: "220px" }}
            width={220}
            height={52}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.mega ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                <Link
                  href={link.href}
                  onFocus={openMega}
                  aria-expanded={isMegaOpen}
                  className={`flex items-center gap-1 text-sm font-heading font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] ${isRTL ? "after:right-0" : "after:left-0"} after:h-[2px] after:bg-[var(--color-gold)] after:transition-all after:duration-300 ${
                    servicesActive || isMegaOpen ? "after:w-full" : "after:w-0 hover:after:w-full"
                  } ${
                    showTransparent ? "text-white/90 hover:text-[var(--color-gold)]" : "text-[var(--color-navy)] hover:text-[var(--color-gold)]"
                  } ${servicesActive ? "text-[var(--color-gold)]" : ""}`}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300"
                    style={{ transform: isMegaOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </Link>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-heading font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] ${isRTL ? "after:right-0" : "after:left-0"} after:h-[2px] after:bg-[var(--color-gold)] after:transition-all after:duration-300 ${
                  location === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                } ${
                  showTransparent ? "text-white/90 hover:text-[var(--color-gold)]" : "text-[var(--color-navy)] hover:text-[var(--color-gold)]"
                } ${location === link.href ? "text-[var(--color-gold)]" : ""}`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Button + Language Toggle - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => { toggleLang(); trackLanguageSwitch?.(lang === "ar" ? "en" : "ar"); }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-heading font-medium rounded transition-all duration-200 ${
              showTransparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-[var(--color-navy)]/70 hover:text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5"
            }`}
            aria-label="Switch language"
          >
            <Globe size={14} />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>

          <Link
            href={lp("/contact")}
            onClick={() => trackBookConsultation("navbar_desktop")}
            className={`flex items-center gap-2 px-5 py-2.5 font-heading text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
              showTransparent ? "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-light)]" : "bg-[var(--color-navy)] text-[var(--color-cream)] hover:bg-[var(--color-navy-light)]"
            }`}
          >
            <Phone size={14} />
            <span>{t.nav.bookConsultation}</span>
          </Link>
        </div>

        {/* Mobile: Language Toggle + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className={`p-2 text-xs font-heading font-medium transition-colors ${showTransparent ? "text-white/80" : "text-[var(--color-navy)]/70"}`}
            aria-label="Switch language"
          >
            <Globe size={20} />
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`p-2.5 transition-colors ${showTransparent ? "text-white" : "text-[var(--color-navy)]"}`}
            aria-label={isMobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ===== Mega Menu (Desktop) ===== */}
      <div
        className="hidden lg:block absolute left-0 right-0 top-full"
        onMouseEnter={openMega}
        onMouseLeave={scheduleCloseMega}
        style={{ pointerEvents: isMegaOpen ? "auto" : "none" }}
      >
        <div
          className="origin-top transition-all duration-200"
          style={{
            opacity: isMegaOpen ? 1 : 0,
            transform: isMegaOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.985)",
            transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div className="container mx-auto px-4 lg:px-8 pt-3 pb-6">
            <div className="bg-[var(--color-navy)] shadow-2xl ring-1 ring-[var(--color-gold)]/15 overflow-hidden">
              <div className="grid grid-cols-12">
                {/* Services grid */}
                <div className="col-span-9 p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-[2px] w-8 bg-[var(--color-gold)]" />
                    <span className="font-heading text-xs tracking-[0.2em] text-[var(--color-gold)] uppercase">
                      {t.services.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {services.map((s, idx) => {
                      const Icon = SERVICE_ICONS[s.slug] ?? Scale;
                      return (
                        <Link
                          key={s.slug}
                          href={lp(`/services/${s.slug}`)}
                          className="group flex items-start gap-3 p-3 rounded-md transition-colors duration-200 hover:bg-white/[0.06]"
                          style={{
                            opacity: isMegaOpen ? 1 : 0,
                            transform: isMegaOpen ? "translateY(0)" : "translateY(6px)",
                            transition: "opacity 280ms cubic-bezier(0.23,1,0.32,1), transform 280ms cubic-bezier(0.23,1,0.32,1)",
                            transitionDelay: isMegaOpen ? `${idx * 35}ms` : "0ms",
                          }}
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-white/[0.05] text-[var(--color-gold)] transition-colors duration-200 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)]">
                            <Icon size={17} />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1 font-heading text-sm font-semibold text-white group-hover:text-[var(--color-gold)] transition-colors">
                              {s.title}
                              <ArrowUpRight size={13} className={`opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all duration-200 ${isRTL ? "scale-x-[-1]" : ""}`} />
                            </span>
                            <span className="block font-body text-xs leading-relaxed text-white/45 mt-0.5 line-clamp-2">
                              {s.desc}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                    {/* Premium Residency - standalone service */}
                    <Link
                      href={lp("/premium-residency")}
                      className="group flex items-start gap-3 p-3 rounded-md transition-colors duration-200 hover:bg-white/[0.06]"
                      style={{
                        opacity: isMegaOpen ? 1 : 0,
                        transform: isMegaOpen ? "translateY(0)" : "translateY(6px)",
                        transition: "opacity 280ms cubic-bezier(0.23,1,0.32,1), transform 280ms cubic-bezier(0.23,1,0.32,1)",
                        transitionDelay: isMegaOpen ? `${services.length * 35}ms` : "0ms",
                      }}
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-white/[0.05] text-[var(--color-gold)] transition-colors duration-200 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)]">
                        <Globe size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 font-heading text-sm font-semibold text-white group-hover:text-[var(--color-gold)] transition-colors">
                          {lang === "ar" ? "الإقامة المميزة" : "Premium Residency"}
                          <ArrowUpRight size={13} className={`opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all duration-200 ${isRTL ? "scale-x-[-1]" : ""}`} />
                        </span>
                        <span className="block font-body text-xs leading-relaxed text-white/45 mt-0.5 line-clamp-2">
                          {lang === "ar" ? "خدمات الحصول على الإقامة المميزة السعودية" : "Saudi Premium Residency services"}
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Side promo panel */}
                <div className="col-span-3 relative bg-[var(--color-navy-light)] p-7 flex flex-col justify-between border-s border-white/5">
                  <div>
                    <Scale size={28} className="text-[var(--color-gold)] mb-4" />
                    <h4 className="font-display text-lg font-bold text-white leading-snug mb-2">
                      {lang === "ar" ? "بوابة الدائن" : "Creditor Portal"}
                    </h4>
                    <p className="font-body text-xs text-white/50 leading-relaxed mb-5">
                      {lang === "ar"
                        ? "مطالباتك وتذاكرك وبياناتك في مكان واحد — دخول آمن برمز تحقق يصل لجوالك."
                        : "Your claims, tickets and details in one place — secure OTP login."}
                    </p>
                  </div>
                  <a
                    href="https://iflas.redwan.sa/p/creditor"
                    className="group inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading text-sm font-semibold transition-all duration-200 hover:bg-[var(--color-gold-light)] active:scale-[0.97]"
                  >
                    <span>{lang === "ar" ? "الدخول للبوابة" : "Enter the Portal"}</span>
                    <ArrowUpRight size={15} className={isRTL ? "scale-x-[-1]" : ""} />
                  </a>
                  <Link
                    href={lp("/services")}
                    className="mt-3 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-white/15 text-white/80 font-heading text-xs font-medium transition-colors duration-200 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
                  >
                    {t.services.viewAll}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu - Full Screen Overlay ===== */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-[oklch(0.98_0.005_90)] z-[60] transition-all duration-300 ease-out ${
          isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 lg:px-8" style={{ height: "72px" }}>
          <Link href={lp("/")} className="flex items-center shrink-0">
            <img
              src={LOGO_DARK}
              alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
              className="w-auto object-contain"
              style={{ height: "46px", maxWidth: "220px" }}
              width={220}
              height={46}
            />
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2.5 text-[var(--color-navy)] transition-colors"
            aria-label={t.nav.closeMenu}
          >
            <X size={26} />
          </button>
        </div>
        <div className="flex flex-col" style={{ height: "calc(100% - 72px)" }}>
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.mega ? (
                  <div key={link.href} className="border-b border-[var(--color-border)]/50">
                    <button
                      onClick={() => setIsMobileServicesOpen((v) => !v)}
                      className={`w-full flex items-center justify-between text-lg font-heading font-medium py-4 ${isRTL ? "text-right" : "text-left"} ${
                        servicesActive ? "text-[var(--color-gold)]" : "text-[var(--color-navy)]"
                      }`}
                      aria-expanded={isMobileServicesOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={18}
                        className="transition-transform duration-300"
                        style={{ transform: isMobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{ maxHeight: isMobileServicesOpen ? `${(services.length + 1) * 52 + 56}px` : "0px" }}
                    >
                      <div className={`flex flex-col pb-3 ${isRTL ? "pr-3 border-r-2" : "pl-3 border-l-2"} border-[var(--color-gold)]/30 ${isRTL ? "mr-1" : "ml-1"}`}>
                        {services.map((s) => {
                          const Icon = SERVICE_ICONS[s.slug] ?? Scale;
                          return (
                            <Link
                              key={s.slug}
                              href={lp(`/services/${s.slug}`)}
                              className="flex items-center gap-3 py-3 font-body text-sm text-[var(--color-navy)]/80 active:text-[var(--color-gold)]"
                            >
                              <Icon size={16} className="text-[var(--color-gold)] shrink-0" />
                              <span>{s.title}</span>
                            </Link>
                          );
                        })}
                        <Link
                          href={lp("/premium-residency")}
                          className="flex items-center gap-3 py-3 font-body text-sm text-[var(--color-navy)]/80 active:text-[var(--color-gold)]"
                        >
                          <Globe size={16} className="text-[var(--color-gold)] shrink-0" />
                          <span>{lang === "ar" ? "الإقامة المميزة" : "Premium Residency"}</span>
                        </Link>
                        <Link
                          href={lp("/services")}
                          className="flex items-center gap-2 py-3 font-heading text-sm font-semibold text-[var(--color-gold)]"
                        >
                          {t.services.viewAll}
                          <ArrowUpRight size={14} className={isRTL ? "scale-x-[-1]" : ""} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${isRTL ? "text-right" : "text-left"} text-lg font-heading font-medium transition-colors py-4 border-b border-[var(--color-border)]/50 ${
                      location === link.href ? "text-[var(--color-gold)]" : "text-[var(--color-navy)] active:text-[var(--color-gold)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <a
                href="tel:+966505149800"
                onClick={() => trackPhoneClick("navbar_mobile")}
                className="flex items-center justify-center gap-3 text-[var(--color-navy)]/70 font-body text-base mb-4"
                dir="ltr"
              >
                <Phone size={18} className="text-[var(--color-gold)]" />
                <span>0505149800</span>
              </a>
            </div>

            {/* Mobile Language Toggle */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-navy)] font-heading text-sm rounded transition-colors hover:bg-[var(--color-navy)]/5"
              >
                <Globe size={16} />
                <span>{lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}</span>
              </button>
            </div>
          </div>

          {/* Mobile CTA - Fixed at bottom */}
          <div className="px-6 pb-8 pt-4 border-t border-[var(--color-border)]/50">
            <Link
              href={lp("/contact")}
              onClick={() => trackBookConsultation("navbar_mobile")}
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[var(--color-navy)] text-[var(--color-cream)] font-heading text-base font-semibold active:scale-[0.97] transition-transform"
            >
              <Phone size={16} />
              <span>{t.nav.bookConsultation}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
