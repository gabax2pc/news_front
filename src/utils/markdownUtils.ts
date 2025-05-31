/**
 * マークダウンテキストからプレーンテキストを抽出する
 * @param markdown マークダウンテキスト
 * @param maxLength 最大文字数（デフォルト: 150）
 * @returns プレーンテキスト
 */
export const extractPlainText = (markdown: string, maxLength: number = 150): string => {
  // マークダウン記法を削除
  let plainText = markdown
    // 見出し記号を削除
    .replace(/^#{1,6}\s+/gm, '')
    // 強調記号を削除
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // リンク記法を削除
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // コード記法を削除
    .replace(/`([^`]+)`/g, '$1')
    // 改行を空白に変換
    .replace(/\n+/g, ' ')
    // 複数の空白を単一の空白に変換
    .replace(/\s+/g, ' ')
    // 前後の空白を削除
    .trim();

  // 指定された長さで切り詰める
  if (plainText.length > maxLength) {
    plainText = plainText.substring(0, maxLength) + '...';
  }

  return plainText;
};

/**
 * マークダウンテキストから最初の見出しを抽出する
 * @param markdown マークダウンテキスト
 * @returns 最初の見出しまたはnull
 */
export const extractFirstHeading = (markdown: string): string | null => {
  const headingMatch = markdown.match(/^#{1,6}\s+(.+)$/m);
  return headingMatch ? headingMatch[1].trim() : null;
};

/**
 * マークダウンテキストに含まれる見出しの数を取得する
 * @param markdown マークダウンテキスト
 * @returns 見出しの数
 */
export const countHeadings = (markdown: string): number => {
  const headings = markdown.match(/^#{1,6}\s+/gm);
  return headings ? headings.length : 0;
}; 