import Link from "next/link";
import type { Coupon, OfferTypeInfo, PlatformInfo } from "@/types/coupon";

interface CouponInternalLinksProps {
  variant: "home" | "hub" | "platform";
  listedOfferMenus?: OfferTypeInfo[];
  listedPlatforms: PlatformInfo[];
  offerHub?: OfferTypeInfo;
  platform?: PlatformInfo;
  coupons?: Coupon[];
}

function LinkGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="font-serif text-sm font-semibold text-deep-navy/70">
        {title}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex border border-deep-navy/10 bg-parchment px-2.5 py-1.5 text-[13px] text-deep-navy/80 transition hover:border-starlight-gold hover:text-deep-navy"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CouponInternalLinks({
  variant,
  listedOfferMenus = [],
  listedPlatforms,
  offerHub,
  platform,
  coupons = [],
}: CouponInternalLinksProps) {
  if (variant === "home") {
    return (
      <nav aria-label="할인코드 바로가기" className="mt-6 space-y-4">
        <LinkGroup
          title="플랫폼 할인코드"
          items={listedPlatforms.map((item) => ({
            href: `/${item.slug}`,
            label: `${item.name} 할인코드`,
          }))}
        />
        <LinkGroup
          title="상품별 할인코드"
          items={listedOfferMenus.map((hub) => ({
            href: `/${hub.slug}`,
            label: hub.label,
          }))}
        />
      </nav>
    );
  }

  if (variant === "hub" && offerHub) {
    const relatedPlatforms = listedPlatforms.filter((item) =>
      coupons.some((coupon) => coupon.platform === item.name),
    );
    const siblingHubs = listedOfferMenus.filter(
      (hub) => hub.type === offerHub.type && hub.slug !== offerHub.slug,
    );

    return (
      <nav aria-label="관련 할인코드" className="mt-6 space-y-4">
        <LinkGroup
          title={`${offerHub.name} 코드를 쓰는 플랫폼`}
          items={relatedPlatforms.map((item) => ({
            href: `/${item.slug}`,
            label: `${item.name} 할인코드`,
          }))}
        />
        <LinkGroup
          title="같은 상품의 다른 지역"
          items={siblingHubs.map((hub) => ({
            href: `/${hub.slug}`,
            label: hub.label,
          }))}
        />
      </nav>
    );
  }

  if (variant === "platform" && platform) {
    const relatedHubs = listedOfferMenus.filter((hub) =>
      coupons.some(
        (coupon) =>
          coupon.offerType === hub.type &&
          (coupon.category === hub.category || coupon.category === "공통"),
      ),
    );

    return (
      <nav aria-label="관련 할인코드" className="mt-6 space-y-4">
        <LinkGroup
          title={`${platform.name} 코드를 상품별로 보기`}
          items={relatedHubs.map((hub) => ({
            href: `/${hub.slug}`,
            label: hub.label,
          }))}
        />
      </nav>
    );
  }

  return null;
}
