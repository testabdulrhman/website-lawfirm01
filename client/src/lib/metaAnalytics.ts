/** Optional Meta measurement. Never pass form fields or case data to this module. */
export const META_PIXEL_ID = "1663848689087216";
// Rollout gate: enable only after consent/UI and Events Manager checks.
// Default builds, previews and an accidental deploy must not start tracking.
export const META_MEASUREMENT_ENABLED =
  import.meta.env.VITE_META_PIXEL_ENABLED === "true";
const CONSENT_KEY = "redwan_meta_consent_v1";
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export const META_CONSENT_EVENT = "redwan:meta-consent";
export type MetaConsent = "granted" | "denied" | "unknown";
let withdrawnThisSession = false;

type Pixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Pixel;
  disablePushState: boolean;
};

declare global {
  interface Window {
    fbq?: Pixel;
    _fbq?: Pixel;
  }
}

// Deliberately NOT a prefix match: creditor portals, named cases, reports,
// careers and booking confirmation pages must never run this integration.
const PUBLIC_PATHS = new Set([
  "/",
  "/en",
  "/contact",
  "/en/contact",
  "/appointments",
  "/services/bankruptcy",
  "/en/services/bankruptcy",
  "/services/bankruptcy/companies",
]);

export function isMetaPublicPath(path: string): boolean {
  return PUBLIC_PATHS.has(path.replace(/\/$/, "") || "/");
}

/** Fail closed because the SDK can collect the browser URL and referrer. */
export function isMetaSafeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (
      url.origin !== "https://redwan.sa" ||
      url.hash ||
      !isMetaPublicPath(url.pathname)
    )
      return false;
    const seen = new Set<string>();
    for (const [key, val] of Array.from(url.searchParams.entries())) {
      if (seen.has(key)) return false;
      seen.add(key);
      if (key === "fbclid" && /^[A-Za-z0-9_-]{10,1024}$/.test(val)) continue;
      if (key === "utm_source" && val === "meta") continue;
      if (key === "utm_medium" && val === "paid_social") continue;
      if (
        ["utm_campaign", "utm_content", "utm_id"].includes(key) &&
        /^\d{5,30}$/.test(val)
      )
        continue;
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function safeReferrer(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    if (url.origin === "https://redwan.sa") return isMetaSafeUrl(value);
    // External referrers must be origin-only, not search terms or private URLs.
    return (
      url.protocol === "https:" &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

export function getMetaConsent(): MetaConsent {
  if (typeof window === "undefined") return "unknown";
  if (withdrawnThisSession) return "denied";
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(CONSENT_KEY) || "null"
    );
    if (
      saved?.expires > Date.now() &&
      ["granted", "denied"].includes(saved.choice)
    )
      return saved.choice;
  } catch {
    /* Blocked/corrupt storage means no consent. */
  }
  return "unknown";
}

export function setMetaConsent(choice: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  if (choice === "denied") {
    withdrawnThisSession = true;
    try {
      window.fbq?.("consent", "revoke");
    } catch {
      /* Measurement must never break the UI. */
    }
    // Remove only this integration's advertising cookies, never GA cookies.
    try {
      for (const name of ["_fbp", "_fbc"]) {
        for (const domain of [
          "",
          "; domain=redwan.sa",
          "; domain=.redwan.sa",
        ]) {
          document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
        }
      }
    } catch {
      /* Browser cookie restrictions must not prevent withdrawal. */
    }
  }
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ choice, expires: Date.now() + CONSENT_LIFETIME })
    );
    if (choice === "granted") withdrawnThisSession = false;
  } catch {
    /* Do not load the SDK if the choice cannot be stored. */
  }
  window.dispatchEvent(new Event(META_CONSENT_EVENT));
}

function allowed(): boolean {
  return (
    META_MEASUREMENT_ENABLED &&
    typeof window !== "undefined" &&
    getMetaConsent() === "granted" &&
    !window.__REDWAN_ANALYTICS_DISABLED__ &&
    isMetaSafeUrl(window.location.href) &&
    safeReferrer(document.referrer)
  );
}

let loading: Promise<boolean> | undefined;
let ready = false;
let initialized = false;
let lastPage = "";
const sentConversions = new Set<string>();

function loadPixel(): Promise<boolean> {
  if (ready) return Promise.resolve(true);
  if (loading) return loading;
  // Do not silently share another integration's Pixel instance.
  if (window.fbq) return Promise.resolve(false);
  const pixel = function (...args: unknown[]) {
    if (pixel.callMethod) pixel.callMethod(...args);
    else pixel.queue.push(args);
  } as Pixel;
  pixel.queue = [];
  pixel.loaded = true;
  pixel.version = "2.0";
  pixel.push = pixel;
  pixel.disablePushState = true;
  window.fbq = pixel;
  window._fbq = pixel;
  loading = new Promise(resolve => {
    const script = document.createElement("script");
    script.id = "redwan-meta-pixel";
    script.async = true;
    script.referrerPolicy = "no-referrer";
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.onload = () => {
      ready = true;
      resolve(true);
    };
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return loading;
}

function activate(): boolean {
  if (!ready || !allowed() || !window.fbq) return false;
  if (!initialized) {
    window.fbq("set", "autoConfig", false, META_PIXEL_ID);
    window.fbq("init", META_PIXEL_ID); // No advanced-matching/user data.
    initialized = true;
  }
  window.fbq("consent", "grant");
  return true;
}

/** Called on navigation and consent changes; no event queue across pages. */
export async function syncMetaPage(): Promise<void> {
  try {
    if (typeof window === "undefined") return;
    if (!allowed()) {
      window.fbq?.("consent", "revoke");
      lastPage = "";
      return;
    }
    const url = window.location.href;
    if (!(await loadPixel()) || window.location.href !== url || !activate())
      return;
    if (lastPage !== url) {
      lastPage = url;
      window.fbq!("trackSingle", META_PIXEL_ID, "PageView");
    }
  } catch {
    /* A blocked/unavailable advertising SDK must not affect the website. */
  }
}

/** Only invoke after the server accepts a submission; never on CTA clicks. */
export function trackMetaConfirmedSubmission(
  kind: "contact" | "booking",
  receipt: string
): void {
  try {
    const path =
      typeof window === "undefined"
        ? ""
        : window.location.pathname.replace(/\/$/, "");
    if (
      kind === "contact"
        ? !["/contact", "/en/contact"].includes(path)
        : path !== "/appointments"
    )
      return;
    const key = `${kind}:${receipt}`;
    if (!receipt || sentConversions.has(key) || !activate()) return;
    sentConversions.add(key);
    // The receipt is used ONLY for local deduplication. It is not sent to Meta.
    window.fbq!(
      "trackSingle",
      META_PIXEL_ID,
      kind === "contact" ? "Lead" : "Schedule"
    );
  } catch {
    /* Never convert a successful form submission into an apparent error. */
  }
}
