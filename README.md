# ニュース速報24 — Next.js 版

静的ニュースサイトテンプレートを **Next.js (App Router) + TypeScript + Tailwind CSS v4** に移植したもの。
元の `nihon-news`（素の HTML/CSS/JS）と同じ見た目・データ構成を保ちつつ、
ルーティングと描画を React コンポーネント化しています。

実在する報道機関のロゴ・名称・記事は含まれていません。ブランド名と内容は自分のものに差し替えてください。

## 構成

```
app/
├── layout.tsx              # 共通レイアウト（トップバー / ヘッダー / ナビ / フッター）
├── globals.css             # Tailwind v4 + デザイントークン(@theme) + コンポーネントCSS
├── page.tsx                # トップ: ヒーロー + 4カテゴリーブロック + サイドバー
├── category/[slug]/page.tsx# カテゴリーページ（/category/keizai など）
└── article/[id]/page.tsx   # 記事詳細（/article/metro-3 など）
components/                  # Topbar, SiteHeader, MainNav, Sidebar, Footer, Cards …
lib/
├── types.ts                # Article 型
├── articles.ts             # 記事データ（デモ14本）— 記事の追加・編集はここ
└── news.ts                 # 取得 / 並び替え / 関連記事 + カテゴリー定義
```

## 記事の追加・編集

`lib/articles.ts` の `ARTICLES` 配列にオブジェクトを1つ追加します。
`order` が大きいほど新しい（「最新」タブの並び替えに使用）。
カテゴリー一覧・「よく読まれている / 最新」・「関連記事」はデータから自動生成されます。

| slug | 表示名 |
|------|--------|
| shakai | 社会 |
| kokusai | 国際 |
| keizai | 経済 |
| supotsu | スポーツ |
| entame | エンタメ |
| tech | テクノロジー |
| kenko | 健康 |
| kyoiku | 教育 |
| kurashi | 暮らし |

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（全ページを静的生成）
npm start        # 本番サーバー
```

## 元の静的版との違い

- ページ遷移は URL クエリ（`?cat=`, `?id=`）ではなく App Router の動的セグメント（`/category/[slug]`, `/article/[id]`）。
- 記事一覧・ランキング・関連記事はサーバー側で生成（SSG）。SEO 向けに `generateMetadata` でタイトルを出力。
- 記事詳細でリード画像を本文上部に表示（静的版では本文描画時に上書きされて消えていた挙動を修正）。
- 画像は引き続き `picsum.photos` のプレースホルダー。実画像に差し替え可。

## カスタマイズ

- **ブランド名 / カラー:** `app/globals.css` の `@theme` 内トークン（`--color-accent` など）と各コンポーネントの「ニュース速報24」。
- **内容:** `lib/articles.ts` を自分の記事に置き換え。
