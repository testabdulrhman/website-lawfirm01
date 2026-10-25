import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import stylesUrl from "@/styles/proceedings.css?url";
import { DATA_AS_OF } from "@/data/proceedings";

/**
 * The first render uses the date the data was read, so the prerendered page and the
 * hydrating client agree; the real clock takes over once the page is live.
 */
const AS_OF_MS = Date.parse(`${DATA_AS_OF}T12:00:00+03:00`);
export function useNow(tickMs?: number) {
  const [now, setNow] = useState(AS_OF_MS);
  useEffect(() => {
    setNow(Date.now());
    if (!tickMs) return;
    const id = window.setInterval(() => setNow(Date.now()), tickMs);
    return () => window.clearInterval(id);
  }, [tickMs]);
  return now;
}

/** The proceedings stylesheet, hoisted into <head> by React and held until it loads. */
export function ProceedingsShell({ children }: { children: ReactNode }) {
  return (
    <div className="pp" dir="rtl" lang="ar">
      <link rel="stylesheet" href={stylesUrl} precedence="proceedings" />
      {children}
    </div>
  );
}

export const Arrow = () => (
  <svg viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M15 5H1M5 1L1 5l4 4" />
  </svg>
);
export const Out = () => (
  <svg viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M3 9l8-8M4 1h7v7" />
  </svg>
);
export const Diamond = () => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 1l6 6-6 6-6-6z" />
  </svg>
);

/** Digits-only values are set as numbers; anything else as text. */
export const Num = ({ v }: { v: string }) =>
  /^[\d\s]+$/.test(v) ? <span className="num">{v.trim()}</span> : <>{v}</>;

export function Crumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="crumb" aria-label="مسار التنقل">
      {trail.map((c, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <i aria-hidden="true">/</i>}
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
