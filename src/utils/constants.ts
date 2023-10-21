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
}

export const CHAT_HEADER = "Customize with Ease";

export const AVAILABLE_COLORS = ["blue", "white", "black", "red"];
