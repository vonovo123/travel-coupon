export function ReviewCardSkeleton() {
  return (
    <div
      className="flex min-w-0 flex-col overflow-hidden border border-deep-navy/10 bg-parchment sm:flex-row"
      aria-hidden
    >
      <div className="aspect-[16/10] w-full shrink-0 animate-pulse bg-deep-navy/10 sm:aspect-auto sm:min-h-[8.5rem] sm:w-44 md:w-52" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 px-4 py-3 sm:py-4">
        <div className="h-4 w-[80%] max-w-[18rem] animate-pulse rounded-sm bg-deep-navy/15" />
        <div className="h-3 w-full animate-pulse rounded-sm bg-deep-navy/10" />
        <div className="h-3 w-[65%] animate-pulse rounded-sm bg-deep-navy/10" />
        <div className="mt-1 flex gap-1.5">
          <div className="h-5 w-14 animate-pulse rounded-sm bg-deep-navy/10" />
          <div className="h-5 w-16 animate-pulse rounded-sm bg-deep-navy/10" />
          <div className="h-5 w-12 animate-pulse rounded-sm bg-deep-navy/10" />
        </div>
        <div className="h-3 w-20 animate-pulse rounded-sm bg-deep-navy/10" />
      </div>
    </div>
  );
}
