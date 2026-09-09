"use client";

import Link from "next/link";
import { listedPlatforms } from "@/data/mockData";
import { SimplePageFrame } from "@/components/layout/SimplePageFrame";

interface ErrorPageProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorPageProps) {
  return (
    <SimplePageFrame>
      <main>
        <p className="text-sm text-starlight-gold">오류</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-deep-navy sm:text-3xl">
          잠시 항해를 멈췄습니다
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-deep-navy/70">
          페이지를 불러오지 못했습니다. 다시 시도하거나 홈으로 이동해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="border border-deep-navy bg-deep-navy px-4 py-2 text-sm font-medium text-starlight-gold"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="border border-deep-navy/15 bg-parchment px-4 py-2 text-sm text-deep-navy hover:border-starlight-gold"
          >
            여행 후기
          </Link>
          {listedPlatforms.slice(0, 3).map((platform) => (
            <Link
              key={platform.slug}
              href={`/${platform.slug}`}
              className="border border-deep-navy/15 bg-parchment px-4 py-2 text-sm text-deep-navy hover:border-starlight-gold"
            >
              {platform.name}
            </Link>
          ))}
        </div>
      </main>
    </SimplePageFrame>
  );
}
