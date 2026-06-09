import { useEffect, useState } from "react";
import { useSearch, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

// ============================================================
// إعدادات Supabase
// ============================================================
const SUPABASE_URL = "https://erkkzrnownrpglbyiybe.supabase.co";
const SUPABASE_ANON = "sb_publishable_GhjIoRMpzrJb0OsoOAHPUg_pw_-kaRe";

// ============================================================
// أنواع البيانات (TypeScript)
// ============================================================
interface CompletionRequest {
  token: string;
  requested_fields: string[];
  custom_message: string | null;
  requested_at: string;
  expires_at: string;
  status: string;
}

interface ClaimData {
  claim_ref: string;
  creditor_name: string;
  claim_type: string;
  claim_amount: number;
  status: string;
  debtor_name: string;
  case_number: string;
  existing_data: Record<string, any>;
}

interface UploadedFile {
  path: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

// ============================================================
// تسميات الحقول والأنواع
// ============================================================
const FIELD_LABELS: Record<string, string> = {
  id_type: "نوع الهوية",
  id_number: "رقم الهوية / السجل التجاري",
  phone: "رقم الجوال",
  email: "البريد الإلكتروني",
  city: "المدينة",
  address: "العنوان الكامل",
  creditor_type: "نوع الدائن",
  representative_name: "اسم الممثل",
  debt_origin_date: "تاريخ نشأة الدين",
  due_date: "تاريخ الاستحقاق",
  due_document: "سند المطالبة",
  claim_reason: "سبب المطالبة",
  is_secured: "هل المطالبة مضمونة؟",
  security_type: "نوع الضمان",
  security_value: "قيمة الضمان",
  building_number: "رقم المبنى",
  street_name: "اسم الشارع",
  district: "الحي",
  postal_code: "الرمز البريدي",
  additional_number: "الرقم الإضافي",
  phone_alt: "رقم جوال إضافي",
  email_alt: "بريد إلكتروني إضافي",
  notes: "ملاحظات",
};

const FIELD_TYPES: Record<
  string,
  { type: string; options?: string[]; dir?: string }
> = {
  id_type: {
    type: "select",
    options: ["هوية وطنية", "سجل تجاري", "إقامة", "700", "جواز سفر"],
  },
  creditor_type: {
    type: "select",
    options: ["فرد", "شركة", "مؤسسة", "جهة حكومية", "بنك"],
  },
  is_secured: { type: "select", options: ["نعم", "لا"] },
  email: { type: "email" },
  email_alt: { type: "email" },
  phone: { type: "tel", dir: "ltr" },
  phone_alt: { type: "tel", dir: "ltr" },
  id_number: { type: "text", dir: "ltr" },
  security_value: { type: "number" },
  claim_reason: { type: "textarea" },
  address: { type: "textarea" },
  notes: { type: "textarea" },
};

// ============================================================
// المكون الرئيسي
// ============================================================
export default function BankruptcyComplete() {
  const search = useSearch();
  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<CompletionRequest | null>(
    null
  );
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // قراءة التوكن من URL
  const token = new URLSearchParams(search).get("token");

  // ============================================================
  // تحميل البيانات
  // ============================================================
  useEffect(() => {
    if (!token || token.length < 20) {
      setError("الرابط غير صالح. يرجى التأكد من صحة الرابط المرسل إليك.");
      setLoading(false);
      return;
    }

    const loadRequest = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/get-completion-request?token=${encodeURIComponent(token)}`,
          {
            headers: {
              apikey: SUPABASE_ANON,
              Authorization: `Bearer ${SUPABASE_ANON}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.message || data.error || "حدث خطأ");
          setLoading(false);
          return;
        }

        setRequestData(data.request);
        setClaimData(data.claim);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("فشل الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
        setLoading(false);
      }
    };

    loadRequest();
  }, [token]);

  // ============================================================
  // معالجة تغيير الحقول
  // ============================================================
  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ============================================================
  // رفع الملفات
  // ============================================================
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!requestData) return;

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`الملف "${file.name}" يتجاوز 10 ميجا`);
        continue;
      }

      const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      if (!allowed.includes(file.type)) {
        alert(`نوع الملف "${file.name}" غير مسموح (PDF/JPG/PNG فقط)`);
        continue;
      }

      // إضافة placeholder بحالة "جاري الرفع"
      const tempFile: UploadedFile = {
        path: `temp-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
      };
      setUploadedFiles((prev) => [...prev, tempFile]);

      try {
        const formDataUpload = new FormData();
        formDataUpload.append("token", requestData.token);
        formDataUpload.append("file", file);

        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/upload-completion-file`,
          {
            method: "POST",
            headers: {
              apikey: SUPABASE_ANON,
              Authorization: `Bearer ${SUPABASE_ANON}`,
            },
            body: formDataUpload,
          }
        );

        const data = await res.json();

        if (!res.ok || data.error) {
          // إزالة الملف الفاشل
          setUploadedFiles((prev) =>
            prev.filter((f) => f.path !== tempFile.path)
          );
          alert(`فشل رفع "${file.name}": ${data.error || "خطأ"}`);
          continue;
        }

        // استبدال الـ placeholder بالملف الحقيقي
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.path === tempFile.path
              ? {
                  path: data.path,
                  name: data.name,
                  size: data.size,
                  type: data.type,
                  url: data.url,
                }
              : f
          )
        );
      } catch (err) {
        console.error(err);
        setUploadedFiles((prev) =>
          prev.filter((f) => f.path !== tempFile.path)
        );
        alert(`فشل رفع "${file.name}"`);
      }
    }

    e.target.value = "";
  };

  const removeFile = (path: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.path !== path));
  };

  // ============================================================
  // الإرسال النهائي
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestData || !claimData) return;

    setSubmitting(true);

    try {
      // تحضير البيانات
      const completion_data: Record<string, any> = {};
      const fields = requestData.requested_fields || [];

      for (const field of fields) {
        let value = formData[field];
        if (value === undefined || value === null || value === "") {
          alert(`الحقل "${FIELD_LABELS[field] || field}" مطلوب`);
          setSubmitting(false);
          return;
        }

        // تحويلات خاصة
        if (field === "is_secured") {
          value = value === "نعم";
        } else if (field === "security_value") {
          value = parseFloat(value);
        }

        completion_data[field] = value;
      }

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/submit-completion`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON,
            Authorization: `Bearer ${SUPABASE_ANON}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: requestData.token,
            completion_data,
            uploaded_files: uploadedFiles.filter((f) => !f.path.startsWith("temp-")),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        alert("فشل الإرسال: " + (data.message || data.error || "خطأ غير معروف"));
        setSubmitting(false);
        return;
      }

      setSuccessMessage(
        data.message || "سيتم مراجعة البيانات من قبل أمين الإجراء."
      );
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("فشل الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
      setSubmitting(false);
    }
  };

  // ============================================================
  // أيقونة الملف وحجمه
  // ============================================================
  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "0";
    if (bytes < 1024) return bytes + " بايت";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " كيلو";
    return (bytes / (1024 * 1024)).toFixed(1) + " ميجا";
  };

  // ============================================================
  // عرض حقل واحد
  // ============================================================
  const renderField = (fieldName: string) => {
    const label = FIELD_LABELS[fieldName] || fieldName;
    const fieldType = FIELD_TYPES[fieldName] || { type: "text" };
    const existing = claimData?.existing_data[fieldName];
    const value = formData[fieldName] ?? "";

    let existingNote: React.ReactNode = null;
    if (existing !== null && existing !== undefined && existing !== "") {
      let displayValue = existing;
      if (fieldName === "is_secured") displayValue = existing ? "نعم" : "لا";
      existingNote = (
        <div className="text-xs text-[var(--color-navy)]/60 mt-1.5 px-3 py-1.5 bg-[var(--color-gold)]/5 border-r-2 border-[var(--color-gold)]">
          القيمة الحالية: {String(displayValue)}
        </div>
      );
    }

    let inputEl: React.ReactNode;
    const dir = fieldType.dir === "ltr" ? "ltr" : undefined;

    if (fieldType.type === "select") {
      inputEl = (
        <Select
          value={value}
          onValueChange={(v) => updateField(fieldName, v)}
          required
        >
          <SelectTrigger className="border-[var(--color-border)] focus:ring-[var(--color-gold)]">
            <SelectValue placeholder="-- اختر --" />
          </SelectTrigger>
          <SelectContent>
            {(fieldType.options || []).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    } else if (fieldType.type === "textarea") {
      inputEl = (
        <Textarea
          value={value}
          onChange={(e) => updateField(fieldName, e.target.value)}
          rows={3}
          required
          className="border-[var(--color-border)] focus:ring-[var(--color-gold)]"
        />
      );
    } else {
      inputEl = (
        <Input
          type={fieldType.type}
          value={value}
          onChange={(e) => updateField(fieldName, e.target.value)}
          dir={dir}
          required
          className="border-[var(--color-border)] focus:ring-[var(--color-gold)]"
        />
      );
    }

    return (
      <div key={fieldName} className="space-y-2">
        <Label className="font-heading text-sm font-medium text-[var(--color-navy)]">
          {label} <span className="text-red-500">*</span>
        </Label>
        {inputEl}
        {existingNote}
      </div>
    );
  };

  // ============================================================
  // العرض
  // ============================================================

  // حالة التحميل
  if (loading) {
    return (
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-gold)] mx-auto mb-4" />
            <p className="font-body text-[var(--color-navy)]/60">جاري التحميل...</p>
          </div>
        </div>
      </section>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-red-200 bg-white shadow-sm">
              <CardContent className="pt-8 pb-8 text-center">
                <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-5" />
                <h2 className="font-display text-xl md:text-2xl font-bold text-red-900 mb-3">
                  تعذّر فتح الرابط
                </h2>
                <p className="font-body text-red-700 mb-6">{error}</p>
                <Button
                  onClick={() => setLocation("/")}
                  className="bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white font-heading"
                >
                  العودة للرئيسية
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // حالة النجاح
  if (submitted) {
    return (
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-white shadow-sm">
              <CardContent className="pt-8 pb-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-5" />
                <h2 className="font-display text-2xl font-bold text-green-900 mb-3">
                  تم استلام بياناتك بنجاح
                </h2>
                <p className="font-body text-green-700 mb-6">{successMessage}</p>
                <Button
                  onClick={() => setLocation("/")}
                  className="bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white font-heading"
                >
                  العودة للرئيسية
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // العرض الرئيسي
  if (!claimData || !requestData) return null;

  const expiresDate = new Date(requestData.expires_at);
  const now = new Date();
  const daysLeft = Math.ceil(
    (expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const fields = requestData.requested_fields || [];

  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
      <div className="container mx-auto px-5 md:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-[var(--color-navy)] p-6 md:p-8 text-center">
            <h1 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
              إكمال بيانات المطالبة
            </h1>
            <p className="font-body text-sm text-white/70">
              شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس
            </p>
          </div>

          {/* رسالة الأمين */}
          {requestData.custom_message && (
            <div className="bg-[var(--color-gold)]/5 border-r-4 border-[var(--color-gold)] p-4 font-body text-sm text-[var(--color-navy)] whitespace-pre-line">
              <span className="font-heading font-semibold">رسالة من أمين الإجراء:</span>
              <br />
              {requestData.custom_message}
            </div>
          )}

          {/* معلومات المطالبة */}
          <Card className="bg-white border-[var(--color-border)] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-base text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-2">
                بيانات مطالبتك الحالية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm font-body">
              <div className="flex justify-between items-center py-1">
                <span className="text-[var(--color-navy)]/50">رقم المرجع</span>
                <span className="font-semibold text-[var(--color-navy)]">{claimData.claim_ref || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-[var(--color-border)] pt-2">
                <span className="text-[var(--color-navy)]/50">اسم الدائن</span>
                <span className="font-semibold text-[var(--color-navy)]">{claimData.creditor_name || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-[var(--color-border)] pt-2">
                <span className="text-[var(--color-navy)]/50">المدين</span>
                <span className="font-semibold text-[var(--color-navy)]">{claimData.debtor_name || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-[var(--color-border)] pt-2">
                <span className="text-[var(--color-navy)]/50">نوع المطالبة</span>
                <span className="font-semibold text-[var(--color-navy)]">{claimData.claim_type || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-[var(--color-border)] pt-2">
                <span className="text-[var(--color-navy)]/50">المبلغ</span>
                <span className="font-semibold text-[var(--color-gold)]">
                  {claimData.claim_amount
                    ? parseFloat(String(claimData.claim_amount)).toLocaleString("en-US") + " ر.س"
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-[var(--color-border)] pt-2">
                <span className="text-[var(--color-navy)]/50">الحالة</span>
                <Badge className="bg-[var(--color-gold)]/10 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20">
                  {claimData.status || "قيد المراجعة"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-red-600 font-medium pt-3 border-t border-[var(--color-border)] mt-3">
                <Clock className="w-4 h-4" />
                <span className="font-heading text-xs">
                  ينتهي الرابط بعد {daysLeft} يوم ({expiresDate.toLocaleDateString("ar-SA")})
                </span>
              </div>
            </CardContent>
          </Card>

          {/* النموذج */}
          <form onSubmit={handleSubmit}>
            <Card className="bg-white border-[var(--color-border)] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-base text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-2">
                  الحقول المطلوب إكمالها
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {fields.length === 0 ? (
                  <p className="font-body text-sm text-[var(--color-navy)]/50 text-center py-4">
                    لا توجد حقول مطلوبة. يمكنك رفع المستندات فقط.
                  </p>
                ) : (
                  fields.map((field) => renderField(field))
                )}

                {/* قسم رفع الملفات */}
                <div className="pt-5 border-t border-[var(--color-border)]">
                  <Label className="mb-3 block font-heading text-sm font-medium text-[var(--color-navy)]">
                    إرفاق مستندات (PDF / JPG / PNG - حد أقصى 10 ميجا)
                  </Label>
                  <label
                    htmlFor="cc-file-input"
                    className="block border-2 border-dashed border-[var(--color-border)] p-7 text-center cursor-pointer hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-colors duration-200"
                  >
                    <Upload className="w-9 h-9 text-[var(--color-navy)]/30 mx-auto mb-2" />
                    <p className="font-heading font-semibold text-[var(--color-navy)]/70 mb-1">انقر لاختيار الملفات</p>
                    <p className="font-body text-xs text-[var(--color-navy)]/40">PDF / JPG / PNG</p>
                  </label>
                  <input
                    id="cc-file-input"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* قائمة الملفات */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file) => {
                        const isPending = file.path.startsWith("temp-");
                        return (
                          <div
                            key={file.path}
                            className="flex items-center justify-between p-3 bg-[var(--color-cream)] border border-[var(--color-border)] text-sm"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin text-[var(--color-gold)]" />
                              ) : (
                                <FileText className="w-4 h-4 text-[var(--color-gold)]" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-heading font-medium truncate text-[var(--color-navy)]">{file.name}</p>
                                <p className="font-body text-xs text-[var(--color-navy)]/50">
                                  {isPending ? "جاري الرفع..." : formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            {!isPending && (
                              <button
                                type="button"
                                onClick={() => removeFile(file.path)}
                                className="text-red-500 hover:bg-red-50 p-1.5"
                                aria-label="حذف"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* زر الإرسال */}
                <Button
                  type="submit"
                  disabled={submitting || uploadedFiles.some((f) => f.path.startsWith("temp-"))}
                  className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] py-6 text-base font-heading font-bold transition-all duration-200 active:scale-[0.97]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin ml-2" />
                      جاري الإرسال...
                    </>
                  ) : (
                    "إرسال البيانات"
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}
