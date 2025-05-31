import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, MessageSquare } from 'lucide-react';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useContactForm } from '../hooks/useContact';
import { ContactForm as ContactFormType } from '../types/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successData, setSuccessData] = useState<{ message: string; contactId?: string }>({ message: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const contactMutation = useContactForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      // バックエンド互換性のためnameフィールドを追加
      const submitData = {
        ...formData,
        name: 'お問い合わせ' // 固定値を設定
      };
      
      const result = await contactMutation.mutateAsync(submitData);
      if (result.success) {
        setIsSubmitted(true);
        setSuccessData({ message: result.message, contactId: result.contact_id });
      } else {
        setErrorMessage(result.message || 'お問い合わせの送信に失敗しました。');
      }
    } catch (error: any) {
      console.error('送信エラー:', error);
      
      // バックエンドのバリデーションエラーを処理
      if (error.response?.data?.detail) {
        const details = error.response.data.detail;
        if (Array.isArray(details)) {
          const errorMessages = details.map((detail: any) => {
            const field = detail.loc?.[detail.loc.length - 1];
            const fieldNames: Record<string, string> = {
              email: 'メールアドレス',
              subject: '件名',
              message: 'お問い合わせ内容'
            };
            const fieldName = fieldNames[field] || field;
            return `${fieldName}: ${detail.msg}`;
          });
          setErrorMessage(errorMessages.join('\n'));
        } else {
          setErrorMessage(details);
        }
      } else {
        setErrorMessage('お問い合わせの送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
      }
    }
  };

  if (isSubmitted) {
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-purple-800 mb-4">送信完了</h1>
              <p className="text-purple-600 leading-relaxed">
                お問合せを受付しました。<br />
                内容を確認の上ご返信いたします。
              </p>
              {successData.contactId && (
                <p className="text-purple-500 text-sm mt-4">
                  お問い合わせID: {successData.contactId}
                </p>
              )}
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              ホームに戻る
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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
            { label: 'お問い合わせ', current: true }
          ]}
        />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 p-8">
          <div className="flex items-center mb-6">
            <Mail className="h-8 w-8 text-pink-500 mr-3" />
            <h1 className="text-3xl font-heading font-bold text-purple-800">お問合せ</h1>
          </div>

          <div className="mb-8">
            <p className="text-purple-800 leading-relaxed">
              ご質問やご要望、サイトに関するお問い合わせがございましたら、
              下記のフォームよりお気軽にご連絡ください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1" />
                メールアドレス <span className="text-pink-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white/80 backdrop-blur-sm transition-all duration-300"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-purple-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                件名 <span className="text-pink-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">件名を選択してください</option>
                <option value="general">一般的なお問い合わせ</option>
                <option value="bug">不具合の報告</option>
                <option value="feature">機能の要望</option>
                <option value="content">記事に関するお問い合わせ</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-purple-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                お問い合わせ内容 <span className="text-pink-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white/80 backdrop-blur-sm transition-all duration-300 resize-none"
                placeholder="お問い合わせ内容をご記入ください..."
              />
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
              <p className="text-purple-700 text-sm">
                <span className="text-pink-500">*</span> は必須項目です。
                お問い合わせ内容によっては、回答にお時間をいただく場合がございます。
              </p>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-red-700 text-sm whitespace-pre-line">{errorMessage}</div>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={contactMutation.isLoading}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactMutation.isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    送信する
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact; 