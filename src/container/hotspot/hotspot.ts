import { createHotspotEntity } from "../../component/entities/entities";
import { $query, $queryAll } from "../../utils/dom";

export const loadHotspot = (currentScene: IScene, container: string) => {
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
  }
};

export const addHotspotClickListener = () => {
  const hotspotEntities = $queryAll(".scene-hotspot");
  hotspotEntities.forEach((hotspotEntity) => {
    hotspotEntity.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(
        hotspotEntity.getAttribute("data-hotspot-id"),
        hotspotEntity.getAttribute("data-scene-id")
      );
    });
  });
  console.log($queryAll(".scene-hotspot"));
};
