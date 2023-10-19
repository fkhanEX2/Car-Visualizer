import { createHotspotEntity } from "../../component/entities/entities";
import { loadClickEvent } from "../../component/events/customEvents";
import { $query, $queryAll } from "../../utils/dom";
import localStorage from "../../shared/localStorage";
import { loadVisualizer } from "../visualizer/visualizer";

export const loadHotspot = (currentScene: IScene, container: string) => {
  const hotspotEntities = $queryAll(".scene-hotspot");
  hotspotEntities.forEach((hotspotEntity) => {
    hotspotEntity.remove();
  });
  const AsceneContainer = $query(`.${container}`);
  if (AsceneContainer) {
    currentScene.hotspots.forEach((hotspot) => {
      const { id, initialPosition, thumbnail, sceneId, initialRotation } =
        hotspot;
      const hotspotEntity = createHotspotEntity(
        thumbnail,
        `${initialPosition.x} ${initialPosition.y} ${initialPosition.z}`,
        `${initialRotation.x} ${initialRotation.y} ${initialRotation.z}`,
        "scene-hotspot",
        id.toString(),
        sceneId.toString()
      );
      AsceneContainer.appendChild(hotspotEntity);
    });

    addHotspotClickListener();
  }
};

export const addHotspotClickListener = () => {
  const hotspotEntities = $queryAll(".scene-hotspot");
  hotspotEntities.forEach((hotspotEntity) => {
    hotspotEntity.addEventListener("click", (e) => {
      e.stopPropagation();
      const newSceneId = (e.target as HTMLElement).getAttribute(
        "data-scene-id"
      )!;
      localStorage.updateStorage(Number(newSceneId));
      //skeleton show
      loadVisualizer();
    });
    hotspotEntity.addEventListener("mouseenter", (e) => {
      (e.target as HTMLElement).setAttribute("scale", "1.2 1.2 1.2");
    });
    hotspotEntity.addEventListener("mouseleave", (e) => {
      (e.target as HTMLElement).setAttribute("scale", "1 1 1");
    });
  });
};
