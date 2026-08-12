import { useTranslation } from "@/hooks/useTranslation";
import { getStaggerStyle, useScrollAnimation } from "@/hooks/useScrollAnimation";

const clients = [
  {
    nameAr: "شركة الوسائل الصناعية",
    nameEn: "Alwasail Industrial Company",
    detailAr: "القطاع الصناعي — شركة مدرجة في السوق السعودي",
    detailEn: "Industrial sector — Saudi-listed company",
    logo: "/images/clients/alwasail.webp",
    width: 258,
    height: 75,
  },
  {
    nameAr: "جامعة المستقبل",
    nameEn: "Mustaqbal University",
    detailAr: "قطاع التعليم",
    detailEn: "Education sector",
    logo: "/images/clients/future-university.webp",
    width: 570,
    height: 127,
  },
  {
    nameAr: "شركة الصقعوب التجارية",
    nameEn: "Alsaqoub Trading Company",
    detailAr: "قطاع التجارة والتجزئة",
    detailEn: "Trading and retail sector",
    logo: "/images/clients/alsaqoub.webp",
    width: 500,
    height: 108,
  },
  {
    nameAr: "شركة الأهرام لصناعة البلاستيك",
    nameEn: "Al-Ahram Plastics Manufacturing Company",
    detailAr: "القطاع الصناعي — قطر ومصر",
    detailEn: "Industrial sector — Qatar and Egypt",
    logo: "/images/clients/ahram-plastic.webp",
    width: 465,
    height: 75,
  },
];

export default function ClientsSection() {
  const { lang } = useTranslation();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });
  const isArabic = lang === "ar";

  return (
    <section className="py-16 md:py-20 bg-[var(--color-cream)]" aria-labelledby="clients-title">
      <div className="container mx-auto px-5 md:px-4 lg:px-8">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-[2px] w-12 bg-[var(--color-gold)]" />
          <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
            {isArabic ? "الثقة المهنية" : "Professional Trust"}
          </span>
        </div>
        <div className="max-w-3xl mb-9 md:mb-12">
          <h2 id="clients-title" className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] mb-3">
            {isArabic ? "عملاء نفخر بخدمتهم" : "Clients We Are Proud to Serve"}
          </h2>
          <p className="font-body text-sm md:text-base text-[var(--color-navy)]/60 leading-relaxed">
            {isArabic
              ? "جهات من قطاعات متعددة وثقت بخدمات شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس."
              : "Organizations across multiple sectors have trusted the services of Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management."}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {clients.map((client, index) => (
            <article
              key={client.nameEn}
              className="group min-h-[180px] md:min-h-[210px] bg-white border border-[var(--color-border)] p-4 md:p-6 flex flex-col items-center justify-between text-center hover:border-[var(--color-gold)]/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={getStaggerStyle(isVisible, index, 90)}
            >
              <div className="h-20 md:h-24 w-full flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={isArabic ? `شعار ${client.nameAr}` : `${client.nameEn} logo`}
                  width={client.width}
                  height={client.height}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-16 md:max-h-20 w-auto h-auto object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="pt-4 border-t border-[var(--color-border)] w-full">
                <h3 className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] leading-relaxed">
                  {isArabic ? client.nameAr : client.nameEn}
                </h3>
                <p className="font-body text-[10px] md:text-xs text-[var(--color-navy)]/50 mt-1 leading-relaxed">
                  {isArabic ? client.detailAr : client.detailEn}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
