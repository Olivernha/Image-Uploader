module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      fontFamily: {
        'poppins':['Poppins']
      },
      width:{
        'card-holder':'402px',
        'dg-holder':'338px'
      },
      height:{
        'card-holder':'469px',
        'dg-holder':'218.9px'
      },
      boxShadow:{
        custom:'0px 4px 12px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
