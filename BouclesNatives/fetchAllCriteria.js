// Fonction générique pour collecter des données
function collectData(recipes, property, subProperty = null) {
    const dataTable = [];
  
    recipes?.forEach((recipe) => {
      // Vérifier si la propriété existe
      if (recipe[property]) {
        if (subProperty) {
          // Si une sous-propriété est spécifiée (par exemple, ingredient dans ingredients)
          recipe[property].forEach((item) => {
            dataTable.push(item[subProperty]);
          });
        } else {
          // Sinon, ajoutez directement la propriété principale (par exemple, appliance)
          dataTable.push(recipe[property]);
        }
      }
    });
  
    // Supprimer les doublons et retourner les données
    return [...new Set(dataTable)];
  }
  
  // Collecte des ingrédients
  export function getAllIngredients(recipes) {
    return collectData(recipes, "ingredients", "ingredient");
  }
  
  // Collecte des appareils
  export function getAllAppareils(recipes) {
    return collectData(recipes, "appliance");
  }
  
  // Collecte des ustensiles
  export function getAllUstensils(recipes) {
    return collectData(recipes, "ustensils");
  }
  