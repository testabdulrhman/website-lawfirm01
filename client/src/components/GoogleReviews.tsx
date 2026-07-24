import { Star, ExternalLink, PenLine } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";

// ── بيانات تقييم خرائط جوجل الحقيقية (حدّثها يدوياً عند تغيّر التقييم) ──
const GOOGLE_RATING = 4.2;
const GOOGLE_REVIEW_COUNT = 13;
// رابط بحث خرائط جوجل يفتح بطاقة المكتب (لقراءة المراجعات).
// الأفضل استبداله برابط النشاط المختصر (maps.app.goo.gl/…) عند توفّره.
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("شركة عبدالرحمن بن رضوان المشيقح للمحاماة بريدة");

// نسبة تعبئة النجوم (4.2 من 5 = 84%)
const FILL_PERCENT = (GOOGLE_RATING / 5) * 100;

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" width="26" height="26" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default function GoogleReviews() {
  const { lang } = useTranslation();
  const isAr = lang === "ar";
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const ratingText = GOOGLE_RATING.toLocaleString(isAr ? "ar-SA" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const countText = GOOGLE_REVIEW_COUNT.toLocaleString(isAr ? "ar-SA" : "en-US");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-4 lg:px-8">
        <div
          ref={ref}
          className="max-w-3xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[var(--color-gold)]" />
            <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
              {isAr ? "تقييمات موثّقة" : "Verified Reviews"}
            </span>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-navy)] leading-tight mb-10">
            {isAr ? (
              <>
                ثقة عملائنا <span className="text-[var(--color-gold)]">موثّقة على خرائط جوجل</span>
              </>
            ) : (
              <>
                Client trust, <span className="text-[var(--color-gold)]">verified on Google</span>
              </>
            )}
          </h2>

          {/* Rating card */}
          <div className="inline-flex flex-col items-center gap-5 px-8 py-8 md:px-14 md:py-10 bg-[var(--color-cream)] border border-[var(--color-border)]">
            <div className="flex items-center gap-2.5">
              <GoogleLogo />
              <span className="font-heading text-base font-semibold text-[var(--color-navy)]">
                Google
              </span>
            </div>

            <div className="flex items-baseline gap-3" dir="ltr">
              <span className="font-display text-5xl md:text-6xl font-bold text-[var(--color-navy)] leading-none">
                {ratingText}
              </span>
              <span className="font-body text-lg text-[var(--color-navy)]/40">/ 5</span>
            </div>

            {/* Stars — partial fill overlay */}
            <div className="relative inline-flex" aria-hidden="true">
              <div className="flex gap-1 text-[var(--color-navy)]/15">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={26} strokeWidth={1} fill="currentColor" />
                ))}
              </div>
              <div
                className="absolute inset-0 flex gap-1 overflow-hidden text-[var(--color-gold)]"
                style={{ width: `${FILL_PERCENT}%` }}
              >
                <div className="flex gap-1 flex-shrink-0">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={26} strokeWidth={1} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            <p className="font-body text-sm text-[var(--color-navy)]/60">
              {isAr
                ? `بناءً على ${countText} مراجعة على خرائط جوجل`
                : `Based on ${countText} reviews on Google Maps`}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-2 w-full sm:w-auto">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-navy)] text-[var(--color-cream)] font-heading text-sm font-semibold hover:bg-[var(--color-navy-light)] hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
              >
                <ExternalLink size={16} />
                <span>{isAr ? "اقرأ المراجعات" : "Read reviews"}</span>
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--color-navy)]/20 text-[var(--color-navy)] font-heading text-sm font-semibold hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-200 active:scale-[0.97]"
              >
                <PenLine size={16} />
                <span>{isAr ? "أضف تقييمك" : "Write a review"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
