"use client";

import Link from "next/link";
import { Compass, Map as MapIcon, X } from "lucide-react";

interface HeaderProps {
  currentSlug?: string;
  /** 모바일 항로 메뉴 열림 여부 */
  menuOpen?: boolean;
  onMenuToggle?: () => void;
}

export function Header({
  currentSlug,
  menuOpen = false,
  onMenuToggle,
}: HeaderProps) {
  return (
    <header className="border-b border-starlight-gold/30 bg-deep-navy">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-current={!currentSlug ? "page" : undefined}
          className="flex shrink-0 items-center gap-2 font-serif text-lg tracking-tight text-starlight-gold sm:text-xl"
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
                항로
              </>
            )}
          </button>
        ) : null}
      </div>
    </header>
  );
}
