import type { SchemaTypeDefinition } from "sanity";
import { couponType } from "./coupon";
import { platformType } from "./platform";

export const schemaTypes: SchemaTypeDefinition[] = [platformType, couponType];
