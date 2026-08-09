import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileText,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";

const cases = [
  { slug: "ASHYAD-STEEL", ar: "شركة أشياد ستيل", en: "ASHYAD STEEL Company" },
  { slug: "tajalriayaa", ar: "شركة تاج الرعاية الطبي", en: "Taj Al-Riaya Medical Company" },
  { slug: "Planting-for-Contracting", ar: "شركة المزروعات للمقاولات", en: "Planting for Contracting Company" },
  { slug: "Hassan-Misfer-Al-Zahrani", ar: "شركة حسن مسفر الزهراني وشركاه", en: "Hassan Misfer Al-Zahrani & Partners" },
];

export default function BankruptcyTrusteeLicense() {
  const { lang, isRTL } = useTranslation();
  const isArabic = lang === "ar";
  const lp = (path: string) => localePath(path, lang);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const faqs = isArabic
    ? [
        {
          question: "ما المقصود بأمين الإفلاس المعتمد؟",
          answer:
            "هو ممارس مهني مرخص من لجنة الإفلاس، ويجوز للمحكمة تعيينه لإدارة إجراء الإفلاس وفق نظام الإفلاس ولائحته التنفيذية والقرارات ذات الصلة.",
        },
        {
          question: "كيف يتم تعيين أمين الإفلاس؟",
          answer:
            "يكون التعيين بقرار من المحكمة المختصة وفق متطلبات الإجراء والنظام. وجود الترخيص لا يعني التعيين تلقائياً في كل طلب.",
        },
        {
          question: "ما الفرق بين أمين الإفلاس ومحامي الإفلاس؟",
          answer:
            "أمين الإفلاس يدير الإجراء بصفته المهنية وبحياد بعد تعيينه، بينما محامي الإفلاس يقدم المشورة ويمثل المدين أو الدائن أو طرفاً آخر. ولا يجوز الجمع بين الدورين في الحالة نفسها عند وجود تعارض مصالح.",
        },
        {
          question: "هل خدمات أمين الإفلاس محصورة في مدينة بريدة؟",
          answer:
            "لا. الترخيص مهني على مستوى المملكة، ويتيح إدارة الإجراءات في المحاكم المختصة بمختلف المناطق بحسب قرار التعيين ومتطلبات كل حالة.",
        },
        {
          question: "كيف أتحقق من ترخيص أمين الإفلاس؟",
          answer:
            "تنشر لجنة الإفلاس قائمة الأمناء المرخصين على موقعها الرسمي. يمكن البحث في القائمة والتحقق من بيانات الممارس، إضافة إلى الاطلاع على رقم الترخيص 142147 في هذه الصفحة.",
        },
        {
          question: "هل أرسل مطالبة الدائن عبر هذه الصفحة؟",
          answer:
            "لا. تُقدّم المطالبة من صفحة المطالبات أو بوابة الدائن، وبعد اختيار إجراء الإفلاس المعني وإرفاق المستندات المؤيدة.",
        },
      ]
    : [
        {
          question: "What is a licensed bankruptcy trustee?",
          answer:
            "A professional licensed by the Saudi Bankruptcy Commission who may be appointed by the competent court to administer a proceeding under the Bankruptcy Law and its Implementing Regulations.",
        },
        {
          question: "How is a bankruptcy trustee appointed?",
          answer:
            "Appointment is made by the competent court in accordance with the applicable proceeding and statutory requirements. Holding a license does not mean automatic appointment in every case.",
        },
        {
          question: "What is the difference between a trustee and a bankruptcy lawyer?",
          answer:
            "A trustee administers the court-appointed proceeding impartially. A bankruptcy lawyer advises and represents a debtor, creditor or another party. The two roles cannot be combined in the same matter where a conflict exists.",
        },
        {
          question: "Are trustee services limited to Buraydah?",
          answer:
            "No. The professional license applies across Saudi Arabia, subject to the court appointment and the requirements of each proceeding.",
        },
        {
          question: "How can I verify a bankruptcy trustee license?",
          answer:
            "The Saudi Bankruptcy Commission publishes the official list of licensed trustees on its website. The list can be searched to verify the practitioner alongside license No. 142147 shown on this page.",
        },
        {
          question: "Can a creditor submit a claim on this page?",
          answer:
            "No. Claims should be submitted through the creditor claim page or creditor portal after selecting the relevant proceeding and attaching supporting documents.",
        },
      ];

  const seoSchema = useMemo(
    () => [
      schemas.breadcrumb([
        { name: isArabic ? "الرئيسية" : "Home", url: "/" },
        { name: isArabic ? "التراخيص" : "Licenses", url: "/licenses" },
        {
          name: isArabic ? "أمين إفلاس معتمد" : "Licensed Bankruptcy Trustee",
          url: "/licenses/bankruptcy-trustee",
        },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: isArabic ? "ar" : "en",
        url: isArabic
          ? "https://redwan.sa/licenses/bankruptcy-trustee"
          : "https://redwan.sa/en/licenses/bankruptcy-trustee",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: isArabic
          ? "إدارة إجراءات الإفلاس بصفة أمين إفلاس معتمد"
          : "Licensed Bankruptcy Trustee Services",
        serviceType: isArabic
          ? "إدارة إجراءات الإفلاس بعد التعيين من المحكمة"
          : "Court-appointed bankruptcy proceeding administration",
        provider: {
          "@type": "LegalService",
          name: isArabic
            ? "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
            : "Redwan Law Firm",
          url: "https://redwan.sa",
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: isArabic
              ? "ترخيص ممارسة أعمال أمناء الإفلاس"
              : "Bankruptcy Trustee License",
            identifier: "142147",
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: isArabic ? "لجنة الإفلاس" : "Saudi Bankruptcy Commission",
            },
          },
        },
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        url: isArabic
          ? "https://redwan.sa/licenses/bankruptcy-trustee"
          : "https://redwan.sa/en/licenses/bankruptcy-trustee",
      },
    ],
    [faqs, isArabic],
  );

  useSEO({
    title: isArabic
      ? "أمين إفلاس معتمد في السعودية | ترخيص 142147"
      : "Licensed Bankruptcy Trustee in Saudi Arabia | License 142147",
    description: isArabic
      ? "أمين إفلاس معتمد لدى لجنة الإفلاس بترخيص 142147 لإدارة إجراءات التصفية وإعادة التنظيم المالي بعد التعيين من المحكمة في أنحاء السعودية."
      : "Bankruptcy Commission licensed trustee (No. 142147) for court-appointed liquidation and financial reorganization proceedings across Saudi Arabia.",
    canonical: "/licenses/bankruptcy-trustee",
    schema: seoSchema,
  });

  const capabilities = isArabic
    ? [
        "إدارة إجراءات التصفية وحصر الأصول والمطالبات",
        "إدارة إعادة التنظيم المالي ومتابعة المقترح والتصويت",
        "إعداد التقارير ورفعها إلى المحكمة وفق متطلبات الإجراء",
        "إدارة اجتماعات الدائنين والتواصل مع أصحاب المصلحة",
        "فحص مطالبات الدائنين وإعداد التوصيات النظامية بشأنها",
        "توزيع الحصيلة وفق الأولويات والأحكام الصادرة في الإجراء",
      ]
    : [
        "Administering liquidation proceedings and identifying assets and claims",
        "Administering financial reorganization and monitoring proposals and voting",
        "Preparing and filing reports required by the competent court",
        "Managing creditor meetings and stakeholder communications",
        "Reviewing creditor claims and preparing statutory recommendations",
        "Distributing proceeds in accordance with statutory priorities and court orders",
      ];

  return (
    <>
      <section className="relative bg-[var(--color-navy)] pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-7" aria-label="Breadcrumb">
            <Link href={lp("/")} className="hover:text-white">
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
            <Arrow size={13} />
            <Link href={lp("/licenses")} className="hover:text-white">
              {isArabic ? "التراخيص" : "Licenses"}
            </Link>
            <Arrow size={13} />
            <span className="text-[var(--color-gold)]">
              {isArabic ? "أمانة الإفلاس" : "Bankruptcy Trustee"}
            </span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-semibold">
                <BadgeCheck size={16} />
                {isArabic ? "ترخيص ساري رقم 142147" : "Active License No. 142147"}
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {isArabic ? "أمين إفلاس معتمد لدى لجنة الإفلاس" : "Saudi Bankruptcy Commission Licensed Trustee"}
              </h1>
              <p className="font-body text-base md:text-lg text-white/70 leading-relaxed max-w-3xl">
                {isArabic
                  ? "يحمل المكتب ترخيص ممارسة أعمال أمناء الإفلاس الصادر من لجنة الإفلاس، لإدارة إجراءات الإفلاس بعد التعيين من المحكمة المختصة، مع خدمة الإجراءات في مختلف مناطق المملكة."
                  : "The firm holds a Bankruptcy Commission trustee license to administer bankruptcy proceedings following appointment by the competent court, with nationwide capability across Saudi Arabia."}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <span className="block text-xs text-white/45 mb-1">{isArabic ? "رقم الترخيص" : "License No."}</span>
                  <strong className="text-xl text-white">142147</strong>
                </div>
                <div>
                  <span className="block text-xs text-white/45 mb-1">{isArabic ? "الحالة" : "Status"}</span>
                  <strong className="text-base text-emerald-400">{isArabic ? "ساري" : "Active"}</strong>
                </div>
                <div className="col-span-2 pt-4 border-t border-white/10">
                  <span className="block text-xs text-white/45 mb-1">{isArabic ? "الجهة المرخِّصة" : "Licensing authority"}</span>
                  <strong className="text-base text-white">{isArabic ? "لجنة الإفلاس" : "Saudi Bankruptcy Commission"}</strong>
                </div>
                <a
                  href="https://www.bankruptcy.gov.sa/ar/Pages/officeholder.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 inline-flex items-center gap-2 pt-4 border-t border-white/10 text-sm font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
                >
                  {isArabic ? "التحقق عبر قائمة الأمناء الرسمية" : "Verify through the official trustee list"}
                  <Arrow size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Scale className="text-[var(--color-gold)]" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
                  {isArabic ? "ما دور أمين الإفلاس؟" : "What does a bankruptcy trustee do?"}
                </h2>
              </div>
              <p className="font-body text-[var(--color-navy)]/70 leading-loose mb-4">
                {isArabic
                  ? "أمين الإفلاس ممارس مستقل يُعيَّن لإدارة الإجراء وفق أحكام نظام الإفلاس. وتشمل مسؤولياته حماية مصالح الإجراء، جمع المعلومات، التواصل مع الأطراف، وفحص المطالبات ورفع التقارير للمحكمة."
                  : "A bankruptcy trustee is an independent professional appointed to administer a proceeding under the Bankruptcy Law. Responsibilities include protecting the proceeding, collecting information, communicating with parties, reviewing claims and reporting to the court."}
              </p>
              <p className="font-body text-[var(--color-navy)]/70 leading-loose">
                {isArabic
                  ? "تختلف مهام الأمين بحسب نوع الإجراء والقرار القضائي. لذلك لا تعني هذه الصفحة أن المكتب يمثل المدين أو الدائن في الإجراء الذي عُيّن فيه أميناً."
                  : "The trustee's duties vary by proceeding and court order. This page does not mean the firm represents a debtor or creditor in a matter where it has been appointed as trustee."}
              </p>
            </div>

            <div className="bg-[var(--color-cream)] border border-[var(--color-border)] p-6 md:p-8">
              <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-5">
                {isArabic ? "ما يخوّل به الترخيص" : "Scope of the license"}
              </h2>
              <ul className="space-y-3">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                    <span className="font-body text-sm md:text-base text-[var(--color-navy)]/75 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Scale className="text-[var(--color-gold)] mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-3">
              {isArabic ? "أمين الإفلاس ليس محامي أحد الأطراف" : "A trustee is not counsel for a party"}
            </h2>
            <p className="font-body text-[var(--color-navy)]/65 leading-relaxed">
              {isArabic
                ? "نوضح الصفة التي تُقدَّم بها كل خدمة حتى يعرف العميل والطرف في الإجراء طبيعة الدور وحدوده."
                : "We clearly identify the capacity in which each service is delivered so parties understand the role and its boundaries."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border-t-4 border-[var(--color-gold)] p-7">
              <ShieldCheck className="text-[var(--color-gold)] mb-4" />
              <h3 className="font-display text-xl font-bold text-[var(--color-navy)] mb-3">
                {isArabic ? "بصفة أمين إفلاس" : "As bankruptcy trustee"}
              </h3>
              <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed mb-5">
                {isArabic
                  ? "إدارة الإجراء بعد التعيين القضائي بموضوعية واستقلال، والتواصل مع جميع الأطراف وفق أحكام النظام."
                  : "Administering the court-appointed proceeding independently and communicating with all parties under the law."}
              </p>
              <Link href={lp("/bankruptcy")} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                {isArabic ? "الحالات والإجراءات الجارية" : "Active cases and proceedings"}
                <Arrow size={15} />
              </Link>
            </div>
            <div className="bg-white border-t-4 border-[var(--color-navy)] p-7">
              <Landmark className="text-[var(--color-navy)] mb-4" />
              <h3 className="font-display text-xl font-bold text-[var(--color-navy)] mb-3">
                {isArabic ? "بصفة محامي إفلاس" : "As bankruptcy counsel"}
              </h3>
              <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed mb-5">
                {isArabic
                  ? "تقديم المشورة والتمثيل القانوني لطرف محدد، مع تطبيق ضوابط تعارض المصالح وعدم الجمع بين الدورين في الحالة نفسها."
                  : "Advising and representing a specific party, subject to conflict checks and without combining both roles in the same matter."}
              </p>
              <Link href={lp("/services/bankruptcy")} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                {isArabic ? "خدمات محامي الإفلاس" : "Bankruptcy legal services"}
                <Arrow size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="text-[var(--color-gold)]" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
                  {isArabic ? "إجراءات منشورة يديرها المكتب" : "Published proceedings administered by the firm"}
                </h2>
              </div>
              <p className="font-body text-[var(--color-navy)]/60">
                {isArabic ? "نماذج من صفحات الإجراءات الجارية ومعلومات الدائنين." : "Examples of active proceeding and creditor-information pages."}
              </p>
            </div>
            <Link href={lp("/bankruptcy")} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
              {isArabic ? "عرض جميع الإجراءات" : "View all proceedings"}
              <Arrow size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cases.map((item) => (
              <Link
                key={item.slug}
                href={lp(`/bankruptcy/${item.slug}`)}
                className="group border border-[var(--color-border)] p-5 hover:border-[var(--color-gold)]/50 hover:shadow-md transition-all"
              >
                <FileText size={20} className="text-[var(--color-gold)] mb-4" />
                <h3 className="font-heading font-semibold text-sm text-[var(--color-navy)] leading-relaxed group-hover:text-[var(--color-gold)]">
                  {isArabic ? item.ar : item.en}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-7">
            <Users className="text-[var(--color-gold)]" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
              {isArabic ? "أسئلة شائعة عن أمين الإفلاس" : "Bankruptcy trustee FAQs"}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white border border-[var(--color-border)] p-5 md:p-6">
                <summary className="font-heading font-semibold text-[var(--color-navy)] cursor-pointer list-none flex justify-between gap-4">
                  <span className="faq-question">{faq.question}</span>
                  <span className="text-[var(--color-gold)] text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="faq-answer font-body text-sm md:text-base text-[var(--color-navy)]/70 leading-loose mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            {isArabic ? "تحتاج إلى تحديد الصفة أو الإجراء المناسب؟" : "Need to identify the right role or proceeding?"}
          </h2>
          <p className="font-body text-white/60 mb-7">
            {isArabic
              ? "تواصل معنا لتحديد ما إذا كان احتياجك يتعلق بتمثيل قانوني أو بإجراء إفلاس قائم."
              : "Contact us to determine whether your need concerns legal representation or an existing bankruptcy proceeding."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={lp("/contact")} className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-bold text-sm">
              {isArabic ? "تواصل معنا" : "Contact us"}
            </Link>
            <Link href={lp("/bankruptcy/claims")} className="px-6 py-3 border border-white/25 text-white font-heading font-semibold text-sm">
              {isArabic ? "تقديم مطالبة دائن" : "Submit a creditor claim"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
