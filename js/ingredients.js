import { searchRecipesFunctional } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./main.js";

export async function getAllIngredients(recipes) {
  const ingredientsTagCloser = document.getElementById("ingredientsTagCloser");
  // Récupération des ingrédients uniques
  const ingredientTagTable = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      )
    ),
  ];

  // Met à jour la liste des ingrédients affichés
  updateIngredientList(ingredientTagTable, recipes);

  ingredientsTagCloser.addEventListener("click", () => {
      updateIngredientList(ingredientTagTable, recipes);
    const ingredientSearch = document.querySelector("#ingredientSearch");
    ingredientSearch.value = ""

  });
}

// Met à jour la liste des ingrédients dans le DOM
export function updateIngredientList(filteredIngredients, recipes) {
  const ingredientListe = document.getElementById("ingredientListe");
  const ingredientsTagContainer = document.getElementById(
    "ingredientsTagContainer"
  );


  // Générer la liste des ingrédients
  ingredientListe.innerHTML = filteredIngredients
    .map(
      (el, index) =>
        `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${index}">
          ${el}
        </li>`
    )
    .join("");

  // Ajouter les gestionnaires d'événements pour chaque ingrédient
  const liElements = ingredientListe.querySelectorAll(".ingredient");

  liElements.forEach((element) => {
    element.addEventListener("click", () => {
      const criteria = element.textContent.trim();

      if (!criteriaTab.includes(criteria)) {
        // Ajouter le critère
        criteriaTab.push(criteria);

        // Mettre à jour les recettes filtrées
        const filteredRecipes = searchRecipesFunctional(recipes, criteriaTab);
        displayRecipes(filteredRecipes);

        // Créer et ajouter un nouveau tag
        const tag = createTag(criteria, recipes, ingredientsTagContainer);
        ingredientsTagContainer.appendChild(tag);
      }
    });
  });

  // Gestion de la recherche dynamique dans les ingrédients
  const ingredientSearch = document.querySelector("#ingredientSearch");

  ingredientSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value !== "" && value.length >= 3) {
      // Filtrer les ingrédients affichés
      const filteredIngredient = filteredIngredients.filter((el) =>
        el.toLowerCase().includes(value)
      );

      // Mettre à jour la liste affichée
      ingredientListe.innerHTML = filteredIngredient
        .map(
          (el, index) =>
            `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${index}">
                ${el}
              </li>`
        )
        .join("");

      // Ajouter des gestionnaires d'événements pour chaque ingrédient de la liste
      const liElements = ingredientListe.querySelectorAll(".ingredient");

      liElements.forEach((element) => {
        element.addEventListener("click", () => {
          const selectedIngredient = element.textContent.trim();

          if (!criteriaTab.includes(selectedIngredient)) {
            // Ajouter l'ingrédient sélectionné à criteriaTab
            criteriaTab.push(selectedIngredient);
            
            // Mettre à jour les recettes filtrées
            const filteredRecipes = searchRecipesFunctional(
              recipes,
              criteriaTab
            );
            displayRecipes(filteredRecipes);

            // Créer et afficher un tag pour l'ingrédient sélectionné
            const tag = createTag(
              selectedIngredient,
              recipes,
              ingredientsTagContainer
            );
            ingredientsTagContainer.appendChild(tag);
          }
        });
      });
    } else {
      // Réinitialiser la liste si aucune recherche ou saisie insuffisante
      updateIngredientList(filteredIngredients, recipes);
    }
  });
}

// Crée un tag pour un ingrédient sélectionné
function createTag(criteria, recipes, container) {
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

  // Ajouter un gestionnaire pour supprimer le tag
  const closeButton = tag.querySelector(".ingredientTagClose");
  closeButton.addEventListener("click", () => {
    container.removeChild(tag);

    const index = criteriaTab.indexOf(criteria);
    if (index > -1) {
      criteriaTab.splice(index, 1);

      const updatedRecipes = searchRecipesFunctional(recipes, criteriaTab);
      displayRecipes(updatedRecipes);

      if (criteriaTab.length === 0) {
        displayRecipes(recipes);
      }
    }
  });

  return tag;
}
