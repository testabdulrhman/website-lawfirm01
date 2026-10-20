import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { Phone, Mail } from 'lucide-react';
import { localePath } from "@/lib/localePath";
import { useLanguage } from "@/contexts/LanguageContext";
import { CLAIMS_T } from "@/data/claimsI18n";

// نموذج تسجيل الدائن من منصة «غُرَماء»: يعرض الملفات التي تستقبل المطالبات،
// ويسجّل الدائن، ثم يحيله إلى بوابة الدائن ليقدّم مطالبته ومستنداتها.
const GHURAMAA_SRC = "https://ghuramaa.com/embed/ghuramaa-form.js";
const GHURAMAA_KEY = "gh_kLQ0xQMY22NQZI4S1FsvKZ8x3WF53dLT";
const GHURAMAA_TARGET = "ghuramaa-form";

// النموذج يبني نفسه داخل الحاوية عند تشغيل السكربت، والسكربت يحدد حاويته
// بـ document.currentScript، فيُدرج عند كل فتح للصفحة لا مرة واحدة في index.html.
function GhuramaaForm() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.replaceChildren();
    const script = document.createElement("script");
    script.src = GHURAMAA_SRC;
    script.defer = true;
    script.dataset.key = GHURAMAA_KEY;
    script.dataset.target = GHURAMAA_TARGET;
    document.body.appendChild(script);
    return () => {
      script.remove();
      host.replaceChildren();
    };
  }, []);

  return <div id={GHURAMAA_TARGET} ref={hostRef} />;
}

const INTRO = {
  ar: 'تتيح هذه الصفحة للدائن التسجيل في إجراءات الإفلاس التي يديرها المكتب بصفته أمين إفلاس. يختار الدائن الملف ويسجّل بياناته، فيصله رمز دخول على بريده، ثم يقدّم مطالبته ومستنداتها في بوابة الدائن. ويُرجع إلى الإعلان الرسمي لكل إجراء لمعرفة مواعيده ومتطلباته.',
  en: 'This page lets creditors register in the bankruptcy procedures the firm manages as a licensed bankruptcy trustee. Choose the file and register; a sign-in code is sent to your email, and you then submit your claim and its documents in the creditor portal. Refer to each procedure’s official announcement for its deadlines and requirements.',
  ur: 'یہ صفحہ قرض خواہوں کو ان دیوالیہ کارروائیوں میں رجسٹر ہونے کی سہولت دیتا ہے جن کا انتظام فرم بطور امینِ دیوالیہ کرتی ہے۔ فائل منتخب کر کے رجسٹر کریں؛ آپ کی ای میل پر لاگ اِن کوڈ آئے گا، پھر آپ قرض خواہ پورٹل میں اپنا دعویٰ اور اس کی دستاویزات جمع کرائیں گے۔ ہر کارروائی کی تاریخوں اور شرائط کے لیے اس کے سرکاری اعلان سے رجوع کریں۔',
} as const;

const FORM_IN_ARABIC = {
  en: 'The registration form below is in Arabic.',
  ur: 'نیچے رجسٹریشن فارم عربی میں ہے۔',
} as const;

export default function Claims() {
  const { lang } = useLanguage();
  const lp = (p: string) => localePath(p, lang);
  const t = CLAIMS_T[lang];

  return (
    <>
    <SEOHead
      title={t.seoTitle}
      description={t.seoDesc}
      canonicalUrl="/bankruptcy/claims"
      keywords={['تقديم مطالبة دائن', 'مطالبة دائن إلكترونية', 'مطالبات الإفلاس', 'تقديم مطالبة إفلاس', 'دائنين', 'أمين الإفلاس', 'تصفية', 'القصيم', 'بريدة']}
      ogType="website"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t.seoTitle,
        "description": t.seoDesc,
        "url": `https://redwan.sa${lp("/bankruptcy/claims")}`,
        "inLanguage": lang,
        "isPartOf": {
          "@type": "WebSite",
          "name": "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
          "url": "https://redwan.sa"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://redwan.sa" },
            { "@type": "ListItem", "position": 2, "name": "إجراءات الإفلاس", "item": "https://redwan.sa/bankruptcy" },
            { "@type": "ListItem", "position": 3, "name": "تقديم مطالبة دائن", "item": "https://redwan.sa/bankruptcy/claims" }
          ]
        }
      }}
    />
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.crumbHome}</Link>
            <span className="text-white/30">/</span>
            <Link href={lp("/bankruptcy")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.crumbBankruptcy}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.crumbClaims}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.heroTitle}
          </h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {INTRO[lang]}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-5 md:px-4 lg:px-8 py-8 md:py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5 md:p-8">
          {lang !== 'ar' && (
            <p className="font-body text-sm text-[var(--color-navy)]/60 mb-4">{FORM_IN_ARABIC[lang]}</p>
          )}
          <div dir="rtl" lang="ar">
            <GhuramaaForm />
          </div>
        </div>

        <p className="max-w-2xl mx-auto mt-6 text-center font-body text-sm text-[var(--color-navy)]/60">
          {t.inquiries}:{' '}
          <Phone className="w-4 h-4 inline me-1" aria-hidden="true" /> <bdi dir="ltr">920032760</bdi>
          {' · '}
          <Mail className="w-4 h-4 inline me-1" aria-hidden="true" /> <bdi dir="ltr">bankruptcy@redwan.sa</bdi>
        </p>
      </div>
    </div>
    </>
  );
}
