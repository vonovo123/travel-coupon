import { SeoAccordionItem, SeoDisclosure } from "@/components/SeoDisclosure";
import {
  reviewSeoFaqs,
  reviewSeoGuides,
} from "@/data/reviewSeoContent";
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

      <section>
        <h2 className="font-serif text-sm font-semibold text-deep-navy/80">
          할인코드 보러 가기
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-deep-navy/55">
          후기로 숙소·일정을 고른 뒤에는, 메뉴에서 아고다·마이리얼트립·트립닷컴·호텔스닷컴·클룩·Nol
          할인코드 페이지로 이동해 보세요. 후기에서 본 플랫폼과 같은 곳을 고르면 결제 전에 코드를
          바로 확인할 수 있습니다.
        </p>
      </section>
    </SeoDisclosure>
  );
}
