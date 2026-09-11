import type {
  Coupon,
  FaqItem,
  GuideItem,
  OfferTypeInfo,
  PaymentTip,
  Platform,
  PlatformInfo,
  ReviewPost,
} from "@/types/coupon";
import { defaultOfferMenus } from "@/data/offerTypes";
import { getFreshness } from "@/lib/seo";

export const platforms: PlatformInfo[] = [
  {
    name: "호텔스닷컴",
    slug: "hotelscom",
    color: "#D32F2F",
    textClass: "text-[#C62828]",
    affiliateLink: "https://www.hotels.com",
    initial: "H",
    listed: true,
  },
  {
    name: "트립닷컴",
    slug: "tripcom",
    color: "#287DFA",
    textClass: "text-[#1A6AE0]",
    affiliateLink: "https://www.trip.com",
    initial: "T",
    listed: true,
  },
  {
    name: "마이리얼트립",
    slug: "myrealtrip",
    color: "#00B8C8",
    textClass: "text-[#0A8A96]",
    affiliateLink: "https://www.myrealtrip.com",
    initial: "M",
    listed: true,
  },
  {
    name: "아고다",
    slug: "agoda",
    color: "#5C2D91",
    textClass: "text-[#5C2D91]",
    affiliateLink: "https://www.agoda.com",
    initial: "A",
    listed: true,
  },
  {
    name: "클룩",
    slug: "klook",
    color: "#FF5722",
    textClass: "text-[#E64A19]",
    affiliateLink: "https://www.klook.com",
    initial: "K",
    listed: true,
  },
  {
    name: "Nol",
    slug: "nol",
    color: "#FF3478",
    textClass: "text-[#E02A68]",
    affiliateLink: "https://www.nol.com",
    initial: "N",
    listed: true,
  },
  {
    name: "익스피디아",
    slug: "expedia",
    color: "#FFCC00",
    textClass: "text-[#B38600]",
    affiliateLink: "https://www.expedia.co.kr",
    initial: "E",
    listed: true,
  },
  {
    name: "부킹닷컴",
    slug: "booking",
    color: "#003580",
    textClass: "text-[#003580]",
    affiliateLink: "https://www.booking.com",
    initial: "B",
    listed: true,
  },
  {
    name: "여기어때",
    slug: "yeogi",
    color: "#FF4D4D",
    textClass: "text-[#E03A3A]",
    affiliateLink: "https://www.yeogi.com",
    initial: "여",
    listed: true,
  },
  {
    name: "에어비앤비",
    slug: "airbnb",
    color: "#FF5A5F",
    textClass: "text-[#E0454A]",
    affiliateLink: "https://www.airbnb.co.kr",
    initial: "A",
    listed: true,
  },
];

const reservedOfferSlugs = new Set<string>(
  defaultOfferMenus.map((hub) => hub.slug),
);
const collidingPlatform = platforms.find((platform) =>
  reservedOfferSlugs.has(platform.slug),
);

if (collidingPlatform) {
  throw new Error(
    `플랫폼 슬러그 "${collidingPlatform.slug}"는 상품 허브 URL과 겹칩니다.`,
  );
}

export const listedPlatforms = platforms.filter((platform) => platform.listed);
export const unlistedPlatforms = platforms.filter((platform) => !platform.listed);

export const platformMap = Object.fromEntries(
  platforms.map((platform) => [platform.slug, platform]),
) as Record<string, PlatformInfo>;

export function getPlatformBySlug(slug: string): PlatformInfo | undefined {
  return platformMap[slug];
}

function couponDefaults(platformName: Platform) {
  const platform = platforms.find((item) => item.name === platformName);

  if (!platform) {
    throw new Error(`Unknown platform: ${platformName}`);
  }

  return {
    platform: platform.name,
    logoUrl: platform.color,
    affiliateLink: platform.affiliateLink,
    initial: platform.initial,
  };
}

export const coupons: Coupon[] = [
  {
    id: "hotels-global-8",
    ...couponDefaults("호텔스닷컴"),
    offerType: "stay",
    category: "해외",
    title: "전 세계 호텔 최대 8% 추가 할인",
    description: "회원가에서 추가 적용, 일부 특가 제외",
    code: "HOTELS8",
    validUntil: "2026.12.31까지",
  },
  {
    id: "trip-flight-6",
    ...couponDefaults("트립닷컴"),
    offerType: "flight",
    category: "공통",
    title: "전 세계 항공권 6% 할인",
    description: "국내선·국제선 모두 적용, 앱 결제 시 사용",
    code: "TRIPFLY6",
    validUntil: "2026.12.31까지",
  },
  {
    id: "trip-stay-10",
    ...couponDefaults("트립닷컴"),
    offerType: "stay",
    category: "해외",
    title: "해외 숙소 10% 할인",
    description: "2박 이상 예약 시, 결제 단계에서 코드 입력",
    code: "TRIPSTAY10",
    validUntil: "2026.11.30까지",
  },
  {
    id: "mrt-tour-10",
    ...couponDefaults("마이리얼트립"),
    offerType: "tour",
    category: "해외",
    title: "해외 투어·티켓 10% 할인",
    description: "유럽·일본 투어 포함, 1인당 1회",
    code: "MRTTOUR10",
    validUntil: "2026.10.31까지",
  },
  {
    id: "mrt-korea-8",
    ...couponDefaults("마이리얼트립"),
    offerType: "tour",
    category: "국내",
    title: "국내 액티비티 8% 할인",
    description: "제주·부산 액티비티, 최소 결제 3만 원",
    code: "MRTKOREA8",
    validUntil: "2026.12.15까지",
  },
  {
    id: "agoda-global-7",
    ...couponDefaults("아고다"),
    offerType: "stay",
    category: "해외",
    title: "전 세계 호텔 최대 7% 추가 할인",
    description: "신규 가입자 대상, 결제 단계에서 적용",
    code: "AGODA7OFF",
    validUntil: "2026.12.31까지",
  },
  {
    id: "agoda-korea-5",
    ...couponDefaults("아고다"),
    offerType: "stay",
    category: "국내",
    title: "국내 호텔 추가 5% 할인",
    description: "2박 이상 예약 시, 특가 상품 일부 제외",
    code: "AGODAKR5",
    validUntil: "2026.11.30까지",
  },
  {
    id: "klook-asia-12",
    ...couponDefaults("클룩"),
    offerType: "tour",
    category: "해외",
    title: "아시아 액티비티 12% 할인",
    description: "대만·홍콩·일본 투어·입장권 대상",
    code: "KLOOKASIA12",
    validUntil: "2026.11.15까지",
  },
  {
    id: "nol-stay-10",
    ...couponDefaults("Nol"),
    offerType: "stay",
    category: "국내",
    title: "국내 숙소 10% 할인",
    description: "모텔·호텔·펜션, 주중 예약 시 사용",
    code: "NOLSTAY10",
    validUntil: "2026.12.31까지",
  },
  {
    id: "expedia-hotel-7",
    ...couponDefaults("익스피디아"),
    offerType: "stay",
    category: "해외",
    title: "해외 호텔 최대 7% 할인",
    description: "일부 특가·패키지 제외, 결제 시 코드 입력",
    code: "EXPEDIA7",
    validUntil: "2026.12.31까지",
  },
  {
    id: "booking-stay-8",
    ...couponDefaults("부킹닷컴"),
    offerType: "stay",
    category: "공통",
    title: "숙소 예약 8% 추가 할인",
    description: "신규·재방문 회원 대상, 일부 숙소 제외",
    code: "BOOKING8",
    validUntil: "2026.12.31까지",
  },
  {
    id: "yeogi-pension-8",
    ...couponDefaults("여기어때"),
    offerType: "stay",
    category: "국내",
    title: "펜션·호텔 8% 할인",
    description: "앱·웹 결제 공통, 최소 결제금액 있을 수 있음",
    code: "YEOGI8",
    validUntil: "2026.12.31까지",
  },
  {
    id: "airbnb-first-6",
    ...couponDefaults("에어비앤비"),
    offerType: "stay",
    category: "해외",
    title: "첫 예약 최대 6% 할인",
    description: "신규 계정 대상, 조건은 결제 전 확인",
    code: "AIRBNB6",
    validUntil: "2026.12.31까지",
  },
  {
    id: "expedia-package-5",
    ...couponDefaults("익스피디아"),
    offerType: "package",
    category: "해외",
    title: "항공+호텔 패키지 5% 추가 할인",
    description: "패키지 결제 시, 일부 특가 운임 제외",
    code: "EXPACK5",
    validUntil: "2026.11.30까지",
  },
  {
    id: "booking-genius-6",
    ...couponDefaults("부킹닷컴"),
    offerType: "stay",
    category: "해외",
    title: "Genius 회원 추가 6% 할인",
    description: "로그인 후 결제, 등급별 중복 제한 있을 수 있음",
    code: "GENIUS6",
    validUntil: "2026.12.15까지",
  },
  {
    id: "yeogi-weekend-7",
    ...couponDefaults("여기어때"),
    offerType: "stay",
    category: "국내",
    title: "주말 숙소 7% 할인",
    description: "금·토 체크인, 이미 큰 폭 특가는 제외될 수 있음",
    code: "YEOGIWK7",
    validUntil: "2026.12.15까지",
  },
  {
    id: "airbnb-longstay-8",
    ...couponDefaults("에어비앤비"),
    offerType: "stay",
    category: "공통",
    title: "7박 이상 장기 숙박 8% 할인",
    description: "호스트 설정에 따라 막힐 수 있음, 결제 전 확인",
    code: "AIRLONG8",
    validUntil: "2026.12.31까지",
  },
];

