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
