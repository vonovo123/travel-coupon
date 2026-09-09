import { defineField, defineType } from "sanity";

const reservedSlugs = new Set([
  "stay",
  "tour",
  "flight",
  "package",
  "overseas-stay",
  "korea-stay",
  "overseas-tour",
  "korea-tour",
  "overseas-flight",
  "korea-flight",
  "overseas-package",
  "korea-package",
  "privacy",
]);

export const platformType = defineType({
  name: "platform",
  title: "플랫폼",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "이름",
      type: "string",
      description: "아고다, 야놀자처럼 화면에 보이는 이름",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 슬러그",
      type: "slug",
      description: "/agoda 처럼 주소에 쓰입니다. 상품 허브 주소와 겹치면 안 됩니다.",
      options: {
        source: "name",
        maxLength: 64,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const slug = value?.current?.trim();
          if (!slug) {
            return "슬러그를 입력하세요.";
          }
          if (reservedSlugs.has(slug)) {
            return `"${slug}"는 상품 허브·고정 페이지 주소와 겹칩니다.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "affiliateLink",
      title: "제휴 링크",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "initial",
      title: "이니셜",
      type: "string",
      description: "카드 로고 자리에 쓰는 한 글자",
      validation: (rule) => rule.required().max(2),
    }),
    defineField({
      name: "color",
      title: "브랜드 색",
      type: "string",
      description: "예: #5C2D91. 쿠폰 카드가 이 값을 로고 배경으로 씁니다.",
      validation: (rule) =>
        rule.required().regex(/^#([0-9A-Fa-f]{6})$/, {
          name: "hex",
          invert: false,
        }),
    }),
    defineField({
      name: "listed",
      title: "메뉴·사이트맵에 공개",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
});
