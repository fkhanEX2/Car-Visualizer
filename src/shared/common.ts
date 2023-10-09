import localStorage from "./localStorage";
import cacheStorage from "./cacheStorage";
export const loadCacheAndLocalStorage = () => {
  if (!localStorage.isStorageValid()) {
    localStorage.clearStorage();
  }
  localStorage.init(cacheStorage.storage.visualizer);
};

export const loadCacheStorage = () => {}

export const loadLocalStorage = () => {}
