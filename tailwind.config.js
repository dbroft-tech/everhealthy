/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf7',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#0ba968',
          700: '#059669',
          800: '#047857',
          900: '#064e3b',
        },
      },
      backgroundImage: {
        'glossy-emerald': 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
        'glossy-emerald-hover': 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
      },
    },
  },
  plugins: [],
};
