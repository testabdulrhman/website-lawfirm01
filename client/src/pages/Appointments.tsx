/**
 * حجز موعد استشارة — redwan.sa/appointments
 *
 * ⚠️ كل الأوقات المعروضة تأتي من نظام الـCRM لحظياً عبر
 *    /.netlify/functions/booking — لا توجد أوقات ثابتة في هذا الملف.
 *
 * ⚠️ التوقيت: التواريخ والأوقات كلها بتوقيت الرياض (Asia/Riyadh) كما يحسبها
 *    الخادم. لا نستخدم Date محلياً لتحديد «اليوم» ولا نعتمد توقيت المتصفح.
 *
 * ⚠️ SSR: المحتوى الثابت (العنوان، الشرح، الخطوات، الخدمات كمحتوى نصي) يظهر
 *    في HTML الناتج من prerender. التقويم وحده يُحمّل بعد التفاعل.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  Calendar,
  CalendarCheck,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Video,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

import { useSEO, schemas } from '@/hooks/useSEO';
import { useTranslation } from '@/hooks/useTranslation';
import { localePath } from '@/lib/localePath';
import {
  trackBookingStart,
  trackBookingSlotSelected,
  trackBookingSubmit,
  trackBookingSuccess,
  trackBookingError,
} from '@/lib/analytics';

// ────────────────────────────────────────────────────────────── الأنواع
interface Service {
  key: string;
  name: string;
  duration: number;
  methods: string[];
}
interface DayInfo {
  date: string;
  count: number;
}
type MeetingMethod = 'remote' | 'onsite';

const METHOD_LABEL: Record<MeetingMethod, string> = {
  remote: 'عن بُعد',
  onsite: 'حضوري في مقر المكتب',
};

const ENDPOINT = '/.netlify/functions/booking';

// ────────────────────────────────────────────────────────── أدوات التاريخ
// ⚠️ نبني YYYY-MM-DD من المكوّنات المحلية لا من toISOString: الأخيرة تُرجع يوماً
//    للخلف في المناطق موجبة الإزاحة (الرياض UTC+3).
const isoOf = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const HIJRI = 'ar-SA-u-ca-islamic-umalqura-nu-latn';
const GREG = 'ar-SA-u-nu-latn-ca-gregory';

// ⚠️ Intl يضيف «هـ» بنفسه — ننزعها ثم نضيفها مرة واحدة (تفادياً لـ«1448 هـ هـ»)
const hijriMonth = (d: Date) =>
  new Intl.DateTimeFormat(HIJRI, { month: 'long', year: 'numeric' })
    .format(d)
    .replace(/\s*هـ\s*$/, '');
const hijriFull = (d: Date) =>
  new Intl.DateTimeFormat(HIJRI, { day: 'numeric', month: 'long', year: 'numeric' })
    .format(d)
    .replace(/\s*هـ\s*$/, '') + ' هـ';
const gregFull = (d: Date) =>
  new Intl.DateTimeFormat(GREG, { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
const weekdayOf = (d: Date) => new Intl.DateTimeFormat(GREG, { weekday: 'long' }).format(d);

const to12h = (t: string): string => {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'م' : 'ص';
  const hh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hh}:${String(m).padStart(2, '0')} ${period}`;
};

const WEEKDAYS = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const STEPS = ['الخدمة', 'طريقة الاجتماع', 'اليوم', 'الوقت', 'بياناتك', 'المراجعة'];

// نص ثابت يظهر في SSR — الخدمات الفعلية تأتي من الـCRM بعد التحميل
const SERVICES_FALLBACK_TEXT = [
  'أعمال المحاماة',
  'أعمال إفلاس',
  'التوثيق والتسجيل العيني',
  'أخرى',
];

export default function Appointments() {
  const { lang } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  // ───────────────────────────────────────────────────────────────── SEO
  const seoSchema = useMemo(
    () => [
      schemas.breadcrumb([
        { name: 'الرئيسية', url: '/' },
        { name: 'حجز موعد', url: '/appointments' },
      ]),
      schemas.faqPage([
        {
          question: 'كيف أحجز موعد استشارة مع المكتب؟',
          answer:
            'اختر نوع الخدمة وطريقة الاجتماع ثم اليوم والوقت المتاح، وأدخل بياناتك وأكّد الحجز. يصلك رقم مرجعي فور نجاح الحجز.',
        },
        {
          question: 'هل الاستشارة متاحة عن بُعد؟',
          answer:
            'نعم، أعمال المحاماة وأعمال الإفلاس متاحة عن بُعد أو حضورياً في مقر المكتب ببريدة. التوثيق والتسجيل العيني حضوري فقط. تُرسل تعليمات الاجتماع عن بُعد من المكتب قبل الموعد.',
        },
        {
          question: 'ما أوقات العمل المتاحة للحجز؟',
          answer:
            'المواعيد المعروضة في الصفحة هي الأوقات الشاغرة فعلياً بتوقيت السعودية (الرياض)، وتُحدَّث لحظياً من نظام المكتب.',
        },
        {
          question: 'ماذا لو رغبت في تعديل الموعد أو إلغائه؟',
          answer:
            'تواصل مع المكتب على الرقم الموحد 920032760 مع ذكر الرقم المرجعي الذي وصلك عند الحجز.',
        },
      ]),
    ],
    []
  );

  useSEO({
    title: 'حجز موعد استشارة قانونية',
    description:
      'احجز موعد استشارة قانونية مع شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس — اختر الخدمة وطريقة الاجتماع والوقت المتاح، حضورياً في بريدة أو عن بُعد.',
    canonical: '/appointments',
    schema: seoSchema,
  });

  // ─────────────────────────────────────────────────────────────── الحالة
  const [services, setServices] = useState<Service[]>([]);
  const [loadingCfg, setLoadingCfg] = useState(true);
  const [cfgError, setCfgError] = useState<string | null>(null);

  const [service, setService] = useState<Service | null>(null);
  const [method, setMethod] = useState<MeetingMethod | null>(null);

  const [days, setDays] = useState<DayInfo[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);

  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [time, setTime] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // مصيدة — يبقى فارغاً لدى البشر

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const startedAt = useRef<number>(0);
  const idemKey = useRef<string>('');
  const startedTracked = useRef(false);

  // مفتاح إخماد التكرار: ثابت لكل محاولة حجز، ويُجدَّد بعد النجاح فقط
  useEffect(() => {
    startedAt.current = Date.now();
    idemKey.current =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }, []);

  // ─────────────────────────────────────────── الخطوة الحالية (للمؤشر)
  const step = !service ? 0 : !method ? 1 : !date ? 2 : !time ? 3 : 4;

  // ───────────────────────────────────────────── جلب الإعدادات والخدمات
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'config' }),
        });
        const data = await res.json();
        if (!alive) return;
        if (!res.ok || data.error) throw new Error(data.error || 'تعذّر جلب الخدمات');
        setServices(data.services ?? []);
      } catch (e) {
        if (alive)
          setCfgError(
            e instanceof Error && e.message
              ? e.message
              : 'تعذّر الاتصال بنظام المواعيد. حاول بعد قليل أو اتصل بالمكتب.'
          );
      } finally {
        if (alive) setLoadingCfg(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ────────────────────────── جلب الأيام المتاحة بعد اختيار الخدمة والطريقة
  useEffect(() => {
    if (!service || !method) return;
    let alive = true;
    setLoadingDays(true);
    setDate(null);
    setTime(null);
    (async () => {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'slots', service: service.key }),
        });
        const data = await res.json();
        if (!alive) return;
        if (!res.ok || data.error) throw new Error(data.error || 'تعذّر جلب الأيام المتاحة');
        setDays(data.days ?? []);
      } catch (e) {
        if (alive)
          setError(e instanceof Error ? e.message : 'تعذّر جلب الأيام المتاحة. حاول بعد قليل.');
      } finally {
        if (alive) setLoadingDays(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [service, method]);

  // ─────────────────────────────────────────── جلب أوقات اليوم المختار
  useEffect(() => {
    if (!date || !service) return;
    let alive = true;
    setLoadingSlots(true);
    setTime(null);
    (async () => {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'slots', date, service: service.key }),
        });
        const data = await res.json();
        if (!alive) return;
        if (!res.ok || data.error) throw new Error(data.error || 'تعذّر جلب الأوقات');
        setSlots(data.slots ?? []);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : 'تعذّر جلب الأوقات. حاول بعد قليل.');
      } finally {
        if (alive) setLoadingSlots(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [date, service]);

  // ────────────────────────────────────────────────────── شبكة الشهر
  const availableSet = useMemo(() => new Set(days.map((d) => d.date)), [days]);

  const monthGrid = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    base.setMonth(base.getMonth() + monthOffset);
    const year = base.getFullYear();
    const month = base.getMonth();
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return { cells, label: base };
  }, [monthOffset]);

  // ────────────────────────────────────────────────────── تأكيد الحجز
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneValid = /^(?:0?5\d{8}|9665\d{8}|009665\d{8})$/.test(phoneDigits);
  const emailValid = email.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const canSubmit =
    !!service && !!method && !!date && !!time && name.trim().length >= 3 && phoneValid && emailValid && consent;

  const submit = async () => {
    // تحقق مسبق برسائل محددة — لا رسالة عامة
    if (name.trim().length < 3) return setFieldError('اكتب اسمك الكامل (٣ أحرف على الأقل).');
    if (!phoneValid) return setFieldError('رقم الجوال غير صحيح — أدخل رقم جوال سعودي مثل 0512345678.');
    if (!emailValid) return setFieldError('البريد الإلكتروني غير صحيح.');
    if (!consent) return setFieldError('الرجاء الموافقة على سياسة الخصوصية قبل التأكيد.');

    setFieldError(null);
    setError(null);
    setSaving(true);
    trackBookingSubmit(service!.key, method!);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'book',
          name: name.trim(),
          phone: phoneDigits,
          email: email.trim(),
          company: company.trim(),
          service: service!.key,
          method,
          date,
          time,
          notes: notes.trim(),
          consent: true,
          website: honeypot, // المصيدة
          elapsed_ms: Date.now() - startedAt.current,
          idempotency_key: idemKey.current,
        }),
      });
      const data = await res.json();

      if (res.status === 409) {
        // الوقت اختُطف أثناء التعبئة — نُحدّث الأوقات ونُرجع المستخدم لاختيار وقت
        trackBookingError('slot_taken');
        setTime(null);
        setSlots(data.slots ?? []);
        setError(data.error || 'حُجز هذا الوقت للتو. اختر وقتاً آخر من القائمة المحدّثة.');
        return;
      }
      if (!res.ok || data.error) {
        trackBookingError(res.status === 429 ? 'rate_limited' : 'server_error');
        setError(data.error || 'تعذّر إتمام الحجز. حاول بعد قليل أو اتصل بالمكتب.');
        return;
      }

      trackBookingSuccess(service!.key, method!);
      // ⚠️ لا بيانات شخصية في الرابط — نمرّر الملخص عبر sessionStorage فقط
      sessionStorage.setItem(
        'redwan_booking_result',
        JSON.stringify({
          reference_no: data.reference_no,
          date: data.date,
          time: data.time,
          service_name: service!.name,
          method,
          duration: data.duration_minutes ?? service!.duration,
        })
      );
      window.location.assign(lp('/appointments/success'));
    } catch {
      trackBookingError('network');
      setError('تعذّر الاتصال بنظام المواعيد ولم يُحفَظ الحجز. حاول بعد قليل أو اتصل بالمكتب.');
    } finally {
      setSaving(false);
    }
  };

  const onFirstInteraction = () => {
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackBookingStart();
    }
  };

  const selectedDateObj = date ? new Date(`${date}T00:00:00`) : null;

  // ═══════════════════════════════════════════════════════════ العرض
  return (
    <>
      {/* Hero — Navy */}
      <section className="bg-[var(--color-navy)] pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Link
              href={lp('/')}
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              الرئيسية
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-xs text-[var(--color-gold)]">حجز موعد</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--color-gold)]">
              <CalendarCheck className="h-6 w-6 text-[var(--color-navy)]" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                حجز موعد استشارة قانونية
              </h1>
              <p className="font-body text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
                اختر الخدمة وطريقة الاجتماع والوقت الذي يناسبك. الأوقات المعروضة شاغرة فعلياً
                بتوقيت السعودية، ويصلك رقم مرجعي فور تأكيد الحجز.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الحاجز الزمني — يظهر في SSR */}
      <section className="bg-white py-6 border-b border-black/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-heading text-xs text-[var(--color-navy)]/70">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--color-gold)]" />
              جميع الأوقات بتوقيت السعودية (الرياض)
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
              بريدة — طريق الملك عبدالله، حي الأفق
            </span>
            <span className="flex items-center gap-2">
              <Video className="h-4 w-4 text-[var(--color-gold)]" />
              حضورياً أو عن بُعد
            </span>
          </div>
        </div>
      </section>

      {/* النموذج — Cream */}
      <section className="bg-[var(--color-cream)] py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* مؤشر الخطوات */}
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-8" aria-label="خطوات الحجز">
              {STEPS.map((label, i) => (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center font-heading text-xs font-semibold transition-colors ${
                      i < step
                        ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                        : i === step
                          ? 'bg-[var(--color-navy)] text-white'
                          : 'bg-black/5 text-[var(--color-navy)]/40'
                    }`}
                  >
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span
                    className={`font-heading text-xs ${
                      i <= step ? 'text-[var(--color-navy)]' : 'text-[var(--color-navy)]/40'
                    }`}
                  >
                    {label}
                  </span>
                  {i < STEPS.length - 1 && <span className="text-[var(--color-navy)]/20">—</span>}
                </li>
              ))}
            </ol>

            {/* خطأ عام */}
            {(error || cfgError) && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 border-r-2 border-[var(--color-gold)] bg-white p-4"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <p className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                    {cfgError ? 'تعذّر تحميل نظام المواعيد' : 'تعذّر إتمام الحجز'}
                  </p>
                  <p className="font-body text-sm text-[var(--color-navy)]/70 mt-1">
                    {cfgError || error}
                  </p>
                  <p className="font-body text-xs text-[var(--color-navy)]/60 mt-2">
                    للحجز الفوري:{' '}
                    <a href="tel:920032760" className="text-[var(--color-gold)] hover:underline">
                      920032760
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* ١) الخدمة */}
            <FormBlock num={1} title="نوع الخدمة" done={!!service}>
              {services.length === 0 ? (
                /* ⚠️ حالة ما قبل التحميل و SSR: القائمة تظهر نصاً في HTML الناتج
                   (المصدر الحقيقي يبقى إعدادات الـCRM — هذه أسماء للعرض فقط) */
                <ul className="grid gap-2 sm:grid-cols-2">
                  {SERVICES_FALLBACK_TEXT.map((s) => (
                    <li
                      key={s}
                      className={`border border-black/10 bg-white/60 p-3 font-body text-sm text-[var(--color-navy)]/60 ${
                        loadingCfg ? 'animate-pulse' : ''
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => {
                        onFirstInteraction();
                        setService(s);
                        setMethod(s.methods.length === 1 ? (s.methods[0] as MeetingMethod) : null);
                      }}
                      className={`flex items-center justify-between gap-2 border p-3 text-right transition-colors ${
                        service?.key === s.key
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                          : 'border-black/10 bg-white hover:border-[var(--color-navy)]/30'
                      }`}
                    >
                      <span className="font-body text-sm text-[var(--color-navy)]">{s.name}</span>
                      <span className="font-heading text-xs text-[var(--color-navy)]/50 shrink-0">
                        {s.duration} د
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </FormBlock>

            {/* ٢) طريقة الاجتماع */}
            {service && (
              <FormBlock num={2} title="طريقة الاجتماع" done={!!method}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(service.methods as MeetingMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`flex items-center gap-3 border p-3 text-right transition-colors ${
                        method === m
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                          : 'border-black/10 bg-white hover:border-[var(--color-navy)]/30'
                      }`}
                    >
                      {m === 'remote' ? (
                        <Video className="h-4 w-4 text-[var(--color-gold)]" />
                      ) : (
                        <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
                      )}
                      <span className="font-body text-sm text-[var(--color-navy)]">
                        {METHOD_LABEL[m]}
                      </span>
                    </button>
                  ))}
                </div>
                {method === 'remote' && (
                  <p className="mt-3 font-body text-xs text-[var(--color-navy)]/60">
                    تُرسل لك تعليمات الاجتماع عن بُعد من المكتب قبل الموعد.
                  </p>
                )}
              </FormBlock>
            )}

            {/* ٣) اليوم */}
            {service && method && (
              <FormBlock num={3} title="اختر اليوم" done={!!date}>
                <div className="border border-black/10 bg-white">
                  <div className="flex items-center justify-between border-b border-black/5 p-3">
                    <button
                      type="button"
                      onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
                      disabled={monthOffset === 0}
                      aria-label="الشهر السابق"
                      className="p-1 text-[var(--color-navy)]/60 disabled:opacity-25 hover:text-[var(--color-navy)]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="text-center">
                      <p className="font-heading text-sm font-semibold text-[var(--color-navy)]">
                        {hijriMonth(monthGrid.label)} هـ
                      </p>
                      <p className="font-body text-xs text-[var(--color-navy)]/50">
                        {new Intl.DateTimeFormat(GREG, { month: 'long', year: 'numeric' }).format(
                          monthGrid.label
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMonthOffset((m) => Math.min(2, m + 1))}
                      disabled={monthOffset >= 2}
                      aria-label="الشهر التالي"
                      className="p-1 text-[var(--color-navy)]/60 disabled:opacity-25 hover:text-[var(--color-navy)]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  </div>

                  {loadingDays ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="h-5 w-5 animate-spin text-[var(--color-navy)]/40" />
                    </div>
                  ) : (
                    <div className="p-1.5 sm:p-3">
                      <div className="mb-1 grid grid-cols-7 gap-0.5 sm:gap-1">
                        {WEEKDAYS.map((w) => (
                          <div
                            key={w}
                            className="py-1 text-center font-heading text-[10px] text-[var(--color-navy)]/40"
                          >
                            {w}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                        {monthGrid.cells.map((cell, i) => {
                          if (!cell) return <div key={`e${i}`} />;
                          const iso = isoOf(cell);
                          const open = availableSet.has(iso);
                          const active = date === iso;
                          return (
                            <button
                              key={iso}
                              type="button"
                              disabled={!open}
                              onClick={() => setDate(iso)}
                              aria-label={`${hijriFull(cell)} — ${gregFull(cell)}`}
                              className={`flex min-h-11 flex-col items-center justify-center py-2 transition-colors ${
                                active
                                  ? 'bg-[var(--color-navy)] text-white'
                                  : open
                                    ? 'bg-[var(--color-cream)] text-[var(--color-navy)] hover:bg-[var(--color-gold)]/25'
                                    : 'cursor-not-allowed text-[var(--color-navy)]/20'
                              }`}
                            >
                              <span className="font-heading text-sm font-semibold leading-none">
                                {new Intl.DateTimeFormat(HIJRI, { day: 'numeric' }).format(cell)}
                              </span>
                              <span className="mt-0.5 font-body text-[10px] leading-none opacity-60">
                                {cell.getDate()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-3 text-center font-body text-[11px] text-[var(--color-navy)]/45">
                        الرقم الكبير هجري (أم القرى) والصغير ميلادي — الأيام المتاحة فقط قابلة
                        للاختيار
                      </p>
                    </div>
                  )}
                </div>
              </FormBlock>
            )}

            {/* ٤) الوقت */}
            {date && (
              <FormBlock num={4} title="اختر الوقت" done={!!time}>
                {selectedDateObj && (
                  <p className="mb-3 font-body text-xs text-[var(--color-navy)]/60">
                    {weekdayOf(selectedDateObj)} — {hijriFull(selectedDateObj)} (
                    {gregFull(selectedDateObj)})
                  </p>
                )}
                {loadingSlots ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-5 w-5 animate-spin text-[var(--color-navy)]/40" />
                  </div>
                ) : slots.length === 0 ? (
                  <p className="border border-black/10 bg-white p-4 font-body text-sm text-[var(--color-navy)]/60">
                    لا توجد أوقات شاغرة في هذا اليوم. اختر يوماً آخر.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setTime(s);
                          trackBookingSlotSelected(service!.key);
                        }}
                        className={`border py-2.5 font-heading text-sm transition-colors ${
                          time === s
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold'
                            : 'border-black/10 bg-white text-[var(--color-navy)] hover:border-[var(--color-navy)]/30'
                        }`}
                      >
                        {to12h(s)}
                      </button>
                    ))}
                  </div>
                )}
              </FormBlock>
            )}

            {/* ٥) البيانات + ٦) المراجعة */}
            {time && (
              <FormBlock num={5} title="بياناتك" done={false}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="الاسم الكامل" required htmlFor="bk_name">
                    <input
                      id="bk_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="رقم الجوال" required htmlFor="bk_phone">
                    <input
                      id="bk_phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className={`${inputCls} text-right`}
                    />
                  </Field>
                  <Field label="البريد الإلكتروني (اختياري)" htmlFor="bk_email">
                    <input
                      id="bk_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputMode="email"
                      autoComplete="email"
                      dir="ltr"
                      className={`${inputCls} text-right`}
                    />
                  </Field>
                  <Field label="اسم المنشأة (اختياري)" htmlFor="bk_company">
                    <input
                      id="bk_company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                      className={inputCls}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="وصف مختصر للموضوع (اختياري)" htmlFor="bk_notes">
                      <textarea
                        id="bk_notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        maxLength={1000}
                        className={`${inputCls} resize-none`}
                      />
                    </Field>
                  </div>
                </div>

                {/* مصيدة الروبوتات — مخفية عن البشر وعن قارئات الشاشة */}
                <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                  <label htmlFor="bk_website">الموقع</label>
                  <input
                    id="bk_website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* الملخص */}
                <div className="mt-6 border border-[var(--color-navy)]/15 bg-white p-4">
                  <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]/50">
                    مراجعة الموعد
                  </p>
                  <dl className="grid gap-2 sm:grid-cols-2">
                    <Summary label="الخدمة" value={service!.name} />
                    <Summary label="طريقة الاجتماع" value={METHOD_LABEL[method!]} />
                    <Summary
                      label="اليوم"
                      value={
                        selectedDateObj
                          ? `${weekdayOf(selectedDateObj)} — ${hijriFull(selectedDateObj)}`
                          : '—'
                      }
                    />
                    <Summary
                      label="التاريخ الميلادي"
                      value={selectedDateObj ? gregFull(selectedDateObj) : '—'}
                    />
                    <Summary label="الوقت" value={`${to12h(time)} (بتوقيت الرياض)`} />
                    <Summary label="المدة" value={`${service!.duration} دقيقة`} />
                  </dl>
                </div>

                {/* الموافقة */}
                <label className="mt-4 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[var(--color-gold)]"
                  />
                  <span className="font-body text-sm text-[var(--color-navy)]/75">
                    أوافق على{' '}
                    <Link
                      href={lp('/privacy')}
                      className="text-[var(--color-gold)] underline underline-offset-2"
                    >
                      سياسة الخصوصية
                    </Link>{' '}
                    ومعالجة بياناتي لغرض حجز الموعد والتواصل بشأنه.
                  </span>
                </label>

                {fieldError && (
                  <p role="alert" className="mt-3 font-body text-sm text-[var(--color-gold)]">
                    {fieldError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submit}
                  disabled={saving || !canSubmit}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-navy)] px-6 py-4 font-heading text-base font-semibold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-navy-light)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جارٍ تأكيد الحجز…
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="h-4 w-4" />
                      تأكيد الحجز
                    </>
                  )}
                </button>
                <p className="mt-3 text-center font-body text-xs text-[var(--color-navy)]/50">
                  لا يُحجز الموعد إلا بعد ظهور الرقم المرجعي.
                </p>
              </FormBlock>
            )}
          </div>
        </div>
      </section>

      {/* بديل الحجز — Navy */}
      <section className="bg-[var(--color-navy)] py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
            تفضّل الحجز بالهاتف؟
          </h2>
          <p className="font-body text-sm text-white/60 mb-6">
            فريق المكتب يستقبل مكالماتكم خلال أوقات العمل الرسمية.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:920032760"
              className="inline-flex items-center gap-2 bg-[var(--color-gold)] px-6 py-3 font-heading text-sm font-medium text-[var(--color-navy)] transition-colors hover:bg-[var(--color-gold-light)] active:scale-[0.97]"
            >
              920032760
            </a>
            <Link
              href={lp('/contact')}
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 font-heading text-sm font-medium text-white transition-colors hover:border-white/60 active:scale-[0.97]"
            >
              صفحة التواصل
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────── مكوّنات مساعدة
const inputCls =
  'w-full border border-black/15 bg-white px-3 py-2.5 font-body text-sm text-[var(--color-navy)] outline-none transition-colors focus:border-[var(--color-gold)]';

function FormBlock({
  num,
  title,
  done,
  children,
}: {
  num: number;
  title: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mb-6 border border-black/10 bg-white/50 p-3 sm:p-4 md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`flex h-7 w-7 items-center justify-center font-heading text-xs font-bold ${
            done
              ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
              : 'bg-[var(--color-navy)] text-white'
          }`}
        >
          {done ? <Check className="h-4 w-4" /> : num}
        </span>
        <h2 className="font-heading text-base font-semibold text-[var(--color-navy)]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-heading text-xs font-medium text-[var(--color-navy)]/70"
      >
        {label}
        {required && <span className="text-[var(--color-gold)]"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="font-heading text-xs text-[var(--color-navy)]/50 shrink-0">{label}:</dt>
      <dd className="font-body text-sm text-[var(--color-navy)]">{value}</dd>
    </div>
  );
}

