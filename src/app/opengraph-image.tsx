import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Lorius — moments worth keeping";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Sitewide default OG/Twitter share image (blueprint §45 / Definition of
// Done's "OG image created"). Generated at build time from the real brand
// logo instead of a manually-designed asset — see docs/Lorius_Brand_
// Guideline_2026.pdf for the teal (#0e363c) background this mirrors.
export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo/Logo_bg.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#0e363c",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og's renderer requires a plain <img>, not next/image. */}
        <img src={logoSrc} width={620} height={261} alt="" />
        <span
          style={{
            fontSize: 30,
            color: "#27c6d1",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Fotografi Wedding, Prewedding &amp; Lainnya · Bandung
        </span>
      </div>
    ),
    { ...size },
  );
}
