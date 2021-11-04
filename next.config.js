// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/signin',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
