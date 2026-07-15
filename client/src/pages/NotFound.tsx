import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";

export default function NotFound() {
  const { lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  // Mark as noindex to prevent Google from indexing 404 pages (Soft 404 fix)
  useSEO({
    title: lang === "ar" ? "الصفحة غير موجودة - 404" : "Page Not Found - 404",
    description: lang === "ar"
      ? "الصفحة المطلوبة غير موجودة أو تم نقلها."
      : "The requested page does not exist or has been moved.",
    noindex: true,
    // No canonical — this is a dead-end page that should not be indexed
  });

  const content = lang === "ar" ? {
    title: "الصفحة غير موجودة",
    desc: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    btn: "العودة للرئيسية",
  } : {
    title: "Page Not Found",
    desc: "Sorry, the page you are looking for does not exist or has been moved.",
    btn: "Back to Home",
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] px-5">
      <div className="text-center max-w-md">
        <span className="font-display text-8xl md:text-9xl font-bold text-[var(--color-navy)]/10 block mb-2">404</span>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-3">
          {content.title}
        </h1>
        <p className="font-body text-sm md:text-base text-[var(--color-navy)]/60 mb-8 leading-relaxed">
          {content.desc}
        </p>
        <Link
          href={lp("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-navy)] text-[var(--color-cream)] font-heading font-semibold text-sm hover:bg-[var(--color-navy-light)] active:scale-[0.97] transition-all duration-200"
        >
          {isRTL && <ArrowLeft size={16} />}
          <span>{content.btn}</span>
          {!isRTL && <ArrowRight size={16} />}
        </Link>
      </div>
    </section>
  );
}
