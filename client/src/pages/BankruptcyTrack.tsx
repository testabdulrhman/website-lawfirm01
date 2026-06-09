import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  LogOut,
  Phone,
  Search,
  Shield,
  ShieldCheck,
} from "lucide-react";

// ============================================================
// إعدادات Supabase
// ============================================================
const SUPABASE_URL = "https://erkkzrnownrpglbyiybe.supabase.co";
const SUPABASE_ANON = "sb_publishable_GhjIoRMpzrJb0OsoOAHPUg_pw_-kaRe";

// ============================================================
// مراحل المطالبة (مطابقة للأدمن)
// ============================================================
const CLAIM_STAGES = [
  { id: 1, name: "تقديم المطالبة", icon: "📥", desc: "تم تقديم المطالبة" },
  { id: 2, name: "رأي المدين", icon: "🏢", desc: "المدين أبدى رأيه" },
  { id: 3, name: "التوصية الابتدائية", icon: "📝", desc: "توصية ابتدائية (قابلة للاعتراض)" },
  { id: 4, name: "التوصية النهائية", icon: "✅", desc: "التوصية النهائية للأمين" },
  { id: 5, name: "قائمة المحكمة", icon: "⚖️", desc: "اعتماد المحكمة (قابل للاعتراض)" },
  { id: 6, name: "قائمة الاستئناف", icon: "🏛️", desc: "حكم الاستئناف النهائي" },
];

// ============================================================
// أنواع البيانات
// ============================================================
interface Claim {
  id: number;
  claim_ref: string;
  claim_type: string;
  claim_amount: number;
  status: string;
  claim_stage: number;
  claim_stage_history: Array<{ stage: number; started_at: string }>;
  claim_stage_updated_at: string | null;
  submitted_at: string;
  claim_reason: string | null;
  due_document: string | null;
  due_date: string | null;
  debt_origin_date: string | null;
  is_secured: boolean;
  security_type: string | null;
  security_value: number | null;
  case: {
    id: number;
    debtor_name: string;
    case_number: string;
    court_name: string;
    procedure_type: string;
    status: string;
  } | null;
}

interface CreditorInfo {
  name: string;
  id_type: string;
  id_number: string;
  email: string | null;
  city: string | null;
}

type Step = "input" | "otp" | "claims";

