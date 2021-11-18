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
  images: {
    domains: ['lh3.googleusercontent.com', 'c.tenor.com', 'source.boringavatars.com'],
  },
}

module.exports = nextConfig
