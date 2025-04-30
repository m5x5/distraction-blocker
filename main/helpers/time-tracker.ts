import Store from "electron-store";

export class TimeTracker {
  currentTime?: number;
  date: string;
  store: Store;
  interval?: NodeJS.Timeout;
  status: "stopped" | "started";

  constructor() {
    this.date = new Date().toLocaleDateString().replace(/\//g, "-");
    this.store = new Store({
      accessPropertiesByDotNotation: true,
      configFileMode: 0o666,
    });
  }

  static createIdentifier(mode: string, date: Date) {
    return mode + "." + date.toLocaleDateString().replace(/\//g, "-");
  }

  get time() {
    return this.currentTime;
  }

  getTime(mode: string) {
    let identifier = `${mode}.${this.date}`;
    return this.store.get(identifier) || 0;
  }

  track(mode: string, _activity?: string) {
    mode = (mode || "development").toLowerCase();
    let identifier = `${mode}.${this.date}`;
    this.currentTime = +this.store.get(identifier) || 0;
    this.status = "started";

    this.interval = setInterval(() => {
      this.currentTime++;
      this.store.set(identifier, this.currentTime);
    }, 1000);
  }

  stop() {
    this.status = "stopped";
    if (!this.interval) return;
    clearInterval(this.interval);
  }

  getWeeklySummary(mode: string) {
    // Create identifiers from monday to present day
    let identifiers = [];
    let date = new Date();
    while (date.getDay() !== 1) {
      identifiers.push(TimeTracker.createIdentifier(mode, date));
      // Go back one day
      date.setDate(date.getDate() - 1);
    }

    if (identifiers.length === 0) return 0;
    // Reduce to a single number
    let total = identifiers.reduce((acc, identifier) => {
      return acc + this.store.get(identifier) || 0;
    }, 0);
    return total;
  }
}
export default new TimeTracker();
