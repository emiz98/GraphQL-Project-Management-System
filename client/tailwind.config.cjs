/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
      },
      colors: {
        primary: "#23719F",
        secondary: "#2b85b9",
        notReady: "#df5454",
        inProgress: "#ffb223",
        inReview: "#5b7deb",
        Completed: "#24cb61",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
