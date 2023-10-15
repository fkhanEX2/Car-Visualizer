interface IStorageSelection {
  category: string;
  categoryId: number;
  swatchName: string;
  swatchId: number;
}
interface ILocalStorage {
  visualizerId: number;
  visualizerName: string;
  date: number;
  sceneId: number;
  sceneName: string;
  selection: IStorageSelection[];
}

interface ICacheStorage {
  visualizer: IVisualizer;
  selections: IStorageSelection[];
  currentSceneId: number;
}
