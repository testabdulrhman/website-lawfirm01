/*
 * PageTransition — انتقال ناعم بين الصفحات
 * Design: on route change, content fades + lifts in (opacity 0→1, translateY 12px→0).
 * Keeps motion subtle (240ms ease-out) so navigation feels intentional, not flashy.
 * Disabled under prefers-reduced-motion.
 */
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [stage, setStage] = useState<"in" | "out">("in");
  const normalizedLocation =
    location.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  const [displayLocation, setDisplayLocation] = useState(normalizedLocation);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReduced(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (normalizedLocation === displayLocation) return;
    if (prefersReduced) {
      setDisplayLocation(normalizedLocation);
      return;
    }
    setStage("out");
    const t = setTimeout(() => {
      setDisplayLocation(normalizedLocation);
      setStage("in");
    }, 160);
    return () => clearTimeout(t);
  }, [normalizedLocation, displayLocation, prefersReduced]);

  return (
    <div
      style={{
        opacity: stage === "in" ? 1 : 0,
        transform: stage === "in" ? "translateY(0)" : "translateY(12px)",
        transition:
          prefersReduced
            ? "none"
            : "opacity 240ms cubic-bezier(0.23,1,0.32,1), transform 240ms cubic-bezier(0.23,1,0.32,1)",
      }}
      data-page={displayLocation}
    >
      {children}
    </div>
  );
}
