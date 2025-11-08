/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0e1a26',
        parchment: '#f5f0e6',
        gold: '#d1b280',
        deepblue: '#0b1721',
        sepia: '#5a4630',
        parchmentDeep: '#e8ddc7',
        brass: '#b08947',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0,0,0,0.25)',
        vintage: '0 4px 18px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        glass: '1.25rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease both',
        pop: 'pop 0.25s ease both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
