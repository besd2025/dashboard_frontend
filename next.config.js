/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_API_URL],
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     imaga: '192.168.88.33',
    //     // Si un port est utilisé, ajoute-le, ex: port: '8000',

    //     pathname: 'media/cultivators/photos/**',
    //   },
    //   // autres patterns si besoin
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
