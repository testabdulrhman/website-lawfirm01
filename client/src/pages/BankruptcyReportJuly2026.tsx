import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  BriefcaseBusiness,
  Building2,
  Download,
  ExternalLink,
  FileText,
  RotateCcw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import reportData from "@/data/bankruptcyReportJuly2026.json";

type ReportRow = {
  debtor: string;
  registration: string | null;
  procedure: string;
  court: string;
  openingReason: string;
  announcementDate: string;
  officialUrl: string;
  officeManaged: boolean;
};

const announcements = reportData as ReportRow[];

const procedureSummary = [
  { label: "التصفية الإدارية", value: 38, percentage: 74.5 },
  { label: "التصفية", value: 8, percentage: 15.7 },
  { label: "إعادة التنظيم المالي", value: 4, percentage: 7.8 },
  { label: "التسوية الوقائية", value: 1, percentage: 2 },
];

const courtSummary = [
  { label: "المحكمة التجارية بالرياض", value: 33, percentage: 64.7 },
  { label: "المحكمة التجارية بجدة", value: 11, percentage: 21.6 },
  { label: "المحكمة التجارية بالدمام", value: 5, percentage: 9.8 },
  { label: "المحكمة التجارية ببريدة", value: 1, percentage: 2 },
  { label: "المحكمة التجارية بالمدينة المنورة", value: 1, percentage: 2 },
];

