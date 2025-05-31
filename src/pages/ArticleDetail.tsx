import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tag, ArrowLeft } from 'lucide-react';
import { useArticle } from '../hooks/useArticles';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import MarkdownContent from '../components/MarkdownContent';
import SocialShareButtons from '../components/SocialShareButtons';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import LazyImage from '../components/LazyImage';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleId = parseInt(id || '0', 10);

  const { data: article, isLoading, error } = useArticle(articleId);

  const handleTagClick = (tag: string) => {
    // ホームページに戻ってタグフィルターを適用
    navigate(`/?tag=${encodeURIComponent(tag)}`);
    
    // 少し遅延してからスクロール（ページ遷移後にスクロール）
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl mb-4 w-1/4"></div>
              <div className="h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl mb-6"></div>
              <div className="h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl mb-8 w-3/4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl"></div>
                <div className="h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl"></div>
                <div className="h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl w-5/6"></div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-purple-600 font-medium">✨ 記事を読み込み中... ✨</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
          <h2 className="text-2xl font-heading font-bold text-purple-800 mb-4">😢 記事が見つかりません</h2>
          <p className="text-purple-600 mb-6">
            お探しの記事は削除されたか、URLが間違っている可能性があります。
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute">
      <SEOHead 
        article={article}
        type="article"
        url={window.location.href}
      />
      
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-primary-400 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-pink-100 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              記事一覧に戻る
            </Link>
            <h1 className="text-2xl font-handwriting font-semibold text-white drop-shadow-lg transform -rotate-1">ふるふわそくほー</h1>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
          {/* パンくずリスト */}
          <div className="p-6 pb-0">
            <Breadcrumb 
              items={[
                { label: 'ホーム', href: '/' },
                ...(article.category ? [{ 
                  label: article.category === 'technology' ? 'テクノロジー' : 
                         article.category === 'business' ? 'ビジネス' : 
                         article.category === 'science' ? '科学' : 
                         article.category === 'health' ? '健康' : 
                         article.category === 'sports' ? 'スポーツ' : 
                         article.category === 'entertainment' ? 'エンターテイメント' : 
                         article.category, 
                  href: `/?category=${encodeURIComponent(article.category)}` 
                }] : []),
                { label: article.title, current: true }
              ]}
            />
          </div>
          
          {/* 記事ヘッダー画像 */}
          <div className="h-64 md:h-80 overflow-hidden">
            {article.thumbnail_url ? (
              <LazyImage
                src={article.thumbnail_url}
                alt={article.thumbnail_alt || article.title}
                className="h-64 md:h-80"
                loading="eager"
                fallbackSrc="/placeholder-image.jpg"
              />
            ) : (
              <div className="h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center px-8">
                  <h1 className="text-2xl md:text-4xl font-heading font-bold leading-tight">
                    {article.title}
                  </h1>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            {/* 記事タイトル（サムネイルがある場合） */}
            {article.thumbnail_url && (
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-purple-800 mb-6 leading-tight">
                {article.title}
              </h1>
            )}
            
            {/* 記事メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-purple-600 mb-6 pb-6 border-b border-pink-200">
              <div className="flex items-center bg-purple-50 px-3 py-2 rounded-xl">
                <span>
                  📅 {format(new Date(article.created_at), 'yyyy年MM月dd日 HH:mm', { locale: ja })}
                </span>
              </div>
              {article.category && (
                <div className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-xs font-medium border border-pink-200">
                  🏷️ {article.category}
                </div>
              )}
            </div>

            {/* 記事本文 */}
            <div className="mb-8">
              <MarkdownContent content={article.content} />
            </div>

            {/* タグ */}
            {article.tags.length > 0 && (
              <div className="pt-6 border-t border-pink-200 mb-6">
                <h3 className="text-sm font-heading font-medium text-purple-800 mb-3 flex items-center">
                  🏷️ タグ
                </h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 border border-pink-200 shadow-sm"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ソーシャルシェアボタン */}
            <div className="mb-8">
              <SocialShareButtons url={window.location.href} title={article.title} />
            </div>

            {/* 記事情報 */}
            <div className="mt-8 pt-6 border-t border-pink-200 text-xs text-purple-500">
              <div className="flex justify-between items-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                <span className="flex items-center">
                  📅 作成日: {format(new Date(article.created_at), 'yyyy年MM月dd日', { locale: ja })}
                </span>
                {article.updated_at !== article.created_at && (
                  <span className="flex items-center">
                    🔄 更新日: {format(new Date(article.updated_at), 'yyyy年MM月dd日', { locale: ja })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            記事一覧に戻る
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetail; 