import "./globals.css";
import Providers from "./providers";
import { Nanum_Gothic } from "next/font/google";
import Header from "@/app/components/header/header";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={nanumGothic.className}>
        <div id="modal-root"></div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
