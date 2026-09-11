import { defineField, defineType } from "sanity";

export const couponType = defineType({
  name: "coupon",
  title: "할인코드",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "연도",
      type: "number",
      description: "이 코드가 속하는 달력 연도. Studio에서 연도/월로 나뉩니다.",
      initialValue: () => new Date().getFullYear(),
      validation: (rule) => rule.required().integer().min(2020).max(2100),
    }),
    defineField({
      name: "month",
      title: "월",
      type: "number",
      description: "1–12. 유효 기간과 별개로, 사이트에 묶는 달입니다.",
      options: {
        list: Array.from({ length: 12 }, (_, index) => ({
          title: `${index + 1}월`,
          value: index + 1,
        })),
      },
      initialValue: () => new Date().getMonth() + 1,
      validation: (rule) => rule.required().integer().min(1).max(12),
    }),
    defineField({
      name: "platform",
      title: "플랫폼",
      type: "reference",
      to: [{ type: "platform" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "offerType",
      title: "상품 유형",
      type: "string",
      options: {
        list: [
          { title: "공통", value: "common" },
          { title: "숙소", value: "stay" },
          { title: "투어", value: "tour" },
          { title: "항공", value: "flight" },
          { title: "패키지", value: "package" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "국내/해외",
      type: "string",
      options: {
        list: [
          { title: "국내", value: "국내" },
          { title: "해외", value: "해외" },
          { title: "공통", value: "공통" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "할인코드",
      type: "string",
      description:
        "비우면 카드에 「쿠폰 받기」만 나갑니다. 있으면 「코드 복사」가 나갑니다.",
    }),
    defineField({
      name: "description",
      title: "적용 조건",
      type: "text",
      rows: 6,
      description: "한 줄에 조건 하나씩 적으면 카드에 줄바꿈으로 보입니다.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "validUntil",
      title: "유효 기간",
      type: "date",
      description: "이 날짜까지 사용. 비우면 기간 미정으로 둡니다.",
    }),
    defineField({
      name: "image",
      title: "카드 이미지",
      type: "image",
      description: "비우면 플랫폼 이미지를 씁니다.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "대체 텍스트",
          type: "string",
          description: "비우면 카드 제목으로 채웁니다.",
        }),
      ],
    }),
    defineField({
      name: "affiliateLink",
      title: "쿠폰 전용 제휴 링크",
      type: "url",
      description: "비우면 플랫폼 제휴 링크를 씁니다.",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return true;
          }

          try {
            const parsed = new URL(value);
            if (parsed.protocol === "http:" || parsed.protocol === "https:") {
              return true;
            }
          } catch {
            // 아래 메시지로 처리
          }

          return "http 또는 https 주소여야 합니다.";
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      code: "code",
      platform: "platform.name",
      year: "year",
      month: "month",
      media: "image",
      platformImage: "platform.image",
    },
    prepare({ title, code, platform, year, month, media, platformImage }) {
      const period =
        year && month ? `${year}년 ${month}월` : "연도/월 미지정";

      return {
        title,
        subtitle: [period, platform, code || "쿠폰 받기"]
          .filter(Boolean)
          .join(" · "),
        media: media || platformImage,
      };
    },
  },
});
