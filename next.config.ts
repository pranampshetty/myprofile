import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from other devices on your local network.
  allowedDevOrigins: ["192.168.88.11", "localhost", "127.0.0.1"],
};

export default nextConfig;
