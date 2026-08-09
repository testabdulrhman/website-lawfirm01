/**
 * وسيط الحجز — redwan.sa/appointments  ←→  دالة booking في نظام CRM
 *
 * لماذا وسيط ولا نداء مباشر من المتصفح:
 *  1. مفتاح CRM لا يصل كود المتصفح إطلاقاً (يبقى في متغيرات بيئة Netlify).
 *  2. rate limiting و honeypot لا يمكن فرضهما في الواجهة.
 *  3. لا يعرف الزائر أن المكتب يشغّل مشروع Supabase ثانياً.
 *
 * ⚠️ لا يُخزَّن عنوان IP خاماً — يُجزَّأ (SHA-256 مع ملح) للعدّ في الذاكرة فقط،
 *    ويُنسى عند إعادة تشغيل النسخة. لا كتابة IP في أي قاعدة بيانات.
 *
 * ⚠️ كل حسابات التوقيت في الـCRM بتوقيت الرياض. هذه الدالة لا تحسب وقتاً
 *    ولا تعتمد على توقيت خادم Netlify.
 */
import { createHash, randomUUID } from 'node:crypto';

// أنواع Netlify معرّفة محلياً — نتجنّب إضافة @netlify/functions كاعتمادية
// جديدة لملف واحد، ويبقى الملف مشمولاً بـ `pnpm run check`.
interface HandlerEvent {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
}
interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}
type Handler = (event: HandlerEvent) => Promise<HandlerResponse>;

const CRM_URL = process.env.CRM_SUPABASE_URL ?? '';
const CRM_KEY = process.env.CRM_SUPABASE_ANON_KEY ?? '';
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? '';
const IP_SALT = process.env.BOOKING_IP_SALT ?? 'redwan-booking';

const CORS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const json = (body: unknown, statusCode = 200) => ({
  statusCode,
  headers: CORS,
  body: JSON.stringify(body),
});

// ── rate limiting داخل الذاكرة ────────────────────────────────────────────
// ⚠️ لكل نسخة Lambda عدّادها؛ هذا حاجز ضد السكربتات البسيطة لا ضد هجوم موزّع.
//    الحماية الجادة تأتي من Turnstile عند تفعيله.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BOOKINGS = 3; // ٣ محاولات حجز لكل ١٠ دقائق
const MAX_READS = 60; // ٦٠ قراءة توافر لكل ١٠ دقائق
const hits = new Map<string, number[]>();

function rateLimited(bucket: string, max: number): boolean {
  const now = Date.now();
  const list = (hits.get(bucket) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(bucket, list);
  if (hits.size > 5000) hits.clear(); // سقف ذاكرة
  return list.length > max;
}

const hashIp = (ip: string): string =>
  createHash('sha256').update(IP_SALT + ip).digest('hex').slice(0, 16);

function clientIp(event: HandlerEvent): string {
  const fwd = event.headers['x-nf-client-connection-ip'] ?? event.headers['x-forwarded-for'] ?? '';
  return String(fwd).split(',')[0].trim() || 'unknown';
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // غير مفعّل — يُتجاوز
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

async function callCrm(payload: Record<string, unknown>) {
  const res = await fetch(`${CRM_URL}/functions/v1/booking`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CRM_KEY}`,
      apikey: CRM_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({ error: 'رد غير مفهوم من النظام' }));
  return { status: res.status, data };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return json({ error: 'POST only' }, 405);

  if (!CRM_URL || !CRM_KEY)
    return json({ error: 'نظام الحجز غير مهيّأ على الخادم. اتصل بالمكتب مباشرة.' }, 503);

  let body: Record<string, any>;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return json({ error: 'طلب غير صالح' }, 400);
  }

  const action = String(body.action ?? '');
  const ipKey = hashIp(clientIp(event));

  // ── قراءة: الإعدادات والأوقات المتاحة ──────────────────────────────────
  if (action === 'config' || action === 'slots') {
    if (rateLimited(`r:${ipKey}`, MAX_READS))
      return json({ error: 'طلبات كثيرة جداً. انتظر قليلاً ثم أعد المحاولة.' }, 429);

    try {
      const { status, data } = await callCrm({
        action,
        date: body.date,
        service: body.service,
      });
      return json(data, status);
    } catch {
      return json({ error: 'تعذّر الوصول لنظام المواعيد. حاول بعد قليل أو اتصل بالمكتب.' }, 502);
    }
  }

  // ── كتابة: تنفيذ الحجز ─────────────────────────────────────────────────
  if (action === 'book') {
    if (rateLimited(`w:${ipKey}`, MAX_BOOKINGS))
      return json(
        { error: 'تجاوزت عدد محاولات الحجز المسموح بها. حاول بعد قليل أو اتصل بالمكتب.' },
        429
      );

    // (1) مصيدة: حقل مخفي لا يملؤه إلا الروبوت
    if (String(body.website ?? '').trim() !== '') {
      // نُظهر نجاحاً كاذباً حتى لا يتعلّم الروبوت أنه انكشف
      return json({ ok: true, reference_no: 'APT-000000-XXXX', date: body.date, time: body.time });
    }

    // (2) زمن التعبئة: إنسان لا يُتم النموذج في أقل من ٤ ثوانٍ
    const elapsed = Number(body.elapsed_ms ?? 0);
    if (!Number.isFinite(elapsed) || elapsed < 4000)
      return json({ error: 'تعذّر التحقق من الطلب. أعد المحاولة.' }, 400);

    // (3) Turnstile (يُتجاوز تلقائياً ما لم يُضبط TURNSTILE_SECRET_KEY)
    if (TURNSTILE_SECRET) {
      const ok = await verifyTurnstile(String(body.turnstile_token ?? ''), clientIp(event));
      if (!ok) return json({ error: 'فشل التحقق من أنك لست روبوتاً. أعد المحاولة.' }, 403);
    }

    try {
      // التحقق الكامل من البيانات يتم في دالة CRM (مصدر الحقيقة) — لا نكرره هنا.
      const { status, data } = await callCrm({
        action: 'book',
        name: body.name,
        phone: body.phone,
        email: body.email,
        company: body.company,
        service: body.service,
        method: body.method,
        date: body.date,
        time: body.time,
        notes: body.notes,
        consent: body.consent,
        idempotency_key: String(body.idempotency_key ?? '') || randomUUID(),
        source: 'website',
      });
      return json(data, status);
    } catch {
      return json(
        { error: 'تعذّر الاتصال بنظام المواعيد ولم يُحفظ الحجز. حاول بعد قليل أو اتصل بالمكتب.' },
        502
      );
    }
  }

  return json({ error: 'إجراء غير معروف' }, 400);
};
