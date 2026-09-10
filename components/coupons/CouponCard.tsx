"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { BrandThumb } from "@/components/media/BrandThumb";
import { descriptionLines } from "@/lib/descriptionLines";
import { discountImageAlt } from "@/lib/discountPageCopy";
import type { Coupon } from "@/types/coupon";

interface CouponCardProps {
  coupon: Coupon;
  headingAs?: "h2" | "h3";
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

export function CouponCard({ coupon, headingAs = "h2" }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const code = coupon.code?.trim();
  const Heading = headingAs;

  function markCopied() {
    setRevealed(true);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopy() {
    if (!code) {
      return;
    }

    const copiedOk = await copyText(code);
    setRevealed(true);
    if (copiedOk) {
      markCopied();
    }
  }

  async function handleCopyAndGo() {
    if (!code) {
      return;
    }

    const copiedOk = await copyText(code);
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
        <BrandThumb
          src={coupon.imageUrl}
          alt={discountImageAlt({
            platformName: coupon.platform,
            year: coupon.year,
            month: coupon.month,
            title: coupon.title,
          })}
          fallback={coupon.initial}
          className="h-12 w-12"
          imageClassName="object-cover"
        />
        <Heading className="min-w-0 flex-1 break-keep font-serif text-base font-semibold leading-snug text-deep-navy">
          {coupon.title}
        </Heading>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-t border-deep-navy/10 pt-3 sm:gap-4">
        <div className="min-w-0">
          <ul className="space-y-1 text-sm leading-relaxed text-deep-navy/75">
            {descriptionLines(coupon.description).map((line, index) => (
              <li key={`${coupon.id}-desc-${index}`}>{line}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-deep-navy/60">
            <span className="sr-only">{coupon.platform} · </span>
            유효기간 {coupon.validUntil}
          </p>
        </div>

        <div className="flex w-[7.5rem] shrink-0 flex-col gap-2 sm:w-40">
          {code ? (
            <>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-dashed border-deep-navy/25 bg-light-sand px-2 py-2 text-sm font-medium text-deep-navy hover:border-starlight-gold sm:px-3"
              >
                <span className="font-mono text-[13px] tracking-wide">
                  {revealed ? code : "••••••••"}
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
            </>
          ) : (
            <a
              href={coupon.affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex min-h-11 w-full items-center justify-center bg-deep-navy px-2 py-2 text-sm font-bold tracking-tight text-starlight-gold hover:bg-deep-navy-muted sm:px-3"
            >
              쿠폰 받기
            </a>
          )}
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
