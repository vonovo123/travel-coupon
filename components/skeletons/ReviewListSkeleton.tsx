import { ReviewCardSkeleton } from "@/components/skeletons/ReviewCardSkeleton";

interface ReviewListSkeletonProps {
  count?: number;
}

export function ReviewListSkeleton({ count = 6 }: ReviewListSkeletonProps) {
  return (
    <section
      aria-busy="true"
      aria-label="후기를 불러오는 중"
      className="flex flex-col gap-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <ReviewCardSkeleton key={index} />
      ))}
    </section>
  );
}
