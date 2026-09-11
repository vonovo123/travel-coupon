"use client";

import Link from "next/link";
import { Compass, Map as MapIcon, ScrollText, X } from "lucide-react";
import { HeroShipDecoration } from "@/components/layout/HeroShipDecoration";
import { getFreshness } from "@/lib/seo";
import type { OfferTypeInfo, PlatformInfo } from "@/types/coupon";

interface BrandChromeProps {
  currentSlug?: string;
  platform?: PlatformInfo;
  offerHub?: OfferTypeInfo;
  compact?: boolean;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  reviewProgress?: {
    total: number;
    visible: number;
  };
  /** 로딩 화면은 H1을 쓰지 않아 본문 제목과 겹치지 않게 한다. */
  headingAs?: "h1" | "p";
  /** H1은 쿠폰 데이터로 만든 검색용 카피를 쓴다. */
  pageTitle?: string;
  updatedLabel?: string;
}

const collapse =
  "transition-[padding,margin,opacity,max-height] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]";

export function BrandChrome({
  currentSlug,
  platform,
  offerHub,
  compact = false,
  menuOpen = false,
  onMenuToggle,
  reviewProgress,
  headingAs = "h1",
  pageTitle,
  updatedLabel,
}: BrandChromeProps) {
  const { year, month } = getFreshness();
  const heading = pageTitle
    ? pageTitle
    : offerHub
      ? `${year}년 ${month}월 ${offerHub.label}`
      : platform
        ? `${year}년 ${month}월 ${platform.name} 할인코드`
        : `${year}년 ${month}월 코드세이아 여행 후기`;
  const badge = updatedLabel
    ? `최종 업데이트 · ${updatedLabel}`
    : offerHub
      ? `현재 항로 · ${offerHub.label}`
      : platform
        ? `현재 항로 · ${platform.name}`
        : reviewProgress && reviewProgress.total > 0
          ? `${reviewProgress.total}개 후기 중 ${reviewProgress.visible}개 표시`
          : "여행 후기 목록";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-deep-navy to-deep-navy-muted">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <HeroShipDecoration compact={compact} />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 ${collapse} ${
          compact ? "py-2.5" : "py-3 md:py-5"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              aria-current={!currentSlug ? "page" : undefined}
              className="flex shrink-0 items-center gap-2 font-sans text-lg font-semibold tracking-tight text-starlight-gold sm:text-xl"
            >
              <Compass className="h-5 w-5" aria-hidden />
              코드세이아
            </Link>
            <p className="min-w-0 flex-1 truncate text-sm text-white/70">
              할인 코드를 찾아 헤매는 여행자의 종착지
            </p>
            {onMenuToggle ? (
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-starlight-gold/45 bg-deep-navy-muted px-2.5 py-1.5 text-xs font-medium text-starlight-gold md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-route-menu"
                onClick={onMenuToggle}
              >
                {menuOpen ? (
                  <>
                    <X className="h-3.5 w-3.5" aria-hidden />
                    닫기
                  </>
                ) : (
                  <>
                    <MapIcon className="h-3.5 w-3.5" aria-hidden />
                    메뉴
                  </>
                )}
              </button>
            ) : null}
          </div>

          {headingAs === "h1" ? (
            <h1
              className={
                compact
                  ? "sr-only"
                  : "sr-only break-keep font-sans font-semibold text-white md:relative md:mt-3 md:h-auto md:w-auto md:overflow-visible md:whitespace-normal md:p-0 md:m-0 md:text-xl md:[clip:auto] lg:text-2xl"
              }
            >
              {heading}
            </h1>
          ) : (
            <p
              className={
                compact
                  ? "sr-only"
                  : "sr-only break-keep font-sans font-semibold text-white md:relative md:mt-3 md:h-auto md:w-auto md:overflow-visible md:whitespace-normal md:p-0 md:m-0 md:text-xl md:[clip:auto] lg:text-2xl"
              }
            >
              {heading}
            </p>
          )}

          <p
            className={`inline-flex w-fit max-w-full items-center gap-2 self-start rounded-sm border border-starlight-gold/40 bg-deep-navy/40 text-starlight-gold ${collapse} ${
              compact
                ? "mt-2 px-2.5 py-1 text-[11px] sm:text-xs"
                : "mt-3 px-2.5 py-1.5 text-xs sm:text-sm"
            }`}
            aria-live={reviewProgress ? "polite" : undefined}
          >
            <ScrollText
              className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
              aria-hidden
            />
            <span>{badge}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
