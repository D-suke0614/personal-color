import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'primary': 
          'linear-gradient(90deg, #E2FFFC 0%, #FFCEDE 50%, #DCBCF6 100%)',
      },
      boxShadow: {
        'primary': '3px 3px 3px #c0c0c0',
      },
    },
  },
  plugins: [],
} satisfies Config;
