const container = document.getElementById("container");

async function datas() {
  try {
    const response = await fetch("./data/recipe.json");
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des recettes : ${response.status}`
      );
    }
    const recipes = await response.json();
    console.log(recipes);

    // Initialisation d'une chaîne HTML vide
    let cards = "";

    // Générer une carte pour chaque recette
    recipes.forEach((recipe, index) => {
      const card = `
        <div
          class="bg-white rounded-[21px] overflow-hidden h-[731px] [box-shadow:0px_4px_34px_30px_rgba(0,0,0,0.04)]" ${index}
        >
          <div class="w-full h-[253px] mb-8 relative">
            <img
              src="./assets/Images/${recipe.image}"
              alt="${recipe.name}"
              class="w-full h-[253px] object-cover object-center"
            />
            <div
              class="w-[63px] h-[26px] absolute top-[21px] right-[22px] bg-[#FFD15B] px-15px py-[5px] flex justify-center items-center font-manrope text-[#1B1B1B] text-[12px] rounded-[14px]"
            >
              ${recipe.time}min
            </div>
          </div>
          <h2
            class="font-anton text-[18px] text-[#000] mb-[29px] capitalize w-full text-start pl-[25px]"
          >
            ${recipe.name}
          </h2>
          <div class="px-[25px] w-full h-[329px] mb-[61px]">
            <section class="flex flex-col gap-8">
              <div class="flex flex-col gap-[15px]">
                <h3
                  class="uppercase font-manrope font-[700] text-[#7A7A7A] text-[12px] tracking-widest"
                >
                  Recette
                </h3>
                <p class="font-manrope text-[#1B1B1B] text-[14px] text-[400]">
                  ${recipe.description}
                </p>
              </div>
              <div class="flex flex-col gap-[15px]">
                <h3
                  class="uppercase font-manrope font-[700] text-[#7A7A7A] text-[12px] tracking-widest"
                >
                  Ingrédients
                </h3>
                <ul class="grid grid-cols-2 gap-y-[21px]">
                  ${recipe.ingredients
                    .map(
                      (ingredient) => `
                    <li
                      class="font-manrope text-[#1B1B1B] capitalize flex flex-col font-bold"
                    >
                      ${ingredient.ingredient}
                      <span class="text-[#7A7A7A] font-medium text-[0.8rem]">
                        ${ingredient.quantity || ""} ${ingredient.unit || ""}
                      </span>
                    </li>`
                    )
                    .join("")}
                </ul>
              </div>
            </section>
          </div>
        </div>
      `;
      cards += card; // Concaténation
    });

    // Ajout de toutes les cartes générées au conteneur
    container.innerHTML = cards;
  } catch (error) {
    console.error("Impossible de charger les recettes :", error);
  }
}

datas();
