/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],

    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: '192.168.88.33',
    //     // port: '8000',
    //     pathname: 'media/cultivators/photos/**',
    //   },
    // ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
