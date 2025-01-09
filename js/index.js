import { fetchRecipes } from "../fetchRecipes.js";
import { searchRecipesNative } from "../filter.js";
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
  const deleteMainSearch = document.getElementById("deleteMainSearch");
  const nofound = document.getElementById("nofound");
  function reset() {
    deleteMainSearch.addEventListener("click", () => {
      searchInput.value = "";
      nofound.classList.add("innactive");
      searchRecipesNative(recipesCache, criteriaTab);
      displayRecipes(recipesCache);
    });
  }
  searchInput.addEventListener("input", (e) => {
    const regex = /[^A-Za-z0-9]/g;
    let query = e.target.value;
    if (regex.test(query)) {
      query = query.replace(regex, "").trim();
      searchInput.value = query;
    }

    if (query.length >= 3) {
      if (!criteriaTab.includes(query)) {
        criteriaTab.push(query);
      }
    } else {
      // Si la recherche est inférieure à 3 caractères, vider criteriaTab
      criteriaTab = [];
      displayRecipes(recipesCache);
    }

    // Mettre à jour les recettes affichées en fonction de criteriaTab
    const filteredRecipes = searchRecipesNative(recipesCache, criteriaTab);

    // Si aucune recette ne correspond

    if (filteredRecipes.length === 0) {
      nofound.classList.remove("innactive");
      const noResultsMessage = `
      <div class="no-results flex flex-col items-center justify-center font-manrope">
        <p>Aucune recette ne contient « <strong>${query}</strong> ».</p>
        <p>Vous pouvez essayer des recherches comme « tarte aux pommes », « poisson », etc.</p>
      </div>
    `;
      const container = document.getElementById("nofound");
      container.innerHTML = noResultsMessage;
    } else {
      nofound.classList.add("innactive");
    }

    // Mettre à jour les listes de filtres (ingrédients, appareils, ustensiles)
    if (criteriaTab.length > 0) {
      displayRecipes(filteredRecipes);
      getAllIngredients(filteredRecipes);
      getAllDevices(filteredRecipes);
      getAllUstensils(filteredRecipes);
    } else {
      displayRecipes(recipesCache);
      getAllIngredients(recipesCache);
      getAllDevices(recipesCache);
      getAllUstensils(recipesCache);
    }
  });

  getAllIngredients(recipesCache);
  getAllDevices(recipesCache);
  getAllUstensils(recipesCache);
  reset();
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
