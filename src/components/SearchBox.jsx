'use client';

import { useTranslations } from 'next-intl';

/**
 * 搜索框：中英文关键词均可（如「推」或「dolly」），搜名称/讲解/模板/示例全文。
 */
export default function SearchBox({ value, onChange }) {
  const t = useTranslations('search');

  return (
    <div className="relative w-full sm:ml-auto sm:max-w-xs">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-mist" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('placeholder')}
        aria-label={t('aria')}
        className="w-full rounded-lg border border-white/10 bg-night/70 py-2 pl-9 pr-8 text-sm text-paper placeholder:text-mist/70 transition-colors duration-200 hover:border-white/20 focus:border-gold/60 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          title={t('clearTitle')}
          aria-label={t('clearTitle')}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-xs text-mist transition-colors duration-200 hover:text-paper"
        >
          ✕
        </button>
      )}
    </div>
  );
}
