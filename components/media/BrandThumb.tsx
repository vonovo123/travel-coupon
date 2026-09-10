"use client";

import Image from "next/image";
import { sanityImageSrc } from "@/lib/sanityImage";

interface BrandThumbProps {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
  imageClassName?: string;
}

export function BrandThumb({
  src,
  alt,
  fallback,
  className = "h-12 w-12",
  imageClassName = "object-contain p-1",
}: BrandThumbProps) {
  const imageSrc = sanityImageSrc(src, 128);

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-deep-navy text-base font-bold text-starlight-gold ${className}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="56px"
          className={imageClassName}
        />
      ) : (
        fallback
      )}
    </span>
  );
}
