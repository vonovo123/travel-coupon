"use client";

import { useEffect, useRef, useState } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import { useReviewFeedProgress } from "@/components/ReviewFeedProgress";
import { ReviewCardSkeleton } from "@/components/skeletons/ReviewCardSkeleton";
import type { ReviewPost } from "@/types/coupon";

const PAGE_SIZE = 10;
/** 다음 묶음이 너무 빨리 붙지 않도록 짧게 지연 — 로딩 문구가 눈에 들어오게 */
const LOAD_MORE_DELAY_MS = 480;

interface ReviewInfiniteListProps {
  reviews: ReviewPost[];
}

export function ReviewInfiniteList({ reviews }: ReviewInfiniteListProps) {
  const reviewProgress = useReviewFeedProgress();
  const setProgressVisible = reviewProgress?.setVisible;
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(PAGE_SIZE, reviews.length),
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);
  const hasMore = visibleCount < reviews.length;
  const visibleReviews = reviews.slice(0, visibleCount);

  useEffect(() => {
    const next = Math.min(PAGE_SIZE, reviews.length);
    setVisibleCount(next);
    setIsLoadingMore(false);
    loadingRef.current = false;
    setProgressVisible?.(next);
  }, [reviews, setProgressVisible]);

  useEffect(() => {
    setProgressVisible?.(visibleCount);
  }, [visibleCount, setProgressVisible]);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const node = sentinelRef.current;
    if (!node) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || loadingRef.current) {
          return;
        }

        loadingRef.current = true;
        setIsLoadingMore(true);

        timer = setTimeout(() => {
          if (cancelled) {
            return;
          }
          setVisibleCount((current) =>
            Math.min(current + PAGE_SIZE, reviews.length),
          );
          setIsLoadingMore(false);
          loadingRef.current = false;
        }, LOAD_MORE_DELAY_MS);
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
      observer.disconnect();
    };
  }, [hasMore, reviews.length, visibleCount]);

  if (reviews.length === 0) {
    return (
      <p className="py-8 text-sm text-deep-navy/60">
        아직 등록된 여행 후기가 없습니다.
      </p>
    );
  }

  return (
    <section aria-label="여행 후기 목록" className="flex flex-col gap-3">
      {visibleReviews.map((review, index) => (
        <ReviewCard
          key={review.id}
          review={review}
          priority={index < 2}
        />
      ))}

      {isLoadingMore ? (
        <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>
      ) : null}

      {hasMore ? (
        <div
          ref={sentinelRef}
          className="flex items-center justify-center gap-2 py-3 text-sm text-deep-navy/45"
        >
          {isLoadingMore ? null : (
            <>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-starlight-gold opacity-40"
                aria-hidden
              />
              아래로 스크롤하면 더 볼 수 있습니다
            </>
          )}
        </div>
      ) : (
        <p className="py-4 text-center text-sm text-deep-navy/40">
          마지막 후기입니다
        </p>
      )}
    </section>
  );
}
