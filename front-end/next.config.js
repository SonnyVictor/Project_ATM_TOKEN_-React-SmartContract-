/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PINATA_KEY: process.env.PINATA_KEY,
    PINATA_SECRET: process.env.PINATA_SECRET,
  },
};

module.exports = nextConfig;
