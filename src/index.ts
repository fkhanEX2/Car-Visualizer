import "./index.css";
import "aframe";
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
  await loadApp();
});
