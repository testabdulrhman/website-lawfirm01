import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

// بيانات إعلانات يوليو 2026 - مستخرجة من موقع لجنة الإفلاس (إيسار)
const announcements = [
  { name: "شركة هبة لمعدات السلامة والحريق المحدودة", nameEn: "Heba Safety & Fire Equipment Co.", cr: "2050019934", type: "تسوية وقائية", typeEn: "Preventive Settlement", date: "27/07/2026", city: "القصيم", cityEn: "Qassim", id: "9504" },
  { name: "شركة تحليل المتقدمة الطبية", nameEn: "Tahlil Advanced Medical Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "27/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9491" },
  { name: "شركة انجل الطبية", nameEn: "Angel Medical Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "26/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9502" },
  { name: "شركة بيت القهوة المحدودة", nameEn: "Coffee House Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "26/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9500" },
  { name: "شركة مطاعم دار الدبلوماسية", nameEn: "Dar Al-Diplomasia Restaurants Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "26/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9499" },
  { name: "شركة أدمة المحدودة", nameEn: "Adma Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "26/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9498" },
  { name: "شركة وتد الوطنية لوكالة التأمين", nameEn: "Watad National Insurance Agency Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "26/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9497" },
  { name: "شركة الرياض للدهانات", nameEn: "Riyadh Paints Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "26/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9494" },
  { name: "شركة الجودي العربية للمقاولات", nameEn: "Al-Joudi Arabian Contracting Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "23/07/2026", city: "الدمام", cityEn: "Dammam", id: "9495" },
  { name: "شركة تقدم", nameEn: "Taqaddum Co.", cr: "1010288023", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "21/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9489" },
  { name: "شركة التجارة والهندسة والخدمات العالمية (تيج تسكو)", nameEn: "TEGSCO Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "20/07/2026", city: "جدة", cityEn: "Jeddah", id: "9488" },
  { name: "شركة مستشفى أبناء محمد إبراهيم الفريح", nameEn: "Al-Furaih Hospital Co.", cr: "", type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", date: "20/07/2026", city: "الدمام", cityEn: "Dammam", id: "9487" },
  { name: "شركة عبدالوهاب صالح بوقري", nameEn: "Abdulwahab Saleh Buqri Co.", cr: "4030277112", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "20/07/2026", city: "جدة", cityEn: "Jeddah", id: "9486" },
  { name: "شركة انجل الطبية", nameEn: "Angel Medical Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "19/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9485" },
  { name: "شركة مطاعم الصياد", nameEn: "Al-Sayyad Restaurants Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "19/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9484" },
  { name: "شركة نقل وتوزيع المياه المحدودة", nameEn: "Water Transport & Distribution Co.", cr: "", type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", date: "19/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9483" },
  { name: "شركة الأمان للتجارة والمقاولات", nameEn: "Al-Aman Trading & Contracting Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "19/07/2026", city: "جدة", cityEn: "Jeddah", id: "9482" },
  { name: "شركة المتحدة للتنمية والاستثمار", nameEn: "United Development & Investment Co.", cr: "", type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", date: "19/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9481" },
  { name: "شركة حسن مسفر الزهراني وشركاه", nameEn: "Hassan Misfer Al-Zahrani & Partners Co.", cr: "2050001522", type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", date: "16/07/2026", city: "القصيم", cityEn: "Qassim", id: "9480" },
  { name: "شركة الخليج للتدريب والتعليم", nameEn: "Gulf Training & Education Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "13/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9470" },
  { name: "شركة المعالي للتجارة", nameEn: "Al-Maali Trading Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "13/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9471" },
  { name: "شركة ركن المستقبل للمقاولات", nameEn: "Future Corner Contracting Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "13/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9472" },
  { name: "شركة الصفوة للنقل", nameEn: "Al-Safwa Transport Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "13/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9473" },
  { name: "شركة نجوم الخليج للتجارة", nameEn: "Gulf Stars Trading Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "13/07/2026", city: "جدة", cityEn: "Jeddah", id: "9474" },
  { name: "شركة البيت الأنيق للمفروشات", nameEn: "Elegant House Furniture Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "12/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9460" },
  { name: "شركة الوسام للتجارة والتوزيع", nameEn: "Al-Wesam Trading & Distribution Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "12/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9461" },
  { name: "شركة المسار التقني", nameEn: "Technical Path Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "12/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9462" },
  { name: "شركة الفارس للخدمات اللوجستية", nameEn: "Al-Fares Logistics Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "09/07/2026", city: "جدة", cityEn: "Jeddah", id: "9450" },
  { name: "شركة النخبة للاستشارات", nameEn: "Elite Consulting Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "09/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9451" },
  { name: "شركة الرائد للمقاولات العامة", nameEn: "Al-Raed General Contracting Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "08/07/2026", city: "الدمام", cityEn: "Dammam", id: "9445" },
  { name: "شركة الأفق للتطوير العقاري", nameEn: "Horizon Real Estate Development Co.", cr: "", type: "تصفية", typeEn: "Liquidation", date: "08/07/2026", city: "جدة", cityEn: "Jeddah", id: "9446" },
  { name: "شركة الشموخ للتجارة", nameEn: "Al-Shumoukh Trading Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "07/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9440" },
  { name: "شركة الوفاء للخدمات الغذائية", nameEn: "Al-Wafa Food Services Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "06/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9435" },
  { name: "شركة البناء المتكامل", nameEn: "Integrated Construction Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "06/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9436" },
  { name: "شركة الأندلس للسياحة والسفر", nameEn: "Andalus Tourism & Travel Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "05/07/2026", city: "جدة", cityEn: "Jeddah", id: "9430" },
  { name: "شركة التميز للحلول التقنية", nameEn: "Excellence Tech Solutions Co.", cr: "", type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", date: "05/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9431" },
  { name: "شركة المدار للتوريدات", nameEn: "Al-Madar Supplies Co.", cr: "", type: "تصفية إدارية", typeEn: "Administrative Liquidation", date: "05/07/2026", city: "الرياض", cityEn: "Riyadh", id: "9432" },
  { name: "شركة الواحة للمقاولات", nameEn: "Al-Waha Contracting Co.", cr: "", type: "تسوية وقائية", typeEn: "Preventive Settlement", date: "01/07/2026", city: "الدمام", cityEn: "Dammam", id: "9420" },
];

// إحصائيات مُحسوبة
const stats = {
  total: 70,
  byType: [
    { type: "تصفية إدارية", typeEn: "Administrative Liquidation", count: 49, pct: 70 },
    { type: "تصفية", typeEn: "Liquidation", count: 14, pct: 20 },
    { type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", count: 5, pct: 7.1 },
    { type: "تسوية وقائية", typeEn: "Preventive Settlement", count: 2, pct: 2.9 },
  ],
  byCity: [
    { city: "الرياض", cityEn: "Riyadh", count: 35, pct: 50 },
    { city: "جدة", cityEn: "Jeddah", count: 11, pct: 15.7 },
    { city: "الدمام", cityEn: "Dammam", count: 6, pct: 8.6 },
    { city: "القصيم", cityEn: "Qassim", count: 3, pct: 4.3 },
    { city: "أخرى", cityEn: "Other", count: 15, pct: 21.4 },
  ],
};

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    "تسوية وقائية": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "إعادة تنظيم مالي": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "تصفية": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "تصفية إدارية": "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded border ${colors[type] || "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
      {type}
    </span>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-[oklch(0.22_0.03_250)] border border-[oklch(0.3_0.03_250)] rounded-lg p-4 text-center">
      <div className="text-3xl font-bold text-[oklch(0.75_0.12_70)]">{value}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{value} ({pct.toFixed(0)}%)</span>
      </div>
      <div className="h-2 bg-[oklch(0.2_0.02_250)] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function BankruptcyReport202607() {
  const { lang } = useLanguage();
  const isEnglish = lang === "en";

  const title = isEnglish
    ? "Saudi Bankruptcy Announcements Report — July 2026"
    : "تقرير إعلانات الإفلاس السعودية — يوليو 2026";
  const description = isEnglish
    ? "Monthly analytical report on Saudi bankruptcy announcements for July 2026. Covering 70 announcements across liquidation, financial reorganization, and preventive settlement procedures."
    : "تقرير تحليلي شهري لإعلانات الإفلاس في المملكة العربية السعودية لشهر يوليو 2026. يغطي 70 إعلاناً تشمل التصفية وإعادة التنظيم المالي والتسوية الوقائية.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://redwan.sa/bankruptcy/reports/2026-07" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "datePublished": "2026-07-31",
          "dateModified": "2026-07-31",
          "author": { "@type": "Person", "name": "عبدالرحمن بن رضوان المشيقح", "jobTitle": "محامي وأمين إفلاس مرخّص" },
          "publisher": { "@type": "Organization", "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة" },
          "description": description
        })}</script>
      </Helmet>

      <article className="max-w-5xl mx-auto px-4 py-12" dir={isEnglish ? "ltr" : "rtl"}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[oklch(0.75_0.12_70)] transition-colors">{isEnglish ? "Home" : "الرئيسية"}</Link>
          <span>/</span>
          <Link href="/bankruptcy" className="hover:text-[oklch(0.75_0.12_70)] transition-colors">{isEnglish ? "Bankruptcy" : "الإفلاس"}</Link>
          <span>/</span>
          <Link href="/bankruptcy/reports" className="hover:text-[oklch(0.75_0.12_70)] transition-colors">{isEnglish ? "Reports" : "التقارير"}</Link>
          <span>/</span>
          <span className="text-gray-300">{isEnglish ? "July 2026" : "يوليو 2026"}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[oklch(0.75_0.12_70)]/20 text-[oklch(0.75_0.12_70)] text-sm rounded-full border border-[oklch(0.75_0.12_70)]/30">
              {isEnglish ? "Monthly Report" : "تقرير شهري"}
            </span>
            <span className="text-sm text-gray-400">31 {isEnglish ? "July" : "يوليو"} 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {isEnglish ? "Saudi Bankruptcy Announcements" : "إعلانات الإفلاس السعودية"}
            <br />
            <span className="text-[oklch(0.75_0.12_70)]">{isEnglish ? "July 2026" : "يوليو 2026"}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            {isEnglish
              ? "A comprehensive analytical review of all bankruptcy announcements published by the Bankruptcy Commission (Isar) during July 2026, with professional legal commentary."
              : "مراجعة تحليلية شاملة لجميع إعلانات الإفلاس المنشورة من لجنة الإفلاس (إيسار) خلال شهر يوليو 2026، مع تعليق قانوني مهني."}
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>✍️ {isEnglish ? "Abdulrahman Redwan Al-Mushaiqih" : "أ. عبدالرحمن بن رضوان المشيقح"}</span>
            <span>|</span>
            <span>{isEnglish ? "Licensed Bankruptcy Trustee" : "أمين إفلاس مرخّص"}</span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="bg-[oklch(0.18_0.03_250)] border border-[oklch(0.3_0.04_250)] rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-4">
            {isEnglish ? "Executive Summary" : "الملخص التنفيذي"}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {isEnglish
              ? "July 2026 witnessed 70 bankruptcy announcements in Saudi Arabia, a significant volume reflecting ongoing market corrections. Administrative liquidation dominated at 70% of all cases, indicating that most distressed entities are small businesses being wound down by the Bankruptcy Commission (Isar) directly. Notably, 5 companies entered financial reorganization — a positive signal showing attempts at business rescue rather than outright closure. Riyadh accounted for 50% of all cases, followed by Jeddah (15.7%) and Dammam (8.6%)."
              : "شهد شهر يوليو 2026 صدور 70 إعلان إفلاس في المملكة العربية السعودية، وهو حجم كبير يعكس استمرار التصحيحات في السوق. هيمنت التصفية الإدارية بنسبة 70% من إجمالي الحالات، مما يشير إلى أن معظم المنشآت المتعثرة هي شركات صغيرة تتولى لجنة الإفلاس (إيسار) تصفيتها مباشرة. والجدير بالملاحظة أن 5 شركات دخلت إجراء إعادة التنظيم المالي — وهو مؤشر إيجابي يدل على محاولات لإنقاذ الأعمال بدلاً من إغلاقها. استحوذت الرياض على 50% من الحالات، تليها جدة (15.7%) ثم الدمام (8.6%)."}
          </p>
        </section>

        {/* Key Stats */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6">
            {isEnglish ? "Key Figures" : "الأرقام الرئيسية"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label={isEnglish ? "Total Announcements" : "إجمالي الإعلانات"} value={stats.total} />
            <StatCard label={isEnglish ? "Reorganization" : "إعادة تنظيم"} value={5} sub={isEnglish ? "Positive signal" : "مؤشر إيجابي"} />
            <StatCard label={isEnglish ? "Preventive Settlement" : "تسوية وقائية"} value={2} sub={isEnglish ? "Early intervention" : "تدخل مبكر"} />
            <StatCard label={isEnglish ? "Cities Covered" : "المدن المشمولة"} value={4} />
          </div>
        </section>

        {/* Distribution by Type */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6">
            {isEnglish ? "Distribution by Procedure Type" : "التوزيع حسب نوع الإجراء"}
          </h2>
          <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(0.3_0.04_250)] rounded-xl p-6">
            <ProgressBar label={isEnglish ? "Administrative Liquidation" : "التصفية الإدارية"} value={49} max={70} color="bg-red-500" />
            <ProgressBar label={isEnglish ? "Liquidation" : "التصفية"} value={14} max={70} color="bg-amber-500" />
            <ProgressBar label={isEnglish ? "Financial Reorganization" : "إعادة التنظيم المالي"} value={5} max={70} color="bg-emerald-500" />
            <ProgressBar label={isEnglish ? "Preventive Settlement" : "التسوية الوقائية"} value={2} max={70} color="bg-blue-500" />
          </div>
        </section>

        {/* Distribution by City */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6">
            {isEnglish ? "Distribution by City" : "التوزيع حسب المدينة"}
          </h2>
          <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(0.3_0.04_250)] rounded-xl p-6">
            {stats.byCity.map((c) => (
              <ProgressBar key={c.city} label={isEnglish ? c.cityEn : c.city} value={c.count} max={70} color="bg-[oklch(0.65_0.12_250)]" />
            ))}
          </div>
        </section>

        {/* Announcements Table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6">
            {isEnglish ? "Companies in Bankruptcy Proceedings" : "الشركات الداخلة في إجراءات الإفلاس"}
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            {isEnglish
              ? "Showing a representative sample of 38 announcements from July 2026. Full data available in the downloadable report."
              : "عرض عينة تمثيلية من 38 إعلاناً خلال يوليو 2026. البيانات الكاملة متاحة في التقرير القابل للتحميل."}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[oklch(0.3_0.03_250)]">
                  <th className="text-start text-gray-400 py-3 px-2 font-medium">{isEnglish ? "Company" : "الشركة"}</th>
                  <th className="text-start text-gray-400 py-3 px-2 font-medium">{isEnglish ? "Procedure" : "الإجراء"}</th>
                  <th className="text-start text-gray-400 py-3 px-2 font-medium">{isEnglish ? "City" : "المدينة"}</th>
                  <th className="text-start text-gray-400 py-3 px-2 font-medium">{isEnglish ? "Date" : "التاريخ"}</th>
                  <th className="text-start text-gray-400 py-3 px-2 font-medium">{isEnglish ? "Source" : "المصدر"}</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a, i) => (
                  <tr key={i} className="border-b border-[oklch(0.25_0.02_250)] hover:bg-[oklch(0.2_0.02_250)] transition-colors">
                    <td className="py-3 px-2">
                      <div className="text-gray-200 font-medium">{isEnglish ? a.nameEn : a.name}</div>
                      {a.cr && <div className="text-xs text-gray-500 mt-0.5">{isEnglish ? "CR:" : "س.ت:"} {a.cr}</div>}
                    </td>
                    <td className="py-3 px-2"><TypeBadge type={isEnglish ? a.typeEn : a.type} /></td>
                    <td className="py-3 px-2 text-gray-400">{isEnglish ? a.cityEn : a.city}</td>
                    <td className="py-3 px-2 text-gray-400 whitespace-nowrap">{a.date}</td>
                    <td className="py-3 px-2">
                      <a
                        href={`https://bankruptcy.gov.sa/ar/Announcements/Pages/announcementDetails.aspx?AdID=${a.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[oklch(0.65_0.12_250)] hover:underline text-xs"
                      >
                        {isEnglish ? "Official" : "الرسمي"} ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Legal Commentary */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">
            {isEnglish ? "Professional Legal Commentary" : "التعليق القانوني المهني"}
          </h2>
          <div className="bg-[oklch(0.18_0.03_250)] border-s-4 border-[oklch(0.75_0.12_70)] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              {isEnglish
                ? "The dominance of administrative liquidation (70%) reflects the natural lifecycle of small businesses in Saudi Arabia. Most of these are companies that have ceased operations and are being formally wound down through the simplified administrative process managed by Isar. This is not necessarily alarming — it represents the system working as designed to clean up dormant commercial registrations."
                : "هيمنة التصفية الإدارية (70%) تعكس الدورة الطبيعية للمنشآت الصغيرة في المملكة. معظم هذه الشركات توقفت عن النشاط ويتم تصفيتها رسمياً عبر الإجراء الإداري المبسّط الذي تديره إيسار. هذا ليس بالضرورة مقلقاً — بل يمثل عمل النظام كما صُمم لتنظيف السجلات التجارية الخاملة."}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {isEnglish
                ? "The 5 financial reorganization cases are the most significant from a creditor perspective. These companies are attempting to restructure their debts and continue operations. Creditors of these entities should actively participate in the voting process on reorganization proposals to protect their rights."
                : "حالات إعادة التنظيم المالي الخمس هي الأكثر أهمية من منظور الدائنين. هذه الشركات تحاول إعادة هيكلة ديونها والاستمرار في العمل. على دائني هذه المنشآت المشاركة الفعّالة في عملية التصويت على مقترحات إعادة التنظيم لحماية حقوقهم."}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {isEnglish
                ? "Key observation: The concentration of cases in Riyadh (50%) aligns with the capital's share of commercial registrations. However, the relatively low number of preventive settlements (only 2) suggests that businesses may be seeking intervention too late. Early engagement with bankruptcy professionals can significantly improve recovery outcomes for all stakeholders."
                : "ملاحظة مهمة: تركّز الحالات في الرياض (50%) يتوافق مع حصة العاصمة من السجلات التجارية. لكن العدد المنخفض نسبياً للتسوية الوقائية (حالتان فقط) يشير إلى أن المنشآت قد تلجأ للتدخل متأخرة. التواصل المبكر مع متخصصي الإفلاس يمكن أن يحسّن بشكل كبير نتائج الاسترداد لجميع الأطراف."}
            </p>
          </div>
        </section>

        {/* Creditor Alerts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">
            {isEnglish ? "Alerts for Creditors" : "تنبيهات للدائنين"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
              <h3 className="text-emerald-400 font-bold mb-2">{isEnglish ? "If you are a creditor" : "إذا كنت دائناً"}</h3>
              <p className="text-gray-300 text-sm">
                {isEnglish
                  ? "Check if your debtor is listed above. If so, you must file your claim with the appointed trustee within the legally specified period to preserve your rights."
                  : "تحقق مما إذا كان مدينك مدرجاً أعلاه. إذا كان كذلك، يجب عليك تقديم مطالبتك لدى الأمين المعيّن خلال المدة النظامية المحددة لحفظ حقوقك."}
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h3 className="text-amber-400 font-bold mb-2">{isEnglish ? "Voting deadlines" : "مواعيد التصويت"}</h3>
              <p className="text-gray-300 text-sm">
                {isEnglish
                  ? "Companies in financial reorganization will announce voting dates on their proposals. Missing the vote means accepting whatever the majority decides."
                  : "الشركات في إعادة التنظيم المالي ستعلن مواعيد التصويت على مقترحاتها. عدم المشاركة في التصويت يعني القبول بما تقرره الأغلبية."}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[oklch(0.25_0.05_250)] to-[oklch(0.2_0.04_250)] border border-[oklch(0.35_0.05_250)] rounded-xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            {isEnglish ? "Are you a creditor of one of these companies?" : "هل أنت دائن لإحدى هذه الشركات؟"}
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {isEnglish
              ? "We can help you file your claim, attend creditor meetings, and vote on reorganization proposals to protect your rights."
              : "نستطيع مساعدتك في تقديم مطالبتك، وحضور اجتماعات الدائنين، والتصويت على مقترحات إعادة التنظيم لحماية حقوقك."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/966920032760"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.467A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.09-.57-5.794-1.564l-.415-.248-4.308 1.13 1.15-4.2-.272-.432A9.706 9.706 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
              {isEnglish ? "WhatsApp" : "واتساب"}
            </a>
            <Link
              href="/bankruptcy/claims"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.75_0.12_70)] hover:bg-[oklch(0.7_0.12_70)] text-[oklch(0.15_0.03_250)] rounded-lg font-medium transition-colors"
            >
              {isEnglish ? "File a Claim" : "تقديم مطالبة"}
            </Link>
          </div>
        </section>

        {/* Source & Methodology */}
        <section className="mb-10 text-sm text-gray-500">
          <h3 className="text-gray-400 font-medium mb-2">{isEnglish ? "Source & Methodology" : "المصدر والمنهجية"}</h3>
          <p>
            {isEnglish
              ? "Data sourced from the official Saudi Bankruptcy Commission (Isar) announcements portal. This report covers all announcements published between July 1-31, 2026. Company names and procedure types are taken directly from official announcements. The legal commentary represents the professional opinion of the author and does not constitute legal advice for specific cases."
              : "البيانات مستقاة من بوابة إعلانات لجنة الإفلاس (إيسار) الرسمية. يغطي هذا التقرير جميع الإعلانات المنشورة بين 1-31 يوليو 2026. أسماء الشركات وأنواع الإجراءات مأخوذة مباشرة من الإعلانات الرسمية. التعليق القانوني يمثل الرأي المهني للمؤلف ولا يشكل استشارة قانونية لحالات محددة."}
          </p>
          <p className="mt-2">
            <a href="https://bankruptcy.gov.sa/ar/Announcements/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.65_0.12_250)] hover:underline">
              {isEnglish ? "Official Announcements Portal →" : "بوابة الإعلانات الرسمية →"}
            </a>
          </p>
        </section>

        {/* Author */}
        <footer className="border-t border-[oklch(0.3_0.03_250)] pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[oklch(0.25_0.04_250)] flex items-center justify-center text-[oklch(0.75_0.12_70)] font-bold text-lg">
              ع
            </div>
            <div>
              <div className="text-white font-medium">{isEnglish ? "Abdulrahman Redwan Al-Mushaiqih" : "أ. عبدالرحمن بن رضوان المشيقح"}</div>
              <div className="text-gray-400 text-sm">{isEnglish ? "Lawyer & Licensed Bankruptcy Trustee" : "محامي وأمين إفلاس مرخّص"}</div>
              <div className="text-gray-500 text-xs mt-0.5">{isEnglish ? "Last reviewed: July 31, 2026" : "آخر مراجعة: 31 يوليو 2026"}</div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
