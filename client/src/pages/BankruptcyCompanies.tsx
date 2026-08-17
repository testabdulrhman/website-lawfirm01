import { Link } from "wouter";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  FileSearch,
  Landmark,
  Scale,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

import { useSEO, schemas } from "@/hooks/useSEO";
import { trackBookConsultation } from "@/lib/analytics";

const reviewSignals = [
  "تزايد الالتزامات المستحقة مع ضغط على التدفقات النقدية",
  "تعدد المطالبات أو إجراءات التنفيذ أو النزاعات مع الدائنين",
  "الحاجة إلى إعادة جدولة الديون أو التفاوض الجماعي مع أصحاب المصلحة",
  "وجود نشاط قابل للاستمرار، لكن هيكل الديون يعيق استقراره",
  "الحاجة إلى تقييم منظم قبل اتخاذ قرار الاستمرار أو التصفية",
];

const reviewDocuments = [
  "السجل التجاري وعقد التأسيس",
  "القوائم المالية والبيانات المحاسبية المتاحة",
  "بيان الديون ومواعيد استحقاقها والضمانات المرتبطة بها",
  "بيان الأصول والتدفقات النقدية والعقود الجوهرية",
  "الدعاوى والأحكام وطلبات التنفيذ والمطالبات القائمة",
  "أي خطط سابقة للتسوية أو إعادة الهيكلة ومراسلات الدائنين",
];

const possiblePaths = [
  {
    title: "إعادة هيكلة تعاقدية قبل الإجراء",
    text: "قد تسمح الوقائع بالتفاوض على إعادة جدولة الديون أو تعديل الالتزامات باتفاق الأطراف، من دون افتتاح إجراء إفلاس، إذا كان ذلك ممكناً ومناسباً للشركة ودائنيها.",
    icon: Waypoints,
  },
  {
    title: "التسوية الوقائية",
    text: "تهدف إلى تيسير اتفاق المدين مع دائنيه على تسوية الديون، مع احتفاظ المدين بإدارة نشاطه وفق أحكام النظام.",
    icon: ShieldCheck,
    href: "/bankruptcy/procedures/preventive-settlement",
  },
  {
    title: "إعادة التنظيم المالي",
    text: "تهدف إلى إعادة تنظيم النشاط والديون من خلال اتفاق مع الدائنين تحت إشراف أمين إعادة التنظيم المالي.",
    icon: Scale,
    href: "/bankruptcy/procedures/financial-reorganization",
  },
  {
    title: "التصفية",
    text: "تُدرس عندما لا يكون استمرار النشاط أو إعادة تنظيمه خياراً عملياً، وتهدف إلى حصر المطالبات وبيع الأصول وتوزيع الحصيلة تحت إدارة الأمين.",
    icon: Landmark,
    href: "/bankruptcy/procedures/liquidation",
  },
];

const reviewSteps = [
  {
    title: "التحقق من التعارض والصفة",
    text: "تحديد صفة طالب المشورة والأطراف ذات العلاقة قبل استلام تفاصيل الحالة أو إسناد العمل.",
  },
  {
    title: "جمع المعلومات الجوهرية",
    text: "مراجعة المركز المالي والديون والأصول والضمانات والعقود والإجراءات القضائية ذات الصلة.",
  },
  {
    title: "مقارنة البدائل",
    text: "بيان الخيارات التعاقدية والنظامية المتاحة وآثار كل خيار ومتطلباته ومخاطره الأولية.",
  },
  {
    title: "خطة العمل والتنفيذ",
    text: "تحديد المستندات والخطوات والمسؤوليات، ثم إعداد الطلب أو المقترح والتمثيل القانوني إذا تقرر المضي.",
  },
];

