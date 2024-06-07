/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky' : '#646cff',
        'dark-sky' : '#535bf2',
      },
      boxShadow: {
        'custom' : '2px 2px 25px #1d1b1b'
      }
    },
  },
  plugins: [],
}

