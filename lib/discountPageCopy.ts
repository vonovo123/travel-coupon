import { offerTypeNames } from "@/data/offerTypes";
import { descriptionLines } from "@/lib/descriptionLines";
import { getFreshness } from "@/lib/seo";
import type { Coupon, OfferType } from "@/types/coupon";

export const offerTypeOrder: OfferType[] = [
  "stay",
  "tour",
  "flight",
  "package",
];

const sectionLabels: Record<OfferType, string> = {
  stay: "숙소 할인코드",
  tour: "투어·티켓 할인코드",
  flight: "항공권 할인코드",
  package: "패키지 할인코드",
};

/** 카드·사이드바 이미지 alt. 월은 쿠폰에 있으면 그걸 쓰고, 없으면 서울 기준 이번 달. */
export function discountImageAlt(options: {
  platformName: string;
  year?: number;
  month?: number;
  title?: string;
}): string {
  const freshness = getFreshness();
  const year = options.year ?? freshness.year;
  const month = options.month ?? freshness.month;
  const subject = options.title
    ? `${options.platformName} ${options.title}`
    : `${options.platformName} 할인코드`;

  return `${year}년 ${month}월 ${subject}`;
}

export function couponTypePhrase(coupons: Coupon[]): string {
  const types = offerTypeOrder.filter((type) =>
    coupons.some((coupon) => coupon.offerType === type),
  );

  return types.map((type) => offerTypeNames[type]).join("·");
}

export function couponSectionHeading(
  type: OfferType,
  platformName?: string,
): string {
  const label = sectionLabels[type];
  return platformName ? `${platformName} ${label}` : label;
}

export function groupCouponsByOfferType(coupons: Coupon[]) {
  return offerTypeOrder
    .map((type) => ({
      type,
      coupons: coupons.filter((coupon) => coupon.offerType === type),
    }))
    .filter((group) => group.coupons.length > 0);
}

function conditionSnippets(coupons: Coupon[]): string[] {
  const snippets: string[] = [];
  const seen = new Set<string>();

  for (const coupon of coupons) {
    for (const line of descriptionLines(coupon.description)) {
      if (!line || seen.has(line)) {
        continue;
      }

      seen.add(line);
      snippets.push(line.length > 48 ? `${line.slice(0, 46)}…` : line);
      if (snippets.length === 2) {
        return snippets;
      }
    }
  }

  return snippets;
}

export function platformPageTitle(platformName: string, coupons: Coupon[]): string {
  const { year, month } = getFreshness();
  const types = couponTypePhrase(coupons);
  const base = `${year}년 ${month}월 ${platformName} 할인코드`;

  return types ? `${base} ${types}` : base;
}

export function hubPageTitle(hubLabel: string): string {
  const { year, month } = getFreshness();
  return `${year}년 ${month}월 ${hubLabel}`;
}

export function discountPageDescription(
  subject: string,
  coupons: Coupon[],
  applyHint: string,
): string {
  const { year, month } = getFreshness();
  const types = couponTypePhrase(coupons);
  const typeBit = types ? ` ${types}` : "";
  const conditions = conditionSnippets(coupons);
  const conditionBit = conditions.length > 0 ? ` ${conditions.join(" · ")}` : "";

  return `${year}년 ${month}월 ${subject}${typeBit} 할인코드.${conditionBit} ${applyHint}`;
}

export function discountPageLead(
  subject: string,
  coupons: Coupon[],
  applyHint: string,
): string {
  const { year, month } = getFreshness();
  const types = couponTypePhrase(coupons);
  const typeBit = types ? ` ${types}` : "";

  return `${year}년 ${month}월 ${subject}${typeBit} 할인코드입니다. ${applyHint}`;
}

export function hubPageDescription(
  hubLabel: string,
  shortDescription: string,
  coupons: Coupon[],
): string {
  const { year, month } = getFreshness();
  const conditions = conditionSnippets(coupons);
  const conditionBit = conditions.length > 0 ? ` ${conditions.join(" · ")}` : "";

  return `${year}년 ${month}월 ${hubLabel}.${conditionBit} ${shortDescription}`;
}
