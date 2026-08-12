import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { getArticleBySlug, blogArticles } from "@/data/blogArticles";
import SEOHead from "@/components/SEOHead";
import { useEffect, type ReactNode } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { trackWhatsAppClick } from "@/lib/analytics";
import { schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";

export default function BlogPost() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug || "");
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const BackArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return (
      <>
        <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
          <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{lang === "ar" ? "المقال غير موجود" : "Article Not Found"}</h1>
            <p className="font-body text-base text-white/60 mb-6">{lang === "ar" ? "عذراً، لم يتم العثور على المقال المطلوب." : "Sorry, the requested article was not found."}</p>
            <Link href={lp("/blog")} className="inline-flex items-center gap-2 font-heading text-sm text-[var(--color-gold)] hover:underline">
              <BackArrow size={16} />
              {lang === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Structured Data for Article (JSON-LD)
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "datePublished": article.date,
    "dateModified": article.updatedDate || article.date,
    "author": article.reviewer
      ? {
          "@type": "Person",
          "name": article.reviewer.name,
          "url": article.reviewer.url ? `https://redwan.sa${article.reviewer.url}` : "https://redwan.sa/team",
          "jobTitle": article.reviewer.role,
        }
      : {
          "@type": "Organization",
          "name": lang === "ar" ? "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس" : "Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management",
          "url": "https://redwan.sa"
        },
    ...(article.reviewer && {
      "reviewedBy": {
        "@type": "Person",
        "name": article.reviewer.name,
        "url": article.reviewer.url ? `https://redwan.sa${article.reviewer.url}` : "https://redwan.sa/team",
        "jobTitle": article.reviewer.role,
      },
    }),
    "publisher": {
      "@type": "Organization",
      "name": lang === "ar" ? "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس" : "Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management",
      "url": "https://redwan.sa"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://redwan.sa/blog/${article.slug}`
    },
    "articleSection": article.category,
    "keywords": article.keywords.join(", "),
    "inLanguage": "ar",
    "isPartOf": {
      "@type": "Blog",
      "name": "المدونة القانونية",
      "url": "https://redwan.sa/blog"
    }
  };

  // BreadcrumbList structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://redwan.sa"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "المدونة القانونية",
        "item": "https://redwan.sa/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://redwan.sa/blog/${article.slug}`
      }
    ]
  };

  // Parse markdown content to HTML
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];
    let inOrderedList = false;
    let orderedItems: string[] = [];
    let key = 0;

    const processInlineMarkdown = (text: string): string => {
      // Bold
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Links
      text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[var(--color-gold)] hover:underline">$1</a>');
      return text;
    };

    const parseTableRow = (row: string): string[] =>
      row
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(cell => cell.trim());

    const headingId = (text: string): string =>
      text
        .replace(/\[(.+?)\]\(.+?\)/g, "$1")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-2 my-4 pr-4 text-[var(--color-navy)]/80 font-body leading-relaxed">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }} />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
      if (inOrderedList && orderedItems.length > 0) {
        elements.push(
          <ol key={key++} className="list-decimal list-inside space-y-2 my-4 pr-4 text-[var(--color-navy)]/80 font-body leading-relaxed">
            {orderedItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }} />
            ))}
          </ol>
        );
        orderedItems = [];
        inOrderedList = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = lines[i + 1] || "";
      const separatorCells = parseTableRow(nextLine);
      const isTable =
        line.trim().startsWith("|") &&
        separatorCells.length > 0 &&
        separatorCells.every(cell => /^:?-{3,}:?$/.test(cell));

      if (isTable) {
        flushList();
        const headers = parseTableRow(line);
        const rows: string[][] = [];
        i += 2;
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          rows.push(parseTableRow(lines[i]));
          i++;
        }
        i--;
        elements.push(
          <div key={key++} className="overflow-x-auto my-6">
            <table className="w-full min-w-[680px] border-collapse text-right font-body text-sm">
              <thead>
                <tr className="bg-[var(--color-navy)] text-white">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="p-3 border border-[var(--color-border)] font-heading font-semibold"
                      dangerouslySetInnerHTML={{ __html: processInlineMarkdown(header) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[var(--color-cream)]/60"}>
                    {headers.map((_, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-3 border border-[var(--color-border)] text-[var(--color-navy)]/80 align-top leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: processInlineMarkdown(row[cellIndex] || "") }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith("## ")) {
        flushList();
        const text = line.replace("## ", "");
        elements.push(
          <h2
            key={key++}
            id={headingId(text)}
            className="font-heading text-xl md:text-2xl font-bold text-[var(--color-navy)] mt-10 mb-4 pb-2 border-b border-[var(--color-border)]"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(text) }}
          />
        );
      } else if (line.startsWith("### ")) {
        flushList();
        const text = line.replace("### ", "");
        elements.push(
          <h3
            key={key++}
            id={headingId(text)}
            className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mt-6 mb-3"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(text) }}
          />
        );
      }
      // Blockquote
      else if (line.startsWith("> ")) {
        flushList();
        const text = line.replace("> ", "");
        elements.push(
          <blockquote key={key++} className="border-r-4 border-[var(--color-gold)] pr-4 py-3 my-6 bg-[var(--color-gold)]/5 rounded-sm">
            <p className="font-body text-[var(--color-navy)]/80 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(text) }} />
          </blockquote>
        );
      }
      // Horizontal rule
      else if (line.startsWith("---")) {
        flushList();
        elements.push(<hr key={key++} className="my-8 border-[var(--color-border)]" />);
      }
      // Unordered list
      else if (line.startsWith("- ")) {
        if (!inList) {
          flushList();
          inList = true;
        }
        listItems.push(line.replace("- ", ""));
      }
      // Ordered list
      else if (/^\d+\.\s/.test(line)) {
        if (!inOrderedList) {
          flushList();
          inOrderedList = true;
        }
        orderedItems.push(line.replace(/^\d+\.\s/, ""));
      }
      // Empty line
      else if (line.trim() === "") {
        flushList();
      }
      // Regular paragraph
      else {
        flushList();
        elements.push(
          <p key={key++} className="font-body text-[var(--color-navy)]/80 leading-[1.9] mb-4" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
        );
      }
    }

    flushList();
    return elements;
  };

  // Get related articles (same category, different id)
  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        keywords={article.keywords}
        canonicalUrl={`/blog/${article.slug}`}
        ogType="article"
        article={{
          publishedTime: article.date,
          author: "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
          section: article.category,
        }}
        structuredData={articleStructuredData}
      />

      {/* Breadcrumb structured data */}
      <script type="application/ld+json" data-page-schema="breadcrumb" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

      {/* FAQ structured data */}
      {article.faqItems && article.faqItems.length > 0 && (
        <script type="application/ld+json" data-page-schema="faq" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPageForUrl(article.faqItems, `/blog/${article.slug}`)) }} />
      )}

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 mb-5 flex-wrap">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <ChevronIcon size={14} className="text-white/30" />
            <Link href={lp("/blog")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.blog.title}</Link>
            <ChevronIcon size={14} className="text-white/30" />
            <span className="font-body text-sm text-[var(--color-gold)] line-clamp-1">{article.title}</span>
          </nav>

          {/* Category Badge */}
          <span className="inline-block px-3 py-1 text-xs font-heading text-[var(--color-gold)] border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight max-w-4xl">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 font-body text-sm text-white/50">
              <Calendar size={14} />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </span>
            {article.updatedDate && (
              <span className="flex items-center gap-1.5 font-body text-sm text-white/50">
                <Calendar size={14} />
                {lang === "ar" ? "آخر مراجعة:" : "Last reviewed:"}
                <time dateTime={article.updatedDate}>
                  {new Date(article.updatedDate).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </span>
            )}
            <span className="flex items-center gap-1.5 font-body text-sm text-white/50">
              <Clock size={14} />
              {article.readTime} {lang === "ar" ? "قراءة" : "read"}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16 lg:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="max-w-none bg-white p-6 md:p-10 border border-[var(--color-border)]">
              {article.reviewer && (
                <div className="mb-8 p-4 border-r-4 border-[var(--color-gold)] bg-[var(--color-gold)]/5">
                  <p className="font-body text-sm text-[var(--color-navy)]/75 leading-relaxed">
                    {lang === "ar" ? "مراجعة قانونية:" : "Legally reviewed by:"}{" "}
                    {article.reviewer.url ? (
                      <Link href={lp(article.reviewer.url)} className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-gold)]">
                        {article.reviewer.name}
                      </Link>
                    ) : (
                      <strong>{article.reviewer.name}</strong>
                    )}
                    {" — "}
                    {article.reviewer.role}
                  </p>
                </div>
              )}
              {renderContent(article.content)}

              {article.faqItems && article.faqItems.length > 0 && (
                <section aria-labelledby="article-faq-title" className="mt-12 pt-8 border-t border-[var(--color-border)]">
                  <h2 id="article-faq-title" className="font-heading text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-5">
                    {lang === "ar" ? "أسئلة شائعة عن نظام الإفلاس" : "Frequently asked questions"}
                  </h2>
                  <div className="space-y-4">
                    {article.faqItems.map((item, index) => (
                      <details key={index} className="group border border-[var(--color-border)] bg-[var(--color-cream)]/30">
                        <summary className="cursor-pointer list-none p-4 font-heading font-semibold text-[var(--color-navy)] flex items-center justify-between gap-3">
                          <span>{item.question}</span>
                          <span aria-hidden="true" className="text-[var(--color-gold)] text-lg group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="px-4 pb-4 font-body text-[var(--color-navy)]/75 leading-[1.9]">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Keywords */}
              <div className="bg-white p-5 border border-[var(--color-border)]">
                <h3 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-3 flex items-center gap-2">
                  <Tag size={14} className="text-[var(--color-gold)]" />
                  {t.blog.keywords}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[11px] font-body text-[var(--color-navy)]/70 bg-[var(--color-cream)] border border-[var(--color-border)]">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white p-5 border border-[var(--color-border)]">
                  <h3 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-4">{t.blog.relatedArticles}</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        href={lp(`/blog/${related.slug}`)}
                        className="block group"
                      >
                        <h4 className="font-heading text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors leading-relaxed mb-1">
                          {related.title}
                        </h4>
                        <span className="font-body text-[11px] text-[var(--color-navy)]/40">
                          {new Date(related.date).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {article.category === "الإفلاس" && (
                <div className="bg-white p-5 border border-[var(--color-border)]">
                  <h3 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-4">
                    {lang === "ar" ? "دليل خدمات الإفلاس" : "Bankruptcy resources"}
                  </h3>
                  <div className="space-y-1">
                    {[
                      { label: lang === "ar" ? "محامي إفلاس للشركات والدائنين" : "Bankruptcy legal services", path: "/services/bankruptcy" },
                      { label: lang === "ar" ? "أمين إفلاس معتمد — ترخيص 142147" : "Licensed bankruptcy trustee", path: "/licenses/bankruptcy-trustee" },
                      { label: lang === "ar" ? "إجراءات الإفلاس السبعة" : "Seven bankruptcy procedures", path: "/bankruptcy/procedures" },
                      { label: lang === "ar" ? "تقديم مطالبة دائن" : "Submit a creditor claim", path: "/bankruptcy/claims" },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        href={lp(item.path)}
                        className="flex items-center justify-between gap-2 py-2.5 border-b border-[var(--color-border)] last:border-0 font-body text-sm text-[var(--color-navy)]/75 hover:text-[var(--color-gold)] transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronIcon size={14} className="flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-[var(--color-navy)] p-5 text-center">
                <h3 className="font-heading text-sm font-semibold text-white mb-2">{t.cta.title}</h3>
                <p className="font-body text-xs text-white/60 mb-4">{lang === "ar" ? "فريقنا المتخصص جاهز لمساعدتك" : "Our specialized team is ready to help you"}</p>
                <a
                  href="https://wa.me/966505149800"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('blog_sidebar')}
                  className="inline-block w-full py-2.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading text-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-colors"
                >
                  {t.cta.contactUs}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Back to Blog */}
      <section className="py-8 bg-white border-t border-[var(--color-border)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <Link href={lp("/blog")} className="inline-flex items-center gap-2 font-heading text-sm text-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors">
            <BackArrow size={16} />
            {lang === "ar" ? "العودة إلى المدونة القانونية" : "Back to Legal Blog"}
          </Link>
        </div>
      </section>
    </>
  );
}
