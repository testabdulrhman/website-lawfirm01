import { MessageCircle, Linkedin, Instagram, Facebook } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { trackWhatsAppClick, trackPhoneClick, trackEmailClick } from "@/lib/analytics";
import { localePath } from "@/lib/localePath";
import { hidesContactPrompts } from "@/lib/contactPrompts";
import { FIRM_LEGAL_NAME_EN, FIRM_NAME_AR } from "@/lib/firmIdentity";

/**
 * A formal footer: the firm's mark and how to reach it, three short lists of links,
 * and the legal line. No icons, boxes or taglines.
 */
export default function Footer() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (path: string) => localePath(path, lang);
  const [location] = useLocation();
  // Homepage and careers pages: no floating WhatsApp button (see lib/contactPrompts)
  const hidePrompts = hidesContactPrompts(location);

  const L = lang === "ar"
    ? {
        identity: "هوية الشركة",
        firm: "الشركة", bankruptcy: "الإفلاس", knowledge: "المعرفة",
        team: "فريقنا", licenses: "التراخيص",
        bankruptcyHome: "إجراءات الإفلاس", proceedings: "الإجراءات القائمة",
        procedures: "أنواع إجراءات الإفلاس", reports: "التقارير الشهرية",
        dictionary: "المعجم القانوني", faq: "الأسئلة الشائعة", sitemap: "خريطة الموقع",
      }
    : lang === "ur"
      ? {
          identity: "ادارے کی شناخت",
          firm: "ادارہ", bankruptcy: "دیوالیہ", knowledge: "قانونی علم",
          team: "ہماری ٹیم", licenses: "لائسنس",
          bankruptcyHome: "دیوالیہ کی کارروائیاں", proceedings: "جاری کارروائیاں (عربی)",
          procedures: "دیوالیہ کے طریقہ کار", reports: "ماہانہ رپورٹس",
          dictionary: "قانونی لغت", faq: "عمومی سوالات", sitemap: "سائٹ میپ",
        }
      : {
          identity: "Firm identity",
          firm: "Firm", bankruptcy: "Bankruptcy", knowledge: "Knowledge",
          team: "Our Team", licenses: "Licenses",
          bankruptcyHome: "Bankruptcy Proceedings", proceedings: "Active Proceedings (Arabic)",
          procedures: "Bankruptcy Procedures", reports: "Monthly Reports (Arabic)",
          dictionary: "Legal Dictionary", faq: "FAQ", sitemap: "Sitemap",
        };

  const groups = [
    {
      title: L.firm,
      links: [
        { href: "/about", label: t.nav.about },
        { href: "/team", label: L.team },
        { href: "/licenses", label: L.licenses },
        { href: "/careers", label: t.nav.careers },
        { href: "/contact", label: t.nav.contact },
      ],
    },
    {
      title: L.bankruptcy,
      links: [
        { href: "/bankruptcy", label: L.bankruptcyHome },
        { href: "/bankruptcy/proceedings", label: L.proceedings },
        { href: "/bankruptcy/procedures", label: L.procedures },
        { href: "/bankruptcy/reports", label: L.reports },
      ],
    },
    {
      title: L.knowledge,
      links: [
        { href: "/blog", label: t.nav.blog },
        { href: "/legal-dictionary", label: L.dictionary },
        { href: "/faq", label: L.faq },
      ],
    },
  ];

  const socials = [
    { href: "https://x.com/redwanlegal", label: "X", icon: <span className="font-heading text-[13px] font-semibold leading-none">X</span> },
    { href: "https://www.linkedin.com/company/redwan-sa", label: "LinkedIn", icon: <Linkedin size={15} strokeWidth={1.6} /> },
    { href: "https://www.instagram.com/redwanlegal", label: "Instagram", icon: <Instagram size={15} strokeWidth={1.6} /> },
    { href: "https://www.facebook.com/redwanlegal", label: "Facebook", icon: <Facebook size={15} strokeWidth={1.6} /> },
    {
      href: "https://snapchat.com/@redwan.sa", label: "Snapchat",
      icon: (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
          <path d="M12.206 1c.97.004 3.799.207 5.13 3.183.448 1.003.34 2.71.253 4.083l-.004.06c-.01.158-.02.31-.029.456.07.04.184.083.354.083.252-.011.55-.094.882-.262a.93.93 0 0 1 .386-.08c.146 0 .295.027.422.082l.012.004c.357.127.59.382.596.65.007.342-.318.638-.965.892-.072.028-.16.057-.252.087-.338.107-.85.27-.988.595-.071.169-.043.39.085.658l.003.007c.044.103 1.103 2.524 3.46 2.914.184.03.317.195.307.385a.46.46 0 0 1-.036.153c-.124.29-.646.502-1.595.65-.097.015-.139.16-.19.347-.022.08-.044.162-.075.246-.037.105-.111.156-.24.156h-.014c-.093 0-.227-.018-.397-.055-.263-.057-.62-.114-1.065-.114-.247 0-.502.022-.76.066-.498.083-.927.39-1.423.745-.708.506-1.51 1.08-2.73 1.08-.053 0-.106-.002-.158-.005l-.124.003c-1.22 0-2.022-.574-2.73-1.08-.495-.354-.924-.661-1.422-.744a4.605 4.605 0 0 0-.76-.066c-.466 0-.835.072-1.066.114-.155.029-.288.054-.397.054-.183 0-.255-.111-.286-.205-.03-.084-.052-.167-.075-.247-.05-.187-.092-.331-.19-.346-.948-.148-1.47-.36-1.594-.65a.456.456 0 0 1-.036-.153c-.01-.19.123-.355.307-.385 2.356-.39 3.415-2.811 3.46-2.914l.002-.007c.128-.268.156-.49.085-.658-.138-.325-.65-.488-.988-.595-.092-.03-.18-.059-.252-.087-.647-.254-.972-.55-.965-.892.006-.268.24-.523.596-.65l.012-.004a1.21 1.21 0 0 1 .422-.082c.14 0 .27.027.386.08.332.168.63.251.882.262.17 0 .284-.043.354-.083-.009-.146-.019-.298-.029-.456l-.004-.06c-.087-1.373-.195-3.08.253-4.083C8.407 1.207 11.236 1.004 12.206 1z" />
        </svg>
      ),
    },
  ];

  const linkClass = "font-body text-[13px] leading-6 text-white/60 transition-colors hover:text-white";
  const fineClass = "font-body text-xs text-white/45 transition-colors hover:text-white";

  return (
    <>
      <footer className="border-t border-[var(--color-gold)]/25 bg-[var(--color-navy)] text-white">
        <div className="container mx-auto px-4 pb-24 pt-14 sm:pb-10 lg:px-8 lg:pt-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
            <section aria-label={L.identity}>
              <Link href={lp("/")} className="inline-block">
                <img
                  src="/images/logo-light-512.webp"
                  alt={FIRM_NAME_AR}
                  className="h-auto w-[180px] object-contain"
                  width={512}
                  height={156}
                  loading="lazy"
                />
              </Link>
              <address className="mt-8 space-y-1 font-body text-[13px] not-italic leading-6 text-white/55">
                <p>{t.footer.address}</p>
                <p>{t.footer.city}</p>
                <p className="pt-2">
                  <a href="tel:+966920032760" onClick={() => trackPhoneClick("footer")} className="transition-colors hover:text-white" dir="ltr">920032760</a>
                  <span className="mx-3 text-white/25" aria-hidden="true">|</span>
                  <a href="mailto:info@redwan.sa" onClick={() => trackEmailClick("footer")} className="transition-colors hover:text-white" dir="ltr">info@redwan.sa</a>
                </p>
              </address>
              <ul className="mt-6 flex items-center gap-5 text-white/45" aria-label="Social">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-6 items-center transition-colors hover:text-white">
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {groups.map((g) => (
                <nav key={g.title} aria-label={g.title}>
                  <h2 className="mb-4 font-body text-xs font-medium text-[var(--color-gold)]">{g.title}</h2>
                  <ul className="space-y-2">
                    {g.links.map((link) => (
                      <li key={link.href}>
                        <Link href={lp(link.href)} className={linkClass}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="font-body text-xs leading-6 text-white/45 lg:flex-1">© {new Date().getFullYear()} {t.footer.copyright}</p>
            <p lang="en" dir="ltr" className="w-fit shrink-0 whitespace-nowrap font-body text-[11px] leading-5 text-white/40 lg:order-last">
              {FIRM_LEGAL_NAME_EN}
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 whitespace-nowrap">
              <Link href={lp("/privacy")} className={fineClass}>{t.footer.privacy}</Link>
              <Link href={lp("/terms")} className={fineClass}>{t.footer.terms}</Link>
              <Link href={lp("/sitemap")} className={fineClass}>{L.sitemap}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* الرئيسية وصفحات التوظيف بلا زر واتساب عائم */}
      {!hidePrompts && (
        <a
          href="https://wa.me/966920032760?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9"
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
      )}
    </>
  );
}
