/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'web-primary': '#8D999F',
        'text-primary':'#2F5A76',
        'btn-primary': '#FF9600',
        'side-nav-bg': '#F9FCFF',
        'side-nav-text': '#6F8DA1'
      },
      fontFamily:{
        'inter' : ["Inter", "sans-serif"]
      }, 
      width: {
        'calc': 'calc(100% - 180px)',
      }
    },
  },
  plugins: [],
}

