import { Compass } from "lucide-react";
import { HeroShipDecoration } from "@/components/HeroShipDecoration";
import { getFreshness } from "@/lib/seo";
import type { PlatformInfo } from "@/types/coupon";

interface HeroProps {
  platform?: PlatformInfo;
  /** 스크롤 시 상단 고정용으로 줄어든 상태 */
  compact?: boolean;
  /** 홈 항해일지: 전체 대비 현재 펼친 개수 */
  reviewProgress?: {
    total: number;
    visible: number;
  };
}

/** padding/opacity만 짧게 전환 — font-size·이미지 scale 애니메이션은 제외 */
const collapse =
  "transition-[padding,margin,opacity,max-height] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Hero({
  platform,
  compact = false,
  reviewProgress,
}: HeroProps) {
  const { year, month } = getFreshness();
  const title = platform
    ? `${platform.name} 할인코드 ${month}월`
    : `${year}년 코드세이아 여행 후기`;
  const description = platform
    ? `${year}년 ${month}월 기준. ${platform.name}의 숨겨진 할인 코드를 복사한 다음 결제창에 붙여넣으면 됩니다.`
    : "코드세이아 항해일지에 남긴 여행의 기록입니다. 카드를 누르면 원문으로 이동합니다. 할인코드는 오른쪽 항로에서 플랫폼을 고르세요.";

  const badge = platform
    ? `현재 항로 · ${platform.name}`
    : reviewProgress && reviewProgress.total > 0
      ? `${reviewProgress.total}개의 항해일지 중 ${reviewProgress.visible}개 펼침`
      : "항해 후기 · 항해일지를 펼치세요";

  const tagline = platform
    ? "할인 코드를 찾아 헤매는 여행자여, 당신의 여정은 여기서 끝납니다."
    : "여행의 기록을 따라, 다음 항로의 할인을 찾으세요.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-deep-navy to-deep-navy-muted">
      <HeroShipDecoration compact={compact} />
      <div
        className={`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 ${collapse} ${
          compact ? "py-2.5 sm:py-3" : "py-5 sm:py-7"
        }`}
      >
        <div className="max-w-xl lg:max-w-2xl">
          <p
            className={`flex items-start gap-2 overflow-hidden font-serif leading-snug text-starlight-gold sm:items-center ${collapse} ${
              compact
                ? "pointer-events-none m-0 max-h-0 gap-0 opacity-0"
                : "max-h-12 opacity-100 text-sm sm:text-base"
            }`}
            aria-hidden={compact}
          >
            <Compass className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden />
            <span className="[text-shadow:0_1px_12px_rgba(11,19,43,0.9)] md:[text-shadow:none]">
              {tagline}
            </span>
          </p>
          <h1
            className={`break-keep font-serif font-semibold text-white [text-shadow:0_1px_14px_rgba(11,19,43,0.92)] md:[text-shadow:none] ${collapse} ${
              compact
                ? "mt-0 text-base sm:text-lg"
                : "mt-2 text-xl sm:text-2xl"
            }`}
          >
            {title}
          </h1>
          <p
            className={`overflow-hidden text-white/75 ${collapse} ${
              compact
                ? "pointer-events-none mt-0 max-h-0 opacity-0"
                : "mt-1.5 max-h-16 opacity-100 text-xs leading-relaxed sm:text-sm"
            }`}
            aria-hidden={compact}
          >
            {description}
          </p>
          <p
            className={`flex max-w-full flex-wrap items-center gap-2 rounded-sm border border-starlight-gold/40 bg-deep-navy/40 text-starlight-gold ${collapse} ${
              compact
                ? "mt-1.5 px-2 py-1 text-[11px] sm:text-xs"
                : "mt-3 px-2.5 py-1.5 text-xs sm:text-sm"
            }`}
            aria-live={reviewProgress ? "polite" : undefined}
          >
            <Compass className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
            {badge}
          </p>
        </div>
      </div>
    </section>
  );
}
