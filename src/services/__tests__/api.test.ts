import axios from 'axios';
import { NewsApiClient } from '../api';
import { NewsArticleCreate, NewsArticleUpdate } from '../../types/api';

// axiosをモック化
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

// axios.createのモック
(mockedAxios.create as jest.Mock).mockReturnValue(mockedApiClient);

// モックデータ
const mockArticle = {
  id: 1,
  title: 'テスト記事',
  content: 'テスト記事の内容です。',
  author: 'テスト作者',
  category: 'technology',
  tags: ['React', 'TypeScript'],
  published: true,
  thumbnail_url: null,
  thumbnail_alt: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockSearchResponse = {
  items: [mockArticle],
  total: 1,
  limit: 10,
  offset: 0,
};

describe('NewsApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 環境変数をリセット
    process.env.REACT_APP_USE_MOCK = 'false';
  });

  describe('getArticles', () => {
    it('記事一覧を正常に取得できる', async () => {
      mockedApiClient.get.mockResolvedValue({ data: mockSearchResponse });

      const result = await NewsApiClient.getArticles();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/api/v1/news', { params: undefined });
      expect(result).toEqual(mockSearchResponse);
    });

    it('パラメータ付きで記事一覧を取得できる', async () => {
      const params = { limit: 5, category: 'technology' };
      mockedApiClient.get.mockResolvedValue({ data: mockSearchResponse });

      const result = await NewsApiClient.getArticles(params);

      expect(mockedApiClient.get).toHaveBeenCalledWith('/api/v1/news', { params });
      expect(result).toEqual(mockSearchResponse);
    });
  });

  describe('searchArticles', () => {
    it('記事検索を正常に実行できる', async () => {
      const searchParams = { q: 'React', limit: 10 };
      mockedAxios.get.mockResolvedValue({ data: mockSearchResponse });

      const result = await NewsApiClient.searchArticles(searchParams);

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/news/search', { params: searchParams });
      expect(result).toEqual(mockSearchResponse);
    });
  });

  describe('getArticle', () => {
    it('特定の記事を正常に取得できる', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockArticle });

      const result = await NewsApiClient.getArticle(1);

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/news/1');
      expect(result).toEqual(mockArticle);
    });
  });

  describe('createArticle', () => {
    it('記事を正常に作成できる', async () => {
      const newArticle: NewsArticleCreate = {
        title: '新しい記事',
        content: '新しい記事の内容',
        category: 'technology',
        published: true,
      };
      mockedAxios.post.mockResolvedValue({ data: mockArticle });

      const result = await NewsApiClient.createArticle(newArticle);

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/news', newArticle);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('updateArticle', () => {
    it('記事を正常に更新できる', async () => {
      const updateData: NewsArticleUpdate = {
        title: '更新された記事',
        published: false,
      };
      mockedAxios.put.mockResolvedValue({ data: { ...mockArticle, ...updateData } });

      const result = await NewsApiClient.updateArticle(1, updateData);

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/v1/news/1', updateData);
      expect(result).toEqual({ ...mockArticle, ...updateData });
    });
  });

  describe('deleteArticle', () => {
    it('記事を正常に削除できる', async () => {
      mockedAxios.delete.mockResolvedValue({ data: {} });

      await NewsApiClient.deleteArticle(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith('/api/v1/news/1');
    });
  });

  describe('getFacets', () => {
    it('ファセット情報を正常に取得できる', async () => {
      const mockFacets = {
        categories: [{ value: 'technology', count: 5 }],
        tags: [{ value: 'React', count: 3 }],
        published: [{ value: 'true', count: 8 }],
        total_articles: 10,
      };
      mockedAxios.get.mockResolvedValue({ data: mockFacets });

      const result = await NewsApiClient.getFacets({ published: true });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/news/facets', { 
        params: { published: true } 
      });
      expect(result).toEqual(mockFacets);
    });
  });

  describe('モックモード', () => {
    beforeEach(() => {
      process.env.REACT_APP_USE_MOCK = 'true';
    });

    it('モックモードでは実際のAPIを呼び出さない', async () => {
      // モックAPIクライアントが呼ばれることを確認
      const result = await NewsApiClient.getArticles();
      
      // 実際のaxiosが呼ばれていないことを確認
      expect(mockedAxios.get).not.toHaveBeenCalled();
      
      // 結果が返されることを確認（モックAPIから）
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
    });
  });
}); 