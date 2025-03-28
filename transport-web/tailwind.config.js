/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ["Inter", "sans-serif"], // Default sans-serif font
      roboto: ["Roboto", "sans-serif"], // Example custom font
      poppins: ["Poppins", "sans-serif"], // Another custom font
      uimonospace:["ui-monospace","mono"],
      SFMonoRegular:["SFMono-Regular","mono"],
      Menlo:["Menlo","mono"],
      Consolas:["Consolas","mono"],
      Garamond:["Garamond","serif"],
      mono: ['ui-monospace','Monaco',  'SFMono-Regular', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },colors:{
      card:"rgb(184, 206, 203)",
      button:"rgb(82, 135, 131)",
      highlight:"rgb(222, 231, 232)",
      assignment:"rgb(21,176,151)",
      closetask:"rgb(248, 208, 224)",
      bluetask:"rgb(214, 222, 251)",
      Texttask:"rgb(103, 88, 219)",
      TaskCard:"rgb(243, 244, 246)"
    }
  },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}