/**
 * Bankruptcy proceedings administered by the firm, as recorded on the Ghuramaa platform.
 *
 * Public fields only. Never add claim counts or amounts, recommendations, creditor names,
 * vote outcomes, or the platform's internal deadlines: none of these are published.
 * Names are written exactly as recorded; do not correct them here.
 */

export const DATA_AS_OF = "2026-10-26";

export const FIRM = {
  name: "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
  licence: "142147",
  phone: "920032760",
  email: "bankruptcy@redwan.sa",
  portal: "https://claims.redwan.sa/",
};

export type Track = "liq" | "reorg" | "small";

export const TRACK: Record<Track, { label: string; eyebrow: string; role: string }> = {
  liq: { label: "التصفية", eyebrow: "إجراء التصفية", role: "أمين التصفية" },
  reorg: { label: "إعادة التنظيم المالي", eyebrow: "إجراء إعادة التنظيم المالي", role: "أمين إعادة التنظيم المالي" },
  small: { label: "التصفية لصغار المدينين", eyebrow: "إجراء التصفية لصغار المدينين", role: "أمين التصفية" },
};

export const adUrl = (id: number) =>
  `https://bankruptcy.gov.sa/ar/Announcements/Pages/announcementDetails.aspx?AdID=${id}`;

export type DocKind = "link" | "page" | "notice";
export interface ProceedingDoc {
  on: string;
  show?: string;
  kind: DocKind;
  title: string;
  issuer: string;
  url: string;
}

/** One block of a notice as issued: [kind, Arabic, English, (caution items)] */
export type NoticeBlock =
  | ["dates" | "title" | "ref" | "to" | "p" | "h" | "sub" | "line" | "li" | "thanks", string, string]
  | ["sign", string]
  | ["votelink" | "meetlink" | "proposal" | "contact"]
  | ["caution", string, string, [string, string][]];

export interface ProceedingNotice {
  slug: string;
  kind: string;
  title: string;
  titleEn: string;
  issued: string;
  issuedH: string;
  dayAr: string;
  date: string;
  dateH: string;
  meetingAt: string;
  start: string;
  end: string;
  meeting: string;
  cal: string;
  ics: string;
  /** the search snippet for the notice's page */
  seoDescription: string;
  text: NoticeBlock[];
}

export interface Proceeding {
  ref: string;
  slug: string;
  name: string;
  en?: string;
  track: Track;
  court?: string;
  caseNo?: string;
  openRef?: string;
  openNote?: string;
  opened: string;
  ann?: { on: string; ad?: number; note?: string };
  deadline?: string;
  cr?: string;
  uni?: string;
  form?: string;
  activity?: string;
  hq?: string;
  founded?: string;
  lead?: string;
  about?: string[];
  products?: string[];
  logo?: string;
  prior?: { caseNo: string; opened: string };
  list?: { filed: string; approved?: string };
  vote?: string;
  /** an individual debtor: no company profile, kept out of search engines */
  person?: boolean;
  /** the proceeding also has an English page at /en/bankruptcy/{slug} */
  enPage?: boolean;
  notices?: ProceedingNotice[];
  docs?: ProceedingDoc[];
  seo: { title: string; description: string };
}

