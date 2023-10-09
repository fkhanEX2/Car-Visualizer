interface IInitialView {
  id: number;
  yaw: number;
  pitch: number;
  fov: number;
}

interface IHotspot {
  id: number;
  yaw: number;
  pitch: number;
  thumbnail: string;
  header: string;
}

interface ISwatch {
  id: number;
  name: string;
  isSelected: boolean;
  path: string;
  thumbnailPath: string;
}

interface ICategory {
  id: number;
  name: string;
  initialView: IInitialView;
  swatches: ISwatch[];
}

interface IInitialPosition {
  x: number;
  y: number;
  z: number;
}

interface IInitialRotation {
  x: number;
  y: number;
  z: number;
}

interface IScene {
  id: number;
  name: string;
  baseImage: string;
  categories: ICategory[];
  initialView: IInitialView;
  initialPosition: IInitialPosition;
  initialRotation: IInitialRotation;
  hotspots: IHotspot[];
}

interface IVisualizer {
  name: string;
  id: number;
  scenes: IScene[];
}
