/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: '#0b0f19',
          card: '#131a2b',
          topbar: '#070a12',
        },
        gold: {
          amber: '#d97706',
          hover: '#b45309',
          light: '#fbbf24',
        }
      }
    },
  },
  plugins: [],
}
