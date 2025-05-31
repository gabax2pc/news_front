import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute">
      <SEOHead 
        title="ページが見つかりません"
        description="お探しのページは見つかりませんでした。ふるふわそくほーのホームページに戻って、他の記事をお楽しみください。"
        type="website"
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
              ホームに戻る
            </Link>
            <h1 className="text-2xl font-handwriting font-semibold text-white drop-shadow-lg transform -rotate-1">ふるふわそくほー</h1>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-pink-100 inline-block">
            {/* 404イラスト */}
            <div className="mb-8">
              <div className="text-8xl font-heading font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text mb-4">
                404
              </div>
              <div className="text-4xl mb-4">🔍✨</div>
            </div>

            {/* エラーメッセージ */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-purple-800 mb-4">
                ページが見つかりません
              </h1>
              <p className="text-purple-600 text-lg leading-relaxed max-w-md mx-auto">
                お探しのページは削除されたか、<br />
                URLが間違っている可能性があります。<br />
                <span className="text-pink-600 font-medium">✨ 他の素敵な記事を探してみませんか？ ✨</span>
              </p>
            </div>

            {/* アクションボタン */}
            <div className="space-y-4">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-lg"
              >
                <Home className="h-5 w-5 mr-2" />
                ホームに戻る
              </Link>
              
              <div className="text-purple-500 text-sm">または</div>
              
              <Link
                to="/?q="
                className="inline-flex items-center px-6 py-3 bg-white text-purple-700 border-2 border-purple-200 rounded-2xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Search className="h-4 w-4 mr-2" />
                記事を検索する
              </Link>
            </div>

            {/* 人気記事の提案 */}
            <div className="mt-12 pt-8 border-t border-pink-200">
              <h2 className="text-lg font-heading font-semibold text-purple-800 mb-4">
                🌸 人気の記事カテゴリー
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: 'テクノロジー', value: 'technology' },
                  { label: 'ビジネス', value: 'business' },
                  { label: '科学', value: 'science' },
                  { label: '健康', value: 'health' }
                ].map((category) => (
                  <Link
                    key={category.value}
                    to={`/?category=${category.value}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 text-sm font-medium border border-pink-200"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound; 