export interface CityData {
  slug: string;
  ar: {
    name: string;
    region: string;
    title: string;
    metaTitle: string;
    metaDesc: string;
    heroSubtitle: string;
    intro: string;
    whyUs: string[];
    services: { title: string; desc: string }[];
    courts: string[];
    faqs: { q: string; a: string }[];
  };
  en: {
    name: string;
    region: string;
    title: string;
    metaTitle: string;
    metaDesc: string;
    heroSubtitle: string;
    intro: string;
    whyUs: string[];
    services: { title: string; desc: string }[];
    courts: string[];
    faqs: { q: string; a: string }[];
  };
}

export const citiesData: CityData[] = [
  {
    slug: "riyadh",
    ar: {
      name: "الرياض",
      region: "منطقة الرياض",
      title: "محامي في الرياض",
      metaTitle: "محامي في الرياض | استشارات وقضايا تجارية",
      metaDesc: "خدمات قانونية للشركات والأفراد في الرياض، نقدمها من مقرنا الرئيسي ببريدة عن بُعد وبالحضور عند الحاجة، وتشمل القضايا التجارية والإفلاس والتحكيم.",
      heroSubtitle: "تمثيل قانوني احترافي أمام جميع محاكم الرياض والدوائر القضائية",
      intro: "تقدم شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس خدماتها القانونية المتخصصة لعملائها في مدينة الرياض، عاصمة المملكة العربية السعودية والمركز الاقتصادي الأكبر. نتعامل مع القضايا المعقدة أمام المحاكم التجارية والجزائية والعامة في الرياض بخبرة تتجاوز 20 عاماً في المجال القانوني.",
      whyUs: [
        "ترخيص وزارة العدل رقم 26/129 يخوّلنا الترافع أمام جميع محاكم الرياض",
        "خبرة متخصصة في القضايا التجارية والإفلاس أمام المحكمة التجارية بالرياض",
        "فريق قانوني متكامل يغطي جميع التخصصات القانونية",
        "متابعة مستمرة لمستجدات القضايا وتحديثات دورية للعملاء",
        "توكيل إلكتروني ومتابعة منتظمة للقضايا مع تحديثات دورية للعملاء",
      ],
      services: [
        { title: "القضايا التجارية", desc: "تمثيل أمام المحكمة التجارية بالرياض في نزاعات الشركات والعقود والديون التجارية" },
        { title: "إدارة إجراءات الإفلاس", desc: "إدارة إجراءات التسوية الوقائية وإعادة التنظيم المالي والتصفية أمام محكمة الإفلاس" },
        { title: "النزاعات العقارية", desc: "حل النزاعات العقارية وقضايا الملكية والإيجارات التجارية في الرياض" },
        { title: "التحكيم التجاري", desc: "تمثيل الأطراف في إجراءات التحكيم أمام المركز السعودي للتحكيم التجاري (تحكيم)" },
        { title: "القضايا الجنائية", desc: "الدفاع في القضايا الجزائية أمام المحكمة الجزائية بالرياض" },
        { title: "قضايا العمل", desc: "تمثيل أصحاب العمل والعمال أمام المحاكم العمالية بالرياض" },
      ],
      courts: [
        "المحكمة التجارية بالرياض",
        "المحكمة الجزائية بالرياض",
        "المحكمة العامة بالرياض",
        "المحكمة العمالية بالرياض",
        "محكمة الاستئناف بالرياض",
        "محكمة التنفيذ بالرياض",
        "ديوان المظالم (المحكمة الإدارية)",
      ],
      faqs: [
        { q: "هل لديكم مكتب في الرياض؟", a: "مقرنا الرئيسي في بريدة، ونقدم خدماتنا لعملائنا في الرياض عبر فريقنا المتخصص الذي يترافع بشكل مستمر أمام جميع محاكم الرياض. نحمل ترخيص وزارة العدل رقم 26/129 الذي يخوّلنا الترافع في جميع مناطق المملكة." },
        { q: "كيف أوكّل الشركة وأنا في الرياض؟", a: "يتم التوكيل إلكترونياً عبر منصة ناجز دون الحاجة للحضور الشخصي. كما يمكن التواصل عبر الهاتف أو الفيديو للاستشارات." },
        { q: "ما أنواع القضايا التي تتعاملون معها في الرياض؟", a: "نتعامل مع جميع أنواع القضايا: التجارية، الجنائية، العمالية، العقارية، الإفلاس، التحكيم، والقضايا الإدارية أمام ديوان المظالم." },
        { q: "كم تستغرق القضية التجارية في الرياض؟", a: "تختلف المدة حسب تعقيد القضية ونوعها. القضايا البسيطة قد تُحل خلال 3-6 أشهر، بينما القضايا المعقدة قد تستغرق سنة أو أكثر." },
      ],
    },
    en: {
      name: "Riyadh",
      region: "Riyadh Region",
      title: "Lawyer in Riyadh",
      metaTitle: "Lawyer in Riyadh | Al-Mushaiqeh Law Firm - Specialized Legal Services",
      metaDesc: "Legal services for clients in Riyadh, delivered from our Buraydah head office remotely and in person when required, including commercial and bankruptcy matters.",
      heroSubtitle: "Professional legal representation before all Riyadh courts and judicial bodies",
      intro: "Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration provides specialized legal services to clients in Riyadh, the capital of Saudi Arabia and its largest economic center. We handle complex cases before commercial, criminal, and general courts in Riyadh with over 20 years of legal experience.",
      whyUs: [
        "Ministry of Justice License No. 26/129 authorizing practice before all Riyadh courts",
        "Specialized expertise in commercial and bankruptcy cases before Riyadh Commercial Court",
        "Comprehensive legal team covering all legal specializations",
        "Continuous case monitoring with regular client updates",
        "Electronic appointment and structured case follow-up with regular client updates",
      ],
      services: [
        { title: "Commercial Cases", desc: "Representation before Riyadh Commercial Court in corporate disputes, contracts, and commercial debts" },
        { title: "Bankruptcy Administration", desc: "Managing preventive settlement, financial reorganization, and liquidation procedures" },
        { title: "Real Estate Disputes", desc: "Resolving property disputes and commercial lease cases in Riyadh" },
        { title: "Commercial Arbitration", desc: "Representing parties in arbitration proceedings before the Saudi Center for Commercial Arbitration" },
        { title: "Criminal Cases", desc: "Defense in criminal cases before Riyadh Criminal Court" },
        { title: "Labor Cases", desc: "Representing employers and employees before Riyadh Labor Courts" },
      ],
      courts: [
        "Riyadh Commercial Court",
        "Riyadh Criminal Court",
        "Riyadh General Court",
        "Riyadh Labor Court",
        "Riyadh Court of Appeal",
        "Riyadh Execution Court",
        "Board of Grievances (Administrative Court)",
      ],
      faqs: [
        { q: "Do you have an office in Riyadh?", a: "Our headquarters is in Buraydah, and we serve clients in Riyadh through our specialized team that regularly litigates before all Riyadh courts. We hold Ministry of Justice License No. 26/129 authorizing practice across all regions." },
        { q: "How can I appoint the firm from Riyadh?", a: "Appointment is done electronically through the Najiz platform without the need for personal attendance. Consultations are also available via phone or video call." },
        { q: "What types of cases do you handle in Riyadh?", a: "We handle all types of cases: commercial, criminal, labor, real estate, bankruptcy, arbitration, and administrative cases before the Board of Grievances." },
        { q: "How long does a commercial case take in Riyadh?", a: "Duration varies by case complexity. Simple cases may be resolved in 3-6 months, while complex cases may take a year or more." },
      ],
    },
  },
  {
    slug: "jeddah",
    ar: {
      name: "جدة",
      region: "منطقة مكة المكرمة",
      title: "محامي في جدة",
      metaTitle: "محامي في جدة | خدمات قانونية للشركات",
      metaDesc: "خدمات قانونية للشركات والأفراد في جدة، نقدمها من مقرنا الرئيسي ببريدة عن بُعد وبالحضور عند الحاجة، وتشمل القضايا التجارية والإفلاس والعقود.",
      heroSubtitle: "خدمات قانونية متخصصة في العاصمة التجارية للمملكة",
      intro: "تمتد خدماتنا القانونية إلى مدينة جدة، العاصمة التجارية للمملكة العربية السعودية وبوابتها الاقتصادية على البحر الأحمر. نقدم تمثيلاً قانونياً متميزاً في القضايا التجارية والبحرية والإفلاس، مع خبرة خاصة في النزاعات المتعلقة بالتجارة الدولية والنقل البحري.",
      whyUs: [
        "خبرة متخصصة في القضايا البحرية والتجارة الدولية",
        "تمثيل أمام المحكمة التجارية بجدة المختصة بالنزاعات البحرية",
        "فهم عميق لبيئة الأعمال في جدة ومتطلباتها القانونية",
        "إجراءات إلكترونية تسهّل التوكيل والمتابعة للعملاء في جدة",
        "خبرة في قضايا الاستيراد والتصدير والنقل الدولي",
      ],
      services: [
        { title: "القضايا التجارية والبحرية", desc: "تمثيل في نزاعات التجارة البحرية والنقل الدولي وعقود الشحن أمام المحكمة التجارية بجدة" },
        { title: "إدارة إجراءات الإفلاس", desc: "إدارة إجراءات الإفلاس للشركات التجارية في جدة بما يحفظ حقوق الدائنين والمدينين" },
        { title: "النزاعات العقارية", desc: "حل النزاعات العقارية التجارية والسكنية في جدة" },
        { title: "التحكيم التجاري الدولي", desc: "تمثيل في قضايا التحكيم الدولي المتعلقة بالتجارة عبر الحدود" },
        { title: "قضايا الشركات", desc: "تأسيس الشركات ونزاعات الشركاء وعمليات الاندماج والاستحواذ" },
        { title: "العقود التجارية الدولية", desc: "صياغة ومراجعة العقود التجارية الدولية وعقود التوكيل والتوزيع" },
      ],
      courts: [
        "المحكمة التجارية بجدة",
        "المحكمة الجزائية بجدة",
        "المحكمة العامة بجدة",
        "المحكمة العمالية بجدة",
        "محكمة الاستئناف بجدة",
        "محكمة التنفيذ بجدة",
      ],
      faqs: [
        { q: "هل تتعاملون مع القضايا البحرية في جدة؟", a: "نعم، لدينا خبرة متخصصة في القضايا البحرية بما فيها نزاعات الشحن والنقل البحري والتأمين البحري أمام المحكمة التجارية بجدة." },
        { q: "كيف أتواصل معكم من جدة؟", a: "يمكنك التواصل عبر الهاتف 0505149800 أو البريد الإلكتروني info@redwan.sa، والتوكيل يتم إلكترونياً عبر منصة ناجز." },
        { q: "هل تتعاملون مع قضايا التجارة الدولية؟", a: "نعم، نقدم خدمات قانونية متخصصة في التجارة الدولية والاستيراد والتصدير والنزاعات العابرة للحدود." },
        { q: "ما تكلفة الاستشارة القانونية؟", a: "تختلف التكلفة حسب نوع القضية. تواصل معنا لتقييم حالتك والاتفاق على الأتعاب بشكل شفاف." },
      ],
    },
    en: {
      name: "Jeddah",
      region: "Makkah Region",
      title: "Lawyer in Jeddah",
      metaTitle: "Lawyer in Jeddah | Al-Mushaiqeh Law Firm - Commercial & Maritime Legal Services",
      metaDesc: "Legal services for clients in Jeddah, delivered from our Buraydah head office remotely and in person when required, including commercial and bankruptcy matters.",
      heroSubtitle: "Specialized legal services in the commercial capital of Saudi Arabia",
      intro: "Our legal services extend to Jeddah, the commercial capital of Saudi Arabia and its economic gateway on the Red Sea. We provide distinguished legal representation in commercial, maritime, and bankruptcy cases, with special expertise in international trade and maritime transport disputes.",
      whyUs: [
        "Specialized expertise in maritime and international trade cases",
        "Representation before Jeddah Commercial Court specialized in maritime disputes",
        "Deep understanding of Jeddah's business environment and legal requirements",
        "Electronic procedures that simplify appointment and case follow-up for clients in Jeddah",
        "Experience in import/export and international transport cases",
      ],
      services: [
        { title: "Commercial & Maritime Cases", desc: "Representation in maritime trade disputes, international transport, and shipping contracts before Jeddah Commercial Court" },
        { title: "Bankruptcy Administration", desc: "Managing bankruptcy procedures for commercial companies in Jeddah protecting creditor and debtor rights" },
        { title: "Real Estate Disputes", desc: "Resolving commercial and residential real estate disputes in Jeddah" },
        { title: "International Commercial Arbitration", desc: "Representation in international arbitration cases related to cross-border trade" },
        { title: "Corporate Cases", desc: "Company formation, partner disputes, mergers and acquisitions" },
        { title: "International Commercial Contracts", desc: "Drafting and reviewing international commercial contracts, agency and distribution agreements" },
      ],
      courts: [
        "Jeddah Commercial Court",
        "Jeddah Criminal Court",
        "Jeddah General Court",
        "Jeddah Labor Court",
        "Jeddah Court of Appeal",
        "Jeddah Execution Court",
      ],
      faqs: [
        { q: "Do you handle maritime cases in Jeddah?", a: "Yes, we have specialized expertise in maritime cases including shipping disputes, maritime transport, and marine insurance before Jeddah Commercial Court." },
        { q: "How can I contact you from Jeddah?", a: "You can reach us by phone at 0505149800 or email info@redwan.sa. Appointment is done electronically through the Najiz platform." },
        { q: "Do you handle international trade cases?", a: "Yes, we provide specialized legal services in international trade, import/export, and cross-border disputes." },
        { q: "What is the cost of a legal consultation?", a: "Cost varies by case type. Contact us to evaluate your case and agree on fees transparently." },
      ],
    },
  },
  {
    slug: "buraydah",
    ar: {
      name: "بريدة",
      region: "منطقة القصيم",
      title: "محامي في بريدة",
      metaTitle: "محامي في بريدة | المقر الرئيسي و5 تراخيص",
      metaDesc: "المقر الرئيسي في بريدة بخمسة تراخيص تشمل المحاماة وأمانة الإفلاس وخبرة الإفلاس والتوثيق والتسجيل العيني. خدمات للأفراد والشركات في القصيم.",
      heroSubtitle: "المقر الرئيسي للشركة - 5 تراخيص مهنية في خدمتك بقلب القصيم",
      intro: "مدينة بريدة هي المقر الرئيسي لشركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. من موقعنا في طريق الملك عبدالله بحي الأفق، نقدم خدماتنا القانونية الشاملة لعملائنا في منطقة القصيم وجميع مناطق المملكة. نحمل 5 تراخيص مهنية (محاماة، أمانة إفلاس، خبرة إفلاس في مجال المحاماة، توثيق، تسجيل عيني) ونفخر بكوننا من أبرز شركات المحاماة في المنطقة بخبرة عائلية تتجاوز 20 عاماً في المجال القانوني. نتعامل مع أكثر من 12 تخصصاً قانونياً ونخدم عملاء من جميع مدن القصيم: عنيزة، الرس، البكيرية، المذنب، البدائع، والأسياح.",
      whyUs: [
        "المقر الرئيسي في بريدة - سهولة الوصول والتواصل المباشر مع المحامي",
        "5 تراخيص مهنية: محاماة (26/129)، أمانة إفلاس (142147)، خبير إفلاس في مجال المحاماة (247007)، توثيق، تسجيل عيني",
        "أكثر من 20 عاماً من الخبرة العائلية في خدمة عملاء منطقة القصيم",
        "معرفة عميقة بالبيئة القانونية والتجارية والعقارية في المنطقة",
        "معرفة عملية بإجراءات المحاكم والجهات التنفيذية في منطقة القصيم",
        "سجل حافل في إدارة 6+ إجراءات إفلاس ناجحة",
        "فريق متكامل يقدم 12 خدمة قانونية متخصصة من مقر واحد",
      ],
      services: [
        { title: "القضايا التجارية", desc: "تمثيل أمام المحكمة التجارية بالقصيم: نزاعات شراكات، تحصيل ديون، شيكات، وعقود تجارية" },
        { title: "إدارة إجراءات الإفلاس", desc: "أمين إفلاس معتمد بترخيص 142147: تسوية وقائية، إعادة تنظيم مالي، وتصفية" },
        { title: "القضايا الجنائية", desc: "دفاع أمام المحكمة الجزائية ببريدة: احتيال، تزوير، خيانة أمانة، وقضايا مالية" },
        { title: "النزاعات العقارية", desc: "نزاعات ملكية، إخلاء، فرز وتجزئة، وتسجيل عيني بترخيص معتمد" },
        { title: "قضايا العمل والعمال", desc: "فصل تعسفي، مستحقات نهاية خدمة، إصابات عمل أمام المحكمة العمالية ببريدة" },
        { title: "التوثيق", desc: "موثق معتمد: توثيق عقود، وكالات، إقرارات، وفسوخ بترخيص وزارة العدل" },
        { title: "التحكيم التجاري", desc: "تمثيل في هيئات التحكيم وصياغة شروط تحكيم وتنفيذ أحكام المحكمين" },
        { title: "الاستشارات القانونية", desc: "رأي قانوني متخصص للأفراد والشركات - حضوري أو عن بعد" },
      ],
      courts: [
        "المحكمة التجارية بالقصيم",
        "المحكمة الجزائية ببريدة",
        "المحكمة العامة ببريدة",
        "المحكمة العمالية ببريدة",
        "محكمة الأحوال الشخصية ببريدة",
        "محكمة الاستئناف بالقصيم",
        "محكمة التنفيذ ببريدة",
        "كتابة العدل الأولى والثانية ببريدة",
      ],
      faqs: [
        { q: "أين يقع مقر الشركة في بريدة؟", a: "مقرنا الرئيسي في طريق الملك عبدالله، حي الأفق، الدور الثاني، مكتب رقم 1، بريدة 52387. يسهل الوصول إلينا من جميع أحياء بريدة." },
        { q: "ما ساعات العمل في مكتب بريدة؟", a: "نستقبل العملاء من الأحد إلى الخميس، من الساعة 8 صباحاً حتى 4 مساءً. يمكن حجز مواعيد مسائية للحالات الطارئة." },
        { q: "هل أنتم أفضل مكتب محاماة في بريدة؟", a: "نحمل 5 تراخيص مهنية ونقدم 12 خدمة قانونية متخصصة من مقر واحد في بريدة، مع خبرة عائلية تتجاوز 20 عاماً. نترك لعملائنا الحكم على جودة خدماتنا." },
        { q: "هل تخدمون مدن القصيم الأخرى غير بريدة؟", a: "نعم، نخدم جميع مدن منطقة القصيم: عنيزة، الرس، البكيرية، المذنب، البدائع، الأسياح، رياض الخبراء، وغيرها. نترافع أمام جميع محاكم المنطقة." },
        { q: "كم تكلفة الاستشارة القانونية في بريدة؟", a: "تختلف التكلفة حسب نوع القضية وتعقيدها. تواصل معنا على 0505149800 لتحديد موعد ومعرفة التفاصيل." },
        { q: "هل تقدمون خدمة التوثيق في بريدة؟", a: "نعم، نحمل ترخيص توثيق معتمد من وزارة العدل. نوثق العقود والوكالات والإقرارات والفسوخ في مقرنا ببريدة." },
        { q: "ما القضايا الأكثر شيوعاً في بريدة والقصيم؟", a: "القضايا التجارية (نزاعات شراكات وديون)، العقارية (ملكية وإيجارات)، والعمالية (فصل ومستحقات) هي الأكثر شيوعاً في المنطقة." },
      ],
    },
    en: {
      name: "Buraydah",
      region: "Qassim Region",
      title: "Lawyer in Buraydah",
      metaTitle: "Lawyer in Buraydah | Al-Mushaiqeh Law Firm - Headquarters",
      metaDesc: "Lawyer in Buraydah - Headquarters of Al-Mushaiqeh Law Firm. 20+ years experience in commercial, bankruptcy, and criminal cases. King Abdullah Road, Al-Ufuq District.",
      heroSubtitle: "Firm headquarters - Comprehensive legal services in the heart of Qassim",
      intro: "Buraydah is the headquarters of Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration. From our location on King Abdullah Road in Al-Ufuq District, we provide comprehensive legal services to clients in the Qassim region and across the Kingdom. We pride ourselves on being one of the leading law firms in the region with over 20 years of experience.",
      whyUs: [
        "Headquarters in Buraydah - easy access and direct communication",
        "Over 20 years of experience serving Qassim region clients",
        "Deep knowledge of the legal and commercial environment in the region",
        "Practical knowledge of court and enforcement procedures in Qassim",
        "Complete team providing all legal services from one location",
      ],
      services: [
        { title: "Commercial Cases", desc: "Representation before Qassim Commercial Court in all types of commercial disputes" },
        { title: "Bankruptcy Administration", desc: "Managing all bankruptcy procedures as certified bankruptcy trustees" },
        { title: "Criminal Cases", desc: "Defense and representation before Buraydah Criminal Court" },
        { title: "Real Estate Disputes", desc: "Resolving all types of real estate disputes in Qassim region" },
        { title: "Labor Cases", desc: "Representing employers and employees before the Labor Court" },
        { title: "Legal Consultations", desc: "Comprehensive legal consultations for individuals and companies in all fields" },
      ],
      courts: [
        "Qassim Commercial Court",
        "Buraydah Criminal Court",
        "Buraydah General Court",
        "Buraydah Labor Court",
        "Qassim Court of Appeal",
        "Buraydah Execution Court",
      ],
      faqs: [
        { q: "Where is your office in Buraydah?", a: "Our office is on King Abdullah Road, Al-Ufuq District, 2nd Floor, Office No. 1, Buraydah 52387." },
        { q: "What are your working hours?", a: "We receive clients Sunday to Thursday, from 8 AM to 4 PM." },
        { q: "Can I visit without an appointment?", a: "We prefer booking an appointment via phone 0505149800 to ensure sufficient time is dedicated to serving you." },
        { q: "Do you serve other Qassim cities?", a: "Yes, we serve all cities in Qassim region including Unaizah, Ar Rass, Al Bukayriyah, Al Mithnab, and others." },
      ],
    },
  },
  {
    slug: "dammam",
    ar: {
      name: "الدمام",
      region: "المنطقة الشرقية",
      title: "محامي في الدمام",
      metaTitle: "محامي في الدمام | قضايا تجارية وإفلاس",
      metaDesc: "خدمات قانونية للشركات والأفراد في الدمام والمنطقة الشرقية، نقدمها من مقرنا الرئيسي ببريدة عن بُعد وبالحضور عند الحاجة.",
      heroSubtitle: "خدمات قانونية متخصصة في المنطقة الشرقية - قلب الصناعة السعودية",
      intro: "نقدم خدماتنا القانونية المتخصصة لعملائنا في الدمام والمنطقة الشرقية، المركز الصناعي والنفطي الأكبر في المملكة. نتعامل مع القضايا التجارية والصناعية المعقدة، بما فيها نزاعات العقود النفطية والصناعية والمقاولات الكبرى.",
      whyUs: [
        "خبرة في القضايا المتعلقة بالقطاع النفطي والصناعي",
        "تمثيل أمام المحكمة التجارية بالدمام",
        "فهم عميق لطبيعة العقود الصناعية والمقاولات في المنطقة الشرقية",
        "خبرة في نزاعات المناطق الصناعية والحرة",
        "تعامل مع قضايا الشركات متعددة الجنسيات",
      ],
      services: [
        { title: "القضايا التجارية والصناعية", desc: "تمثيل في نزاعات العقود الصناعية والنفطية والمقاولات أمام المحكمة التجارية بالدمام" },
        { title: "إدارة إجراءات الإفلاس", desc: "إدارة إجراءات الإفلاس للشركات الصناعية والتجارية في المنطقة الشرقية" },
        { title: "عقود المقاولات", desc: "صياغة ومراجعة وحل نزاعات عقود المقاولات والمشاريع الكبرى" },
        { title: "النزاعات العقارية", desc: "حل النزاعات العقارية التجارية والصناعية في الدمام والخبر والظهران" },
        { title: "قضايا العمل", desc: "تمثيل في النزاعات العمالية المتعلقة بالقطاع الصناعي والنفطي" },
        { title: "التحكيم التجاري", desc: "تمثيل في إجراءات التحكيم المتعلقة بالعقود الصناعية والتجارية" },
      ],
      courts: [
        "المحكمة التجارية بالدمام",
        "المحكمة الجزائية بالدمام",
        "المحكمة العامة بالدمام",
        "المحكمة العمالية بالدمام",
        "محكمة الاستئناف بالمنطقة الشرقية",
        "محكمة التنفيذ بالدمام",
      ],
      faqs: [
        { q: "هل تتعاملون مع قضايا القطاع النفطي؟", a: "نعم، لدينا خبرة في نزاعات العقود النفطية والصناعية بما فيها عقود المقاولات مع شركات النفط والبتروكيماويات." },
        { q: "هل تخدمون الخبر والظهران أيضاً؟", a: "نعم، نقدم خدماتنا في جميع مدن المنطقة الشرقية بما فيها الدمام والخبر والظهران والجبيل والأحساء." },
        { q: "كيف أوكّلكم من المنطقة الشرقية؟", a: "التوكيل يتم إلكترونياً عبر منصة ناجز. كما يمكن التواصل عبر الهاتف 0505149800 أو البريد info@redwan.sa." },
        { q: "هل تتعاملون مع نزاعات المقاولات الكبرى؟", a: "نعم، لدينا خبرة واسعة في نزاعات عقود المقاولات والمشاريع الكبرى بما فيها المطالبات المالية والتأخير وعيوب التنفيذ." },
      ],
    },
    en: {
      name: "Dammam",
      region: "Eastern Province",
      title: "Lawyer in Dammam",
      metaTitle: "Lawyer in Dammam | Al-Mushaiqeh Law Firm - Commercial & Industrial Cases",
      metaDesc: "Legal services for clients in Dammam and the Eastern Province, delivered from our Buraydah head office remotely and in person when required.",
      heroSubtitle: "Specialized legal services in the Eastern Province - the heart of Saudi industry",
      intro: "We provide specialized legal services to clients in Dammam and the Eastern Province, Saudi Arabia's largest industrial and petroleum center. We handle complex commercial and industrial cases, including oil contract disputes, industrial contracts, and major construction projects.",
      whyUs: [
        "Experience in oil & gas and industrial sector cases",
        "Representation before Dammam Commercial Court",
        "Deep understanding of industrial and construction contracts in the Eastern Province",
        "Experience in industrial and free zone disputes",
        "Handling cases involving multinational corporations",
      ],
      services: [
        { title: "Commercial & Industrial Cases", desc: "Representation in industrial, oil, and construction contract disputes before Dammam Commercial Court" },
        { title: "Bankruptcy Administration", desc: "Managing bankruptcy procedures for industrial and commercial companies in the Eastern Province" },
        { title: "Construction Contracts", desc: "Drafting, reviewing, and resolving disputes in construction and major project contracts" },
        { title: "Real Estate Disputes", desc: "Resolving commercial and industrial real estate disputes in Dammam, Khobar, and Dhahran" },
        { title: "Labor Cases", desc: "Representation in labor disputes related to the industrial and oil sectors" },
        { title: "Commercial Arbitration", desc: "Representation in arbitration proceedings related to industrial and commercial contracts" },
      ],
      courts: [
        "Dammam Commercial Court",
        "Dammam Criminal Court",
        "Dammam General Court",
        "Dammam Labor Court",
        "Eastern Province Court of Appeal",
        "Dammam Execution Court",
      ],
      faqs: [
        { q: "Do you handle oil sector cases?", a: "Yes, we have experience in oil and industrial contract disputes including construction contracts with oil and petrochemical companies." },
        { q: "Do you serve Khobar and Dhahran as well?", a: "Yes, we provide services across all Eastern Province cities including Dammam, Khobar, Dhahran, Jubail, and Al-Ahsa." },
        { q: "How can I appoint you from the Eastern Province?", a: "Appointment is done electronically through the Najiz platform. You can also contact us at 0505149800 or info@redwan.sa." },
        { q: "Do you handle major construction disputes?", a: "Yes, we have extensive experience in construction contract disputes including financial claims, delays, and execution defects." },
      ],
    },
  },
  {
    slug: "hail",
    ar: {
      name: "حائل",
      region: "منطقة حائل",
      title: "محامي في حائل",
      metaTitle: "محامي في حائل | قضايا تجارية وعقارية",
      metaDesc: "خدمات قانونية لأفراد وشركات حائل في القضايا التجارية والعقارية والعمالية والإفلاس، يقدمها مكتبنا المرخص من بريدة حضورياً وعن بُعد. اتصل 0505149800.",
      heroSubtitle: "ترافع أمام جميع محاكم حائل - قرب جغرافي وجلسات عن بعد",
      intro: "نقدم خدماتنا القانونية المتخصصة لعملائنا في منطقة حائل، المنطقة المجاورة لمنطقة القصيم. بحكم قربنا الجغرافي من حائل (حوالي 300 كم)، نوفر تمثيلاً قانونياً سريعاً وفعالاً أمام جميع محاكم المنطقة. كثير من الجلسات أصبحت تُعقد عن بُعد عبر منصة ناجز، مما يسهّل التعامل مع قضايا حائل بكفاءة عالية. نخدم عملاء من جميع مدن المنطقة بما فيها بقعاء، الشنان، الشملي، والحائط.",
      whyUs: [
        "قرب جغرافي من حائل (300 كم) يضمن سرعة الاستجابة والمتابعة",
        "ترخيص وزارة العدل رقم 26/129 يخوّلنا الترافع أمام جميع محاكم حائل",
        "خبرة في القضايا التجارية والزراعية والعقارية في منطقة حائل",
        "جلسات عن بعد عبر ناجز توفر الوقت والتكلفة على العميل",
        "أسعار تنافسية مقارنة بمكاتب الرياض وجدة",
        "تواصل مباشر وسهل مع المحامي المسؤول عن قضيتك",
        "5 تراخيص مهنية: محاماة، أمانة إفلاس، خبير إفلاس في مجال المحاماة، توثيق، تسجيل عيني",
      ],
      services: [
        { title: "القضايا التجارية", desc: "تمثيل أمام المحكمة التجارية بحائل: نزاعات شراكات، تحصيل ديون، عقود تجارية" },
        { title: "إدارة إجراءات الإفلاس", desc: "أمين إفلاس معتمد: تسوية وقائية، إعادة تنظيم مالي، وتصفية لشركات حائل" },
        { title: "القضايا الجنائية", desc: "دفاع أمام المحكمة الجزائية بحائل: احتيال، تزوير، خيانة أمانة" },
        { title: "النزاعات العقارية والزراعية", desc: "نزاعات ملكية، أراضي زراعية، عقود مزارع، وحقوق مياه في منطقة حائل" },
        { title: "قضايا العمل والعمال", desc: "فصل تعسفي، مستحقات، إصابات عمل أمام المحكمة العمالية بحائل" },
        { title: "التنفيذ والتحصيل", desc: "متابعة إجراءات التنفيذ وتحصيل الحقوق أمام محكمة التنفيذ بحائل" },
        { title: "الاستشارات القانونية", desc: "رأي قانوني متخصص لأفراد وشركات حائل - هاتفي أو حضوري" },
      ],
      courts: [
        "المحكمة التجارية بحائل",
        "المحكمة الجزائية بحائل",
        "المحكمة العامة بحائل",
        "المحكمة العمالية بحائل",
        "محكمة الأحوال الشخصية بحائل",
        "محكمة الاستئناف بحائل",
        "محكمة التنفيذ بحائل",
        "كتابة العدل بحائل",
      ],
      faqs: [
        { q: "كم تبعد بريدة عن حائل؟", a: "المسافة حوالي 300 كم (ساعتان ونصف). نتعامل مع قضايا حائل بشكل مستمر، وكثير من الجلسات تُعقد عن بعد عبر ناجز." },
        { q: "هل تحضرون جلسات المحاكم في حائل شخصياً؟", a: "نعم، نحضر جميع الجلسات الحضورية شخصياً. والجلسات المرئية (عن بعد) نحضرها من مقرنا في بريدة عبر منصة ناجز." },
        { q: "هل تتعاملون مع القضايا الزراعية في حائل؟", a: "نعم، لدينا خبرة في نزاعات الأراضي الزراعية، عقود المزارع، حقوق المياه، والإحياءات الزراعية في منطقة حائل." },
        { q: "ما أنواع القضايا الأكثر شيوعاً في حائل؟", a: "القضايا التجارية (نزاعات عقود وديون)، العقارية (ملكية وأراضي)، والزراعية (مزارع ومياه) هي الأكثر شيوعاً." },
        { q: "هل تخدمون مدن حائل الأخرى؟", a: "نعم، نخدم جميع محافظات منطقة حائل: بقعاء، الشنان، الشملي، الحائط، وغيرها. نترافع أمام جميع محاكم المنطقة." },
        { q: "كيف أحجز استشارة من حائل؟", a: "تواصل معنا على 0505149800 لحجز استشارة هاتفية أو مرئية عن بعد. ويمكنك زيارتنا في مقرنا ببريدة أيضاً." },
        { q: "هل أسعاركم مناسبة لعملاء حائل؟", a: "نقدم أسعاراً تنافسية مقارنة بمكاتب الرياض وجدة، مع نفس مستوى الجودة والتخصص. تواصل معنا لمعرفة التفاصيل." },
      ],
    },
    en: {
      name: "Hail",
      region: "Hail Region",
      title: "Lawyer in Hail",
      metaTitle: "Lawyer in Hail | Al-Mushaiqeh Law Firm - Comprehensive Legal Services",
      metaDesc: "Legal services for clients in Hail, delivered from our Buraydah head office remotely and in person when required.",
      heroSubtitle: "Professional legal services for our clients in Hail region",
      intro: "We provide specialized legal services to clients in Hail region, neighboring Qassim region. Due to our geographic proximity to Hail, we offer fast and effective legal representation before all regional courts, with easy communication and continuous follow-up.",
      whyUs: [
        "Geographic proximity to Hail ensuring quick response and follow-up",
        "Ministry of Justice license authorizing practice before all Hail courts",
        "Experience handling commercial and agricultural cases in the region",
        "Competitive pricing compared to major city firms",
        "Direct and easy communication with the lawyer handling your case",
      ],
      services: [
        { title: "Commercial Cases", desc: "Representation before Hail Commercial Court in contract and corporate disputes" },
        { title: "Bankruptcy Administration", desc: "Managing bankruptcy and financial reorganization procedures for companies in Hail" },
        { title: "Criminal Cases", desc: "Defense and representation before Hail Criminal Court" },
        { title: "Real Estate Disputes", desc: "Resolving real estate and agricultural disputes in Hail region" },
        { title: "Labor Cases", desc: "Representation in labor disputes before Hail Labor Court" },
        { title: "Execution", desc: "Following up execution procedures and rights collection before the Execution Court" },
      ],
      courts: [
        "Hail Commercial Court",
        "Hail Criminal Court",
        "Hail General Court",
        "Hail Labor Court",
        "Hail Court of Appeal",
        "Hail Execution Court",
      ],
      faqs: [
        { q: "How far is Buraydah from Hail?", a: "The distance between Buraydah and Hail is approximately 300 km, and we handle Hail cases regularly due to geographic proximity." },
        { q: "Do you attend court sessions in Hail?", a: "Yes, we attend all sessions in person before Hail courts. Many sessions are now also held remotely via the Najiz platform." },
        { q: "Do you handle agricultural cases?", a: "Yes, we have experience in disputes related to agricultural land, farm contracts, and water rights in Hail region." },
        { q: "How do I book a consultation?", a: "Contact us at 0505149800 or through the website contact form to book a phone or in-person consultation." },
      ],
    },
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return citiesData.find(c => c.slug === slug);
}
