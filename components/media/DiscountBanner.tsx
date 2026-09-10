import Image from "next/image";
import { sanityImageSrc } from "@/lib/sanityImage";

interface DiscountBannerProps {
  src: string;
  alt: string;
  lead: string;
  meta: string;
}

export function DiscountBanner({ src, alt, lead, meta }: DiscountBannerProps) {
  const imageSrc = sanityImageSrc(src, 1200);

  if (!imageSrc) {
    return null;
  }

  return (
    <figure className="relative mb-4 h-52 w-full overflow-hidden bg-deep-navy/5 sm:h-auto sm:aspect-[2.4/1]">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 720px"
        className="object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/45 to-transparent"
        aria-hidden
      />
      <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-sm leading-relaxed text-parchment">{lead}</p>
        <p className="mt-1 text-xs text-parchment/75">{meta}</p>
      </figcaption>
    </figure>
  );
}
