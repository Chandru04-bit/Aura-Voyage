/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#142B45',      // Deep Navy Blue
          secondary: '#2878A5',    // Ocean Blue
          accent: '#F29B50',       // Warm Orange
          accentHover: '#E08537',  // Deeper Orange
          bg: '#F8F7F3',           // Light Cream
          card: '#FFFFFF',         // White
          text: '#252B32',         // Dark Charcoal
          muted: '#64748B',        // Slate Gray
          lightBorder: '#E5E7EB',  // Light Border
          navyLight: '#1C3B5E',    // Slightly lighter navy for hover/active
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 43, 69, 0.06), 0 2px 6px -1px rgba(20, 43, 69, 0.04)',
        'soft-hover': '0 12px 30px -4px rgba(20, 43, 69, 0.12), 0 4px 12px -2px rgba(20, 43, 69, 0.08)',
        'card': '0 2px 10px rgba(20, 43, 69, 0.05)',
      }
    },
  },
  plugins: [],
}
