/* ============================================================
   صفحة تقديم المطالبة — عربي / إنجليزي / أوردو
   Claim submission page i18n — Arabic / English / Urdu
   ------------------------------------------------------------
   ما يظهر للدائن بلغته، وما يُحفظ يبقى بقيمه العربية (نوع الدائن،
   نوع الهوية، نوع المطالبة، الضمان، الصفة) فلا يتأثر النظام الداخلي.
   ============================================================ */

import type { Lang } from './creditorI18n';

type Enum = Record<string, { en: string; ur: string }>;

const CREDITOR_TYPE: Enum = {
  'فرد': { en: 'Individual', ur: 'فرد' },
  'شركة': { en: 'Company', ur: 'کمپنی' },
  'مؤسسة': { en: 'Sole proprietorship', ur: 'ادارہ (واحد ملکیت)' },
  'جهة حكومية': { en: 'Government entity', ur: 'سرکاری ادارہ' },
  'بنك': { en: 'Bank', ur: 'بینک' },
};

const ID_TYPE: Enum = {
  'هوية وطنية': { en: 'National ID', ur: 'قومی شناختی کارڈ' },
  'إقامة': { en: 'Iqama (residence permit)', ur: 'اقامہ' },
  'جواز سفر': { en: 'Passport', ur: 'پاسپورٹ' },
};

const SECURITY_TYPE: Enum = {
  'رهن عقاري': { en: 'Real estate mortgage', ur: 'جائیداد کا رہن' },
  'رهن منقول': { en: 'Movable pledge (equipment, vehicles)', ur: 'منقولہ رہن (آلات، گاڑیاں)' },
  'كفالة بنكية': { en: 'Bank guarantee', ur: 'بینک گارنٹی' },
  'كفالة شخصية': { en: 'Personal guarantee', ur: 'ذاتی ضمانت' },
  'أخرى': { en: 'Other', ur: 'دیگر' },
};

const CAPACITY: Enum = {
  'وكيل': { en: 'Agent (power of attorney)', ur: 'وکیل (مختار)' },
  'محامٍ': { en: 'Lawyer', ur: 'وکیلِ قانون (ایڈووکیٹ)' },
  'ممثل نظامي': { en: 'Legal representative (manager or partner)', ur: 'قانونی نمائندہ (مینیجر یا شراکت دار)' },
  'موظف مفوَّض': { en: 'Authorized employee', ur: 'مجاز ملازم' },
};

function pick(map: Enum, v: string, lang: Lang, arOverride?: string) {
  if (lang === 'ar') return arOverride ?? v;
  return map[v]?.[lang] ?? v;
}

export const trCreditorType = (v: string, lang: Lang) => pick(CREDITOR_TYPE, v, lang);
export const trIdType = (v: string, lang: Lang) => pick(ID_TYPE, v, lang);
export const trSecurityType = (v: string, lang: Lang) =>
  pick(SECURITY_TYPE, v, lang, v === 'رهن منقول' ? 'رهن منقول (معدات، مركبات)' : undefined);
export const trCapacity = (v: string, lang: Lang) =>
  pick(CAPACITY, v, lang, v === 'ممثل نظامي' ? 'ممثل نظامي (مدير أو شريك)' : undefined);

/** نصّ الإقرار العربي — هو المعتمد، ويُعرض مع ترجمته */
export const DECLARATION_AR =
  'أقر بأن جميع البيانات المدخلة صحيحة ودقيقة، وأتحمل المسؤولية الكاملة عن صحتها وفقاً لأحكام نظام الإفلاس ولائحته التنفيذية.';

