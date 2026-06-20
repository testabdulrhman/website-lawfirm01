import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { Helmet } from "react-helmet-async";

interface SitemapSection {
  title: string;
  links: { label: string; href: string }[];
}

export default function Sitemap() {
  const { lang, isRTL } = useTranslation();

  const sections: SitemapSection[] = lang === "ar" ? [
    {
      title: "الصفحات الرئيسية",
      links: [
        { label: "الرئيسية", href: "/" },
        { label: "من نحن", href: "/about" },
        { label: "فريقنا", href: "/team" },
        { label: "خدماتنا", href: "/services" },
        { label: "المدونة", href: "/blog" },
        { label: "تواصل معنا", href: "/contact" },
        { label: "انضم إلينا", href: "/careers" },
        { label: "الأسئلة الشائعة", href: "/faq" },
      ],
    },
    {
      title: "خدماتنا القانونية",
      links: [
        { label: "القضايا المدنية والتجارية", href: "/services/civil-commercial" },
        { label: "قضايا العمل والعمال", href: "/services/labor" },
        { label: "القضايا الجنائية", href: "/services/criminal" },
        { label: "النزاعات العقارية", href: "/services/real-estate" },
        { label: "الإفلاس والتصفية", href: "/services/bankruptcy" },
        { label: "الاستشارات القانونية", href: "/services/consultation" },
        { label: "القضايا الإدارية", href: "/services/administrative" },
        { label: "صياغة العقود", href: "/services/contracts" },
        { label: "التحكيم التجاري", href: "/services/arbitration" },
      ],
    },
    {
      title: "الإفلاس والتصفية",
      links: [
        { label: "خدمة الإفلاس والتصفية", href: "/services/bankruptcy" },
        { label: "شركة أشياد ستيل — ASHYAD STEEL (تصفية)", href: "/bankruptcy/ASHYAD-STEEL" },
        { label: "شركة تاج الرعاية الطبي — tajalriayaa (تصفية)", href: "/bankruptcy/tajalriayaa" },
        { label: "شركة المزروعات للمقاولات — Planting for Contracting (تصفية)", href: "/bankruptcy/Planting-for-Contracting" },
        { label: "شركة حسن مسفر الزهراني وشركاه (تصفية)", href: "/bankruptcy/Hassan-Misfer-Al-Zahrani" },
        { label: "شركة قرية الأنجاز الفندقية — Al-Anjaz Hotel Village (تصفية)", href: "/bankruptcy/Al-Anjaz-Hotel-Village" },
        { label: "شركة أركن الخليج للمقاولات — Arcon Gulf Contracting (تصفية)", href: "/bankruptcy/Arcon-Gulf-Contracting" },
        { label: "تقديم مطالبة دائنين", href: "/bankruptcy/claims" },
        { label: "إكمال بيانات المطالبة", href: "/bankruptcy/complete" },
      ],
    },
    {
      title: "المدونة",
      links: [
        { label: "جميع المقالات", href: "/blog" },
        { label: "إجراءات الإفلاس في النظام السعودي", href: "/blog/bankruptcy-procedures-saudi" },
        { label: "حقوق الدائنين في إجراءات التصفية", href: "/blog/creditor-rights-liquidation" },
        { label: "التسوية الوقائية: الحل قبل الإفلاس", href: "/blog/preventive-settlement" },
      ],
    },
    {
      title: "معلومات قانونية",
      links: [
        { label: "سياسة الخصوصية", href: "/privacy" },
        { label: "الشروط والأحكام", href: "/terms" },
      ],
    },
  ] : [
    {
      title: "Main Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Our Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
        { label: "Join Us", href: "/careers" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal Services",
      links: [
        { label: "Civil & Commercial Cases", href: "/services/civil-commercial" },
        { label: "Labor Cases", href: "/services/labor" },
        { label: "Criminal Cases", href: "/services/criminal" },
        { label: "Real Estate Disputes", href: "/services/real-estate" },
        { label: "Bankruptcy & Liquidation", href: "/services/bankruptcy" },
        { label: "Legal Consultation", href: "/services/consultation" },
        { label: "Administrative Cases", href: "/services/administrative" },
        { label: "Contract Drafting", href: "/services/contracts" },
        { label: "Commercial Arbitration", href: "/services/arbitration" },
      ],
    },
    {
      title: "Bankruptcy & Liquidation",
      links: [
        { label: "Bankruptcy & Liquidation Service", href: "/services/bankruptcy" },
        { label: "ASHYAD STEEL Company (Liquidation)", href: "/bankruptcy/ASHYAD-STEEL" },
        { label: "Submit Creditor Claim", href: "/bankruptcy/claims" },
        { label: "Complete Claim Data", href: "/bankruptcy/complete" },
      ],
    },
    {
      title: "Blog",
      links: [
        { label: "All Articles", href: "/blog" },
        { label: "Bankruptcy Procedures in Saudi Law", href: "/blog/bankruptcy-procedures-saudi" },
        { label: "Creditor Rights in Liquidation", href: "/blog/creditor-rights-liquidation" },
        { label: "Preventive Settlement: The Solution Before Bankruptcy", href: "/blog/preventive-settlement" },
      ],
    },
    {
      title: "Legal Information",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{lang === "ar" ? "خريطة الموقع | شركة عبدالرحمن رضوان المشيقح للمحاماة" : "Sitemap | Redwan Law Firm"}</title>
        <meta name="description" content={lang === "ar" ? "خريطة موقع شركة عبدالرحمن رضوان المشيقح للمحاماة - جميع الصفحات والخدمات" : "Sitemap of Redwan Law Firm - All pages and services"} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-[var(--color-navy)] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {lang === "ar" ? "خريطة الموقع" : "Sitemap"}
          </h1>
          <p className="font-body text-sm md:text-base text-white/60 mt-3">
            {lang === "ar" ? "جميع صفحات وأقسام الموقع" : "All pages and sections of the website"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {sections.map((section, idx) => (
              <div key={idx} className="min-w-0">
                <h2 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4 pb-3 border-b-2 border-[var(--color-gold)]">
                  {section.title}
                </h2>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className={`flex items-center gap-2 ${isRTL ? 'pr-0' : 'pl-0'}`}>
                      <span className="w-1.5 h-1.5 bg-[var(--color-gold)] flex-shrink-0" />
                      <Link
                        href={link.href}
                        className="font-body text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-gold)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
