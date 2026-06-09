/**
 * Google Analytics 4 Event Tracking Helper
 * يتتبع أحداث التحويل المهمة في الموقع
 */

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

type GAEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

/**
 * إرسال حدث مخصص إلى Google Analytics
 */
export function trackEvent(eventName: string, params?: GAEventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// ===== أحداث التحويل =====

/** تتبع الضغط على زر واتساب */
export function trackWhatsAppClick(source: string) {
  trackEvent("whatsapp_click", {
    event_category: "conversion",
    event_label: source,
  });
}

/** تتبع الضغط على زر الاتصال */
export function trackPhoneClick(source: string) {
  trackEvent("phone_click", {
    event_category: "conversion",
    event_label: source,
  });
}

/** تتبع الضغط على زر احجز استشارة */
export function trackBookConsultation(source: string) {
  trackEvent("book_consultation", {
    event_category: "conversion",
    event_label: source,
  });
}

/** تتبع إرسال نموذج التواصل */
export function trackContactFormSubmit() {
  trackEvent("contact_form_submit", {
    event_category: "conversion",
    event_label: "contact_page",
  });
}

/** تتبع الضغط على البريد الإلكتروني */
export function trackEmailClick(source: string) {
  trackEvent("email_click", {
    event_category: "conversion",
    event_label: source,
  });
}

/** تتبع تقديم مطالبة دائن */
export function trackClaimSubmit() {
  trackEvent("claim_submit", {
    event_category: "conversion",
    event_label: "bankruptcy_claims",
  });
}

/** تتبع تحميل ملف (مطالبات) */
export function trackFileUpload(source: string) {
  trackEvent("file_upload", {
    event_category: "engagement",
    event_label: source,
  });
}

/** تتبع تغيير اللغة */
export function trackLanguageSwitch(newLang: string) {
  trackEvent("language_switch", {
    event_category: "engagement",
    event_label: newLang,
  });
}
