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
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
          primary: '#e64a19',
          accent: '#f0441c',
          dark: '#c23b12',
          light: '#fff5ee',
        },
        revenue: {
          DEFAULT: '#059669',
          light: '#d1fae5',
          dark: '#047857',
        },
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f8fafc',
          subtle: '#f1f5f9',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -1px rgba(0, 0, 0, 0.04), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'nav': '0 -4px 16px -1px rgba(0, 0, 0, 0.04)',
        'pop': '0 10px 25px -3px rgba(230, 74, 25, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
