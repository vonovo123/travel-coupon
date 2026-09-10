import { CouponList } from "@/components/coupons/CouponList";
import { PlatformSidebarRail } from "@/components/layout/PlatformSidebarRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReviewFeedProgressProvider } from "@/components/reviews/ReviewFeedProgress";
import { StickyPageChrome } from "@/components/layout/StickyPageChrome";
import { ReviewInfiniteList } from "@/components/reviews/ReviewInfiniteList";
import { ReviewSeoSection } from "@/components/reviews/ReviewSeoSection";
import { CouponInternalLinks } from "@/components/seo-ui/CouponInternalLinks";
import { JsonLd } from "@/components/seo-ui/JsonLd";
import { SeoContentSection } from "@/components/seo-ui/SeoContentSection";
import { reviewSeoFaqs } from "@/data/reviews/reviewSeoContent";
import {
  getFaqsByPlatformName,
  getGuidesByPlatformName,
  getPaymentTipsByPlatformName,
  getReviews,
} from "@/data/mockData";
import { getFaqsByOfferHub, getGuidesByOfferHub } from "@/data/offerTypes";
import {
  getCouponsByOfferHub,
  getCouponsByPlatformSlug,
  getListedOfferMenus,
  getListedPlatforms,
  getOfferMenuBySlug,
  getPlatformBySlug,
} from "@/lib/content/catalog";
import { getFreshness } from "@/lib/seo";
import { questionFromCoupon } from "@/lib/searchQuestions";
import type { ReviewPost } from "@/types/coupon";

interface SitePageProps {
  platformSlug?: string;
  offerHubSlug?: string;
  /** 홈에서 RSS로 가져온 항해일지. 없으면 더미로 폴백. */
  reviews?: ReviewPost[];
}

export async function SitePage({
  platformSlug,
  offerHubSlug,
  reviews: reviewsProp,
}: SitePageProps) {
  const [listedPlatforms, listedOfferMenus] = await Promise.all([
    getListedPlatforms(),
    getListedOfferMenus(),
  ]);
  const platform = platformSlug
    ? await getPlatformBySlug(platformSlug)
    : undefined;
  const offerHub = offerHubSlug
    ? await getOfferMenuBySlug(offerHubSlug)
    : undefined;
  const isHome = !platform && !offerHub;
  const coupons = offerHub
    ? await getCouponsByOfferHub(offerHub)
    : platformSlug
      ? await getCouponsByPlatformSlug(platformSlug)
      : [];
  const reviews = isHome
    ? reviewsProp && reviewsProp.length > 0
      ? reviewsProp
      : getReviews()
    : [];
  const guides = offerHub
    ? getGuidesByOfferHub(offerHub)
    : platform
      ? getGuidesByPlatformName(platform.name)
      : [];
  const pagePaymentTips = platform
    ? getPaymentTipsByPlatformName(platform.name)
    : [];
  const pageFaqs = isHome
    ? reviewSeoFaqs
    : offerHub
      ? getFaqsByOfferHub(offerHub)
      : platform
        ? getFaqsByPlatformName(platform.name)
        : [];
  const { year, month } = getFreshness();
  const jsonLdName = offerHub
    ? `${year}년 ${month}월 ${offerHub.label}`
    : platform
      ? `${year}년 ${month}월 ${platform.name} 할인코드`
      : `${year}년 ${month}월 코드세이아 여행 후기`;
  const jsonLdDescription = offerHub
    ? offerHub.shortDescription
    : platform
      ? `${year}년 ${month}월 ${platform.name} 숙소·투어·항공 할인코드를 코드세이아에서 확인하고 결제창에 붙여넣으세요.`
      : "코드세이아 항해일지에 남긴 여행 후기";
  const pageLead = offerHub
    ? `${year}년 ${month}월 ${offerHub.label}입니다. ${offerHub.shortDescription}`
    : platform
      ? `${year}년 ${month}월 ${platform.name} 숙소·투어·항공 할인코드입니다. 코드를 복사한 뒤 ${platform.name} 결제창에 붙여넣으세요.`
      : "";
  const currentSlug = offerHub?.slug ?? platformSlug;
  const path = currentSlug ? `/${currentSlug}` : "/";
  const listHeading = offerHub
    ? `${offerHub.label} ${coupons.length}개`
    : `${platform?.name} 할인코드 ${coupons.length}개`;
  const couponFaqs = coupons.map((coupon) => {
    const item = questionFromCoupon(coupon);
    return {
      id: `coupon-faq-${coupon.id}`,
      question: item.question,
      answer: item.answer,
    };
  });
  const structuredFaqs = [...couponFaqs, ...pageFaqs];
  const breadcrumbs = [
    { name: "여행 후기", path: "/" },
    ...(offerHub
      ? [{ name: offerHub.label, path }]
      : platform
        ? [{ name: `${platform.name} 할인코드`, path }]
        : []),
  ];

  const pageBody = (
    <>
      <StickyPageChrome
        currentSlug={currentSlug}
        platform={platform}
        offerHub={offerHub}
        listedOfferMenus={listedOfferMenus}
        listedPlatforms={listedPlatforms}
      />

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <main>
            {isHome ? (
              <>
                <ReviewInfiniteList reviews={reviews} />
                <CouponInternalLinks
                  variant="home"
                  listedOfferMenus={listedOfferMenus}
                  listedPlatforms={listedPlatforms}
                />
              </>
            ) : (
              <>
                <p className="mb-3 text-sm leading-relaxed text-deep-navy/70">
                  {pageLead}
                </p>
                <p className="mb-2 font-serif text-sm font-semibold text-deep-navy/70">
                  {listHeading}
                </p>
                <CouponList coupons={coupons} />
                <SeoContentSection
                  guides={guides}
                  paymentTips={pagePaymentTips}
                  faqs={pageFaqs}
                  activePlatform={platform?.name}
                  sectionLabel={offerHub?.label}
                />
                <CouponInternalLinks
                  variant={offerHub ? "hub" : "platform"}
                  offerHub={offerHub}
                  platform={platform}
                  coupons={coupons}
                  listedOfferMenus={listedOfferMenus}
                  listedPlatforms={listedPlatforms}
                />
              </>
            )}
          </main>
          {isHome ? <ReviewSeoSection reviews={reviews} /> : null}
          <SiteFooter
            listedOfferMenus={listedOfferMenus}
            listedPlatforms={listedPlatforms}
            usageHint={
              isHome
                ? "카드를 누르면 후기 원문으로 이동합니다. 할인코드는 목록 아래 바로가기나 옆 메뉴에서 고르세요."
                : "할인코드를 복사한 뒤, 해당 사이트 결제 화면에서 붙여넣으세요. 적용 조건은 플랫폼마다 다를 수 있습니다."
            }
          />
        </div>
        <PlatformSidebarRail
          currentSlug={currentSlug}
          listedOfferMenus={listedOfferMenus}
          listedPlatforms={listedPlatforms}
        />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-light-sand text-deep-navy">
      <JsonLd
        name={jsonLdName}
        description={jsonLdDescription}
        path={path}
        coupons={isHome ? [] : coupons}
        reviews={reviews}
        faqs={isHome ? pageFaqs : structuredFaqs}
        breadcrumbs={breadcrumbs}
      />
      {isHome ? (
        <ReviewFeedProgressProvider total={reviews.length}>
          {pageBody}
        </ReviewFeedProgressProvider>
      ) : (
        pageBody
      )}
    </div>
  );
}
