import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // エラーレポーティングサービスに送信（例：Sentry）
    // reportError(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cute-50 font-cute flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-pink-500 mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold text-purple-800 mb-2">
                😢 予期しないエラーが発生しました
              </h1>
              <p className="text-purple-600 text-sm leading-relaxed">
                申し訳ございません。アプリケーションでエラーが発生しました。
                ページを再読み込みするか、ホームに戻ってお試しください。
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                ページを再読み込み
              </button>
              
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-white text-purple-700 border-2 border-purple-200 rounded-2xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                ホームに戻る
              </Link>
            </div>

            {/* 開発環境でのエラー詳細表示 */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-purple-600 hover:text-pink-600">
                  エラー詳細（開発用）
                </summary>
                <div className="mt-2 p-3 bg-red-50 rounded-lg text-xs text-red-800 font-mono overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 