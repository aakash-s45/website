import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "lastfm.freetls.fastly.net",
      "raw.githubusercontent.com",
      "img.shields.io",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
