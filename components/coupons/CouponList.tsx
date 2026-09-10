import { CouponCard } from "@/components/coupons/CouponCard";
import type { Coupon } from "@/types/coupon";

interface CouponListProps {
  coupons: Coupon[];
}

export function CouponList({ coupons }: CouponListProps) {
  if (coupons.length === 0) {
    return (
      <p className="py-8 text-sm text-deep-navy/60">
        등록된 할인코드가 없습니다.
      </p>
    );
  }

  return (
    <section aria-label="할인 코드 목록" className="flex flex-col gap-3">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </section>
  );
}
