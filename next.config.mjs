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
          { key: 'Access-Control-Allow-Headers',     value: 'Content-Type, Authorization, x-vercel-protection-bypass, x-vercel-trusted-oidc-idp-token' },
        ],
      },
    ];
  },
};

export default nextConfig;
