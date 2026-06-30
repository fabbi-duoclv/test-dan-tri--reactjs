import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/Topbar";
import SiteHeader from "@/components/SiteHeader";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ニュース速報24 - その日の最新ニュースを素早くお届け",
    template: "%s - ニュース速報24",
  },
  description:
    "ニュース速報24 - 社会、国際、経済、スポーツ、エンタメ、テクノロジー、暮らしの最新ニュースを素早く更新。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://picsum.photos" />
        <script
          src="http://localhost:4010/si.js"
          data-key="pk_971b58d1adee8f499fe5f1b72d1243dcc354475eedf8b976"
          data-api="http://localhost:4001"
          async
        />
      </head>
      <body>
        <Topbar />
        <SiteHeader />
        <MainNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
