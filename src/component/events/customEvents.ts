export const loadClickEvent = (id: string) => {
  AFRAME.registerComponent("event-listener" + id, {
    init: function () {
      this.el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (
          e.target &&
          (e.target as HTMLElement).classList.contains("scene-hotspot")
        ) {
          console.log(e.target);
        }
        // if (e.target) {
        //   const newSceneId = (e.target as HTMLElement).getAttribute(
        //     "data-sceneid"
        //   )!;
        //   localStorage.updateStorage(Number(newSceneId));
        //   loadVisualizer();
        // }
        this.el.addEventListener("mouseleave", () => {});
        this.el.addEventListener("mouseenter", () => {});
      });
    },
  });
};
