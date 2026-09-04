// 静态导出后没有服务端语言协商：根路径改为客户端按浏览器语言跳转（默认中文）
export const metadata = {
  robots: { index: false, follow: false },
};

const REDIRECT_SCRIPT = `(function(){try{var l=(navigator.languages&&navigator.languages[0])||navigator.language||"zh-CN";l=String(l).toLowerCase();location.replace(/^zh/.test(l)?"/zh-CN/":"/en/")}catch(e){location.replace("/zh-CN/")}})()`;

export default function RootRedirectPage() {
  return (
    <>
      {/* JS 不可用时的兜底（React 19 会把 meta 提升到 head） */}
      <meta httpEquiv="refresh" content="0;url=/zh-CN/" />
      <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
      <noscript>
        <p style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '40vh' }}>
          <a href="/zh-CN/">中文版</a>
          {' · '}
          <a href="/en/">English</a>
        </p>
      </noscript>
    </>
  );
}
