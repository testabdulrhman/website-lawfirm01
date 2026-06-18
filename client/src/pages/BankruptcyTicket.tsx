import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  MessageSquare,
  Phone,
  Send,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase";

// ============================================================
// نموذج تقديم استفسار للدائنين — بوابة الإفلاس
// التدفّق: إدخال الجوال ← تحقّق OTP ← كتابة الاستفسار
// الجلسة (session_token) تُحفظ في state فقط (لا localStorage)
// ============================================================

type Step = "phone" | "otp" | "form" | "done";

export default function BankruptcyTicket() {
  const [step, setStep] = useState<Step>("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [ticketRef, setTicketRef] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [otpResendTimer, setOtpResendTimer] = useState(0);

  const otpInputRef = useRef<HTMLInputElement>(null);

  // عدّاد إعادة الإرسال
  useEffect(() => {
    if (otpResendTimer <= 0) return;
    const tmr = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
    return () => clearTimeout(tmr);
  }, [otpResendTimer]);

  // التركيز على حقل الرمز عند الانتقال للخطوة 2
  useEffect(() => {
    if (step === "otp" && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  // ============================================================
  // الخطوة 1: طلب رمز التحقّق
  // ============================================================
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setError("يجب إدخال رقم الجوال");
      return;
    }
    if (!/^05\d{8}$/.test(cleanPhone)) {
      setError("رقم الجوال غير صحيح. يجب أن يكون بصيغة 05xxxxxxxx");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/request-ticket-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "حدث خطأ، يرجى المحاولة لاحقاً");
        setLoading(false);
        return;
      }

      // الرسالة عامة دائماً (سواء الرقم مسجّل أو لا) — نعرضها كما هي
      if (data.message) setInfo(data.message);
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
  // الخطوة 2: التحقّق من الرمز
  // ============================================================
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.trim().length !== 6) {
      setError("رمز التحقّق يجب أن يكون 6 أرقام");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/verify-ticket-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ phone: phone.trim(), otp: otp.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || data.message || "رمز التحقّق غير صحيح");
        setLoading(false);
        return;
      }

      // نجح التحقّق — نحفظ الجلسة في state فقط
      setSessionToken(data.session_token);
      setInfo(null);
      setStep("form");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("فشل الاتصال. تأكد من اتصالك بالإنترنت.");
      setLoading(false);
    }
  };

  // ============================================================
  // إعادة إرسال الرمز
  // ============================================================
  const handleResendOtp = async () => {
    if (otpResendTimer > 0 || loading) return;
    setOtp("");
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/request-ticket-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || data.message || "فشل إعادة الإرسال");
      } else if (data.message) {
        setInfo(data.message);
      }
      setOtpResendTimer(60);
      setLoading(false);
    } catch {
      setError("فشل إعادة الإرسال");
      setLoading(false);
    }
  };

  // ============================================================
  // الخطوة 3: إرسال الاستفسار
  // ============================================================
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanSubject = subject.trim();
    const cleanBody = body.trim();

    if (!cleanSubject) {
      setError("يرجى إدخال موضوع الاستفسار");
      return;
    }
    if (!cleanBody) {
      setError("يرجى كتابة نص الاستفسار");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          session_token: sessionToken,
          subject: cleanSubject,
          body: cleanBody,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const msg = data.error || data.message || "تعذّر إرسال الاستفسار";
        setError(msg);
        // إن انتهت صلاحية الجلسة، نُعيد المستخدم للخطوة الأولى
        if (/جلسة|صلاحية|session/i.test(msg)) {
          setSessionToken("");
          setStep("phone");
          setOtp("");
        }
        setLoading(false);
        return;
      }

      setTicketRef(data.ticket_ref || "");
      setStep("done");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("فشل الاتصال. تأكد من اتصالك بالإنترنت.");
      setLoading(false);
    }
  };

  // ============================================================
  // تقديم استفسار آخر (إعادة تهيئة كاملة)
  // ============================================================
  const resetAll = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    setSessionToken("");
    setSubject("");
    setBody("");
    setTicketRef("");
    setError(null);
    setInfo(null);
    setOtpResendTimer(0);
  };

  // مؤشّر الخطوات (1/2/3)
  const stepIndex = step === "phone" ? 1 : step === "otp" ? 2 : 3;
  const stepLabels = ["رقم الجوال", "رمز التحقّق", "الاستفسار"];

  return (
    <>
      <SEOHead
        title="تقديم استفسار"
        description="قدّم استفسارك إلى أمين الإفلاس عبر بوابة الدائنين. التحقّق عبر رمز يُرسل لجوالك."
        canonicalUrl="/bankruptcy/ticket"
        keywords={["استفسار دائن", "إفلاس", "تواصل أمين الإفلاس"]}
      />
      <section
        className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]"
        dir="rtl"
      >
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-[var(--color-navy)] p-6 md:p-8 text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-[var(--color-gold)]" />
                <h1 className="font-display text-xl md:text-2xl font-bold text-white">
                  تقديم استفسار
                </h1>
              </div>
              <p className="font-body text-sm text-white/70">
                شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس
              </p>
            </div>

            {/* Progress indicator */}
            {step !== "done" && (
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-6" dir="rtl">
                {stepLabels.map((label, i) => {
                  const n = i + 1;
                  const active = n === stepIndex;
                  const completed = n < stepIndex;
                  return (
                    <div key={label} className="flex items-center gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${
                            active
                              ? "bg-[var(--color-gold)] text-[var(--color-navy)]"
                              : completed
                                ? "bg-[var(--color-navy)] text-white"
                                : "bg-[var(--color-navy)]/10 text-[var(--color-navy)]/40"
                          }`}
                        >
                          {completed ? <CheckCircle2 className="w-4 h-4" /> : n}
                        </div>
                        <span
                          className={`font-body text-xs md:text-sm hidden sm:inline ${
                            active
                              ? "text-[var(--color-navy)] font-semibold"
                              : "text-[var(--color-navy)]/40"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                      {n < stepLabels.length && (
                        <div className="w-6 md:w-10 h-px bg-[var(--color-navy)]/15" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Error Display */}
            {error && (
              <Card className="mb-4 border-red-200 bg-red-50 shadow-sm">
                <CardContent className="pt-6 pb-6 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="font-body text-sm text-red-800">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Step 1: Phone */}
            {step === "phone" && (
              <Card className="bg-white border-[var(--color-border)] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-2 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[var(--color-gold)]" />
                    أدخل رقم جوالك
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <div className="bg-[var(--color-navy)]/5 border border-[var(--color-navy)]/10 p-3 text-sm text-[var(--color-navy)] flex items-start gap-2 font-body">
                      <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-gold)]" />
                      <p>
                        سيتم إرسال <strong>رمز تحقّق</strong> إلى رقم جوالك. هذا الرمز يضمن
                        وصول استفسارك بشكل آمن إلى أمين الإفلاس.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-heading text-[var(--color-navy)]">
                        رقم الجوال <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
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
                          إرسال رمز التحقّق
                        </>
                      )}
                    </Button>

                    <div className="pt-2 text-center">
                      <Link
                        href="/bankruptcy"
                        className="font-body text-sm text-[var(--color-navy)]/60 hover:text-[var(--color-navy)] inline-flex items-center gap-1 transition-colors"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        العودة لبوابة الإفلاس
                      </Link>
                    </div>
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
                    أدخل رمز التحقّق
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 p-3 text-sm text-[var(--color-navy)] flex items-start gap-2 font-body">
                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-gold)]" />
                      <p>
                        {info ||
                          "إذا كان رقمك مسجّلاً لدينا، ستصلك رسالة SMS تحتوي على رمز مكوّن من 6 أرقام. صلاحيته 5 دقائق."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otp" className="font-heading text-[var(--color-navy)]">
                        رمز التحقّق (6 أرقام) <span className="text-red-500">*</span>
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
                          جاري التحقّق...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 ml-2" />
                          تحقّق
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("phone");
                          setOtp("");
                          setError(null);
                          setInfo(null);
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

            {/* Step 3: Ticket form */}
            {step === "form" && (
              <Card className="bg-white border-[var(--color-border)] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-2 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[var(--color-gold)]" />
                    اكتب استفسارك
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div className="bg-green-50 border border-green-200 p-3 text-sm text-green-800 flex items-start gap-2 font-body">
                      <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                      <p>
                        تم التحقّق من رقمك بنجاح. اكتب موضوع استفسارك ونصّه، وسيتولّى أمين
                        الإفلاس مراجعته والرد عليك على جوالك.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-heading text-[var(--color-navy)]">
                        الموضوع <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="مثال: استفسار عن حالة مطالبتي"
                        maxLength={120}
                        className="border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="body" className="font-heading text-[var(--color-navy)]">
                        نص الاستفسار <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="اكتب تفاصيل استفسارك هنا..."
                        rows={6}
                        maxLength={2000}
                        className="border-[var(--color-border)] focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] resize-none"
                        required
                      />
                      <p className="font-body text-xs text-[var(--color-navy)]/40 text-left">
                        {body.length} / 2000
                      </p>
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
                          <Send className="w-4 h-4 ml-2" />
                          إرسال الاستفسار
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Success */}
            {step === "done" && (
              <Card className="bg-white border-[var(--color-border)] shadow-sm">
                <CardContent className="py-10 px-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-2">
                    تم استلام استفسارك
                  </h2>
                  {ticketRef && (
                    <p className="font-heading text-base text-[var(--color-navy)] mb-2">
                      رقم الاستفسار:{" "}
                      <span className="font-bold text-[var(--color-gold-dark)]" dir="ltr">
                        {ticketRef}
                      </span>
                    </p>
                  )}
                  <p className="font-body text-sm text-[var(--color-navy)]/70 mb-8 max-w-md mx-auto leading-relaxed">
                    سيتم مراجعة استفسارك من قبل أمين الإفلاس، وسيصلك الرد على جوالك قريباً.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      onClick={resetAll}
                      className="w-full sm:w-auto bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white px-6 py-5 font-heading font-bold"
                    >
                      <MessageSquare className="w-4 h-4 ml-2" />
                      تقديم استفسار آخر
                    </Button>
                    <Link
                      href="/bankruptcy"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-6 py-3 font-body text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      العودة لبوابة الإفلاس
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
