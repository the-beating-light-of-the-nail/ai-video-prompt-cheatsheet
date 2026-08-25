import { notFound } from 'next/navigation';

// 未知的语言内路径 → 404
export default function CatchAllPage() {
  notFound();
}
