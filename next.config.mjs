/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  swcMinify: true,
  images: {
    domains: ["example.com"],
  },
}

export default nextConfig
