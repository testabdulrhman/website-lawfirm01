const teamMembers = [
  {
    name: "أ. عبدالله الراشد",
    role: "الشريك المؤسس والمدير التنفيذي",
    speciality: "القانون التجاري والتحكيم الدولي",
    experience: "30 عاماً",
  },
  {
    name: "أ. فهد العتيبي",
    role: "شريك رئيسي",
    speciality: "التقاضي والمرافعات",
    experience: "20 عاماً",
  },
  {
    name: "أ. سارة المالكي",
    role: "شريكة",
    speciality: "الملكية الفكرية والتقنية",
    experience: "15 عاماً",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[2px] bg-[var(--color-gold)]" />
          <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
            فريقنا
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight">
            نخبة من <span className="text-[var(--color-gold)]">المحامين</span>
            <br />المتخصصين
          </h2>
          <p className="font-body text-base lg:text-lg text-[var(--color-navy)]/60 leading-relaxed self-end">
            يضم فريقنا محامين ومستشارين قانونيين حاصلين على أعلى الشهادات من جامعات سعودية ودولية مرموقة، مع خبرات عملية واسعة في مختلف التخصصات القانونية.
          </p>
        </div>

        {/* Team Image + Cards */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Team Photo */}
          <div className="lg:col-span-2 relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/team-law-firm-RgRmHZto2MWezFjUhEjUFD.webp"
              alt="فريق العمل"
              className="w-full h-[400px] lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 to-transparent" />
            <div className="absolute bottom-6 right-6">
              <span className="font-display text-5xl font-bold text-[var(--color-gold)]">15+</span>
              <p className="font-body text-sm text-white/80">محامٍ ومستشار</p>
            </div>
          </div>

          {/* Team Cards */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className="group p-6 lg:p-8 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 transition-all duration-300 flex items-start gap-6"
              >
                <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-lg font-bold text-[var(--color-gold)]">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-1">
                    {member.name}
                  </h4>
                  <p className="font-heading text-sm text-[var(--color-gold)] mb-2">
                    {member.role}
                  </p>
                  <p className="font-body text-sm text-[var(--color-navy)]/60">
                    {member.speciality} • خبرة {member.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
