import { useScrollAnimation, getStaggerStyle, getFadeStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useMemo } from "react";
import { ChevronDown, MessageCircleQuestion, Phone } from "lucide-react";
import { useSEO, schemas } from "@/hooks/useSEO";

const faqData = {
  ar: {
    pageTitle: "الأسئلة الشائعة",
    pageSubtitle: "إجابات على أكثر الأسئلة شيوعاً حول خدماتنا القانونية",
    breadcrumb: "الرئيسية",
    categories: [
      {
        title: "الاستشارات والتوكيل",
        questions: [
          {
            q: "كيف أحجز استشارة قانونية؟",
            a: "يمكنك حجز استشارة قانونية من خلال التواصل معنا عبر الهاتف (0505149800) أو عبر نموذج التواصل في الموقع، أو من خلال واتساب. سيتم تحديد موعد مناسب لك خلال 24 ساعة عمل.",
          },
          {
            q: "ما هي تكلفة الاستشارة القانونية؟",
            a: "تختلف تكلفة الاستشارة حسب نوع القضية وتعقيدها. نقدم استشارة أولية لتقييم الحالة، ويتم الاتفاق على الأتعاب بشكل شفاف قبل البدء في أي إجراء قانوني.",
          },
          {
            q: "كيف أوكّل الشركة في قضيتي؟",
            a: "يتم التوكيل عبر منصة ناجز الإلكترونية لإصدار وكالة إلكترونية. سنرشدك خلال جميع الخطوات المطلوبة -إن احتجت لذلك-.",
          },
          {
            q: "هل يمكن التواصل عن بُعد؟",
            a: "نعم، نقدم خدمات الاستشارات عن بُعد عبر الاتصال المرئي أو الهاتفي. كما يمكن إتمام إجراءات التوكيل إلكترونياً عبر منصة ناجز.",
          },
        ],
      },
      {
        title: "القضايا والإجراءات",
        questions: [
          {
            q: "ما هي المدة المتوقعة للقضية؟",
            a: "تختلف مدة القضية حسب نوعها وتعقيدها والمحكمة المختصة. القضايا البسيطة قد تستغرق 2-4 أشهر، بينما القضايا المعقدة قد تمتد لسنة أو أكثر. نحرص على إطلاعك بالمستجدات أولاً بأول.",
          },
          {
            q: "ما هي أنواع القضايا التي تتعاملون معها؟",
            a: "نتعامل مع مختلف أنواع القضايا: المدنية والتجارية، العمالية، الجنائية، العقارية، الأحوال الشخصية، الإفلاس والتصفية، التحكيم، والاستشارات القانونية المتنوعة.",
          },
          {
            q: "هل تترافعون أمام جميع المحاكم؟",
            a: "نعم، نحمل ترخيص محاماة رقم 26/129 من وزارة العدل يخوّلنا الترافع أمام جميع المحاكم والدوائر القضائية في المملكة العربية السعودية بمختلف درجاتها.",
          },
          {
            q: "كيف أتابع مستجدات قضيتي؟",
            a: "نوفر لعملائنا تحديثات دورية عبر الهاتف أو البريد الإلكتروني. كما يمكنك التواصل مع المحامي المسؤول عن قضيتك في أي وقت خلال ساعات العمل للاستفسار عن المستجدات.",
          },
        ],
      },
      {
        title: "الإفلاس والتصفية",
        questions: [
          {
            q: "ما هي خدمات أمين الإفلاس؟",
            a: "نقدم خدمات أمانة الإفلاس الشاملة بترخيص رقم 142147 من لجنة الإفلاس، وتشمل: التسوية الوقائية، إعادة التنظيم المالي، التصفية، وإدارة أصول المدين وفق نظام الإفلاس السعودي.",
          },
          {
            q: "متى يحق لي تقديم طلب إفلاس؟",
            a: "يحق لك تقديم طلب إفلاس عندما تكون غير قادر على سداد ديونك المستحقة أو عندما تتوقع عدم القدرة على السداد مستقبلاً. ننصح بالتواصل معنا مبكراً لدراسة الخيارات المتاحة قبل تفاقم الوضع.",
          },
          {
            q: "ما الفرق بين التسوية الوقائية وإعادة التنظيم؟",
            a: "التسوية الوقائية تتم قبل التعثر الفعلي وتهدف لمنعه، بينما إعادة التنظيم تتم بعد التعثر وتهدف لإعادة هيكلة الديون. كلا الإجراءين يهدفان لاستمرار النشاط التجاري مع حماية حقوق الدائنين.",
          },
        ],
      },
      {
        title: "التوثيق والتسجيل العيني",
        questions: [
          {
            q: "ما هي خدمات التوثيق المتاحة؟",
            a: "نقدم خدمات التوثيق الرسمي بترخيص رقم 45/57029 من وزارة العدل، وتشمل: توثيق العقود، الإقرارات، التفويضات، عقود الشراكة، وجميع المستندات القانونية التي تتطلب توثيقاً رسمياً.",
          },
          {
            q: "ما هو التسجيل العيني للعقار؟",
            a: "التسجيل العيني هو نظام لتسجيل الملكية العقارية يوفر حماية قانونية أقوى لملاك العقارات. نقدم هذه الخدمة بترخيص رقم 2223002594 من الهيئة العامة للعقار.",
          },
        ],
      },
    ],
    ctaTitle: "لم تجد إجابة لسؤالك؟",
    ctaDesc: "تواصل معنا مباشرة وسنسعد بمساعدتك",
    ctaButton: "تواصل معنا",
    ctaPhone: "اتصل بنا",
  },
  en: {
    pageTitle: "Frequently Asked Questions",
    pageSubtitle: "Answers to the most common questions about our legal services",
    breadcrumb: "Home",
    categories: [
      {
        title: "Consultations & Engagement",
        questions: [
          {
            q: "How can I book a legal consultation?",
            a: "You can book a legal consultation by contacting us via phone (0505149800), through the contact form on our website, or via WhatsApp. An appointment will be scheduled within 24 business hours.",
          },
          {
            q: "What is the cost of a legal consultation?",
            a: "Consultation costs vary depending on the type and complexity of the case. We offer an initial consultation to assess your situation, and fees are agreed upon transparently before any legal action begins.",
          },
          {
            q: "How do I engage the firm for my case?",
            a: "Engagement is done through the Najiz electronic platform for issuing an electronic power of attorney. We will guide you through all required steps if needed.",
          },
          {
            q: "Can I communicate remotely?",
            a: "Yes, we offer remote consultation services via video call or phone. Engagement procedures can also be completed electronically through the Najiz platform.",
          },
        ],
      },
      {
        title: "Cases & Procedures",
        questions: [
          {
            q: "What is the expected duration of a case?",
            a: "Case duration varies depending on type, complexity, and the competent court. Simple cases may take 2-4 months, while complex cases may extend to a year or more. We ensure you are kept updated on all developments.",
          },
          {
            q: "What types of cases do you handle?",
            a: "We handle various types of cases: civil and commercial, labor, criminal, real estate, personal status, bankruptcy and liquidation, arbitration, and diverse legal consultations.",
          },
          {
            q: "Do you litigate before all courts?",
            a: "Yes, we hold legal practice license No. 26/129 from the Ministry of Justice, authorizing us to litigate before all courts and judicial circuits in the Kingdom of Saudi Arabia at all levels.",
          },
          {
            q: "How can I follow up on my case progress?",
            a: "We provide our clients with regular updates via phone or email. You can also contact the attorney responsible for your case at any time during business hours to inquire about developments.",
          },
        ],
      },
      {
        title: "Bankruptcy & Liquidation",
        questions: [
          {
            q: "What are bankruptcy trustee services?",
            a: "We provide comprehensive bankruptcy trustee services under license No. 142147 from the Bankruptcy Commission, including: preventive settlement, financial reorganization, liquidation, and debtor asset management under Saudi Bankruptcy Law.",
          },
          {
            q: "When am I eligible to file for bankruptcy?",
            a: "You may file for bankruptcy when you are unable to pay your due debts or when you anticipate inability to pay in the future. We recommend contacting us early to study available options before the situation worsens.",
          },
          {
            q: "What is the difference between preventive settlement and reorganization?",
            a: "Preventive settlement occurs before actual default and aims to prevent it, while reorganization occurs after default and aims to restructure debts. Both procedures aim to continue business activity while protecting creditors' rights.",
          },
        ],
      },
      {
        title: "Notarization & Real Estate Registration",
        questions: [
          {
            q: "What notarization services are available?",
            a: "We provide official notarization services under license No. 45/57029 from the Ministry of Justice, including: contract notarization, declarations, authorizations, partnership agreements, and all legal documents requiring official notarization.",
          },
          {
            q: "What is real estate registration?",
            a: "Real estate registration is a system for registering property ownership that provides stronger legal protection for property owners. We offer this service under license No. 2223002594 from the General Authority for Real Estate.",
          },
        ],
      },
    ],
    ctaTitle: "Didn't find an answer to your question?",
    ctaDesc: "Contact us directly and we'll be happy to help",
    ctaButton: "Contact Us",
    ctaPhone: "Call Us",
  },
};

