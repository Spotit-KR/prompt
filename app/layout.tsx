import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

import { TrackingScript } from "@/components/tracking-script";

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
  icons: {
    icon: "/icon.svg",
  },
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
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-29RHHV61W0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-29RHHV61W0');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v9m34h0zaf");
          `}
        </Script>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
