import { PageLoadingShell } from "@/components/PageLoadingShell";
import { ReviewListSkeleton } from "@/components/skeletons/ReviewListSkeleton";

/** 홈(`/`) 로딩·Suspense fallback */
export function HomeLoading() {
  return (
    <PageLoadingShell footerHint="후기를 불러오는 중…">
      <ReviewListSkeleton count={6} />
    </PageLoadingShell>
  );
}