export const platformGuides: GuideItem[] = [
  {
    id: "guide-agoda",
    platform: "아고다",
    title: "아고다 할인코드 적용 방법",
    body: "아고다 할인코드는 숙소 상세 페이지가 아니라 결제 단계에서 입력해야 합니다. 시크릿 특가(Agoda Secret Deals)는 일반 검색 결과보다 낮은 요금이 뜨는 전용 링크로 접속한 뒤, 로그인하지 않은 상태에서 먼저 요금을 비교하는 편이 안전합니다. 결제 통화는 가능하면 KRW로 맞추세요. USD나 현지 통화로 결제하면 카드사 이중환전 수수료가 붙을 수 있습니다. 코드가 보이지 않으면 브라우저 쿠키를 지우고, 이 사이트의 아고다 전용 링크로 다시 들어간 다음 결제창 쿠폰 칸에 붙여넣으세요.",
  },
  {
    id: "guide-mrt",
    platform: "마이리얼트립",
    title: "마이리얼트립 할인코드 적용 방법",
    body: "마이리얼트립은 신규 회원 웰컴 쿠폰과 투어·티켓 전용 코드가 따로 있습니다. 숙소 예약에는 투어 코드가 적용되지 않으니, 상품 유형을 먼저 확인하세요. 앱이나 웹 결제 화면의 할인코드 입력란에 붙여넣으면 즉시 차감됩니다. 1인 1회 제한인 코드가 많아, 같은 계정의 이전 예약 이력을 한 번 확인하는 것이 좋습니다. 제주·부산 액티비티는 최소 결제 금액 조건이 있는 경우가 있습니다.",
  },
  {
    id: "guide-trip",
    platform: "트립닷컴",
    title: "트립닷컴 항공권·숙소 코드 입력 위치",
    body: "트립닷컴 항공권 프로모션 코드는 항공 검색 결과가 아니라 승객 정보 입력 후 결제 직전 화면의 프로모션 코드 칸에 넣습니다. 숙소 할인코드도 마찬가지로 결제 단계에서만 활성화됩니다. 앱 전용 코드는 웹에서 입력해도 거절될 수 있으니, 코드 설명에 앱 전용이라고 적혀 있으면 트립닷컴 앱으로 이동하세요. 국내선과 국제선 모두 되는 코드인지, 특정 항공사만 되는 코드인지도 함께 확인하면 결제 실패를 줄일 수 있습니다.",
  },
  {
    id: "guide-klook",
    platform: "클룩",
    title: "클룩 액티비티 프로모션 코드 사용법",
    body: "클룩(Klook) 할인코드는 장바구니 또는 결제 페이지 상단의 프로모션 코드 입력란에 넣습니다. 테마파크 입장권, 유심, 투어처럼 상품 카테고리가 다른 경우 코드가 막힐 수 있습니다. 아시아 투어·입장권 전용 코드는 유럽 상품에는 적용되지 않습니다. 결제 전 최종 금액이 바뀌었는지 확인하고, 적용이 안 되면 전용 링크를 통해 상품 페이지에 다시 접속한 뒤 같은 계정으로 결제해 보세요.",
  },
  {
    id: "guide-hotels",
    platform: "호텔스닷컴",
    title: "호텔스닷컴 리워드와 할인코드 함께 쓰는 법",
    body: "호텔스닷컴은 10박 리워드와 할인코드를 같이 쓰는 경우가 있습니다. 코드는 결제 단계 쿠폰/프로모션 코드 칸에 입력합니다. 시크릿 특가나 멤버 전용가는 코드와 중복이 안 될 수 있으니, 코드 적용 후 금액과 미적용 금액을 비교하세요. 국내 호텔과 해외 호텔에 따라 사용 가능 코드가 다릅니다. 예약 전에 무료 취소 마감 시간도 함께 확인하면 일정 변경 때 손해를 줄일 수 있습니다.",
  },
  {
    id: "guide-hotels-secret",
    platform: "호텔스닷컴",
    title: "호텔스닷컴 시크릿가·멤버가와 코드 중복 여부",
    body: "호텔스닷컴 시크릿 특가와 멤버 전용가는 이미 할인된 요금이라 프로모션 코드가 막히는 경우가 많습니다. 같은 숙소를 일반가와 시크릿가로 각각 열어 보고, 코드를 넣었을 때와 넣지 않았을 때의 최종 금액을 비교하세요. 로그인 전후 요금이 달라질 수 있으니, 이 사이트의 호텔스닷컴 전용 링크로 들어온 뒤 같은 계정으로 결제하는 편이 안전합니다. 코드가 거절되면 특가 요금 대신 일반 요금에서 코드를 다시 시도해 보세요.",
  },
  {
    id: "guide-hotels-reward",
    platform: "호텔스닷컴",
    title: "호텔스닷컴 원키 리워드 적립 시 유의사항",
    body: "호텔스닷컴 원키 리워드는 숙박을 완료한 뒤에 적립되는 경우가 많고, 일부 특가·패키지·제3자 판매 숙소는 적립 대상에서 빠질 수 있습니다. 할인코드를 써도 리워드 적립이 되는 예약과, 코드 적용 시 적립이 제외되는 예약이 있으니 결제 전 리워드 안내 문구를 확인하세요. 10박 무료 숙박 쿠폰은 사용 가능 국가·숙소 등급 제한이 있을 수 있습니다. 일정 변경이 예상되면 무료 취소 마감 시간과 리워드 적립 조건을 함께 적어 두는 것이 좋습니다.",
  },
  {
    id: "guide-nol",
    platform: "Nol",
    title: "Nol 국내 숙소 할인코드 사용법",
    body: "Nol(놀) 할인코드는 모텔·호텔·펜션 등 국내 숙소 결제 화면에서 쿠폰 적용 버튼을 누른 뒤 코드 직접 입력을 선택하면 됩니다. 주중/주말, 연박 여부에 따라 할인율이 달라질 수 있고, 이미 큰 폭으로 깎인 핫딜 상품은 코드가 거절되기도 합니다. 레저 티켓과 숙소 쿠폰이 분리되어 있으니 상품 종류를 확인하세요. 결제 수단 할인(카드, 페이)은 코드 적용 이후 단계에서 한 번 더 선택할 수 있습니다.",
  },
  {
    id: "guide-expedia",
    platform: "익스피디아",
    title: "익스피디아 할인코드 적용 방법",
    body: "익스피디아 할인코드는 숙소 검색 결과가 아니라 결제 직전 화면의 쿠폰/프로모션 코드 칸에 넣습니다. 항공+호텔 패키지 코드와 숙소 전용 코드가 나뉘어 있으니, 상품 유형을 먼저 확인하세요. 멤버 전용가·오늘의 특가는 이미 할인된 요금이라 코드가 거절되는 경우가 많습니다. 같은 숙소를 일반가에 코드를 넣었을 때와 특가를 비교하세요. 결제 통화가 USD면 카드사 해외수수료가 붙을 수 있어, KRW 결제가 가능한지 함께 봅니다.",
  },
  {
    id: "guide-booking",
    platform: "부킹닷컴",
    title: "부킹닷컴 할인코드와 Genius 할인",
    body: "부킹닷컴 코드는 예약 마지막 단계의 할인 코드/바우처 칸에 입력합니다. Genius 등급 할인이 이미 붙은 숙소는 추가 코드가 막히는 경우가 있으니, 로그인 전후 요금과 코드 적용가를 비교하세요. 일부 숙소는 코드를 넣으면 Genius 할인이 사라지기도 합니다. 모바일 앱 전용 코드는 웹 결제창에서 거절될 수 있습니다. 무료 취소 마감 시간과 선결제/현장결제 여부도 코드 적용 후에 한 번 더 확인하는 편이 안전합니다.",
  },
  {
    id: "guide-yeogi",
    platform: "여기어때",
    title: "여기어때 할인코드 적용 방법",
    body: "여기어때 코드는 숙소 결제 단계의 쿠폰/포인트 영역에서 코드 등록 후 적용합니다. 펜션·호텔 공통 코드와 주말 전용 코드가 있으니 체크인 요일을 먼저 보세요. 이미 큰 폭으로 깎인 특가·무한쿠폰 객실은 추가 코드가 안 되는 경우가 많습니다. 최소 결제 금액 조건이 있으면 코드 적용 전 금액 기준으로 통과 여부를 확인하세요. 앱과 웹 모두 되는 코드인지, 앱 전용인지도 설명에 적혀 있습니다.",
  },
  {
    id: "guide-airbnb",
    platform: "에어비앤비",
    title: "에어비앤비 프로모션 코드 사용법",
    body: "에어비앤비 코드는 결제 확인 화면의 쿠폰/프로모션 코드 입력란에 넣습니다. 첫 예약 전용 코드는 해당 계정으로 숙박을 완료한 이력이 있으면 거절됩니다. 7박 이상 장기 숙박 코드는 호스트가 할인을 막아 둔 숙소에서는 적용되지 않습니다. 서비스 수수료·청소비는 코드 할인 대상에서 빠지는 경우가 많아, 숙박 요금만 깎이는지 최종 내역을 확인하세요. 통화와 결제 수단을 바꾼 뒤 코드가 사라지면 같은 창에서 다시 붙여넣습니다.",
  },
];

