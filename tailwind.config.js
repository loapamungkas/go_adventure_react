export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};