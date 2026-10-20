// ============================================================
// صفحة «انضم إلينا» (/careers و /en/careers) — شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس
// النصوص كلها في COPY بالعربية والإنجليزية؛ اتجاه الصفحة يتبع اللغة.
// الألوان والأشكال من نظام تصميم الشركة (Design System) محصورةً في متغيرات --ds-* داخل الصفحة؛
// الخطوط خطوط الموقع نفسها. متجاوب جوال أولاً.
// الواجهة: خريطة المملكة المنقّطة (النقطة على مقر الشركة) وبجانبها العنوان؛ ثم المزايا بجانب النموذج.
// نموذج التقديم مرتبط بـ Edge Function: submit-application (نظام المكتب)
// ملاحظة: لا مفاتيح سرية في الصفحة — anon key علني بطبيعته (بوابة Supabase تتطلبه)
// ============================================================
import { useRef, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { localePath } from "@/lib/localePath";
import { useLanguage } from "@/contexts/LanguageContext";
import { FIRM_NAME_AR, FIRM_NAME_EN } from "@/lib/firmIdentity";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2, Upload, Send } from "lucide-react";

const SUBMIT_ENDPOINT =
  "https://zwaahunavepleczuamuy.supabase.co/functions/v1/submit-application";
// المفتاح العام (anon) — علني بطبيعته؛ مطلوب لبوابة Supabase منذ تفعيل التحقق على الدالة
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YWFodW5hdmVwbGVjenVhbXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyOTY1ODUsImV4cCI6MjA4OTg3MjU4NX0.kXByPtJOV-TN7G2f8jcr0DwAX4ldtSu576Rpitwls7M";

const MAX_CV_SIZE = 8 * 1024 * 1024; // 8 ميجابايت
const UPLOAD_TIMEOUT_MS = 90 * 1000; // 90 ثانية (رفع سيرة كبيرة على جوال بطيء + معالجة الخادم)
const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx"];

// قراءة الملف كـ Base64 (data URL)
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("file-read-failed"));
    reader.readAsDataURL(file);
  });
}

