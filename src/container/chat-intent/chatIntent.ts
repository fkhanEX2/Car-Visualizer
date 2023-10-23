import { ChatService } from "../../services/chat";
import cacheStorage from "../../shared/cacheStorage";
import pubsub from "../../shared/pubsub";
import {
  CHAT_INTENT_OPTION_AVAILABLE,
  INTENTS,
  PUBSUB_CONSTANTS,
} from "../../utils/constants";
import { $query, $queryAll } from "../../utils/dom";
import { selectCurrentSwatch } from "../swatch/swatch";

export const attachChatIntentEvents = async (
  query: string,
  intentResponse: IGetActionIntent
) => {
  const { intent, value } = intentResponse;
  switch (intent) {
    case INTENTS.CAR_INFO_QUERY:
      await handleCarInfoQueryIntent(query);
    case INTENTS.CHANGE_CAR_COLOR:
      handleChangeCarColorIntent(query, intentResponse);
    case INTENTS.CHANGE_VIEW:
      handleChangeViewIntent();
    case INTENTS.DOOR_OPEN:
      handleDoorOpenIntent();
    case INTENTS.HEADLIGHT_ON:
      handleHeadlightOnIntent();
    case INTENTS.ROTATE:
      handleRotateIntent();
    default:
      handleDefaultIntent();
  }
};

export const handleCarInfoQueryIntent = async (query: string) => {
  const chatInputElement = $query(`.chat-input`) as HTMLInputElement;
  const sceneId = localStorage.getCurrentSceneId();
  const response = await ChatService.getQuestionAnswer({
    query,
    sceneId,
    role: "user",
  });
  chatInputElement.value = "";
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

export const handleChangeViewIntent = () => {};
export const handleDoorOpenIntent = () => {};
export const handleHeadlightOnIntent = () => {};
export const handleRotateIntent = () => {};
export const handleDefaultIntent = () => {};
