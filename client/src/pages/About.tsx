import { Shield, Target, Eye, Landmark, Building, FileCheck, Scale, Award, Clock, Lock, Users, User } from "lucide-react";
import { useScrollAnimation, getStaggerStyle, getFadeStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useMemo } from "react";
import { useSEO, schemas } from "@/hooks/useSEO";

const valueIcons = [Shield, Users, Clock, Lock];

const licensesData = {
  ar: [
    { icon: Landmark, title: "ممارسة أعمال المحاماة", number: "26/129", issuer: "وزارة العدل", membership: "عضوية الهيئة السعودية للمحامين رقم: (494216)", desc: "تقديم الخدمات المرتبطة بمزاولة أعمال المحاماة والتمثيل القانوني أمام جميع المحاكم." },
    { icon: Building, title: "ممارسة أعمال التسجيل العيني", number: "2223002594", issuer: "الهيئة العامة للعقار", membership: "", desc: "تقديم الخدمات المرتبطة بمزاولة أعمال التسجيل العيني للعقار." },
    { icon: FileCheck, title: "ممارسة أعمال التوثيق", number: "45/57029", issuer: "وزارة العدل", membership: "", desc: "مزاولة أعمال التوثيق الرسمي للعقود والمستندات القانونية." },
    { icon: Scale, title: "ممارسة أعمال أمناء الإفلاس", number: "142147", issuer: "لجنة الإفلاس", membership: "", desc: "تقديم الخدمات المرتبطة بمزاولة أعمال أمناء الإفلاس وإعادة التنظيم المالي." },
  ],
  en: [
    { icon: Landmark, title: "Legal Practice", number: "26/129", issuer: "Ministry of Justice", membership: "Saudi Bar Association Membership No: (494216)", desc: "Providing legal representation and litigation services before all courts." },
    { icon: Building, title: "Real Estate Registration", number: "2223002594", issuer: "General Authority for Real Estate", membership: "", desc: "Providing real estate registration and documentation services." },
    { icon: FileCheck, title: "Notarization", number: "45/57029", issuer: "Ministry of Justice", membership: "", desc: "Official notarization of contracts and legal documents." },
    { icon: Scale, title: "Bankruptcy Trustees", number: "142147", issuer: "Bankruptcy Commission", membership: "", desc: "Providing bankruptcy trustee services and financial reorganization." },
  ],
};

