import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { 50: "#eef6ff", 100: "#d9eaff", 300: "#79adff", 400: "#3d83ff", 500: "#1768ff", 600: "#0751e6" },
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          300: "#79adff",
          400: "#3d83ff",
          500: "#1768ff",
          600: "#0751e6",
          700: "#083fb5",
        },
      },
      boxShadow: {
        glow: "0 0 90px rgba(23,104,255,.26)",
        phone: "0 35px 90px rgba(0,0,0,.72), 0 0 70px rgba(23,104,255,.18)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg,#0751e6 0%,#1768ff 52%,#39a2ff 100%)",
        "brand-gradient": "linear-gradient(135deg,#0751e6 0%,#1768ff 52%,#39a2ff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
