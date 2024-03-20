/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greentool:'#00cb82',
        graytool: '#3d4047'
      },
    },
  },
  plugins: [],
}

