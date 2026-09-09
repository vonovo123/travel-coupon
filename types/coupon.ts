export type Platform =
  | "호텔스닷컴"
  | "트립닷컴"
  | "마이리얼트립"
  | "아고다"
  | "클룩"
  | "Nol"
  | "익스피디아"
  | "부킹닷컴"
  | "야놀자"
  | "여기어때"
  | "에어비앤비";

export type Category = "국내" | "해외" | "공통";

export interface PlatformInfo {
  name: Platform;
  slug: string;
  color: string;
  textClass: string;
  affiliateLink: string;
  initial: string;
}

export interface Coupon {
  id: string;
  platform: Platform;
  logoUrl: string;
  category: Category;
  title: string;
  description: string;
  code: string;
  affiliateLink: string;
  validUntil: string;
}

export interface FaqItem {
  id: string;
  /** 없으면 홈(`/`) 공통. 있으면 해당 플랫폼 페이지 전용. */
  platform?: Platform;
  question: string;
  answer: string;
}

export interface GuideItem {
  id: string;
  platform: Platform;
  title: string;
  body: string;
}

export interface PaymentTip {
  id: string;
  /** 없으면 홈(`/`) 공통. 있으면 해당 플랫폼 페이지 전용. */
  platform?: Platform;
  title: string;
  body: string;
}

/** 네이버 블로그 여행후기. 이후 RSS/API 연동 시 동일 형태로 매핑. */
export interface ReviewPost {
  id: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string;
  blogUrl: string;
  publishedAt: string;
}
