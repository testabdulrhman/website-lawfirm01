import { useEffect, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getMetaConsent,
  isMetaPublicPath,
  META_CONSENT_EVENT,
  META_MEASUREMENT_ENABLED,
  setMetaConsent,
  syncMetaPage,
  type MetaConsent as Consent,
} from "@/lib/metaAnalytics";

/** An in-flow panel: never covers forms, navigation or mobile contact buttons. */
export default function MetaConsent() {
  const { lang } = useLanguage();
  const [path] = useLocation();
  const search = useSearch();
  const [choice, setChoice] = useState<Consent>("unknown");
  const [editing, setEditing] = useState(false);
  const ar = lang === "ar";
  useEffect(() => {
    const update = () => {
      setChoice(getMetaConsent());
      void syncMetaPage();
    };
    update();
    window.addEventListener(META_CONSENT_EVENT, update);
    window.addEventListener("storage", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener(META_CONSENT_EVENT, update);
      window.removeEventListener("storage", update);
      window.removeEventListener("hashchange", update);
    };
  }, [path, search]);

  if (!META_MEASUREMENT_ENABLED) return null;
  const open = editing || (choice === "unknown" && isMetaPublicPath(path));
  const decide = (next: "granted" | "denied") => {
    setMetaConsent(next);
    setEditing(false);
  };
  return (
    <section
      aria-label={ar ? "خصوصية قياس إعلانات ميتا" : "Meta advertising privacy"}
      className="bg-[var(--color-cream)] border-t border-[var(--color-navy)]/10 text-[var(--color-navy)]"
    >
      <div className="container mx-auto px-5 py-4 md:px-8">
        {open ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 text-sm leading-7">
              <p className="font-heading font-semibold">
                {ar
                  ? "قياس إعلانات ميتا — اختياري"
                  : "Meta ad measurement — optional"}
              </p>
              <p>
                {ar
                  ? "بموافقتك، نستخدم ملفات ارتباط لقياس زيارة صفحات عامة ونجاح إرسال طلب تواصل أو حجز موعد. قد تستقبل ميتا عنوان IP ومعلومات المتصفح ومعرّفات الارتباط، ولا نرسل إليها حقول النموذج أو تفاصيل القضايا. الرفض لا يؤثر على الخدمة."
                  : "With your permission, we use cookies to measure public page visits and successful inquiries or bookings. Meta may receive your IP address, browser information and cookie identifiers, but we do not send form fields or case details. Declining does not affect our services."}{" "}
                <Link
                  href={ar ? "/privacy" : "/en/privacy"}
                  className="underline underline-offset-4"
                >
                  {ar ? "سياسة الخصوصية" : "Privacy policy"}
                </Link>
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="border border-[var(--color-navy)] px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {ar ? "أرفض" : "Decline"}
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="border border-[var(--color-navy)] px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {ar ? "أوافق" : "Allow"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs underline underline-offset-4 py-2"
          >
            {ar
              ? "تفضيلات قياس إعلانات ميتا"
              : "Meta ad measurement preferences"}
          </button>
        )}
      </div>
    </section>
  );
}