export default function About() {
  const { t, lang, isRTL } = useTranslation();

  const seoSchema = useMemo(() => [schemas.localBusiness, schemas.breadcrumb([{ name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' }, { name: lang === 'ar' ? 'من نحن' : 'About', url: '/about' }])], [lang]);
  useSEO({
    title: lang === 'ar' ? 'من نحن - نبذة عن الشركة' : 'About Us - Our Story',
    description: lang === 'ar'
      ? 'تعرف على شركة عبدالرحمن رضوان المشيقح للمحاماة - خبرة عائلية راسخة تتجاوز 20 عاماً في القانون. رؤيتنا، قيمنا، وتراخيصنا النظامية.'
      : 'Learn about Abdulrahman Redwan Al-Mushaiqi Law Firm - A family legacy of over 20 years in law. Our vision, values, and official licenses.',
    keywords: lang === 'ar'
      ? 'من نحن، شركة محاماة بريدة، تراخيص محاماة، خبرة قانونية، القصيم'
      : 'about us, law firm Buraydah, legal licenses, legal expertise, Qassim',
    canonical: '/about',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: licensesRef, isVisible: licensesVisible } = useScrollAnimation({ threshold: 0.1 });

  const licenses = licensesData[lang];

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/office-interior.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          ref={heroRef}
          className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.nav.about}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">{t.about.title}</h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[var(--color-gold)]" />
                <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">
                  {lang === "ar" ? "قصتنا" : "Our Story"}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight mb-5 md:mb-6">
                {lang === "ar" ? (
                  <>منشأة قانونية <span className="text-[var(--color-gold)]">موثوقة</span></>
                ) : (
                  <>A <span className="text-[var(--color-gold)]">Trusted</span> Legal Firm</>
                )}
              </h2>
              <div className="space-y-4 font-body text-sm md:text-base text-[var(--color-navy)]/70 leading-relaxed">
                {lang === "ar" ? (
                  <>
                    <p>شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس هي منشأة قانونية متخصصة تقدم خدمات التمثيل القانوني والاستشارات للعملاء في جميع المجالات القانونية.</p>
                    <p>لم تبدأ رحلتنا القانونية اليوم — بل هي امتداد لخبرة عائلية متراكمة تتجاوز 20 عاماً في التقاضي والممارسة القانونية، صُقلت عبر أجيال وتوّجت بتأسيس شركتنا لتقديم خدمات قانونية بعمق معرفي استثنائي.</p>
                    <p>يقع مقرنا في مدينة بريدة بمنطقة القصيم، ونخدم عملاءنا في جميع أنحاء المملكة من خلال فريق عمل متخصص ومؤهل.</p>
                  </>
                ) : (
                  <>
                    <p>Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Management is a specialized legal firm providing legal representation and consultation services to clients across all legal fields.</p>
                    <p>Our legal journey did not begin today — it is an extension of a family legacy spanning over 20 years in litigation and legal practice, refined across generations and culminating in the establishment of our firm to deliver legal services with exceptional depth of knowledge.</p>
                    <p>Headquartered in Buraydah, Al-Qassim Region, we serve clients throughout the Kingdom of Saudi Arabia through a specialized and qualified team.</p>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/office-interior.webp"
                alt={lang === "ar" ? "مكتب شركة رضوان" : "Redwan Law Office"}
                className="w-full h-[280px] md:h-[400px] object-cover"
                loading="lazy"
              />
              <div className={`absolute -bottom-4 ${isRTL ? '-right-4 md:-right-6' : '-left-4 md:-left-6'} -bottom-4 md:-bottom-6 w-24 h-24 md:w-32 md:h-32 bg-[var(--color-gold)] flex items-center justify-center`}>
                <div className="text-center">
                  <span className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] block">+20</span>
                  <span className="font-body text-[10px] md:text-xs text-[var(--color-navy)]">{t.hero.experience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={valuesRef}
            className="text-center mb-10 md:mb-16 transition-all duration-700 ease-out"
            style={{
              opacity: valuesVisible ? 1 : 0,
              transform: valuesVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] bg-[var(--color-gold)]" style={{ width: valuesVisible ? "48px" : "0px", transitionDuration: "700ms", transitionDelay: "200ms" }} />
              <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">{t.about.values}</span>
              <div className="h-[2px] bg-[var(--color-gold)]" style={{ width: valuesVisible ? "48px" : "0px", transitionDuration: "700ms", transitionDelay: "200ms" }} />
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold text-[var(--color-navy)]">
              {lang === "ar" ? (
                <>القيم التي <span className="text-[var(--color-gold)]">نؤمن بها</span></>
              ) : (
                <>The Values We <span className="text-[var(--color-gold)]">Believe In</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {t.about.valuesItems.map((value, idx) => {
              const Icon = valueIcons[idx];
              return (
                <div
                  key={idx}
                  className="p-5 md:p-8 bg-[var(--color-cream)] border border-[var(--color-border)] text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  style={getStaggerStyle(valuesVisible, idx, 100)}
                >
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-[var(--color-navy)] flex items-center justify-center mx-auto mb-3 md:mb-5">
                    <Icon size={20} className="text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-heading text-sm md:text-base font-semibold text-[var(--color-navy)] mb-1 md:mb-2">{value.title}</h3>
                  <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-12 md:py-16 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-1">
                {t.about.teamLabel}
              </h3>
              <p className="font-body text-sm text-[var(--color-navy)]/60">
                {t.about.teamSubtitle}
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-navy)] text-white font-heading text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300"
            >
              {lang === "ar" ? "تعرّف على فريقنا" : "Meet Our Team"}
            </Link>
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={licensesRef}
            className="mb-10 md:mb-16 transition-all duration-700 ease-out"
            style={{
              opacity: licensesVisible ? 1 : 0,
              transform: licensesVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] bg-[var(--color-gold)]" style={{ width: licensesVisible ? "48px" : "0px", transitionDuration: "700ms" }} />
              <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">
                {lang === "ar" ? "تراخيصنا" : "Our Licenses"}
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold text-[var(--color-navy)]">
              {lang === "ar" ? (
                <>تراخيص <span className="text-[var(--color-gold)]">نظامية</span> معتمدة</>
              ) : (
                <>Officially <span className="text-[var(--color-gold)]">Licensed</span> Credentials</>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {licenses.map((license, idx) => (
              <div
                key={license.number}
                className="group p-5 md:p-8 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={getStaggerStyle(licensesVisible, idx, 120)}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                    <license.icon size={20} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm md:text-lg font-semibold text-[var(--color-navy)] mb-1.5 md:mb-2">{license.title}</h4>
                    <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 mb-3 leading-relaxed">{license.desc}</p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <span className="px-2.5 py-1 text-[10px] md:text-xs font-heading text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
                        {lang === "ar" ? "ترخيص رقم:" : "License No:"} {license.number}
                      </span>
                      <span className="px-2.5 py-1 text-[10px] md:text-xs font-heading text-[var(--color-navy)]/60 border border-[var(--color-border)]">
                        {license.issuer}
                      </span>
                    </div>
                    {license.membership && (
                      <p className="font-body text-[10px] md:text-xs text-[var(--color-gold)] mt-2 md:mt-3">{license.membership}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
