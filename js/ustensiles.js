import { searchRecipesNative } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./index.js";

export async function getAllUstensils(recipes) {
  const ustensilesTagCloser = document.getElementById("ustensilesTagCloser");

  // Récupération des appareils uniques
  const ustensilsTagTable = [
    ...new Set(recipes.flatMap((recipe) => recipe.ustensils)),
  ];

  // Met à jour la liste des ingrédients affichés
  updateUstensilList(ustensilsTagTable, recipes);

  // Réinitialiser l'input et afficher la liste par défaut des ingrédients
  ustensilesTagCloser.addEventListener("click", () => {
    const ustensilesSearch = document.querySelector("#ustensilesSearch");
    ustensilesSearch.value = "";
    updateUstensilList(ustensilsTagTable, recipes);
  });
}

// Met à jour la liste des ingrédients dans le DOM
export function updateUstensilList(filteredUstensils, recipes) {
  const ustensilesListe = document.getElementById("ustensilesListe");
  const ustensilesTagContainer = document.getElementById(
    "ustensilesTagContainer"
  );

  // Générer la liste des ingrédients
  ustensilesListe.innerHTML = filteredUstensils
    .map(
      (el, index) =>
        `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] appareil capitalize" data-index="${index}">
          ${el}
        </li>`
    )
    .join("");

  // Ajouter des gestionnaires d'événements pour chaque ingrédient
  ustensilesListe.querySelectorAll(".appareil").forEach((element) => {
    element.addEventListener("click", () =>
      handleUstensilClick(element, recipes, ustensilesTagContainer)
    );
  });

  // Gestion de la recherche dynamique
  handleDynamicSearch(filteredUstensils, recipes, ustensilesTagContainer);
}

// Gère les clics sur un ingrédient
function handleUstensilClick(element, recipes, container) {
  const criteria = element.textContent.trim();
  const ustensilesInfos = document.querySelector(".ustensilesInfos");

  ustensilesInfos.classList.remove("infos-active");
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
function handleDynamicSearch(filteredUstensils, recipes, container) {
  const ustensilesSearch = document.querySelector("#ustensilesSearch");

  ustensilesSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value !== "" && value.length >= 3) {
      // Filtrer les ingrédients affichés
      const filteredUstensil = filteredUstensils.filter((el) =>
        el.toLowerCase().includes(value)
      );

      // Mettre à jour la liste affichée
      const ustensilesListe = document.getElementById("ustensilesListe");
      ustensilesListe.innerHTML = filteredUstensil
        .map(
          (el, index) =>
            `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${index}">
              ${el}
            </li>`
        )
        .join("");

      // Ajouter des gestionnaires d'événements pour chaque appareil filtré
      ustensilesListe.querySelectorAll(".ingredient").forEach((element) => {
        element.addEventListener("click", () =>
          handleUstensilClick(element, recipes, container)
        );
      });
    } else {
      // Réinitialiser la liste si aucune recherche ou saisie insuffisante
      updateUstensilList(filteredUstensils, recipes);
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
      <button class="appareilTagClose" data-criteria="${criteria}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `;

  // Ajouter un gestionnaire pour supprimer le tag
  tag.querySelector(".appareilTagClose").addEventListener("click", () => {
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
