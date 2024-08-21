/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'nextsecondround-ecommerce.s3.amazonaws.com',
        },
      ],
    },
  }

  export default nextConfig;