// OpenAPI仕様書に基づく型定義

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  author?: string | null;
  category?: string | null;
  tags: string[];
  published: boolean;
  thumbnail_url?: string | null;
  thumbnail_alt?: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsArticleCreate {
  title: string;
  content: string;
  author?: string | null;
  category?: string | null;
  tags?: string[];
  published?: boolean;
  thumbnail_url?: string | null;
  thumbnail_alt?: string | null;
}

export interface NewsArticleUpdate {
  title?: string | null;
  content?: string | null;
  author?: string | null;
  category?: string | null;
  tags?: string[] | null;
  published?: boolean | null;
  thumbnail_url?: string | null;
  thumbnail_alt?: string | null;
}

export interface SearchResponse {
  items: NewsArticle[];
  total: number;
  limit: number;
  offset: number;
}

// ファセット関連の型定義
export interface FacetCount {
  value: string;
  count: number;
}

export interface FacetResponse {
  categories: FacetCount[];
  tags: FacetCount[];
  published: FacetCount[];
  total_articles: number;
}

// S3関連の型定義
export interface S3UploadResponse {
  s3_url: string;
  cloudfront_url?: string;
  filename: string;
  size: number;
  cache_control: string;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// API リクエストパラメータの型定義
export interface ArticleListParams {
  skip?: number;
  limit?: number;
  category?: string | null;
  published?: boolean | null;
  tags?: string[] | null;
}

export interface ArticleSearchParams {
  q?: string | null;
  category?: string | null;
  published?: boolean | null;
  tags?: string[] | null;
  limit?: number;
  offset?: number;
  sort_by?: string | null;
}

// ファセット取得パラメータ
export interface FacetParams {
  q?: string | null;
  category?: string | null;
  published?: boolean | null;
  tags?: string[] | null;
}

// S3サムネイル一覧取得パラメータ
export interface S3ThumbnailListParams {
  prefix?: string;
  max_keys?: number;
}

// 問い合わせフォーム関連の型定義
export interface ContactForm {
  name?: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  contact_id?: string;
  errors?: any[];
}

// メールヘルスチェック関連の型定義
export interface EmailHealthResponse {
  status: string;
  is_local?: boolean;
  mail_server?: string;
  mail_port?: number;
  template_folder?: string;
  services?: Record<string, boolean>;
  error?: string;
}

export interface TestEmailRequest {
  to_email: string;
  subject?: string;
  message?: string;
}

export interface TestEmailResponse {
  success: boolean;
  message: string;
} 