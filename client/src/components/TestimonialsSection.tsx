import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote: "تعاملت مع شركة رضوان في قضية تجارية معقدة، وكانت النتيجة ممتازة. احترافية عالية ومتابعة مستمرة حتى إغلاق الملف.",
    name: "م. خالد العتيبي",
    title: "رجل أعمال",
  },
  {
    quote: "استشرت المكتب في قضية عقارية وكانت الاستشارة شاملة ودقيقة. أنصح بالتعامل معهم لأي شخص يبحث عن محامٍ موثوق.",
    name: "أ. نورة السليمان",
    title: "سيدة أعمال",
  },
  {
    quote: "خدمة التوثيق كانت سريعة واحترافية. فريق العمل متعاون جداً ويوضح كل التفاصيل القانونية بشكل مبسط.",
    name: "عبدالعزيز المطيري",
    title: "مستثمر",
  },
];

export default function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <pattern id="geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="200" height="200" fill="url(#geo)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="h-[2px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "200ms" }}
            />
            <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
              آراء عملائنا
            </span>
            <div
              className="h-[2px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "200ms" }}
            />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight">
            ثقة عملائنا <span className="text-[var(--color-gold)]">أعظم إنجازاتنا</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 bg-[var(--color-cream)] border border-[var(--color-border)] relative hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(30px)",
                transitionDuration: "500ms",
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <Quote size={32} className="text-[var(--color-gold)]/20 mb-4" />
              <p className="font-body text-sm lg:text-base text-[var(--color-navy)]/70 leading-relaxed mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm font-bold text-[var(--color-gold)]">
                    {t.name.charAt(t.name.indexOf(" ") + 1)}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                    {t.name}
                  </h4>
                  <p className="font-body text-xs text-[var(--color-navy)]/50 mt-1">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
