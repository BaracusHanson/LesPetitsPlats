export const searchRecipesNative = (recipes, criteriaTab = []) => {
  // Normalise une chaîne pour la rendre insensible aux accents et à la casse
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Si aucun critère, retourner toutes les recettes
  if (!Array.isArray(criteriaTab) || criteriaTab.length === 0) {
    return recipes; // Toutes les recettes par défaut
  }

  // Normaliser tous les critères une seule fois
  const normalizedCriteria = criteriaTab.map(normalizeText);

  const filteredRecipes = [];

  // Parcourir chaque recette pour vérifier si elle correspond
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const { name, description, ingredients } = recipe;

    // Normaliser les champs nécessaires
    const normalizedName = normalizeText(name);
    const normalizedDescription = normalizeText(description);

    // Normaliser les ingrédients
    const normalizedIngredients = [];
    for (let j = 0; j < ingredients.length; j++) {
      normalizedIngredients.push(normalizeText(ingredients[j].ingredient));
    }

    // Vérifier si tous les critères sont respectés
    let matchesAllCriteria = true;

    for (let k = 0; k < normalizedCriteria.length; k++) {
      const criterion = normalizedCriteria[k];

      // Vérifier si le critère est présent dans l'un des champs
      const matches =
        normalizedName.includes(criterion) ||
        normalizedDescription.includes(criterion) ||
        normalizedIngredients.some((ingredient) =>
          ingredient.includes(criterion)
        );

      if (!matches) {
        matchesAllCriteria = false;
        break; // Si un critère ne correspond pas, arrêter la vérification
      }
    }

    // Si tous les critères sont respectés, ajouter la recette
    if (matchesAllCriteria) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
};
