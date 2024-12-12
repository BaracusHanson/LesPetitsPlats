import { fetchRecipes } from "../BouclesNatives/fetchRecipes.js";
import { displayRecipes } from "../BouclesNatives/recipeCards.js";
import { searchRecipesNative } from "../BouclesNatives/filters.js";
import { addTag } from "../BouclesNatives/tags.js";
import { openFilter } from "./openFilter.js";
import {
  getAllAppareils,
  getAllIngredients,
  getAllUstensils,
} from "../BouclesNatives/fetchAllCriteria.js";
import { updateIngredientList } from "../BouclesNatives/updateFilterTags.js";

export let criteriaTab = [];

async function init() {
  const recipes = await fetchRecipes();
  const recipesTab = [recipes];
  // Sélection des éléments du DOM
  const ingredientSearch = document.querySelector("#ingredientSearch");

  openFilter(); //Gestion de l'ouverture des filtres

  /**
   * recuperation des critères
   */
  const ingredient = getAllIngredients(recipes); //Gestion de recuperation de tous les ingredients des recettes
  const appareil = getAllAppareils(recipes); //Gestion de recuperation de tous les appareils des recettes
  const ustensil = getAllUstensils(recipes); //Gestion de recuperation de tous les ustensils des recettes

  /**
   * chargement des criteres de filtre dans la listes deroulantes
   */
  updateIngredientList(ingredient, recipes);

  //   ++++++++++++++++++
  let recipesCache = []; // Cache des recettes pour éviter les rechargements
  let criteriaTab = []; // Stocke les critères actifs

  // Charger les recettes au début
  function initializeRecipes() {
    if (recipesCache.length === 0) {
      recipesCache = recipes;
    }
    return recipesCache;
  }

  // Gestion de l'entrée utilisateur pour la recherche d'ingrédients
  ingredientSearch.addEventListener("input", async (e) => {
    const value = e.target.value.trim().toLowerCase();
    console.log("Recherche d'ingrédients :", value);

    // Charger les recettes depuis le cache
    const recipes = initializeRecipes();

    // Si une valeur est saisie
    if (value !== "") {
      // Filtrer les ingrédients correspondant à la recherche
      const filteredIngredients = ingredient.filter((el) =>
        el.toLowerCase().includes(value)
      );

      console.log("Ingrédients filtrés :", filteredIngredients);

      // Mettre à jour la liste des ingrédients affichés
      updateIngredientList(filteredIngredients, recipes);

      // Mettre à jour les recettes affichées en fonction des critères
      const filteredRecipes = searchRecipesNative(recipes, criteriaTab);
      displayRecipes(filteredRecipes);
    } else {
      // Si aucune valeur n'est saisie, afficher toutes les recettes
      console.log("Aucun ingrédient saisi !");
      displayRecipes(recipes);

      // Réinitialiser la liste des ingrédients
      updateIngredientList(ingredient, recipes);
    }
  });

  //   ++++++++++++++++++
  /**
   * Gestion de la recherche globale
   */
  if (recipesTab.length > 0) {
    displayRecipes(recipes);
    // updateIngredientList(get)

    //   updateIngredientList(getAllIngredients)

    const searchInput = document.getElementById("globalInput");
    // Gestion de l'événement d'entrée dans le champ de recherche
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();

      // Si le mot saisi est supérieur ou égal à 3 caractères
      if (query.length >= 3) {
        // Ajouter le critère à criteriaTab, s'il n'est pas déjà présent
        if (!criteriaTab.includes(query)) {
          criteriaTab.push(query);
        }
      } else {
        // Si moins de 3 caractères, on vide le tableau des critères
        criteriaTab = [];
      }

      // Mettre à jour les résultats en fonction des critères
      const filteredRecipes = searchRecipesNative(recipes, criteriaTab);

      // Mettre à jour le DOM avec les recettes filtrées
      displayRecipes(filteredRecipes);
    });
  }

  /**
   * Gestion des tags
   */
  //   const tagContainer = document.getElementById("ingredientsTagContainer");
  //   const ingredients = document.querySelectorAll(".ingredient");
  //   ingredients.forEach((ingredient) => {
  //     // console.log(ingredients);
  //     ingredient.addEventListener("click", () => {
  //       const ingredientText = ingredient.textContent.trim();
  //       if (!criteriaTab.includes(ingredientText)) {
  //         criteriaTab.push(ingredientText);
  //         addTag(tagContainer, ingredientText, criteriaTab, (updatedCriteria) => {
  //           const filteredRecipes = searchRecipesNative(recipes, updatedCriteria);
  //           displayRecipes(filteredRecipes);
  //         });
  //       }
  //     });
  //   });
}

init();
