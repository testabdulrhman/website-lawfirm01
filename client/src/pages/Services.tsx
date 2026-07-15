import { Briefcase, Gavel, Users, Building, Scale, FileCheck, BookOpen, Shield, Landmark, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useScrollAnimation, getStaggerStyle, getFadeStyle } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";
import { useMemo } from "react";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";

const serviceIcons = [Briefcase, Users, Gavel, Shield, Building, Scale, Landmark, BookOpen, FileCheck];

export default function Services() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  const seoSchema = useMemo(() => [schemas.breadcrumb([{ name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' }, { name: lang === 'ar' ? 'خدماتنا' : 'Services', url: '/services' }])], [lang]);
  useSEO({
    title: lang === 'ar' ? 'خدماتنا القانونية' : 'Our Legal Services',
    description: lang === 'ar'
      ? 'خدمات قانونية متكاملة: قضايا تجارية، جنائية، عقارية، إفلاس، توثيق، تحكيم، واستشارات قانونية. شركة عبدالرحمن رضوان المشيقح للمحاماة.'
      : 'Comprehensive legal services: commercial, criminal, real estate, bankruptcy, notarization, arbitration, and legal consultation. Abdulrahman Redwan Al-Mushaiqi Law Firm.',
    keywords: lang === 'ar'
      ? 'خدمات قانونية، قضايا تجارية، قضايا جنائية، إفلاس، توثيق، تحكيم تجاري، محامي بريدة'
      : 'legal services, commercial cases, criminal cases, bankruptcy, notarization, arbitration, lawyer Buraydah',
    canonical: '/services',
    schema: seoSchema,
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.nav.services}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
            {lang === "ar" ? "خدماتنا القانونية" : "Our Legal Services"}
          </h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {t.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={headerRef}
            className="mb-10 md:mb-16 transition-all duration-700 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-navy)]">
              {lang === "ar" ? (
                <>جميع الخدمات <span className="text-[var(--color-gold)]">({t.services.items.length} خدمات)</span></>
              ) : (
                <>All Services <span className="text-[var(--color-gold)]">({t.services.items.length} services)</span></>
              )}
            </h2>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Briefcase;
              return (
                <Link
                  key={service.slug}
                  href={lp(`/services/${service.slug}`)}
                  className="group p-5 md:p-8 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
                  style={getStaggerStyle(gridVisible, idx, 70)}
                >
                  <div className="flex items-start gap-4 md:block">
                    <div className="w-11 h-11 md:w-14 md:h-14 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0 md:mb-6 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                      <Icon size={20} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-1.5 md:mb-3">
                        {service.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 mb-2 md:mb-4 leading-relaxed">
                        {service.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 font-heading text-xs font-semibold text-[var(--color-gold)] group-hover:gap-3 transition-all">
                        <span>{lang === "ar" ? "التفاصيل" : "Details"}</span>
                        <ArrowIcon size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
