import { $id } from "../../utils/dom";

// const loaderHtml = () => {
//   const loaderComponentWrapper = document.createElement("div");
//   loaderComponentWrapper.classList.add("loader-wrapper");
//   const loaderComponent = document.createElement("div");
//   loaderComponent.classList.add("loader");
//   loaderComponentWrapper.appendChild(loaderComponent);
//   return loaderComponentWrapper;
// };

export const addLoader = (containerId: string) => {
  const container = $id(containerId);
  // container?.appendChild(loaderHtml());
};
const loaderHtml = () => {
  return `<div class="loader" id="loader-processing" style="display: none;">
  <div class="loader-inner">
      <span class="blob blob-0"></span>
      <span class="blob blob-1"></span>
      <span class="blob blob-2"></span>
      <span class="blob blob-3"></span>
      <span class="blob blob-4"></span>
      <span class="blob blob-5"></span>
  </div>
</div>`
};
