import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  schema?: object | object[];
  fullTitle?: boolean;
}

const SITE_NAME_AR = "المشيقح للمحاماة";
const SITE_NAME_EN = "Redwan Law Firm";
const SITE_NAME_UR = "المشیقح لا فرم";
const SITE_NAME = "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس";
const BASE_URL = "https://redwan.sa";

export function useSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonical,
  noindex = false,
  schema,
  fullTitle = false,
}: SEOProps) {
  const [location] = useLocation();
  // Auto-detect language from current path for canonical
  const isEnglishPage = location === "/en" || location.startsWith("/en/");
  const isUrduPage = location === "/ur" || location.startsWith("/ur/");
  const effectiveCanonical = canonical
    ? (
        isEnglishPage && !canonical.startsWith("/en")
          ? (canonical === "/" ? "/en" : `/en${canonical}`)
          : isUrduPage && !canonical.startsWith("/ur")
            ? (canonical === "/" ? "/ur" : `/ur${canonical}`)
            : canonical
      )
    : undefined;
  const siteName = isEnglishPage ? SITE_NAME_EN : isUrduPage ? SITE_NAME_UR : SITE_NAME_AR;
  const formattedTitle =
    fullTitle || title.includes("|") ? title : `${title} | ${siteName}`;

  useEffect(() => {
    // Title
    document.title = formattedTitle;

    // Meta description
    setMeta("description", description);

    // Meta keywords removed - not used by modern search engines
    // Clean up any existing keywords meta tag
    const existingKeywords = document.querySelector('meta[name="keywords"]');
    if (existingKeywords) existingKeywords.remove();

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow");
    }

    // Open Graph
    setMeta("og:title", formattedTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:site_name", siteName, "property");
    if (ogImage) {
      setMeta("og:image", ogImage, "property");
    }
    if (effectiveCanonical) {
      setMeta("og:url", `${BASE_URL}${effectiveCanonical}`, "property");
      setCanonical(`${BASE_URL}${effectiveCanonical}`);
    } else {
      // Remove canonical link when not provided (e.g., 404 pages)
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) existingCanonical.remove();
      // Remove og:url when no canonical
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.remove();
    }

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    if (ogImage) {
      setMeta("twitter:image", ogImage, "name");
    }

    // Hreflang alternate links
    setHreflang(effectiveCanonical, noindex);

    // Schema markup — preserve site-wide @graph (data-site-schema), replace page-specific only
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      // Remove all page-level schema scripts (keep data-site-schema intact)
      document.querySelectorAll('script[type="application/ld+json"]:not([data-site-schema])').forEach(el => el.remove());
      
      schemas.forEach((s, i) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-page-schema", `schema-${i}`);
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup page schema scripts on unmount (keep site-wide)
      document.querySelectorAll('script[data-page-schema]').forEach(el => el.remove());
    };
  }, [title, description, keywords, ogImage, ogType, effectiveCanonical, noindex, schema, formattedTitle, siteName, location]);
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Injects hreflang <link> tags for Arabic/English alternate pages.
 * Arabic path: /about → English: /en/about
 */
function setHreflang(canonical?: string, noindex = false) {
  // Remove ALL existing hreflang links (both prerender-injected and client-injected)
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  if (!canonical || noindex) return;

  const BASE = "https://redwan.sa";
  const arPath = canonical
    .replace(/^\/en(?=\/|$)/, "")
    .replace(/^\/ur(?=\/|$)/, "") || "/";
  const enPath = arPath === "/" ? "/en" : `/en${arPath}`;

  const arabicOnly =
    arPath === "/careers" ||
    arPath === "/cases-guide" ||
    arPath === "/legal-dictionary" ||
    arPath === "/bankruptcy/claims" ||
    arPath.startsWith("/bankruptcy/reports") ||
    arPath.startsWith("/blog/") ||
    arPath.startsWith("/bankruptcy/procedures/");

  const pairs: [string, string][] = [["ar", `${BASE}${arPath}`]];
  if (!arabicOnly) pairs.push(["en", `${BASE}${enPath}`]);
  if (arPath === "/premium-residency") {
    pairs.push(["ur", `${BASE}/ur/premium-residency`]);
  }
  pairs.push(["x-default", `${BASE}${arPath}`]);

  pairs.forEach(([hreflang, href]) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.setAttribute("hreflang", hreflang);
    link.href = href;
    link.setAttribute("data-hreflang", "true");
    document.head.appendChild(link);
  });
}

