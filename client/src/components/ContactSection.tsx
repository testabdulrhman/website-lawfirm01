import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="h-[2px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "200ms" }}
            />
            <span className="font-heading text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">
              تواصل معنا
            </span>
            <div
              className="h-[2px] bg-[var(--color-gold)] transition-all duration-700 ease-out"
              style={{ width: headerVisible ? "48px" : "0px", transitionDelay: "200ms" }}
            />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight">
            نحن هنا <span className="text-[var(--color-gold)]">لمساعدتك</span>
          </h2>
          <p className="font-body text-base text-[var(--color-navy)]/60 mt-4 max-w-xl mx-auto">
            تواصل معنا مباشرة ودعنا نساعدك في الوصول إلى الحل القانوني الأمثل.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div
            ref={infoRef}
            className="lg:col-span-2 space-y-8 transition-all duration-700 ease-out"
            style={{
              opacity: infoVisible ? 1 : 0,
              transform: infoVisible ? "translateX(0)" : "translateX(30px)",
            }}
          >
            <div className="relative overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031020868/RdzCt9LFS29ZVcU4VNgpAF/consultation-room-ix3xFaGymHggxZG5BkAghM.webp"
                alt="غرفة الاستشارات"
                className="w-full h-[200px] object-cover mb-8 hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "العنوان",
                  content: (
                    <>
                      طريق الملك عبدالله، حي الأفق
                      <br />بريدة 52387، الدور الثاني، مكتب رقم 1
                    </>
                  ),
                },
                {
                  icon: Phone,
                  title: "الهاتف",
                  content: (
                    <span dir="ltr" className="flex flex-col gap-1">
                      <a href="tel:+966505149800" className="hover:text-[var(--color-gold)] transition-colors">0505149800</a>
                      <a href="tel:+966920032760" className="hover:text-[var(--color-gold)] transition-colors">920032760</a>
                    </span>
                  ),
                },
                {
                  icon: Mail,
                  title: "البريد الإلكتروني",
                  content: "info@redwan.sa",
                },
                {
                  icon: Clock,
                  title: "ساعات العمل",
                  content: "الأحد - الخميس: 8:00 ص - 4:00 م",
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 transition-all duration-500 ease-out"
                  style={{
                    opacity: infoVisible ? 1 : 0,
                    transform: infoVisible ? "translateX(0)" : "translateX(20px)",
                    transitionDelay: `${300 + idx * 100}ms`,
                  }}
                >
                  <div className="w-10 h-10 bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-1">{item.title}</h4>
                    <p className="font-body text-sm text-[var(--color-navy)]/60">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className="lg:col-span-3 transition-all duration-700 ease-out"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateX(0)" : "translateX(-30px)",
              transitionDelay: "200ms",
            }}
          >
            <form onSubmit={handleSubmit} className="p-8 lg:p-10 bg-[var(--color-cream)] border border-[var(--color-border)]">
              <h3 className="font-heading text-lg font-semibold text-[var(--color-navy)] mb-6">
                أرسل استفسارك
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-body text-sm text-[var(--color-navy)]/70 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-[var(--color-navy)]/70 mb-2">رقم الجوال</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-body text-sm text-[var(--color-navy)]/70 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-[var(--color-navy)]/70 mb-2">نوع الخدمة</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all"
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="civil">القضايا المدنية والتجارية</option>
                    <option value="labor">قضايا العمل والعمال</option>
                    <option value="criminal">القضايا الجنائية</option>
                    <option value="personal">الأحوال الشخصية</option>
                    <option value="realestate">النزاعات العقارية</option>
                    <option value="bankruptcy">الإفلاس والتصفية</option>
                    <option value="arbitration">التحكيم</option>
                    <option value="consultation">الاستشارات القانونية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-body text-sm text-[var(--color-navy)]/70 mb-2">تفاصيل الاستفسار</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[var(--color-border)] font-body text-sm text-[var(--color-navy)] focus:border-[var(--color-gold)] focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.65_0.1_70/0.1)] transition-all resize-none"
                  placeholder="اكتب تفاصيل استفسارك هنا..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-navy)] text-[var(--color-cream)] font-heading font-semibold text-base hover:bg-[var(--color-navy-light)] hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
              >
                <Send size={16} />
                <span>إرسال الاستفسار</span>
              </button>

              <p className="font-body text-xs text-[var(--color-navy)]/40 mt-4 text-center">
                سنتواصل معك خلال 24 ساعة عمل. جميع المعلومات سرية ومحمية.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
