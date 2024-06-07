/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxx-sm': '350px',
        'xx-sm': '400px',
        'xsm' : '500px'
      }
    },
  },
  plugins: [],
}

