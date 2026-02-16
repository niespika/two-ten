import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F4F1EA',
          text: '#1F1F1F',
          green: '#2E4F4F',
          copper: '#A67C52',
          darkBg: '#1C1E1C',
          darkCard: '#242624',
          darkText: '#F2F2F2',
          darkGreen: '#3F6B6B',
          darkCopper: '#C9A46A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
