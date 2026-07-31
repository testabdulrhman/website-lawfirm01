import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const reports = [
  {
    month: "يوليو 2026",
    monthEn: "July 2026",
    slug: "/bankruptcy/reports/2026-07",
    total: 70,
    highlight: "التصفية الإدارية تهيمن بـ 70%",
    highlightEn: "Administrative liquidation dominates at 70%",
    published: "31/07/2026",
  },
];

export default function BankruptcyReports() {
  const { lang } = useLanguage();
  const isEnglish = lang === "en";

  const title = isEnglish
    ? "Saudi Bankruptcy Monthly Reports"
    : "التقارير الشهرية لإعلانات الإفلاس السعودية";
  const description = isEnglish
    ? "Monthly analytical reports on Saudi bankruptcy announcements, with professional legal commentary from a licensed bankruptcy trustee."
    : "تقارير تحليلية شهرية لإعلانات الإفلاس في المملكة العربية السعودية، مع تعليق قانوني مهني من أمين إفلاس مرخّص.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://redwan.sa/bankruptcy/reports" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12" dir={isEnglish ? "ltr" : "rtl"}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[oklch(0.75_0.12_70)] transition-colors">{isEnglish ? "Home" : "الرئيسية"}</Link>
          <span>/</span>
          <Link href="/bankruptcy" className="hover:text-[oklch(0.75_0.12_70)] transition-colors">{isEnglish ? "Bankruptcy" : "الإفلاس"}</Link>
          <span>/</span>
          <span className="text-gray-300">{isEnglish ? "Reports" : "التقارير"}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isEnglish ? "Bankruptcy Monthly Reports" : "التقارير الشهرية للإفلاس"}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            {isEnglish
              ? "Professional monthly analysis of Saudi bankruptcy announcements. Each report covers all announcements published by the Bankruptcy Commission (Isar), with statistics, company listings, and expert legal commentary."
              : "تحليل شهري مهني لإعلانات الإفلاس السعودية. يغطي كل تقرير جميع الإعلانات المنشورة من لجنة الإفلاس (إيسار)، مع إحصائيات وقوائم الشركات وتعليق قانوني متخصص."}
          </p>
        </header>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {reports.map((report) => (
            <Link key={report.slug} href={report.slug}>
              <div className="group bg-[oklch(0.18_0.03_250)] border border-[oklch(0.3_0.04_250)] rounded-xl p-6 hover:border-[oklch(0.75_0.12_70)]/50 transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-[oklch(0.75_0.12_70)]/20 text-[oklch(0.75_0.12_70)] text-sm rounded-full border border-[oklch(0.75_0.12_70)]/30">
                        {isEnglish ? report.monthEn : report.month}
                      </span>
                      <span className="text-xs text-gray-500">{report.published}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-[oklch(0.75_0.12_70)] transition-colors">
                      {isEnglish ? `Bankruptcy Report — ${report.monthEn}` : `تقرير الإفلاس — ${report.month}`}
                    </h2>
                    <p className="text-gray-400 mt-1">{isEnglish ? report.highlightEn : report.highlight}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[oklch(0.75_0.12_70)]">{report.total}</div>
                      <div className="text-xs text-gray-500">{isEnglish ? "Announcements" : "إعلان"}</div>
                    </div>
                    <div className="text-gray-400 group-hover:text-[oklch(0.75_0.12_70)] transition-colors">
                      {isEnglish ? "→" : "←"}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center text-gray-500">
          <p>{isEnglish ? "New reports are published at the end of each month." : "تُنشر التقارير الجديدة في نهاية كل شهر."}</p>
          <p className="mt-2 text-sm">{isEnglish ? "Subscribe to get notified when new reports are available." : "تابعنا للحصول على إشعار عند صدور تقارير جديدة."}</p>
        </div>
      </div>
    </>
  );
}
