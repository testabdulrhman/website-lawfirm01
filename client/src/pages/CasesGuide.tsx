import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, ChevronDown, ChevronUp, Users, Briefcase, HardHat, Shield, Scale, Gavel, FileCheck, X, Filter, BookOpen } from "lucide-react";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import SEOHead from "@/components/SEOHead";
import { casesGuide, getSubcategories, getTotalCasesCount, type CaseCategory, type CaseType } from "@/data/casesGuide";
import { localePath } from "@/lib/localePath";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  Users, Briefcase, HardHat, Shield, Scale, Gavel, FileCheck
};

export default function CasesGuide() {
  const { lang } = useLanguage();
  const lp = (p: string) => localePath(p, lang);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  // Filter logic
  const filteredResults = useMemo(() => {
    let results: { category: CaseCategory; cases: CaseType[] }[] = [];

    const query = searchQuery.trim().toLowerCase();

    for (const category of casesGuide) {
      if (selectedCategory && category.id !== selectedCategory) continue;

      let filtered = category.cases;

      if (selectedSubcategory) {
        filtered = filtered.filter(c => c.subcategory === selectedSubcategory);
      }

      if (query) {
        filtered = filtered.filter(c =>
          c.caseType.toLowerCase().includes(query) ||
          c.subcategory.toLowerCase().includes(query) ||
          c.definition.toLowerCase().includes(query) ||
          c.requests.some(r => r.toLowerCase().includes(query))
        );
      }

      if (filtered.length > 0) {
        results.push({ category, cases: filtered });
      }
    }

    return results;
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  const totalFiltered = filteredResults.reduce((sum, r) => sum + r.cases.length, 0);

  const subcategories = selectedCategory ? getSubcategories(selectedCategory) : [];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "دليل الدعاوى القضائية - تصنيفات منصة ناجز",
      "description": "دليل شامل لجميع تصنيفات الدعاوى القضائية في منصة ناجز: الأحوال الشخصية، التجارية، العمالية، الجزائية، العامة، التنفيذ، والإنهاءات.",
      "url": "https://redwan.sa/cases-guide",
      "publisher": {
        "@type": "Organization",
        "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
        "url": "https://redwan.sa"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما هي تصنيفات الدعاوى القضائية في منصة ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تنقسم الدعاوى القضائية في منصة ناجز إلى 7 تصنيفات رئيسية: دعاوى الأحوال الشخصية، الدعاوى التجارية، الدعاوى العمالية، الدعاوى الجزائية، الدعاوى العامة، دعاوى التنفيذ، والدعاوى المتعلقة بالإنهاءات. وتشمل أكثر من 137 نوع دعوى فرعي."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي دعاوى الأحوال الشخصية في ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل دعاوى الأحوال الشخصية: دعاوى الزواج والفرقة (إثبات عقد الزواج، إثبات الطلاق، فسخ عقد النكاح)، دعاوى الحضانة والزيارة، دعاوى النفقة، ودعاوى المواريث والوصايا. وهي من أكثر التصنيفات شيوعاً في المحاكم السعودية."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي أنواع الدعاوى التجارية في منصة ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل الدعاوى التجارية: المنازعات التجارية، الشركات والشراكات، الإفلاس (إعادة التنظيم المالي، التصفية، التصفية لصغار المدينين)، الأوراق التجارية، الوكالات التجارية، التأمين، والملكية الفكرية. وتُنظر أمام المحكمة التجارية."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي دعاوى الإفلاس المتاحة في ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل دعاوى الإفلاس في ناجز: إعادة التنظيم المالي (لإعادة هيكلة ديون المدين)، التصفية (لتصفية أصول المدين وتوزيعها على الدائنين)، والتصفية لصغار المدينين (إجراء مبسط للمدينين الذين لا تتجاوز ديونهم حداً معيناً)."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي الدعاوى العمالية في ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل الدعاوى العمالية: المنازعات العمالية (الفصل التعسفي، الأجور، الإجازات، إصابات العمل)، المنازعات المتعلقة بعقود العمل، والتعويضات. وتُنظر أمام المحكمة العمالية."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي الدعاوى الجزائية في منصة ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل الدعاوى الجزائية: الجرائم الموجبة للتوقيف، الجرائم المعلوماتية، جرائم الاحتيال، التزوير، السرقة، الاعتداء، القذف والسب، وجرائم المخدرات. وتُنظر أمام المحكمة الجزائية."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي دعاوى التنفيذ في ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تشمل دعاوى التنفيذ: تنفيذ الأحكام القضائية، تنفيذ السندات التنفيذية (الشيكات، الكمبيالات، العقود الموثقة)، الحبس التنفيذي، والإفصاح عن الأصول. وتُقدم عبر محكمة التنفيذ."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي الدعاوى المتعلقة بالإنهاءات في ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "الإنهاءات هي طلبات لا تتضمن خصومة بين طرفين، وتشمل: إثبات الوفاة، حصر الورثة، الولاية على القاصر، الإذن بالبيع، واستخراج صكوك الإعالة. وتُقدم للمحكمة بدون مدعى عليه."
          }
        },
        {
          "@type": "Question",
          "name": "كيف أرفع دعوى عبر منصة ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "لرفع دعوى عبر ناجز: 1) ادخل على بوابة ناجز (najiz.sa)، 2) اختر التصنيف الرئيسي للدعوى، 3) حدد التصنيف الفرعي ونوع الدعوى، 4) اختر الطلبات المناسبة، 5) أرفق المستندات المطلوبة. يُنصح بالاستعانة بمحامٍ متخصص لضمان صحة التصنيف والطلبات."
          }
        },
        {
          "@type": "Question",
          "name": "هل أحتاج محامي لرفع دعوى في ناجز؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ليس إلزامياً في جميع الدعاوى، لكن يُنصح بشدة بالاستعانة بمحامٍ متخصص خاصة في الدعاوى التجارية والجزائية وقضايا الإفلاس، لأن اختيار التصنيف الخاطئ أو الطلبات غير المناسبة قد يؤدي لرفض الدعوى أو تأخيرها. شركة المشيقح للمحاماة تقدم خدمة رفع الدعاوى والتمثيل القانوني في جميع التصنيفات."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="دليل الدعاوى القضائية | تصنيفات منصة ناجز - شركة المشيقح للمحاماة"
        description="دليل شامل ومحدّث لجميع تصنيفات الدعاوى القضائية في منصة ناجز: الأحوال الشخصية، التجارية، العمالية، الجزائية، العامة، التنفيذ، والإنهاءات. ابحث عن نوع دعواك واعرف الطلبات المتاحة."
        keywords={["دليل الدعاوى القضائية", "تصنيفات ناجز", "أنواع الدعاوى", "المحكمة التجارية", "الأحوال الشخصية", "الدعاوى العمالية", "الإفلاس", "التنفيذ", "محامي بريدة"]}
        canonicalUrl="/cases-guide"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div ref={heroRef} className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">الرئيسية</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">دليل الدعاوى القضائية</span>
          </nav>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)" }}>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              دليل الدعاوى القضائية
            </h1>
            <p className="font-body text-base md:text-lg text-white/60 max-w-3xl mb-2">
              دليل شامل لجميع تصنيفات الدعاوى القضائية في منصة ناجز. ابحث عن نوع دعواك واعرف التصنيف الفرعي والطلبات المتاحة.
            </p>
            <p className="font-body text-sm text-white/40">
              المصدر: تفريغ تصنيفات منصة ناجز — يشمل <span className="text-[var(--color-gold-bright)]">{getTotalCasesCount()}</span> نوع دعوى في <span className="text-[var(--color-gold-bright)]">{casesGuide.length}</span> تصنيفات رئيسية
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن نوع الدعوى، التصنيف الفرعي، أو الطلبات..."
              className="w-full pr-12 pl-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]/30 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <button
              onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
              className={`px-3 py-1.5 text-xs font-body border transition-all ${!selectedCategory ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]" : "bg-white text-gray-600 border-[var(--color-border)] hover:border-[var(--color-gold)]"}`}
            >
              الكل ({getTotalCasesCount()})
            </button>
            {casesGuide.map(cat => {
              const Icon = iconMap[cat.icon] || BookOpen;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id === selectedCategory ? null : cat.id); setSelectedSubcategory(null); }}
                  className={`px-3 py-1.5 text-xs font-body border transition-all flex items-center gap-1.5 ${selectedCategory === cat.id ? "text-white border-transparent" : "bg-white text-gray-600 border-[var(--color-border)] hover:border-[var(--color-gold)]"}`}
                  style={selectedCategory === cat.id ? { backgroundColor: cat.color } : undefined}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{cat.name.replace(/^(دعاوى |الدعاوى )/, "")}</span>
                  <span className="sm:hidden">{cat.name.replace(/^(دعاوى |الدعاوى )/, "").split(" ")[0]}</span>
                  <span className="opacity-70">({cat.cases.length})</span>
                </button>
              );
            })}
          </div>

          {/* Subcategory Filters */}
          {selectedCategory && subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[var(--color-border)]/50">
              <span className="text-xs text-gray-400 font-body self-center">التصنيف الفرعي:</span>
              {subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub === selectedSubcategory ? null : sub)}
                  className={`px-2.5 py-1 text-[11px] font-body border transition-all ${selectedSubcategory === sub ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)]" : "bg-[var(--color-cream)] text-gray-600 border-[var(--color-border)] hover:border-[var(--color-gold)]"}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Active filters summary */}
          {(searchQuery || selectedCategory || selectedSubcategory) && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]/50">
              <span className="text-xs text-gray-500 font-body">
                عرض <span className="font-bold text-[var(--color-navy)]">{totalFiltered}</span> نتيجة
              </span>
              <button onClick={clearFilters} className="text-xs text-[var(--color-gold)] hover:underline font-body">
                مسح الفلاتر
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 lg:py-20 bg-[var(--color-cream)] min-h-[50vh]">
        <div ref={gridRef} className="container mx-auto px-5 md:px-4 lg:px-8">
          {filteredResults.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="font-body text-gray-500 text-lg mb-2">لا توجد نتائج</p>
              <p className="font-body text-gray-400 text-sm">حاول تغيير كلمات البحث أو الفلاتر</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredResults.map((group, groupIdx) => {
                const Icon = iconMap[group.category.icon] || BookOpen;
                return (
                  <div key={group.category.id} style={getStaggerStyle(gridVisible, groupIdx, 150)}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: group.category.color + "15", border: `1px solid ${group.category.color}30` }}>
                        <Icon className="w-5 h-5" style={{ color: group.category.color }} />
                      </div>
                      <div>
                        <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">{group.category.name}</h2>
                        <p className="font-body text-xs text-gray-400">{group.cases.length} نوع دعوى</p>
                      </div>
                    </div>

                    {/* Cases Table */}
                    <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                      {/* Table Header - Desktop */}
                      <div className="hidden md:grid md:grid-cols-12 gap-4 px-5 py-3 bg-[var(--color-navy)]/[0.03] border-b border-[var(--color-border)] font-body text-xs text-gray-500 font-medium">
                        <div className="col-span-3">التصنيف الفرعي</div>
                        <div className="col-span-3">نوع الدعوى</div>
                        <div className="col-span-5">الطلبات المتاحة</div>
                        <div className="col-span-1"></div>
                      </div>

                      {/* Cases Rows */}
                      {group.cases.map((caseItem, idx) => (
                        <div key={caseItem.id} className="border-b border-[var(--color-border)]/50 last:border-b-0">
                          {/* Desktop Row */}
                          <div
                            className="hidden md:grid md:grid-cols-12 gap-4 px-5 py-4 items-start hover:bg-[var(--color-gold)]/[0.02] transition-colors cursor-pointer"
                            onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                          >
                            <div className="col-span-3">
                              <span className="font-body text-sm text-gray-600">{caseItem.subcategory}</span>
                            </div>
                            <div className="col-span-3">
                              <span className="font-body text-sm font-medium text-[var(--color-navy)]">{caseItem.caseType}</span>
                            </div>
                            <div className="col-span-5">
                              <div className="flex flex-wrap gap-1.5">
                                {caseItem.requests.slice(0, 3).map((req, i) => (
                                  <span key={i} className="inline-block px-2 py-0.5 text-[11px] font-body bg-[var(--color-cream)] text-gray-600 border border-[var(--color-border)]">
                                    {req}
                                  </span>
                                ))}
                                {caseItem.requests.length > 3 && (
                                  <span className="inline-block px-2 py-0.5 text-[11px] font-body text-[var(--color-gold)]">
                                    +{caseItem.requests.length - 3} أخرى
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-span-1 flex justify-end">
                              {(caseItem.definition || caseItem.requests.length > 3) && (
                                expandedCase === caseItem.id
                                  ? <ChevronUp className="w-4 h-4 text-gray-400" />
                                  : <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          </div>

                          {/* Mobile Row */}
                          <div
                            className="md:hidden px-4 py-3 cursor-pointer active:bg-[var(--color-gold)]/[0.03]"
                            onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-body text-xs text-gray-400 mb-0.5">{caseItem.subcategory}</p>
                                <p className="font-body text-sm font-medium text-[var(--color-navy)]">{caseItem.caseType}</p>
                              </div>
                              {(caseItem.definition || caseItem.requests.length > 0) && (
                                expandedCase === caseItem.id
                                  ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                                  : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {expandedCase === caseItem.id && (
                            <div className="px-5 pb-4 bg-[var(--color-cream)]/50 border-t border-[var(--color-border)]/30">
                              {caseItem.definition && (
                                <div className="pt-3 mb-3">
                                  <p className="font-body text-xs text-gray-500 mb-1 font-medium">تعريف الدعوى:</p>
                                  <p className="font-body text-sm text-gray-700 leading-relaxed">{caseItem.definition}</p>
                                </div>
                              )}
                              {caseItem.requests.length > 0 && (
                                <div className="pt-2">
                                  <p className="font-body text-xs text-gray-500 mb-2 font-medium">جميع الطلبات المتاحة:</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {caseItem.requests.map((req, i) => (
                                      <span key={i} className="inline-block px-2.5 py-1 text-[11px] font-body bg-white text-gray-700 border border-[var(--color-border)]">
                                        {req}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            تحتاج مساعدة قانونية؟
          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto mb-8">
            فريقنا القانوني مستعد لمساعدتك في تحديد نوع دعواك وتمثيلك أمام المحاكم المختصة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={lp("/contact")} className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-gold)] text-white font-body text-sm font-medium hover:bg-[var(--color-gold-light)] transition-colors">
              احجز استشارة مجانية
            </Link>
            <Link href={lp("/services")} className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white font-body text-sm hover:bg-white/5 transition-colors">
              تصفّح خدماتنا
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
