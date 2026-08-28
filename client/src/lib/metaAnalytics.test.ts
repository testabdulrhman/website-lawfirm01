import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";

let meta: typeof import("./metaAnalytics");
let scripts: Array<{ onload: () => void; onerror: () => void; src: string }>;
let calls: unknown[][];
let storage: Map<string, string>;
let win: any;
let doc: any;

beforeEach(async () => {
  vi.resetModules();
  vi.stubEnv("VITE_META_PIXEL_ENABLED", "true");
  scripts = [];
  calls = [];
  storage = new Map();
  win = {
    location: new URL("https://redwan.sa/contact"),
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
    dispatchEvent: vi.fn(),
  };
  doc = {
    referrer: "",
    cookie: "",
    createElement: () => ({}),
    head: { appendChild: (s: any) => scripts.push(s) },
  };
  vi.stubGlobal("window", win);
  vi.stubGlobal("document", doc);
  meta = await import("./metaAnalytics");
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

async function loadGranted() {
  meta.setMetaConsent("granted");
  const pending = meta.syncMetaPage();
  expect(scripts).toHaveLength(1);
  win.fbq.callMethod = (...args: unknown[]) => calls.push(args);
  scripts[0].onload();
  await pending;
}
const events = () => calls.filter(c => c[0] === "trackSingle");

describe("privacy gate", () => {
  it("keeps default production builds disabled, even with consent", async () => {
    vi.stubEnv("VITE_META_PIXEL_ENABLED", "");
    vi.resetModules();
    const disabled = await import("./metaAnalytics");
    disabled.setMetaConsent("granted");
    await disabled.syncMetaPage();
    expect(disabled.META_MEASUREMENT_ENABLED).toBe(false);
    expect(scripts).toHaveLength(0);
  });
  it("does not load or send without opt-in, including conversions", async () => {
    await meta.syncMetaPage();
    meta.trackMetaConfirmedSubmission("contact", "test-receipt");
    expect(scripts).toHaveLength(0);
    meta.setMetaConsent("denied");
    await meta.syncMetaPage();
    expect(scripts).toHaveLength(0);
  });
  it.each([
    "https://redwan.sa/bankruptcy/claims",
    "https://redwan.sa/bankruptcy/complete?token=private",
    "https://redwan.sa/bankruptcy/Hassan-Misfer-Al-Zahrani",
    "https://redwan.sa/appointments/success",
    "https://redwan.sa/bankruptcy/reports/2026-07",
    "https://redwan.sa/careers",
    "https://redwan.sa/contact?token=secret",
    "https://redwan.sa/contact?email=private@example.com",
    "https://redwan.sa/contact?manus_scraper=1",
    "https://redwan.sa/contact#private",
    "http://localhost:3000/contact",
    "https://deploy-preview.netlify.app/contact",
    "https://redwan.sa/contact?utm_source=meta&utm_source=private",
    "https://redwan.sa/contact?utm_campaign=client-name",
  ])("blocks unsafe URL %s even with consent", async href => {
    win.location = new URL(href);
    meta.setMetaConsent("granted");
    await meta.syncMetaPage();
    expect(scripts).toHaveLength(0);
  });
  it.each([
    "https://redwan.sa/bankruptcy/complete?token=secret",
    "https://example.com/private?email=private@example.com",
    "not-a-url",
  ])("blocks unsafe referrer %s", async referrer => {
    doc.referrer = referrer;
    meta.setMetaConsent("granted");
    await meta.syncMetaPage();
    expect(scripts).toHaveLength(0);
  });
  it("allows controlled campaign attribution and origin-only referrers", async () => {
    win.location = new URL(
      "https://redwan.sa/services/bankruptcy/companies?utm_source=meta&utm_medium=paid_social&utm_campaign=123456789&utm_content=987654321&fbclid=ABCdef0123456789"
    );
    doc.referrer = "https://www.facebook.com/";
    await loadGranted();
    expect(events()).toHaveLength(1);
  });
  it("does not initialize if consent is withdrawn while loading", async () => {
    meta.setMetaConsent("granted");
    const pending = meta.syncMetaPage();
    meta.setMetaConsent("denied");
    scripts[0].onload();
    await pending;
    expect(win.fbq.queue.some((c: unknown[]) => c[0] === "init")).toBe(false);
  });
  it("does not initialize if navigation reaches a private page while loading", async () => {
    meta.setMetaConsent("granted");
    const pending = meta.syncMetaPage();
    win.location = new URL(
      "https://redwan.sa/bankruptcy/complete?token=secret"
    );
    scripts[0].onload();
    await pending;
    expect(win.fbq.queue.some((c: unknown[]) => c[0] === "init")).toBe(false);
  });
  it("revokes after entering private pages and never queues missed conversions", async () => {
    await loadGranted();
    const initial = events().length;
    win.location = new URL("https://redwan.sa/bankruptcy/claims");
    await meta.syncMetaPage();
    meta.trackMetaConfirmedSubmission("contact", "private-case");
    expect(calls.at(-1)).toEqual(["consent", "revoke"]);
    expect(events()).toHaveLength(initial);
  });
  it("honors withdrawal even if storage writes fail", async () => {
    await loadGranted();
    win.localStorage.setItem = () => {
      throw Error("blocked");
    };
    meta.setMetaConsent("denied");
    meta.trackMetaConfirmedSubmission("contact", "private");
    expect(meta.getMetaConsent()).toBe("denied");
    expect(events()).toHaveLength(1);
  });
  it("does not load with corrupt or expired consent", async () => {
    storage.set("redwan_meta_consent_v1", "broken");
    await meta.syncMetaPage();
    storage.set(
      "redwan_meta_consent_v1",
      JSON.stringify({ choice: "granted", expires: 0 })
    );
    await meta.syncMetaPage();
    expect(scripts).toHaveLength(0);
  });
  it("still withdraws if the browser rejects cookie writes", async () => {
    await loadGranted();
    Object.defineProperty(doc, "cookie", {
      set() {
        throw Error("blocked");
      },
    });
    expect(() => meta.setMetaConsent("denied")).not.toThrow();
    expect(meta.getMetaConsent()).toBe("denied");
  });
});

describe("event integrity", () => {
  it("never surfaces SDK failures to a successful form", async () => {
    await loadGranted();
    win.fbq.callMethod = () => {
      throw Error("SDK failed");
    };
    expect(() =>
      meta.trackMetaConfirmedSubmission("contact", "server-accepted")
    ).not.toThrow();
    await expect(meta.syncMetaPage()).resolves.toBeUndefined();
  });
  it("disables automatic collection before init, with no matching fields", async () => {
    await loadGranted();
    expect(win.fbq.disablePushState).toBe(true);
    expect(calls.slice(0, 2)).toEqual([
      ["set", "autoConfig", false, meta.META_PIXEL_ID],
      ["init", meta.META_PIXEL_ID],
    ]);
    await meta.syncMetaPage();
    expect(events()).toHaveLength(1);
  });
  it("sends one generic Lead per accepted receipt without the receipt or fields", async () => {
    await loadGranted();
    meta.trackMetaConfirmedSubmission("contact", "never-send-this-receipt");
    meta.trackMetaConfirmedSubmission("contact", "never-send-this-receipt");
    expect(events()).toEqual([
      ["trackSingle", meta.META_PIXEL_ID, "PageView"],
      ["trackSingle", meta.META_PIXEL_ID, "Lead"],
    ]);
    expect(JSON.stringify(calls)).not.toContain("never-send-this-receipt");
  });
  it("distinguishes booking from inquiries and ignores wrong routes", async () => {
    win.location = new URL("https://redwan.sa/appointments");
    await loadGranted();
    meta.trackMetaConfirmedSubmission("contact", "contact");
    meta.trackMetaConfirmedSubmission("booking", "booking-key");
    meta.trackMetaConfirmedSubmission("booking", "booking-key");
    expect(events().map(e => e[2])).toEqual(["PageView", "Schedule"]);
  });
  it("fails harmlessly if the script is blocked or the SDK throws", async () => {
    meta.setMetaConsent("granted");
    const pending = meta.syncMetaPage();
    scripts[0].onerror();
    await pending;
    expect(() =>
      meta.trackMetaConfirmedSubmission("contact", "x")
    ).not.toThrow();
    expect(events()).toHaveLength(0);
  });
  it("does not transmit anything under the site's analytics kill switch", async () => {
    win.__REDWAN_ANALYTICS_DISABLED__ = true;
    meta.setMetaConsent("granted");
    await meta.syncMetaPage();
    expect(scripts).toHaveLength(0);
  });
  it("hooks Contact only after HTTP success and preserves Google event handling", () => {
    const source = readFileSync("client/src/pages/Contact.tsx", "utf8");
    expect(source).toMatch(
      /if \(response\.ok\) \{\s*trackContactFormSubmit\(formData\.service\);\s*trackMetaConfirmedSubmission\("contact", receipt\)/
    );
    expect(source).toContain("if (submittingRef.current) return;");
    const analytics = readFileSync("client/src/lib/analytics.ts", "utf8");
    expect(analytics.match(/trackMetaConfirmedSubmission\(/g)).toHaveLength(1);
    expect(analytics).toContain(
      'if (receipt) trackMetaConfirmedSubmission("booking", receipt);'
    );
  });
});
