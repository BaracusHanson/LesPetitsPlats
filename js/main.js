import { fetchRecipes } from "../fetchRecipes.js";
import { searchRecipesFunctional } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { getAllIngredients } from "./ingredients.js";
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
  

  getAllIngredients(recipesCache)
}

init();

function openFilter() {
  const button = document.getElementById("ingredientButton");
  const AppareilsButton = document.getElementById("AppareilsButton");
  const UstensilsButton = document.getElementById("UstensilsButton");
  const container = document.getElementById("container");
  const infos = document.querySelector(".infos");
  const Appareilsinfos = document.querySelector(".Appareilsinfos");
  const UstensilInfos = document.querySelector(".UstensilInfos");
  button.addEventListener("click", () => {
    button.classList.toggle("chevron-active");
    container.classList.toggle("container-cative");
    infos.classList.toggle("infos-active");
  });
  AppareilsButton.addEventListener("click", () => {
    AppareilsButton.classList.toggle("chevron-active");
    isOpen = true;
    Appareilsinfos.classList.toggle("infos-active");
  });
  UstensilsButton.addEventListener("click", () => {
    UstensilsButton.classList.toggle("chevron-active");
    isOpen = true;
    UstensilInfos.classList.toggle("infos-active");
  });
}


