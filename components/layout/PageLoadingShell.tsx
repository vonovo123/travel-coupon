import { PlatformSidebarRail } from "@/components/layout/PlatformSidebarRail";
import { StickyPageChrome } from "@/components/layout/StickyPageChrome";
import type { ReactNode } from "react";

interface PageLoadingShellProps {
  children: ReactNode;
  footerHint?: string;
  currentSlug?: string;
}

/** URL 이동·데이터 대기 시 공통 레이아웃 (헤더 + 사이드바 유지) */
export function PageLoadingShell({
  children,
  footerHint = "불러오는 중…",
  currentSlug,
}: PageLoadingShellProps) {
  return (
    <div className="min-h-screen bg-light-sand text-deep-navy">
      <StickyPageChrome currentSlug={currentSlug} />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <main>{children}</main>
          <div className="mt-6 h-10 animate-pulse rounded-sm bg-deep-navy/5" />
          <footer className="mt-4 border-t border-deep-navy/10 py-6 text-sm text-deep-navy/40">
            {footerHint}
          </footer>
        </div>
        <PlatformSidebarRail currentSlug={currentSlug} />
      </div>
    </div>
  );
}
