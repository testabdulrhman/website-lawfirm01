import { Landmark, Building, FileCheck, Scale, ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link, useParams, Redirect } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import { useMemo } from "react";

interface LicenseData {
  slug: string;
  icon: any;
  title: string;
  number: string;
  issuer: string;
  membership: string;
  status: string;
  scope: string;
  description: string;
  capabilities: string[];
  relatedServices: { title: string; path: string }[];
  faqs: { q: string; a: string }[];
}

const licensesData: Record<string, LicenseData[]> = {
  ar: [
    {
      slug: "law-practice",
      icon: Landmark,
      title: "ممارسة أعمال المحاماة",
      number: "26/129",
      issuer: "وزارة العدل",
      membership: "عضوية الهيئة السعودية للمحامين رقم: (494216)",
      status: "ساري",
      scope: "الترافع أمام جميع المحاكم والجهات شبه القضائية",
      description: "ترخيص ممارسة مهنة المحاماة الصادر من وزارة العدل بموجب نظام المحاماة الصادر بالمرسوم الملكي رقم (م/38) يخوّل الشركة الترافع والتمثيل القانوني أمام جميع المحاكم بدرجاتها (ابتدائية، استئناف، عليا) والجهات شبه القضائية واللجان المتخصصة في المملكة العربية السعودية.",
      capabilities: [
        "الترافع أمام المحاكم العامة والتجارية والجزائية والعمالية والأحوال الشخصية",
        "التمثيل أمام محاكم الاستئناف والمحكمة العليا",
        "الترافع أمام ديوان المظالم (المحاكم الإدارية)",
        "التمثيل أمام اللجان شبه القضائية (لجنة المنازعات المصرفية، لجنة الأوراق المالية، وغيرها)",
        "تقديم الاستشارات القانونية وصياغة العقود والمذكرات",
        "التحكيم التجاري المحلي والدولي",
      ],
      relatedServices: [
        { title: "القضايا التجارية", path: "/services/commercial" },
        { title: "القضايا الجنائية", path: "/services/criminal" },
        { title: "قضايا العمل", path: "/services/labor" },
        { title: "التحكيم التجاري", path: "/services/arbitration" },
      ],
      faqs: [
        { q: "ما الفرق بين المحامي المرخص وغير المرخص؟", a: "المحامي المرخص حاصل على ترخيص رسمي من وزارة العدل يخوّله الترافع أمام المحاكم. بدون الترخيص لا يحق لأي شخص تمثيل الغير أمام الجهات القضائية." },
        { q: "هل الترخيص يغطي جميع مناطق المملكة؟", a: "نعم، ترخيص المحاماة يخوّل صاحبه الترافع أمام جميع المحاكم في المملكة دون تقييد جغرافي." },
        { q: "كيف أتحقق من صحة ترخيص المحامي؟", a: "يمكن التحقق عبر منصة ناجز التابعة لوزارة العدل أو موقع الهيئة السعودية للمحامين." },
      ],
    },
    {
      slug: "bankruptcy-trustee",
      icon: Scale,
      title: "ممارسة أعمال أمناء الإفلاس",
      number: "142147",
      issuer: "لجنة الإفلاس",
      membership: "",
      status: "ساري",
      scope: "إدارة إجراءات الإفلاس (تصفية، إعادة تنظيم، تسوية وقائية)",
      description: "ترخيص أمين إفلاس صادر من لجنة الإفلاس بموجب نظام الإفلاس الصادر بالمرسوم الملكي رقم (م/50) وتاريخ 1439/5/28هـ يخوّل الشركة إدارة إجراءات الإفلاس بأنواعها: التصفية، التصفية الإدارية، إعادة التنظيم، والتسوية الوقائية، بما يشمل إدارة أصول المدين وتوزيع الحصص على الدائنين.",
      capabilities: [
        "إدارة إجراء التصفية — تصفية أصول المدين وتوزيع حصيلتها على الدائنين وفق الأولويات النظامية",
        "إدارة إجراء التصفية الإدارية — للمنشآت الصغيرة التي لا تكفي أصولها لتغطية مصاريف التصفية",
        "إدارة إجراء إعادة التنظيم — وضع خطة لإعادة هيكلة ديون المدين مع استمرار نشاطه",
        "إدارة إجراء التسوية الوقائية — مساعدة المدين المتعثر على التوصل لاتفاق مع دائنيه",
        "إعداد تقارير أمين الإفلاس للمحكمة التجارية",
        "إدارة اجتماعات الدائنين والتصويت على الخطط",
      ],
      relatedServices: [
        { title: "إدارة إجراءات الإفلاس", path: "/services/bankruptcy" },
        { title: "تقديم المطالبات", path: "/bankruptcy/claims" },
        { title: "الاستشارات القانونية", path: "/services/consultation" },
      ],
      faqs: [
        { q: "ما الفرق بين أمين الإفلاس والمحامي؟", a: "أمين الإفلاس يُعيّن من المحكمة التجارية لإدارة الإجراء بحيادية بين المدين والدائنين، بينما المحامي يمثل طرفاً واحداً. الشركة مرخصة لكلا الدورين." },
        { q: "هل يمكن لأمين الإفلاس أن يكون محامياً لأحد الأطراف في نفس القضية؟", a: "لا، نظام الإفلاس يمنع تعارض المصالح. أمين الإفلاس يعمل بحيادية تامة ولا يجوز له تمثيل أي طرف في نفس الإجراء." },
        { q: "كيف يُعيّن أمين الإفلاس؟", a: "تعيّنه المحكمة التجارية من سجل أمناء الإفلاس المعتمدين لدى لجنة الإفلاس، أو يُرشّح من الدائنين ويُعتمد من المحكمة." },
      ],
    },
    {
      slug: "notary-public",
      icon: FileCheck,
      title: "ممارسة أعمال التوثيق",
      number: "45/57029",
      issuer: "وزارة العدل",
      membership: "",
      status: "ساري",
      scope: "توثيق العقود والإقرارات والوكالات",
      description: "ترخيص موثّق معتمد صادر من وزارة العدل يخوّل الشركة توثيق العقود والإقرارات والوكالات والتصديق على التوقيعات وفق نظام التوثيق، مما يوفر على العملاء الحاجة لزيارة كتابات العدل.",
      capabilities: [
        "توثيق عقود البيع والشراء والإيجار",
        "توثيق الوكالات بأنواعها (عامة، خاصة، قضائية)",
        "توثيق الإقرارات والتعهدات",
        "التصديق على التوقيعات",
        "توثيق عقود الشراكة والتأسيس",
        "توثيق محاضر الجمعيات العمومية",
      ],
      relatedServices: [
        { title: "التوثيق والعقود", path: "/services/documentation" },
        { title: "الاستشارات القانونية", path: "/services/consultation" },
      ],
      faqs: [
        { q: "ما الفرق بين التوثيق لدى موثّق معتمد وكتابة العدل؟", a: "الموثّق المعتمد يقدم نفس خدمات كتابة العدل لكن بمرونة أكبر في المواعيد والمكان. الوثائق لها نفس الحجية القانونية." },
        { q: "هل التوثيق يتم إلكترونياً؟", a: "نعم، يتم التوثيق عبر منصة ناجز الإلكترونية مع إمكانية الحضور الشخصي عند الحاجة." },
        { q: "ما هي تكلفة التوثيق؟", a: "تختلف التكلفة حسب نوع المستند. تواصل معنا للحصول على تسعيرة دقيقة حسب احتياجك." },
      ],
    },
    {
      slug: "real-estate-registration",
      icon: Building,
      title: "ممارسة أعمال التسجيل العيني",
      number: "2223002594",
      issuer: "الهيئة العامة للعقار",
      membership: "",
      status: "ساري",
      scope: "تسجيل الملكيات العقارية والتصرفات العينية",
      description: "ترخيص مسجّل عقاري معتمد صادر من الهيئة العامة للعقار يخوّل الشركة تقديم خدمات التسجيل العقاري والتوثيق العيني نيابة عن العملاء، بما يشمل نقل الملكيات وتسجيل التصرفات العقارية في السجل العقاري.",
      capabilities: [
        "تسجيل الملكيات العقارية في السجل العيني",
        "نقل ملكية العقارات",
        "تسجيل الرهون العقارية",
        "تسجيل حقوق الانتفاع والارتفاق",
        "تحديث بيانات الصكوك العقارية",
        "متابعة إجراءات التسجيل العيني الأولي",
      ],
      relatedServices: [
        { title: "النزاعات العقارية", path: "/services/real-estate" },
        { title: "التوثيق والعقود", path: "/services/documentation" },
      ],
      faqs: [
        { q: "ما هو التسجيل العيني للعقار؟", a: "نظام يُسجّل فيه العقار بذاته (لا بمالكه) في سجل رسمي، مما يوفر حماية قانونية أقوى ويسهّل التعاملات العقارية." },
        { q: "هل التسجيل العيني إلزامي؟", a: "نعم، بدأت الهيئة العامة للعقار بتطبيقه تدريجياً في مناطق محددة، وسيشمل جميع المناطق مستقبلاً." },
        { q: "ما الفرق بين الصك العقاري والتسجيل العيني؟", a: "الصك وثيقة ملكية تقليدية، بينما التسجيل العيني نظام أشمل يُسجّل فيه العقار بكل تفاصيله (الموقع، المساحة، الحقوق، القيود) في سجل مركزي." },
      ],
    },
  ],
  en: [
    {
      slug: "law-practice",
      icon: Landmark,
      title: "Legal Practice License",
      number: "26/129",
      issuer: "Ministry of Justice",
      membership: "Saudi Bar Association Membership No: (494216)",
      status: "Active",
      scope: "Litigation before all courts and quasi-judicial bodies",
      description: "Legal practice license issued by the Ministry of Justice under the Legal Practice Law (Royal Decree No. M/38) authorizing the firm to provide legal representation before all courts (first instance, appeal, supreme) and quasi-judicial bodies in the Kingdom of Saudi Arabia.",
      capabilities: [
        "Litigation before general, commercial, criminal, labor, and personal status courts",
        "Representation before appellate courts and the Supreme Court",
        "Litigation before the Board of Grievances (Administrative Courts)",
        "Representation before quasi-judicial committees",
        "Legal consultations, contract drafting, and legal memoranda",
        "Domestic and international commercial arbitration",
      ],
      relatedServices: [
        { title: "Commercial Cases", path: "/services/commercial" },
        { title: "Criminal Cases", path: "/services/criminal" },
        { title: "Labor Cases", path: "/services/labor" },
        { title: "Commercial Arbitration", path: "/services/arbitration" },
      ],
      faqs: [
        { q: "What is the difference between a licensed and unlicensed lawyer?", a: "A licensed lawyer holds an official license from the Ministry of Justice authorizing them to litigate before courts. Without a license, no one may represent others before judicial authorities." },
        { q: "Does the license cover all regions of the Kingdom?", a: "Yes, the legal practice license authorizes its holder to litigate before all courts in the Kingdom without geographic restrictions." },
        { q: "How can I verify a lawyer's license?", a: "You can verify through the Najiz platform of the Ministry of Justice or the Saudi Bar Association website." },
      ],
    },
    {
      slug: "bankruptcy-trustee",
      icon: Scale,
      title: "Bankruptcy Trustee License",
      number: "142147",
      issuer: "Bankruptcy Commission",
      membership: "",
      status: "Active",
      scope: "Managing bankruptcy procedures (liquidation, reorganization, preventive settlement)",
      description: "Bankruptcy trustee license issued by the Bankruptcy Commission under the Bankruptcy Law (Royal Decree No. M/50, dated 28/5/1439H) authorizing the firm to manage all types of bankruptcy procedures.",
      capabilities: [
        "Managing liquidation procedures — liquidating debtor assets and distributing proceeds to creditors",
        "Managing administrative liquidation — for small enterprises with insufficient assets",
        "Managing reorganization procedures — developing debt restructuring plans",
        "Managing preventive settlement — helping distressed debtors reach agreements with creditors",
        "Preparing trustee reports for the Commercial Court",
        "Managing creditor meetings and plan voting",
      ],
      relatedServices: [
        { title: "Bankruptcy Management", path: "/services/bankruptcy" },
        { title: "Claims Submission", path: "/bankruptcy/claims" },
        { title: "Legal Consultation", path: "/services/consultation" },
      ],
      faqs: [
        { q: "What is the difference between a bankruptcy trustee and a lawyer?", a: "A bankruptcy trustee is appointed by the Commercial Court to manage proceedings impartially between debtor and creditors, while a lawyer represents one party. Our firm is licensed for both roles." },
        { q: "Can a bankruptcy trustee also be a lawyer for one of the parties?", a: "No, the Bankruptcy Law prohibits conflicts of interest. The trustee must act with complete impartiality." },
        { q: "How is a bankruptcy trustee appointed?", a: "The Commercial Court appoints them from the registry of approved trustees at the Bankruptcy Commission, or creditors may nominate one for court approval." },
      ],
    },
    {
      slug: "notary-public",
      icon: FileCheck,
      title: "Notarization License",
      number: "45/57029",
      issuer: "Ministry of Justice",
      membership: "",
      status: "Active",
      scope: "Notarization of contracts, declarations, and powers of attorney",
      description: "Licensed notary public issued by the Ministry of Justice authorizing the firm to notarize contracts, declarations, powers of attorney, and authenticate signatures under the Notarization Law.",
      capabilities: [
        "Notarizing sale, purchase, and lease contracts",
        "Notarizing powers of attorney (general, special, judicial)",
        "Notarizing declarations and undertakings",
        "Authenticating signatures",
        "Notarizing partnership and incorporation agreements",
        "Notarizing general assembly minutes",
      ],
      relatedServices: [
        { title: "Documentation & Contracts", path: "/services/documentation" },
        { title: "Legal Consultation", path: "/services/consultation" },
      ],
      faqs: [
        { q: "What is the difference between a licensed notary and a notary office?", a: "A licensed notary provides the same services as a government notary office but with greater flexibility in scheduling and location. Documents have the same legal validity." },
        { q: "Is notarization done electronically?", a: "Yes, notarization is done through the Najiz electronic platform with the option of in-person attendance when needed." },
        { q: "What is the cost of notarization?", a: "Costs vary by document type. Contact us for an accurate quote based on your needs." },
      ],
    },
    {
      slug: "real-estate-registration",
      icon: Building,
      title: "Real Estate Registration License",
      number: "2223002594",
      issuer: "General Authority for Real Estate",
      membership: "",
      status: "Active",
      scope: "Registration of real estate properties and transactions",
      description: "Licensed real estate registrar issued by the General Authority for Real Estate authorizing the firm to provide real estate registration and property documentation services on behalf of clients.",
      capabilities: [
        "Registering real estate properties in the land registry",
        "Transferring property ownership",
        "Registering real estate mortgages",
        "Registering usufruct and easement rights",
        "Updating property deed information",
        "Following up on initial real estate registration procedures",
      ],
      relatedServices: [
        { title: "Real Estate Disputes", path: "/services/real-estate" },
        { title: "Documentation & Contracts", path: "/services/documentation" },
      ],
      faqs: [
        { q: "What is real estate registration (Ayni)?", a: "A system where the property itself (not its owner) is registered in an official registry, providing stronger legal protection and facilitating real estate transactions." },
        { q: "Is real estate registration mandatory?", a: "Yes, the General Authority for Real Estate has begun implementing it gradually in specific areas, and it will cover all regions in the future." },
        { q: "What is the difference between a property deed and real estate registration?", a: "A deed is a traditional ownership document, while real estate registration is a comprehensive system that records the property with all its details in a central registry." },
      ],
    },
  ],
};

