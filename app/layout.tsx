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
    "ニュース速報24",
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
          data-key="pk_d9be43dcc711bda2e8074abaa6d7f80521bda00e4a11cc2f"
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
