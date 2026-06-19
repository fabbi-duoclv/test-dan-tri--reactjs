import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { NewsRow } from "@/components/Cards";
import {
  categoryHref,
  getAllArticles,
  getArticleById,
  imgUrl,
  mostRead,
  newest,
  relatedArticles,
} from "@/lib/news";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);
  return { title: article ? article.title : "記事" };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  const related = relatedArticles(article);

  return (
    <main className="container">
      <nav className="breadcrumb" aria-label="パンくずリスト">
        <Link href="/">トップ</Link>
        <span>›</span>
        <Link href={categoryHref(article.catSlug)}>{article.cat}</Link>
      </nav>

      <div className="layout">
        <article className="article">
          <span className="article__cat">{article.cat}</span>
          <h1 className="article__title">{article.title}</h1>
          <p className="article__sapo">{article.sapo}</p>

          <div className="article__meta">
            <span>{article.date}</span>
            <span>執筆: {article.author}</span>
            <span>👁 {article.views}</span>
          </div>

          <div className="article__body">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl(article.img, 800, 450)}
                alt={article.title}
                width={800}
                height={450}
                loading="eager"
              />
              <figcaption>{article.title}（イメージ写真）</figcaption>
            </figure>
            <div dangerouslySetInnerHTML={{ __html: article.body.join("\n") }} />
          </div>

          <p className="author">{article.author}</p>

          <div className="share" aria-label="シェア">
            <a href="#" aria-label="Facebookでシェア">f</a>
            <a href="#" aria-label="Xでシェア">X</a>
            <a href="#" aria-label="メールでシェア">@</a>
            <a href="#" aria-label="リンクをコピー">🔗</a>
          </div>

          <div className="tags">
            {article.tags.map((t) => (
              <a key={t} href="#">
                {t}
              </a>
            ))}
          </div>

          <div className="section-head">
            <h2>関連記事</h2>
          </div>
          <ul className="news-list">
            {related.map((a) => (
              <NewsRow key={a.id} article={a} />
            ))}
          </ul>
        </article>

        <Sidebar read={mostRead()} latest={newest()} />
      </div>
    </main>
  );
}
