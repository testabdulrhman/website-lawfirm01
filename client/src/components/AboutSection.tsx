import { Scale, Shield, Award, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const values = [
  {
    icon: Scale,
    title: "العدالة",
    desc: "نسعى لتحقيق العدالة وحماية حقوق عملائنا",
  },
  {
    icon: Shield,
    title: "الاحتراف",
    desc: "التزام بأعلى معايير الأخلاقيات المهنية",
  },
  {
    icon: Award,
    title: "الموثوقية",
    desc: "تراخيص نظامية معتمدة من الجهات المختصة",
  },
  {
    icon: Globe,
    title: "الشمولية",
    desc: "حلول قانونية مبتكرة للأفراد والشركات",
  },
];

export default function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text Content */}
          <div
            ref={headerRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateX(0)" : "translateX(40px)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[var(--color-gold)]" />
              <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
                من نحن
              </span>
            </div>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight mb-8">
              خبرة قانونية راسخة
              <br />
              <span className="text-[var(--color-gold)]">تخدم مستقبلك</span>
            </h2>

            <div className="space-y-6">
              <p className="font-body text-base lg:text-lg text-[var(--color-navy)]/70 leading-relaxed">
                <span className="font-display text-4xl font-bold text-[var(--color-gold)] float-right ml-3 mt-1">ن</span>
                سعى في شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس إلى توفير حلول قانونية مبتكرة ومخصصة لاحتياجات العملاء، سواء كانوا أفرادًا أو شركات. كما نعمل على حماية حقوق عملائنا وتقديم النصح القانوني لضمان الامتثال للقوانين والتشريعات.
              </p>
              <p className="font-body text-base lg:text-lg text-[var(--color-navy)]/70 leading-relaxed">
                نعتمد في عملنا على مزيج من الخبرة القانونية العميقة، والالتزام بأعلى معايير الأخلاقيات المهنية لضمان تحقيق أفضل النتائج. يقدّم محامونا خدماتهم القانونية بموجب تراخيص نظامية معتمدة من الجهات المختصة، بما يعكس التزامنا بالاحتراف والموثوقية.
              </p>
            </div>

            {/* Accreditations */}
            <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
              <p className="font-heading text-xs tracking-[0.15em] text-[var(--color-navy)]/50 uppercase mb-4">
                معتمدون لدى
              </p>
              <div className="flex flex-wrap gap-4">
                {["وزارة العدل", "الهيئة السعودية للمحامين", "الهيئة العامة للعقار", "لجنة الإفلاس"].map((name) => (
                  <span
                    key={name}
                    className="px-4 py-2 bg-[var(--color-navy)]/5 font-heading text-xs text-[var(--color-navy)]/70 hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-navy)] transition-colors duration-300"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image + Values */}
          <div className="space-y-8">
            <div
              ref={imageRef}
              className="relative transition-all duration-700 ease-out"
              style={{
                opacity: imageVisible ? 1 : 0,
                transform: imageVisible ? "translateX(0) scale(1)" : "translateX(-30px) scale(0.97)",
                transitionDelay: "200ms",
              }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/office-interior-N7k4rwH57VbAYQc4FQvJAz.webp"
                alt="مكتب شركة رضوان للمحاماة"
                className="w-full h-[300px] lg:h-[380px] object-cover"
                loading="lazy"
                width={800}
                height={380}
              />
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[var(--color-gold)] flex items-center justify-center flex-col shadow-lg">
                <span className="font-display text-xl font-bold text-[var(--color-navy)]">4</span>
                <span className="font-body text-[10px] text-[var(--color-navy)]/80">تراخيص</span>
              </div>
            </div>

            {/* Values Grid */}
            <div ref={valuesRef} className="grid grid-cols-2 gap-4">
              {values.map((val, idx) => (
                <div
                  key={val.title}
                  className="p-5 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  style={{
                    opacity: valuesVisible ? 1 : 0,
                    transform: valuesVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDuration: "500ms",
                    transitionDelay: `${300 + idx * 100}ms`,
                  }}
                >
                  <val.icon size={24} className="text-[var(--color-gold)] mb-3" />
                  <h4 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-1">
                    {val.title}
                  </h4>
                  <p className="font-body text-xs text-[var(--color-navy)]/60 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
