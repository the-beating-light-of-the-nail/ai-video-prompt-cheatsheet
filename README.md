# AI 视频运镜提示词速查表

面向零基础创作者的运镜提示词卡片墙。25 个 AI 视频运镜，每个都有视频示范与可复制模板。

## 技术栈

- **Next.js 15**（App Router，SSG 静态预渲染）
- **next-intl 4**（多语言：`zh-CN` / `en`）
- **Tailwind CSS 3**

## 多语言架构

- 路由：`/zh-CN`、`/en`（`app/[lang]/` 动态段，`localePrefix: always`）
- 根路径 `/` 由 `src/middleware.js` 按 `Accept-Language` 自动跳转
- UI 文案词典：`messages/{locale}.json`
- 内容数据：`src/data/prompts.{locale}.json`、`src/data/extras.{locale}.json`（新增语言只需加词典 + 两份数据）
- SEO：每语言独立 canonical / hreflang / OG；`app/sitemap.js` 与 `app/robots.js` 动态生成；页面内嵌 ItemList JSON-LD

## 开发

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 产出 SSG 静态页
npm start       # 生产预览
```

## 数据来源与致谢

- 核心：[yinxiaowai/awesome-ai-video-camera-movement-prompts](https://github.com/yinxiaowai/awesome-ai-video-camera-movement-prompts)（25 条运镜案例、讲解、模板、视频）
- 进阶：[Emily2040/seedance-2.0](https://github.com/Emily2040/seedance-2.0)（负面约束、术语表、反套话词汇、结构模板）
- 参考：[DareDev256/Ultimate-Image-Video-Prompt-Generator](https://github.com/DareDev256/Ultimate-Image-Video-Prompt-Generator)

提示词版权归原作者所有，本站仅作学习整理。
