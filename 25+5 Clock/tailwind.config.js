/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aubergine': '#190b14',
        'lavender': '#b491a5',
        'lavender-dark': '#ad886',
        'velvet': '#FFF2D7',
        'coffee': '#c38154',
        
      }
    },
  },
  plugins: [],
}

