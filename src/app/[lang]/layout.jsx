import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();

  // 静态渲染：锁定当前语言，避免动态渲染回退
  setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        {/* Microsoft Clarity 统计（与原站一致） */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "y5p6or66ss");`}
        </Script>
      </body>
    </html>
  );
}
