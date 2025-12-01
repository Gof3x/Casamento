export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        rose: {
          50: '#FFF1F3',
          100: '#FFE4EA',
          400: '#F4A7B9',
          500: '#F4A7B9',
          600: '#E63B7A',
          700: '#D90368',
        },
        gold: {
          400: '#FFD700',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
