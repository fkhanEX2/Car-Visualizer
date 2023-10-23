import { ChatService } from "../../services/chat";
import cacheStorage from "../../shared/cacheStorage";
import { getSceneFromSceneName } from "../../shared/common";
import localStorage from "../../shared/localStorage";
import pubsub from "../../shared/pubsub";
import {
  ACTIONS,
  CHAT_INTENT_OPTION_AVAILABLE,
  INTENTS,
  PUBSUB_CONSTANTS,
} from "../../utils/constants";
import { $query, $queryAll, clearChatInputField } from "../../utils/dom";
import { selectCurrentSwatch } from "../swatch/swatch";
import { loadVisualizer } from "../visualizer/visualizer";

export const attachChatIntentEvents = async (
  query: string,
  intentResponse: IGetActionIntent
) => {
  const { intent, value } = intentResponse;
  switch (intent) {
    case INTENTS.CAR_INFO_QUERY:
      await handleCarInfoQueryIntent(query);
      break;
    case INTENTS.CHANGE_CAR_COLOR:
      handleChangeCarColorIntent(query, intentResponse);
      break;
    case INTENTS.CHANGE_VIEW:
      handleChangeViewIntent(query, intentResponse);
      break;
    case INTENTS.DOOR_OPEN:
      handleDoorOpenIntent(query, intentResponse);
      break;
    case INTENTS.HEADLIGHT_ON:
      handleHeadlightOnIntent();
      break;
    case INTENTS.ROTATE:
      handleRotateIntent();
      break;
    default:
      handleDefaultIntent(query);
  }
};

export const handleCarInfoQueryIntent = async (query: string) => {
  const sceneId = localStorage.getCurrentSceneId();
  const response = await ChatService.getQuestionAnswer({
    query,
    sceneId,
    role: "user",
  });
  clearChatInputField();
  publishChat(query, response.toString());
};
export const handleChangeCarColorIntent = (
  query: string,
  intentResponse: IGetActionIntent
) => {
  const { value } = intentResponse;
  const sceneId = localStorage.getCurrentSceneId();
  const { categories } = cacheStorage.storage.visualizer.scenes.find(
    (scene) => scene.id === sceneId
  )!;
  clearChatInputField();
  publishChat(
    query,
    isIntentColorOptionAvailable(String(value).toLowerCase(), categories)
      ? CHAT_INTENT_OPTION_AVAILABLE.AVAILABLE
      : CHAT_INTENT_OPTION_AVAILABLE.NOT_AVAIlABLE
  );
  const category = categories.find((cat) => cat.name === "Color");
  if (category) {
    const swatchData = category.swatches.find(
      (swatch) => swatch.name.toLowerCase() === String(value).toLowerCase()
    );
    if (swatchData) {
      updateSwatchLayerUponChatIntent(category, swatchData);
    }
  }
};

export const updateSwatchLayerUponChatIntent = (
  category: ICategory,
  swatchData: ISwatch
) => {
  pubsub.publish(PUBSUB_CONSTANTS.SWATCH_SELECT_EVENT, {
    categoryId: category.id,
    categoryName: category.name,
    swatchId: swatchData.id,
    swatchName: swatchData.name,
  });
  const swatchesLi = $queryAll("ul.swatch-category-list li");
  const activeCtaegory = $query(`.category-container-list-item.active`);
  if (
    activeCtaegory &&
    Number(activeCtaegory.getAttribute("data-category-id")) === category.id
  ) {
    selectCurrentSwatch(category.id, swatchesLi as NodeListOf<HTMLElement>);
  }
};

const publishChat = (query: string, answer: string) => {
  pubsub.publish(PUBSUB_CONSTANTS.CHAT_QUERY_RESOLVED, {
    query,
    answer,
    id: 1,
  });
};

const isIntentColorOptionAvailable = (
  color: string,
  categories: ICategory[]
) => {
  let isAvailable = false;
  const category = categories.find((cat) => cat.name === "Color");
  if (category) {
    isAvailable = category.swatches
      .map((swatch) => swatch.name.toLowerCase())
      .includes(color);
  }
  return isAvailable;
};

export const handleChangeViewIntent = (
  query: string,
  intentResponse: IGetActionIntent
) => {
  const { value } = intentResponse;
  const currentSceneName = localStorage.getCurrentSceneName();
  const sceneNameItems = currentSceneName.split("_");
  const newSceneName =
    sceneNameItems.slice(0, sceneNameItems.length - 1).join("_") +
    `_${String(value)}`;

  const scene = cacheStorage.storage.visualizer.scenes.find(
    (scene) => scene.name.toLowerCase() === newSceneName.toLowerCase()
  );
  clearChatInputField();
  if (scene) {
    publishChat(query, CHAT_INTENT_OPTION_AVAILABLE.AVAILABLE);
    const { id: sceneId } = scene;
    localStorage.updateStorage(sceneId);
    loadVisualizer();
  } else {
    publishChat(query, CHAT_INTENT_OPTION_AVAILABLE.NOT_AVAIlABLE);
  }
};

export const handleDoorOpenIntent = (
  query: string,
  intentResponse: IGetActionIntent
) => {
  const { value } = intentResponse;
  const currentSceneName = localStorage.getCurrentSceneName();
  const openDoorActionElement = $query(
    ".action-item-door-opened"
  ) as HTMLElement;
  const view = currentSceneName.split("_").slice(-1)[0];
  const newSceneName = value
    ? `${ACTIONS.OPEN_DOOR}_${view}`
    : `${ACTIONS.CLOSE_DOOR}_${view}`;
  openDoorActionElement.classList.toggle("active");
  clearChatInputField();
  const scene = getSceneFromSceneName(newSceneName);
  if (scene) {
    publishChat(query, CHAT_INTENT_OPTION_AVAILABLE.AVAILABLE);
    localStorage.updateStorage(scene.id);
    loadVisualizer();
  } else {
    publishChat(query, CHAT_INTENT_OPTION_AVAILABLE.NOT_AVAIlABLE);
  }
};

export const handleHeadlightOnIntent = () => {};
export const handleRotateIntent = () => {};

export const handleDefaultIntent = (query: string) => {
  clearChatInputField();
  publishChat(query, "Sorry! We cannot figure out the intent from your query.");
};
