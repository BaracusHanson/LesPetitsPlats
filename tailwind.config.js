module.exports = {
  content: [
    "./*.html", // Rechercher dans tous les fichiers .html dans le répertoire racine
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"], // Déclare la police Manrope
        anton: ["Anton", "sans-serif"], // Déclare la police Anton
      },
      colors: {
        jaune: "#FFD15B",
      },
      fontSize: {
        mainTitle: "44px",
      },
      center:{
        
      }
    },
  },
  plugins: [],
};