function compactProcedure(value: string) {
  return value.replace(/^إجراء\s+/, "");
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export default function BankruptcyReportJuly2026() {
  const [query, setQuery] = useState("");
  const [procedure, setProcedure] = useState("");
  const [court, setCourt] = useState("");

  useSEO({
    title: "تقرير إعلانات الإفلاس في السعودية — يوليو 2026",
    description:
      "تحليل مهني موثق لـ51 إعلان إفلاس منشوراً في السعودية خلال يوليو 2026، مع توزيع الإجراءات والمحاكم وقائمة الشركات وروابط الإعلانات الرسمية.",
    canonical: "/bankruptcy/reports/2026-07",
    ogType: "article",
  });

  const procedures = useMemo(
    () => Array.from(new Set(announcements.map((item) => item.procedure))),
    [],
  );
  const courts = useMemo(
    () => Array.from(new Set(announcements.map((item) => item.court))),
    [],
  );
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return announcements.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        item.debtor.toLowerCase().includes(normalizedQuery) ||
        item.registration?.includes(normalizedQuery);
      return (
        matchesQuery &&
        (!procedure || item.procedure === procedure) &&
        (!court || item.court === court)
      );
    });
  }, [court, procedure, query]);

  const resetFilters = () => {
    setQuery("");
    setProcedure("");
    setCourt("");
  };

  return (
    <main dir="rtl" className="bg-white text-[var(--color-navy)]">
      <section className="bg-[var(--color-navy)] pt-32 pb-16 md:pt-40 md:pb-24 text-white">
        <div className="container mx-auto px-5 md:px-8">
          <nav aria-label="مسار التنقل" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-[var(--color-gold)]">الرئيسية</Link>
            <span>/</span>
            <Link href="/bankruptcy" className="transition-colors hover:text-[var(--color-gold)]">الإفلاس</Link>
            <span>/</span>
            <Link href="/bankruptcy/reports" className="transition-colors hover:text-[var(--color-gold)]">التقارير الشهرية</Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">يوليو 2026</span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 border border-[var(--color-gold)]/45 px-3 py-2 text-sm text-[var(--color-gold)]">
                <FileText className="h-4 w-4" />
                تقرير شهري موثّق من الإعلانات الرسمية
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                تقرير إعلانات الإفلاس في السعودية
                <span className="mt-2 block text-[var(--color-gold)]">يوليو 2026</span>
              </h1>
              <p className="mt-6 max-w-3xl font-body text-lg leading-8 text-white/75">
                قراءة مهنية لـ51 إعلاناً منشوراً لدى لجنة الإفلاس، تشمل توزيع الإجراءات والمحاكم
                وقائمة الشركات الداخلة في إجراءات الإفلاس، مع روابط المصادر الرسمية.
              </p>
              <p className="mt-4 text-sm text-white/50">تاريخ النشر: 4 أغسطس 2026 · آخر تحديث: 4 أغسطس 2026</p>
            </div>
            <a
              href="/downloads/redwan-bankruptcy-report-july-2026.pdf"
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-gold)] px-6 py-3 font-heading font-semibold text-[var(--color-navy)] transition-opacity hover:opacity-90"
            >
              <Download className="h-5 w-5" />
              تنزيل التقرير PDF
            </a>
          </div>
        </div>
      </section>

      <nav
        aria-label="أقسام التقرير"
        className="sticky top-[72px] z-30 border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-md"
      >
        <div className="container mx-auto overflow-x-auto px-5 md:px-8">
          <div className="flex min-w-max items-center justify-center gap-1 py-3 md:gap-3">
            {[
              ["الملخص", "#summary"],
              ["الإجراءات", "#procedures"],
              ["ماذا تعني النتائج؟", "#meaning"],
              ["الإعلانات", "#announcements"],
              ["المنهجية", "#methodology"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="border-b-2 border-transparent px-4 py-2 font-heading text-sm font-semibold text-[var(--color-navy)]/65 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-navy)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="border-b border-black/10 bg-[#f6f3ed] py-10">
        <div className="container mx-auto grid gap-px bg-black/10 px-5 md:grid-cols-4 md:px-8">
          {[
            ["51", "إجمالي الإعلانات"],
            ["48", "شركة ومنشأة"],
            ["3", "أفراد (دون عرض الهوية)"],
            ["5", "محاكم تجارية"],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#f6f3ed] px-6 py-7 text-center">
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
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">ما الذي تحرّك خلال الشهر؟</h2>
            <div className="mt-7 space-y-5 font-body leading-8 text-[var(--color-navy)]/75">
              <p>
                شكّلت <strong className="text-[var(--color-navy)]">التصفية الإدارية 74.5%</strong> من إعلانات يوليو؛
                إذ ظهر هذا الإجراء في 38 إعلاناً من أصل 51. وتعكس هذه النسبة تركيب عينة الإعلانات المنشورة خلال الشهر،
                ولا تكفي وحدها للحكم على اتجاه سنوي أو على حجم التعثر في الاقتصاد.
              </p>
              <p>
                جاءت التصفية في المرتبة الثانية بـ8 إعلانات، ثم إعادة التنظيم المالي بـ4 إعلانات، والتسوية الوقائية بإعلان واحد.
                ويظل التفريق بين الإجراءات مهماً: افتتاح التسوية الوقائية أو إعادة التنظيم المالي لا يعني انتهاء المنشأة أو تصفيتها.
              </p>
              <p>
                استحوذت المحكمة التجارية بالرياض على 33 إعلاناً، تلتها جدة بـ11 ثم الدمام بـ5. هذا توزيع بحسب
                <strong className="text-[var(--color-navy)]"> المحكمة الواردة في الإعلان</strong>، وليس قياساً مباشراً لتعرض مدينة أو قطاع للتعثر.
              </p>
            </div>
          </div>

          <div id="procedures" className="scroll-mt-32 border border-black/10 bg-[#f6f3ed] p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold">الإعلانات حسب نوع الإجراء</h3>
            <div className="mt-8 space-y-6">
              {procedureSummary.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-end justify-between gap-4">
                    <span className="font-heading font-semibold">{item.label}</span>
                    <span className="text-sm text-[var(--color-navy)]/65">{item.value} · {item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-black/10">
                    <div className="h-full bg-[var(--color-gold)]" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="meaning" className="scroll-mt-32 bg-[var(--color-navy)] py-16 text-white md:py-20">
        <div className="container mx-auto px-5 md:px-8">
          <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">قراءة عملية</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">ماذا تعني النتائج لأطراف السوق؟</h2>
          <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "للدائنين",
                text: "راقب الإعلان الرسمي ومواعيد تقديم المطالبة، وجهّز المستندات المؤيدة للدين مبكراً. نوع الإجراء يحدد مسار المطالبة والحقوق المتاحة.",
              },
              {
                icon: Building2,
                title: "للشركات",
                text: "طلب المشورة قبل تفاقم التعثر يوسّع البدائل الممكنة. إعادة التنظيم والتسوية أدوات لمعالجة التعثر وليستا وصفاً بانتهاء المنشأة.",
              },
              {
                icon: BriefcaseBusiness,
                title: "للمستثمرين",
                text: "اقرأ كل حالة في سياقها ولا تعتمد على عدد الإعلانات وحده. يلزم فحص الإجراء والمركز المالي والوثائق والقرارات المنشورة.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-[var(--color-navy)] p-7 md:p-9">
                <Icon className="h-7 w-7 text-[var(--color-gold)]" />
                <h3 className="mt-5 font-heading text-xl font-bold">{title}</h3>
                <p className="mt-4 font-body leading-8 text-white/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ed] py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-r-4 border-[var(--color-gold)] bg-white p-7 md:p-10">
            <ShieldCheck className="h-8 w-8 text-[var(--color-gold)]" />
            <p className="mt-6 font-heading text-xl font-bold">تعليق مهني</p>
            <blockquote className="mt-4 font-body text-lg leading-9 text-[var(--color-navy)]/80">
              «ارتفاع إعلانات التصفية الإدارية في عينة هذا الشهر يبرز أهمية التدخل المبكر، وحفظ المستندات، ومتابعة
              الإعلانات والمواعيد النظامية. ولا يصح وصف جميع المنشآت الواردة بأنها شركات مفلسة؛ لأن الأثر القانوني
              يختلف باختلاف الإجراء ومرحلة القضية وقرارات المحكمة.»
            </blockquote>
            <div className="mt-7 border-t border-black/10 pt-5">
              <p className="font-heading font-bold">عبدالرحمن بن رضوان المشيقح</p>
              <p className="mt-1 text-sm text-[var(--color-navy)]/60">محامٍ وأمين إفلاس مرخص — ترخيص رقم 142147</p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold">تنبيهات عملية للدائن</h2>
            <ol className="mt-7 space-y-5">
              {[
                "تحقق من تطابق اسم المدين ورقم السجل التجاري مع مستنداتك.",
                "افتح رابط الإعلان الرسمي واقرأ المواعيد والتعليمات الخاصة بالحالة.",
                "اجمع العقود والفواتير وكشوف الحساب والأحكام والمراسلات المؤيدة للدين.",
                "لا تؤخر المطالبة بسبب تفاوض جانبي؛ راعِ المواعيد النظامية المعلنة.",
                "اطلب مشورة متخصصة إذا كان الدين محل نزاع أو مرتبطاً بضمان أو امتياز.",
              ].map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--color-gold)] font-heading font-bold text-[var(--color-navy)]">{index + 1}</span>
                  <span className="pt-1 font-body leading-7 text-[var(--color-navy)]/75">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">التوزيع الجغرافي القضائي</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">الإعلانات حسب المحكمة</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--color-navy)]/65">
            يصف الجدول مكان المحكمة الوارد في الإعلان، ولا يمثل بالضرورة مقر النشاط أو توزيع التعثر الاقتصادي.
          </p>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {courtSummary.map((item) => (
              <div key={item.label} className="border border-black/10 p-6">
                <div className="font-heading text-3xl font-bold text-[var(--color-gold)]">{item.value}</div>
                <div className="mt-2 font-heading font-semibold">{item.label.replace("المحكمة التجارية ب", "")}</div>
                <div className="mt-1 text-sm text-[var(--color-navy)]/55">{item.percentage}% من الإعلانات</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ed] py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid gap-8 border border-[var(--color-gold)]/50 bg-[var(--color-navy)] p-7 text-white md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">حالة يديرها المكتب</p>
              <h2 className="mt-3 font-heading text-2xl font-bold">شركة الرياض للدهانات</h2>
              <p className="mt-4 max-w-3xl leading-8 text-white/65">
                ورد إعلان افتتاح إجراء التصفية للشركة ضمن بيانات يوليو 2026، ويتولى عبدالرحمن بن رضوان المشيقح
                مهام أمين الإجراء. يرجى الاعتماد على الإعلان الرسمي في المواعيد والتعليمات.
              </p>
            </div>
            <a
              href="https://bankruptcy.gov.sa/ar/Announcements/Pages/announcementDetails.aspx?adid=B41E32A238FFE085"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 self-center border border-white/30 px-5 py-3 font-heading font-semibold transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              الإعلان الرسمي <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="announcements" className="scroll-mt-32 py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-heading text-sm font-semibold text-[var(--color-gold)]">سجل الشهر</p>
              <h2 className="mt-3 font-heading text-3xl font-bold">الشركات والحالات المعلنة</h2>
              <p className="mt-3 text-[var(--color-navy)]/60">يعرض الجدول {filtered.length} من أصل 51 إعلاناً.</p>
            </div>
            {(query || procedure || court) && (
              <button onClick={resetFilters} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[var(--color-gold)]">
                <RotateCcw className="h-4 w-4" /> إعادة ضبط البحث
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-3 border border-black/10 bg-[#f6f3ed] p-4 md:grid-cols-[1.3fr_1fr_1fr]">
            <label className="relative block">
              <span className="sr-only">ابحث بالاسم أو السجل التجاري</span>
              <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-navy)]/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث بالاسم أو السجل التجاري"
                className="h-12 w-full border border-black/15 bg-white pr-11 pl-4 outline-none focus:border-[var(--color-gold)]"
              />
            </label>
            <label>
              <span className="sr-only">نوع الإجراء</span>
              <select value={procedure} onChange={(event) => setProcedure(event.target.value)} className="h-12 w-full border border-black/15 bg-white px-4 outline-none focus:border-[var(--color-gold)]">
                <option value="">جميع الإجراءات</option>
                {procedures.map((item) => <option key={item} value={item}>{compactProcedure(item)}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">المحكمة</span>
              <select value={court} onChange={(event) => setCourt(event.target.value)} className="h-12 w-full border border-black/15 bg-white px-4 outline-none focus:border-[var(--color-gold)]">
                <option value="">جميع المحاكم</option>
                {courts.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-5 overflow-x-auto border border-black/10">
            <table className="min-w-[1120px] w-full border-collapse text-right text-sm">
              <thead className="bg-[var(--color-navy)] text-white">
                <tr>
                  <th className="px-4 py-4 font-heading">#</th>
                  <th className="px-4 py-4 font-heading">الاسم</th>
                  <th className="px-4 py-4 font-heading">السجل التجاري</th>
                  <th className="px-4 py-4 font-heading">الإجراء</th>
                  <th className="px-4 py-4 font-heading">المحكمة</th>
                  <th className="px-4 py-4 font-heading">تاريخ الإعلان</th>
                  <th className="px-4 py-4 font-heading">المصدر</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.officialUrl} className={item.officeManaged ? "bg-[var(--color-gold)]/10" : "even:bg-[#f6f3ed]"}>
                    <td className="border-t border-black/10 px-4 py-4 text-[var(--color-navy)]/50">{index + 1}</td>
                    <td className="border-t border-black/10 px-4 py-4 font-semibold">
                      {item.debtor}
                      {item.officeManaged && <span className="mt-1 block text-xs text-[var(--color-gold)]">بإدارة المكتب</span>}
                    </td>
                    <td className="border-t border-black/10 px-4 py-4 tabular-nums">{item.registration ?? "غير معروض (فرد)"}</td>
                    <td className="border-t border-black/10 px-4 py-4">{compactProcedure(item.procedure)}</td>
                    <td className="border-t border-black/10 px-4 py-4">{item.court}</td>
                    <td className="border-t border-black/10 px-4 py-4 whitespace-nowrap">{formatDate(item.announcementDate)}</td>
                    <td className="border-t border-black/10 px-4 py-4">
                      <a href={item.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[var(--color-gold)] hover:underline">
                        لجنة الإفلاس <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="methodology" className="scroll-mt-32 border-y border-black/10 bg-[#f6f3ed] py-12">
        <div className="container mx-auto grid gap-8 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-heading text-xl font-bold">المنهجية والمصدر</h2>
            <p className="mt-4 leading-8 text-[var(--color-navy)]/65">
              أُعد التقرير من الإعلانات المنشورة في موقع لجنة الإفلاس عن شهر يوليو 2026، ثم نُقحت السجلات وأزيل التكرار.
              يفتح رابط المصدر في كل صف الإعلان الرسمي للتحقق من تفاصيله.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold">حدود التقرير</h2>
            <p className="mt-4 leading-8 text-[var(--color-navy)]/65">
              لا يتضمن المصدر تصنيفاً قطاعياً موحداً يسمح بمقارنة موثوقة، ولذلك لم ننسب الحالات إلى قطاعات.
              كما أن التقرير معلوماتي عام ولا يعد استشارة قانونية أو حكماً على الملاءة المالية لأي طرف.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] py-16 text-white md:py-20">
        <div className="container mx-auto px-5 text-center md:px-8">
          <h2 className="font-heading text-3xl font-bold">هل ظهر أحد مدينيك ضمن الإعلانات؟</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
            راجع الإعلان الرسمي أولاً، ثم تواصل معنا لدراسة المطالبة ومستنداتها والمواعيد المرتبطة بالإجراء.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/bankruptcy/claims" className="inline-flex min-h-12 items-center justify-center bg-[var(--color-gold)] px-7 py-3 font-heading font-semibold text-[var(--color-navy)]">
              تقديم مطالبة دائن
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-3 font-heading font-semibold text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
