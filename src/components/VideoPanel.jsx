'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * 卡片视频区（视频优先，占卡片上半身）：
 * 默认只渲染海报帧 + 播放按钮，不挂 <video>；
 * 点击后才挂载并加载播放（懒加载，preload="none"），16:9 占满卡片宽度。
 */
export default function VideoPanel({ src, poster, gallery }) {
  const t = useTranslations('video');
  const [active, setActive] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false; // 详情卡是用户主动点击，允许有声
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [active]);

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        aria-label={t('playAria')}
        className="group relative block w-full cursor-pointer overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-night/60 via-night/10 to-night/20" aria-hidden="true" />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-night/50 text-lg text-white backdrop-blur-sm transition-all duration-200 group-hover:scale-105 group-hover:border-gold/70 group-hover:text-gold">
            ▶
          </span>
        </span>
        <span className="absolute bottom-2.5 left-3 text-[10px] tracking-wider text-paper/70">{t('lazyHint')}</span>
      </button>
    );
  }

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        preload="none"
        poster={poster}
        src={src}
        className="aspect-video w-full bg-black object-cover"
      >
        {t('fallbackPre')}
        <a href={gallery} target="_blank" rel="noreferrer" className="text-gold hover:underline">
          {t('fallbackLink')}
        </a>
      </video>
      <a
        href={gallery}
        target="_blank"
        rel="noreferrer"
        className="absolute right-2.5 top-2.5 rounded bg-night/70 px-2 py-0.5 text-[10px] text-paper/70 backdrop-blur-sm transition-colors duration-200 hover:text-gold"
      >
        {t('galleryLink')}
      </a>
    </div>
  );
}
