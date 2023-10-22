import localStorage from "./localStorage";
import cacheStorage from "./cacheStorage";

export const loadCacheAndLocalStorage = () => {
  loadLocalStorage();
  loadCacheStorage();
};

export const loadCacheStorage = () => {
  const data = localStorage.getItem();
  cacheStorage.storage.selections = [...data.selection];
  cacheStorage.storage.currentSceneId = data.sceneId;
  cacheStorage.storage.chats = [...data.chats];
};

export const loadLocalStorage = () => {
  if (!localStorage.isStorageValid()) {
    localStorage.clearStorage();
  }
  localStorage.init(cacheStorage.storage.visualizer);
  // const defaultSceneId = localStorage.getCurrentSceneId();
  // localStorage.setSelections(getSelections(defaultSceneId));
};

export const getSelections = (sceneId: number) => {
  const scene = cacheStorage.storage.visualizer.scenes.find(
    (scn) => scn.id === sceneId
  )!;
  let selections = [] as IStorageSelection[];
  scene.categories.forEach((category) => {
    return category.swatches.map((swatch) => {
      if (swatch.isSelected) {
        selections.push({
          category: category.name,
          categoryId: category.id,
          swatchName: swatch.name,
          swatchId: swatch.id,
        });
      }
    });
  });
  return selections;
};

export const getUpdatedSelections = (sceneId: number) => {
  const scene = cacheStorage.storage.visualizer.scenes.find(
    (scene) => scene.id === sceneId
  )!;
  const { selection: storedSelections } = localStorage.getItem();

  const currentCategoryIds = storedSelections.map((slc) => slc.categoryId);

  let updatedSelections = [...storedSelections] as IStorageSelection[];

  scene.categories.forEach((category) => {
    if (!currentCategoryIds.includes(category.id)) {
      category.swatches.forEach((swatch) => {
        if (swatch.isSelected) {
          updatedSelections.push({
            category: category.name,
            categoryId: category.id,
            swatchName: swatch.name,
            swatchId: swatch.id,
          });
        }
      });
    }
  });
  return updatedSelections;
};
