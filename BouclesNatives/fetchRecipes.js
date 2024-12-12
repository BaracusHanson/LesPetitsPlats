 export async function fetchRecipes() {
    try {
      const response = await fetch("../data/recipe.json");
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des recettes : ${response.status}`
        );
      }
      const recettes = await response.json()
      return  recettes;
    } catch (error) {
      console.error("Impossible de charger les recettes :", error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

 