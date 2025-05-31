import { NewsArticle } from '../types/api';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (articles: NewsArticle[], baseUrl: string = 'https://furufuwa-news.com'): string => {
  const urls: SitemapUrl[] = [
    // ホームページ
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0
    },
    // 固定ページ
    {
      loc: `${baseUrl}/disclaimer`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.3
    }
  ];

  // 記事ページを追加
  articles.forEach(article => {
    if (article.published) {
      urls.push({
        loc: `${baseUrl}/article/${article.id}`,
        lastmod: article.updated_at.split('T')[0],
        changefreq: 'weekly',
        priority: 0.8
      });
    }
  });

  // XMLサイトマップを生成
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

export const generateRobotsTxt = (baseUrl: string = 'https://furufuwa-news.com'): string => {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# 検索エンジンに優しい設定
Crawl-delay: 1

# 不要なページをブロック
Disallow: /api/
Disallow: /*.json$
Disallow: /*?*
`;
}; 