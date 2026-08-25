import { useTranslations } from 'next-intl';

/**
 * 页脚（全宽）：一条置顶的「15 秒建议」+ 数据来源致谢。
 * 核心：yinxiaowai 的 25 条运镜案例与视频；进阶：Seedance 2.0 Skill OS；参考：DareDev256。
 */
export default function Footer({ usageAdvice }) {
  const t = useTranslations('footer');
  const headline = usageAdvice.headline;
  const rest = usageAdvice.rest || [];

  return (
    <footer id="footer" className="scroll-mt-24 border-t border-white/[0.08] bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* 一句话提醒 */}
        <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] px-5 py-4 text-center">
          <p className="text-sm font-medium leading-relaxed text-gold-bright sm:text-base">⏱ {headline}</p>
          <p className="mt-1 text-[11px] text-mist">{t('sub')}</p>
        </div>

        {rest.length > 0 && (
          <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-mist">
            {rest.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span aria-hidden="true" className="text-gold/60">
                  ▸
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 数据来源致谢 */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-mist">{t('sourcesTitle')}</h2>
          <ul className="mt-5 grid grid-cols-1 gap-6 text-xs leading-relaxed text-mist lg:grid-cols-3">
            <li>
              <a
                href="https://github.com/yinxiaowai/awesome-ai-video-camera-movement-prompts"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold transition-colors duration-200 hover:text-gold-bright hover:underline"
              >
                yinxiaowai / awesome-ai-video-camera-movement-prompts ↗
              </a>
              <span className="ml-1 text-mist/60">{t('source1Author')}</span>
              <p className="mt-1.5">
                {t('source1Body')}{' '}
                <a
                  href="https://yinxiaowai.github.io/awesome-ai-video-camera-movement-prompts/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold/90 hover:underline"
                >
                  {t('source1Gallery')}
                </a>
                {t('source1Tail')}
              </p>
            </li>
            <li>
              <a
                href="https://github.com/Emily2040/seedance-2.0"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold/90 transition-colors duration-200 hover:text-gold-bright hover:underline"
              >
                Seedance 2.0 Skill OS（Emily2040/seedance-2.0）↗
              </a>
              <span className="ml-1 text-mist/60">{t('source2Note')}</span>
              <p className="mt-1.5">{t('source2Body')}</p>
            </li>
            <li>
              <a
                href="https://github.com/DareDev256/Ultimate-Image-Video-Prompt-Generator"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold/80 transition-colors duration-200 hover:text-gold-bright hover:underline"
              >
                DareDev256 / Ultimate-Image-Video-Prompt-Generator ↗
              </a>
              <p className="mt-1.5">{t('source3Body')}</p>
            </li>
          </ul>
        </div>

        <p className="mt-10 border-t border-white/[0.06] pt-5 text-center text-[11px] text-mist/70">
          {t('bottom')}
        </p>
      </div>
    </footer>
  );
}
