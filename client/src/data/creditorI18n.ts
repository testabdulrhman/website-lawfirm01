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

/** تاريخ ووقت — التصويت محكوم بالساعة لا باليوم، فالوقت جزء من المعلومة */
export function fmtDateTime(value: string | Date | null | undefined, lang: Lang): string {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (!d || isNaN(d.getTime())) return '—';
  const locale = lang === 'en' ? 'en-GB' : lang === 'ur' ? 'ur-PK' : 'ar-SA';
  return d.toLocaleString(locale, {
    timeZone: 'Asia/Riyadh',
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    calendar: 'gregory', numberingSystem: 'latn',
  });
}

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
  emailLabel: string;
  methodPhone: string;
  methodEmail: string;
  methodId: string;
  idNumLabel: string;
  idNumHint: string;
  sentTo: string;
  errIdNum: string;
  methodHint: string;
  selectTitle: string;
  selectIntro: string;
  selectClaims: (n: number) => string;
  // تصويت
  navVote: string;
  voteWindow: string;
  voteOpensIn: string;
  voteClosed: string;
  voteNotEligible: string;
  voteViewProposal: string;
  voteConfidential: string;
  voteApprove: string;
  voteReject: string;
  voteDone: (choice: string) => string;
  voteFinal: string;
  voteResult: string;
  voteConfirm: (choice: string) => string;
  sendCode: string;
  secureNote: string;
  otpTitle: string;
  otpDefaultInfo: string;
  otpLabel: string;
  verifyEnter: string;
  editData: string;
  resend: string;
  resendIn: (s: number) => string;
  /** إرشاد من لم يصله الرمز — الردّ واحد للمسجَّل وغيره، فلا يعرف السبب */
  otpNotArrived: string;
  // طلب ربط جوال بمطالبة — لمن ليس جواله مسجَّلاً فيها
  accessLink: string;
  accessTitle: string;
  accessIntro: string;
  accessTargetId: string;
  accessTargetIdHint: string;
  accessName: string;
  accessMyId: string;
  accessMyPhone: string;
  accessMyEmail: string;
  accessRelationship: string;
  accessRelPick: string;
  /** المفتاح هو القيمة التي تُرسل (عربية دائماً)، والقيمة هي المعروض */
  accessRel: Record<string, string>;
  accessAuthRef: string;
  accessAuthRefHint: string;
  accessNote: string;
  accessFiles: string;
  accessFilesHint: string;
  accessAdd: string;
  accessSubmit: string;
  accessBack: string;
  accessOptional: string;
  accessSentTitle: string;
  accessSentIntro: string;
  accessSentNext: string;
  errAccessRequired: string;
  errAccessId: string;
  errAccessPhone: string;
  errAccessRel: string;
  errAccessFiles: string;
  errAccessSize: string;
  errAccessRead: string;
  /** ردّ الدالة عربيّ وحده، فيُترجم هنا */
  errNotRegistered: string;
  noClaimsTitle: string;
  noClaimsBody: string;
  noClaimsAsk: string;
  // errors
  errId: string;
  errPhone: string;
  errEmail: string;
  errSelect: string;
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
  loginIntro: 'تابع مطالباتك وتذاكرك وبياناتك في إجراءات الإفلاس. أدخل رقم هويتك أو سجلك التجاري — أو الجوال أو البريد المسجّل في مطالبتك — وسيصلك رمز تحقق.',
  idLabel: 'رقم الهوية / السجل',
  phoneLabel: 'رقم الجوال المسجّل في المطالبة',
  emailLabel: 'البريد الإلكتروني المسجّل في المطالبة',
  methodPhone: 'رقم الجوال',
  methodId: 'رقم الهوية',
  idNumLabel: 'رقم الهوية أو السجل التجاري',
  idNumHint: 'يصلك الرمز على الجوال والبريد المسجَّلين في مطالبتك',
  sentTo: 'أرسلنا الرمز إلى',
  errIdNum: 'أدخل رقم الهوية أو السجل التجاري.',
  methodEmail: 'البريد الإلكتروني',
  methodHint: 'يصلك رمز التحقق على الوسيلة التي تختارها.',
  selectTitle: 'اختر الدائن',
  selectIntro: 'هذه الوسيلة مرتبطة بأكثر من دائن. اختر من تريد متابعة مطالباته.',
  selectClaims: (n: number) => `${n} مطالبة`,
  navVote: 'التصويت',
  voteWindow: 'فترة التصويت',
  voteOpensIn: 'لم يُفتح باب التصويت بعد',
  voteClosed: 'أُغلق باب التصويت',
  voteNotEligible: 'مشاركتك في التصويت غير معتمدة. راجع أمين الإجراء لاستكمال مستندات الصفة.',
  voteViewProposal: 'الاطّلاع على المقترح',
  voteConfidential: 'المقترح سرّي: يقتصر الاطّلاع عليه على المخوّلين، ويحظر تداوله أو نسخه أو نشره.',
  voteApprove: 'موافقة',
  voteReject: 'عدم الموافقة',
  voteDone: (c: string) => `تم تسجيل صوتك: ${c}`,
  voteFinal: 'الصوت نهائي ولا يمكن تعديله بعد الإدلاء به.',
  voteResult: 'نتيجة التصويت',
  voteConfirm: (c: string) => `تأكيد التصويت بـ«${c}»؟ لا يمكن التراجع بعد التأكيد.`,
  sendCode: 'إرسال رمز التحقق',
  secureNote: 'تسجيل الدخول آمن عبر رمز يُرسل لجوالك المسجّل فقط.',
  otpTitle: 'التحقق من الرمز',
  otpDefaultInfo: 'إذا كانت بياناتك صحيحة، وصلك رمز مكوّن من 6 أرقام.',
  otpLabel: 'رمز التحقق (6 أرقام)',
  verifyEnter: 'تحقق ودخول',
  editData: 'تعديل البيانات',
  resend: 'إعادة إرسال الرمز',
  otpNotArrived:
    'لم يصلك الرمز؟ الرمز يُرسل إلى كل رقم صحيح، فتأخّره سببه التسليم لا التسجيل. تحقّق من الرقم، أو جرّب البريد الإلكتروني، أو راسلنا على bankruptcy@redwan.sa',
  resendIn: (s) => `إعادة الإرسال بعد ${s} ث`,
  accessLink: 'جوالي غير مسجَّل في المطالبة — أطلب ربطه',
  accessTitle: 'طلب ربط بمطالبة',
  accessIntro:
    'إن كنت تنوب عن صاحب مطالبة ولم يكن جوالك مسجَّلاً فيها، فأرسل ما يثبت صفتك، ويراجعه المكتب ثم يربط جوالك بمطالبته.',
  accessTargetId: 'رقم هوية أو سجل صاحب المطالبة',
  accessTargetIdHint: 'عشر خانات — هوية الدائن نفسه لا هويتك',
  accessName: 'اسمك',
  accessMyId: 'رقم هويتك',
  accessMyPhone: 'جوالك',
  accessMyEmail: 'بريدك الإلكتروني',
  accessRelationship: 'صفتك',
  accessRelPick: 'اختر صفتك',
  accessRel: {
    'وكيل': 'وكيل بموجب وكالة',
    'وارث': 'وارث',
    'مفوَّض': 'مفوَّض عن منشأة',
    'موظف مفوَّض': 'موظف مفوَّض',
    'أخرى': 'صفة أخرى',
  },
  accessAuthRef: 'رقم الوكالة أو التفويض',
  accessAuthRefHint: 'كما هو في ناجز أو في خطاب التفويض',
  accessNote: 'ما تودّ إضافته',
  accessFiles: 'المرفقات',
  accessFilesHint: 'صورة هويتك والوكالة — حتى أربعة ملفات، كل ملف دون خمسة ميجابايت',
  accessAdd: 'إضافة ملف',
  accessSubmit: 'إرسال الطلب',
  accessBack: 'رجوع إلى الدخول',
  accessOptional: 'اختياري',
  accessSentTitle: 'استلمنا طلبك',
  accessSentIntro: 'احتفظ برقم الطلب أعلاه، فهو مرجعك عند مراسلتنا.',
  accessSentNext:
    'يراجع المكتب ما أرسلته، فإن ثبتت صفتك رُبط جوالك بالمطالبة وأمكنك الدخول بالرمز. وإن احتجنا شيئاً اتصلنا بك على الجوال الذي أدخلته.',
  errAccessRequired: 'أكمل الحقول المطلوبة.',
  errAccessId: 'رقم الهوية عشر خانات.',
  errAccessPhone: 'رقم الجوال يبدأ بـ05 ويتكوّن من عشر خانات.',
  errAccessRel: 'اختر صفتك من القائمة.',
  errAccessFiles: 'الحد أربعة مرفقات.',
  errAccessSize: 'حجم المرفق يتجاوز خمسة ميجابايت.',
  errAccessRead: 'تعذّرت قراءة أحد المرفقات.',
  errNotRegistered:
    'لا توجد مطالبة مسجّلة بهذه الوسيلة. إن كنت تنوب عن دائن فقدّم طلب ربط من الرابط أدناه.',
  noClaimsTitle: 'لا توجد مطالبة بهذا الرقم',
  noClaimsBody:
    'تحقّقنا من الرقم، ولم نجد عليه مطالبة مسجّلة في أيٍّ من الإجراءات التي يديرها المكتب. فإن كنت تنوب عن دائن — وكيلاً أو وارثاً أو مفوَّضاً — فقدّم طلب ربط، يراجعه المكتب ثم يربط رقمك بمطالبته.',
  noClaimsAsk: 'تقديم طلب ربط',
  errId: 'أدخل رقم الهوية / السجل.',
  errPhone: 'أدخل رقم الجوال المسجّل في المطالبة.',
  errEmail: 'أدخل بريداً إلكترونياً صحيحاً.',
  errSelect: 'تعذّر اختيار الدائن. حاول مرة أخرى.',
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
  loginIntro: 'Track your claims, tickets and details in the bankruptcy proceedings. Enter your ID or commercial registration number — or the mobile or email registered with your claim — and a verification code will be sent to you.',
  idLabel: 'ID / Commercial registration number',
  phoneLabel: 'Mobile number registered with the claim',
  emailLabel: 'Email registered with the claim',
  methodPhone: 'Mobile number',
  methodId: 'ID number',
  idNumLabel: 'ID or commercial registration number',
  idNumHint: 'The code goes to the mobile and email registered on your claim',
  sentTo: 'We sent the code to',
  errIdNum: 'Enter your ID or commercial registration number.',
  methodEmail: 'Email',
  methodHint: 'The verification code is sent to the method you choose.',
  selectTitle: 'Select creditor',
  selectIntro: 'This contact is linked to more than one creditor. Choose whose claims to view.',
  selectClaims: (n: number) => `${n} claim${n === 1 ? '' : 's'}`,
  navVote: 'Vote',
  voteWindow: 'Voting period',
  voteOpensIn: 'Voting has not opened yet',
  voteClosed: 'Voting is closed',
  voteNotEligible: 'Your participation is not approved. Contact the trustee to complete your authorisation documents.',
  voteViewProposal: 'View the proposal',
  voteConfidential: 'The proposal is confidential: access is limited to authorised persons; copying or sharing is prohibited.',
  voteApprove: 'Approve',
  voteReject: 'Reject',
  voteDone: (c: string) => `Your vote was recorded: ${c}`,
  voteFinal: 'The vote is final and cannot be changed once cast.',
  voteResult: 'Voting result',
  voteConfirm: (c: string) => `Confirm voting \u201c${c}\u201d? This cannot be undone.`,
  sendCode: 'Send verification code',
  secureNote: 'Secure sign-in via a code sent to your registered mobile only.',
  otpTitle: 'Verify the code',
  otpDefaultInfo: 'If your details are correct, a 6-digit code has been sent to you.',
  otpLabel: 'Verification code (6 digits)',
  verifyEnter: 'Verify & sign in',
  editData: 'Edit details',
  resend: 'Resend the code',
  otpNotArrived:
    "Code didn't arrive? A code is sent to every valid number, so a delay is a delivery issue, not a registration one. "
    + 'Check the number, try email instead, or contact us at bankruptcy@redwan.sa',
  resendIn: (s) => `Resend in ${s}s`,
  accessLink: 'My number is not on the claim — request access',
  accessTitle: 'Request access to a claim',
  accessIntro:
    'If you act on behalf of a creditor and your number is not registered on their claim, send us proof of your capacity. We will review it and link your number to the claim.',
  accessTargetId: "Creditor's ID or registration number",
  accessTargetIdHint: 'Ten digits — the creditor’s own number, not yours',
  accessName: 'Your name',
  accessMyId: 'Your ID number',
  accessMyPhone: 'Your mobile',
  accessMyEmail: 'Your email',
  accessRelationship: 'Your capacity',
  accessRelPick: 'Select your capacity',
  accessRel: {
    'وكيل': 'Attorney under power of attorney',
    'وارث': 'Heir',
    'مفوَّض': 'Authorised representative of an entity',
    'موظف مفوَّض': 'Authorised employee',
    'أخرى': 'Other capacity',
  },
  accessAuthRef: 'Power of attorney or authorisation number',
  accessAuthRefHint: 'As shown in Najiz or on the authorisation letter',
  accessNote: 'Anything you wish to add',
  accessFiles: 'Attachments',
  accessFilesHint: 'Your ID and the power of attorney — up to four files, each under 5 MB',
  accessAdd: 'Add a file',
  accessSubmit: 'Send request',
  accessBack: 'Back to sign in',
  accessOptional: 'optional',
  accessSentTitle: 'We have received your request',
  accessSentIntro: 'Keep the reference above — quote it in any follow-up.',
  accessSentNext:
    'We will review what you sent. If your capacity is established, your number will be linked to the claim and you can sign in with a code. If we need anything further we will call the number you entered.',
  errAccessRequired: 'Please complete the required fields.',
  errAccessId: 'An ID number is ten digits.',
  errAccessPhone: 'A mobile number starts with 05 and is ten digits.',
  errAccessRel: 'Select your capacity from the list.',
  errAccessFiles: 'Up to four attachments.',
  errAccessSize: 'The attachment exceeds 5 MB.',
  errAccessRead: 'One of the attachments could not be read.',
  errNotRegistered:
    'No claim is registered with these details. If you act on behalf of a creditor, use the access request link below.',
  noClaimsTitle: 'No claim on this number',
  noClaimsBody:
    'We verified your number and found no claim registered against it in any proceeding this office administers. If you act on behalf of a creditor — as attorney, heir or authorised representative — submit an access request. We will review it and link your number to their claim.',
  noClaimsAsk: 'Submit an access request',
  errId: 'Enter your ID / registration number.',
  errPhone: 'Enter the mobile number registered with the claim.',
  errEmail: 'Enter a valid email address.',
  errSelect: 'Could not select the creditor. Please try again.',
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
  loginIntro: 'دیوالیہ کارروائیوں میں اپنے دعوے، ٹکٹس اور تفصیلات دیکھیں۔ اپنا شناختی یا تجارتی رجسٹریشن نمبر — یا دعوے میں درج موبائل یا ای میل — درج کریں، تصدیقی کوڈ بھیجا جائے گا۔',
  idLabel: 'شناختی نمبر / تجارتی رجسٹریشن',
  phoneLabel: 'دعوے میں درج موبائل نمبر',
  emailLabel: 'دعوے میں درج ای میل',
  methodPhone: 'موبائل نمبر',
  methodId: 'شناختی نمبر',
  idNumLabel: 'شناختی یا تجارتی رجسٹریشن نمبر',
  idNumHint: 'کوڈ آپ کے دعوے میں درج موبائل اور ای میل پر بھیجا جائے گا',
  sentTo: 'ہم نے کوڈ بھیجا:',
  errIdNum: 'اپنا شناختی یا تجارتی رجسٹریشن نمبر درج کریں۔',
  methodEmail: 'ای میل',
  methodHint: 'تصدیقی کوڈ آپ کے منتخب کردہ ذریعے پر بھیجا جائے گا۔',
  selectTitle: 'قرض خواہ منتخب کریں',
  selectIntro: 'یہ رابطہ ایک سے زیادہ قرض خواہ سے منسلک ہے۔ منتخب کریں کہ کس کے دعوے دیکھنے ہیں۔',
  selectClaims: (n: number) => `${n} دعوے`,
  navVote: 'ووٹنگ',
  voteWindow: 'ووٹنگ کا وقت',
  voteOpensIn: 'ووٹنگ ابھی شروع نہیں ہوئی',
  voteClosed: 'ووٹنگ بند ہو چکی ہے',
  voteNotEligible: 'آپ کی شرکت منظور نہیں ہے۔ دستاویزات مکمل کرنے کے لیے ٹرسٹی سے رابطہ کریں۔',
  voteViewProposal: 'تجویز دیکھیں',
  voteConfidential: 'تجویز خفیہ ہے: صرف مجاز افراد دیکھ سکتے ہیں، نقل یا اشاعت ممنوع ہے۔',
  voteApprove: 'منظور',
  voteReject: 'نامنظور',
  voteDone: (c: string) => `آپ کا ووٹ درج ہو گیا: ${c}`,
  voteFinal: 'ووٹ حتمی ہے اور دینے کے بعد تبدیل نہیں ہو سکتا۔',
  voteResult: 'ووٹنگ کا نتیجہ',
  voteConfirm: (c: string) => `«${c}» ووٹ کی تصدیق کریں؟ اس کے بعد واپسی ممکن نہیں۔`,
  sendCode: 'تصدیقی کوڈ بھیجیں',
  secureNote: 'محفوظ لاگ اِن صرف آپ کے درج موبائل پر بھیجے گئے کوڈ کے ذریعے۔',
  otpTitle: 'کوڈ کی تصدیق',
  otpDefaultInfo: 'اگر آپ کی تفصیلات درست ہیں تو 6 ہندسوں کا کوڈ بھیج دیا گیا ہے۔',
  otpLabel: 'تصدیقی کوڈ (6 ہندسے)',
  verifyEnter: 'تصدیق کریں اور داخل ہوں',
  editData: 'تفصیلات میں ترمیم',
  resend: 'کوڈ دوبارہ بھیجیں',
  otpNotArrived:
    'کوڈ نہیں ملا؟ ہر درست نمبر پر کوڈ بھیجا جاتا ہے، اس لیے تاخیر کی وجہ ترسیل ہے، اندراج نہیں۔ نمبر جانچیں، ای میل آزمائیں، یا ہم سے رابطہ کریں: bankruptcy@redwan.sa',
  resendIn: (s) => `${s} سیکنڈ بعد دوبارہ بھیجیں`,
  accessLink: 'میرا نمبر دعوے میں درج نہیں — رسائی کی درخواست دیں',
  accessTitle: 'دعوے تک رسائی کی درخواست',
  accessIntro:
    'اگر آپ کسی قرض خواہ کی جانب سے کام کر رہے ہیں اور آپ کا نمبر اُن کے دعوے میں درج نہیں، تو اپنی حیثیت کا ثبوت بھیجیں۔ دفتر جائزہ لے کر آپ کا نمبر دعوے سے منسلک کر دے گا۔',
  accessTargetId: 'قرض خواہ کا شناختی / رجسٹریشن نمبر',
  accessTargetIdHint: 'دس ہندسے — قرض خواہ کا اپنا نمبر، آپ کا نہیں',
  accessName: 'آپ کا نام',
  accessMyId: 'آپ کا شناختی نمبر',
  accessMyPhone: 'آپ کا موبائل',
  accessMyEmail: 'آپ کا ای میل',
  accessRelationship: 'آپ کی حیثیت',
  accessRelPick: 'اپنی حیثیت منتخب کریں',
  accessRel: {
    'وكيل': 'مختارنامے کے تحت وکیل',
    'وارث': 'وارث',
    'مفوَّض': 'ادارے کا مجاز نمائندہ',
    'موظف مفوَّض': 'مجاز ملازم',
    'أخرى': 'دیگر حیثیت',
  },
  accessAuthRef: 'مختارنامہ یا اجازت نامہ نمبر',
  accessAuthRefHint: 'جیسا ناجز یا اجازت نامے میں درج ہے',
  accessNote: 'کوئی اضافی بات',
  accessFiles: 'منسلکات',
  accessFilesHint: 'آپ کی شناخت اور مختارنامہ — زیادہ سے زیادہ چار فائلیں، ہر ایک 5 MB سے کم',
  accessAdd: 'فائل شامل کریں',
  accessSubmit: 'درخواست بھیجیں',
  accessBack: 'واپس داخلے کی طرف',
  accessOptional: 'اختیاری',
  accessSentTitle: 'ہمیں آپ کی درخواست موصول ہوئی',
  accessSentIntro: 'اوپر دیا گیا حوالہ نمبر محفوظ رکھیں — رابطے کے وقت یہی بتائیں۔',
  accessSentNext:
    'دفتر آپ کی بھیجی ہوئی تفصیل کا جائزہ لے گا۔ حیثیت ثابت ہونے پر آپ کا نمبر دعوے سے منسلک کر دیا جائے گا اور آپ کوڈ کے ذریعے داخل ہو سکیں گے۔ ضرورت پڑنے پر ہم اسی نمبر پر رابطہ کریں گے۔',
  errAccessRequired: 'مطلوبہ خانے مکمل کریں۔',
  errAccessId: 'شناختی نمبر دس ہندسوں کا ہوتا ہے۔',
  errAccessPhone: 'موبائل نمبر 05 سے شروع ہوتا ہے اور دس ہندسوں کا ہوتا ہے۔',
  errAccessRel: 'فہرست سے اپنی حیثیت منتخب کریں۔',
  errAccessFiles: 'زیادہ سے زیادہ چار منسلکات۔',
  errAccessSize: 'منسلکہ 5 MB سے بڑا ہے۔',
  errAccessRead: 'ایک منسلکہ پڑھا نہیں جا سکا۔',
  errNotRegistered:
    'ان تفصیلات کے ساتھ کوئی دعویٰ درج نہیں۔ اگر آپ کسی قرض خواہ کی جانب سے کام کر رہے ہیں تو نیچے دیا گیا لنک استعمال کریں۔',
  noClaimsTitle: 'اس نمبر پر کوئی دعویٰ نہیں',
  noClaimsBody:
    'ہم نے آپ کے نمبر کی تصدیق کی، اور دفتر کے زیرِ انتظام کسی بھی کارروائی میں اس پر کوئی دعویٰ درج نہیں ملا۔ اگر آپ کسی قرض خواہ کی جانب سے کام کر رہے ہیں — وکیل، وارث یا مجاز نمائندہ — تو رسائی کی درخواست دیں۔ دفتر جائزہ لے کر آپ کا نمبر اُن کے دعوے سے منسلک کر دے گا۔',
  noClaimsAsk: 'رسائی کی درخواست دیں',
  errId: 'اپنا شناختی / رجسٹریشن نمبر درج کریں۔',
  errPhone: 'دعوے میں درج موبائل نمبر درج کریں۔',
  errEmail: 'درست ای میل درج کریں۔',
  errSelect: 'قرض خواہ منتخب نہیں ہو سکا۔ دوبارہ کوشش کریں۔',
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
