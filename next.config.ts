import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "firebasestorage.googleapis.com" }],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default withNextIntl(nextConfig);
