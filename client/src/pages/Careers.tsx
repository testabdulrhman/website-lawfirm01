// ============================================================
// صفحة «انضم إلينا» (/careers) — شركة عبدالرحمن رضوان المشيقح للمحاماة
// الهوية: كحلي var(--color-navy) / ذهبي var(--color-gold) / خلفية كريمية var(--color-cream)
// الخط: IBM Plex Sans Arabic (font-body/font-heading/font-display)، RTL كامل، متجاوب جوال أولاً
// نموذج التقديم مرتبط بـ Edge Function: submit-application (نظام المكتب)
// ملاحظة: لا مفاتيح سرية في الصفحة — الـ endpoint عام
// ============================================================
import { useRef, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  Send,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Scale,
} from "lucide-react";

const SUBMIT_ENDPOINT =
  "https://zwaahunavepleczuamuy.supabase.co/functions/v1/submit-application";

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 ميجابايت
const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx"];

// قراءة الملف كـ Base64 (data URL)
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("تعذّر قراءة الملف"));
    reader.readAsDataURL(file);
  });
}

const BENEFITS = [
  {
    icon: Briefcase,
    title: "بيئة عمل احترافية",
    desc: "مكتب منظّم يلتزم بأعلى المعايير المهنية والأخلاقية في ممارسة المحاماة.",
  },
  {
    icon: TrendingUp,
    title: "تطوّر مهني مستمر",
    desc: "فرص حقيقية للنمو وصقل المهارات القانونية والترافع أمام مختلف الجهات.",
  },
  {
    icon: Users,
    title: "فريق متخصّص",
    desc: "العمل ضمن فريق من المحامين والمستشارين في القضايا التجارية والإفلاس.",
  },
  {
    icon: Scale,
    title: "قضايا نوعية",
    desc: "التعامل مع قضايا متنوّعة وملفّات نوعية تثري الخبرة وتوسّع الأفق المهني.",
  },
];

