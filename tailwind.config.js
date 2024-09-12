import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    'bg-Data_Science',
    'bg-Web_Development',
    'bg-Digital_Marketing',
    'bg-Graphic_Design'
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "course-banner": "url('@/assets/courses/slide2.jpg')",
        "course-detail-banner": "url('./src/assets/CourseDetail/banner2.jpg')",
      }),
      listStyleImage: {
        checkmark: 'url("./src/assets/CourseDetail/checkmark.png")',
      },
      spacing: {
        12.5: '50px',
        15: "60px",
      },
      lineHeight: {
        16: "3rem",
      },
      colors: {
        'Data_Science': '#2ecc71',
        'Web_Development': '#3498db',
        'Digital_Marketing': '#e74c3c',
        'Graphic_Design': '#e67e22'
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last-child", "&>*:not(:last-child)"); // select all child except last
    }),
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#968FB6",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/cover-transformed.png')",
      },
    },
  },
  plugins: [],
});
