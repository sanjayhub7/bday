import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#C62828',
          'dark-red': '#8E0000',
        },
        cream: '#FFF8E7',
        'soft-pink': '#FCE4EC',
        gold: '#D4AF37',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/textures/paper.png')",
      },
    },
  },
  plugins: [],
};
export default config;
