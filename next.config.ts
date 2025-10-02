import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hualien-aid",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
