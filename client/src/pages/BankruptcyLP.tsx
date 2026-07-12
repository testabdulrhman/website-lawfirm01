/**
 * صفحة هبوط (Landing Page) لإعلانات جوجل البحثية — خدمة الإفلاس.
 * الجمهور: المدين/المتعثّر الذي يريد حماية نظامية وإعادة تنظيم ديونه.
 * الهدف الوحيد: التحويل (اتصال مباشر + واتساب).
 *
 * هوية بصرية: كحلي (--color-navy) / ذهبي (--color-gold) / cream — RTL — عربي أساساً.
 * مبدأ التصميم: مسار واحد نحو التواصل، بلا قائمة علوية ولا تذييل مشتّت.
 * كل قسم يدفع الزائر خطوة نحو الاتصال أو الواتساب.
 */
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  ShieldCheck,
  Scale,
  HandCoins,
  CalendarClock,
  Ban,
  FileSearch,
  ClipboardCheck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  User,
  Send,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  trackPhoneClick,
  trackWhatsAppClick,
  trackContactFormSubmit,
} from "@/lib/analytics";

const PHONE_DISPLAY = "0505149800";
const PHONE_TEL = "+966505149800";
const WHATSAPP_MSG = encodeURIComponent(
  "السلام عليكم، أرغب في استشارة بخصوص تعثّري المالي وحماية نفسي عبر نظام الإفلاس."
);
const WHATSAPP_URL = `https://wa.me/966505149800?text=${WHATSAPP_MSG}`;
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/YnXXVn35ryxUKUfHFrqdpE/lp-bankruptcy-hero-dqU6g5zLT9BYqByVzYJGDK.webp";
const TRUST_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/YnXXVn35ryxUKUfHFrqdpE/lp-bankruptcy-trust-BEbD24pP8msCebWnUZ6EUw.webp";
const LOGO_LIGHT = "/images/logo-light.webp";

/**
 * تتبّع تحويلات صفحة الهبوط عبر Google Tag Manager (GTM-5SW2MXVW).
 * يدفع حدثاً موحّداً إلى dataLayer ليلتقطه مختص التسويق في GTM
 * ويربطه بإجراءات تحويل Google Ads / GA4 دون تعديل الكود لاحقاً.
 * اسم الحدث الموصى به في GTM: trigger على event = "lead_conversion".
 */
function trackAdsConversion(type: "call" | "whatsapp" | "lead") {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "lead_conversion",
    lead_source: "bankruptcy_lp",
    lead_method: type,
  });
}

/** خطّاف بسيط لكشف ظهور العنصر في إطار العرض لتفعيل حركة الدخول */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/** زر الاتصال المباشر */
function CallButton({
  source,
  className = "",
}: {
  source: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      onClick={() => {
        trackPhoneClick(source);
        trackAdsConversion("call");
      }}
      className={`group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-base rounded-md hover:bg-[var(--color-gold-light)] hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.35)] transition-all duration-200 active:scale-[0.97] ${className}`}
    >
      <Phone size={18} className="shrink-0" />
      <span>اتصل بنا الآن</span>
      <span dir="ltr" className="font-bold tracking-wide">
        {PHONE_DISPLAY}
      </span>
    </a>
  );
}

/** زر واتساب */
function WhatsAppButton({
  source,
  className = "",
}: {
  source: string;
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackWhatsAppClick(source);
        trackAdsConversion("whatsapp");
      }}
      className={`group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#25D366] text-white font-heading font-semibold text-base rounded-md hover:brightness-105 hover:shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all duration-200 active:scale-[0.97] ${className}`}
    >
      <MessageCircle size={20} className="shrink-0" />
      <span>تواصل عبر واتساب</span>
    </a>
  );
}

