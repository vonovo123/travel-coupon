import { ImageResponse } from "next/og";
import { CompassMark } from "@/lib/brand/compassMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<CompassMark size={180} />, { ...size });
}
