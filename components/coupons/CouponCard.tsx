"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { questionFromCoupon } from "@/lib/searchQuestions";
import type { Coupon } from "@/types/coupon";

interface CouponCardProps {
  coupon: Coupon;
}

const clipboardPermissionMessage =
  "할인코드가 복사되지 않았습니다. 브라우저에서 클립보드(복사) 권한을 허용한 뒤 다시 눌러 주세요. 확인을 누르면 적용 페이지로 이동합니다.";

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // execCommand로 한 번 더 시도한다.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { question, answer } = questionFromCoupon(coupon);

  function markCopied() {
    setRevealed(true);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopy() {
    const copiedOk = await copyText(coupon.code);
    setRevealed(true);
    if (copiedOk) {
      markCopied();
    }
  }

  async function handleCopyAndGo() {
    const copiedOk = await copyText(coupon.code);
    setRevealed(true);

    if (copiedOk) {
      markCopied();
    } else {
      window.alert(clipboardPermissionMessage);
    }

    window.open(coupon.affiliateLink, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="flex min-w-0 flex-col gap-3 border border-deep-navy/10 bg-parchment px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-starlight-gold hover:shadow-treasure">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-deep-navy text-base font-bold text-starlight-gold"
          aria-hidden
        >
          {coupon.initial}
        </span>
        <h2 className="min-w-0 flex-1 break-keep font-serif text-base font-semibold leading-snug text-deep-navy">
          {question}
        </h2>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-deep-navy/10 pt-3 sm:gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-deep-navy">
            {coupon.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-deep-navy/75">
            {answer}
          </p>
          <p className="mt-2 text-sm text-deep-navy/60">
            <span className="sr-only">{coupon.platform} · </span>
            유효기간 {coupon.validUntil}
          </p>
        </div>

        <div className="flex w-[7.5rem] shrink-0 flex-col gap-2 sm:w-40">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-dashed border-deep-navy/25 bg-light-sand px-2 py-2 text-sm font-medium text-deep-navy hover:border-starlight-gold sm:px-3"
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
            className="flex min-h-11 w-full items-center justify-center bg-deep-navy px-2 py-2 text-xs font-bold tracking-tight text-starlight-gold hover:bg-deep-navy-muted sm:px-3 sm:text-sm"
          >
            <span className="sm:hidden">복사 & 적용</span>
            <span className="hidden sm:inline">코드 복사 & 적용하기</span>
          </button>
        </div>
      </div>

      {copied && (
        <p role="status" className="sr-only">
          할인코드를 복사했습니다!
        </p>
      )}
    </article>
  );
}
