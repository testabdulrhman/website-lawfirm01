import { useParams, Link, Redirect } from "wouter";
import { MapPin, Phone, Mail, CheckCircle, Scale, Building, ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation, getFadeStyle } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { getCityBySlug, citiesData } from "@/data/cities";
import { useState, useMemo } from "react";
import { localePath } from "@/lib/localePath";

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);
  const city = getCityBySlug(slug || "");

  const { ref: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: courtsRef, isVisible: courtsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.1 });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const content = city ? (lang === "ar" ? city.ar : city.en) : null;

  const schema = useMemo(() => {
    if (!city || !content) return undefined;
    const cityContent = content;
    return [
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": lang === "ar"
          ? `شركة عبدالرحمن رضوان المشيقح للمحاماة - ${cityContent.name}`
          : `Al-Mushaiqeh Law Firm - ${cityContent.name}`,
        "url": `https://redwan.sa/locations/${city.slug}`,
        "description": cityContent.intro,
        "telephone": "+966505149800",
        "email": "info@redwan.sa",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityContent.name,
          "addressRegion": cityContent.region,
          "addressCountry": "SA",
        },
        "areaServed": {
          "@type": "City",
          "name": cityContent.name,
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "08:00",
          "closes": "16:00",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": cityContent.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
      schemas.breadcrumb([
        { name: lang === "ar" ? "الرئيسية" : "Home", url: "/" },
        { name: cityContent.title, url: `/locations/${city.slug}` },
      ]),
    ];
  }, [city, content, lang]);

  useSEO({
    title: content?.metaTitle || "",
    description: content?.metaDesc || "",
    keywords: content ? `${content.name}, ${content.title}, محامي, lawyer, ${content.region}` : "",
    canonical: city ? `/locations/${city.slug}` : undefined,
    schema,
  });

  if (!city) {
    return <Redirect to="/404" />;
  }

  const t = content!;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-[var(--color-gold)]" />
            <span className="font-body text-sm text-white/70">{t.region}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Quick Contact */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="tel:+966505149800"
              className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-[var(--color-navy)] px-5 py-3 font-heading text-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              0505149800
            </a>
            <a
              href="mailto:info@redwan.sa"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-3 font-heading text-sm font-semibold hover:border-white/60 transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@redwan.sa
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={introRef}
            className="max-w-4xl mx-auto"
            style={getFadeStyle(introVisible, "up", 0)}
          >
            <p className="font-body text-base md:text-lg text-[var(--color-navy)]/80 leading-relaxed mb-10">
              {t.intro}
            </p>

            {/* Why Choose Us */}
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-6">
              {lang === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
            </h2>
            <div className="space-y-3">
              {t.whyUs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--color-gold)] mt-0.5 shrink-0" />
                  <p className="font-body text-sm md:text-base text-[var(--color-navy)]/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={servicesRef} style={getFadeStyle(servicesVisible, "up", 0)}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] text-center mb-4">
              {lang === "ar" ? `خدماتنا القانونية في ${t.name}` : `Our Legal Services in ${t.name}`}
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--color-navy)]/60 text-center mb-12 max-w-2xl mx-auto">
              {lang === "ar"
                ? "نقدم مجموعة شاملة من الخدمات القانونية المتخصصة"
                : "We offer a comprehensive range of specialized legal services"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.services.map((service, i) => (
                <div
                  key={i}
                  className="p-6 border border-[var(--color-border)] bg-[var(--color-cream)] hover:border-[var(--color-gold)]/50 transition-colors group"
                  style={getFadeStyle(servicesVisible, "up", i * 80)}
                >
                  <Scale className="w-8 h-8 text-[var(--color-gold)] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-base md:text-lg font-semibold text-[var(--color-navy)] mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-navy)]/60 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courts */}
      <section className="py-16 md:py-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={courtsRef} style={getFadeStyle(courtsVisible, "up", 0)}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-4">
              {lang === "ar" ? `المحاكم التي نترافع أمامها في ${t.name}` : `Courts We Practice Before in ${t.name}`}
            </h2>
            <p className="font-body text-sm text-white/50 text-center mb-10">
              {lang === "ar"
                ? "ترخيص وزارة العدل رقم 26/129"
                : "Ministry of Justice License No. 26/129"}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {t.courts.map((court, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 border border-white/10 bg-white/5"
                  style={getFadeStyle(courtsVisible, "up", i * 60)}
                >
                  <Building className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                  <span className="font-body text-sm text-white/80">{court}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div ref={faqRef} className="max-w-3xl mx-auto" style={getFadeStyle(faqVisible, "up", 0)}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] text-center mb-10">
              {lang === "ar" ? "أسئلة شائعة" : "Frequently Asked Questions"}
            </h2>

            <div className="space-y-3">
              {t.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-[var(--color-border)] bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-start hover:bg-[var(--color-cream)]/50 transition-colors"
                  >
                    <span className="font-heading text-sm md:text-base font-semibold text-[var(--color-navy)] pr-4">
                      {faq.q}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[var(--color-navy)]/40 shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="font-body text-sm text-[var(--color-navy)]/70 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={ctaRef}
            className="max-w-3xl mx-auto text-center"
            style={getFadeStyle(ctaVisible, "up", 0)}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-4">
              {lang === "ar"
                ? `هل تحتاج محامي في ${t.name}؟`
                : `Need a Lawyer in ${t.name}?`}
            </h2>
            <p className="font-body text-base text-[var(--color-navy)]/60 mb-8">
              {lang === "ar"
                ? "تواصل معنا اليوم للحصول على استشارة قانونية متخصصة. فريقنا جاهز لمساعدتك."
                : "Contact us today for a specialized legal consultation. Our team is ready to help you."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={lp("/contact")}
                className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-[var(--color-navy)] px-8 py-3.5 font-heading text-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-colors"
              >
                {lang === "ar" ? "احجز استشارة" : "Book Consultation"}
              </Link>
              <a
                href="https://wa.me/966505149800"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--color-navy)]/20 text-[var(--color-navy)] px-8 py-3.5 font-heading text-sm font-semibold hover:border-[var(--color-navy)]/40 transition-colors"
              >
                {lang === "ar" ? "واتساب" : "WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-12 bg-[var(--color-cream)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <h3 className="font-heading text-base font-semibold text-[var(--color-navy)]/60 text-center mb-6">
            {lang === "ar" ? "خدماتنا في مدن أخرى" : "Our Services in Other Cities"}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {citiesData
              .filter(c => c.slug !== city.slug)
              .map(c => (
                <Link
                  key={c.slug}
                  href={lp(`/locations/${c.slug}`)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] bg-white text-[var(--color-navy)]/70 font-body text-sm hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {lang === "ar" ? c.ar.name : c.en.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
