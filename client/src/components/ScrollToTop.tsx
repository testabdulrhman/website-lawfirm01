/*
 * ScrollToTop — زر العودة لأعلى الصفحة
 * Design: navy circular button with gold ring, appears after 400px scroll.
 * Sits above the WhatsApp button (stacked vertically), RTL-aware.
 * Motion: scale(0.9)+opacity entrance via ease-out, never from scale(0).
 */
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isRTL ? "العودة إلى الأعلى" : "Back to top"}
      className={`fixed ${isRTL ? "left-5" : "right-5"} bottom-[88px] z-50 w-12 h-12 rounded-full bg-[var(--color-navy)] text-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/40 flex items-center justify-center shadow-lg hover:bg-[var(--color-navy-light)] hover:ring-[var(--color-gold)] active:scale-[0.92]`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(8px)",
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 220ms cubic-bezier(0.23,1,0.32,1), transform 220ms cubic-bezier(0.23,1,0.32,1), background-color 200ms ease, box-shadow 200ms ease",
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
