"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { platforms } from "@/data/mockData";
import { offerTypeNames } from "@/data/offerTypes";
import type { Coupon } from "@/types/coupon";

interface CouponCardProps {
  coupon: Coupon;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const style = platforms.find((item) => item.name === coupon.platform);

  function markCopied() {
    setRevealed(true);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopy() {
    try {
      await copyText(coupon.code);
      markCopied();
    } catch {
      setRevealed(true);
    }
  }

  async function handleCopyAndGo() {
    window.open(coupon.affiliateLink, "_blank", "noopener,noreferrer");

    try {
      await copyText(coupon.code);
      markCopied();
    } catch {
      setRevealed(true);
    }
  }

  return (
    <article className="flex min-w-0 flex-col gap-3 border border-deep-navy/10 bg-parchment px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-starlight-gold hover:shadow-treasure sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-deep-navy text-base font-bold text-starlight-gold"
          aria-hidden
        >
          {style?.initial ?? coupon.platform.slice(0, 1)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-[15px] font-semibold text-deep-navy">
              {coupon.title}
            </h3>
            <span className="text-xs text-deep-navy/45">
              {offerTypeNames[coupon.offerType]} · {coupon.category}
            </span>
          </div>
          <p className="truncate text-sm text-deep-navy/60">
            {coupon.platform} · {coupon.description} · {coupon.validUntil}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-end">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center gap-2 border border-dashed border-deep-navy/25 bg-light-sand px-3 py-2 text-sm font-medium text-deep-navy hover:border-starlight-gold"
        >
          <span className="font-mono text-[13px] tracking-wide">
            {revealed ? coupon.code : "••••••••"}
          </span>
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={handleCopyAndGo}
          className="flex min-h-11 shrink-0 items-center justify-center bg-deep-navy px-3 py-2 text-xs font-bold tracking-tight text-starlight-gold hover:bg-deep-navy-muted sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">복사 & 적용</span>
          <span className="hidden sm:inline">코드 복사 & 적용하기</span>
        </button>
      </div>

      {copied && (
        <p role="status" className="sr-only">
          할인코드를 복사했습니다!
        </p>
      )}
    </article>
  );
}
