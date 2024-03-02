/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "dvsk-fawn.vercel.app", "192.168.1.130", "ipfs.io", "static.daivietsuky.com","dvsk-ui-content.vercel.app"],
  },
};

module.exports = nextConfig;
