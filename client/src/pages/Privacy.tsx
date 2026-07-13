import { Link } from "wouter";
import { useScrollAnimation, getFadeStyle } from "@/hooks/useScrollAnimation";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";

export default function Privacy() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.05 });
  const { lang, isRTL } = useTranslation();

  const content = lang === "ar" ? {
    seoTitle: "سياسة الخصوصية",
    seoDesc: "سياسة الخصوصية وحماية البيانات الشخصية لشركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    seoKeywords: ["سياسة الخصوصية", "حماية البيانات", "شركة رضوان"],
    home: "الرئيسية",
    pageTitle: "سياسة الخصوصية",
    subtitle: "التزامنا بحماية خصوصيتك وبياناتك الشخصية",
    sections: [
      {
        title: "مقدمة",
        content: `تلتزم شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس ("الشركة") بحماية خصوصية مستخدمي موقعها الإلكتروني وعملائها. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها لنا.`,
        extra: "باستخدامك لموقعنا الإلكتروني أو خدماتنا، فإنك توافق على الممارسات الموضحة في هذه السياسة. نحتفظ بالحق في تحديث هذه السياسة من وقت لآخر.",
      },
      {
        title: "المعلومات التي نجمعها",
        content: "قد نجمع الأنواع التالية من المعلومات:",
        list: [
          "المعلومات الشخصية: الاسم، رقم الهاتف، البريد الإلكتروني عند تعبئة نموذج التواصل أو طلب استشارة.",
          "معلومات القضية: التفاصيل التي تقدمها بخصوص قضيتك أو استفسارك القانوني.",
          "معلومات تقنية: عنوان IP، نوع المتصفح، الصفحات المزارة، لأغراض تحسين تجربة المستخدم.",
          "ملفات تعريف الارتباط (Cookies): لتحسين أداء الموقع وتجربة التصفح.",
        ],
      },
      {
        title: "كيف نستخدم معلوماتك",
        content: "نستخدم المعلومات المجمعة للأغراض التالية:",
        list: [
          "التواصل معك بشأن استفساراتك أو طلبات الاستشارة.",
          "تقديم الخدمات القانونية المطلوبة.",
          "تحسين موقعنا الإلكتروني وخدماتنا.",
          "الامتثال للمتطلبات القانونية والتنظيمية.",
          "إرسال تحديثات قانونية ذات صلة (بموافقتك المسبقة).",
        ],
      },
      {
        title: "حماية المعلومات",
        content: "نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. تشمل هذه الإجراءات:",
        list: [
          "تشفير البيانات المنقولة عبر بروتوكول SSL/TLS.",
          "تقييد الوصول إلى المعلومات الشخصية على الموظفين المصرح لهم فقط.",
          "الالتزام بالسرية المهنية وفقاً لنظام المحاماة السعودي.",
          "المراجعة الدورية لإجراءات الأمان والخصوصية.",
        ],
      },
      {
        title: "السرية المهنية",
        content: "بالإضافة إلى سياسة الخصوصية هذه، تلتزم الشركة بالسرية المهنية المنصوص عليها في نظام المحاماة السعودي. جميع المعلومات المتعلقة بقضايا العملاء تخضع لحماية السرية المهنية المطلقة، ولا يتم الإفصاح عنها إلا بموافقة العميل أو بأمر قضائي.",
      },
      {
        title: "التحليلات وقياس الأداء (Google Analytics)",
        content: "نستخدم خدمة Google Analytics لتحليل حركة الزوار على الموقع وفهم كيفية استخدامه. تجمع هذه الخدمة بيانات مجهولة الهوية تشمل:",
        list: [
          "الصفحات المزارة ومدة الزيارة.",
          "نوع الجهاز والمتصفح ونظام التشغيل.",
          "الموقع الجغرافي التقريبي (على مستوى المدينة).",
          "مصدر الزيارة (محرك بحث، رابط مباشر، إعلان).",
        ],
        extra: "تُعالج هذه البيانات بواسطة Google وفقاً لسياسة الخصوصية الخاصة بها. يمكنك منع جمع هذه البيانات عبر تثبيت إضافة Google Analytics Opt-out Browser Add-on.",
      },
      {
        title: "جمع البيانات المقدَّمة من المستخدم ومشاركتها مع Google",
        content: "لتحسين قياس الإحالات الناجحة واستهداف الإعلانات، قد نشارك بيانات مجزّأة ومشفّرة مع Google. تشمل هذه البيانات:",
        list: [
          "عنوان البريد الإلكتروني (بصيغة مشفّرة/مجزّأة).",
          "رقم الهاتف (بصيغة مشفّرة/مجزّأة).",
        ],
        extra: "تتم هذه المشاركة وفق معايير الخصوصية المعتمدة من Google، ولا يمكن استخدام هذه البيانات لتحديد هويتك بشكل مباشر. الغرض من ذلك هو تحسين دقة قياس أداء الحملات الإعلانية وتقديم محتوى أكثر صلة. يحق لك رفض هذه المشاركة عبر التواصل معنا.",
      },
      {
        title: "ملفات تعريف الارتباط (Cookies)",
        content: "يستخدم موقعنا ملفات تعريف الارتباط للأغراض التالية:",
        list: [
          "ملفات ضرورية: لضمان عمل الموقع بشكل صحيح.",
          "ملفات تحليلية (Google Analytics): لفهم كيفية استخدام الزوار للموقع.",
          "ملفات إعلانية (Google Ads): لقياس أداء الإعلانات وتحسين استهدافها.",
        ],
        extra: "يمكنك التحكم في ملفات تعريف الارتباط أو تعطيلها من إعدادات المتصفح الخاص بك. قد يؤثر تعطيل بعض الملفات على تجربة استخدامك للموقع.",
      },
      {
        title: "مشاركة المعلومات مع أطراف ثالثة",
        content: "لا نبيع أو نؤجر معلوماتك الشخصية لأي طرف ثالث. قد نشارك المعلومات فقط في الحالات التالية:",
        list: [
          "بموافقتك الصريحة.",
          "للامتثال لأمر قضائي أو متطلب قانوني.",
          "مع مقدمي خدمات موثوقين يساعدوننا في تشغيل موقعنا (مع التزامهم بالسرية).",
          "مع Google لأغراض التحليل وقياس أداء الإعلانات (بيانات مجزّأة ومشفّرة فقط).",
        ],
      },
      {
        title: "حقوقك",
        content: "وفقاً لنظام حماية البيانات الشخصية السعودي، يحق لك:",
        list: [
          "الاطلاع على بياناتك الشخصية المحفوظة لدينا.",
          "طلب تصحيح أو تحديث بياناتك.",
          "طلب حذف بياناتك (مع مراعاة الالتزامات القانونية).",
          "الاعتراض على معالجة بياناتك لأغراض تسويقية.",
          "سحب موافقتك في أي وقت.",
        ],
      },
      {
        title: "التواصل معنا",
        content: "لأي استفسارات أو طلبات تتعلق بسياسة الخصوصية أو بياناتك الشخصية، يرجى التواصل معنا عبر:",
        contact: true,
      },
    ],
    lastUpdated: "آخر تحديث: يوليو 2026",
    companyName: "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    email: "البريد الإلكتروني:",
    phone: "الهاتف:",
    address: "العنوان: طريق الملك عبدالله، حي الأفق، بريدة 52387",
  } : {
    seoTitle: "Privacy Policy",
    seoDesc: "Privacy policy and personal data protection for Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration",
    seoKeywords: ["privacy policy", "data protection", "Redwan Law"],
    home: "Home",
    pageTitle: "Privacy Policy",
    subtitle: "Our commitment to protecting your privacy and personal data",
    sections: [
      {
        title: "Introduction",
        content: `Abdulrahman Redwan Al-Mushaiqeh Law Firm & Bankruptcy Administration ("the Firm") is committed to protecting the privacy of its website users and clients. This policy explains how we collect, use, and protect the personal information you provide to us.`,
        extra: "By using our website or services, you agree to the practices described in this policy. We reserve the right to update this policy from time to time.",
      },
      {
        title: "Information We Collect",
        content: "We may collect the following types of information:",
        list: [
          "Personal Information: Name, phone number, email when filling out a contact form or requesting a consultation.",
          "Case Information: Details you provide regarding your case or legal inquiry.",
          "Technical Information: IP address, browser type, pages visited, for the purpose of improving user experience.",
          "Cookies: To improve website performance and browsing experience.",
        ],
      },
      {
        title: "How We Use Your Information",
        content: "We use the collected information for the following purposes:",
        list: [
          "Communicating with you regarding your inquiries or consultation requests.",
          "Providing the requested legal services.",
          "Improving our website and services.",
          "Complying with legal and regulatory requirements.",
          "Sending relevant legal updates (with your prior consent).",
        ],
      },
      {
        title: "Information Protection",
        content: "We take appropriate security measures to protect your personal information from unauthorized access, modification, disclosure, or destruction. These measures include:",
        list: [
          "Encrypting data transmitted via SSL/TLS protocol.",
          "Restricting access to personal information to authorized personnel only.",
          "Adhering to professional confidentiality under Saudi Advocacy Law.",
          "Periodic review of security and privacy procedures.",
        ],
      },
      {
        title: "Professional Confidentiality",
        content: "In addition to this privacy policy, the Firm adheres to professional confidentiality as stipulated in the Saudi Advocacy Law. All information related to client cases is subject to absolute professional confidentiality protection and is not disclosed except with client consent or by court order.",
      },
      {
        title: "Analytics & Performance Measurement (Google Analytics)",
        content: "We use Google Analytics to analyze website traffic and understand how visitors use our site. This service collects anonymized data including:",
        list: [
          "Pages visited and visit duration.",
          "Device type, browser, and operating system.",
          "Approximate geographic location (city level).",
          "Traffic source (search engine, direct link, advertisement).",
        ],
        extra: "This data is processed by Google in accordance with its privacy policy. You can prevent this data collection by installing the Google Analytics Opt-out Browser Add-on.",
      },
      {
        title: "User-Provided Data Collection & Sharing with Google",
        content: "To improve conversion measurement and ad targeting, we may share hashed and encrypted data with Google. This data includes:",
        list: [
          "Email address (in hashed/encrypted format).",
          "Phone number (in hashed/encrypted format).",
        ],
        extra: "This sharing is conducted in accordance with Google's privacy standards and cannot be used to directly identify you. The purpose is to improve the accuracy of advertising campaign performance measurement and deliver more relevant content. You have the right to opt out of this sharing by contacting us.",
      },
      {
        title: "Cookies",
        content: "Our website uses cookies for the following purposes:",
        list: [
          "Essential cookies: To ensure the website functions properly.",
          "Analytics cookies (Google Analytics): To understand how visitors use the site.",
          "Advertising cookies (Google Ads): To measure ad performance and improve targeting.",
        ],
        extra: "You can control or disable cookies through your browser settings. Disabling some cookies may affect your experience using the website.",
      },
      {
        title: "Sharing Information with Third Parties",
        content: "We do not sell or rent your personal information to any third party. We may share information only in the following cases:",
        list: [
          "With your explicit consent.",
          "To comply with a court order or legal requirement.",
          "With trusted service providers who help us operate our website (with their commitment to confidentiality).",
          "With Google for analytics and ad performance measurement purposes (hashed and encrypted data only).",
        ],
      },
      {
        title: "Your Rights",
        content: "Under the Saudi Personal Data Protection Law, you have the right to:",
        list: [
          "Access your personal data stored with us.",
          "Request correction or update of your data.",
          "Request deletion of your data (subject to legal obligations).",
          "Object to processing your data for marketing purposes.",
          "Withdraw your consent at any time.",
        ],
      },
      {
        title: "Contact Us",
        content: "For any inquiries or requests related to the privacy policy or your personal data, please contact us via:",
        contact: true,
      },
    ],
    lastUpdated: "Last updated: July 2026",
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
        canonicalUrl="/privacy"
      />

      {/* Page Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-3 mb-4">
            <Link href="/" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{content.home}</Link>
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
