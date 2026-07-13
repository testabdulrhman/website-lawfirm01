import { useScrollAnimation, getStaggerStyle, getFadeStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { Mail, Phone, Linkedin } from "lucide-react";
import { useMemo } from "react";
import { useSEO, schemas } from "@/hooks/useSEO";

const teamData = {
  ar: {
    pageLabel: "فريقنا",
    pageTitle: "المحامون",
    pageSubtitle: "يضم فريقنا محامين ومستشارين قانونيين مؤهلين لتقديم أفضل الخدمات القانونية بخبرة متراكمة وتخصصات متنوعة.",
    members: [
      {
        name: "عبدالرحمن بن رضوان المشيقح",
        role: "محامي",
        title: "المؤسس والمدير التنفيذي",
        initials: "ع",
        bio: "محامٍ، وأمين إفلاس، وموثّق، بخبرة تتجاوز عشر سنوات في الأعمال القانونية. محاضر متعاون بجامعة المستقبل، حاصل على درجة الماجستير في الأنظمة بمرتبة الشرف الأولى. يمتلك خبرة سابقة في الدوائر والمحاكم التجارية بالرياض.",
      },
      {
        name: "بيان بنت إبراهيم السلوم",
        role: "محامية",
        title: "محامية",
        initials: "ب",
      },
      {
        name: "يسرى بنت رضوان المشيقح",
        role: "محامية",
        title: "محامية",
        initials: "ي",
      },
      {
        name: "محمد بن عمر الجندي",
        role: "محامي متدرب",
        title: "محامي متدرب",
        initials: "م",
      },
      {
        name: "رنا بنت نائف الحربي",
        role: "محامية متدربة",
        title: "محامية متدربة",
        initials: "ر",
        bio: "حاصلة على درجة البكالوريوس في تخصّص القانون بمرتبة الشّرف الأولى من جامعة القصيم، تتركّز ممارستها في القضايا التجاريّة، والتّرافع في الدّعاوى وكتابة المُذكّرات، وإدارة ملفّات الإفلاس، ضمن منهجيّة إدارة المشاريع القانونيّة.",
      },
      {
        name: "سعود بن عبدالله البازعي",
        role: "محامي",
        title: "محامي",
        initials: "س",
      },
      {
        name: "رضوان بن عبدالله المشيقح",
        role: "إداري",
        title: "مدير إداري",
        initials: "ر",
      },
    ],
  },
  en: {
    pageLabel: "Our Team",
    pageTitle: "Our People",
    pageSubtitle: "Our team includes qualified lawyers and legal consultants dedicated to delivering the best legal services with accumulated experience and diverse specializations.",
    members: [
      {
        name: "Abdulrahman Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Founder & Managing Director",
        initials: "A",
        bio: "Attorney, Bankruptcy Trustee, and Notary, with over ten years of experience in legal practice. Adjunct Lecturer at Al-Mustaqbal University, holding a Master's degree in Law with First Class Honors. Possesses prior experience in commercial courts and circuits in Riyadh.",
      },
      {
        name: "Bayan Ibrahim Al-Salloom",
        role: "Attorney",
        title: "Attorney",
        initials: "B",
      },
      {
        name: "Yusra Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Attorney",
        initials: "Y",
      },
      {
        name: "Mohammed Omar Al-Jundi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "M",
      },
      {
        name: "Rana Nayef Al-Harbi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "R",
        bio: "Holds a Bachelor's degree in Law with First Class Honors from Qassim University. Her practice focuses on commercial cases, litigation and legal memoranda drafting, and bankruptcy file management, within a legal project management methodology.",
      },
      {
        name: "Saud Abdullah Al-Bazei",
        role: "Attorney",
        title: "Attorney",
        initials: "S",
      },
      {
        name: "Redwan Abdullah Al-Mushaiqeh",
        role: "Administrator",
        title: "Administrative Manager",
        initials: "R",
      },
    ],
  },
};

export default function Team() {
  const { t, lang, isRTL } = useTranslation();

  const seoSchema = useMemo(() => [
    schemas.breadcrumb([{ name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' }, { name: lang === 'ar' ? 'فريقنا' : 'Our Team', url: '/team' }]),
    ...teamData[lang].members.filter(m => m.bio).map(m => schemas.personAttorney(m.name, m.role, m.bio))
  ], [lang]);
  useSEO({
    title: lang === 'ar' ? 'فريقنا - المحامون' : 'Our Team - Attorneys',
    description: lang === 'ar'
      ? 'تعرف على فريق المحامين في شركة عبدالرحمن رضوان المشيقح للمحاماة. فريق مؤهل بخبرات متنوعة في القضايا التجارية والجنائية والإفلاس.'
      : 'Meet the attorneys at Abdulrahman Redwan Al-Mushaiqi Law Firm. A qualified team with diverse expertise in commercial, criminal, and bankruptcy cases.',
    keywords: lang === 'ar'
      ? 'فريق المحامين، محامي بريدة، عبدالرحمن المشيقح، محامية، أمين إفلاس'
      : 'team of lawyers, lawyer Buraydah, Abdulrahman Al-Mushaiqi, attorney, bankruptcy trustee',
    canonical: '/team',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation({ threshold: 0.05 });

  const data = teamData[lang];

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/office-interior.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={400}
          />
        </div>
        <div
          ref={heroRef}
          className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{data.pageLabel}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">{data.pageTitle}</h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {data.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Team Grid - Global Law Firm Style */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          {/* Section intro */}
          <div
            ref={teamRef}
            className="mb-12 md:mb-16 transition-all duration-700 ease-out"
            style={{
              opacity: teamVisible ? 1 : 0,
              transform: teamVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="h-[2px] bg-[var(--color-gold)] transition-all duration-700"
                style={{ width: teamVisible ? "48px" : "0px", transitionDelay: "200ms" }}
              />
              <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)]">
                {lang === "ar" ? "أعضاء الفريق" : "Team Members"}
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-navy)]">
              {lang === "ar" ? (
                <>تعرّف على <span className="text-[var(--color-gold)]">فريقنا</span></>
              ) : (
                <>Meet Our <span className="text-[var(--color-gold)]">Team</span></>
              )}
            </h2>
          </div>

          {/* Team Cards Grid - Premium international law firm style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
            {data.members.map((member, idx) => (
              <div
                key={member.name}
                className="group bg-white overflow-hidden hover:bg-[var(--color-cream)] transition-all duration-300 cursor-default"
                style={getStaggerStyle(teamVisible, idx, 80)}
              >
                {/* Initials placeholder */}
                <div className="w-full h-[160px] md:h-[180px] bg-[var(--color-navy)] flex items-center justify-center group-hover:bg-[var(--color-navy-light)] transition-colors duration-300">
                  <span className="font-display text-4xl md:text-5xl font-bold text-[var(--color-gold)] group-hover:scale-110 transition-transform duration-300">
                    {member.initials}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 pt-4 md:pt-5">
                  {/* Name */}
                  <h3 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-1.5 leading-tight">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="font-body text-sm text-[var(--color-gold)] font-medium mb-3">
                    {member.title}
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-[1px] bg-[var(--color-gold)]/30 group-hover:w-12 group-hover:bg-[var(--color-gold)] transition-all duration-300 mb-3" />

                  {/* Bio if available */}
                  {member.bio && (
                    <p className="font-body text-xs md:text-[13px] text-[var(--color-navy)]/60 leading-relaxed mb-3 line-clamp-3">
                      {member.bio}
                    </p>
                  )}

                  {/* Role badge */}
                  <span className="inline-block px-3 py-1 text-[11px] font-heading tracking-wide text-[var(--color-navy)]/60 border border-[var(--color-border)] group-hover:border-[var(--color-gold)]/30 transition-colors">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-[var(--color-border)]">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-2">
                  {lang === "ar" ? "انضم إلى فريقنا" : "Join Our Team"}
                </h3>
                <p className="font-body text-sm text-[var(--color-navy)]/60">
                  {lang === "ar"
                    ? "نبحث دائماً عن محامين ومتخصصين قانونيين متميزين للانضمام إلى فريقنا."
                    : "We are always looking for talented lawyers and legal professionals to join our team."}
                </p>
              </div>
              <div className={`${isRTL ? 'md:text-left' : 'md:text-right'}`}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-navy)] text-white font-heading text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300"
                >
                  {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
