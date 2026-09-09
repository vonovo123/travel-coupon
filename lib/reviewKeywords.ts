import type { Metadata } from "next";
import type { ReviewPost } from "@/types/coupon";
import { getFreshness, siteName } from "@/lib/seo";

const STOP_TOKENS = new Set([
  "후기",
  "추천",
  "총정리",
  "꿀팁",
  "내돈내산",
  "찐",
  "편",
  "및",
  "과",
  "와",
  "의",
  "을",
  "를",
  "이",
  "가",
  "은",
  "는",
  "에",
  "로",
  "으로",
  "에서",
  "vs",
  "EP",
  "TOP",
]);

/** 단일 후기 제목에서 카드용 키워드 칩을 뽑는다. */
export function extractKeywordsFromTitle(title: string, limit = 5): string[] {
  const seen = new Set<string>();
  const keywords: string[] = [];

  const chunks = title
    .split(/[\s|/·・,，、+[\]()（）#\-–—:：]+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    if (STOP_TOKENS.has(chunk)) {
      continue;
    }
    if (/^\d+$/.test(chunk)) {
      continue;
    }
    if (chunk.length < 2) {
      continue;
    }
    if (seen.has(chunk)) {
      continue;
    }
    // 제목 전체와 같으면 칩으로 중복 표시하지 않음
    if (chunk === title.trim()) {
      continue;
    }
    seen.add(chunk);
    keywords.push(chunk);
    if (keywords.length >= limit) {
      break;
    }
  }

  return keywords;
}

/** 후기 제목에서 검색용 키워드를 뽑는다. 제목 전문 + 의미 있는 조각. */
export function extractReviewKeywords(reviews: ReviewPost[], limit = 30): string[] {
  const seen = new Set<string>();
  const keywords: string[] = [];

  const push = (value: string) => {
    const trimmed = value.replace(/\s+/g, " ").trim();
    if (trimmed.length < 2 || seen.has(trimmed)) {
      return;
    }
    seen.add(trimmed);
    keywords.push(trimmed);
  };

  for (const review of reviews) {
    push(review.title);

    for (const chunk of extractKeywordsFromTitle(review.title, limit)) {
      push(chunk);
      if (keywords.length >= limit) {
        return keywords;
      }
    }

    if (keywords.length >= limit) {
      break;
    }
  }

  return keywords;
}

export function buildHomeMetadataFromReviews(reviews: ReviewPost[]): Metadata {
  const { year, month } = getFreshness();
  const recentTitles = reviews.slice(0, 6).map((review) => review.title);
  const keywords = [
    `${year}년 여행 후기`,
    `${year}년 ${month}월 숙소 후기`,
    "코드세이아 항해일지",
    "내돈내산 여행 후기",
    ...extractReviewKeywords(reviews, 24),
  ];

  const topicLine =
    recentTitles.length > 0
      ? `최근 항해일지: ${recentTitles.join(" · ")}`
      : "국내 숙소, 일본·해외 여행 내돈내산 후기";

  const title = `${year}년 ${month}월 여행 후기·숙소 내돈내산 | 코드세이아 항해일지`;
  const description = `${year}년 ${month}월 기준 코드세이아 항해일지. ${topicLine}`.slice(
    0,
    160,
  );

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      locale: "ko_KR",
      type: "website",
      url: "/",
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
