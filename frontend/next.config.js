const withTM = require('next-transpile-modules')();

let config = {
  reactStrictMode: true,
  webpack5: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001/:path*'
            : '',
      },
    ];
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
};

module.exports = withTM(config);
