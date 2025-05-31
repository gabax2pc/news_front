import {
  NewsArticle,
  NewsArticleCreate,
  NewsArticleUpdate,
  SearchResponse,
  ArticleListParams,
  ArticleSearchParams,
  FacetResponse,
  FacetParams,
  ContactForm,
  ContactResponse,
  TestEmailRequest,
  TestEmailResponse,
} from '../types/api';

// モックデータ
const mockArticles: NewsArticle[] = [
  {
    id: 1,
    title: "React 18の新機能について",
    content: "React 18では、Concurrent Renderingや自動バッチングなど、多くの新機能が追加されました。これらの機能により、アプリケーションのパフォーマンスが大幅に向上します。\n\nConcurrent Renderingは、UIの更新を中断可能にし、より重要な更新を優先的に処理できるようになります。",
    author: "田中太郎",
    category: "technology",
    tags: ["React", "JavaScript", "フロントエンド"],
    published: true,
    thumbnail_url: "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=React",
    thumbnail_alt: "React開発のイメージ",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "TypeScriptの型安全性のメリット",
    content: "TypeScriptを使用することで、開発時にエラーを早期発見でき、コードの品質が向上します。特に大規模なプロジェクトでは、その恩恵を強く感じることができます。",
    author: "佐藤花子",
    category: "technology",
    tags: ["TypeScript", "JavaScript", "開発"],
    published: true,
    thumbnail_url: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=TypeScript",
    thumbnail_alt: "TypeScript開発のイメージ",
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    title: "Tailwind CSSでモダンなデザインを",
    content: "Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。クラス名を組み合わせることで、迅速にスタイリングを行うことができます。",
    author: "山田次郎",
    category: "technology",
    tags: ["CSS", "Tailwind", "デザイン"],
    published: true,
    thumbnail_url: "https://picsum.photos/400/300?random=3",
    thumbnail_alt: "ウェブデザインのイメージ",
    created_at: "2024-01-13T09:15:00Z",
    updated_at: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    title: "AIと機械学習の最新動向",
    content: "人工知能と機械学習の分野は急速に発展しており、様々な業界で実用化が進んでいます。ChatGPTやGPT-4などの大規模言語モデルの登場により、AI技術はより身近なものになりました。",
    author: "鈴木一郎",
    category: "technology",
    tags: ["AI", "機械学習", "ChatGPT"],
    published: true,
    thumbnail_url: "https://picsum.photos/400/300?random=4",
    thumbnail_alt: "AI・機械学習のイメージ",
    created_at: "2024-01-12T16:45:00Z",
    updated_at: "2024-01-12T16:45:00Z",
  },
  {
    id: 5,
    title: "クラウドネイティブアプリケーション開発",
    content: "Kubernetes、Docker、マイクロサービスアーキテクチャを活用したクラウドネイティブな開発手法について解説します。スケーラビリティと可用性を重視した設計パターンを学びましょう。",
    author: "高橋美咲",
    category: "technology",
    tags: ["Kubernetes", "Docker", "クラウド"],
    published: true,
    thumbnail_url: "https://picsum.photos/400/300?random=5",
    thumbnail_alt: "クラウドコンピューティングのイメージ",
    created_at: "2024-01-11T11:20:00Z",
    updated_at: "2024-01-11T11:20:00Z",
  },
  {
    id: 6,
    title: "サムネイルなしの記事例",
    content: "この記事にはサムネイル画像が設定されていません。グラデーションのプレースホルダーが表示されるはずです。",
    author: "テスト太郎",
    category: "technology",
    tags: ["テスト", "サンプル"],
    published: true,
    thumbnail_url: null,
    thumbnail_alt: null,
    created_at: "2024-01-10T08:30:00Z",
    updated_at: "2024-01-10T08:30:00Z",
  },
];

let nextId = 7;

