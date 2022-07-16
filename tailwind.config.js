/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./assets/**/*.css",
    "./components/**/*.{vue,js}",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
