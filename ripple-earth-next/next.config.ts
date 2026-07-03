import { NextConfig } from "next";
const nextConfig: NextConfig = { allowedDevOrigins: ["127.0.0.1"], compress: true, images: { formats: ["image/avif", "image/webp"], deviceSizes: [640, 750, 1080, 1200, 1920], imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], }, skipTrailingSlashRedirect: true, }; export default nextConfig;
