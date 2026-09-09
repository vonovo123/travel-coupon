import { CouponList } from "@/components/CouponList";
import { PlatformSidebarRail } from "@/components/PlatformSidebarRail";
import { ReviewFeedProgressProvider } from "@/components/ReviewFeedProgress";
import { StickyPageChrome } from "@/components/StickyPageChrome";
import { ReviewInfiniteList } from "@/components/ReviewInfiniteList";
import { ReviewSeoSection } from "@/components/ReviewSeoSection";
import { JsonLd } from "@/components/SEO/JsonLd";
import { SeoContentSection } from "@/components/SeoContentSection";
import { reviewSeoFaqs } from "@/data/reviewSeoContent";
import {
  getCouponsByPlatform,
  getFaqsByPlatform,
  getGuidesByPlatform,
  getPaymentTipsByPlatform,
  getPlatformBySlug,
  getReviews,
} from "@/data/mockData";
import type { ReviewPost } from "@/types/coupon";

interface CouponPageProps {
  platformSlug?: string;
  /** 홈에서 RSS로 가져온 항해일지. 없으면 더미로 폴백. */
  reviews?: ReviewPost[];
}

export function CouponPage({
  platformSlug,
  reviews: reviewsProp,
}: CouponPageProps) {
  const platform = platformSlug ? getPlatformBySlug(platformSlug) : undefined;
  const isHome = !platform;
  const coupons = getCouponsByPlatform(platformSlug);
  const reviews = isHome
    ? reviewsProp && reviewsProp.length > 0
      ? reviewsProp
      : getReviews()
    : [];
  const guides = isHome ? [] : getGuidesByPlatform(platformSlug);
  const pagePaymentTips = isHome ? [] : getPaymentTipsByPlatform(platformSlug);
  const pageFaqs = isHome ? reviewSeoFaqs : getFaqsByPlatform(platformSlug);
  const jsonLdName = platform
    ? `코드세이아 · ${platform.name} 할인코드`
    : "코드세이아 · 여행 후기";
  const jsonLdDescription = platform
    ? `코드세이아에서 찾은 ${platform.name} 할인코드`
    : "코드세이아 항해일지에 남긴 여행 후기";
  const path = platform ? `/${platform.slug}` : "/";

  const pageBody = (
    <>
      <StickyPageChrome currentSlug={platformSlug} platform={platform} />

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <main>
            {isHome ? (
              <ReviewInfiniteList reviews={reviews} />
            ) : (
              <>
                <p className="mb-2 text-sm text-deep-navy/45">
                  할인코드 {coupons.length}개
                </p>
                <CouponList coupons={coupons} />
              </>
            )}
          </main>
          {isHome ? (
            <ReviewSeoSection reviews={reviews} />
          ) : (
            <SeoContentSection
              guides={guides}
              paymentTips={pagePaymentTips}
              faqs={pageFaqs}
              activePlatform={platform?.name}
            />
          )}
          <footer className="border-t border-deep-navy/10 py-6 text-sm text-deep-navy/55">
            {isHome
              ? "카드를 누르면 후기 원문으로 이동합니다. 할인코드는 옆 메뉴(모바일은 상단 버튼)에서 플랫폼을 고르세요."
              : "할인코드를 복사한 뒤, 해당 사이트 결제 화면에서 붙여넣으세요. 적용 조건은 플랫폼마다 다를 수 있습니다."}
          </footer>
        </div>
        <PlatformSidebarRail currentSlug={platformSlug} />
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
        faqs={pageFaqs}
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
