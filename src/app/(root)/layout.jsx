// 根路径跳转页的独立 root layout（静态导出后与 [lang] 并列的第二个根布局）
export default function RootRedirectLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
