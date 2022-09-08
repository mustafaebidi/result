/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: ["./src/**/*.{html,js}"],
  purge: ["./src/**/*.{html,js}"],

  theme: {

    extend: {
      colors: {
        input:"#f1e5e5",
        main:"#F53E3D",
      },
      screens: {
        'mu': {'max': '639px'},
      }

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
