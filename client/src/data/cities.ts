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
      metaTitle: "محامي في الرياض | شركة المشيقح للمحاماة - استشارات قانونية متخصصة",
      metaDesc: "محامي متخصص في الرياض. خدمات قانونية شاملة تشمل القضايا التجارية، الإفلاس، النزاعات العقارية، والتحكيم. ترخيص وزارة العدل رقم 26/129. احجز استشارتك الآن.",
      heroSubtitle: "تمثيل قانوني احترافي أمام جميع محاكم الرياض والدوائر القضائية",
      intro: "تقدم شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس خدماتها القانونية المتخصصة لعملائها في مدينة الرياض، عاصمة المملكة العربية السعودية والمركز الاقتصادي الأكبر. نتعامل مع القضايا المعقدة أمام المحاكم التجارية والجزائية والعامة في الرياض بخبرة تتجاوز 20 عاماً في المجال القانوني.",
      whyUs: [
        "ترخيص وزارة العدل رقم 26/129 يخوّلنا الترافع أمام جميع محاكم الرياض",
        "خبرة متخصصة في القضايا التجارية والإفلاس أمام المحكمة التجارية بالرياض",
        "فريق قانوني متكامل يغطي جميع التخصصات القانونية",
        "متابعة مستمرة لمستجدات القضايا وتحديثات دورية للعملاء",
        "سجل حافل بالنجاحات في قضايا معقدة أمام محاكم الرياض",
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
      metaDesc: "Specialized lawyer in Riyadh. Comprehensive legal services including commercial cases, bankruptcy, real estate disputes, and arbitration. Ministry of Justice License No. 26/129.",
      heroSubtitle: "Professional legal representation before all Riyadh courts and judicial bodies",
      intro: "Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration provides specialized legal services to clients in Riyadh, the capital of Saudi Arabia and its largest economic center. We handle complex cases before commercial, criminal, and general courts in Riyadh with over 20 years of legal experience.",
      whyUs: [
        "Ministry of Justice License No. 26/129 authorizing practice before all Riyadh courts",
        "Specialized expertise in commercial and bankruptcy cases before Riyadh Commercial Court",
        "Comprehensive legal team covering all legal specializations",
        "Continuous case monitoring with regular client updates",
        "Proven track record of success in complex cases before Riyadh courts",
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
      metaTitle: "محامي في جدة | شركة المشيقح للمحاماة - خدمات قانونية تجارية وبحرية",
      metaDesc: "محامي متخصص في جدة. خبرة في القضايا التجارية والبحرية والإفلاس والنزاعات العقارية. ترخيص وزارة العدل رقم 26/129. استشارة قانونية احترافية.",
      heroSubtitle: "خدمات قانونية متخصصة في العاصمة التجارية للمملكة",
      intro: "تمتد خدماتنا القانونية إلى مدينة جدة، العاصمة التجارية للمملكة العربية السعودية وبوابتها الاقتصادية على البحر الأحمر. نقدم تمثيلاً قانونياً متميزاً في القضايا التجارية والبحرية والإفلاس، مع خبرة خاصة في النزاعات المتعلقة بالتجارة الدولية والنقل البحري.",
      whyUs: [
        "خبرة متخصصة في القضايا البحرية والتجارة الدولية",
        "تمثيل أمام المحكمة التجارية بجدة المختصة بالنزاعات البحرية",
        "فهم عميق لبيئة الأعمال في جدة ومتطلباتها القانونية",
        "شبكة علاقات مهنية واسعة مع الجهات القضائية في جدة",
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
      metaDesc: "Specialized lawyer in Jeddah. Expertise in commercial, maritime, bankruptcy cases and real estate disputes. Ministry of Justice License No. 26/129.",
      heroSubtitle: "Specialized legal services in the commercial capital of Saudi Arabia",
      intro: "Our legal services extend to Jeddah, the commercial capital of Saudi Arabia and its economic gateway on the Red Sea. We provide distinguished legal representation in commercial, maritime, and bankruptcy cases, with special expertise in international trade and maritime transport disputes.",
      whyUs: [
        "Specialized expertise in maritime and international trade cases",
        "Representation before Jeddah Commercial Court specialized in maritime disputes",
        "Deep understanding of Jeddah's business environment and legal requirements",
        "Extensive professional network with judicial authorities in Jeddah",
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
      metaTitle: "محامي في بريدة | شركة المشيقح للمحاماة - المقر الرئيسي",
      metaDesc: "محامي في بريدة - المقر الرئيسي لشركة المشيقح للمحاماة. خبرة 20+ سنة في القضايا التجارية والإفلاس والجنائية. طريق الملك عبدالله، حي الأفق.",
      heroSubtitle: "المقر الرئيسي للشركة - خدمات قانونية شاملة في قلب القصيم",
      intro: "مدينة بريدة هي المقر الرئيسي لشركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. من موقعنا في طريق الملك عبدالله بحي الأفق، نقدم خدماتنا القانونية الشاملة لعملائنا في منطقة القصيم وجميع مناطق المملكة. نفخر بكوننا من أبرز مكاتب المحاماة في المنطقة بخبرة تتجاوز 20 عاماً.",
      whyUs: [
        "المقر الرئيسي في بريدة - سهولة الوصول والتواصل المباشر",
        "أكثر من 20 عاماً من الخبرة في خدمة عملاء منطقة القصيم",
        "معرفة عميقة بالبيئة القانونية والتجارية في المنطقة",
        "علاقات مهنية راسخة مع الجهات القضائية في القصيم",
        "فريق متكامل يقدم جميع الخدمات القانونية من مقر واحد",
      ],
      services: [
        { title: "القضايا التجارية", desc: "تمثيل أمام المحكمة التجارية في القصيم في جميع أنواع النزاعات التجارية" },
        { title: "إدارة إجراءات الإفلاس", desc: "إدارة جميع إجراءات الإفلاس بصفتنا أمناء إفلاس معتمدين" },
        { title: "القضايا الجنائية", desc: "الدفاع والتمثيل أمام المحكمة الجزائية في بريدة" },
        { title: "النزاعات العقارية", desc: "حل جميع أنواع النزاعات العقارية في منطقة القصيم" },
        { title: "قضايا العمل", desc: "تمثيل أصحاب العمل والعمال أمام المحكمة العمالية" },
        { title: "الاستشارات القانونية", desc: "استشارات قانونية شاملة للأفراد والشركات في جميع المجالات" },
      ],
      courts: [
        "المحكمة التجارية بالقصيم",
        "المحكمة الجزائية ببريدة",
        "المحكمة العامة ببريدة",
        "المحكمة العمالية ببريدة",
        "محكمة الاستئناف بالقصيم",
        "محكمة التنفيذ ببريدة",
      ],
      faqs: [
        { q: "أين يقع مكتبكم في بريدة؟", a: "مقرنا في طريق الملك عبدالله، حي الأفق، الدور الثاني، مكتب رقم 1، بريدة 52387." },
        { q: "ما ساعات العمل؟", a: "نستقبل العملاء من الأحد إلى الخميس، من الساعة 8 صباحاً حتى 4 مساءً." },
        { q: "هل يمكنني الحضور بدون موعد؟", a: "نفضّل حجز موعد مسبق عبر الهاتف 0505149800 لضمان تخصيص الوقت الكافي لخدمتك." },
        { q: "هل تخدمون مدن القصيم الأخرى؟", a: "نعم، نخدم جميع مدن منطقة القصيم بما فيها عنيزة والرس والبكيرية والمذنب وغيرها." },
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
        "Established professional relationships with judicial authorities in Qassim",
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
      metaTitle: "محامي في الدمام | شركة المشيقح للمحاماة - قضايا تجارية ونفطية",
      metaDesc: "محامي متخصص في الدمام والمنطقة الشرقية. خبرة في القضايا التجارية والنفطية والإفلاس والعقود الصناعية. ترخيص وزارة العدل رقم 26/129.",
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
      metaDesc: "Specialized lawyer in Dammam and Eastern Province. Expertise in commercial, oil & gas, bankruptcy cases and industrial contracts. Ministry of Justice License No. 26/129.",
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
      metaTitle: "محامي في حائل | شركة المشيقح للمحاماة - خدمات قانونية شاملة",
      metaDesc: "محامي متخصص في حائل. خدمات قانونية تشمل القضايا التجارية والجنائية والعقارية والإفلاس. ترخيص وزارة العدل رقم 26/129. قريبون منك في منطقة حائل.",
      heroSubtitle: "خدمات قانونية احترافية لعملائنا في منطقة حائل",
      intro: "نقدم خدماتنا القانونية المتخصصة لعملائنا في منطقة حائل، المنطقة المجاورة لمنطقة القصيم. بحكم قربنا الجغرافي من حائل، نوفر تمثيلاً قانونياً سريعاً وفعالاً أمام جميع محاكم المنطقة، مع سهولة التواصل والمتابعة المستمرة.",
      whyUs: [
        "قرب جغرافي من حائل يضمن سرعة الاستجابة والمتابعة",
        "ترخيص وزارة العدل يخوّلنا الترافع أمام جميع محاكم حائل",
        "خبرة في التعامل مع القضايا التجارية والزراعية في المنطقة",
        "أسعار تنافسية مقارنة بمكاتب المدن الكبرى",
        "تواصل مباشر وسهل مع المحامي المسؤول عن قضيتك",
      ],
      services: [
        { title: "القضايا التجارية", desc: "تمثيل أمام المحكمة التجارية في حائل في نزاعات العقود والشركات" },
        { title: "إدارة إجراءات الإفلاس", desc: "إدارة إجراءات الإفلاس وإعادة التنظيم المالي للشركات في حائل" },
        { title: "القضايا الجنائية", desc: "الدفاع والتمثيل أمام المحكمة الجزائية في حائل" },
        { title: "النزاعات العقارية", desc: "حل النزاعات العقارية والزراعية في منطقة حائل" },
        { title: "قضايا العمل", desc: "تمثيل في النزاعات العمالية أمام المحكمة العمالية بحائل" },
        { title: "التنفيذ", desc: "متابعة إجراءات التنفيذ وتحصيل الحقوق أمام محكمة التنفيذ" },
      ],
      courts: [
        "المحكمة التجارية بحائل",
        "المحكمة الجزائية بحائل",
        "المحكمة العامة بحائل",
        "المحكمة العمالية بحائل",
        "محكمة الاستئناف بحائل",
        "محكمة التنفيذ بحائل",
      ],
      faqs: [
        { q: "كم تبعد بريدة عن حائل؟", a: "المسافة بين بريدة وحائل حوالي 300 كم، ونتعامل مع قضايا حائل بشكل مستمر بحكم القرب الجغرافي." },
        { q: "هل تحضرون جلسات المحاكم في حائل؟", a: "نعم، نحضر جميع الجلسات شخصياً أمام محاكم حائل. كما أن كثيراً من الجلسات أصبحت تُعقد عن بُعد عبر منصة ناجز." },
        { q: "هل تتعاملون مع القضايا الزراعية؟", a: "نعم، لدينا خبرة في النزاعات المتعلقة بالأراضي الزراعية وعقود المزارع والمياه في منطقة حائل." },
        { q: "كيف أحجز استشارة؟", a: "تواصل معنا عبر الهاتف 0505149800 أو عبر نموذج التواصل في الموقع لحجز استشارة هاتفية أو حضورية." },
      ],
    },
    en: {
      name: "Hail",
      region: "Hail Region",
      title: "Lawyer in Hail",
      metaTitle: "Lawyer in Hail | Al-Mushaiqeh Law Firm - Comprehensive Legal Services",
      metaDesc: "Specialized lawyer in Hail. Legal services including commercial, criminal, real estate cases and bankruptcy. Ministry of Justice License No. 26/129. Close to you in Hail region.",
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