export default function Careers() {
  useSEO({
    title: "انضم إلينا",
    description:
      "انضم إلى فريق شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس في بريدة. تعرّف على بيئة العمل وقدّم طلب التوظيف وأرفق سيرتك الذاتية.",
    keywords: "وظائف محاماة, توظيف محامين, انضم إلينا, وظائف بريدة, وظائف القصيم",
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
      setError("صيغة الملف غير مدعومة. يُقبل PDF أو Word فقط.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvFile(null);
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setError("حجم السيرة الذاتية يتجاوز 5 ميجابايت.");
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

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError("يرجى إدخال الاسم الكامل.");
      return;
    }
    if (!cleanPhone) {
      setError("يرجى إدخال رقم الجوال.");
      return;
    }
    if (!/^05\d{8}$/.test(cleanPhone)) {
      setError("رقم الجوال غير صحيح. يجب أن يكون بصيغة 05xxxxxxxx.");
      return;
    }
    if (cvFile && cvFile.size > MAX_CV_SIZE) {
      setError("حجم السيرة الذاتية يتجاوز 5 ميجابايت.");
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

      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (data && data.success === true) {
        setSuccess(true);
        resetForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(
          (data && data.error) ||
            "تعذّر إرسال الطلب حالياً، يرجى المحاولة لاحقاً."
        );
      }
    } catch (err) {
      console.error(err);
      setError("فشل الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ===================== Hero ===================== */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)] overflow-hidden" dir="rtl">
        {/* لمسة ذهبية زخرفية */}
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--color-gold)]" />
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[var(--color-gold)]/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[var(--color-gold)] font-body text-sm tracking-wide mb-4">
              <Users className="w-4 h-4" />
              الفرص المهنية
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5">
              انضم إلى فريق شركة عبدالرحمن رضوان المشيقح للمحاماة
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 leading-relaxed">
              نبحث دائماً عن الكفاءات القانونية الطموحة التي تشاركنا الالتزام
              بالتميّز والمهنية. إن كنت ترى في نفسك الإضافة، شاركنا بياناتك وسيرتك
              الذاتية وسنتواصل معك عند توفّر فرصة مناسبة.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== لماذا الانضمام إلينا ===================== */}
      <section className="py-14 md:py-20 bg-[var(--color-cream)]" dir="rtl">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-3">
              لماذا الانضمام إلينا؟
            </h2>
            <div className="w-16 h-1 bg-[var(--color-gold)] mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-white border border-[var(--color-border)] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-navy)] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[var(--color-navy)] mb-2">
                    {b.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== نموذج التقديم ===================== */}
      <section className="pb-16 md:pb-24 bg-[var(--color-cream)]" dir="rtl">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {success ? (
              <Card className="bg-white border-green-200 shadow-sm">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--color-navy)] mb-3">
                    تم استلام طلبك بنجاح
                  </h2>
                  <p className="font-body text-[var(--color-navy)]/70 leading-relaxed mb-6">
                    شكراً لاهتمامك بالانضمام إلى فريقنا. سنراجع طلبك ونتواصل معك
                    قريباً عند توفّر فرصة مناسبة.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => setSuccess(false)}
                      className="bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white font-heading"
                    >
                      تقديم طلب آخر
                    </Button>
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5 font-heading w-full"
                      >
                        العودة للرئيسية
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-[var(--color-border)] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-3 flex items-center gap-2">
                    <Send className="w-5 h-5 text-[var(--color-gold)]" />
                    نموذج التقديم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* رسالة خطأ */}
                    {error && (
                      <div className="border border-red-200 bg-red-50 rounded-md p-3 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-red-800">{error}</p>
                      </div>
                    )}

                    {/* الاسم الكامل */}
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="font-heading text-[var(--color-navy)]">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="اكتب اسمك الكامل"
                        className="border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                        autoComplete="name"
                        required
                      />
                    </div>

                    {/* رقم الجوال */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-heading text-[var(--color-navy)]">
                        رقم الجوال <span className="text-red-500">*</span>
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
                        className="text-left border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    {/* البريد الإلكتروني */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-heading text-[var(--color-navy)]">
                        البريد الإلكتروني <span className="text-[var(--color-navy)]/40 text-sm font-body">(اختياري)</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        dir="ltr"
                        className="text-left border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                        autoComplete="email"
                      />
                    </div>

                    {/* المؤهل العلمي */}
                    <div className="space-y-2">
                      <Label htmlFor="qualifications" className="font-heading text-[var(--color-navy)]">
                        المؤهل العلمي <span className="text-[var(--color-navy)]/40 text-sm font-body">(اختياري)</span>
                      </Label>
                      <Input
                        id="qualifications"
                        name="qualifications"
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        placeholder="مثال: بكالوريوس قانون / أنظمة"
                        className="border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      />
                    </div>

                    {/* السيرة الذاتية */}
                    <div className="space-y-2">
                      <Label htmlFor="cv" className="font-heading text-[var(--color-navy)]">
                        السيرة الذاتية <span className="text-[var(--color-navy)]/40 text-sm font-body">(اختياري — PDF أو Word، بحد أقصى 5 ميجابايت)</span>
                      </Label>
                      <label
                        htmlFor="cv"
                        className="flex items-center gap-3 border border-dashed border-[var(--color-navy)]/25 rounded-md px-4 py-4 cursor-pointer hover:border-[var(--color-gold)] transition-colors bg-[var(--color-navy)]/[0.02]"
                      >
                        <span className="w-10 h-10 rounded-md bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
                          <Upload className="w-5 h-5 text-[var(--color-gold)]" />
                        </span>
                        <span className="font-body text-sm text-[var(--color-navy)]/70 truncate">
                          {cvFile ? cvFile.name : "اضغط لاختيار ملف السيرة الذاتية"}
                        </span>
                      </label>
                      <input
                        ref={fileInputRef}
                        id="cv"
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="hidden"
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

                    {/* زر الإرسال */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] py-6 text-base font-heading font-bold"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                          جارٍ الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 ml-2" />
                          إرسال الطلب
                        </>
                      )}
                    </Button>

                    <p className="font-body text-xs text-[var(--color-navy)]/50 text-center leading-relaxed">
                      بإرسالك الطلب فإنك توافق على معالجة بياناتك لغرض التوظيف فقط.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* رابط العودة */}
            <div className="text-center mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-body text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-gold)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                تعرّف أكثر على الشركة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