export const VOTE_ZAHRANI: ProceedingNotice = {
  slug: "vote",
  kind: "إعلان تصويت",
  title: "إعلان التصويت على مقترح إعادة التنظيم المالي",
  titleEn: "Notice of Voting on the Financial Reorganization Proposal",
  issued: "2026-07-26",
  issuedH: "12/02/1448هـ",
  dayAr: "الأحد",
  date: "2026-08-16",
  dateH: "03/03/1448هـ",
  meetingAt: "2026-08-16T12:30:00+03:00",
  start: "2026-08-16T13:00:00+03:00",
  end: "2026-08-16T15:00:00+03:00",
  meeting: "https://teams.live.com/meet/9340091875810?p=vX7vW4yTYFSqeuCwxx",
  cal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=%D8%A7%D9%84%D8%AA%D8%B5%D9%88%D9%8A%D8%AA+%D8%B9%D9%84%D9%89+%D9%85%D9%82%D8%AA%D8%B1%D8%AD+%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85+%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A&dates=20260816T093000Z/20260816T120000Z",
  ics: "/voting-event.ics",
  seoDescription: "إعلان أمين إعادة التنظيم المالي لدائني شركة حسن مسفر الزهراني وشركاه بالتصويت إلكترونياً على مقترح إعادة التنظيم المالي يوم الأحد 16 أغسطس 2026، من الساعة 1:00 إلى 3:00 مساءً، بنصه العربي والإنجليزي.",
  /* the notice exactly as issued */
  text: [
    ["dates", "12/02/1448هـ", "26/07/2026م"],
    ["title", "إعلان التصويت على مقترح إعادة التنظيم المالي", "Notice of Voting on the Financial Reorganization Proposal"],
    ["ref", "شركة حسن مسفر الزهراني وشركاه (سجل تجاري رقم 2050001522).", "Hassan Misfer Al-Zahrani & Partners Company Commercial Registration No. (2050001522)."],
    ["to", "إلى: دائـنـي شـركـة حـسـن مـسفـر الزهـرانـي وشـركـاه المحترمين", "To: The Creditors of Hassan Misfer Al-Zahrani & Partners Company"],
    ["p", "السلام عليكم ورحمة الله وبركاته، وبعد:", ""],
    ["p", "يسر أمين إجراء إعادة التنظيم المالي لشركة حسن مسفر الزهراني وشركاه دعوتكم إلى التصويت على مقترح إعادة التنظيم المالي، وذلك وفق المواعيد والإجراءات الآتية:", "The Financial Reorganization Procedure Trustee of Hassan Misfer Al-Zahrani & Partners Company is pleased to invite you to vote on the Financial Reorganization Proposal, in accordance with the following dates and procedures:"],
    ["h", "أولاً: موعد التصويت واجتماع الدائنين", "First: Voting Schedule and Creditors' Meeting"],
    ["line", "اليوم: الأحد", "Day: Sunday"],
    ["line", "التاريخ الهجري: 03/03/1448هـ", "Hijri Date: 03/03/1448 AH"],
    ["line", "التاريخ الميلادي: 16/08/2026م", "Gregorian Date: 16/08/2026"],
    ["line", "فترة التصويت: من الساعة 1:00 مساءً حتى الساعة 3:00 مساءً", "Voting Period: From 1:00 PM to 3:00 PM."],
    ["p", "يتم التصويت إلكترونياً من خلال بوابة الدائن، وذلك باختيار الموافقة أو عدم الموافقة على مقترح إعادة التنظيم المالي.", "Voting shall be conducted electronically through the Creditor Portal by selecting either approval or rejection of the Financial Reorganization Proposal."],
    ["votelink"],
    ["p", "ويعقد أمين إجراء إعادة التنظيم المالي، بالتزامن مع فترة التصويت، اجتماعاً إلكترونياً للدائنين.", "Concurrently with the voting period, the Financial Reorganization Procedure Trustee will hold an electronic meeting for the creditors."],
    ["meetlink"],
    ["sub", "أجندة الاجتماع", "Meeting Agenda"],
    ["li", "الترحيب بالحضور، من الساعة 12:30 حتى الساعة 1:00م", "Welcoming the attendees, from 12:30 PM until 1:00 PM."],
    ["li", "كلمة افتتاحية من الأطراف ذات الصلة بالإجراء، من الساعة 1:00 حتى الساعة 1:15م", "Opening remarks by parties related to the procedure, from 1:00 until 1:15 PM."],
    ["li", "عرض عن سير إجراء إعادة التنظيم المالي، من الساعة 1:15 حتى الساعة 1:30م", "An overview of the progress of the Financial Reorganization Procedure, from 1:15 PM until 1:30 PM."],
    ["li", "استعراض مقترح إعادة التنظيم المالي، من الساعة 1:30 حتى الساعة 1:45م", "Presentation of the Financial Reorganization Proposal, from 1:30 PM until 1:45 PM."],
    ["li", "الإجابة عن استفسارات الدائنين المتعلقة بالمقترح، من الساعة 1:45 حتى الساعة 2:15م", "Responding to creditors' inquiries relating to the Proposal, from 1:45 PM until 2:15 PM."],
    ["li", "استمرار استقبال أصوات الدائنين عبر الرابط المخصص للتصويت حتى الساعة 3:00م", "Continued receipt of creditors' votes through the designated voting link until 3:00 PM."],
    ["li", "إغلاق باب التصويت وفرز الأصوات وإعلان النتيجة، من الساعة 3:00 حتى الساعة 4:30م، وقد يستغرق ذلك وقتاً أطول.", "Closing the voting period, counting the votes, and announcing the voting result, from 3:00 PM until 4:30 PM. This process may take longer."],
    ["h", "ثانياً: مقترح إعادة التنظيم المالي", "Second: Financial Reorganization Proposal"],
    ["p", "يرفق مقترح إعادة التنظيم المالي بهذا الإعلان، لتمكين الدائنين من الاطلاع عليه قبل موعد التصويت، كما يتضمن الإعلان تفاصيل التصويت وروابط الدخول.", "The Financial Reorganization Proposal is attached for creditors' review, together with the voting details and access links."],
    ["h", "ثالثاً: إعلان نتيجة التصويت", "Third: Announcement of the Voting Result"],
    ["p", "سيتم إعلان نتيجة التصويت بعد انتهاء فترة التصويت واستكمال الإجراءات النظامية، وسيُشعر الدائنون بها عبر وسائل التواصل المعتمدة.", "The voting result will be announced after the voting period has ended and the statutory procedures have been completed. Creditors will be notified of the result through the approved communication channels."],
    ["sub", "تعليمات مهمة", "Important Instructions"],
    ["li", "يجب تقديم المستندات المؤيدة للصفة، بما في ذلك الهوية، والوكالة أو التفويض الساري المفعول، بحسب الأحوال، إلى أمين الإجراء قبل موعد التصويت بيومين على الأقل، للتحقق منها واعتماد مشاركة المصوت.", "Documents evidencing the voter's capacity and authority, including an identification document and, where applicable, a valid power of attorney or authorization, must be submitted to the Procedure Trustee at least two days before the voting date for verification and approval of the voter's participation."],
    ["li", "يقتصر الاطلاع على المقترح والتصويت على الأشخاص المخولين بذلك، ويحظر تداول المقترح أو نسخه أو نشره بأي وسيلة، إلا وفقاً للأنظمة والتعليمات ذات العلاقة.", "Access to the Proposal and voting shall be restricted to persons duly authorized by law. The Proposal may not be circulated, copied, or published by any means except in accordance with the applicable laws and relevant instructions."],
    ["li", "يتعين الدخول إلى رابط التصويت باستخدام البيانات والتعليمات الواردة في هذا الإعلان، واستكمال المتطلبات اللازمة قبل إبداء التصويت.", "Voters must access the voting link using the information and instructions set out in this announcement and complete all necessary requirements before casting their votes."],
    ["li", "في حال مواجهة أي مشكلة تقنية، يمكن التواصل مع فريق الدعم الفني عبر البريد الإلكتروني والواتساب.", "In the event of any technical issue, the technical support team may be contacted via email and WhatsApp."],
    ["caution", "تنبيه", "Notice", [
      ["يتم التصويت حصرياً من خلال الرابط الإلكتروني المخصص للتصويت، ولا يتم التصويت من خلال الاجتماع الإلكتروني.", "Voting shall be conducted exclusively through the designated electronic voting link and shall not take place through the electronic meeting."],
      ["يقتصر التصويت على الفترة المحددة أعلاه، ولن يُقبل أي تصويت يرد بعد إغلاق الرابط عند الساعة 3:00 مساءً.", "Voting shall be limited to the period specified above, and no vote submitted after the voting link closes at 3:00 PM will be accepted."],
      ["يوصى بمراجعة المقترح المرفق، والتحقق من صلاحية رابط التصويت، واستكمال الوكالات أو التفويضات والمتطلبات اللازمة قبل الموعد المحدد بوقت كافٍ.", "Creditors are advised to review the attached Proposal, verify the validity of the voting link, and complete all required powers of attorney, authorizations, and other requirements sufficiently in advance of the specified date and time."],
    ]],
    ["proposal"],
    ["thanks", "شاكرين ومقدرين تعاونكم.", "Thank you for your cooperation"],
    ["contact"],
    ["sign", "أمين إجراء إعادة التنظيم المالي / عبدالرحمن بن رضوان المشيقح"],
  ],
};

