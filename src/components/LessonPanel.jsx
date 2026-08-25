'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * 「📷 摄影小课堂」折叠面板：默认折叠，点击展开。每条案例的原创小课堂。
 */
export default function LessonPanel({ lesson }) {
  const t = useTranslations('card');
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-medium text-paper/80 transition-colors duration-200 hover:bg-white/[0.03] hover:text-gold-bright"
      >
        <span>{t('lessonTitle')}</span>
        <span
          className={`text-mist transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        >
          ›
        </span>
      </button>
      {open && (
        <p className="border-t border-white/[0.06] px-3 py-2.5 text-sm leading-relaxed text-paper/80">{lesson}</p>
      )}
    </div>
  );
}
