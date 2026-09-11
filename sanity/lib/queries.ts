import { groq } from "next-sanity";

export const platformsQuery = groq`*[_type == "platform" && defined(slug.current)] | order(name asc) {
  name,
  "slug": slug.current,
  affiliateLink,
  initial,
  color,
  listed,
  "imageUrl": image.asset->url,
  "bannerUrl": banner.asset->url,
  bannerText
}`;

export const offerMenusQuery = groq`*[_type == "offerMenu" && defined(slug.current)] | order(sortOrder asc, name asc) {
  name,
  "slug": slug.current,
  offerType,
  category,
  shortDescription,
  searchKeyword,
  sortOrder,
  listed
}`;

export const couponsQuery = groq`*[_type == "coupon" && defined(platform)] | order(year desc, month desc, title asc) {
  _id,
  title,
  year,
  month,
  code,
  description,
  offerType,
  category,
  validUntil,
  affiliateLink,
  "imageUrl": image.asset->url,
  platform->{
    name,
    "slug": slug.current,
    affiliateLink,
    initial,
    color,
    listed,
    "imageUrl": image.asset->url,
    "bannerUrl": banner.asset->url,
    bannerText
  }
}`;