const ar = {
  seoTitle: 'تقديم مطالبة دائن إلكترونياً',
  seoDesc:
    'قدّم مطالبتك كدائن في قضايا الإفلاس والتصفية إلكترونياً عبر شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. اختر القضية، أدخل بيانات الدين، وأرفق المستندات قبل انتهاء المهلة النظامية.',
  crumbHome: 'الرئيسية',
  crumbBankruptcy: 'إجراءات الإفلاس',
  crumbClaims: 'تقديم مطالبة',
  heroTitle: 'تقديم مطالبة دائن',
  heroIntro:
    'تتيح هذه الصفحة للدائن تقديم مطالبته إلكترونياً في إجراءات الإفلاس التي يديرها المكتب بصفته أمين إفلاس. يبدأ التقديم باختيار القضية، ثم إدخال بيانات المطالبة وإرفاق المستندات المؤيدة، ويجب الرجوع إلى الإعلان الرسمي لكل إجراء لمعرفة المواعيد والمتطلبات الخاصة به.',

  // اختيار القضية
  chooseCase: 'اختر القضية التي ترغب بتقديم مطالبة فيها',
  loadingCases: 'جاري تحميل القضايا...',
  openCases: 'القضايا المفتوحة',
  daysLeft: (n: number) => `${n} يوم متبقي`,
  available: 'متاح',
  regLabel: 'السجل',
  caseLabel: 'قضية',
  courtLabel: 'المحكمة',
  deadlineLabel: 'آخر موعد',
  submitClaim: 'تقديم مطالبة',
  noOpenCases: 'لا توجد قضايا مفتوحة حالياً لاستقبال المطالبات',
  inquiries: 'للاستفسار',
  change: 'تغيير',
  steps: ['بيانات الدائن', 'تفاصيل المطالبة', 'المستندات والتوقيع'],

  // الخطوة 1
  creditorTitle: 'صاحب الحق (الدائن)',
  creditorSub: 'من له الدين على المدين، فرداً كان أو منشأة.',
  creditorTypeLabel: 'نوع الدائن *',
  chooseTypeHint: 'اختر نوع الدائن لتظهر بقية الخانات.',
  nameLabel: (type: string): string =>
    type === 'فرد' ? 'الاسم الرباعي للدائن كما في الهوية *'
      : type === 'جهة حكومية' ? 'اسم الجهة *'
        : type === 'بنك' ? 'اسم البنك *'
          : `اسم ${type === 'مؤسسة' ? 'المؤسسة' : 'الشركة'} كما في السجل التجاري *`,
  idTypeLabel: 'نوع الهوية *',
  idNumberLabel: (type: string): string =>
    type === 'فرد' ? 'رقم الهوية *' : type === 'جهة حكومية' ? 'الرقم الموحد للجهة (700) *' : 'رقم السجل التجاري أو الرقم الموحد *',
  idNumberHint: 'رقم صاحب الحق نفسه، لا رقم من يقدّم عنه.',
  whoTitle: 'من يقدّم المطالبة؟',
  selfTitle: 'أنا صاحب الحق',
  selfSub: 'أقدّمها عن نفسي',
  otherTitle: 'أقدّمها عن غيري',
  otherSub: 'وكيل أو محامٍ',
  orgApplicantNote: 'المنشأة يقدّم عنها شخص: ممثلها النظامي، أو موظف مفوَّض، أو وكيل.',
  capacityLabel: 'صفتك *',
  choose: 'اختر...',
  applicantNameLabel: 'اسمك الرباعي *',
  applicantIdLabel: 'رقم هويتك *',
  sameIdInline: (person: boolean): string =>
    `هذا رقم الدائن نفسه. اكتب في خانة الدائن رقم صاحب الحق${person ? '' : ': سجل المنشأة أو رقمها الموحد'}.`,
  capacityDocLabel: (cap: string): string => (cap === 'موظف مفوَّض' ? 'رقم خطاب التفويض أو تاريخه' : 'رقم الوكالة'),
  contactTitle: 'التواصل',
  contactApplicant: 'جوالك وبريدك أنت. عليهما يصلك رمز الدخول إلى بوابة الدائنين برقم الدائن، وكل إشعارات المطالبة.',
  contactSelf: 'عليهما يصلكم رمز الدخول إلى بوابة الدائنين، وكل إشعارات المطالبة.',
  phoneLabel: 'رقم الجوال *',
  emailLabel: 'البريد الإلكتروني *',
  addressLabel: (person: boolean): string => `العنوان الوطني ${person ? 'للدائن' : 'للمنشأة'} *`,
  addr: { building: 'رقم المبنى', street: 'اسم الشارع', district: 'الحي', city: 'المدينة', postal: 'الرمز البريدي', additional: 'الرقم الإضافي' },

  // الخطوة 2
  detailsTitle: 'تفاصيل المطالبة',
  claimTypeLabel: 'نوع المطالبة *',
  amountLabel: 'مبلغ المطالبة (ريال) *',
  amountPlaceholder: 'مثال: 43000',
  amountUnclear: 'لم يُفهم المبلغ — اكتبه بالأرقام، مثل 43000',
  willRecord: 'سيُسجَّل:',
  securedQ: 'هل المطالبة مضمونة؟',
  yes: 'نعم',
  no: 'لا',
  securityTypeLabel: 'نوع الضمان',
  securityValueLabel: 'قيمة الضمان (ريال)',
  originDate: 'تاريخ نشوء الدين',
  dueDate: 'تاريخ الاستحقاق *',
  dueDocLabel: 'مستند الاستحقاق *',
  dueDocPlaceholder: 'مثال: فاتورة رقم 2024-478، شيك رقم 123456',
  reasonLabel: 'سبب المطالبة *',
  reasonPlaceholder: 'اشرح سبب المطالبة بالتفصيل',

  // الخطوة 3
  docsTitle: 'المستندات والتوقيع',
  doc: {
    creditorIdPerson: 'نسخة من هوية الدائن',
    creditorIdGov: 'ما يثبت الرقم الموحد للجهة',
    creditorIdOrg: 'نسخة من السجل التجاري',
    applicantId: 'نسخة من هويتك (مقدّم الطلب)',
    capAuth: 'خطاب التفويض',
    capRep: 'ما يثبت صفتك (السجل أو عقد التأسيس)',
    capAgency: 'الوكالة',
    articles: 'عقد التأسيس (إن وجد)',
    opening: 'نسخة من سند الافتتاح',
    due: 'نسخة من سند الاستحقاق',
    security: 'نسخة من سند الضمان',
  },
  chooseFile: 'اختيار ملف',
  signature: 'التوقيع *',
  clearSignature: 'مسح التوقيع',
  declaration: DECLARATION_AR,
  declarationArNote: '',

  // التنقل
  prev: 'السابق',
  next: 'التالي',
  sending: 'جاري إرسال المطالبة...',
  confirmSend: 'تأكيد وإرسال المطالبة',

  // أثناء الإرسال
  progSaving: 'حفظ بيانات المطالبة...',
  progRegistering: 'تسجيل المطالبة...',
  progUploading: (i: number, n: number, label: string) => `رفع المرفق ${i} من ${n}: ${label}`,
  progAttaching: 'إرفاق المستندات بالمطالبة...',
  progDone: 'اكتمل الإرسال بنجاح!',
  progRegistered: 'تم تسجيل المطالبة',

  // النجاح
  receivedTitle: 'تم استلام مطالبتك',
  intakeNo: 'رقم الاستلام:',
  pendingNote: 'حُفظت بيانات مطالبتك، وسيكتمل تسجيلها خلال دقائق ويصلك رقمها برسالة. لا حاجة لتقديمها مرة أخرى.',
  receivedWithNo: 'تم استلام مطالبتك — رقم مطالبتك:',
  refNo: 'رقم المرجع:',
  studyNote: 'سيتم دراسة المطالبة من قبل أمين الإفلاس وإبلاغكم بالنتيجة',
  docsMissingTitle: 'سُجّلت مطالبتك، لكن هذه المستندات لم تصل:',
  uploadingShort: 'جارٍ الرفع…',
  reupload: 'إعادة رفع المستندات',
  docsMissingNote: 'وإن تعذّر رفعها فلا تُقدّم المطالبة مرة أخرى؛ سيصلك من المكتب رابطٌ لاستكمالها.',
  backToCases: 'العودة لقائمة القضايا',

  // الأخطاء والتنبيهات
  errChooseType: 'يرجى اختيار نوع الدائن',
  errName: (person: boolean): string => (person ? 'يرجى إدخال اسم الدائن' : 'يرجى إدخال اسم المنشأة كما في السجل'),
  errId: (person: boolean): string => (person ? 'يرجى إدخال رقم هوية الدائن' : 'يرجى إدخال رقم السجل أو الرقم الموحد للمنشأة'),
  errCapacity: 'يرجى اختيار صفتك في تقديم المطالبة',
  errYourName: 'يرجى إدخال اسمك',
  errYourId: 'يرجى إدخال رقم هويتك',
  errSameId: (person: boolean): string =>
    person
      ? 'رقم الدائن هو رقم هويتك. اكتب في خانة الدائن رقم هوية صاحب الحق.'
      : 'رقم المنشأة هو رقم هويتك. اكتب في خانة الدائن رقم سجل المنشأة أو رقمها الموحد.',
  errCapDoc: (label: string) => `يرجى إدخال ${label}`,
  errPhone: 'يرجى إدخال رقم الجوال',
  errEmail: 'يرجى إدخال البريد الإلكتروني',
  errAddress: (parts: string): string => `أكمل العنوان الوطني: ${parts}`,
  errDueDate: 'يرجى إدخال تاريخ الاستحقاق',
  errDueDoc: 'يرجى إدخال مستند الاستحقاق (عقد، فواتير، حكم، كشف حساب…)',
  errAmount: 'يرجى إدخال مبلغ المطالبة بالأرقام، مثل 43000',
  errSecurity: 'قيمة الضمان غير مفهومة — اكتبها بالأرقام، مثل 50000',
  errReason: 'يرجى إدخال سبب المطالبة',
  errSignature: 'يرجى إضافة توقيعك',
  errDeclaration: 'يرجى الموافقة على الإقرار',
  errFileSize: 'الملف أكبر من 10 ميجا',
  errSendFailed: 'تعذّر إرسال المطالبة — تحقّق من الاتصال وأعد المحاولة. بياناتك باقية في هذه الصفحة.',
  errGeneric: 'حدث خطأ، يرجى المحاولة مرة أخرى',
  errLoadCases: 'تعذّر تحميل القضايا',
  docsDone: 'اكتمل رفع المستندات',
  docsRetryFail: 'تعذّر رفع بعض المستندات مرة أخرى',
  draftRestored: 'استُعيدت بيانات كتبتها سابقاً. أعد إرفاق المستندات والتوقيع.',
};