export default function LicenseDetail() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const params = useParams<{ slug: string }>();
  const langKey = lang === 'ar' ? 'ar' : 'en';
  const license = licensesData[langKey].find(l => l.slug === params.slug);

  const seoSchema = useMemo(() => {
    if (!license) return [];
    return [
      schemas.breadcrumb([
        { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
        { name: lang === 'ar' ? 'التراخيص' : 'Licenses', url: '/licenses' },
        { name: license.title, url: `/licenses/${license.slug}` },
      ]),
    ];
  }, [lang, license]);

  useSEO({
    title: license?.title || (lang === 'ar' ? 'ترخيص' : 'License'),
    description: license?.description?.slice(0, 160) || '',
    canonical: `/licenses/${params.slug}`,
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: capRef, isVisible: capVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!license) {
    return <Redirect to={lp("/licenses")} />;
  }

  const Icon = license.icon;
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>
        <div ref={heroRef} className={`container relative z-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6 font-body" aria-label="Breadcrumb">
            <Link href={lp("/")} className="hover:text-[var(--color-gold)] transition-colors">
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Arrow className="w-3 h-3" />
            <Link href={lp("/licenses")} className="hover:text-[var(--color-gold)] transition-colors">
              {lang === 'ar' ? 'التراخيص' : 'Licenses'}
            </Link>
            <Arrow className="w-3 h-3" />
            <span className="text-[var(--color-gold)]">{license.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
              <Icon className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                {license.title}
              </h1>
              <p className="font-body text-base text-white/70 max-w-2xl">
                {license.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* License Info Card */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="bg-gray-50 border border-gray-100 rounded-sm p-6 md:p-8 mb-12">
            <h2 className="font-display text-lg font-bold text-[var(--color-navy)] mb-5">
              {lang === 'ar' ? 'بيانات الترخيص' : 'License Information'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-sm p-4 border border-gray-100">
                <span className="block text-xs text-gray-500 font-body mb-1">
                  {lang === 'ar' ? 'رقم الترخيص' : 'License No.'}
                </span>
                <span className="font-heading text-base font-bold text-[var(--color-navy)]">
                  {license.number}
                </span>
              </div>
              <div className="bg-white rounded-sm p-4 border border-gray-100">
                <span className="block text-xs text-gray-500 font-body mb-1">
                  {lang === 'ar' ? 'الجهة المانحة' : 'Issuing Authority'}
                </span>
                <span className="font-heading text-base font-bold text-[var(--color-navy)]">
                  {license.issuer}
                </span>
              </div>
              <div className="bg-white rounded-sm p-4 border border-gray-100">
                <span className="block text-xs text-gray-500 font-body mb-1">
                  {lang === 'ar' ? 'الحالة' : 'Status'}
                </span>
                <span className="inline-flex items-center gap-1.5 font-heading text-base font-bold text-green-700">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  {license.status}
                </span>
              </div>
              <div className="bg-white rounded-sm p-4 border border-gray-100">
                <span className="block text-xs text-gray-500 font-body mb-1">
                  {lang === 'ar' ? 'النطاق' : 'Scope'}
                </span>
                <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                  {license.scope}
                </span>
              </div>
            </div>
            {license.membership && (
              <p className="mt-4 font-body text-sm text-[var(--color-gold)] font-medium">
                {license.membership}
              </p>
            )}
          </div>

          {/* Capabilities */}
          <div ref={capRef} className={`mb-12 transition-all duration-700 ${capVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-6">
              {lang === 'ar' ? 'ما يخوّلنا هذا الترخيص' : 'What This License Authorizes'}
            </h2>
            <div className="grid gap-3">
              {license.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-sm border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm md:text-base text-gray-700">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          <div className="mb-12">
            <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-6">
              {lang === 'ar' ? 'الخدمات المرتبطة' : 'Related Services'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {license.relatedServices.map((service, i) => (
                <Link
                  key={i}
                  href={lp(service.path)}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-sm border border-gray-100 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all group"
                >
                  <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">{service.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-gold)] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div ref={faqRef} className={`transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-6">
              {lang === 'ar' ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
            </h2>
            <div className="grid gap-4">
              {license.faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-sm border border-gray-100 p-5">
                  <h3 className="font-heading text-sm md:text-base font-bold text-[var(--color-navy)] mb-2">
                    {faq.q}
                  </h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[var(--color-navy)]">
        <div className="container text-center">
          <p className="font-body text-white/70 mb-5">
            {lang === 'ar'
              ? 'هل تحتاج خدمة مرتبطة بهذا الترخيص؟'
              : 'Need a service related to this license?'}
          </p>
          <Link
            href={lp("/contact")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading text-sm font-bold rounded-sm hover:bg-[var(--color-gold-light)] transition-colors"
          >
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </>
  );
}
