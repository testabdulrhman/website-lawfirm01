/**
 * Team Page - صفحة فريق العمل
 * Design: Libero-inspired dark theme with grayscale photos and hover color reveal
 */
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { langKey } from "@/lib/langKey";
import { useMemo } from "react";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";

interface TeamMember {
  name: string;
  role: string;
  title: string;
  initials: string;
  bio?: string;
  image: string;
}

const teamData: Record<string, { pageLabel: string; pageTitle: string; pageSubtitle: string; members: TeamMember[] }> = {
  ar: {
    pageLabel: "فريقنا",
    pageTitle: "فريق العمل",
    pageSubtitle: "يضم فريقنا محامين ومستشارين قانونيين مؤهلين لتقديم أفضل الخدمات القانونية بخبرة متراكمة وتخصصات متنوعة.",
    members: [
      {
        name: "عبدالرحمن بن رضوان المشيقح",
        role: "محامي",
        title: "المؤسس والمدير التنفيذي",
        initials: "ع",
        bio: "محامٍ، وأمين إفلاس، وموثّق، بخبرة تتجاوز عشر سنوات في الأعمال القانونية. محاضر متعاون بجامعة المستقبل، حاصل على درجة الماجستير في الأنظمة بمرتبة الشرف الأولى.",
        image: "/manus-storage/Lnl9U2kYqWFi_12d87743.jpg",
      },
      {
        name: "يسرى بنت رضوان المشيقح",
        role: "محامية",
        title: "محامية",
        initials: "ي",
        image: "/manus-storage/uRknnnwo55js_6ed43413.webp",
      },
      {
        name: "محمد بن عمر الجندي",
        role: "محامي متدرب",
        title: "محامي متدرب",
        initials: "م",
        image: "/manus-storage/ldEqFM2EhJ32_bbd15377.jpg",
      },
      {
        name: "رنا بنت نائف الحربي",
        role: "محامية متدربة",
        title: "محامية متدربة",
        initials: "ر",
        bio: "حاصلة على درجة البكالوريوس في تخصّص القانون بمرتبة الشّرف الأولى من جامعة القصيم، تتركّز ممارستها في القضايا التجاريّة وإدارة ملفّات الإفلاس.",
        image: "/manus-storage/dvThbD55utsz_f350d18f.jpg",
      },
      {
        name: "رضوان بن عبدالله المشيقح",
        role: "إداري",
        title: "مدير إداري",
        initials: "ر",
        image: "/manus-storage/dP0YNewN8QFM_70e123f7.jpg",
      },
    ],
  },
  en: {
    pageLabel: "Our Team",
    pageTitle: "Our Team",
    pageSubtitle: "Our team includes qualified lawyers and legal consultants dedicated to delivering the best legal services with accumulated experience and diverse specializations.",
    members: [
      {
        name: "Abdulrahman Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Founder & Managing Director",
        initials: "A",
        bio: "Attorney, Bankruptcy Trustee, and Notary, with over ten years of experience in legal practice. Adjunct Lecturer at Al-Mustaqbal University, holding a Master's degree in Law with First Class Honors.",
        image: "/manus-storage/Lnl9U2kYqWFi_12d87743.jpg",
      },
      {
        name: "Yusra Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Attorney",
        initials: "Y",
        image: "/manus-storage/uRknnnwo55js_6ed43413.webp",
      },
      {
        name: "Mohammed Omar Al-Jundi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "M",
        image: "/manus-storage/ldEqFM2EhJ32_bbd15377.jpg",
      },
      {
        name: "Rana Nayef Al-Harbi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "R",
        bio: "Holds a Bachelor's degree in Law with First Class Honors from Qassim University. Her practice focuses on commercial cases and bankruptcy file management.",
        image: "/manus-storage/dvThbD55utsz_f350d18f.jpg",
      },
      {
        name: "Redwan Abdullah Al-Mushaiqeh",
        role: "Administrator",
        title: "Administrative Manager",
        initials: "R",
        image: "/manus-storage/dP0YNewN8QFM_70e123f7.jpg",
      },
    ],
  },
};

