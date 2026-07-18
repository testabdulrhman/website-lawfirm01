/**
 * Brand Assets Page - صفحة الشعارات
 * Displays all PNG logo variants with direct URLs for email signatures etc.
 */
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface LogoItem {
  id: string;
  label: string;
  url: string;
  bgClass: string;
}

interface LogoGroup {
  title: string;
  description: string;
  items: LogoItem[];
}

const logoGroups: LogoGroup[] = [
  {
    title: "أفقي مع النص",
    description: "3765×1144 بكسل — مناسب لتوقيع البريد والمواقع",
    items: [
      { id: "h1", label: "كحلي ملون", url: "/manus-storage/1_ae46dc1f.png", bgClass: "bg-white" },
      { id: "h2", label: "أبيض ملون", url: "/manus-storage/2_81e1d28d.png", bgClass: "bg-[#0a1628]" },
      { id: "h3", label: "أسود أحادي", url: "/manus-storage/3_57609761.png", bgClass: "bg-white" },
      { id: "h4", label: "أبيض أحادي", url: "/manus-storage/4_e4e24293.png", bgClass: "bg-[#0a1628]" },
      { id: "h5", label: "بيج / ذهبي", url: "/manus-storage/5_5cbc6fa3.png", bgClass: "bg-[#1a1a2e]" },
    ],
  },
  {
    title: "عمودي مع النص",
    description: "2022×2318 بكسل — مناسب للطباعة والعروض",
    items: [
      { id: "v6", label: "كحلي ملون", url: "/manus-storage/6_8c2d94bd.png", bgClass: "bg-white" },
      { id: "v7", label: "أبيض ملون", url: "/manus-storage/7_3bb00eca.png", bgClass: "bg-[#0a1628]" },
      { id: "v8", label: "أسود أحادي", url: "/manus-storage/8_eb13c47b.png", bgClass: "bg-white" },
      { id: "v9", label: "أبيض أحادي", url: "/manus-storage/9_91cc63f3.png", bgClass: "bg-[#0a1628]" },
    ],
  },
  {
    title: "أيقونة طولية (بدون نص)",
    description: "915×2152 بكسل — الرمز فقط",
    items: [
      { id: "i10", label: "كحلي ملون", url: "/manus-storage/10_6b15f22c.png", bgClass: "bg-white" },
      { id: "i11", label: "أبيض ملون", url: "/manus-storage/11_59daf2e5.png", bgClass: "bg-[#0a1628]" },
      { id: "i12", label: "أسود أحادي", url: "/manus-storage/12_11a55848.png", bgClass: "bg-white" },
      { id: "i13", label: "بيج / ذهبي", url: "/manus-storage/13_c8cb9c9e.png", bgClass: "bg-[#1a1a2e]" },
      { id: "i14", label: "أبيض أحادي", url: "/manus-storage/14_2914bdf5.png", bgClass: "bg-[#0a1628]" },
    ],
  },
  {
    title: "أيقونة مربعة (بدون نص)",
    description: "2152×2152 بكسل — مناسبة للصور الرمزية",
    items: [
      { id: "s15", label: "كحلي ملون", url: "/manus-storage/15_e70980ca.png", bgClass: "bg-white" },
      { id: "s16", label: "أبيض ملون", url: "/manus-storage/16_dfbd623b.png", bgClass: "bg-[#0a1628]" },
    ],
  },
  {
    title: "مربع كبير مع النص",
    description: "3765×3765 بكسل — مناسب لوسائل التواصل",
    items: [
      { id: "sq17", label: "كحلي ملون", url: "/manus-storage/17_1033f6fd.png", bgClass: "bg-white" },
      { id: "sq18", label: "أبيض ملون", url: "/manus-storage/18_3997cb38.png", bgClass: "bg-[#0a1628]" },
      { id: "sq19", label: "أسود أحادي", url: "/manus-storage/19_0aa5ed35.png", bgClass: "bg-white" },
      { id: "sq20", label: "أبيض أحادي", url: "/manus-storage/20_c650b884.png", bgClass: "bg-[#0a1628]" },
      { id: "sq21", label: "بيج / ذهبي", url: "/manus-storage/21_8fde439d.png", bgClass: "bg-[#1a1a2e]" },
    ],
  },
  {
    title: "بانر عريض",
    description: "5434×3766 بكسل — مناسب للأغلفة والبنرات",
    items: [
      { id: "b22", label: "كحلي ملون", url: "/manus-storage/22_f1af700b.png", bgClass: "bg-white" },
      { id: "b23", label: "أبيض ملون", url: "/manus-storage/23_23182a55.png", bgClass: "bg-[#0a1628]" },
    ],
  },
  {
    title: "أحجام صغيرة",
    description: "أيقونات جاهزة بأحجام محددة",
    items: [
      { id: "sm256", label: "256×256 ملون", url: "/manus-storage/256 x 256_7efd5dce.png", bgClass: "bg-white" },
      { id: "sm256b", label: "110×257 أيقونة ضيقة", url: "/manus-storage/256 x 256_1_c021c261.png", bgClass: "bg-white" },
      { id: "sm120", label: "318×121 أفقي صغير", url: "/manus-storage/120 x 317_3f597c22.png", bgClass: "bg-white" },
      { id: "sm68", label: "225×69 أيقونة صغيرة", url: "/manus-storage/68 x 224_896a3649.png", bgClass: "bg-white" },
    ],
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
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-150 active:scale-95 shrink-0"
      title="نسخ الرابط"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-green-600" />
          <span className="text-green-600">تم</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>نسخ</span>
        </>
      )}
    </button>
  );
}

export default function Brand() {
  const baseUrl = "https://redwan.manus.space";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
            شعارات الشركة
          </h1>
          <p className="text-gray-500 text-sm">
            انسخ الرابط المباشر واستخدمه في توقيع البريد أو أي مكان آخر
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-10">
          {logoGroups.map((group) => (
            <section key={group.title}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{group.title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{group.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((logo) => {
                  const fullUrl = `${baseUrl}${logo.url}`;
                  return (
                    <div
                      key={logo.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                    >
                      {/* Preview */}
                      <div
                        className={`${logo.bgClass} flex items-center justify-center p-6 h-32 border-b border-gray-100`}
                      >
                        <img
                          src={logo.url}
                          alt={logo.label}
                          className="max-h-20 max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-3 space-y-2">
                        <p className="text-sm font-medium text-gray-800">{logo.label}</p>
                        <div className="flex items-center gap-1.5">
                          <code className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono truncate flex-1 select-all" title={fullUrl}>
                            {fullUrl}
                          </code>
                          <CopyButton text={fullUrl} />
                          <a
                            href={logo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center p-1 rounded border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
                            title="فتح"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-400">
          <p>جميع الشعارات بصيغة PNG شفافة الخلفية</p>
        </div>
      </div>
    </div>
  );
}
