"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_CATEGORIES, CATEGORIES, categoryHref } from "@/lib/news";

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <nav className="main-nav" aria-label="カテゴリー">
      <div className="container">
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="メニューを開く"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <ul className={open ? "open" : undefined}>
          <li>
            <Link href="/" aria-current={isHome ? "page" : undefined}>
              トップ
            </Link>
          </li>
          {NAV_CATEGORIES.map((slug) => {
            const active = pathname === categoryHref(slug);
            return (
              <li key={slug}>
                <Link
                  href={categoryHref(slug)}
                  aria-current={active ? "page" : undefined}
                >
                  {CATEGORIES[slug]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
