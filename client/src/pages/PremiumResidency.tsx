import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { useMemo } from "react";
import { localePath } from "@/lib/localePath";
import {
  Globe, Home as HomeIcon, Briefcase, GraduationCap, Trophy, Building2,
  Users, Plane, ShieldCheck, Car, Heart, CheckCircle2, ArrowLeft, ArrowRight,
  FileText, HelpCircle, Phone
} from "lucide-react";

/* ─── Content Data ─── */
const content = {
  ar: {
    heroTitle: "الإقامة المميزة",
    heroSubtitle: "خدمات قانونية متكاملة للحصول على الإقامة المميزة في المملكة العربية السعودية",
    heroDesc: "نساعدك في اختيار المسار الأنسب وتجهيز ملفك وتقديم طلبك بأعلى فرص القبول.",
    ctaBtn: "احجز استشارة مجانية",
    whatIs: {
      title: "ما هي الإقامة المميزة؟",
      desc: "الإقامة المميزة هي نظام سعودي يمنح المقيمين إقامة طويلة الأمد (سنوية أو دائمة) بدون كفيل، مع مزايا استثنائية تشمل تملك العقارات والاستثمار والتنقل بحرية. تُدار عبر مركز الإقامة المميزة التابع لوزارة الداخلية وتهدف لاستقطاب الكفاءات والمستثمرين.",
    },
    tracks: {
      title: "مسارات الإقامة المميزة",
      subtitle: "7 مسارات متنوعة تناسب مختلف الفئات",
      items: [
        {
          num: "01",
          icon: "Globe",
          title: "إقامة محددة المدة (سنوية)",
          desc: "سنة قابلة للتجديد حتى 5 سنوات. الرسوم: 100,000 ريال/سنة مع تخفيض 2% تراكمي عند الدفع المقدم. تتطلب الشروط العامة فقط.",
          fee: "100,000 ريال/سنة",
        },
        {
          num: "02",
          icon: "ShieldCheck",
          title: "إقامة دائمة (غير محددة المدة)",
          desc: "إقامة مدى الحياة بدفعة واحدة. لا تتطلب شروطاً إضافية غير الشروط العامة.",
          fee: "800,000 ريال",
        },
        {
          num: "03",
          icon: "HomeIcon",
          title: "إقامة مالك عقار",
          desc: "مرتبطة بامتلاك عقار سكني بقيمة لا تقل عن 4 مليون ريال، غير مرهون وبدون تمويل عقاري، مع تقييم معتمد من منصة \"تقييم\".",
          fee: "4,000 ريال",
        },
        {
          num: "04",
          icon: "Briefcase",
          title: "إقامة مستثمر أعمال",
          desc: "إقامة دائمة مباشرة. تتطلب رخصة استثمار واستثمار لا يقل عن 7 مليون ريال خلال أول عامين مع توفير 10 وظائف.",
          fee: "4,000 ريال",
        },
        {
          num: "05",
          icon: "Building2",
          title: "إقامة رائد أعمال",
          desc: "فئتان: الأولى (5 سنوات) تتطلب جولة استثمارية ≥ 400,000 ريال وحصة ≥ 20%. الثانية (دائمة) تتطلب جولة ≥ 15 مليون ريال وحصة ≥ 10% مع 20 وظيفة.",
          fee: "4,000 ريال",
        },
        {
          num: "06",
          icon: "GraduationCap",
          title: "إقامة الكفاءة الاستثنائية",
          desc: "للمتخصصين في المجالات الصحية والعلمية والبحثية والتنفيذية. 5 سنوات قابلة للتحويل إلى دائمة عند إقامة 30 شهراً من 5 سنوات.",
          fee: "4,000 ريال",
        },
        {
          num: "07",
          icon: "Trophy",
          title: "إقامة الموهبة (رياضية/ثقافية)",
          desc: "للحاصلين على جوائز استثنائية أو المستوفين لمعايير الأهلية من وزارة الثقافة أو الرياضة. 5 سنوات قابلة للتحويل إلى دائمة.",
          fee: "4,000 ريال",
        },
      ],
    },
    benefits: {
      title: "مزايا الإقامة المميزة",
      items: [
        { icon: "Users", text: "إقامة مع الأسرة (الوالدين والأزواج والأبناء حتى 25 سنة)" },
        { icon: "Plane", text: "التنقل بحرية بدون تأشيرة خروج وعودة" },
        { icon: "ShieldCheck", text: "إعفاء من رسوم الوافدين والمرافقين" },
        { icon: "HomeIcon", text: "تملك العقارات السكنية والتجارية" },
        { icon: "Briefcase", text: "مزاولة الأعمال التجارية والاستثمار" },
        { icon: "Globe", text: "استخدام مسارات المواطنين في المنافذ" },
        { icon: "Building2", text: "الانتقال بين المنشآت بحرية دون نقل كفالة" },
        { icon: "Car", text: "تملك وسائل النقل واستقدام عمالة منزلية" },
      ],
    },
    requirements: {
      title: "الشروط العامة",
      items: [
        "جواز سفر ساري المفعول (6 أشهر على الأقل)",
        "إثبات الملاءة المالية",
        "خلو من السوابق الجنائية",
        "تقرير طبي يثبت الخلو من الأمراض المعدية (صادر خلال 6 أشهر)",
        "إقامة نظامية سارية (90 يوم على الأقل) إذا كان التقديم من داخل المملكة",
        "تأمين طبي ساري",
      ],
    },
    howWeHelp: {
      title: "كيف نساعدك؟",
      subtitle: "خدماتنا في مجال الإقامة المميزة",
      items: [
        { num: "01", title: "تحديد المسار الأنسب", desc: "نحلل وضعك المالي والمهني لاختيار مسار الإقامة الأنسب لك من بين المسارات السبعة المتاحة." },
        { num: "02", title: "تجهيز الملف والمستندات", desc: "نساعدك في تجهيز جميع المستندات المطلوبة وترجمتها وتصديقها وفق المتطلبات الرسمية." },
        { num: "03", title: "تقديم الطلب ومتابعته", desc: "نتولى تقديم طلبك عبر البوابة الرسمية ومتابعته حتى صدور القرار النهائي." },
        { num: "04", title: "الاعتراض على الرفض", desc: "في حال رفض الطلب، نقدم اعتراضاً مدعوماً بالأسانيد النظامية لإعادة النظر في القرار." },
        { num: "05", title: "الاستشارات المستمرة", desc: "نقدم استشارات حول الحفاظ على الإقامة وتجنب حالات الإلغاء والتحويل من مؤقتة إلى دائمة." },
      ],
    },
    cancellation: {
      title: "حالات إلغاء الإقامة المميزة",
      items: [
        "الإدانة بجريمة يترتب عليها سجن 60 يوماً أو غرامة 100,000 ريال فأكثر",
        "صدور حكم بالإبعاد عن المملكة",
        "تقديم معلومات غير صحيحة في الطلب",
        "عدم التقيد بالأنظمة واللوائح",
        "التنازل عن الإقامة أو الوفاة",
        "المصلحة العامة بقرار من مجلس المركز",
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        { q: "هل يمكن التقديم من خارج المملكة؟", a: "نعم، يمكن التقديم من خارج المملكة عبر البوابة الإلكترونية pr.gov.sa. لا يُشترط وجود إقامة سارية للتقديم من الخارج." },
        { q: "كم تستغرق مدة معالجة الطلب؟", a: "تختلف المدة حسب المسار ونوع الطلب، لكنها تتراوح عادة بين 30 إلى 90 يوماً من تاريخ استكمال جميع المتطلبات." },
        { q: "هل يمكن تحويل الإقامة من سنوية إلى دائمة؟", a: "نعم، يمكن التحويل بعد استيفاء شروط المسار الدائم ودفع الرسوم المقررة." },
        { q: "هل تشمل الإقامة المميزة أفراد العائلة؟", a: "نعم، تشمل الزوج/الزوجة والأبناء حتى 25 سنة والوالدين، مع إعفائهم من رسوم المرافقين." },
        { q: "ما الفرق بين الإقامة المميزة والإقامة العادية؟", a: "الإقامة المميزة لا تحتاج كفيل، وتمنح حق تملك العقار والاستثمار والتنقل بحرية، بينما الإقامة العادية مرتبطة بصاحب عمل محدد." },
        { q: "هل يمكن للمحامي تقديم الطلب نيابة عني؟", a: "نعم، يمكننا تقديم الطلب ومتابعته نيابة عنك بموجب توكيل رسمي." },
      ],
    },
    ctaSection: {
      title: "هل تحتاج مساعدة في الحصول على الإقامة المميزة؟",
      desc: "تواصل معنا للحصول على استشارة مجانية وتحديد المسار الأنسب لوضعك.",
      btn: "تواصل معنا الآن",
    },
  },
  en: {
    heroTitle: "Premium Residency",
    heroSubtitle: "Comprehensive legal services for obtaining Saudi Arabia's Premium Residency",
    heroDesc: "We help you choose the right track, prepare your application, and submit with the highest chances of approval.",
    ctaBtn: "Book a Free Consultation",
    whatIs: {
      title: "What is Premium Residency?",
      desc: "Saudi Premium Residency is a system that grants residents long-term residency (annual or permanent) without a sponsor, with exceptional benefits including property ownership, investment rights, and freedom of movement. Managed by the Premium Residency Center under the Ministry of Interior, it aims to attract talent and investors.",
    },
    tracks: {
      title: "Premium Residency Tracks",
      subtitle: "7 diverse tracks for different categories",
      items: [
        {
          num: "01",
          icon: "Globe",
          title: "Fixed-Term Residency (Annual)",
          desc: "One year renewable up to 5 years. Fee: SAR 100,000/year with 2% cumulative discount for advance payment. Requires general conditions only.",
          fee: "SAR 100,000/year",
        },
        {
          num: "02",
          icon: "ShieldCheck",
          title: "Permanent Residency (Indefinite)",
          desc: "Lifetime residency with a single payment. No additional requirements beyond general conditions.",
          fee: "SAR 800,000",
        },
        {
          num: "03",
          icon: "HomeIcon",
          title: "Property Owner Residency",
          desc: "Linked to ownership of residential property valued at SAR 4 million or more, unmortgaged, without real estate financing, with certified appraisal from 'Taqyeem'.",
          fee: "SAR 4,000",
        },
        {
          num: "04",
          icon: "Briefcase",
          title: "Business Investor Residency",
          desc: "Direct permanent residency. Requires investment license and investment of SAR 7 million+ within first two years, plus 10 jobs created.",
          fee: "SAR 4,000",
        },
        {
          num: "05",
          icon: "Building2",
          title: "Entrepreneur Residency",
          desc: "Two categories: First (5 years) requires funding round ≥ SAR 400,000 and ≥ 20% ownership. Second (permanent) requires ≥ SAR 15 million round and ≥ 10% ownership with 20 jobs.",
          fee: "SAR 4,000",
        },
        {
          num: "06",
          icon: "GraduationCap",
          title: "Exceptional Talent Residency",
          desc: "For specialists in healthcare, science, research, and executive roles. 5 years convertible to permanent after residing 30 months out of 5 years.",
          fee: "SAR 4,000",
        },
        {
          num: "07",
          icon: "Trophy",
          title: "Gifted Talent (Sports/Cultural)",
          desc: "For holders of exceptional awards or those meeting eligibility criteria from the Ministry of Culture or Sports. 5 years convertible to permanent.",
          fee: "SAR 4,000",
        },
      ],
    },
    benefits: {
      title: "Premium Residency Benefits",
      items: [
        { icon: "Users", text: "Reside with family (parents, spouses, children up to 25)" },
        { icon: "Plane", text: "Freedom of movement without exit/re-entry visa" },
        { icon: "ShieldCheck", text: "Exemption from expatriate and dependent fees" },
        { icon: "HomeIcon", text: "Own residential and commercial real estate" },
        { icon: "Briefcase", text: "Conduct business and invest freely" },
        { icon: "Globe", text: "Use citizen lanes at border crossings" },
        { icon: "Building2", text: "Transfer between employers without sponsorship transfer" },
        { icon: "Car", text: "Own vehicles and sponsor domestic workers" },
      ],
    },
    requirements: {
      title: "General Requirements",
      items: [
        "Valid passport (minimum 6 months remaining)",
        "Proof of financial solvency",
        "Clean criminal record",
        "Medical report confirming no communicable diseases (issued within 6 months)",
        "Valid residency permit (minimum 90 days) if applying from within Saudi Arabia",
        "Valid medical insurance",
      ],
    },
    howWeHelp: {
      title: "How We Help",
      subtitle: "Our Premium Residency Services",
      items: [
        { num: "01", title: "Identify the Best Track", desc: "We analyze your financial and professional situation to select the most suitable residency track from the seven available options." },
        { num: "02", title: "Document Preparation", desc: "We assist in preparing all required documents, translations, and attestations according to official requirements." },
        { num: "03", title: "Application & Follow-up", desc: "We handle submitting your application through the official portal and follow up until the final decision is issued." },
        { num: "04", title: "Appeal Rejection", desc: "If your application is rejected, we file an appeal supported by legal grounds for reconsideration." },
        { num: "05", title: "Ongoing Consultation", desc: "We provide advice on maintaining your residency, avoiding cancellation scenarios, and converting from temporary to permanent." },
      ],
    },
    cancellation: {
      title: "Residency Cancellation Cases",
      items: [
        "Conviction resulting in 60+ days imprisonment or SAR 100,000+ fine",
        "Deportation order issued",
        "Providing false information in the application",
        "Non-compliance with regulations",
        "Voluntary surrender or death",
        "Public interest by center board decision",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Can I apply from outside Saudi Arabia?", a: "Yes, you can apply from outside the Kingdom through the electronic portal pr.gov.sa. A valid residency permit is not required for applications from abroad." },
        { q: "How long does application processing take?", a: "Duration varies by track and application type, but typically ranges from 30 to 90 days from completing all requirements." },
        { q: "Can I convert from annual to permanent?", a: "Yes, conversion is possible after meeting the permanent track requirements and paying the prescribed fees." },
        { q: "Does Premium Residency cover family members?", a: "Yes, it covers spouse, children up to 25, and parents, with exemption from dependent fees." },
        { q: "What's the difference between Premium and regular residency?", a: "Premium Residency doesn't require a sponsor and grants property ownership, investment rights, and freedom of movement, while regular residency is tied to a specific employer." },
        { q: "Can a lawyer submit the application on my behalf?", a: "Yes, we can submit and follow up on your application on your behalf with an official power of attorney." },
      ],
    },
    ctaSection: {
      title: "Need Help Obtaining Premium Residency?",
      desc: "Contact us for a free consultation to determine the best track for your situation.",
      btn: "Contact Us Now",
    },
  },
  ur: {
    heroTitle: "پریمیم ریزیڈنسی",
    heroSubtitle: "سعودی عرب کی پریمیم ریزیڈنسی حاصل کرنے کے لیے مکمل قانونی خدمات",
    heroDesc: "ہم آپ کو صحیح ٹریک منتخب کرنے، درخواست تیار کرنے اور منظوری کے بہترین امکانات کے ساتھ جمع کرانے میں مدد کرتے ہیں۔",
    ctaBtn: "مفت مشاورت بک کریں",
    whatIs: {
      title: "پریمیم ریزیڈنسی کیا ہے؟",
      desc: "سعودی پریمیم ریزیڈنسی ایک ایسا نظام ہے جو مقیمین کو بغیر کفیل کے طویل مدتی اقامت (سالانہ یا مستقل) فراہم کرتا ہے، جس میں جائیداد کی ملکیت، سرمایہ کاری کے حقوق اور آزادانہ نقل و حرکت جیسے غیر معمولی فوائد شامل ہیں۔ یہ وزارت داخلہ کے تحت پریمیم ریزیڈنسی سینٹر کے ذریعے چلایا جاتا ہے اور اس کا مقصد ہنر مند افراد اور سرمایہ کاروں کو راغب کرنا ہے۔",
    },
    tracks: {
      title: "پریمیم ریزیڈنسی ٹریکس",
      subtitle: "مختلف زمروں کے لیے 7 متنوع ٹریکس",
      items: [
        { num: "01", icon: "Globe", title: "مقررہ مدت کی اقامت (سالانہ)", desc: "ایک سال، 5 سال تک قابل تجدید۔ فیس: 100,000 ریال/سال، پیشگی ادائیگی پر 2% مجموعی رعایت۔ صرف عمومی شرائط درکار ہیں۔", fee: "100,000 ریال/سال" },
        { num: "02", icon: "ShieldCheck", title: "مستقل اقامت (غیر محدود مدت)", desc: "ایک ادائیگی کے ساتھ تاحیات اقامت۔ عمومی شرائط کے علاوہ کوئی اضافی تقاضے نہیں۔", fee: "800,000 ریال" },
        { num: "03", icon: "HomeIcon", title: "جائیداد مالک اقامت", desc: "کم از کم 4 ملین ریال مالیت کی رہائشی جائیداد کی ملکیت سے منسلک، بغیر رہن، بغیر رئیل اسٹیٹ فنانسنگ، 'تقییم' سے مصدقہ تشخیص کے ساتھ۔", fee: "4,000 ریال" },
        { num: "04", icon: "Briefcase", title: "کاروباری سرمایہ کار اقامت", desc: "براہ راست مستقل اقامت۔ سرمایہ کاری لائسنس اور پہلے دو سالوں میں 7 ملین ریال+ سرمایہ کاری اور 10 ملازمتیں درکار ہیں۔", fee: "4,000 ریال" },
        { num: "05", icon: "Building2", title: "کاروباری اقامت", desc: "دو زمرے: پہلا (5 سال) فنڈنگ راؤنڈ ≥ 400,000 ریال اور ≥ 20% ملکیت درکار۔ دوسرا (مستقل) ≥ 15 ملین ریال راؤنڈ اور ≥ 10% ملکیت 20 ملازمتوں کے ساتھ۔", fee: "4,000 ریال" },
        { num: "06", icon: "GraduationCap", title: "غیر معمولی صلاحیت اقامت", desc: "صحت، سائنس، تحقیق اور ایگزیکٹو عہدوں کے ماہرین کے لیے۔ 5 سال، 5 سال میں سے 30 ماہ مقیم رہنے کے بعد مستقل میں تبدیل ہو سکتی ہے۔", fee: "4,000 ریال" },
        { num: "07", icon: "Trophy", title: "ہنر مند (کھیل/ثقافت)", desc: "غیر معمولی ایوارڈز کے حاملین یا وزارت ثقافت یا کھیل کے اہلیت معیار پورے کرنے والوں کے لیے۔ 5 سال، مستقل میں قابل تبدیل۔", fee: "4,000 ریال" },
      ],
    },
    benefits: {
      title: "پریمیم ریزیڈنسی کے فوائد",
      items: [
        { icon: "Users", text: "خاندان کے ساتھ رہائش (والدین، شریک حیات، 25 سال تک کے بچے)" },
        { icon: "Plane", text: "خروج/واپسی ویزا کے بغیر آزادانہ نقل و حرکت" },
        { icon: "ShieldCheck", text: "غیر ملکی اور منحصر فیس سے استثنیٰ" },
        { icon: "HomeIcon", text: "رہائشی اور تجارتی جائیداد کی ملکیت" },
        { icon: "Briefcase", text: "آزادانہ کاروبار اور سرمایہ کاری" },
        { icon: "Globe", text: "سرحدی گزرگاہوں پر شہریوں کی لائنوں کا استعمال" },
        { icon: "Building2", text: "کفالت کی منتقلی کے بغیر آجروں کے درمیان منتقلی" },
        { icon: "Car", text: "گاڑیوں کی ملکیت اور گھریلو ملازمین کی کفالت" },
      ],
    },
    requirements: {
      title: "عمومی شرائط",
      items: [
        "درست پاسپورٹ (کم از کم 6 ماہ باقی)",
        "مالی استطاعت کا ثبوت",
        "مجرمانہ ریکارڈ سے پاک",
        "متعدی بیماریوں سے پاک ہونے کی طبی رپورٹ (6 ماہ کے اندر جاری)",
        "سعودی عرب سے درخواست دینے کی صورت میں درست اقامت (کم از کم 90 دن)",
        "درست طبی بیمہ",
      ],
    },
    howWeHelp: {
      title: "ہم کیسے مدد کرتے ہیں",
      subtitle: "پریمیم ریزیڈنسی کے لیے ہماری خدمات",
      items: [
        { num: "01", title: "بہترین ٹریک کی شناخت", desc: "ہم آپ کی مالی اور پیشہ ورانہ صورتحال کا تجزیہ کر کے سات دستیاب آپشنز میں سے موزوں ترین ٹریک منتخب کرتے ہیں۔" },
        { num: "02", title: "دستاویزات کی تیاری", desc: "ہم تمام مطلوبہ دستاویزات، ترجمے اور تصدیقات سرکاری تقاضوں کے مطابق تیار کرنے میں مدد کرتے ہیں۔" },
        { num: "03", title: "درخواست اور فالو اپ", desc: "ہم سرکاری پورٹل کے ذریعے آپ کی درخواست جمع کراتے ہیں اور حتمی فیصلے تک فالو اپ کرتے ہیں۔" },
        { num: "04", title: "مسترد ہونے پر اپیل", desc: "اگر آپ کی درخواست مسترد ہو جائے تو ہم قانونی بنیادوں پر نظرثانی کے لیے اپیل دائر کرتے ہیں۔" },
        { num: "05", title: "مسلسل مشاورت", desc: "ہم آپ کی اقامت برقرار رکھنے، منسوخی سے بچنے اور عارضی سے مستقل میں تبدیل کرنے کے بارے میں مشورہ دیتے ہیں۔" },
      ],
    },
    cancellation: {
      title: "اقامت منسوخی کے معاملات",
      items: [
        "60+ دن قید یا 100,000+ ریال جرمانے کی سزا",
        "ملک بدر کرنے کا حکم",
        "درخواست میں غلط معلومات فراہم کرنا",
        "قوانین و ضوابط کی عدم پابندی",
        "رضاکارانہ دستبرداری یا وفات",
        "سینٹر بورڈ کے فیصلے سے عوامی مفاد",
      ],
    },
    faq: {
      title: "اکثر پوچھے جانے والے سوالات",
      items: [
        { q: "کیا میں سعودی عرب سے باہر سے درخواست دے سکتا ہوں؟", a: "جی ہاں، آپ الیکٹرانک پورٹل pr.gov.sa کے ذریعے باہر سے درخواست دے سکتے ہیں۔ بیرون ملک سے درخواستوں کے لیے درست اقامت ضروری نہیں۔" },
        { q: "درخواست کی کارروائی میں کتنا وقت لگتا ہے؟", a: "مدت ٹریک اور درخواست کی قسم کے مطابق مختلف ہوتی ہے، لیکن عام طور پر تمام تقاضے مکمل ہونے سے 30 سے 90 دن لگتے ہیں۔" },
        { q: "کیا میں سالانہ سے مستقل میں تبدیل کر سکتا ہوں؟", a: "جی ہاں، مستقل ٹریک کی شرائط پوری کرنے اور مقررہ فیس ادا کرنے کے بعد تبدیلی ممکن ہے۔" },
        { q: "کیا پریمیم ریزیڈنسی خاندان کے افراد کو شامل کرتی ہے؟", a: "جی ہاں، اس میں شریک حیات، 25 سال تک کے بچے اور والدین شامل ہیں، منحصر فیس سے استثنیٰ کے ساتھ۔" },
        { q: "پریمیم اور عام اقامت میں کیا فرق ہے؟", a: "پریمیم ریزیڈنسی کو کفیل کی ضرورت نہیں اور جائیداد کی ملکیت، سرمایہ کاری کے حقوق اور آزادانہ نقل و حرکت فراہم کرتی ہے، جبکہ عام اقامت مخصوص آجر سے منسلک ہوتی ہے۔" },
        { q: "کیا وکیل میری طرف سے درخواست جمع کرا سکتا ہے؟", a: "جی ہاں، ہم سرکاری وکالت نامے کے ساتھ آپ کی طرف سے درخواست جمع کرا سکتے ہیں اور فالو اپ کر سکتے ہیں۔" },
      ],
    },
    ctaSection: {
      title: "پریمیم ریزیڈنسی حاصل کرنے میں مدد چاہیے؟",
      desc: "اپنی صورتحال کے لیے بہترین ٹریک کا تعین کرنے کے لیے ہم سے مفت مشاورت کے لیے رابطہ کریں۔",
      btn: "ابھی رابطہ کریں",
    },
  },
};

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe, HomeIcon, Briefcase, GraduationCap, Trophy, Building2, Users, Plane, ShieldCheck, Car,
};

