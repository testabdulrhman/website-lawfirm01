import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

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

        <div className="border border-[var(--color-gold)]/25 bg-[var(--color-navy-light)] p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-white">
            {isEnglish ? "Reports are being prepared" : "التقارير قيد الإعداد"}
          </h2>
          <p className="font-body text-gray-400 mt-3">
            {isEnglish
              ? "The first verified report will be published after completing source validation and editorial review."
              : "سيُنشر أول تقرير موثّق بعد اكتمال التحقق من المصادر والمراجعة التحريرية."}
          </p>
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
