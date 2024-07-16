// import('next').NextConfig;
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'components/MyComponent': 'components/MyComponent/_index.ts',
    };
    return config;
  },
};

export default nextConfig;
