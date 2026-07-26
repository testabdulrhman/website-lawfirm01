import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Mail, Phone, FileText, Users, Vote, AlertTriangle } from "lucide-react";

export default function HassanMisferAlZahrani() {
  useEffect(() => {
    document.title = "التصويت على مقترح إعادة التنظيم المالي | شركة حسن مسفر الزهراني وشركاه";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground font-body" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/services/bankruptcy" className="hover:text-[var(--color-gold)] transition-colors">الإفلاس</Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">شركة حسن مسفر الزهراني وشركاه</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 rounded-full px-4 py-2 mb-6">
              <Vote className="w-4 h-4 text-[var(--color-gold)]" />
              <span className="text-sm text-[var(--color-gold)] font-heading">إعلان تصويت</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4">
              التصويت على مقترح إعادة التنظيم المالي
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-heading">
              شركة حسن مسفر الزهراني وشركاه
            </p>
            <p className="text-white/60 mt-2">سجل تجاري رقم: 2050001522</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          {/* Key Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <Calendar className="w-6 h-6 text-[var(--color-gold)] mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">التاريخ</p>
              <p className="font-heading font-semibold mt-1">16 / 08 / 2026م</p>
              <p className="text-xs text-muted-foreground">03 / 03 / 1448هـ</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <Clock className="w-6 h-6 text-[var(--color-gold)] mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">فترة التصويت</p>
              <p className="font-heading font-semibold mt-1">1:00 م — 3:00 م</p>
              <p className="text-xs text-muted-foreground">يوم الأحد</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <FileText className="w-6 h-6 text-[var(--color-gold)] mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">طريقة التصويت</p>
              <p className="font-heading font-semibold mt-1">إلكتروني</p>
              <p className="text-xs text-muted-foreground">عبر الرابط المخصص</p>
            </div>
          </div>

          {/* Letter Content */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            {/* Header */}
            <div className="border-b border-border pb-8 mb-8">
              <p className="text-muted-foreground mb-4">إلى: دائني شركة حسن مسفر الزهراني وشركاه المحترمين</p>
              <p className="text-foreground">السلام عليكم ورحمة الله وبركاته، وبعد:</p>
            </div>

            {/* Intro */}
            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-foreground leading-relaxed">
                يسر أمين إجراء إعادة التنظيم المالي لشركة حسن مسفر الزهراني وشركاه دعوتكم إلى التصويت على مقترح إعادة التنظيم المالي، وذلك وفق المواعيد والإجراءات الآتية:
              </p>
            </div>

            {/* Section 1: Voting Schedule */}
            <div className="mb-10">
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-lg flex items-center justify-center text-sm font-bold">١</span>
                موعد التصويت واجتماع الدائنين
              </h2>

              <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">اليوم</span>
                  <span className="font-heading font-semibold">الأحد</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">التاريخ الهجري</span>
                  <span className="font-heading font-semibold">03/03/1448هـ</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">التاريخ الميلادي</span>
                  <span className="font-heading font-semibold">16/08/2026م</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">فترة التصويت</span>
                  <span className="font-heading font-semibold">من 1:00 م حتى 3:00 م</span>
                </div>
              </div>

              <p className="text-foreground mt-6 leading-relaxed">
                يتم التصويت إلكترونياً من خلال الرابط المخصص للتصويت، وذلك باختيار الموافقة أو عدم الموافقة على مقترح إعادة التنظيم المالي.
              </p>
              <p className="text-foreground mt-4 leading-relaxed">
                وبعقد أمين إجراء إعادة التنظيم المالي، بالتزامن مع فترة التصويت، اجتماعاً إلكترونياً للدائنين.
              </p>
            </div>

            {/* Meeting Agenda */}
            <div className="mb-10">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--color-gold)]" />
                أجندة الاجتماع
              </h3>

              <div className="space-y-3">
                {[
                  { time: "12:30 — 1:00 م", text: "الترحيب بالحضور" },
                  { time: "1:00 — 1:15 م", text: "كلمة افتتاحية من الأطراف ذات الصلة بالإجراء" },
                  { time: "1:15 — 1:30 م", text: "عرض عن سير إجراء إعادة التنظيم المالي" },
                  { time: "1:30 — 1:45 م", text: "استعراض مقترح إعادة التنظيم المالي" },
                  { time: "1:45 — 2:15 م", text: "الإجابة عن استفسارات الدائنين المتعلقة بالمقترح" },
                  { time: "2:15 — 3:00 م", text: "استمرار استقبال أصوات الدائنين عبر الرابط المخصص للتصويت" },
                  { time: "3:00 — 4:30 م", text: "إغلاق باب التصويت وفرز الأصوات وإعلان النتيجة (قد يستغرق وقتاً أطول)" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-muted/30 rounded-lg p-4">
                    <span className="text-sm text-[var(--color-gold)] font-mono whitespace-nowrap min-w-[120px]">{item.time}</span>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Proposal */}
            <div className="mb-10">
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-lg flex items-center justify-center text-sm font-bold">٢</span>
                مقترح إعادة التنظيم المالي
              </h2>
              <p className="text-foreground leading-relaxed">
                يرفق مقترح إعادة التنظيم المالي بهذا الإعلان، لتمكين الدائنين من الاطلاع عليه قبل موعد التصويت، كما يتضمن الإعلان تفاصيل التصويت وروابط الدخول.
              </p>
            </div>

            {/* Section 3: Results */}
            <div className="mb-10">
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-lg flex items-center justify-center text-sm font-bold">٣</span>
                إعلان نتيجة التصويت
              </h2>
              <p className="text-foreground leading-relaxed">
                سيتم إعلان نتيجة التصويت بعد انتهاء فترة التصويت واستكمال الإجراءات النظامية، وسيُشعر الدائنون بها عبر وسائل التواصل المعتمدة.
              </p>
            </div>

            {/* Important Instructions */}
            <div className="mb-10">
              <h2 className="text-xl font-display font-bold text-foreground mb-6">تعليمات مهمة</h2>
              <div className="space-y-4">
                {[
                  "يجب تقديم المستندات المؤيدة للصفة، بما في ذلك الهوية، والوكالة أو التفويض الساري المفعول، بحسب الأحوال، إلى أمين الإجراء قبل موعد التصويت بيومين على الأقل، للتحقق منها واعتماد مشاركة المصوت.",
                  "يقتصر الاطلاع على المقترح والتصويت على الأشخاص المخولين بذلك، ويحظر تداول المقترح أو نسخه أو نشره بأي وسيلة، إلا وفقاً للأنظمة والتعليمات ذات العلاقة.",
                  "يتعين الدخول إلى رابط التصويت باستخدام البيانات والتعليمات الواردة في هذا الإعلان، واستكمال المتطلبات اللازمة قبل إبداء التصويت.",
                  "في حال مواجهة أي مشكلة تقنية، يمكن التواصل مع فريق الدعم الفني عبر البريد الإلكتروني والواتساب.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-semibold text-amber-800 dark:text-amber-300 mb-3">تنبيه</h3>
                  <ul className="space-y-3 text-amber-900 dark:text-amber-200">
                    <li>يتم التصويت حصرياً من خلال الرابط الإلكتروني المخصص للتصويت، ولا يتم التصويت من خلال الاجتماع الإلكتروني.</li>
                    <li>يقتصر التصويت على الفترة المحددة أعلاه، ولن يُقبل أي تصويت يرد بعد إغلاق الرابط عند الساعة 3:00 مساءً.</li>
                    <li>يوصى بمراجعة المقترح المرفق، والتحقق من صلاحية رابط التصويت، واستكمال الوكالات أو التفويضات والمتطلبات اللازمة قبل الموعد المحدد بوقت كافٍ.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-muted/50 rounded-xl p-6 mb-10">
              <h3 className="font-heading font-semibold text-foreground mb-4">للتواصل والدعم الفني</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:bankruptcy@redwan.sa" className="flex items-center gap-2 text-[var(--color-gold)] hover:underline">
                  <Mail className="w-4 h-4" />
                  <span>bankruptcy@redwan.sa</span>
                </a>
              </div>
            </div>

            {/* Signature */}
            <div className="border-t border-border pt-8 text-center">
              <p className="text-muted-foreground mb-2">شاكرين ومقدرين تعاونكم</p>
              <p className="text-sm text-muted-foreground mb-4">Thank you for your cooperation</p>
              <p className="font-heading font-semibold text-foreground text-lg">
                أمين إجراء إعادة التنظيم المالي / عبدالرحمن بن رضوان المشيقح
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/services/bankruptcy" className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:underline font-heading">
              <ArrowLeft className="w-4 h-4" />
              العودة لخدمات الإفلاس
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
