import { Landmark, Building, FileCheck, Scale, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import { useMemo } from "react";

const licensesData = {
  ar: [
    {
      slug: "law-practice",
      icon: Landmark,
      title: "ممارسة أعمال المحاماة",
      number: "26/129",
      issuer: "وزارة العدل",
      membership: "عضوية الهيئة السعودية للمحامين رقم: (494216)",
      status: "ساري",
      scope: "الترافع أمام جميع المحاكم والجهات شبه القضائية",
      description: "ترخيص ممارسة مهنة المحاماة الصادر من وزارة العدل يخوّل الشركة الترافع والتمثيل القانوني أمام جميع المحاكم بدرجاتها (ابتدائية، استئناف، عليا) والجهات شبه القضائية واللجان المتخصصة في المملكة العربية السعودية.",
    },
    {
      slug: "bankruptcy-trustee",
      icon: Scale,
      title: "ممارسة أعمال أمناء الإفلاس",
      number: "142147",
      issuer: "لجنة الإفلاس",
      membership: "",
      status: "ساري",
      scope: "إدارة إجراءات الإفلاس (تصفية، إعادة تنظيم، تسوية وقائية)",
      description: "ترخيص أمين إفلاس صادر من لجنة الإفلاس يخوّل الشركة إدارة إجراءات الإفلاس بأنواعها: التصفية، التصفية الإدارية، إعادة التنظيم، والتسوية الوقائية، بما يشمل إدارة أصول المدين وتوزيع الحصص على الدائنين.",
    },
    {
      slug: "notary-public",
      icon: FileCheck,
      title: "ممارسة أعمال التوثيق",
      number: "45/57029",
      issuer: "وزارة العدل",
      membership: "",
      status: "ساري",
      scope: "توثيق العقود والإقرارات والوكالات",
      description: "ترخيص موثّق معتمد يخوّل الشركة توثيق العقود والإقرارات والوكالات والتصديق على التوقيعات، مما يوفر على العملاء الحاجة لزيارة كتابات العدل.",
    },
    {
      slug: "real-estate-registration",
      icon: Building,
      title: "ممارسة أعمال التسجيل العيني",
      number: "2223002594",
      issuer: "الهيئة العامة للعقار",
      membership: "",
      status: "ساري",
      scope: "تسجيل الملكيات العقارية والتصرفات العينية",
      description: "ترخيص مسجّل عقاري معتمد يخوّل الشركة تقديم خدمات التسجيل العقاري والتوثيق العيني نيابة عن العملاء، بما يشمل نقل الملكيات وتسجيل التصرفات العقارية.",
    },
  ],
  en: [
    {
      slug: "law-practice",
      icon: Landmark,
      title: "Legal Practice License",
      number: "26/129",
      issuer: "Ministry of Justice",
      membership: "Saudi Bar Association Membership No: (494216)",
      status: "Active",
      scope: "Litigation before all courts and quasi-judicial bodies",
      description: "Legal practice license issued by the Ministry of Justice authorizing the firm to provide legal representation before all courts (first instance, appeal, supreme) and quasi-judicial bodies in the Kingdom of Saudi Arabia.",
    },
    {
      slug: "bankruptcy-trustee",
      icon: Scale,
      title: "Bankruptcy Trustee License",
      number: "142147",
      issuer: "Bankruptcy Commission",
      membership: "",
      status: "Active",
      scope: "Managing bankruptcy procedures (liquidation, reorganization, preventive settlement)",
      description: "Bankruptcy trustee license issued by the Bankruptcy Commission authorizing the firm to manage all types of bankruptcy procedures: liquidation, administrative liquidation, reorganization, and preventive settlement.",
    },
    {
      slug: "notary-public",
      icon: FileCheck,
      title: "Notarization License",
      number: "45/57029",
      issuer: "Ministry of Justice",
      membership: "",
      status: "Active",
      scope: "Notarization of contracts, declarations, and powers of attorney",
      description: "Licensed notary public authorized to notarize contracts, declarations, powers of attorney, and authenticate signatures, saving clients the need to visit notary offices.",
    },
    {
      slug: "real-estate-registration",
      icon: Building,
      title: "Real Estate Registration License",
      number: "2223002594",
      issuer: "General Authority for Real Estate",
      membership: "",
      status: "Active",
      scope: "Registration of real estate properties and transactions",
      description: "Licensed real estate registrar authorized to provide real estate registration and property documentation services on behalf of clients.",
    },
  ],
};

export default function Licenses() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  const seoSchema = useMemo(() => [
    schemas.breadcrumb([
      { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
      { name: lang === 'ar' ? 'التراخيص' : 'Licenses', url: '/licenses' },
    ]),
  ], [lang]);

  useSEO({
    title: lang === 'ar' ? 'التراخيص والاعتمادات المهنية' : 'Professional Licenses & Accreditations',
    description: lang === 'ar'
      ? 'شركة عبدالرحمن رضوان المشيقح للمحاماة حاصلة على أربعة تراخيص نظامية: المحاماة، أمانة الإفلاس، التوثيق، والتسجيل العقاري.'
      : 'Abdulrahman Redwan Al-Mushaiqi Law Firm holds four official licenses: Legal Practice, Bankruptcy Trustee, Notarization, and Real Estate Registration.',
    canonical: '/licenses',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: licensesRef, isVisible: licensesVisible } = useScrollAnimation({ threshold: 0.1 });

  const licenses = licensesData[lang === 'ar' ? 'ar' : 'en'];
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>
        <div ref={heroRef} className={`container relative z-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6 font-body" aria-label="Breadcrumb">
            <Link href={lp("/")} className="hover:text-[var(--color-gold)] transition-colors">
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Arrow className="w-3 h-3" />
            <span className="text-[var(--color-gold)]">
              {lang === 'ar' ? 'التراخيص' : 'Licenses'}
            </span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {lang === 'ar' ? 'التراخيص والاعتمادات المهنية' : 'Professional Licenses'}
          </h1>
          <p className="font-body text-base md:text-lg text-white/70 max-w-2xl">
            {lang === 'ar'
              ? 'أربعة تراخيص نظامية تؤهل الشركة لتقديم خدمات المحاماة وأمانة الإفلاس والتوثيق والتسجيل العقاري.'
              : 'Four official licenses qualifying the firm to provide legal practice, bankruptcy trustee, notarization, and real estate registration services.'}
          </p>
        </div>
      </section>

      {/* Licenses Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div ref={licensesRef} className="container">
          <div className="grid gap-8 md:gap-10">
            {licenses.map((license, index) => {
              const Icon = license.icon;
              return (
                <div
                  key={license.slug}
                  className={`group relative bg-gray-50 border border-gray-100 rounded-sm p-8 md:p-10 transition-all duration-500 hover:shadow-lg hover:border-[var(--color-gold)]/30 ${licensesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    {/* Icon & Title */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[var(--color-navy)] rounded-sm flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[var(--color-gold)]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-3">
                        {license.title}
                      </h2>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        <div className="bg-white rounded-sm p-3 border border-gray-100">
                          <span className="block text-xs text-gray-500 font-body mb-1">
                            {lang === 'ar' ? 'رقم الترخيص' : 'License No.'}
                          </span>
                          <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                            {license.number}
                          </span>
                        </div>
                        <div className="bg-white rounded-sm p-3 border border-gray-100">
                          <span className="block text-xs text-gray-500 font-body mb-1">
                            {lang === 'ar' ? 'الجهة المانحة' : 'Issuing Authority'}
                          </span>
                          <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                            {license.issuer}
                          </span>
                        </div>
                        <div className="bg-white rounded-sm p-3 border border-gray-100">
                          <span className="block text-xs text-gray-500 font-body mb-1">
                            {lang === 'ar' ? 'الحالة' : 'Status'}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-green-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            {license.status}
                          </span>
                        </div>
                        <div className="bg-white rounded-sm p-3 border border-gray-100">
                          <span className="block text-xs text-gray-500 font-body mb-1">
                            {lang === 'ar' ? 'النطاق' : 'Scope'}
                          </span>
                          <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                            {license.scope}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                        {license.description}
                      </p>

                      {/* Membership if exists */}
                      {license.membership && (
                        <p className="font-body text-xs text-[var(--color-gold)] font-medium">
                          {license.membership}
                        </p>
                      )}

                      {/* Link to detail page */}
                      <Link
                        href={lp(`/licenses/${license.slug}`)}
                        className="inline-flex items-center gap-2 mt-4 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors group/link"
                      >
                        {lang === 'ar' ? 'عرض التفاصيل الكاملة' : 'View Full Details'}
                        <Arrow className="w-4 h-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container text-center">
          <p className="font-body text-sm text-gray-500 mb-4">
            {lang === 'ar'
              ? 'جميع التراخيص صادرة من جهات حكومية رسمية ومتاحة للتحقق.'
              : 'All licenses are issued by official government authorities and available for verification.'}
          </p>
          <Link
            href={lp("/contact")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-navy)] text-white font-heading text-sm font-semibold rounded-sm hover:bg-[var(--color-navy-light)] transition-colors"
          >
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </>
  );
}
