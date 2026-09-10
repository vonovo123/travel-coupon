import type { Metadata } from "next";
import { SimplePageFrame } from "@/components/layout/SimplePageFrame";
import { getListedOfferMenus, getListedPlatforms } from "@/lib/content/catalog";
import { buildPrivacyMetadata, siteName } from "@/lib/seo";

export const metadata: Metadata = buildPrivacyMetadata();

export default async function PrivacyPage() {
  const [listedPlatforms, listedOfferMenus] = await Promise.all([
    getListedPlatforms(),
    getListedOfferMenus(),
  ]);

  return (
    <SimplePageFrame
      listedOfferMenus={listedOfferMenus}
      listedPlatforms={listedPlatforms}
    >
      <article className="max-w-2xl space-y-8 text-sm leading-relaxed text-deep-navy/75">
        <header>
          <h1 className="font-serif text-2xl font-semibold text-deep-navy sm:text-3xl">
            개인정보 처리방침·제휴 고지
          </h1>
          <p className="mt-2 text-deep-navy/50">시행일: 2026년 9월 9일</p>
        </header>

        <section>
          <h2 className="font-serif text-lg font-semibold text-deep-navy">
            제휴 고지
          </h2>
          <p className="mt-2">
            {siteName}의 일부 링크는 제휴 링크입니다. 해당 링크로 숙소·투어·항공
            등을 예약하면 운영자가 수수료를 받을 수 있습니다. 이용 금액이 더
            오르지는 않습니다. 할인코드 적용 여부·조건은 각 플랫폼 정책에
            따릅니다.
          </p>
          <p className="mt-2">
            현재 안내하는 주요 플랫폼은{" "}
            {listedPlatforms.map((platform) => platform.name).join("·")}{" "}
            입니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-deep-navy">
            수집하는 정보
          </h2>
          <p className="mt-2">
            회원가입·로그인 없이 사이트를 이용할 수 있습니다. 별도로 이름, 이메일,
            결제 정보를 받지 않습니다.
          </p>
          <p className="mt-2">
            호스팅(Vercel) 과정에서 접속 기록(IP, 브라우저, 요청 시각)이 서버
            로그에 남을 수 있습니다. 이는 장애 대응과 보안 목적에 쓰이며, 마케팅
            프로필을 만들지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-deep-navy">
            외부 콘텐츠
          </h2>
          <p className="mt-2">
            홈의 여행 후기는 네이버 블로그 RSS를 바탕으로 제목·요약·썸네일을
            보여 주고, 원문은 네이버로 이동합니다. 할인코드 페이지의 일부 버튼은
            각 예약 플랫폼으로 연결됩니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-deep-navy">
            문의
          </h2>
          <p className="mt-2">
            개인정보 관련 문의는 GitHub 저장소 이슈로 남겨 주세요.
          </p>
        </section>
      </article>
    </SimplePageFrame>
  );
}
