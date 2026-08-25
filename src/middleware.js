import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// 语言协商：根路径与无前缀路径按 Accept-Language / Cookie 重定向到对应语言
export default createMiddleware(routing);

export const config = {
  // 跳过内部资源与静态文件
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
