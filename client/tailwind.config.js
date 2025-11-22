/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c770f0',
        secondary: '#a24dd3',
        dark: '#0a0118',
        darker: '#1b1a2e',
        accent: '#e31b6d',
      },
      animation: {
        'wave': 'wave 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { 
            'box-shadow': '0 0 10px #c770f0, 0 0 20px #c770f0, 0 0 30px #c770f0',
          },
          'to': { 
            'box-shadow': '0 0 20px #c770f0, 0 0 30px #c770f0, 0 0 40px #c770f0',
          },
        },
      },
    },
  },
  plugins: [],
}
