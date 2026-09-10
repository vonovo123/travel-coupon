import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { buildHomeMetadata, siteName, siteUrl } from "@/lib/seo";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-serif",
});

export function generateMetadata(): Metadata {
  const home = buildHomeMetadata();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: home.description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: home.openGraph,
    twitter: home.twitter,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSerifKr.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="overflow-x-clip bg-light-sand font-sans text-deep-navy antialiased">
        {children}
      </body>
    </html>
  );
}
