/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          brown: '#a2836e',
          'muted-green': '#6e7f5e',
          sand: '#e5d9c5',
          'light-sand': '#f5f0e6',
          'dark-brown': '#3e2c19',
        }
      },
      // Animations are defined in index.css for Tailwind v4 compatibility
    },
  },
  plugins: [],
}
