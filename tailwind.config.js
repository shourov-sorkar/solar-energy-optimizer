module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        borderPulse: {
          '0%, 100%': {
            boxShadow: '0 0 6px 2px rgba(168, 85, 247, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 12px 4px rgba(168, 85, 247, 0.7)',
          },
        },
      },
      animation: {
        borderPulse: 'borderPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