export const paymentTips: PaymentTip[] = [
  {
    id: "card-home",
    title: "신한·하나·우리카드 즉시 할인",
    body: "여행 플랫폼 결제는 카드사 청구할인과 현장 즉시할인이 자주 겹칩니다. 신한카드는 아고다·트립닷컴 해외 숙소, 하나카드는 호텔스닷컴·마이리얼트립, 우리카드는 국내 숙소·Nol 쪽에서 월별 이벤트가 열리는 경우가 많습니다. 카드 무이자 할부와 쿠폰 할인을 같이 쓰는 건 대체로 가능하지만, 카드사 청구할인과 플랫폼 시크릿가는 한쪽만 되는 경우가 있습니다. 결제 직전 카드 선택 화면의 예상 할인 금액을 꼭 확인하세요. 이벤트 기간과 한도는 매월 달라집니다.",
  },
  {
    id: "pay-home",
    title: "네이버페이·카카오페이·토스페이 중복 할인",
    body: "네이버페이, 카카오페이, 토스페이는 플랫폼 할인코드와 중복되는 경우가 많습니다. 특히 마이리얼트립·Nol·클룩처럼 국내 결제 비중이 높은 서비스에서 페이 즉시할인이 자주 열립니다. 순서는 보통 할인코드 적용 → 결제수단에서 페이 선택 → 페이 앱 추가 쿠폰 확인입니다. 페이 쿠폰까지 쓴 뒤 최종 결제액을 비교하고, 해외 숙소는 페이 결제가 막혀 있을 수 있으니 카드 결제로 우회해야 할 때도 있습니다. 페이 포인트 적립과 즉시할인이 동시에 안 되는 이벤트도 있으니 약관을 한 줄만 읽어도 손해를 줄일 수 있습니다.",
  },
  {
    id: "card-hotels",
    platform: "호텔스닷컴",
    title: "호텔스닷컴 하나카드·리워드 중복 할인",
    body: "호텔스닷컴은 국내 페이보다 카드 결제가 기본입니다. 하나카드 호텔스닷컴 즉시할인·청구할인이 열리는 달이 많고, 원키 리워드 적립과 카드 할인을 같이 받는 예약이 있습니다. 반대로 시크릿가·멤버 전용가는 카드 프로모션 대상에서 빠질 수 있습니다. 결제 통화가 USD면 카드사 해외이용수수료가 붙으니 KRW 결제가 가능한지 먼저 보세요. 무이자 할부는 코드 적용 후에도 되는 경우가 많지만, 청구할인 한도는 매월 달라집니다.",
  },
  {
    id: "pay-hotels",
    platform: "호텔스닷컴",
    title: "호텔스닷컴에서 페이 결제가 막힐 때",
    body: "호텔스닷컴은 네이버페이·카카오페이·토스페이 선택이 안 뜨는 예약이 많습니다. 페이 즉시할인을 노리고 들어왔다면, 같은 숙소를 마이리얼트립·Nol처럼 페이 결제가 되는 플랫폼과 최종가만 비교하는 편이 낫습니다. 페이 대신 카드 청구할인+할인코드+원키 리워드 조합이 더 저렴한 달이 있습니다. 앱 인앱결제와 웹 결제 수수료·적립이 다를 수 있으니, 코드는 웹 결제창에서 한 번 더 확인해 보세요.",
  },
  {
    id: "card-trip",
    platform: "트립닷컴",
    title: "트립닷컴 신한카드·항공권 청구할인",
    body: "트립닷컴은 신한카드 해외 숙소·항공권 이벤트가 자주 열립니다. 항공권은 유가 할인(얼리버드)과 카드 청구할인을 같이 쓰는 구간과, 프로모션 코드를 넣는 순간 유가 할인이 사라지는 구간이 있습니다. 숙소는 코드 적용 후 카드 선택 화면의 예상 할인액을 보는 것이 가장 정확합니다. 국제선은 결제 통화가 CNY·USD로 잡히면 이중환전이 생기니, KRW 결제로 바꿀 수 있는지 확인하세요.",
  },
  {
    id: "pay-trip",
    platform: "트립닷컴",
    title: "트립닷컴 앱 전용 결제와 한국 페이",
    body: "트립닷컴 앱 전용가는 웹에서 네이버페이·카카오페이를 골라도 같은 금액이 아닐 수 있습니다. 앱 쿠폰은 앱 결제 수단에만 붙고, 웹 프로모션 코드는 웹 결제창에서만 살아 있는 경우가 많습니다. 국내선·국내 숙소는 페이 즉시할인이 열리기도 하지만, 해외 호텔은 카드 결제가 기본입니다. 코드 적용 → 결제 수단 변경 순으로 금액이 바뀌는지 보고, 더 싼 쪽을 고르세요.",
  },
  {
    id: "card-mrt",
    platform: "마이리얼트립",
    title: "마이리얼트립 하나카드·국내 투어 즉시할인",
    body: "마이리얼트립은 하나카드 국내 투어·티켓 즉시할인이 자주 붙습니다. 숙소와 액티비티는 카드 이벤트 대상이 따로라서, 숙소 예약에 투어 카드 할인을 기대하면 빠질 수 있습니다. 웰컴 쿠폰을 쓴 뒤에도 카드 즉시할인이 되는 결제가 많고, 회원 등급 추가 할인과는 한쪽만 되는 달이 있습니다. 결제 직전 카드사 배너에 나온 예상 할인 금액과 한도를 확인하세요.",
  },
  {
    id: "pay-mrt",
    platform: "마이리얼트립",
    title: "마이리얼트립 네이버페이·카카오페이 중복",
    body: "마이리얼트립은 할인코드 다음에 네이버페이·카카오페이·토스페이를 고르면 페이 쿠폰이 한 번 더 뜨는 경우가 많습니다. 순서는 코드 적용 → 페이 선택 → 페이 앱 쿠폰 확인입니다. 제주·부산 티켓처럼 최소 결제 금액이 있는 상품은 페이 할인 후에도 그 금액을 넘는지 봐야 합니다. 페이 포인트 적립과 즉시할인이 동시에 안 되는 이벤트도 있으니, 최종 결제액만 보고 고르면 됩니다.",
  },
  {
    id: "card-agoda",
    platform: "아고다",
    title: "아고다 신한카드·KRW 결제 시 유의사항",
    body: "아고다는 신한카드 해외 숙소 청구할인·무이자 할부 이벤트가 자주 열립니다. 결제 통화를 KRW로 고정하지 않으면 USD 결제 후 카드사 해외수수료가 붙습니다. 시크릿 특가(Agoda Secret Deals)는 카드 프로모션 대상에서 제외되는 달이 있으니, 코드+카드 할인 합계와 시크릿가 중 낮은 쪽을 고르세요. 로그인 전후 요금이 달라질 수 있어, 전용 링크로 들어온 창에서 카드를 선택하는 것이 안전합니다.",
  },
  {
    id: "pay-agoda",
    platform: "아고다",
    title: "아고다에서 국내 페이가 안 보일 때",
    body: "아고다 해외 숙소는 네이버페이·카카오페이가 결제 수단에 없는 경우가 많습니다. 페이 할인을 기대한 금액과 카드+할인코드 금액을 비교하고, 페이가 꼭 필요하면 같은 숙소를 페이 결제가 되는 다른 플랫폼과만 맞춰 보세요. 국내 호텔 일부는 페이 선택이 열리기도 하지만, 시크릿가와는 중복이 잘 안 됩니다. 통화가 KRW가 아니면 페이 자체가 비활성화되는 창도 있습니다.",
  },
  {
    id: "card-klook",
    platform: "클룩",
    title: "클룩 카드 할인과 입장권 최소 금액",
    body: "클룩은 테마파크·유심·투어마다 카드 즉시할인 대상이 다릅니다. 입장권 전용 카드 이벤트를 유심 결제에 쓰면 할인이 빠집니다. 신한·삼성 등 월별 클룩 청구할인이 있어도, 이미 큰 폭으로 깎인 번들 상품은 제외될 수 있습니다. 코드 적용 후 카드 선택 화면에서 예상 할인액이 0원이면 그 상품은 카드 이벤트 대상이 아닙니다. 최소 결제 금액 조건이 있는 코드를 쓸 때는 카드 할인 전 금액 기준으로 통과 여부를 보세요.",
  },
  {
    id: "pay-klook",
    platform: "클룩",
    title: "클룩 네이버페이·카카오페이 즉시할인",
    body: "클룩은 국내 결제 비중이 높아 네이버페이·카카오페이·토스페이 즉시할인이 자주 열립니다. 할인코드 → 페이 선택 → 페이 앱 추가 쿠폰 순으로 적용하고, 장바구니에 서로 다른 카테고리 상품이 섞여 있으면 페이 쿠폰이 일부만 붙을 수 있습니다. 유럽 투어는 페이 결제가 막히거나 한도가 낮을 수 있으니, 아시아 입장권과 같은 조건으로 보지 마세요. 포인트 적립과 즉시할인 중 하나만 되는 이벤트면 최종가만 비교하면 됩니다.",
  },
  {
    id: "card-nol",
    platform: "Nol",
    title: "Nol 우리카드·국내 숙소 즉시할인",
    body: "Nol은 우리카드 국내 숙소·모텔 즉시할인이 열리는 달이 많습니다. 주중 예약과 주말·연박은 카드 이벤트 대상이 다를 수 있고, 핫딜·타임세일 객실은 카드 할인이 빠진 채 결제되는 경우가 있습니다. 레저 티켓은 숙소 카드 프로모션과 별도이니, 숙소 결제창에서만 우리카드 배너를 확인하세요. 코드 적용 뒤에도 무이자 할부가 되는 편이고, 청구할인 한도는 달마다 달라집니다.",
  },
  {
    id: "pay-nol",
    platform: "Nol",
    title: "Nol 네이버페이·카카오페이 중복 할인",
    body: "Nol 국내 숙소는 할인코드 다음에 네이버페이·카카오페이·토스페이를 고르면 페이 즉시할인이 한 겹 더 붙는 경우가 많습니다. 핫딜 객실은 페이 쿠폰 제외 대상일 수 있으니, 코드만 넣었을 때와 페이까지 넣었을 때 금액이 같은지 보세요. 레저 티켓과 숙소를 한 번에 결제하면 페이 쿠폰이 한쪽 상품에만 적용되기도 합니다. 포인트 적립과 즉시할인을 동시에 쓰지 못하는 달이면 즉시할인 쪽이 보통 더 큽니다.",
  },
  {
    id: "card-expedia",
    platform: "익스피디아",
    title: "익스피디아 카드 할인과 패키지 결제",
    body: "익스피디아는 해외 숙소·패키지에서 신한·삼성카드 청구할인이 열리는 달이 있습니다. 항공+호텔 패키지는 숙소 전용 카드 이벤트가 빠질 수 있으니, 패키지 결제창의 카드 배너를 따로 확인하세요. 멤버 전용가에 코드를 넣으면 카드 할인 대상에서 제외되는 경우도 있습니다. 결제 통화가 USD면 해외이용수수료가 붙습니다. KRW로 바꿀 수 있는지, 코드 적용 후 무이자 할부가 되는지도 함께 보세요.",
  },
  {
    id: "pay-expedia",
    platform: "익스피디아",
    title: "익스피디아에서 국내 페이가 안 보일 때",
    body: "익스피디아 해외 숙소는 네이버페이·카카오페이가 결제 수단에 없는 경우가 많습니다. 페이 할인을 기대한 금액과 카드+할인코드 금액을 비교하고, 페이가 꼭 필요하면 같은 숙소를 페이 결제가 되는 다른 플랫폼과만 맞춰 보세요. 국내 호텔 일부는 페이 선택이 열리기도 하지만, 패키지 특가와는 중복이 잘 안 됩니다. 앱 인앱결제와 웹 결제 적립이 다를 수 있어 코드는 웹에서 한 번 더 확인하는 편이 안전합니다.",
  },
  {
    id: "card-booking",
    platform: "부킹닷컴",
    title: "부킹닷컴 카드 할인과 Genius 중복",
    body: "부킹닷컴은 해외 숙소 카드 청구할인·무이자 할부가 자주 열립니다. Genius 할인이 이미 붙은 예약은 카드 프로모션 대상에서 빠지는 달이 있으니, 코드+카드 합계와 Genius가만 비교하세요. 선결제 요금과 현장결제 요금의 카드 이벤트 대상이 다를 수 있습니다. 결제 통화가 현지 통화면 이중환전이 생길 수 있어, 가능하면 KRW 결제를 고르세요.",
  },
  {
    id: "pay-booking",
    platform: "부킹닷컴",
    title: "부킹닷컴 페이 결제와 앱 전용가",
    body: "부킹닷컴은 국내 페이 선택이 숙소마다 다릅니다. 페이가 보이면 코드 적용 → 페이 선택 순으로 금액이 바뀌는지 보고, 안 보이면 카드+Genius+코드 조합과만 비교하세요. 앱 전용가는 웹에서 페이를 골라도 같은 금액이 아닐 수 있습니다. 앱 쿠폰은 앱 결제에만 붙는 경우가 많으니, 코드 설명의 앱 전용 여부를 확인한 뒤 결제 창을 고르세요.",
  },
  {
    id: "card-yeogi",
    platform: "여기어때",
    title: "여기어때 카드 할인과 주말 요금",
    body: "여기어때는 국내 숙소 카드 즉시할인·청구할인이 자주 열립니다. 주말 전용 코드와 카드 할인을 같이 쓰는 예약이 있고, 이미 큰 특가 객실은 카드 이벤트에서 빠질 수 있습니다. 최소 결제 금액이 있는 코드는 카드 할인 전 금액 기준으로 통과 여부를 보세요. 결제 직전 카드 배너의 예상 할인액이 0원이면 그 객실은 대상이 아닙니다.",
  },
  {
    id: "pay-yeogi",
    platform: "여기어때",
    title: "여기어때 네이버페이·카카오페이 즉시할인",
    body: "여기어때는 코드 적용 후 네이버페이·카카오페이·토스페이를 고르면 페이 쿠폰이 한 번 더 뜨는 경우가 많습니다. 순서는 코드 → 페이 선택 → 페이 앱 쿠폰 확인입니다. 주말 체크인 특가와 페이 할인이 동시에 안 되는 객실이 있으니, 최종 결제액만 보고 고르면 됩니다. 앱 전용 페이 쿠폰은 웹 결제창에 안 보일 수 있습니다.",
  },
  {
    id: "card-airbnb",
    platform: "에어비앤비",
    title: "에어비앤비 카드 결제와 수수료",
    body: "에어비앤비는 국내 페이보다 카드 결제가 기본인 숙소가 많습니다. 카드 청구할인이 열려도 서비스 수수료·청소비는 할인 대상에서 빠지는 경우가 있어, 숙박 요금만 깎이는지 내역을 확인하세요. 첫 예약 코드와 카드 할인을 같이 쓰는 결제가 있고, 장기 숙박 할인과는 한쪽만 되는 호스트도 있습니다. 통화가 현지 통화면 해외수수료가 붙을 수 있습니다.",
  },
  {
    id: "pay-airbnb",
    platform: "에어비앤비",
    title: "에어비앤비에서 페이가 안 될 때",
    body: "에어비앤비는 네이버페이·카카오페이 선택이 없거나 국가·호스트에 따라 막히는 경우가 많습니다. 페이 할인을 기대한 금액과 카드+프로모션 코드 금액을 비교하세요. 페이가 꼭 필요하면 같은 일정의 호텔을 페이 결제가 되는 플랫폼과만 맞춰 보는 편이 낫습니다. 결제 수단을 바꾼 뒤 코드가 해제되면 쿠폰 칸에 다시 붙여넣으세요.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-home-not-applied",
    question: "할인코드가 적용되지 않을 때는 어떻게 하나요?",
    answer:
      "먼저 로그인 계정, 최소 결제 금액, 적용 국가, 앱 전용 여부를 확인하세요. 그래도 안 되면 브라우저 쿠키와 캐시를 지운 뒤 시크릿(프라이빗) 창에서 이 사이트의 전용 링크로 다시 접속합니다. 아고다·트립닷컴은 일반 검색으로 들어온 창과 제휴 링크 창의 요금·쿠폰 가능 여부가 다를 수 있습니다. 코드를 공백 없이 붙여넣고, 대소문자를 그대로 유지하세요. 특가·시크릿가 상품은 할인코드 적용 대상에서 빠져 있는 경우가 많습니다.",
  },
  {
    id: "faq-home-stackable",
    question: "다른 프로모션과 중복 적용이 가능한가요?",
    answer:
      "플랫폼 할인코드와 카드사 즉시할인, 네이버페이·카카오페이·토스페이 할인은 같이 되는 경우가 많습니다. 반대로 시크릿 특가, 앱 전용가, 회원 등급 추가 할인과는 중복이 막히는 편입니다. 결제 화면에서 코드 적용 후 금액이 그대로면 해당 상품은 쿠폰 제외 대상입니다. 항공권은 유가 할인과 프로모션 코드가 동시에 안 되는 구간이 있어, 코드 적용가와 미적용가를 한 번 비교하는 것이 좋습니다.",
  },
  {
    id: "faq-home-refund",
    question: "결제 후 취소하면 할인 쿠폰이 재발급되나요?",
    answer:
      "대부분 할인코드는 1회성입니다. 예약을 취소하거나 부분 환불하면 쿠폰이 다시 지급되지 않는 경우가 많고, 유효기간이 지난 코드는 복구되지 않습니다. 무료 취소 기간 안이어도 쿠폰 재발급을 보장하지 않는 플랫폼이 많습니다. 일정 변경 가능성이 있으면 무료 취소가 되는 요금을 고르고, 사용한 코드는 스크린샷으로 남겨 두세요. 재발급이 필요한 경우 각 플랫폼 고객센터에 예약번호와 코드명을 함께 문의해야 합니다.",
  },
  {
    id: "faq-hotels-not-applied",
    platform: "호텔스닷컴",
    question: "호텔스닷컴 할인코드는 어디에 입력하나요?",
    answer:
      "호텔스닷컴 코드는 숙소 상세가 아니라 결제 단계의 쿠폰/프로모션 칸에만 들어갑니다. 시크릿가·멤버 전용가면 코드가 거절되는 경우가 많으니, 일반 요금으로 바꿔 다시 넣어 보세요. 국내 호텔용 코드를 해외 호텔에 넣어도 막힙니다. 그래도 안 되면 쿠키를 지운 뒤 이 사이트의 호텔스닷컴 전용 링크로 다시 들어와 같은 계정으로 결제하세요. 대소문자와 공백 없이 붙여넣는지도 확인합니다.",
  },
  {
    id: "faq-hotels-reward",
    platform: "호텔스닷컴",
    question: "호텔스닷컴 원키 리워드와 할인코드를 같이 쓸 수 있나요?",
    answer:
      "같이 되는 예약과 코드 적용 시 리워드가 빠지는 예약이 섞여 있습니다. 결제 전 화면에 원키 리워드 적립 예정 문구가 있는지 보고, 코드 적용 전후로 그 문구가 사라지는지 비교하세요. 10박 무료 숙박 쿠폰은 사용 가능 국가·숙소 등급 제한이 있을 수 있습니다. 제3자 판매 숙소·패키지는 적립 대상에서 제외되는 경우가 많습니다.",
  },
  {
    id: "faq-hotels-refund",
    platform: "호텔스닷컴",
    question: "호텔스닷컴 할인코드 취소하면 재발급되나요?",
    answer:
      "호텔스닷컴 할인코드는 대체로 1회성이라, 무료 취소가 되는 요금이어도 코드가 자동 복구되지 않는 경우가 많습니다. 원키 리워드는 숙박 완료 후 적립되므로 취소하면 적립 예정분도 사라집니다. 일정 변경 가능성이 있으면 무료 취소 마감 시간을 확인하고, 사용한 코드명과 예약번호를 남겨 두세요. 재발급이 필요하면 호텔스닷컴 고객센터에 예약번호와 코드명을 함께 문의해야 합니다.",
  },
  {
    id: "faq-trip-where",
    platform: "트립닷컴",
    question: "트립닷컴 항공권 할인코드는 어디에 입력하나요?",
    answer:
      "항공권은 검색 결과가 아니라 승객 정보를 넣은 뒤 결제 직전 화면의 프로모션 코드 칸에 있습니다. 숙소도 결제 단계에서만 칸이 열립니다. 앱 전용 코드는 웹 결제창에 칸이 있어도 거절될 수 있으니, 코드 설명에 앱 전용이라고 적혀 있으면 트립닷컴 앱으로 이동하세요. 칸이 아예 없으면 해당 항공사·특가 운임은 코드 제외 대상인 경우가 많습니다.",
  },
  {
    id: "faq-trip-air-hotel",
    platform: "트립닷컴",
    question: "트립닷컴 항공 쿠폰을 호텔에도 쓸 수 있나요?",
    answer:
      "항공권 프로모션 코드와 숙소 할인코드는 상품이 달라 한 결제에 동시에 넣지 못합니다. 항공은 국내선/국제선·특정 항공사 제한을, 숙소는 국가·최소 숙박일 제한을 각각 확인하세요. 유가 할인이 큰 항공권은 코드를 넣는 순간 유가 할인이 사라질 수 있어, 적용가와 미적용가를 비교하는 것이 좋습니다.",
  },
  {
    id: "faq-trip-refund",
    platform: "트립닷컴",
    question: "트립닷컴 할인코드 취소하면 재발급되나요?",
    answer:
      "대부분 재발급되지 않습니다. 항공권은 취소 수수료와 별개로 코드가 소멸되고, 숙소는 무료 취소 기간이어도 쿠폰 복구를 보장하지 않는 경우가 많습니다. 일정 변경이 예상되면 환불 가능한 요금을 고르고, 코드명과 주문번호를 남겨 두세요. 재발급 문의는 트립닷컴 고객센터에 주문번호와 코드명을 함께 보내야 합니다.",
  },
  {
    id: "faq-mrt-type",
    platform: "마이리얼트립",
    question: "마이리얼트립 할인코드는 어디에 입력하나요?",
    answer:
      "앱·웹 결제 화면의 할인코드 칸에 붙여넣으세요. 마이리얼트립은 웰컴 쿠폰, 투어·티켓 코드, 숙소 코드가 분리되어 있습니다. 상품 유형을 먼저 보고 넣어야 하며, 1인 1회 제한 코드는 같은 계정 예약 이력이 있으면 막힙니다. 제주·부산 액티비티는 최소 결제 금액 조건이 있는 경우가 있습니다.",
  },
  {
    id: "faq-mrt-welcome",
    platform: "마이리얼트립",
    question: "마이리얼트립 투어 쿠폰을 숙소에도 쓸 수 있나요?",
    answer:
      "대부분 안 됩니다. 투어·티켓 전용 코드를 숙소 결제창에 넣으면 거절됩니다. 호텔·펜션은 숙소 쿠폰, 액티비티는 투어 쿠폰을 각각 쓰세요. 숙소 코드는 국내 숙소 할인코드 페이지에서도 확인할 수 있습니다.",
  },
  {
    id: "faq-mrt-refund",
    platform: "마이리얼트립",
    question: "마이리얼트립 웰컴쿠폰과 할인코드는 중복되나요?",
    answer:
      "신규 회원 웰컴 쿠폰과 별도 할인코드는 한쪽만 되는 결제가 많습니다. 결제창에서 웰컴만 넣었을 때와 할인코드만 넣었을 때 금액을 비교하세요. 카드·페이 즉시할인은 쿠폰 뒤에도 붙는 달이 있으니, 쿠폰끼리 안 되더라도 결제 수단 할인은 따로 확인하면 됩니다.",
  },
  {
    id: "faq-agoda-secret",
    platform: "아고다",
    question: "아고다 할인코드 적용 안 됨, 시크릿딜 때문인가요?",
    answer:
      "Agoda Secret Deals는 이미 할인된 요금이라 일반 할인코드가 막히는 경우가 많습니다. 같은 숙소를 시크릿가와 일반가로 열어 보고, 일반가에 코드를 넣었을 때와 시크릿가 중 낮은 쪽을 고르세요. 코드는 숙소 상세가 아니라 결제 단계에 입력합니다. 일반 검색으로 들어온 창과 이 사이트 전용 링크 창의 요금·쿠폰 가능 여부가 다를 수 있습니다.",
  },
  {
    id: "faq-agoda-currency",
    platform: "아고다",
    question: "아고다 할인코드는 원화(KRW)로 결제해야 하나요?",
    answer:
      "가능하면 KRW로 맞추는 편이 안전합니다. USD나 현지 통화로 결제하면 카드사 이중환전·해외이용수수료가 붙을 수 있습니다. 통화만 바꿔도 코드 적용 여부가 달라지는 창이 있으니, KRW로 바꾼 뒤 쿠폰 칸에 다시 붙여넣으세요. 코드가 안 보이면 쿠키를 지우고 아고다 전용 링크로 재접속합니다.",
  },
  {
    id: "faq-agoda-refund",
    platform: "아고다",
    question: "아고다 할인코드 취소하면 재발급되나요?",
    answer:
      "대부분 1회성이라 무료 취소 요금이어도 코드가 자동 복구되지 않습니다. 시크릿가로 예약한 뒤 취소하면 그 특가 창이 다시 안 열릴 수도 있습니다. 일정 변경이 예상되면 무료 취소 마감 시간을 확인하고, 코드명과 예약번호를 남겨 두세요. 재발급 문의는 아고다 고객센터에 예약번호와 코드명을 함께 보내야 합니다.",
  },
  {
    id: "faq-klook-category",
    platform: "클룩",
    question: "클룩 할인코드는 어디에 입력하나요?",
    answer:
      "장바구니 또는 결제 페이지 상단 프로모션 코드 칸에 넣습니다. 장바구니에서 거절돼도 결제 단계에서 한 번 더 되는 코드가 있습니다. 앱 전용 코드는 웹에서 막힐 수 있으니 클룩 앱으로 이동하세요. 적용 후 최종 금액이 바뀌었는지 확인합니다.",
  },
  {
    id: "faq-klook-cart",
    platform: "클룩",
    question: "클룩 유니버설 할인코드를 유심에도 쓸 수 있나요?",
    answer:
      "대부분 안 됩니다. 클룩 코드는 테마파크, 유심, 투어처럼 카테고리가 다르면 거절됩니다. 일본 유니버설·아시아 입장권 전용 코드는 유심이나 유럽 투어에 적용되지 않습니다. 장바구니에 여러 상품이 있으면 대상 상품에만 할인이 붙습니다.",
  },
  {
    id: "faq-klook-refund",
    platform: "클룩",
    question: "클룩 쿠폰이 장바구니에서 안 되면 어떻게 하나요?",
    answer:
      "결제 페이지 상단 칸에 다시 넣어 보세요. 그래도 안 되면 상품 카테고리가 코드 대상인지, 앱 전용인지를 확인하세요. 전용 링크로 상품 페이지에 다시 들어간 뒤 같은 계정으로 결제하는 편이 안전합니다.",
  },
  {
    id: "faq-nol-hotdeal",
    platform: "Nol",
    question: "놀(Nol) 할인코드는 어디에 입력하나요?",
    answer:
      "모텔·호텔 결제 화면에서 쿠폰 적용 → 코드 직접 입력을 누르세요. 주중용 코드를 주말 예약에 넣으면 막히고, 레저 티켓 쿠폰은 숙소 칸에 넣어도 거절됩니다.",
  },
  {
    id: "faq-nol-leisure",
    platform: "Nol",
    question: "놀 핫딜에서 쿠폰 적용이 안 되면 왜인가요?",
    answer:
      "이미 큰 폭으로 깎인 핫딜·타임세일 객실은 놀 할인코드 제외인 경우가 많습니다. 같은 숙소의 일반 요금에 코드를 넣었을 때와 핫딜가를 비교하세요.",
  },
  {
    id: "faq-nol-refund",
    platform: "Nol",
    question: "놀 레저 쿠폰을 숙소에도 쓸 수 있나요?",
    answer:
      "안 됩니다. 워터파크·입장권 쿠폰과 숙소 쿠폰은 따로입니다. 모텔·호텔·펜션은 숙소 코드만, 레저는 레저 전용 코드만 됩니다. 쿠폰이 막혀도 카드·페이 할인은 결제 다음 단계에서 따로 확인할 수 있습니다.",
  },
  {
    id: "faq-expedia-where",
    platform: "익스피디아",
    question: "익스피디아 할인코드는 어디에 입력하나요?",
    answer:
      "검색 결과가 아니라 결제 직전 화면의 쿠폰/프로모션 코드 칸에 있습니다. 패키지 예약은 숙소 전용 코드가 거절될 수 있으니 상품 유형을 먼저 보세요. 칸이 없으면 해당 특가는 쿠폰을 받지 않는 요금입니다. 그래도 안 되면 쿠키를 지운 뒤 이 사이트의 익스피디아 전용 링크로 다시 들어와 같은 계정으로 결제하세요.",
  },
  {
    id: "faq-expedia-package",
    platform: "익스피디아",
    question: "익스피디아 패키지 쿠폰을 호텔만 예약해도 되나요?",
    answer:
      "안 됩니다. 한 결제에 숙소 코드와 패키지 코드를 같이 넣지 못합니다. 호텔만 예약할 때는 숙소 코드, 항공+호텔이면 패키지 코드를 쓰세요. 결제 통화가 USD면 카드 수수료까지 넣고 다른 플랫폼 최종가와 맞춰 보세요.",
  },
  {
    id: "faq-expedia-refund",
    platform: "익스피디아",
    question: "익스피디아 멤버가에 쿠폰이 적용 안 되면 왜인가요?",
    answer:
      "이미 할인된 멤버가·오늘의 특가는 익스피디아 할인코드가 거절되는 경우가 많습니다. 일반가에 쿠폰을 넣었을 때와 멤버가를 비교하세요.",
  },
  {
    id: "faq-booking-genius",
    platform: "부킹닷컴",
    question: "부킹닷컴 할인코드는 어디에 입력하나요?",
    answer:
      "예약 마지막 단계의 할인 코드/바우처 칸에 넣으세요. 앱 전용 코드는 웹 결제창에서 거절될 수 있습니다.",
  },
  {
    id: "faq-booking-pay",
    platform: "부킹닷컴",
    question: "부킹닷컴 지니어스 할인과 쿠폰을 같이 쓸 수 있나요?",
    answer:
      "같이 되는 숙소와, 코드를 넣는 순간 지니어스 할인이 빠지는 숙소가 섞여 있습니다. 로그인 후 지니어스가와, 지니어스를 끈 뒤 코드만 넣은 가를 비교하세요.",
  },
  {
    id: "faq-booking-refund",
    platform: "부킹닷컴",
    question: "부킹닷컴 쿠폰은 현장결제에도 되나요?",
    answer:
      "숙소마다 다릅니다. 선결제만 코드가 되는 곳과, 현장결제로 바꾸면 코드 칸이 사라지는 곳이 있습니다. 칸이 없으면 그 요금은 쿠폰 제외입니다. 무료 취소 마감 시간도 결제 방식에 따라 달라지니 코드 적용 후에 한 번 더 확인하세요.",
  },
  {
    id: "faq-yeogi-weekend",
    platform: "여기어때",
    question: "여기어때 할인코드는 어디에 등록하나요?",
    answer:
      "숙소 결제 단계의 쿠폰/포인트에서 코드를 등록한 뒤 적용하세요. 이미 큰 특가·무한쿠폰 객실은 추가 코드가 안 될 수 있어, 일반 요금+코드와 특가를 비교하세요.",
  },
  {
    id: "faq-yeogi-min",
    platform: "여기어때",
    question: "여기어때 주말 쿠폰은 평일에도 되나요?",
    answer:
      "주말 전용 코드는 금·토 체크인에만 되는 경우가 많습니다. 일·월 체크인 예약에 넣으면 거절됩니다.",
  },
  {
    id: "faq-yeogi-refund",
    platform: "여기어때",
    question: "여기어때 쿠폰 최소금액이 안 되면 어떻게 하나요?",
    answer:
      "보통 할인 전 숙박 요금 기준입니다. 특가 적용 후 금액이 기준 아래면 거절되니, 박 수나 객실 수를 늘리거나 최소 금액이 없는 다른 쿠폰을 쓰세요. 앱 전용 코드는 웹에서 최소 금액을 채워도 막힐 수 있습니다.",
  },
  {
    id: "faq-airbnb-first",
    platform: "에어비앤비",
    question: "에어비앤비 할인코드는 어디에 입력하나요?",
    answer:
      "결제 확인 화면의 쿠폰/프로모션 칸에 넣으세요. 서비스 수수료·청소비는 할인 대상에서 빠질 수 있습니다. 통화나 결제 수단을 바꾼 뒤 코드가 사라지면 같은 칸에 다시 붙여넣으세요.",
  },
  {
    id: "faq-airbnb-longstay",
    platform: "에어비앤비",
    question: "에어비앤비 첫예약 쿠폰 적용이 안 되면 왜인가요?",
    answer:
      "해당 계정으로 숙박을 완료한 이력이 있으면 첫 예약 코드는 거절됩니다. 예약만 했다가 취소한 이력도 신규로 안 보는 경우가 있습니다. 호스트가 할인을 막아 둔 숙소도 있으니, 다른 숙소에서 한 번 더 시도해 보세요.",
  },
  {
    id: "faq-airbnb-refund",
    platform: "에어비앤비",
    question: "에어비앤비 장기숙박 할인은 몇 박부터인가요?",
    answer:
      "쿠폰마다 다르지만 보통 7박 이상입니다. 박 수를 채웠어도 호스트가 주간/월간 할인을 켜 두면 프로모션 코드가 막힐 수 있습니다. 코드 적용 후 숙박 요금만 깎이고 수수료는 그대로인 내역이 정상인 경우가 많습니다.",
  },
];

