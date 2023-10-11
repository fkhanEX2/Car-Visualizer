import pubsub from "../../shared/pubsub";
import { INITIAL_PAYLOAD } from "../../utils/constants";
import { $id } from "../../utils/dom";

export const createAScene = () => {
  const scene = document.createElement("a-scene");
  scene.classList.add(INITIAL_PAYLOAD.aSceneContainer);
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
  const hotspot = document.createElement("a-image");
  hotspot.setAttribute("src", src);
  hotspot.setAttribute("position", position);
  hotspot.setAttribute("class", className);
  hotspot.setAttribute("data-hotspot-id", hotspotId);
  hotspot.setAttribute("data-scene-id", sceneId);
  hotspot.setAttribute("rotation", rotation);
  hotspot.addEventListener("click", () => {
    console.log("hello");
  });
  return hotspot;
};
