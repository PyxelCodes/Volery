module.exports = {
  reactStrictMode: true,
  webpack5: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' ? 'http://localhost:4001/:path*' : ''
      }
    ]
  }
};