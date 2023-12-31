export const INITIAL_PAYLOAD: IInitialPayload = {
  container: "main-container",
  key: "Visualizer",
  visualizerContainer: "visualizer-container",
  aSceneContainer: "a-scene-container",
};

export enum PUBSUB_CONSTANTS {
  CATEGORY_SELECT_EVENT = "categorySelectEvent",
  SWATCH_SELECT_EVENT = "swatchSelectEvent",
  CHAT_QUERY_RESOLVED = "chatQueryResolved",
}

export enum INTENTS {
  CHANGE_CAR_COLOR = "change_car_color",
  CAR_INFO_QUERY = "car_info_query",
  DOOR_OPEN = "door_open",
  CHANGE_VIEW = "change_view",
  ROTATE = "rotate",
  HEADLIGHT_ON = "headlight_on",
}

export enum CHAT_INTENT_OPTION_AVAILABLE {
  AVAILABLE = "Yeah sure!",
  NOT_AVAIlABLE = "Sorry! We currently do not have the option available.",
}

export enum ACTIONS {
  OPEN_DOOR = "Opened_Door",
  CLOSE_DOOR = "Closed_Door",
}

export const CHAT_HEADER = "Customize with Ease";

export const AVAILABLE_COLORS = ["blue", "white", "black", "red"];
