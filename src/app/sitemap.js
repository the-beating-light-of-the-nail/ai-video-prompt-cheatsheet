import { DEFAULT_LOCALE, LOCALES, SITE_URL } from '@/i18n/routing';

export default function sitemap() {
  return LOCALES.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: lang === DEFAULT_LOCALE ? 1.0 : 0.9,
    // hreflang 互链：让搜索引擎知道每个语言版本
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
    },
  }));
}
