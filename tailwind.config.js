/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1025px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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