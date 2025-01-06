import { searchRecipesFunctional } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./main.js";

export async function getAllDevices(recipes) {
  const appareilsTagCloser = document.getElementById("appareilsTagCloser");

  // Récupération des appareils uniques
  const devicesTagTable = [
    ...new Set(recipes.flatMap((recipe) => recipe.appliance)),
  ];

  // Met à jour la liste des ingrédients affichés
  updateDeviceList(devicesTagTable, recipes);

  // Réinitialiser l'input et afficher la liste par défaut des ingrédients
  appareilsTagCloser.addEventListener("click", () => {
    const AppareilsSearch = document.querySelector("#appareilsSearch");
    AppareilsSearch.value = "";
    updateDeviceList(devicesTagTable, recipes);
  });
}

// Met à jour la liste des ingrédients dans le DOM
export function updateDeviceList(filteredDevices, recipes) {
  const AppareilsListe = document.getElementById("appareilsListe");
  const appareilsTagContainer = document.getElementById(
    "appareilsTagContainer"
  );

  // Générer la liste des ingrédients
  AppareilsListe.innerHTML = filteredDevices
    .map(
      (el, index) =>
        `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] appareil capitalize" data-index="${index}">
          ${el}
        </li>`
    )
    .join("");

  // Ajouter des gestionnaires d'événements pour chaque ingrédient
  AppareilsListe.querySelectorAll(".appareil").forEach((element) => {
    element.addEventListener("click", () =>
      handleAppareilClick(element, recipes, appareilsTagContainer)
    );
  });

  // Gestion de la recherche dynamique
  handleDynamicSearch(filteredDevices, recipes, appareilsTagContainer);
}

// Gère les clics sur un ingrédient
function handleAppareilClick(element, recipes, container) {
  const criteria = element.textContent.trim();
  const appareilsInfos = document.querySelector(".appareilsInfos");

  appareilsInfos.classList.remove("infos-active");
  if (!criteriaTab.includes(criteria)) {
    // Ajouter l'ingrédient sélectionné à `criteriaTab`
    criteriaTab.push(criteria);

    // Mettre à jour les recettes affichées
    const filteredRecipes = searchRecipesFunctional(recipes, criteriaTab);
    displayRecipes(filteredRecipes);

    // Créer et afficher un tag pour l'ingrédient sélectionné
    const tag = createTag(criteria, recipes, container);
    container.appendChild(tag);
  }
}

// Gère la recherche dynamique dans les ingrédients
function handleDynamicSearch(filteredDevices, recipes, container) {
  const AppareilsSearch = document.querySelector("#appareilsSearch");

  AppareilsSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value !== "" && value.length >= 3) {
      // Filtrer les ingrédients affichés
      const filteredDevice = filteredDevices.filter((el) =>
        el.toLowerCase().includes(value)
      );

      // Mettre à jour la liste affichée
      const appareilListe = document.getElementById("appareilsListe");
      appareilListe.innerHTML = filteredDevice
        .map(
          (el, index) =>
            `<li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] ingredient capitalize" data-index="${index}">
              ${el}
            </li>`
        )
        .join("");

      // Ajouter des gestionnaires d'événements pour chaque appareil filtré
      appareilListe.querySelectorAll(".ingredient").forEach((element) => {
        element.addEventListener("click", () =>
          handleAppareilClick(element, recipes, container)
        );
      });
    } else {
      // Réinitialiser la liste si aucune recherche ou saisie insuffisante
      updateDeviceList(filteredDevices, recipes);
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

      const updatedRecipes = searchRecipesFunctional(recipes, criteriaTab);
      displayRecipes(updatedRecipes);

      if (criteriaTab.length === 0) {
        displayRecipes(recipes);
      }
    }
  });

  return tag;
}
