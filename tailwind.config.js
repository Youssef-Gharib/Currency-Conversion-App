/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    colors:{
      white: {
        DEFAULT:"#fff",
        100:"#F9F9F9",
        200:"#C5C5C5",
      },
      blue: {
        DEFAULT:"#0E98D0",
        100:"#10a9e8"
      },
      black: {
        DEFAULT:"#000",
        100:'#141414',
        200:"#202020",
        300:"#C5C5C5",
        400: "#363636"
      }
    },
    fontSize: {
      size23: '23.379px',
      size20: '20.456px' ,
    },
    extend: {
      spacing: {
        "space-1.8": "1.893px",
        "space-13": "13.787px",
        "space-15": "15.111px",
        "space-16": "16.113px",
        "space-27": "27.323px",
        "space-70": "70.136px",
        "space-74": " 74px",
        "space-81": "81.047px",
        "space-81": "81.047px",
        "space-84": "84.571px",
        "space-222": "222px",
        "space-555": "555px",
      },
      gap:{
        "gap1":"95.392px",
      },

      backgroundColor:{
        g: "linear-gradient(134deg, rgba(0, 0, 0, 0.40) 0%, rgba(157, 157, 157, 0.20) 100%)",
      },

      backdropBlur:{
        g:"(5.264404296875px)",
      },

      borderRadius:{
        radius21:"21.314px",
        radius31:"31.053px",
        radius34:"34.154px",
        radius36:"36.292px",
        radius39:"39.292px",
      }

    },
  },
  plugins: [],
}