'use client';

import { useEffect, useRef, useState } from 'react';
import { copyText } from '../lib/clipboard';

/**
 * 一键复制按钮：成功后变绿显示「已复制 ✓」，1.5s 后恢复。
 */
export default function CopyButton({ text, label, copiedLabel, title, className = '' }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async () => {
    const ok = await copyText(text);
    if (ok) {
      setFailed(false);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } else {
      setFailed(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setFailed(false), 1500);
    }
  };

  const state = failed
    ? 'border-rose-500/60 bg-rose-600/90 text-white'
    : copied
      ? 'border-emerald-500/60 bg-emerald-600 text-white'
      : 'border-white/10 bg-white/[0.05] text-paper/80 hover:border-gold/50 hover:text-gold-bright';

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title || (copied ? copiedLabel : label)}
      className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium leading-none transition-colors duration-200 ${state} ${className}`}
    >
      {failed ? '✕' : copied ? copiedLabel : label}
    </button>
  );
}
