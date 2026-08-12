/**
 * Team Page - صفحة فريق العمل
 * Original hero header + Libero card style (photo, navy name bar, biography below) with site colors
 */
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { langKey } from "@/lib/langKey";
import { useMemo, useState } from "react";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import { Twitter, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  title: string;
  initials: string;
  bio?: string;
  image?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * صورة عضو الفريق مع بديل احتياطي.
 */
function TeamPhoto({ src, name, initials }: { src?: string; name: string; initials: string }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-[var(--color-navy)]"
        role="img"
        aria-label={name}
      >
        <span className="font-display text-5xl md:text-6xl font-bold text-[var(--color-gold)] select-none">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const teamData: Record<string, { pageLabel: string; pageTitle: string; pageSubtitle: string; members: TeamMember[] }> = {
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
        twitter: "https://x.com/amoshiqah",
        bio: "محامٍ، وأمين إفلاس، وموثّق، بخبرة تتجاوز عشر سنوات في الأعمال القانونية. محاضر متعاون بجامعة المستقبل، حاصل على درجة الماجستير في الأنظمة بمرتبة الشرف الأولى. يمتلك خبرة سابقة في الدوائر والمحاكم التجارية بالرياض.",
      },
      {
        name: "يسرى بنت رضوان المشيقح",
        role: "محامية",
        title: "محامية",
        initials: "ي",
        bio: "محامية مرخصة تعمل في مجال القضايا التجارية والنزاعات العقارية، وتساهم في إعداد المذكرات القانونية والترافع أمام الجهات القضائية.",
      },
      {
        name: "محمد بن عمر الجندي",
        role: "محامي متدرب",
        title: "محامي متدرب",
        initials: "م",
        bio: "محامي متدرب يعمل على تطوير مهاراته القانونية في مجالات التقاضي التجاري وإدارة إجراءات الإفلاس تحت إشراف المحامين المرخصين.",
      },
      {
        name: "رنا بنت نائف الحربي",
        role: "محامية متدربة",
        title: "محامية متدربة",
        initials: "ر",
        bio: "حاصلة على درجة البكالوريوس في تخصّص القانون بمرتبة الشّرف الأولى من جامعة القصيم، تتركّز ممارستها في القضايا التجاريّة، والتّرافع في الدّعاوى وكتابة المُذكّرات، وإدارة ملفّات الإفلاس.",
      },
      {
        name: "رضوان بن عبدالله المشيقح",
        role: "إداري",
        title: "مدير إداري",
        initials: "ر",
        bio: "يتولى إدارة الشؤون الإدارية والتنسيق بين أقسام الشركة لضمان سير العمل بكفاءة وانتظام.",
      },
    ],
  },
  en: {
    pageLabel: "Our Team",
    pageTitle: "Our People",
    pageSubtitle: "Our team includes qualified lawyers and legal consultants dedicated to delivering the best legal services with accumulated experience and diverse specializations.",
    members: [
      {
        name: "Abdulrahman bin Redwan Al-Moshiqeh",
        role: "Attorney",
        title: "Founder & Managing Director",
        initials: "A",
        bio: "Attorney, Bankruptcy Trustee, and Notary, with over ten years of experience in legal practice. Adjunct Lecturer at Al-Mustaqbal University, holding a Master's degree in Law with First Class Honors. Possesses prior experience in commercial courts and circuits in Riyadh.",
      },
      {
        name: "Yusra Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Attorney",
        initials: "Y",
        bio: "A licensed attorney specializing in commercial cases and real estate disputes, contributing to legal memoranda preparation and court representation.",
      },
      {
        name: "Mohammed Omar Al-Jundi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "M",
        bio: "A trainee attorney developing his legal skills in commercial litigation and bankruptcy proceedings management under the supervision of licensed attorneys.",
      },
      {
        name: "Rana Nayef Al-Harbi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "R",
        bio: "Holds a Bachelor's degree in Law with First Class Honors from Qassim University. Her practice focuses on commercial cases, litigation and legal memoranda drafting, and bankruptcy file management.",
      },
      {
        name: "Redwan Abdullah Al-Mushaiqeh",
        role: "Administrator",
        title: "Administrative Manager",
        initials: "R",
        bio: "Manages administrative affairs and coordinates between company departments to ensure efficient and organized workflow.",
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
      ? 'تعرف على فريق المحامين في شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. فريق مؤهل بخبرات متنوعة في القضايا التجارية والجنائية والإفلاس.'
      : 'Meet the attorneys at Abdulrahman bin Redwan Al-Moshiqeh Law Firm and Bankruptcy Procedures Management. A qualified team with diverse expertise in commercial, criminal, and bankruptcy cases.',
    canonical: '/team',
    schema: seoSchema,
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation({ threshold: 0.05 });

  const data = teamData[langKey(lang)];

  return (
    <>
      {/* Page Hero - Original dark navy header with breadcrumb */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/office-interior-1280.webp"
            srcSet="/images/office-interior-768.webp 768w, /images/office-interior-1280.webp 1280w, /images/office-interior.webp 2048w"
            sizes="100vw"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            width={1280}
            height={720}
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
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{data.pageLabel}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">{data.pageTitle}</h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {data.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Team Grid - White background */}
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

          {/* Team Cards Grid - Libero style: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {data.members.map((member, idx) => (
              <div
                key={member.name}
                className="group text-center"
                style={getStaggerStyle(teamVisible, idx, 100)}
              >
                {/* Photo with navy name bar at bottom */}
                <div className="relative mb-5 overflow-hidden border border-[var(--color-border)]">
                  {/* Photo area */}
                  <div className="aspect-[3/4] overflow-hidden bg-[var(--color-navy)]/5">
                    <TeamPhoto
                      src={member.image}
                      name={member.name}
                      initials={member.initials}
                    />
                  </div>

                  {/* Navy name bar at bottom of photo - Libero style */}
                  <div className="absolute bottom-0 inset-x-0 bg-[var(--color-navy)]/90 backdrop-blur-sm py-3 px-3">
                    <h3 className="font-heading text-[11px] md:text-xs font-bold text-white uppercase tracking-wide leading-tight">
                      {member.name}
                    </h3>
                    <p className="font-body text-[10px] md:text-[11px] text-[var(--color-gold)] italic mt-0.5">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Biography section below card */}
                {member.bio && (
                  <div className="px-1">
                    <h4 className="font-heading text-[11px] uppercase tracking-[0.15em] text-[var(--color-navy)] font-bold mb-2">
                      {lang === "ar" ? "نبذة" : "Biography"}
                    </h4>
                    <p className="font-body text-[12px] md:text-[13px] text-gray-600 leading-relaxed mb-3">
                      {member.bio}
                    </p>
                  </div>
                )}

                {/* Social links */}
                <div className="flex items-center justify-center gap-4 mt-2">
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label="Twitter">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {!member.twitter && !member.linkedin && (
                    <>
                      <span className="text-gray-300">
                        <Twitter className="w-4 h-4" />
                      </span>
                      <span className="text-gray-300">
                        <Linkedin className="w-4 h-4" />
                      </span>
                    </>
                  )}
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
                  href={lp("/careers")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-navy)] text-white font-heading text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300"
                >
                  {lang === "ar" ? "تقدّم الآن" : "Apply Now"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
