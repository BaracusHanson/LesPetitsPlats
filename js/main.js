import { fetchRecipes } from "../fetchRecipes.js";
import { searchRecipesFunctional } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { getAllDevices } from "./appareils.js";
import { getAllIngredients } from "./ingredients.js";
import { getAllUstensils } from "./ustensiles.js";
let recipesCache = [];
export let criteriaTab = [];

// Initialisation des recettes
async function init() {
  recipesCache = await fetchRecipes();
  displayRecipes(recipesCache);
  openFilter();
  // Gestion de l'entrée utilisateur pour la recherche globale
  const searchInput = document.getElementById("globalInput");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    if (query.length >= 3) {
      criteriaTab.push(query);
      console.log(criteriaTab);
    } else {
      // Si la recherche est inférieure à 3 caractères, vider criteriaTab
      criteriaTab = [];
    }

    // Mettre à jour les recettes affichées en fonction de criteriaTab
    const filteredRecipes = searchRecipesFunctional(recipesCache, criteriaTab);
    displayRecipes(filteredRecipes);
  });

  getAllIngredients(recipesCache);
  getAllDevices(recipesCache);
  getAllUstensils(recipesCache);
}

init();

function openFilter() {
  const button = document.getElementById("ingredientButton");
  const AppareilsButton = document.getElementById("appareilsButton");
  const UstensilsButton = document.getElementById("ustensilesButton");
  const container = document.getElementById("container");
  const infos = document.querySelector(".infos");
  const appareilsInfos = document.querySelector(".appareilsInfos");
  const UstensilInfos = document.querySelector(".ustensilesInfos");

  button.addEventListener("click", () => {
    button.classList.toggle("chevron-active");
    container.classList.toggle("container-active");
    infos.classList.toggle("infos-active");
  });
  AppareilsButton.addEventListener("click", () => {
    AppareilsButton.classList.toggle("chevron-active");
    appareilsInfos.classList.toggle("infos-active");
  });
    UstensilsButton.addEventListener("click", () => {
      UstensilsButton.classList.toggle("chevron-active");
      UstensilInfos.classList.toggle("infos-active");
    });
}
