import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const Disclaimer: React.FC = () => {
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
            { label: '免責事項', current: true }
          ]}
        />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-pink-500 mr-3" />
            <h1 className="text-3xl font-heading font-bold text-purple-800">免責事項</h1>
          </div>

          <div className="prose prose-purple max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">当サイトの情報について</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                当サイト「ふるふわそくほー」で掲載している情報については、可能な限り正確な情報を掲載するよう努めておりますが、
                誤情報が入り込んだり、情報が古くなったりすることもございます。
              </p>
              <p className="text-purple-800 leading-relaxed">
                必ずしも正確性を保証するものではございません。また、予告なしに内容を変更または削除する場合がございます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">免責事項</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                当サイトの情報を利用することによって生じたいかなる損害についても、
                当サイト運営者は一切の責任を負いません。
              </p>
              <p className="text-purple-800 leading-relaxed">
                ご自身の責任と判断で、当サイトの情報をご利用ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-purple-700 mb-4">リンクについて</h2>
              <p className="text-purple-800 leading-relaxed mb-4">
                当サイトからリンクやバナーなどによって他のサイトに移動された場合、
                移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              </p>
              <p className="text-purple-800 leading-relaxed">
                また、リンク先サイトの正確性や合法性、その内容について一切保証いたしません。
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

export default Disclaimer; 