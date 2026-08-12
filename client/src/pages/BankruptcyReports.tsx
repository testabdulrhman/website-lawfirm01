import { Link } from "wouter";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useSEO, schemas } from "@/hooks/useSEO";

export default function BankruptcyReports() {
  const archiveReports = [
    { month: "يونيو 2026", slug: "2026-06", total: 66, openings: 46 },
    { month: "مايو 2026", slug: "2026-05", total: 74, openings: 62 },
    { month: "أبريل 2026", slug: "2026-04", total: 73, openings: 56 },
    { month: "مارس 2026", slug: "2026-03", total: 64, openings: 50 },
    { month: "فبراير 2026", slug: "2026-02", total: 54, openings: 43 },
    { month: "يناير 2026", slug: "2026-01", total: 115, openings: 72 },
  ];

  useSEO({
    title: "التقارير الشهرية لإعلانات الإفلاس السعودية",
    description: "تقارير تحليلية شهرية لإعلانات الإفلاس في المملكة العربية السعودية، مع بيانات موثقة وتعليق مهني من أمين إفلاس مرخص.",
    canonical: "/bankruptcy/reports",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "التقارير الشهرية لإعلانات الإفلاس السعودية",
        url: "https://redwan.sa/bankruptcy/reports",
        inLanguage: "ar",
        about: ["إعلانات الإفلاس في السعودية", "نظام الإفلاس السعودي", "لجنة الإفلاس إيسار"],
      },
      schemas.breadcrumb([
        { name: "الرئيسية", url: "/" },
        { name: "الإفلاس", url: "/bankruptcy" },
        { name: "التقارير الشهرية", url: "/bankruptcy/reports" },
      ]),
    ],
  });

  return (
    <main dir="rtl" className="bg-[#f6f3ed] text-[var(--color-navy)]">
      <section className="bg-[var(--color-navy)] pt-32 pb-16 text-white md:pt-40 md:pb-24">
        <div className="container mx-auto px-5 md:px-8">
          <nav className="mb-7 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-[var(--color-gold)]">الرئيسية</Link><span>/</span>
            <Link href="/bankruptcy" className="hover:text-[var(--color-gold)]">الإفلاس</Link><span>/</span>
            <span className="text-[var(--color-gold)]">التقارير الشهرية</span>
          </nav>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight md:text-5xl">التقارير الشهرية لإعلانات الإفلاس</h1>
          <p className="mt-6 max-w-3xl font-body text-lg leading-8 text-white/70">
            سلسلة شهرية توثق إعلانات لجنة الإفلاس «إيسار»، وتفصل افتتاحات الإجراءات عن الانتقالات والإعلانات اللاحقة، مع روابط المصادر الرسمية.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <article className="grid overflow-hidden border border-black/10 bg-white lg:grid-cols-[0.7fr_1.3fr]">
            <div className="flex min-h-64 flex-col justify-between bg-[var(--color-navy)] p-8 text-white md:p-10">
              <FileText className="h-10 w-10 text-[var(--color-gold)]" />
              <div>
                <div className="font-heading text-5xl font-bold text-[var(--color-gold)]">70</div>
                <div className="mt-2 text-white/60">إعلاناً رسمياً موثقاً · 51 افتتاحاً جديداً</div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="text-sm font-semibold text-[var(--color-gold)]">الإصدار المطوّر · يوليو 2026</div>
              <h2 className="mt-3 font-heading text-3xl font-bold">تقرير إعلانات الإفلاس في السعودية</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[var(--color-navy)]/65">
                تحليل الافتتاحات الجديدة والإعلانات اللاحقة، وتوزيع الإجراءات والمحاكم، وأعمار الشركات وقطاعاتها، وروابط لجنة الإفلاس مع تعليق مهني من أمين إفلاس مرخص.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/bankruptcy/reports/2026-07" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-gold)] px-6 py-3 font-heading font-semibold text-[var(--color-navy)]">
                  قراءة التقرير <ArrowLeft className="h-4 w-4" />
                </Link>
                <a href="/downloads/redwan-bankruptcy-report-july-2026.pdf" download className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/20 px-6 py-3 font-heading font-semibold">
                  <Download className="h-4 w-4" /> تنزيل PDF
                </a>
              </div>
            </div>
          </article>

          <div className="mt-12">
            <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">أرشيف 2026</p>
            <h2 className="mt-3 font-heading text-3xl font-bold">الإصدارات الشهرية السابقة</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {archiveReports.map((report) => (
                <article key={report.slug} className="flex flex-col border border-black/10 bg-white p-7">
                  <FileText className="h-8 w-8 text-[var(--color-gold)]" />
                  <p className="mt-6 text-sm font-semibold text-[var(--color-gold)]">{report.month}</p>
                  <h3 className="mt-2 font-heading text-2xl font-bold">تقرير إعلانات الإفلاس</h3>
                  <p className="mt-4 flex-1 leading-7 text-[var(--color-navy)]/60">
                    {report.total} إعلاناً رسمياً، منها {report.openings} افتتاحاً جديداً، مع أسماء المدينين وروابط إيسار.
                  </p>
                  <Link href={`/bankruptcy/reports/${report.slug}`} className="mt-7 inline-flex items-center gap-2 font-heading font-semibold text-[var(--color-gold)]">
                    قراءة التقرير <ArrowLeft className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
