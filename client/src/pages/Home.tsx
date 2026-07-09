import { ArrowLeft, ArrowRight, Scale, FileCheck, Building, Landmark, Briefcase, Shield, Users, Gavel, BookOpen, Award, Calendar, Clock } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
import { Link } from "wouter";
import { useScrollAnimation, useParallax, getStaggerStyle, getFadeStyle } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { trackBookConsultation, trackPhoneClick } from "@/lib/analytics";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const serviceIcons = [Briefcase, Gavel, Building, Scale];

export default function Home() {
  const { t, lang, isRTL } = useTranslation();

  const seoSchema = useMemo(() => [schemas.localBusiness, schemas.organization], []);
  useSEO({
    fullTitle: true,
    title: lang === 'ar'
      ? 'شركة عبدالرحمن رضوان المشيقح للمحاماة'
      : 'Abdulrahman Redwan Al-Mushaiqi Law Firm',
    description: lang === 'ar'
      ? 'شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس - بريدة، القصيم. خبرة تتجاوز 20 عاماً في القضايا التجارية والجنائية والعقارية والإفلاس.'
      : 'Abdulrahman Redwan Al-Mushaiqi Law Firm - Buraydah, Qassim. Over 20 years of expertise in commercial, criminal, real estate litigation and bankruptcy management.',
    keywords: lang === 'ar'
      ? 'محاماة بريدة, إدارة إجراءات الإفلاس, استشارات قانونية, قضايا تجارية, نزاعات عقارية, تحكيم تجاري, محامي القصيم'
      : 'law firm Buraydah, bankruptcy management, legal consultation, commercial litigation, real estate disputes, commercial arbitration, Qassim lawyer',
    canonical: '/',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: licensesRef, isVisible: licensesVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: bankruptcyRef, isVisible: bankruptcyVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax(0.15);

  const featuredServices = [
    { icon: Briefcase, title: t.services.items[0].title, slug: t.services.items[0].slug },
    { icon: Gavel, title: t.services.items[2].title, slug: t.services.items[2].slug },
    { icon: Building, title: t.services.items[3].title, slug: t.services.items[3].slug },
    { icon: Scale, title: t.services.items[4].title, slug: t.services.items[4].slug },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const arrowHoverClass = isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0"
          style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
        >
          <img
            src="/manus-storage/hero-law-firm-new_fff82498_f3461932.webp"
            alt={lang === "ar" ? "مكتب محاماة" : "Law Office"}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[oklch(0.1_0.04_250/0.85)] via-[oklch(0.1_0.04_250/0.65)] to-[oklch(0.1_0.04_250/0.35)] md:from-[oklch(0.1_0.04_250/0.75)] md:via-[oklch(0.1_0.04_250/0.55)] md:to-[oklch(0.1_0.04_250/0.3)]" />
        </div>

        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className={`max-w-3xl mx-auto md:mx-0 ${isRTL ? 'md:mr-0 md:ml-auto lg:mr-12' : 'md:ml-0 md:mr-auto lg:ml-12'}`}>
            <div ref={heroRef}>
              {/* Location tag */}
              <div
                className="flex items-center gap-3 mb-6 md:mb-8 justify-center md:justify-start"
                style={getFadeStyle(heroVisible, isRTL ? "right" : "left", 0)}
              >
                <span className="font-heading text-xs md:text-sm tracking-[0.15em] text-[var(--color-gold)]">
                  {t.hero.location}
                </span>
                <div className="w-8 md:w-12 h-[1px] bg-[var(--color-gold)]" />
              </div>

              {/* Main heading with stagger */}
              <h1
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.3] md:leading-[1.2] mb-5 md:mb-6 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
                style={getFadeStyle(heroVisible, "up", 150)}
              >
                {t.hero.title1}
                <br />
                {t.hero.title2}
                <br />
                <span className="text-[var(--color-gold)]">{t.hero.title3}</span>
              </h1>

              {/* Description */}
              <p
                className={`font-body text-base md:text-lg text-white/70 max-w-xl mb-8 md:mb-10 leading-relaxed text-center ${isRTL ? 'md:text-right' : 'md:text-left'} mx-auto md:mx-0`}
                style={getFadeStyle(heroVisible, "up", 300)}
              >
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                style={getFadeStyle(heroVisible, "up", 450)}
              >
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-transparent border-2 border-white/20 text-white font-heading font-medium text-sm md:text-base hover:border-white/50 active:bg-white/10 transition-all duration-200"
                >
                  <span>{t.hero.exploreServices}</span>
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm md:text-base hover:bg-[var(--color-gold-light)] transition-all duration-200 active:scale-[0.97]"
                >
                  <span>{t.hero.getConsultation}</span>
                  <ArrowIcon size={18} className={`${arrowHoverClass} transition-transform duration-200`} />
                </Link>
              </div>
            </div>

            {/* Stats with stagger */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
              {[
                { end: 4, suffix: "", label: t.hero.licenses },
                { end: 7, suffix: "+", label: t.hero.legalAreas },
                { end: 12, suffix: "", label: t.hero.specializedServices },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center"
                  style={getFadeStyle(heroVisible, "up", 600 + idx * 100)}
                >
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-gold)]">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="font-body text-xs md:text-sm text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={aboutRef} className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text Content */}
            <div className={isRTL ? 'order-1' : 'order-1 lg:order-1'}>
              <div
                className="flex items-center gap-4 mb-5 md:mb-6"
                style={getFadeStyle(aboutVisible, isRTL ? "right" : "left", 0)}
              >
                <div
                  className="h-[2px] bg-[var(--color-gold)] transition-all duration-700"
                  style={{ width: aboutVisible ? "48px" : "0px", transitionDelay: "200ms" }}
                />
                <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
                  {t.aboutSection.label}
                </span>
              </div>

              <h2
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight mb-3 md:mb-4"
                style={getFadeStyle(aboutVisible, "up", 100)}
              >
                {t.aboutSection.subtitle}
              </h2>

              <p
                className="font-body text-sm md:text-base text-[var(--color-navy)]/70 leading-relaxed mb-6 md:mb-8 max-w-xl"
                style={getFadeStyle(aboutVisible, "up", 200)}
              >
                {t.aboutSection.description}
              </p>

              {/* Key highlights */}
              <div
                className="grid grid-cols-2 gap-4 mb-6 md:mb-8"
                style={getFadeStyle(aboutVisible, "up", 300)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <span className="font-display text-lg font-bold text-[var(--color-navy)] block">+20</span>
                    <span className="font-body text-[11px] text-[var(--color-navy)]/50">{t.hero.experience}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <Scale size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <span className="font-display text-lg font-bold text-[var(--color-navy)] block">4</span>
                    <span className="font-body text-[11px] text-[var(--color-navy)]/50">{t.hero.licenses}</span>
                  </div>
                </div>
              </div>

              <div style={getFadeStyle(aboutVisible, "up", 400)}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <span>{t.aboutSection.learnMore}</span>
                  <ArrowIcon size={16} className={`${arrowHoverClass} transition-transform`} />
                </Link>
              </div>
            </div>

            {/* Visual Element */}
            <div className={`relative ${isRTL ? 'order-2' : 'order-2 lg:order-2'}`} style={getFadeStyle(aboutVisible, isRTL ? "left" : "right", 200)}>
              <div className="relative">
                <img
                  src="/manus-storage/office-interior-new_ab211147.webp"
                  alt={lang === "ar" ? "مكتب شركة رضوان للمحاماة" : "Redwan Law Firm Office"}
                  className="w-full h-[280px] md:h-[380px] object-cover"
                  loading="lazy"
                />
                {/* Decorative accent */}
                <div className={`absolute -bottom-3 md:-bottom-5 ${isRTL ? '-right-3 md:-right-5' : '-left-3 md:-left-5'} w-full h-full border-2 border-[var(--color-gold)]/20 -z-10`} />
                {/* Year badge */}
                <div className={`absolute -bottom-4 ${isRTL ? '-left-4 md:-left-6' : '-right-4 md:-right-6'} w-20 h-20 md:w-24 md:h-24 bg-[var(--color-navy)] flex items-center justify-center`}>
                  <div className="text-center">
                    <span className="font-display text-lg md:text-xl font-bold text-[var(--color-gold)] block">2020</span>
                    <span className="font-body text-[9px] md:text-[10px] text-white/70">{lang === "ar" ? "سنة التأسيس" : "Est."}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={servicesRef}>
            <div style={getFadeStyle(servicesVisible, isRTL ? "right" : "left", 0)}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-[2px] bg-[var(--color-gold)] transition-all duration-700"
                  style={{ width: servicesVisible ? "48px" : "0px", transitionDelay: "200ms" }}
                />
                <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
                  {t.services.label}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-16">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight">
                  {lang === "ar" ? (
                    <>خدمات قانونية <span className="text-[var(--color-gold)]">متخصصة</span></>
                  ) : (
                    <><span className="text-[var(--color-gold)]">Specialized</span> Legal Services</>
                  )}
                </h2>
                <Link
                  href="/services"
                  className="group flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <span>{t.services.viewAll}</span>
                  <ArrowIcon size={16} className={`${arrowHoverClass} transition-transform`} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredServices.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative p-6 md:p-8 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] active:scale-[0.97] transition-all duration-300 overflow-hidden before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-[var(--color-gold)] before:scale-x-0 before:origin-right hover:before:scale-x-100 hover:before:origin-left before:transition-transform before:duration-500"
                style={getStaggerStyle(servicesVisible, idx, 100)}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[var(--color-navy)] flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                  <service.icon size={22} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-2 md:mb-3">
                  {service.title}
                </h3>
                <span className="font-body text-xs text-[var(--color-gold)] group-hover:underline">
                  {t.services.readMore} {isRTL ? "←" : "→"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bankruptcy Track Record */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-navy)] overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div ref={bankruptcyRef}>
            <div className="flex items-center gap-4 mb-6" style={getFadeStyle(bankruptcyVisible, isRTL ? "right" : "left", 0)}>
              <div
                className="h-[2px] bg-[var(--color-gold)] transition-all duration-700"
                style={{ width: bankruptcyVisible ? "48px" : "0px", transitionDelay: "200ms" }}
              />
              <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
                {t.bankruptcyRecord.label}
              </span>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-12 md:mb-16"
              style={getFadeStyle(bankruptcyVisible, "up", 100)}
            >
              {t.bankruptcyRecord.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-10 md:mb-14">
              {/* Claims Value */}
              <div
                className="border-t border-white/10 pt-8"
                style={getFadeStyle(bankruptcyVisible, "up", 200)}
              >
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-gold)]">
                    <CountUp end={500} suffix="+" />
                  </span>
                  <span className="font-heading text-base md:text-lg text-white/70">
                    {lang === "ar" ? "مليون" : "M"}
                  </span>
                  <span className="font-heading text-sm text-white/50">
                    {t.bankruptcyRecord.claimsValue}
                  </span>
                </div>
                <p className="font-body text-sm md:text-base text-white/50">
                  {t.bankruptcyRecord.claimsValueLabel}
                </p>
              </div>

              {/* Creditors Count */}
              <div
                className="border-t border-white/10 pt-8"
                style={getFadeStyle(bankruptcyVisible, "up", 350)}
              >
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-gold)]">
                    <CountUp end={500} suffix="+" />
                  </span>
                  <span className="font-heading text-base md:text-lg text-white/70">
                    {t.bankruptcyRecord.creditorsCount}
                  </span>
                </div>
                <p className="font-body text-sm md:text-base text-white/50">
                  {t.bankruptcyRecord.creditorsCountLabel}
                </p>
              </div>
            </div>

            <div style={getFadeStyle(bankruptcyVisible, "up", 500)}>
              <Link
                href="/services/bankruptcy"
                className="group inline-flex items-center gap-3 font-heading text-sm font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
              >
                <span>{t.bankruptcyRecord.cta}</span>
                <ArrowIcon size={16} className={`${arrowHoverClass} transition-transform`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses Brief with stagger */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={licensesRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {t.licenses.items.map((lic, idx) => (
              <div
                key={lic.number}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-5 border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                style={getStaggerStyle(licensesVisible, idx, 80)}
              >
                {[Landmark, Building, FileCheck, Scale][idx] && (
                  (() => {
                    const Icon = [Landmark, Building, FileCheck, Scale][idx];
                    return <Icon size={18} className="text-[var(--color-gold)] flex-shrink-0" />;
                  })()
                )}
                <div className="min-w-0">
                  <p className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] truncate">{lic.name}</p>
                  <p className="font-body text-[10px] md:text-xs text-[var(--color-navy)]/50 truncate" dir="ltr">{lic.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[var(--color-gold)]" />
            <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
              {lang === "ar" ? "المدونة القانونية" : "Legal Blog"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-14">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight">
              {lang === "ar" ? (
                <>آخر <span className="text-[var(--color-gold)]">المقالات</span> القانونية</>
              ) : (
                <>Latest <span className="text-[var(--color-gold)]">Legal</span> Articles</>
              )}
            </h2>
            <Link
              href="/blog"
              className="group flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
            >
              <span>{lang === "ar" ? "عرض جميع المقالات" : "View All Articles"}</span>
              <ArrowIcon size={16} className={`${arrowHoverClass} transition-transform`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.slice(0, 3).map((article, idx) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group relative bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--color-gold)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[var(--color-navy)]/5 text-[var(--color-navy)] font-heading text-[11px] font-semibold tracking-wide">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-base md:text-lg font-bold text-[var(--color-navy)] mb-3 line-clamp-2 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/60 mb-5 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[var(--color-navy)]/40 font-body text-xs">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/services-law-JMYuzYAraEJcBSCnrsZST3.webp"
            alt={lang === "ar" ? "استشارات قانونية متخصصة" : "Specialized legal consultation"}
            className="w-full h-full object-cover scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[oklch(0.12_0.04_250/0.9)]" />
        </div>

        <div
          ref={ctaRef}
          className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 text-center"
        >
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight mb-4 md:mb-6"
            style={getFadeStyle(ctaVisible, "up", 0)}
          >
            {lang === "ar" ? (
              <>هل تحتاج <span className="text-[var(--color-gold)]">استشارة قانونية</span>؟</>
            ) : (
              <>Need a <span className="text-[var(--color-gold)]">Legal Consultation</span>?</>
            )}
          </h2>
          <p
            className="font-body text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 md:mb-10"
            style={getFadeStyle(ctaVisible, "up", 150)}
          >
            {t.cta.subtitle}
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={getFadeStyle(ctaVisible, "up", 300)}
          >
            <Link
              href="/contact"
              onClick={() => trackBookConsultation('hero_section')}
              className="group flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm md:text-base hover:bg-[var(--color-gold-light)] hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.3)] transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center"
            >
              <span>{t.cta.contactUs}</span>
              <ArrowIcon size={18} className={`${arrowHoverClass} transition-transform duration-200`} />
            </Link>
            <a
              href="tel:+966505149800"
              onClick={() => trackPhoneClick('hero_section')}
              className="flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 border-2 border-white/30 text-white font-heading font-medium text-sm md:text-base hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <span dir="ltr">0505149800</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
