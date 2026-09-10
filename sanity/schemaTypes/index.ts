import type { SchemaTypeDefinition } from "sanity";
import { couponType } from "./coupon";
import { offerMenuType } from "./offerMenu";
import { platformType } from "./platform";

export const schemaTypes: SchemaTypeDefinition[] = [
  platformType,
  offerMenuType,
  couponType,
];
