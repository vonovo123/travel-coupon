import { getFreshness } from "@/lib/seo";
import type { DirectFollowUp } from "@/data/directAnswers";
import type { Coupon } from "@/types/coupon";

/** 쿠폰 id → 사람들이 검색창에 치는 말 */
const QUESTIONS_BY_COUPON_ID: Record<string, string> = {
  "hotels-global-8": "호텔스닷컴 할인코드",
  "trip-flight-6": "트립닷컴 항공권 할인코드",
  "trip-stay-10": "트립닷컴 호텔 할인코드",
  "mrt-tour-10": "마이리얼트립 해외투어 쿠폰",
  "mrt-korea-8": "마이리얼트립 제주 쿠폰",
  "agoda-global-7": "아고다 할인코드",
  "agoda-korea-5": "아고다 국내호텔 쿠폰 있나",
  "klook-asia-12": "클룩 일본 할인코드",
  "nol-stay-10": "놀 숙소 쿠폰",
  "expedia-hotel-7": "익스피디아 호텔 할인코드",
  "booking-stay-8": "부킹닷컴 쿠폰",
  "yanolja-motel-10": "야놀자 모텔 쿠폰",
  "yeogi-pension-8": "여기어때 펜션 쿠폰",
  "airbnb-first-6": "에어비앤비 첫예약 쿠폰",
  "expedia-package-5": "익스피디아 항공호텔 패키지",
  "booking-genius-6": "부킹닷컴 지니어스 할인",
  "yanolja-leisure-8": "야놀자 레저 쿠폰",
  "yeogi-weekend-7": "여기어때 주말 쿠폰",
  "airbnb-longstay-8": "에어비앤비 장기숙박 할인",
};

function withMonthIfNeeded(question: string, couponId: string): string {
  const { month } = getFreshness();
  if (couponId === "agoda-global-7" || couponId === "hotels-global-8") {
    return `${question} ${month}월`;
  }
  return question;
}

export function questionFromCouponTitle(
  title: string,
  platformName: string,
): string {
  if (/항공\+호텔|패키지/.test(title)) {
    return `${platformName} 항공호텔 패키지`;
  }
  if (/항공/.test(title)) {
    return `${platformName} 항공권 할인코드`;
  }
  if (/제주|부산/.test(title)) {
    return `${platformName} 제주 쿠폰`;
  }
  if (/아시아|일본/.test(title) && /투어|액티비티|입장권/.test(title)) {
    return `${platformName} 일본 할인코드`;
  }
  if (/투어|액티비티/.test(title)) {
    return `${platformName} 투어 쿠폰`;
  }
  if (/입장권|레저/.test(title)) {
    return `${platformName} 레저 쿠폰`;
  }
  if (/장기|7박/.test(title)) {
    return `${platformName} 장기숙박 할인`;
  }
  if (/첫 예약|신규/.test(title)) {
    return `${platformName} 첫예약 쿠폰`;
  }
  if (/Genius|지니어스/i.test(title)) {
    return `${platformName} 지니어스 할인`;
  }
  if (/주말/.test(title)) {
    return `${platformName} 주말 쿠폰`;
  }
  if (/모텔/.test(title)) {
    return `${platformName} 모텔 쿠폰`;
  }
  if (/펜션/.test(title)) {
    return `${platformName} 펜션 쿠폰`;
  }
  if (/국내/.test(title)) {
    return `${platformName} 국내호텔 쿠폰`;
  }
  if (/해외|전 세계|숙소|호텔/.test(title)) {
    return `${platformName} 할인코드`;
  }

  return `${platformName} 쿠폰`;
}

export function questionFromCoupon(coupon: Coupon): DirectFollowUp {
  const mapped = QUESTIONS_BY_COUPON_ID[coupon.id];
  const question = mapped
    ? withMonthIfNeeded(mapped, coupon.id)
    : questionFromCouponTitle(coupon.title, coupon.platform);

  return {
    question,
    answer: coupon.description,
  };
}
