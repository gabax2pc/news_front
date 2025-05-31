import { useEffect } from 'react';

interface PerformanceMetrics {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Core Web Vitalsの測定
    const measurePerformance = () => {
      const metrics: PerformanceMetrics = {};

      // First Contentful Paint (FCP)
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
      if (fcpEntry) {
        metrics.FCP = fcpEntry.startTime;
      }

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry) {
              metrics.LCP = lastEntry.startTime;
              console.log('📊 LCP:', metrics.LCP, 'ms');
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              metrics.FID = entry.processingStart - entry.startTime;
              console.log('📊 FID:', metrics.FID, 'ms');
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            metrics.CLS = clsValue;
            console.log('📊 CLS:', metrics.CLS);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

        } catch (error) {
          console.warn('Performance Observer not supported:', error);
        }
      }

      // パフォーマンスメトリクスをログ出力
      setTimeout(() => {
        console.log('📊 Performance Metrics:', metrics);
        
        // パフォーマンス評価
        const evaluation = evaluatePerformance(metrics);
        console.log('📈 Performance Evaluation:', evaluation);
        
        // 本番環境では分析サービスに送信
        if (process.env.NODE_ENV === 'production') {
          // sendToAnalytics(metrics);
        }
      }, 3000);
    };

    // ページ読み込み完了後に測定
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return null; // このコンポーネントはUIを持たない
};

// パフォーマンス評価関数
const evaluatePerformance = (metrics: PerformanceMetrics) => {
  const evaluation: Record<string, string> = {};

  if (metrics.FCP) {
    evaluation.FCP = metrics.FCP < 1800 ? '良好' : metrics.FCP < 3000 ? '改善が必要' : '不良';
  }

  if (metrics.LCP) {
    evaluation.LCP = metrics.LCP < 2500 ? '良好' : metrics.LCP < 4000 ? '改善が必要' : '不良';
  }

  if (metrics.FID) {
    evaluation.FID = metrics.FID < 100 ? '良好' : metrics.FID < 300 ? '改善が必要' : '不良';
  }

  if (metrics.CLS) {
    evaluation.CLS = metrics.CLS < 0.1 ? '良好' : metrics.CLS < 0.25 ? '改善が必要' : '不良';
  }

  if (metrics.TTFB) {
    evaluation.TTFB = metrics.TTFB < 800 ? '良好' : metrics.TTFB < 1800 ? '改善が必要' : '不良';
  }

  return evaluation;
};

// リソースヒント最適化
export const addResourceHints = () => {
  const head = document.head;

  // 重要なリソースのプリロード
  const preloadLinks = [
    { href: '/api/v1/news', as: 'fetch', crossorigin: 'anonymous' },
    { href: '/api/v1/news/facets', as: 'fetch', crossorigin: 'anonymous' }
  ];

  preloadLinks.forEach(({ href, as, crossorigin }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (crossorigin) link.crossOrigin = crossorigin;
    head.appendChild(link);
  });

  // 次のページのプリフェッチ
  const prefetchLinks = [
    '/article/1',
    '/article/2',
    '/article/3'
  ];

  prefetchLinks.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    head.appendChild(link);
  });
};

export default PerformanceMonitor; 