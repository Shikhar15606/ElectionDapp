module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        table: 'inset 0px 4px 3px #C7D2FE',
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      skew: ['group-hover'],
      fontWeight: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