const faqItems = [
  {
    question: "هل كل شركة متعثرة يجب أن تفتتح إجراء إفلاس؟",
    answer:
      "لا. التعثر لا يقود تلقائياً إلى إجراء واحد. قد يكون الحل تعاقدياً، أو قد يكون أحد إجراءات الإفلاس مناسباً. يتطلب القرار دراسة وضع الشركة المالي والقانوني، واستمرارية النشاط، وهيكل الديون، ومواقف الدائنين.",
  },
  {
    question: "هل يمكن إعادة هيكلة ديون الشركة قبل الوصول إلى الإفلاس؟",
    answer:
      "قد يكون ذلك ممكناً من خلال اتفاقات مع الدائنين أو إعادة ترتيب الالتزامات، بحسب العقود والضمانات وموافقة الأطراف. وإذا لم يكن الحل التعاقدي كافياً، تُدرس الإجراءات النظامية المتاحة.",
  },
  {
    question: "متى يفضّل طلب دراسة مبكرة لوضع الشركة؟",
    answer:
      "عند ظهور ضغط مستمر على السيولة، أو صعوبة الوفاء بالالتزامات في مواعيدها، أو تعدد إجراءات التنفيذ، أو الحاجة إلى تفاوض منظم مع عدد من الدائنين. الدراسة المبكرة توسع مساحة الخيارات المتاحة، لكنها لا تضمن نتيجة بعينها.",
  },
  {
    question: "ما الفرق بين محامي الإفلاس وأمين الإفلاس؟",
    answer:
      "محامي الإفلاس يقدم المشورة ويمثل الشركة أو الدائن بصفته عميلاً. أما أمين الإفلاس فيُعيّن من قبل المحكمة لإدارة الإجراء بصورة مستقلة وفق النظام. لا يجمع المكتب بين الصفتين في القضية نفسها عند وجود تعارض.",
  },
  {
    question: "هل تقدمون الخدمة للشركات في الرياض وجدة والدمام؟",
    answer:
      "نعم. يقع المقر الرئيسي في بريدة، وتُقدم خدمات الدراسة والتمثيل للشركات في مختلف مناطق المملكة حضورياً أو عن بُعد بحسب طبيعة المهمة ومتطلباتها.",
  },
];