const COPY = {
  ar: {
    seoTitle: "انضم إلينا | شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    seoDescription:
      "بوابة الانضمام إلى شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. قدّم بياناتك المهنية وسيرتك الذاتية للنظر فيها عند توفر فرصة مناسبة.",
    seoKeywords: "وظائف محاماة, توظيف محامين, انضم إلينا, وظائف بريدة, وظائف القصيم",
    eyebrow: "الفرص المهنية",
    headline: "مُستقبلك القانوني يبدأ من هُنا",
    joinTeam: `انضم إلى فريق ${FIRM_NAME_AR}`,
    intro:
      "نبحث دائماً عن الكفاءات القانونية الطموحة التي تشاركنا الالتزام بالتميّز والمهنية. إن كنت ترى في نفسك الإضافة، شاركنا بياناتك وسيرتك الذاتية وسنتواصل معك عند توفّر فرصة مناسبة.",
    whyTitle: "لماذا الانضمام إلينا؟",
    benefits: [
      { title: "بيئة عمل احترافية", desc: "مكتب منظّم يلتزم بأعلى المعايير المهنية والأخلاقية في ممارسة المحاماة." },
      { title: "تطوّر مهني مستمر", desc: "فرص حقيقية للنمو وصقل المهارات القانونية والترافع أمام مختلف الجهات." },
      { title: "فريق متخصّص", desc: "العمل ضمن فريق من المحامين والمستشارين في القضايا التجارية والإفلاس." },
      { title: "قضايا نوعية", desc: "التعامل مع قضايا متنوّعة وملفّات نوعية تثري الخبرة وتوسّع الأفق المهني." },
    ],
    learnMore: "تعرّف أكثر على الشركة",
    formTitle: "نموذج التقديم",
    requiredNoteBefore: "الحقول المعلَّمة بـ",
    requiredNoteAfter: "مطلوبة.",
    optional: "(اختياري)",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اكتب اسمك الكامل",
    phone: "رقم الجوال",
    email: "البريد الإلكتروني",
    qualifications: "المؤهل العلمي",
    qualificationsPlaceholder: "مثال: بكالوريوس قانون / أنظمة",
    cv: "السيرة الذاتية",
    cvChoose: "اضغط لاختيار ملف السيرة الذاتية",
    cvHint: "PDF أو Word، بحد أقصى 8 ميجابايت",
    cvChooseAnother: "اضغط لاختيار ملف آخر",
    submit: "إرسال الطلب",
    submitting: "جارٍ إرسال طلبك... قد يستغرق دقيقة",
    consent: "بإرسالك الطلب فإنك توافق على معالجة بياناتك لغرض التوظيف فقط.",
    successTitle: "تم استلام طلبك بنجاح",
    successText: "شكراً لاهتمامك بالانضمام إلى فريقنا. سنراجع طلبك ونتواصل معك قريباً عند توفّر فرصة مناسبة.",
    partialTitle: "تم استلام طلبك",
    partialText: "تم استلام طلبك بنجاح، لكن تعذّر إرفاق السيرة الذاتية. سنتواصل معك لاستلامها.",
    anotherApplication: "تقديم طلب آخر",
    backHome: "العودة للرئيسية",
    errors: {
      fileType: "صيغة الملف غير مدعومة. يُقبل PDF أو Word فقط.",
      fileSize: "حجم السيرة الذاتية كبير (الحد الأقصى 8 ميجابايت). يرجى ضغط الملف وإعادة المحاولة.",
      nameRequired: "يرجى إدخال الاسم الكامل.",
      phoneRequired: "يرجى إدخال رقم الجوال.",
      phoneInvalid: "رقم الجوال غير صحيح. يجب أن يكون بصيغة 05xxxxxxxx.",
      submitFailed: "تعذّر إرسال الطلب حالياً، يرجى المحاولة لاحقاً.",
      timeout:
        "استغرق الإرسال وقتاً طويلاً. قد يكون الاتصال بطيئاً أو ملف السيرة كبيراً — جرّب ضغط الملف أو إعادة المحاولة على اتصال أفضل.",
      network: "فشل الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.",
    },
  },
  en: {
    seoTitle: "Careers | Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management",
    seoDescription:
      "Join Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management. Submit your professional details and CV to be considered when a suitable opportunity arises.",
    seoKeywords: "law firm careers Saudi Arabia, lawyer jobs, trainee lawyer, legal careers, join our team",
    eyebrow: "Careers",
    headline: "Your legal future starts here",
    joinTeam: `Join the team at ${FIRM_NAME_EN}`,
    intro:
      "We are always looking for ambitious legal talent who share our commitment to excellence and professionalism. If you believe you can add value, share your details and CV and we will contact you when a suitable opportunity arises.",
    whyTitle: "Why join us?",
    benefits: [
      { title: "A professional environment", desc: "An organized firm that holds itself to the highest professional and ethical standards of legal practice." },
      { title: "Continuous growth", desc: "Real opportunities to grow, sharpen your legal skills and appear before a wide range of courts and authorities." },
      { title: "A specialized team", desc: "Work alongside lawyers and advisers who focus on commercial and bankruptcy matters." },
      { title: "Substantive cases", desc: "A varied caseload of significant matters that deepens your experience and broadens your perspective." },
    ],
    learnMore: "Learn more about the firm",
    formTitle: "Application form",
    requiredNoteBefore: "Fields marked",
    requiredNoteAfter: "are required.",
    optional: "(optional)",
    fullName: "Full name",
    fullNamePlaceholder: "Enter your full name",
    phone: "Mobile number",
    email: "Email",
    qualifications: "Qualification",
    qualificationsPlaceholder: "e.g. Bachelor of Law",
    cv: "CV",
    cvChoose: "Click to choose your CV file",
    cvHint: "PDF or Word, up to 8 MB",
    cvChooseAnother: "Click to choose another file",
    submit: "Submit application",
    submitting: "Sending your application… this may take a minute",
    consent: "By submitting, you agree to the processing of your data for recruitment purposes only.",
    successTitle: "Application received",
    successText: "Thank you for your interest in joining our team. We will review your application and contact you when a suitable opportunity arises.",
    partialTitle: "Application received",
    partialText: "Your application was received, but your CV could not be attached. We will contact you to collect it.",
    anotherApplication: "Submit another application",
    backHome: "Back to home",
    errors: {
      fileType: "Unsupported file type. Only PDF or Word files are accepted.",
      fileSize: "Your CV is too large (maximum 8 MB). Please compress the file and try again.",
      nameRequired: "Please enter your full name.",
      phoneRequired: "Please enter your mobile number.",
      phoneInvalid: "Invalid mobile number. It must be a Saudi mobile number in the format 05xxxxxxxx.",
      submitFailed: "Your application could not be sent right now. Please try again later.",
      timeout:
        "Sending took too long. Your connection may be slow or your CV file large — try compressing the file or retrying on a better connection.",
      network: "Connection failed. Check your internet connection and try again.",
    },
  },
} as const;

