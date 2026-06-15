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
  const [displayLocation, setDisplayLocation] = useState(location);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (location === displayLocation) return;
    if (prefersReduced) {
      setDisplayLocation(location);
      return;
    }
    setStage("out");
    const t = setTimeout(() => {
      setDisplayLocation(location);
      setStage("in");
    }, 160);
    return () => clearTimeout(t);
  }, [location, displayLocation, prefersReduced]);

  if (prefersReduced) return <>{children}</>;

  return (
    <div
      style={{
        opacity: stage === "in" ? 1 : 0,
        transform: stage === "in" ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 240ms cubic-bezier(0.23,1,0.32,1), transform 240ms cubic-bezier(0.23,1,0.32,1)",
      }}
      data-page={displayLocation}
    >
      {children}
    </div>
  );
}
