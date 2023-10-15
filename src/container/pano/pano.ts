import { createAScene, createSky } from "../../component/entities/entities";
import cacheStorage from "../../shared/cacheStorage";
import { INITIAL_PAYLOAD } from "../../utils/constants";
import { $query } from "../../utils/dom";

export const loadPano = () => {
  const aSceneContainer = $query(`.${INITIAL_PAYLOAD.aSceneContainer}`);
  if (aSceneContainer) {
    aSceneContainer.remove();
  }
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
