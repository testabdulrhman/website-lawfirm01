import { useState, useMemo } from "react";
import { legalTerms, arabicLetters, type LegalTerm } from "@/data/legalDictionary";
import SEOHead from "@/components/SEOHead";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Search, BookOpen, Globe, ArrowUp } from "lucide-react";

export default function LegalDictionary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { ref: heroRef } = useScrollAnimation();

  // Handle scroll to top button visibility
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 400);
    });
  }

  const filteredTerms = useMemo(() => {
    let results = legalTerms;

    if (selectedLetter) {
      results = results.filter((term) => term.letter === selectedLetter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      results = results.filter(
        (term) =>
          term.ar.includes(query) ||
          term.en.toLowerCase().includes(query)
      );
    }

    return results;
  }, [searchQuery, selectedLetter]);

  const termsByLetter = useMemo(() => {
    const grouped: Record<string, LegalTerm[]> = {};
    for (const term of filteredTerms) {
      if (!grouped[term.letter]) {
        grouped[term.letter] = [];
      }
      grouped[term.letter].push(term);
    }
    return grouped;
  }, [filteredTerms]);

  const sortedLetters = useMemo(() => {
    return arabicLetters.filter((l) => termsByLetter[l]?.length);
  }, [termsByLetter]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هو المعجم القانوني؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "المعجم القانوني هو مرجع شامل للمصطلحات العدلية الواردة في الأنظمة السعودية مع ترجمتها الرسمية إلى اللغة الإنجليزية، صادر عن مركز البحوث بوزارة العدل.",
        },
      },
      {
        "@type": "Question",
        name: "كم عدد المصطلحات في المعجم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يحتوي المعجم على أكثر من 680 مصطلحاً قانونياً مستخلصاً من 12 نظاماً سعودياً تشمل نظام القضاء ونظام المرافعات الشرعية ونظام المحاكم التجارية وغيرها.",
        },
      },
      {
        "@type": "Question",
        name: "ما هي الأنظمة التي يغطيها المعجم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يغطي المعجم 12 نظاماً: نظام القضاء، نظام ديوان المظالم، نظام النيابة العامة، نظام التنفيذ، نظام المرافعات الشرعية، نظام المحاكم التجارية، نظام الإجراءات الجزائية، نظام المرافعات أمام ديوان المظالم، نظام المحاماة، نظام التوثيق، نظام الرهن العقاري، ونظام التسجيل العيني للعقار.",
        },
      },
      {
        "@type": "Question",
        name: "ما معنى مصطلح الإفلاس بالإنجليزية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "مصطلح الإفلاس يُترجم رسمياً إلى Bankruptcy في الأنظمة السعودية.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="المعجم القانوني | ترجمة المصطلحات العدلية السعودية"
        description="معجم شامل لأكثر من 680 مصطلحاً قانونياً سعودياً مع ترجمتها الرسمية إلى الإنجليزية. مستخلص من 12 نظاماً عدلياً صادراً عن وزارة العدل."
        keywords={["معجم قانوني", "مصطلحات قانونية", "ترجمة قانونية", "مصطلحات عدلية", "قاموس قانوني سعودي", "legal dictionary saudi", "legal terms arabic english"]}
        canonicalUrl="https://redwan.sa/legal-dictionary"
        structuredData={faqSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0F1B2D] to-[#1a2d47]">
        <div className="container max-w-5xl" ref={heroRef}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 mb-6">
              <BookOpen className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-medium">
                وزارة العدل — مركز البحوث
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[Playfair_Display]">
              المعجم القانوني
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">
              معجم المصطلحات العدلية الواردة في الأنظمة السعودية
            </p>
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              عربي — إنجليزي | {legalTerms.length} مصطلح من 12 نظاماً
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث بالعربي أو الإنجليزي..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E]/50 text-lg backdrop-blur-sm transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Letter Filter */}
      <section className="sticky top-16 z-30 bg-[#0F1B2D]/95 backdrop-blur-md border-b border-white/10 py-3">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                !selectedLetter
                  ? "bg-[#C9A96E] text-[#0F1B2D]"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              الكل
            </button>
            {arabicLetters.map((letter) => (
              <button
                key={letter}
                onClick={() =>
                  setSelectedLetter(selectedLetter === letter ? null : letter)
                }
                className={`shrink-0 w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  selectedLetter === letter
                    ? "bg-[#C9A96E] text-[#0F1B2D]"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-[#0a1320] min-h-[60vh]">
        <div className="container max-w-5xl">
          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              {filteredTerms.length} مصطلح
              {selectedLetter && ` — حرف ${selectedLetter}`}
              {searchQuery && ` — "${searchQuery}"`}
            </p>
            {(searchQuery || selectedLetter) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLetter(null);
                }}
                className="text-[#C9A96E] text-sm hover:underline"
              >
                مسح الفلتر
              </button>
            )}
          </div>

          {/* Terms grouped by letter */}
          {sortedLetters.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">لا توجد نتائج</p>
              <p className="text-gray-500 text-sm mt-2">
                جرّب كلمة بحث مختلفة
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedLetters.map((letter) => (
                <div key={letter} id={`letter-${letter}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] font-bold text-lg">
                      {letter}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A96E]/20" />
                    <span className="text-gray-500 text-xs">
                      {termsByLetter[letter].length} مصطلح
                    </span>
                  </div>

                  <div className="grid gap-2">
                    {termsByLetter[letter].map((term) => (
                      <div
                        key={term.id}
                        className="group flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#C9A96E]/20 hover:bg-white/[0.04] transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-gray-500 text-xs font-mono shrink-0 w-6 text-center">
                            {term.id}
                          </span>
                          <span className="text-white font-medium truncate">
                            {term.ar}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm font-mono truncate text-left" dir="ltr">
                          {term.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Source Attribution */}
      <section className="py-8 bg-[#0F1B2D] border-t border-white/5">
        <div className="container max-w-5xl text-center">
          <p className="text-gray-400 text-sm">
            المصدر:{" "}
            <a
              href="https://www.moj.gov.sa/Documents/DictionaryOfLegalTermsV1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] hover:underline"
            >
              معجم المصطلحات العدلية — وزارة العدل
            </a>{" "}
            | الإصدار الأول 1444هـ — 2022م
          </p>
        </div>
      </section>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-[#C9A96E] text-[#0F1B2D] shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
          aria-label="العودة للأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
