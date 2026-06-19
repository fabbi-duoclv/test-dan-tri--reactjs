import TodayDate from "./TodayDate";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__meta">
          <TodayDate />
          <span>東京 28℃</span>
        </div>
        <div className="topbar__links">
          <a href="#">ログイン</a>
          <a href="#">RSS</a>
          <a href="#">お問い合わせ</a>
        </div>
      </div>
    </div>
  );
}
