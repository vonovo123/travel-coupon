import { cache } from "react";
import { getReviews } from "@/data/mockData";
import { fetchNaverBlogReviews } from "@/lib/reviews/naverBlogRss";
import type { ReviewPost } from "@/types/coupon";

/** 홈 항해일지. 요청당 1회만 RSS(또는 더미)를 읽는다. */
export const getHomeReviews = cache(async (): Promise<ReviewPost[]> => {
  const reviews = await fetchNaverBlogReviews(50);
  return reviews.length > 0 ? reviews : getReviews();
});
