import { createSky } from "../../component/entities/entities";
import cacheStorage from "../../shared/cacheStorage";
import localStorage from "../../shared/localStorage";
import pubsub from "../../shared/pubsub";
import { INITIAL_PAYLOAD, PUBSUB_CONSTANTS } from "../../utils/constants";
import { $id, $query, $queryAll } from "../../utils/dom";
import CrossIcon from "../../static/images/crossIcon.png";
import closeIcon from "../../static/images/closeIcon.png";
import colorBlack from "../../static/images/colorBlack.png";
import "./swatch.css";

export const loadSwatches = (container: string) => {
  pubsub.subscribe(
    PUBSUB_CONSTANTS.CATEGORY_SELECT_EVENT,
    ({
      categoryId: id,
      categoryName: name,
      categories,
    }: {
      categoryId: number;
      categoryName: string;
      categories: ICategory[];
    }) => {
      const { swatches } = categories.find((category) => category.id === id)!;
      initializeSwatches(swatches, container, id, name);
    }
  );
};

export const initializeSwatches = (
  swatches: ISwatch[],
  container: string,
  categoryId: number,
  categoryName: string
) => {
  const visualizerContainer = $id(container)!;
  const swatchContainer = $query(
    ".swatch-category",
    visualizerContainer as HTMLElement
  );
  if (swatchContainer) {
    swatchContainer.remove();
  }
  visualizerContainer.insertAdjacentHTML(
    "beforeend",
    renderSwatches(swatches, categoryName)
  );
  const swatchCloseButton = $query(".swatch-container-close");
  const newSwatchContainer = $query(
    ".swatch-category",
    visualizerContainer as HTMLElement
  );
  if (swatchCloseButton && newSwatchContainer) {
    swatchCloseButton.addEventListener("click", () => {
      newSwatchContainer.classList.add("hide");
    });
  }
  const swatchesLi = $queryAll(
    "ul.swatch-category-list li",
    visualizerContainer as HTMLElement
  );
  swatchesLi.forEach((element) =>
    element.addEventListener("click", (event) => {
      swatchClick(event.target as HTMLElement, categoryId, categoryName);
    })
  );
  selectCurrentSwatch(categoryId, swatchesLi as NodeListOf<HTMLElement>);
  loadLayers();
  pubsub.subscribe(PUBSUB_CONSTANTS.SWATCH_SELECT_EVENT, selectedSwatchClick);
};

export const selectCurrentSwatch = (
  categoryId: number,
  swatchesList: NodeListOf<HTMLElement>
) => {
  const { swatchId } = cacheStorage.storage.selections.find(
    (selection) => selection.categoryId === categoryId
  )!;
  swatchesList.forEach((swatchListItem) => {
    swatchListItem.classList.remove("active");
    if (Number(swatchListItem.getAttribute("data-swatch-id")) === swatchId) {
      swatchListItem.classList.add("active");
    }
  });
};

export const loadLayers = () => {
  const { visualizer, currentSceneId, selections } = cacheStorage.storage;
  selections.forEach((selection) => {
    const { categories } = visualizer.scenes.find(
      (scene) => scene.id === currentSceneId
    )!;
    const category = categories.find(
      (category) => category.id === selection.categoryId
    );
    if (category) {
      const { id: catId, swatches } = category;
      const {
        path: imagePath,
        initialPosition,
        initialRotation,
        id,
      } = swatches.find((swatch) => swatch.id === selection.swatchId)!;

      const skyLayer = createSky(
        imagePath,
        `${initialRotation.x} ${initialRotation.y} ${initialRotation.z}`,
        `${initialPosition.x} ${initialPosition.y} ${initialPosition.z}`,
        "swatch-layer"
      );

      skyLayer.setAttribute("data-swatch-id", id.toString());
      skyLayer.setAttribute("data-category-id", catId.toString());

      const AScene = $query(`.${INITIAL_PAYLOAD.aSceneContainer}`);
      AScene?.appendChild(skyLayer);
    }
  });
};

export const selectedSwatchClick = ({
  categoryId,
  swatchId,
  swatchName,
  categoryName,
}: ISwatchDetail) => {
  //loader show
  const newSelections: IStorageSelection[] = [
    ...cacheStorage.storage.selections.filter(
      (selection) => selection.categoryId !== categoryId
    ),
    { category: categoryName, categoryId, swatchId, swatchName },
  ];
  cacheStorage.storage.selections = [...newSelections];
  localStorage.setSelections([...newSelections]);
  const swatchIds = newSelections.map((selection) =>
    selection.swatchId.toString()
  );
  const { currentSceneId, visualizer } = cacheStorage.storage;
  const { path: imagePath } = visualizer.scenes
    .find((scene) => scene.id === currentSceneId)!
    .categories.find((category) => category.id === categoryId)!
    .swatches.find((swatch) => swatch.id === swatchId)!;
  $queryAll(".swatch-layer").forEach((layer) => {
    if (!swatchIds.includes(layer.getAttribute("data-swatch-id") as string)) {
      layer.setAttribute("src", imagePath);
      layer.setAttribute("data-swatch-id", swatchId.toString());
    }
  });
  // loader hide
};

export const swatchClick = (
  element: HTMLElement,
  categoryId: number,
  categoryName: string
) => {
  const swatchUl = $queryAll("ul.swatch-category-list li");
  swatchUl.forEach((swatchLi) => swatchLi.classList.remove("active"));
  let selectedSwatch: HTMLElement;
  if (element.getAttribute("name")) {
    selectedSwatch = element.parentNode as HTMLElement;
  } else {
    selectedSwatch = element;
  }
  selectedSwatch.classList.add("active");
  const swatchId = Number(selectedSwatch.getAttribute("data-swatch-id"));
  const swatchName = selectedSwatch.getAttribute("data-swatch-name")!;

  const swatchDetails: ISwatchDetail = {
    swatchName,
    swatchId,
    categoryId,
    categoryName,
  };
  pubsub.publish(PUBSUB_CONSTANTS.SWATCH_SELECT_EVENT, swatchDetails);
};

export const renderSwatches = (swatches: ISwatch[], categoryName: string) => {
  return `
  <div class="swatch-category hide">
    <div class="swatch-header">
      <div class="swatch-header-text">
        <img class="swatch-container-category-icon" src=${colorBlack}>
        <p>${categoryName}</p>
      </div>
      <img class="swatch-container-close" src=${closeIcon}>
    </div>
    <div class="swatch-category-options">
      <ul class="swatch-category-list">
      ${swatches
        .map(
          (swatch) =>
            `
              <li class="swatch-container-list-item ${
                swatch.isSelected ? "active" : ""
              }" data-swatch-id=${swatch.id} data-swatch-name="${swatch.name}">
                <img name="${swatch.name}" src="${swatch.thumbnailPath}" />
              </li>
            `
        )
        .join("")}  
      </ul>
    </div>
  </div>`;
};
