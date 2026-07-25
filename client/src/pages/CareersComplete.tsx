// ============================================================
// استكمال مستندات طلب التوظيف (/careers/complete?id=...)
// يفتحها المتقدّم عبر رابط يصله برسالة نصية من المكتب، فيرفع مستنداته
// على طلبه القائم دون إعادة التقديم. الواجهة الخلفية: Edge Function
// submit-application (action: status | complete).
// ============================================================
import { useEffect, useRef, useState } from "react";
import { useSearch } from "wouter";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
  X,
  ArrowLeft,
  Award,
  Scale,
} from "lucide-react";

const ENDPOINT =
  "https://zwaahunavepleczuamuy.supabase.co/functions/v1/submit-application";
// المفتاح العام (anon) — علني بطبيعته؛ مطلوب لبوابة Supabase
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YWFodW5hdmVwbGVjenVhbXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyOTY1ODUsImV4cCI6MjA4OTg3MjU4NX0.kXByPtJOV-TN7G2f8jcr0DwAX4ldtSu576Rpitwls7M";

const MAX_SIZE = 8 * 1024 * 1024; // 8 ميجابايت
const ALLOWED_EXT = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const UPLOAD_TIMEOUT_MS = 120 * 1000;

interface AppStatus {
  full_name: string;
  has_cv: boolean;
  has_qual: boolean;
  has_license: boolean;
}

// المستندات القابلة للرفع (المفاتيح مطابقة لِما تتوقّعه الدالة)
const DOCS = [
  {
    key: "cv",
    label: "السيرة الذاتية",
    hint: "PDF أو Word",
    icon: FileText,
    b64Key: "cv_base64",
    nameKey: "cv_name",
    hasKey: "has_cv" as const,
  },
  {
    key: "qual",
    label: "المؤهل الدراسي",
    hint: "صورة الشهادة (اختياري)",
    icon: Award,
    b64Key: "qual_base64",
    nameKey: "qual_name",
    hasKey: "has_qual" as const,
  },
  {
    key: "license",
    label: "رخصة المحاماة",
    hint: "إن وُجدت (اختياري)",
    icon: Scale,
    b64Key: "license_base64",
    nameKey: "license_name",
    hasKey: "has_license" as const,
  },
];

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("تعذّر قراءة الملف"));
    reader.readAsDataURL(file);
  });
}