export default function PremiumResidency() {
  const { lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const c = lang === "ar" ? content.ar : lang === "ur" ? content.ur : content.en;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const seoSchema = useMemo(() => [
    schemas.breadcrumb([
      { name: lang === "ar" ? "الرئيسية" : "Home", url: "/" },
      { name: lang === "ar" ? "الإقامة المميزة" : "Premium Residency", url: "/premium-residency" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "ar" ? "خدمات الإقامة المميزة السعودية" : "Saudi Premium Residency Services",
      provider: {
        "@type": "LegalService",
        name: "شركة عبدالرحمن رضوان المشيقح للمحاماة",
        url: "https://redwan.sa",
      },
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
      description: c.heroSubtitle,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ], [lang]);

  useSEO({
    title: lang === "ar"
      ? "الإقامة المميزة السعودية | محامي إقامة مميزة - شركة المشيقح للمحاماة"
      : "Saudi Premium Residency | Premium Residency Lawyer - Almushiqeh Law Firm",
    description: lang === "ar"
      ? "خدمات قانونية متكاملة للحصول على الإقامة المميزة في السعودية. نساعدك في اختيار المسار الأنسب وتجهيز الملف وتقديم الطلب. 7 مسارات متاحة: دائمة، سنوية، مستثمر، رائد أعمال، كفاءة استثنائية."
      : "Comprehensive legal services for obtaining Saudi Premium Residency. We help you choose the right track, prepare documents, and submit your application. 7 tracks available: permanent, annual, investor, entrepreneur, exceptional talent.",
    keywords: lang === "ar"
      ? "إقامة مميزة, إقامة مميزة السعودية, محامي إقامة مميزة, مسارات الإقامة المميزة, إقامة دائمة السعودية, Premium Residency"
      : "premium residency saudi arabia, premium residency lawyer, saudi green card, permanent residency saudi, premium residency tracks",
    canonical: "/premium-residency",
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: whatRef, isVisible: whatVisible } = useScrollAnimation();
  const { ref: tracksRef, isVisible: tracksVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: helpRef, isVisible: helpVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 border border-[var(--color-gold)]/30 rotate-12" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-[var(--color-gold)]/20 -rotate-6" />
        </div>
        <div ref={heroRef} className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div
            className="max-w-3xl transition-all duration-700 ease-out"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe size={24} className="text-[var(--color-gold)]" />
              <span className="font-body text-sm text-white/60 uppercase tracking-wider">
                {lang === "ar" ? "خدمة متخصصة" : "Specialized Service"}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {c.heroTitle}
            </h1>
            <p className="font-heading text-lg md:text-xl text-[var(--color-gold)] mb-3">
              {c.heroSubtitle}
            </p>
            <p className="font-body text-white/70 text-base md:text-lg mb-8 max-w-2xl">
              {c.heroDesc}
            </p>
            <Link
              href={lp("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-white transition-colors duration-300"
            >
              <Phone size={16} />
              {c.ctaBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* What is Premium Residency */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={whatRef}
            className="max-w-4xl transition-all duration-700 ease-out"
            style={{ opacity: whatVisible ? 1 : 0, transform: whatVisible ? "translateY(0)" : "translateY(30px)" }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-6">
              {c.whatIs.title}
            </h2>
            <p className="font-body text-[var(--color-navy)]/70 text-base md:text-lg leading-relaxed">
              {c.whatIs.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-3">
              {c.tracks.title}
            </h2>
            <p className="font-body text-[var(--color-navy)]/60">{c.tracks.subtitle}</p>
          </div>
          <div ref={tracksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.tracks.items.map((track, idx) => {
              const Icon = iconMap[track.icon] || Globe;
              return (
                <div
                  key={track.num}
                  className="group p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  style={getStaggerStyle(tracksVisible, idx, 80)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-display text-3xl font-bold text-[var(--color-gold)]/30 leading-none">
                      {track.num}
                    </span>
                    <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                      <Icon size={18} className="text-[var(--color-gold)] group-hover:text-[var(--color-navy)] transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-2">
                    {track.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/60 mb-4 leading-relaxed">
                    {track.desc}
                  </p>
                  <div className="pt-3 border-t border-[var(--color-border)]">
                    <span className="font-heading text-sm font-semibold text-[var(--color-gold)]">
                      {lang === "ar" ? "الرسوم: " : "Fee: "}{track.fee}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-10">
            {c.benefits.title}
          </h2>
          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.benefits.items.map((item, idx) => {
              const Icon = iconMap[item.icon] || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-5 bg-[var(--color-cream)] border border-[var(--color-border)]"
                  style={getStaggerStyle(benefitsVisible, idx, 60)}
                >
                  <Icon size={20} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-[var(--color-navy)]/80">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* General Requirements */}
      <section className="py-16 md:py-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
            {c.requirements.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {c.requirements.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10">
                <CheckCircle2 size={18} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help - Numbered like assesseur */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-3">
              {c.howWeHelp.title}
            </h2>
            <p className="font-body text-[var(--color-navy)]/60">{c.howWeHelp.subtitle}</p>
          </div>
          <div ref={helpRef} className="space-y-6 max-w-3xl">
            {c.howWeHelp.items.map((item, idx) => (
              <div
                key={item.num}
                className="flex items-start gap-6 p-6 border-b border-[var(--color-border)] last:border-b-0"
                style={getStaggerStyle(helpVisible, idx, 100)}
              >
                <span className="font-display text-4xl md:text-5xl font-bold text-[var(--color-gold)]/20 leading-none flex-shrink-0 min-w-[60px]">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancellation Cases */}
      <section className="py-16 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-8">
            {c.cancellation.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {c.cancellation.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-[var(--color-border)]">
                <span className="w-6 h-6 bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  !
                </span>
                <span className="font-body text-sm text-[var(--color-navy)]/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-10">
            <HelpCircle size={24} className="inline text-[var(--color-gold)] mb-1 mr-2" />
            {c.faq.title}
          </h2>
          <div ref={faqRef} className="max-w-3xl space-y-4">
            {c.faq.items.map((item, idx) => (
              <details
                key={idx}
                className="group p-5 bg-[var(--color-cream)] border border-[var(--color-border)] cursor-pointer"
                style={getStaggerStyle(faqVisible, idx, 60)}
              >
                <summary className="font-heading text-base font-semibold text-[var(--color-navy)] list-none flex items-center justify-between">
                  {item.q}
                  <ArrowIcon size={16} className="text-[var(--color-gold)] group-open:rotate-90 transition-transform" />
                </summary>
                <p className="font-body text-sm text-[var(--color-navy)]/70 mt-3 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            {c.ctaSection.title}
          </h2>
          <p className="font-body text-white/70 mb-8 max-w-xl mx-auto">
            {c.ctaSection.desc}
          </p>
          <Link
            href={lp("/contact")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold hover:bg-white transition-colors duration-300"
          >
            <Phone size={18} />
            {c.ctaSection.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
