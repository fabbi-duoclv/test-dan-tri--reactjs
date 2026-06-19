import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Card, Mini, NewsRow, Thumb } from "@/components/Cards";
import {
  articleHref,
  categoryHref,
  getArticleById,
  imgUrl,
  mostRead,
  newest,
} from "@/lib/news";
import type { Article } from "@/lib/types";

/** トップは編集部がキュレーションするページのため、記事を明示的に参照する */
function byId(id: string): Article {
  const a = getArticleById(id);
  if (!a) throw new Error(`Article not found: ${id}`);
  return a;
}

function SectionHead({ title, more }: { title: string; more?: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {more && <Link href={more}>すべて見る »</Link>}
    </div>
  );
}

export default function HomePage() {
  const lead = byId("metro-3");
  const read = mostRead();
  const latest = newest();

  const pickup = (
    <div className="widget">
      <div className="widget__head">ピックアップ</div>
      <div className="widget__body">
        <article className="mini" style={{ gridTemplateColumns: "100px 1fr" }}>
          <Thumb href={articleHref(byId("ai-iryo"))} seed="aihealth" w={200} h={150} />
          <h4>
            <Link href={articleHref(byId("ai-iryo"))}>特集：医療分野における人工知能</Link>
          </h4>
        </article>
        <article
          className="mini"
          style={{ gridTemplateColumns: "100px 1fr", marginTop: "14px" }}
        >
          <Thumb href={articleHref(byId("ryoko"))} seed="travel" w={200} h={150} />
          <h4>
            <Link href={articleHref(byId("ryoko"))}>視点：夏の旅行とインフラの課題</Link>
          </h4>
        </article>
      </div>
    </div>
  );

  return (
    <main className="container">
      <div className="layout">
        <div className="main-col">
          {/* Hero */}
          <section className="hero" aria-label="注目ニュース">
            <article className="hero__lead">
              <Link className="thumb" href={articleHref(lead)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl("metro", 800, 450)}
                  alt="注目ニュース"
                  width={800}
                  height={450}
                  loading="eager"
                />
              </Link>
              <span className="tag">社会</span>
              <h3>
                <Link href={articleHref(lead)}>{lead.title}</Link>
              </h3>
              <p className="sapo">
                全長12キロ・10駅の路線で、4年後の完成を見込む。都市インフラの転換点になると評価されている。
              </p>
            </article>

            <div className="hero__side">
              <Mini article={byId("kin-kakaku")} />
              <Mini article={byId("daihyo")} />
              <Mini article={byId("ev")} />
            </div>
          </section>

          {/* 社会 */}
          <SectionHead title="社会" more={categoryHref("shakai")} />
          <section className="card-grid" aria-label="社会ニュース">
            <Card article={byId("dosha")} showSapo meta="2時間前" />
            <Card article={byId("kotsu-bassoku")} showSapo meta="3時間前" />
            <Card article={byId("kyushoku")} showSapo meta="5時間前" />
          </section>

          {/* 経済 */}
          <SectionHead title="経済" more={categoryHref("keizai")} />
          <section aria-label="経済ニュース">
            <ul className="news-list">
              <NewsRow article={byId("yushutsu")} meta="経済 ・ 1時間前" />
              <NewsRow article={byId("kinri")} meta="経済 ・ 2時間前" />
              <NewsRow article={byId("fudosan")} meta="経済 ・ 4時間前" />
            </ul>
          </section>

          {/* スポーツ */}
          <SectionHead title="スポーツ" more={categoryHref("supotsu")} />
          <section className="card-grid" aria-label="スポーツニュース">
            <Card article={byId("shobu")} meta="30分前" />
            <Card article={byId("tennis")} meta="1時間前" />
            <Card article={byId("daihyo")} meta="2時間前" />
          </section>

          {/* テクノロジー & 暮らし */}
          <SectionHead title="テクノロジー＆暮らし" more={categoryHref("tech")} />
          <section className="card-grid" aria-label="テクノロジーと暮らしのニュース">
            <Card article={byId("ev")} showSapo meta="テクノロジー ・ 1時間前" />
            <Card article={byId("ai-iryo")} showSapo meta="テクノロジー ・ 3時間前" />
            <Card article={byId("ryoko")} showSapo meta="暮らし ・ 5時間前" />
          </section>
        </div>

        <Sidebar read={read} latest={latest} extra={pickup} />
      </div>
    </main>
  );
}
