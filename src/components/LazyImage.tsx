import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  onError,
  loading = 'lazy'
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    if (onError) {
      onError();
    }
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* プレースホルダー */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse flex items-center justify-center">
          <div className="text-purple-400 text-sm">📸 読み込み中...</div>
        </div>
      )}
      
      {/* 実際の画像 */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={loading}
          // SEO最適化のための属性
          decoding="async"
          fetchPriority={loading === 'eager' ? 'high' : 'low'}
        />
      )}
      
      {/* エラー時のフォールバック */}
      {imageError && !fallbackSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
          <div className="text-white text-center px-4">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">画像を読み込めませんでした</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 