import { useParams, Link } from "wouter";
import { ArrowLeft, ArrowRight, Briefcase, Gavel, Users, Building, Scale, FileCheck, BookOpen, Shield, Landmark, CheckCircle, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";
import { trackPhoneClick, trackBookConsultation } from "@/lib/analytics";
import { useSEO, schemas } from "@/hooks/useSEO";
import { useMemo } from "react";
import { localePath } from "@/lib/localePath";

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
        { q: "هل تتعاملون مع قضايا خارج منطقة القصيم؟", a: "نعم، نحمل ترخيص محاماة رقم 26/129 من وزارة العدل يخوّلنا الترافع أمام جميع المحاكم والدوائر القضائية في المملكة العربية السعودية بمختلف درجاتها." },
        { q: "ما هي تكلفة الاستشارة الأولية؟", a: "تختلف تكلفة الاستشارة حسب نوع القضية وتعقيدها. نقدم استشارة أولية لتقييم الحالة، ويتم الاتفاق على الأتعاب بشكل شفاف قبل البدء في أي إجراء قانوني." },
        { q: "كيف أوكّل الشركة في قضيتي التجارية؟", a: "يتم التوكيل عبر منصة ناجز الإلكترونية لإصدار وكالة إلكترونية. سنرشدك خلال جميع الخطوات المطلوبة -إن احتجت لذلك-." },
        { q: "كيف أتابع مستجدات قضيتي؟", a: "نوفر لعملائنا تحديثات دورية عبر الهاتف أو البريد الإلكتروني. كما يمكنك التواصل مع المحامي المسؤول عن قضيتك في أي وقت خلال ساعات العمل للاستفسار عن المستجدات." },
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
        { q: "Do you handle cases outside the Qassim region?", a: "Yes, we hold legal practice license No. 26/129 from the Ministry of Justice, authorizing us to litigate before all courts and judicial circuits in the Kingdom of Saudi Arabia at all levels." },
        { q: "What is the cost of an initial consultation?", a: "Consultation costs vary depending on the type and complexity of the case. We offer an initial consultation to assess your situation, and fees are agreed upon transparently before any legal action begins." },
        { q: "How do I engage the firm for my commercial case?", a: "Engagement is done through the Najiz electronic platform for issuing an electronic power of attorney. We will guide you through all required steps if needed." },
        { q: "How can I follow up on my case progress?", a: "We provide our clients with regular updates via phone or email. You can also contact the attorney responsible for your case at any time during business hours to inquire about developments." },
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
        { q: "ما هي حقوق العامل عند الفصل التعسفي؟", a: "يحق له التعويض وفق ما ينص عليه نظام العمل السعودي، ويشمل ذلك أجر المدة المتبقية من العقد أو تعويض لا يقل عن أجر شهرين." },
        { q: "ما هي المدة المتوقعة للقضية العمالية؟", a: "تختلف مدة القضية حسب نوعها وتعقيدها. القضايا البسيطة قد تستغرق 2-4 أشهر، بينما القضايا المعقدة قد تمتد لسنة أو أكثر." },
        { q: "هل يمكن التواصل عن بُعد؟", a: "نعم، نقدم خدمات الاستشارات عن بُعد عبر الاتصال المرئي أو الهاتفي. كما يمكن إتمام إجراءات التوكيل إلكترونياً عبر منصة ناجز." },
        { q: "هل تترافعون أمام جميع المحاكم العمالية؟", a: "نعم، نحمل ترخيص محاماة رقم 26/129 من وزارة العدل يخوّلنا الترافع أمام جميع المحاكم والدوائر القضائية بمختلف درجاتها." },
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
        { q: "What are the employee's rights in case of unfair dismissal?", a: "They are entitled to compensation as stipulated by Saudi Labor Law, including the remaining contract period wages or a minimum of two months' compensation." },
        { q: "What is the expected duration of a labor case?", a: "Case duration varies depending on type and complexity. Simple cases may take 2-4 months, while complex cases may extend to a year or more." },
        { q: "Can I communicate remotely?", a: "Yes, we offer remote consultation services via video call or phone. Engagement procedures can also be completed electronically through the Najiz platform." },
        { q: "Do you litigate before all labor courts?", a: "Yes, we hold legal practice license No. 26/129 from the Ministry of Justice, authorizing us to litigate before all courts and judicial circuits at all levels." },
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
        { q: "ما هي المدة المتوقعة للقضية الجنائية؟", a: "تختلف المدة حسب نوع القضية وتعقيدها والمحكمة المختصة. القضايا البسيطة قد تستغرق 2-4 أشهر، بينما القضايا المعقدة قد تمتد لسنة أو أكثر." },
        { q: "هل تترافعون أمام جميع المحاكم الجزائية؟", a: "نعم، نحمل ترخيص محاماة رقم 26/129 من وزارة العدل يخوّلنا الترافع أمام جميع المحاكم والدوائر القضائية بمختلف درجاتها." },
        { q: "كيف أحجز استشارة في قضية جنائية؟", a: "يمكنك حجز استشارة قانونية من خلال التواصل معنا عبر الهاتف (0505149800) أو عبر نموذج التواصل في الموقع، أو من خلال واتساب." },
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
        { q: "What is the expected duration of a criminal case?", a: "Duration varies depending on the type and complexity of the case and the competent court. Simple cases may take 2-4 months, while complex cases may extend to a year or more." },
        { q: "Do you litigate before all criminal courts?", a: "Yes, we hold legal practice license No. 26/129 from the Ministry of Justice, authorizing us to litigate before all courts and judicial circuits at all levels." },
        { q: "How can I book a consultation for a criminal case?", a: "You can book a legal consultation by contacting us via phone (0505149800), through the contact form on our website, or via WhatsApp." },
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
        { q: "ما هي المدة المتوقعة لقضية الأحوال الشخصية؟", a: "تختلف المدة حسب نوع القضية وتعقيدها. قضايا النفقة قد تستغرق 2-4 أشهر، بينما قضايا الحضانة المعقدة قد تمتد لفترة أطول." },
        { q: "كيف أوكّل الشركة في قضية أحوال شخصية؟", a: "يتم التوكيل عبر منصة ناجز الإلكترونية لإصدار وكالة إلكترونية. سنرشدك خلال جميع الخطوات المطلوبة." },
        { q: "هل يمكن التواصل عن بُعد في قضايا الأسرة؟", a: "نعم، نقدم خدمات الاستشارات عن بُعد عبر الاتصال المرئي أو الهاتفي مع مراعاة الخصوصية التامة." },
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
        { q: "What is the expected duration of a personal status case?", a: "Duration varies by case type and complexity. Alimony cases may take 2-4 months, while complex custody cases may extend longer." },
        { q: "How do I engage the firm for a family case?", a: "Engagement is done through the Najiz electronic platform for issuing an electronic power of attorney. We will guide you through all required steps." },
        { q: "Can I communicate remotely for family cases?", a: "Yes, we offer remote consultation services via video call or phone with complete privacy." },
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
        { q: "ما هو التسجيل العيني للعقار؟", a: "التسجيل العيني هو نظام لتسجيل الملكية العقارية يوفر حماية قانونية أقوى لملاك العقارات. نقدم هذه الخدمة بترخيص رقم 2223002594 من الهيئة العامة للعقار." },
        { q: "هل يمكن إلغاء عقد بيع عقاري؟", a: "يمكن ذلك في حالات محددة كالغش أو التدليس أو عدم الوفاء بالشروط." },
        { q: "ما هي خدمات التوثيق العقاري المتاحة؟", a: "نقدم خدمات التوثيق الرسمي بترخيص رقم 45/57029 من وزارة العدل، وتشمل: توثيق عقود البيع والشراء، الإيجار، وجميع المستندات العقارية." },
        { q: "هل تتعاملون مع نزاعات عقارية خارج منطقة القصيم؟", a: "نعم، نحمل ترخيص محاماة رقم 26/129 يخوّلنا الترافع أمام جميع المحاكم في المملكة." },
        { q: "كيف أحجز استشارة عقارية؟", a: "يمكنك حجز استشارة من خلال التواصل معنا عبر الهاتف (0505149800) أو عبر نموذج التواصل في الموقع، أو من خلال واتساب." },
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
        { q: "What is real property registration?", a: "Real estate registration is a system for registering property ownership that provides stronger legal protection for property owners. We offer this service under license No. 2223002594 from the General Authority for Real Estate." },
        { q: "Can a real estate sale contract be cancelled?", a: "This is possible in specific cases such as fraud, misrepresentation, or breach of conditions." },
        { q: "What real estate notarization services are available?", a: "We provide official notarization services under license No. 45/57029 from the Ministry of Justice, including: sale and purchase contracts, leases, and all real estate documents." },
        { q: "Do you handle real estate disputes outside the Qassim region?", a: "Yes, we hold legal practice license No. 26/129 authorizing us to litigate before all courts in the Kingdom." },
        { q: "How can I book a real estate consultation?", a: "You can book a consultation by contacting us via phone (0505149800), through the contact form on our website, or via WhatsApp." },
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
        { q: "ما الفرق بين التسوية الوقائية وإعادة التنظيم؟", a: "التسوية الوقائية تتم قبل التعثر الفعلي وتهدف لمنعه، بينما إعادة التنظيم تتم بعد التعثر وتهدف لإعادة هيكلة الديون. كلا الإجراءين يهدفان لاستمرار النشاط التجاري مع حماية حقوق الدائنين." },
        { q: "هل يفقد المدين السيطرة على أعماله؟", a: "في التسوية الوقائية يبقى المدين مسيطراً، أما في التصفية فيتولى أمين الإفلاس الإدارة." },
        { q: "ما هي خدمات أمين الإفلاس؟", a: "نقدم خدمات أمانة الإفلاس الشاملة بترخيص رقم 142147 من لجنة الإفلاس، وتشمل: التسوية الوقائية، إعادة التنظيم المالي، التصفية، وإدارة أصول المدين وفق نظام الإفلاس السعودي." },
        { q: "متى يحق لي تقديم طلب إفلاس؟", a: "يحق لك تقديم طلب إفلاس عندما تكون غير قادر على سداد ديونك المستحقة أو عندما تتوقع عدم القدرة على السداد مستقبلاً. ننصح بالتواصل معنا مبكراً لدراسة الخيارات المتاحة قبل تفاقم الوضع." },
        { q: "كيف يمكنني تقديم مطالبة كدائن؟", a: "إذا كنت دائناً لأحد المدينين الخاضعين لإجراءات الإفلاس، يمكنك تقديم مطالبتك إلكترونياً عبر نظام المطالبات الإلكتروني في موقعنا." },
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
        { q: "What is the difference between preventive settlement and reorganization?", a: "Preventive settlement occurs before actual default and aims to prevent it, while reorganization occurs after default and aims to restructure debts. Both procedures aim to continue business activity while protecting creditors' rights." },
        { q: "Does the debtor lose control of their business?", a: "In preventive settlement, the debtor remains in control. In liquidation, the bankruptcy trustee takes over management." },
        { q: "What are bankruptcy trustee services?", a: "We provide comprehensive bankruptcy trustee services under license No. 142147 from the Bankruptcy Commission, including: preventive settlement, financial reorganization, liquidation, and debtor asset management under Saudi Bankruptcy Law." },
        { q: "When am I eligible to file for bankruptcy?", a: "You may file for bankruptcy when you are unable to pay your due debts or when you anticipate inability to pay in the future. We recommend contacting us early to study available options before the situation worsens." },
        { q: "How can I submit a creditor claim?", a: "If you are a creditor of a debtor undergoing bankruptcy proceedings, you can submit your claim electronically through our online claims system on our website." },
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
        { q: "كيف أحجز استشارة قانونية؟", a: "يمكنك حجز استشارة قانونية من خلال التواصل معنا عبر الهاتف (0505149800) أو عبر نموذج التواصل في الموقع، أو من خلال واتساب. سيتم تحديد موعد مناسب لك خلال 24 ساعة عمل." },
        { q: "ما هي تكلفة الاستشارة القانونية؟", a: "تختلف تكلفة الاستشارة حسب نوع القضية وتعقيدها. نقدم استشارة أولية لتقييم الحالة، ويتم الاتفاق على الأتعاب بشكل شفاف قبل البدء في أي إجراء قانوني." },
        { q: "هل يمكن الحصول على استشارة عن بُعد؟", a: "نعم، نقدم خدمات الاستشارات عن بُعد عبر الاتصال المرئي أو الهاتفي. كما يمكن إتمام إجراءات التوكيل إلكترونياً عبر منصة ناجز." },
        { q: "كم تستغرق الاستشارة؟", a: "عادة تتراوح بين 30 إلى 60 دقيقة حسب تعقيد الموضوع." },
        { q: "ما هي أنواع الاستشارات المتاحة؟", a: "نقدم استشارات في تأسيس الشركات، مراجعة العقود، الامتثال التنظيمي، الملكية الفكرية، الاستشارات الضريبية، ودراسة الجدوى القانونية للمشاريع." },
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
        { q: "How can I book a legal consultation?", a: "You can book a legal consultation by contacting us via phone (0505149800), through the contact form on our website, or via WhatsApp. An appointment will be scheduled within 24 business hours." },
        { q: "What is the cost of a legal consultation?", a: "Consultation costs vary depending on the type and complexity of the case. We offer an initial consultation to assess your situation, and fees are agreed upon transparently before any legal action begins." },
        { q: "Can I get a remote consultation?", a: "Yes, we offer remote consultation services via video call or phone. Engagement procedures can also be completed electronically through the Najiz platform." },
        { q: "How long does a consultation take?", a: "Typically between 30 to 60 minutes depending on the complexity of the matter." },
        { q: "What types of consultations are available?", a: "We offer consultations in company formation, contract review, regulatory compliance, intellectual property, tax consultations, and legal feasibility studies for projects." },
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
        { q: "ما هي خدمات التوثيق المتاحة؟", a: "نقدم خدمات التوثيق الرسمي بترخيص رقم 45/57029 من وزارة العدل، وتشمل: توثيق العقود، الإقرارات، التفويضات، عقود الشراكة، وجميع المستندات القانونية التي تتطلب توثيقاً رسمياً." },
        { q: "ما الفرق بين التوثيق والتصديق؟", a: "التوثيق هو إنشاء المستند رسمياً، والتصديق هو التأكد من صحة مستند موجود." },
        { q: "هل التوثيق إلزامي لجميع العقود؟", a: "ليس إلزامياً لجميع العقود، لكنه يوفر حماية قانونية أقوى ويسهل الإثبات." },
        { q: "كيف يمكنني توثيق عقد؟", a: "تواصل معنا عبر الهاتف (0505149800) أو زيارة مكتبنا في طريق الملك عبدالله، حي الأفق، بريدة. سنرشدك للمستندات المطلوبة." },
        { q: "ما هو التسجيل العيني للعقار؟", a: "التسجيل العيني هو نظام لتسجيل الملكية العقارية يوفر حماية قانونية أقوى لملاك العقارات. نقدم هذه الخدمة بترخيص رقم 2223002594 من الهيئة العامة للعقار." },
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
        { q: "What notarization services are available?", a: "We provide official notarization services under license No. 45/57029 from the Ministry of Justice, including: contract notarization, declarations, authorizations, partnership agreements, and all legal documents requiring official notarization." },
        { q: "What is the difference between notarization and authentication?", a: "Notarization is officially creating a document, while authentication is verifying an existing document's validity." },
        { q: "Is notarization mandatory for all contracts?", a: "Not mandatory for all contracts, but it provides stronger legal protection and facilitates proof." },
        { q: "How can I get a document notarized?", a: "Contact us via phone (0505149800) or visit our office on King Abdullah Road, Al-Ufuq District, Buraydah. We will guide you on the required documents." },
        { q: "What is real estate registration?", a: "Real estate registration is a system for registering property ownership that provides stronger legal protection for property owners. We offer this service under license No. 2223002594 from the General Authority for Real Estate." },
      ],
    },
  },
};

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const { lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
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

  // Build FAQ schema for structured data
  const seoSchema = useMemo(() => {
    if (!service) return undefined;
    const content = service[lang];
    const faqQuestions = content.faqs.map(f => ({ question: f.q, answer: f.a }));
    return [
      schemas.breadcrumb([
        { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
        { name: lang === 'ar' ? 'خدماتنا' : 'Services', url: '/services' },
        { name: content.title, url: `/services/${params.slug}` }
      ]),
      schemas.faqPage(faqQuestions)
    ];
  }, [service, lang, params.slug]);

  useSEO({
    title: service ? service[lang].title : (lang === 'ar' ? 'خدمة غير موجودة' : 'Service Not Found'),
    description: service ? service[lang].description : '',
    keywords: service ? `${service[lang].title}, ${lang === 'ar' ? 'محاماة، خدمات قانونية' : 'law, legal services'}` : '',
    canonical: `/services/${params.slug}`,
    schema: seoSchema,
  });

  if (!service) {
    return (
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-bold text-[var(--color-navy)] mb-4">{labels.serviceNotFound}</h1>
          <Link href={lp("/services")} className="font-heading text-[var(--color-gold)] hover:underline">
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
            <Link href={lp("/")} className="font-body text-xs md:text-sm text-white/50 hover:text-white/80 transition-colors">{labels.home}</Link>
            <span className="text-white/30">/</span>
            <Link href={lp("/services")} className="font-body text-xs md:text-sm text-white/50 hover:text-white/80 transition-colors">{labels.services}</Link>
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
                  <Link href={lp("/bankruptcy/claims")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors">
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
                      { slug: 'ASHYAD-STEEL', logo: '/images/asyad-steel-logo.png', ar: 'شركة أشياد ستيل', en: 'ASHYAD STEEL', enName: 'ASHYAD STEEL' },
                      { slug: 'tajalriayaa', logo: '', ar: 'شركة تاج الرعاية الطبي', en: 'Taj Al-Riaya Medical', enName: 'tajalriayaa' },
                      { slug: 'Planting-for-Contracting', logo: '', ar: 'شركة المزروعات للمقاولات', en: 'Planting for Contracting', enName: 'Planting for Contracting' },
                      { slug: 'Hassan-Misfer-Al-Zahrani', logo: '', ar: 'شركة حسن مسفر الزهراني وشركاه', en: 'Hassan Misfer Al-Zahrani & Partners', enName: 'Hassan Misfer Al-Zahrani & Partners Group' },
                      { slug: 'Al-Anjaz-Hotel-Village', logo: '', ar: 'شركة قرية الأنجاز الفندقية', en: 'Al-Anjaz Hotel Village', enName: 'Al-Anjaz Hotel Village' },
                      { slug: 'Arcon-Gulf-Contracting', logo: '', ar: 'شركة أركن الخليج للمقاولات', en: 'Arcon Gulf Contracting Co', enName: 'Arcon Gulf Contracting Co' },
                    ].map((c) => (
                      <Link key={c.slug} href={lp(`/bankruptcy/${c.slug}`)} className="group block p-4 md:p-5 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors">
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
                    href={lp("/contact")}
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
                          href={lp(`/services/${slug}`)}
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
