import { $id } from "../../utils/dom";

const loaderHtml = () => {
  const loaderComponentWrapper = document.createElement("div");
  loaderComponentWrapper.classList.add("loader-wrapper");
  const loaderComponent = document.createElement("div");
  loaderComponent.classList.add("loader");
  loaderComponentWrapper.appendChild(loaderComponent);
  return loaderComponentWrapper;
};

export const addLoader = (containerId: string) => {
  const container = $id(containerId);
  container?.appendChild(loaderHtml());
};
