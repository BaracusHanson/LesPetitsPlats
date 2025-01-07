import { searchRecipesNative } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./index.js";

export async function getAllUstensils(recipes) {
  const ustensilesTagCloser = document.getElementById("ustensilesTagCloser");

  // Récupération des ustensiles uniques avec une boucle native
  const ustensilsTagTable = [];
  for (let i = 0; i < recipes.length; i++) {
    const ustensil = recipes[i].ustensils;
    for (let j = 0; j < ustensil.length; j++) {
      const utensil = ustensil[j];
      if (!ustensilsTagTable.includes(utensil)) {
        ustensilsTagTable.push(utensil);
      }
    }
  }

  // Met à jour la liste des ustensiles affichés
  updateUstensilList(ustensilsTagTable, recipes);

  // Réinitialiser l'input et afficher la liste par défaut des ustensiles
  ustensilesTagCloser.addEventListener("click", () => {
    const ustensilesSearch = document.querySelector("#ustensilesSearch");
    ustensilesSearch.value = "";
    updateUstensilList(ustensilsTagTable, recipes);
  });
}

// Met à jour la liste des ustensiles dans le DOM
export function updateUstensilList(filteredUstensils, recipes) {
  const ustensilesListe = document.getElementById("ustensilesListe");
  const ustensilesTagContainer = document.getElementById("ustensilesTagContainer");

  // Générer la liste des ustensiles
  ustensilesListe.innerHTML = filteredUstensils
    .map(
      (el, index) =>
        `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ustensil capitalize" data-index="${index}">
          ${el}
        </li>`
    )
    .join("");

  // Ajouter un gestionnaire d'événements pour chaque ustensil avec la délégation d'événements
  ustensilesListe.addEventListener("click", (event) => {
    if (event.target.classList.contains("ustensil")) {
      handleUstensilClick(event.target, recipes, ustensilesTagContainer);
    }
  });

  // Gestion de la recherche dynamique
  handleDynamicSearch(filteredUstensils, recipes, ustensilesTagContainer);
}

// Gère les clics sur un ustensil
function handleUstensilClick(element, recipes, container) {
  const criteria = element.textContent.trim();
  const ustensilesInfos = document.querySelector(".ustensilesInfos");

  ustensilesInfos.classList.remove("infos-active");
  if (!criteriaTab.includes(criteria)) {
    // Ajouter l'ustensil sélectionné à `criteriaTab`
    criteriaTab.push(criteria);

    // Mettre à jour les recettes affichées
    const filteredRecipes = searchRecipesNative(recipes, criteriaTab);
    displayRecipes(filteredRecipes);

    // Créer et afficher un tag pour l'ustensil sélectionné
    const tag = createTag(criteria, recipes, container);
    container.appendChild(tag);
  }
}

// Gère la recherche dynamique dans les ustensiles
function handleDynamicSearch(filteredUstensils, recipes, container) {
  const ustensilesSearch = document.querySelector("#ustensilesSearch");

  ustensilesSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value !== "" && value.length >= 3) {
      // Filtrer les ustensiles affichés
      const filteredUstensil = filteredUstensils.filter((el) =>
        el.toLowerCase().includes(value)
      );

      // Mettre à jour la liste affichée
      const ustensilesListe = document.getElementById("ustensilesListe");
      ustensilesListe.innerHTML = filteredUstensil
        .map(
          (el, index) =>
            `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ustensil capitalize" data-index="${index}">
              ${el}
            </li>`
        )
        .join("");

      // Ajoutez un gestionnaire d'événements pour chaque ustensil filtré
      ustensilesListe.querySelectorAll(".ustensil").forEach((element) => {
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

// Crée un tag pour un ustensil sélectionné
function createTag(criteria, recipes, container) {
  const tag = document.createElement("div");
  tag.className = "flex-col gap-[14px] bg-[#FFD15B] rounded-[11px] border";
  tag.id = `tag-${criteria}`;

  tag.innerHTML = `
    <div class="flex justify-between items-center mx-[17px] my-4">
      <h1 class="text-base font-semibold font-manrope text-[#1B1B1B] capitalize">
        ${criteria}
      </h1>
      <button class="ustensilTagClose" data-criteria="${criteria}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `;

  // Ajouter un gestionnaire pour supprimer le tag
  tag.querySelector(".ustensilTagClose").addEventListener("click", () => {
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
