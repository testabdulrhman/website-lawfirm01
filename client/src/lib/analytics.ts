/**
 * Google Analytics 4 Event Tracking Helper
 * يتتبع أحداث التحويل المهمة في الموقع
 */

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    __REDWAN_ANALYTICS_DISABLED__?: boolean;
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
  if (
    typeof window !== "undefined" &&
    !window.__REDWAN_ANALYTICS_DISABLED__ &&
    !new URLSearchParams(window.location.search)
      .getAll("manus_scraper")
      .includes("1") &&
    window.gtag
  ) {
    window.gtag("event", eventName, {
      page_path: window.location.pathname,
      page_location: window.location.href,
      language: document.documentElement.lang || "ar",
      ...params,
    });
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
export function trackContactFormSubmit(service?: string) {
  trackEvent("contact_submit", {
    event_category: "conversion",
    event_label: "contact_page",
    lead_type: "contact_form",
    service: service || "not_selected",
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
export function trackClaimStart(caseId: string | number) {
  trackEvent("claim_start", {
    event_category: "claim_funnel",
    case_id: String(caseId),
  });
}

/** المستخدم ضغط الإرسال بعد إكمال النموذج */
export function trackClaimSubmit(caseId: string | number) {
  trackEvent("claim_submit", {
    event_category: "claim_funnel",
    event_label: "bankruptcy_claims",
    case_id: String(caseId),
  });
}

/** تم تسجيل المطالبة فعلياً في النظام */
export function trackClaimSuccess(caseId: string | number, documentsAttached: boolean) {
  trackEvent("claim_success", {
    event_category: "conversion",
    event_label: "bankruptcy_claims",
    case_id: String(caseId),
    documents_attached: documentsAttached,
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

/** تتبع تحميل/فتح مقترح إعادة التنظيم المالي */
export function trackProposalDownload(caseName: string) {
  trackEvent("proposal_download", {
    event_category: "engagement",
    event_label: caseName,
  });
}

/** إرسال نموذج الإقامة المميزة إلى واتساب */
export function trackPremiumResidencyLead(track: string) {
  trackEvent("premium_residency_lead", {
    event_category: "conversion",
    event_label: "premium_residency_form",
    residency_track: track || "not_selected",
  });
}

/** نجاح دخول الدائن إلى البوابة */
export function trackCreditorLogin(method: "id" | "phone" | "email") {
  trackEvent("creditor_login", {
    event_category: "creditor_portal",
    login_method: method,
  });
}

export function trackCalendarAdd(provider: "google" | "outlook") {
  trackEvent("calendar_add", {
    event_category: "bankruptcy_voting",
    event_label: provider,
    case_name: "Hassan-Misfer-Al-Zahrani",
  });
}

export function trackVoteClick() {
  trackEvent("vote_click", {
    event_category: "bankruptcy_voting",
    case_name: "Hassan-Misfer-Al-Zahrani",
  });
}

export function trackMeetingClick() {
  trackEvent("meeting_click", {
    event_category: "bankruptcy_voting",
    case_name: "Hassan-Misfer-Al-Zahrani",
  });
}

// ===== حجز المواعيد (redwan.sa/appointments) =====
// ⚠️ لا يُرسل أي اسم أو جوال أو بريد أو ملاحظات إلى GA4 — مفتاح الخدمة
//    وطريقة الاجتماع فقط. booking_success هو التحويل الوحيد المعتمد.

/** بدء تعبئة نموذج الحجز (أول تفاعل) */
export function trackBookingStart() {
  trackEvent("booking_start", { event_category: "booking" });
}

/** اختيار وقت متاح */
export function trackBookingSlotSelected(serviceKey: string) {
  trackEvent("booking_slot_selected", {
    event_category: "booking",
    service_type: serviceKey,
  });
}

/** ضغط زر التأكيد (قبل معرفة النتيجة) */
export function trackBookingSubmit(serviceKey: string, method: string) {
  trackEvent("booking_submit", {
    event_category: "booking",
    service_type: serviceKey,
    meeting_method: method,
  });
}

/** نجاح الحجز — التحويل الرئيسي */
export function trackBookingSuccess(serviceKey: string, method: string) {
  trackEvent("booking_success", {
    event_category: "conversion",
    service_type: serviceKey,
    meeting_method: method,
  });
}

/** فشل الحجز — السبب مصنّف بلا أي بيانات شخصية */
export function trackBookingError(
  reason: "slot_taken" | "rate_limited" | "server_error" | "network"
) {
  trackEvent("booking_error", {
    event_category: "booking",
    event_label: reason,
  });
}
