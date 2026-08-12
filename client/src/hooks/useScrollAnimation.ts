import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  initialVisible?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px",
    triggerOnce = true,
    initialVisible = false,
  } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(initialVisible);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useCountUp(target: number, duration: number = 2000, isVisible: boolean) {
  // Initialize with target value so crawlers/SSR see the real number
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    // Start animation from 0 for visual effect
    setCount(0);
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
}

// Stagger children animation - returns CSS style for each child
export function getStaggerDelay(index: number, baseDelay: number = 60): string {
  return `${index * baseDelay}ms`;
}

// Stagger animation styles helper
export function getStaggerStyle(isVisible: boolean, index: number, baseDelay: number = 60) {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)`,
    transitionDelay: isVisible ? `${index * baseDelay}ms` : "0ms",
  };
}

// Fade in from direction
export type FadeDirection = "up" | "down" | "left" | "right";

export function getFadeStyle(isVisible: boolean, direction: FadeDirection = "up", delay: number = 0) {
  const transforms: Record<FadeDirection, string> = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
  };

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : transforms[direction],
    transition: `opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`,
    transitionDelay: `${delay}ms`,
  };
}

// Scale in animation
export function getScaleStyle(isVisible: boolean, delay: number = 0) {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.92)",
    transition: `opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1), transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)`,
    transitionDelay: `${delay}ms`,
  };
}
