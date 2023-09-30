/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "trans-right": {
          '0% , 100%': {
            transform: 'translateX(10px)',
          },
          '50%': {
            transform: 'translateX(0)',
          },
        },
        "upAnimation1": {
          "20%": { top: "-2rem" },
          "70%": { opacity: "1" },
          "100%": {
            top: "-2rem",
            opacity: 0
          }
        },

        "upAnimation2": {
          "30%": { top: "-2rem" },
          "80%": { opacity: "1" },
          "100%": {
            top: "-2rem",
            opacity: 0
          }
        },

        "left": {
          "0%": {
            opacity: 0,
            transform: "translate(-10rem)"
          }
        }
      },
      animation: {
        'trans-right': 'trans-right 1.5s ease-in-out infinite',
        'upAnimation1': 'upAnimation1 3.5s ease-in-out',
        'upAnimation2': 'upAnimation2 3.5s ease-in-out ',
        'left': 'left 2s ease-in-out ',
      }
    },
    plugins: [],
  }
}
