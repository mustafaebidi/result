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
        unCalculatedGrades:"#1f844a",
        calculatedGrades:"#2874a6",
        studentInfo:"#5b2c70",
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

  variants: {
    extend: {
    },
  },



  corePlugins: {
    preflight: true // <== disable this!
  },
}
