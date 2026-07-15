import { useParams, Link } from "wouter";
import { ArrowLeft, ArrowRight, Building, FileText, Calendar, MapPin, Users, Phone, Scale } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";
import { trackPhoneClick } from "@/lib/analytics";
import { useSEO } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";

interface BankruptcyCaseData {
  slug: string;
  logo: string;
  ar: {
    companyName: string;
    companyNameEn: string;
    procedureType: string;
    status: string;
    court?: string;
    caseNumber?: string;
    summary: string;
    fullDescription: string;
    products?: string[];
    keyFacts: { label: string; value: string }[];
  };
  en: {
    companyName: string;
    companyNameEn: string;
    procedureType: string;
    status: string;
    court?: string;
    caseNumber?: string;
    summary: string;
    fullDescription: string;
    products?: string[];
    keyFacts: { label: string; value: string }[];
  };
}

const casesData: Record<string, BankruptcyCaseData> = {
  "ASHYAD-STEEL": {
    slug: "ASHYAD-STEEL",
    logo: "/images/asyad-steel-logo.png",
    ar: {
      companyName: "شركة أشياد ستيل",
      companyNameEn: "ASHYAD STEEL",
      procedureType: "تصفية",
      status: "جاري",
      summary: "شركة متخصصة في تجارة الحديد التجاري والصناعي، تأسست عام 1434هـ في الرياض. بدأت كمؤسسة فردية ثم تحولت إلى شركة ذات مسؤولية محدودة عام 1438هـ. تعمل في استيراد وتوزيع منتجات الحديد المتنوعة مع قاعدة عملاء واسعة وفريق من 20 موظفاً.",
      fullDescription: "استهلت الشركة نشاطها التجاري بتاريخ 19/5/1434هـ كفرع مؤسسة تحت اسم مؤسسة أشياد الجزيرة للتجارة، مركزها التجاري في مدينة الرياض لغاية التجارة في الحديد التجاري والصناعي من خلال الاستيراد وإعادة توزيع منتجاتها في المملكة العربية السعودية.\n\nجرى تحويل الكيان التجاري من مؤسسة إلى شركة شخص واحد ذات مسؤولية محدودة بتاريخ 26/10/1438هـ بمسمى شركة أشياد ستيل.\n\nبدأت الشركة نشاطها من خلال شراء بعض الأصناف من الحديد من الأسواق المحلية لإعادة بيعها في مدينة الرياض. وفي عام 1434هـ، استأجرت قطعة أرض في منطقة السلي لتكون مقر مكاتب ومستودعات الشركة.\n\nمع التوسع في قاعدة عملائها، بدأت الشركة في منتصف عام 1435هـ في استيراد الحديد التجاري والصناعي من دول الخليج العربي لتنويع مصادر ونوعية المنتجات.\n\nامتهنت الشركة تدريجياً منذ عام 1441هـ منهج التخصص وتبني النوع على حساب الكم، بالتركيز على أصناف محددة من الحديد التجاري والصناعي لتكون مرجعاً أساسياً لدى كافة مستخدمي ومصنعي الحديد.",
      products: [
        "لفائف الحديد المغلفنة",
        "لفائف الحديد المسحوبة على البارد",
        "لفائف الحديد المسحوبة على الساخن",
        "الجسور المعدنية",
        "مسطحات الحديد",
        "الزوايا والمجاري الحديدية",
        "لفائف وصفائح الألمنيوم",
      ],
      keyFacts: [
        { label: "تاريخ التأسيس", value: "19/5/1434هـ" },
        { label: "المقر الرئيسي", value: "الرياض - منطقة السلي" },
        { label: "النشاط", value: "تجارة الحديد التجاري والصناعي" },
        { label: "عدد الموظفين", value: "20 موظف" },
        { label: "نوع الإجراء", value: "تصفية" },
      ],
    },
    en: {
      companyName: "ASHYAD STEEL Company",
      companyNameEn: "ASHYAD STEEL",
      procedureType: "Liquidation",
      status: "Ongoing",
      summary: "A company specialized in commercial and industrial iron trading, established in 2013 in Riyadh. Started as a sole proprietorship then converted to a limited liability company in 2017. Operates in importing and distributing various iron products with a wide customer base and a team of 20 employees.",
      fullDescription: "The company commenced its commercial activity on 19/5/1434H as a branch establishment under the name of Asyad Al-Jazeera Trading Establishment, with its commercial center in Riyadh for the purpose of trading in commercial and industrial iron through import and redistribution of its products in the Kingdom of Saudi Arabia.\n\nThe commercial entity was converted from an establishment to a single-person limited liability company on 26/10/1438H under the name Asyad Steel Company.\n\nThe company started its activity by purchasing some types of iron from local markets for resale in Riyadh. In 1434H, the company leased a plot of land in the Sali area to serve as its offices and warehouses.\n\nWith the expansion of its customer base, the company began in mid-1435H importing commercial and industrial iron from Gulf countries to diversify sources and product quality.\n\nSince 1441H, the company gradually adopted a specialization approach, focusing on specific types of commercial and industrial iron to become a primary reference for all iron users and manufacturers.",
      products: [
        "Galvanized iron coils",
        "Cold-rolled iron coils",
        "Hot-rolled iron coils",
        "Steel beams",
        "Iron flat bars",
        "Iron angles and channels",
        "Aluminum coils and sheets",
      ],
      keyFacts: [
        { label: "Established", value: "2013 (1434H)" },
        { label: "Headquarters", value: "Riyadh - Sali District" },
        { label: "Activity", value: "Commercial & Industrial Iron Trading" },
        { label: "Employees", value: "20" },
        { label: "Procedure Type", value: "Liquidation" },
      ],
    },
  },
  "tajalriayaa": {
    slug: "tajalriayaa",
    logo: "",
    ar: {
      companyName: "شركة تاج الرعاية الطبي",
      companyNameEn: "tajalriayaa",
      procedureType: "تصفية",
      status: "جاري",
      summary: "شركة متخصصة في مجال الرعاية الطبية والخدمات الصحية.",
      fullDescription: "شركة تاج الرعاية الطبي هي منشأة متخصصة في تقديم خدمات الرعاية الطبية والصحية.",
      keyFacts: [
        { label: "السجل التجاري", value: "2511025005" },
        { label: "الرقم الموحد", value: "7009419503" },
        { label: "رقم القضية", value: "451002463" },
        { label: "نوع الإجراء", value: "تصفية" },
      ],
    },
    en: {
      companyName: "Taj Al-Riaya Medical Company",
      companyNameEn: "tajalriayaa",
      procedureType: "Liquidation",
      status: "Ongoing",
      summary: "A company specialized in medical care and health services.",
      fullDescription: "Taj Al-Riaya Medical Company is an establishment specialized in providing medical and health care services.",
      keyFacts: [
        { label: "Commercial Registration", value: "2511025005" },
        { label: "Unified Number", value: "7009419503" },
        { label: "Case Number", value: "451002463" },
        { label: "Procedure Type", value: "Liquidation" },
      ],
    },
  },
  "Planting-for-Contracting": {
    slug: "Planting-for-Contracting",
    logo: "",
    ar: {
      companyName: "شركة المزروعات للمقاولات",
      companyNameEn: "Planting for Contracting",
      procedureType: "تصفية",
      status: "جاري",
      court: "المحكمة التجارية بالرياض",
      caseNumber: "471007543",
      summary: "شركة متخصصة في أعمال المقاولات والبناء.",
      fullDescription: "شركة المزروعات للمقاولات هي منشأة متخصصة في تقديم خدمات المقاولات وأعمال البناء والتشييد.",
      keyFacts: [
        { label: "السجل التجاري", value: "1010638616" },
        { label: "الرقم الموحد", value: "7017311106" },
        { label: "رقم القضية", value: "471007543" },
        { label: "المحكمة", value: "المحكمة التجارية بالرياض" },
        { label: "نوع الإجراء", value: "تصفية" },
      ],
    },
    en: {
      companyName: "Planting for Contracting Company",
      companyNameEn: "Planting for Contracting",
      procedureType: "Liquidation",
      status: "Ongoing",
      court: "Commercial Court in Riyadh",
      caseNumber: "471007543",
      summary: "A company specialized in contracting and construction.",
      fullDescription: "Planting for Contracting Company is an establishment specialized in providing contracting, construction, and building services.",
      keyFacts: [
        { label: "Commercial Registration", value: "1010638616" },
        { label: "Unified Number", value: "7017311106" },
        { label: "Case Number", value: "471007543" },
        { label: "Court", value: "Commercial Court in Riyadh" },
        { label: "Procedure Type", value: "Liquidation" },
      ],
    },
  },
  "Hassan-Misfer-Al-Zahrani": {
    slug: "Hassan-Misfer-Al-Zahrani",
    logo: "",
    ar: {
      companyName: "شركة حسن مسفر الزهراني وشركاه",
      companyNameEn: "Hassan Misfer Al-Zahrani & Partners Group",
      procedureType: "تصفية",
      status: "جاري",
      court: "المحكمة التجارية بالدمام",
      summary: "مجموعة شركات متخصصة في مجالات تجارية متنوعة.",
      fullDescription: "شركة حسن مسفر الزهراني وشركاه هي مجموعة شركات تعمل في مجالات تجارية متنوعة.",
      keyFacts: [
        { label: "السجل التجاري", value: "2050001522" },
        { label: "المحكمة", value: "المحكمة التجارية بالدمام" },
        { label: "نوع الإجراء", value: "تصفية" },
      ],
    },
    en: {
      companyName: "Hassan Misfer Al-Zahrani & Partners Group",
      companyNameEn: "Hassan Misfer Al-Zahrani & Partners Group",
      procedureType: "Liquidation",
      status: "Ongoing",
      court: "Commercial Court in Dammam",
      summary: "A group of companies operating in various commercial fields.",
      fullDescription: "Hassan Misfer Al-Zahrani & Partners Group is a company group operating in various commercial fields.",
      keyFacts: [
        { label: "Commercial Registration", value: "2050001522" },
        { label: "Court", value: "Commercial Court in Dammam" },
        { label: "Procedure Type", value: "Liquidation" },
      ],
    },
  },
  "Al-Anjaz-Hotel-Village": {
    slug: "Al-Anjaz-Hotel-Village",
    logo: "",
    ar: {
      companyName: "شركة قرية الأنجاز الفندقية",
      companyNameEn: "Al-Anjaz Hotel Village",
      procedureType: "تصفية",
      status: "جاري",
      court: "المحكمة التجارية بالرياض",
      caseNumber: "471007361",
      summary: "شركة متخصصة في قطاع الضيافة والخدمات الفندقية.",
      fullDescription: "شركة قرية الأنجاز الفندقية هي منشأة متخصصة في تقديم خدمات الضيافة والإيواء الفندقي.",
      keyFacts: [
        { label: "السجل التجاري", value: "1010635991" },
        { label: "الرقم الموحد", value: "7017207254" },
        { label: "رقم القضية", value: "471007361" },
        { label: "المحكمة", value: "المحكمة التجارية بالرياض" },
        { label: "نوع الإجراء", value: "تصفية" },
      ],
    },
    en: {
      companyName: "Al-Anjaz Hotel Village Company",
      companyNameEn: "Al-Anjaz Hotel Village",
      procedureType: "Liquidation",
      status: "Ongoing",
      court: "Commercial Court in Riyadh",
      caseNumber: "471007361",
      summary: "A company specialized in hospitality and hotel services.",
      fullDescription: "Al-Anjaz Hotel Village Company is an establishment specialized in providing hospitality and accommodation services.",
      keyFacts: [
        { label: "Commercial Registration", value: "1010635991" },
        { label: "Unified Number", value: "7017207254" },
        { label: "Case Number", value: "471007361" },
        { label: "Court", value: "Commercial Court in Riyadh" },
        { label: "Procedure Type", value: "Liquidation" },
      ],
    },
  },
  "Arcon-Gulf-Contracting": {
    slug: "Arcon-Gulf-Contracting",
    logo: "",
    ar: {
      companyName: "شركة أركن الخليج للمقاولات",
      companyNameEn: "Arcon Gulf Contracting Co",
      procedureType: "تصفية",
      status: "جاري",
      court: "المحكمة التجارية بالدمام",
      caseNumber: "471006110",
      summary: "شركة متخصصة في أعمال المقاولات والإنشاءات.",
      fullDescription: "شركة أركن الخليج للمقاولات هي منشأة متخصصة في تقديم خدمات المقاولات والأعمال الإنشائية.",
      keyFacts: [
        { label: "السجل التجاري", value: "2051015186" },
        { label: "الرقم الموحد", value: "7011220360" },
        { label: "رقم القضية", value: "471006110" },
        { label: "المحكمة", value: "المحكمة التجارية بالدمام" },
        { label: "نوع الإجراء", value: "تصفية" },
      ],
    },
    en: {
      companyName: "Arcon Gulf Contracting Co",
      companyNameEn: "Arcon Gulf Contracting Co",
      procedureType: "Liquidation",
      status: "Ongoing",
      court: "Commercial Court in Dammam",
      caseNumber: "471006110",
      summary: "A company specialized in contracting and construction works.",
      fullDescription: "Arcon Gulf Contracting Co is an establishment specialized in providing contracting and construction services.",
      keyFacts: [
        { label: "Commercial Registration", value: "2051015186" },
        { label: "Unified Number", value: "7011220360" },
        { label: "Case Number", value: "471006110" },
        { label: "Court", value: "Commercial Court in Dammam" },
        { label: "Procedure Type", value: "Liquidation" },
      ],
    },
  },
};

