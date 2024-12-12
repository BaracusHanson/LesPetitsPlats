export function searchRecipesNative(recipes, criteriaTab) {
  console.log(criteriaTab);
  // Vérifier si criteriaTab est un tableau à plat (cela peut être déjà un tableau de chaînes)
  const allCriteria = Array.isArray(criteriaTab) ? criteriaTab : [criteriaTab];

  // Si aucun critère n'est passé, on retourne toutes les recettes
  if (allCriteria.length === 0) return recipes;

  // Fonction pour normaliser le texte (retirer les accents, mettre en minuscules)
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Filtrer les recettes en fonction de tous les critères
  return recipes.filter((recipe) =>
    allCriteria.every((criterion) => {
      const normalizedCriterion = normalizeText(criterion);

      // Vérifier si l'un des critères correspond dans le nom, la description ou les ingrédients
      return (
        recipe.ingredients.some((ing) =>
          normalizeText(ing.ingredient).includes(normalizedCriterion)
        ) ||
        normalizeText(recipe.name).includes(normalizedCriterion) ||
        normalizeText(recipe.description).includes(normalizedCriterion)
      );
    })
  );
}
