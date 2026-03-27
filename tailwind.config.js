/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Surface Zone
        'surface-cyan': '#00f2fe',
        'surface-aqua': '#4facfe',
        'surface-white': '#ffffff',
        // Twilight Zone
        'twilight-blue': '#1a2a6c',
        'twilight-dark': '#11212b',
        // Midnight Zone
        'midnight-navy': '#0f2027',
        'midnight-slate': '#203a43',
        // The Abyss
        'abyss-black': '#000000',
        'abyss-deep': '#050505',
        // Neon Accents
        'neon-blue': '#00ffff',
        'neon-green': '#39ff14',
        'neon-pink': '#ff00ff',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bubble-rise': 'bubbleRise 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(100vh) scale(0.4)', opacity: '0.6' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
      },
      letterSpacing: {
        'cinematic': '0.2em',
      },
    },
  },
  plugins: [],
}
