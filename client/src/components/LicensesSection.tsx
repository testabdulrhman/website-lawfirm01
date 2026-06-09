import { FileCheck, Building, Landmark, Scale } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const licenses = [
  {
    icon: Landmark,
    title: "ممارسة أعمال المحاماة",
    number: "26/129",
    issuer: "وزارة العدل",
    membership: "عضوية الهيئة السعودية للمحامين رقم: (494216)",
    desc: "تقديم الخدمات المرتبطة بمزاولة أعمال المحاماة والتمثيل القانوني أمام جميع المحاكم.",
  },
  {
    icon: Building,
    title: "ممارسة أعمال التسجيل العيني",
    number: "2223002594",
    issuer: "الهيئة العامة للعقار",
    membership: "",
    desc: "تقديم الخدمات المرتبطة بمزاولة أعمال التسجيل العيني للعقار.",
  },
  {
    icon: FileCheck,
    title: "ممارسة أعمال التوثيق",
    number: "45/57029",
    issuer: "وزارة العدل",
    membership: "",
    desc: "مزاولة أعمال التوثيق الرسمي للعقود والمستندات القانونية.",
  },
  {
    icon: Scale,
    title: "ممارسة أعمال أمناء الإفلاس",
    number: "142147",
    issuer: "لجنة الإفلاس",
    membership: "",
    desc: "تقديم الخدمات المرتبطة بمزاولة أعمال أمناء الإفلاس وإعادة التنظيم المالي.",
  },
];

export default function LicensesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="licenses" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-[2px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "200ms" }}
            />
            <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
              تراخيصنا
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight">
              تراخيص <span className="text-[var(--color-gold)]">نظامية</span>
              <br />معتمدة
            </h2>
            <p className="font-body text-base lg:text-lg text-[var(--color-navy)]/60 leading-relaxed self-end">
              نفخر بحصولنا على تراخيص نظامية متعددة من الجهات المختصة في المملكة العربية السعودية، مما يعكس التزامنا بالاحتراف والموثوقية في تقديم خدماتنا القانونية.
            </p>
          </div>
        </div>

        {/* Licenses Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {licenses.map((license, idx) => (
            <div
              key={license.title}
              className="group p-8 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(25px)",
                transitionDuration: "500ms",
                transitionDelay: `${idx * 120}ms`,
              }}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                  <license.icon size={24} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-2">
                    {license.title}
                  </h4>
                  <p className="font-body text-sm text-[var(--color-navy)]/60 mb-3">
                    {license.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 text-xs font-heading text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
                      ترخيص رقم: {license.number}
                    </span>
                    <span className="px-3 py-1 text-xs font-heading text-[var(--color-navy)]/60 border border-[var(--color-border)]">
                      {license.issuer}
                    </span>
                  </div>
                  {license.membership && (
                    <p className="font-body text-xs text-[var(--color-gold)] mt-3">
                      {license.membership}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
