import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les fichiers audio portent leur date dans leur nom : cache long sans risque.
  async headers() {
    return [
      {
        source: "/audio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/immatriculation",
        destination: "/ressources/candidater-licences",
        permanent: true,
      },
      // Le calculateur vit désormais sous l'onglet Outils.
      {
        source: "/ressources/budget/calculateur",
        destination: "/outils/budget",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
