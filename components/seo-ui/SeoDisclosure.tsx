import type { ReactNode } from "react";

interface SeoDisclosureProps {
  /** 접힌 상태에서 보이는 한 줄 요약 */
  summary: string;
  children: ReactNode;
}

/** 기본 접힘. HTML은 그대로라 크롤러가 읽을 수 있고, UI는 짧게 유지. */
export function SeoDisclosure({ summary, children }: SeoDisclosureProps) {
  return (
    <details className="group mt-6 border-t border-deep-navy/10 pb-8 pt-2">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm py-2.5 text-sm text-deep-navy/45 transition-colors hover:text-deep-navy/70 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 leading-snug">{summary}</span>
        <span className="shrink-0 text-xs font-medium text-starlight-gold/90 group-open:hidden">
          펼치기
        </span>
        <span className="hidden shrink-0 text-xs font-medium text-starlight-gold/90 group-open:inline">
          접기
        </span>
      </summary>
      <div className="space-y-7 border-t border-deep-navy/5 pt-4 text-sm text-deep-navy/65">
        {children}
      </div>
    </details>
  );
}

export function SeoAccordionItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group/item border-b border-deep-navy/10 py-2 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-[13px] font-medium text-deep-navy/80 [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-starlight-gold group-open/item:hidden" aria-hidden>
          +
        </span>
        <span
          className="hidden text-starlight-gold group-open/item:inline"
          aria-hidden
        >
          −
        </span>
      </summary>
      <div className="pb-1 pt-1.5 text-[13px] leading-relaxed text-deep-navy/60">
        {children}
      </div>
    </details>
  );
}
