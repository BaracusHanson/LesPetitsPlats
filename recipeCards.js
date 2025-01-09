// Fonction pour afficher les cartes dans le conteneur
export function displayRecipes(recipes) {
  const nlRecettes = document.getElementById("nlRecettes");
  nlRecettes.textContent = recipes.length > 1
    ? `${recipes.length} recettes`
    : `${recipes.length} recette`;

  const container = document.getElementById("container");
  let cards = "";
  
  for (let i = 0; i < recipes.length; i++) {
    cards += generateRecipeCard(recipes[i]);
  }
  
  container.innerHTML = cards;
}

// Fonction pour générer une carte de recette
function generateRecipeCard(recipe) {
  let ingredientsList = "";

  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList += generateIngredientListItem(recipe.ingredients[i]);
  }

  return `
   <div class="bg-white rounded-[1.3125rem] overflow-hidden h-[45.6875rem] shadow-lg">
  <div class="w-full h-[15.8125rem] mb-8 relative">
    <img
      src="./assets/Images/${recipe.image}"
      alt="${recipe.name}"
      class="w-full h-[15.8125rem] object-cover object-center"
    />
    <div class="w-[3.9375rem] h-[1.625rem] absolute top-[1.3125rem] right-[1.375rem] bg-[#FFD15B] px-4 py-[0.3125rem] flex justify-center items-center font-manrope text-[#1B1B1B] text-[0.75rem] rounded-[0.875rem]">
      ${recipe.time}min
    </div>
  </div>
  <h2 class="font-anton text-[1.125rem] text-[#000] mb-[1.8125rem] capitalize w-full text-start pl-[1.5625rem]">
    ${recipe.name}
  </h2>
  <div class="px-[1.5625rem] w-full h-[20.5625rem] mb-[3.8125rem]">
    <section class="flex flex-col gap-8">
      <div class="flex flex-col gap-[0.9375rem]">
        <h3 class="uppercase font-manrope font-bold text-[#7A7A7A] text-[0.75rem] tracking-widest">
          Recette
        </h3>
        <p class="font-manrope text-[#1B1B1B] text-[0.875rem] font-normal line-clamp-3">
          ${recipe.description}
        </p>
      </div>
      <div class="flex flex-col gap-[0.9375rem]">
        <h3 class="uppercase font-manrope font-bold text-[#7A7A7A] text-[0.75rem] tracking-widest">
          Ingrédients
        </h3>
        <ul class="grid grid-cols-2 gap-y-[1.3125rem]">
          ${ingredientsList}
        </ul>
      </div>
    </section>
  </div>
</div>

  `;
}

// Fonction pour générer un élément de liste d'ingrédient
function generateIngredientListItem(ingredient) {
  return `
    <li class="font-manrope text-[#1B1B1B] capitalize flex flex-col font-bold">
      ${ingredient.ingredient}
      <span class="text-[#7A7A7A] font-medium text-[0.8rem]">
        ${ingredient.quantity || ""} ${ingredient.unit || ""}
      </span>
    </li>
  `;
}
