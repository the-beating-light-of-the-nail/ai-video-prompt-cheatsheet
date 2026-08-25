import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero.jsx';
import CheatSheet from '@/components/CheatSheet.jsx';
import Footer from '@/components/Footer.jsx';
import { routing, SITE_URL } from '@/i18n/routing';

/** 按语言加载内容数据 */
async function getContent(lang) {
  const [{ default: prompts }, { default: extras }] = await Promise.all([
    import(`@/data/prompts.${lang}.json`),
    import(`@/data/extras.${lang}.json`),
  ]);
  return { prompts, extras };
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'meta' });

  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}`]));
  const ogLocale = lang === 'zh-CN' ? 'zh_CN' : 'en_US';

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${lang}`,
      languages: { ...languages, 'x-default': `/${routing.defaultLocale}` },
    },
    openGraph: {
      type: 'website',
      url: `/${lang}`,
      siteName: t('title'),
      title: t('title'),
      description: t('description'),
      locale: ogLocale,
      images: [{ url: '/posters/video-13.jpg', width: 1280, height: 720, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/posters/video-13.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  setRequestLocale(lang);

  const { prompts, extras } = await getContent(lang);
  const t = await getTranslations({ locale: lang, namespace: 'meta' });

  // 结构化数据：25 条运镜的 ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('title'),
    description: t('description'),
    numberOfItems: prompts.length,
    itemListElement: prompts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${lang}#prompt-${p.id}`,
      name: `${p.name} (${p.nameAlt})`,
    })),
  };

  return (
    <div className="min-h-screen bg-night text-paper">
      {/* 胶片颗粒噪点（全屏、极淡、不挡交互） */}
      <div className="film-grain" aria-hidden="true" />

      {/* ===== 1. Hero：视频先征服 ===== */}
      <Hero />

      {/* ===== 2-5. 展示带 / 卡片区 / 工具箱 / 进阶资料 ===== */}
      <CheatSheet prompts={prompts} extras={extras} />

      {/* ===== 6. 页脚 ===== */}
      <Footer usageAdvice={extras.usageAdvice} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
