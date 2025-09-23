/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dark: ['Dark', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        broken: ['Broken', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        living: ['Living', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        manu: ['Manuskript', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        omerta: ['Omerta', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        raven: ['Raven', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        stroke: ['Stroke', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        wells: ['Wells', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        yugi: ['Yugi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '4vw': '4vw',
        '6vw': '6vw',
        '8vw': '8vw',
        '10vw': '10vw',
        '12vw': '12vw',
        '15vw': '15vw',
      },
      letterSpacing: {
        'widest': '0.3em',
        'ultra-wide': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
