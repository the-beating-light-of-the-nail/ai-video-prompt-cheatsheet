'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { CATEGORY_DOT } from '../lib/data';

/** 精选 8 个最有视觉冲击力的运镜做展示带（环绕/推/拉/升降/变焦/甩镜/鸟瞰/王家卫） */
const FEATURED_IDS = [13, 3, 5, 15, 17, 19, 20, 22];

/**
 * 画廊缩略卡：海报帧打底，悬停 / 聚焦时静音循环预览，移开暂停；
 * 点击（或回车）跳到对应的运镜详情卡。视频 preload="none"，不悬停不耗流量。
 */
function GalleryCard({ item, onJump }) {
  const t = useTranslations('gallery');
  const videoRef = useRef(null);

  const preview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  const stop = () => videoRef.current?.pause();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onJump(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onJump(item.id);
        }
      }}
      onMouseEnter={preview}
      onMouseLeave={stop}
      onFocus={preview}
      onBlur={stop}
      className="group w-[210px] shrink-0 cursor-pointer snap-start sm:w-[256px]"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-200 group-hover:border-gold/40">
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.posterUrl}
          muted
          loop
          playsInline
          preload="none"
          className="aspect-video w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/10"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute bottom-2 left-2.5 flex items-center gap-1.5 text-xs font-medium text-paper/90">
          <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[item.category] || 'bg-mist'}`} aria-hidden="true" />
          {item.name}
        </span>
        <span className="pointer-events-none absolute right-2 top-2 rounded bg-night/60 px-1.5 py-0.5 font-mono text-[10px] text-paper/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {t('previewBadge')}
        </span>
      </div>
      <p className="mt-2 truncate px-0.5 text-xs text-mist">{item.nameAlt}</p>
    </div>
  );
}

/**
 * 「先看效果」横向滚动展示带（第二屏）：overflow-x + snap scroll，
 * 继续用视频征服用户，再引导往下进入教学卡片区。
 */
export default function GalleryStrip({ items, onJump }) {
  const t = useTranslations('gallery');
  const featured = FEATURED_IDS.map((id) => items.find((p) => p.id === id)).filter(Boolean);

  return (
    <section id="gallery" className="scroll-mt-20 border-y border-white/[0.06] bg-white/[0.015] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold/80">{t('eyebrow')}</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{t('title')}</h2>
            <p className="mt-2 text-xs text-mist sm:text-sm">{t('hint')}</p>
          </div>
          <a
            href="#cards"
            className="hidden shrink-0 text-xs text-mist transition-colors duration-200 hover:text-gold sm:block"
          >
            {t('viewAll', { count: items.length })}
          </a>
        </div>
      </div>

      <div className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {featured.map((item) => (
          <GalleryCard key={item.id} item={item} onJump={onJump} />
        ))}
        {/* 末尾留一个「看全部」的引导卡 */}
        <a
          href="#cards"
          className="flex w-[140px] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] text-mist transition-colors duration-200 hover:border-gold/40 hover:text-gold"
        >
          <span className="text-xl" aria-hidden="true">
            →
          </span>
          <span className="text-xs">{t('more', { count: items.length - featured.length })}</span>
        </a>
      </div>
    </section>
  );
}
