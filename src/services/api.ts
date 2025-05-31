import axios from 'axios';
import {
  NewsArticle,
  NewsArticleCreate,
  NewsArticleUpdate,
  SearchResponse,
  ArticleListParams,
  ArticleSearchParams,
  FacetResponse,
  FacetParams,
  S3UploadResponse,
  S3ThumbnailListParams,
  ContactForm,
  ContactResponse,
  EmailHealthResponse,
  TestEmailRequest,
  TestEmailResponse,
} from '../types/api';
import { MockNewsApiClient } from './mockApi';

// APIベースURL（環境変数から取得、デフォルトはlocalhost）
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// モックモードの判定（明示的に有効にした場合のみモックを使用）
const USE_MOCK_API = false; // process.env.REACT_APP_USE_MOCK === 'true';

// Axiosインスタンスの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    indexes: null, // 配列パラメータを tags=value1&tags=value2 形式でシリアライズ
  },
});

// APIクライアントクラス
export class NewsApiClient {
  // 記事一覧取得
  static async getArticles(params?: ArticleListParams): Promise<SearchResponse> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.getArticles(params);
    }
    const response = await apiClient.get('/api/v1/news', { params });
    return response.data;
  }

  // 記事検索
  static async searchArticles(params?: ArticleSearchParams): Promise<SearchResponse> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.searchArticles(params);
    }
    
    // URLSearchParamsを使って手動でパラメータを構築
    const searchParams = new URLSearchParams();
    
    if (params?.q) searchParams.append('q', params.q);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.published !== undefined) searchParams.append('published', String(params.published));
    if (params?.limit) searchParams.append('limit', String(params.limit));
    if (params?.offset) searchParams.append('offset', String(params.offset));
    if (params?.sort_by) searchParams.append('sort_by', params.sort_by);
    
    // タグは複数の値として追加
    if (params?.tags && params.tags.length > 0) {
      params.tags.forEach(tag => searchParams.append('tags', tag));
    }
    
    const response = await apiClient.get(`/api/v1/news/search?${searchParams.toString()}`);
    
    return response.data;
  }

  // ファセット取得
  static async getFacets(params?: FacetParams): Promise<FacetResponse> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.getFacets(params);
    }
    
    // URLSearchParamsを使って手動でパラメータを構築
    const searchParams = new URLSearchParams();
    
    if (params?.q) searchParams.append('q', params.q);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.published !== undefined) searchParams.append('published', String(params.published));
    
    // タグは複数の値として追加
    if (params?.tags && params.tags.length > 0) {
      params.tags.forEach(tag => searchParams.append('tags', tag));
    }
    
    const response = await apiClient.get(`/api/v1/news/facets?${searchParams.toString()}`);
    
    return response.data;
  }

  // 特定記事取得
  static async getArticle(articleId: number): Promise<NewsArticle> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.getArticle(articleId);
    }
    const response = await apiClient.get(`/api/v1/news/${articleId}`);
    return response.data;
  }

  // 記事作成
  static async createArticle(article: NewsArticleCreate): Promise<NewsArticle> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.createArticle(article);
    }
    const response = await apiClient.post('/api/v1/news', article);
    return response.data;
  }

  // 記事更新
  static async updateArticle(
    articleId: number,
    article: NewsArticleUpdate
  ): Promise<NewsArticle> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.updateArticle(articleId, article);
    }
    const response = await apiClient.put(`/api/v1/news/${articleId}`, article);
    return response.data;
  }

  // 記事削除
  static async deleteArticle(articleId: number): Promise<void> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.deleteArticle(articleId);
    }
    await apiClient.delete(`/api/v1/news/${articleId}`);
  }

  // S3ヘルスチェック
  static async checkS3Health(): Promise<any> {
    const response = await apiClient.get('/api/v1/news/s3/health');
    return response.data;
  }

  // S3にサムネイルアップロード
  static async uploadThumbnailToS3(
    file: File,
    cacheDuration: string = 'long'
  ): Promise<S3UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(
      `/api/v1/news/thumbnails/s3?cache_duration=${cacheDuration}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  // S3サムネイル一覧取得
  static async listS3Thumbnails(params?: S3ThumbnailListParams): Promise<any> {
    const response = await apiClient.get('/api/v1/news/thumbnails/s3/list', { params });
    return response.data;
  }

  // S3サムネイル削除
  static async deleteS3Thumbnail(filename: string): Promise<any> {
    const response = await apiClient.delete(`/api/v1/news/thumbnails/s3/${filename}`);
    return response.data;
  }

  // 問い合わせメール送信
  static async sendContactEmail(form: ContactForm): Promise<ContactResponse> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.sendContactEmail(form);
    }
    const response = await apiClient.post('/api/v1/contact', form);
    return response.data;
  }

  // メールサーバーヘルスチェック
  static async checkEmailServerHealth(): Promise<EmailHealthResponse> {
    const response = await apiClient.get('/api/v1/email/health');
    return response.data;
  }

  // テストメール送信
  static async sendTestEmail(request: TestEmailRequest): Promise<TestEmailResponse> {
    if (USE_MOCK_API) {
      return MockNewsApiClient.sendTestEmail(request);
    }
    const response = await apiClient.post('/api/v1/email/test', request);
    return response.data;
  }
}

export default NewsApiClient; 