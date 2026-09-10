import { getOfferMenuBySlug, getPlatformBySlug } from "@/lib/content/catalog";
import { getFreshness } from "@/lib/seo";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og/renderOgImage";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

interface PlatformOgProps {
  params: {
    platform: string;
  };
}

export async function generateImageMetadata({ params }: PlatformOgProps) {
  const offerHub = await getOfferMenuBySlug(params.platform);
  const platform = offerHub
    ? undefined
    : await getPlatformBySlug(params.platform);
  const alt = offerHub
    ? `${offerHub.label} | 코드세이아`
    : `${platform?.name ?? "플랫폼"} 할인코드 | 코드세이아`;

  return [
    {
      id: "og",
      alt,
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: PlatformOgProps) {
  const offerHub = await getOfferMenuBySlug(params.platform);
  const { year, month } = getFreshness();

  if (offerHub) {
    return renderOgImage({
      eyebrow: `${year}년 ${month}월`,
      title: offerHub.label,
      description: offerHub.shortDescription,
    });
  }

  const platform = await getPlatformBySlug(params.platform);
  const name = platform?.name ?? "여행 플랫폼";

  return renderOgImage({
    eyebrow: `${year}년 ${month}월`,
    title: `${name} 할인코드`,
    description: `코드세이아에서 ${name} 할인코드를 복사한 뒤 결제창에 붙여넣으세요.`,
  });
}
