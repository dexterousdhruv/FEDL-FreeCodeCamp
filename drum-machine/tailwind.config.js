/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'custom' : '20px 20px 5px #1d1b1b'
      }
    },
  },
  plugins: [],
}

