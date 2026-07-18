/**
 * Team Page - صفحة فريق العمل
 * Design: Libero layout style (white bg, navy name bar, biography below) with site colors
 */
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { langKey } from "@/lib/langKey";
import { useMemo } from "react";
import { useSEO, schemas } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import { Twitter, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  title: string;
  initials: string;
  bio?: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

const teamData: Record<string, { pageLabel: string; pageTitle: string; pageSubtitle: string; members: TeamMember[] }> = {
  ar: {
    pageLabel: "فريقنا",
    pageTitle: "فريق العمل",
    pageSubtitle: "عرض الفريق",
    members: [
      {
        name: "عبدالرحمن بن رضوان المشيقح",
        role: "محامي",
        title: "المؤسس والمدير التنفيذي",
        initials: "ع",
        bio: "محامٍ، وأمين إفلاس، وموثّق، بخبرة تتجاوز عشر سنوات في الأعمال القانونية. محاضر متعاون بجامعة المستقبل، حاصل على درجة الماجستير في الأنظمة بمرتبة الشرف الأولى. يمتلك خبرة سابقة في الدوائر والمحاكم التجارية بالرياض.",
        image: "/manus-storage/Lnl9U2kYqWFi_12d87743.jpg",
      },
      {
        name: "يسرى بنت رضوان المشيقح",
        role: "محامية",
        title: "محامية",
        initials: "ي",
        bio: "محامية مرخصة تعمل في مجال القضايا التجارية والنزاعات العقارية، وتساهم في إعداد المذكرات القانونية والترافع أمام الجهات القضائية.",
        image: "/manus-storage/uRknnnwo55js_6ed43413.webp",
      },
      {
        name: "محمد بن عمر الجندي",
        role: "محامي متدرب",
        title: "محامي متدرب",
        initials: "م",
        bio: "محامي متدرب يعمل على تطوير مهاراته القانونية في مجالات التقاضي التجاري وإدارة إجراءات الإفلاس تحت إشراف المحامين المرخصين.",
        image: "/manus-storage/ldEqFM2EhJ32_bbd15377.jpg",
      },
      {
        name: "رنا بنت نائف الحربي",
        role: "محامية متدربة",
        title: "محامية متدربة",
        initials: "ر",
        bio: "حاصلة على درجة البكالوريوس في تخصّص القانون بمرتبة الشّرف الأولى من جامعة القصيم، تتركّز ممارستها في القضايا التجاريّة، والتّرافع في الدّعاوى وكتابة المُذكّرات، وإدارة ملفّات الإفلاس.",
        image: "/manus-storage/dvThbD55utsz_f350d18f.jpg",
      },
      {
        name: "رضوان بن عبدالله المشيقح",
        role: "إداري",
        title: "مدير إداري",
        initials: "ر",
        bio: "يتولى إدارة الشؤون الإدارية والتنسيق بين أقسام الشركة لضمان سير العمل بكفاءة وانتظام.",
        image: "/manus-storage/dP0YNewN8QFM_70e123f7.jpg",
      },
    ],
  },
  en: {
    pageLabel: "Our Team",
    pageTitle: "Our Team",
    pageSubtitle: "Team Presentation",
    members: [
      {
        name: "Abdulrahman Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Founder & Managing Director",
        initials: "A",
        bio: "Attorney, Bankruptcy Trustee, and Notary, with over ten years of experience in legal practice. Adjunct Lecturer at Al-Mustaqbal University, holding a Master's degree in Law with First Class Honors. Possesses prior experience in commercial courts and circuits in Riyadh.",
        image: "/manus-storage/Lnl9U2kYqWFi_12d87743.jpg",
      },
      {
        name: "Yusra Redwan Al-Mushaiqeh",
        role: "Attorney",
        title: "Attorney",
        initials: "Y",
        bio: "A licensed attorney specializing in commercial cases and real estate disputes, contributing to legal memoranda preparation and court representation.",
        image: "/manus-storage/uRknnnwo55js_6ed43413.webp",
      },
      {
        name: "Mohammed Omar Al-Jundi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "M",
        bio: "A trainee attorney developing his legal skills in commercial litigation and bankruptcy proceedings management under the supervision of licensed attorneys.",
        image: "/manus-storage/ldEqFM2EhJ32_bbd15377.jpg",
      },
      {
        name: "Rana Nayef Al-Harbi",
        role: "Trainee Attorney",
        title: "Trainee Attorney",
        initials: "R",
        bio: "Holds a Bachelor's degree in Law with First Class Honors from Qassim University. Her practice focuses on commercial cases, litigation and legal memoranda drafting, and bankruptcy file management.",
        image: "/manus-storage/dvThbD55utsz_f350d18f.jpg",
      },
      {
        name: "Redwan Abdullah Al-Mushaiqeh",
        role: "Administrator",
        title: "Administrative Manager",
        initials: "R",
        bio: "Manages administrative affairs and coordinates between company departments to ensure efficient and organized workflow.",
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
      {/* Page Hero - Dark navy header like Libero */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 bg-[var(--color-navy)]">
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
        {/* Bottom wave/divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10">
            <path d="M0 40L1440 40L1440 0C1440 0 1080 40 720 40C360 40 0 0 0 0L0 40Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Team Grid - White background, Libero card style */}
      <section className="py-16 md:py-24 bg-white">
        <div
          ref={teamRef}
          className="container mx-auto px-5 md:px-4 lg:px-8"
        >
          {/* Team Cards Grid - 4 columns like Libero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {data.members.map((member, idx) => (
              <div
                key={member.name}
                className="group text-center"
                style={getStaggerStyle(teamVisible, idx, 100)}
              >
                {/* Photo with navy name bar at bottom */}
                <div className="relative mb-6 overflow-hidden">
                  {/* Grayscale photo */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Navy name bar at bottom of photo */}
                  <div className="absolute bottom-0 inset-x-0 bg-[var(--color-navy)]/90 backdrop-blur-sm py-3 px-4">
                    <h3 className="font-heading text-xs md:text-sm font-bold text-white uppercase tracking-wide">
                      {member.name}
                    </h3>
                    <p className="font-body text-[11px] md:text-xs text-[var(--color-gold)] italic mt-0.5">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Biography section below photo */}
                {member.bio && (
                  <div className="px-2">
                    <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[var(--color-navy)] font-bold mb-3">
                      {lang === "ar" ? "نبذة" : "Biography"}
                    </h4>
                    <p className="font-body text-xs md:text-[13px] text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-4">
                      <a href="#" className="text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {/* If no bio, just show social links */}
                {!member.bio && (
                  <div className="flex items-center justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label="Twitter">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA - Join our team */}
      <section className="bg-[var(--color-navy)] py-16 md:py-20">
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
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--color-gold)] text-[var(--color-gold)] font-heading text-sm font-medium uppercase tracking-wider hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300"
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
