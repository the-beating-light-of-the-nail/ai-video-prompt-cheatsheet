import { SITE_URL } from '@/i18n/routing';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

// 静态导出要求显式声明（构建时生成 robots.txt）
export const dynamic = 'force-static';
