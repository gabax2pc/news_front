# フロントエンドテスト実装ガイド

## 概要

このプロジェクトでは、Reactアプリケーションに対して包括的なテストスイートを実装しています。以下の種類のテストが含まれています：

## テストの種類

### 1. ユニットテスト
- **APIクライアント** (`src/services/__tests__/api.test.ts`)
  - HTTP リクエストのテスト
  - エラーハンドリングのテスト
  - モック機能のテスト

### 2. カスタムフックテスト
- **useArticles フック** (`src/hooks/__tests__/useArticles.test.tsx`)
  - データ取得ロジックのテスト
  - React Query の統合テスト
  - エラー状態のテスト

### 3. 統合テスト
- **Homeコンポーネント** (`src/pages/__tests__/Home.test.tsx`)
  - ユーザーインタラクションのテスト
  - 状態管理のテスト
  - UI レンダリングのテスト

## テスト環境の構成

### 使用ライブラリ
- **Jest**: テストランナー
- **React Testing Library**: コンポーネントテスト
- **@testing-library/user-event**: ユーザーインタラクション
- **@testing-library/jest-dom**: DOM アサーション

### セットアップファイル
- `src/setupTests.ts`: Jest とテストライブラリの設定
- `src/test-utils.tsx`: カスタムレンダー関数とプロバイダー

## テストの実行方法

### 全テストの実行
```bash
npm test
```

### 特定のテストファイルの実行
```bash
# フックのテストのみ
npm test -- --testPathPattern="useArticles.test.tsx"

# コンポーネントのテストのみ
npm test -- --testPathPattern="Home.test.tsx"

# APIのテストのみ
npm test -- --testPathPattern="api.test.ts"
```

### カバレッジレポートの生成
```bash
npm test -- --coverage --watchAll=false
```

### ウォッチモードでの実行
```bash
npm test -- --watch
```

## テスト結果

### 現在のテスト状況
- ✅ **useArticles フック**: 6/6 テスト通過
  - 記事検索機能
  - ファセット取得機能
  - 個別記事取得機能
  - エラーハンドリング

### カバレッジ情報
- **useArticles.ts**: 37.14% (主要な機能をカバー)
- **api.ts**: 7.5% (モック機能の動作確認)

## テストケースの詳細

### 1. APIクライアントテスト
```typescript
describe('NewsApiClient', () => {
  // 記事一覧取得
  // 記事検索
  // 個別記事取得
  // 記事作成・更新・削除
  // ファセット取得
  // エラーハンドリング
});
```

### 2. カスタムフックテスト
```typescript
describe('useArticles hooks', () => {
  // useSearchArticles
  // useFacets
  // useArticle
  // エラーハンドリング
});
```

### 3. コンポーネント統合テスト
```typescript
describe('Home Component', () => {
  // レンダリング確認
  // 記事一覧表示
  // カテゴリーフィルター
  // 検索機能
  // ローディング状態
  // エラー状態
});
```

## モック戦略

### 1. APIクライアントのモック
- axios のモック化
- HTTP レスポンスのシミュレーション
- エラー状態のテスト

### 2. React Query のモック
- QueryClient の設定
- キャッシュ無効化
- エラーログの抑制

### 3. React Router のモック
- BrowserRouter のラップ
- ナビゲーションのテスト

## ベストプラクティス

### 1. テストの構造
- **Arrange**: テストデータの準備
- **Act**: 実際の操作
- **Assert**: 結果の検証

### 2. モックの使用
- 外部依存関係のモック化
- 実装詳細ではなく動作をテスト
- モックの適切なクリーンアップ

### 3. アサーション
- 意味のあるエラーメッセージ
- ユーザー視点でのテスト
- アクセシビリティを考慮したセレクター

## 今後の改善点

### 1. テストカバレッジの向上
- コンポーネントテストの完全実装
- エッジケースのテスト追加
- E2Eテストの導入検討

### 2. パフォーマンステスト
- レンダリング性能のテスト
- メモリリークの検出
- バンドルサイズの監視

### 3. アクセシビリティテスト
- スクリーンリーダー対応
- キーボードナビゲーション
- カラーコントラスト

## トラブルシューティング

### よくある問題

1. **axios のモックエラー**
   - Jest設定で `transformIgnorePatterns` を確認
   - モックの実装を確認

2. **React Query のエラー**
   - QueryClient の設定を確認
   - テスト用プロバイダーの使用

3. **非同期テストの問題**
   - `waitFor` の適切な使用
   - タイムアウト設定の調整

## 参考資料

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Query Testing](https://react-query.tanstack.com/guides/testing)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 