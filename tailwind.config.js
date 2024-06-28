const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins_400Regular'],
        poppinsSemibold: ['Poppins_600SemiBold'],
        ptsans: ['PTSans_400Regular'],
      },
      colors,
    },
  },
  plugins: [],
};
