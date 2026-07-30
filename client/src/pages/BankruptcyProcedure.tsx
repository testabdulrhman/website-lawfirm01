/**
 * صفحة فرعية مخصّصة لإجراء إفلاس واحد — عنوان على شكل سؤال مباشر (SEO/AEO).
 * الهوية البصرية: كحلي (--color-navy) + ذهبي (--color-gold)، خط Playfair Display للعناوين.
 * RTL أساسي، مع مخططات BreadcrumbList + HowTo + FAQPage و microdata دلالية.
 */
import { Link, useParams } from "wouter";
import { useMemo, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import {
  Scale,
  Target,
  UserCheck,
  ListChecks,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Phone,
  FileText,
} from "lucide-react";
import {
  bankruptcyProcedures,
  getProcedureBySlug,
  proceduresSourceUrl,
} from "@/data/bankruptcyProcedures";
import {
  bankruptcyProceduresEn,
  getEnglishProcedureBySlug,
} from "@/data/bankruptcyProceduresEn";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      className="border border-[var(--color-border)] bg-white"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-5 text-right"
      >
        <h3 className="faq-question font-heading text-base md:text-lg font-semibold text-[var(--color-navy)]" itemProp="name">
          {q}
        </h3>
        <ChevronDown
          size={20}
          className={`text-[var(--color-gold)] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div className="overflow-hidden">
          <p className="faq-answer font-body text-[var(--color-navy)]/70 leading-relaxed px-5 pb-5" itemProp="text">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BankruptcyProcedure() {
  const { lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const params = useParams<{ slug: string }>();
  const isEnglish = lang === "en";
  const procedure = isEnglish
    ? getEnglishProcedureBySlug(params.slug || "")
    : getProcedureBySlug(params.slug || "");
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const copy = isEnglish
    ? {
        home: "Home",
        bankruptcy: "Bankruptcy",
        procedures: "Bankruptcy Procedures",
        notFound: "Procedure not found",
        back: "Back to bankruptcy procedures",
        small: "Small-debtor procedure",
        general: "General procedure",
        summary: "In brief:",
        definition: (name: string) => `What is ${name}?`,
        objective: "What is the purpose of this procedure?",
        eligibility: "Who may use this procedure and when?",
        useCases: "When the procedure may be used:",
        steps: "What are the main stages?",
        faq: (name: string) => `Frequently asked questions about ${name}`,
        source: "Source: Saudi Bankruptcy Law, its Implementing Regulations and Bankruptcy Commission guidance —",
        commission: "Bankruptcy Commission",
        disclaimer: "This content is for general information and does not constitute legal advice.",
        consultTitle: "Do you need advice about this procedure?",
        consultText:
          "Our bankruptcy team can help you assess the procedure that best fits your circumstances.",
        book: "Book a consultation",
        claim: "Submit a creditor claim",
        trustee: "Licensed trustee details",
        other: "Other bankruptcy procedures",
      }
    : {
        home: "الرئيسية",
        bankruptcy: "الإفلاس والتصفية",
        procedures: "إجراءات الإفلاس",
        notFound: "الإجراء غير موجود",
        back: "العودة لإجراءات الإفلاس",
        small: "إجراء خاص بصغار المدينين",
        general: "إجراء عام",
        summary: "باختصار:",
        definition: (name: string) => `ما تعريف ${name}؟`,
        objective: "ما الهدف من هذا الإجراء؟",
        eligibility: "من يحق له التقدم بالإجراء ومتى؟",
        useCases: "الحالات التي يُلجأ فيها للإجراء:",
        steps: "كيف تسير خطوات الإجراء؟",
        faq: (name: string) => `أسئلة شائعة حول ${name}`,
        source: "المصدر: نظام الإفلاس السعودي ولائحته التنفيذية ودليل لجنة الإفلاس —",
        commission: "لجنة الإفلاس",
        disclaimer: "هذا المحتوى لأغراض التوعية ولا يُعدّ استشارة قانونية.",
        consultTitle: "هل تحتاج استشارة بشأن هذا الإجراء؟",
        consultText:
          "فريقنا المتخصص في إدارة إجراءات الإفلاس جاهز لمساعدتك على اختيار المسار الأنسب لوضعك.",
        book: "احجز استشارة",
        claim: "تقديم مطالبة دائن",
        trustee: "عن أمين الإفلاس المعتمد",
        other: "إجراءات الإفلاس الأخرى",
      };

  const canonical = procedure ? `/bankruptcy/procedures/${procedure.slug}` : undefined;

  const seoSchema = useMemo(() => {
    if (!procedure) return [];
    return [
      schemas.breadcrumb([
        { name: copy.home, url: lp("/") },
        { name: copy.bankruptcy, url: lp("/bankruptcy") },
        { name: copy.procedures, url: lp("/bankruptcy/procedures") },
        { name: procedure.name, url: lp(`/bankruptcy/procedures/${procedure.slug}`) },
      ]),
      schemas.howTo(procedure.questionTitle, procedure.tldr, procedure.steps, lp(`/bankruptcy/procedures/${procedure.slug}`)),
      schemas.faqPageForUrl(
        procedure.faqs.map((f) => ({ question: f.q, answer: f.a })),
        lp(`/bankruptcy/procedures/${procedure.slug}`),
      ),
    ];
  }, [copy.bankruptcy, copy.home, copy.procedures, lp, procedure]);

  useSEO({
    title: procedure ? procedure.questionTitle : copy.notFound,
    description: procedure ? procedure.metaDescription : "",
    keywords: procedure ? procedure.keywords : undefined,
    canonical,
    noindex: !procedure,
    schema: seoSchema,
  });

  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.05 });

  if (!procedure) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-[var(--color-navy)] mb-4">{copy.notFound}</h1>
          <Link
            href={lp("/bankruptcy/procedures")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors"
          >
            <span>{copy.back}</span>
          </Link>
        </div>
      </div>
    );
  }

  const others = (isEnglish ? bankruptcyProceduresEn : bankruptcyProcedures)
    .filter((p) => p.slug !== procedure.slug);

  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-14 md:pb-20 bg-[var(--color-navy)] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav className="flex flex-wrap items-center gap-2 mb-7 font-body text-xs text-white/50">
            <Link href={lp("/")} className="hover:text-[var(--color-gold)] transition-colors">{copy.home}</Link>
            <span>/</span>
            <Link href={lp("/bankruptcy")} className="hover:text-[var(--color-gold)] transition-colors">{copy.bankruptcy}</Link>
            <span>/</span>
            <Link href={lp("/bankruptcy/procedures")} className="hover:text-[var(--color-gold)] transition-colors">{copy.procedures}</Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">{procedure.name}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-gold)]/15 text-[var(--color-gold)] font-body text-xs rounded-full">
              <Scale size={13} />
              {procedure.isSmallDebtor ? copy.small : copy.general}
            </span>
          </div>

          <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-snug max-w-3xl">
            {procedure.questionTitle}
          </h1>

          {/* TL;DR — إجابة موجزة قابلة للاقتباس */}
          <div className="mt-7 max-w-3xl bg-white/5 border-r-4 border-[var(--color-gold)] p-5 rounded-sm">
            <p className="faq-answer font-body text-sm md:text-base text-white/85 leading-relaxed">
              <span className="text-[var(--color-gold)] font-semibold">{copy.summary} </span>
              {procedure.tldr}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-14 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main content */}
            <div
              ref={bodyRef}
              className="lg:col-span-2 space-y-8 transition-all duration-700 ease-out"
              style={{ opacity: bodyVisible ? 1 : 0, transform: bodyVisible ? "translateY(0)" : "translateY(24px)" }}
            >
              {/* التعريف */}
              <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
                    <FileText size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">{copy.definition(procedure.name)}</h2>
                </div>
                <p className="font-body text-[var(--color-navy)]/75 leading-loose">{procedure.definition}</p>
              </div>

              {/* الهدف */}
              <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
                    <Target size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">{copy.objective}</h2>
                </div>
                <p className="font-body text-[var(--color-navy)]/75 leading-loose">{procedure.objective}</p>
              </div>

              {/* من يحق له + متى */}
              <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
                    <UserCheck size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">{copy.eligibility}</h2>
                </div>
                <p className="font-body text-[var(--color-navy)]/75 leading-loose mb-5">{procedure.eligibility}</p>
                <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-3">{copy.useCases}</h3>
                <ul className="space-y-2.5">
                  {procedure.whenToUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-2.5 bg-[var(--color-gold)] rounded-full flex-shrink-0" />
                      <span className="font-body text-[var(--color-navy)]/75 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* الخطوات */}
              <div ref={stepsRef} className="bg-white border border-[var(--color-border)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
                    <ListChecks size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">{copy.steps}</h2>
                </div>
                <div className="space-y-4">
                  {procedure.steps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4"
                      style={getStaggerStyle(stepsVisible, i, 80)}
                    >
                      <div className="w-9 h-9 bg-[var(--color-gold)] text-[var(--color-navy)] font-display font-bold flex items-center justify-center flex-shrink-0 rounded-sm">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-1">{step.title}</h3>
                        <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* الأسئلة الشائعة */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
                    <HelpCircle size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">{copy.faq(procedure.name)}</h2>
                </div>
                <div className="space-y-3">
                  {procedure.faqs.map((f, i) => (
                    <FaqItem key={i} q={f.q} a={f.a} index={i} />
                  ))}
                </div>
                <p className="mt-5 font-body text-xs text-[var(--color-navy)]/50 leading-relaxed">
                  {copy.source}{" "}
                  <a href={proceduresSourceUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] hover:underline">
                    {copy.commission}
                  </a>
                  . {copy.disclaimer}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* CTA */}
              <div className="bg-[var(--color-navy)] p-6 md:p-7 sticky top-24">
                <h3 className="font-display text-lg font-bold text-white mb-2">{copy.consultTitle}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
                  {copy.consultText}
                </p>
                <Link
                  href={lp("/contact")}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors mb-3"
                >
                  <Phone size={16} />
                  <span>{copy.book}</span>
                </Link>
                <Link
                  href={lp("/bankruptcy/claims")}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-white/20 text-white font-heading font-medium text-sm hover:border-[var(--color-gold)]/40 transition-colors"
                >
                  <FileText size={16} />
                  <span>{copy.claim}</span>
                </Link>
                <Link
                  href={lp("/licenses/bankruptcy-trustee")}
                  className="flex items-center justify-center gap-2 w-full mt-3 px-5 py-3 border border-white/20 text-white font-heading font-medium text-sm hover:border-[var(--color-gold)]/40 transition-colors"
                >
                  <Scale size={16} />
                  <span>{copy.trustee}</span>
                </Link>
              </div>

              {/* إجراءات أخرى */}
              <div className="bg-white border border-[var(--color-border)] p-6">
                <h3 className="font-display text-base font-bold text-[var(--color-navy)] mb-4">{copy.other}</h3>
                <ul className="space-y-1">
                  {others.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={lp(`/bankruptcy/procedures/${p.slug}`)}
                        className="group flex items-center justify-between gap-2 py-2.5 border-b border-[var(--color-border)] last:border-0"
                      >
                        <span className="font-body text-sm text-[var(--color-navy)]/75 group-hover:text-[var(--color-gold)] transition-colors leading-relaxed">
                          {p.name}
                        </span>
                        <ArrowIcon size={14} className="text-[var(--color-gold)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
