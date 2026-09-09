import type { Metadata } from "next";
import type { PlatformInfo } from "@/types/coupon";

export const siteName = "코드세이아";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const defaultDescription =
  "할인 코드를 찾아 헤매는 여행자의 종착지, 코드세이아. 아고다·마이리얼트립·트립닷컴·호텔스닷컴·클룩·Nol의 숨겨진 할인코드를 한곳에서 확인하세요.";

export function getFreshness() {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

export function buildHomeMetadata(): Metadata {
  const { year, month } = getFreshness();
  const title = `${year}년 ${month}월 여행 후기·숙소 내돈내산 | 코드세이아 항해일지`;
  const description = `${year}년 ${month}월 기준. 국내 펜션·워터파크, 일본 오사카·시즈오카·후지산, 튀르키예·상하이·미국 서부 등 내돈내산 여행 후기와 숙소·투어 팁을 코드세이아 항해일지에서 확인하세요.`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      `${year}년 여행 후기`,
      `${year}년 ${month}월 숙소 후기`,
      "내돈내산 호텔 후기",
      "일본 여행 후기",
      "오사카 숙소 추천",
      "반려견 동반 펜션",
      "워터파크 숙소 후기",
      "코드세이아 항해일지",
      "여행 할인코드",
    ],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      locale: "ko_KR",
      type: "website",
      url: "/",
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function platformMetadata(platform: PlatformInfo): Metadata {
  const { year, month } = getFreshness();
  const title = `${year}년 ${month}월 ${platform.name} 할인코드`;
  const description = `${year}년 ${month}월 기준 ${platform.name} 숙소·항공·투어 할인코드입니다. 코드세이아에서 복사한 뒤 결제창에 붙여넣으세요. ${defaultDescription}`;
  const path = `/${platform.slug}`;

  return {
    title,
    description,
    keywords: [
      `${platform.name} 할인코드 ${year}`,
      `${platform.name} 쿠폰 ${month}월`,
      `${platform.name} 프로모션 코드`,
      `${platform.name} 추가 할인`,
    ],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      locale: "ko_KR",
      type: "website",
      url: path,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
