import { useState, useMemo, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { MapView } from "@/components/Map";
import { toast } from "sonner";
import { Link } from "wouter";
import { useScrollAnimation, getFadeStyle, getStaggerStyle } from "@/hooks/useScrollAnimation";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO, schemas } from "@/hooks/useSEO";
import { trackContactFormSubmit, trackPhoneClick, trackWhatsAppClick, trackEmailClick } from "@/lib/analytics";

export default function Contact() {
  const { t, lang, isRTL } = useTranslation();

  const seoSchema = useMemo(() => [schemas.breadcrumb([{ name: lang === 'ar' ? 'الرئيسية' : 'Home', url: '/' }, { name: lang === 'ar' ? 'تواصل معنا' : 'Contact', url: '/contact' }])], [lang]);
  useSEO({
    title: lang === 'ar' ? 'تواصل معنا - احجز استشارة' : 'Contact Us - Book a Consultation',
    description: lang === 'ar'
      ? 'تواصل مع شركة عبدالرحمن رضوان المشيقح للمحاماة. احجز استشارة قانونية الآن. هاتف: 0505149800 | بريدة، القصيم.'
      : 'Contact Abdulrahman Redwan Al-Mushaiqi Law Firm. Book a legal consultation now. Phone: 0505149800 | Buraydah, Qassim.',
    keywords: lang === 'ar'
      ? 'تواصل معنا، استشارة قانونية، محامي بريدة، حجز موعد، رقم محامي'
      : 'contact us, legal consultation, lawyer Buraydah, book appointment, lawyer phone number',
    canonical: '/contact',
    schema: seoSchema,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mqeozjdk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }),
      });
      if (response.ok) {
        trackContactFormSubmit();
        toast.success(lang === "ar" ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." : "Message sent successfully! We will contact you soon.");
        setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        toast.error(lang === "ar" ? "حدث خطأ في الإرسال. حاول مرة أخرى." : "Failed to send. Please try again.");
      }
    } catch {
      toast.error(lang === "ar" ? "حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت." : "Connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = lang === "ar" ? [
    { value: "", label: "اختر الخدمة" },
    { value: "civil", label: "القضايا المدنية والتجارية" },
    { value: "labor", label: "قضايا العمل والعمال" },
    { value: "criminal", label: "القضايا الجنائية" },
    { value: "personal", label: "الأحوال الشخصية" },
    { value: "realestate", label: "النزاعات العقارية" },
    { value: "bankruptcy", label: "الإفلاس والتصفية" },
    { value: "arbitration", label: "التحكيم" },
    { value: "consultation", label: "الاستشارات القانونية" },
    { value: "other", label: "أخرى" },
  ] : [
    { value: "", label: "Select a service" },
    { value: "civil", label: "Civil & Commercial Cases" },
    { value: "labor", label: "Labor & Employment" },
    { value: "criminal", label: "Criminal Cases" },
    { value: "personal", label: "Personal Status" },
    { value: "realestate", label: "Real Estate Disputes" },
    { value: "bankruptcy", label: "Bankruptcy & Liquidation" },
    { value: "arbitration", label: "Arbitration" },
    { value: "consultation", label: "Legal Consultation" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.nav.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.nav.contact}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">{t.contact.title}</h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 order-2 lg:order-1 space-y-6 md:space-y-8">
              <div className="relative overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/consultation-room-ix3xFaGymHggxZG5BkAghM.webp"
                  alt={lang === "ar" ? "غرفة الاستشارات" : "Consultation Room"}
                  className="w-full h-[180px] md:h-[220px] object-cover"
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] mb-1">
                      {lang === "ar" ? "العنوان" : "Address"}
                    </h4>
                    <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60">
                      {t.footer.address}
                      <br />{t.footer.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] mb-1">
                      {lang === "ar" ? "الهاتف" : "Phone"}
                    </h4>
                    <a href="tel:+966505149800" onClick={() => trackPhoneClick('contact_page')} className="block font-body text-xs md:text-sm text-[var(--color-navy)]/60 hover:text-[var(--color-gold)] transition-colors" dir="ltr">
                      0505149800
                    </a>
                    <a href="tel:+966920032760" onClick={() => trackPhoneClick('contact_page_920')} className="block font-body text-xs md:text-sm text-[var(--color-navy)]/60 hover:text-[var(--color-gold)] transition-colors" dir="ltr">
                      920032760
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] mb-1">
                      {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                    </h4>
                    <a href="mailto:info@redwan.sa" onClick={() => trackEmailClick('contact_page')} className="font-body text-xs md:text-sm text-[var(--color-navy)]/60 hover:text-[var(--color-gold)] transition-colors">info@redwan.sa</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs md:text-sm font-semibold text-[var(--color-navy)] mb-1">
                      {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                    </h4>
                    <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/60">
                      {lang === "ar" ? "الأحد - الخميس" : "Sunday - Thursday"}
                      <br />{lang === "ar" ? "8:00 ص - 4:00 م" : "8:00 AM - 4:00 PM"}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/966505149800"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('contact_page')}
                className="flex items-center justify-center gap-2.5 w-full px-5 py-3 bg-[var(--color-navy)] text-white font-heading font-medium text-sm hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] active:scale-[0.97] transition-all duration-200 border border-[var(--color-border)]"
              >
                <MessageCircle size={16} />
                <span>{t.footer.whatsapp}</span>
              </a>
            </div>

            {/* Contact Form */}
            <div
              ref={formRef}
              className="lg:col-span-3 order-1 lg:order-2 transition-all duration-700 ease-out"
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "translateX(0)" : `translateX(${isRTL ? '-20px' : '20px'})`,
              }}
            >
              <form onSubmit={handleSubmit} className="p-5 md:p-8 lg:p-10 bg-white border border-[var(--color-border)]">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-1.5 md:mb-2">
                  {lang === "ar" ? "أرسل استفسارك" : "Send Your Inquiry"}
                </h3>
                <p className="font-body text-xs md:text-sm text-[var(--color-navy)]/50 mb-6 md:mb-8">
                  {lang === "ar" ? "املأ النموذج التالي وسنتواصل معك خلال 24 ساعة عمل" : "Fill out the form below and we'll get back to you within 24 business hours"}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  <div>
                    <label className="block font-body text-xs md:text-sm text-[var(--color-navy)]/70 mb-1.5 md:mb-2">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                      placeholder={lang === "ar" ? "أدخل اسمك" : "Enter your name"}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs md:text-sm text-[var(--color-navy)]/70 mb-1.5 md:mb-2">
                      {t.contact.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  <div>
                    <label className="block font-body text-xs md:text-sm text-[var(--color-navy)]/70 mb-1.5 md:mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs md:text-sm text-[var(--color-navy)]/70 mb-1.5 md:mb-2">
                      {lang === "ar" ? "نوع الخدمة" : "Service Type"}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                    >
                      {serviceOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5 md:mb-6">
                  <label className="block font-body text-xs md:text-sm text-[var(--color-navy)]/70 mb-1.5 md:mb-2">
                    {lang === "ar" ? "تفاصيل الاستفسار" : "Inquiry Details"}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 md:px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all resize-none"
                    placeholder={lang === "ar" ? "اكتب تفاصيل استفسارك هنا..." : "Write your inquiry details here..."}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-3.5 md:py-4 bg-[var(--color-navy)] text-[var(--color-cream)] font-heading font-semibold text-sm md:text-base hover:bg-[var(--color-navy-light)] hover:shadow-lg transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  <span>{isSubmitting ? (lang === "ar" ? "جاري الإرسال..." : "Sending...") : t.contact.send}</span>
                </button>

                <p className="font-body text-[10px] md:text-xs text-[var(--color-navy)]/40 mt-3 md:mt-4 text-center">
                  {lang === "ar" ? "جميع المعلومات سرية ومحمية. سنتواصل معك خلال 24 ساعة عمل." : "All information is confidential and protected. We will contact you within 24 business hours."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-white border-t border-[var(--color-border)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 py-10 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={20} className="text-[var(--color-gold)]" />
            <h3 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)]">
              {lang === "ar" ? "موقعنا على الخريطة" : "Our Location"}
            </h3>
          </div>
          <div className="border border-[var(--color-border)] overflow-hidden">
            <MapView
              className="w-full h-[350px] md:h-[450px]"
              initialCenter={{ lat: 26.3260, lng: 43.9750 }}
              initialZoom={15}
              onMapReady={(map) => {
                new google.maps.marker.AdvancedMarkerElement({
                  map,
                  position: { lat: 26.3260, lng: 43.9750 },
                  title: lang === "ar" ? "شركة عبدالرحمن رضوان المشيقح للمحاماة" : "Abdulrahman Redwan Al-Mushaiqi Law Firm",
                });
              }}
            />
          </div>
          <p className="font-body text-xs text-[var(--color-navy)]/50 mt-3">
            {lang === "ar" ? "طريق الملك عبدالله، حي الأفق، بريدة 52387، الدور الثاني، مكتب رقم 1" : "King Abdullah Road, Al-Ufuq District, Buraydah 52387, 2nd Floor, Office 1"}
          </p>
        </div>
      </section>
    </>
  );
}
