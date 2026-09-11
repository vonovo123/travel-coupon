import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-09" });

const PLATFORM_ID = "platform-klook";

const LINKS = {
  deals:
    "https://affiliate.klook.com/redirect?aid=118311&aff_adid=1253731&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Ftetris%2Fpromo%2Fdealhighlights%2F%3Fspm%3DHome.CentralBanner%3Aany%3A%3AMwebHomeCampaignBanner%3ACampaign_LIST%26clickId%3D330f589ebb",
  linkprice: "http://app.ac/xApLhw583",
  coupons:
    "https://affiliate.klook.com/redirect?aid=26999&aff_adid=1323157&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Fcoupons%2F%3Fspm%3DHome.TopNavigation.PromoCode",
  disney:
    "https://affiliate.klook.com/redirect?aid=118311&aff_adid=1252903&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Ftetris%2Fpromo%2Fshanghaidisneyland%2F",
  japanSale:
    "https://affiliate.klook.com/redirect?aid=26999&aff_adid=1273235&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Ftetris%2Fpromo%2Fjponsale%2F",
  japanSaleRef:
    "https://affiliate.klook.com/redirect?aid=26999&aff_adid=1273235&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Ftetris%2Fpromo%2Fjponsale%2F%3Fdd_referrer%3D",
  shinkansen:
    "https://affiliate.klook.com/redirect?aid=26999&aff_adid=1323157&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Fjapan-rail%2Fshinkansen%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D743c51b681",
  woori:
    "https://affiliate.klook.com/redirect?aid=26999&aff_adid=1323157&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Ftetris%2Fpromo%2Fwooricardjpao%2F%3Fspm%3DHome.CentralBanner%3Aany%3A%3AMwebHomeCampaignBanner%3ACampaign_LIST%26clickId%3D21510bdc59%236a0e9b9631305e18b0d66a85",
  europeRail:
    "https://affiliate.klook.com/redirect?aid=26999&aff_adid=1323157&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Feurope-rail%2F%3Ffrom_des_code%3D%26to_des_code%3D%26spm%3DSearchResult.SearchResult_LIST%26clickId%3D487f6302af",
} as const;

type CouponSeed = {
  id: string;
  sortOrder: number;
  title: string;
  code: string;
  description: string;
  offerType: "common" | "stay" | "tour" | "flight" | "package";
  category: "국내" | "해외" | "공통";
  validUntil?: string;
  affiliateLink: string;
};

