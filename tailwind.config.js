/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        primary: '#0C0C0C',
        secondary: '#481E14',
        tertiary: '#020617',
        quaternary:'#F2613F',
        quinary: '#D9D9D9'
      }
    },
  },
  plugins: [],
}