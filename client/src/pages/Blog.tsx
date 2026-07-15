import { Link } from "wouter";
import { Calendar, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { blogArticles } from "@/data/blogArticles";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { localePath } from "@/lib/localePath";

export default function Blog() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === "ar" ? "المدونة القانونية" : "Legal Blog",
    "description": lang === "ar"
      ? "مقالات ودراسات قانونية متخصصة في نظام الإفلاس السعودي والقضايا التجارية"
      : "Specialized legal articles and studies on Saudi Bankruptcy Law and commercial cases",
    "url": "https://redwan.sa/blog",
    "publisher": {
      "@type": "Organization",
      "name": lang === "ar"
        ? "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
        : "Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Management",
      "url": "https://redwan.sa"
    },
    "blogPost": blogArticles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.date,
      "url": `https://redwan.sa/blog/${article.slug}`
    }))
  };

  return (
    <>
      <SEOHead
        title={t.blog.title}
        description={lang === "ar"
          ? "مقالات ودراسات قانونية متخصصة في نظام الإفلاس السعودي، التسوية الوقائية، إعادة التنظيم المالي، وحقوق الدائنين والمدينين."
          : "Specialized legal articles on Saudi Bankruptcy Law, preventive settlements, financial reorganization, and creditor/debtor rights."
        }
        keywords={lang === "ar"
          ? ["مدونة قانونية", "نظام الإفلاس السعودي", "مقالات قانونية", "استشارات قانونية", "التسوية الوقائية"]
          : ["legal blog", "Saudi bankruptcy law", "legal articles", "legal consultation", "preventive settlement"]
        }
        canonicalUrl="/blog"
        structuredData={blogStructuredData}
      />

      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.blog.title}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">{t.blog.title}</h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {t.blog.subtitle}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {blogArticles.map((article, idx) => (
              <article
                key={article.id}
                className="group bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex flex-col"
                style={getStaggerStyle(gridVisible, idx, 120)}
              >
                <Link href={lp(`/blog/${article.slug}`)} className="flex flex-col flex-1">
                  {/* Category Badge */}
                  <div className="p-4 md:p-6 pb-0">
                    <span className="inline-block px-2.5 py-1 text-[10px] md:text-xs font-heading text-[var(--color-gold)] border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 mb-3 md:mb-4">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-4 md:p-6 pt-1 md:pt-2 flex-1 flex flex-col">
                    <h2 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-2 md:mb-3 leading-tight group-hover:text-[var(--color-gold)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 leading-relaxed mb-4 md:mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="flex items-center gap-1 font-body text-[10px] md:text-xs text-[var(--color-navy)]/40">
                          <Calendar size={11} />
                          <time dateTime={article.date}>
                            {new Date(article.date).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1 font-body text-[10px] md:text-xs text-[var(--color-navy)]/40">
                          <Clock size={11} />
                          {article.readTime}
                        </span>
                      </div>
                      <span className="font-heading text-[10px] md:text-xs text-[var(--color-gold)] md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        {t.blog.readMore}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
