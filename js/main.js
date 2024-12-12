import { fetchRecipes } from "../BouclesNatives/fetchRecipes.js";
import { displayRecipes } from "../BouclesNatives/recipeCards.js";

async function init() {
  const recipes = await fetchRecipes();
  //   console.log(recipes[0]);

//   console.log("les recettes :", recipes);
  const recipesTab = [recipes]
  if (recipesTab.length > 0) {
    console.log(recipesTab.lenght);
    displayRecipes(recipes);
  }
}

init();
