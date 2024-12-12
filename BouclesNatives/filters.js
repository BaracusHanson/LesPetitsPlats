export function searchRecipesNative(recipes, criteriaTab) {
  const allCriteria = [].concat(...criteriaTab);

  if (allCriteria.length === 0) return [];

  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  return recipes.filter((recipe) =>
    allCriteria.every((criterion) => {
      const normalizedCriterion = normalizeText(criterion);
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
