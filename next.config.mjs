/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname:
          '/storage/v1/object/public/portfolio-assets/**',
      },
    ],
  },
};

export default nextConfig;
