import Link from "next/link";
import { listedPlatforms } from "@/data/mockData";
import { SimplePageFrame } from "@/components/layout/SimplePageFrame";

export const metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <SimplePageFrame>
      <main>
        <p className="text-sm text-starlight-gold">404</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-deep-navy sm:text-3xl">
          이 항로는 없습니다
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-deep-navy/70">
          주소를 다시 확인하거나, 여행 후기·할인코드 페이지로 돌아가 주세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/"
            className="border border-deep-navy bg-deep-navy px-4 py-2 text-sm font-medium text-starlight-gold"
          >
            여행 후기
          </Link>
          {listedPlatforms.map((platform) => (
            <Link
              key={platform.slug}
              href={`/${platform.slug}`}
              className="border border-deep-navy/15 bg-parchment px-4 py-2 text-sm text-deep-navy hover:border-starlight-gold"
            >
              {platform.name}
            </Link>
          ))}
        </div>
      </main>
    </SimplePageFrame>
  );
}
