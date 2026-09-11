import Link from "next/link";
import { offerTypeNames } from "@/data/offerTypes";
import type { OfferType, OfferTypeInfo, PlatformInfo } from "@/types/coupon";

interface SiteFooterProps {
  usageHint?: string;
  listedOfferMenus?: OfferTypeInfo[];
  listedPlatforms?: PlatformInfo[];
}

const offerTypeOrder: OfferType[] = ["stay", "tour", "flight", "package"];

const footerLinkClass =
  "text-deep-navy/70 transition hover:text-starlight-gold";

export function SiteFooter({
  usageHint,
  listedOfferMenus = [],
  listedPlatforms = [],
}: SiteFooterProps) {
  return (
    <footer className="border-t border-deep-navy/10 pt-8 pb-10 text-sm">
      {usageHint ? (
        <p className="text-deep-navy/50">{usageHint}</p>
      ) : null}

      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
          usageHint ? "mt-6" : ""
        }`}
      >
        <nav aria-label="플랫폼 할인코드">
          <p className="font-sans text-sm font-semibold text-deep-navy">
            플랫폼
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {listedPlatforms.map((platform) => (
              <li key={platform.slug}>
                <Link href={`/${platform.slug}`} className={footerLinkClass}>
                  {platform.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="상품별 할인코드">
          <p className="font-sans text-sm font-semibold text-deep-navy">
            상품별
          </p>
          <ul className="mt-3 space-y-2">
            {offerTypeOrder.map((type) => {
              const hubs = listedOfferMenus.filter((hub) => hub.type === type);

              if (hubs.length === 0) {
                return null;
              }

              return (
                <li
                  key={type}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
                >
                  <span className="w-10 shrink-0 text-deep-navy/45">
                    {offerTypeNames[type]}
                  </span>
                  {hubs.map((hub, index) => (
                    <span key={hub.slug} className="flex items-baseline gap-2">
                      {index > 0 ? (
                        <span className="text-deep-navy/20" aria-hidden>
                          ·
                        </span>
                      ) : null}
                      <Link
                        href={`/${hub.slug}`}
                        className={footerLinkClass}
                        aria-label={hub.label}
                      >
                        {hub.category}
                      </Link>
                    </span>
                  ))}
                </li>
              );
            })}
          </ul>
        </nav>

        <nav aria-label="사이트 정보">
          <p className="font-sans text-sm font-semibold text-deep-navy">
            코드세이아
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/" className={footerLinkClass}>
                여행 후기
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={footerLinkClass}>
                개인정보·제휴 고지
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <p className="mt-8 border-t border-deep-navy/10 pt-4 text-xs leading-relaxed text-deep-navy/40">
        일부 링크는 제휴 링크입니다. 예약을 하면 코드세이아가 수수료를 받을 수
        있으며, 이용 금액이 더 오르지는 않습니다.
      </p>
    </footer>
  );
}
