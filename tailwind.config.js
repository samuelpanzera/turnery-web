module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tornomix': {
          'marinho': '#0A1E33',
          'metal': '#647789',
          'background': '#F0F2F5',
          'aco': '#3D5A80',
          'alerta': '#C84B31',
          'sucesso': '#2A9D8F',
        },
      },
    },
  },
  plugins: [],
}