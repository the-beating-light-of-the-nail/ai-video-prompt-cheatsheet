import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 纯静态导出（部署到 Cloudflare Workers 静态资源）；根路径跳转见 src/app/(root)/page.jsx
  output: 'export',
};

export default withNextIntl(nextConfig);