// 遅延をシミュレート
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockNewsApiClient {
  // 記事一覧取得
  static async getArticles(params?: ArticleListParams): Promise<SearchResponse> {
    await delay(500); // APIの遅延をシミュレート
    
    let filteredArticles = [...mockArticles];
    
    // フィルタリング
    if (params?.category) {
      filteredArticles = filteredArticles.filter(article => article.category === params.category);
    }
    
    if (params?.published !== undefined && params?.published !== null) {
      filteredArticles = filteredArticles.filter(article => article.published === params.published);
    }
    
    if (params?.tags && params.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        params.tags!.some(tag => article.tags.includes(tag))
      );
    }
    
    // ページネーション
    const skip = params?.skip || 0;
    const limit = params?.limit || 10;
    const paginatedArticles = filteredArticles.slice(skip, skip + limit);
    
    return {
      items: paginatedArticles,
      total: filteredArticles.length,
      limit,
      offset: skip,
    };
  }

  // 記事検索
  static async searchArticles(params?: ArticleSearchParams): Promise<SearchResponse> {
    await delay(300);
    
    let filteredArticles = [...mockArticles];
    
    // 検索クエリ
    if (params?.q) {
      const query = params.q.toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    }
    
    // その他のフィルタリング
    if (params?.category) {
      filteredArticles = filteredArticles.filter(article => article.category === params.category);
    }
    
    if (params?.published !== undefined && params?.published !== null) {
      filteredArticles = filteredArticles.filter(article => article.published === params.published);
    }
    
    // タグフィルター
    if (params?.tags && params.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        params.tags!.some(tag => article.tags.includes(tag))
      );
    }
    
    // ページネーション
    const offset = params?.offset || 0;
    const limit = params?.limit || 10;
    const paginatedArticles = filteredArticles.slice(offset, offset + limit);
    
    return {
      items: paginatedArticles,
      total: filteredArticles.length,
      limit,
      offset,
    };
  }

  // 特定記事取得
  static async getArticle(articleId: number): Promise<NewsArticle> {
    await delay(200);
    
    const article = mockArticles.find(a => a.id === articleId);
    if (!article) {
      throw new Error('記事が見つかりませんでした');
    }
    
    return article;
  }

  // 記事作成
  static async createArticle(article: NewsArticleCreate): Promise<NewsArticle> {
    await delay(800);
    
    const newArticle: NewsArticle = {
      id: nextId++,
      title: article.title,
      content: article.content,
      author: article.author || null,
      category: article.category || null,
      tags: article.tags || [],
      published: article.published || false,
      thumbnail_url: article.thumbnail_url || null,
      thumbnail_alt: article.thumbnail_alt || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockArticles.unshift(newArticle);
    return newArticle;
  }

  // 記事更新
  static async updateArticle(
    articleId: number,
    article: NewsArticleUpdate
  ): Promise<NewsArticle> {
    await delay(600);
    
    const index = mockArticles.findIndex(a => a.id === articleId);
    if (index === -1) {
      throw new Error('記事が見つかりませんでした');
    }
    
    const updatedArticle: NewsArticle = {
      ...mockArticles[index],
      ...Object.fromEntries(
        Object.entries(article).filter(([_, value]) => value !== null && value !== undefined)
      ),
      updated_at: new Date().toISOString(),
    };
    
    mockArticles[index] = updatedArticle;
    return updatedArticle;
  }

  // 記事削除
  static async deleteArticle(articleId: number): Promise<void> {
    await delay(400);
    
    const index = mockArticles.findIndex(a => a.id === articleId);
    if (index === -1) {
      throw new Error('記事が見つかりませんでした');
    }
    
    mockArticles.splice(index, 1);
  }

  // ファセット取得
  static async getFacets(params?: FacetParams): Promise<FacetResponse> {
    await delay(300);
    
    let filteredArticles = [...mockArticles];
    
    // フィルタリング（検索クエリがある場合）
    if (params?.q) {
      const query = params.q.toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    }
    
    if (params?.category) {
      filteredArticles = filteredArticles.filter(article => article.category === params.category);
    }
    
    if (params?.published !== undefined && params?.published !== null) {
      filteredArticles = filteredArticles.filter(article => article.published === params.published);
    }
    
    if (params?.tags && params.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        params.tags!.some(tag => article.tags.includes(tag))
      );
    }
    
    // カテゴリのファセットカウント
    const categoryCount = new Map<string, number>();
    filteredArticles.forEach(article => {
      if (article.category) {
        categoryCount.set(article.category, (categoryCount.get(article.category) || 0) + 1);
      }
    });
    
    // タグのファセットカウント
    const tagCount = new Map<string, number>();
    filteredArticles.forEach(article => {
      article.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });
    
    // 公開状態のファセットカウント
    const publishedCount = new Map<string, number>();
    filteredArticles.forEach(article => {
      const key = article.published ? 'true' : 'false';
      publishedCount.set(key, (publishedCount.get(key) || 0) + 1);
    });
    
    return {
      categories: Array.from(categoryCount.entries()).map(([value, count]) => ({ value, count })),
      tags: Array.from(tagCount.entries()).map(([value, count]) => ({ value, count })),
      published: Array.from(publishedCount.entries()).map(([value, count]) => ({ value, count })),
      total_articles: filteredArticles.length,
    };
  }

  // 問い合わせメール送信
  static async sendContactEmail(form: ContactForm): Promise<ContactResponse> {
    await delay(1500); // メール送信のシミュレーション
    
    // バリデーション
    if (!form.name || !form.email || !form.subject || !form.message) {
      return {
        success: false,
        message: '必須項目が入力されていません。',
        errors: ['name', 'email', 'subject', 'message'].filter(field => !form[field as keyof ContactForm])
      };
    }
    
    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return {
        success: false,
        message: 'メールアドレスの形式が正しくありません。',
        errors: ['email']
      };
    }
    
    // 成功レスポンス
    return {
      success: true,
      message: 'お問合せを受付しました。内容を確認の上ご返信いたします。',
      contact_id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  // テストメール送信
  static async sendTestEmail(request: TestEmailRequest): Promise<TestEmailResponse> {
    await delay(800);
    
    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.to_email)) {
      return {
        success: false,
        message: 'メールアドレスの形式が正しくありません。'
      };
    }
    
    return {
      success: true,
      message: `テストメールを ${request.to_email} に送信しました。`
    };
  }
} 