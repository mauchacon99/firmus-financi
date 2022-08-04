const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderColor: (theme) => ({
      ...theme("colors"),
    }),
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