function AccordionItem({ question, answer, isOpen, onClick, index, isVisible }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="border-b border-gray-200 last:border-b-0"
      style={getStaggerStyle(isVisible, index, 60)}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 px-6 text-right hover:bg-[var(--color-cream)] transition-colors duration-200 group"
      >
        <span className="font-medium text-[var(--color-navy)] text-base md:text-lg leading-relaxed flex-1 text-start">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--color-gold)] shrink-0 ms-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-5 text-gray-600 leading-relaxed text-sm md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { lang, isRTL } = useTranslation();
  const data = faqData[lang];

  // Collect all FAQ questions for Schema
  const faqQuestions = useMemo(() => {
    const questions: { question: string; answer: string }[] = [];
    data.categories.forEach(cat => {
      cat.questions.forEach(q => {
        questions.push({ question: q.q, answer: q.a });
      });
    });
    return questions;
  }, [data]);

  const seoSchema = useMemo(() => [
    schemas.breadcrumb([{ name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' }, { name: lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', url: '/faq' }]),
    schemas.faqPage(faqQuestions)
  ], [lang, faqQuestions]);
  useSEO({
    title: lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
    description: lang === 'ar'
      ? 'إجابات على أكثر الأسئلة شيوعاً حول خدماتنا القانونية: الاستشارات، التوكيل، الإفلاس، التوثيق، والتسجيل العيني.'
      : 'Answers to the most frequently asked questions about our legal services: consultations, power of attorney, bankruptcy, notarization, and real estate registration.',
    keywords: lang === 'ar'
      ? 'أسئلة شائعة، محامي، استشارة قانونية، توكيل محامي، إفلاس، توثيق'
      : 'FAQ, lawyer, legal consultation, power of attorney, bankruptcy, notarization',
    canonical: '/faq',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container relative z-10" ref={heroRef}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8" style={getFadeStyle(heroVisible)}>
            <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">
              {data.breadcrumb}
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">{data.pageTitle}</span>
          </nav>

          <div style={getFadeStyle(heroVisible)}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {data.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              {data.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-white" ref={faqRef}>
        <div className="container max-w-4xl">
          {data.categories.map((category, catIdx) => (
            <div key={catIdx} className="mb-12 last:mb-0" style={getStaggerStyle(faqVisible, catIdx, 150)}>
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-[var(--color-gold)] rounded-full" />
                <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">
                  {category.title}
                </h2>
              </div>

              {/* Questions */}
              <div className="bg-[var(--color-cream)]/30 border border-gray-100 rounded-sm overflow-hidden">
                {category.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  return (
                    <AccordionItem
                      key={key}
                      question={item.q}
                      answer={item.a}
                      isOpen={!!openItems[key]}
                      onClick={() => toggleItem(key)}
                      index={qIdx}
                      isVisible={faqVisible}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-navy)]" ref={ctaRef}>
        <div className="container text-center" style={getFadeStyle(ctaVisible)}>
          <MessageCircleQuestion className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            {data.ctaTitle}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
            {data.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-semibold px-8 py-3.5 transition-all duration-200 active:scale-[0.97]"
            >
              {data.ctaButton}
            </Link>
            <a
              href="tel:+966505149800"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-[var(--color-gold)] text-white hover:text-[var(--color-gold)] font-semibold px-8 py-3.5 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              {data.ctaPhone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
