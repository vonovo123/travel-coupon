import { SeoAccordionItem, SeoDisclosure } from "@/components/seo-ui/SeoDisclosure";
import {
  reviewSeoFaqs,
  reviewSeoGuides,
} from "@/data/reviews/reviewSeoContent";
import type { ReviewPost } from "@/types/coupon";

interface ReviewSeoSectionProps {
  reviews: ReviewPost[];
}

export function ReviewSeoSection({ reviews }: ReviewSeoSectionProps) {
  const latest = reviews.slice(0, 20);

  return (
    <SeoDisclosure summary="후기 안내 · 제목 모음 · 가이드 · FAQ">
      <section>
        <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
          최신 여행 후기 제목
        </h2>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-[13px] leading-snug text-deep-navy/70">
          {latest.map((review) => (
            <li key={review.id}>
              <a
                href={review.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-starlight-gold hover:underline"
              >
                {review.title}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
          후기 읽는 가이드
        </h2>
        <div className="mt-1">
          {reviewSeoGuides.map((guide) => (
            <SeoAccordionItem key={guide.id} title={guide.title}>
              <p>{guide.body}</p>
            </SeoAccordionItem>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
          자주 묻는 질문
        </h2>
        <div className="mt-1">
          {reviewSeoFaqs.map((faq) => (
            <SeoAccordionItem key={faq.id} title={faq.question}>
              <p>{faq.answer}</p>
            </SeoAccordionItem>
          ))}
        </div>
      </section>

    </SeoDisclosure>
  );
}
