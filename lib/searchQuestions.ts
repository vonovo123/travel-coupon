import { getFreshness } from "@/lib/seo";
import type { DirectFollowUp } from "@/data/directAnswers";
import type { Coupon } from "@/types/coupon";

function productPhrase(coupon: Coupon): string {
  const { title, offerType, category } = coupon;

  if (/Genius|지니어스/i.test(title)) {
    return "지니어스 할인코드";
  }
  if (/첫 예약|신규/.test(title)) {
    return "첫예약 쿠폰";
  }
  if (/장기|7박/.test(title)) {
    return "장기숙박 할인코드";
  }
  if (/주말/.test(title)) {
    return "주말 쿠폰";
  }
  if (/모텔/.test(title)) {
    return "모텔 쿠폰";
  }
  if (/펜션/.test(title)) {
    return "펜션 쿠폰";
  }
  if (/제주|부산/.test(title)) {
    return "제주 쿠폰";
  }
  if (/유니버설|일본/.test(title) && (offerType === "tour" || /투어|입장권/.test(title))) {
    return "일본 할인코드";
  }
  if (offerType === "flight" || /항공권/.test(title)) {
    return category === "국내" ? "국내 항공권 할인코드" : "항공권 할인코드";
  }
  if (offerType === "package" || /항공\+호텔|패키지/.test(title)) {
    return "항공호텔 패키지 할인코드";
  }
  if (offerType === "tour" || /투어|액티비티/.test(title)) {
    return category === "국내" ? "국내 투어 쿠폰" : "해외 투어 할인코드";
  }
  if (/입장권|레저/.test(title)) {
    return "레저 쿠폰";
  }
  if (category === "국내") {
    return "국내 숙소 쿠폰";
  }
  if (category === "해외") {
    return "해외 호텔 할인코드";
  }

  return "할인코드";
}

export function questionFromCoupon(coupon: Coupon): DirectFollowUp {
  const { year, month } = getFreshness();
  const question = `${year}년 ${month}월 ${coupon.platform} ${productPhrase(coupon)}`;

  return {
    question,
    answer: coupon.description,
  };
}
