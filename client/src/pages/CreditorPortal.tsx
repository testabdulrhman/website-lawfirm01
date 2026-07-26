import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase";
import {
  STRINGS,
  fmtDate,
  fmtDateTime,
  fmtCurrency,
  fmtNumber,
  trStatus,
  trClaimType,
  trProcedure,
  trChannel,
  trDocCategory,
  type Lang,
  type Strings,
} from "@/data/creditorI18n";
import {
  AlertCircle,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Eye,
  File as FileIcon,
  FileImage,
  FileText,
  Loader2,
  LogOut,
  MessageSquarePlus,
  Send,
  ShieldCheck,
  Smartphone,
  User,
  Users,
  Vote,
  Video,
} from "lucide-react";

// ============================================================
// بوابة الدائن الموحّدة — /creditor
//
// جلسة واحدة (request-otp → verify-otp) تفتح التبويبات الثلاثة:
// creditor-portal-data تُرجع المطالبات والتذاكر والبيانات وطلبات
// الاستكمال والجلسات في نداء واحد، و submit-ticket يقبل الجلسة نفسها.
// ============================================================

const FN = `${SUPABASE_URL}/functions/v1`;
const HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};
const SESSION_KEY = "creditor_portal_session";

// مراحل المطالبة الستّ — مطابقة للوحة الإدارة وحقل claim_stage
const CLAIM_STAGES = [
  { id: 1, icon: "📥", ar: "تقديم المطالبة", en: "Submitted", ur: "جمع کرائی گئی" },
  { id: 2, icon: "🏢", ar: "رأي المدين", en: "Debtor opinion", ur: "مقروض کی رائے" },
  { id: 3, icon: "📝", ar: "التوصية الابتدائية", en: "Initial recommendation", ur: "ابتدائی سفارش" },
  { id: 4, icon: "✅", ar: "التوصية النهائية", en: "Final recommendation", ur: "حتمی سفارش" },
  { id: 5, icon: "⚖️", ar: "قائمة المحكمة", en: "Court list", ur: "عدالتی فہرست" },
  { id: 6, icon: "🏛️", ar: "قائمة الاستئناف", en: "Appeal list", ur: "اپیل فہرست" },
];

// ─── أنواع البيانات (مطابقة لعقد creditor-portal-data) ───

interface CreditorInfo {
  name?: string | null;
  id_type?: string | null;
  id_number?: string | null;
  phone?: string | null;
  phone_alt?: string | null;
  email?: string | null;
  email_alt?: string | null;
  city?: string | null;
  address?: string | null;
  street_name?: string | null;
  representative_name?: string | null;
}

interface ClaimCase {
  id: number;
  debtor_name?: string | null;
  case_number?: string | null;
  court_name?: string | null;
  procedure_type?: string | null;
  status?: string | null;
}

interface ClaimDocument {
  url: string;
  label?: string | null;
  category?: string | null;
  file_name?: string | null;
}

interface Claim {
  id: number;
  claim_ref?: string | null;
  claim_type?: string | null;
  claim_amount: number | null;
  status?: string | null;
  claim_stage?: number | null;
  submitted_at?: string | null;
  claim_reason?: string | null;
  due_date?: string | null;
  debt_origin_date?: string | null;
  is_secured?: boolean | null;
  security_type?: string | null;
  security_value?: number | null;
  documents?: ClaimDocument[];
  case: ClaimCase | null;
}

interface Ticket {
  id: number;
  ticket_ref?: string | null;
  subject?: string | null;
  body?: string | null;
  status?: string | null;
  final_reply?: string | null;
  replied_at?: string | null;
  created_at?: string | null;
  channel?: string | null;
}

interface CompletionRequest {
  id: number;
  claim_id: number;
  claim_ref?: string | null;
  token: string;
  custom_message?: string | null;
  expires_at?: string | null;
}

interface Hearing {
  id: number;
  case_id: number;
  debtor_name?: string | null;
  hearing_date?: string | null;
  hearing_time?: string | null;
  hearing_type?: string | null;
  court_name?: string | null;
  is_remote?: boolean | null;
  attendance_method?: string | null;
}

interface VoteItem {
  id: number;
  case_id: number;
  debtor_name: string | null;
  title: string;
  description: string | null;
  opens_at: string;
  closes_at: string;
  status: string;
  result: string | null;
  eligible: boolean;
  open: boolean;
  server_time: string;
  my_vote: { choice: string; voted_at: string } | null;
  proposal_url: string | null;
}

interface PortalData {
  creditor: CreditorInfo | null;
  claims: Claim[];
  tickets: Ticket[];
  completion_requests: CompletionRequest[];
  hearings: Hearing[];
  votes: VoteItem[];
}

