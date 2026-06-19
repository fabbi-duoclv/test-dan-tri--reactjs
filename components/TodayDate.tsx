"use client";

import { useEffect, useState } from "react";

const DAYS = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

/** トップバーの日本語の日付（クライアントのローカル日付で表示） */
export default function TodayDate() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const d = new Date();
    setLabel(`${d.toLocaleDateString("ja-JP")}（${DAYS[d.getDay()]}）`);
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
