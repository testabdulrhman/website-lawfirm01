import { Phone, ArrowLeft } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackBookConsultation, trackPhoneClick } from "@/lib/analytics";

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/services-law-JMYuzYAraEJcBSCnrsZST3.webp"
          alt=""
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-[oklch(0.12_0.04_250/0.9)]" />
      </div>

      <div
        ref={ref}
        className="container mx-auto px-4 lg:px-8 relative z-10 text-center transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
          معك خطوة بخطوة نحو <span className="text-[var(--color-gold)]">الحل القانوني</span> الأمثل
        </h2>
        <p className="font-body text-lg text-white/70 max-w-2xl mx-auto mb-10">
          لا تتردد في التواصل معنا. فريقنا جاهز لتقديم الدعم القانوني الذي تحتاجه بتراخيص نظامية معتمدة.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              trackBookConsultation('cta_section');
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-base hover:bg-[var(--color-gold-light)] hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.3)] transition-all duration-200 active:scale-[0.97]"
          >
            <span>تواصل معنا الآن</span>
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
          </button>
          <a
            href="tel:+966505149800"
            onClick={() => trackPhoneClick('cta_section')}
            className="flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-heading font-medium text-base hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-all duration-200"
          >
            <Phone size={16} />
            <span dir="ltr">0505149800</span>
          </a>
        </div>
      </div>
    </section>
  );
}
