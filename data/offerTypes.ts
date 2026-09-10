import { getFreshness } from "@/lib/seo";
import type {
  FaqItem,
  GuideItem,
  HubRegion,
  OfferType,
  OfferTypeInfo,
} from "@/types/coupon";

export const offerTypeNames: Record<OfferType, string> = {
  stay: "숙소",
  tour: "투어",
  flight: "항공",
  package: "패키지",
};

const offerNouns: Record<OfferType, string> = {
  stay: "호텔·모텔·펜션·에어비앤비",
  tour: "투어·액티비티·입장권",
  flight: "항공권",
  package: "항공+호텔 패키지",
};

const hubRegions: Array<{ category: HubRegion; slugPrefix: "overseas" | "korea" }> =
  [
    { category: "해외", slugPrefix: "overseas" },
    { category: "국내", slugPrefix: "korea" },
  ];

const offerTypes: OfferType[] = ["stay", "tour", "flight", "package"];

function buildOfferHub(
  type: OfferType,
  region: (typeof hubRegions)[number],
): OfferTypeInfo {
  const productName = offerTypeNames[type];
  const name = `${region.category} ${productName}`;
  const label = `${name} 할인코드`;

  return {
    type,
    category: region.category,
    slug: `${region.slugPrefix}-${type}`,
    name,
    label,
    searchKeyword: `${region.category}${productName} 할인코드`,
    shortDescription: `${region.category} ${offerNouns[type]} 할인코드를 여행 플랫폼과 관계없이 한곳에서 확인하세요.`,
    listed: true,
  };
}

/** Sanity 메뉴 시드용. 사이트는 catalog에서 offerMenu를 읽습니다. */
export const defaultOfferMenus: OfferTypeInfo[] = offerTypes.flatMap((type) =>
  hubRegions.map((region) => buildOfferHub(type, region)),
);

export const offerTypeGuides: GuideItem[] = [
  {
    id: "guide-offer-stay",
    offerType: "stay",
    title: "숙소 할인코드 쓰는 순서",
    body: "숙소 코드는 검색 결과가 아니라 결제 단계에서 입력하는 경우가 많습니다. 아고다·호텔스닷컴·부킹닷컴·야놀자처럼 플랫폼이 달라도 코드는 그 사이트에서만 됩니다. 특가·핫딜·시크릿가는 코드가 막힐 수 있으니, 일반 요금에 코드를 넣은 금액과 특가를 한 번 비교하세요. 결제 통화는 가능하면 KRW로 맞추면 카드 이중환전을 줄일 수 있습니다.",
  },
  {
    id: "guide-offer-tour",
    offerType: "tour",
    title: "투어·입장권 코드가 거절될 때",
    body: "클룩·마이리얼트립·야놀자 레저 코드는 숙소나 항공에는 적용되지 않습니다. 테마파크 입장권, 유심, 가이드 투어처럼 카테고리가 다른 상품을 한 장바구니에 넣으면 일부만 할인되는 경우가 있습니다. 막히면 상품을 나눠 결제하거나, 코드 설명에 적힌 지역·카테고리만 남기고 다시 넣어 보세요.",
  },
  {
    id: "guide-offer-flight",
    offerType: "flight",
    title: "항공권 프로모션 코드 입력 위치",
    body: "항공 할인코드는 검색 결과가 아니라 승객 정보를 넣은 뒤 결제 직전 화면의 프로모션 칸에 넣습니다. 앱 전용 코드는 웹에서 거절될 수 있고, 특정 항공사·국내선만 되는 코드도 있습니다. 유가 할인과 코드를 동시에 쓰지 못하는 경우가 있으니 최종 결제 금액을 확인하세요.",
  },
  {
    id: "guide-offer-package",
    offerType: "package",
    title: "항공+호텔 패키지 코드 조건",
    body: "패키지 코드는 항공과 호텔을 묶은 상품에만 붙습니다. 숙소만 예약하거나 항공만 살 때는 거절됩니다. 특가 운임·일부 프로모션 객실은 제외되는 경우가 있으니, 패키지 결제 화면에서 코드 적용 후 금액이 바뀌었는지 확인하세요.",
  },
];


function matchesOfferHub<T extends { offerType?: OfferType; category?: HubRegion }>(
  item: T,
  hub: OfferTypeInfo,
): boolean {
  if (item.offerType !== hub.type) {
    return false;
  }

  return !item.category || item.category === hub.category;
}

export function getGuidesByOfferHub(hub: OfferTypeInfo): GuideItem[] {
  return offerTypeGuides.filter((guide) => matchesOfferHub(guide, hub));
}

