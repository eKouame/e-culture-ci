import { ImageResponse } from "next/og";

export const alt =
  "Service Monde — Un service culturel de proximité pour votre commune, avec e-Culture CI.";
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
          background: "linear-gradient(135deg, #eef4f1 0%, #fafaf9 65%)",
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
              background: "#1B5E4A",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1c1917" }}>
              Service Monde
            </div>
            <div style={{ fontSize: 20, color: "#6b6b6b" }}>
              e-Culture CI pour les communes
            </div>
          </div>
        </div>

        {/* Accroche */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#f3e7d3",
              color: "#8a5a17",
              fontSize: 22,
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: 999,
            }}
          >
            SERVICE MONDE — POUR LES COMMUNES
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              color: "#1c1917",
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            Un service culturel de proximité pour votre commune
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#6b6b6b",
              maxWidth: 880,
            }}
          >
            Orienter les organisateurs, alléger votre guichet, mieux
            connaître votre territoire.
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#1B5E4A",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
              padding: "18px 36px",
              borderRadius: 12,
            }}
          >
            Demander une démonstration
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#6b6b6b" }}>
            e-culture-ci.vercel.app/communes
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
