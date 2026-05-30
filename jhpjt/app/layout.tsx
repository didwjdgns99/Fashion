import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { Nanum_Gothic } from "next/font/google";
import Header from "@/app/components/header/header";
import type { Metadata } from "next";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fashion-jh.shop"),

  title: "Fashion JH",
  description:
    "패션 쇼핑몰 JH의 공식 웹사이트입니다. 최신 트렌드와 다양한 패션 아이템을 만나보세요.",
  openGraph: {
    url: "https://www.fashion-jh.shop",
    siteName: "Fashion JH",
    images: [
      {
        url: "/image/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fashion JH - 최신 패션 트렌드와 다양한 아이템을 만나보세요",
      },
    ],

    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={nanumGothic.className}>
        <div id="modal-root"></div>
        <Providers>
          <Header />
          <Toaster position="top-center" richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
