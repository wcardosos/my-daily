/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async() => ([
    {
      source: '/',
      destination: '/login',
      permanent: false,
    }
  ])
}

module.exports = nextConfig
