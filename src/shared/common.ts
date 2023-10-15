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
};

export const loadLocalStorage = () => {
  if (!localStorage.isStorageValid()) {
    localStorage.clearStorage();
  }
  localStorage.init(cacheStorage.storage.visualizer);
  // const defaultSceneId = localStorage.getDefaultSceneId();
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
