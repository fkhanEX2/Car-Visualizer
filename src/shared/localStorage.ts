export class LocalStorage {
  key: string;
  constructor() {
    this.key = "Visualizer";
  }

  getItem() {
    const data = sessionStorage.getItem(this.key);
    return data ? JSON.parse(data) : "";
  }

  setItem(data: IStorage) {
    data.date = new Date().getTime();
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  clearStorage() {
    sessionStorage.removeItem(this.key);
  }

  isStorageValid() {
    let isValid = true;
    const data = this.getItem();
    if (data && data.date) {
      var diff = (new Date().getTime() - data.date) / 1000 / 60;
      diff = Math.abs(Math.round(diff));
      if (diff >= 120) {
        isValid = false;
      }
    }
    return isValid;
  }

  init(model: IVisualizer) {
    const data = this.getItem();
    if (!data) {
      this.setItem({
        date: new Date().getTime(),
        visualizerId: model.id,
        visualizerName: model.name,
        scene: [],
      });
    }
  }

  getScene() {
    return this.getItem().scene;
  }

  // setScene(sceneData: IStorageScene) {
  //   this.setItem(sceneData);
  // }
}

export default new LocalStorage();
