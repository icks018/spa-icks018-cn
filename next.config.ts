import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出配置 - 用于部署到阿里云ESA
  output: 'export',
  
  // 图片优化配置
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 严格模式
  reactStrictMode: true,
  
  // 启用 Turbopack (开发环境)
  // experimental: {
  //   turbo: {},
  // },
  
  // 路径别名
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
  
  // 环境变量
  env: {
    NEXT_PUBLIC_SITE_NAME: '流沙聚·拾光',
    NEXT_PUBLIC_SITE_URL: 'https://spa.icks018.top',
  },
};

export default nextConfig;