export default function CareersComplete() {
  const search = useSearch();
  const id = new URLSearchParams(search).get("id");

  useSEO({
    title: "استكمال مستندات طلب التوظيف",
    description:
      "صفحة خاصة لاستكمال مستندات طلب التوظيف المقدَّم لدى شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس.",
    canonical: "/careers/complete",
  });

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<AppStatus | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // جلب حالة الطلب من الرابط
  useEffect(() => {
    if (!id || id.length < 20) {
      setLoadError("الرابط غير صالح. تأكّد من نسخه كاملاً من الرسالة.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ action: "status", id }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          setLoadError(data.error || "تعذّر فتح الطلب.");
        } else {
          setStatus({
            full_name: data.full_name ?? "",
            has_cv: !!data.has_cv,
            has_qual: !!data.has_qual,
            has_license: !!data.has_license,
          });
        }
      } catch {
        setLoadError("تعذّر الاتصال بالخادم. تأكّد من اتصالك بالإنترنت.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function pick(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) {
      setFiles((p) => ({ ...p, [key]: null }));
      return;
    }
    const lower = f.name.toLowerCase();
    if (!ALLOWED_EXT.some((ext) => lower.endsWith(ext))) {
      setError("صيغة الملف غير مدعومة. يُقبل PDF أو Word أو صورة.");
      if (inputRefs.current[key]) inputRefs.current[key]!.value = "";
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("حجم الملف كبير (الحد 8 ميجابايت). يرجى ضغطه وإعادة المحاولة.");
      if (inputRefs.current[key]) inputRefs.current[key]!.value = "";
      return;
    }
    setFiles((p) => ({ ...p, [key]: f }));
  }

  function remove(key: string) {
    setFiles((p) => ({ ...p, [key]: null }));
    if (inputRefs.current[key]) inputRefs.current[key]!.value = "";
  }

  const chosenCount = DOCS.filter((d) => files[d.key]).length;

  async function submit() {
    if (chosenCount === 0 || submitting || !id) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload: Record<string, string> = { action: "complete", id };
      for (const d of DOCS) {
        const f = files[d.key];
        if (!f) continue;
        payload[d.b64Key] = await readFileAsDataURL(f);
        payload[d.nameKey] = f.name;
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
      let res: Response;
      try {
        res = await fetch(ENDPOINT, {
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
        clearTimeout(timer);
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) {
        setError(data.error || "تعذّر رفع المستندات. حاول مرة أخرى.");
        return;
      }
      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error && e.name === "AbortError"
          ? "استغرق الرفع وقتاً طويلاً. تأكّد من الاتصال وحاول مجدداً."
          : "تعذّر رفع المستندات. حاول مرة أخرى."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="relative min-h-screen pt-28 md:pt-32 pb-16 bg-[var(--color-cream)]"
      dir="rtl"
    >
      <div className="container mx-auto px-5 md:px-4 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-sm p-6 md:p-8">
            {/* الحالات */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-gold)] mb-3" />
                <p className="font-body text-[var(--color-navy)]/70">
                  جارٍ فتح طلبك…
                </p>
              </div>
            ) : loadError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <AlertCircle className="w-7 h-7 text-red-500" />
                </div>
                <h1 className="font-heading text-xl font-bold text-[var(--color-navy)] mb-2">
                  تعذّر فتح الطلب
                </h1>
                <p className="font-body text-[var(--color-navy)]/70 leading-relaxed mb-6">
                  {loadError}
                </p>
                <Button asChild variant="outline">
                  <Link href="/careers">
                    تقديم طلب جديد
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
              </div>
            ) : done ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h1 className="font-heading text-xl font-bold text-[var(--color-navy)] mb-2">
                  تم استلام مستنداتك
                </h1>
                <p className="font-body text-[var(--color-navy)]/70 leading-relaxed mb-6">
                  شكراً لك. أُضيفت المستندات إلى طلبك، وسيتم النظر فيه والتواصل
                  معك عند الحاجة.
                </p>
                <Button asChild variant="outline">
                  <Link href="/">
                    العودة للرئيسية
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                {/* الترويسة */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 text-[var(--color-gold)] font-body text-sm mb-3">
                    <Upload className="w-4 h-4" />
                    استكمال المستندات
                  </span>
                  <h1 className="font-heading text-2xl font-bold text-[var(--color-navy)] mb-2">
                    {status?.full_name
                      ? `مرحباً ${status.full_name}`
                      : "استكمال مستندات طلبك"}
                  </h1>
                  <p className="font-body text-[var(--color-navy)]/70 leading-relaxed">
                    أرفق المستندات المطلوبة أدناه لاستكمال طلب التوظيف المقدَّم
                    منك — دون الحاجة لإعادة التقديم.
                  </p>
                </div>

                {/* المستندات */}
                <div className="space-y-3">
                  {DOCS.map((d) => {
                    const Icon = d.icon;
                    const chosen = files[d.key];
                    const already = status?.[d.hasKey];
                    return (
                      <div
                        key={d.key}
                        className={`rounded-lg border p-4 transition-colors ${
                          chosen
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                            : "border-[var(--color-border)] bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 rounded-lg bg-[var(--color-navy)] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-heading font-bold text-[var(--color-navy)] flex items-center gap-2">
                              {d.label}
                              {already && (
                                <span className="inline-flex items-center gap-1 text-xs font-body font-normal text-emerald-600">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  مُستلَم
                                </span>
                              )}
                            </p>
                            <p className="font-body text-sm text-[var(--color-navy)]/60 truncate">
                              {chosen ? chosen.name : d.hint}
                            </p>
                          </div>
                          {chosen ? (
                            <button
                              type="button"
                              onClick={() => remove(d.key)}
                              className="shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              aria-label="إزالة"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="shrink-0"
                              onClick={() => inputRefs.current[d.key]?.click()}
                            >
                              {already ? "استبدال" : "اختيار"}
                            </Button>
                          )}
                          <input
                            ref={(el) => (inputRefs.current[d.key] = el)}
                            type="file"
                            accept={ALLOWED_EXT.join(",")}
                            className="hidden"
                            onChange={(e) => pick(d.key, e)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {error && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                    <p className="font-body text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={submit}
                  disabled={chosenCount === 0 || submitting}
                  className="mt-6 w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white font-heading"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin ml-2" />
                      جارٍ الرفع…
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 ml-2" />
                      إرسال المستندات
                      {chosenCount > 0 ? ` (${chosenCount})` : ""}
                    </>
                  )}
                </Button>

                <p className="mt-3 text-center font-body text-xs text-[var(--color-navy)]/50">
                  الحد الأقصى لكل ملف 8 ميجابايت — PDF أو Word أو صورة.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
