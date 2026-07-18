import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Playwright and local tooling that hit 127.0.0.1 while the
  // dev server is bound to localhost (or vice versa).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
