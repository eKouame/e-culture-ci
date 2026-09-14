import { ImageResponse } from "next/og";
import { OgBrandBadge } from "@/lib/og-badge";

export const alt =
  "e-Culture CI — Faites de votre commune un guichet culturel de proximité.";
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
        <OgBrandBadge />

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
            AUX COMMUNES DE CÔTE D&apos;IVOIRE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 800,
              color: "#1c1917",
              lineHeight: 1.15,
              maxWidth: 1020,
            }}
          >
            Faites de votre commune un guichet culturel de proximité.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#6b6b6b",
              maxWidth: 900,
            }}
          >
            Orienter les organisateurs, alléger votre guichet, valoriser
            votre territoire.
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
            Demander une rencontre
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b6b6b" }}>
            e-culture-ci.vercel.app/communes
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
