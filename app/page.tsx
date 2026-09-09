import type { Metadata } from "next";
import { Suspense } from "react";
import { SitePage } from "@/components/pages/SitePage";
import { HomeLoading } from "@/components/layout/HomeLoading";
import { getHomeReviews } from "@/lib/reviews/homeReviews";
import { buildHomeMetadataFromReviews } from "@/lib/reviews/reviewKeywords";
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
  return <SitePage reviews={reviews} />;
}

export default function Page() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomePageContent />
    </Suspense>
  );
}
