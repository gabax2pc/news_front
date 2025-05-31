import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NewsArticle } from '../types/api';
import { extractPlainText } from '../utils/markdownUtils';

interface SEOHeadProps {
  article?: NewsArticle;
  title?: string;
  description?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  article,
  title,
  description,
  keywords = [],
  type = 'website',
  image,
  url
}) => {
  // 記事がある場合は記事情報を使用
  const seoTitle = article 
    ? `${article.title} | ふるふわそくほー`
    : title 
    ? `${title} | ふるふわそくほー`
    : 'ふるふわそくほー - かわいいニュースサイト';

  const seoDescription = article
    ? extractPlainText(article.content, 160)
    : description || 'ふるふわそくほーは、テクノロジー、ビジネス、科学などの最新ニュースを可愛いデザインでお届けするニュースサイトです。';

  const seoKeywords = article
    ? [...(article.tags || []), article.category, 'ニュース', 'ふるふわそくほー'].filter(Boolean)
    : [...keywords, 'ニュース', 'ふるふわそくほー'];

  const seoImage = article?.thumbnail_url || image || '/og-image.png';
  const seoUrl = url || window.location.href;

  const structuredData = article ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": seoDescription,
    "image": seoImage,
    "author": {
      "@type": "Person",
      "name": article.author || "ふるふわそくほー編集部"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ふるふわそくほー",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": article.created_at,
    "dateModified": article.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoUrl
    },
    "articleSection": article.category,
    "keywords": article.tags?.join(', ')
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ふるふわそくほー",
    "description": seoDescription,
    "url": seoUrl
  };

  return (
    <Helmet>
      {/* 基本メタタグ */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content="ふるふわそくほー" />
      <meta property="og:locale" content="ja_JP" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* 記事固有のメタタグ */}
      {article && (
        <>
          <meta property="article:published_time" content={article.created_at} />
          <meta property="article:modified_time" content={article.updated_at} />
          <meta property="article:author" content={article.author || "ふるふわそくほー編集部"} />
          <meta property="article:section" content={article.category || ""} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* 構造化データ */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* その他のSEOタグ */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={seoUrl} />
    </Helmet>
  );
};

export default SEOHead; 