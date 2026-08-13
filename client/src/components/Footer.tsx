import {
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { trackWhatsAppClick, trackPhoneClick, trackEmailClick } from "@/lib/analytics";
import { localePath } from "@/lib/localePath";
import { FIRM_NAME_AR, FIRM_NAME_EN } from "@/lib/firmIdentity";

export default function Footer() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (path: string) => localePath(path, lang);
  const serviceLinks = t.services.items.slice(0, 5);

  const labels = lang === "ar"
    ? {
        company: "الشركة",
        knowledge: "الإفلاس والمعرفة",
        reports: "التقارير الشهرية لإعلانات الإفلاس",
        procedures: "أنواع إجراءات الإفلاس",
        dictionary: "المعجم القانوني",
        bookEyebrow: "تحتاج إلى استشارة قانونية؟",
        bookTitle: "ابدأ بخطوة واضحة",
        bookCta: "احجز استشارة",
        sitemap: "خريطة الموقع",
      }
    : lang === "ur"
      ? {
          company: "ادارہ",
          knowledge: "دیوالیہ اور قانونی علم",
          reports: "ماہانہ دیوالیہ رپورٹس",
          procedures: "دیوالیہ کے طریقہ کار",
          dictionary: "قانونی لغت",
          bookEyebrow: "قانونی مشورہ درکار ہے؟",
          bookTitle: "واضح اگلا قدم اٹھائیں",
          bookCta: "مشاورت بک کریں",
          sitemap: "سائٹ میپ",
        }
      : {
          company: "Firm",
          knowledge: "Bankruptcy & Knowledge",
          reports: "Monthly Bankruptcy Reports",
          procedures: "Bankruptcy Procedures",
          dictionary: "Legal Dictionary",
          bookEyebrow: "Need legal advice?",
          bookTitle: "Take a clear next step",
          bookCta: "Book a consultation",
          sitemap: "Sitemap",
        };

  const firmLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/team", label: lang === "ar" ? "فريقنا" : lang === "ur" ? "ہماری ٹیم" : "Our Team" },
    { href: "/licenses", label: lang === "ar" ? "التراخيص" : lang === "ur" ? "لائسنس" : "Licenses" },
    { href: "/careers", label: t.nav.careers },
    { href: "/contact", label: t.nav.contact },
  ];

  const knowledgeLinks = [
    { href: "/bankruptcy", label: lang === "ar" ? "إجراءات الإفلاس" : lang === "ur" ? "دیوالیہ کی کارروائیاں" : "Bankruptcy Proceedings" },
    { href: "/bankruptcy/procedures", label: labels.procedures },
    { href: "/bankruptcy/reports", label: labels.reports },
    { href: "/blog", label: t.nav.blog },
    { href: "/legal-dictionary", label: labels.dictionary },
    { href: "/faq", label: lang === "ar" ? "الأسئلة الشائعة" : lang === "ur" ? "عمومی سوالات" : "FAQ" },
  ];

  const linkClass = "font-body text-sm leading-6 text-white/60 transition-colors hover:text-[var(--color-gold)]";
  const socialClass = "group flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-white/65 transition-colors hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]";

  return (
    <>
      <footer className="relative overflow-hidden border-t border-[var(--color-gold)]/30 bg-[var(--color-navy)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(184,134,63,0.10),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(255,255,255,0.035),transparent_28%)]" />

        <div className="container relative mx-auto px-4 pb-24 pt-8 sm:pb-8 lg:px-8 lg:py-9">
          <div className="grid gap-8 border-b border-white/10 pb-7 lg:grid-cols-[minmax(240px,0.9fr)_minmax(0,1.8fr)_minmax(280px,1fr)] lg:gap-10">
            <section aria-label={lang === "ar" ? "هوية الشركة" : lang === "ur" ? "ادارے کی شناخت" : "Firm identity"}>
              <Link href={lp("/")} className="inline-block">
                <img
                  src="/images/logo-light-512.webp"
                  alt={FIRM_NAME_AR}
                  className="h-auto w-[205px] object-contain"
                  width={512}
                  height={156}
                  loading="lazy"
                />
              </Link>
              <p className="mt-4 max-w-sm font-body text-sm leading-7 text-white/55">
                {t.footer.description}
              </p>
              <p lang="en" dir="ltr" className="mt-3 max-w-sm font-body text-[11px] leading-5 tracking-[0.01em] text-white/35">
                {FIRM_NAME_EN}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4 border-s-2 border-[var(--color-gold)] ps-4">
                <div>
                  <p className="font-body text-xs text-white/50">{labels.bookEyebrow}</p>
                  <p className="mt-1 font-heading text-sm font-semibold text-white">{labels.bookTitle}</p>
                </div>
                <Link
                  href={lp("/appointments")}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center bg-[var(--color-gold)] px-4 font-heading text-xs font-semibold text-[var(--color-navy)] transition-colors hover:bg-white"
                >
                  {labels.bookCta}
                </Link>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
            <nav aria-label={labels.company}>
              <h2 className="mb-4 border-s-2 border-[var(--color-gold)] ps-3 font-heading text-sm font-semibold text-white">
                {labels.company}
              </h2>
              <ul className="space-y-2">
                {firmLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={lp(link.href)} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t.footer.ourServices}>
              <h2 className="mb-4 border-s-2 border-[var(--color-gold)] ps-3 font-heading text-sm font-semibold text-white">
                {t.footer.ourServices}
              </h2>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.slug}>
                    <Link href={lp(`/services/${link.slug}`)} className={linkClass}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={labels.knowledge} className="col-span-2 md:col-span-1">
              <h2 className="mb-4 border-s-2 border-[var(--color-gold)] ps-3 font-heading text-sm font-semibold text-white">
                {labels.knowledge}
              </h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:block md:space-y-2">
                {knowledgeLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={lp(link.href)} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            </div>

            <section aria-labelledby="footer-contact-heading" className="self-start border border-white/10 bg-white/[0.035] p-5">
              <h2 id="footer-contact-heading" className="mb-4 border-s-2 border-[var(--color-gold)] ps-3 font-heading text-sm font-semibold text-white">
                {t.footer.contactUs}
              </h2>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                  <p className="font-body text-sm leading-6 text-white/60">{t.footer.address}<br />{t.footer.city}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1" dir="ltr">
                    <a href="tel:+966505149800" onClick={() => trackPhoneClick("footer")} className={linkClass}>0505149800</a>
                    <span className="text-white/20">|</span>
                    <a href="tel:+966920032760" onClick={() => trackPhoneClick("footer")} className={linkClass}>920032760</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                  <a href="mailto:info@redwan.sa" onClick={() => trackEmailClick("footer")} className={linkClass} dir="ltr">info@redwan.sa</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                  <p className="font-body text-sm leading-6 text-white/60">{t.footer.workHours}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a href="https://x.com/redwanlegal" target="_blank" rel="noopener noreferrer" aria-label="X" className={socialClass}>
                  <span className="font-heading text-xs font-semibold">X</span>
                </a>
                <a href="https://www.linkedin.com/company/redwan-sa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
                  <Linkedin size={16} />
                </a>
                <a href="https://www.instagram.com/redwanlegal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialClass}>
                  <Instagram size={16} />
                </a>
                <a href="https://www.facebook.com/redwanlegal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialClass}>
                  <Facebook size={16} />
                </a>
                <a href="https://snapchat.com/@redwan.sa" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className={socialClass}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M12.206 1c.97.004 3.799.207 5.13 3.183.448 1.003.34 2.71.253 4.083l-.004.06c-.01.158-.02.31-.029.456.07.04.184.083.354.083.252-.011.55-.094.882-.262a.93.93 0 0 1 .386-.08c.146 0 .295.027.422.082l.012.004c.357.127.59.382.596.65.007.342-.318.638-.965.892-.072.028-.16.057-.252.087-.338.107-.85.27-.988.595-.071.169-.043.39.085.658l.003.007c.044.103 1.103 2.524 3.46 2.914.184.03.317.195.307.385a.46.46 0 0 1-.036.153c-.124.29-.646.502-1.595.65-.097.015-.139.16-.19.347-.022.08-.044.162-.075.246-.037.105-.111.156-.24.156h-.014c-.093 0-.227-.018-.397-.055-.263-.057-.62-.114-1.065-.114-.247 0-.502.022-.76.066-.498.083-.927.39-1.423.745-.708.506-1.51 1.08-2.73 1.08-.053 0-.106-.002-.158-.005l-.124.003c-1.22 0-2.022-.574-2.73-1.08-.495-.354-.924-.661-1.422-.744a4.605 4.605 0 0 0-.76-.066c-.466 0-.835.072-1.066.114-.155.029-.288.054-.397.054-.183 0-.255-.111-.286-.205-.03-.084-.052-.167-.075-.247-.05-.187-.092-.331-.19-.346-.948-.148-1.47-.36-1.594-.65a.456.456 0 0 1-.036-.153c-.01-.19.123-.355.307-.385 2.356-.39 3.415-2.811 3.46-2.914l.002-.007c.128-.268.156-.49.085-.658-.138-.325-.65-.488-.988-.595-.092-.03-.18-.059-.252-.087-.647-.254-.972-.55-.965-.892.006-.268.24-.523.596-.65l.012-.004a1.21 1.21 0 0 1 .422-.082c.14 0 .27.027.386.08.332.168.63.251.882.262.17 0 .284-.043.354-.083-.009-.146-.019-.298-.029-.456l-.004-.06c-.087-1.373-.195-3.08.253-4.083C8.407 1.207 11.236 1.004 12.206 1z" />
                  </svg>
                </a>
              </div>
            </section>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center lg:flex-row lg:text-start">
            <p className="font-body text-xs leading-6 text-white/50">© {new Date().getFullYear()} {t.footer.copyright}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-end">
              <Link href={lp("/privacy")} className="font-body text-xs text-white/50 transition-colors hover:text-[var(--color-gold)]">{t.footer.privacy}</Link>
              <Link href={lp("/terms")} className="font-body text-xs text-white/50 transition-colors hover:text-[var(--color-gold)]">{t.footer.terms}</Link>
              <Link href={lp("/sitemap")} className="font-body text-xs text-white/50 transition-colors hover:text-[var(--color-gold)]">{labels.sitemap}</Link>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/966505149800?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("floating_button")}
        className={`group fixed bottom-5 ${isRTL ? "left-5" : "right-5"} z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95`}
        aria-label={t.footer.whatsapp}
      >
        <MessageCircle size={28} className="text-white" />
        <span className={`pointer-events-none absolute hidden whitespace-nowrap bg-white px-3 py-2 font-heading text-xs text-[var(--color-navy)] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 md:block ${isRTL ? "left-16" : "right-16"}`}>
          {t.footer.whatsapp}
        </span>
      </a>
    </>
  );
}