export type ClaimsStrings = typeof ar;

const en: ClaimsStrings = {
  seoTitle: 'Submit a Creditor Claim Online',
  seoDesc:
    'Submit your creditor claim online in bankruptcy and liquidation proceedings managed by Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management. Choose the case, enter the debt details, and attach your documents before the statutory deadline.',
  crumbHome: 'Home',
  crumbBankruptcy: 'Bankruptcy Procedures',
  crumbClaims: 'Submit a Claim',
  heroTitle: 'Submit a Creditor Claim',
  heroIntro:
    'This page lets creditors submit their claims online in the bankruptcy proceedings the firm manages as bankruptcy trustee. Start by choosing the case, then enter the claim details and attach supporting documents. Refer to the official announcement of each proceeding for its dates and requirements.',

  chooseCase: 'Choose the case you want to file a claim in',
  loadingCases: 'Loading cases...',
  openCases: 'Open cases',
  daysLeft: (n: number) => `${n} ${n === 1 ? 'day' : 'days'} left`,
  available: 'Open',
  regLabel: 'CR',
  caseLabel: 'Case',
  courtLabel: 'Court',
  deadlineLabel: 'Deadline',
  submitClaim: 'Submit a claim',
  noOpenCases: 'No cases are currently open for claims',
  inquiries: 'Inquiries',
  change: 'Change',
  steps: ['Creditor details', 'Claim details', 'Documents and signature'],

  creditorTitle: 'The creditor (the rightful party)',
  creditorSub: 'The person or entity owed the debt by the debtor.',
  creditorTypeLabel: 'Creditor type *',
  chooseTypeHint: 'Choose the creditor type to show the remaining fields.',
  nameLabel: (type: string): string =>
    type === 'فرد' ? "Creditor's full name as on the ID *"
      : type === 'جهة حكومية' ? 'Entity name *'
        : type === 'بنك' ? 'Bank name *'
          : `${type === 'مؤسسة' ? 'Establishment' : 'Company'} name as in the commercial register *`,
  idTypeLabel: 'ID type *',
  idNumberLabel: (type: string): string =>
    type === 'فرد' ? 'ID number *' : type === 'جهة حكومية' ? 'Unified number of the entity (700) *' : 'Commercial register or unified number *',
  idNumberHint: "The creditor's own number, not the number of whoever files on their behalf.",
  whoTitle: 'Who is filing the claim?',
  selfTitle: 'I am the creditor',
  selfSub: 'Filing for myself',
  otherTitle: 'Filing for someone else',
  otherSub: 'Agent or lawyer',
  orgApplicantNote: 'An entity files through a person: its legal representative, an authorized employee, or an agent.',
  capacityLabel: 'Your capacity *',
  choose: 'Choose...',
  applicantNameLabel: 'Your full name *',
  applicantIdLabel: 'Your ID number *',
  sameIdInline: (person: boolean): string =>
    `This is the creditor's number. In the creditor field, enter the number of the rightful party${person ? '' : ': the entity\'s CR or unified number'}.`,
  capacityDocLabel: (cap: string): string => (cap === 'موظف مفوَّض' ? 'Authorization letter number or date' : 'Power of attorney number'),
  contactTitle: 'Contact',
  contactApplicant: "Your own mobile and email. The creditor-portal login code (using the creditor's number) and all claim notifications are sent to them.",
  contactSelf: 'The creditor-portal login code and all claim notifications are sent to them.',
  phoneLabel: 'Mobile number *',
  emailLabel: 'Email *',
  addressLabel: (person: boolean): string => `National address of the ${person ? 'creditor' : 'entity'} *`,
  addr: { building: 'Building no.', street: 'Street', district: 'District', city: 'City', postal: 'Postal code', additional: 'Additional no.' },

  detailsTitle: 'Claim details',
  claimTypeLabel: 'Claim type *',
  amountLabel: 'Claim amount (SAR) *',
  amountPlaceholder: 'e.g. 43000',
  amountUnclear: 'Amount not understood — write it in digits, e.g. 43000',
  willRecord: 'Will be recorded as:',
  securedQ: 'Is the claim secured?',
  yes: 'Yes',
  no: 'No',
  securityTypeLabel: 'Security type',
  securityValueLabel: 'Security value (SAR)',
  originDate: 'Date the debt arose',
  dueDate: 'Due date *',
  dueDocLabel: 'Proof of debt *',
  dueDocPlaceholder: 'e.g. Invoice no. 2024-478, cheque no. 123456',
  reasonLabel: 'Reason for the claim *',
  reasonPlaceholder: 'Explain the reason for the claim in detail',

  docsTitle: 'Documents and signature',
  doc: {
    creditorIdPerson: "Copy of the creditor's ID",
    creditorIdGov: "Proof of the entity's unified number",
    creditorIdOrg: 'Copy of the commercial register',
    applicantId: 'Copy of your ID (the filer)',
    capAuth: 'Authorization letter',
    capRep: 'Proof of your capacity (CR or articles of association)',
    capAgency: 'Power of attorney',
    articles: 'Articles of association (if any)',
    opening: 'Copy of the opening document',
    due: 'Copy of the proof of debt',
    security: 'Copy of the security document',
  },
  chooseFile: 'Choose file',
  signature: 'Signature *',
  clearSignature: 'Clear signature',
  declaration:
    'I declare that all the information entered is true and accurate, and I bear full responsibility for its accuracy under the Bankruptcy Law and its Implementing Regulations.',
  declarationArNote: 'The Arabic text is the authoritative version:',

  prev: 'Back',
  next: 'Next',
  sending: 'Submitting the claim...',
  confirmSend: 'Confirm and submit the claim',

  progSaving: 'Saving the claim...',
  progRegistering: 'Registering the claim...',
  progUploading: (i: number, n: number, label: string) => `Uploading attachment ${i} of ${n}: ${label}`,
  progAttaching: 'Attaching documents to the claim...',
  progDone: 'Submitted successfully!',
  progRegistered: 'Claim registered',

  receivedTitle: 'Your claim has been received',
  intakeNo: 'Receipt no.:',
  pendingNote: 'Your claim has been saved. Its registration will complete within minutes and you will receive its number by message. There is no need to submit it again.',
  receivedWithNo: 'Your claim has been received — claim no.:',
  refNo: 'Reference:',
  studyNote: 'The bankruptcy trustee will study the claim and notify you of the outcome.',
  docsMissingTitle: 'Your claim was registered, but these documents did not arrive:',
  uploadingShort: 'Uploading…',
  reupload: 'Upload the documents again',
  docsMissingNote: 'If they still fail, do not submit the claim again; the firm will send you a link to complete it.',
  backToCases: 'Back to the case list',

  errChooseType: 'Choose the creditor type',
  errName: (person: boolean): string => (person ? "Enter the creditor's name" : "Enter the entity's name as in the register"),
  errId: (person: boolean): string => (person ? "Enter the creditor's ID number" : "Enter the entity's CR or unified number"),
  errCapacity: 'Choose your capacity in filing the claim',
  errYourName: 'Enter your name',
  errYourId: 'Enter your ID number',
  errSameId: (person: boolean): string =>
    person
      ? "The creditor's number is your own ID. In the creditor field, enter the rightful party's ID number."
      : "The entity's number is your own ID. In the creditor field, enter the entity's CR or unified number.",
  errCapDoc: (label: string) => `Enter the ${label.toLowerCase()}`,
  errPhone: 'Enter the mobile number',
  errEmail: 'Enter the email address',
  errAddress: (parts: string): string => `Complete the national address: ${parts}`,
  errDueDate: 'Enter the due date',
  errDueDoc: 'Enter the proof of debt (contract, invoices, judgment, statement…)',
  errAmount: 'Enter the claim amount in digits, e.g. 43000',
  errSecurity: 'Security value not understood — write it in digits, e.g. 50000',
  errReason: 'Enter the reason for the claim',
  errSignature: 'Add your signature',
  errDeclaration: 'Accept the declaration',
  errFileSize: 'The file is larger than 10 MB',
  errSendFailed: 'The claim could not be sent — check your connection and try again. Your data is still on this page.',
  errGeneric: 'Something went wrong. Try again.',
  errLoadCases: 'Could not load the cases',
  docsDone: 'Documents uploaded',
  docsRetryFail: 'Some documents still could not be uploaded',
  draftRestored: 'Data you entered earlier was restored. Attach the documents and sign again.',
};

