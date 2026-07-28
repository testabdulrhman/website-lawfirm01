/**
 * صفحة فهرس إجراءات الإفلاس السبعة — بطاقات تربط بكل صفحة فرعية مخصّصة.
 * الهوية البصرية: كحلي (--color-navy) + ذهبي (--color-gold)، خط Playfair Display.
 * RTL أساسي، مع مخطط BreadcrumbList + ItemList و microdata.
 */
import { Link } from "wouter";
import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { Scale, ArrowLeft, ArrowRight } from "lucide-react";
import { bankruptcyProcedures } from "@/data/bankruptcyProcedures";
import { bankruptcyProceduresEn } from "@/data/bankruptcyProceduresEn";
import { localePath } from "@/lib/localePath";

const BASE_URL = "https://redwan.sa";

export default function BankruptcyProcedures() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const isEnglish = lang === "en";
  const procedures = isEnglish ? bankruptcyProceduresEn : bankruptcyProcedures;
  const copy = isEnglish
    ? {
        bankruptcy: "Bankruptcy",
        procedures: "Bankruptcy Procedures",
        title: "What Are the Seven Procedures Under the Saudi Bankruptcy Law?",
        intro:
          "The Saudi Bankruptcy Law provides seven principal procedures. Each guide explains the procedure, its purpose, who may use it, the main stages and common questions.",
        sectionTitle: "The Seven Procedures",
        smallDebtors: "Small debtors",
        general: "General procedure",
        read: "Read the guide",
        seoDescription:
          "A practical English guide to the seven procedures under the Saudi Bankruptcy Law, including preventive settlement, financial reorganization and liquidation.",
        keywords:
          "Saudi bankruptcy procedures, Saudi Bankruptcy Law, preventive settlement, financial reorganization, liquidation",
      }
    : {
        bankruptcy: "الإفلاس والتصفية",
        procedures: "إجراءات الإفلاس",
        title: "ما هي إجراءات الإفلاس السبعة في النظام السعودي؟",
        intro:
          "يتضمّن نظام الإفلاس السعودي سبعة إجراءات رئيسية. اخترنا لك لكل إجراء صفحة مفصّلة توضح تعريفه وهدفه ومن يحق له التقدم به وخطواته، مع إجابات على أبرز الأسئلة.",
        sectionTitle: "الإجراءات السبعة",
        smallDebtors: "صغار المدينين",
        general: "إجراء عام",
        read: "اقرأ التفاصيل",
        seoDescription:
          "دليل إجراءات الإفلاس في النظام السعودي: التسوية الوقائية، إعادة التنظيم المالي، التصفية، والتصفية الإدارية، مع صفحات مفصّلة لكل إجراء.",
        keywords:
          "إجراءات الإفلاس, نظام الإفلاس السعودي, التسوية الوقائية, إعادة التنظيم المالي, التصفية, التصفية الإدارية",
      };

  const seoSchema = useMemo(
    () => [
      schemas.breadcrumb([
        { name: isEnglish ? "Home" : "الرئيسية", url: lp("/") },
        { name: copy.bankruptcy, url: lp("/bankruptcy") },
        { name: copy.procedures, url: lp("/bankruptcy/procedures") },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": copy.title,
        "itemListElement": procedures.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": p.name,
          "url": `${BASE_URL}${lp(`/bankruptcy/procedures/${p.slug}`)}`,
        })),
      },
    ],
    [copy.bankruptcy, copy.procedures, copy.title, isEnglish, lp, procedures],
  );

  useSEO({
    title: copy.title,
    description: copy.seoDescription,
    keywords: copy.keywords,
    canonical: "/bankruptcy/procedures",
    schema: seoSchema,
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-14 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav className="flex flex-wrap items-center gap-2 mb-6 font-body text-xs text-white/50">
            <Link href={lp("/")} className="hover:text-[var(--color-gold)] transition-colors">{t.nav.home}</Link>
            <span>/</span>
            <Link href={lp("/bankruptcy")} className="hover:text-[var(--color-gold)] transition-colors">{copy.bankruptcy}</Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">{copy.procedures}</span>
          </nav>
          <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl leading-snug">
            {copy.title}
          </h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
            {copy.intro}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={headerRef}
            className="flex items-center gap-3 mb-8 md:mb-12 transition-all duration-700 ease-out"
            style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(24px)" }}
          >
            <Scale size={24} className="text-[var(--color-gold)]" />
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-navy)]">
              {copy.sectionTitle}
            </h2>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {procedures.map((p, idx) => (
              <Link
                key={p.slug}
                href={lp(`/bankruptcy/procedures/${p.slug}`)}
                className="group flex flex-col p-6 md:p-7 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={getStaggerStyle(gridVisible, idx, 70)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-navy)]/10 text-[var(--color-navy)] font-body text-xs rounded-full">
                    {p.isSmallDebtor ? copy.smallDebtors : copy.general}
                  </span>
                  <span className="font-display text-2xl font-bold text-[var(--color-gold)]/30">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold text-[var(--color-navy)] mb-2 leading-snug group-hover:text-[var(--color-gold)] transition-colors">
                  {p.questionTitle}
                </h3>
                <p className="font-body text-sm text-[var(--color-navy)]/65 leading-relaxed flex-1 mb-4">
                  {p.tldr}
                </p>
                <div className="flex items-center gap-2 text-[var(--color-gold)] font-heading text-sm font-semibold">
                  <span>{copy.read}</span>
                  <ArrowIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