export function getFaqsByOfferHub(hub: OfferTypeInfo): FaqItem[] {
  const { year, month } = getFreshness();
  const period = `${year}년 ${month}월`;
  const { name, label, category, slug, type } = hub;
  const stayNoun = category === "국내" ? "모텔·호텔·펜션" : "호텔";
  const tourNoun = category === "국내" ? "제주·부산 액티비티" : "투어·입장권";

  const byType: Record<OfferType, FaqItem[]> = {
    stay: [
      {
        id: `faq-${slug}-where`,
        question: `${period} ${label}는 어디서 받나요?`,
        answer: `${period} ${label}는 코드세이아 ${name} 페이지에 모아 두었습니다. 아고다·호텔스닷컴·부킹닷컴·야놀자·여기어때처럼 사이트마다 코드가 다릅니다. 카드에 적힌 플랫폼 결제창에만 붙여넣으세요.`,
      },
      {
        id: `faq-${slug}-input`,
        question: `${category} ${stayNoun} 쿠폰은 어디에 입력하나요?`,
        answer: `${name} 할인코드는 검색 결과가 아니라 결제 직전 쿠폰·프로모션 칸에 넣습니다. 시크릿가·핫딜·멤버 전용가는 코드가 거절되는 경우가 많아, 일반 요금+코드와 특가를 비교하세요.`,
      },
      {
        id: `faq-${slug}-stack`,
        question: `${label}를 두 플랫폼에서 같이 쓸 수 있나요?`,
        answer: `한 예약에 서로 다른 사이트 코드를 동시에 넣을 수는 없습니다. 같은 ${category} 숙소를 여러 플랫폼에서 연 뒤, ${name} 할인코드 적용가가 더 낮은 쪽으로 결제하면 됩니다.`,
      },
      {
        id: `faq-${slug}-deal`,
        question: `${category} 숙소 특가에도 ${name} 할인코드가 되나요?`,
        answer: `이미 깎인 시크릿딜·핫딜·타임세일은 ${label} 제외인 경우가 많습니다. 코드 적용 후 금액이 그대로면 일반 요금으로 바꿔 다시 넣어 보세요.`,
      },
    ],
    tour: [
      {
        id: `faq-${slug}-where`,
        question: `${period} ${label}는 어디서 확인하나요?`,
        answer: `${period} ${label}는 코드세이아 ${name} 페이지에서 복사할 수 있습니다. 클룩·마이리얼트립·야놀자 레저처럼 사이트마다 코드가 다르고, ${tourNoun} 전용인 경우가 많습니다.`,
      },
      {
        id: `faq-${slug}-stay`,
        question: `${category} 투어 할인코드를 호텔 예약에도 쓸 수 있나요?`,
        answer: `대부분 안 됩니다. ${name} 쿠폰은 투어·액티비티·입장권 결제에만 됩니다. 숙소 코드는 국내 숙소·해외 숙소 할인코드 페이지에서 따로 확인하세요.`,
      },
      {
        id: `faq-${slug}-cart`,
        question: `${category} 입장권이랑 투어를 한 장바구니에 넣어도 쿠폰이 되나요?`,
        answer: `클룩·마이리얼트립은 카테고리가 다른 상품을 같이 담으면 ${name} 할인이 일부만 붙는 경우가 있습니다. 적용 금액이 예상과 다르면 상품을 나눠 결제하세요.`,
      },
      {
        id: `faq-${slug}-region`,
        question: `${label}는 어느 지역·상품에 되나요?`,
        answer: `코드 설명에 적힌 국가·테마파크·유심만 대상인 경우가 많습니다. ${category === "해외" ? "일본 유니버설 코드는 유럽 투어나 유심에 거절될 수 있습니다." : "제주 액티비티 코드는 숙소나 다른 지역 레저에 거절될 수 있습니다."} 카드의 적용 조건을 먼저 보세요.`,
      },
    ],
    flight: [
      {
        id: `faq-${slug}-where`,
        question: `${period} ${label}는 어디에 입력하나요?`,
        answer: `${label}는 항공 검색 화면이 아니라 승객 정보를 넣은 뒤 결제 직전 프로모션 칸에 넣습니다. ${period} 코드는 트립닷컴·익스피디아처럼 사이트마다 다르고, 앱 전용·특정 항공사만 되는 코드도 있습니다.`,
      },
      {
        id: `faq-${slug}-hotel`,
        question: `${category} 항공권 쿠폰을 호텔에도 쓸 수 있나요?`,
        answer: `안 됩니다. ${name} 할인코드는 항공권 결제에만 됩니다. 숙소는 ${category} 숙소 할인코드 페이지의 코드를 쓰세요.`,
      },
      {
        id: `faq-${slug}-fuel`,
        question: `${label}와 유가 할인을 같이 쓸 수 있나요?`,
        answer: `${category} 항공권은 유가 할인과 프로모션 코드가 동시에 안 되는 구간이 있습니다. 코드를 넣기 전후 최종 결제 금액을 비교하세요. 국내선만 되거나 특정 항공사만 되는지도 카드 설명을 확인합니다.`,
      },
    ],
    package: [
      {
        id: `faq-${slug}-where`,
        question: `${period} ${label}는 어디서 쓰나요?`,
        answer: `${period} ${label}는 코드세이아 ${name} 페이지에 있습니다. 익스피디아·트립닷컴처럼 항공+호텔을 묶은 결제창에만 넣는 코드가 많습니다.`,
      },
      {
        id: `faq-${slug}-only`,
        question: `항공호텔 패키지 쿠폰을 숙소나 항공만 살 때도 쓸 수 있나요?`,
        answer: `대부분 안 됩니다. ${name} 할인코드는 항공과 호텔을 함께 담은 패키지에만 됩니다. 숙소 단독·항공 단독은 숙소·항공 할인코드 페이지의 코드를 쓰세요.`,
      },
      {
        id: `faq-${slug}-deal`,
        question: `${category} 패키지 특가에도 ${name} 쿠폰이 되나요?`,
        answer: `특가 운임·프로모션 객실은 ${label} 제외인 경우가 많습니다. 패키지 결제 화면에서 코드 적용 후 금액이 바뀌었는지 확인하고, 그대로면 일반 패키지 요금으로 다시 넣어 보세요.`,
      },
    ],
  };

  return byType[type];
}
