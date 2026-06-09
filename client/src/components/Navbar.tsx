import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { trackBookConsultation, trackLanguageSwitch, trackPhoneClick } from "@/lib/analytics";

const LOGO_LIGHT = "/manus-storage/logo-light-new_33dd99e3.webp";
const LOGO_DARK = "/manus-storage/logo-dark-new_3800bcd5.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();
  const { t, lang, toggleLang, isRTL } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.team, href: "/team" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.trackClaim, href: "/bankruptcy/track" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isHome = location === "/";
  const showTransparent = isHome && !isScrolled;

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
        style={{ height: showTransparent ? '80px' : '72px', transition: 'height 0.3s ease' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src={showTransparent ? LOGO_LIGHT : LOGO_DARK}
            alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
            className="w-auto object-contain transition-all duration-300"
            style={{ height: showTransparent ? '52px' : '46px', maxWidth: '220px' }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-heading font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] ${isRTL ? 'after:right-0' : 'after:left-0'} after:h-[2px] after:bg-[var(--color-gold)] after:transition-all after:duration-300 ${
                location === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
              } ${
                showTransparent
                  ? "text-white/90 hover:text-[var(--color-gold)]"
                  : "text-[var(--color-navy)] hover:text-[var(--color-gold)]"
              } ${location === link.href ? "text-[var(--color-gold)]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button + Language Toggle + Theme Toggle - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded transition-all duration-200 ${
              showTransparent
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-[var(--color-navy)]/70 hover:text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5"
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-heading font-medium rounded transition-all duration-200 ${
              showTransparent
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-[var(--color-navy)]/70 hover:text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5"
            }`}
            aria-label="Switch language"
          >
            <Globe size={14} />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>

          <Link
            href="/contact"
            onClick={() => trackBookConsultation('navbar_desktop')}
            className={`flex items-center gap-2 px-5 py-2.5 font-heading text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
              showTransparent
                ? "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-light)]"
                : "bg-[var(--color-navy)] text-[var(--color-cream)] hover:bg-[var(--color-navy-light)]"
            }`}
          >
            <Phone size={14} />
            <span>{t.nav.bookConsultation}</span>
          </Link>
        </div>

        {/* Mobile: Theme + Language Toggle + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors ${
              showTransparent ? 'text-white/80' : 'text-[var(--color-navy)]/70'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={toggleLang}
            className={`p-2 text-xs font-heading font-medium transition-colors ${
              showTransparent ? 'text-white/80' : 'text-[var(--color-navy)]/70'
            }`}
            aria-label="Switch language"
          >
            <Globe size={20} />
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`p-2.5 transition-colors ${showTransparent ? 'text-white' : 'text-[var(--color-navy)]'}`}
            aria-label={isMobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-[oklch(0.98_0.005_90)] z-[60] transition-all duration-300 ease-out ${
          isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Close button inside overlay */}
        <div className="flex items-center justify-between px-4 lg:px-8" style={{ height: '72px' }}>
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={LOGO_DARK}
              alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
              className="w-auto object-contain"
              style={{ height: '46px', maxWidth: '220px' }}
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
        <div className="flex flex-col" style={{ height: 'calc(100% - 72px)' }}>
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${isRTL ? 'text-right' : 'text-left'} text-lg font-heading font-medium transition-colors py-4 border-b border-[var(--color-border)]/50 ${
                    location === link.href
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-navy)] active:text-[var(--color-gold)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <a
                href="tel:+966505149800"
                onClick={() => trackPhoneClick('navbar_mobile')}
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
              href="/contact"
              onClick={() => trackBookConsultation('navbar_mobile')}
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
