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
      keyframes: {
        boulderRoll: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(55px, -42px) rotate(90deg)' },
          '45%': { transform: 'translate(110px, -85px) rotate(180deg)' },
          '55%': { transform: 'translate(110px, -85px) rotate(180deg)' },
          '75%': { transform: 'translate(55px, -42px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        sisyphusWalk: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(25px)' },
          '45%': { transform: 'translateX(50px)' },
          '55%': { transform: 'translateX(50px)' },
          '75%': { transform: 'translateX(25px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'boulder-roll': 'boulderRoll 4s ease-in-out infinite',
        'sisyphus-walk': 'sisyphusWalk 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
