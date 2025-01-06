import { searchRecipesFunctional } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./main.js";

export async function getAllIngredients(recipes) {
  let ingredientTagTable = [];

  recipes?.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientTagTable.push(ingredient.ingredient);
    });
  });

  ingredientTagTable = [...new Set(ingredientTagTable)];
  //   console.log(ingredientTagTable);

  const result = ingredientTagTable
    .map(
      (el, index) =>
        `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${index}">
          ${el}
        </li>`
    )
    .join("");

  // Injecter la liste dans le conteneur
  const ingredientListe = document.getElementById("ingredientListe");
  ingredientListe.innerHTML = result;

  // Conteneur des tags
  const ingredientsTagContainer = document.getElementById(
    "ingredientsTagContainer"
  );

  // Ajouter les gestionnaires d'événements pour chaque élément
  const li = ingredientListe.querySelectorAll(".ingredient");

  // Tableau pour stocker les critères sélectionnés
  //   const criteriaTab = [];

  li.forEach((element) => {
    element.addEventListener("click", () => {
      const criteria = element.textContent.trim();

      if (!criteriaTab.includes(criteria)) {
        criteriaTab.push(criteria);
        const filteredRecipes = searchRecipesFunctional(recipes, criteriaTab);
        console.log(criteriaTab);
        displayRecipes(filteredRecipes);
      }
      // Créer un nouveau tag pour l'ingrédient sélectionné
      const tag = document.createElement("div");
      tag.className = "flex-col gap-[14px] bg-[#FFD15B] rounded-[11px] border";
      tag.id = `tag-${criteria}`;

      // Contenu du tag
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

      // Ajouter le tag au conteneur
      ingredientsTagContainer.appendChild(tag);

      // Gestion de la suppression du tag
      const closeButton = tag.querySelector(".ingredientTagClose");
      closeButton.addEventListener("click", () => {
        // Supprimer le tag du DOM
        ingredientsTagContainer.removeChild(tag);

        // Retirer le critère du tableau
        const index = criteriaTab.indexOf(criteria);
        if (index > -1) {
          criteriaTab.splice(index, 1);

          // Mettre à jour les résultats après suppression du tag
          const updatedRecipes = searchRecipesFunctional(recipes, criteriaTab);
          displayRecipes(updatedRecipes);
          if (criteriaTab.length == 0) {
            displayRecipes(recipes);
          }
        }

        console.log("Tag supprimé :", criteriaTab);
      });

      console.log("Tags actifs :", criteriaTab);
    });
  });
}
