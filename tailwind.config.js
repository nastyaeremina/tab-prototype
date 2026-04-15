/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F8F9FB',
          150: '#EFF1F4',
          200: '#DFE1E4',
          300: '#C9CBCD',
          400: '#90959D',
          500: '#6B6F76',
          550: '#60606A',
          600: '#212B36',
          700: '#0E0E10',
        },
        brand: {
          primary: '#09AA6C',
        },
      },
    },
  },
  plugins: [],
}
