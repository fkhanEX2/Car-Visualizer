import { data } from "../data";
import apiClient from "./apiClient";

const getVisualizerData = async () => {
  //   const res = await apiClient.get<IResponseWrapper<IVisualizer>>("");
  //   return res;
  return data;
};

export const VisualizerService = {
  getVisualizerData,
};
