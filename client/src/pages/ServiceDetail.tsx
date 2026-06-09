import { useParams, Link } from "wouter";
import { ArrowLeft, ArrowRight, Briefcase, Gavel, Users, Building, Scale, FileCheck, BookOpen, Shield, Landmark, CheckCircle, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";
import { trackPhoneClick, trackBookConsultation } from "@/lib/analytics";

const servicesData: Record<string, {
  icon: any;
  ar: { title: string; description: string; details: string[]; faqs: { q: string; a: string }[] };
  en: { title: string; description: string; details: string[]; faqs: { q: string; a: string }[] };
}> = {
  "civil-commercial": {
    icon: Briefcase,
    ar: {
      title: "القضايا المدنية والتجارية",
      description: "نقدم تمثيلاً قانونياً شاملاً في النزاعات المدنية والتجارية أمام جميع المحاكم والجهات القضائية في المملكة العربية السعودية. نتعامل مع القضايا التجارية المعقدة بخبرة واحترافية عالية.",
      details: [
        "الترافع أمام المحاكم التجارية والعامة",
        "صياغة ومراجعة العقود التجارية",
        "تحصيل الديون والمطالبات المالية",
        "نزاعات الشركاء والمساهمين",
        "قضايا الغش التجاري والمنافسة غير المشروعة",
        "التعويضات عن الأضرار المادية والمعنوية",
      ],
      faqs: [
        { q: "ما هي مدة القضية التجارية المتوسطة؟", a: "تختلف المدة حسب تعقيد القضية، لكن عادة تتراوح بين 3 إلى 12 شهراً." },
        { q: "هل تتعاملون مع قضايا خارج منطقة القصيم؟", a: "نعم، نمثل عملاءنا أمام جميع المحاكم في المملكة." },
        { q: "ما هي تكلفة الاستشارة الأولية؟", a: "تواصل معنا لتحديد موعد استشارة ومعرفة التفاصيل." },
      ],
    },
    en: {
      title: "Civil & Commercial Cases",
      description: "We provide comprehensive legal representation in civil and commercial disputes before all courts and judicial authorities in the Kingdom of Saudi Arabia. We handle complex commercial cases with high expertise and professionalism.",
      details: [
        "Litigation before commercial and general courts",
        "Drafting and reviewing commercial contracts",
        "Debt collection and financial claims",
        "Partner and shareholder disputes",
        "Commercial fraud and unfair competition cases",
        "Compensation for material and moral damages",
      ],
      faqs: [
        { q: "What is the average duration of a commercial case?", a: "Duration varies by complexity, but typically ranges from 3 to 12 months." },
        { q: "Do you handle cases outside the Qassim region?", a: "Yes, we represent our clients before all courts in the Kingdom." },
        { q: "What is the cost of an initial consultation?", a: "Contact us to schedule a consultation and learn about the details." },
      ],
    },
  },
  "labor": {
    icon: Users,
    ar: {
      title: "قضايا العمل والعمال",
      description: "نوفر حماية قانونية شاملة لحقوق أصحاب العمل والعمال وفق نظام العمل السعودي، مع خبرة واسعة في التعامل مع المحاكم العمالية.",
      details: [
        "الترافع أمام المحاكم العمالية",
        "صياغة عقود العمل وسياسات الموارد البشرية",
        "قضايا الفصل التعسفي",
        "المطالبة بمستحقات نهاية الخدمة",
        "نزاعات الأجور والبدلات",
        "قضايا إصابات العمل والتعويضات",
      ],
      faqs: [
        { q: "هل يمكن رفع قضية عمالية بعد انتهاء العقد؟", a: "نعم، يحق للعامل المطالبة بحقوقه خلال المدة النظامية المحددة." },
        { q: "ما هي حقوق العامل عند الفصل التعسفي؟", a: "يحق له التعويض وفق ما ينص عليه نظام العمل السعودي." },
      ],
    },
    en: {
      title: "Labor & Employment",
      description: "We provide comprehensive legal protection for the rights of employers and employees under Saudi Labor Law, with extensive experience in dealing with labor courts.",
      details: [
        "Litigation before labor courts",
        "Drafting employment contracts and HR policies",
        "Unfair dismissal cases",
        "End-of-service benefits claims",
        "Wage and allowance disputes",
        "Work injury and compensation cases",
      ],
      faqs: [
        { q: "Can a labor case be filed after contract termination?", a: "Yes, the employee has the right to claim their rights within the statutory period." },
        { q: "What are the employee's rights in case of unfair dismissal?", a: "They are entitled to compensation as stipulated by Saudi Labor Law." },
      ],
    },
  },
  "criminal": {
    icon: Gavel,
    ar: {
      title: "القضايا الجنائية",
      description: "نقدم الدفاع والتمثيل القانوني في القضايا الجنائية بجميع أنواعها، مع الحرص على حماية حقوق المتهم وضمان محاكمة عادلة.",
      details: [
        "الدفاع في قضايا الحق العام والخاص",
        "قضايا الاحتيال والتزوير",
        "الجرائم المعلوماتية",
        "قضايا المخدرات",
        "جرائم الاعتداء والإيذاء",
        "تقديم طلبات الاستئناف والنقض",
      ],
      faqs: [
        { q: "هل يمكن حضور المحامي مع المتهم أثناء التحقيق؟", a: "نعم، يحق للمتهم الاستعانة بمحامٍ في جميع مراحل التحقيق والمحاكمة." },
        { q: "ما الفرق بين الحق العام والحق الخاص؟", a: "الحق العام هو حق الدولة في معاقبة المجرم، والحق الخاص هو حق المجني عليه في التعويض." },
      ],
    },
    en: {
      title: "Criminal Cases",
      description: "We provide defense and legal representation in all types of criminal cases, ensuring the protection of the accused's rights and a fair trial.",
      details: [
        "Defense in public and private right cases",
        "Fraud and forgery cases",
        "Cybercrime cases",
        "Drug-related cases",
        "Assault and battery crimes",
        "Filing appeals and cassation requests",
      ],
      faqs: [
        { q: "Can a lawyer attend with the accused during investigation?", a: "Yes, the accused has the right to have a lawyer present during all stages of investigation and trial." },
        { q: "What is the difference between public and private right?", a: "Public right is the state's right to punish the offender, while private right is the victim's right to compensation." },
      ],
    },
  },
  "personal-status": {
    icon: Shield,
    ar: {
      title: "الأحوال الشخصية",
      description: "نتعامل مع قضايا الأسرة بحساسية واحترافية، ونسعى لحل النزاعات الأسرية بما يحقق مصلحة جميع الأطراف.",
      details: [
        "قضايا الطلاق والخلع",
        "الحضانة وحقوق الزيارة",
        "النفقة بأنواعها",
        "قسمة التركات والميراث",
        "إثبات النسب",
        "عقود الزواج والشروط",
      ],
      faqs: [
        { q: "كيف يتم تحديد الحضانة؟", a: "يراعي القاضي مصلحة الطفل الفضلى وفق الأنظمة المعمول بها." },
        { q: "هل يمكن المطالبة بالنفقة بأثر رجعي؟", a: "نعم، يمكن المطالبة بالنفقة المتأخرة وفق الضوابط النظامية." },
      ],
    },
    en: {
      title: "Personal Status",
      description: "We handle family cases with sensitivity and professionalism, seeking to resolve family disputes in the best interest of all parties.",
      details: [
        "Divorce and khul' cases",
        "Custody and visitation rights",
        "All types of alimony",
        "Estate division and inheritance",
        "Paternity establishment",
        "Marriage contracts and conditions",
      ],
      faqs: [
        { q: "How is custody determined?", a: "The judge considers the best interest of the child according to applicable regulations." },
        { q: "Can alimony be claimed retroactively?", a: "Yes, overdue alimony can be claimed according to regulatory guidelines." },
      ],
    },
  },
  "real-estate": {
    icon: Building,
    ar: {
      title: "النزاعات العقارية",
      description: "نقدم خدمات قانونية متكاملة في مجال العقارات، من التسجيل العيني إلى حل النزاعات العقارية المعقدة.",
      details: [
        "التسجيل العيني للعقار",
        "نزاعات الملكية والحيازة",
        "عقود البيع والشراء العقارية",
        "قضايا الإيجار والإخلاء",
        "التعويض عن نزع الملكية",
        "فرز وتجزئة العقارات",
      ],
      faqs: [
        { q: "ما هو التسجيل العيني للعقار؟", a: "هو نظام لتسجيل العقارات يعتمد على العقار ذاته وليس على المالك، ويوفر حماية قانونية أقوى." },
        { q: "هل يمكن إلغاء عقد بيع عقاري؟", a: "يمكن ذلك في حالات محددة كالغش أو التدليس أو عدم الوفاء بالشروط." },
      ],
    },
    en: {
      title: "Real Estate Disputes",
      description: "We provide comprehensive legal services in real estate, from property registration to resolving complex real estate disputes.",
      details: [
        "Real property registration",
        "Ownership and possession disputes",
        "Real estate sale and purchase contracts",
        "Lease and eviction cases",
        "Compensation for expropriation",
        "Property subdivision and partitioning",
      ],
      faqs: [
        { q: "What is real property registration?", a: "It is a property registration system based on the property itself rather than the owner, providing stronger legal protection." },
        { q: "Can a real estate sale contract be cancelled?", a: "This is possible in specific cases such as fraud, misrepresentation, or breach of conditions." },
      ],
    },
  },
  "bankruptcy": {
    icon: Scale,
    ar: {
      title: "الإفلاس والتصفية",
      description: "نقدم خدمات متخصصة في إجراءات الإفلاس وإعادة التنظيم المالي والتصفية وفق نظام الإفلاس السعودي، بترخيص رسمي من لجنة الإفلاس.",
      details: [
        "إجراءات التسوية الوقائية",
        "إعادة التنظيم المالي",
        "التصفية وبيع الأصول",
        "تمثيل الدائنين والمدينين",
        "إعداد خطط السداد",
        "الإشراف على تنفيذ خطط إعادة التنظيم",
      ],
      faqs: [
        { q: "ما الفرق بين التسوية الوقائية وإعادة التنظيم؟", a: "التسوية الوقائية تتم قبل التعثر، بينما إعادة التنظيم تتم بعد التعثر الفعلي." },
        { q: "هل يفقد المدين السيطرة على أعماله؟", a: "في التسوية الوقائية يبقى المدين مسيطراً، أما في التصفية فيتولى أمين الإفلاس الإدارة." },
      ],
    },
    en: {
      title: "Bankruptcy & Liquidation",
      description: "We provide specialized services in bankruptcy proceedings, financial reorganization, and liquidation under Saudi Bankruptcy Law, with an official license from the Bankruptcy Commission.",
      details: [
        "Preventive settlement procedures",
        "Financial reorganization",
        "Liquidation and asset sales",
        "Representing creditors and debtors",
        "Preparing repayment plans",
        "Supervising reorganization plan implementation",
      ],
      faqs: [
        { q: "What is the difference between preventive settlement and reorganization?", a: "Preventive settlement occurs before default, while reorganization occurs after actual default." },
        { q: "Does the debtor lose control of their business?", a: "In preventive settlement, the debtor remains in control. In liquidation, the bankruptcy trustee takes over management." },
      ],
    },
  },
  "arbitration": {
    icon: Landmark,
    ar: {
      title: "التحكيم",
      description: "نمثل الأطراف في إجراءات التحكيم المحلي والدولي كوسيلة بديلة لحل النزاعات بشكل أسرع وأكثر مرونة.",
      details: [
        "صياغة شروط واتفاقيات التحكيم",
        "تمثيل الأطراف أمام هيئات التحكيم",
        "تنفيذ أحكام التحكيم",
        "الطعن في أحكام التحكيم",
        "التحكيم التجاري الدولي",
        "الوساطة والصلح",
      ],
      faqs: [
        { q: "ما مميزات التحكيم مقارنة بالقضاء؟", a: "السرعة، السرية، اختيار المحكمين المتخصصين، والمرونة في الإجراءات." },
        { q: "هل حكم التحكيم ملزم؟", a: "نعم، حكم التحكيم ملزم وقابل للتنفيذ بعد صدور أمر التنفيذ." },
      ],
    },
    en: {
      title: "Arbitration",
      description: "We represent parties in local and international arbitration proceedings as an alternative means of dispute resolution that is faster and more flexible.",
      details: [
        "Drafting arbitration clauses and agreements",
        "Representing parties before arbitration tribunals",
        "Enforcement of arbitration awards",
        "Challenging arbitration awards",
        "International commercial arbitration",
        "Mediation and conciliation",
      ],
      faqs: [
        { q: "What are the advantages of arbitration over litigation?", a: "Speed, confidentiality, choice of specialized arbitrators, and procedural flexibility." },
        { q: "Is an arbitration award binding?", a: "Yes, an arbitration award is binding and enforceable after issuance of an enforcement order." },
      ],
    },
  },
  "consultation": {
    icon: BookOpen,
    ar: {
      title: "الاستشارات القانونية",
      description: "نقدم استشارات قانونية متخصصة تساعدك في اتخاذ القرارات الصحيحة وتجنب المخاطر القانونية المحتملة.",
      details: [
        "استشارات في تأسيس الشركات",
        "مراجعة العقود والاتفاقيات",
        "الامتثال التنظيمي",
        "استشارات الملكية الفكرية",
        "الاستشارات الضريبية",
        "دراسة الجدوى القانونية للمشاريع",
      ],
      faqs: [
        { q: "هل يمكن الحصول على استشارة عن بُعد؟", a: "نعم، نقدم استشارات عبر الهاتف أو الاجتماعات المرئية." },
        { q: "كم تستغرق الاستشارة؟", a: "عادة تتراوح بين 30 إلى 60 دقيقة حسب تعقيد الموضوع." },
      ],
    },
    en: {
      title: "Legal Consultation",
      description: "We provide specialized legal consultations to help you make the right decisions and avoid potential legal risks.",
      details: [
        "Company formation consultations",
        "Contract and agreement review",
        "Regulatory compliance",
        "Intellectual property consultations",
        "Tax consultations",
        "Legal feasibility studies for projects",
      ],
      faqs: [
        { q: "Can I get a remote consultation?", a: "Yes, we offer consultations via phone or video meetings." },
        { q: "How long does a consultation take?", a: "Typically between 30 to 60 minutes depending on the complexity of the matter." },
      ],
    },
  },
  "documentation": {
    icon: FileCheck,
    ar: {
      title: "التوثيق",
      description: "نقدم خدمات التوثيق الرسمي للعقود والمستندات القانونية بترخيص من وزارة العدل، مما يضفي الحجية القانونية على معاملاتك.",
      details: [
        "توثيق عقود البيع والشراء",
        "توثيق عقود الإيجار",
        "توثيق الوكالات والتفويضات",
        "توثيق عقود الشراكة",
        "توثيق الإقرارات والتعهدات",
        "التصديق على المستندات",
      ],
      faqs: [
        { q: "ما الفرق بين التوثيق والتصديق؟", a: "التوثيق هو إنشاء المستند رسمياً، والتصديق هو التأكد من صحة مستند موجود." },
        { q: "هل التوثيق إلزامي لجميع العقود؟", a: "ليس إلزامياً لجميع العقود، لكنه يوفر حماية قانونية أقوى ويسهل الإثبات." },
      ],
    },
    en: {
      title: "Documentation & Notarization",
      description: "We provide official notarization services for contracts and legal documents licensed by the Ministry of Justice, giving legal authority to your transactions.",
      details: [
        "Notarizing sale and purchase contracts",
        "Notarizing lease contracts",
        "Notarizing powers of attorney and delegations",
        "Notarizing partnership contracts",
        "Notarizing declarations and undertakings",
        "Document authentication",
      ],
      faqs: [
        { q: "What is the difference between notarization and authentication?", a: "Notarization is officially creating a document, while authentication is verifying an existing document's validity." },
        { q: "Is notarization mandatory for all contracts?", a: "Not mandatory for all contracts, but it provides stronger legal protection and facilitates proof." },
      ],
    },
  },
};

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const { lang, isRTL } = useTranslation();
  const service = servicesData[params.slug || ""];
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const labels = lang === "ar" ? {
    serviceNotFound: "الخدمة غير موجودة",
    backToServices: "العودة لصفحة الخدمات",
    home: "الرئيسية",
    services: "خدماتنا",
    whatWeOffer: "ما نقدمه في هذه الخدمة",
    submitClaim: "تقديم مطالبة دائن",
    claimDesc: "إذا كنت دائناً لأحد المدينين الخاضعين لإجراءات الإفلاس، يمكنك تقديم مطالبتك إلكترونياً.",
    submitClaimBtn: "تقديم مطالبة",
    faqs: "الأسئلة الشائعة",
    needHelp: "تحتاج مساعدة؟",
    contactDesc: "تواصل معنا للحصول على استشارة قانونية متخصصة",
    contactUs: "تواصل معنا",
    otherServices: "خدمات أخرى",
  } : {
    serviceNotFound: "Service Not Found",
    backToServices: "Back to Services",
    home: "Home",
    services: "Services",
    whatWeOffer: "What We Offer in This Service",
    submitClaim: "Submit a Creditor Claim",
    claimDesc: "If you are a creditor of a debtor undergoing bankruptcy proceedings, you can submit your claim electronically.",
    submitClaimBtn: "Submit Claim",
    faqs: "Frequently Asked Questions",
    needHelp: "Need Help?",
    contactDesc: "Contact us for a specialized legal consultation",
    contactUs: "Contact Us",
    otherServices: "Other Services",
  };

  if (!service) {
    return (
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-bold text-[var(--color-navy)] mb-4">{labels.serviceNotFound}</h1>
          <Link href="/services" className="font-heading text-[var(--color-gold)] hover:underline">
            {labels.backToServices}
          </Link>
        </div>
      </section>
    );
  }

  const Icon = service.icon;
  const content = service[lang];
  const BackArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 md:gap-3 mb-4 flex-wrap">
            <Link href="/" className="font-body text-xs md:text-sm text-white/50 hover:text-white/80 transition-colors">{labels.home}</Link>
            <span className="text-white/30">/</span>
            <Link href="/services" className="font-body text-xs md:text-sm text-white/50 hover:text-white/80 transition-colors">{labels.services}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-xs md:text-sm text-[var(--color-gold)]">{content.title}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
              <Icon size={22} className="text-[var(--color-navy)] md:hidden" />
              <Icon size={28} className="text-[var(--color-navy)] hidden md:block" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold text-white">{content.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--color-cream)]">
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
              <p className="font-body text-sm md:text-lg text-[var(--color-navy)]/70 leading-relaxed mb-8 md:mb-10">
                {content.description}
              </p>

              <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4 md:mb-6">{labels.whatWeOffer}</h3>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
                {content.details.map((detail) => (
                  <div key={detail} className="flex items-start gap-2.5 md:gap-3 p-3 md:p-4 bg-white border border-[var(--color-border)]">
                    <CheckCircle size={16} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                    <span className="font-body text-xs md:text-sm text-[var(--color-navy)]/70">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Bankruptcy Track Record - only for bankruptcy */}
              {params.slug === 'bankruptcy' && (
                <div className="mb-8 md:mb-12 p-5 md:p-8 bg-[var(--color-navy)] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-heading text-sm font-semibold text-[var(--color-gold)] mb-4 tracking-wider uppercase">
                      {lang === 'ar' ? 'سجلنا في إدارة المطالبات' : 'Our Claims Management Record'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-5">
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display text-2xl md:text-3xl font-bold text-[var(--color-gold)]">+500</span>
                          <span className="font-heading text-xs text-white/60">{lang === 'ar' ? 'مليون ر.س' : 'M SAR'}</span>
                        </div>
                        <p className="font-body text-[10px] md:text-xs text-white/40 mt-1">
                          {lang === 'ar' ? 'إجمالي المطالبات المُدارة' : 'Total Claims Under Management'}
                        </p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display text-2xl md:text-3xl font-bold text-[var(--color-gold)]">+452</span>
                          <span className="font-heading text-xs text-white/60">{lang === 'ar' ? 'دائن' : 'Creditors'}</span>
                        </div>
                        <p className="font-body text-[10px] md:text-xs text-white/40 mt-1">
                          {lang === 'ar' ? 'مطالبات دائنين تحت الإدارة' : 'Creditor Claims Administered'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Claims CTA - only for bankruptcy */}
              {params.slug === 'bankruptcy' && (
                <div className={`mb-8 md:mb-12 p-4 md:p-6 bg-[var(--color-navy)]/5 ${isRTL ? 'border-r-4' : 'border-l-4'} border-[var(--color-gold)]`}>
                  <h3 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-2">{labels.submitClaim}</h3>
                  <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 mb-3 md:mb-4">{labels.claimDesc}</p>
                  <Link href="/bankruptcy/claims" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors">
                    <span>{labels.submitClaimBtn}</span>
                    <BackArrow size={14} />
                  </Link>
                </div>
              )}

              {/* Current Bankruptcy Cases - only for bankruptcy */}
              {params.slug === 'bankruptcy' && (
                <div className="mb-8 md:mb-12">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4 md:mb-6">
                    {lang === 'ar' ? 'إجراءاتنا الحالية' : 'Our Current Proceedings'}
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { slug: 'ASHYAD-STEEL', logo: '/manus-storage/asyad-steel-logo_cf776c27.png', ar: 'شركة أشياد ستيل', en: 'ASHYAD STEEL', enName: 'ASHYAD STEEL' },
                      { slug: 'tajalriayaa', logo: '', ar: 'شركة تاج الرعاية الطبي', en: 'Taj Al-Riaya Medical', enName: 'tajalriayaa' },
                      { slug: 'Planting-for-Contracting', logo: '', ar: 'شركة المزروعات للمقاولات', en: 'Planting for Contracting', enName: 'Planting for Contracting' },
                      { slug: 'Hassan-Misfer-Al-Zahrani', logo: '', ar: 'شركة حسن مسفر الزهراني وشركاه', en: 'Hassan Misfer Al-Zahrani & Partners', enName: 'Hassan Misfer Al-Zahrani & Partners Group' },
                      { slug: 'Al-Anjaz-Hotel-Village', logo: '', ar: 'شركة قرية الأنجاز الفندقية', en: 'Al-Anjaz Hotel Village', enName: 'Al-Anjaz Hotel Village' },
                      { slug: 'Arcon-Gulf-Contracting', logo: '', ar: 'شركة أركن الخليج للمقاولات', en: 'Arcon Gulf Contracting Co', enName: 'Arcon Gulf Contracting Co' },
                    ].map((c) => (
                      <Link key={c.slug} href={`/bankruptcy/${c.slug}`} className="group block p-4 md:p-5 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-gray-50 p-2 flex items-center justify-center">
                            {c.logo ? (
                              <img src={c.logo} alt={c.enName} className="w-full h-full object-contain" />
                            ) : (
                              <Building size={24} className="text-[var(--color-navy)]/30" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-sm md:text-base font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                              {lang === 'ar' ? c.ar : c.en}
                            </h4>
                            <p className="font-body text-xs text-[var(--color-navy)]/50 mt-0.5">{c.enName}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="inline-block px-2 py-0.5 text-[10px] font-heading font-semibold bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20">
                                {lang === 'ar' ? 'تصفية' : 'Liquidation'}
                              </span>
                              <span className="inline-block px-2 py-0.5 text-[10px] font-heading font-semibold bg-green-50 text-green-700 border border-green-200">
                                {lang === 'ar' ? 'جاري' : 'Ongoing'}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-[var(--color-navy)]/30 group-hover:text-[var(--color-gold)] transition-colors">
                            {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4 md:mb-6">{labels.faqs}</h3>
              <div className="space-y-3 md:space-y-4">
                {content.faqs.map((faq) => (
                  <div key={faq.q} className="p-4 md:p-6 bg-white border border-[var(--color-border)]">
                    <h4 className="font-heading text-sm md:text-base font-semibold text-[var(--color-navy)] mb-1.5 md:mb-2">{faq.q}</h4>
                    <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-4 md:space-y-6">
                {/* CTA Card */}
                <div className="p-5 md:p-8 bg-[var(--color-navy)] text-center">
                  <h4 className="font-heading text-base md:text-lg font-semibold text-white mb-2 md:mb-3">{labels.needHelp}</h4>
                  <p className="font-body text-xs md:text-sm text-white/60 mb-4 md:mb-6">
                    {labels.contactDesc}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors"
                  >
                    <span>{labels.contactUs}</span>
                    <BackArrow size={14} />
                  </Link>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <a href="tel:+966505149800" onClick={() => trackPhoneClick('service_detail')} className="flex items-center justify-center gap-2 text-white/70 hover:text-[var(--color-gold)] transition-colors">
                      <Phone size={14} />
                      <span className="font-body text-sm" dir="ltr">0505149800</span>
                    </a>
                  </div>
                </div>

                {/* Other Services */}
                <div className="p-4 md:p-6 bg-white border border-[var(--color-border)]">
                  <h4 className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] mb-3 md:mb-4">{labels.otherServices}</h4>
                  <div className="space-y-2">
                    {Object.entries(servicesData)
                      .filter(([slug]) => slug !== params.slug)
                      .slice(0, 5)
                      .map(([slug, s]) => (
                        <Link
                          key={slug}
                          href={`/services/${slug}`}
                          className="block py-2 px-3 font-body text-sm text-[var(--color-navy)]/60 hover:text-[var(--color-gold)] hover:bg-[var(--color-cream)] transition-all"
                        >
                          {s[lang].title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
