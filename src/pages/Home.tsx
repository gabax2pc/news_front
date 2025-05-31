import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Tag } from 'lucide-react';
import { useSearchArticles, useFacets } from '../hooks/useArticles';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { extractPlainText } from '../utils/markdownUtils';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';

// 静的カテゴリー（フォールバック用）
const FALLBACK_CATEGORIES = [
  { value: '', label: 'すべて', count: 0 },
  { value: 'technology', label: 'テクノロジー', count: 0 },
  { value: 'business', label: 'ビジネス', count: 0 },
  { value: 'science', label: '科学', count: 0 },
  { value: 'health', label: '健康', count: 0 },
  { value: 'sports', label: 'スポーツ', count: 0 },
  { value: 'entertainment', label: 'エンターテイメント', count: 0 },
];

const Home: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleTagsCount, setVisibleTagsCount] = useState(10);
  const itemsPerPage = 12;

  // URLパラメータからカテゴリー、タグ、検索クエリを読み取る
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const tagParam = searchParams.get('tag');
    const queryParam = searchParams.get('q');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (tagParam) {
      setSelectedTags([tagParam]);
    }
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

  const searchParams = {
    q: searchQuery || undefined,
    category: selectedCategory || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    published: true, // 公開記事のみ表示
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  };

  // ファセットパラメータ（検索クエリも含める）
  const facetParams = {
    q: searchQuery || undefined,
    category: selectedCategory || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    published: true,
  };

  const { data, isLoading, error } = useSearchArticles(searchParams);
  const { data: facetsData } = useFacets(facetParams);
  
  // 全体の記事数を取得するためのファセットデータ（フィルター条件なし）
  const { data: totalFacetsData } = useFacets({ published: true });

  // 動的カテゴリーリストの生成
  const categories = React.useMemo(() => {
    const dynamicCategories = [{ 
      value: '', 
      label: 'すべて',
      count: totalFacetsData?.total_articles || 0 // 全体の記事数を使用
    }];
    
    // 全体のファセットデータ（フィルター条件なし）からカテゴリを取得
    if (totalFacetsData?.categories) {
      totalFacetsData.categories.forEach((facet) => {
        dynamicCategories.push({
          value: facet.value,
          label: facet.value,
          count: facet.count, // 各カテゴリの本来の記事数を使用
        });
      });
    } else {
      // ファセットデータがない場合はフォールバック
      return FALLBACK_CATEGORIES.map(cat => ({ 
        ...cat, 
        count: cat.value === '' ? (totalFacetsData?.total_articles || 0) : 0 
      }));
    }
    
    return dynamicCategories;
  }, [totalFacetsData]); // facetsDataではなくtotalFacetsDataのみに依存

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedTags([]); // カテゴリー変更時にタグをクリア
    setCurrentPage(1);
    setVisibleTagsCount(10); // タグ表示数もリセット
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        // 既に選択されている場合は削除
        return prev.filter(t => t !== tag);
      } else {
        // 選択されていない場合は追加
        return [...prev, tag];
      }
    });
    setCurrentPage(1);
    
    // 画面を一番上にスクロール
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setSearchQuery('');
    setCurrentPage(1);
    setVisibleTagsCount(10); // タグ表示数もリセット
  };

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
          <h2 className="text-2xl font-heading font-bold text-purple-800 mb-4">😢 エラーが発生しました</h2>
          <p className="text-purple-600">記事の読み込みに失敗しました。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute">
      <SEOHead 
        title="ホーム"
        description="ふるふわそくほーは、テクノロジー、ビジネス、科学などの最新ニュースを可愛いデザインでお届けするニュースサイトです。"
        keywords={['ニュース', 'テクノロジー', 'ビジネス', '科学', '可愛い', 'かわいい']}
        type="website"
      />
      
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-primary-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-handwriting font-semibold text-white drop-shadow-lg transform -rotate-1">
                ふるふわそくほー
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* モバイル用：上部レイアウト */}
          <div className="lg:hidden space-y-3">
            {/* 検索バー（モバイル用：一番上） */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-pink-200 p-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="🔍 記事を検索してね..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white/80 backdrop-blur-sm placeholder-pink-400 transition-all duration-300 text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* カテゴリーセクション（モバイル用：コンパクト） */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-pink-200 overflow-hidden">
              <div className="p-3">
                <h2 className="text-xs font-heading font-semibold text-purple-800 mb-2 flex items-center">
                  🌸 カテゴリー
                </h2>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedCategory === category.value
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                          : 'bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 hover:from-pink-100 hover:to-purple-100 border border-pink-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{category.label}</span>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${
                          selectedCategory === category.value
                            ? 'bg-white/20 text-pink-100'
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 選択されたタグの表示（モバイル用：コンパクト） */}
            {selectedTags.length > 0 && (
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-2.5 border border-pink-200">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-purple-800">
                    🏷️
                  </span>
                  {selectedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-sm"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <span className="ml-1 text-pink-200">×</span>
                    </button>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-purple-700 hover:text-pink-600 underline"
                  >
                    クリア
                  </button>
                </div>
              </div>
            )}

            {/* 現在のフィルター状態表示（モバイル用：最小限） */}
            <div className="text-center py-2">
              <h1 className="text-lg md:text-xl font-heading font-bold text-purple-800">
                {selectedCategory ? 
                  categories.find(cat => cat.value === selectedCategory)?.label : 
                  '新着記事'
                }
              </h1>
              {data && (
                <p className="text-xs text-purple-600 font-medium">
                  {data.total}件 ✨
                </p>
              )}
            </div>
          </div>

          {/* デスクトップ用：左側サイドバー */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* カテゴリーセクション */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-6">
                <h2 className="text-lg font-heading font-semibold text-purple-800 mb-4 flex items-center">
                  🌸 カテゴリー
                </h2>
                
                {/* デスクトップ用：縦メニュー */}
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.value
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                          : 'text-purple-700 hover:bg-pink-100 border border-transparent hover:border-pink-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span>{category.label}</span>
                        </div>
                        <span className={`text-xs ${
                          selectedCategory === category.value
                            ? 'text-pink-100'
                            : 'text-purple-500'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* タグセクション */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-6">
                <h2 className="text-lg font-heading font-semibold text-purple-800 mb-4 flex items-center">
                  🏷️ タグから探す
                </h2>
                
                {facetsData?.tags && facetsData.tags.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {facetsData.tags.slice(0, visibleTagsCount).map((tag) => (
                        <button
                          key={tag.value}
                          onClick={() => handleTagClick(tag.value)}
                          className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                            selectedTags.includes(tag.value)
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                              : 'bg-white/70 text-purple-700 hover:bg-pink-100 border border-pink-200'
                          }`}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          <span>{tag.value}</span>
                          <span className={`ml-2 text-xs ${
                            selectedTags.includes(tag.value)
                              ? 'text-pink-100'
                              : 'text-purple-500'
                          }`}>
                            ({tag.count})
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {/* もっと探す / 表示を減らす ボタン */}
                    {facetsData.tags.length > 10 && (
                      <div className="text-center pt-2 border-t border-pink-200">
                        {visibleTagsCount < facetsData.tags.length ? (
                          <button
                            onClick={() => setVisibleTagsCount(prev => Math.min(prev + 10, facetsData.tags.length))}
                            className="inline-flex items-center px-4 py-2 text-sm text-purple-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-medium"
                          >
                            🔍 もっと探す ({facetsData.tags.length - visibleTagsCount}個)
                          </button>
                        ) : (
                          <button
                            onClick={() => setVisibleTagsCount(10)}
                            className="inline-flex items-center px-4 py-2 text-sm text-purple-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-medium"
                          >
                            ⬆️ 表示を減らす
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-purple-600">
                      💫 タグが見つかりませんでした
                    </p>
                  </div>
                )}
                
                {/* 選択中のタグがある場合のクリアボタン */}
                {selectedTags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-pink-200">
                    <button
                      onClick={() => {
                        setSelectedTags([]);
                        setVisibleTagsCount(10); // タグ表示数もリセット
                      }}
                      className="w-full px-3 py-2 text-sm text-purple-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300"
                    >
                      🗑️ タグをクリア
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* メインコンテンツエリア */}
          <main className="flex-1 min-w-0">
            {/* デスクトップ用：検索バーと現在のカテゴリー表示 */}
            <div className="hidden lg:block mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-purple-800">
                    {selectedCategory ? 
                      categories.find(cat => cat.value === selectedCategory)?.label : 
                      '全ての記事'
                    }
                  </h1>
                  {data && (
                    <p className="text-sm text-purple-600 mt-1 font-medium">
                      {data.total}件の記事が見つかりました ✨
                    </p>
                  )}
                </div>
                <form onSubmit={handleSearch}>
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="🔍 記事を検索してね..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white/80 backdrop-blur-sm placeholder-pink-400 transition-all duration-300"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* デスクトップ用：選択されたタグの表示 */}
            {selectedTags.length > 0 && (
              <div className="hidden lg:block mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-purple-700">🏷️ 選択中のタグ:</span>
                  {selectedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-sm"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <span className="ml-1">×</span>
                    </button>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-purple-600 hover:text-pink-600 underline ml-2"
                  >
                    すべてクリア
                  </button>
                </div>
              </div>
            )}

            {/* 記事一覧 */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse" data-testid="loading-skeleton">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : data?.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 inline-block">
                  <h3 className="text-lg font-heading font-medium text-purple-800 mb-2">🔍 記事が見つかりませんでした</h3>
                  <p className="text-purple-600">検索条件を変更してお試しください ✨</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {data?.items.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group flex flex-col"
                    >
                      {/* 記事画像 */}
                      <div className="h-48 rounded-t-2xl overflow-hidden">
                        {article.thumbnail_url ? (
                          <LazyImage
                            src={article.thumbnail_url}
                            alt={article.thumbnail_alt || article.title}
                            className="h-48"
                            loading="lazy"
                            onError={() => {
                              // エラー時の処理は LazyImage 内で自動処理
                            }}
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="text-white text-center">
                              <h3 className="text-lg md:text-xl font-bold mb-2 px-4 line-clamp-2">
                                {article.title}
                              </h3>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-xl md:text-2xl font-heading font-semibold text-purple-800 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                        
                        <p className="text-purple-600 mb-4 line-clamp-3 text-sm md:text-base leading-relaxed">
                          {extractPlainText(article.content, 120)}
                        </p>
                        
                        {/* タグ */}
                        {article.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag, index) => {
                              const isSelected = selectedTags.includes(tag);
                              
                              return (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleTagClick(tag);
                                  }}
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 border ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg border-pink-500'
                                      : 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-pink-200 hover:from-pink-200 hover:to-purple-200'
                                  }`}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </button>
                              );
                            })}
                            {article.tags.length > 3 && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border border-pink-200">
                                +{article.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* 日付（一番下に固定） */}
                        <div className="flex items-center text-sm md:text-base text-purple-500 mt-auto">
                          <span>
                            📅 {format(new Date(article.created_at), 'MM月dd日', { locale: ja })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* ページネーション */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-purple-600 hover:text-pink-600 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        ← 前へ
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                currentPage === page
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                  : 'text-purple-600 hover:text-pink-600 hover:bg-pink-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 3 ||
                          page === currentPage + 3
                        ) {
                          return (
                            <span key={page} className="px-3 py-2 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-purple-600 hover:text-pink-600 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        次へ →
                      </button>
                    </nav>
                  </div>
                )}

                {/* モバイル用：タグセクション（記事一覧の後） */}
                <div className="lg:hidden mt-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-pink-100 p-4">
                    <h2 className="text-sm font-heading font-semibold text-purple-800 mb-3 flex items-center">
                      🏷️ タグから探す
                    </h2>
                    
                    {facetsData?.tags && facetsData.tags.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {facetsData.tags.slice(0, visibleTagsCount).map((tag) => (
                            <button
                              key={tag.value}
                              onClick={() => handleTagClick(tag.value)}
                              className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                selectedTags.includes(tag.value)
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                                  : 'bg-white/70 text-purple-700 hover:bg-pink-100 border border-pink-200'
                              }`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              <span>{tag.value}</span>
                              <span className={`ml-1 text-xs ${
                                selectedTags.includes(tag.value)
                                  ? 'text-pink-100'
                                  : 'text-purple-500'
                              }`}>
                                ({tag.count})
                              </span>
                            </button>
                          ))}
                        </div>
                        
                        {/* もっと探す / 表示を減らす ボタン（モバイル用） */}
                        {facetsData.tags.length > 10 && (
                          <div className="text-center pt-2 border-t border-pink-200">
                            {visibleTagsCount < facetsData.tags.length ? (
                              <button
                                onClick={() => setVisibleTagsCount(prev => Math.min(prev + 10, facetsData.tags.length))}
                                className="inline-flex items-center px-3 py-1.5 text-xs text-purple-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-medium"
                              >
                                🔍 もっと探す ({facetsData.tags.length - visibleTagsCount}個)
                              </button>
                            ) : (
                              <button
                                onClick={() => setVisibleTagsCount(10)}
                                className="inline-flex items-center px-3 py-1.5 text-xs text-purple-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-medium"
                              >
                                ⬆️ 表示を減らす
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-3">
                        <p className="text-xs text-purple-600">
                          💫 タグが見つかりませんでした
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home; 