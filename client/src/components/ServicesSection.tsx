import { Building2, Users, FileText, Gavel, Landmark, Briefcase, Scale, BookOpen, ArrowLeft } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Building2,
    title: "القضايا المدنية والتجارية",
    desc: "تمثيل قانوني متكامل في القضايا المدنية والتجارية أمام جميع المحاكم والجهات المختصة.",
  },
  {
    icon: Users,
    title: "قضايا العمل والعمال",
    desc: "استشارات وتمثيل قانوني في نزاعات العمل وعقود التوظيف والتسويات العمالية.",
  },
  {
    icon: Gavel,
    title: "القضايا الجنائية",
    desc: "دفاع قانوني احترافي في القضايا الجنائية بمختلف أنواعها وتصنيفاتها.",
  },
  {
    icon: Users,
    title: "الأحوال الشخصية",
    desc: "معالجة قضايا الأسرة والأحوال الشخصية بسرية تامة واحترافية عالية.",
  },
  {
    icon: Landmark,
    title: "النزاعات العقارية",
    desc: "حل النزاعات العقارية وصياغة العقود ومراجعتها وتقديم الاستشارات العقارية.",
  },
  {
    icon: FileText,
    title: "الإفلاس والتصفية",
    desc: "خدمات متخصصة في إجراءات الإفلاس والتصفية وإعادة التنظيم المالي.",
  },
  {
    icon: Scale,
    title: "التحكيم",
    desc: "نتولّى مهام التحكيم بصفة محكمٍ محايد ومستقل، ونفصل في النزاعات التجارية والمدنية وفق نظام التحكيم.",
  },
  {
    icon: Briefcase,
    title: "التقاضي",
    desc: "نلتزم بتقديم استراتيجيات مصممة خصيصًا وتمثيل فعال لتحقيق نتائج إيجابية في النزاعات القانونية.",
  },
  {
    icon: BookOpen,
    title: "الاستشارات القانونية",
    desc: "تقديم النصح والإرشاد القانوني المتخصص لضمان الامتثال للأنظمة والتشريعات.",
  },
];

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="py-24 lg:py-32 bg-[var(--color-navy)]">
      <div className="container mx-auto px-4 lg:px-8">
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
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "300ms" }}
            />
            <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
              مجالات الممارسة
            </span>
            <div
              className="h-[2px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "300ms" }}
            />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white leading-tight">
            خدمات قانونية <span className="text-[var(--color-gold)]">شاملة</span> تواكب تطلعاتك
          </h2>
          <p className="font-body text-base text-white/60 mt-4 max-w-2xl mx-auto">
            يقدّم محامونا خدماتهم القانونية بموجب تراخيص نظامية معتمدة من الجهات المختصة، بما يعكس التزامنا بالاحتراف والموثوقية
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group p-8 bg-white/5 border border-white/10 hover:border-[var(--color-gold)]/40 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.1)] transition-all duration-300"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(30px)",
                transitionDuration: "500ms",
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-gold)]/10 mb-5 group-hover:bg-[var(--color-gold)]/20 transition-colors duration-300">
                <service.icon size={24} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
                {service.desc}
              </p>
              <button className="flex items-center gap-2 text-sm font-heading text-[var(--color-gold)] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <span>المزيد</span>
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
