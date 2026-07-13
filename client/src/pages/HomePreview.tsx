import { ArrowLeft, Briefcase, Gavel, Building, Scale, FileCheck, Landmark, Users, Shield, BookOpen, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Link } from "wouter";
import { useScrollAnimation, useParallax, getStaggerStyle, getFadeStyle } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef } from "react";
import { blogArticles } from "@/data/blogArticles";

function CountUp({ end, suffix = "", startFrom = 0 }: { end: number; suffix?: string; startFrom?: number }) {
  const [count, setCount] = useState(startFrom);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const range = end - startFrom;
    const totalFrames = 40;
    const step = Math.max(1, Math.ceil(range / totalFrames));
    let current = startFrom;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, end, startFrom]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const allServices = [
  { icon: Briefcase, title: "القضايا المدنية والتجارية", slug: "civil-commercial", desc: "تمثيل قانوني شامل في النزاعات المدنية والتجارية أمام المحاكم" },
  { icon: Users, title: "قضايا العمل والعمال", slug: "labor", desc: "حماية حقوق العمال وأصحاب العمل وفق نظام العمل السعودي" },
  { icon: Gavel, title: "القضايا الجنائية", slug: "criminal", desc: "الدفاع والترافع في القضايا الجزائية بجميع أنواعها" },
  { icon: Building, title: "النزاعات العقارية", slug: "real-estate", desc: "حل النزاعات العقارية وإثبات الملكية والتعويضات" },
  { icon: Scale, title: "الإفلاس والتصفية", slug: "bankruptcy", desc: "إدارة إجراءات الإفلاس والتسوية الوقائية وإعادة التنظيم" },
  { icon: BookOpen, title: "الاستشارات القانونية", slug: "consultation", desc: "استشارات قانونية متخصصة للأفراد والشركات" },
  { icon: Shield, title: "التحكيم التجاري", slug: "arbitration", desc: "تسوية النزاعات عبر التحكيم المحلي والدولي" },
  { icon: FileCheck, title: "التوثيق والعقود", slug: "documentation", desc: "صياغة ومراجعة العقود والاتفاقيات القانونية" },
  { icon: Landmark, title: "القضايا الإدارية", slug: "administrative", desc: "الترافع أمام المحاكم الإدارية وديوان المظالم" },
];

