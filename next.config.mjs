import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

initOpenNextCloudflareForDev()

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/vila-mariana-sp",
        permanent: true,
      },
      {
        source: "/desq",
        destination: "/por-que-particular",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
