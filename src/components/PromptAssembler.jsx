'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import CopyButton from './CopyButton.jsx';
import { CATEGORY_KEYS } from '../lib/data';

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-mist">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-white/10 bg-night/70 px-3 py-2 text-sm text-paper transition-colors duration-200 hover:border-white/20 focus:border-gold/60 focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

/**
 * 工具箱 · 提示词拼装器（深色面板 + 琥珀色高亮）：
 * 【运镜】×【场景】×【主体动作】×【氛围】→ 自动拼成完整提示词。
 * 运镜选项来自 prompts 数据；其余三组为常用备选。结果可一键复制。
 */
export default function PromptAssembler({ movements, options }) {
  const t = useTranslations('assembler');
  const tc = useTranslations('categories');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  const { scenes, actions, moods, joiner, ending, negativeSuffix } = options;
  const [scene, setScene] = useState(scenes[0]);
  const [action, setAction] = useState(actions[0]);
  const [mood, setMood] = useState(moods[0]);
  const [moveId, setMoveId] = useState(String(movements[0]?.id ?? ''));
  const [withNegative, setWithNegative] = useState(false);

  const move = useMemo(() => movements.find((m) => String(m.id) === moveId) || movements[0], [movements, moveId]);

  const parts = [move ? `${move.name}（${move.nameAlt}）` : '', scene, action, mood];
  const result = `${parts.filter(Boolean).join(joiner)}${ending}${withNegative ? negativeSuffix : ''}`;

  const randomize = () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    setScene(pick(scenes));
    setAction(pick(actions));
    setMood(pick(moods));
    setMoveId(String(pick(movements).id));
  };

  return (
    <section
      id="assembler"
      className="scroll-mt-24 rounded-2xl border border-gold/20 bg-white/[0.03] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white sm:text-base">{t('title')}</h3>
          <p className="mt-1 text-xs text-mist sm:text-sm">{t('desc')}</p>
        </div>
        <button
          type="button"
          onClick={randomize}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-paper/80 transition-colors duration-200 hover:border-gold/50 hover:text-gold-bright"
        >
          {t('random')}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Select label={`【${t('labelMove')}】`} value={moveId} onChange={setMoveId}>
          {CATEGORY_KEYS.map((cat) => (
            <optgroup key={cat} label={tc(cat)}>
              {movements
                .filter((m) => m.category === cat)
                .map((m) => (
                  <option key={m.id} value={String(m.id)}>
                    {m.name} · {m.nameAlt}
                  </option>
                ))}
            </optgroup>
          ))}
        </Select>
        <Select label={`【${t('labelScene')}】`} value={scene} onChange={setScene}>
          {scenes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <Select label={`【${t('labelAction')}】`} value={action} onChange={setAction}>
          {actions.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </Select>
        <Select label={`【${t('labelMood')}】`} value={mood} onChange={setMood}>
          {moods.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-mist">{t('resultLabel')}</span>
          <CopyButton text={result} label={t('copy')} copiedLabel={t('copied')} className="!px-3 !py-1.5" />
        </div>
        <pre className="whitespace-pre-wrap break-words rounded-lg border border-gold/30 bg-gold/[0.07] p-3.5 font-mono text-[13px] leading-relaxed text-amber-100/90 selection:bg-gold/30">
          {result}
        </pre>
        <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-xs text-mist">
          <input
            type="checkbox"
            checked={withNegative}
            onChange={(e) => setWithNegative(e.target.checked)}
            className="h-3.5 w-3.5 cursor-pointer accent-[#f5a623]"
          />
          {t('withNegative')}
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-night/50 p-3">
          <p className="text-xs font-medium text-mist">{t('templateHint')}</p>
          <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed text-paper/80">
            {isZh ? move?.templateZh : move?.templateEn}
          </pre>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-night/50 p-3 text-xs leading-relaxed text-mist">
          <p className="font-medium text-mist">{t('tipsTitle')}</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {t.raw('tips').map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
