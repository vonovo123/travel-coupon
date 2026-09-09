import type { ReviewPost } from "@/types/coupon";
import { cache } from "react";

/** 네이버 블로그 RSS 아이디. 필요 시 env로 덮어쓰기. */
export const NAVER_BLOG_ID =
  process.env.NAVER_BLOG_ID?.trim() || "dlthdus12345";

export const NAVER_BLOG_RSS_URL = `https://rss.blog.naver.com/${NAVER_BLOG_ID}.xml`;

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

function decodeXmlEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function stripHtml(value: string) {
  return decodeXmlEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickTag(block: string, tag: string) {
  const cdata = block.match(
    new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, "i"),
  );
  if (cdata?.[1] != null) {
    return cdata[1].trim();
  }

  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return plain?.[1] ? decodeXmlEntities(plain[1]).trim() : "";
}

function firstImageUrl(html: string) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!match?.[1]) {
    return FALLBACK_THUMBNAIL;
  }

  const raw = decodeXmlEntities(match[1]).trim();
  if (!raw) {
    return FALLBACK_THUMBNAIL;
  }

  if (raw.startsWith("//")) {
    return `https:${raw}`;
  }

  if (raw.startsWith("http://")) {
    return `https://${raw.slice("http://".length)}`;
  }

  return raw;
}

function formatPublishedAt(pubDate: string) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) {
    return pubDate;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function cleanBlogUrl(link: string) {
  try {
    const url = new URL(link);
    url.searchParams.delete("fromRss");
    url.searchParams.delete("trackingCode");
    return url.toString();
  } catch {
    return link.split("?")[0] || link;
  }
}

function reviewIdFromLink(link: string, index: number) {
  const cleaned = cleanBlogUrl(link);
  const match = cleaned.match(/blog\.naver\.com\/[^/]+\/(\d+)/);
  return match?.[1] ? `naver-${match[1]}` : `naver-item-${index}`;
}

export function parseNaverBlogRss(xml: string, limit = 50): ReviewPost[] {
  const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));

  return items.slice(0, limit).flatMap((match, index) => {
    const block = match[1] ?? "";
    const title = pickTag(block, "title");
    const link = pickTag(block, "link") || pickTag(block, "guid");
    const description = pickTag(block, "description");
    const pubDate = pickTag(block, "pubDate");

    if (!title || !link) {
      return [];
    }

    const excerpt = stripHtml(description).slice(0, 180);

    return [
      {
        id: reviewIdFromLink(link, index),
        title,
        excerpt: excerpt || "원문에서 이어서 읽어 보세요.",
        thumbnailUrl: firstImageUrl(description),
        blogUrl: cleanBlogUrl(link),
        publishedAt: formatPublishedAt(pubDate),
      },
    ];
  });
}

/** 네이버 블로그 RSS에서 최신 글 목록을 가져온다. 실패 시 빈 배열.
 *  같은 요청 안에서 generateMetadata + Page가 한 번만 네트워크를 타도록 cache.
 */
export const fetchNaverBlogReviews = cache(async function fetchNaverBlogReviews(
  limit = 50,
): Promise<ReviewPost[]> {
  try {
    const response = await fetch(NAVER_BLOG_RSS_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent":
          "Mozilla/5.0 (compatible; CodeyssseyBot/1.0; +https://code-yssey.local)",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("[naver-rss] HTTP", response.status, NAVER_BLOG_RSS_URL);
      return [];
    }

    const xml = await response.text();
    const reviews = parseNaverBlogRss(xml, limit);

    if (reviews.length === 0) {
      console.error("[naver-rss] parsed 0 items", NAVER_BLOG_RSS_URL);
    }

    return reviews;
  } catch (error) {
    console.error("[naver-rss] fetch failed", error);
    return [];
  }
});

