import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', 'sans-serif'],
        serif: ['var(--font-zcool)', '"Noto Serif SC"', 'serif'],
      },
      colors: {
        paper: '#Fdfcf8',
        ink: '#2c2c2c',
        mist: '#E5E5E0',
        clay: '#bcaaa4',
        sage: '#8FA998',
        sand: '#e6dfd5',
        rust: '#A85751',
        'card-bg': '#FFFEFA',
      },
      boxShadow: {
        float: '0 20px 40px -10px rgba(0,0,0,0.08)',
        paper: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      },
      backgroundImage: {
        texture:
          "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23bcaaa4\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};

export default config;