type Stage = "id" | "otp" | "select" | "portal";
type Method = "phone" | "email";
type CreditorOption = { id_number: string; creditor_name: string; claims: number };
type Tab = "claims" | "tickets" | "vote" | "profile";

// ─── مساعدات العرض ───

function stageName(id: number, lang: Lang): string {
  const s = CLAIM_STAGES.find((x) => x.id === id);
  if (!s) return String(id);
  return lang === "en" ? s.en : lang === "ur" ? s.ur : s.ar;
}

function docLabel(d: ClaimDocument, i: number, t: Strings, lang: Lang): string {
  if (d.label) return d.label;
  const cat = trDocCategory(d.category, lang);
  if (cat) return cat;
  if (d.file_name) return d.file_name;
  return `${t.myDocs} ${i + 1}`;
}

function docIconFor(d: ClaimDocument) {
  const ext = (d.file_name ?? d.url ?? "").split(".").pop()?.toLowerCase().split("?")[0] ?? "";
  if (ext === "pdf") return FileText;
  if (["png", "jpg", "jpeg", "webp", "gif", "bmp"].includes(ext)) return FileImage;
  return FileIcon;
}

// ============================================================
// المكوّن الرئيسي
// ============================================================

export default function CreditorPortal() {
  const { lang, isRTL } = useTranslation();
  const l = lang as Lang;
  const t = STRINGS[l];

  const [stage, setStage] = useState<Stage>("id");
  const [tab, setTab] = useState<Tab>("claims");
  const [method, setMethod] = useState<Method>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [creditorOptions, setCreditorOptions] = useState<CreditorOption[]>([]);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [data, setData] = useState<PortalData | null>(null);

  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw) as { token: string; expires: string };
      if (saved.token && new Date(saved.expires) > new Date()) return saved.token;
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    }
    return null;
  });

  // نموذج الاستفسار
  const [ticketOpen, setTicketOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketSending, setTicketSending] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [ticketRef, setTicketRef] = useState<string | null>(null);

  const otpRef = useRef<HTMLInputElement>(null);

  // عدّاد إعادة الإرسال
  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  function endSession(msg?: string) {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setSessionToken(null);
    setData(null);
    setOtp("");
    setStage("id");
    if (msg) setError(msg);
  }

  // ── 1) طلب رمز التحقق ──
  async function requestOtp(isResend = false) {
    if (method === "phone" && !phone.trim()) { setError(t.errPhone); return; }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.errEmail);
      return;
    }
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(`${FN}/request-otp`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(
          method === "email" ? { email: email.trim() } : { phone: phone.trim() },
        ),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message ?? json.error ?? t.errSendCode);
      } else {
        setInfo(json.message ?? t.otpSent);
        setResendIn(60);
        if (!isResend) {
          setStage("otp");
          setTimeout(() => otpRef.current?.focus(), 50);
        }
      }
    } catch {
      setError(t.errConn);
    }
    setLoading(false);
  }

  // ── 2) التحقق من الرمز ──
  async function verifyOtp(code?: string) {
    const value = (code ?? otp).trim();
    if (!/^\d{6}$/.test(value)) { setError(t.errOtpFormat); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${FN}/verify-otp`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(
          method === "email"
            ? { email: email.trim(), otp: value }
            : { phone: phone.trim(), otp: value },
        ),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        const left = json.attempts_left;
        setError(
          json.message
            ? left != null && left > 0
              ? `${json.message} ${t.attemptsLeft(left)}`
              : json.message
            : t.errVerify,
        );
        setLoading(false);
        return;
      }
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ token: json.session_token, expires: json.session_expires_at }),
        );
      } catch { /* ignore */ }
      setSessionToken(json.session_token);
      if (json.needs_selection) {
        setCreditorOptions(json.creditors ?? []);
        setStage("select");
        setLoading(false);
        return;
      }
      await loadPortal(json.session_token);
    } catch {
      setError(t.errConn);
    }
    setLoading(false);
  }

  // ── 2.5) تثبيت الدائن حين يرتبط التواصل بأكثر من واحد ──
  async function chooseCreditor(idNum: string) {
    if (!sessionToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${FN}/select-creditor`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ session_token: sessionToken, id_number: idNum }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.message ?? t.errSelect);
        setLoading(false);
        return;
      }
      await loadPortal(sessionToken);
    } catch {
      setError(t.errConn);
    }
    setLoading(false);
  }

  // ── إدلاء الصوت ──
  async function castVote(voteId: number, choice: string) {
    if (!sessionToken) return;
    if (!window.confirm(t.voteConfirm(choice))) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${FN}/submit-vote`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ session_token: sessionToken, vote_id: voteId, choice }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.message ?? t.errConn);
      } else {
        await loadPortal(sessionToken);
      }
    } catch {
      setError(t.errConn);
    }
    setLoading(false);
  }

  // ── 3) جلب بيانات البوابة ──
  async function loadPortal(token: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${FN}/creditor-portal-data`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ session_token: token }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        // 401 جلسة غير صالحة · 410 منتهية — كلاهما يُنهي الجلسة بوضوح
        if (res.status === 401 || res.status === 410) {
          endSession(json.message ?? t.errSession);
        } else {
          setError(json.message ?? t.errLoad);
        }
        setLoading(false);
        return;
      }
      setData({
        creditor: json.creditor ?? null,
        claims: json.claims ?? [],
        tickets: json.tickets ?? [],
        completion_requests: json.completion_requests ?? [],
        hearings: json.hearings ?? [],
        votes: json.votes ?? [],
      });
      setStage("portal");
    } catch {
      setError(t.errConn);
    }
    setLoading(false);
  }

  // استئناف جلسة محفوظة عند فتح الصفحة
  useEffect(() => {
    if (sessionToken) void loadPortal(sessionToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 4) إرسال استفسار (بالجلسة نفسها) ──
  async function submitTicket() {
    if (!ticketSubject.trim()) { setTicketError(t.errSubject); return; }
    if (!ticketBody.trim()) { setTicketError(t.errBody); return; }
    if (!sessionToken) { setTicketError(t.errSession); return; }
    setTicketSending(true);
    setTicketError(null);
    try {
      const res = await fetch(`${FN}/submit-ticket`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          session_token: sessionToken,
          subject: ticketSubject.trim(),
          body: ticketBody.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        if (res.status === 401) {
          endSession(json.error ?? t.errSession);
        } else {
          setTicketError(json.error ?? json.message ?? t.errConn);
        }
        setTicketSending(false);
        return;
      }
      setTicketRef(json.ticket_ref ?? null);
      setTicketSubject("");
      setTicketBody("");
      setTicketOpen(false);
      void loadPortal(sessionToken);
    } catch {
      setTicketError(t.errConn);
    }
    setTicketSending(false);
  }

  const claims = data?.claims ?? [];
  const tickets = data?.tickets ?? [];
  const creditor = data?.creditor ?? null;
  const completions = data?.completion_requests ?? [];
  const hearings = data?.hearings ?? [];
  const votes = data?.votes ?? [];
  const totalAmount = claims.reduce((s, c) => s + (c.claim_amount ?? 0), 0);

  const seo = (
    // noindex يأتي من seo-data.json (وسم robots) ومن ترويسة X-Robots-Tag في netlify.toml
    <SEOHead title={t.loginTitle} description={t.loginIntro} canonicalUrl="/bankruptcy/creditor" />
  );

  // ════════════════ شاشة الدخول ════════════════
  if (stage === "id") {
    return (
      <>
        {seo}
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
          <div className="container mx-auto px-5 md:px-4 lg:px-8">
            <div className="mx-auto max-w-md">
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto mb-4 bg-[var(--color-navy)] flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-[var(--color-gold)]" />
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
                  {t.loginTitle}
                </h1>
                <p className="font-body text-sm text-[var(--color-navy)]/60 mt-2">{t.loginIntro}</p>
              </div>

              <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
                {error && <ErrorNote msg={error} />}

                <div className="space-y-4">
                  {/* الجوال هو الأصل، والبريد بديل لمن لا جوال له في المطالبة */}
                  <div className="grid grid-cols-2 gap-0 border border-[var(--color-border)]">
                    {(["phone", "email"] as Method[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => { setMethod(m); setError(null); }}
                        aria-pressed={method === m}
                        className={
                          "font-body text-sm py-2.5 transition-colors " +
                          (method === m
                            ? "bg-[var(--color-navy)] text-[var(--color-cream)]"
                            : "bg-white text-[var(--color-navy)]/60 hover:bg-[var(--color-cream)]")
                        }
                      >
                        {m === "phone" ? t.methodPhone : t.methodEmail}
                      </button>
                    ))}
                  </div>

                  {method === "phone" ? (
                    <div>
                      <Label htmlFor="cp-phone" className="font-body text-sm text-[var(--color-navy)]/70">
                        {t.phoneLabel}
                      </Label>
                      <Input
                        id="cp-phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder={t.phoneLabel}
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        className="mt-1.5"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="cp-email" className="font-body text-sm text-[var(--color-navy)]/70">
                        {t.emailLabel}
                      </Label>
                      <Input
                        id="cp-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        placeholder={t.emailLabel}
                        inputMode="email"
                        autoComplete="email"
                        dir="ltr"
                        className="mt-1.5"
                      />
                    </div>
                  )}

                  <p className="font-body text-xs text-[var(--color-navy)]/45">{t.methodHint}</p>

                  <Button
                    onClick={() => void requestOtp()}
                    disabled={loading}
                    className="w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-[var(--color-cream)] font-heading"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
                    <span className="ms-2">{t.sendCode}</span>
                  </Button>
                </div>

                <p className="font-body text-xs text-[var(--color-navy)]/40 mt-5 text-center leading-relaxed">
                  {t.sessionNote}
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ════════════════ شاشة اختيار الدائن ════════════════
  // تظهر فقط حين يرتبط الجوال أو البريد بأكثر من دائن (وكيل أو ممثّل مثلاً)
  if (stage === "select") {
    return (
      <>
        {seo}
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
          <div className="container mx-auto px-5 md:px-4 lg:px-8">
            <div className="mx-auto max-w-md">
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto mb-4 bg-[var(--color-navy)] flex items-center justify-center">
                  <Users className="w-7 h-7 text-[var(--color-gold)]" />
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
                  {t.selectTitle}
                </h1>
                <p className="font-body text-sm text-[var(--color-navy)]/60 mt-2">{t.selectIntro}</p>
              </div>

              <div className="bg-white border border-[var(--color-border)] p-4 md:p-6">
                {error && <ErrorNote msg={error} />}
                <div className="space-y-2">
                  {creditorOptions.map((c) => (
                    <button
                      key={c.id_number}
                      type="button"
                      disabled={loading}
                      onClick={() => void chooseCreditor(c.id_number)}
                      className="w-full text-start border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-gold)] hover:bg-[var(--color-cream)] disabled:opacity-50"
                    >
                      <div className="font-heading text-sm font-bold text-[var(--color-navy)]">
                        {c.creditor_name}
                      </div>
                      <div className="font-body text-xs text-[var(--color-navy)]/50 mt-0.5 flex items-center gap-2">
                        <span dir="ltr">{c.id_number}</span>
                        <span>·</span>
                        <span>{t.selectClaims(c.claims)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ════════════════ شاشة رمز التحقق ════════════════
  if (stage === "otp") {
    return (
      <>
        {seo}
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
          <div className="container mx-auto px-5 md:px-4 lg:px-8">
            <div className="mx-auto max-w-md">
              <div className="text-center mb-8">
                <h1 className="font-display text-2xl font-bold text-[var(--color-navy)]">{t.otpTitle}</h1>
                <p className="font-body text-sm text-[var(--color-navy)]/60 mt-2" dir="ltr">{phone}</p>
              </div>

              <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
                {error && <ErrorNote msg={error} />}
                {info && (
                  <div className="mb-4 p-3 bg-[var(--color-cream)] border border-[var(--color-border)]">
                    <p className="font-body text-xs text-[var(--color-navy)]/60">{info}</p>
                  </div>
                )}

                <Label htmlFor="cp-otp" className="font-body text-sm text-[var(--color-navy)]/70">
                  {t.otpLabel}
                </Label>
                <Input
                  id="cp-otp"
                  ref={otpRef}
                  value={otp}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(v);
                    if (v.length === 6) void verifyOtp(v);
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  dir="ltr"
                  className="mt-1.5 text-center text-2xl tracking-[0.5em] font-mono"
                />

                <Button
                  onClick={() => void verifyOtp()}
                  disabled={loading || otp.length !== 6}
                  className="w-full mt-4 bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-[var(--color-cream)] font-heading"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span className="ms-2">{t.verifyEnter}</span>
                </Button>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => { setStage("id"); setOtp(""); setError(null); }}
                    className="font-body text-xs text-[var(--color-navy)]/50 hover:text-[var(--color-navy)] transition-colors"
                  >
                    {t.editData}
                  </button>
                  <button
                    type="button"
                    onClick={() => resendIn === 0 && void requestOtp(true)}
                    disabled={resendIn > 0}
                    className="font-body text-xs text-[var(--color-gold)] hover:underline disabled:text-[var(--color-navy)]/30 disabled:no-underline"
                  >
                    {resendIn > 0 ? t.resendIn(resendIn) : t.resend}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ════════════════ البوابة ════════════════
  const NAV: { key: Tab; label: string; icon: typeof FileText; count?: number }[] = [
    { key: "claims", label: t.navClaims, icon: FileText, count: claims.length },
    { key: "tickets", label: t.navTickets, icon: MessageSquarePlus, count: tickets.length },
    ...(votes.length > 0
      ? [{ key: "vote" as Tab, label: t.navVote, icon: Vote, count: votes.length }]
      : []),
    { key: "profile", label: t.navProfile, icon: User },
  ];

  return (
    <>
      {seo}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          {/* بطاقة الدائن */}
          <div className="bg-[var(--color-navy)] p-5 md:p-6 mb-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="font-body text-xs text-white/50">{t.portalName}</p>
                <h1 className="font-display text-lg md:text-xl font-bold text-white truncate">
                  {creditor?.name ?? "—"}
                </h1>
                {creditor?.id_number && (
                  <p className="font-body text-xs text-white/40 mt-1" dir="ltr">{creditor.id_number}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => endSession()}
                className="shrink-0 inline-flex items-center gap-2 px-3 py-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-body text-xs transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                {t.logout}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-white/5 p-3">
                <p className="font-body text-[11px] text-white/50">{t.claimUnit}</p>
                <p className="font-display text-xl font-bold text-[var(--color-gold)]">
                  {fmtNumber(claims.length)}
                </p>
              </div>
              <div className="bg-white/5 p-3 min-w-0">
                <p className="font-body text-[11px] text-white/50">{t.totalRiyal}</p>
                {/* بلا truncate: المبلغ يجب أن يُقرأ كاملاً — يصغُر الخط عند الضيق ولا يُقصّ */}
                <p className="font-display text-base sm:text-xl font-bold text-[var(--color-gold)] break-words">
                  {fmtCurrency(totalAmount, l)}
                </p>
              </div>
            </div>
          </div>

          {/* تنبيه طلبات الاستكمال — يربط بصفحة الاستكمال بالرمز نفسه */}
          {completions.map((c) => (
            <a
              key={c.id}
              href={`/bankruptcy/complete?token=${encodeURIComponent(c.token)}`}
              className="block mb-3 p-4 bg-amber-50 border border-amber-300 hover:border-amber-500 transition-colors"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-amber-900">
                    {t.completionTitle(c.claim_ref ?? "")}
                  </p>
                  <p className="font-body text-xs text-amber-800/80 mt-1">
                    {c.custom_message || t.completionDefault}
                  </p>
                  <span className="inline-block mt-2 font-body text-xs font-semibold text-amber-900 underline">
                    {t.completeNow}
                  </span>
                </div>
              </div>
            </a>
          ))}

          {/* شريط التبويبات — أفقي على كل المقاسات، قابل للتمرير عند الضيق */}
          <div className="bg-white border border-[var(--color-border)] mb-5">
            <div className="flex overflow-x-auto">
              {NAV.map((n) => {
                const active = tab === n.key;
                return (
                  <button
                    key={n.key}
                    type="button"
                    onClick={() => setTab(n.key)}
                    className={`min-w-0 flex-1 shrink-0 flex items-center justify-center gap-1.5 px-3 py-3 font-heading text-xs md:text-sm border-b-2 transition-colors whitespace-nowrap ${
                      active
                        ? "border-[var(--color-gold)] text-[var(--color-navy)] bg-[var(--color-cream)]"
                        : "border-transparent text-[var(--color-navy)]/50 hover:text-[var(--color-navy)]"
                    }`}
                  >
                    <n.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{n.label}</span>
                    {n.count !== undefined && n.count > 0 && (
                      <span className="shrink-0 px-1.5 py-0.5 bg-[var(--color-navy)]/10 text-[10px] font-mono rounded">
                        {fmtNumber(n.count)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <ErrorNote msg={error} />}
          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-gold)]" />
            </div>
          )}

          {/* ─── تبويب المطالبات ─── */}
          {tab === "claims" && !loading && (
            <div className="space-y-4">
              {hearings.length > 0 && (
                <div className="bg-white border border-[var(--color-border)] p-5">
                  <h2 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-3 flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-[var(--color-gold)]" />
                    {t.upcomingHearings}
                  </h2>
                  <div className="space-y-2">
                    {hearings.map((h) => (
                      <div
                        key={h.id}
                        className="flex items-start justify-between gap-3 flex-wrap py-2 border-b border-[var(--color-border)] last:border-0"
                      >
                        <div className="min-w-0">
                          <p className="font-body text-sm text-[var(--color-navy)] truncate">
                            {h.debtor_name ?? "—"}
                          </p>
                          <p className="font-body text-xs text-[var(--color-navy)]/50">
                            {h.court_name ?? "—"}
                            {h.hearing_type ? ` · ${h.hearing_type}` : ""}
                          </p>
                        </div>
                        <div className="text-end shrink-0">
                          <p className="font-body text-sm text-[var(--color-navy)]">
                            {fmtDate(h.hearing_date, l)}
                          </p>
                          <p className="font-body text-xs text-[var(--color-navy)]/50 flex items-center gap-1 justify-end">
                            {h.is_remote && <Video className="w-3 h-3" />}
                            {h.hearing_time ?? ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {claims.length === 0 ? (
                <EmptyState icon={FileText} msg={t.noClaims} />
              ) : (
                claims.map((c) => <ClaimCard key={c.id} claim={c} t={t} lang={l} isRTL={isRTL} />)
              )}
            </div>
          )}

          {/* ─── تبويب التذاكر ─── */}
          {tab === "tickets" && !loading && (
            <div className="space-y-4">
              <div className="bg-white border border-[var(--color-border)] p-5">
                {ticketRef ? (
                  <div className="text-center py-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                    <p className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                      {t.ticketReceived}
                    </p>
                    <p className="font-body text-xs text-[var(--color-navy)]/50 mt-1" dir="ltr">
                      {ticketRef}
                    </p>
                    <Button
                      onClick={() => { setTicketRef(null); setTicketOpen(true); }}
                      className="mt-4 bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-[var(--color-cream)] font-heading"
                    >
                      {t.newTicket}
                    </Button>
                  </div>
                ) : !ticketOpen ? (
                  <Button
                    onClick={() => { setTicketOpen(true); setTicketError(null); }}
                    className="w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-[var(--color-cream)] font-heading"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span className="ms-2">{t.newTicket}</span>
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {ticketError && <ErrorNote msg={ticketError} />}
                    <div>
                      <Label htmlFor="cp-subject" className="font-body text-sm text-[var(--color-navy)]/70">
                        {t.subject}
                      </Label>
                      <Input
                        id="cp-subject"
                        name="subject"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        maxLength={300}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cp-body" className="font-body text-sm text-[var(--color-navy)]/70">
                        {t.ticketBody}
                      </Label>
                      <Textarea
                        id="cp-body"
                        name="body"
                        value={ticketBody}
                        onChange={(e) => setTicketBody(e.target.value)}
                        rows={5}
                        maxLength={5000}
                        className="mt-1.5 resize-none"
                      />
                      <p className="font-body text-xs text-[var(--color-navy)]/40 mt-1 text-end">
                        {ticketBody.length} / 5000
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => void submitTicket()}
                        disabled={ticketSending}
                        className="flex-1 bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-[var(--color-cream)] font-heading"
                      >
                        {ticketSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        <span className="ms-2">{t.send}</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => { setTicketOpen(false); setTicketError(null); }}
                      >
                        {t.cancel}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {tickets.length === 0 ? (
                <EmptyState icon={MessageSquarePlus} msg={t.noTickets} />
              ) : (
                tickets.map((tk) => (
                  <div key={tk.id} className="bg-white border border-[var(--color-border)] p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-heading text-sm font-semibold text-[var(--color-navy)] min-w-0">
                        {tk.subject ?? "—"}
                      </h3>
                      <span
                        className={`shrink-0 px-2 py-1 text-[11px] font-body ${
                          tk.status === "مُجابة"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {tk.status === "مُجابة" ? t.ticketReplied : t.ticketProcessing}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap font-body text-xs text-[var(--color-navy)]/50">
                      {tk.ticket_ref && <span dir="ltr">{tk.ticket_ref}</span>}
                      <span>{fmtDate(tk.created_at, l)}</span>
                      {tk.channel && <span>{trChannel(tk.channel, l)}</span>}
                    </div>
                    {tk.body && (
                      <p className="font-body text-sm text-[var(--color-navy)]/70 mt-3 whitespace-pre-wrap">
                        {tk.body}
                      </p>
                    )}
                    {tk.final_reply && (
                      <div className="mt-4 p-4 bg-green-50 border-s-4 border-green-500">
                        <p className="font-heading text-xs font-semibold text-green-800 mb-1">
                          {t.trusteeReply}
                        </p>
                        <p className="font-body text-sm text-green-900 whitespace-pre-wrap">
                          {tk.final_reply}
                        </p>
                        {tk.replied_at && (
                          <p className="font-body text-[11px] text-green-700/70 mt-2">
                            {fmtDate(tk.replied_at, l)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ─── تبويب التصويت ─── */}
          {tab === "vote" && !loading && (
            <div className="space-y-4">
              {votes.map((v) => (
                <div key={v.id} className="bg-white border border-[var(--color-border)] p-5 md:p-6">
                  <h2 className="font-heading text-base font-bold text-[var(--color-navy)]">{v.title}</h2>
                  {v.debtor_name && (
                    <p className="font-body text-xs text-[var(--color-navy)]/50 mt-0.5">{v.debtor_name}</p>
                  )}
                  {v.description && (
                    <p className="font-body text-sm text-[var(--color-navy)]/70 mt-3 leading-relaxed whitespace-pre-line">
                      {v.description}
                    </p>
                  )}

                  <div className="mt-4 border-t border-[var(--color-border)] pt-3 font-body text-xs text-[var(--color-navy)]/60">
                    <span className="font-semibold">{t.voteWindow}:</span>{" "}
                    <span dir="ltr">{fmtDateTime(v.opens_at, l)}</span>
                    {" — "}
                    <span dir="ltr">{fmtDateTime(v.closes_at, l)}</span>
                  </div>

                  {!v.eligible ? (
                    <div className="mt-4 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 px-4 py-3 font-body text-sm text-[var(--color-navy)]/75">
                      {t.voteNotEligible}
                    </div>
                  ) : (
                    <>
                      {v.proposal_url && (
                        <div className="mt-4">
                          <a
                            href={v.proposal_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-[var(--color-navy)] px-4 py-2 font-body text-sm text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy)] hover:text-[var(--color-cream)]"
                          >
                            <Eye className="w-4 h-4" />
                            {t.voteViewProposal}
                          </a>
                          <p className="font-body text-xs text-[var(--color-navy)]/45 mt-2 leading-relaxed">
                            {t.voteConfidential}
                          </p>
                        </div>
                      )}

                      {v.my_vote ? (
                        <div className="mt-4 border border-emerald-300 bg-emerald-50 px-4 py-3">
                          <p className="font-body text-sm font-semibold text-emerald-800 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {t.voteDone(v.my_vote.choice)}
                          </p>
                          <p className="font-body text-xs text-emerald-700/70 mt-1" dir="ltr">
                            {fmtDateTime(v.my_vote.voted_at, l)}
                          </p>
                        </div>
                      ) : v.open ? (
                        <div className="mt-4">
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              onClick={() => void castVote(v.id, "موافقة")}
                              disabled={loading}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white font-heading"
                            >
                              {t.voteApprove}
                            </Button>
                            <Button
                              onClick={() => void castVote(v.id, "عدم الموافقة")}
                              disabled={loading}
                              className="bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-[var(--color-cream)] font-heading"
                            >
                              {t.voteReject}
                            </Button>
                          </div>
                          <p className="font-body text-xs text-[var(--color-navy)]/45 mt-2 text-center">
                            {t.voteFinal}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-3 font-body text-sm text-[var(--color-navy)]/60">
                          {new Date(v.server_time) < new Date(v.opens_at) ? t.voteOpensIn : t.voteClosed}
                        </div>
                      )}
                    </>
                  )}

                  {v.result && (
                    <div className="mt-4 border-t border-[var(--color-border)] pt-3">
                      <span className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                        {t.voteResult}:
                      </span>{" "}
                      <span className="font-body text-sm text-[var(--color-navy)]/75">{v.result}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ─── تبويب البيانات ─── */}
          {tab === "profile" && !loading && (
            <div className="bg-white border border-[var(--color-border)] p-5 md:p-6">
              <h2 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[var(--color-gold)]" />
                {t.contactData}
              </h2>
              {!creditor ? (
                <EmptyState icon={User} msg={t.noClaims} />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label={t.fName} value={creditor.name} />
                    <Field label={t.fIdNumber} value={creditor.id_number} ltr />
                    <Field label={t.fPhone} value={creditor.phone} ltr />
                    <Field label={t.fPhoneAlt} value={creditor.phone_alt} ltr />
                    <Field label={t.fEmail} value={creditor.email} ltr />
                    <Field label={t.fCity} value={creditor.city} />
                    <Field label={t.fAddress} value={creditor.address ?? creditor.street_name} />
                    <Field label={t.fRep} value={creditor.representative_name} />
                  </div>
                  <p className="font-body text-xs text-[var(--color-navy)]/40 mt-6 pt-4 border-t border-[var(--color-border)] leading-relaxed">
                    {t.editHint}
                  </p>
                </>
              )}
            </div>
          )}

          <p className="font-body text-xs text-[var(--color-navy)]/40 mt-6 text-center">
            {t.sessionNote}
          </p>
        </div>
      </section>
    </>
  );
}

// ============================================================
// مكوّنات فرعية
// ============================================================

function ErrorNote({ msg }: { msg: string }) {
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-start gap-2">
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
      <p className="font-body text-sm text-red-700">{msg}</p>
    </div>
  );
}

function EmptyState({ icon: Icon, msg }: { icon: typeof FileText; msg: string }) {
  return (
    <div className="bg-white border border-[var(--color-border)] p-10 text-center">
      <Icon className="w-10 h-10 text-[var(--color-navy)]/20 mx-auto mb-3" />
      <p className="font-body text-sm text-[var(--color-navy)]/50">{msg}</p>
    </div>
  );
}

function Field({ label, value, ltr }: { label: string; value?: string | null; ltr?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="font-body text-xs text-[var(--color-navy)]/50">{label}</p>
      <p
        className="font-body text-sm text-[var(--color-navy)] mt-0.5 break-words"
        dir={ltr ? "ltr" : undefined}
      >
        {value || "—"}
      </p>
    </div>
  );
}

function ClaimCard({
  claim,
  t,
  lang,
  isRTL,
}: {
  claim: Claim;
  t: Strings;
  lang: Lang;
  isRTL: boolean;
}) {
  const docs = claim.documents ?? [];
  return (
    <div className="bg-white border border-[var(--color-border)] p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {claim.claim_ref && (
              <span className="px-2 py-1 bg-[var(--color-navy)] text-[var(--color-gold)] font-mono text-[11px]" dir="ltr">
                {claim.claim_ref}
              </span>
            )}
            {claim.claim_type && (
              <span className="px-2 py-1 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-[11px] text-[var(--color-navy)]/70">
                {trClaimType(claim.claim_type, lang)}
              </span>
            )}
            {claim.status && (
              <span className="px-2 py-1 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-[11px] text-[var(--color-navy)]/70">
                {trStatus(claim.status, lang)}
              </span>
            )}
          </div>
          <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mt-2 truncate">
            {claim.case?.debtor_name ?? "—"}
          </h3>
          {claim.case && (
            <p className="font-body text-xs text-[var(--color-navy)]/50 mt-0.5">
              {claim.case.case_number ?? "—"}
              {claim.case.court_name ? ` · ${claim.case.court_name}` : ""}
            </p>
          )}
        </div>
        <div className={isRTL ? "text-start shrink-0" : "text-end shrink-0"}>
          <p className="font-body text-[11px] text-[var(--color-navy)]/50">{t.amount}</p>
          <p className="font-display text-lg font-bold text-[var(--color-navy)]">
            {fmtCurrency(claim.claim_amount, lang)}
          </p>
        </div>
      </div>

      <ClaimStepper stage={claim.claim_stage ?? 1} lang={lang} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-5 pt-4 border-t border-[var(--color-border)]">
        <Field label={t.colSubmitted} value={fmtDate(claim.submitted_at, lang)} />
        {claim.case?.procedure_type && (
          <Field label={t.colProcedure} value={trProcedure(claim.case.procedure_type, lang)} />
        )}
        {claim.due_date && <Field label={t.deadline} value={fmtDate(claim.due_date, lang)} />}
        {claim.claim_reason && <Field label={t.colClaimType} value={claim.claim_reason} />}
      </div>

      {docs.length > 0 && (
        <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
          <p className="font-heading text-xs font-semibold text-[var(--color-navy)] mb-2">{t.myDocs}</p>
          <div className="space-y-1.5">
            {docs.map((d, i) => {
              const Icon = docIconFor(d);
              return (
                <a
                  key={i}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-[var(--color-cream)] hover:bg-[var(--color-border)]/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[var(--color-navy)]/50 shrink-0" />
                  <span className="font-body text-xs text-[var(--color-navy)]/70 truncate flex-1 min-w-0">
                    {docLabel(d, i, t, lang)}
                  </span>
                  <Eye className="w-3.5 h-3.5 text-[var(--color-gold)] shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ClaimStepper({ stage, lang }: { stage: number; lang: Lang }) {
  return (
    <div className="overflow-x-auto pb-2 -mx-1 px-1">
      <div className="flex items-start min-w-[340px]">
        {CLAIM_STAGES.map((s, idx) => {
          const done = s.id < stage;
          const current = s.id === stage;
          const isLast = idx === CLAIM_STAGES.length - 1;

          const circle = done
            ? "bg-green-500 text-white border-green-500"
            : current
              ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)] ring-4 ring-[var(--color-gold)]/20"
              : "bg-white text-[var(--color-navy)]/30 border-[var(--color-border)]";
          const line = done ? "bg-green-500" : "bg-[var(--color-border)]";
          const text = done
            ? "text-green-700"
            : current
              ? "text-[var(--color-gold)] font-bold"
              : "text-[var(--color-navy)]/40";

          return (
            <div key={s.id} className={`relative ${isLast ? "flex-none" : "flex-1"}`}>
              <div className="flex items-start">
                <div className="flex flex-col items-center w-[52px] shrink-0 relative z-10">
                  <div className={`w-8 h-8 rounded-full border-2 ${circle} flex items-center justify-center`}>
                    {done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : current ? (
                      <span className="text-sm">{s.icon}</span>
                    ) : (
                      <span className="text-xs opacity-50">{s.id}</span>
                    )}
                  </div>
                  <p className={`text-[9px] font-heading text-center leading-tight mt-1.5 ${text}`}>
                    {stageName(s.id, lang)}
                  </p>
                </div>
                {!isLast && <div className={`flex-1 h-0.5 ${line} mt-4`} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