// ============================================================
// المكون الرئيسي
// ============================================================
export default function BankruptcyTrack() {
  const [, setLocation] = useLocation();

  const [step, setStep] = useState<Step>("input");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [sessionExpiresAt, setSessionExpiresAt] = useState<string | null>(null);
  const [creditor, setCreditor] = useState<CreditorInfo | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpResendTimer, setOtpResendTimer] = useState(0);

  const otpInputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // عداد إعادة الإرسال
  // ============================================================
  useEffect(() => {
    if (otpResendTimer <= 0) return;
    const t = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [otpResendTimer]);

  // التركيز على حقل OTP عند الانتقال
  useEffect(() => {
    if (step === "otp" && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  // ============================================================
  // الخطوة 1: طلب OTP
  // ============================================================
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanId = idNumber.trim();
    const cleanPhone = phone.trim();

    if (!cleanId || !cleanPhone) {
      setError("يجب إدخال رقم الهوية ورقم الجوال");
      return;
    }

    if (cleanId.length < 8) {
      setError("رقم الهوية غير صحيح");
      return;
    }

    if (!/^[0-9+]+$/.test(cleanPhone)) {
      setError("رقم الجوال يجب أن يحتوي على أرقام فقط");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/request-otp`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON,
            Authorization: `Bearer ${SUPABASE_ANON}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_number: cleanId, phone: cleanPhone }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "حدث خطأ");
        setLoading(false);
        return;
      }

      // ننتقل للخطوة 2 (حتى لو البيانات غير صحيحة، نتظاهر بالنجاح للأمان)
      setStep("otp");
      setOtpResendTimer(60);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("فشل الاتصال. تأكد من اتصالك بالإنترنت.");
      setLoading(false);
    }
  };

  // ============================================================
  // الخطوة 2: التحقق من OTP
  // ============================================================
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.trim().length !== 6) {
      setError("رمز التحقق يجب أن يكون 6 أرقام");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/verify-otp`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON,
            Authorization: `Bearer ${SUPABASE_ANON}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_number: idNumber.trim(),
            phone: phone.trim(),
            otp: otp.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "رمز التحقق غير صحيح");
        if (data.attempts_left !== undefined) {
          setError(`${data.message} (${data.attempts_left} محاولات متبقية)`);
        }
        setLoading(false);
        return;
      }

      // نجح - نحفظ الـ token ونجلب المطالبات
      setSessionToken(data.session_token);
      setSessionExpiresAt(data.session_expires_at);
      await loadClaims(data.session_token);
    } catch (err) {
      console.error(err);
      setError("فشل الاتصال. تأكد من اتصالك بالإنترنت.");
      setLoading(false);
    }
  };

  // ============================================================
  // الخطوة 3: تحميل المطالبات
  // ============================================================
  const loadClaims = async (token: string) => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/get-creditor-claims?session_token=${encodeURIComponent(token)}`,
        {
          headers: {
            apikey: SUPABASE_ANON,
            Authorization: `Bearer ${SUPABASE_ANON}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "فشل تحميل المطالبات");
        setLoading(false);
        return;
      }

      setCreditor(data.creditor);
      setClaims(data.claims || []);
      setStep("claims");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("فشل تحميل المطالبات");
      setLoading(false);
    }
  };

  // ============================================================
  // تسجيل الخروج
  // ============================================================
  const handleLogout = () => {
    setStep("input");
    setIdNumber("");
    setPhone("");
    setOtp("");
    setSessionToken("");
    setSessionExpiresAt(null);
    setCreditor(null);
    setClaims([]);
    setError(null);
  };

  // ============================================================
  // إعادة إرسال OTP
  // ============================================================
  const handleResendOtp = async () => {
    if (otpResendTimer > 0) return;
    setOtp("");
    setError(null);
    setLoading(true);

    try {
      await fetch(`${SUPABASE_URL}/functions/v1/request-otp`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_number: idNumber.trim(), phone: phone.trim() }),
      });
      setOtpResendTimer(60);
      setLoading(false);
    } catch {
      setError("فشل إعادة الإرسال");
      setLoading(false);
    }
  };

  // ============================================================
  // العرض حسب الخطوة
  // ============================================================
  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]" dir="rtl">
      <div className="container mx-auto px-5 md:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--color-navy)] p-6 md:p-8 text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Search className="w-6 h-6 text-[var(--color-gold)]" />
              <h1 className="font-display text-xl md:text-2xl font-bold text-white">
                تتبّع مطالبتك
              </h1>
            </div>
            <p className="font-body text-sm text-white/70">
              شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <Card className="mb-4 border-red-200 bg-red-50 shadow-sm">
              <CardContent className="pt-6 pb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="font-body text-sm text-red-800">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Input */}
          {step === "input" && (
            <Card className="bg-white border-[var(--color-border)] shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[var(--color-gold)]" />
                  ادخل بياناتك
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div className="bg-[var(--color-navy)]/5 border border-[var(--color-navy)]/10 p-3 text-sm text-[var(--color-navy)] flex items-start gap-2 font-body">
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-gold)]" />
                    <p>
                      سيتم إرسال <strong>رمز تحقق</strong> إلى رقم جوالك المسجّل عند تقديم
                      المطالبة. يجب أن يطابق رقم الهوية ورقم الجوال المسجلين لدى المكتب.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id_number" className="font-heading text-[var(--color-navy)]">
                      رقم الهوية / السجل التجاري <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="id_number"
                      type="text"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="1010xxxxxx"
                      dir="ltr"
                      className="text-left border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-heading text-[var(--color-navy)]">
                      رقم الجوال <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                      className="text-left border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white py-6 text-base font-heading font-bold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin ml-2" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4 ml-2" />
                        إرسال رمز التحقق
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <Card className="bg-white border-[var(--color-border)] shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-gold)]" />
                  أدخل رمز التحقق
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 p-3 text-sm text-[var(--color-navy)] flex items-start gap-2 font-body">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-gold)]" />
                    <p>
                      إذا كانت بياناتك صحيحة، ستصلك رسالة <strong>SMS</strong> تحتوي على رمز
                      مكوّن من 6 أرقام. صلاحيته 10 دقائق.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp" className="font-heading text-[var(--color-navy)]">
                      رمز التحقق (6 أرقام) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="otp"
                      ref={otpInputRef}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="------"
                      dir="ltr"
                      className="text-center text-2xl tracking-[0.5em] font-mono border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                      autoComplete="one-time-code"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white py-6 text-base font-heading font-bold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin ml-2" />
                        جاري التحقق...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 ml-2" />
                        تحقق
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("input");
                        setOtp("");
                        setError(null);
                      }}
                      className="font-body text-sm text-[var(--color-navy)]/60 hover:text-[var(--color-navy)] flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      رجوع
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={otpResendTimer > 0 || loading}
                      className={`font-body text-sm transition-colors ${
                        otpResendTimer > 0
                          ? "text-[var(--color-navy)]/40 cursor-not-allowed"
                          : "text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] font-semibold"
                      }`}
                    >
                      {otpResendTimer > 0
                        ? `إعادة الإرسال (${otpResendTimer})`
                        : "إعادة إرسال الرمز"}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Claims */}
          {step === "claims" && (
            <ClaimsView
              creditor={creditor}
              claims={claims}
              sessionExpiresAt={sessionExpiresAt}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// عرض المطالبات
// ============================================================
function ClaimsView({
  creditor,
  claims,
  sessionExpiresAt,
  onLogout,
}: {
  creditor: CreditorInfo | null;
  claims: Claim[];
  sessionExpiresAt: string | null;
  onLogout: () => void;
}) {
  const formatAmount = (n: number) =>
    n ? parseFloat(String(n)).toLocaleString("en-US") + " ر.س" : "-";

  const formatDate = (d: string | null) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString("ar-SA");
    } catch {
      return d;
    }
  };

  const total = claims.reduce(
    (sum, c) => sum + (parseFloat(String(c.claim_amount)) || 0),
    0
  );

  return (
    <div className="space-y-5">
      {/* معلومات الدائن */}
      <Card className="bg-white border-[var(--color-border)] shadow-sm">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="font-body text-sm text-[var(--color-navy)]/50">مرحباً</p>
              <h2 className="font-display text-xl font-bold text-[var(--color-navy)]">
                {creditor?.name || "الدائن"}
              </h2>
              <p className="font-body text-sm text-[var(--color-navy)]/50 mt-1">
                {creditor?.id_type}: <span dir="ltr">{creditor?.id_number}</span>
              </p>
            </div>
            <Button onClick={onLogout} variant="outline" size="sm" className="border-[var(--color-border)] font-heading text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5">
              <LogOut className="w-3 h-3 ml-1" />
              خروج
            </Button>
          </div>

          {/* إحصائيات */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="bg-[var(--color-navy)]/5 border border-[var(--color-navy)]/10 p-3">
              <p className="font-body text-xs text-[var(--color-navy)]/60">عدد المطالبات</p>
              <p className="font-display text-2xl font-bold text-[var(--color-navy)]">{claims.length}</p>
            </div>
            <div className="bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 p-3">
              <p className="font-body text-xs text-[var(--color-gold)]">إجمالي المبالغ</p>
              <p className="font-display text-2xl font-bold text-[var(--color-gold)]">
                {formatAmount(total)}
              </p>
            </div>
          </div>

          {sessionExpiresAt && (
            <p className="font-body text-xs text-[var(--color-navy)]/40 mt-3 text-center">
              <Clock className="w-3 h-3 inline ml-1" />
              ستنتهي الجلسة في{" "}
              {new Date(sessionExpiresAt).toLocaleTimeString("ar-SA", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </CardContent>
      </Card>

      {/* قائمة المطالبات */}
      {claims.length === 0 ? (
        <Card className="bg-white border-[var(--color-border)] shadow-sm">
          <CardContent className="pt-6 text-center py-10">
            <FileText className="w-12 h-12 mx-auto mb-2 text-[var(--color-navy)]/20" />
            <p className="font-body text-[var(--color-navy)]/50">لا توجد مطالبات مسجلة</p>
          </CardContent>
        </Card>
      ) : (
        claims.map((claim) => (
          <ClaimCard
            key={claim.id}
            claim={claim}
            formatAmount={formatAmount}
            formatDate={formatDate}
          />
        ))
      )}
    </div>
  );
}

// ============================================================
// بطاقة المطالبة الواحدة
// ============================================================
function ClaimCard({
  claim,
  formatAmount,
  formatDate,
}: {
  claim: Claim;
  formatAmount: (n: number) => string;
  formatDate: (d: string | null) => string;
}) {
  const currentStage = claim.claim_stage || 1;

  return (
    <Card className="bg-white border-[var(--color-border)] shadow-sm">
      <CardContent className="pt-6 pb-6">
        {/* رأس البطاقة */}
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4 pb-4 border-b border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-[var(--color-gold)] hover:bg-[var(--color-gold)] text-white font-heading">
                {claim.claim_ref}
              </Badge>
              <Badge variant="outline" className="border-[var(--color-navy)]/20 text-[var(--color-navy)] font-body">
                {claim.claim_type}
              </Badge>
            </div>
            <p className="font-body text-sm text-[var(--color-navy)]/60">
              ضد:{" "}
              <span className="font-semibold text-[var(--color-navy)]">
                {claim.case?.debtor_name || "-"}
              </span>
            </p>
            {claim.case?.case_number && (
              <p className="font-body text-xs text-[var(--color-navy)]/40 mt-0.5">
                قضية رقم {claim.case.case_number}
                {claim.case.court_name ? ` · ${claim.case.court_name}` : ""}
              </p>
            )}
          </div>
          <div className="text-left">
            <p className="font-body text-xs text-[var(--color-navy)]/50">المبلغ</p>
            <p className="font-display text-lg font-bold text-[var(--color-gold)]">
              {formatAmount(claim.claim_amount)}
            </p>
          </div>
        </div>

        {/* الـ Stepper */}
        <div className="mb-4">
          <p className="font-heading text-xs font-semibold text-[var(--color-navy)]/60 mb-3">
            مرحلة المطالبة
          </p>
          <ClaimStepper claim={claim} formatDate={formatDate} />
        </div>

        {/* تفاصيل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-3 border-t border-[var(--color-border)]">
          {claim.submitted_at && (
            <div>
              <p className="font-body text-xs text-[var(--color-navy)]/50">تاريخ التقديم</p>
              <p className="font-heading font-medium text-[var(--color-navy)]">{formatDate(claim.submitted_at)}</p>
            </div>
          )}
          {claim.due_document && (
            <div>
              <p className="font-body text-xs text-[var(--color-navy)]/50">سند المطالبة</p>
              <p className="font-heading font-medium text-[var(--color-navy)]">{claim.due_document}</p>
            </div>
          )}
          {claim.due_date && (
            <div>
              <p className="font-body text-xs text-[var(--color-navy)]/50">تاريخ الاستحقاق</p>
              <p className="font-heading font-medium text-[var(--color-navy)]">{formatDate(claim.due_date)}</p>
            </div>
          )}
          {claim.case?.procedure_type && (
            <div>
              <p className="font-body text-xs text-[var(--color-navy)]/50">نوع الإجراء</p>
              <p className="font-heading font-medium text-[var(--color-navy)]">{claim.case.procedure_type}</p>
            </div>
          )}
          {claim.claim_reason && (
            <div className="sm:col-span-2">
              <p className="font-body text-xs text-[var(--color-navy)]/50">سبب المطالبة</p>
              <p className="font-heading font-medium text-[var(--color-navy)]">{claim.claim_reason}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================
// Stepper المراحل
// ============================================================
function ClaimStepper({
  claim,
  formatDate,
}: {
  claim: Claim;
  formatDate: (d: string | null) => string;
}) {
  const currentStage = claim.claim_stage || 1;
  const history = Array.isArray(claim.claim_stage_history)
    ? claim.claim_stage_history
    : [];

  return (
    <div className="flex items-start overflow-x-auto pb-2">
      <div className="flex items-start min-w-full gap-0">
        {CLAIM_STAGES.map((stage, idx) => {
          const isCompleted = stage.id < currentStage;
          const isCurrent = stage.id === currentStage;
          const isLast = idx === CLAIM_STAGES.length - 1;

          // تاريخ بدء المرحلة
          const stageHistory = history.filter((h) => h.stage === stage.id);
          const latestEntry =
            stageHistory.length > 0 ? stageHistory[stageHistory.length - 1] : null;
          const dateStr = latestEntry?.started_at ? formatDate(latestEntry.started_at) : "";

          let circleClass = "";
          let lineClass = "";
          let textClass = "";
          let iconHtml: React.ReactNode = null;

          if (isCompleted) {
            circleClass = "bg-green-500 text-white border-green-500";
            lineClass = "bg-green-500";
            textClass = "text-green-700";
            iconHtml = (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            );
          } else if (isCurrent) {
            circleClass =
              "bg-[var(--color-gold)] text-white border-[var(--color-gold)] ring-4 ring-[var(--color-gold)]/20 animate-pulse";
            lineClass = "bg-[var(--color-border)]";
            textClass = "text-[var(--color-gold)] font-bold";
            iconHtml = <span className="text-base">{stage.icon}</span>;
          } else {
            circleClass = "bg-white text-[var(--color-navy)]/30 border-[var(--color-border)]";
            lineClass = "bg-[var(--color-border)]";
            textClass = "text-[var(--color-navy)]/40";
            iconHtml = <span className="text-sm opacity-50">{stage.id}</span>;
          }

          return (
            <div
              key={stage.id}
              className={`relative ${isLast ? "flex-none" : "flex-1"}`}
            >
              <div className="flex items-start">
                <div className="flex flex-col items-center min-w-[60px] relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full border-2 ${circleClass} flex items-center justify-center transition-all`}
                    title={stage.desc}
                  >
                    {iconHtml}
                  </div>
                  <div className="text-center mt-1.5 px-1">
                    <p className={`text-[10px] font-heading ${textClass} leading-tight`}>
                      {stage.name}
                    </p>
                    {dateStr && (
                      <p className="text-[9px] text-[var(--color-navy)]/30 mt-0.5 font-body">{dateStr}</p>
                    )}
                  </div>
                </div>
                {!isLast && <div className={`flex-1 h-0.5 ${lineClass} mt-4`}></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
