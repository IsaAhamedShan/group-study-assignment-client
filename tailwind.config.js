/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // raleway: ['Raleway', 'sans-serif'],
        //  rancho: ['Rancho', 'cursive']
      },
    },
  },
  plugins: [require("daisyui")],
  colors: {
    primary_dark: "#1F0E0B",
    primary_light: "#442c28",
    secondary: "#f4f3f0",
  },
  daisyui: {
    themes: [
      {
        purgrey: {
          primary: "#352F44",
          secondary: "#5C5470",
          accent: "#37cdbe",
          neutral: "#B9B4C7",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
