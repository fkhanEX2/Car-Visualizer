import { createAScene, createSky } from "../../component/entities/entities";
import cacheStorage from "../../shared/cacheStorage";

export const loadPano = () => {
  const aScene = createAScene();
  const { currentSceneId, visualizer } = cacheStorage.storage;
  const currentScene = visualizer.scenes.find(
    (scene) => scene.id === currentSceneId
  )!;
  const baseSky = createSky(
    currentScene.baseImage,
    `${currentScene.initialRotation.x} ${currentScene.initialRotation.y} ${currentScene.initialRotation.z}`,
    `${currentScene.initialPosition.x} ${currentScene.initialPosition.y} ${currentScene.initialPosition.z}`,
    ""
  );
  aScene.appendChild(baseSky);
};
