import { SeoAccordionItem, SeoDisclosure } from "@/components/seo-ui/SeoDisclosure";
import type { FaqItem, GuideItem, PaymentTip, Platform } from "@/types/coupon";

interface SeoContentSectionProps {
  guides: GuideItem[];
  paymentTips: PaymentTip[];
  faqs: FaqItem[];
  activePlatform?: Platform;
  /** 상품 허브(`/stay` 등)처럼 플랫폼이 아닐 때 섹션 제목 */
  sectionLabel?: string;
}

export function SeoContentSection({
  guides,
  paymentTips,
  faqs,
  activePlatform,
  sectionLabel,
}: SeoContentSectionProps) {
  const topic = activePlatform ?? sectionLabel;
  const guideHeading = activePlatform
    ? `${activePlatform} 할인코드 적용 가이드`
    : topic
      ? `${topic} 가이드`
      : "플랫폼별 할인 가이드";
  const paymentHeading = topic
    ? `${topic} 결제·중복 할인`
    : "결제 수단별 중복 할인";
  const faqHeading = topic ? `${topic} FAQ` : "자주 묻는 질문";
  const showPlatformLabel = !activePlatform && !sectionLabel;
  const summary = topic
    ? `${topic} 가이드 · 결제 팁`
    : "할인코드 가이드 · 결제 팁";
  const hasExtra = guides.length > 0 || paymentTips.length > 0;

  return (
    <>
      {faqs.length > 0 ? (
        <section className="mt-6" aria-labelledby="page-faq-heading">
          <h2
            id="page-faq-heading"
            className="font-serif text-sm font-semibold text-deep-navy/70"
          >
            {faqHeading}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {faqs.map((faq) => (
              <article
                key={faq.id}
                className="border border-deep-navy/10 bg-parchment px-4 py-3"
              >
                <h3 className="break-keep font-serif text-base font-semibold leading-snug text-deep-navy">
                  {faq.question}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-deep-navy/75">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {hasExtra ? (
        <SeoDisclosure summary={summary}>
          {guides.length > 0 ? (
            <section>
              <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
                {guideHeading}
              </h2>
              <div className="mt-1">
                {guides.map((guide) => (
                  <SeoAccordionItem key={guide.id} title={guide.title}>
                    {showPlatformLabel ? (
                      <h3 className="mb-1 font-serif text-[13px] font-semibold text-deep-navy/75">
                        {guide.platform}
                      </h3>
                    ) : null}
                    <p>{guide.body}</p>
                  </SeoAccordionItem>
                ))}
              </div>
            </section>
          ) : null}

          {paymentTips.length > 0 ? (
            <section>
              <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
                {paymentHeading}
              </h2>
              <div className="mt-1">
                {paymentTips.map((tip) => (
                  <SeoAccordionItem key={tip.id} title={tip.title}>
                    <p>{tip.body}</p>
                  </SeoAccordionItem>
                ))}
              </div>
            </section>
          ) : null}
        </SeoDisclosure>
      ) : null}
    </>
  );
}
