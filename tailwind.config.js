export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#DC2626',
          600: '#DC2626',
          700: '#B91C1C'
        },
        surface: {
          DEFAULT: '#F3F4F6'
        }
      },
      boxShadow: {
        soft: '0 6px 20px rgba(2,6,23,0.06)'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  }
}