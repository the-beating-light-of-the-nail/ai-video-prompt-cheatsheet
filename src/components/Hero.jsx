'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { LOCALES } from '@/i18n/routing';

const HERO_VIDEO =
  'https://yinxiaowai.github.io/awesome-ai-video-camera-movement-prompts/assets/videos/video-13.mp4';
const HERO_POSTER = '/posters/video-13.jpg';

/** 响应式媒体查询（SSR 安全：挂载后才返回真实值） */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/** 语言切换：可爬取的 <a> 链接，同时是 hreflang 的可见入口 */
function LanguageSwitcher() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const labels = { 'zh-CN': '中文', en: 'EN' };

  return (
    <span className="flex items-center gap-2" aria-label={t('langAria')}>
      {LOCALES.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="text-white/15">
              ·
            </span>
          )}
          <a
            href={`/${loc}`}
            hrefLang={loc}
            aria-current={locale === loc ? 'true' : undefined}
            className={
              locale === loc
                ? 'font-medium text-gold'
                : 'transition-colors duration-200 hover:text-gold'
            }
          >
            {labels[loc]}
          </a>
        </span>
      ))}
    </span>
  );
}

/**
 * 首屏 Hero（视觉征服）：全屏深色背景 + 环绕镜头自动播放静音循环视频，
 * 叠加半透明渐变遮罩。移动端与「减少动态」偏好下降级为海报图，省流量也省眼睛。
 */
export default function Hero() {
  const t = useTranslations('hero');
  const videoRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const showVideo = !isMobile && !reduceMotion;

  // React 对 muted 属性的渲染在个别浏览器上不可靠，双保险：挂载后显式置静音再播
  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [showVideo]);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night"
      style={{ minHeight: '100svh' }}
    >
      {/* 背景：视频（或移动端海报降级） */}
      <div className="absolute inset-0" aria-hidden="true">
        {showVideo ? (
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={HERO_POSTER} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      {/* 半透明渐变遮罩：上下压暗 + 中心聚光 */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/50 to-night" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.6)_100%)]"
        aria-hidden="true"
      />

      {/* 内容 */}
      <div className="relative z-10 px-4 py-24 text-center sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.35em] text-mist backdrop-blur-sm sm:text-[11px]">
          {t('badge')}
        </p>

        <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t('titlePre')}
          <span className="text-gold">{t('titleEm')}</span>
          {t('titlePost')}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-paper/70 sm:text-base">
          {t('subtitle')}
        </p>

        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            href="#cards"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night shadow-[0_0_48px_rgba(245,166,35,0.35)] transition-all duration-200 hover:bg-gold-bright hover:shadow-[0_0_64px_rgba(245,166,35,0.5)]"
          >
            {t('cta')}
            <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">
              ↓
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-mist">
            <a href="#gallery" className="transition-colors duration-200 hover:text-gold">
              {t('navGallery')}
            </a>
            <span aria-hidden="true" className="text-white/15">
              ·
            </span>
            <a href="#toolbox" className="transition-colors duration-200 hover:text-gold">
              {t('navToolbox')}
            </a>
            <span aria-hidden="true" className="text-white/15">
              ·
            </span>
            <a href="#tips" className="transition-colors duration-200 hover:text-gold">
              {t('navTips')}
            </a>
            <span aria-hidden="true" className="text-white/15">
              ·
            </span>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>

      {/* 底部角落提示：正在示范的运镜 */}
      <p className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap text-[10px] tracking-wider text-mist/70 sm:block">
        {t('note')}
      </p>
    </section>
  );
}
