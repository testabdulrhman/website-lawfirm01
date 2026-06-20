// ============================================================
// SEOHead — يضبط وسوم الـ <head> ديناميكياً عبر useEffect
// (بدل react-helmet) لضمان أن تكون الوسوم هي الأخيرة في الـ head
// وقت التقاط prerender، فتظهر فريدة لكل صفحة بلا تكرار.
// نفس آلية hook/useSEO، مع دعم خصائص المقالات والبيانات المنظّمة.
// ============================================================
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  article?: {
    publishedTime: string;
    author: string;
    section: string;
  };
  structuredData?: object;
}

const BASE_URL = "https://redwan.sa";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string, attr: "name" | "property" = "name") {
  document.querySelectorAll(`meta[${attr}="${name}"]`).forEach((el) => el.remove());
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

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogType = "website",
  ogImage,
  article,
  structuredData,
}: SEOHeadProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    const siteName =
      lang === "ar"
        ? "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
        : "Abdulrahman Redwan Al-Mushaikih Law Firm & Bankruptcy Management";
    const fullTitle = `${title} | ${siteName}`;
    const locale = lang === "ar" ? "ar_SA" : "en_US";

    // Title
    document.title = fullTitle;

    // Basic meta
    setMeta("description", description);
    if (keywords.length > 0) {
      setMeta("keywords", keywords.join(", "));
    }
    if (canonicalUrl) {
      setCanonical(`${BASE_URL}${canonicalUrl}`);
    }

    // Open Graph
    setMeta("og:type", ogType, "property");
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:site_name", siteName, "property");
    setMeta("og:locale", locale, "property");
    if (canonicalUrl) {
      setMeta("og:url", `${BASE_URL}${canonicalUrl}`, "property");
    }
    if (ogImage) {
      setMeta("og:image", ogImage, "property");
    }

    // Twitter
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");
    if (ogImage) {
      setMeta("twitter:image", ogImage, "name");
    }

    // Article specific
    if (article) {
      setMeta("article:published_time", article.publishedTime, "property");
      setMeta("article:author", article.author, "property");
      setMeta("article:section", article.section, "property");
    } else {
      removeMeta("article:published_time", "property");
      removeMeta("article:author", "property");
      removeMeta("article:section", "property");
    }

    // Structured data
    document.querySelectorAll('script[data-seohead-schema]').forEach((el) => el.remove());
    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seohead-schema", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.querySelectorAll('script[data-seohead-schema]').forEach((el) => el.remove());
    };
  }, [
    title,
    description,
    keywords.join(","),
    canonicalUrl,
    ogType,
    ogImage,
    article?.publishedTime,
    article?.author,
    article?.section,
    structuredData,
    lang,
  ]);

  return null;
}
