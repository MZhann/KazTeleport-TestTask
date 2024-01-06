/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'starry': "url('/public/images/starry.jpg')",
        
      },
    },
  },
  plugins: [],
}

