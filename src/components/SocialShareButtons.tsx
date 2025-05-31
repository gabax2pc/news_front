import React, { useState } from 'react';
import { Facebook, MessageCircle, Bookmark, Copy, Share, Check } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

interface ShareButton {
  name: string;
  iconType: string;
  color: string;
  hoverColor: string;
  platform: string;
}

// XのSVGアイコンコンポーネント
const XIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url, description }) => {
  const [showCopyToast, setShowCopyToast] = useState(false);
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`,
    hatena: `https://b.hatena.ne.jp/entry/s/${encodedUrl}`,
    copy: url
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setShowCopyToast(true);
        setTimeout(() => {
          setShowCopyToast(false);
        }, 2000);
      });
      return;
    }

    const shareUrl = shareUrls[platform as keyof typeof shareUrls];
    if (typeof shareUrl === 'string') {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const shareButtons: ShareButton[] = [
    {
      name: 'X',
      iconType: 'x',
      color: 'from-gray-800 to-black',
      hoverColor: 'hover:from-gray-900 hover:to-gray-800',
      platform: 'twitter'
    },
    {
      name: 'Facebook',
      iconType: 'facebook',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-700 hover:to-blue-900',
      platform: 'facebook'
    },
    {
      name: 'LINE',
      iconType: 'line',
      color: 'from-green-400 to-green-600',
      hoverColor: 'hover:from-green-500 hover:to-green-700',
      platform: 'line'
    },
    {
      name: 'はてブ',
      iconType: 'hatena',
      color: 'from-orange-400 to-orange-600',
      hoverColor: 'hover:from-orange-500 hover:to-orange-700',
      platform: 'hatena'
    },
    {
      name: 'URLコピー',
      iconType: 'copy',
      color: 'from-gray-400 to-gray-600',
      hoverColor: 'hover:from-gray-500 hover:to-gray-700',
      platform: 'copy'
    }
  ];

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'x':
        return <XIcon size={14} />;
      case 'facebook':
        return <Facebook size={14} />;
      case 'line':
        return <MessageCircle size={14} />;
      case 'hatena':
        return <Bookmark size={14} />;
      case 'copy':
        return <Copy size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <h3 className="text-sm font-heading font-medium text-purple-800 mb-3 flex items-center">
        <Share className="h-4 w-4 mr-1" />
        シェア
      </h3>
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((button) => (
          <button
            key={button.platform}
            onClick={() => handleShare(button.platform)}
            className={`
              inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium
              bg-gradient-to-r ${button.color} ${button.hoverColor}
              text-white
              transition-all duration-300 transform hover:scale-105 shadow-sm
              border border-transparent
              w-28 min-w-28 whitespace-nowrap
            `}
          >
            {renderIcon(button.iconType)}
            <span className="ml-2">{button.name}</span>
          </button>
        ))}
      </div>
      
      {/* コピー完了トーストメッセージ */}
      {showCopyToast && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center animate-bounce">
            <Check className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">コピーしました！</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShareButtons; 