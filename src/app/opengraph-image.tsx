import { ImageResponse } from "next/og";

export const alt =
  "e-Culture CI — Dois-tu payer une licence pour ton spectacle ? Découvre-le en 1 minute.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #fff1e6 0%, #fafaf9 65%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marque */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 16,
              background: "#e8590c",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            eC
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#1c1917" }}>
            e-Culture CI
          </div>
        </div>

        {/* Accroche */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#e9f9ee",
              color: "#0a6b30",
              fontSize: 22,
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: 999,
            }}
          >
            SPECTACLE VIVANT EN CÔTE D&apos;IVOIRE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              color: "#1c1917",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            Dois-tu payer une licence pour ton spectacle ?
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#6b6b6b",
              maxWidth: 880,
            }}
          >
            Découvre ta situation en 1 minute et déclare gratuitement ton
            événement.
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#e8590c",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
              padding: "18px 36px",
              borderRadius: 12,
            }}
          >
            Faire le test gratuitement →
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b6b6b" }}>
            e-culture-ci.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
