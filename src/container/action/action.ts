import localStorage from "../../shared/localStorage";
import { $id, $query } from "../../utils/dom";
import CameraIcon from "../../static/icons/CameraIcon.png";
import { ACTIONS } from "../../utils/constants";
import { getSceneFromSceneName } from "../../shared/common";
import { loadVisualizer } from "../visualizer/visualizer";
import "./action.css";

export const loadAction = (container: string) => {
  const actionContainer = $query(".action-container");
  actionContainer?.remove();
  $id(container)!.insertAdjacentHTML("beforeend", renderAction());
  const openDoorElement = $query(".action-item-door-opened");
  if (openDoorElement) {
    openDoorElement.addEventListener("click", (e) => {
      handleOpenDoorClick(e);
    });
  }
};

export const handleOpenDoorClick = (e: Event) => {
  const currentSceneName = localStorage.getCurrentSceneName();
  const element = e.target as HTMLElement;
  let selectedElement: HTMLElement;
  if (element.getAttribute("name")) {
    selectedElement = element.parentNode as HTMLElement;
  } else {
    selectedElement = element;
  }
  const view = currentSceneName.split("_").slice(-1)[0];
  const newSceneName = selectedElement.classList.contains("active")
    ? `${ACTIONS.CLOSE_DOOR}_${view}`
    : `${ACTIONS.OPEN_DOOR}_${view}`;
  selectedElement.classList.toggle("active");

  const scene = getSceneFromSceneName(newSceneName);
  if (scene) {
    localStorage.updateStorage(scene.id);
    loadVisualizer();
  }
};

export const renderAction = () => {
  const currentSceneName = localStorage.getCurrentSceneName();
  const isDoorOpened = currentSceneName.toLowerCase().includes("opened_door");

  return `
      <div class="action-container">
        <div class="action-item-door-opened ${isDoorOpened ? "active" : ""}">
          <img name="door-opened" src=${CameraIcon}/>
        </div>
      </div>
    `;
};
