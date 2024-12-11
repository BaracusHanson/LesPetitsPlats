// Fonction pour récupérer les données depuis le fichier JSON
async function fetchRecipes() {
  try {
    const response = await fetch("./data/recipe.json");
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des recettes : ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Impossible de charger les recettes :", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

// Fonction pour générer une carte de recette
function generateRecipeCard(recipe) {
  return `
      <div class="bg-white rounded-[21px] overflow-hidden h-[731px] [box-shadow:0px_4px_34px_30px_rgba(0,0,0,0.04)]">
        <div class="w-full h-[253px] mb-8 relative">
          <img
            src="./assets/Images/${recipe.image}"
            alt="${recipe.name}"
            class="w-full h-[253px] object-cover object-center"
          />
          <div class="w-[63px] h-[26px] absolute top-[21px] right-[22px] bg-[#FFD15B] px-15px py-[5px] flex justify-center items-center font-manrope text-[#1B1B1B] text-[12px] rounded-[14px]">
            ${recipe.time}min
          </div>
        </div>
        <h2 class="font-anton text-[18px] text-[#000] mb-[29px] capitalize w-full text-start pl-[25px]">
          ${recipe.name}
        </h2>
        <div class="px-[25px] w-full h-[329px] mb-[61px]">
          <section class="flex flex-col gap-8">
            <div class="flex flex-col gap-[15px]">
              <h3 class="uppercase font-manrope font-[700] text-[#7A7A7A] text-[12px] tracking-widest">
                Recette
              </h3>
              <p class="font-manrope text-[#1B1B1B] text-[14px] text-[400] line-clamp-3">
                ${recipe.description}
              </p>
            </div>
            <div class="flex flex-col gap-[15px]">
              <h3 class="uppercase font-manrope font-[700] text-[#7A7A7A] text-[12px] tracking-widest">
                Ingrédients
              </h3>
              <ul class="grid grid-cols-2 gap-y-[21px]">
                ${recipe?.ingredients
                  .map((ingredient) => generateIngredientListItem(ingredient))
                  .join("")}
              </ul>
            </div>
          </section>
        </div>
      </div>
    `;
}

// Fonction pour générer un élément de liste d'ingrédient
function generateIngredientListItem(ingredient) {
  return `
      <li class="font-manrope text-[#1B1B1B] capitalize flex flex-col font-bold">
        ${ingredient.ingredient}
        <span class="text-[#7A7A7A] font-medium text-[0.8rem]">
          ${ingredient.quantity || ""} ${ingredient.unit || ""}
        </span>
      </li>
    `;
}

// Fonction pour afficher les cartes dans le conteneur
function displayRecipes(recipes) {
  const nlRecettes = document.getElementById("nlRecettes");
  nlRecettes.textContent =
    recipes?.length > 1
      ? recipes.length + " recettes"
      : recipes?.length + " recette";
  const container = document.getElementById("container");
  const cards = recipes?.map(generateRecipeCard).join(""); // Utilisation de map pour générer toutes les cartes
  container.innerHTML = cards;
}

// Fonction principale qui orchestrera la récupération des données et l'affichage
async function datas() {
  const recipes = await fetchRecipes();
  if (recipes.length > 0) {
    displayRecipes(recipes);
    globalSearch(recipes);
    getAllIngredients(recipes);
  } else {
    console.log("Aucune recette à afficher.");
  }
}

// Appel de la fonction principale pour démarrer le processus
datas();

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

openFilter();

/**
 * filtrage a boucle natif
 */

async function globalSearch(recettes) {
  const globalInput = document.querySelector("#globalInput");
  globalInput.addEventListener("input", (e) => {
    const criteria = e.target.value;
    if (criteria === "") {
    }
    searchRecipesNative(recettes, criteria);
  });
}
globalSearch();

function searchRecipesNative(recipes, criteriaTab) {
  // Fusionner tous les criteriaTab en un seul tableau
  const allCriteria = [].concat(...criteriaTab);

  // Vérifier si les critères sont valides
  if (allCriteria.length === 0) return [];

  // Fonction pour normaliser les chaînes de texte
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Filtrer les recettes en fonction de tous les critères
  const results = recipes.filter((recipe) => {
    // Vérifier si la recette satisfait tous les critères
    const matchesAllCriteria = allCriteria.every((criterion) => {
      const normalizedCriterion = normalizeText(criterion);

      // Vérifier si le critère est présent dans le nom, la description ou les ingrédients
      const ingredientMatch = recipe.ingredients.some((ing) =>
        normalizeText(ing.ingredient).includes(normalizedCriterion)
      );
      const nameMatch = normalizeText(recipe.name).includes(
        normalizedCriterion
      );
      const descriptionMatch = normalizeText(recipe.description).includes(
        normalizedCriterion
      );

      return ingredientMatch || nameMatch || descriptionMatch;
    });

    // La recette doit satisfaire tous les critères
    return matchesAllCriteria;
  });
  // console.log(results);
  if (results.length == 0) {
    const nofound = document.getElementById("nofound");
    const msg = `<h1 class="text-4xl">aucune recettes ne correspond à ${criteriaTab} !</h1>`;
    nofound.innerHTML = msg;
    console.log("aucune recettes de correspond !");
  }

  // Afficher les résultats et retourner la liste
  console.log("Résultats correspondant à tous les critères :", results);
  displayRecipes(results);
  return results;
}

async function getAllIngredients(recipes) {
  let ingredientTagTable = [];
  let appareilTagTable = [];
  let ustensilTagTable = [];

  // Collecte des ingrédients
  // console.log("mes recettes :",recipes);

  recipes?.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientTagTable.push(ingredient.ingredient);
    });
  });

  // Collecte des appareils
  recipes?.forEach((element) => {
    let appareils = element.appliance;
    appareilTagTable.push(appareils);
  });
  // Collecte des Ustensils
  recipes?.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilTagTable.push(ustensil);
    });
  });

  // Suppression des doublons
  ingredientTagTable = [...new Set(ingredientTagTable)];
  appareilTagTable = [...new Set(appareilTagTable)];
  // console.log(ustensilTagTable);
  ustensilTagTable = [...new Set(ustensilTagTable)];
  // console.log(ustensilTagTable);

  // Sélection des éléments du DOM
  const ingredientSearch = document.querySelector("#ingredientSearch");
  const AppareilsSearch = document.querySelector("#AppareilsSearch");
  const UstensilsSearch = document.querySelector("#UstensilsSearch");
  const ingredientListe = document.querySelector("#ingredientListe");
  const AppareilsListe = document.querySelector("#AppareilsListe");
  const UstensilsListe = document.querySelector("#UstensilsListe");
  const ingredientsTag = document.getElementById("ingredientsTag");
  const AppareilsTag = document.getElementById("AppareilsTag");
  const UstensilsTag = document.getElementById("UstensilsTag");
  const tagingredient = document.getElementById("tagingredient");
  const tagAppareils = document.getElementById("tagAppareils");
  const tagUstensils = document.getElementById("tagUstensils");
  const button = document.getElementById("ingredientButton");
  const ingredientTagClose = document.getElementById("ingredientTagClose");
  const AppareilsTagClose = document.getElementById("AppareilsTagClose");
  const UstensilsTagClose = document.getElementById("UstensilsTagClose");
  const tagCloser = document.getElementById("tagCloser");
  const tagCloserAppareil = document.getElementById("tagCloserAppareil");
  const tagCloserUstensil = document.getElementById("tagCloserUstensil");

  const infos = document.querySelector(".infos");
  const Appareilsinfos = document.querySelector(".Appareilsinfos");
  const UstensilInfos = document.querySelector(".UstensilInfos");

  // Fonction pour afficher les ingrédients dans la liste
  const criteriaTab = [];
  function updateIngredientList(filteredIngredients, recipes) {
    // Générer la liste des ingrédients
    const result = filteredIngredients
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

    // Tableau pour stocker les critères sélectionnés
    const criteriaTab = [];

    // Ajouter les gestionnaires d'événements pour chaque élément
    const li = ingredientListe.querySelectorAll(".ingredient");

    li.forEach((l) => {
      l.addEventListener("click", () => {
        const criteria = l.textContent.trim();

        // Vérifier si le tag existe déjà pour éviter les doublons
        if (!criteriaTab.includes(criteria)) {
          criteriaTab.push(criteria);

          // Mettre à jour les résultats de recherche
          const filteredRecipes = searchRecipesNative(recipes, criteriaTab);
          displayRecipes(filteredRecipes);

          // Créer un nouveau tag pour l'ingrédient sélectionné
          const tag = document.createElement("div");
          tag.className =
            "flex-col gap-[14px] bg-[#FFD15B] rounded-[11px] border";
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
              const updatedRecipes = searchRecipesNative(recipes, criteriaTab);
              displayRecipes(updatedRecipes);
              if (criteriaTab.length == 0) {
                displayRecipes(recipes);
              }
            }

            console.log("Tag supprimé :", criteriaTab);
          });

          console.log("Tags actifs :", criteriaTab);
        }
      });
    });
  }

  // Fonction pour afficher les appareils dans la liste
  function updateAppareilList(filteredAppareils) {
    const result = filteredAppareils
      .map((el, index) => {
        return `<li class="py-[9px] pl-[16px] hover:bg-[#FFD15B] pb-0 appareil" data-index="${index} ">
                    ${el}
                  </li>`;
      })
      .join("");

    AppareilsListe.innerHTML = result;

    // Ajouter les gestionnaires d'événements pour chaque élément
    const li = AppareilsListe.querySelectorAll(".appareil");

    li.forEach((l) => {
      l.addEventListener("click", () => {
        const criteria = l.textContent.trim();
        AppareilsTag.textContent = criteria;
        button.classList.remove("chevron-active");
        Appareilsinfos.classList.remove("infos-active");
        tagAppareils.classList.remove("hidden");
        // searchRecipesNative(recipes, criteria);
      });
    });
  }
  // Fonction pour afficher les ustensils dans la liste
  function updateUstensilList(filteredUstensils) {
    const result = filteredUstensils
      .map((el, index) => {
        return `<li class="py-[9px] pl-[16px] hover:bg-[#FFD15B] pb-0 ustensil" data-index="${index} ">
                    ${el}
                  </li>`;
      })
      .join("");

    UstensilsListe.innerHTML = result;

    // Ajouter les gestionnaires d'événements pour chaque élément
    const li = document.querySelectorAll(".ustensil");

    li.forEach((l) => {
      l.addEventListener("click", () => {
        const criteria = l.textContent.trim();
        UstensilsTag.textContent = criteria;
        button.classList.remove("chevron-active");
        UstensilInfos.classList.remove("infos-active");
        tagUstensils.classList.remove("hidden");
        // searchRecipesNative(recipes, criteria);
      });
    });
  }

  // Initialiser la liste avec tous les ingrédients
  updateIngredientList(ingredientTagTable, recipes);
  updateAppareilList(appareilTagTable);
  updateUstensilList(ustensilTagTable);

  // Recherche dynamique dans les ingrédients
  ingredientSearch.addEventListener("input", async (e) => {
    const value = e.target.value.trim().toLowerCase();
    console.log("Recherche d'ingrédients :", value);

    // Récupérer les recettes (si non déjà chargé au préalable)
    const recipes = await fetchRecipes();

    if (value !== "") {
      // Filtrer les ingrédients en fonction de la saisie
      const filteredIngredients = ingredientTagTable.filter((el) =>
        el.toLowerCase().includes(value)
      );

      console.log("Ingrédients filtrés :", filteredIngredients);

      // Mettre à jour la liste des ingrédients affichés
      updateIngredientList(filteredIngredients, recipes);

      // Filtrer les recettes en fonction des ingrédients sélectionnés
      const filteredRecipes = searchRecipesNative(recipes, filteredIngredients);

      // Afficher les recettes filtrées
      displayRecipes(filteredRecipes);
    } else {
      // Si aucun texte n'est saisi, afficher toutes les recettes
      console.log("Aucun ingrédient saisi, affichage de toutes les recettes.");
      displayRecipes(recipes);

      // Réinitialiser la liste des ingrédients
      updateIngredientList(ingredientTagTable, recipes);
    }
  });

  // Recherche dynamique dans les appareils
  AppareilsSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      const filteredAppareils = appareilTagTable.filter((el) =>
        el.toLowerCase().includes(value)
      );
      updateAppareilList(filteredAppareils);
    } else {
      // Si aucun texte n'est saisi, afficher tous les ingrédients
      // updateAppareilList(appareilTagTable);
    }
  });
  // Recherche dynamique dans les ustensils
  UstensilsSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      const filteredustensils = ustensilTagTable.filter((el) =>
        el.toLowerCase().includes(value)
      );
      updateUstensilList(filteredustensils);
    } else {
      // Si aucun texte n'est saisi, afficher tous les ingrédients
      // updateUstensilList(ustensilTagTable);
    }
  });

  // ++++++++
  // Gestion du bouton de fermeture des tags ingredients
  ingredientTagClose?.addEventListener("click", () => {
    console.log("ok");

    ingredientSearch.value = "";

    searchRecipesNative(recipes, ingredientTagTable);
    tagingredient.classList.add("hidden");
    infos.classList.remove("infos-active");
    ingredientsTag.textContent = "";
    criteriaTab = [];

    displayRecipes(recipes); // Affiche toutes les recettes
  });
  // Gestion du bouton de fermeture des tags appareils
  AppareilsTagClose.addEventListener("click", () => {
    AppareilsSearch.value = "";
    // updateIngredientList(ingredientTagTable);
    tagAppareils.classList.add("hidden");
    Appareilsinfos.classList.remove("infos-active");
    AppareilsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
  // Gestion du bouton de fermeture des tags ustensils
  UstensilsTagClose.addEventListener("click", () => {
    UstensilsSearch.value = "";
    // updateUstensilList(ustensilTagTable);
    tagUstensils.classList.add("hidden");
    UstensilInfos.classList.remove("infos-active");
    UstensilsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });

  // +++++++
  // Gestion du bouton "Effacer critères de recherche - Ingrédients"
  tagCloser.addEventListener("click", () => {
    // Réinitialiser le champ de recherche d'ingrédients
    ingredientSearch.value = "";

    // Réinitialiser la liste des ingrédients affichés
    updateIngredientList(ingredientTagTable, recipes);

    // Réafficher toutes les recettes
    displayRecipes(recipes);

    console.log("Critères de recherche pour les ingrédients réinitialisés.");
  });

  // Gestion du bouton de fermeture des tags apareils
  tagCloserAppareil.addEventListener("click", () => {
    AppareilsSearch.value = "";
    // updateAppareilList(appareilTagTable);
    tagAppareils.classList.add("hidden");
    Appareilsinfos.classList.remove("infos-active");
    AppareilsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
  // Gestion du bouton de fermeture des tags apareils
  tagCloserUstensil.addEventListener("click", () => {
    AppareilsSearch.value = "";
    // updateAppareilList(appareilTagTable);
    tagUstensils.classList.add("hidden");
    UstensilInfos.classList.remove("infos-active");
    UstensilsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
}

getAllIngredients();

// *********************************************
