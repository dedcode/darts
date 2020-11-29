const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    layers: ['utilities'],
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.css']
  },
  theme: {
    colors: {
      ...defaultTheme.colors,
      gray: colors.coolGray,
      teal: colors.teal,
      transparent: 'transparent'
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
