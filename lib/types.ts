export interface Article {
  /** URL に使用する識別子: /article/[id] */
  id: string;
  /** 表示用カテゴリー名（例: 社会） */
  cat: string;
  /** カテゴリー slug（例: shakai）: /category/[slug] */
  catSlug: string;
  title: string;
  /** 短い要約 */
  sapo: string;
  author: string;
  /** 例: "2026/06/16 08:30" */
  date: string;
  /** 例: "12,480" */
  views: string;
  /** order が大きいほど新しい（「最新」の並び替えに使用） */
  order: number;
  /** picsum 用の seed */
  img: string;
  tags: string[];
  /** HTML 段落の配列 */
  body: string[];
}

export type CategorySlug =
  | "shakai"
  | "kokusai"
  | "keizai"
  | "supotsu"
  | "entame"
  | "tech"
  | "kenko"
  | "kyoiku"
  | "kurashi";
