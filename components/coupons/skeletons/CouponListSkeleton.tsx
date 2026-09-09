export function CouponCardSkeleton() {
  return (
    <div
      className="border border-deep-navy/10 bg-parchment p-4"
      aria-hidden
    >
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-28 animate-pulse rounded-sm bg-deep-navy/15" />
        <div className="h-5 w-14 animate-pulse rounded-sm bg-deep-navy/10" />
      </div>
      <div className="mt-3 h-4 w-[70%] animate-pulse rounded-sm bg-deep-navy/10" />
      <div className="mt-2 h-3 w-full animate-pulse rounded-sm bg-deep-navy/10" />
      <div className="mt-4 flex gap-2">
        <div className="h-10 flex-1 animate-pulse rounded-sm bg-deep-navy/10" />
        <div className="h-10 w-24 animate-pulse rounded-sm bg-deep-navy/15" />
      </div>
    </div>
  );
}

interface CouponListSkeletonProps {
  count?: number;
}

export function CouponListSkeleton({ count = 4 }: CouponListSkeletonProps) {
  return (
    <section
      aria-busy="true"
      aria-label="할인코드를 불러오는 중"
      className="flex flex-col gap-3"
    >
      <div className="mb-1 h-4 w-28 animate-pulse rounded-sm bg-deep-navy/10" />
      {Array.from({ length: count }, (_, index) => (
        <CouponCardSkeleton key={index} />
      ))}
    </section>
  );
}
