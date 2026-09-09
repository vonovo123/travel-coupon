import Link from "next/link";
import { Compass, Map, Ship, Star } from "lucide-react";
import { platforms } from "@/data/mockData";

interface PlatformSidebarProps {
  currentSlug?: string;
  /** 모바일 드롭다운에서 항로 선택 시 메뉴 닫기 */
  onNavigate?: () => void;
  /** 모바일 드롭다운용 촘촘한 카드 (내부 스크롤 없이 한 화면에) */
  dense?: boolean;
}

const platformIcons = {
  hotelscom: Star,
  tripcom: Ship,
  myrealtrip: Map,
  agoda: Compass,
  klook: Map,
  nol: Star,
} as const;

export function PlatformSidebar({
  currentSlug,
  onNavigate,
  dense = false,
}: PlatformSidebarProps) {
  const cardClass = (active: boolean) =>
    dense
      ? `flex min-h-0 items-center gap-3 border bg-parchment px-3 py-2.5 transition duration-200 ${
          active
            ? "border-starlight-gold shadow-treasure"
            : "border-deep-navy/10"
        }`
      : `flex min-h-[5rem] items-center gap-4 border bg-parchment px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-starlight-gold hover:shadow-treasure ${
          active
            ? "border-starlight-gold shadow-treasure"
            : "border-deep-navy/10"
        }`;

  return (
    <nav
      aria-label="플랫폼 메뉴"
      className={dense ? "flex flex-col gap-2" : "flex flex-col gap-3"}
    >
      <Link
        href="/"
        aria-current={!currentSlug ? "page" : undefined}
        className={cardClass(!currentSlug)}
        onClick={onNavigate}
      >
        <span
          className={`flex shrink-0 items-center justify-center bg-deep-navy text-starlight-gold ${
            dense ? "h-10 w-10" : "h-14 w-14"
          }`}
        >
          <Compass className={dense ? "h-5 w-5" : "h-6 w-6"} aria-hidden />
        </span>
        <span
          className={`min-w-0 flex-1 font-semibold leading-snug text-deep-navy ${
            dense ? "text-sm" : "text-base sm:text-[17px]"
          }`}
        >
          여행 후기
        </span>
        <span
          className={`flex shrink-0 items-center justify-center bg-deep-navy text-xs font-bold text-starlight-gold ${
            dense ? "h-9 w-9" : "h-11 w-11"
          }`}
        >
          GO
        </span>
      </Link>

      {platforms.map((platform) => {
        const isActive = currentSlug === platform.slug;
        const Icon =
          platformIcons[platform.slug as keyof typeof platformIcons] ?? Compass;

        return (
          <Link
            key={platform.slug}
            href={`/${platform.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={cardClass(isActive)}
            onClick={onNavigate}
          >
            <span
              className={`flex shrink-0 items-center justify-center bg-deep-navy text-starlight-gold ${
                dense ? "h-10 w-10" : "h-14 w-14"
              }`}
            >
              <Icon className={dense ? "h-5 w-5" : "h-6 w-6"} aria-hidden />
            </span>
            <span
              className={`min-w-0 flex-1 font-semibold leading-snug text-deep-navy ${
                dense ? "text-sm" : "text-base sm:text-[17px]"
              }`}
            >
              {platform.name} 할인코드
            </span>
            <span
              className={`flex shrink-0 items-center justify-center bg-deep-navy text-xs font-bold text-starlight-gold ${
                dense ? "h-9 w-9" : "h-11 w-11"
              }`}
            >
              GO
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
