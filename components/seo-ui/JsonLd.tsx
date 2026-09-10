import { absoluteUrl, organizationId, siteName, websiteId } from "@/lib/seo";
import type { Coupon, FaqItem, ReviewPost } from "@/types/coupon";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface JsonLdProps {
  name: string;
  description: string;
  path: string;
  coupons?: Coupon[];
  reviews?: ReviewPost[];
  faqs: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
  dateModified?: string;
}

function toIsoDate(value: string): string | undefined {
  const matched = value.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);

  if (!matched) {
    return undefined;
  }

  const [, year, month, day] = matched;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function JsonLd({
  name,
  description,
  path,
  coupons = [],
  reviews = [],
  faqs,
  breadcrumbs = [],
  dateModified,
}: JsonLdProps) {
  const useReviews = reviews.length > 0;
  const items = useReviews ? reviews : coupons;
  const pageUrl = absoluteUrl(path);
  const homeUrl = absoluteUrl("/");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: homeUrl,
    description:
      "여행 할인코드를 찾아 헤매는 여행자의 종착지. 숙소·투어·항공 코드와 내돈내산 여행 후기를 안내합니다.",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: homeUrl,
    inLanguage: "ko-KR",
    description:
      "아고다·마이리얼트립·트립닷컴 등 여행 플랫폼 할인코드와 여행 후기를 한곳에서 확인하세요.",
    publisher: {
      "@id": organizationId,
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: pageUrl,
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
            datePublished: toIsoDate(review.publishedAt),
            publisher: {
              "@id": organizationId,
            },
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
            url: pageUrl,
            ...(coupon.imageUrl ? { image: coupon.imageUrl } : {}),
            availabilityEnds: toIsoDate(coupon.validUntil),
            seller: {
              "@type": "Organization",
              name: coupon.platform,
            },
          },
        })),
  };

  const faqId = `${pageUrl}#faq`;
  const uniqueFaqs = faqs.filter(
    (faq, index, list) =>
      list.findIndex((item) => item.question === faq.question) === index,
  );
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": faqId,
    url: pageUrl,
    mainEntity: uniqueFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name,
    description,
    inLanguage: "ko-KR",
    ...(dateModified
      ? {
          dateModified,
          datePublished: dateModified,
        }
      : {}),
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    ...(uniqueFaqs.length > 0 ? { mainEntity: { "@id": faqId } } : {}),
  };

  const crumbItems =
    breadcrumbs.length > 0
      ? breadcrumbs
      : [
          { name: "여행 후기", path: "/" },
          ...(path !== "/" ? [{ name, path }] : []),
        ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbItems.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {items.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      ) : null}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
