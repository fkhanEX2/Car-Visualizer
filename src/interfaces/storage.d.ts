interface IStorageSelection {
  category: string;
  categoryId: number;
  swatchName: string;
  swatchId: string;
}
interface IStorageScene {
  id: number;
  name: string;
  dafaultSelection: IStorageSelection[];
  currentSelection: IStorageSelection[];
}
interface IStorage {
  visualizerId: number;
  visualizerName: string;
  date: number;
  scene: IStorageScene[];
}

interface ICacheStorage {
  visualizer: IVisualizer;
  selections: IStorageSelection;
}
