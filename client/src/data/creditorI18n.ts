/* ============================================================
   ترجمة بوابة الدائن — عربي / إنجليزي / أوردو
   Creditor portal i18n — Arabic / English / Urdu
   ============================================================ */

export type Lang = 'ar' | 'en' | 'ur';

export const LANGS: Record<Lang, { label: string; native: string; dir: 'rtl' | 'ltr'; locale: string }> = {
  ar: { label: 'العربية', native: 'العربية', dir: 'rtl', locale: 'ar' },
  en: { label: 'English', native: 'English', dir: 'ltr', locale: 'en' },
  ur: { label: 'اردو', native: 'اردو', dir: 'rtl', locale: 'ur' },
};

export const LANG_ORDER: Lang[] = ['ar', 'en', 'ur'];
const LANG_KEY = 'creditor_portal_lang';

export function loadLang(): Lang {
  try {
    const v = localStorage.getItem(LANG_KEY) as Lang | null;
    if (v && v in LANGS) return v;
  } catch {
    /* ignore */
  }
  return 'ar';
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
}

/* ── تنسيق التاريخ والعملة حسب اللغة ── */

export function fmtDate(value: string | Date | null | undefined, lang: Lang): string {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (!d || isNaN(d.getTime())) return '—';
  try {
    return new Intl.DateTimeFormat(LANGS[lang].locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      numberingSystem: 'latn',
      calendar: 'gregory',
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

export function fmtCurrency(value: number | null | undefined, lang: Lang, withSymbol = true): string {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  if (!withSymbol) return formatted;
  return lang === 'en' ? `SAR ${formatted}` : `${formatted} ﷼`;
}

export function fmtNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US').format(value);
}

/* ── قيم مُعدّدة من قاعدة البيانات (تُترجم بالمطابقة، وإلا تُعرض كما هي) ── */

type EnumMap = Record<string, { en: string; ur: string }>;

const CLAIM_STATUS: EnumMap = {
  'جديدة': { en: 'New', ur: 'نئی' },
  'قيد المراجعة': { en: 'Under review', ur: 'زیرِ جائزہ' },
  'مكتملة البيانات': { en: 'Data completed', ur: 'ڈیٹا مکمل' },
  'معتمدة': { en: 'Approved', ur: 'منظور شدہ' },
  'معتمدة جزئياً': { en: 'Partially approved', ur: 'جزوی منظور' },
  'مرفوضة': { en: 'Rejected', ur: 'مسترد' },
};

const CLAIM_TYPE: EnumMap = {
  'تجاري': { en: 'Commercial', ur: 'تجارتی' },
  'عمالي': { en: 'Labor', ur: 'محنت کش' },
  'حكومي': { en: 'Governmental', ur: 'سرکاری' },
  'بنوك': { en: 'Banks', ur: 'بینک' },
  'أخرى': { en: 'Other', ur: 'دیگر' },
};

const PROCEDURE_TYPE: EnumMap = {
  'تصفية': { en: 'Liquidation', ur: 'تصفیہ' },
  'إعادة تنظيم مالي': { en: 'Financial reorganization', ur: 'مالی تنظیمِ نو' },
  'إعادة التنظيم المالي للمنشآت الصغيرة': {
    en: 'Financial reorganization (small entities)',
    ur: 'چھوٹے اداروں کی مالی تنظیمِ نو',
  },
  'التسوية الوقائية': { en: 'Protective settlement', ur: 'حفاظتی تصفیہ' },
};

const CHANNEL: EnumMap = {
  'بوابة': { en: 'Portal', ur: 'پورٹل' },
  'phone': { en: 'Phone', ur: 'فون' },
  'هاتف': { en: 'Phone', ur: 'فون' },
  'واتساب': { en: 'WhatsApp', ur: 'واٹس ایپ' },
  'whatsapp': { en: 'WhatsApp', ur: 'واٹس ایپ' },
  'بريد': { en: 'Email', ur: 'ای میل' },
  'email': { en: 'Email', ur: 'ای میل' },
};

const DOC_CATEGORY: Record<string, { ar: string; en: string; ur: string }> = {
  creditor_id: { ar: 'هوية الدائن / السجل التجاري', en: 'Creditor ID / CR', ur: 'قرض خواہ کی شناخت / تجارتی رجسٹریشن' },
  applicant_id: { ar: 'هوية مقدم الطلب', en: 'Applicant ID', ur: 'درخواست گزار کی شناخت' },
  due_document: { ar: 'سند الاستحقاق', en: 'Proof of debt', ur: 'واجب الادا دستاویز' },
  security_document: { ar: 'سند الضمان', en: 'Security document', ur: 'ضمانتی دستاویز' },
  opening_document: { ar: 'سند الافتتاح', en: 'Opening document', ur: 'افتتاحی دستاویز' },
  capacity_document: { ar: 'سند الصفة', en: 'Capacity document', ur: 'اہلیت کی دستاویز' },
  power_of_attorney: { ar: 'الوكالة / عقد التأسيس', en: 'Power of attorney / incorporation', ur: 'وکالت نامہ / معاہدہ تاسیس' },
  claim_form: { ar: 'نموذج إدراج المطالبة', en: 'Claim submission form', ur: 'دعویٰ فارم' },
};

function pick(map: EnumMap, value: string | null | undefined, lang: Lang): string {
  if (!value) return '';
  if (lang === 'ar') return value;
  const hit = map[value.trim()];
  return hit ? hit[lang] : value;
}

export function trStatus(v: string | null | undefined, lang: Lang) { return pick(CLAIM_STATUS, v, lang); }
export function trClaimType(v: string | null | undefined, lang: Lang) { return pick(CLAIM_TYPE, v, lang); }
export function trProcedure(v: string | null | undefined, lang: Lang) { return pick(PROCEDURE_TYPE, v, lang); }
export function trChannel(v: string | null | undefined, lang: Lang) { return pick(CHANNEL, v, lang); }

export function trDocCategory(code: string | null | undefined, lang: Lang): string | null {
  if (!code) return null;
  const hit = DOC_CATEGORY[code];
  return hit ? hit[lang] : null;
}

/* ── نصوص الواجهة ── */

export interface Strings {
  portalName: string;
  eServices: string;
  bankruptcyProc: string;
  // auth
  loginTitle: string;
  loginIntro: string;
  idLabel: string;
  phoneLabel: string;
  sendCode: string;
  secureNote: string;
  otpTitle: string;
  otpDefaultInfo: string;
  otpLabel: string;
  verifyEnter: string;
  editData: string;
  resend: string;
  resendIn: (s: number) => string;
  // errors
  errId: string;
  errPhone: string;
  errSendCode: string;
  errOtpFormat: string;
  errVerify: string;
  errConn: string;
  errSession: string;
  errLoad: string;
  attemptsLeft: (n: number) => string;
  otpSent: string;
  // nav / shell
  navClaims: string;
  navTickets: string;
  navProfile: string;
  claimUnit: string;
  totalRiyal: string;
  logout: string;
  logoutShort: string;
  sessionNote: string;
  creditorFallback: string;
  // completion alert
  completionTitle: (ref: string) => string;
  yourClaim: string;
  completionDefault: string;
  deadline: string;
  completeNow: string;
  // claims
  upcomingHearings: string;
  hearing: string;
  remote: string;
  noClaims: string;
  noClaimsHint: string;
  claimNo: string;
  amount: string;
  stepReceive: string;
  stepReview: string;
  stepDecision: string;
  colClaimType: string;
  colSubmitted: string;
  colSecurity: string;
  secured: string;
  colDebtor: string;
  colCaseNo: string;
  colCourt: string;
  colProcedure: string;
  myDocs: string;
  view: string;
  // tickets
  ticketReceived: string;
  ticketRefLabel: string;
  ticketReplyHere: string;
  ok: string;
  newTicket: string;
  newTicketTitle: string;
  subject: string;
  ticketBody: string;
  ticketBodyPh: string;
  send: string;
  cancel: string;
  errSubject: string;
  errBody: string;
  noTickets: string;
  noTicketsHint: string;
  ticketReplied: string;
  ticketProcessing: string;
  date: string;
  channel: string;
  trusteeReply: string;
  // profile
  contactData: string;
  requestUpdate: string;
  updateSent: (ref: string) => string;
  fName: string;
  fIdType: string;
  fIdNumber: string;
  fRep: string;
  fPhone: string;
  fPhoneAlt: string;
  fEmail: string;
  fEmailAlt: string;
  fCity: string;
  fAddress: string;
  editHint: string;
  extraNotes: string;
  sendUpdate: string;
  errNoChange: string;
  // ticket subjects (system-generated)
}

const AR: Strings = {
  portalName: 'بوابة الدائن',
  eServices: 'الخدمات الإلكترونية للدائنين',
  bankruptcyProc: 'إجراءات الإفلاس',
  loginTitle: 'الدخول إلى بوابة الدائن',
  loginIntro: 'تابع مطالباتك وتذاكرك وبياناتك في إجراءات الإفلاس. أدخل بياناتك المسجّلة لدى أمين الإجراء وسيصلك رمز تحقق على جوالك.',
  idLabel: 'رقم الهوية / السجل',
  phoneLabel: 'رقم الجوال المسجّل في المطالبة',
  sendCode: 'إرسال رمز التحقق',
  secureNote: 'تسجيل الدخول آمن عبر رمز يُرسل لجوالك المسجّل فقط.',
  otpTitle: 'التحقق من الرمز',
  otpDefaultInfo: 'إذا كانت بياناتك صحيحة، وصلك رمز مكوّن من 6 أرقام.',
  otpLabel: 'رمز التحقق (6 أرقام)',
  verifyEnter: 'تحقق ودخول',
  editData: 'تعديل البيانات',
  resend: 'إعادة إرسال الرمز',
  resendIn: (s) => `إعادة الإرسال بعد ${s} ث`,
  errId: 'أدخل رقم الهوية / السجل.',
  errPhone: 'أدخل رقم الجوال المسجّل في المطالبة.',
  errSendCode: 'تعذّر إرسال رمز التحقق.',
  errOtpFormat: 'رمز التحقق يجب أن يكون 6 أرقام.',
  errVerify: 'تعذّر التحقق.',
  errConn: 'تعذّر الاتصال. حاول لاحقاً.',
  errSession: 'انتهت صلاحية الجلسة. أعد الدخول.',
  errLoad: 'تعذّر جلب البيانات.',
  attemptsLeft: (n) => `(المحاولات المتبقية: ${n})`,
  otpSent: 'تم إرسال رمز التحقق إلى جوالك.',
  navClaims: 'مطالباتي',
  navTickets: 'تذاكري',
  navProfile: 'بياناتي',
  claimUnit: 'مطالبة',
  totalRiyal: 'إجمالي (﷼)',
  logout: 'تسجيل الخروج',
  logoutShort: 'خروج',
  sessionNote: 'الجلسة صالحة لمدة 30 دقيقة وتنتهي تلقائياً حفاظاً على خصوصيتك.',
  creditorFallback: 'الدائن',
  completionTitle: (ref) => `مطلوب استكمال بيانات ${ref}`,
  yourClaim: 'مطالبتك',
  completionDefault: 'طلب منك أمين الإجراء استكمال بيانات أو مستندات ناقصة.',
  deadline: 'آخر موعد',
  completeNow: 'استكمال الآن',
  upcomingHearings: 'جلسات قادمة في قضاياك',
  hearing: 'جلسة',
  remote: 'عن بُعد',
  noClaims: 'لا توجد مطالبات',
  noClaimsHint: 'لم نعثر على مطالبات مسجّلة بهذه الهوية.',
  claimNo: 'مطالبة',
  amount: 'المبلغ',
  stepReceive: 'استلام المطالبة',
  stepReview: 'الفحص والدراسة',
  stepDecision: 'القرار',
  colClaimType: 'نوع المطالبة',
  colSubmitted: 'تاريخ التقديم',
  colSecurity: 'الضمان',
  secured: 'مضمونة',
  colDebtor: 'المدين',
  colCaseNo: 'رقم القضية',
  colCourt: 'المحكمة',
  colProcedure: 'نوع الإجراء',
  myDocs: 'مستنداتك المرفقة',
  view: 'عرض',
  ticketReceived: 'تم استلام استفسارك',
  ticketRefLabel: 'رقم التذكرة',
  ticketReplyHere: 'ستجد الرد هنا في «تذاكري» وسيصلك إشعار على جوالك.',
  ok: 'حسناً',
  newTicket: 'استفسار جديد لأمين الإجراء',
  newTicketTitle: 'استفسار جديد',
  subject: 'الموضوع',
  ticketBody: 'نص الاستفسار',
  ticketBodyPh: 'اكتب استفسارك بخصوص مطالبتك أو الإجراء...',
  send: 'إرسال',
  cancel: 'إلغاء',
  errSubject: 'الموضوع مطلوب.',
  errBody: 'نص الاستفسار مطلوب.',
  noTickets: 'لا توجد تذاكر سابقة',
  noTicketsHint: 'استفساراتك وردود أمين الإجراء ستظهر هنا.',
  ticketReplied: 'تم الرد',
  ticketProcessing: 'قيد المعالجة',
  date: 'التاريخ',
  channel: 'القناة',
  trusteeReply: 'رد أمين الإجراء',
  contactData: 'بيانات التواصل المسجّلة',
  requestUpdate: 'طلب تحديث البيانات',
  updateSent: (ref) => `تم إرسال طلب التحديث${ref ? ` (تذكرة ${ref})` : ''} — سيراجعه المكتب ويحدّث بياناتك.`,
  fName: 'الاسم',
  fIdType: 'نوع الهوية',
  fIdNumber: 'رقم الهوية / السجل',
  fRep: 'الممثل / المفوض',
  fPhone: 'الجوال',
  fPhoneAlt: 'جوال إضافي',
  fEmail: 'البريد الإلكتروني',
  fEmailAlt: 'بريد إضافي',
  fCity: 'المدينة',
  fAddress: 'العنوان',
  editHint: 'عدّل الحقول التي تريد تحديثها فقط — سيصل الطلب للمكتب للمراجعة والاعتماد.',
  extraNotes: 'ملاحظات إضافية (اختياري)',
  sendUpdate: 'إرسال طلب التحديث',
  errNoChange: 'لم تُدخل أي تغيير على بياناتك.',
};

const EN: Strings = {
  portalName: 'Creditor Portal',
  eServices: 'Creditor e-Services',
  bankruptcyProc: 'Bankruptcy proceedings',
  loginTitle: 'Sign in to the Creditor Portal',
  loginIntro: 'Track your claims, tickets and details in the bankruptcy proceedings. Enter the details registered with the trustee and a verification code will be sent to your phone.',
  idLabel: 'ID / Commercial registration number',
  phoneLabel: 'Mobile number registered with the claim',
  sendCode: 'Send verification code',
  secureNote: 'Secure sign-in via a code sent to your registered mobile only.',
  otpTitle: 'Verify the code',
  otpDefaultInfo: 'If your details are correct, a 6-digit code has been sent to you.',
  otpLabel: 'Verification code (6 digits)',
  verifyEnter: 'Verify & sign in',
  editData: 'Edit details',
  resend: 'Resend the code',
  resendIn: (s) => `Resend in ${s}s`,
  errId: 'Enter your ID / registration number.',
  errPhone: 'Enter the mobile number registered with the claim.',
  errSendCode: 'Could not send the verification code.',
  errOtpFormat: 'The verification code must be 6 digits.',
  errVerify: 'Verification failed.',
  errConn: 'Connection failed. Please try again later.',
  errSession: 'Your session has expired. Please sign in again.',
  errLoad: 'Could not load the data.',
  attemptsLeft: (n) => `(Attempts left: ${n})`,
  otpSent: 'A verification code has been sent to your phone.',
  navClaims: 'My Claims',
  navTickets: 'My Tickets',
  navProfile: 'My Details',
  claimUnit: 'claims',
  totalRiyal: 'Total (SAR)',
  logout: 'Sign out',
  logoutShort: 'Exit',
  sessionNote: 'The session is valid for 30 minutes and ends automatically to protect your privacy.',
  creditorFallback: 'Creditor',
  completionTitle: (ref) => `Data completion required for ${ref}`,
  yourClaim: 'your claim',
  completionDefault: 'The trustee has asked you to complete missing data or documents.',
  deadline: 'Deadline',
  completeNow: 'Complete now',
  upcomingHearings: 'Upcoming hearings in your cases',
  hearing: 'Hearing',
  remote: 'Remote',
  noClaims: 'No claims',
  noClaimsHint: 'No claims are registered under this ID.',
  claimNo: 'Claim',
  amount: 'Amount',
  stepReceive: 'Claim received',
  stepReview: 'Review & study',
  stepDecision: 'Decision',
  colClaimType: 'Claim type',
  colSubmitted: 'Submission date',
  colSecurity: 'Security',
  secured: 'Secured',
  colDebtor: 'Debtor',
  colCaseNo: 'Case number',
  colCourt: 'Court',
  colProcedure: 'Procedure type',
  myDocs: 'Your attached documents',
  view: 'View',
  ticketReceived: 'Your inquiry has been received',
  ticketRefLabel: 'Ticket number',
  ticketReplyHere: 'The reply will appear here under “My Tickets” and you will be notified on your phone.',
  ok: 'OK',
  newTicket: 'New inquiry to the trustee',
  newTicketTitle: 'New inquiry',
  subject: 'Subject',
  ticketBody: 'Inquiry text',
  ticketBodyPh: 'Write your inquiry about your claim or the proceedings...',
  send: 'Send',
  cancel: 'Cancel',
  errSubject: 'Subject is required.',
  errBody: 'Inquiry text is required.',
  noTickets: 'No previous tickets',
  noTicketsHint: 'Your inquiries and the trustee’s replies will appear here.',
  ticketReplied: 'Replied',
  ticketProcessing: 'In progress',
  date: 'Date',
  channel: 'Channel',
  trusteeReply: 'Trustee’s reply',
  contactData: 'Registered contact details',
  requestUpdate: 'Request a data update',
  updateSent: (ref) => `Update request sent${ref ? ` (ticket ${ref})` : ''} — the office will review it and update your details.`,
  fName: 'Name',
  fIdType: 'ID type',
  fIdNumber: 'ID / registration number',
  fRep: 'Representative / authorized',
  fPhone: 'Mobile',
  fPhoneAlt: 'Additional mobile',
  fEmail: 'Email',
  fEmailAlt: 'Additional email',
  fCity: 'City',
  fAddress: 'Address',
  editHint: 'Edit only the fields you want to update — the request goes to the office for review and approval.',
  extraNotes: 'Additional notes (optional)',
  sendUpdate: 'Send update request',
  errNoChange: 'You have not made any changes to your details.',
};

const UR: Strings = {
  portalName: 'قرض خواہ پورٹل',
  eServices: 'قرض خواہان کے لیے الیکٹرانک خدمات',
  bankruptcyProc: 'دیوالیہ کارروائیاں',
  loginTitle: 'قرض خواہ پورٹل میں داخل ہوں',
  loginIntro: 'دیوالیہ کارروائیوں میں اپنے دعوے، ٹکٹس اور تفصیلات دیکھیں۔ ٹرسٹی کے پاس درج اپنی تفصیلات درج کریں، تصدیقی کوڈ آپ کے موبائل پر بھیجا جائے گا۔',
  idLabel: 'شناختی نمبر / تجارتی رجسٹریشن',
  phoneLabel: 'دعوے میں درج موبائل نمبر',
  sendCode: 'تصدیقی کوڈ بھیجیں',
  secureNote: 'محفوظ لاگ اِن صرف آپ کے درج موبائل پر بھیجے گئے کوڈ کے ذریعے۔',
  otpTitle: 'کوڈ کی تصدیق',
  otpDefaultInfo: 'اگر آپ کی تفصیلات درست ہیں تو 6 ہندسوں کا کوڈ بھیج دیا گیا ہے۔',
  otpLabel: 'تصدیقی کوڈ (6 ہندسے)',
  verifyEnter: 'تصدیق کریں اور داخل ہوں',
  editData: 'تفصیلات میں ترمیم',
  resend: 'کوڈ دوبارہ بھیجیں',
  resendIn: (s) => `${s} سیکنڈ بعد دوبارہ بھیجیں`,
  errId: 'اپنا شناختی / رجسٹریشن نمبر درج کریں۔',
  errPhone: 'دعوے میں درج موبائل نمبر درج کریں۔',
  errSendCode: 'تصدیقی کوڈ بھیجنے میں ناکامی۔',
  errOtpFormat: 'تصدیقی کوڈ 6 ہندسوں کا ہونا چاہیے۔',
  errVerify: 'تصدیق ناکام۔',
  errConn: 'رابطہ ناکام۔ بعد میں کوشش کریں۔',
  errSession: 'آپ کا سیشن ختم ہو گیا۔ دوبارہ داخل ہوں۔',
  errLoad: 'ڈیٹا حاصل نہیں ہو سکا۔',
  attemptsLeft: (n) => `(باقی کوششیں: ${n})`,
  otpSent: 'تصدیقی کوڈ آپ کے موبائل پر بھیج دیا گیا ہے۔',
  navClaims: 'میرے دعوے',
  navTickets: 'میرے ٹکٹس',
  navProfile: 'میری تفصیلات',
  claimUnit: 'دعوے',
  totalRiyal: 'کل (﷼)',
  logout: 'خروج',
  logoutShort: 'خروج',
  sessionNote: 'سیشن 30 منٹ کے لیے کارآمد ہے اور آپ کی رازداری کے تحفظ کے لیے خودبخود ختم ہو جاتا ہے۔',
  creditorFallback: 'قرض خواہ',
  completionTitle: (ref) => `${ref} کی تفصیلات مکمل کرنا ضروری ہے`,
  yourClaim: 'آپ کا دعویٰ',
  completionDefault: 'ٹرسٹی نے آپ سے نامکمل تفصیلات یا دستاویزات مکمل کرنے کو کہا ہے۔',
  deadline: 'آخری تاریخ',
  completeNow: 'ابھی مکمل کریں',
  upcomingHearings: 'آپ کے مقدمات میں آنے والی سماعتیں',
  hearing: 'سماعت',
  remote: 'آن لائن',
  noClaims: 'کوئی دعویٰ نہیں',
  noClaimsHint: 'اس شناخت کے تحت کوئی دعویٰ درج نہیں ہے۔',
  claimNo: 'دعویٰ',
  amount: 'رقم',
  stepReceive: 'دعویٰ موصول',
  stepReview: 'جانچ و مطالعہ',
  stepDecision: 'فیصلہ',
  colClaimType: 'دعوے کی قسم',
  colSubmitted: 'جمع کرانے کی تاریخ',
  colSecurity: 'ضمانت',
  secured: 'ضمانت شدہ',
  colDebtor: 'مقروض',
  colCaseNo: 'مقدمہ نمبر',
  colCourt: 'عدالت',
  colProcedure: 'کارروائی کی قسم',
  myDocs: 'آپ کی منسلک دستاویزات',
  view: 'دیکھیں',
  ticketReceived: 'آپ کا استفسار موصول ہو گیا',
  ticketRefLabel: 'ٹکٹ نمبر',
  ticketReplyHere: 'جواب یہاں «میرے ٹکٹس» میں نظر آئے گا اور آپ کے موبائل پر اطلاع دی جائے گی۔',
  ok: 'ٹھیک ہے',
  newTicket: 'ٹرسٹی سے نیا استفسار',
  newTicketTitle: 'نیا استفسار',
  subject: 'موضوع',
  ticketBody: 'استفسار کا متن',
  ticketBodyPh: 'اپنے دعوے یا کارروائی کے بارے میں اپنا استفسار لکھیں...',
  send: 'بھیجیں',
  cancel: 'منسوخ',
  errSubject: 'موضوع درکار ہے۔',
  errBody: 'استفسار کا متن درکار ہے۔',
  noTickets: 'کوئی پچھلا ٹکٹ نہیں',
  noTicketsHint: 'آپ کے استفسارات اور ٹرسٹی کے جوابات یہاں نظر آئیں گے۔',
  ticketReplied: 'جواب دیا گیا',
  ticketProcessing: 'زیرِ عمل',
  date: 'تاریخ',
  channel: 'ذریعہ',
  trusteeReply: 'ٹرسٹی کا جواب',
  contactData: 'درج رابطہ تفصیلات',
  requestUpdate: 'تفصیلات کی تازہ کاری کی درخواست',
  updateSent: (ref) => `تازہ کاری کی درخواست بھیج دی گئی${ref ? ` (ٹکٹ ${ref})` : ''} — دفتر جائزہ لے کر آپ کی تفصیلات اپ ڈیٹ کرے گا۔`,
  fName: 'نام',
  fIdType: 'شناخت کی قسم',
  fIdNumber: 'شناختی / رجسٹریشن نمبر',
  fRep: 'نمائندہ / مجاز',
  fPhone: 'موبائل',
  fPhoneAlt: 'اضافی موبائل',
  fEmail: 'ای میل',
  fEmailAlt: 'اضافی ای میل',
  fCity: 'شہر',
  fAddress: 'پتہ',
  editHint: 'صرف وہ خانے تبدیل کریں جو آپ اپ ڈیٹ کرنا چاہتے ہیں — درخواست جائزے اور منظوری کے لیے دفتر کو جائے گی۔',
  extraNotes: 'اضافی نوٹس (اختیاری)',
  sendUpdate: 'تازہ کاری کی درخواست بھیجیں',
  errNoChange: 'آپ نے اپنی تفصیلات میں کوئی تبدیلی نہیں کی۔',
};

export const STRINGS: Record<Lang, Strings> = { ar: AR, en: EN, ur: UR };
