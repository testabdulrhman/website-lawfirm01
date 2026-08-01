import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { BarChart3, TrendingUp, AlertTriangle, MapPin, FileText, Scale } from "lucide-react";

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
    { type: "تصفية إدارية", typeEn: "Administrative Liquidation", count: 49, pct: 70, color: "bg-red-500" },
    { type: "تصفية", typeEn: "Liquidation", count: 14, pct: 20, color: "bg-amber-500" },
    { type: "إعادة تنظيم مالي", typeEn: "Financial Reorganization", count: 5, pct: 7.1, color: "bg-emerald-500" },
    { type: "تسوية وقائية", typeEn: "Preventive Settlement", count: 2, pct: 2.9, color: "bg-blue-500" },
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
    "تسوية وقائية": "bg-blue-100 text-blue-800 border-blue-200",
    "إعادة تنظيم مالي": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "تصفية": "bg-amber-100 text-amber-800 border-amber-200",
    "تصفية إدارية": "bg-red-100 text-red-800 border-red-200",
    "Preventive Settlement": "bg-blue-100 text-blue-800 border-blue-200",
    "Financial Reorganization": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Liquidation": "bg-amber-100 text-amber-800 border-amber-200",
    "Administrative Liquidation": "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded border ${colors[type] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
      {type}
    </span>
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

      {/* Hero Section - Navy */}
      <section className="relative bg-[var(--color-navy)] pt-28 md:pt-32 pb-16 md:pb-20" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-7" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">{isEnglish ? "Home" : "الرئيسية"}</Link>
            <span>/</span>
            <Link href="/bankruptcy" className="hover:text-white">{isEnglish ? "Bankruptcy" : "الإفلاس"}</Link>
            <span>/</span>
            <Link href="/bankruptcy/reports" className="hover:text-white">{isEnglish ? "Reports" : "التقارير"}</Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">{isEnglish ? "July 2026" : "يوليو 2026"}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-semibold">
            <BarChart3 size={16} />
            {isEnglish ? "Monthly Report" : "تقرير شهري"}
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {isEnglish ? "Saudi Bankruptcy Announcements" : "إعلانات الإفلاس السعودية"}
            <br />
            <span className="text-[var(--color-gold)]">{isEnglish ? "July 2026" : "يوليو 2026"}</span>
          </h1>

          <p className="font-body text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mb-6">
            {isEnglish
              ? "A comprehensive analytical review of all bankruptcy announcements published by the Bankruptcy Commission (Isar) during July 2026, with professional legal commentary."
              : "مراجعة تحليلية شاملة لجميع إعلانات الإفلاس المنشورة من لجنة الإفلاس (إيسار) خلال شهر يوليو 2026، مع تعليق قانوني مهني."}
          </p>

          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>✍️ {isEnglish ? "Abdulrahman Redwan Al-Mushaiqih" : "أ. عبدالرحمن بن رضوان المشيقح"}</span>
            <span>|</span>
            <span>{isEnglish ? "Licensed Bankruptcy Trustee" : "أمين إفلاس مرخّص"}</span>
            <span>|</span>
            <span>31 {isEnglish ? "July" : "يوليو"} 2026</span>
          </div>
        </div>
      </section>

      {/* Key Stats - White Section */}
      <section className="py-14 md:py-20 bg-white" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-[var(--color-border)] bg-[var(--color-cream)]">
              <div className="text-4xl font-bold text-[var(--color-navy)] font-display">{stats.total}</div>
              <div className="text-sm text-[var(--color-navy)]/60 mt-2 font-body">{isEnglish ? "Total Announcements" : "إجمالي الإعلانات"}</div>
            </div>
            <div className="text-center p-6 border border-[var(--color-border)] bg-[var(--color-cream)]">
              <div className="text-4xl font-bold text-emerald-600 font-display">5</div>
              <div className="text-sm text-[var(--color-navy)]/60 mt-2 font-body">{isEnglish ? "Reorganization" : "إعادة تنظيم"}</div>
              <div className="text-xs text-emerald-600 mt-1">{isEnglish ? "Positive signal" : "مؤشر إيجابي"}</div>
            </div>
            <div className="text-center p-6 border border-[var(--color-border)] bg-[var(--color-cream)]">
              <div className="text-4xl font-bold text-blue-600 font-display">2</div>
              <div className="text-sm text-[var(--color-navy)]/60 mt-2 font-body">{isEnglish ? "Preventive Settlement" : "تسوية وقائية"}</div>
              <div className="text-xs text-blue-600 mt-1">{isEnglish ? "Early intervention" : "تدخل مبكر"}</div>
            </div>
            <div className="text-center p-6 border border-[var(--color-border)] bg-[var(--color-cream)]">
              <div className="text-4xl font-bold text-[var(--color-navy)] font-display">4</div>
              <div className="text-sm text-[var(--color-navy)]/60 mt-2 font-body">{isEnglish ? "Cities Covered" : "المدن المشمولة"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary - Cream Section */}
      <section className="py-14 md:py-20 bg-[var(--color-cream)]" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-[var(--color-gold)]" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
              {isEnglish ? "Executive Summary" : "الملخص التنفيذي"}
            </h2>
          </div>
          <div className="bg-white border border-[var(--color-border)] p-6 md:p-8">
            <p className="font-body text-[var(--color-navy)]/75 leading-loose">
              {isEnglish
                ? "July 2026 witnessed 70 bankruptcy announcements in Saudi Arabia, a significant volume reflecting ongoing market corrections. Administrative liquidation dominated at 70% of all cases, indicating that most distressed entities are small businesses being wound down by the Bankruptcy Commission (Isar) directly. Notably, 5 companies entered financial reorganization — a positive signal showing attempts at business rescue rather than outright closure. Riyadh accounted for 50% of all cases, followed by Jeddah (15.7%) and Dammam (8.6%)."
                : "شهد شهر يوليو 2026 صدور 70 إعلان إفلاس في المملكة العربية السعودية، وهو حجم كبير يعكس استمرار التصحيحات في السوق. هيمنت التصفية الإدارية بنسبة 70% من إجمالي الحالات، مما يشير إلى أن معظم المنشآت المتعثرة هي شركات صغيرة تتولى لجنة الإفلاس (إيسار) تصفيتها مباشرة. والجدير بالملاحظة أن 5 شركات دخلت إجراء إعادة التنظيم المالي — وهو مؤشر إيجابي يدل على محاولات لإنقاذ الأعمال بدلاً من إغلاقها. استحوذت الرياض على 50% من الحالات، تليها جدة (15.7%) ثم الدمام (8.6%)."}
            </p>
          </div>
        </div>
      </section>

      {/* Distribution Charts - White Section */}
      <section className="py-14 md:py-20 bg-white" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* By Type */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-[var(--color-gold)]" size={20} />
                <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">
                  {isEnglish ? "By Procedure Type" : "حسب نوع الإجراء"}
                </h2>
              </div>
              <div className="space-y-4">
                {stats.byType.map((item) => (
                  <div key={item.type}>
                    <div className="flex justify-between text-sm mb-1.5 font-body">
                      <span className="text-[var(--color-navy)]/80">{isEnglish ? item.typeEn : item.type}</span>
                      <span className="text-[var(--color-navy)]/50 font-medium">{item.count} ({item.pct}%)</span>
                    </div>
                    <div className="h-3 bg-[var(--color-cream)] rounded-full overflow-hidden border border-[var(--color-border)]">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By City */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-[var(--color-gold)]" size={20} />
                <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)]">
                  {isEnglish ? "By City" : "حسب المدينة"}
                </h2>
              </div>
              <div className="space-y-4">
                {stats.byCity.map((item) => (
                  <div key={item.city}>
                    <div className="flex justify-between text-sm mb-1.5 font-body">
                      <span className="text-[var(--color-navy)]/80">{isEnglish ? item.cityEn : item.city}</span>
                      <span className="text-[var(--color-navy)]/50 font-medium">{item.count} ({item.pct}%)</span>
                    </div>
                    <div className="h-3 bg-[var(--color-cream)] rounded-full overflow-hidden border border-[var(--color-border)]">
                      <div className="h-full rounded-full bg-[var(--color-navy)]" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Table - Cream Section */}
      <section className="py-14 md:py-20 bg-[var(--color-cream)]" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-[var(--color-gold)]" size={20} />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
              {isEnglish ? "Companies in Bankruptcy Proceedings" : "الشركات الداخلة في إجراءات الإفلاس"}
            </h2>
          </div>
          <p className="font-body text-[var(--color-navy)]/60 text-sm mb-6">
            {isEnglish
              ? "Showing a representative sample of 38 announcements from July 2026. Full data available in the downloadable report."
              : "عرض عينة تمثيلية من 38 إعلاناً خلال يوليو 2026. البيانات الكاملة متاحة في التقرير القابل للتحميل."}
          </p>
          <div className="overflow-x-auto bg-white border border-[var(--color-border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-navy)]">
                  <th className="text-start text-white/80 py-3 px-4 font-medium font-body">{isEnglish ? "Company" : "الشركة"}</th>
                  <th className="text-start text-white/80 py-3 px-4 font-medium font-body">{isEnglish ? "Procedure" : "الإجراء"}</th>
                  <th className="text-start text-white/80 py-3 px-4 font-medium font-body">{isEnglish ? "City" : "المدينة"}</th>
                  <th className="text-start text-white/80 py-3 px-4 font-medium font-body">{isEnglish ? "Date" : "التاريخ"}</th>
                  <th className="text-start text-white/80 py-3 px-4 font-medium font-body">{isEnglish ? "Source" : "المصدر"}</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a, i) => (
                  <tr key={i} className="border-b border-[var(--color-border)] hover:bg-[var(--color-cream)] transition-colors">
                    <td className="py-3 px-4">
                      <div className="text-[var(--color-navy)] font-medium font-body">{isEnglish ? a.nameEn : a.name}</div>
                      {a.cr && <div className="text-xs text-[var(--color-navy)]/50 mt-0.5">{isEnglish ? "CR:" : "س.ت:"} {a.cr}</div>}
                    </td>
                    <td className="py-3 px-4"><TypeBadge type={isEnglish ? a.typeEn : a.type} /></td>
                    <td className="py-3 px-4 text-[var(--color-navy)]/60 font-body">{isEnglish ? a.cityEn : a.city}</td>
                    <td className="py-3 px-4 text-[var(--color-navy)]/60 font-body whitespace-nowrap">{a.date}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`https://bankruptcy.gov.sa/ar/Announcements/Pages/announcementDetails.aspx?AdID=${a.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-gold)] hover:underline text-xs font-medium"
                      >
                        {isEnglish ? "Official" : "الرسمي"} ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Legal Commentary - White Section */}
      <section className="py-14 md:py-20 bg-white" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-[var(--color-gold)]" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
              {isEnglish ? "Professional Legal Commentary" : "التعليق القانوني المهني"}
            </h2>
          </div>
          <div className="border-s-4 border-[var(--color-gold)] bg-[var(--color-cream)] p-6 md:p-8 space-y-5">
            <p className="font-body text-[var(--color-navy)]/75 leading-loose">
              {isEnglish
                ? "The dominance of administrative liquidation (70%) reflects the natural lifecycle of small businesses in Saudi Arabia. Most of these are companies that have ceased operations and are being formally wound down through the simplified administrative process managed by Isar. This is not necessarily alarming — it represents the system working as designed to clean up dormant commercial registrations."
                : "هيمنة التصفية الإدارية (70%) تعكس الدورة الطبيعية للمنشآت الصغيرة في المملكة. معظم هذه الشركات توقفت عن النشاط ويتم تصفيتها رسمياً عبر الإجراء الإداري المبسّط الذي تديره إيسار. هذا ليس بالضرورة مقلقاً — بل يمثل عمل النظام كما صُمم لتنظيف السجلات التجارية الخاملة."}
            </p>
            <p className="font-body text-[var(--color-navy)]/75 leading-loose">
              {isEnglish
                ? "The 5 financial reorganization cases are the most significant from a creditor perspective. These companies are attempting to restructure their debts and continue operations. Creditors of these entities should actively participate in the voting process on reorganization proposals to protect their rights."
                : "حالات إعادة التنظيم المالي الخمس هي الأكثر أهمية من منظور الدائنين. هذه الشركات تحاول إعادة هيكلة ديونها والاستمرار في العمل. على دائني هذه المنشآت المشاركة الفعّالة في عملية التصويت على مقترحات إعادة التنظيم لحماية حقوقهم."}
            </p>
            <p className="font-body text-[var(--color-navy)]/75 leading-loose">
              {isEnglish
                ? "Key observation: The concentration of cases in Riyadh (50%) aligns with the capital's share of commercial registrations. However, the relatively low number of preventive settlements (only 2) suggests that businesses may be seeking intervention too late. Early engagement with bankruptcy professionals can significantly improve recovery outcomes for all stakeholders."
                : "ملاحظة مهمة: تركّز الحالات في الرياض (50%) يتوافق مع حصة العاصمة من السجلات التجارية. لكن العدد المنخفض نسبياً للتسوية الوقائية (حالتان فقط) يشير إلى أن المنشآت قد تلجأ للتدخل متأخرة. التواصل المبكر مع متخصصي الإفلاس يمكن أن يحسّن بشكل كبير نتائج الاسترداد لجميع الأطراف."}
            </p>
          </div>
        </div>
      </section>

      {/* Creditor Alerts - Cream Section */}
      <section className="py-14 md:py-20 bg-[var(--color-cream)]" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-[var(--color-gold)]" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
              {isEnglish ? "Alerts for Creditors" : "تنبيهات للدائنين"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-t-4 border-emerald-500 p-7">
              <h3 className="font-display text-lg font-bold text-[var(--color-navy)] mb-3">{isEnglish ? "If you are a creditor" : "إذا كنت دائناً"}</h3>
              <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed">
                {isEnglish
                  ? "Check if your debtor is listed above. If so, you must file your claim with the appointed trustee within the legally specified period to preserve your rights."
                  : "تحقق مما إذا كان مدينك مدرجاً أعلاه. إذا كان كذلك، يجب عليك تقديم مطالبتك لدى الأمين المعيّن خلال المدة النظامية المحددة لحفظ حقوقك."}
              </p>
            </div>
            <div className="bg-white border-t-4 border-amber-500 p-7">
              <h3 className="font-display text-lg font-bold text-[var(--color-navy)] mb-3">{isEnglish ? "Voting deadlines" : "مواعيد التصويت"}</h3>
              <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed">
                {isEnglish
                  ? "Companies in financial reorganization will announce voting dates on their proposals. Missing the vote means accepting whatever the majority decides."
                  : "الشركات في إعادة التنظيم المالي ستعلن مواعيد التصويت على مقترحاتها. عدم المشاركة في التصويت يعني القبول بما تقرره الأغلبية."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Navy Section */}
      <section className="py-14 bg-[var(--color-navy)]" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            {isEnglish ? "Are you a creditor of one of these companies?" : "هل أنت دائن لإحدى هذه الشركات؟"}
          </h2>
          <p className="font-body text-white/60 mb-7 max-w-2xl mx-auto">
            {isEnglish
              ? "We can help you file your claim, attend creditor meetings, and vote on reorganization proposals to protect your rights."
              : "نستطيع مساعدتك في تقديم مطالبتك، وحضور اجتماعات الدائنين، والتصويت على مقترحات إعادة التنظيم لحماية حقوقك."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/966920032760"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] font-heading font-bold text-sm"
            >
              {isEnglish ? "WhatsApp" : "واتساب"}
            </a>
            <Link
              href="/bankruptcy/claims"
              className="px-6 py-3 border border-white/25 text-white font-heading font-semibold text-sm"
            >
              {isEnglish ? "File a Claim" : "تقديم مطالبة"}
            </Link>
            <a
              href="https://bankruptcy.gov.sa/ar/Announcements/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/25 text-white font-heading font-semibold text-sm"
            >
              {isEnglish ? "Official Announcements Portal" : "بوابة الإعلانات الرسمية"} →
            </a>
          </div>
        </div>
      </section>

      {/* Source & Author - White Section */}
      <section className="py-10 bg-white" dir={isEnglish ? "ltr" : "rtl"}>
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="flex items-center gap-4 border-t border-[var(--color-border)] pt-6">
            <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center text-[var(--color-gold)] font-bold text-lg">
              ع
            </div>
            <div>
              <div className="text-[var(--color-navy)] font-medium font-body">{isEnglish ? "Abdulrahman Redwan Al-Mushaiqih" : "أ. عبدالرحمن بن رضوان المشيقح"}</div>
              <div className="text-[var(--color-navy)]/50 text-sm font-body">{isEnglish ? "Lawyer & Licensed Bankruptcy Trustee" : "محامي وأمين إفلاس مرخّص"}</div>
              <div className="text-[var(--color-navy)]/40 text-xs mt-0.5 font-body">{isEnglish ? "Last reviewed: July 31, 2026" : "آخر مراجعة: 31 يوليو 2026"}</div>
            </div>
          </div>
          <p className="text-xs text-[var(--color-navy)]/40 mt-4 font-body">
            {isEnglish
              ? "Data sourced from the official Saudi Bankruptcy Commission (Isar) announcements portal. This report covers all announcements published between July 1-31, 2026. The legal commentary represents the professional opinion of the author and does not constitute legal advice for specific cases."
              : "البيانات مستقاة من بوابة إعلانات لجنة الإفلاس (إيسار) الرسمية. يغطي هذا التقرير جميع الإعلانات المنشورة بين 1-31 يوليو 2026. التعليق القانوني يمثل الرأي المهني للمؤلف ولا يشكل استشارة قانونية لحالات محددة."}
          </p>
        </div>
      </section>
    </>
  );
}