export default function BankruptcyCase() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const params = useParams<{ slug: string }>();
  const caseData = casesData[params.slug || ""];
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });

  const BackArrow = isRTL ? ArrowLeft : ArrowRight;

  const seoContent = caseData ? (lang === "ar" ? caseData.ar : caseData.en) : null;
  useSEO({
    title: seoContent
      ? `${seoContent.companyName} - ${seoContent.procedureType}`
      : lang === "ar" ? "الإجراء غير موجود" : "Case Not Found",
    description: seoContent ? seoContent.summary : "",
    keywords: seoContent
      ? `${seoContent.companyName}, ${seoContent.companyNameEn}, ${seoContent.procedureType}, إفلاس, تصفية, bankruptcy, liquidation`
      : undefined,
    canonical: caseData ? `/bankruptcy/${caseData.slug}` : undefined,
    noindex: !caseData,
  });

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-[var(--color-navy)] mb-4">
            {lang === "ar" ? "الإجراء غير موجود" : "Case Not Found"}
          </h1>
          <Link href={lp("/services/bankruptcy")} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors">
            <span>{lang === "ar" ? "العودة لخدمات الإفلاس" : "Back to Bankruptcy Services"}</span>
          </Link>
        </div>
      </div>
    );
  }

  const content = lang === "ar" ? caseData.ar : caseData.en;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[var(--color-navy)] overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 font-body text-xs text-white/50">
            <Link href={lp("/")} className="hover:text-[var(--color-gold)] transition-colors">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href={lp("/services/bankruptcy")} className="hover:text-[var(--color-gold)] transition-colors">
              {lang === "ar" ? "الإفلاس والتصفية" : "Bankruptcy & Liquidation"}
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">{content.companyName}</span>
          </nav>

          {/* Company Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-sm flex items-center justify-center p-2 flex-shrink-0">
              <img
                src={caseData.logo}
                alt={content.companyName}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-[var(--color-gold)]/20 text-[var(--color-gold)] font-heading text-xs font-semibold tracking-wide">
                  {content.procedureType}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white/80 font-heading text-xs">
                  {content.status}
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                {content.companyName}
              </h1>
              <p className="font-body text-sm text-white/50">{content.companyNameEn}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={contentRef}
            className="grid lg:grid-cols-3 gap-8 md:gap-12 transition-all duration-700 ease-out"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Summary */}
              <div className="mb-8 md:mb-10 p-5 md:p-6 bg-white border border-[var(--color-border)]">
                <h2 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-3">
                  {lang === "ar" ? "نبذة عن الشركة" : "About the Company"}
                </h2>
                <p className="font-body text-sm md:text-base text-[var(--color-navy)]/70 leading-relaxed">
                  {content.summary}
                </p>
              </div>

              {/* Full Description */}
              <div className="mb-8 md:mb-10">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4 md:mb-6">
                  {lang === "ar" ? "تفاصيل الشركة" : "Company Details"}
                </h3>
                <div className="font-body text-sm md:text-base text-[var(--color-navy)]/70 leading-relaxed space-y-4">
                  {content.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Products */}
              {content.products && content.products.length > 0 && (
                <div className="mb-8 md:mb-10">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4 md:mb-6">
                    {lang === "ar" ? "المنتجات والأصناف" : "Products & Categories"}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {content.products.map((product, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 md:p-4 bg-white border border-[var(--color-border)]">
                        <div className="w-2 h-2 bg-[var(--color-gold)] flex-shrink-0" />
                        <span className="font-body text-xs md:text-sm text-[var(--color-navy)]/70">{product}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Claims CTA */}
              <div className={`p-5 md:p-6 bg-[var(--color-navy)]/5 ${isRTL ? 'border-r-4' : 'border-l-4'} border-[var(--color-gold)]`}>
                <h3 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-2">
                  {lang === "ar" ? "هل أنت دائن لهذه الشركة؟" : "Are you a creditor of this company?"}
                </h3>
                <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 mb-4">
                  {lang === "ar"
                    ? "إذا كان لديك مطالبة مالية تجاه هذه الشركة، يمكنك تقديم مطالبتك إلكترونياً من خلال النموذج المخصص."
                    : "If you have a financial claim against this company, you can submit your claim electronically through the dedicated form."}
                </p>
                <Link
                  href={lp("/bankruptcy/claims")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors"
                >
                  <FileText size={14} />
                  <span>{lang === "ar" ? "تقديم مطالبة" : "Submit a Claim"}</span>
                  <BackArrow size={14} />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-4 md:space-y-6">
                {/* Key Facts */}
                <div className="p-5 md:p-6 bg-white border border-[var(--color-border)]">
                  <h4 className="font-heading text-sm md:text-base font-semibold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                    <Scale size={16} className="text-[var(--color-gold)]" />
                    {lang === "ar" ? "بيانات الإجراء" : "Case Information"}
                  </h4>
                  <div className="space-y-3">
                    {content.keyFacts.map((fact, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-3 pb-3 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                        <span className="font-body text-xs text-[var(--color-navy)]/50">{fact.label}</span>
                        <span className="font-heading text-xs font-medium text-[var(--color-navy)] text-left">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="p-5 md:p-8 bg-[var(--color-navy)] text-center">
                  <h4 className="font-heading text-base md:text-lg font-semibold text-white mb-2 md:mb-3">
                    {lang === "ar" ? "تحتاج مساعدة؟" : "Need Help?"}
                  </h4>
                  <p className="font-body text-xs md:text-sm text-white/60 mb-4 md:mb-6">
                    {lang === "ar"
                      ? "فريقنا المتخصص في إجراءات الإفلاس جاهز لمساعدتك"
                      : "Our bankruptcy team is ready to assist you"}
                  </p>
                  <Link
                    href={lp("/contact")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors"
                  >
                    <span>{lang === "ar" ? "تواصل معنا" : "Contact Us"}</span>
                    <BackArrow size={14} />
                  </Link>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <a href="tel:+966505149800" onClick={() => trackPhoneClick('bankruptcy_case')} className="flex items-center justify-center gap-2 text-white/70 hover:text-[var(--color-gold)] transition-colors">
                      <Phone size={14} />
                      <span className="font-body text-sm" dir="ltr">0505149800</span>
                    </a>
                  </div>
                </div>

                {/* Back to Bankruptcy */}
                <Link
                  href={lp("/services/bankruptcy")}
                  className="flex items-center justify-center gap-2 p-4 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors"
                >
                  {isRTL ? <ArrowRight size={14} className="text-[var(--color-gold)]" /> : <ArrowLeft size={14} className="text-[var(--color-gold)]" />}
                  <span className="font-heading text-sm text-[var(--color-navy)]">
                    {lang === "ar" ? "العودة لخدمات الإفلاس" : "Back to Bankruptcy Services"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
