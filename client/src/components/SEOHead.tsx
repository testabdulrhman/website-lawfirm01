import { Helmet } from "react-helmet-async";
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

  const siteName = lang === "ar"
    ? "شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس"
    : "Abdulrahman Redwan Al-Mushaikih Law Firm & Bankruptcy Management";
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = "https://redwan.sa";
  const locale = lang === "ar" ? "ar_SA" : "en_US";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {canonicalUrl && <link rel="canonical" href={`${baseUrl}${canonicalUrl}`} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {canonicalUrl && <meta property="og:url" content={`${baseUrl}${canonicalUrl}`} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Article specific */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
        </>
      )}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
