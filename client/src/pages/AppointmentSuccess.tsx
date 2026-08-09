/**
 * تأكيد الحجز — redwan.sa/appointments/success  (noindex)
 *
 * ⚠️ لا تُمرَّر أي بيانات شخصية في الرابط. ملخص الموعد يُقرأ من sessionStorage
 *    الذي كتبته صفحة الحجز، ويُمسح بعد القراءة فلا يبقى بعد إغلاق التبويب.
 *
 * ⚠️ تحديث هذه الصفحة لا يُنشئ موعداً ثانياً — لا يوجد أي نداء شبكة هنا.
 */
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CalendarCheck, Copy, Check, Phone, ArrowRight } from 'lucide-react';

import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from '@/hooks/useTranslation';
import { localePath } from '@/lib/localePath';

interface BookingResult {
  reference_no: string;
  date: string;
  time: string;
  service_name: string;
  method: 'remote' | 'onsite';
  duration: number;
}

const HIJRI = 'ar-SA-u-ca-islamic-umalqura-nu-latn';
const GREG = 'ar-SA-u-nu-latn-ca-gregory';

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

export default function AppointmentSuccess() {
  const { lang } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  useSEO({
    title: 'تم تأكيد الموعد',
    description: 'تأكيد حجز موعد الاستشارة القانونية مع شركة عبدالرحمن رضوان المشيقح للمحاماة.',
    canonical: '/appointments/success',
    noindex: true,
  });

  const [result, setResult] = useState<BookingResult | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('redwan_booking_result');
      if (raw) setResult(JSON.parse(raw) as BookingResult);
    } catch {
      /* ملخص غير مقروء — نعرض الحالة البديلة */
    }
    setReady(true);
  }, []);

  const copyRef = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.reference_no);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* المتصفح منع النسخ — الرقم ظاهر للنسخ اليدوي */
    }
  };

  const dateObj = result ? new Date(`${result.date}T00:00:00`) : null;

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
            <Link
              href={lp('/appointments')}
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              حجز موعد
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-xs text-[var(--color-gold)]">تأكيد</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--color-gold)]">
              <CalendarCheck className="h-6 w-6 text-[var(--color-navy)]" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
                تم تأكيد موعدك
              </h1>
              <p className="font-body text-sm md:text-base text-white/60 max-w-2xl">
                نتشرّف باستقبالك. احتفظ بالرقم المرجعي لأي استفسار عن الموعد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* التفاصيل — Cream */}
      <section className="bg-[var(--color-cream)] py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {!ready ? (
              <div className="h-56 animate-pulse bg-black/5" />
            ) : result ? (
              <>
                {/* الرقم المرجعي */}
                <div className="border border-[var(--color-gold)]/40 bg-white p-6 text-center">
                  <p className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-navy)]/50">
                    الرقم المرجعي
                  </p>
                  <p
                    dir="ltr"
                    className="mt-2 font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]"
                  >
                    {result.reference_no}
                  </p>
                  <button
                    type="button"
                    onClick={copyRef}
                    className="mt-3 inline-flex items-center gap-2 border border-black/10 px-4 py-2 font-heading text-xs text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/40"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                        نُسخ
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        نسخ الرقم
                      </>
                    )}
                  </button>
                </div>

                {/* ملخص الموعد */}
                <dl className="mt-4 divide-y divide-black/5 border border-black/10 bg-white">
                  <Row label="الخدمة" value={result.service_name} />
                  <Row
                    label="طريقة الاجتماع"
                    value={result.method === 'remote' ? 'عن بُعد' : 'حضوري في مقر المكتب'}
                  />
                  <Row
                    label="اليوم"
                    value={dateObj ? `${weekdayOf(dateObj)} — ${hijriFull(dateObj)}` : '—'}
                  />
                  <Row label="التاريخ الميلادي" value={dateObj ? gregFull(dateObj) : '—'} />
                  <Row label="الوقت" value={`${to12h(result.time)} (بتوقيت الرياض)`} />
                  <Row label="المدة" value={`${result.duration} دقيقة`} />
                </dl>

                <div className="mt-4 border-r-2 border-[var(--color-gold)] bg-white p-4">
                  <p className="font-body text-sm text-[var(--color-navy)]/75 leading-relaxed">
                    {result.method === 'remote'
                      ? 'سيتواصل معك المكتب قبل الموعد لإرسال تعليمات الاجتماع عن بُعد.'
                      : 'مقر المكتب: طريق الملك عبدالله، حي الأفق، الدور الثاني، مكتب ١ — بريدة، القصيم.'}
                  </p>
                  <p className="mt-2 font-body text-sm text-[var(--color-navy)]/75">
                    لتعديل الموعد أو إلغائه اتصل على{' '}
                    <a href="tel:920032760" className="text-[var(--color-gold)] hover:underline">
                      920032760
                    </a>{' '}
                    مع ذكر الرقم المرجعي.
                  </p>
                </div>
              </>
            ) : (
              /* فتح الصفحة مباشرة بلا حجز */
              <div className="border border-black/10 bg-white p-8 text-center">
                <p className="font-heading text-base font-semibold text-[var(--color-navy)] mb-2">
                  لا يوجد ملخص حجز لعرضه
                </p>
                <p className="font-body text-sm text-[var(--color-navy)]/65 mb-6">
                  تُعرض تفاصيل الموعد هنا مباشرة بعد إتمام الحجز. إن كنت قد حجزت وأغلقت الصفحة،
                  فالموعد محفوظ لدينا — اتصل بالمكتب للاستعلام.
                </p>
                <Link
                  href={lp('/appointments')}
                  className="inline-flex items-center gap-2 bg-[var(--color-navy)] px-6 py-3 font-heading text-sm font-medium text-[var(--color-cream)] transition-colors hover:bg-[var(--color-navy-light)] active:scale-[0.97]"
                >
                  حجز موعد
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA — White */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-4">
            هل لديك استفسار قبل الموعد؟
          </h2>
          <a
            href="tel:920032760"
            className="inline-flex items-center gap-2 bg-[var(--color-gold)] px-6 py-3 font-heading text-sm font-medium text-[var(--color-navy)] transition-colors hover:bg-[var(--color-gold-light)] active:scale-[0.97]"
          >
            <Phone className="h-4 w-4" />
            920032760
          </a>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
      <dt className="font-heading text-xs text-[var(--color-navy)]/50">{label}</dt>
      <dd className="font-body text-sm text-[var(--color-navy)]">{value}</dd>
    </div>
  );
}
