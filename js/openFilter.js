export function openFilter() {
  const button = document.getElementById("ingredientButton");
  const AppareilsButton = document.getElementById("AppareilsButton");
  const UstensilsButton = document.getElementById("UstensilsButton");
  const container = document.getElementById("container");

  const infos = document.querySelector(".infos");
  const Appareilsinfos = document.querySelector(".Appareilsinfos");
  const UstensilInfos = document.querySelector(".UstensilInfos");

  // Ajouter un indicateur de si les filtres sont ouverts ou non
  let isIngredientOpen = false;
  let isAppareilsOpen = false;
  let isUstensilsOpen = false;

  // Fonction pour basculer l'affichage du filtre des ingrédients
  button.addEventListener("click", () => {
    isIngredientOpen = !isIngredientOpen; // Inverser l'état de 'isIngredientOpen'
    button.classList.toggle("chevron-active");
    container.classList.toggle("container-active"); // Correction du nom de la classe
    infos.classList.toggle("infos-active", isIngredientOpen); // Afficher ou masquer
  });

  // Fonction pour basculer l'affichage du filtre des appareils
  AppareilsButton.addEventListener("click", () => {
    isAppareilsOpen = !isAppareilsOpen; // Inverser l'état de 'isAppareilsOpen'
    AppareilsButton.classList.toggle("chevron-active");
    Appareilsinfos.classList.toggle("infos-active", isAppareilsOpen); // Afficher ou masquer
  });

  // Fonction pour basculer l'affichage du filtre des ustensiles
  UstensilsButton.addEventListener("click", () => {
    isUstensilsOpen = !isUstensilsOpen; // Inverser l'état de 'isUstensilsOpen'
    UstensilsButton.classList.toggle("chevron-active");
    UstensilInfos.classList.toggle("infos-active", isUstensilsOpen); // Afficher ou masquer
  });
}
