import { searchRecipesNative } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./index.js";

export async function getAllIngredients(recipes) {
  const ingredientsTagCloser = document.getElementById("ingredientsTagCloser");

  // Récupération des ingrédients uniques avec une boucle native
  const ingredientTagTable = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      if (!ingredientTagTable.includes(ingredient)) {
        ingredientTagTable.push(ingredient);
      }
    }
  }

  // Met à jour la liste des ingrédients affichés
  updateIngredientList(ingredientTagTable, recipes);

  // Réinitialiser l'input et afficher la liste par défaut des ingrédients
  ingredientsTagCloser.addEventListener("click", () => {
    const ingredientSearch = document.querySelector("#ingredientSearch");
    ingredientSearch.value = "";
    updateIngredientList(ingredientTagTable, recipes);
  });
}

// Met à jour la liste des ingrédients dans le DOM
export function updateIngredientList(filteredIngredients, recipes) {
  const ingredientListe = document.getElementById("ingredientListe");
  const ingredientsTagContainer = document.getElementById("ingredientsTagContainer");

  // Générer la liste des ingrédients avec une boucle native
  let htmlContent = "";
  for (let i = 0; i < filteredIngredients.length; i++) {
    htmlContent += `
      <li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${i}">
        ${filteredIngredients[i]}
      </li>
    `;
  }
  ingredientListe.innerHTML = htmlContent;

  // Ajouter des gestionnaires d'événements pour chaque ingrédient
  const ingredientElements = ingredientListe.querySelectorAll(".ingredient");
  for (let i = 0; i < ingredientElements.length; i++) {
    ingredientElements[i].addEventListener("click", () =>
      handleIngredientClick(ingredientElements[i], recipes, ingredientsTagContainer)
    );
  }

  // Gestion de la recherche dynamique
  handleDynamicSearch(filteredIngredients, recipes, ingredientsTagContainer);
}

// Gère les clics sur un ingrédient
function handleIngredientClick(element, recipes, container) {
  const criteria = element.textContent.trim();
  const infos = document.querySelector(".infos");

  infos.classList.remove("infos-active");
  if (!criteriaTab.includes(criteria)) {
    // Ajouter l'ingrédient sélectionné à `criteriaTab`
    criteriaTab.push(criteria);

    // Mettre à jour les recettes affichées
    const filteredRecipes = searchRecipesNative(recipes, criteriaTab);
    displayRecipes(filteredRecipes);

    // Créer et afficher un tag pour l'ingrédient sélectionné
    const tag = createTag(criteria, recipes, container);
    container.appendChild(tag);
  }
}

// Gère la recherche dynamique dans les ingrédients
function handleDynamicSearch(filteredIngredients, recipes, container) {
  const ingredientSearch = document.querySelector("#ingredientSearch");

  ingredientSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value !== "" && value.length >= 3) {
      // Filtrer les ingrédients affichés
      const filteredIngredient = [];
      for (let i = 0; i < filteredIngredients.length; i++) {
        if (filteredIngredients[i].toLowerCase().includes(value)) {
          filteredIngredient.push(filteredIngredients[i]);
        }
      }

      // Mettre à jour la liste affichée
      const ingredientListe = document.getElementById("ingredientListe");
      let htmlContent = "";
      for (let i = 0; i < filteredIngredient.length; i++) {
        htmlContent += `
          <li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${i}">
            ${filteredIngredient[i]}
          </li>
        `;
      }
      ingredientListe.innerHTML = htmlContent;

      // Ajouter des gestionnaires d'événements pour chaque ingrédient filtré
      const ingredientElements = ingredientListe.querySelectorAll(".ingredient");
      for (let i = 0; i < ingredientElements.length; i++) {
        ingredientElements[i].addEventListener("click", () =>
          handleIngredientClick(ingredientElements[i], recipes, container)
        );
      }
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
      <h1 class="text-base font-semibold font-manrope text-[#1B1B1B] capitalize" id="tag">
        ${criteria}
      </h1>
      <button class="ingredientTagClose" data-criteria="${criteria}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `;

  // Ajouter un gestionnaire pour supprimer le tag
  tag.querySelector(".ingredientTagClose").addEventListener("click", () => {
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
