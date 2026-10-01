import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/immatriculation",
        destination: "/ressources/candidater-licences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
