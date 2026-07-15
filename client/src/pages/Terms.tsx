import { Link } from "wouter";
import { useScrollAnimation, getFadeStyle } from "@/hooks/useScrollAnimation";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { localePath } from "@/lib/localePath";

export default function Terms() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.05 });
  const { lang, isRTL } = useTranslation();
  const lp = (p: string) => localePath(p, lang);

  const content = lang === "ar" ? {
    seoTitle: "الشروط والأحكام",
    seoDesc: "الشروط والأحكام لاستخدام موقع شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    seoKeywords: ["الشروط والأحكام", "شروط الاستخدام", "شركة رضوان"],
    home: "الرئيسية",
    pageTitle: "الشروط والأحكام",
    subtitle: "شروط استخدام الموقع الإلكتروني والخدمات المقدمة",
    sections: [
      {
        title: "مقدمة",
        content: "مرحباً بك في الموقع الإلكتروني لشركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.",
      },
      {
        title: "طبيعة المحتوى",
        content: "المعلومات المقدمة على هذا الموقع هي لأغراض تعريفية وتثقيفية فقط، ولا تشكل استشارة قانونية أو رأياً قانونياً. لا ينبغي الاعتماد على محتوى الموقع كبديل عن الاستشارة القانونية المتخصصة.",
        extra: "للحصول على استشارة قانونية تتعلق بوضعك الخاص، يرجى التواصل معنا مباشرة لتحديد موعد استشارة.",
      },
      {
        title: "الخدمات القانونية",
        content: "فيما يخص الخدمات القانونية المقدمة:",
        list: [
          "لا تنشأ علاقة محامي-موكل بمجرد استخدام الموقع أو التواصل عبره.",
          "تنشأ علاقة المحامي-الموكل فقط بعد توقيع اتفاقية توكيل رسمية.",
          "تخضع جميع الخدمات القانونية لنظام المحاماة السعودي ولوائحه التنفيذية.",
          "أتعاب الخدمات القانونية تُحدد بموجب اتفاق مكتوب بين الطرفين.",
        ],
      },
      {
        title: "الملكية الفكرية",
        content: "جميع المحتويات المنشورة على هذا الموقع، بما في ذلك النصوص والمقالات والشعارات والتصاميم، هي ملكية فكرية لشركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس. يُحظر نسخ أو إعادة نشر أي محتوى دون إذن كتابي مسبق.",
      },
      {
        title: "حدود المسؤولية",
        content: "لا تتحمل الشركة أي مسؤولية عن:",
        list: [
          "الأضرار الناتجة عن استخدام المعلومات المنشورة على الموقع دون استشارة قانونية متخصصة.",
          "عدم دقة أو اكتمال المعلومات المنشورة في جميع الأوقات، حيث قد تتغير الأنظمة واللوائح.",
          "محتوى الروابط الخارجية المتوفرة على الموقع والمقدمة لأغراض مرجعية فقط.",
        ],
      },
      {
        title: "نموذج التواصل والمطالبات",
        content: "عند استخدام نماذج التواصل أو تقديم المطالبات عبر الموقع، فإنك تقر بأن المعلومات المقدمة صحيحة ودقيقة. تخضع جميع المعلومات المقدمة لسياسة الخصوصية الخاصة بنا.",
      },
      {
        title: "القانون الحاكم",
        content: "تخضع هذه الشروط والأحكام لأنظمة المملكة العربية السعودية. أي نزاع ينشأ عن استخدام هذا الموقع يخضع لاختصاص المحاكم المختصة في المملكة العربية السعودية.",
      },
      {
        title: "التعديلات",
        content: "تحتفظ الشركة بالحق في تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. يُعد استمرارك في استخدام الموقع بعد أي تعديل بمثابة موافقة على الشروط المعدلة.",
      },
      {
        title: "التواصل",
        content: "لأي استفسارات حول هذه الشروط والأحكام:",
        contact: true,
      },
    ],
    lastUpdated: "آخر تحديث: مايو 2025",
    companyName: "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    email: "البريد الإلكتروني:",
    phone: "الهاتف:",
    address: "العنوان: طريق الملك عبدالله، حي الأفق، بريدة 52387",
  } : {
    seoTitle: "Terms & Conditions",
    seoDesc: "Terms and conditions for using Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration website",
    seoKeywords: ["terms and conditions", "terms of use", "Redwan Law"],
    home: "Home",
    pageTitle: "Terms & Conditions",
    subtitle: "Terms of use for the website and services provided",
    sections: [
      {
        title: "Introduction",
        content: "Welcome to the website of Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration. By using this website, you agree to be bound by these terms and conditions. If you do not agree to any of these terms, please do not use the website.",
      },
      {
        title: "Nature of Content",
        content: "The information provided on this website is for general informational and educational purposes only, and does not constitute legal advice or a legal opinion. You should not rely on the website content as a substitute for specialized legal consultation.",
        extra: "For legal advice related to your specific situation, please contact us directly to schedule a consultation.",
      },
      {
        title: "Legal Services",
        content: "Regarding the legal services provided:",
        list: [
          "An attorney-client relationship is not established merely by using the website or communicating through it.",
          "An attorney-client relationship is only established after signing a formal engagement agreement.",
          "All legal services are subject to the Saudi Advocacy Law and its implementing regulations.",
          "Legal service fees are determined by a written agreement between both parties.",
        ],
      },
      {
        title: "Intellectual Property",
        content: "All content published on this website, including text, articles, logos, and designs, is the intellectual property of Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration. Copying or republishing any content without prior written permission is prohibited.",
      },
      {
        title: "Limitation of Liability",
        content: "The Firm shall not be liable for:",
        list: [
          "Damages resulting from using information published on the website without specialized legal consultation.",
          "Inaccuracy or incompleteness of published information at all times, as laws and regulations may change.",
          "Content of external links available on the website, which are provided for reference purposes only.",
        ],
      },
      {
        title: "Contact Forms & Claims",
        content: "When using contact forms or submitting claims through the website, you confirm that the information provided is true and accurate. All information submitted is subject to our Privacy Policy.",
      },
      {
        title: "Governing Law",
        content: "These terms and conditions are governed by the laws of the Kingdom of Saudi Arabia. Any dispute arising from the use of this website is subject to the jurisdiction of the competent courts in the Kingdom of Saudi Arabia.",
      },
      {
        title: "Amendments",
        content: "The Firm reserves the right to amend these terms and conditions at any time without prior notice. Your continued use of the website after any amendment constitutes acceptance of the amended terms.",
      },
      {
        title: "Contact",
        content: "For any inquiries about these terms and conditions:",
        contact: true,
      },
    ],
    lastUpdated: "Last updated: May 2025",
    companyName: "Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration",
    email: "Email:",
    phone: "Phone:",
    address: "Address: King Abdullah Road, Al-Ufuq District, Buraydah 52387",
  };

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDesc}
        keywords={content.seoKeywords}
        canonicalUrl="/terms"
      />

      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{content.home}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{content.pageTitle}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{content.pageTitle}</h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-[var(--color-cream)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8">
          <div
            ref={contentRef}
            className="max-w-4xl mx-auto bg-white border border-[var(--color-border)] p-6 md:p-10 lg:p-14"
            style={getFadeStyle(contentVisible, "up", 0)}
          >
            <div className="prose-legal space-y-8 font-body text-sm md:text-base text-[var(--color-navy)]/80 leading-relaxed">
              {content.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-[var(--color-navy)] mb-3">{section.title}</h2>
                  <p>{section.content}</p>
                  {section.extra && <p className="mt-3">{section.extra}</p>}
                  {section.list && (
                    <ul className={`list-disc list-inside space-y-2 ${isRTL ? 'mr-4' : 'ml-4'} mt-3`}>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.contact && (
                    <div className="mt-4 p-4 bg-[var(--color-cream)] border border-[var(--color-border)]">
                      <p className="font-heading text-sm font-semibold text-[var(--color-navy)] mb-2">{content.companyName}</p>
                      <p>{content.email} <a href="mailto:info@redwan.sa" className="text-[var(--color-gold)] hover:underline">info@redwan.sa</a></p>
                      <p>{content.phone} <a href="tel:+966505149800" className="text-[var(--color-gold)] hover:underline" dir="ltr">0505149800</a></p>
                      <p>{content.address}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Last Updated */}
              <div className="pt-6 border-t border-[var(--color-border)]">
                <p className="font-body text-xs text-[var(--color-navy)]/40">
                  {content.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
