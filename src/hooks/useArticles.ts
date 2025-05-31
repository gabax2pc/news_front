import { useQuery, useMutation, useQueryClient } from 'react-query';
import { NewsApiClient } from '../services/api';
import {
  NewsArticleCreate,
  NewsArticleUpdate,
  ArticleListParams,
  ArticleSearchParams,
  FacetParams,
} from '../types/api';

// 記事一覧取得フック
export const useArticles = (params?: ArticleListParams) => {
  return useQuery(
    ['articles', params],
    () => NewsApiClient.getArticles(params),
    {
      staleTime: 5 * 60 * 1000, // 5分間キャッシュ
      cacheTime: 10 * 60 * 1000, // 10分間保持
    }
  );
};

// 記事検索フック
export const useSearchArticles = (params?: ArticleSearchParams) => {
  return useQuery(
    ['searchArticles', params],
    () => NewsApiClient.searchArticles(params),
    {
      enabled: !!params, // パラメータがある場合のみ実行
      staleTime: 2 * 60 * 1000, // 2分間キャッシュ
    }
  );
};

// ファセット取得フック
export const useFacets = (params?: FacetParams) => {
  return useQuery(
    ['facets', params],
    () => NewsApiClient.getFacets(params),
    {
      staleTime: 5 * 60 * 1000, // 5分間キャッシュ
      cacheTime: 10 * 60 * 1000, // 10分間保持
    }
  );
};

// 特定記事取得フック
export const useArticle = (articleId: number) => {
  return useQuery(
    ['article', articleId],
    () => NewsApiClient.getArticle(articleId),
    {
      enabled: !!articleId,
      staleTime: 5 * 60 * 1000,
    }
  );
};

// 記事作成ミューテーション
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (article: NewsArticleCreate) => NewsApiClient.createArticle(article),
    {
      onSuccess: () => {
        // 記事一覧のキャッシュを無効化
        queryClient.invalidateQueries(['articles']);
        queryClient.invalidateQueries(['searchArticles']);
        queryClient.invalidateQueries(['facets']);
      },
    }
  );
};

// 記事更新ミューテーション
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ articleId, article }: { articleId: number; article: NewsArticleUpdate }) =>
      NewsApiClient.updateArticle(articleId, article),
    {
      onSuccess: (data, variables) => {
        // 関連するキャッシュを更新
        queryClient.setQueryData(['article', variables.articleId], data);
        queryClient.invalidateQueries(['articles']);
        queryClient.invalidateQueries(['searchArticles']);
        queryClient.invalidateQueries(['facets']);
      },
    }
  );
};

// 記事削除ミューテーション
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (articleId: number) => NewsApiClient.deleteArticle(articleId),
    {
      onSuccess: (_, articleId) => {
        // 削除された記事のキャッシュを削除
        queryClient.removeQueries(['article', articleId]);
        queryClient.invalidateQueries(['articles']);
        queryClient.invalidateQueries(['searchArticles']);
        queryClient.invalidateQueries(['facets']);
      },
    }
  );
}; 