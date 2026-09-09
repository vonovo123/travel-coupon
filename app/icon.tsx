import { ImageResponse } from "next/og";
import { CompassMark } from "@/lib/brand/compassMark";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<CompassMark size={48} />, { ...size });
}
