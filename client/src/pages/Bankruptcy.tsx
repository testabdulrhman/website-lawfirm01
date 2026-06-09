import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { Building2, FileText, Search, ArrowLeft, ArrowRight, Scale } from "lucide-react";
import { useSEO, schemas } from "@/hooks/useSEO";
import { useMemo } from "react";

const bankruptcyCases = [
  { slug: "ASHYAD-STEEL", nameAr: "شركة أشياد ستيل", nameEn: "ASHYAD STEEL Company", type: "تصفية", typeEn: "Liquidation" },
  { slug: "tajalriayaa", nameAr: "شركة تاج الرعاية الطبي", nameEn: "Taj Al-Riaya Medical Company", type: "تصفية", typeEn: "Liquidation" },
  { slug: "Planting-for-Contracting", nameAr: "شركة المزروعات للمقاولات", nameEn: "Planting for Contracting Company", type: "تصفية", typeEn: "Liquidation" },
  { slug: "Hassan-Misfer-Al-Zahrani", nameAr: "شركة حسن مسفر الزهراني وشركاه", nameEn: "Hassan Misfer Al-Zahrani & Partners", type: "تصفية", typeEn: "Liquidation" },
  { slug: "Al-Anjaz-Hotel-Village", nameAr: "شركة قرية الأنجاز الفندقية", nameEn: "Al-Anjaz Hotel Village Company", type: "تصفية", typeEn: "Liquidation" },
  { slug: "Arcon-Gulf-Contracting", nameAr: "شركة أركن الخليج للمقاولات", nameEn: "Arcon Gulf Contracting Co", type: "تصفية", typeEn: "Liquidation" },
];

export default function Bankruptcy() {
  const { t, lang, isRTL } = useTranslation();

  const seoSchema = useMemo(() => [schemas.breadcrumb([
    { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: lang === 'ar' ? 'الإفلاس' : 'Bankruptcy', url: '/bankruptcy' }
  ])], [lang]);

  useSEO({
    title: lang === 'ar' ? 'قسم الإفلاس والتصفية' : 'Bankruptcy & Liquidation',
    description: lang === 'ar'
      ? 'إدارة إجراءات الإفلاس والتصفية وإعادة التنظيم. تقديم مطالبات الدائنين وتتبع حالة المطالبات.'
      : 'Managing bankruptcy, liquidation, and reorganization proceedings. Submit creditor claims and track claim status.',
    keywords: lang === 'ar'
      ? 'إفلاس، تصفية، مطالبات دائنين، إعادة تنظيم، محامي إفلاس'
      : 'bankruptcy, liquidation, creditor claims, reorganization, bankruptcy lawyer',
    canonical: '/bankruptcy',
    schema: seoSchema,
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: casesRef, isVisible: casesVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: actionsRef, isVisible: actionsVisible } = useScrollAnimation();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">
              {t.nav.home}
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">
              {lang === "ar" ? "الإفلاس والتصفية" : "Bankruptcy & Liquidation"}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
            {lang === "ar" ? "قسم الإفلاس والتصفية" : "Bankruptcy & Liquidation"}
          </h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {lang === "ar"
              ? "نتولى إدارة إجراءات الإفلاس والتسوية الوقائية وإعادة التنظيم وفق نظام الإفلاس السعودي"
              : "We manage bankruptcy proceedings, preventive settlements, and reorganization under Saudi Bankruptcy Law"}
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 md:py-16 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={actionsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto"
          >
            <Link
              href="/bankruptcy/claims"
              className="group flex items-center gap-4 p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ opacity: actionsVisible ? 1 : 0, transform: actionsVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease-out" }}
            >
              <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                <FileText size={22} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-1">
                  {lang === "ar" ? "تقديم مطالبة" : "Submit a Claim"}
                </h3>
                <p className="font-body text-sm text-[var(--color-navy)]/60">
                  {lang === "ar" ? "تقديم مطالبة دائن جديدة" : "Submit a new creditor claim"}
                </p>
              </div>
              <ArrowIcon size={18} className="text-[var(--color-gold)] mr-auto group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/bankruptcy/track"
              className="group flex items-center gap-4 p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ opacity: actionsVisible ? 1 : 0, transform: actionsVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease-out 0.1s" }}
            >
              <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                <Search size={22} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-1">
                  {lang === "ar" ? "تتبع مطالبتي" : "Track My Claim"}
                </h3>
                <p className="font-body text-sm text-[var(--color-navy)]/60">
                  {lang === "ar" ? "متابعة حالة مطالبة مقدمة" : "Follow up on a submitted claim"}
                </p>
              </div>
              <ArrowIcon size={18} className="text-[var(--color-gold)] mr-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cases List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={headerRef}
            className="mb-10 md:mb-16 transition-all duration-700 ease-out"
            style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale size={24} className="text-[var(--color-gold)]" />
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-navy)]">
                {lang === "ar" ? "القضايا الجارية" : "Active Cases"}
              </h2>
            </div>
            <p className="font-body text-[var(--color-navy)]/60 max-w-2xl">
              {lang === "ar"
                ? "قضايا الإفلاس والتصفية التي نديرها حالياً. اضغط على أي قضية لمعرفة التفاصيل."
                : "Bankruptcy and liquidation cases we currently manage. Click any case for details."}
            </p>
          </div>

          <div ref={casesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {bankruptcyCases.map((c, idx) => (
              <Link
                key={c.slug}
                href={`/bankruptcy/${c.slug}`}
                className="group p-6 bg-[var(--color-cream)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={getStaggerStyle(casesVisible, idx, 80)}
              >
                <div className="w-11 h-11 bg-[var(--color-navy)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                  <Building2 size={20} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors" />
                </div>
                <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-2">
                  {lang === "ar" ? c.nameAr : c.nameEn}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs px-2 py-1 bg-[var(--color-navy)]/10 text-[var(--color-navy)] rounded">
                    {lang === "ar" ? c.type : c.typeEn}
                  </span>
                  <ArrowIcon size={14} className="text-[var(--color-gold)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
