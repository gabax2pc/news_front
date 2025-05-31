import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import Home from '../Home';
import * as useArticlesHooks from '../../hooks/useArticles';

// フックをモック化
jest.mock('../../hooks/useArticles');
const mockUseSearchArticles = useArticlesHooks.useSearchArticles as jest.MockedFunction<typeof useArticlesHooks.useSearchArticles>;
const mockUseFacets = useArticlesHooks.useFacets as jest.MockedFunction<typeof useArticlesHooks.useFacets>;

// モックデータ
const mockArticles = [
  {
    id: 1,
    title: 'React 18の新機能について',
    content: 'React 18では、Concurrent Renderingや自動バッチングなど、多くの新機能が追加されました。',
    author: '田中太郎',
    category: 'technology',
    tags: ['React', 'JavaScript', 'フロントエンド'],
    published: true,
    thumbnail_url: null,
    thumbnail_alt: null,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: 'TypeScriptの型安全性のメリット',
    content: 'TypeScriptを使用することで、開発時にエラーを早期発見でき、コードの品質が向上します。',
    author: '佐藤花子',
    category: 'technology',
    tags: ['TypeScript', 'JavaScript', '開発'],
    published: true,
    thumbnail_url: null,
    thumbnail_alt: null,
    created_at: '2024-01-14T14:20:00Z',
    updated_at: '2024-01-14T14:20:00Z',
  },
];

const mockSearchResponse = {
  items: mockArticles,
  total: 2,
  limit: 12,
  offset: 0,
};

const mockFacetsResponse = {
  categories: [
    { value: 'technology', count: 2 },
    { value: 'business', count: 1 },
  ],
  tags: [
    { value: 'React', count: 1 },
    { value: 'TypeScript', count: 1 },
  ],
  published: [
    { value: 'true', count: 2 },
  ],
  total_articles: 2,
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // デフォルトのモック設定
    mockUseSearchArticles.mockReturnValue({
      data: mockSearchResponse,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);

    mockUseFacets.mockReturnValue({
      data: mockFacetsResponse,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);
  });

  it('正常にレンダリングされる', async () => {
    render(<Home />);

    // ヘッダーが表示されることを確認
    expect(screen.getByText('ニュースサイト')).toBeInTheDocument();
    
    // カテゴリーセクションが表示されることを確認
    expect(screen.getByText('カテゴリー')).toBeInTheDocument();
    
    // 検索バーが表示されることを確認
    expect(screen.getByPlaceholderText('記事を検索...')).toBeInTheDocument();
  });

  it('記事一覧が正常に表示される', async () => {
    render(<Home />);

    // 記事タイトルが表示されることを確認
    await waitFor(() => {
      expect(screen.getAllByText('React 18の新機能について')).toHaveLength(2);
    });
    
    await waitFor(() => {
      expect(screen.getByText('TypeScriptの型安全性のメリット')).toBeInTheDocument();
    });

    // 記事数が表示されることを確認
    expect(screen.getByText('2件の記事')).toBeInTheDocument();
  });

  it('カテゴリーフィルターが動作する', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      // ファセットから生成されたカテゴリーボタンが表示されることを確認
      expect(screen.getAllByText('technology')).toHaveLength(2);
    });

    // カテゴリーボタンをクリック（最初のものを選択）
    const technologyButtons = screen.getAllByText('technology');
    await user.click(technologyButtons[0]);

    // useSearchArticlesが適切なパラメータで呼ばれることを確認
    expect(mockUseSearchArticles).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'technology',
        published: true,
      })
    );
  });

  it('検索機能が動作する', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByPlaceholderText('記事を検索...');
    
    // 検索クエリを入力
    await user.type(searchInput, 'React');
    
    // フォームを送信
    await user.keyboard('{Enter}');

    // useSearchArticlesが適切なパラメータで呼ばれることを確認
    await waitFor(() => {
      expect(mockUseSearchArticles).toHaveBeenCalledWith(
        expect.objectContaining({
          q: 'React',
          published: true,
        })
      );
    });
  });

  it('ローディング状態が正常に表示される', () => {
    mockUseSearchArticles.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isSuccess: false,
      refetch: jest.fn(),
    } as any);

    render(<Home />);

    // ローディングスケルトンが表示されることを確認
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('エラー状態が正常に表示される', () => {
    mockUseSearchArticles.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error'),
      isError: true,
      isSuccess: false,
      refetch: jest.fn(),
    } as any);

    render(<Home />);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
    expect(screen.getByText('記事の読み込みに失敗しました。')).toBeInTheDocument();
  });

  it('記事が見つからない場合のメッセージが表示される', () => {
    mockUseSearchArticles.mockReturnValue({
      data: { items: [], total: 0, limit: 12, offset: 0 },
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);

    render(<Home />);

    // 記事が見つからないメッセージが表示されることを確認
    expect(screen.getByText('記事が見つかりませんでした')).toBeInTheDocument();
    expect(screen.getByText('検索条件を変更してお試しください。')).toBeInTheDocument();
  });

  it('記事カードがクリック可能である', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByText('React 18の新機能について')).toHaveLength(2);
    });
    
    // 記事リンクを確認
    const articleLinks = screen.getAllByRole('link');
    const targetLink = articleLinks.find(link => link.getAttribute('href') === '/article/1');
    expect(targetLink).toBeInTheDocument();
  });
}); 