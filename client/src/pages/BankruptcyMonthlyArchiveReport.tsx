import { useMemo, useState, type ReactNode } from "react";
import { ExternalLink, FileText, RotateCcw, Search } from "lucide-react";
import { Link, Redirect, useParams } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import januaryData from "@/data/bankruptcyReport202601Archive.json";
import februaryData from "@/data/bankruptcyReport202602Archive.json";
import marchData from "@/data/bankruptcyReport202603Archive.json";
import aprilData from "@/data/bankruptcyReport202604Archive.json";
import mayData from "@/data/bankruptcyReport202605Archive.json";
import juneData from "@/data/bankruptcyReport202606Archive.json";

type ReportBucket = "new_opening" | "procedural_transition" | "later_or_operational";

type ArchiveRow = {
  sourceId: string;
  debtor: string;
  registration: string | null;
  procedure: string | null;
  court: string | null;
  openingReason: string | null;
  announcementType: string | null;
  announcementDate: string;
  officialUrl: string;
  reportBucket: ReportBucket;
  duplicateOpening: boolean;
};

type MonthConfig = {
  name: string;
  slug: string;
  data: ArchiveRow[];
  previous?: string;
  next: string;
};

const monthReports: Record<string, MonthConfig> = {
  "2026-01": { name: "يناير", slug: "2026-01", data: januaryData as ArchiveRow[], next: "2026-02" },
  "2026-02": { name: "فبراير", slug: "2026-02", data: februaryData as ArchiveRow[], previous: "2026-01", next: "2026-03" },
  "2026-03": { name: "مارس", slug: "2026-03", data: marchData as ArchiveRow[], previous: "2026-02", next: "2026-04" },
  "2026-04": { name: "أبريل", slug: "2026-04", data: aprilData as ArchiveRow[], previous: "2026-03", next: "2026-05" },
  "2026-05": { name: "مايو", slug: "2026-05", data: mayData as ArchiveRow[], previous: "2026-04", next: "2026-06" },
  "2026-06": { name: "يونيو", slug: "2026-06", data: juneData as ArchiveRow[], previous: "2026-05", next: "2026-07" },
};

const monthNames: Record<string, string> = {
  "2026-01": "يناير 2026",
  "2026-02": "فبراير 2026",
  "2026-03": "مارس 2026",
  "2026-04": "أبريل 2026",
  "2026-05": "مايو 2026",
  "2026-06": "يونيو 2026",
  "2026-07": "يوليو 2026",
};

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function compactProcedure(value: string | null) {
  return value?.replace(/^إجراء\s+/, "") || "غير محدد";
}

function percentage(value: number, total: number) {
  return total ? Math.round((value / total) * 1000) / 10 : 0;
}

function ResponsiveCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 md:block">
      <span aria-hidden="true" className="font-heading text-xs font-semibold text-[var(--color-navy)]/50 md:hidden">
        {label}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function RecordsTable({ rows, caption }: { rows: ArchiveRow[]; caption: string }) {
  return (
    <div className="mt-5 md:overflow-x-auto md:border md:border-black/10">
      <table className="block w-full text-right text-sm md:table md:min-w-[1080px] md:border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only bg-[var(--color-navy)] text-white md:not-sr-only md:table-header-group">
          <tr>
            <th scope="col" className="px-4 py-4 font-heading">#</th>
            <th scope="col" className="px-4 py-4 font-heading">الاسم</th>
            <th scope="col" className="px-4 py-4 font-heading">السجل التجاري</th>
            <th scope="col" className="px-4 py-4 font-heading">الإعلان</th>
            <th scope="col" className="px-4 py-4 font-heading">المحكمة</th>
            <th scope="col" className="px-4 py-4 font-heading">التاريخ</th>
            <th scope="col" className="px-4 py-4 font-heading">المصدر</th>
          </tr>
        </thead>
        <tbody className="grid gap-3 bg-[#f6f3ed] p-3 md:table-row-group md:bg-transparent md:p-0">
          {rows.map((item, index) => (
            <tr key={item.officialUrl} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-2 border border-black/10 bg-white p-4 shadow-sm md:table-row md:border-0 md:p-0 md:shadow-none md:even:bg-[#f6f3ed]">
              <td className="flex h-8 w-8 items-center justify-center bg-[var(--color-navy)] text-white md:table-cell md:h-auto md:w-auto md:border-t md:border-black/10 md:bg-transparent md:px-4 md:py-4 md:text-[var(--color-navy)]/50">
                {index + 1}
              </td>
              <th scope="row" className="min-w-0 self-center text-right font-semibold md:table-cell md:border-t md:border-black/10 md:px-4 md:py-4">
                {item.debtor}
              </th>
              <td className="col-span-2 border-t border-black/10 py-2.5 md:table-cell md:px-4 md:py-4">
                <ResponsiveCell label="السجل التجاري"><span className="tabular-nums">{item.registration ?? "غير معروض"}</span></ResponsiveCell>
              </td>
              <td className="col-span-2 border-t border-black/10 py-2.5 md:table-cell md:px-4 md:py-4">
                <ResponsiveCell label="الإعلان">{item.reportBucket === "new_opening" ? compactProcedure(item.procedure) : item.announcementType ?? compactProcedure(item.procedure)}</ResponsiveCell>
              </td>
              <td className="col-span-2 border-t border-black/10 py-2.5 md:table-cell md:px-4 md:py-4">
                <ResponsiveCell label="المحكمة">{item.court ?? "غير محدد"}</ResponsiveCell>
              </td>
              <td className="col-span-2 border-t border-black/10 py-2.5 md:table-cell md:px-4 md:py-4">
                <ResponsiveCell label="التاريخ"><span dir="ltr" className="inline-block tabular-nums">{formatDate(item.announcementDate)}</span></ResponsiveCell>
              </td>
              <td className="col-span-2 border-t border-black/10 py-2.5 md:table-cell md:px-4 md:py-4">
                <ResponsiveCell label="المصدر">
                  <a href={item.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[var(--color-gold)] hover:underline">
                    إعلان إيسار <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </ResponsiveCell>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BankruptcyMonthlyArchiveReport() {
  const { month = "" } = useParams<{ month: string }>();
  const isValidMonth = Boolean(monthReports[month]);
  const report = monthReports[month] ?? monthReports["2026-01"];
  const [query, setQuery] = useState("");
  const [procedure, setProcedure] = useState("");
  const [court, setCourt] = useState("");

  const newOpenings = report.data.filter((item) => item.reportBucket === "new_opening" && !item.duplicateOpening);
  const transitions = report.data.filter((item) => item.reportBucket === "procedural_transition");
  const laterAnnouncements = report.data.filter((item) => item.reportBucket === "later_or_operational");
  const otherAnnouncements = [...transitions, ...laterAnnouncements].sort((a, b) => b.announcementDate.localeCompare(a.announcementDate));
  const uniqueDebtors = new Set(report.data.map((item) => item.registration || item.debtor)).size;

  const procedureSummary = Array.from(
    newOpenings.reduce((map, item) => map.set(compactProcedure(item.procedure), (map.get(compactProcedure(item.procedure)) || 0) + 1), new Map<string, number>()),
  ).map(([label, value]) => ({ label, value, percentage: percentage(value, newOpenings.length) })).sort((a, b) => b.value - a.value);

  const courtSummary = Array.from(
    newOpenings.reduce((map, item) => {
      const label = item.court || "غير محدد";
      return map.set(label, (map.get(label) || 0) + 1);
    }, new Map<string, number>()),
  ).map(([label, value]) => ({ label, value, percentage: percentage(value, newOpenings.length) })).sort((a, b) => b.value - a.value);

  const procedures = useMemo(() => Array.from(new Set(newOpenings.map((item) => item.procedure).filter(Boolean))) as string[], [month]);
  const courts = useMemo(() => Array.from(new Set(newOpenings.map((item) => item.court).filter(Boolean))) as string[], [month]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return newOpenings.filter((item) => {
      const matchesQuery = !normalizedQuery || item.debtor.toLowerCase().includes(normalizedQuery) || item.registration?.includes(normalizedQuery);
      return matchesQuery && (!procedure || item.procedure === procedure) && (!court || item.court === court);
    });
  }, [court, month, procedure, query]);

  useSEO({
    title: `تقرير إعلانات الإفلاس في السعودية — ${report.name} 2026`,
    description: `تقرير شهري يوثق ${report.data.length} إعلاناً نشرته لجنة الإفلاس «إيسار» خلال ${report.name} 2026، منها ${newOpenings.length} افتتاحاً جديداً، مع أسماء المدينين وروابط المصادر الرسمية.`,
    canonical: `/bankruptcy/reports/${report.slug}`,
    ogType: "article",
  });

  if (!isValidMonth) return <Redirect to="/bankruptcy/reports" />;

  return (
    <main dir="rtl" className="bg-white text-[var(--color-navy)]">
      <section className="bg-[var(--color-navy)] pb-12 pt-28 text-white md:pb-16 md:pt-32">
        <div className="container mx-auto px-5 md:px-8">
          <nav aria-label="مسار التنقل" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/">الرئيسية</Link><span>/</span>
            <Link href="/bankruptcy">الإفلاس</Link><span>/</span>
            <Link href="/bankruptcy/reports">التقارير الشهرية</Link><span>/</span>
            <span className="text-[var(--color-gold)]">{report.name} 2026</span>
          </nav>
          <div className="mb-5 inline-flex items-center gap-2 border border-[var(--color-gold)]/45 px-3 py-2 text-sm text-[var(--color-gold)]">
            <FileText className="h-4 w-4" /> تقرير شهري مستند إلى الإعلانات الرسمية
          </div>
          <h1 className="max-w-5xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            تقرير إعلانات الإفلاس في السعودية
            <span className="mt-2 block text-[var(--color-gold)]">{report.name} 2026</span>
          </h1>
          <p className="mt-6 max-w-3xl font-body text-lg leading-8 text-white/75">
            توثيق لـ{report.data.length} إعلاناً نشرته لجنة الإفلاس «إيسار»، مع فصل افتتاحات الإجراءات عن الانتقالات والإعلانات اللاحقة، وإتاحة رابط المصدر الرسمي لكل سجل.
          </p>
          <p className="mt-4 text-sm text-white/50">تاريخ نشر التقرير: 8 أغسطس 2026</p>
        </div>
      </section>

      <nav aria-label="أقسام التقرير" className="sticky top-[72px] z-30 border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex snap-x gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:justify-center md:px-8">
          {[['الملخص','#summary'],['الإجراءات','#procedures'],['الافتتاحات','#announcements'],['إعلانات أخرى','#other'],['المنهجية','#methodology']].map(([label, href]) => (
            <a key={href} href={href} className="snap-start whitespace-nowrap border-b-2 border-transparent px-4 py-2 font-heading text-sm font-semibold text-[var(--color-navy)]/65 hover:border-[var(--color-gold)]">{label}</a>
          ))}
        </div>
      </nav>

      <section className="border-b border-black/10 bg-[#f6f3ed] py-10">
        <div className="container mx-auto grid grid-cols-2 gap-px bg-black/10 px-5 md:grid-cols-4 md:px-8">
          {[[report.data.length,'إجمالي إعلانات إيسار'],[newOpenings.length,'افتتاحاً جديداً'],[transitions.length,'انتقالات إجرائية'],[laterAnnouncements.length,'إعلاناً لاحقاً وتشغيلياً']].map(([value,label]) => (
            <div key={String(label)} className="bg-[#f6f3ed] px-4 py-7 text-center">
              <div className="font-heading text-4xl font-bold text-[var(--color-gold)]">{value}</div>
              <div className="mt-2 text-sm text-[var(--color-navy)]/70">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="summary" className="scroll-mt-32 py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">الملخص التنفيذي</p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">حركة الإعلانات خلال الشهر</h2>
            <div className="mt-7 space-y-5 font-body leading-8 text-[var(--color-navy)]/75">
              <p>رصد التقرير {report.data.length} إعلاناً رسمياً تخص {uniqueDebtors} مديناً بحسب الاسم أو السجل المتاح. ولقياس الدخول الجديد إلى الإجراءات، فُصلت {newOpenings.length} حالة افتتاح عن بقية أنواع الإعلانات.</p>
              <p>جاء إجراء <strong className="text-[var(--color-navy)]">{procedureSummary[0]?.label}</strong> في المرتبة الأولى بـ{procedureSummary[0]?.value} حالة، تمثل {procedureSummary[0]?.percentage}% من افتتاحات الشهر.</p>
              <p>تشمل بقية الإعلانات {transitions.length} انتقالات إجرائية و{laterAnnouncements.length} إعلاناً لاحقاً أو تشغيلياً. ولا تعني هذه الإعلانات وحدها أن المنشأة صُفّيت أو انتهى نشاطها؛ فالأثر يختلف بحسب الإجراء ومرحلته وقرارات المحكمة.</p>
              <p>تعرض هذه الصفحة بيانات الشهر كما نُشرت رسميًا، ولا تستنتج أسباب التعثر أو اتجاهاته الاقتصادية.</p>
            </div>
          </div>
          <div id="procedures" className="scroll-mt-32 border border-black/10 bg-[#f6f3ed] p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold">الافتتاحات حسب نوع الإجراء</h3>
            <div className="mt-8 space-y-6">
              {procedureSummary.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-end justify-between gap-4"><span className="font-heading font-semibold">{item.label}</span><span className="text-sm text-[var(--color-navy)]/65">{item.value} · {item.percentage}%</span></div>
                  <div className="h-2 bg-black/10"><div className="h-full bg-[var(--color-gold)]" style={{ width: `${item.percentage}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f6f3ed] py-16">
        <div className="container mx-auto px-5 md:px-8">
          <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">التوزيع القضائي</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">الافتتاحات حسب المحكمة</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--color-navy)]/65">يصف التوزيع المحكمة الواردة في الإعلان، ولا يمثل بالضرورة مقر النشاط أو توزيع التعثر الاقتصادي.</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {courtSummary.map((item) => (
              <article key={item.label} className="border border-black/10 bg-white p-6">
                <div className="font-heading text-3xl font-bold text-[var(--color-gold)]">{item.value}</div>
                <h3 className="mt-2 font-heading font-semibold">{item.label}</h3>
                <p className="mt-1 text-sm text-[var(--color-navy)]/55">{item.percentage}% من الافتتاحات</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="announcements" className="scroll-mt-32 py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><p className="font-heading text-sm font-semibold text-[var(--color-gold)]">سجل الشهر</p><h2 className="mt-3 font-heading text-3xl font-bold">افتتاحات الإجراءات</h2><p className="mt-3 text-[var(--color-navy)]/60">يعرض الجدول {filtered.length} من أصل {newOpenings.length} حالة.</p></div>
            {(query || procedure || court) && <button onClick={() => { setQuery(''); setProcedure(''); setCourt(''); }} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[var(--color-gold)]"><RotateCcw className="h-4 w-4" /> إعادة ضبط البحث</button>}
          </div>
          <div className="mt-8 grid gap-3 border border-black/10 bg-[#f6f3ed] p-4 md:grid-cols-[1.3fr_1fr_1fr]">
            <label className="relative block"><span className="sr-only">ابحث بالاسم أو السجل التجاري</span><Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-navy)]/45" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو السجل التجاري" className="h-12 w-full border border-black/15 bg-white pr-11 pl-4 outline-none focus:border-[var(--color-gold)]" /></label>
            <select aria-label="نوع الإجراء" value={procedure} onChange={(event) => setProcedure(event.target.value)} className="h-12 border border-black/15 bg-white px-4"><option value="">جميع الإجراءات</option>{procedures.map((item) => <option key={item} value={item}>{compactProcedure(item)}</option>)}</select>
            <select aria-label="المحكمة" value={court} onChange={(event) => setCourt(event.target.value)} className="h-12 border border-black/15 bg-white px-4"><option value="">جميع المحاكم</option>{courts.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <RecordsTable rows={filtered} caption={`افتتاحات إجراءات الإفلاس خلال ${report.name} 2026`} />
        </div>
      </section>

      <section id="other" className="scroll-mt-32 border-y border-black/10 bg-[#f6f3ed] py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">اكتمال السجل</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">الانتقالات والإعلانات اللاحقة</h2>
          <p className="mt-4 max-w-4xl leading-8 text-[var(--color-navy)]/65">هذه السجلات جزء من إجمالي إعلانات الشهر، لكنها لا تمثل دخولاً جديداً بالضرورة إلى إجراءات الإفلاس.</p>
          <RecordsTable rows={otherAnnouncements} caption={`الانتقالات والإعلانات اللاحقة خلال ${report.name} 2026`} />
        </div>
      </section>

      <section id="methodology" className="scroll-mt-32 py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="font-heading text-sm font-semibold text-[var(--color-gold)]">المنهجية</p><h2 className="mt-3 font-heading text-3xl font-bold">كيف أُعد هذا التقرير؟</h2></div>
          <div className="space-y-5 leading-8 text-[var(--color-navy)]/70">
            <p>المصدر هو الإعلانات الرسمية المنشورة من لجنة الإفلاس «إيسار»، ويحدد الشهر بحسب تاريخ نشر الإعلان.</p>
            <p>يُعد الافتتاح الناتج عن رفض طلب إجراء سابق افتتاحاً جديداً؛ لأن الإجراء المرفوض لم يُفتتح. أما افتتاح إجراء بعد إنهاء إجراء مفتتح سابقاً فيصنف انتقالاً إجرائياً.</p>
            <p>تعرض أرقام السجلات التجارية المتاحة، ولا تعرض أرقام هويات الأفراد. وقد نُقلت أسماء المدينين كما وردت في المصدر الرسمي.</p>
            <p>التقرير توثيقي وصفي، ولا يشكل استشارة قانونية ولا حكماً على الملاءة أو استمرارية النشاط.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] py-14 text-white">
        <div className="container mx-auto flex flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div><h2 className="font-heading text-2xl font-bold">تقارير الإفلاس الشهرية</h2><p className="mt-2 text-white/60">انتقل بين الإصدارات أو استعرض جميع التقارير.</p></div>
          <div className="flex flex-wrap gap-3">
            {report.previous && <Link href={`/bankruptcy/reports/${report.previous}`} className="border border-white/25 px-5 py-3 font-heading font-semibold">السابق: {monthNames[report.previous]}</Link>}
            <Link href="/bankruptcy/reports" className="bg-[var(--color-gold)] px-5 py-3 font-heading font-semibold text-[var(--color-navy)]">جميع التقارير</Link>
            <Link href={`/bankruptcy/reports/${report.next}`} className="border border-white/25 px-5 py-3 font-heading font-semibold">التالي: {monthNames[report.next]}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
