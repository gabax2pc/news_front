import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-primary-400 shadow-lg fixed top-0 left-0 right-0 z-50">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'プライバシーポリシー', current: true }
          ]}
        />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-pink-500 mr-3" />
            <h1 className="text-3xl font-heading font-bold text-purple-800">プライバシーポリシー</h1>
          </div>

          <div className="prose prose-purple max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">個人情報の取り扱いについて</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                当サイト「ふるふわそくほー」（以下、「当サイト」）では、
                個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">収集する情報</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                当サイトでは、以下の情報を収集する場合があります：
              </p>
              <ul className="list-disc list-inside text-purple-800 space-y-2 ml-4">
                <li>お問い合わせフォームに入力された情報（メールアドレス、件名、お問い合わせ内容）</li>
                <li>アクセス解析のための匿名化された情報</li>
                <li>Cookieによる情報</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">情報の利用目的</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                収集した個人情報は、以下の目的で利用いたします：
              </p>
              <ul className="list-disc list-inside text-purple-800 space-y-2 ml-4">
                <li>お問い合わせへの回答</li>
                <li>サイトの改善・運営</li>
                <li>統計データの作成（個人を特定できない形で）</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">情報の第三者提供</h2>
              <p className="text-purple-800 leading-relaxed">
                当サイトでは、法令に基づく場合を除き、
                ご本人の同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">Cookieについて</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                当サイトでは、より良いサービス提供のためにCookieを使用する場合があります。
                Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">アクセス解析ツールについて</h2>
              <p className="text-purple-800 leading-relaxed">
                当サイトでは、サイトの分析と改善のためにアクセス解析ツールを使用する場合があります。
                これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">プライバシーポリシーの変更</h2>
              <p className="text-purple-800 leading-relaxed">
                当サイトでは、プライバシーポリシーを予告なく変更する場合があります。
                変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">お問い合わせ</h2>
              <p className="text-purple-800 leading-relaxed">
                プライバシーポリシーに関するお問い合わせは、
                <Link to="/contact" className="text-pink-600 hover:text-pink-700 underline ml-1">
                  お問い合わせフォーム
                </Link>
                よりご連絡ください。
              </p>
            </section>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mt-8">
              <p className="text-purple-700 text-sm">
                最終更新日: 2024年12月19日
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy; 