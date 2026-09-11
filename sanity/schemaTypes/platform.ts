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
      description: "아고다, 여기어때처럼 화면에 보이는 이름",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "listed",
      title: "노출",
      type: "boolean",
      description:
        "끄면 메뉴·사이트맵에서 숨깁니다. 켜 있어도 사이트가 보여주는 달에 할인코드가 없으면 자동으로 숨깁니다.",
      initialValue: true,
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
      description: "이미지가 없을 때 카드·메뉴 자리에 쓰는 한 글자",
      validation: (rule) => rule.required().max(2),
    }),
    defineField({
      name: "image",
      title: "플랫폼 이미지",
      type: "image",
      description:
        "사이드바와 쿠폰 카드 기본 썸네일. 카드에 따로 이미지를 넣으면 카드는 그 이미지를 씁니다.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "대체 텍스트",
          type: "string",
          description: "비우면 플랫폼 이름으로 채웁니다.",
        }),
      ],
    }),
    defineField({
      name: "banner",
      title: "페이지 배너",
      type: "image",
      description: "할인코드 목록 위에 가로로 크게 보입니다.",
      options: { hotspot: true },
    }),
    defineField({
      name: "bannerText",
      title: "배너 문구",
      type: "text",
      rows: 3,
      description: "배너 아래쪽에 겹쳐 보입니다. 비우면 자동 안내 문장을 씁니다.",
    }),
    defineField({
      name: "color",
      title: "브랜드 색",
      type: "string",
      description: "예: #5C2D91. 이미지가 없을 때 로고 배경으로 씁니다.",
      validation: (rule) =>
        rule.required().regex(/^#([0-9A-Fa-f]{6})$/, {
          name: "hex",
          invert: false,
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      slug: "slug.current",
      listed: "listed",
      media: "image",
    },
    prepare({ title, slug, listed, media }) {
      return {
        title,
        subtitle: `${slug ?? ""} · ${listed === false ? "비노출" : "노출"}`,
        media,
      };
    },
  },
});
