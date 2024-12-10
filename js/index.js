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
                ${recipe.ingredients
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
  const container = document.getElementById("container");
  const cards = recipes.map(generateRecipeCard).join(""); // Utilisation de map pour générer toutes les cartes
  container.innerHTML = cards;
}

// Fonction principale qui orchestrera la récupération des données et l'affichage
async function datas() {
  const recipes = await fetchRecipes();
  if (recipes.length > 0) {
    displayRecipes(recipes);
  } else {
    console.log("Aucune recette à afficher.");
  }
}

// Appel de la fonction principale pour démarrer le processus
datas();

function openFilter() {
  const button = document.getElementById("ingredientButton");
  const AppareilsButton = document.getElementById("AppareilsButton");
  const infos = document.querySelector(".infos");
  const Appareilsinfos = document.querySelector(".Appareilsinfos");
  button.addEventListener("click", () => {
    console.log("open");
    button.classList.toggle("chevron-active");
    isOpen = true;
    infos.classList.toggle("infos-active");
  });
  AppareilsButton.addEventListener("click", () => {
    console.log("open");
    AppareilsButton.classList.toggle("chevron-active");
    isOpen = true;
    Appareilsinfos.classList.toggle("infos-active");
  });
}

openFilter();

/**
 * filtrage a boucle natif
 */

async function globalSearch() {
  const globalInput = document.querySelector("#globalInput");
  const recettes = await fetchRecipes();
  globalInput.addEventListener("input", (e) => {
    const criteria = e.target.value;
    searchRecipesNative(recettes, criteria);
  });
}
globalSearch();

function searchRecipesNative(recipes, query, ...criteria) {
  if (query.length < 3 && criteria.length === 0) return [];

  // Tableau pour stocker les résultats avec leur score
  const scoredResults = [];

  // Parcourir toutes les recettes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let score = 0;

    // Vérification du terme principal (query)
    if (
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      score += 1; // Ajouter un point si le query correspond
    }

    // Vérification des critères supplémentaires
    for (const criterion of criteria) {
      const criterionLower = criterion.toLowerCase();

      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(criterionLower)
      );
      const nameMatch = recipe.name.toLowerCase().includes(criterionLower);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(criterionLower);

      // Ajouter un point pour chaque critère correspondant
      if (ingredientMatch || nameMatch || descriptionMatch) {
        score += 1;
      }
    }

    // Ajouter la recette avec son score au tableau des résultats
    if (score > 0) {
      scoredResults.push({ recipe, score });
    }
  }

  // Trier les résultats par pertinence (score décroissant)
  scoredResults.sort((a, b) => a.score - b.score);

  // Extraire uniquement les recettes triées
  const sortedRecipes = scoredResults.map((entry) => entry.recipe);

  console.log("Résultats triés par pertinence :", sortedRecipes);
  displayRecipes(sortedRecipes);
  return sortedRecipes;
}

async function getAllIngredients() {
  const recipes = await fetchRecipes();
  let ingredientTagTable = [];
  let appareilTagTable = [];

  // Collecte des ingrédients
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientTagTable.push(ingredient.ingredient);
    });
  });
  // Collecte des appareils
recipes.forEach(element => {
  let appareils = element.appliance
  appareilTagTable.push(appareils)
});

;

// Suppression des doublons
ingredientTagTable = [...new Set(ingredientTagTable)];
// console.log("avec doublon possible :",appareilTagTable);
appareilTagTable = [...new Set(appareilTagTable)];
console.log("sans doublon :",appareilTagTable);

  // Sélection des éléments du DOM
  const ingredientSearch = document.querySelector("#ingredientSearch");
  const AppareilsSearch = document.querySelector("#AppareilsSearch");
  const ingredientListe = document.querySelector("#ingredientListe");
  const AppareilsListe = document.querySelector("#AppareilsListe");
  const ingredientsTag = document.getElementById("ingredientsTag");
  const AppareilsTag = document.getElementById("AppareilsTag");
  const tagingredient = document.getElementById("tagingredient");
  const tagAppareils = document.getElementById("tagAppareils");
  const button = document.getElementById("ingredientButton");
  const ingredientTagClose = document.getElementById("ingredientTagClose");
  const AppareilsTagClose = document.getElementById("AppareilsTagClose");
  const tagCloser = document.getElementById("tagCloser");
  const tagCloserAppareil = document.getElementById("tagCloserAppareil");
  const infos = document.querySelector(".infos");
  const Appareilsinfos = document.querySelector(".Appareilsinfos");

  // Fonction pour afficher les ingrédients dans la liste
  function updateIngredientList(filteredIngredients) {
    const result = filteredIngredients
      .map((el, index) => {
        return `<li class="py-[9px] pl-[16px] hover:bg-[#FFD15B] pb-0 ingredient" data-index="${index}">
                    ${el}
                  </li>`;
      })
      .join("");

    ingredientListe.innerHTML = result;

    // Ajouter les gestionnaires d'événements pour chaque élément
    const li = ingredientListe.querySelectorAll(".ingredient");
    li.forEach((l) => {
      l.addEventListener("click", () => {
        const criteria = l.textContent.trim();
        ingredientsTag.textContent = criteria;
        button.classList.remove("chevron-active");
        infos.classList.remove("infos-active");
        tagingredient.classList.remove("hidden");
        searchRecipesNative(recipes, criteria);
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
        console.log("ok");
        const criteria = l.textContent.trim();
        AppareilsTag.textContent = criteria;
        button.classList.remove("chevron-active");
        Appareilsinfos.classList.remove("infos-active");
        tagAppareils.classList.remove("hidden");
        searchRecipesNative(recipes, criteria);
      });
    });
  }


  // Initialiser la liste avec tous les ingrédients
  updateIngredientList(ingredientTagTable);
  updateAppareilList(appareilTagTable);

  // Recherche dynamique dans les ingrédients
  ingredientSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      const filteredIngredients = ingredientTagTable.filter((el) =>
        el.toLowerCase().includes(value)
      );
      updateIngredientList(filteredIngredients);
    } else {
      // Si aucun texte n'est saisi, afficher tous les ingrédients
      updateIngredientList(ingredientTagTable);
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
      updateAppareilList(appareilTagTable);
    }
  });

  // Gestion du bouton de fermeture des tags ingredients
  ingredientTagClose.addEventListener("click", () => {
    ingredientSearch.value = "";
    updateIngredientList(ingredientTagTable);
    tagingredient.classList.add("hidden");
    infos.classList.remove("infos-active");
    console.log("ok");
    ingredientsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
  // Gestion du bouton de fermeture des tags appareils
  AppareilsTagClose.addEventListener("click", () => {
    AppareilsSearch.value = "";
    updateIngredientList(ingredientTagTable);
    tagAppareils.classList.add("hidden");
    Appareilsinfos.classList.remove("infos-active");
    console.log("ok");
    AppareilsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
  // Gestion du bouton de fermeture des tags ingredients
  tagCloser.addEventListener("click", () => {
    ingredientSearch.value = "";
    updateIngredientList(ingredientTagTable);
    tagingredient.classList.add("hidden");
    infos.classList.remove("infos-active");
    console.log("ok");
    ingredientsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
  // Gestion du bouton de fermeture des tags apareils
  tagCloserAppareil.addEventListener("click", () => {
    ingredientSearch.value = "";
    updateIngredientList(ingredientTagTable);
    tagingredient.classList.add("hidden");
    infos.classList.remove("infos-active");
    console.log("ok");
    ingredientsTag.textContent = "";
    displayRecipes(recipes); // Affiche toutes les recettes
  });
}

getAllIngredients();

// *********************************************
