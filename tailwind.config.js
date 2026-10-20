/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F15B2A',
          'orange-hover': '#DD4D1E',
          'orange-light': '#FFF0EB',
          black: '#171717',
          charcoal: '#171717',
          warm: '#F7F6F2',
          'warm-dark': '#EFECE6',
          border: '#D5D2CD',
          muted: '#66625E',
          subtle: '#8E8A85',
        }
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.02em',
        wider: '0.04em',
        widest: '0.08em'
      }
    },
  },
  plugins: [],
}
