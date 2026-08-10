import { Star, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";

// ── بيانات تقييم خرائط جوجل الحقيقية (حدّثها يدوياً عند تغيّر التقييم) ──
const GOOGLE_RATING = 4.2;
const GOOGLE_REVIEW_COUNT = 13;
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس بريدة");

const FILL_PERCENT = (GOOGLE_RATING / 5) * 100;

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
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
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const ratingText = GOOGLE_RATING.toLocaleString(isAr ? "ar-SA" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const countText = GOOGLE_REVIEW_COUNT.toLocaleString(isAr ? "ar-SA" : "en-US");

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-5 md:px-4 lg:px-8">
        <div
          ref={ref}
          className="transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Compact horizontal layout */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto px-6 py-5 border border-[var(--color-border)] bg-[var(--color-cream)] hover:border-[var(--color-gold)]/50 hover:shadow-md transition-all duration-200"
          >
            {/* Google logo + rating number */}
            <div className="flex items-center gap-3">
              <GoogleLogo />
              <span className="font-display text-3xl font-bold text-[var(--color-navy)] leading-none" dir="ltr">
                {ratingText}
              </span>
              <span className="font-body text-sm text-[var(--color-navy)]/40" dir="ltr">/ 5</span>
            </div>

            {/* Stars */}
            <div className="relative inline-flex" aria-hidden="true">
              <div className="flex gap-0.5 text-[var(--color-navy)]/15">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} strokeWidth={1} fill="currentColor" />
                ))}
              </div>
              <div
                className="absolute inset-0 flex gap-0.5 overflow-hidden text-[var(--color-gold)]"
                style={{ width: `${FILL_PERCENT}%` }}
              >
                <div className="flex gap-0.5 flex-shrink-0">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} strokeWidth={1} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Review count + link hint */}
            <div className="flex items-center gap-2">
              <span className="font-body text-xs text-[var(--color-navy)]/60">
                {isAr ? `${countText} مراجعة` : `${countText} reviews`}
              </span>
              <ExternalLink size={12} className="text-[var(--color-navy)]/40 group-hover:text-[var(--color-gold)] transition-colors" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
