import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useCountUp, useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });

  const licensesCount = useCountUp(4, 1800, statsVisible);
  const fieldsCount = useCountUp(7, 2000, statsVisible);
  const servicesCount = useCountUp(12, 2200, statsVisible);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-law-firm.webp"
          alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
          style={{ transform: loaded ? "scale(1)" : "scale(1.1)" }}
          fetchPriority="high"
          width={1200}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[oklch(0.12_0.04_250/0.92)] via-[oklch(0.15_0.04_250/0.85)] to-[oklch(0.12_0.04_250/0.7)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24">
        <div className="max-w-3xl">
          {/* Decorative Line */}
          <div
            className="flex items-center gap-4 mb-8 transition-all duration-700 ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="w-16 h-[2px] bg-[var(--color-gold)]" />
            <span className="font-heading text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">
              بريدة، المملكة العربية السعودية
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms",
            }}
          >
            معك خطوة بخطوة
            <br />
            <span className="text-[var(--color-gold-light)]">نحو الحل القانوني</span>
            <br />
            الأمثل
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-lg lg:text-xl text-white/80 max-w-xl mb-10 leading-relaxed transition-all duration-700 ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "600ms",
            }}
          >
            منشأة قانونية تقدم خدمات التمثيل القانوني والاستشارات للعملاء في جميع المجالات القانونية، بتراخيص نظامية معتمدة من الجهات المختصة.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "800ms",
            }}
          >
            <button
              onClick={scrollToContact}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-base hover:bg-[var(--color-gold-light)] transition-all duration-200 active:scale-[0.97] hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.3)]"
            >
              <span>احصل على استشارة قانونية</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => {
                const el = document.querySelector("#services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-heading font-medium text-base hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-all duration-200"
            >
              <span>استكشف خدماتنا</span>
            </button>
          </div>

          {/* Stats with Counter Animation */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-8 lg:gap-16 mt-16 pt-8 border-t border-white/10 transition-all duration-700 ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "1000ms",
            }}
          >
            <div>
              <span className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-gold)]">
                {licensesCount}
              </span>
              <p className="font-body text-sm text-white/60 mt-1">تراخيص نظامية</p>
            </div>
            <div>
              <span className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-gold)]">
                {fieldsCount}+
              </span>
              <p className="font-body text-sm text-white/60 mt-1">مجالات قانونية</p>
            </div>
            <div>
              <span className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-gold)]">
                {servicesCount}
              </span>
              <p className="font-body text-sm text-white/60 mt-1">خدمة متخصصة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-8 bg-white/30" />
        <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
      </div>
    </section>
  );
}
