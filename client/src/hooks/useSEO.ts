import { useEffect } from "react";

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
  useEffect(() => {
    // Title
    document.title = fullTitle ? title : `${title} | ${SITE_NAME}`;

    // Meta description
    setMeta("description", description);

    // Meta keywords
    if (keywords) {
      setMeta("keywords", keywords);
    }

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow");
    }

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    if (ogImage) {
      setMeta("og:image", ogImage, "property");
    }
    if (canonical) {
      setMeta("og:url", `${BASE_URL}${canonical}`, "property");
      setCanonical(`${BASE_URL}${canonical}`);
    }

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    if (ogImage) {
      setMeta("twitter:image", ogImage, "name");
    }

    // Schema markup
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      // Remove existing schema scripts
      document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
      
      schemas.forEach((s, i) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-schema", `schema-${i}`);
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup schema scripts on unmount
      document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
    };
  }, [title, description, keywords, ogImage, ogType, canonical, noindex, schema, fullTitle]);
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

// Pre-built schemas
export const schemas = {
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
    "alternateName": "Abdulrahman Redwan Al-Mushaiqi Law Firm",
    "url": "https://redwan.sa",
    "logo": `${BASE_URL}/manus-storage/logo-dark-new_3800bcd5_08b1a48d.webp`,
    "image": `${BASE_URL}/manus-storage/hero-law-firm-new_fff82498_f3461932.webp`,
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
      "https://www.linkedin.com/company/redwan-sa"
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
    "logo": `${BASE_URL}/manus-storage/logo-dark-new_3800bcd5_08b1a48d.webp`,
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

  attorney: (name: string, role: string, description?: string) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": role,
    "description": description || "",
    "worksFor": {
      "@type": "LegalService",
      "name": "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
    }
  })
};
