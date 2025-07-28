/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deepBlue: {
          DEFAULT: '#0a192f',
          dark: '#051127',
          darker: '#030b1a',
          light: '#0f2343',
        },
        electricBlue: '#38bdf8',
        neonGreen: '#64ffda',
      },
      fontFamily: {
        ibm: ['IBM Plex Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};