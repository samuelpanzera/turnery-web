// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Adicionado para incluir arquivos na pasta src
  ],
  darkMode: 'class', // habilita o modo escuro baseado em classes
  theme: {
    extend: {
      colors: {
        // Cores principais da TornoMix
        'tornomix': {
          'marinho': '#0A1E33',    // Azul Marinho Escuro do logotipo
          'metal': '#647789',      // Cinza Metálico
          'background': '#F0F2F5', // Cinza Claro para fundos
          'aco': '#3D5A80',        // Azul Aço para botões e links
          'alerta': '#C84B31',     // Vermelho Industrial para alertas
          'sucesso': '#2A9D8F',    // Verde Máquina para sucessos
        },
      },
    },
  },
  plugins: [],
}