import type { Metadata } from "next";
import { Suspense } from "react";
import { CouponPage } from "@/components/CouponPage";
import { HomeLoading } from "@/components/HomeLoading";
import { getHomeReviews } from "@/lib/homeReviews";
import { buildHomeMetadataFromReviews } from "@/lib/reviewKeywords";
import { buildHomeMetadata } from "@/lib/seo";

/** RSS는 1시간마다 갱신. 할인코드 페이지와 분리. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const reviews = await getHomeReviews();
  if (reviews.length === 0) {
    return buildHomeMetadata();
  }
  return buildHomeMetadataFromReviews(reviews);
}

async function HomePageContent() {
  const reviews = await getHomeReviews();
  return <CouponPage reviews={reviews} />;
}

export default function Page() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomePageContent />
    </Suspense>
  );
}
