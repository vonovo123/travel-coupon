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
    <figure className="relative mb-4 h-56 w-full overflow-hidden bg-deep-navy/5 sm:h-auto sm:aspect-[2.4/1]">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 720px"
        className="object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-deep-navy/35"
        aria-hidden
      />
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center sm:px-8">
        {lead ? (
          <p className="max-w-xl text-base font-semibold leading-snug text-parchment [text-shadow:0_1px_8px_rgba(11,19,43,0.55)] sm:text-lg md:text-xl">
            {lead}
          </p>
        ) : null}
        <p className="rounded-full border border-parchment/80 bg-transparent px-2.5 py-0.5 text-[11px] leading-none text-parchment sm:text-xs">
          {meta}
        </p>
      </figcaption>
    </figure>
  );
}
