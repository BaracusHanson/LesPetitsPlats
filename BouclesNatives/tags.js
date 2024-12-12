export function addTag(container, tagText, criteriaTab, updateCallback) {
  // const tag = document.createElement("div");
  // tag.className = "tag";
  // tag.textContent = tagText;

  // Bouton de suppression
  const closeButton = document.createElement("button");
  closeButton.textContent = "x";
  closeButton.addEventListener("click", () => {
    container.removeChild(tag);
    const index = criteriaTab.indexOf(tagText);
    if (index > -1) {
      criteriaTab.splice(index, 1);
      updateCallback(criteriaTab);
    }
  });

  // tag.appendChild(closeButton);
  // container.appendChild(tag);
}
