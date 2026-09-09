import { getFreshness } from "@/lib/seo";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og/renderOgImage";

export const runtime = "nodejs";
export const alt = "코드세이아 — 여행 후기와 할인코드";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const { year, month } = getFreshness();

  return renderOgImage({
    eyebrow: `${year}년 ${month}월`,
    title: "여행 후기 · 할인코드",
    description:
      "내돈내산 여행 후기와 아고다·마이리얼트립·트립닷컴 등 숨겨진 할인코드를 한곳에서 확인하세요.",
  });
}
