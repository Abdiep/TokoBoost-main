/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Pastikan ini mengarah ke src
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: "#ec4899",
          orange: "#f97316",
        }
      }
    },
  },
  plugins: [],
};
export default config;