// Pre-built schemas
export const schemas = {
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    "alternateName": "Abdulrahman Redwan Al-Mushaiqi Law Firm",
    "url": "https://redwan.sa",
    "logo": `${BASE_URL}/images/logo-dark.webp`,
    "image": `${BASE_URL}/images/hero-law-firm.webp`,
    "description": "شركة محاماة سعودية متخصصة في القضايا التجارية والجنائية والعقارية وإدارة إجراءات الإفلاس، مقرها بريدة بخبرة تتجاوز 20 عاماً.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق الملك عبدالله، حي الأفق، الدور الثاني، مكتب رقم 1",
      "addressLocality": "بريدة",
      "addressRegion": "القصيم",
      "postalCode": "52387",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.3260,
      "longitude": 43.9750
    },
    "telephone": "+966505149800",
    "email": "info@redwan.sa",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "16:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "sameAs": [
      "https://x.com/redwan_law",
      "https://www.linkedin.com/company/redwan-sa",
      "https://snapchat.com/@redwan.sa"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "الخدمات القانونية",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "القضايا المدنية والتجارية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "القضايا الجنائية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "النزاعات العقارية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الإفلاس والتصفية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الاستشارات القانونية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التحكيم التجاري" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التوثيق والعقود" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "قضايا العمل والعمال" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "القضايا الإدارية" } }
      ]
    }
  },

  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    "url": "https://redwan.sa",
    "logo": `${BASE_URL}/images/logo-dark.webp`,
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "عبدالرحمن بن رضوان المشيقح"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966505149800",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    }
  },

  breadcrumb: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  }),

  attorney: {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    "alternateName": "Abdulrahman Redwan Al-Mushaiqi Law Firm & Bankruptcy Management",
    "url": "https://redwan.sa",
    "logo": `${BASE_URL}/images/logo-dark.webp`,
    "image": `${BASE_URL}/images/hero-law-firm.webp`,
    "description": "شركة محاماة سعودية مرخصة برقم 26/129 متخصصة في إدارة إجراءات الإفلاس والقضايا التجارية والجنائية والعقارية، مقرها بريدة وتخدم جميع مناطق المملكة.",
    "legalName": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    "knowsAbout": [
      "إدارة إجراءات الإفلاس",
      "التسوية الوقائية",
      "إعادة التنظيم المالي",
      "التصفية",
      "القضايا التجارية",
      "القضايا الجنائية",
      "النزاعات العقارية",
      "التحكيم التجاري",
      "قضايا العمل والعمال",
      "الاستشارات القانونية"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق الملك عبدالله، حي الأفق، الدور الثاني، مكتب رقم 1",
      "addressLocality": "بريدة",
      "addressRegion": "القصيم",
      "postalCode": "52387",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.3260,
      "longitude": 43.9750
    },
    "telephone": "+966505149800",
    "email": "info@redwan.sa",
    "founder": {
      "@type": "Person",
      "name": "عبدالرحمن بن رضوان المشيقح",
      "jobTitle": "محامي وأمين إفلاس"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "16:00"
    },
    "priceRange": "$$",
    "currenciesAccepted": "SAR",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": [
      { "@type": "City", "name": "بريدة" },
      { "@type": "City", "name": "الرياض" },
      { "@type": "City", "name": "جدة" },
      { "@type": "City", "name": "الدمام" },
      { "@type": "City", "name": "حائل" }
    ],
    "sameAs": [
      "https://x.com/redwan_law",
      "https://www.linkedin.com/company/redwan-sa",
      "https://snapchat.com/@redwan.sa"
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "ترخيص محاماة",
      "recognizedBy": {
        "@type": "GovernmentOrganization",
        "name": "وزارة العدل - المملكة العربية السعودية"
      },
      "identifier": "26/129"
    },
    "slogan": "معك خطوة بخطوة نحو الحل القانوني الأمثل"
  },

  faqPage: (questions: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "ar",
    "dateModified": new Date().toISOString().split("T")[0],
    "url": `${BASE_URL}/faq`,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": BASE_URL
    },
    "publisher": {
      "@type": "LegalService",
      "name": SITE_NAME,
      "url": BASE_URL
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".faq-question", ".faq-answer"]
    },
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
        "inLanguage": "ar"
      }
    }))
  }),

  // مخطط FAQ مرن لأي صفحة (يستقبل الرابط الأساسي للصفحة) — مناسب لـ AEO
  faqPageForUrl: (questions: { question: string; answer: string }[], pageUrl: string) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "ar",
    "dateModified": new Date().toISOString().split("T")[0],
    "url": `${BASE_URL}${pageUrl}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": BASE_URL
    },
    "publisher": {
      "@type": "LegalService",
      "name": SITE_NAME,
      "url": BASE_URL
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".faq-question", ".faq-answer"]
    },
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
        "inLanguage": "ar"
      }
    }))
  }),

  // مخطط HowTo لخطوات الإجراء — مرشّح قوي لظهور AI Overviews
  howTo: (name: string, description: string, steps: { title: string; desc: string }[], pageUrl: string) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "inLanguage": "ar",
    "name": name,
    "description": description,
    "url": `${BASE_URL}${pageUrl}`,
    "step": steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.desc
    }))
  }),

  personAttorney: (name: string, role: string, description?: string) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": role,
    "description": description || "",
    "worksFor": {
      "@type": "LegalService",
      "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
    }
  }),

  bankruptcyService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "إدارة إجراءات الإفلاس",
    "alternateName": "Bankruptcy Management Services",
    "description": "خدمات إدارة إجراءات الإفلاس المتكاملة: التسوية الوقائية، إعادة التنظيم المالي، التصفية، وتمثيل الدائنين والمدينين. أمين إفلاس معتمد بترخيص 142147 من لجنة الإفلاس.",
    "provider": {
      "@type": "LegalService",
      "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
      "url": "https://redwan.sa"
    },
    "serviceType": "إدارة إجراءات الإفلاس",
    "areaServed": {
      "@type": "Country",
      "name": "المملكة العربية السعودية"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات الإفلاس",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التسوية الوقائية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "إعادة التنظيم المالي" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التصفية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التصفية الإدارية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تمثيل الدائنين" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تمثيل المدينين" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "إعداد خطط السداد" } }
      ]
    }
  }
};
