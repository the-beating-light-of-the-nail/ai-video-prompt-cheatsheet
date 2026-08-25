'use client';

import { useTranslations } from 'next-intl';
import { CATEGORY_DOT, CATEGORY_KEYS } from '../lib/data';

/**
 * 分类筛选标签：显示各类数量，配合粘性工具栏使用。
 * 基础=绿点、进阶=蓝点、大师=金点。
 */
export default function CategoryTabs({ active, onChange, counts }) {
  const t = useTranslations('categories');
  const ta = useTranslations('tabs');
  const tabs = ['all', ...CATEGORY_KEYS];

  return (
    <div className="flex flex-1 items-center gap-1.5 overflow-x-auto" role="tablist" aria-label={ta('aria')}>
      {tabs.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
              isActive
                ? 'border-gold/70 bg-gold/15 text-gold-bright'
                : 'border-white/10 bg-white/[0.03] text-mist hover:border-white/20 hover:text-paper'
            }`}
          >
            {cat !== 'all' && (
              <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[cat] || 'bg-mist'}`} aria-hidden="true" />
            )}
            {t(cat)}
            <span
              className={`rounded-full px-1.5 py-px font-mono text-[10px] leading-none ${
                isActive ? 'bg-gold/20 text-gold-bright' : 'bg-white/[0.06] text-mist/80'
              }`}
            >
              {counts[cat] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
