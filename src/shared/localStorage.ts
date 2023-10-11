import { INITIAL_PAYLOAD } from "../utils/constants";
import cacheStorage from "./cacheStorage";

export class LocalStorage {
  key: string;
  constructor() {
    this.key = INITIAL_PAYLOAD.key;
  }

  getItem(): ILocalStorage {
    const data = sessionStorage.getItem(this.key);
    return data ? JSON.parse(data) : "";
  }

  setItem(data: ILocalStorage) {
    data.date = new Date().getTime();
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  clearStorage() {
    sessionStorage.removeItem(this.key);
  }

  isStorageValid() {
    let isValid = true;
    const data = this.getItem();
    if (data && data.date) {
      var diff = (new Date().getTime() - data.date) / 1000 / 60;
      diff = Math.abs(Math.round(diff));
      if (diff >= 120) {
        isValid = false;
      }
    }
    return isValid;
  }

  init(model: IVisualizer) {
    const data = this.getItem();
    if (!data) {
      this.setItem({
        date: new Date().getTime(),
        visualizerId: model.id,
        visualizerName: model.name,
        sceneId: cacheStorage.storage.visualizer.scenes.find(
          (scene) => scene.isDefault
        )!.id,
        sceneName: cacheStorage.storage.visualizer.scenes.find(
          (scene) => scene.isDefault
        )!.name,
        selection: [],
      });
    }
  }

  setSelections(selections: IStorageSelection[]) {
    const data = this.getItem();
    if (data) {
      this.setItem({ ...data, selection: selections });
    }
  }

  getDefaultSceneId() {
    const data = this.getItem();
    return data.sceneId;
  }
}

export default new LocalStorage();
