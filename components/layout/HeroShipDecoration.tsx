import Image from "next/image";

interface HeroShipDecorationProps {
  compact?: boolean;
}

/** 배 이미지는 크기 애니메이션 없이, compact 시 opacity만 즉시 낮춤 */
export function HeroShipDecoration({ compact = false }: HeroShipDecorationProps) {
  return (
    <div
      aria-hidden
      className="hero-ship-deco pointer-events-none absolute -top-[18%] -bottom-[18%] left-[22%] right-[-10%] overflow-hidden sm:left-[28%] md:-top-[42%] md:-bottom-[42%] md:left-[28%] md:right-[-14%] lg:left-[36%]"
    >
      <Image
        src="/images/hero-galleon.png"
        alt=""
        fill
        sizes="100vw"
        unoptimized
        className={`origin-right scale-[0.78] object-contain object-right md:scale-95 md:object-cover md:object-[68%_42%] ${
          compact ? "opacity-35" : "opacity-70"
        }`}
      />
    </div>
  );
}
