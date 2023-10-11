import { VisualizerService } from "../../services/visualizer";
import cacheStorage from "../../shared/cacheStorage";
import { loadCacheAndLocalStorage } from "../../shared/common";
import localStorage from "../../shared/localStorage";
import { INITIAL_PAYLOAD } from "../../utils/constants";
import { loadCategory, renderCategories } from "../category/category";
import { loadHotspot } from "../hotspot/hotspot";
import { loadPano } from "../pano/pano";

export const loadVisualizerData = async () => {
  try {
    const res = await VisualizerService.getVisualizerData();
    cacheStorage.storage.visualizer = res;
    loadCacheAndLocalStorage();
    loadPano();
    render();
  } catch (err: any) {
    console.log(err);
  }
};

export const render = () => {
  const data = localStorage.getItem();
  const scene = cacheStorage.storage.visualizer.scenes.find(
    (scene) => scene.id === data.sceneId
  )!;
  loadCategory(scene, INITIAL_PAYLOAD.visualizerContainer);
  loadHotspot(scene, INITIAL_PAYLOAD.aSceneContainer);
};
