'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import GalleryStrip from './GalleryStrip.jsx';
import PromptCard from './PromptCard.jsx';
import CategoryTabs from './CategoryTabs.jsx';
import SearchBox from './SearchBox.jsx';
import NegativeBar from './NegativeBar.jsx';
import PromptAssembler from './PromptAssembler.jsx';
import ExtrasSection from './ExtrasSection.jsx';
import { getMovements, searchPrompts } from '../lib/data';

/** 卡片区头部的分类计数（基础=绿、进阶=蓝、大师=金） */
const COUNT_CHIPS = [
  { key: 'basics', text: 'text-emerald-300' },
  { key: 'cinematic', text: 'text-sky-300' },
  { key: 'director', text: 'text-gold-bright' },
];

/**
 * 主体（客户端岛）：画廊展示带 → 运镜详情卡片区 → 工具箱 → 进阶资料。
 * 分类/搜索状态在卡片区内部消化；画廊跳转会先重置筛选再平滑滚动到目标卡片。
 */
export default function CheatSheet({ prompts, extras }) {
  const t = useTranslations('cards');
  const tt = useTranslations('toolbox');
  const tc = useTranslations('categories');

  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const movements = useMemo(() => getMovements(prompts), [prompts]);

  const counts = useMemo(() => {
    const c = { all: prompts.length };
    for (const p of prompts) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [prompts]);

  const filtered = useMemo(() => {
    const byCategory = category === 'all' ? prompts : prompts.filter((p) => p.category === category);
    return searchPrompts(byCategory, query);
  }, [prompts, category, query]);

  /** 画廊缩略卡 → 重置筛选（保证目标卡已渲染）后平滑滚动到对应详情卡 */
  const jumpToPrompt = (id) => {
    setCategory('all');
    setQuery('');
    window.setTimeout(() => {
      document.getElementById(`prompt-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <>
      {/* ===== 2. 先看效果：横向滚动视频展示带 ===== */}
      <GalleryStrip items={prompts} onJump={jumpToPrompt} />

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* ===== 3. 运镜详情卡片区（教学主体，视频优先） ===== */}
        <section id="cards" className="scroll-mt-20 pt-12 sm:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold/80">{t('eyebrow')}</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{t('title')}</h2>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-mist sm:text-sm">{t('desc')}</p>
            </div>
            <div className="flex items-center gap-x-4 gap-y-1.5 text-xs text-mist">
              {COUNT_CHIPS.map((chip) => (
                <span key={chip.key} className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      chip.key === 'basics'
                        ? 'bg-emerald-400'
                        : chip.key === 'cinematic'
                          ? 'bg-sky-400'
                          : 'bg-gold'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-sm font-semibold">{counts[chip.key]}</span>
                  <span>{tc(chip.key)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 粘性工具栏：分类筛选 + 搜索 */}
          <div className="sticky top-0 z-40 -mx-4 mt-6 border-b border-white/[0.08] bg-night/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <CategoryTabs active={category} onChange={setCategory} counts={counts} />
              <SearchBox value={query} onChange={setQuery} />
            </div>
          </div>

          <p className="mb-4 mt-5 text-xs text-mist">
            {t('countLine', { count: filtered.length })}
            {query && (
              <>
                （{t('searching', { query })}
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="ml-1 text-gold/90 transition-colors duration-200 hover:text-gold-bright hover:underline"
                >
                  {t('clear')}
                </button>
                ）
              </>
            )}
            {category !== 'all' && <> · {t('categoryPrefix', { category: tc(category) })}</>}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-16 text-center">
              <p className="text-sm text-mist">{t('emptyTitle')}</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
                className="mt-4 rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold transition-colors duration-200 hover:bg-gold/10"
              >
                {t('emptyReset')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map((item) => (
                <PromptCard key={item.id} item={item} categoryLabel={tc(item.category)} />
              ))}
            </div>
          )}
        </section>

        {/* ===== 4. 工具箱：负面提示词 + 拼装器 ===== */}
        <section id="toolbox" className="scroll-mt-24 pt-16">
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold/80">{tt('eyebrow')}</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{tt('title')}</h2>
            <p className="mt-2 text-xs text-mist sm:text-sm">{tt('desc')}</p>
          </div>
          <div className="space-y-6">
            <NegativeBar data={extras} />
            <PromptAssembler movements={movements} options={extras.assembler} />
          </div>
        </section>

        {/* ===== 5. 进阶资料：心法 / 术语 / 套话 / 模板 ===== */}
        <div className="pt-16">
          <ExtrasSection extras={extras} />
        </div>
      </main>
    </>
  );
}
