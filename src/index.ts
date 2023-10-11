import "./index.css";
import "aframe";
import BaseImage from "./static/images/Scene-1.jpg";
import HotspotImage from "./static/images/S1C2T1.png";
import TableImage from "./static/images/S1C1S1.png";
import CabinatImage from "./static/images/S1C2S3.png";
import { INITIAL_PAYLOAD } from "./utils/constants";
import { $id } from "./utils/dom";
import { loadVisualizerData } from "./container/visualizer/visualizer";

const createVisualizerContainer = () => {
  const visualizerContainer = document.createElement("div");
  visualizerContainer.id = INITIAL_PAYLOAD.visualizerContainer;
  visualizerContainer.classList.add(INITIAL_PAYLOAD.visualizerContainer);
  const mainContainer = $id(INITIAL_PAYLOAD.container);
  mainContainer?.appendChild(visualizerContainer);
};

const loadApp = async () => {
  createVisualizerContainer();
  await loadVisualizerData();
};

document.addEventListener("DOMContentLoaded", async () => {
  // const scene = document.createElement("a-scene");
  // const baseSky = document.createElement("a-sky");
  // baseSky.setAttribute("src", BaseImage);
  // baseSky.setAttribute("rotation", "0 -90 0");
  // scene.appendChild(baseSky);
  // const overlaySky = document.createElement("a-sky");
  // overlaySky.setAttribute("src", TableImage);
  // overlaySky.setAttribute("rotation", "0 -90 0");
  // overlaySky.setAttribute("material", "transparent:true");
  // scene.appendChild(overlaySky);
  // const cabinetOverlaySky = document.createElement("a-sky");
  // cabinetOverlaySky.setAttribute("src", CabinatImage);
  // cabinetOverlaySky.setAttribute("rotation", "0 -90 0");
  // cabinetOverlaySky.setAttribute("material", "transparent:true");
  // scene.appendChild(cabinetOverlaySky);
  // const overlaySky = document.createElement("a-sky");
  // overlaySky.setAttribute("src", SwatchImage); // Transparent PNG image
  // overlaySky.setAttribute("rotation", "0 -90 0");
  // overlaySky.setAttribute("position", "0 0 -0.01"); // Slightly closer to the camera
  // scene.appendChild(overlaySky);
  // code to add a hotspot
  // Create a hotspot container entity as a child of the camera
  // const hotspotContainer = document.createElement("a-entity");
  // hotspotContainer.setAttribute("position", "0 0 0"); // Adjust the position as needed
  // scene.appendChild(hotspotContainer);
  // const hotspot = document.createElement("a-image");
  // hotspot.setAttribute("src", HotspotImage);
  // hotspot.setAttribute("position", "4 0 -3"); // Example position relative to camera
  // hotspot.setAttribute("scale", "1 1 1"); // Adjust scale as needed
  // hotspot.setAttribute("class", "clickable");
  // hotspot.addEventListener("click", () => {
  //   console.log("Hotspot clicked!");
  // });
  // scene.appendChild(hotspot);
  // Append the hotspot to the hotspot container
  // hotspotContainer.appendChild(hotspot);
  // document.body.appendChild(scene);
  await loadApp();
});
