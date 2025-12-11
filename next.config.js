const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

const nextConfig = {
  images: {
    domains: imageDomain ? [imageDomain] : [],
  },

  // Force Webpack instead of Turbopack
  experimental: {
    turbo: false,
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
