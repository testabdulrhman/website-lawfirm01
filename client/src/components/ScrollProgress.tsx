/*
 * ScrollProgress — شريط تقدّم القراءة العلوي
 * Design: thin gold gradient bar fixed at the very top, grows with scroll depth.
 * Motion: GPU-only (transform scaleX), 90ms linear follow for smoothness.
 * Respects prefers-reduced-motion (still shows but without smoothing transition).
 */
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(pct, 0), 1));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, var(--color-gold), var(--color-gold-light, #d4af37))",
          transition: "transform 90ms linear",
          boxShadow: progress > 0.01 ? "0 0 8px var(--color-gold)" : "none",
        }}
      />
    </div>
  );
}
