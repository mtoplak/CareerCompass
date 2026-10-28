/** @type {import('next').NextConfig} */
const nextConfig = {
  // The functional tests build into their own folder so they don't overwrite the regular build.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
