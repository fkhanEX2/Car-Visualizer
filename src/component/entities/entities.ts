import { VISUALIZER_CONTAINER } from "../../utils/constants";
import { $id } from "../../utils/dom";

export const createAScene = () => {
  const scene = document.createElement("a-scene");
  $id(VISUALIZER_CONTAINER)?.appendChild(scene);
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
