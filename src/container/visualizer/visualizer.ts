import { VisualizerService } from "../../services/visualizer";
import cacheStorage from "../../shared/cacheStorage";
import { loadCacheAndLocalStorage } from "../../shared/common";
import localStorage from "../../shared/localStorage";
import { INITIAL_PAYLOAD } from "../../utils/constants";
import { loadCategory } from "../category/category";
import { loadChat } from "../chat/chat";
import { loadHotspot } from "../hotspot/hotspot";
import { loadPano } from "../pano/pano";

export const loadVisualizerData = async () => {
  try {
    const res = await VisualizerService.getVisualizerData();
    cacheStorage.storage.visualizer = res;
    loadVisualizer();
    loadChat(INITIAL_PAYLOAD.visualizerContainer);
  } catch (err: any) {
    console.log(err);
  }
};

export const loadVisualizer = () => {
  loadCacheAndLocalStorage();
  loadPano();
  render();
};

export const render = () => {
  const data = localStorage.getItem();
  const scene = cacheStorage.storage.visualizer.scenes.find(
    (scene) => scene.id === data.sceneId
  )!;
  loadCategory(scene, INITIAL_PAYLOAD.visualizerContainer);
  loadHotspot(scene, INITIAL_PAYLOAD.aSceneContainer);
};
