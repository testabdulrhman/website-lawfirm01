import { MessageCircle, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { trackWhatsAppClick, trackPhoneClick, trackEmailClick } from "@/lib/analytics";

export default function Footer() {
  const { t, lang, isRTL } = useTranslation();

  const serviceLinks = t.services.items.slice(0, 6);

  return (
    <>
      {/* Footer */}
      <footer className="bg-[var(--color-navy)] py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Mobile: Stack vertically, Desktop: 4-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <img
                  src="/manus-storage/logo-light-colored_6fe124cd.webp"
                  alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
                  className="w-auto object-contain"
                  style={{ height: '50px', maxWidth: '200px' }}
                />
              </Link>
              <p className="font-body text-sm text-white/50 leading-relaxed max-w-[280px]">
                {t.footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.home}</Link></li>
                <li><Link href="/about" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.about}</Link></li>
                <li><Link href="/services" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.services}</Link></li>
                <li><Link href="/blog" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.blog}</Link></li>
                <li><Link href="/contact" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.contact}</Link></li>
                <li><Link href="/faq" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-4">{t.footer.ourServices}</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.slug}>
                    <Link href={`/services/${link.slug}`} className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-4">{t.footer.contactUs}</h4>
              <div className="space-y-3">
                <p className="font-body text-sm text-white/50">
                  {t.footer.address}
                  <br />{t.footer.city}
                </p>
                <div className="flex items-center gap-2" dir="ltr">
                  <a href="tel:+966505149800" onClick={() => trackPhoneClick('footer')} className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">
                    0505149800
                  </a>
                  <span className="text-white/30">|</span>
                  <a href="tel:+966920032760" onClick={() => trackPhoneClick('footer')} className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">
                    920032760
                  </a>
                </div>
                <a href="mailto:info@redwan.sa" onClick={() => trackEmailClick('footer')} className="block font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">
                  info@redwan.sa
                </a>
                <p className="font-body text-sm text-white/50">
                  {t.footer.workHours}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://x.com/redwan_law"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <span className="text-white/70 text-sm font-heading transition-colors duration-300 group-hover:text-[#0F1B2D]">X</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/redwan-sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#0A66C2] hover:scale-110 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] active:scale-95"
                >
                  <Linkedin size={18} className="text-white/70 transition-colors duration-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
            <p className="font-body text-xs text-white/30 leading-relaxed">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <Link href="/privacy" className="font-body text-xs text-white/30 hover:text-[var(--color-gold)] transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="font-body text-xs text-white/30 hover:text-[var(--color-gold)] transition-colors">
                {t.footer.terms}
              </Link>
              <span className="font-body text-xs text-white/30">
                {lang === "ar" ? "ترخيص محاماة رقم: 26/129" : "License No: 26/129"}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/966505149800?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        className={`fixed bottom-5 ${isRTL ? 'left-5' : 'right-5'} z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 group`}
        aria-label={t.footer.whatsapp}
      >
        <MessageCircle size={28} className="text-white" />
        <span className={`hidden md:block absolute ${isRTL ? 'left-16' : 'right-16'} bg-white text-[var(--color-navy)] font-heading text-xs px-3 py-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none`}>
          {t.footer.whatsapp}
        </span>
      </a>
    </>
  );
}
