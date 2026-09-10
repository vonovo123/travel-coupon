import { getCliClient } from "sanity/cli";
import { defaultOfferMenus } from "../data/offerTypes";

const client = getCliClient({ apiVersion: "2026-09-09" });

function menuDocumentId(slug: string) {
  return `offer-menu-${slug}`;
}

async function seed() {
  const transaction = client.transaction();

  defaultOfferMenus.forEach((menu, index) => {
    transaction.createIfNotExists({
      _id: menuDocumentId(menu.slug),
      _type: "offerMenu",
      name: menu.name,
      slug: { _type: "slug", current: menu.slug },
      offerType: menu.type,
      category: menu.category,
      shortDescription: menu.shortDescription,
      searchKeyword: menu.searchKeyword,
      sortOrder: index + 1,
      listed: menu.listed,
    });
  });

  await transaction.commit();
  console.log(
    `상품 메뉴 ${defaultOfferMenus.length}개를 넣었습니다. 이미 있는 문서는 그대로 둡니다.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
