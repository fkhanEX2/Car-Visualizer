type EventCallback = (...args: any[]) => void;

class PubSub {
  private events: { [key: string]: EventCallback[] } = {};

  subscribe(event: string, callback: EventCallback): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  unsubscribe(event: string, callback: EventCallback): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  publish(event: string, ...args: any[]): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((callback) => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event ${event} subscribers:`, error);
      }
    });
  }
}

export default new PubSub();