export function getCouponsByPlatform(slug?: string): Coupon[] {
  if (!slug) {
    return coupons;
  }

  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return [];
  }

  return coupons.filter((coupon) => coupon.platform === platform.name);
}

export function getCouponsByOfferHub(hub: OfferTypeInfo): Coupon[] {
  return coupons.filter(
    (coupon) =>
      (coupon.offerType === hub.type || coupon.offerType === "common") &&
      (coupon.category === hub.category || coupon.category === "공통"),
  );
}

/** 플랫폼 페이지에서는 해당 플랫폼 가이드만 반환. 홈(`/`)은 전체. 이후 DB 조회로 교체. */
export function getGuidesByPlatform(slug?: string): GuideItem[] {
  if (!slug) {
    return platformGuides;
  }

  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return [];
  }

  return platformGuides.filter((guide) => guide.platform === platform.name);
}

function filterPageScopedByName<T extends { platform?: Platform }>(
  items: T[],
  platformName?: string,
): T[] {
  if (!platformName) {
    return items.filter((item) => !item.platform);
  }

  return items.filter((item) => item.platform === platformName);
}

export function getGuidesByPlatformName(platformName: string): GuideItem[] {
  return platformGuides.filter((guide) => guide.platform === platformName);
}

export function getPaymentTipsByPlatformName(platformName: string): PaymentTip[] {
  return filterPageScopedByName(paymentTips, platformName);
}

