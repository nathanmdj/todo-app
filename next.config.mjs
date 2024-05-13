/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**'
      }
    ]
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/today',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

