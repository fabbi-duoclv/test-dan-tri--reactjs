import Link from "next/link";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { NewsRow, Thumb } from "@/components/Cards";
import {
  articleHref,
  categoryName,
  getByCategory,
  getAllArticles,
  mostRead,
  newest,
  NAV_CATEGORIES,
} from "@/lib/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NAV_CATEGORIES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: categoryName(slug) };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const name = categoryName(slug);

  const inCat = getByCategory(slug);
  // 元の挙動: 該当記事がなければ全記事を表示
  const list = inCat.length ? inCat : getAllArticles();
  const lead = list[0];
  const rest = lead ? list.slice(1) : list;

  return (
    <main className="container">
      <nav className="breadcrumb" aria-label="パンくずリスト">
        <Link href="/">トップ</Link>
        <span>›</span>
        <span>{name}</span>
      </nav>

      <div className="layout">
        <div className="main-col">
          <div className="section-head">
            <h2>{name}</h2>
          </div>

          {lead && (
            <article className="hero__lead" style={{ marginBottom: "24px" }}>
              <Thumb href={articleHref(lead)} seed={lead.img} w={800} h={450} eager />
              <h3>
                <Link href={articleHref(lead)}>{lead.title}</Link>
              </h3>
              <p className="sapo">{lead.sapo}</p>
            </article>
          )}

          <ul className="news-list">
            {rest.map((a) => (
              <NewsRow key={a.id} article={a} showSapo />
            ))}
          </ul>

          <div style={{ textAlign: "center", margin: "28px 0" }}>
            <a href="#" className="tag pill">
              もっと見る »
            </a>
          </div>
        </div>

        <Sidebar read={mostRead()} latest={newest()} />
      </div>
    </main>
  );
}