const coupons: CouponSeed[] = [
  {
    id: "klook-2026-09-7000",
    sortOrder: 1,
    title: "클룩 7,000원 할인코드",
    code: "클룩할인7000",
    description: "모든 상품 · 20만원 이상 구매시",
    offerType: "common",
    category: "공통",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.linkprice,
  },
  {
    id: "klook-2026-09-3000",
    sortOrder: 2,
    title: "클룩 3,000원 할인코드",
    code: "클룩할인3000",
    description: "모든 상품 · 10만원 이상 구매시",
    offerType: "common",
    category: "공통",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.linkprice,
  },
  {
    id: "klook-2026-09-2000",
    sortOrder: 3,
    title: "클룩 2,000원 할인코드",
    code: "클룩할인2000",
    description: "모든 상품 · 5만원 이상 구매시",
    offerType: "common",
    category: "공통",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.linkprice,
  },
  {
    id: "klook-2026-09-disney",
    sortOrder: 4,
    title: "상하이 디즈니랜드 10% 할인",
    code: "KLOOKSHDL10",
    description: "상하이 디즈니랜드 전용 · 최대 100만원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-12-31",
    affiliateLink: LINKS.disney,
  },
  {
    id: "klook-2026-09-eu-tour",
    sortOrder: 5,
    title: "유럽 투어 20% 할인",
    code: "KLKEUTOUR20%",
    description: "유럽 투어 전용 · 최대 2만원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.coupons,
  },
  {
    id: "klook-2026-09-usj",
    sortOrder: 6,
    title: "유니버설 스튜디오 재팬 콤보 3,000원 할인",
    code: "유니버설콤보3천원할인",
    description: "USJ 1일권 + 파워밴드 + 간사이 조이패스 콤보 전용",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-skytree",
    sortOrder: 7,
    title: "도쿄 스카이트리 티켓 15% 할인",
    code: "TKSKYTREE15%OFF",
    description: "도쿄 스카이트리 티켓 전용 · 최대 3,500원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-sanrio",
    sortOrder: 8,
    title: "도쿄 산리오 퓨로랜드 티켓 13% 할인",
    code: "SANRIOPUROLAND13%OFF",
    description: "도쿄 산리오 퓨로랜드 티켓 전용 · 최대 4,000원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-umeda",
    sortOrder: 9,
    title: "오사카 우메다 스카이 빌딩 티켓 24% 할인",
    code: "UMEDASKY&KUCHUTEIEN24%",
    description: "오사카 우메다 스카이 빌딩 티켓 전용 · 최대 4,000원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-huistenbosch",
    sortOrder: 10,
    title: "하우스텐보스 티켓 13% 할인",
    code: "HUISTENBOSCH13%OFF",
    description: "하우스텐보스 티켓 전용 · 최대 7,000원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-teamlab-osaka",
    sortOrder: 11,
    title: "팀랩 보태니컬 가든 티켓 16% 할인",
    code: "TEAMLAB16%OFF",
    description: "팀랩 보태니컬 가든 오사카 티켓 전용 · 최대 2,800원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-teamlab-kyoto",
    sortOrder: 12,
    title: "팀랩 바이오볼텍스 교토 티켓 12% 할인",
    code: "TEAMLABKYOTO12%",
    description: "팀랩 바이오볼텍스 교토 티켓 전용 · 최대 4,000원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-legoland",
    sortOrder: 13,
    title: "레고랜드 재팬 티켓 10% 할인",
    code: "LEGOLANDJP10%",
    description: "나고야 레고랜드 재팬 엄선 관광지 전용 · 최대 4,000원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-solaniwa",
    sortOrder: 14,
    title: "오사카 소라니와 온천 티켓 28% 할인",
    code: "SOLANIWAONSEN28%",
    description: "오사카 소라니와 온천 티켓 전용 · 최대 5,500원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.japanSale,
  },
  {
    id: "klook-2026-09-jp-rail",
    sortOrder: 15,
    title: "일본 신칸센 그룹 5% 할인",
    code: "JPRAILGROUP",
    description: "일본 신칸센 전용 · 3인 이상 그룹 · 77,400원 이상 구매시",
    offerType: "tour",
    category: "해외",
    affiliateLink: LINKS.shinkansen,
  },
  {
    id: "klook-2026-09-woori-tour",
    sortOrder: 16,
    title: "우리카드 마스터카드 일본 액티비티·투어 10% 할인",
    code: "WMTA10%Q3",
    description: "우리카드 마스터카드 고객 대상 · USD 결제 전용 · 최소 구매 금액 없음",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.woori,
  },
  {
    id: "klook-2026-09-woori-att",
    sortOrder: 17,
    title: "우리카드 마스터카드 일본 어트랙션 10% 할인",
    code: "WMAT10%Q3",
    description: "우리카드 마스터카드 고객 대상 · USD 결제 전용 · 최소 구매 금액 없음",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.woori,
  },
  {
    id: "klook-2026-09-woori-rail",
    sortOrder: 18,
    title: "우리카드 마스터카드 일본 교통 10% 할인",
    code: "WMMO10%Q3",
    description: "우리카드 마스터카드 고객 대상 · USD 결제 전용 · 최소 구매 금액 없음",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-09-30",
    affiliateLink: LINKS.woori,
  },
  {
    id: "klook-2026-09-mc-10",
    sortOrder: 19,
    title: "마스터카드 월드 전 품목 10% 할인",
    code: "MCWORLD10OFF",
    description: "마스터카드 결제 전용 · 541,900원 이상 구매시",
    offerType: "common",
    category: "공통",
    validUntil: "2026-12-31",
    affiliateLink: LINKS.europeRail,
  },
  {
    id: "klook-2026-09-mc-5",
    sortOrder: 20,
    title: "마스터카드 월드 전 품목 5% 할인",
    code: "MCWORLD5OFF",
    description: "마스터카드 결제 전용 · 387,100원 이상 구매시",
    offerType: "common",
    category: "공통",
    validUntil: "2026-12-31",
    affiliateLink: LINKS.europeRail,
  },
  {
    id: "klook-2026-09-jp-att-5",
    sortOrder: 21,
    title: "일본 어트랙션 5% 할인",
    code: "일본어트랙션5%",
    description: "일본 어트랙션 전용 · 최대 4,000원 할인",
    offerType: "tour",
    category: "해외",
    validUntil: "2026-12-31",
    affiliateLink: LINKS.japanSaleRef,
  },
];

async function seed() {
  const platform = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0]{_id}`,
    { id: PLATFORM_ID },
  );

  if (!platform) {
    throw new Error(
      `${PLATFORM_ID} 문서가 없습니다. Studio에서 클룩 플랫폼을 먼저 만드세요.`,
    );
  }

  const keepIds = new Set(coupons.map((coupon) => `coupon-${coupon.id}`));
  const existing = await client.fetch<{ _id: string }[]>(
    `*[_type == "coupon" && platform._ref == $platformId]{_id}`,
    { platformId: PLATFORM_ID },
  );

  const transaction = client.transaction();

  transaction.patch(PLATFORM_ID, (patch) =>
    patch.set({
      listed: true,
      affiliateLink: LINKS.deals,
      bannerText:
        "2026년 9월 클룩 할인코드. 전 상품 정액 할인과 일본 티켓·우리카드 프로모를 확인하세요.",
    }),
  );

  for (const extra of existing) {
    if (!keepIds.has(extra._id)) {
      transaction.delete(extra._id);
    }
  }

  for (const coupon of coupons) {
    transaction.createOrReplace({
      _id: `coupon-${coupon.id}`,
      _type: "coupon",
      title: coupon.title,
      year: 2026,
      month: 9,
      sortOrder: coupon.sortOrder,
      platform: {
        _type: "reference",
        _ref: PLATFORM_ID,
      },
      offerType: coupon.offerType,
      category: coupon.category,
      code: coupon.code,
      description: coupon.description,
      affiliateLink: coupon.affiliateLink,
      ...(coupon.validUntil ? { validUntil: coupon.validUntil } : {}),
    });
  }

  await transaction.commit();
  console.log(
    `클룩 할인코드 ${coupons.length}개에 세일서치와 같은 제휴 URL을 넣었습니다.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
