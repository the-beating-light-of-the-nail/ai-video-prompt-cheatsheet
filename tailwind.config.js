/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 近黑夜幕底 + 琥珀金 / 电影橙点缀（视觉征服优先的深色影院风）
        night: '#0a0a0f',
        gold: {
          DEFAULT: '#f5a623',
          bright: '#ffc24d',
          dim: '#b57a0f',
        },
        reel: {
          DEFAULT: '#e8734a',
          bright: '#ff9068',
        },
        paper: '#e8e6e3',
        mist: '#9a9a9a',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
