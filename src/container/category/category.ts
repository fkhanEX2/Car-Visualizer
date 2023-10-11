import pubsub from "../../shared/pubsub";
import { INITIAL_PAYLOAD, PUBSUB_CONSTANTS } from "../../utils/constants";
import { $id, $queryAll } from "../../utils/dom";
import { loadSwatches } from "../swatch/swatch";

export const loadCategory = (currentScene: IScene, container: string) => {
  const { categories } = currentScene;
  if (categories.length > 0) {
    $id(container)!.insertAdjacentHTML(
      "beforeend",
      renderCategories(categories)
    );
    loadSwatches(categories, INITIAL_PAYLOAD.visualizerContainer);
    const categoryLi = $queryAll("ul.category-container-list li");

    if (categoryLi.length > 0) categoryClick(categoryLi[0] as HTMLElement);

    categoryLi.forEach((element) =>
      element.addEventListener("click", (event) => {
        categoryClick(event.target as HTMLElement);
      })
    );
  }
};

export const categoryClick = (element: HTMLElement) => {
  const categoryLi = $queryAll("ul.category-container-list li");
  categoryLi.forEach((element) => element.classList.remove("active"));
  let selectedCategory: HTMLElement;
  if (element.getAttribute("name")) {
    selectedCategory = element.parentNode as HTMLElement;
  } else {
    selectedCategory = element;
  }
  selectedCategory.classList.add("active");
  const categoryId = Number(selectedCategory.getAttribute("data-category-id"));
  const categoryName = selectedCategory.getAttribute(
    "data-category-name"
  ) as string;
  pubsub.publish(PUBSUB_CONSTANTS.CATEGORY_SELECT_EVENT, {
    categoryId,
    categoryName,
  });
};

export const renderCategories = (categories: ICategory[]) => {
  return `
      <div class="category-container category-overlay">
          <ul class="category-container-list">
              ${categories
                .map(
                  (
                    category
                  ) => `<li class="category-container-list-item" data-category-id=${category.id} data-category-name="${category.name}">
                  <a name="${category.name}">${category.name}</a>
              </li>`
                )
                .join("")}
          </ul>
      </div>
      `;
};