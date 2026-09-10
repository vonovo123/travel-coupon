import type { Metadata } from "next";
import type { OfferTypeInfo, PlatformInfo } from "@/types/coupon";

export const siteName = "코드세이아";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const organizationId = `${siteUrl.replace(/\/$/, "")}/#organization`;
export const websiteId = `${siteUrl.replace(/\/$/, "")}/#website`;

/** JSON-LD·canonical용 절대 URL. `path`는 `/` 또는 `/agoda`. */
export function absoluteUrl(path = "/"): string {
  const base = siteUrl.replace(/\/$/, "");

  if (!path || path === "/") {
    return base;
  }

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultDescription =
  "할인 코드를 찾아 헤매는 여행자의 종착지, 코드세이아. 아고다·마이리얼트립·트립닷컴·호텔스닷컴·클룩·Nol·익스피디아·부킹닷컴·야놀자·여기어때·에어비앤비의 숨겨진 할인코드를 한곳에서 확인하세요.";

export function getFreshness() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date());

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
  };
}

export function buildHomeMetadata(): Metadata {
  const { year, month } = getFreshness();
  const title = `${year}년 ${month}월 여행 후기·숙소 내돈내산`;
  const description = `${year}년 ${month}월 기준. 국내 펜션·워터파크, 일본 오사카·시즈오카·후지산, 튀르키예·상하이·미국 서부 등 내돈내산 여행 후기와 숙소·투어 팁을 코드세이아 항해일지에서 확인하세요.`;

  return {
    title,
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
      title: `${title} | ${siteName}`,
      description,
      locale: "ko_KR",
      type: "website",
      url: "/",
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}

export function platformMetadata(platform: PlatformInfo): Metadata {
  const { year, month } = getFreshness();
  const title = `${year}년 ${month}월 ${platform.name} 할인코드`;
  const description = `${year}년 ${month}월 ${platform.name} 숙소·항공·투어 할인코드. 코드세이아에서 복사한 뒤 ${platform.name} 결제창에 붙여넣으세요.`;
  const path = `/${platform.slug}`;
  const shouldIndex = platform.listed;

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
      index: shouldIndex,
      follow: shouldIndex,
    },
    alternates: {
      canonical: shouldIndex ? path : undefined,
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

export function offerTypeMetadata(hub: OfferTypeInfo): Metadata {
  const { year, month } = getFreshness();
  const title = `${year}년 ${month}월 ${hub.label}`;
  const description = `${year}년 ${month}월 ${hub.label}. ${hub.shortDescription}`;
  const path = `/${hub.slug}`;
  const shouldIndex = hub.listed;

  return {
    title,
    description,
    keywords: [
      hub.searchKeyword,
      `${hub.searchKeyword} ${year}`,
      `${hub.name} 쿠폰 ${month}월`,
      `${hub.label} ${month}월`,
      "여행 할인코드",
    ],
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
    },
    alternates: {
      canonical: shouldIndex ? path : undefined,
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

export function buildPrivacyMetadata(): Metadata {
  const title = "개인정보 처리방침·제휴 고지";
  const description =
    "코드세이아 개인정보 처리방침과 제휴 링크 고지입니다. 회원가입 없이 후기·할인코드를 안내하며, 일부 링크는 제휴 링크일 수 있습니다.";

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/privacy",
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      locale: "ko_KR",
      type: "website",
      url: "/privacy",
      siteName,
    },
  };
}
