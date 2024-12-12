import { searchRecipesNative } from "./filters.js";
import { displayRecipes } from "./recipeCards.js";
import { criteriaTab } from "../js/main.js";

export function updateIngredientList(filteredIngredients, recipes) {
  const ingredientListe = document.getElementById("ingredientListe");
  const ingredientsTagContainer = document.getElementById("ingredientsTagContainer");

  // Générer la liste des ingrédients
  ingredientListe.innerHTML = filteredIngredients
    .map(
      (el, index) =>
        `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${index}">
          ${el}
        </li>`
    )
    .join("");

  // Ajouter les gestionnaires d'événements pour chaque élément
  const liElements = ingredientListe.querySelectorAll(".ingredient");

  liElements.forEach((l) => {
    l.addEventListener("click", () => {
      const criteria = l.textContent.trim();

      if (!criteriaTab.includes(criteria)) {
        // Ajouter le critère
        criteriaTab.push(criteria);

        // Mettre à jour les recettes filtrées
        const filteredRecipes = searchRecipesNative(recipes, criteriaTab);
        displayRecipes(filteredRecipes);

        // Créer et ajouter un nouveau tag
        const tag = createIngredientTag(criteria, recipes, ingredientsTagContainer);
        ingredientsTagContainer.appendChild(tag);
      }
    });
  });
}

// Fonction pour créer un tag d'ingrédient
function createIngredientTag(criteria, recipes, container) {
  const tag = document.createElement("div");
  tag.className = "flex-col gap-[14px] bg-[#FFD15B] rounded-[11px] border";
  tag.id = `tag-${criteria}`;
  tag.innerHTML = `
    <div class="flex justify-between items-center mx-[17px] my-4">
      <h1 class="text-base font-semibold font-manrope text-[#1B1B1B] capitalize">
        ${criteria}
      </h1>
      <button class="ingredientTagClose" data-criteria="${criteria}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `;

  // Ajouter l'événement de suppression du tag
  const closeButton = tag.querySelector(".ingredientTagClose");
  closeButton.addEventListener("click", () => {
    container.removeChild(tag);

    const index = criteriaTab.indexOf(criteria);
    if (index > -1) {
      criteriaTab.splice(index, 1);

      const updatedRecipes = searchRecipesNative(recipes, criteriaTab);
      displayRecipes(updatedRecipes);

      if (criteriaTab.length === 0) {
        displayRecipes(recipes);
      }
    }
  });

  return tag;
}
