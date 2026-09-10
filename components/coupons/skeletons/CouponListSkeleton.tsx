export function CouponCardSkeleton() {
  return (
    <div
      className="border border-deep-navy/10 bg-parchment p-4"
      aria-hidden
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 animate-pulse bg-deep-navy/15" />
        <div className="h-5 w-[75%] animate-pulse rounded-sm bg-deep-navy/15" />
      </div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-deep-navy/10 pt-3">
        <div>
          <div className="h-4 w-40 animate-pulse rounded-sm bg-deep-navy/15" />
          <div className="mt-2 h-4 w-full animate-pulse rounded-sm bg-deep-navy/10" />
          <div className="mt-1.5 h-4 w-[80%] animate-pulse rounded-sm bg-deep-navy/10" />
          <div className="mt-2 h-3 w-28 animate-pulse rounded-sm bg-deep-navy/10" />
        </div>
        <div className="flex w-[7.5rem] flex-col gap-2 sm:w-40">
          <div className="h-11 animate-pulse rounded-sm bg-deep-navy/10" />
          <div className="h-11 animate-pulse rounded-sm bg-deep-navy/15" />
        </div>
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
