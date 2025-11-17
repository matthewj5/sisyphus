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
          '45%': { transform: 'translate(110px, -85px) rotate(180deg)' },
          '50%': { transform: 'translate(115px, -88px) rotate(200deg)' },
          '52%': { transform: 'translate(115px, -85px) rotate(210deg)' },
          '58%': { transform: 'translate(95px, -60px) rotate(270deg)' },
          '65%': { transform: 'translate(65px, -30px) rotate(360deg)' },
          '72%': { transform: 'translate(30px, -5px) rotate(450deg)' },
          '78%': { transform: 'translate(0, 0) rotate(540deg)' },
          '100%': { transform: 'translate(0, 0) rotate(540deg)' },
        },
        sisyphusWalk: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '45%': { transform: 'translate(110px, -85px) rotate(0deg)' },
          '50%': { transform: 'translate(115px, -88px) rotate(0deg)' },
          '52%': { transform: 'translate(110px, -82px) rotate(45deg)' },
          '58%': { transform: 'translate(85px, -55px) rotate(180deg)' },
          '65%': { transform: 'translate(55px, -25px) rotate(270deg)' },
          '72%': { transform: 'translate(25px, -5px) rotate(360deg)' },
          '78%': { transform: 'translate(0, 0) rotate(405deg)' },
          '85%': { transform: 'translate(0, 0) rotate(360deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
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
