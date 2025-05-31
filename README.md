# Animato - ニュース記事管理システム

FastAPI + Meilisearchを使用したバックエンドAPIと連携する、モダンなニュース記事管理フロントエンドアプリケーションです。

## 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **React Router** - ルーティング
- **React Query** - サーバーステート管理
- **React Hook Form** - フォーム管理
- **Axios** - HTTP クライアント
- **Lucide React** - アイコン
- **date-fns** - 日付操作

### バックエンド（別途必要）
- FastAPI + Meilisearch

## 機能

### 📝 記事管理
- ✅ 記事一覧表示（ページネーション対応）
- ✅ 記事詳細表示
- ✅ 記事作成（リアルタイムプレビュー付き）
- ✅ 記事編集（リアルタイムプレビュー付き）
- ✅ 記事削除
- ✅ 下書き保存

### 🔍 検索・フィルタリング
- ✅ 全文検索（Meilisearch）
- ✅ カテゴリフィルタ
- ✅ 公開状態フィルタ
- ✅ タグフィルタ
- ✅ ソート機能

### 🎨 UI/UX
- ✅ レスポンシブデザイン
- ✅ モダンで直感的なUI
- ✅ ローディング状態
- ✅ エラーハンドリング
- ✅ 日本語対応

## セットアップ

### 前提条件
- Node.js 16.0.0 以上
- npm または yarn
- バックエンドAPI（FastAPI + Meilisearch）が起動していること

### インストール

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   
   プロジェクトルートに `.env` ファイルを作成：
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8000
   ```

3. **開発サーバーの起動**
   ```bash
   npm start
   ```

   ブラウザで http://localhost:3000 にアクセス

### ビルド

本番用ビルドを作成：
```bash
npm run build
```

## API仕様

このフロントエンドは以下のAPIエンドポイントを使用します：

- `GET /api/v1/news` - 記事一覧取得
- `POST /api/v1/news` - 記事作成
- `GET /api/v1/news/search` - 記事検索
- `GET /api/v1/news/{id}` - 特定記事取得
- `PUT /api/v1/news/{id}` - 記事更新
- `DELETE /api/v1/news/{id}` - 記事削除

詳細は `openapi.yaml` を参照してください。

## プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
│   └── Layout.tsx      # レイアウトコンポーネント
├── hooks/              # カスタムフック
│   └── useArticles.ts  # 記事関連のReact Queryフック
├── pages/              # ページコンポーネント
│   ├── ArticleList.tsx # 記事一覧ページ
│   ├── ArticleDetail.tsx # 記事詳細ページ
│   ├── ArticleCreate.tsx # 記事作成ページ
│   └── ArticleEdit.tsx # 記事編集ページ
├── services/           # API関連
│   └── api.ts         # APIクライアント
├── types/              # TypeScript型定義
│   └── api.ts         # API関連の型
├── App.tsx            # メインアプリケーション
├── index.tsx          # エントリーポイント
└── index.css          # グローバルスタイル
```

## 開発ガイド

### 新しいページの追加

1. `src/pages/` に新しいコンポーネントを作成
2. `src/App.tsx` にルートを追加
3. 必要に応じて `src/components/Layout.tsx` にナビゲーションを追加

### 新しいAPIエンドポイントの追加

1. `src/types/api.ts` に型定義を追加
2. `src/services/api.ts` にAPIクライアントメソッドを追加
3. `src/hooks/useArticles.ts` にReact Queryフックを追加

### スタイルのカスタマイズ

- `tailwind.config.js` でTailwindの設定をカスタマイズ
- `src/index.css` でグローバルスタイルを追加

## トラブルシューティング

### よくある問題

1. **APIに接続できない**
   - バックエンドサーバーが起動していることを確認
   - `.env` ファイルの `REACT_APP_API_BASE_URL` が正しいことを確認

2. **依存関係のエラー**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScriptエラー**
   - 型定義が最新であることを確認
   - `npm run build` でビルドエラーをチェック

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。 