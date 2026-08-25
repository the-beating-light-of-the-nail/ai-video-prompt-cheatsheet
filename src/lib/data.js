/** 分类（规范化 key）与公共样式映射（基础=绿、进阶=蓝、大师=金） */
export const CATEGORY_KEYS = ['basics', 'cinematic', 'director'];

export const CATEGORY_CHIP = {
  basics: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  cinematic: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  director: 'border-gold/40 bg-gold/10 text-gold-bright',
};

export const CATEGORY_DOT = {
  basics: 'bg-emerald-400',
  cinematic: 'bg-sky-400',
  director: 'bg-gold',
};

/** 从 25 条案例中去重出「运镜」清单（同一运镜的 A/B 示例只保留一个选项），供拼装器使用 */
export function getMovements(prompts) {
  const seen = new Set();
  const list = [];
  for (const p of prompts) {
    if (seen.has(p.name)) continue;
    seen.add(p.name);
    list.push({
      id: p.id,
      name: p.name,
      nameAlt: p.nameAlt,
      category: p.category,
      templateZh: p.templateZh,
      templateEn: p.templateEn,
    });
  }
  return list;
}

/** 搜索：中英文关键词均可命中，匹配名称/讲解/模板/示例/小课堂全文 */
export function searchPrompts(prompts, query) {
  const q = query.trim().toLowerCase();
  if (!q) return prompts;
  const qCompact = q.replace(/\s+/g, '');
  return prompts.filter((p) => {
    const hay = [
      p.name,
      p.nameAlt,
      p.category,
      p.variant || '',
      p.plain,
      p.when,
      p.templateZh,
      p.templateEn,
      p.exampleZh,
      p.exampleEn,
      p.lesson,
      p.tip || '',
      p.directorNote || '',
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(q) || hay.replace(/\s+/g, '').includes(qCompact);
  });
}
