import { searchRecipesNative } from "../filter.js";
import { displayRecipes } from "../recipeCards.js";
import { criteriaTab } from "./index.js";

export async function getAllDevices(recipes) {
  const appareilsTagCloser = document.getElementById("appareilsTagCloser");

  // Récupération des appareils uniques avec une boucle native
  const devicesTagTable = [];
  for (let i = 0; i < recipes.length; i++) {
    const appliance = recipes[i].appliance;
    if (!devicesTagTable.includes(appliance)) {
      devicesTagTable.push(appliance);
    }
  }

  // Met à jour la liste des appareils affichés
  updateDeviceList(devicesTagTable, recipes);

  // Réinitialiser l'input et afficher la liste par défaut des appareils
  appareilsTagCloser.addEventListener("click", () => {
    const appareilsSearch = document.querySelector("#appareilsSearch");
    appareilsSearch.value = "";
    updateDeviceList(devicesTagTable, recipes);
  });
}

// Met à jour la liste des appareils dans le DOM
export function updateDeviceList(filteredDevices, recipes) {
  const appareilsListe = document.getElementById("appareilsListe");
  const appareilsTagContainer = document.getElementById(
    "appareilsTagContainer"
  );

  // Générer la liste des appareils avec une boucle native
  let htmlContent = "";
  for (let i = 0; i < filteredDevices.length; i++) {
    htmlContent += `
      <li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] appareil capitalize" data-index="${i}">
        ${filteredDevices[i]}
      </li>
    `;
  }
  appareilsListe.innerHTML = htmlContent;

  // Ajouter des gestionnaires d'événements pour chaque appareil
  const appareilElements = appareilsListe.querySelectorAll(".appareil");
  for (let i = 0; i < appareilElements.length; i++) {
    appareilElements[i].addEventListener("click", () =>
      handleAppareilClick(appareilElements[i], recipes, appareilsTagContainer)
    );
  }

  // Gestion de la recherche dynamique
  handleDynamicSearch(filteredDevices, recipes, appareilsTagContainer);
}

// Gère les clics sur un appareil
function handleAppareilClick(element, recipes, container) {
  const criteria = element.textContent.trim();
  const appareilsInfos = document.querySelector(".appareilsInfos");

  appareilsInfos.classList.remove("infos-active");
  if (!criteriaTab.includes(criteria)) {
    // Ajouter l'appareil sélectionné à `criteriaTab`
    criteriaTab.push(criteria);

    // Mettre à jour les recettes affichées
    const filteredRecipes = searchRecipesNative(recipes, criteriaTab);
    displayRecipes(filteredRecipes);

    // Créer et afficher un tag pour l'appareil sélectionné
    const tag = createTag(criteria, recipes, container);
    container.appendChild(tag);
  }
}

// Gère la recherche dynamique dans les appareils
function handleDynamicSearch(filteredDevices, recipes, container) {
  const appareilsSearch = document.querySelector("#appareilsSearch");

  appareilsSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (value !== "" && value.length >= 3) {
      // Filtrer les appareils affichés avec une boucle native
      const filteredDevice = [];
      for (let i = 0; i < filteredDevices.length; i++) {
        if (filteredDevices[i].toLowerCase().includes(value)) {
          filteredDevice.push(filteredDevices[i]);
        }
      }

      // Mettre à jour la liste affichée
      const appareilsListe = document.getElementById("appareilsListe");
      let htmlContent = "";
      for (let i = 0; i < filteredDevice.length; i++) {
        htmlContent += `
          <li class="py-[9px] hover:bg-[#FFD15B] pb-0 px-[60px] appareil capitalize" data-index="${i}">
            ${filteredDevice[i]}
          </li>
        `;
      }
      appareilsListe.innerHTML = htmlContent;

      // Ajouter des gestionnaires d'événements pour chaque appareil filtré
      const appareilElements = appareilsListe.querySelectorAll(".appareil");
      for (let i = 0; i < appareilElements.length; i++) {
        appareilElements[i].addEventListener("click", () =>
          handleAppareilClick(appareilElements[i], recipes, container)
        );
      }
    } else {
      // Réinitialiser la liste si aucune recherche ou saisie insuffisante
      updateDeviceList(filteredDevices, recipes);
    }
  });
}

// Crée un tag pour un appareil sélectionné
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