export default function Careers() {
  const { lang } = useLanguage();
  const isEnglish = lang === "en";
  const c = isEnglish ? COPY.en : COPY.ar;
  const dir = isEnglish ? "ltr" : "rtl";
  const lp = (p: string) => localePath(p, lang);
  useSEO({
    title: c.seoTitle,
    description: c.seoDescription,
    keywords: c.seoKeywords,
    canonical: "/careers",
  });

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [cvWarning, setCvWarning] = useState(false); // الطلب حُفظ لكن تعذّر إرفاق السيرة

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setCvFile(null);
      return;
    }
    const lower = file.name.toLowerCase();
    const okExt = ALLOWED_CV_EXT.some((ext) => lower.endsWith(ext));
    if (!okExt) {
      setError(c.errors.fileType);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvFile(null);
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setError(c.errors.fileSize);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvFile(null);
      return;
    }
    setCvFile(file);
  }

  function resetForm() {
    setFullName("");
    setPhone("");
    setEmail("");
    setQualifications("");
    setWebsite("");
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCvWarning(false);

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError(c.errors.nameRequired);
      return;
    }
    if (!cleanPhone) {
      setError(c.errors.phoneRequired);
      return;
    }
    if (!/^05\d{8}$/.test(cleanPhone)) {
      setError(c.errors.phoneInvalid);
      return;
    }
    if (cvFile && cvFile.size > MAX_CV_SIZE) {
      setError(c.errors.fileSize);
      return;
    }

    setLoading(true);

    try {
      const payload: Record<string, string> = {
        full_name: cleanName,
        phone: cleanPhone,
        email: email.trim(),
        qualifications: qualifications.trim(),
        website: website, // honeypot — يبقى فارغاً للمستخدم الحقيقي
      };

      if (cvFile) {
        const dataUrl = await readFileAsDataURL(cvFile);
        payload.cv_base64 = dataUrl;
        payload.cv_name = cvFile.name;
      }

      // مهلة قصوى للطلب عبر AbortController (تكفي لرفع 8MB على جوال بطيء)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

      let res: Response;
      try {
        res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      const data = await res.json().catch(() => ({}));

      if (data && data.success === true) {
        // نجاح-جزئي: الطلب حُفظ لكن تعذّر إرفاق السيرة
        setCvWarning(data.cv_warning === true);
        setSuccess(true);
        resetForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // رسائل الخادم بالعربية؛ في الصفحة الإنجليزية تظهر رسالة عامة بالإنجليزية
        setError((!isEnglish && data && data.error) || c.errors.submitFailed);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof DOMException && err.name === "AbortError") {
setError(c.errors.timeout);
      } else {
        setError(c.errors.network);
      }
    } finally {
      setLoading(false);
    }
  }

  // ألوان نظام تصميم الشركة (Al-Mushaiqeh Law Design System) — محصورة في هذه الصفحة
  const ds = {
    "--ds-ink": "#131C30",
    "--ds-ink-900": "#0B1220",
    "--ds-body": "#2A3342",
    "--ds-muted": "#6B7589",
    "--ds-gold": "#C9A982",
    "--ds-gold-text": "#8C6E47",
    "--ds-gold-soft": "#F4E9DD",
    "--ds-cream": "#FAF6EE",
    "--ds-sand": "#F7EFE8",
    "--ds-line": "#E7DACD",
    "--ds-line-strong": "#D8C6B4",
  } as React.CSSProperties;

  const fieldClass =
    "h-12 rounded-lg border-[1.5px] border-[var(--ds-line-strong)] bg-white text-base text-[var(--ds-ink)] shadow-none placeholder:text-[var(--ds-muted)]/70 focus-visible:border-[var(--ds-gold)] focus-visible:ring-[3px] focus-visible:ring-[var(--ds-gold)]/35";
  const labelClass = "font-heading text-sm font-semibold text-[var(--ds-ink)]";
  const required = <span className="text-[var(--ds-gold-text)]">*</span>;
  const optional = <span className="font-body text-xs font-normal text-[var(--ds-muted)]">{c.optional}</span>;
  const diamond = "inline-block h-2 w-2 shrink-0 rotate-45 bg-[var(--ds-gold)]";

  return (
    <div style={ds} dir={dir} lang={isEnglish ? "en" : "ar"} className="bg-[var(--ds-cream)] text-[var(--ds-body)]">
      {/* ===================== Hero ===================== */}
      <section className="relative isolate overflow-hidden border-b border-[var(--ds-line)] pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          {/* الخريطة المنقّطة — النقطة المميزة على مقر الشركة. على الجوال فوق النص،
              وعلى الشاشات العريضة في الجهة المقابلة للعنوان */}
          <img
            src="/images/careers-map-1100.webp"
            srcSet="/images/careers-map-640.webp 640w, /images/careers-map-1100.webp 1100w"
            sizes="(max-width: 1023px) 80vw, 46vw"
            alt=""
            width={1100}
            height={881}
            loading="eager"
            decoding="async"
            className="pointer-events-none mx-auto -mt-4 mb-6 block w-[82%] max-w-[380px] lg:absolute lg:end-[3%] lg:top-1/2 lg:m-0 lg:w-[44vw] lg:max-w-[660px] lg:-translate-y-1/2"
          />
          <div className="max-w-xl lg:max-w-[46%]">
            <p className="flex items-center gap-3 font-body text-sm font-semibold text-[var(--ds-gold-text)]">
              <span aria-hidden="true" className={diamond} />
              {c.eyebrow}
            </p>
            <h1 className="mt-6 font-heading text-[2.4rem] font-bold leading-[1.3] text-[var(--ds-ink)] md:text-6xl md:leading-[1.25]">
              {c.headline}
            </h1>
            <div aria-hidden="true" className="mt-7 flex max-w-xs items-center gap-3">
              <span className="h-px flex-1 bg-[var(--ds-gold)]/70" />
              <span className={diamond} />
              <span className="h-px flex-1 bg-[var(--ds-gold)]/70" />
            </div>
            <p className="mt-7 font-heading text-lg font-semibold leading-relaxed text-[var(--ds-ink)] md:text-xl">
              {c.joinTeam}
            </p>
            <p className="mt-4 font-body text-base leading-[1.85] text-[var(--ds-muted)] md:text-lg">
              {c.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ===================== المزايا + نموذج التقديم ===================== */}
      <section className="bg-[var(--ds-sand)] py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-5 md:px-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8">
          {/* لماذا الانضمام إلينا */}
          <div className="lg:pt-2">
            <h2 className="font-heading text-2xl font-bold text-[var(--ds-ink)] md:text-3xl">{c.whyTitle}</h2>
            <ul className="mt-8 border-t border-[var(--ds-line-strong)]">
              {c.benefits.map((b) => (
                <li key={b.title} className="flex gap-4 border-b border-[var(--ds-line-strong)] py-6">
                  <span aria-hidden="true" className={`${diamond} mt-2.5`} />
                  <div>
                    <h3 className="font-heading text-base font-bold text-[var(--ds-ink)] md:text-lg">{b.title}</h3>
                    <p className="mt-1.5 font-body text-sm leading-[1.85] text-[var(--ds-muted)]">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href={lp("/about")}
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-[var(--ds-gold-text)] transition-colors hover:text-[var(--ds-ink)]"
            >
              {c.learnMore}
              {isEnglish ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            </Link>
          </div>

          {/* نموذج التقديم */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-[var(--ds-line)] bg-white p-6 shadow-[0_6px_18px_-6px_rgba(24,20,12,0.14),0_2px_6px_-2px_rgba(24,20,12,0.08)] md:p-10">
              {success ? (
                <div className="py-8 text-center" role="status">
                  <div
                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${cvWarning ? "bg-[#F6EDDB]" : "bg-[#E7F0EA]"}`}
                  >
                    {cvWarning ? (
                      <AlertCircle className="h-7 w-7 text-[#9C7320]" />
                    ) : (
                      <CheckCircle2 className="h-7 w-7 text-[#2F6E4F]" />
                    )}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--ds-ink)]">
                    {cvWarning ? c.partialTitle : c.successTitle}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md font-body leading-[1.85] text-[var(--ds-muted)]">
                    {cvWarning ? c.partialText : c.successText}
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                      onClick={() => setSuccess(false)}
                      className="h-12 rounded-lg bg-[var(--ds-ink)] px-6 font-heading text-white hover:bg-[var(--ds-ink-900)]"
                    >
                      {c.anotherApplication}
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-lg border-[1.5px] border-[var(--ds-line-strong)] px-6 font-heading text-[var(--ds-ink)] hover:bg-[var(--ds-sand)]"
                    >
                      <Link href={lp("/")}>{c.backHome}</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-[var(--ds-ink)]">{c.formTitle}</h2>
                  <p className="mt-2 font-body text-sm text-[var(--ds-muted)]">{c.requiredNoteBefore} {required} {c.requiredNoteAfter}</p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && (
                      <div role="alert" className="flex items-start gap-2 rounded-lg border border-[#9B3B36]/25 bg-[#F4E2E0] p-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9B3B36]" />
                        <p className="font-body text-sm text-[#7d2f2b]">{error}</p>
                      </div>
                    )}

                    {/* الاسم الكامل */}
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className={labelClass}>
                        {c.fullName} {required}
                      </Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={c.fullNamePlaceholder}
                        className={fieldClass}
                        autoComplete="name"
                        required
                      />
                    </div>

                    {/* الجوال + البريد */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className={labelClass}>
                          {c.phone} {required}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="05xxxxxxxx"
                          dir="ltr"
                          className={`${fieldClass} text-left`}
                          autoComplete="tel"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className={labelClass}>
                          {c.email} {optional}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          dir="ltr"
                          className={`${fieldClass} text-left`}
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    {/* المؤهل العلمي */}
                    <div className="space-y-2">
                      <Label htmlFor="qualifications" className={labelClass}>
                        {c.qualifications} {optional}
                      </Label>
                      <Input
                        id="qualifications"
                        name="qualifications"
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        placeholder={c.qualificationsPlaceholder}
                        className={fieldClass}
                      />
                    </div>

                    {/* السيرة الذاتية */}
                    <div className="space-y-2">
                      <Label htmlFor="cv" className={labelClass}>
                        {c.cv} {optional}
                      </Label>
                      <label
                        htmlFor="cv"
                        className={`flex min-h-24 cursor-pointer items-center gap-4 rounded-lg border-[1.5px] border-dashed px-5 py-5 transition-colors focus-within:border-[var(--ds-gold)] hover:border-[var(--ds-gold)] ${
                          cvFile
                            ? "border-[var(--ds-gold)] bg-[var(--ds-gold-soft)]"
                            : "border-[var(--ds-line-strong)] bg-[var(--ds-cream)]"
                        }`}
                      >
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--ds-ink)]">
                          {cvFile ? (
                            <CheckCircle2 className="h-5 w-5 text-[var(--ds-gold)]" />
                          ) : (
                            <Upload className="h-5 w-5 text-[var(--ds-gold)]" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-heading text-sm font-semibold text-[var(--ds-ink)]">
                            {cvFile ? cvFile.name : c.cvChoose}
                          </span>
                          <span className="mt-0.5 block font-body text-xs text-[var(--ds-muted)]">
                            {cvFile ? c.cvChooseAnother : c.cvHint}
                          </span>
                        </span>
                      </label>
                      <input
                        ref={fileInputRef}
                        id="cv"
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </div>

                    {/* honeypot — مخفي عن المستخدم بصرياً */}
                    <div aria-hidden="true" className="hidden">
                      <label htmlFor="website">لا تملأ هذا الحقل</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="h-14 w-full rounded-lg bg-[var(--ds-ink)] font-heading text-base font-bold text-white transition-transform hover:bg-[var(--ds-ink-900)] active:translate-y-px"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="me-2 h-5 w-5 animate-spin" />
                            {c.submitting}
                          </>
                        ) : (
                          <>
                            {c.submit}
                            <Send className="ms-2 h-4 w-4 text-[var(--ds-gold)]" />
                          </>
                        )}
                      </Button>
                      <p className="mt-4 text-center font-body text-xs leading-relaxed text-[var(--ds-muted)]">
                        {c.consent}
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