export function getFaqsByPlatformName(platformName: string): FaqItem[] {
  const { year, month } = getFreshness();
  const period = `${year}년 ${month}월`;

  return filterPageScopedByName(faqs, platformName).map((faq, index) => {
    if (index !== 0 || faq.question.startsWith(period)) {
      return faq;
    }

    return {
      ...faq,
      question: `${period} ${faq.question}`,
    };
  });
}

/**
 * 코드세이아 네이버 블로그 여행후기 더미.
 * 홈은 RSS(`lib/reviews/naverBlogRss.ts`)를 우선 사용하고, 실패 시에만 이 목록으로 폴백.
 */
export const reviews: ReviewPost[] = [
  {
    id: "review-osaka-food",
    title: "오사카 3박 4일, 할인코드로 숙소·입장권 한꺼번에 아끼는 법",
    excerpt:
      "도톤보리 근처 호텔은 아고다·호텔스닷컴 요금을 먼저 비교하고, 유니버설 스튜디오 입장권은 클룩 프로모션 코드를 결제 직전에 넣었습니다. 첫날 동선과 카드·페이 중복 할인 순서까지 정리해 두었습니다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    blogUrl: "https://blog.naver.com/",
    publishedAt: "2026.09.01",
  },
  {
    id: "review-jeju-weekend",
    title: "제주 주말 여행기 — 마이리얼트립·Nol로 렌터카와 숙소 맞추기",
    excerpt:
      "제주 동쪽은 액티비티, 서쪽은 숙소로 나눴습니다. 마이리얼트립 투어 코드와 Nol 모텔 할인을 각각 적용한 뒤, 네이버페이 즉시할인까지 붙였을 때 최종 금액을 후기에 남겨 두었습니다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    blogUrl: "https://blog.naver.com/",
    publishedAt: "2026.08.22",
  },
  {
    id: "review-tokyo-flight",
    title: "김포-하네다 왕복, 트립닷컴 항공권 코드 적용 실수기",
    excerpt:
      "항공 검색 결과가 아니라 결제 직전 프로모션 칸에 코드를 넣어야 했습니다. 유가 할인과 코드 적용가를 비교한 과정, 앱 전용 코드 때문에 웹에서 막혔던 경험도 함께 적었습니다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    blogUrl: "https://blog.naver.com/",
    publishedAt: "2026.08.10",
  },
  {
    id: "review-bangkok-hotel",
    title: "방콕 숙소 고르기 — 시크릿가 vs 할인코드, 뭐가 더 쌀까",
    excerpt:
      "같은 호텔을 아고다 시크릿가와 일반가+코드로 열어 보고, 카드 청구할인까지 넣었을 때의 최종가를 표로 정리했습니다. KRW 결제와 USD 결제 차이도 짧게 남겨 두었습니다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    blogUrl: "https://blog.naver.com/",
    publishedAt: "2026.07.28",
  },
  {
    id: "review-europe-pass",
    title: "유럽 2주, 클룩 유심·입장권 장바구니에 코드 넣는 순서",
    excerpt:
      "유심과 박물관 티켓을 한 장바구니에 넣으면 코드가 일부만 붙는 경우가 있었습니다. 카테고리별로 나눠 결제했을 때와 최종 금액을 비교한 여행 후기입니다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    blogUrl: "https://blog.naver.com/",
    publishedAt: "2026.07.12",
  },
  {
    id: "review-busan-nol",
    title: "부산 해운대 1박, Nol 핫딜과 할인코드 중 뭐를 골랐나",
    excerpt:
      "핫딜 객실은 코드가 거절됐고, 일반 요금에 코드를 넣으니 더 저렴해졌습니다. 주중·주말 조건과 우리카드 즉시할인까지 겹친 결제 과정을 후기로 남겼습니다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
    blogUrl: "https://blog.naver.com/",
    publishedAt: "2026.06.30",
  },
];

/** RSS 실패 시 홈 폴백용 더미. */
export function getReviews(): ReviewPost[] {
  return reviews;
}
