import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PP - 프롬프트 실력을 키우는 가장 빠른 방법",
  description:
    "AI 시대, 프롬프트 엔지니어링 실력을 체계적으로 키워드립니다. 이미지 묘사부터 상황 기반 프롬프팅까지.",
  generator: "v0.app",
  keywords: [
    "PP",
    "프롬프트 실력",
    "프롬프트 엔지니어링",
    "프롬프트 연습",
    "프롬프트 트레이닝",
    "프롬프트 트레이너",
    "AI 시대",
    "프롬프트 역량",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script src="/env-config.js" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
