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

## デプロイ

### AWS Amplifyへのデプロイ

このプロジェクトはAWS AmplifyでのCI/CDデプロイに対応しています。

#### 1. Amplifyアプリの作成

1. [AWS Amplifyコンソール](https://console.aws.amazon.com/amplify/)にアクセス
2. 「新しいアプリをホスト」→「GitHubから開始」を選択
3. このリポジトリ（`gabax2pc/news_front`）を選択
4. ブランチ（`main`）を選択

#### 2. ビルド設定

Amplifyは自動的に`amplify.yml`を検出してビルド設定を適用します。
手動で設定する場合は以下の設定を使用：

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### 3. 環境変数の設定

Amplifyコンソールで以下の環境変数を設定：

| 変数名 | 値（例） | 説明 |
|--------|----------|------|
| `REACT_APP_API_BASE_URL` | `https://api.example.com` | バックエンドAPIのURL |
| `REACT_APP_ENV` | `production` | 環境識別子 |
| `REACT_APP_SITE_URL` | `https://your-app.amplifyapp.com` | サイトURL |

#### 4. カスタムドメインの設定（オプション）

1. Amplifyコンソールで「ドメイン管理」を選択
2. カスタムドメインを追加
3. DNS設定を更新

#### 5. デプロイの確認

- プッシュ時の自動デプロイ
- プルリクエスト時のプレビュー環境
- ビルドログの確認

### 手動デプロイ

静的ホスティングサービスへの手動デプロイ：

```bash
# ビルド
npm run build

# buildディレクトリの内容をホスティングサービスにアップロード
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

4. **Amplifyデプロイエラー**
   - 環境変数が正しく設定されていることを確認
   - ビルドログでエラーの詳細を確認
   - `amplify.yml` の設定を確認

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。 