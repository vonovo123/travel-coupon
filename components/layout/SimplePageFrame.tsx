"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { OfferTypeInfo, PlatformInfo } from "@/types/coupon";

interface SimplePageFrameProps {
  children: React.ReactNode;
  listedOfferMenus?: OfferTypeInfo[];
  listedPlatforms?: PlatformInfo[];
}

export function SimplePageFrame({
  children,
  listedOfferMenus = [],
  listedPlatforms = [],
}: SimplePageFrameProps) {
  return (
    <div className="min-h-screen bg-light-sand text-deep-navy">
      <header className="bg-gradient-to-b from-deep-navy to-deep-navy-muted">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-lg tracking-tight text-starlight-gold sm:text-xl"
          >
            <Compass className="h-5 w-5" aria-hidden />
            코드세이아
          </Link>
          <p className="min-w-0 flex-1 truncate text-sm text-white/70">
            할인 코드를 찾아 헤매는 여행자의 종착지
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
        <SiteFooter
          listedOfferMenus={listedOfferMenus}
          listedPlatforms={listedPlatforms}
        />
      </div>
    </div>
  );
}
