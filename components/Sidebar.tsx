"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { articleHref } from "@/lib/news";
import type { Article } from "@/lib/types";

type RankItem = Pick<Article, "id" | "title">;

interface SidebarProps {
  read: RankItem[];
  latest: RankItem[];
  /** 追加ウィジェット（例: トップページの「ピックアップ」） */
  extra?: ReactNode;
}

function RankList({ items }: { items: RankItem[] }) {
  return (
    <ul className="rank-list">
      {items.map((a) => (
        <li key={a.id}>
          <Link href={articleHref(a)}>{a.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar({ read, latest, extra }: SidebarProps) {
  const [tab, setTab] = useState<"read" | "new">("read");

  return (
    <aside className="sidebar" aria-label="よく読まれている・最新のニュース">
      <div className="widget">
        <div className="tabs" role="tablist" aria-label="よく読まれている / 最新">
          <button
            role="tab"
            id="tab-read"
            aria-controls="panel-read"
            aria-selected={tab === "read"}
            onClick={() => setTab("read")}
          >
            よく読まれている
          </button>
          <button
            role="tab"
            id="tab-new"
            aria-controls="panel-new"
            aria-selected={tab === "new"}
            onClick={() => setTab("new")}
          >
            最新
          </button>
        </div>
        <div className="widget__body">
          <div role="tabpanel" id="panel-read" aria-labelledby="tab-read" hidden={tab !== "read"}>
            <RankList items={read} />
          </div>
          <div role="tabpanel" id="panel-new" aria-labelledby="tab-new" hidden={tab !== "new"}>
            <RankList items={latest} />
          </div>
        </div>
      </div>

      {extra}
    </aside>
  );
}
