import { SeoAccordionItem, SeoDisclosure } from "@/components/seo-ui/SeoDisclosure";
import type { FaqItem, GuideItem, PaymentTip, Platform } from "@/types/coupon";

interface SeoContentSectionProps {
  guides: GuideItem[];
  paymentTips: PaymentTip[];
  faqs: FaqItem[];
  activePlatform?: Platform;
}

export function SeoContentSection({
  guides,
  paymentTips,
  faqs,
  activePlatform,
}: SeoContentSectionProps) {
  const guideHeading = activePlatform
    ? `${activePlatform} 할인 가이드`
    : "플랫폼별 할인 가이드";
  const paymentHeading = activePlatform
    ? `${activePlatform} 결제·중복 할인`
    : "결제 수단별 중복 할인";
  const faqHeading = activePlatform
    ? `${activePlatform} FAQ`
    : "자주 묻는 질문";
  const showPlatformLabel = !activePlatform;
  const summary = activePlatform
    ? `${activePlatform} 안내 · 가이드 · 결제 팁 · FAQ`
    : "할인코드 안내 · 가이드 · 결제 팁 · FAQ";

  return (
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

      {faqs.length > 0 ? (
        <section>
          <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
            {faqHeading}
          </h2>
          <div className="mt-1">
            {faqs.map((faq) => (
              <SeoAccordionItem key={faq.id} title={faq.question}>
                <p>{faq.answer}</p>
              </SeoAccordionItem>
            ))}
          </div>
        </section>
      ) : null}
    </SeoDisclosure>
  );
}
