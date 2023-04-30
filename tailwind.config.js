const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  darkMode: 'class',
  purge: {
    layers: ['utilities'],
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.css']
  },
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      dblue: {
        100: '#E6F0FF',
        200: '#BFDAFF',
        300: '#99C3FF',
        400: '#4D97FF',
        500: '#006AFF',
        600: '#005FE6',
        700: '#004099',
        800: '#003073',
        900: '#00204D'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