export const PROCEEDINGS: Proceeding[] = [
  { ref: "011", slug: "small-debtor-011", person: true, name: "محمد الحميدي بن مفلح الحربي", track: "small",
    openRef: "481000580", opened: "2026-08-18", ann: { on: "2026-08-26", ad: 9614 }, deadline: "2026-10-25",
    seo: { title: "إجراء التصفية لصغار المدينين", description: "بيانات إجراء التصفية لصغار المدينين ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "010", slug: "Rahima-Al-Ahli-Dispensary", name: "شركة مستوصف رحيمة الأهلى المحدودة", track: "liq", court: "المحكمة التجارية بالدمام — الدائرة الأولى", caseNo: "471007079",
    openRef: "452005129", opened: "2026-07-30", ann: { on: "2026-08-05", ad: 9527 }, deadline: "2026-11-03", cr: "2066001884",
    seo: { title: "تصفية شركة مستوصف رحيمة الأهلى المحدودة", description: "بيانات إجراء تصفية شركة مستوصف رحيمة الأهلى المحدودة أمام المحكمة التجارية بالدمام، ومراحله وإعلاناته، وتقديم المطالبات عبر بوابة الدائن." } },
  { ref: "009", slug: "Riyadh-Paints", name: "شركة الرياض للدهانات", track: "liq", court: "المحكمة التجارية بالرياض — الدائرة التاسعة", caseNo: "471008154",
    openRef: "452005005", opened: "2026-07-15", ann: { on: "2026-07-26", ad: 9494 }, deadline: "2026-10-25", cr: "1010071960",
    seo: { title: "تصفية شركة الرياض للدهانات", description: "بيانات إجراء تصفية شركة الرياض للدهانات أمام المحكمة التجارية بالرياض، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "002-ت", slug: "tajalriayaa", enPage: true, name: "شركة تاج الرعاية الطبي", en: "Taj Al-Riaya Medical Company", track: "liq", court: "المحكمة التجارية بالدمام — الدائرة الأولى", caseNo: "474007150",
    openRef: "452004611", opened: "2026-05-21", ann: { on: "2026-06-02", ad: 9321 }, deadline: "2026-08-25", cr: "2511025005", uni: "7009419503",
    prior: { caseNo: "451002463", opened: "2024-10-02" },
    lead: "منشأة تعمل في مجال الرعاية الطبية والخدمات الصحية.", activity: "الرعاية الطبية والخدمات الصحية",
    seo: { title: "تصفية شركة تاج الرعاية الطبي", description: "بيانات إجراء تصفية شركة تاج الرعاية الطبي أمام المحكمة التجارية بالدمام، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "008", slug: "Planting-for-Contracting", enPage: true, name: "شركة المزروعات للمقاولات شركة شخص واحد", en: "Planting for Contracting Company", track: "reorg", court: "المحكمة التجارية بالرياض — الدائرة التاسعة", caseNo: "471007543",
    openRef: "452004538", opened: "2026-05-13", ann: { on: "2026-05-14", ad: 9283 }, deadline: "2026-08-12", cr: "1010638616", uni: "7017311106", form: "شركة شخص واحد",
    seo: { title: "إعادة التنظيم المالي لشركة المزروعات للمقاولات", description: "بيانات إجراء إعادة التنظيم المالي لشركة المزروعات للمقاولات أمام المحكمة التجارية بالرياض، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "007", slug: "Al-Anjaz-Hotel-Village", enPage: true, name: "شركة قرية الأنجاز الفندقية", en: "Al-Anjaz Hotel Village Company", track: "liq", court: "المحكمة التجارية بالرياض", caseNo: "471007361",
    openRef: "452004482", opened: "2026-05-06", ann: { on: "2026-05-11", ad: 8276 }, deadline: "2026-08-09", cr: "1010635991", uni: "7017207254",
    seo: { title: "تصفية شركة قرية الأنجاز الفندقية", description: "بيانات إجراء تصفية شركة قرية الأنجاز الفندقية أمام المحكمة التجارية بالرياض، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "006", slug: "Arcon-Gulf-Contracting", enPage: true, name: "شركة أركن الخليج للمقاولات", en: "Arcon Gulf Contracting Co", track: "liq", court: "المحكمة التجارية بالدمام", caseNo: "471006110",
    openRef: "452004278", opened: "2026-04-16", ann: { on: "2026-04-20", ad: 8183 }, deadline: "2026-07-19", cr: "2051015186", uni: "7011220360",
    seo: { title: "تصفية شركة أركن الخليج للمقاولات", description: "بيانات إجراء تصفية شركة أركن الخليج للمقاولات أمام المحكمة التجارية بالدمام، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "005", slug: "Five-in-Five-Trading", name: "شركة خمسة في خمسة للتجارة", track: "liq", court: "المحكمة التجارية بالدمام — الدائرة الأولى", caseNo: "471004077",
    openRef: "452003467", opened: "2025-12-14", ann: { on: "2025-12-18", ad: 7776 }, deadline: "2026-03-18",
    list: { filed: "2026-04-14", approved: "2026-06-18" },
    seo: { title: "تصفية شركة خمسة في خمسة للتجارة", description: "بيانات إجراء تصفية شركة خمسة في خمسة للتجارة أمام المحكمة التجارية بالدمام، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "004", slug: "Al-Daghm-General-Contracting", name: "شركة الدغم للمقاولات العامة", track: "liq", court: "المحكمة التجارية بالرياض — الدائرة التاسعة", caseNo: "461002195",
    openRef: "452001757", opened: "2025-03-04", ann: { on: "2025-03-09", ad: 6952 }, deadline: "2025-06-07",
    list: { filed: "2025-12-14" },
    seo: { title: "تصفية شركة الدغم للمقاولات العامة", description: "بيانات إجراء تصفية شركة الدغم للمقاولات العامة أمام المحكمة التجارية بالرياض، ومراحله وإعلاناته، وطريق الدائنين إلى بوابة الدائن." } },
  { ref: "003", slug: "Hassan-Misfer-Al-Zahrani", enPage: true, name: "شركة حسن مسفر الزهراني وشركاه مساهمة مقفلة", en: "Hassan Misfer Al-Zahrani & Partners Company", track: "reorg", court: "المحكمة التجارية بالدمام — الدائرة الأولى", caseNo: "461001241",
    openRef: "452001507", opened: "2025-01-08", ann: { on: "2025-01-12", note: "أعلنه الأمين على موقع لجنة الإفلاس" }, deadline: "2025-04-12", cr: "2050001522", form: "شركة مساهمة مقفلة",
    list: { filed: "2025-06-14", approved: "2026-01-12" }, vote: "2026-08-16",
    lead: "مجموعة شركات تعمل في مجالات تجارية متنوعة.", activity: "مجالات تجارية متنوعة",
    notices: [VOTE_ZAHRANI],
    docs: [
      { on: "2026-07-26", kind: "notice", title: "إعلان التصويت على مقترح إعادة التنظيم المالي", issuer: "أمين إعادة التنظيم المالي", url: "/bankruptcy/Hassan-Misfer-Al-Zahrani/vote" },
      { on: "2026-08-11", kind: "link", title: "موعد تصويت الدائنين على مقترح إعادة التنظيم المالي", issuer: "لجنة الإفلاس", url: adUrl(9560) },
    ],
    seo: { title: "إعادة التنظيم المالي لشركة حسن مسفر الزهراني وشركاه", description: "بيانات إجراء إعادة التنظيم المالي لشركة حسن مسفر الزهراني وشركاه أمام المحكمة التجارية بالدمام، ومراحله وإعلاناته، وإعلان التصويت على المقترح." } },
  { ref: "001-ت", slug: "ASHYAD-STEEL", enPage: true, name: "شركة اشياد ستيل", en: "ASHYAD STEEL Company", track: "liq", court: "المحكمة التجارية بالرياض — الدائرة التاسعة", caseNo: "2372 لعام 1443هـ",
    openNote: "حكم الدائرة التجارية التاسعة في 1444/01/05هـ، وأُيّد استئنافاً في 1444/03/21هـ", opened: "2022-08-03",
    prior: { caseNo: "2372 لعام 1443هـ", opened: "2021-12-29" },
    logo: "/images/asyad-steel-logo.png",
    lead: "شركة متخصصة في تجارة الحديد التجاري والصناعي، بدأت في الرياض عام 1434هـ، وتعمل في استيراد منتجات الحديد وإعادة توزيعها في المملكة.",
    about: [
      "استهلت الشركة نشاطها بتاريخ 19/5/1434هـ فرعاً لمؤسسة باسم «مؤسسة أشياد الجزيرة للتجارة»، مركزها مدينة الرياض، لغاية التجارة في الحديد التجاري والصناعي من خلال الاستيراد وإعادة توزيع المنتجات في المملكة.",
      "حُوِّل الكيان من مؤسسة إلى شركة شخص واحد ذات مسؤولية محدودة بتاريخ 26/10/1438هـ. واستأجرت الشركة أرضاً في منطقة السلي مقراً لمكاتبها ومستودعاتها.",
      "ومع اتساع قاعدة عملائها بدأت منتصف عام 1435هـ استيراد الحديد من دول الخليج العربي، ثم اتجهت منذ 1441هـ إلى التخصص في أصناف محددة من الحديد التجاري والصناعي.",
    ],
    products: ["لفائف الحديد المغلفنة", "لفائف الحديد المسحوبة على البارد", "لفائف الحديد المسحوبة على الساخن", "الجسور المعدنية", "مسطحات الحديد", "الزوايا والمجاري الحديدية", "لفائف وصفائح الألمنيوم"],
    activity: "تجارة الحديد التجاري والصناعي", form: "شركة شخص واحد ذات مسؤولية محدودة", hq: "الرياض، منطقة السلي", founded: "19/5/1434هـ",
    seo: { title: "تصفية شركة أشياد ستيل", description: "بيانات إجراء تصفية شركة أشياد ستيل المتخصصة في تجارة الحديد بالرياض، ومراحله، وطريق الدائنين إلى بوابة الدائن." } },
];

export const findProceeding = (slug?: string) => PROCEEDINGS.find(p => p.slug === slug);
export const proceedingTitle = (p: Proceeding) => `${p.seo.title} | أمين الإفلاس`;
export const noticeSeo = (p: Proceeding, n: ProceedingNotice) => ({
  title: `${n.title} | ${shortName(p.name)}`,
  description: n.seoDescription,
});

/* ---------- dates ---------- */
const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
export const fmt = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
export const riyadhDay = (ms: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Riyadh" }).format(new Date(ms));
const dayNum = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y, m - 1, d) / 864e5; };
/** the last day of a period counts in full */
export const isOpen = (p: Proceeding, today: string) => !!p.deadline && today <= p.deadline;
export const daysLeft = (p: Proceeding, today: string) => (p.deadline ? dayNum(p.deadline) - dayNum(today) : 0);
export const leftText = (n: number) =>
  n === 0 ? "اليوم آخر يوم" : n === 1 ? "يبقى يوم واحد" : n === 2 ? "يبقى يومان" : n <= 10 ? `تبقى ${n} أيام` : `يبقى ${n} يوماً`;
export const shortName = (n: string) =>
  n.replace(/^شركة /, "").replace(/ (شركة شخص واحد|مساهمة مقفلة|المحدودة)$/, "");
export const courtCity = (c?: string): "riyadh" | "dammam" | null =>
  !c ? null : /بالرياض/.test(c) ? "riyadh" : /بالدمام/.test(c) ? "dammam" : null;

/* ---------- stages, built from what the platform has recorded ---------- */
export type StageState = "done" | "latest" | "next";
export interface Stage { t: string; when?: string; done?: boolean; current?: boolean; note?: string; state: StageState }

export function stagesOf(p: Proceeding, today: string): Stage[] {
  const open = isOpen(p, today), L = p.list;
  const S: Omit<Stage, "state">[] = [];
  S.push({ t: "حكم افتتاح الإجراء", when: p.opened, done: true, note: p.openNote });
  S.push({ t: "الإعلان عن الافتتاح", when: p.ann?.on, done: !!p.ann, note: p.ann && !p.ann.ad ? p.ann.note : undefined });
  S.push({ t: "تقديم المطالبات", when: p.deadline, done: !!p.deadline && !open, current: open });
  const listStage = (t: string) => ({ t, when: L && (L.approved || L.filed), done: !!(L && (p.track !== "reorg" || L.approved)) });
  if (p.track === "reorg") {
    S.push(listStage("اعتماد قائمة المطالبات"));
    S.push({ t: "تصويت الدائنين على المقترح", when: p.vote, done: !!p.vote && today >= p.vote });
    S.push({ t: "مصادقة المحكمة على المقترح" });
    S.push({ t: "تنفيذ الخطة" });
  } else {
    S.push(listStage("قائمة المطالبات"));
    S.push({ t: "بيع الأصول" });
    S.push({ t: "توزيع الحصيلة على الدائنين" });
    S.push({ t: "انتهاء الإجراء" });
  }
  let latest = S.findIndex(s => s.current);
  if (latest < 0) S.forEach((s, i) => { if (s.done) latest = i; });
  return S.map((s, i) => ({ ...s, state: i === latest ? "latest" : s.done ? "done" : "next" }));
}

/** a short sentence for where the proceeding stands */
export function headline(s: Stage | undefined, p: Proceeding): string {
  if (!s) return "الإجراء قائم";
  if (s.current) return `المرحلة الحالية: ${s.t}`;
  if (s.t === "حكم افتتاح الإجراء") return "صدر حكم افتتاح الإجراء";
  if (s.t === "الإعلان عن الافتتاح") return "أُعلن افتتاح الإجراء";
  if (s.t === "تقديم المطالبات") return "انتهت مدة تقديم المطالبات";
  if (/قائمة المطالبات/.test(s.t)) return p.list?.approved ? "اعتمدت المحكمة قائمة المطالبات" : "رُفعت قائمة المطالبات إلى المحكمة";
  if (/تصويت/.test(s.t)) return "عُقد تصويت الدائنين على المقترح";
  return s.t;
}

/** the label shown for each proceeding in the index */
export function statusOf(p: Proceeding, today: string): { open: boolean; text: string } {
  if (isOpen(p, today)) return { open: true, text: "باب المطالبات مفتوح" };
  const s = stagesOf(p, today).find(x => x.state === "latest");
  const map: Record<string, string> = {
    "تقديم المطالبات": "انتهت مدة المطالبات",
    "قائمة المطالبات": p.list?.approved ? "اعتُمدت قائمة المطالبات" : "رُفعت قائمة المطالبات",
    "اعتماد قائمة المطالبات": "اعتُمدت قائمة المطالبات",
    "تصويت الدائنين على المقترح": "عُقد تصويت الدائنين",
  };
  return { open: false, text: (s && map[s.t]) || "الإجراء قائم" };
}

/** the documents and announcements register: numbered in order of issue, newest first */
export function docsOf(p: Proceeding) {
  const D: ProceedingDoc[] = [];
  if (p.ann?.ad) D.push({ on: p.ann.on, kind: "link", title: `إعلان افتتاح ${TRACK[p.track].eyebrow}`, issuer: "لجنة الإفلاس", url: adUrl(p.ann.ad) });
  (p.docs || []).forEach(d => D.push(d));
  D.sort((a, b) => (a.on < b.on ? -1 : a.on > b.on ? 1 : 0));
  return D.map((d, i) => ({ ...d, no: i + 1 })).reverse();
}

/* ---------- notices ---------- */
export type NoticePhase = "before" | "during" | "after";
export const phaseOf = (n: ProceedingNotice, now: number): NoticePhase =>
  now < Date.parse(n.start) ? "before" : now <= Date.parse(n.end) ? "during" : "after";
export const activeNotice = (p: Proceeding, now: number) => (p.notices || []).find(n => phaseOf(n, now) !== "after");
export function untilText(iso: string, now: number) {
  let s = Math.max(0, Math.round((Date.parse(iso) - now) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60);
  const D = d === 1 ? "يوم" : d === 2 ? "يومين" : d <= 10 ? `${d} أيام` : `${d} يوماً`;
  const H = h === 1 ? "ساعة" : h === 2 ? "ساعتين" : h <= 10 ? `${h} ساعات` : `${h} ساعة`;
  return d ? `${D}${h ? ` و${H}` : ""}` : h ? `${H}${m ? ` و${m} دقيقة` : ""}` : `${m} دقيقة`;
}
