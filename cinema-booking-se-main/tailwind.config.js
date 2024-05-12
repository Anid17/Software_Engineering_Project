/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B181D",
        primaryvariant1: "#3B383D",
        primaryvariant2: "#6B696C",
        secondary: "#ffffff",
        accent: "#FF7430",
        text: "#A79DAE",
        placeholder: "#8B898C",
        white: "#ffffff",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ms: "540px",
      ss: "620px",
      sm: "768px",
      m: "970px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
