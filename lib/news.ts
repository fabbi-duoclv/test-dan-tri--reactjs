/* ============================================================
   データアクセス層: 記事の取得・並び替え・関連記事
   元の js/main.js のロジックを移植。
   ============================================================ */
import { ARTICLES } from "./articles";
import type { Article } from "./types";

/** slug → 表示名 */
export const CATEGORIES: Record<string, string> = {
  shakai: "社会",
  kokusai: "国際",
  keizai: "経済",
  supotsu: "スポーツ",
  entame: "エンタメ",
  tech: "テクノロジー",
  kenko: "健康",
  kyoiku: "教育",
  kurashi: "暮らし",
};

/** ナビゲーションの表示順 */
export const NAV_CATEGORIES = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>;

export function categoryName(slug: string): string {
  return CATEGORIES[slug] ?? "ニュース";
}

/** picsum のプレースホルダー URL */
export function imgUrl(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function getArticleById(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

export function getByCategory(slug: string): Article[] {
  return ARTICLES.filter((a) => a.catSlug === slug);
}

/** 数字のみ抽出して views を比較 */
function viewsValue(a: Article): number {
  return parseInt(a.views.replace(/\D/g, ""), 10) || 0;
}

/** よく読まれている順 */
export function mostRead(limit = 6): Article[] {
  return [...ARTICLES].sort((a, b) => viewsValue(b) - viewsValue(a)).slice(0, limit);
}

/** 最新順（order が大きいほど新しい） */
export function newest(limit = 6): Article[] {
  return [...ARTICLES].sort((a, b) => b.order - a.order).slice(0, limit);
}

/** 関連記事: 同一カテゴリーを優先し、その他を続ける */
export function relatedArticles(article: Article, limit = 4): Article[] {
  return ARTICLES.filter((a) => a.id !== article.id)
    .sort(
      (a, b) =>
        Number(b.catSlug === article.catSlug) - Number(a.catSlug === article.catSlug),
    )
    .slice(0, limit);
}

export const articleHref = (a: Pick<Article, "id">): string => `/article/${a.id}`;
export const categoryHref = (slug: string): string => `/category/${slug}`;
