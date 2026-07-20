/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // CORS for all API routes — required for NOXIA cross-origin access
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin',      value: 'https://noxiagame.vercel.app' },
          { key: 'Access-Control-Allow-Methods',     value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers',     value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
