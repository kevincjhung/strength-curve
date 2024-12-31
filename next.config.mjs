/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev, isServer }) {
    // Only exclude test files during production and client-side builds
    if (!dev && !isServer) {
      config.module.rules.push({
        test: /\.test\.(js|ts|tsx)$/,
        loader: 'ignore-loader', // Ignore test files in production builds
      });
    }
    return config;
  },
};

export default nextConfig;