const ur: ClaimsStrings = {
  seoTitle: 'قرض خواہ کا دعویٰ آن لائن جمع کرائیں',
  seoDesc:
    'شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس کے زیرِ انتظام دیوالیہ اور تصفیہ کارروائیوں میں اپنا دعویٰ آن لائن جمع کرائیں۔ مقدمہ منتخب کریں، قرض کی تفصیلات درج کریں اور مقررہ مدت سے پہلے دستاویزات منسلک کریں۔',
  crumbHome: 'صفحۂ اوّل',
  crumbBankruptcy: 'دیوالیہ کارروائیاں',
  crumbClaims: 'دعویٰ جمع کرائیں',
  heroTitle: 'قرض خواہ کا دعویٰ جمع کرائیں',
  heroIntro:
    'اس صفحے کے ذریعے قرض خواہ اُن دیوالیہ کارروائیوں میں اپنا دعویٰ آن لائن جمع کرا سکتے ہیں جن کا انتظام فرم بطور دیوالیہ امین کرتی ہے۔ پہلے مقدمہ منتخب کریں، پھر دعوے کی تفصیلات درج کریں اور معاون دستاویزات منسلک کریں۔ ہر کارروائی کی تاریخوں اور شرائط کے لیے اس کا سرکاری اعلان دیکھیں۔',

  chooseCase: 'وہ مقدمہ منتخب کریں جس میں آپ دعویٰ جمع کرانا چاہتے ہیں',
  loadingCases: 'مقدمات لوڈ ہو رہے ہیں...',
  openCases: 'کھلے مقدمات',
  daysLeft: (n: number) => `${n} دن باقی`,
  available: 'کھلا ہے',
  regLabel: 'تجارتی رجسٹریشن',
  caseLabel: 'مقدمہ',
  courtLabel: 'عدالت',
  deadlineLabel: 'آخری تاریخ',
  submitClaim: 'دعویٰ جمع کرائیں',
  noOpenCases: 'اس وقت دعوے وصول کرنے کے لیے کوئی مقدمہ کھلا نہیں',
  inquiries: 'رابطہ',
  change: 'تبدیل کریں',
  steps: ['قرض خواہ کی تفصیلات', 'دعوے کی تفصیلات', 'دستاویزات اور دستخط'],

  creditorTitle: 'حق دار (قرض خواہ)',
  creditorSub: 'وہ فرد یا ادارہ جس کا قرض مقروض کے ذمے ہے۔',
  creditorTypeLabel: 'قرض خواہ کی قسم *',
  chooseTypeHint: 'باقی خانے دیکھنے کے لیے قرض خواہ کی قسم منتخب کریں۔',
  nameLabel: (type: string): string =>
    type === 'فرد' ? 'شناختی کارڈ کے مطابق قرض خواہ کا پورا نام *'
      : type === 'جهة حكومية' ? 'ادارے کا نام *'
        : type === 'بنك' ? 'بینک کا نام *'
          : `تجارتی رجسٹر کے مطابق ${type === 'مؤسسة' ? 'ادارے' : 'کمپنی'} کا نام *`,
  idTypeLabel: 'شناخت کی قسم *',
  idNumberLabel: (type: string): string =>
    type === 'فرد' ? 'شناختی نمبر *' : type === 'جهة حكومية' ? 'ادارے کا یونیفائیڈ نمبر (700) *' : 'تجارتی رجسٹریشن یا یونیفائیڈ نمبر *',
  idNumberHint: 'خود حق دار کا نمبر، اُس کی طرف سے دعویٰ جمع کرانے والے کا نہیں۔',
  whoTitle: 'دعویٰ کون جمع کرا رہا ہے؟',
  selfTitle: 'میں خود حق دار ہوں',
  selfSub: 'اپنی طرف سے جمع کرا رہا ہوں',
  otherTitle: 'کسی اور کی طرف سے',
  otherSub: 'وکیل یا ایڈووکیٹ',
  orgApplicantNote: 'ادارے کی طرف سے کوئی فرد دعویٰ جمع کراتا ہے: اس کا قانونی نمائندہ، مجاز ملازم یا وکیل۔',
  capacityLabel: 'آپ کی حیثیت *',
  choose: 'منتخب کریں...',
  applicantNameLabel: 'آپ کا پورا نام *',
  applicantIdLabel: 'آپ کا شناختی نمبر *',
  sameIdInline: (person: boolean): string =>
    `یہ قرض خواہ کا ہی نمبر ہے۔ قرض خواہ کے خانے میں حق دار کا نمبر لکھیں${person ? '' : ': ادارے کا تجارتی رجسٹریشن یا یونیفائیڈ نمبر'}۔`,
  capacityDocLabel: (cap: string): string => (cap === 'موظف مفوَّض' ? 'اجازت نامے کا نمبر یا تاریخ' : 'وکالت نامے کا نمبر'),
  contactTitle: 'رابطہ',
  contactApplicant: 'آپ کا اپنا موبائل اور ای میل۔ قرض خواہ پورٹل کا لاگ اِن کوڈ (قرض خواہ کے نمبر سے) اور دعوے کی تمام اطلاعات انہی پر آئیں گی۔',
  contactSelf: 'قرض خواہ پورٹل کا لاگ اِن کوڈ اور دعوے کی تمام اطلاعات انہی پر آئیں گی۔',
  phoneLabel: 'موبائل نمبر *',
  emailLabel: 'ای میل *',
  addressLabel: (person: boolean): string => `${person ? 'قرض خواہ' : 'ادارے'} کا قومی پتہ *`,
  addr: { building: 'عمارت نمبر', street: 'گلی', district: 'محلہ', city: 'شہر', postal: 'پوسٹل کوڈ', additional: 'اضافی نمبر' },

  detailsTitle: 'دعوے کی تفصیلات',
  claimTypeLabel: 'دعوے کی قسم *',
  amountLabel: 'دعوے کی رقم (ریال) *',
  amountPlaceholder: 'مثال: 43000',
  amountUnclear: 'رقم سمجھ نہیں آئی — ہندسوں میں لکھیں، جیسے 43000',
  willRecord: 'یوں درج ہوگی:',
  securedQ: 'کیا دعویٰ ضمانت شدہ ہے؟',
  yes: 'ہاں',
  no: 'نہیں',
  securityTypeLabel: 'ضمانت کی قسم',
  securityValueLabel: 'ضمانت کی مالیت (ریال)',
  originDate: 'قرض پیدا ہونے کی تاریخ',
  dueDate: 'واجب الادا ہونے کی تاریخ *',
  dueDocLabel: 'واجب الادا دستاویز *',
  dueDocPlaceholder: 'مثال: انوائس نمبر 2024-478، چیک نمبر 123456',
  reasonLabel: 'دعوے کی وجہ *',
  reasonPlaceholder: 'دعوے کی وجہ تفصیل سے بیان کریں',

  docsTitle: 'دستاویزات اور دستخط',
  doc: {
    creditorIdPerson: 'قرض خواہ کے شناختی کارڈ کی نقل',
    creditorIdGov: 'ادارے کے یونیفائیڈ نمبر کا ثبوت',
    creditorIdOrg: 'تجارتی رجسٹریشن کی نقل',
    applicantId: 'آپ کے شناختی کارڈ کی نقل (درخواست گزار)',
    capAuth: 'اجازت نامہ',
    capRep: 'آپ کی حیثیت کا ثبوت (رجسٹریشن یا معاہدۂ تاسیس)',
    capAgency: 'وکالت نامہ',
    articles: 'معاہدۂ تاسیس (اگر ہو)',
    opening: 'افتتاحی دستاویز کی نقل',
    due: 'واجب الادا دستاویز کی نقل',
    security: 'ضمانتی دستاویز کی نقل',
  },
  chooseFile: 'فائل منتخب کریں',
  signature: 'دستخط *',
  clearSignature: 'دستخط مٹائیں',
  declaration:
    'میں اقرار کرتا ہوں کہ درج کی گئی تمام معلومات درست اور صحیح ہیں، اور دیوالیہ قانون اور اس کے انتظامی ضوابط کے مطابق ان کی صحت کی پوری ذمہ داری قبول کرتا ہوں۔',
  declarationArNote: 'عربی متن ہی مستند ہے:',

  prev: 'پیچھے',
  next: 'آگے',
  sending: 'دعویٰ بھیجا جا رہا ہے...',
  confirmSend: 'تصدیق کریں اور دعویٰ بھیجیں',

  progSaving: 'دعویٰ محفوظ ہو رہا ہے...',
  progRegistering: 'دعویٰ درج ہو رہا ہے...',
  progUploading: (i: number, n: number, label: string) => `منسلکہ ${i} از ${n} اپ لوڈ ہو رہی ہے: ${label}`,
  progAttaching: 'دستاویزات دعوے سے منسلک ہو رہی ہیں...',
  progDone: 'کامیابی سے بھیج دیا گیا!',
  progRegistered: 'دعویٰ درج ہو گیا',

  receivedTitle: 'آپ کا دعویٰ موصول ہو گیا',
  intakeNo: 'وصولی نمبر:',
  pendingNote: 'آپ کا دعویٰ محفوظ ہو گیا ہے۔ چند منٹ میں اس کا اندراج مکمل ہو جائے گا اور اس کا نمبر آپ کو پیغام کے ذریعے ملے گا۔ دوبارہ جمع کرانے کی ضرورت نہیں۔',
  receivedWithNo: 'آپ کا دعویٰ موصول ہو گیا — دعویٰ نمبر:',
  refNo: 'حوالہ نمبر:',
  studyNote: 'دیوالیہ امین دعوے کا جائزہ لے کر آپ کو نتیجے سے آگاہ کرے گا۔',
  docsMissingTitle: 'آپ کا دعویٰ درج ہو گیا، لیکن یہ دستاویزات نہیں پہنچیں:',
  uploadingShort: 'اپ لوڈ ہو رہی ہیں…',
  reupload: 'دستاویزات دوبارہ اپ لوڈ کریں',
  docsMissingNote: 'اگر پھر بھی نہ ہو سکے تو دعویٰ دوبارہ جمع نہ کرائیں؛ فرم آپ کو تکمیل کا لنک بھیجے گی۔',
  backToCases: 'مقدمات کی فہرست پر واپس',

  errChooseType: 'قرض خواہ کی قسم منتخب کریں',
  errName: (person: boolean): string => (person ? 'قرض خواہ کا نام درج کریں' : 'رجسٹر کے مطابق ادارے کا نام درج کریں'),
  errId: (person: boolean): string => (person ? 'قرض خواہ کا شناختی نمبر درج کریں' : 'ادارے کا تجارتی رجسٹریشن یا یونیفائیڈ نمبر درج کریں'),
  errCapacity: 'دعویٰ جمع کرانے میں اپنی حیثیت منتخب کریں',
  errYourName: 'اپنا نام درج کریں',
  errYourId: 'اپنا شناختی نمبر درج کریں',
  errSameId: (person: boolean): string =>
    person
      ? 'قرض خواہ کا نمبر آپ کا اپنا شناختی نمبر ہے۔ قرض خواہ کے خانے میں حق دار کا شناختی نمبر لکھیں۔'
      : 'ادارے کا نمبر آپ کا اپنا شناختی نمبر ہے۔ قرض خواہ کے خانے میں ادارے کا تجارتی رجسٹریشن یا یونیفائیڈ نمبر لکھیں۔',
  errCapDoc: (label: string) => `${label} درج کریں`,
  errPhone: 'موبائل نمبر درج کریں',
  errEmail: 'ای میل درج کریں',
  errAddress: (parts: string): string => `قومی پتہ مکمل کریں: ${parts}`,
  errDueDate: 'واجب الادا ہونے کی تاریخ درج کریں',
  errDueDoc: 'واجب الادا دستاویز درج کریں (معاہدہ، انوائس، فیصلہ، اسٹیٹمنٹ…)',
  errAmount: 'دعوے کی رقم ہندسوں میں درج کریں، جیسے 43000',
  errSecurity: 'ضمانت کی مالیت سمجھ نہیں آئی — ہندسوں میں لکھیں، جیسے 50000',
  errReason: 'دعوے کی وجہ درج کریں',
  errSignature: 'اپنے دستخط شامل کریں',
  errDeclaration: 'اقرار نامہ قبول کریں',
  errFileSize: 'فائل 10 ایم بی سے بڑی ہے',
  errSendFailed: 'دعویٰ نہیں بھیجا جا سکا — اپنا کنکشن چیک کریں اور دوبارہ کوشش کریں۔ آپ کی معلومات اسی صفحے پر موجود ہیں۔',
  errGeneric: 'کوئی خرابی ہوئی، دوبارہ کوشش کریں',
  errLoadCases: 'مقدمات لوڈ نہیں ہو سکے',
  docsDone: 'دستاویزات اپ لوڈ ہو گئیں',
  docsRetryFail: 'کچھ دستاویزات اب بھی اپ لوڈ نہیں ہو سکیں',
  draftRestored: 'آپ کی پہلے درج کی گئی معلومات بحال کر دی گئیں۔ دستاویزات اور دستخط دوبارہ شامل کریں۔',
};

export const CLAIMS_T: Record<Lang, ClaimsStrings> = { ar, en, ur };
