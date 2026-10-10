import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071B3D',
          950: '#04112A',
          900: '#071B3D',
          800: '#0C2752',
          700: '#13356A',
        },
        electric: {
          DEFAULT: '#085BDB',
          600: '#0750C2',
          // Tom claro do azul elétrico para texto sobre o azul-marinho (contraste AA).
          bright: '#3D8BFF',
        },
        sky: { brand: '#39B9FF' },
        mist: '#F3F7FC',
        ink: {
          DEFAULT: '#0B1A33',
          muted: '#4A5B78',
          soft: '#A9B8D0',
        },
        whatsapp: { DEFAULT: '#15803D', hover: '#116A32' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1280px' },
      borderRadius: { card: '14px' },
      boxShadow: {
        card: '0 1px 2px rgba(7,27,61,0.04), 0 8px 24px -12px rgba(7,27,61,0.12)',
        lift: '0 2px 4px rgba(7,27,61,0.05), 0 18px 40px -18px rgba(7,27,61,0.28)',
      },
      letterSpacing: { eyebrow: '0.12em' },
    },
  },
  plugins: [],
} satisfies Config;
