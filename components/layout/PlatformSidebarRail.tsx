import { PlatformSidebar } from "@/components/layout/PlatformSidebar";
import type { OfferTypeInfo, PlatformInfo } from "@/types/coupon";

interface PlatformSidebarRailProps {
  currentSlug?: string;
  listedOfferMenus?: OfferTypeInfo[];
  listedPlatforms: PlatformInfo[];
}

/** 데스크톱 사이드바: 스크롤에 고정하지 않음 (본문과 함께 흐름) */
export function PlatformSidebarRail({
  currentSlug,
  listedOfferMenus = [],
  listedPlatforms,
}: PlatformSidebarRailProps) {
  return (
    <aside
      className="hidden w-[17.5rem] shrink-0 self-start rounded-sm border border-deep-navy/10 bg-light-sand p-3 lg:block xl:w-[19rem]"
      aria-label="플랫폼 목록"
    >
      <PlatformSidebar
        currentSlug={currentSlug}
        listedOfferMenus={listedOfferMenus}
        listedPlatforms={listedPlatforms}
        dense
      />
    </aside>
  );
}
