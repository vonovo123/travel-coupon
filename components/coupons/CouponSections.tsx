import { CouponCard } from "@/components/coupons/CouponCard";
import {
  couponSectionHeading,
  groupCouponsByOfferType,
} from "@/lib/discountPageCopy";
import type { Coupon } from "@/types/coupon";

interface CouponSectionsProps {
  coupons: Coupon[];
  platformName?: string;
  hubLabel?: string;
}

export function CouponSections({
  coupons,
  platformName,
  hubLabel,
}: CouponSectionsProps) {
  if (coupons.length === 0) {
    return (
      <p className="py-8 text-sm text-deep-navy/60">
        등록된 할인코드가 없습니다.
      </p>
    );
  }

  if (hubLabel) {
    return (
      <section aria-labelledby="coupon-hub-heading" className="flex flex-col gap-3">
        <h2
          id="coupon-hub-heading"
          className="font-serif text-sm font-semibold text-deep-navy/70"
        >
          이번 달 {hubLabel}
        </h2>
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} headingAs="h3" />
        ))}
      </section>
    );
  }

  const groups = groupCouponsByOfferType(coupons);

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => {
        const headingId = `coupon-${group.type}-heading`;
        const heading = couponSectionHeading(group.type, platformName);

        return (
          <section
            key={group.type}
            aria-labelledby={headingId}
            className="flex flex-col gap-3"
          >
            <h2
              id={headingId}
              className="font-serif text-sm font-semibold text-deep-navy/70"
            >
              {heading}
            </h2>
            {group.coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} headingAs="h3" />
            ))}
          </section>
        );
      })}
    </div>
  );
}