export default function HomePreview() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: licensesRef, isVisible: licensesVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: newsRef, isVisible: newsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax(0.15);

  // Services carousel
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 3;
  const totalPages = Math.ceil(allServices.length / servicesPerPage);
  const visibleServices = allServices.slice(currentPage * servicesPerPage, (currentPage + 1) * servicesPerPage);

  return (
    <>
      {/* ===== SECTION 1: Hero (same as current) ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0"
          style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
        >
          <img
            src="/images/hero-law-firm.webp"
            alt="مكتب محاماة"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[oklch(0.1_0.04_250/0.85)] via-[oklch(0.1_0.04_250/0.65)] to-[oklch(0.1_0.04_250/0.35)] md:from-[oklch(0.1_0.04_250/0.75)] md:via-[oklch(0.1_0.04_250/0.55)] md:to-[oklch(0.1_0.04_250/0.3)]" />
        </div>

        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-3xl mx-auto md:mx-0 md:mr-0 md:ml-auto lg:mr-12">
            <div ref={heroRef}>
              <div
                className="flex items-center gap-3 mb-6 md:mb-8 justify-center md:justify-start"
                style={getFadeStyle(heroVisible, "right", 0)}
              >
                <span className="font-heading text-xs md:text-sm tracking-[0.15em] text-[var(--color-gold)]">
                  بريدة، المملكة العربية السعودية
                </span>
                <div className="w-8 md:w-12 h-[1px] bg-[var(--color-gold)]" />
              </div>

              <h1
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.3] md:leading-[1.2] mb-5 md:mb-6 text-center md:text-right"
                style={getFadeStyle(heroVisible, "up", 150)}
              >
                معك خطوة بخطوة
                <br />
                نحو الحل القانوني
                <br />
                <span className="text-[var(--color-gold)]">الأمثل</span>
              </h1>

              <p
                className="font-body text-base md:text-lg text-white/70 max-w-xl mb-8 md:mb-10 leading-relaxed text-center md:text-right mx-auto md:mx-0"
                style={getFadeStyle(heroVisible, "up", 300)}
              >
                منشأة قانونية تقدم خدمات التمثيل القانوني والاستشارات للعملاء في جميع المجالات القانونية، بتراخيص نظامية معتمدة من الجهات المختصة.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                style={getFadeStyle(heroVisible, "up", 450)}
              >
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-transparent border-2 border-white/20 text-white font-heading font-medium text-sm md:text-base hover:border-white/50 active:bg-white/10 transition-all duration-200"
                >
                  <span>استكشف خدماتنا</span>
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm md:text-base hover:bg-[var(--color-gold-light)] transition-all duration-200 active:scale-[0.97]"
                >
                  <span>احصل على استشارة قانونية</span>
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
              {[
                { end: 4, suffix: "", label: "تراخيص نظامية" },
                { end: 7, suffix: "+", label: "مجالات قانونية" },
                { end: 12, suffix: "", label: "خدمة متخصصة" },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
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

      {/* ===== SECTION 2: About Summary (NEW - inspired by "Since 1955") ===== */}
      <section className="py-20 md:py-28 lg:py-36 bg-white overflow-hidden">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Right side - Big number */}
            <div className="lg:col-span-4 text-center lg:text-right" style={getFadeStyle(aboutVisible, "right", 0)}>
              <div className="inline-block">
                <span className="font-display text-[120px] md:text-[160px] lg:text-[200px] font-bold text-[var(--color-navy)] leading-none block">
                  <CountUp end={2016} startFrom={2000} />
                </span>
                <div className="h-1 w-full bg-[var(--color-gold)] mt-2" />
                <p className="font-heading text-sm md:text-base text-[var(--color-navy)]/60 mt-3 tracking-wider">
                  سنة التأسيس
                </p>
              </div>
            </div>

            {/* Left side - Text */}
            <div className="lg:col-span-8" style={getFadeStyle(aboutVisible, "left", 200)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[var(--color-gold)]" />
                <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">من نحن</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight mb-6">
                شركة عبدالرحمن رضوان المشيقح
                <br />
                <span className="text-[var(--color-gold)]">للمحاماة وإدارة إجراءات الإفلاس</span>
              </h2>
              <p className="font-body text-base md:text-lg text-[var(--color-navy)]/70 leading-relaxed mb-8 max-w-2xl">
                منشأة قانونية متخصصة تقدم خدمات التمثيل القانوني والاستشارات للعملاء في جميع المجالات القانونية. نعمل بتراخيص نظامية معتمدة من الجهات المختصة، ونلتزم بأعلى معايير المهنية والاحترافية في خدمة عملائنا.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <span>اعرف المزيد عنا</span>
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Practice Areas with Carousel (NEW) ===== */}
      <section className="py-20 md:py-28 lg:py-36 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={servicesRef}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <div style={getFadeStyle(servicesVisible, "right", 0)}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[2px] bg-[var(--color-gold)]" />
                  <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">خدماتنا</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight">
                  مجالات الممارسة القانونية
                </h2>
                <p className="font-body text-base text-[var(--color-navy)]/60 mt-3">
                  نقدم خدمات قانونية متكاملة في {allServices.length} مجالات متخصصة
                </p>
              </div>

              <div className="flex items-center gap-4" style={getFadeStyle(servicesVisible, "left", 200)}>
                <span className="font-heading text-sm text-[var(--color-navy)]/50">
                  {currentPage + 1} من {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="w-10 h-10 border border-[var(--color-navy)]/20 flex items-center justify-center hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="w-10 h-10 border border-[var(--color-navy)]/20 flex items-center justify-center hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
                <Link
                  href="/services"
                  className="group flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <span>عرض الكل</span>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Services Grid with number indicator */}
            <div className="flex items-start gap-8 lg:gap-12">
              {/* Big number */}
              <div className="hidden lg:block" style={getFadeStyle(servicesVisible, "right", 100)}>
                <span className="font-display text-[100px] font-bold text-[var(--color-navy)]/10 leading-none">
                  {allServices.length}
                </span>
                <p className="font-heading text-xs text-[var(--color-navy)]/40 mt-2 tracking-wider">مجال ممارسة</p>
              </div>

              {/* Cards */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {visibleServices.map((service, idx) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group bg-white p-7 md:p-8 border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:-translate-y-2 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
                    style={getStaggerStyle(servicesVisible, idx, 120)}
                  >
                    <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                      <service.icon size={24} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors duration-300" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-3">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-navy)]/60 leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <div className="h-[2px] w-0 group-hover:w-12 bg-[var(--color-gold)] transition-all duration-500" />
                    <span className="inline-block mt-4 font-heading text-xs text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      اقرأ المزيد ←
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentPage ? "w-8 bg-[var(--color-gold)]" : "w-2 bg-[var(--color-navy)]/20 hover:bg-[var(--color-navy)]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: Licenses (NEW - dark bg with big numbers) ===== */}
      <section className="py-20 md:py-28 bg-[var(--color-navy)] relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 border border-white/20 rotate-45 translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/20 rotate-45 -translate-x-32 translate-y-32" />
        </div>

        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div ref={licensesRef}>
            {/* Header */}
            <div className="text-center mb-14 md:mb-20" style={getFadeStyle(licensesVisible, "up", 0)}>
              <span className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--color-gold)] leading-none">
                <CountUp end={4} />
              </span>
              <h2 className="font-heading text-lg md:text-xl text-white/80 mt-4 tracking-wider">
                تراخيص نظامية معتمدة
              </h2>
              <div className="w-16 h-[2px] bg-[var(--color-gold)] mx-auto mt-4" />
            </div>

            {/* License cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: Landmark, title: "المحاماة", num: "26/129", issuer: "وزارة العدل" },
                { icon: Building, title: "التسجيل العيني", num: "2223002594", issuer: "الهيئة العامة للعقار" },
                { icon: FileCheck, title: "التوثيق", num: "45/57029", issuer: "وزارة العدل" },
                { icon: Scale, title: "أمناء الإفلاس", num: "142147", issuer: "لجنة الإفلاس" },
              ].map((lic, idx) => (
                <div
                  key={lic.num}
                  className="group p-6 md:p-7 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[var(--color-gold)]/30 transition-all duration-300"
                  style={getStaggerStyle(licensesVisible, idx, 100)}
                >
                  <lic.icon size={28} className="text-[var(--color-gold)] mb-4" />
                  <h3 className="font-heading text-base font-semibold text-white mb-2">{lic.title}</h3>
                  <p className="font-body text-2xl font-bold text-[var(--color-gold)] mb-2" dir="ltr">#{lic.num}</p>
                  <p className="font-body text-xs text-white/40">{lic.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: Testimonials (Multiple) ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-bl from-[var(--color-cream)] to-[oklch(0.95_0.02_70)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={testimonialRef}>
            <div className="text-center mb-12 md:mb-16" style={getFadeStyle(testimonialVisible, "up", 0)}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[var(--color-gold)]" />
                <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">آراء العملاء</span>
                <div className="w-10 h-[2px] bg-[var(--color-gold)]" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight">
                ماذا يقول عملاؤنا
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { quote: "تعاملت مع شركة رضوان في قضية تجارية معقدة، وكانت النتيجة ممتازة. احترافية عالية ومتابعة مستمرة حتى إغلاق الملف.", name: "م. خالد العتيبي", title: "رجل أعمال" },
                { quote: "استشرت المكتب في قضية عقارية وكانت الاستشارة شاملة ودقيقة. أنصح بالتعامل معهم لأي شخص يبحث عن محامٍ موثوق.", name: "أ. نورة السليمان", title: "سيدة أعمال" },
                { quote: "خدمة التوثيق كانت سريعة واحترافية. فريق العمل متعاون جداً ويوضح كل التفاصيل القانونية بشكل مبسط.", name: "عبدالعزيز المطيري", title: "مستثمر" },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 md:p-8 border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:shadow-lg transition-all duration-300"
                  style={getStaggerStyle(testimonialVisible, idx, 150)}
                >
                  <Quote size={28} className="text-[var(--color-gold)]/40 mb-5" />
                  <blockquote className="font-body text-base text-[var(--color-navy)]/80 leading-relaxed mb-6">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                    <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center text-white font-heading text-sm font-bold">
                      {t.name.charAt(t.name.indexOf('.') > -1 ? t.name.indexOf('.') + 2 : 0)}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-[var(--color-navy)]">{t.name}</p>
                      <p className="font-body text-xs text-[var(--color-navy)]/50">{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-[var(--color-navy)]/40 mt-8 text-center italic">
              * شهادات مؤقتة — سيتم استبدالها بشهادات عملاء حقيقية
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: Latest Articles (NEW - inspired by "Recent News") ===== */}
      <section className="py-20 md:py-28 lg:py-36 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={newsRef}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <div style={getFadeStyle(newsVisible, "right", 0)}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[2px] bg-[var(--color-gold)]" />
                  <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">المدونة القانونية</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight">
                  آخر المقالات والأخبار
                </h2>
              </div>
              <Link
                href="/blog"
                className="group flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
                style={getFadeStyle(newsVisible, "left", 200)}
              >
                <span>عرض جميع المقالات</span>
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogArticles.slice(0, 3).map((article, idx) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block"
                  style={getStaggerStyle(newsVisible, idx, 150)}
                >
                  {/* Article image */}
                  <div className="aspect-[16/10] mb-5 overflow-hidden relative">
                    <img
                      src={[
                        'https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/blog-claims-suspension-9nNMxqiuLuTuGvxW3WD7Te.webp',
                        'https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/blog-preventive-settlement-B7fVP2qRvvWbZwjFZScWsp.webp',
                        'https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/blog-bankruptcy-guide-mamzmRd8rXjCftrzHDtKSP.webp',
                      ][idx]}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="font-heading text-xs text-[var(--color-gold)] bg-[var(--color-navy)]/80 px-2 py-1">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article content */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-xs text-[var(--color-navy)]/40">{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-navy)]/20" />
                    <span className="font-body text-xs text-[var(--color-navy)]/40">{article.readTime}</span>
                  </div>
                  <h3 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-300 leading-relaxed line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/60 mt-2 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: CTA (same concept, refined) ===== */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/services-law-JMYuzYAraEJcBSCnrsZST3.webp"
            alt=""
            className="w-full h-full object-cover scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[oklch(0.12_0.04_250/0.92)]" />
        </div>

        <div
          ref={ctaRef}
          className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 text-center"
        >
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight mb-4 md:mb-6"
            style={getFadeStyle(ctaVisible, "up", 0)}
          >
            هل تحتاج <span className="text-[var(--color-gold)]">استشارة قانونية</span>؟
          </h2>
          <p
            className="font-body text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 md:mb-10"
            style={getFadeStyle(ctaVisible, "up", 150)}
          >
            تواصل معنا اليوم ودعنا نساعدك في الوصول إلى الحل القانوني الأمثل بتراخيص نظامية معتمدة.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={getFadeStyle(ctaVisible, "up", 300)}
          >
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm md:text-base hover:bg-[var(--color-gold-light)] hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.3)] transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center"
            >
              <span>تواصل معنا الآن</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="tel:+966505149800"
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
