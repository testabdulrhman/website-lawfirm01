import { Landmark, Building, FileCheck, Scale, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import { useMemo, useState } from "react";

interface LicenseItem {
  slug: string;
  icon: any;
  title: string;
  number: string;
  issuer: string;
  membership: string;
  additionalInfo?: string;
  status: string;
  scope: string;
  description: string;
  capabilities: string[];
  relatedServices: { title: string; path: string }[];
  faqs: { q: string; a: string }[];
}

const licensesData: Record<string, LicenseItem[]> = {
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
      description: "ترخيص ممارسة مهنة المحاماة الصادر من وزارة العدل بموجب نظام المحاماة يخوّل الشركة الترافع والتمثيل القانوني أمام جميع المحاكم بدرجاتها والجهات شبه القضائية واللجان المتخصصة في المملكة العربية السعودية.",
      capabilities: [
        "الترافع أمام المحاكم العامة والتجارية والجزائية والعمالية",
        "التمثيل أمام محاكم الاستئناف والمحكمة العليا",
        "الترافع أمام ديوان المظالم (المحاكم الإدارية)",
        "التمثيل أمام اللجان شبه القضائية",
        "تقديم الاستشارات القانونية وصياغة العقود",
        "التحكيم التجاري المحلي والدولي",
      ],
      relatedServices: [
        { title: "القضايا التجارية", path: "/services/civil-commercial" },
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
      description: "ترخيص أمين إفلاس صادر من لجنة الإفلاس بموجب نظام الإفلاس يخوّل الشركة إدارة إجراءات الإفلاس بأنواعها: التصفية، التصفية الإدارية، إعادة التنظيم، والتسوية الوقائية.",
      capabilities: [
        "إدارة إجراء التصفية وتوزيع حصيلتها على الدائنين",
        "إدارة إجراء التصفية الإدارية للمنشآت الصغيرة",
        "إدارة إجراء إعادة التنظيم وهيكلة الديون",
        "إدارة إجراء التسوية الوقائية",
        "إعداد تقارير أمين الإفلاس للمحكمة التجارية",
        "إدارة اجتماعات الدائنين والتصويت على الخطط",
      ],
      relatedServices: [
        { title: "تفاصيل ترخيص أمين الإفلاس", path: "/licenses/bankruptcy-trustee" },
        { title: "إدارة إجراءات الإفلاس", path: "/bankruptcy" },
        { title: "خدمات محامي الإفلاس", path: "/services/bankruptcy" },
        { title: "تقديم المطالبات", path: "/bankruptcy/claims" },
      ],
      faqs: [
        { q: "ما الفرق بين أمين الإفلاس والمحامي؟", a: "أمين الإفلاس يُعيّن من المحكمة التجارية لإدارة الإجراء بحيادية بين المدين والدائنين، بينما المحامي يمثل طرفاً واحداً." },
        { q: "هل يمكن لأمين الإفلاس أن يكون محامياً لأحد الأطراف في نفس القضية؟", a: "لا، نظام الإفلاس يمنع تعارض المصالح. أمين الإفلاس يعمل بحيادية تامة." },
        { q: "كيف يُعيّن أمين الإفلاس؟", a: "تعيّنه المحكمة التجارية من سجل أمناء الإفلاس المعتمدين لدى لجنة الإفلاس." },
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
      description: "ترخيص موثّق معتمد صادر من وزارة العدل يخوّل الشركة توثيق العقود والإقرارات والوكالات والتصديق على التوقيعات وفق نظام التوثيق.",
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
      slug: "bankruptcy-expert",
      icon: Award,
      title: "خبير إفلاس في مجال المحاماة",
      number: "247007",
      issuer: "لجنة الإفلاس",
      membership: "",
      additionalInfo: "تاريخ الترخيص: 10 فبراير 2026 · تاريخ إصدار الوثيقة: 11 فبراير 2026",
      status: "ساري",
      scope: "أعمال الخبرة القانونية وفق نظام الإفلاس ولائحته التنفيذية",
      description: "ترخيص خبير في مجال (المحاماة) صادر من لجنة الإفلاس، ويجيز لمرخّصه مزاولة أعمال الخبراء المنصوص عليها في نظام الإفلاس ولائحته التنفيذية.",
      capabilities: [
        "ممارسة أعمال الخبراء في نطاق نظام الإفلاس ولائحته التنفيذية",
        "تقديم الخبرة القانونية في المسائل المرتبطة بإجراءات الإفلاس",
        "دراسة المسائل النظامية التي تدخل في نطاق التكليف",
        "إعداد الآراء والتقارير المهنية وفق نطاق المهمة",
      ],
      relatedServices: [
        { title: "إدارة إجراءات الإفلاس", path: "/bankruptcy" },
        { title: "خدمات محامي الإفلاس", path: "/services/bankruptcy" },
      ],
      faqs: [
        { q: "ما الفرق بين خبير الإفلاس وأمين الإفلاس؟", a: "يقدّم الخبير رأياً فنياً أو مهنياً في حدود المهمة المسندة إليه، بينما يُعيَّن أمين الإفلاس لإدارة الإجراء بحياد وفق اختصاصاته النظامية." },
        { q: "من الجهة التي أصدرت الترخيص؟", a: "صدر الترخيص من لجنة الإفلاس في المملكة العربية السعودية." },
        { q: "كيف يمكن التحقق من الترخيص؟", a: "يمكن التحقق من بيانات الترخيص عبر رمز الاستجابة السريعة المطبوع على الوثيقة أو من خلال السجلات الرسمية للجنة الإفلاس." },
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
      description: "ترخيص مسجّل عقاري معتمد صادر من الهيئة العامة للعقار يخوّل الشركة تقديم خدمات التسجيل العقاري والتوثيق العيني نيابة عن العملاء.",
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
        { q: "ما هو التسجيل العيني للعقار؟", a: "نظام يُسجّل فيه العقار بذاته في سجل رسمي، مما يوفر حماية قانونية أقوى ويسهّل التعاملات العقارية." },
        { q: "هل التسجيل العيني إلزامي؟", a: "نعم، بدأت الهيئة العامة للعقار بتطبيقه تدريجياً في مناطق محددة، وسيشمل جميع المناطق مستقبلاً." },
        { q: "ما الفرق بين الصك العقاري والتسجيل العيني؟", a: "الصك وثيقة ملكية تقليدية، بينما التسجيل العيني نظام أشمل يُسجّل فيه العقار بكل تفاصيله في سجل مركزي." },
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
      description: "Legal practice license issued by the Ministry of Justice under the Legal Practice Law authorizing the firm to provide legal representation before all courts and quasi-judicial bodies in the Kingdom of Saudi Arabia.",
      capabilities: [
        "Litigation before general, commercial, criminal, and labor courts",
        "Representation before appellate courts and the Supreme Court",
        "Litigation before the Board of Grievances (Administrative Courts)",
        "Representation before quasi-judicial committees",
        "Legal consultations and contract drafting",
        "Domestic and international commercial arbitration",
      ],
      relatedServices: [
        { title: "Commercial Cases", path: "/services/civil-commercial" },
        { title: "Criminal Cases", path: "/services/criminal" },
        { title: "Labor Cases", path: "/services/labor" },
        { title: "Commercial Arbitration", path: "/services/arbitration" },
      ],
      faqs: [
        { q: "What is the difference between a licensed and unlicensed lawyer?", a: "A licensed lawyer holds an official license from the Ministry of Justice authorizing them to litigate before courts." },
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
      description: "Bankruptcy trustee license issued by the Bankruptcy Commission under the Bankruptcy Law authorizing the firm to manage all types of bankruptcy procedures.",
      capabilities: [
        "Managing liquidation procedures and distributing proceeds to creditors",
        "Managing administrative liquidation for small enterprises",
        "Managing reorganization and debt restructuring",
        "Managing preventive settlement procedures",
        "Preparing trustee reports for the Commercial Court",
        "Managing creditor meetings and plan voting",
      ],
      relatedServices: [
        { title: "Bankruptcy Trustee License Details", path: "/licenses/bankruptcy-trustee" },
        { title: "Bankruptcy Proceedings", path: "/bankruptcy" },
        { title: "Bankruptcy Legal Services", path: "/services/bankruptcy" },
        { title: "Claims Submission", path: "/bankruptcy/claims" },
      ],
      faqs: [
        { q: "What is the difference between a bankruptcy trustee and a lawyer?", a: "A bankruptcy trustee is appointed by the Commercial Court to manage proceedings impartially, while a lawyer represents one party." },
        { q: "Can a bankruptcy trustee also be a lawyer for one of the parties?", a: "No, the Bankruptcy Law prohibits conflicts of interest. The trustee must act with complete impartiality." },
        { q: "How is a bankruptcy trustee appointed?", a: "The Commercial Court appoints them from the registry of approved trustees at the Bankruptcy Commission." },
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
      description: "Licensed notary public issued by the Ministry of Justice authorizing the firm to notarize contracts, declarations, powers of attorney, and authenticate signatures.",
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
        { q: "What is the difference between a licensed notary and a notary office?", a: "A licensed notary provides the same services with greater flexibility. Documents have the same legal validity." },
        { q: "Is notarization done electronically?", a: "Yes, through the Najiz electronic platform with the option of in-person attendance when needed." },
        { q: "What is the cost of notarization?", a: "Costs vary by document type. Contact us for an accurate quote." },
      ],
    },
    {
      slug: "bankruptcy-expert",
      icon: Award,
      title: "Bankruptcy Expert License — Legal Practice",
      number: "247007",
      issuer: "Saudi Bankruptcy Commission",
      membership: "",
      additionalInfo: "License date: 10 February 2026 · Document issue date: 11 February 2026",
      status: "Active",
      scope: "Legal expert work under the Bankruptcy Law and its Implementing Regulations",
      description: "A license as an expert in the field of legal practice issued by the Saudi Bankruptcy Commission, authorizing the license holder to perform expert work provided for under the Bankruptcy Law and its Implementing Regulations.",
      capabilities: [
        "Performing expert work within the scope of the Bankruptcy Law and its Implementing Regulations",
        "Providing legal expertise on matters related to bankruptcy proceedings",
        "Reviewing legal issues within the scope of an assigned engagement",
        "Preparing professional opinions and reports within the assigned mandate",
      ],
      relatedServices: [
        { title: "Bankruptcy Proceedings", path: "/bankruptcy" },
        { title: "Bankruptcy Legal Services", path: "/services/bankruptcy" },
      ],
      faqs: [
        { q: "What is the difference between a bankruptcy expert and a bankruptcy trustee?", a: "An expert provides a technical or professional opinion within the assigned mandate, while a bankruptcy trustee is appointed to administer the proceeding impartially under the trustee's statutory powers." },
        { q: "Which authority issued the license?", a: "The license was issued by the Saudi Bankruptcy Commission." },
        { q: "How can the license be verified?", a: "The license details can be verified using the QR code printed on the certificate or through the official records of the Saudi Bankruptcy Commission." },
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
      description: "Licensed real estate registrar issued by the General Authority for Real Estate authorizing the firm to provide real estate registration services on behalf of clients.",
      capabilities: [
        "Registering real estate properties in the land registry",
        "Transferring property ownership",
        "Registering real estate mortgages",
        "Registering usufruct and easement rights",
        "Updating property deed information",
        "Following up on initial registration procedures",
      ],
      relatedServices: [
        { title: "Real Estate Disputes", path: "/services/real-estate" },
        { title: "Documentation & Contracts", path: "/services/documentation" },
      ],
      faqs: [
        { q: "What is real estate registration (Ayni)?", a: "A system where the property itself is registered in an official registry, providing stronger legal protection." },
        { q: "Is real estate registration mandatory?", a: "Yes, the General Authority has begun implementing it gradually and it will cover all regions." },
        { q: "What is the difference between a property deed and real estate registration?", a: "A deed is a traditional document, while registration is a comprehensive system recording all property details centrally." },
      ],
    },
  ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-start gap-4 group"
      >
        <span className="font-heading text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
          {q}
        </span>
        <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <span className="text-xs text-gray-600 font-bold">+</span>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-4' : 'max-h-0'}`}>
        <p className="font-body text-sm text-gray-600 leading-relaxed pe-8">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Licenses() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  const seoSchema = useMemo(() => [
    schemas.breadcrumb([
      { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
      { name: lang === 'ar' ? 'التراخيص' : 'Licenses', url: '/licenses' },
    ]),
  ], [lang]);

  useSEO({
    title: lang === 'ar' ? 'التراخيص والاعتمادات المهنية' : 'Professional Licenses & Accreditations',
    description: lang === 'ar'
      ? 'شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس حاصلة على خمسة تراخيص نظامية: المحاماة، أمانة الإفلاس، خبرة الإفلاس في مجال المحاماة، التوثيق، والتسجيل العقاري.'
      : 'The firm holds five official licenses: Legal Practice, Bankruptcy Trustee, Bankruptcy Expert in Legal Practice, Notarization, and Real Estate Registration.',
    canonical: '/licenses',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();

  const licenses = licensesData[lang === 'ar' ? 'ar' : 'en'];
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div ref={heroRef} className={`container relative z-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6 font-body" aria-label="Breadcrumb">
            <Link href={lp("/")} className="hover:text-[var(--color-gold)] transition-colors">
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Arrow className="w-3 h-3" />
            <span className="text-[var(--color-gold)]">
              {lang === 'ar' ? 'التراخيص' : 'Licenses'}
            </span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 rounded-sm flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[var(--color-gold)]" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {lang === 'ar' ? 'التراخيص والاعتمادات' : 'Licenses & Accreditations'}
            </h1>
          </div>
          <p className="font-body text-base md:text-lg text-white/70 max-w-2xl">
            {lang === 'ar'
              ? 'خمسة تراخيص نظامية صادرة من جهات حكومية رسمية تشمل المحاماة وأمانة الإفلاس وخبرة الإفلاس في مجال المحاماة والتوثيق والتسجيل العقاري.'
              : 'Five official licenses issued by government authorities covering legal practice, bankruptcy trusteeship, bankruptcy expertise in legal practice, notarization, and real estate registration.'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {licenses.map((license) => {
              const Icon = license.icon;
              return (
                <div key={license.slug} className="bg-white/5 border border-white/10 rounded-sm p-4 text-center backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-[var(--color-gold)] mx-auto mb-2" />
                  <span className="block font-heading text-xs text-white/80 leading-tight">
                    {license.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="space-y-16 md:space-y-24">
            {licenses.map((license, index) => {
              const Icon = license.icon;
              return (
                <article key={license.slug} id={license.slug} className="scroll-mt-24">
                  {/* License Header */}
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--color-navy)] rounded-sm flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-gold)]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
                          {license.title}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-heading text-xs font-semibold text-green-700">{license.status}</span>
                        </span>
                      </div>
                      <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
                        {license.description}
                      </p>
                    </div>
                  </div>

                  {/* License Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-sm p-4 border border-gray-100">
                      <span className="block text-xs text-gray-500 font-body mb-1.5">
                        {lang === 'ar' ? 'رقم الترخيص' : 'License No.'}
                      </span>
                      <span className="font-heading text-base font-bold text-[var(--color-navy)]">
                        {license.number}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-sm p-4 border border-gray-100">
                      <span className="block text-xs text-gray-500 font-body mb-1.5">
                        {lang === 'ar' ? 'الجهة المانحة' : 'Issuing Authority'}
                      </span>
                      <span className="font-heading text-base font-bold text-[var(--color-navy)]">
                        {license.issuer}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-sm p-4 border border-gray-100">
                      <span className="block text-xs text-gray-500 font-body mb-1.5">
                        {lang === 'ar' ? 'نطاق العمل' : 'Scope'}
                      </span>
                      <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                        {license.scope}
                      </span>
                    </div>
                  </div>

                  {license.membership && (
                    <div className="flex items-center gap-2 mb-8 px-4 py-3 bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 rounded-sm">
                      <Award className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                      <span className="font-body text-sm text-[var(--color-navy)] font-medium">
                        {license.membership}
                      </span>
                    </div>
                  )}

                  {license.additionalInfo && (
                    <div className="flex items-center gap-2 mb-8 px-4 py-3 bg-gray-50 border border-gray-100 rounded-sm">
                      <Award className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                      <span className="font-body text-sm text-[var(--color-navy)] font-medium">
                        {license.additionalInfo}
                      </span>
                    </div>
                  )}

                  {/* Capabilities & FAQ side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Capabilities */}
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)]" />
                        {lang === 'ar' ? 'ما يخوّلنا هذا الترخيص' : 'What This License Authorizes'}
                      </h3>
                      <div className="space-y-2.5">
                        {license.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-sm border border-gray-100">
                            <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full flex-shrink-0 mt-2" />
                            <span className="font-body text-sm text-gray-700">{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Related Services */}
                      <div className="mt-6">
                        <h4 className="font-heading text-sm font-semibold text-gray-500 mb-3">
                          {lang === 'ar' ? 'الخدمات المرتبطة' : 'Related Services'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {license.relatedServices.map((service, i) => (
                            <Link
                              key={i}
                              href={lp(service.path)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-navy)]/5 rounded-sm text-xs font-heading font-semibold text-[var(--color-navy)] hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] transition-colors"
                            >
                              {service.title}
                              <Arrow className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* FAQ */}
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--color-navy)] mb-4">
                        {lang === 'ar' ? 'أسئلة شائعة' : 'FAQ'}
                      </h3>
                      <div className="bg-gray-50 rounded-sm border border-gray-100 p-5">
                        {license.faqs.map((faq, i) => (
                          <FAQItem key={i} q={faq.q} a={faq.a} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < licenses.length - 1 && (
                    <div className="mt-16 md:mt-24 border-t border-gray-100" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[var(--color-navy)]">
        <div className="container text-center">
          <ShieldCheck className="w-10 h-10 text-[var(--color-gold)] mx-auto mb-4" />
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
            {lang === 'ar' ? 'جميع التراخيص صادرة من جهات حكومية رسمية' : 'All Licenses Issued by Official Government Authorities'}
          </h2>
          <p className="font-body text-sm text-white/60 mb-6 max-w-lg mx-auto">
            {lang === 'ar'
              ? 'يمكنك التحقق من صحة تراخيصنا عبر المنصات الرسمية للجهات المانحة.'
              : 'You can verify our licenses through the official platforms of the issuing authorities.'}
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
