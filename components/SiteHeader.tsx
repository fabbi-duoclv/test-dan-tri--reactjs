"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href="/" aria-label="ニュース速報24 - トップページ">
          <span className="brand__mark">速</span>
          <span>ニュース速報24</span>
          <span className="brand__tag">毎日いちばん早いニュース</span>
        </Link>

        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label className="visually-hidden" htmlFor="q">
            検索
          </label>
          <input id="q" type="search" placeholder="ニュースを検索..." />
          <button type="submit" aria-label="検索">
            🔍
          </button>
        </form>

        <div className="hotline">
          お問い合わせ
          <br />
          <strong>03-1234-5678</strong>
        </div>
      </div>
    </header>
  );
}
