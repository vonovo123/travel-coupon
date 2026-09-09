"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrandChrome } from "@/components/BrandChrome";
import { PlatformSidebar } from "@/components/PlatformSidebar";
import { useReviewFeedProgress } from "@/components/ReviewFeedProgress";
import type { PlatformInfo } from "@/types/coupon";

const COMPACT_AFTER_PX = 48;
const DESKTOP_MQ = "(min-width: 768px)";

interface StickyPageChromeProps {
  currentSlug?: string;
  platform?: PlatformInfo;
}

export function StickyPageChrome({
  currentSlug,
  platform,
}: StickyPageChromeProps) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chromeHeight, setChromeHeight] = useState(0);
  const chromeRef = useRef<HTMLDivElement | null>(null);
  const reviewProgress = useReviewFeedProgress();

  useEffect(() => {
    const update = () => {
      const isDesktop = window.matchMedia(DESKTOP_MQ).matches;
      setCompact(isDesktop && window.scrollY > COMPACT_AFTER_PX);
      if (isDesktop) {
        setMenuOpen(false);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const node = chromeRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      const height = node.getBoundingClientRect().height;
      setChromeHeight(height);
      document.documentElement.style.setProperty(
        "--page-chrome-height",
        `${height}px`,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--page-chrome-height");
    };
  }, [compact, menuOpen, reviewProgress?.visible]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        aria-hidden
        className="transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{ height: chromeHeight }}
      />
      <div
        ref={chromeRef}
        className={`fixed inset-x-0 top-0 z-40 transition-shadow duration-300 ease-out ${
          compact || menuOpen
            ? "shadow-[0_8px_24px_rgba(11,19,43,0.22)]"
            : "shadow-[0_8px_24px_rgba(11,19,43,0.12)]"
        }`}
      >
        <BrandChrome
          currentSlug={currentSlug}
          platform={platform}
          compact={compact}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          reviewProgress={
            reviewProgress
              ? {
                  total: reviewProgress.total,
                  visible: reviewProgress.visible,
                }
              : undefined
          }
        />

        <div
          id="mobile-route-menu"
          className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] md:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="max-h-[min(70vh,calc(100dvh-5.5rem))] overflow-y-auto overscroll-contain border-b border-deep-navy/10 bg-light-sand px-4 py-3 sm:px-6">
              <p className="mb-2.5 text-xs text-deep-navy/45">
                이동할 페이지를 선택하세요
              </p>
              <PlatformSidebar
                currentSlug={currentSlug}
                onNavigate={closeMenu}
                dense
              />
            </div>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          aria-label="메뉴 닫기"
          className="fixed inset-0 z-30 bg-deep-navy/35 md:hidden"
          onClick={closeMenu}
        />
      ) : null}
    </>
  );
}