export default function BankruptcyCompanies() {
  const pagePath = "/services/bankruptcy/companies";
  const seoSchema = [
    schemas.breadcrumb([
      { name: "الرئيسية", url: "/" },
      { name: "خدمات محامي الإفلاس", url: "/services/bankruptcy" },
      { name: "إفلاس الشركات في السعودية", url: pagePath },
    ]),
    schemas.faqPageForUrl(faqItems, pagePath),
    schemas.howTo(
      "كيف تبدأ دراسة وضع شركة متعثرة؟",
      "أربع مراحل أولية لدراسة وضع الشركة قبل اختيار إجراء إفلاس أو بديل تعاقدي.",
      reviewSteps.map((step) => ({ title: step.title, desc: step.text })),
      pagePath,
    ),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "دراسة أوضاع الشركات المتعثرة وخيارات الإفلاس",
      description:
        "دراسة قانونية للشركات المتعثرة في السعودية، ومقارنة إعادة هيكلة الديون والتسوية الوقائية وإعادة التنظيم المالي والتصفية، ثم إعداد الطلب والتمثيل القانوني عند التكليف.",
      url: "https://redwan.sa/services/bankruptcy/companies",
      serviceType: "الاستشارات والتمثيل القانوني للشركات المتعثرة",
      areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
      provider: {
        "@type": "LegalService",
        name: "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
        url: "https://redwan.sa",
      },
    },
  ];

  useSEO({
    title: "إفلاس الشركات في السعودية | دراسة التعثر وإعادة الهيكلة",
    description:
      "دراسة قانونية للشركات المتعثرة في السعودية: إعادة هيكلة الديون، التسوية الوقائية، إعادة التنظيم المالي أو التصفية، ثم إعداد الطلب والتمثيل عند التكليف.",
    keywords:
      "إفلاس الشركات في السعودية، شركة متعثرة، إعادة هيكلة ديون الشركات، محامي إفلاس شركات، التسوية الوقائية، إعادة التنظيم المالي، تصفية الشركات",
    canonical: pagePath,
    schema: seoSchema,
  });

  return (
    <>
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <nav aria-label="مسار الصفحة" className="flex items-center gap-2 text-xs md:text-sm mb-6">
            <Link href="/" className="text-white/50 hover:text-white transition-colors">الرئيسية</Link>
            <span className="text-white/25">/</span>
            <Link href="/services/bankruptcy" className="text-white/50 hover:text-white transition-colors">خدمات محامي الإفلاس</Link>
            <span className="text-white/25">/</span>
            <span className="text-[var(--color-gold)]">إفلاس الشركات</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-heading text-sm font-semibold text-[var(--color-gold)] mb-4 tracking-wide">
                للشركات والإدارات التنفيذية وأصحاب المصلحة
              </p>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                إفلاس الشركات في السعودية
              </h1>
              <p className="font-body text-base md:text-xl text-white/70 leading-relaxed max-w-3xl">
                نبدأ بدراسة وضع الشركة والديون والضمانات وإمكانية استمرار النشاط، ثم نقارن بين الحل التعاقدي وإجراءات الإفلاس المتاحة قبل التوصية بأي مسار.
              </p>
            </div>

            <div className="border-r-4 border-[var(--color-gold)] bg-white/5 p-6">
              <p className="font-heading text-sm font-semibold text-white mb-2">القاعدة المهنية</p>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                لا يمكن تحديد إجراء الإفلاس المناسب بناءً على وصف عام للمشكلة فقط، مثل وجود ديون أو تعثّر. وإنما تُبنى التوصية بعد دراسة وضع المنشأة، والتزاماتها المالية، ومستنداتها، وقدرتها على الاستمرار. ولا تمثل المعلومات الواردة في هذه الصفحة رأيًا قانونيًا بشأن حالة محددة.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/appointments"
              onClick={() => trackBookConsultation("bankruptcy_companies_hero")}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold hover:bg-[var(--color-gold-light)] transition-colors"
            >
              طلب موعد لدراسة الحالة
              <ArrowLeft size={16} />
            </Link>
            <a
              href="#possible-paths"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-heading font-semibold hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              استعراض المسارات المحتملة
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center mb-5">
              <FileSearch className="text-[var(--color-gold)]" size={23} />
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)] mb-5">
              ابدأ بتشخيص الوضع، لا باختيار الإجراء
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--color-navy)]/65 leading-relaxed">
              قد تكون المشكلة ضغطاً مؤقتاً على السيولة، أو اختلالاً في هيكل الديون، أو تعثراً يستدعي إجراءً نظامياً. لذلك تركز الدراسة الأولية على قابلية النشاط للاستمرار، ومراكز الدائنين، والضمانات، والتدفقات النقدية، والآثار المتوقعة لكل بديل.
            </p>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
            <h3 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-5">
              مؤشرات تستدعي مراجعة مبكرة
            </h3>
            <ul className="space-y-4">
              {reviewSignals.map((signal) => (
                <li key={signal} className="flex items-start gap-3">
                  <CheckCircle size={17} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed">{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="possible-paths" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="font-heading text-sm font-semibold text-[var(--color-gold)] mb-3">مصفوفة الخيارات</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
              مسارات محتملة بعد الدراسة
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--color-navy)]/60 leading-relaxed">
              هذه المسارات ليست قائمة اختيار ذاتي، وقد تتغير ملاءمتها بحسب حالة المدين وصفته وإمكانية استمرار النشاط ومستندات الحالة ومواقف أصحاب المصلحة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {possiblePaths.map((path) => {
              const Icon = path.icon;
              const card = (
                <article className="h-full border border-[var(--color-border)] p-6 md:p-8 hover:border-[var(--color-gold)]/50 transition-colors">
                  <div className="w-11 h-11 bg-[var(--color-navy)] flex items-center justify-center mb-5">
                    <Icon size={21} className="text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-3">{path.title}</h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/65 leading-relaxed">{path.text}</p>
                  {path.href && (
                    <span className="inline-flex items-center gap-2 mt-5 font-heading text-sm font-semibold text-[var(--color-navy)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4">
                      اقرأ عن الإجراء
                      <ArrowLeft size={14} />
                    </span>
                  )}
                </article>
              );
              return path.href ? <Link key={path.title} href={path.href}>{card}</Link> : <div key={path.title}>{card}</div>;
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <div>
              <p className="font-heading text-sm font-semibold text-[var(--color-gold)] mb-3">نطاق الدراسة الأولية</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-5">ماذا تحتاج الشركة أن تجهّز؟</h2>
              <p className="font-body text-sm md:text-base text-white/60 leading-relaxed">
                لا يلزم اكتمال كل مستند قبل التواصل، لكن كلما كانت الصورة أوضح أمكن تحديد نطاق الدراسة والمتطلبات والخطوة التالية بدقة أكبر.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {reviewDocuments.map((document) => (
                <div key={document} className="flex items-start gap-3 bg-[var(--color-navy)] p-5">
                  <CheckCircle size={16} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-white/70 leading-relaxed">{document}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="font-heading text-sm font-semibold text-[var(--color-gold)] mb-3">من الدراسة إلى القرار</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)]">كيف تبدأ المهمة؟</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviewSteps.map((step, index) => (
              <li key={step.title} className="bg-white border-t-4 border-[var(--color-gold)] p-6">
                <span className="font-display text-3xl font-bold text-[var(--color-gold)]/50">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mt-4 mb-2">{step.title}</h3>
                <p className="font-body text-sm text-[var(--color-navy)]/60 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)] mb-8">أسئلة الشركات الشائعة</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <article key={item.question} className="border border-[var(--color-border)] p-5 md:p-6">
                  <h3 className="faq-question font-heading text-base font-semibold text-[var(--color-navy)] mb-2">{item.question}</h3>
                  <p className="faq-answer font-body text-sm text-[var(--color-navy)]/65 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="bg-[var(--color-navy)] p-7 md:p-8">
              <Building2 size={28} className="text-[var(--color-gold)] mb-5" />
              <h2 className="font-display text-2xl font-bold text-white mb-3">اطلب دراسة أولية لوضع الشركة</h2>
              <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                يبدأ الموعد بفهم نطاق المشكلة وتحديد المعلومات اللازمة للدراسة. لا يعني حجز الموعد قبول المهمة أو التوصية بإجراء معين قبل التحقق من التعارض ومراجعة الحالة.
              </p>
              <Link
                href="/appointments"
                onClick={() => trackBookConsultation("bankruptcy_companies_footer")}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold hover:bg-[var(--color-gold-light)] transition-colors"
              >
                حجز موعد
                <ArrowLeft size={15} />
              </Link>
            </div>

            <div className="border border-[var(--color-border)] p-6">
              <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-3">فصل الصفة المهنية</h3>
              <p className="font-body text-sm text-[var(--color-navy)]/60 leading-relaxed mb-4">
                تتناول هذه الصفحة خدمات المكتب بصفته مستشاراً وممثلاً قانونياً للشركة. أما إدارة إجراء الإفلاس بصفة أمين فتخضع لتعيين مستقل والتزامات الحياد وتجنب تعارض المصالح.
              </p>
              <Link href="/licenses/bankruptcy-trustee" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-gold)]">
                الاطلاع على ترخيص أمين الإفلاس
                <ArrowLeft size={14} />
              </Link>
            </div>

            <div className="border border-[var(--color-border)] p-6">
              <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-3">مصادر رسمية</h3>
              <ul className="space-y-3 font-body text-sm">
                <li><a className="text-[var(--color-gold)] hover:underline" href="https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/68204119-84f1-4789-8fad-a9ec014c3788/1" target="_blank" rel="noreferrer">نظام الإفلاس — هيئة الخبراء بمجلس الوزراء</a></li>
                <li><a className="text-[var(--color-gold)] hover:underline" href="https://bankruptcy.gov.sa/ar/BankruptcyLaw" target="_blank" rel="noreferrer">النظام واللائحة التنفيذية — لجنة الإفلاس «إيسار»</a></li>
                <li><a className="text-[var(--color-gold)] hover:underline" href="https://bankruptcy.gov.sa/ar/BankruptcyLaw/BankruptcyProcedures/Pages/default.aspx" target="_blank" rel="noreferrer">إجراءات الإفلاس السبعة — لجنة الإفلاس «إيسار»</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
