/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
      },
      colors: {
        f1: {
          dark: {
            bg: '#1A1D21',
            panel: '#212529',
            field: '#262A2F',
            alt: '#292E32',
          },
        },
        primary: {
          100: '#F8EDD2',
          DEFAULT: '#DAA520',
          500: '#DAA520',
          900: '#41310A',
        },
      },
    },
  },
  plugins: [],
};
