import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  // 構造化データ（JSON-LD）を生成
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": window.location.origin + item.href })
    }))
  };

  return (
    <>
      {/* 構造化データ */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* パンくずリスト */}
      <nav aria-label="パンくずリスト" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center min-w-0">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 mx-1 sm:mx-2 flex-shrink-0" />
              )}
              
              {item.current ? (
                <span className="text-purple-800 font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-none" aria-current="page" title={item.label}>
                  {index === 0 && <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline flex-shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : (
                <Link
                  to={item.href || '/'}
                  className="text-purple-600 hover:text-pink-600 transition-colors flex items-center min-w-0 max-w-[120px] sm:max-w-[200px] md:max-w-none"
                  title={item.label}
                  onClick={() => {
                    // デバッグ用ログ
                    console.log('Breadcrumb link clicked:', item.href);
                  }}
                >
                  {index === 0 && <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb; 