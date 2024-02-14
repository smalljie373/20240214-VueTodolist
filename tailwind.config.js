/** @type {import('tailwindcss').Config} */
export default {
  purge:{
    enabled: true,
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {},
    container:{
      center: true,
    }
  },
  plugins: [],
}

