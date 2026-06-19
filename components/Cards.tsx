import Link from "next/link";
import { articleHref, imgUrl } from "@/lib/news";
import type { Article } from "@/lib/types";

interface ThumbProps {
  href: string;
  seed: string;
  w: number;
  h: number;
  alt?: string;
  eager?: boolean;
}

/** 画像つきリンク（.thumb ラッパー） */
export function Thumb({ href, seed, w, h, alt = "", eager = false }: ThumbProps) {
  return (
    <Link className="thumb" href={href}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgUrl(seed, w, h)}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
      />
    </Link>
  );
}

/** カードグリッド用のカード */
export function Card({
  article,
  showSapo = false,
  meta,
}: {
  article: Article;
  showSapo?: boolean;
  meta: string;
}) {
  const href = articleHref(article);
  return (
    <article className="card">
      <Thumb href={href} seed={article.img} w={400} h={250} />
      <h4>
        <Link href={href}>{article.title}</Link>
      </h4>
      {showSapo && <p className="sapo">{article.sapo}</p>}
      <div className="meta">{meta}</div>
    </article>
  );
}

/** 横並びリスト（news-list）の1行 */
export function NewsRow({
  article,
  showSapo = false,
  meta,
}: {
  article: Article;
  showSapo?: boolean;
  meta?: string;
}) {
  const href = articleHref(article);
  return (
    <li>
      <Thumb href={href} seed={article.img} w={180} h={135} />
      <div>
        <h4>
          <Link href={href}>{article.title}</Link>
        </h4>
        {showSapo && <p className="sapo">{article.sapo}</p>}
        <div className="meta">{meta ?? `${article.cat} ・ ${article.date}`}</div>
      </div>
    </li>
  );
}

/** ヒーロー横の小カード */
export function Mini({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article className="mini">
      <Thumb href={href} seed={article.img} w={220} h={165} />
      <h4>
        <Link href={href}>{article.title}</Link>
      </h4>
    </article>
  );
}
