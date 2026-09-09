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
  };
}

export const offerTypeHubs: OfferTypeInfo[] = offerTypes.flatMap((type) =>
  hubRegions.map((region) => buildOfferHub(type, region)),
);

export const offerTypeHubMap = Object.fromEntries(
  offerTypeHubs.map((hub) => [hub.slug, hub]),
) as Record<string, OfferTypeInfo>;

export function getOfferTypeBySlug(slug: string): OfferTypeInfo | undefined {
  return offerTypeHubMap[slug];
}

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

export const offerTypeFaqs: FaqItem[] = [
  {
    id: "faq-offer-stay-where",
    offerType: "stay",
    question: "숙소할인코드는 어느 사이트에서 쓰나요?",
    answer:
      "코드마다 쓸 수 있는 플랫폼이 정해져 있습니다. 아고다 코드는 아고다, 야놀자 코드는 야놀자 결제창에만 입력하세요. 이 페이지는 국내 또는 해외 숙소 코드만 모아 보여 주고, 각 카드에 어느 사이트 코드인지 적혀 있습니다.",
  },
  {
    id: "faq-offer-stay-stack",
    offerType: "stay",
    question: "숙소 코드를 두 개 겹쳐 쓸 수 있나요?",
    answer:
      "같은 예약에 서로 다른 플랫폼 코드를 같이 넣을 수는 없습니다. 한 숙소를 여러 사이트에서 열어 본 뒤, 코드 적용가가 더 낮은 쪽으로 결제하면 됩니다. 특가·멤버십 할인과 코드가 겹치지 않는 경우도 있습니다.",
  },
  {
    id: "faq-offer-tour-stay",
    offerType: "tour",
    question: "투어 할인코드를 호텔 예약에도 쓸 수 있나요?",
    answer:
      "대부분 안 됩니다. 투어·액티비티·입장권 전용 코드는 숙소 결제에서 거절됩니다. 숙소 코드는 국내 숙소·해외 숙소 할인코드 페이지에서 확인하세요.",
  },
  {
    id: "faq-offer-tour-cart",
    offerType: "tour",
    question: "입장권이랑 투어를 한 장바구니에 넣어도 되나요?",
    answer:
      "사이트에 따라 코드가 일부 상품에만 붙을 수 있습니다. 적용 금액이 예상과 다르면 카테고리별로 나눠 결제해 보세요.",
  },
  {
    id: "faq-offer-flight-where",
    offerType: "flight",
    question: "항공권 할인코드는 어디서 입력하나요?",
    answer:
      "항공 검색 화면이 아니라 승객 정보 입력 후 결제 직전 프로모션 코드 칸에 넣습니다. 앱 전용인지, 특정 항공사만 되는지도 코드 설명을 확인하세요.",
  },
  {
    id: "faq-offer-package-only",
    offerType: "package",
    question: "패키지 쿠폰을 숙소나 항공만 살 때도 쓸 수 있나요?",
    answer:
      "항공+호텔을 묶은 패키지 결제에만 적용되는 코드가 많습니다. 숙소 단독·항공 단독은 국내·해외 숙소 또는 항공 할인코드 페이지의 코드를 쓰세요.",
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
  return offerTypeFaqs.filter((faq) => matchesOfferHub(faq, hub));
}
