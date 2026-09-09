import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { extractKeywordsFromTitle } from "@/lib/reviews/reviewKeywords";
import type { ReviewPost } from "@/types/coupon";

interface ReviewCardProps {
  review: ReviewPost;
  /** 상단 카드만 우선 로드 (LCP/모바일 대역폭 절약) */
  priority?: boolean;
}

export function ReviewCard({ review, priority = false }: ReviewCardProps) {
  const keywords = extractKeywordsFromTitle(review.title, 5);

  return (
    <a
      href={review.blogUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-w-0 flex-col overflow-hidden border border-deep-navy/10 bg-parchment transition duration-200 hover:-translate-y-0.5 hover:border-starlight-gold hover:shadow-treasure sm:flex-row"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 bg-deep-navy/5 sm:aspect-auto sm:h-auto sm:w-44 md:w-52">
        <Image
          src={review.thumbnailUrl}
          alt={`${review.title} 후기 썸네일`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 400px, 208px"
          quality={70}
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-3 sm:py-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[15px] font-semibold leading-snug text-deep-navy group-hover:text-deep-navy-muted sm:text-base">
            {review.title}
          </h3>
          <ExternalLink
            className="mt-0.5 h-4 w-4 shrink-0 text-deep-navy/35 group-hover:text-starlight-gold"
            aria-hidden
          />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-deep-navy/65">
          {review.excerpt}
        </p>
        {keywords.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="이 후기 키워드">
            {keywords.map((keyword) => (
              <li
                key={keyword}
                className="border border-deep-navy/15 bg-light-sand px-2 py-0.5 text-[11px] text-deep-navy/70"
              >
                {keyword}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="text-xs text-deep-navy/40">{review.publishedAt}</p>
      </div>
    </a>
  );
}