/** نموذج طلب معاودة اتصال — يرسل الطلب عبر واتساب */
function CallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      setError("يرجى إدخال الاسم.");
      return;
    }
    // رقم جوال سعودي: 05XXXXXXXX (10) أو 9665XXXXXXXX (12) أو +9665...
    const validSaudi =
      /^05\d{8}$/.test(digits) ||
      /^9665\d{8}$/.test(digits) ||
      /^5\d{8}$/.test(digits);
    if (!validSaudi) {
      setError("يرجى إدخال رقم جوال سعودي صحيح (مثال: 05XXXXXXXX).");
      return;
    }

    setError("");
    trackContactFormSubmit();
    trackAdsConversion("lead");

    // تطبيع الرقم لعرضه في الرسالة
    let normalized = digits;
    if (/^5\d{8}$/.test(digits)) normalized = "0" + digits;
    else if (/^9665\d{8}$/.test(digits)) normalized = "0" + digits.slice(3);

    const msg = encodeURIComponent(
      `طلب معاودة اتصال:\nالاسم: ${trimmedName}\nرقم الجوال: ${normalized}\nأرغب في استشارة بخصوص تعثّري المالي وحماية نفسي عبر نظام الإفلاس.`
    );
    setSent(true);
    window.open(`https://wa.me/966505149800?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={30} className="text-[#25D366]" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-white mb-2">
          تم استلام طلبك
        </h3>
        <p className="font-body text-sm text-white/70 leading-relaxed mb-5">
          إن لم تُفتح نافذة واتساب تلقائياً، يمكنك التواصل معنا مباشرة الآن.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CallButton source="lp_form_thanks" />
          <button
            onClick={() => {
              setSent(false);
              setName("");
              setPhone("");
            }}
            className="font-body text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors underline"
          >
            إرسال طلب آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="cb-name"
          className="block font-heading text-sm text-white/85 mb-1.5"
        >
          الاسم
        </label>
        <div className="relative">
          <User
            size={18}
            className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/40"
          />
          <input
            id="cb-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك"
            className="w-full bg-white/8 border border-white/15 rounded-md py-3 pr-11 pl-4 text-white placeholder:text-white/35 font-body text-sm outline-none focus:border-[var(--color-gold)] focus:bg-white/12 transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="cb-phone"
          className="block font-heading text-sm text-white/85 mb-1.5"
        >
          رقم الجوال
        </label>
        <div className="relative">
          <Phone
            size={17}
            className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/40"
          />
          <input
            id="cb-phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05XXXXXXXX"
            className="w-full bg-white/8 border border-white/15 rounded-md py-3 pr-11 pl-4 text-white placeholder:text-white/35 font-body text-sm outline-none focus:border-[var(--color-gold)] focus:bg-white/12 transition-colors text-right"
          />
        </div>
      </div>

      {error && (
        <p className="font-body text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-base rounded-md hover:bg-[var(--color-gold-light)] hover:shadow-[0_8px_30px_oklch(0.65_0.1_70/0.35)] transition-all duration-200 active:scale-[0.98]"
      >
        <Send size={17} />
        <span>اطلب معاودة الاتصال</span>
      </button>
      <p className="font-body text-xs text-white/45 text-center leading-relaxed">
        بياناتك سرّية ولن تُستخدم إلا للتواصل معك بخصوص استشارتك.
      </p>
    </form>
  );
}

/** الأسئلة الشائعة — مصدر واحد للنص المرئي وschema معاً */
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "هل يحميني نظام الإفلاس من ملاحقة الدائنين؟",
    a: "نعم. بمجرد افتتاح إجراء التسوية الوقائية أو إعادة التنظيم المالي، يمنح النظام حماية نظامية تُوقف إجراءات التنفيذ والمطالبات الفردية ضدّك، وتمنحك مهلة لإعادة ترتيب وضعك المالي وفق خطة معتمدة من المحكمة.",
  },
  {
    q: "هل سأخسر منزلي وأصولي إذا دخلت في إجراء الإفلاس؟",
    a: "ليس بالضرورة. الهدف الأساسي من التسوية الوقائية وإعادة التنظيم هو الحفاظ على نشاطك وأصولك قدر الإمكان عبر جدولة الديون، لا تصفية ممتلكاتك. نوع الإجراء ومآل الأصول يعتمد على وضعك تحديداً، وندرسه معك قبل اتخاذ أي خطوة.",
  },
  {
    q: "كم يستغرق إجراء الإفلاس عادةً؟",
    a: "تختلف المدة حسب نوع الإجراء وحجم الديون وعدد الدائنين ومدى تعاونهم. التسوية الوقائية غالباً أسرع من إعادة التنظيم الكامل. بعد دراسة ملفك نعطيك تقديراً واقعياً للمدة والمراحل المتوقعة.",
  },
  {
    q: "ما الفرق بين التسوية الوقائية وإعادة التنظيم المالي؟",
    a: "التسوية الوقائية تتيح لك الاتفاق مع الدائنين على جدولة الديون مع بقائك مديراً لنشاطك، بينما إعادة التنظيم المالي إجراء أوسع لإعادة هيكلة الالتزامات تحت إشراف أمين. نحدّد لك المسار الأنسب بعد دراسة وضعك المالي.",
  },
  {
    q: "هل تتوقف الفوائد والغرامات بعد افتتاح الإجراء؟",
    a: "افتتاح الإجراء النظامي يضبط مطالبات الدائنين ضمن إطار المحكمة ويمنع التصرّفات الفردية ضدّك. تفاصيل احتساب الالتزامات تُعالَج ضمن خطة الإجراء، ونوضّح لك أثرها على وضعك خلال الاستشارة الأولى.",
  },
  {
    q: "بياناتي ووضعي المالي… هل يبقى كل شيء سرّياً؟",
    a: "نعم، نتعامل مع وضعك المالي بسرّية تامة ودون أي إحراج. استشارتك الأولى ومعلوماتك تبقى محفوظة، وهدفنا مساعدتك على إيجاد حلّ نظامي يحمي حقوقك.",
  },
  {
    q: "كيف أبدأ الآن؟",
    a: "تواصل معنا عبر الهاتف 0505149800 أو واتساب. نقيّم وضعك خلال مكالمة أولية، ثم نقترح عليك الإجراء النظامي المناسب لحماية حقوقك وإعادة تنظيم ديونك.",
  },
];

/** عنصر سؤال واحد قابل للطيّ */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-navy)]/8 shadow-[0_2px_16px_oklch(0.2_0.04_250/0.04)] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-right px-5 md:px-6 py-5 group"
      >
        <span className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] leading-snug">
          {q}
        </span>
        <span
          className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-gold)]/12 flex items-center justify-center transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown size={18} className="text-[var(--color-gold)]" />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="font-body text-sm md:text-[15px] text-[var(--color-navy)]/70 leading-relaxed px-5 md:px-6 pb-5">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/** قسم الأسئلة الشائعة */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const reveal = useReveal<HTMLDivElement>();
  return (
    <section className="py-16 md:py-20 bg-[var(--color-cream)]">
      <div className="container mx-auto px-5 md:px-8">
        <div
          ref={reveal.ref}
          className="max-w-3xl mx-auto transition-all duration-700"
          style={{
            opacity: reveal.visible ? 1 : 0,
            transform: reveal.visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 font-heading text-xs md:text-sm tracking-[0.15em] text-[var(--color-gold)] uppercase">
              <HelpCircle size={16} />
              أسئلة شائعة
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)] mt-3 leading-snug">
              إجابات تطمئنك قبل أن تتصل
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--color-navy)]/60 mt-3 leading-relaxed">
              أكثر ما يشغل بال المتعثّر مالياً — أجبنا عنه بوضوح.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="font-body text-sm text-[var(--color-navy)]/60 mb-4">
              لديك سؤال آخر؟ تحدّث معنا مباشرة الآن.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CallButton source="lp_faq" />
              <WhatsAppButton source="lp_faq" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BankruptcyLP() {
  useSEO({
    title:
      "محامي إفلاس للمدين المتعثّر | حماية نظامية وإعادة جدولة الديون - بريدة والقصيم",
    description:
      "تعثّرت في سداد ديونك؟ نظام الإفلاس السعودي يحميك قانونياً. شركة عبدالرحمن رضوان المشيقح للمحاماة تساعدك على إيقاف الملاحقات وإعادة تنظيم ديونك. استشارة عبر الهاتف أو واتساب — اتصل: 0505149800.",
    keywords:
      "محامي إفلاس, نظام الإفلاس السعودي, إعادة تنظيم الديون, تعثّر مالي, حماية من الدائنين, التسوية الوقائية, إعادة الجدولة, محامي إفلاس بريدة, محامي القصيم, الإفلاس للمدين",
    canonical: "/bankruptcy-lp",
    ogType: "website",
    ogImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/YnXXVn35ryxUKUfHFrqdpE/lp-bankruptcy-hero-niPZdD85yhEnwYdb23yh7R.png",
    fullTitle: true,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
        url: "https://redwan.sa/bankruptcy-lp",
        telephone: "+966505149800",
        email: "info@redwan.sa",
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "بريدة",
          addressRegion: "القصيم",
          addressCountry: "SA",
        },
        description:
          "خدمات قانونية متخصّصة في نظام الإفلاس السعودي للمدين المتعثّر: التسوية الوقائية، إعادة التنظيم المالي، وإيقاف الملاحقات النظامية.",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  });

  const steps = useReveal<HTMLDivElement>();
  const protect = useReveal<HTMLDivElement>();

  return (
    <main dir="rtl" className="bg-[var(--color-cream)] min-h-screen font-body">
      {/* ============ شريط علوي بسيط: الشعار + اتصال ============ */}
      <header className="sticky top-0 z-40 bg-[var(--color-navy)]/95 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <img
            src={LOGO_LIGHT}
            alt="شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
            className="w-auto object-contain"
            style={{ height: "40px", maxWidth: "180px" }}
          />
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackPhoneClick("lp_header")}
            className="inline-flex items-center gap-2 text-[var(--color-gold-bright)] font-heading font-semibold text-sm hover:text-[var(--color-gold-light)] transition-colors"
          >
            <Phone size={16} />
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="استعادة الاستقرار المالي بعد التعثّر عبر نظام الإفلاس"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* تدرّج كحلي من اليمين (RTL) لإبراز النص فوق الجانب الداكن من الصورة */}
          <div className="absolute inset-0 bg-gradient-to-l from-[oklch(0.16_0.04_250/0.96)] via-[oklch(0.16_0.04_250/0.82)] to-[oklch(0.16_0.04_250/0.45)]" />
        </div>

        <div className="container mx-auto px-5 md:px-8 relative z-10 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <div className="max-w-2xl lg:col-span-3">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10">
              <ShieldCheck size={16} className="text-[var(--color-gold)]" />
              <span className="font-heading text-xs md:text-sm text-[var(--color-gold-bright)] tracking-wide">
                وفق نظام الإفلاس السعودي
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.35] md:leading-[1.25] mb-5">
              تعثّرت في سداد ديونك؟
              <br />
              <span className="text-[var(--color-gold)]">
                النظام يمنحك حماية قانونية
              </span>{" "}
              وبداية جديدة
            </h1>

            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
              نساعد المدين المتعثّر على إيقاف الملاحقات، وإعادة جدولة ديونه،
              وإعادة تنظيم وضعه المالي عبر إجراءات نظامية معتمدة — بسرّية تامة وخبرة قانونية موثوقة.
            </p>

            {/* CTA رئيسي */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <CallButton source="lp_hero" />
              <WhatsAppButton source="lp_hero" />
            </div>

            {/* طمأنة سريعة */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7">
              {[
                "استشارة أولية مباشرة",
                "سرّية تامة",
                "تقييم وضعك بسرعة",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-gold)]" />
                  <span className="font-body text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>

            {/* بطاقة نموذج معاودة الاتصال */}
            <div className="lg:col-span-2" id="callback">
              <div className="bg-[var(--color-navy)]/85 backdrop-blur-md border border-[var(--color-gold)]/25 rounded-2xl p-6 md:p-7 shadow-[0_20px_60px_oklch(0.12_0.04_250/0.5)]">
                <div className="mb-5">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-snug">
                    اطلب معاودة اتصال
                  </h2>
                  <p className="font-body text-sm text-white/65 mt-2 leading-relaxed">
                    اترك اسمك ورقمك وسنتواصل معك لتقييم وضعك بسرّية تامة.
                  </p>
                </div>
                <CallbackForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ شريط مصداقية ============ */}
      <section className="bg-[var(--color-navy)] border-t border-white/10">
        <div className="container mx-auto px-5 md:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: "+20", label: "عاماً من الخبرة القانونية" },
              { value: "4", label: "تراخيص نظامية معتمدة" },
              { value: "6+", label: "إجراءات إفلاس مُدارة" },
              { value: "100%", label: "سرّية في التعامل" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-bold text-[var(--color-gold-bright)]">
                  {s.value}
                </div>
                <p className="font-body text-xs md:text-sm text-white/55 mt-1.5 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ كيف نساعدك: 3 خطوات ============ */}
      <section ref={steps.ref} className="py-16 md:py-20">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-heading text-xs md:text-sm tracking-[0.15em] text-[var(--color-gold)] uppercase">
              مسار واضح
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)] mt-3 leading-snug">
              كيف نساعدك في ثلاث خطوات
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                step: "01",
                title: "تواصل واستشر",
                desc: "اتصل بنا أو راسلنا عبر واتساب، وأخبرنا بوضعك المالي في مكالمة أولية بسرّية تامة.",
              },
              {
                icon: FileSearch,
                step: "02",
                title: "نُقيّم وضعك",
                desc: "ندرس التزاماتك ومصادر دخلك، ونحدّد الإجراء النظامي الأنسب: تسوية وقائية أو إعادة تنظيم.",
              },
              {
                icon: ShieldCheck,
                step: "03",
                title: "نحميك قانونياً",
                desc: "نتولّى الإجراءات أمام الجهات المختصّة لإيقاف الملاحقات وإعادة جدولة ديونك ضمن خطة معتمدة.",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.step}
                  className="relative bg-white rounded-xl p-7 border border-[var(--color-navy)]/8 shadow-[0_4px_24px_oklch(0.2_0.04_250/0.06)] transition-all duration-500"
                  style={{
                    opacity: steps.visible ? 1 : 0,
                    transform: steps.visible
                      ? "translateY(0)"
                      : "translateY(24px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <span className="absolute top-6 left-6 font-display text-4xl font-bold text-[var(--color-navy)]/8">
                    {c.step}
                  </span>
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-navy)] flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-2.5">
                    {c.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/65 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ما يحميك منه نظام الإفلاس ============ */}
      <section
        ref={protect.ref}
        className="relative py-16 md:py-20 bg-[var(--color-navy)] overflow-hidden"
      >
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* النص */}
            <div>
              <span className="font-heading text-xs md:text-sm tracking-[0.15em] text-[var(--color-gold)] uppercase">
                حقوقك محفوظة
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mt-3 mb-8 leading-snug">
                ماذا يمنحك نظام الإفلاس؟
              </h2>

              <div className="space-y-5">
                {[
                  {
                    icon: Ban,
                    title: "إيقاف الملاحقات والتنفيذ",
                    desc: "حماية نظامية توقف إجراءات التنفيذ والمطالبات الفردية فور افتتاح الإجراء.",
                  },
                  {
                    icon: CalendarClock,
                    title: "إعادة جدولة الديون",
                    desc: "خطة سداد واقعية تتناسب مع دخلك بدل الضغط الفوري الذي لا تقدر عليه.",
                  },
                  {
                    icon: HandCoins,
                    title: "إعادة تنظيم مالي",
                    desc: "إعادة هيكلة التزاماتك للحفاظ على نشاطك ومصدر دخلك قدر الإمكان.",
                  },
                  {
                    icon: Scale,
                    title: "معاملة عادلة ومنظّمة",
                    desc: "إجراء رسمي أمام الجهات المختصّة يضمن التعامل وفق النظام لا وفق ضغط الدائنين.",
                  },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="flex gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-lg bg-[var(--color-gold)]/12 border border-[var(--color-gold)]/25 flex items-center justify-center">
                        <Icon size={20} className="text-[var(--color-gold)]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white mb-1">
                          {f.title}
                        </h3>
                        <p className="font-body text-sm text-white/60 leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* الصورة */}
            <div
              className="relative rounded-2xl overflow-hidden transition-all duration-700"
              style={{
                opacity: protect.visible ? 1 : 0,
                transform: protect.visible ? "scale(1)" : "scale(0.96)",
              }}
            >
              <img
                src={TRUST_IMG}
                alt="إعادة بناء الوضع المالي وحماية الحقوق عبر النظام"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.04_250/0.5)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ لماذا نحن ============ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-heading text-xs md:text-sm tracking-[0.15em] text-[var(--color-gold)] uppercase">
              لماذا تختارنا
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[var(--color-navy)] mt-3 leading-snug">
              خبرة متخصّصة في إدارة إجراءات الإفلاس
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "تراخيص نظامية",
                desc: "شركة محاماة مرخّصة، ملتزمة بالأنظمة واللوائح المعتمدة في المملكة.",
              },
              {
                icon: ClipboardCheck,
                title: "تخصّص في الإفلاس",
                desc: "خبرة عملية في التسوية الوقائية وإعادة التنظيم المالي وإدارة إجراءات الإفلاس.",
              },
              {
                icon: ShieldCheck,
                title: "سرّية تامة",
                desc: "نتعامل مع وضعك المالي بخصوصية كاملة ودون أي إحراج.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="bg-white rounded-xl p-7 border border-[var(--color-navy)]/8 shadow-[0_4px_24px_oklch(0.2_0.04_250/0.05)]"
                >
                  <Icon size={26} className="text-[var(--color-gold)] mb-4" />
                  <h3 className="font-heading text-base font-semibold text-[var(--color-navy)] mb-2">
                    {c.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/65 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ الأسئلة الشائعة ============ */}
      <FaqSection />

      {/* ============ CTA نهائي ============ */}
      <section className="relative py-16 md:py-24 bg-[var(--color-navy)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, var(--color-gold), transparent 45%)`,
          }}
        />
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center max-w-2xl">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 leading-snug">
            لا تنتظر تفاقم الديون — تواصل معنا اليوم
          </h2>
          <p className="font-body text-base md:text-lg text-white/70 mb-9 leading-relaxed">
            مكالمة واحدة قد تكون بداية حلّ وضعك المالي. استشارتك الأولى مباشرة
            وبسرّية تامة.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <CallButton source="lp_final" />
            <WhatsAppButton source="lp_final" />
          </div>
        </div>
      </section>

      {/* ============ تذييل بسيط ============ */}
      <footer className="bg-[oklch(0.14_0.04_250)] py-8">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
              <span className="font-heading text-sm text-white/70">
                شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس
              </span>
              <span className="font-body text-xs text-white/30">
                ترخيص محاماة رقم: 26/129
              </span>
            </div>
            <div className="flex items-center gap-5 text-white/50 font-body text-xs flex-wrap justify-center">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[var(--color-gold)]" />
                بريدة، القصيم
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-[var(--color-gold)]" />
                الأحد - الخميس ٨ص - ٤م
              </span>
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() => trackPhoneClick("lp_footer")}
                className="flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors"
              >
                <Phone size={13} className="text-[var(--color-gold)]" />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ شريط CTA لاصق للجوال ============ */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[var(--color-navy)]/95 backdrop-blur border-t border-white/10 px-3 py-2.5">
        <div className="flex gap-2.5">
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackPhoneClick("lp_sticky_mobile")}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-md bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-semibold text-sm active:scale-[0.97] transition-transform"
          >
            <Phone size={17} />
            <span>اتصل الآن</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("lp_sticky_mobile")}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-md bg-[#25D366] text-white font-heading font-semibold text-sm active:scale-[0.97] transition-transform"
          >
            <MessageCircle size={18} />
            <span>واتساب</span>
          </a>
        </div>
      </div>
      {/* مساحة سفلية للجوال حتى لا يغطّي الشريط اللاصق المحتوى */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </main>
  );
}
