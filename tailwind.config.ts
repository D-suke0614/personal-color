import type { Config } from 'tailwindcss';

export default {
  content: ['./stories/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        primary: 'linear-gradient(90deg, #E2FFFC 0%, #FFCEDE 50%, #DCBCF6 100%)',
      },
      boxShadow: {
        primary: '3px 3px 3px #c0c0c0',
      },
      fontFamily: {
        sans: ['Noto Sans Japanese', 'sans-serif'],
        knewave: ['Knewave', 'cursive'],
      },
    },
  },
  // 動的に生成したクラスが適用されなかったので、safelistに追記。
  safelist: [
    'after:bg-[#FFCEDF]',
    'after:bg-[#CEDBFF]',
    'after:bg-[#B67935]',
    'after:bg-[#1E398B]',
    'bg-[#F6EECC]',
    'bg-[#DBEBF8]',
    'bg-[#DFD796]',
    'bg-[#BCD3DF]',
  ],
  plugins: [],
} satisfies Config;
