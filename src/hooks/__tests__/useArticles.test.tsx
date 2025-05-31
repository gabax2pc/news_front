import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { useSearchArticles, useFacets, useArticle } from '../useArticles';
import { NewsApiClient } from '../../services/api';
import { createTestQueryClient } from '../../setupTests';

// APIクライアントをモック化
jest.mock('../../services/api');
const mockNewsApiClient = NewsApiClient as jest.Mocked<typeof NewsApiClient>;

// テスト用のWrapper
const createWrapper = () => {
  const queryClient = createTestQueryClient();
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe('useArticles hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSearchArticles', () => {
    it('記事検索が正常に動作する', async () => {
      const mockResponse = {
        items: [
          {
            id: 1,
            title: 'テスト記事',
            content: 'テスト内容',
            author: 'テスト作者',
            category: 'technology',
            tags: ['React'],
            published: true,
            thumbnail_url: null,
            thumbnail_alt: null,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        ],
        total: 1,
        limit: 10,
        offset: 0,
      };

      mockNewsApiClient.searchArticles.mockResolvedValue(mockResponse);

      const { result } = renderHook(
        () => useSearchArticles({ q: 'React', published: true }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockNewsApiClient.searchArticles).toHaveBeenCalledWith({
        q: 'React',
        published: true,
      });
    });

    it('パラメータがない場合は実行されない', () => {
      const { result } = renderHook(
        () => useSearchArticles(undefined),
        { wrapper: createWrapper() }
      );

      expect(result.current.isIdle).toBe(true);
      expect(mockNewsApiClient.searchArticles).not.toHaveBeenCalled();
    });
  });

  describe('useFacets', () => {
    it('ファセット取得が正常に動作する', async () => {
      const mockFacetsResponse = {
        categories: [{ value: 'technology', count: 5 }],
        tags: [{ value: 'React', count: 3 }],
        published: [{ value: 'true', count: 8 }],
        total_articles: 10,
      };

      mockNewsApiClient.getFacets.mockResolvedValue(mockFacetsResponse);

      const { result } = renderHook(
        () => useFacets({ published: true }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFacetsResponse);
      expect(mockNewsApiClient.getFacets).toHaveBeenCalledWith({
        published: true,
      });
    });
  });

  describe('useArticle', () => {
    it('特定記事の取得が正常に動作する', async () => {
      const mockArticle = {
        id: 1,
        title: 'テスト記事',
        content: 'テスト内容',
        author: 'テスト作者',
        category: 'technology',
        tags: ['React'],
        published: true,
        thumbnail_url: null,
        thumbnail_alt: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockNewsApiClient.getArticle.mockResolvedValue(mockArticle);

      const { result } = renderHook(
        () => useArticle(1),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockArticle);
      expect(mockNewsApiClient.getArticle).toHaveBeenCalledWith(1);
    });

    it('articleIdが0の場合は実行されない', () => {
      const { result } = renderHook(
        () => useArticle(0),
        { wrapper: createWrapper() }
      );

      expect(result.current.isIdle).toBe(true);
      expect(mockNewsApiClient.getArticle).not.toHaveBeenCalled();
    });
  });

  describe('エラーハンドリング', () => {
    it('API エラーが正常に処理される', async () => {
      const errorMessage = 'API Error';
      mockNewsApiClient.searchArticles.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(
        () => useSearchArticles({ q: 'test' }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
    });
  });
}); 