'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import CopyButton from './CopyButton.jsx';

/** 术语速查：按功能分组的导演级中英词汇（引自 Seedance 2.0 Skill OS 词汇表原文） */
function Glossary({ glossary }) {
  const t = useTranslations('extras');
  const isZh = useLocale() === 'zh-CN';
  const functions = useMemo(() => {
    const seen = new Set();
    for (const g of glossary) seen.add(g.fn);
    return ['all', ...Array.from(seen)];
  }, [glossary]);
  const [active, setActive] = useState('all');
  const list = active === 'all' ? glossary : glossary.filter((g) => g.fn === active);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-1.5">
        {functions.map((fn) => (
          <button
            key={fn}
            type="button"
            onClick={() => setActive(fn)}
            className={`rounded-full border px-2.5 py-1 text-[11px] leading-none transition-colors duration-200 ${
              fn === active
                ? 'border-gold/60 bg-gold/15 text-gold-bright'
                : 'border-white/10 bg-white/[0.03] text-mist hover:border-white/20 hover:text-paper'
            }`}
          >
            {fn === 'all' ? t('allLabel') : fn}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-mist/70">{t('glossaryCount', { count: list.length })}</span>
      </div>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((g) => (
          <li
            key={`${g.fn}-${g.primary}`}
            className="group flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-night/50 px-3 py-2 transition-colors duration-200 hover:border-white/[0.14]"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] text-paper/90">{g.primary}</p>
              <p className="mt-0.5 truncate text-[11px] text-mist/80">{g.secondary}</p>
            </div>
            <CopyButton
              text={isZh ? `${g.primary}（${g.secondary}）` : `${g.primary} (${g.secondary})`}
              label={t('copy')}
              className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 通用深色玻璃面板外壳 */
function Panel({ id, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-6"
    >
      {children}
    </section>
  );
}

/**
 * 进阶资料区：写作五心法 / 导演级术语速查 / 套话急救室 / 结构模板。
 * 数据全部来自源文件原文（见 extras 数据的 source 字段与页脚致谢）。
 */
export default function ExtrasSection({ extras }) {
  const t = useTranslations('extras');
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* 五条心法 */}
      <Panel id="tips">
        <h2 className="text-lg font-semibold text-white sm:text-xl">{t('tipsTitle')}</h2>
        <p className="mt-1 text-xs text-mist sm:text-sm">{t('tipsDesc')}</p>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {extras.writingTips.map((tip, i) => (
            <li
              key={tip.title}
              className="rounded-lg border border-white/[0.06] bg-night/50 p-3.5 transition-colors duration-200 hover:border-white/[0.14]"
            >
              <p className="flex items-baseline gap-2 text-sm font-medium text-gold-bright">
                <span className="font-mono text-xs text-gold/70">0{i + 1}</span>
                {tip.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-mist">{tip.body}</p>
            </li>
          ))}
        </ol>
      </Panel>

      {/* 术语速查（默认折叠，条目多） */}
      <Panel id="glossary">
        <button
          type="button"
          onClick={() => setGlossaryOpen((v) => !v)}
          aria-expanded={glossaryOpen}
          className="flex w-full items-center justify-between gap-2 text-left"
        >
          <span>
            <span className="text-lg font-semibold text-white sm:text-xl">{t('glossaryTitle')}</span>
            <span className="mt-1 block text-xs text-mist sm:text-sm">
              {t('glossaryDesc', { count: extras.glossary.length })}
            </span>
          </span>
          <span
            className={`shrink-0 text-mist transition-transform duration-200 ${glossaryOpen ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            ›
          </span>
        </button>
        {glossaryOpen && <Glossary glossary={extras.glossary} />}
      </Panel>

      {/* 套话急救室 */}
      <Panel id="slop">
        <h2 className="text-lg font-semibold text-white sm:text-xl">{t('slopTitle')}</h2>
        <p className="mt-1 text-xs leading-relaxed text-mist sm:text-sm">{extras.slopIntro}</p>

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-rose-500/25 bg-rose-500/[0.06] p-3.5">
            <p className="text-xs font-medium text-rose-300">{extras.workedExample.bad_label}</p>
            <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-rose-100/80">
              {extras.workedExample.bad}
            </pre>
          </div>
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] p-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-emerald-300">{extras.workedExample.good_label}</p>
              <CopyButton text={extras.workedExample.good} label={t('copy')} />
            </div>
            <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-emerald-100/85">
              {extras.workedExample.good}
            </pre>
          </div>
        </div>
        <p className="mt-2 text-xs text-mist/80">💡 {extras.workedExample.note}</p>

        <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] table-fixed text-left text-xs">
              <thead>
                <tr className="bg-night/70 text-mist">
                  <th className="w-1/3 px-3 py-2 font-medium">{t('tableBad')}</th>
                  <th className="px-3 py-2 font-medium">{t('tableGood')}</th>
                </tr>
              </thead>
              <tbody>
                {extras.slopTraps.map((row, i) => (
                  <tr key={row.bad} className={i % 2 === 0 ? 'bg-night/40' : 'bg-night/15'}>
                    <td className="border-t border-white/[0.06] px-3 py-2 align-top text-mist line-through decoration-rose-400/50">
                      {row.bad}
                    </td>
                    <td className="border-t border-white/[0.06] px-3 py-2 align-top leading-relaxed text-paper/85">
                      {row.good}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>

      {/* 结构模板 */}
      <Panel id="templates">
        <h2 className="text-lg font-semibold text-white sm:text-xl">{t('templatesTitle')}</h2>
        <p className="mt-1 text-xs text-mist sm:text-sm">{t('templatesDesc')}</p>
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">
          {extras.templates.map((tpl) => (
            <div key={tpl.name} className="flex flex-col rounded-lg border border-white/[0.06] bg-night/50 p-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-paper/90">{tpl.name}</p>
                <CopyButton text={tpl.text} label={t('copy')} />
              </div>
              <p className="mt-1 text-[11px] text-mist/80">{tpl.desc}</p>
              <pre className="mt-2.5 whitespace-pre-wrap break-words rounded-md border border-white/[0.06] bg-night/70 p-2.5 font-mono text-[12px] leading-relaxed text-paper/80">
                {tpl.text}
              </pre>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
