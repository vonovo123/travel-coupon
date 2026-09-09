import { PageLoadingShell } from "@/components/layout/PageLoadingShell";
import { CouponListSkeleton } from "@/components/coupons/skeletons/CouponListSkeleton";

interface PlatformLoadingProps {
  platformSlug?: string;
}

/** 플랫폼 할인코드 URL 이동 시 스켈레톤 */
export function PlatformLoading({ platformSlug }: PlatformLoadingProps) {
  return (
    <PageLoadingShell
      currentSlug={platformSlug}
      footerHint="할인코드를 불러오는 중…"
    >
      <CouponListSkeleton count={4} />
    </PageLoadingShell>
  );
}
