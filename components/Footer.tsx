import Link from "next/link";
import { categoryHref } from "@/lib/news";

const FOOTER_CATS: Array<[string, string]> = [
  ["shakai", "社会"],
  ["keizai", "経済"],
  ["supotsu", "スポーツ"],
  ["tech", "テクノロジー"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span className="brand__mark">速</span>
              <span>ニュース速報24</span>
            </Link>
            <p>
              速く、正確に、24時間更新。これはデモ用テンプレートで、内容と画像はすべてイメージです。
            </p>
          </div>
          <div>
            <h4>カテゴリー</h4>
            <ul>
              {FOOTER_CATS.map(([slug, name]) => (
                <li key={slug}>
                  <Link href={categoryHref(slug)}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>私たちについて</h4>
            <ul>
              <li><a href="#">会社概要</a></li>
              <li><a href="#">お問い合わせ</a></li>
              <li><a href="#">広告掲載</a></li>
              <li><a href="#">採用情報</a></li>
            </ul>
          </div>
          <div>
            <h4>フォロー</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">RSS</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span suppressHydrationWarning>{year}</span> ニュース速報24 — デモ用テンプレート</span>
          <span>ニュースサイトのレイアウトを参考にしたデザイン</span>
        </div>
      </div>
    </footer>
  );
}
