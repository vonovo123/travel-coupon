export type Platform = string;

export type Category = "국내" | "해외" | "공통";

/** 상품 유형. 허브 URL은 국내/해외와 조합한다. 예: /overseas-stay */
export type OfferType = "stay" | "tour" | "flight" | "package";

/** 상품 허브는 국내·해외만 나눈다. 쿠폰 category `공통`은 양쪽 페이지에 같이 둔다. */
export type HubRegion = Exclude<Category, "공통">;

export interface OfferTypeInfo {
  type: OfferType;
  category: HubRegion;
  slug: string;
  name: string;
  label: string;
  searchKeyword: string;
  shortDescription: string;
}

export interface PlatformInfo {
  name: Platform;
  slug: string;
  color: string;
  textClass: string;
  affiliateLink: string;
  initial: string;
  /** false면 메뉴·사이트맵에서 숨기고 noindex. 직접 URL은 유지. */
  listed: boolean;
}

export interface Coupon {
  id: string;
  platform: Platform;
  initial: string;
  logoUrl: string;
  offerType: OfferType;
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
  offerType?: OfferType;
  category?: HubRegion;
  question: string;
  answer: string;
}

export interface GuideItem {
  id: string;
  platform?: Platform;
  offerType?: OfferType;
  category?: HubRegion;
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
