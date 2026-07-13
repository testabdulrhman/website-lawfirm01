import { MessageCircle, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
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
                  src="/images/logo-light.webp"
                  alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
                  className="w-auto object-contain"
                  style={{ height: '50px', maxWidth: '200px' }}
                  width={200}
                  height={50}
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
                <li><Link href="/careers" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.careers}</Link></li>
                <li><Link href="/contact" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{t.nav.contact}</Link></li>
                <li><Link href="/faq" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
                <li><Link href="/cases-guide" className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">{lang === 'ar' ? 'دليل الدعاوى' : 'Cases Guide'}</Link></li>
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
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold)]" />
                  <p className="font-body text-sm text-white/50">
                    {t.footer.address}
                    <br />{t.footer.city}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-[var(--color-gold)]" />
                  <div className="flex items-center gap-2" dir="ltr">
                    <a href="tel:+966505149800" onClick={() => trackPhoneClick('footer')} className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">
                      0505149800
                    </a>
                    <span className="text-white/30">|</span>
                    <a href="tel:+966920032760" onClick={() => trackPhoneClick('footer')} className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors">
                      920032760
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-[var(--color-gold)]" />
                  <a href="mailto:info@redwan.sa" onClick={() => trackEmailClick('footer')} className="font-body text-sm text-white/50 hover:text-[var(--color-gold)] transition-colors" dir="ltr">
                    info@redwan.sa
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 text-[var(--color-gold)]" />
                  <p className="font-body text-sm text-white/50">
                    {t.footer.workHours}
                  </p>
                </div>
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
                <a
                  href="https://snapchat.com/@redwan.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Snapchat"
                  className="group w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#FFFC00] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,252,0,0.4)] active:scale-95"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white/70 transition-colors duration-300 group-hover:text-[#0F1B2D]" aria-hidden="true">
                    <path d="M12.206 1c.97.004 3.799.207 5.13 3.183.448 1.003.34 2.71.253 4.083l-.004.06c-.01.158-.02.31-.029.456.07.04.184.083.354.083.252-.011.55-.094.882-.262a.93.93 0 0 1 .386-.08c.146 0 .295.027.422.082l.012.004c.357.127.59.382.596.65.007.342-.318.638-.965.892-.072.028-.16.057-.252.087-.338.107-.85.27-.988.595-.071.169-.043.39.085.658l.003.007c.044.103 1.103 2.524 3.46 2.914.184.03.317.195.307.385a.46.46 0 0 1-.036.153c-.124.29-.646.502-1.595.65-.097.015-.139.16-.19.347-.022.08-.044.162-.075.246-.037.105-.111.156-.24.156h-.014c-.093 0-.227-.018-.397-.055-.263-.057-.62-.114-1.065-.114-.247 0-.502.022-.76.066-.498.083-.927.39-1.423.745-.708.506-1.51 1.08-2.73 1.08-.053 0-.106-.002-.158-.005l-.124.003c-1.22 0-2.022-.574-2.73-1.08-.495-.354-.924-.661-1.422-.744a4.605 4.605 0 0 0-.76-.066c-.466 0-.835.072-1.066.114-.155.029-.288.054-.397.054-.183 0-.255-.111-.286-.205-.03-.084-.052-.167-.075-.247-.05-.187-.092-.331-.19-.346-.948-.148-1.47-.36-1.594-.65a.456.456 0 0 1-.036-.153c-.01-.19.123-.355.307-.385 2.356-.39 3.415-2.811 3.46-2.914l.002-.007c.128-.268.156-.49.085-.658-.138-.325-.65-.488-.988-.595-.092-.03-.18-.059-.252-.087-.647-.254-.972-.55-.965-.892.006-.268.24-.523.596-.65l.012-.004a1.21 1.21 0 0 1 .422-.082c.14 0 .27.027.386.08.332.168.63.251.882.262.17 0 .284-.043.354-.083-.009-.146-.019-.298-.029-.456l-.004-.06c-.087-1.373-.195-3.08.253-4.083C8.407 1.207 11.236 1.004 12.206 1z"/>
                  </svg>
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
