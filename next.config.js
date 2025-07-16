const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;
const nextConfig = {
  images: {
    domains: imageDomain ? [imageDomain] : [],

    // Optionnel : si vous voulez aussi autoriser des patterns spécifiques
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: '192.168.88.33',
    //     pathname: '/media/cultivators/photos/**',
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
