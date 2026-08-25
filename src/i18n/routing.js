import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-CN', 'en'],
  defaultLocale: 'zh-CN',
  // 始终带语言前缀：/zh-CN、/en —— 对 hreflang 与 SEO 最友好
  localePrefix: 'always',
});

export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

/** 站点域名（sitemap / canonical / OG 用） */
export const SITE_URL = 'https://videoprompts.cdqyfdbymn.me';
