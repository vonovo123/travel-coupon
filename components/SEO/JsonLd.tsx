import type { Coupon, FaqItem, ReviewPost } from "@/types/coupon";

interface JsonLdProps {
  name: string;
  description: string;
  path: string;
  coupons?: Coupon[];
  reviews?: ReviewPost[];
  faqs: FaqItem[];
}

export function JsonLd({
  name,
  description,
  path,
  coupons = [],
  reviews = [],
  faqs,
}: JsonLdProps) {
  const useReviews = reviews.length > 0;
  const items = useReviews ? reviews : coupons;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: path,
    numberOfItems: items.length,
    itemListElement: useReviews
      ? reviews.map((review, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "BlogPosting",
            headline: review.title,
            description: review.excerpt,
            image: review.thumbnailUrl,
            url: review.blogUrl,
            datePublished: review.publishedAt,
          },
        }))
      : coupons.map((coupon, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Offer",
            name: coupon.title,
            description: coupon.description,
            category: coupon.platform,
            availabilityEnds: coupon.validUntil,
            seller: {
              "@type": "Organization",
              name: coupon.platform,
            },
          },
        })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
