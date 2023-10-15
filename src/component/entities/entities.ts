import { Entity } from "aframe";
import { INITIAL_PAYLOAD } from "../../utils/constants";
import { $id } from "../../utils/dom";

export const createAScene = () => {
  const scene = document.createElement("a-scene");
  scene.classList.add(INITIAL_PAYLOAD.aSceneContainer);
  const camera = createCameraEntity();
  const rayCaster = createRaycasterEntity();
  scene.appendChild(camera);
  scene.appendChild(rayCaster);
  $id(INITIAL_PAYLOAD.visualizerContainer)?.appendChild(scene);
  return scene;
};

export const createSky = (
  src: string,
  rotation: string,
  position: string,
  className: string
) => {
  const sky = document.createElement("a-sky");
  sky.setAttribute("src", src);
  sky.setAttribute("rotation", rotation);
  sky.setAttribute("position", position);
  sky.setAttribute("material", "transparent:true");
  sky.setAttribute("class", className);
  return sky;
};

export const createHotspotEntity = (
  src: string,
  position: string,
  rotation: string,
  className: string,
  hotspotId: string,
  sceneId: string
) => {
  const hotspot = document.createElement("a-image") as Entity<any>;
  hotspot.setAttribute("src", src);
  hotspot.setAttribute("position", position);
  hotspot.setAttribute("class", className);
  hotspot.setAttribute("data-hotspot-id", hotspotId);
  hotspot.setAttribute("data-scene-id", sceneId);
  hotspot.setAttribute("rotation", rotation);
  return hotspot;
};

export const createAControls = () => {
  const parentEntity = document.createElement("a-entity");
  parentEntity.setAttribute("movement-controls", "fly: true");
  parentEntity.setAttribute("position", "0 0 0");
  parentEntity.setAttribute("raycaster", "objects: .scene-hotspot");

  const cameraEntity = document.createElement("a-entity");
  cameraEntity.setAttribute("camera", "");
  cameraEntity.setAttribute("position", "0 1.6 0");
  cameraEntity.setAttribute("look-controls", "");

  const cursorEntity = document.createElement("a-entity");
  cursorEntity.setAttribute("cursor", "rayOrigin: mouse");

  const laserControlsEntity = document.createElement("a-entity");
  laserControlsEntity.setAttribute("laser-controls", "hand: right");

  parentEntity.appendChild(cameraEntity);
  parentEntity.appendChild(cursorEntity);
  parentEntity.appendChild(laserControlsEntity);
  return parentEntity;
};

export const createCameraEntity = () => {
  const cameraEntity = document.createElement("a-entity");
  cameraEntity.setAttribute("camera", "");
  cameraEntity.setAttribute("look-controls", "");
  cameraEntity.setAttribute("cursor", "rayOrigin: mouse");
  return cameraEntity;
};

export const createRaycasterEntity = () => {
  const raycasterEntity = document.createElement("a-entity");
  raycasterEntity.setAttribute("raycaster", "objects: .scene-hotspot");
  return raycasterEntity;
};
