export const searchRecipesNative = (recipes, criteriaTab = []) => {
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Si criteriaTab est vide, retourner toutes les recettes
  if (!Array.isArray(criteriaTab) || criteriaTab.length === 0) {
    return recipes; // Toutes les recettes par défaut
  }

  const normalizedCriteria = criteriaTab.map(normalizeText);

  return recipes.filter((recipe) => {
    const { name, description, ingredients } = recipe;

    // Normaliser les champs de la recette
    const normalizedName = normalizeText(name);
    const normalizedDescription = normalizeText(description);
    const normalizedIngredients = ingredients.map((ing) =>
      normalizeText(ing.ingredient)
    );

    // Vérifier si tous les critères sont respectés
    return normalizedCriteria.every((criterion) =>
      [normalizedName, normalizedDescription, ...normalizedIngredients].some(
        (field) => field.includes(criterion)
      )
    );
  });
};
