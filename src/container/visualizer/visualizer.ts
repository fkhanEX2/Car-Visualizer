import { VisualizerService } from "../../services/visualizer";
import CacheStorage from "../../shared/cacheStorage";
import { loadCacheAndLocalStorage } from "../../shared/common";
import LocalStorage from "../../shared/localStorage";
import { loadPano } from "../pano/pano";

export const loadVisualizerData = async () => {
  try {
    const res = await VisualizerService.getVisualizerData();
    CacheStorage.storage.visualizer = res;
    loadCacheAndLocalStorage();
  } catch (err: any) {
    console.log(err);
  }
};

export const loadVisualizer = async () => {
  await loadPano();
};