export default function Team() {
  const { t, lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  const seoSchema = useMemo(() => [
    schemas.breadcrumb([{ name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' }, { name: lang === 'ar' ? 'فريقنا' : 'Our Team', url: '/team' }]),
    ...teamData[langKey(lang)].members.filter(m => m.bio).map(m => schemas.personAttorney(m.name, m.role, m.bio))
  ], [lang]);
  useSEO({
    title: lang === 'ar' ? 'فريقنا - المحامون' : 'Our Team - Attorneys',
    description: lang === 'ar'
      ? 'تعرف على فريق المحامين في شركة عبدالرحمن رضوان المشيقح للمحاماة. فريق مؤهل بخبرات متنوعة في القضايا التجارية والجنائية والإفلاس.'
      : 'Meet the attorneys at Abdulrahman Redwan Al-Mushaiqi Law Firm. A qualified team with diverse expertise in commercial, criminal, and bankruptcy cases.',
    canonical: '/team',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation({ threshold: 0.05 });

  const data = teamData[langKey(lang)];

  return (
    <>
      {/* Page Hero - Minimal header */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 bg-[#1a1a1a]">
        <div
          ref={heroRef}
          className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10 text-center transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Small icon */}
          <div className="mb-4 flex justify-center">
            <svg className="w-8 h-8 text-[var(--color-gold)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            {data.pageTitle}
          </h1>
          <p className="font-body text-sm text-white/50">
            {data.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Team Grid - Libero Style: Dark background, grayscale photos */}
      <section className="bg-[#2a2a2a] py-0">
        <div
          ref={teamRef}
          className="container mx-auto px-0"
        >
          {/* First row - Main team with biography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {data.members.slice(0, 4).map((member, idx) => (
              <div
                key={member.name}
                className="group relative"
                style={getStaggerStyle(teamVisible, idx, 100)}
              >
                {/* Photo */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Name & Role overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                  <h3 className="font-heading text-sm md:text-base font-bold text-white uppercase tracking-wide mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[var(--color-gold)] italic">
                    {member.title}
                  </p>
                </div>

                {/* Hover: Show bio panel */}
                {member.bio && (
                  <div className="absolute inset-0 bg-[#1a1a1a]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 md:p-8">
                    <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[var(--color-gold)] mb-3">
                      {lang === "ar" ? "نبذة" : "Biography"}
                    </h4>
                    <p className="font-body text-xs md:text-sm text-white/80 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Second row - Remaining member(s) centered */}
          {data.members.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {data.members.slice(4).map((member, idx) => (
                <div
                  key={member.name}
                  className="group relative"
                  style={getStaggerStyle(teamVisible, idx + 4, 100)}
                >
                  {/* Photo */}
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Name & Role overlay at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                    <h3 className="font-heading text-sm md:text-base font-bold text-white uppercase tracking-wide mb-1">
                      {member.name}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-[var(--color-gold)] italic">
                      {member.title}
                    </p>
                  </div>

                  {/* Hover: Show bio panel */}
                  {member.bio && (
                    <div className="absolute inset-0 bg-[#1a1a1a]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 md:p-8">
                      <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[var(--color-gold)] mb-3">
                        {lang === "ar" ? "نبذة" : "Biography"}
                      </h4>
                      <p className="font-body text-xs md:text-sm text-white/80 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA - Join our team */}
      <section className="bg-[#1a1a1a] py-16 md:py-20">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                {lang === "ar" ? "انضم إلى فريقنا" : "Join Our Team"}
              </h3>
              <p className="font-body text-sm text-white/50">
                {lang === "ar"
                  ? "نبحث دائماً عن محامين ومتخصصين قانونيين متميزين للانضمام إلى فريقنا."
                  : "We are always looking for talented lawyers and legal professionals to join our team."}
              </p>
            </div>
            <div className={`${isRTL ? 'md:text-left' : 'md:text-right'}`}>
              <Link
                href={lp("/contact")}
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--color-gold)] text-[var(--color-gold)] font-heading text-sm font-medium uppercase tracking-wider hover:bg-[var(--color-gold)] hover:text-[#1a1a1a] transition-all duration-300"
              >
                {lang === "ar" ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
