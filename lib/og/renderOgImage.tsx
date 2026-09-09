import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getFreshness, siteName } from "@/lib/seo";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgImageProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export async function renderOgImage({
  title,
  description,
  eyebrow,
}: OgImageProps) {
  const fontData = await readFile(
    join(process.cwd(), "lib/og/fonts/Pretendard-SemiBold.woff"),
  );
  const { year, month } = getFreshness();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #0B132B 0%, #1C2541 100%)",
          padding: "64px 72px",
          color: "#FBF7F0",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#F3A712",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#F3A712",
                letterSpacing: -0.4,
              }}
            >
              {siteName}
            </div>
          </div>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "rgba(251, 247, 240, 0.62)",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.2,
              fontWeight: 700,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(251, 247, 240, 0.78)",
              maxWidth: 960,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#F3A712",
          }}
        >
          <div style={{ display: "flex" }}>
            할인 코드를 찾아 헤매는 여행자의 종착지
          </div>
          <div style={{ display: "flex", color: "rgba(251, 247, 240, 0.55)" }}>
            {`${year}.${month}`}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Pretendard",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
