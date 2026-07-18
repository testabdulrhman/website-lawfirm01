/**
 * Brand Assets Page - صفحة الشعارات
 * Simple page displaying all logo variants with direct URLs for email signatures etc.
 */
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface LogoItem {
  id: string;
  label: string;
  description: string;
  url: string;
  bgClass: string;
  format: string;
}

const logos: LogoItem[] = [
  {
    id: "colored-light-bg",
    label: "الشعار الأفقي الملون",
    description: "مناسب للخلفيات الفاتحة — نص كحلي + أيقونة ملونة",
    url: "/manus-storage/1_ae46dc1f.png",
    bgClass: "bg-white",
    format: "PNG",
  },
  {
    id: "white-dark-bg",
    label: "الشعار الأفقي الأبيض",
    description: "مناسب للخلفيات الداكنة — نص أبيض + أيقونة ملونة",
    url: "/manus-storage/2_81e1d28d.png",
    bgClass: "bg-[#0a1628]",
    format: "PNG",
  },
  {
    id: "black-mono",
    label: "الشعار الأفقي الأسود",
    description: "نسخة أحادية اللون — أسود بالكامل",
    url: "/manus-storage/3_57609761.png",
    bgClass: "bg-white",
    format: "PNG",
  },
  {
    id: "beige-gold",
    label: "الشعار الأفقي البيج",
    description: "مناسب للخلفيات الداكنة — لون بيج/ذهبي",
    url: "/manus-storage/5_5cbc6fa3.png",
    bgClass: "bg-[#1a1a2e]",
    format: "PNG",
  },
  {
    id: "vertical",
    label: "الشعار العمودي",
    description: "نسخة عمودية — أيقونة فوق + نص أسفل",
    url: "/manus-storage/8_eb13c47b.png",
    bgClass: "bg-white",
    format: "PNG",
  },
  {
    id: "icon-square",
    label: "الأيقونة المربعة",
    description: "أيقونة فقط 256×256 — مناسبة للصور الرمزية والفافيكون",
    url: "/manus-storage/256 x 256_7efd5dce.png",
    bgClass: "bg-white",
    format: "PNG",
  },
  {
    id: "svg-colored",
    label: "الشعار الأفقي الملون (SVG)",
    description: "نسخة متجهة — قابلة للتكبير بدون فقدان الجودة",
    url: "/manus-storage/1_11c44bf6.svg",
    bgClass: "bg-white",
    format: "SVG",
  },
  {
    id: "svg-black",
    label: "الشعار الأفقي الأسود (SVG)",
    description: "نسخة متجهة أحادية اللون",
    url: "/manus-storage/3_434a0e7c.svg",
    bgClass: "bg-white",
    format: "SVG",
  },
  {
    id: "svg-vertical",
    label: "الشعار العمودي (SVG)",
    description: "نسخة متجهة عمودية",
    url: "/manus-storage/8_c61c2dd2.svg",
    bgClass: "bg-white",
    format: "SVG",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-150 active:scale-95"
      title="نسخ الرابط"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-600">تم النسخ</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>نسخ الرابط</span>
        </>
      )}
    </button>
  );
}

export default function Brand() {
  const baseUrl = "https://redwan.manus.space";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-heading">
            شعارات الشركة
          </h1>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            جميع نسخ الشعار بروابط مباشرة — انسخ الرابط واستخدمه في توقيع البريد أو أي مكان آخر
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid gap-6">
          {logos.map((logo) => {
            const fullUrl = `${baseUrl}${logo.url}`;
            return (
              <div
                key={logo.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Preview */}
                  <div
                    className={`${logo.bgClass} flex items-center justify-center p-8 md:w-80 md:min-h-[140px] border-b md:border-b-0 md:border-l border-gray-200`}
                  >
                    <img
                      src={logo.url}
                      alt={logo.label}
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5 flex flex-col justify-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-base font-semibold text-gray-900">
                          {logo.label}
                        </h2>
                        <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {logo.format}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{logo.description}</p>
                    </div>

                    {/* URL + Copy */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono break-all max-w-full select-all">
                        {fullUrl}
                      </code>
                      <CopyButton text={fullUrl} />
                      <a
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        title="فتح في تبويب جديد"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>فتح</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-xs text-gray-400">
          <p>جميع الشعارات بصيغة PNG شفافة الخلفية ما لم يُذكر خلاف ذلك</p>
        </div>
      </div>
    </div>
  );
}
