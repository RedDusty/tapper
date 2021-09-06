module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      ss: '360px',
      sl: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xm: '1366px',
      '2xl': '1536px',
      '3xl': '1920px'
    }
  },
  variants: {
    extend: {
      animation: ['focus']
    }
  },
  plugins: []
};