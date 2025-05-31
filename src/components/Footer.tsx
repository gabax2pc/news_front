import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-400 via-purple-400 to-primary-400 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイト情報 */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-handwriting font-semibold mb-4 transform -rotate-1">
              ふるふわそくほー
            </h3>
            <p className="text-pink-100 text-sm leading-relaxed">
              可愛らしいニュースをお届けする<br />
              みんなのための情報サイトです ✨
            </p>
          </div>

          {/* リンク */}
          <div className="text-center">
            <h4 className="text-lg font-heading font-semibold mb-4">サイト情報</h4>
            <nav className="space-y-3">
              <Link
                to="/disclaimer"
                className="flex items-center justify-center text-pink-100 hover:text-white transition-colors text-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                免責事項
              </Link>
              <Link
                to="/privacy"
                className="flex items-center justify-center text-pink-100 hover:text-white transition-colors text-sm"
              >
                <Shield className="h-4 w-4 mr-2" />
                プライバシーポリシー
              </Link>
            </nav>
          </div>

          {/* お問合せ情報 */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-heading font-semibold mb-4">お問合せ</h4>
            <div className="space-y-2 text-pink-100 text-sm">
              <p>ご質問やご要望がございましたら</p>
              <p>お気軽にお問合せください</p>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-sm font-medium mt-2"
              >
                <Mail className="h-4 w-4 mr-2" />
                お問合せフォーム
              </Link>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-pink-100 text-sm">
            © 2024 ふるふわそくほー. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 