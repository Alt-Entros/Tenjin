/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tc: '#3E4A53',
        warning: '#c1121f',
        tcActive: '#758998',
        cardShadow: '#9EB4C8'
      },
      fontFamily: {
        inter: ['inter', 'sans-serif']
      },
      backgroundImage: {
        pattern: "url('@/assets//img/background.svg')"
      }
    }
  },
  plugins: []
}
