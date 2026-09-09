import { groq } from "next-sanity";

export const platformsQuery = groq`*[_type == "platform" && defined(slug.current)] | order(name asc) {
  name,
  "slug": slug.current,
  affiliateLink,
  initial,
  color,
  listed
}`;

export const couponsQuery = groq`*[_type == "coupon" && defined(platform)] | order(title asc) {
  _id,
  title,
  code,
  description,
  offerType,
  category,
  validUntil,
  affiliateLink,
  platform->{
    name,
    "slug": slug.current,
    affiliateLink,
    initial,
    color,
    listed
  }
}`;
