import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 見出し
          h1: ({ children }) => (
            <h1 className="text-3xl font-heading font-bold text-purple-800 mb-6 mt-8 first:mt-0 border-b-2 border-pink-200 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-heading font-bold text-purple-700 mb-4 mt-6 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-heading font-semibold text-purple-600 mb-3 mt-5 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-heading font-semibold text-purple-600 mb-2 mt-4 first:mt-0">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-heading font-semibold text-purple-600 mb-2 mt-3 first:mt-0">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-heading font-semibold text-purple-600 mb-2 mt-3 first:mt-0">
              {children}
            </h6>
          ),
          
          // 段落
          p: ({ children }) => (
            <p className="text-purple-800 leading-relaxed mb-4">
              {children}
            </p>
          ),
          
          // リスト
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 mb-4 ml-6">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 mb-4 ml-6">
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-purple-800">
              {children}
            </li>
          ),
          
          // リンク
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-pink-600 hover:text-pink-700 underline decoration-pink-300 hover:decoration-pink-500 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // 強調
          strong: ({ children }) => (
            <strong className="font-bold text-purple-900 bg-gradient-to-r from-pink-100 to-purple-100 px-1 rounded">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-pink-700 font-medium">
              {children}
            </em>
          ),
          
          // コード
          code: ({ children, ...props }) => {
            const isInline = !props.className?.includes('language-');
            if (isInline) {
              return (
                <code className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm font-mono border border-pink-200">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gradient-to-br from-gray-50 to-purple-50 text-purple-900 p-4 rounded-xl border border-pink-200 overflow-x-auto font-mono text-sm">
                {children}
              </code>
            );
          },
          
          // コードブロック
          pre: ({ children }) => (
            <pre className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4 mb-4 overflow-x-auto border border-pink-200 shadow-sm">
              {children}
            </pre>
          ),
          
          // 引用
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 pl-4 py-2 mb-4 rounded-r-xl">
              <div className="text-purple-700 italic">
                {children}
              </div>
            </blockquote>
          ),
          
          // 水平線
          hr: () => (
            <hr className="border-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-full my-8" />
          ),
          
          // テーブル
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 shadow-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gradient-to-r from-pink-100 to-purple-100">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-purple-800 font-heading font-semibold border-b border-pink-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-purple-700 border-b border-pink-100">
              {children}
            </td>
          ),
          
          // 画像
          img: ({ src, alt }) => (
            <div className="mb-4">
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-xl shadow-lg border border-pink-200"
              />
              {alt && (
                <p className="text-sm text-purple-600 text-center mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent; 